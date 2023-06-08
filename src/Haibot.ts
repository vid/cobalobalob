import { AStepper } from "@haibun/core/build/lib/defs.js";
import { SystemChatMessage } from "langchain/schema";
import { TConfig, allTasks } from "./tasks.ts";

export const code = '```';
const meta = {
  summary: "Haibot's short summary of the current request",
  suggestions: "Haibot's suggestions how to make the current task directive more clear",
};


const config: Partial<TConfig> = {
  // framework: 'React components',
  framework: 'Frameworkless Web Components',
  serviceRouting: "Azure functions",
  organizationType: "Government",
  database: "Postgres with Graph extensions",
  environment: {
    name: "Azure",
    script: 'azure-functions.yml',
  }
}

export type TResult = {
  filename: string,
  content: string | object,
  folder?: string
}

type TFormat = {
  results: TResult[],
  diagnosis?: string
}

export type TTask = {
  task: string,
  path: string,
  carry?: boolean,
  format: TFormat,
  key: string
}

export class Haibot {
  step: number;
  haibunSteps: AStepper;
  name: string;
  mainTask: string;
  tasks: TTask[];
  constructor(mainTask: string, name: string, haibunSteps: AStepper, onlyTasks?: string[]) {
    this.mainTask = mainTask;
    this.name = name;
    this.haibunSteps = haibunSteps;
    this.step = 0;
    const possibleTasks = allTasks(<TConfig>{ ...config, haibunSteps, name });
    this.tasks = onlyTasks ? possibleTasks.filter(a => onlyTasks.includes(a.key)) : possibleTasks;
    console.info('using tasks:', this.tasks.map(a => a.key).join(', '));
  }
  getBackground() {
    return new SystemChatMessage(
      `You are an AI test and programming assistant named "Haibot," part of a system called [Haibun](https://github.com/withhaibun) for specification and integration testing. You follows the user's requirements carefully & to the letter.
The application is code-named "${this.name}" and is for ${config.organizationType}. It will be deployed to ${config.environment!.name}, using ${config.framework} and ${config.serviceRouting}. If required, it will use ${config.database} for data storage.

Your responses must only be in JSON format, using the format specified.

Always use consistent Haibun identifiers between steps, that look like this: \`_hai-purpose\`. 
Provide your complete answer, without back and forth, unless anything is unclear, in which case say what is unclear and stop.

Avoid or spell out jargon.
When writing markdown, provide reference links to any technical terms.

When asked to use Mermaid diagrams, surround them with ${code}mermaid${code} tags, for example:
${code}mermaid
<graph type>
…graph definition
${code}

Do not use brackets in mermaid diagrams keys. 
If asked for an explanation, include it after the diagram, still in the JSON \`content\` field.

This is your main task: ${this.mainTask}
`);
  }

  nextTask() {
    const task = this.getTask(this.step);
    this.step++;
    return task;
  }
  getTask(n: number): TTask | undefined {
    if (n === this.tasks.length) {
      return undefined;
    }
    const t = this.tasks[n];
    if (!t) {
      throw Error(`No task found for ${n}`);
    }
    const format = { ...meta, ...t.format };
    return {
      path: t.path,
      task: t.task,
      format,
      key: t.key,
    }
  }
}