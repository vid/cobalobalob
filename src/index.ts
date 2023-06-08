import * as dotenv from "dotenv";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { exec } from "child_process";

import WebPlaywright from "@haibun/web-playwright";
import A11y from "@haibun/web-accessibility-axe/build/a11y-axe-stepper.js";
import Vars from "@haibun/core/build/steps/vars.js";
import { Haibot, TResult, TTask } from "./Haibot.ts";
import { AStepper } from "@haibun/core/build/lib/defs.js";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { AIChatMessage, BaseChatMessage, HumanChatMessage } from "langchain/schema";
import { overallTask } from "./main-task.ts";

const MAX_RETRIES = 4;

type TJsonResult = {
  summary?: string,
  suggestions?: string,
  results: TResult[]
  diagnosis?: string
}

const models = {
  gpt35turbo: {
    modelName: "gpt-3.5-turbo",
    maxLength: 4000,
  },

  gpt4: {
    modelName: "gpt-4",
    maxLength: 65000,
  }
}

const useModel = models.gpt4;

go();

async function go() {
  dotenv.config();

  const chat = new ChatOpenAI({
    temperature: 0,
    modelName: useModel.modelName,
    openAIApiKey: process.env.OPENAI_API_KEY,
    streaming: true,
    callbacks: [
      {
        handleLLMNewToken(token: string) {
          process.stdout.write(token);
        },
      },
    ],
  });

  const s: { [name: string]: { match?: any; gwta?: any } } = {
    ...new WebPlaywright().steps,
    ...new Vars().steps,
    ...new A11y().steps
  };


  chat.temperature = 0.9;

  const appName = await getName([]);

  const hai = new Haibot(overallTask, appName, s as unknown as AStepper, ['haibun-tests', 'web-frontend']);
  const instructions = [hai.getBackground()];

  async function getName(names: string[]) {
    const donot = names.length > 0 ? `any of these names: ${names.join(', ')} or` : '';
    const optimistic = await chat.call([new HumanChatMessage(`Here is a description of an application: ${overallTask}.\nPlease provide a short, meaningful, Canadiana-inspired name for the application, using dashes instead of spaces, and no special characters. Do not use technology, science or business cliches, but the name must be very specific to the task. Do not use ${donot} the word "portal," "hub," or any words like "shining," "bright," "synergy," or "innovative." It's ok to use international language words, as long as they don't have negative meanings anywhere. Do not use any words close to words used in existing sites or patents.  
This name will be used to name the folder where the application will be generated. Use this format: { "name": "my-optimistic-app-name" }}`)]);
    let codeName: string = JSON.parse(optimistic.text).name;
    while (existsSync(`gen/${codeName}`)) {
      codeName = await getName([...names, codeName])
    }

    chat.temperature = 0.0;
    return codeName;
  }
  info(`appName is ${appName}`);
  const keyed: { [key: string]: TTask } = {};
  const pathed: { [path: string]: { [key: string]: TTask } } = {};
  const toc = [
    `# ${appName}`,
    '',
    overallTask,
    '',
    useModel.modelName,
    `Generated on ${new Date().toISOString()}`,
    ''];
  let sequence = 0;
  while (true) {
    sequence++;
    const next = hai.nextTask();
    if (!next) {
      writeFileSync(`gen/${appName}/TOC.md`, toc.join('\n'));
      info('finished');
      break;
    }
    const { task, path, format, carry, key } = next;
    if (keyed[key]) {
      throw Error(`key ${key} already exists`);
    }
    keyed[key] = next;
    pathed[path] = {
      ...pathed[path] || {},
      [key]: next
    }

    const taskWithFormat = new HumanChatMessage(`
Here is the overall task:

${overallTask}

Here is your current task: 

${task}

Carefully use all the details from the above responses in your answer for the current task.

Your complete response must be less than ${useModel.maxLength} characters long.

`);
    let nowInstructions = [...instructions, taskWithFormat];
    console.log('\n\n----------------------------------', taskWithFormat);
    let retries = 0;
    let res: undefined | BaseChatMessage = undefined;
    while (retries++ < MAX_RETRIES) {
      try {
        const resultInstruction = new HumanChatMessage(`Enclose your own response in this strict JSON format:

${JSON.stringify(format, null, 2)}

Do not put markdown surrounding or outside the response JSON.`);

        res = await chat.call([...nowInstructions, resultInstruction]);
        const { summary, files } = writeResponse(res.text, path, appName, sequence, retries, { text: taskWithFormat.text, key });
        const filelinks = files.map(f => `[${f}](${path}/${f})`);
        toc.push(`* ${summary?.replace(/\.$/, '')}: ${filelinks.join(', ')}`);
        console.log(res);
        break;
      } catch (error) {
        info(`\n${error} retry ${retries}`);
        if (res) {
          if (retries === 1) {
            nowInstructions = [
              ...nowInstructions,
              new AIChatMessage(res?.text),
              new HumanChatMessage(`Sorry, I got an error ${error} from your response. Please try again, making sure to strictly use only the provided JSON format. Put a comment about what happened in a JSON field called "diagnosis".`),
              new HumanChatMessage(`Here is the code where the failure happened, with your text as the input:\n${writeResponse.toString()}\nThis function works for ideal cases, and has all references defined, but please indicate any corner-case bugs that may affect this result.`)
            ]
            format.diagnosis = `Your suggestion on how to fix the problem`;
          }
        }
      }
    }
    if (retries >= MAX_RETRIES) {
      throw Error(`too many retries`);
    }
    if (carry) {
      instructions.push(new AIChatMessage((<BaseChatMessage>res).text));
    }
  }
}
function info(what: string) {
  console.info(what);
  exec(`espeak "info... ${what.replace(/"/g, '').replace(/\n/g, ' ')}"`);
}
function writeResponse(text: string, path: string, codeName: string, sequence: number, retries: number, instruction: { text: string, key: string }) {
  text = text.replace(/^```json /, '').replace(/```.?$/, '').replace(/\/\\\./g, '/\\.').trim();
  let summary;
  let files = [];
  const dest = ['gen', codeName, path].join('/');
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true })
  }

  try {
    const json: TJsonResult = JSON.parse(text);
    const { summary: s, suggestions, results, diagnosis } = json;
    if (diagnosis) {
      info(`\ndiagnosis: ${diagnosis}`);
    }
    summary = s;
    console.log('\n', summary, "; ", suggestions);
    for (const result of results) {
      const basefn = result.filename.replace('/', '_');
      let dup = 0;
      const subdir = (result.folder && result.folder !== '.')
        ? result.folder.split('/').map(f => f.replace(/[^a-zA-Z0-9]/g, '_'))
        : [];
      const path = [dest, ...subdir];
      if (!existsSync(path.join('/'))) {
        mkdirSync(path.join('/'), { recursive: true })
      }
      const file = () => {
        const dups = dup ? `-${dup}` : '';
        return [...path, basefn.replace(/\.([^\.]*)$/, `${dups}.$1`)].join('/');
      }
      while (existsSync(file())) {
        dup++;
      }
      info(`writing ${file()}`);
      const content = typeof result.content === 'string' ? result.content : JSON.stringify(result.content, null, 2);
      writeFileSync(file(), content);
      files.push(file());
    }
    const instr = `${dest}/_instruction-${sequence}.json`;
    writeFileSync(instr, JSON.stringify(instruction, null, 2));
    writeFileSync(`${dest}/_response-${sequence}.json`, text);
  } catch (e: any) {
    const message = (e as any)?.message;
    if (message.match(/Unexpected token/)) {
      const position = (e as any)?.message.match(/position (\d+)/)[1];
      text = text.substring(0, position - 11) + `\x1b[33m` + text.substring(position - 10, position + 10) + `\x1b[0m` + text.substring(position + 11);
    }
    writeFileSync(`${dest}/_fail-${sequence}-${retries}.json`, text)
    writeFileSync(`${dest}/_error-${sequence}-${retries}.json`, JSON.stringify({ message, error: e }, null, 2))
    console.error('could not parse', e, text)
    throw (e);
  }
  return { summary, files };
}