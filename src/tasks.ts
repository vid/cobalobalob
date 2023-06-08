import { AStepper } from "@haibun/core/build/lib/defs.js";
import { TTask, code } from "./Haibot.ts";
import { readFileSync } from "fs";

export type TConfig = {
    organizationType: string,
    name: string,
    framework: string,
    haibunSteps: AStepper,
    serviceRouting: string
    database: string,
    environment: {
        script: string,
        name: string
    }
}
export const allTasks = ({ organizationType, name, framework, serviceRouting, database, haibunSteps, environment }: TConfig): TTask[] => [
    {
        key: 'conops',
        carry: true,
        task: `Write a complete and very detailed Concept of Operations (CONOPS) of how the application of what's included in the application, including precise technical details.
Start the concept off with some key facts relevant to the application in an ${organizationType} setting. 
It will consider all aspects of an application for ${organizationType}, including sustainability, transparency, inclusiveness and above all safety. 
This plan will be used to design the application, so it must be very detailed.

It will use these headings, but add others as required:

## Solution overview
Every day, …
## Key facts
## Comparison to existing systems
… discuss any existing and comparable systems in the world, and why it's neccessary to create this system
## Initiative origin and ${organizationType} justification
… where did the idea come from, why is it important for ${organizationType} to create it
## Statement of the goals and objectives of the system
## Plan for inclusion
… how it will be made accessible to diverse perspectives, including people with special requirements, and people from diverse backgrounds
## Strategies, tactics, policies, and constraints affecting the system
## Organizations, activities, and interactions among participants and stakeholders
## Statement of responsibilities and authorities delegated
## Specific operational processes for fielding the system
## Processes for initiating, developing, maintaining, and retiring the system

Identify at least six key stakeholders, and refer to them explicitly under relevant headings.

The CONOPS relates a narrative of the process to be followed implementing the system. It defines the roles of the stakeholders involved throughout the process, and offers clear methodology to realize the goals and objectives.

This section will be referred to as a "Concept of Operations," not a "CONOPS." 

`,
        path: `concept`,
        format: {
            results: [
                {
                    filename: "concept.md",
                    content: `... detailed Concept of Operations for ${name}`,
                }
            ],
        }
    },
    {
        key: 'user-stories',
        carry: true,
        task: `Identify at least 5 user personas, and create more than 2 user fully detailed stories for each, using Haibun identifiers.`,
        format: {
            results: [
                {
                    filename: "use-cases.md",
                    content: `# Use Case … `,
                }
            ]
        },
        path: 'spec',
    },
    {
        key: 'site-map',
        carry: true,
        task: `Write a site map document, that describes exactly what pages the user will use, and what is on them.
The pages must include all components, and use the same Haibun identifiers used throughout this process.

Embed a top-down Mermaid Flowchat diagram of the site map.

`,
        format: {
            results: [
                {
                    filename: "site-map.md",
                    content: `# Home page …\n${code}mermaid\nflowchart TD\n…\n${code}`,
                }
            ]
        },
        path: 'spec',
    },
    {
        key: 'openapi-spec',
        task: `Write an OpenAPI spec which the ${framework} components and backend services will need for the all the features required.`,
        format: {
            results: [
                {
                    filename: "openapi.yaml",
                    content: "…yaml"
                }
            ]
        },
        path: 'spec',
        carry: true
    },
    {
        key: 'threat-modelling',
        task: `Write a very detailed threat model for the application, based on the above material.
Include technical, reputation, social, and physical threats, to individuals, to the ${organizationType}, participants, and to society.

Threats should range from technical exploits like XSS, 
and social engineering to threats like impersonation and fake content.

For example, if applicable, fake content can be mitigated by getting users to use the browser to check the site's SSL certificate, and reviewing the provenance of information.

Another example, if applicable, filter bubbles can be prevented by providing context, depth and counterpoints to collected information, and letting the user use what-if scenarios.

For each threat, include very specific mitigations and how to use them. 

Write specific threats for the application. There should be at least ten threats, each with one or mitigations. 
Re-use existing features for mitigations, if possible.

Use Mermaid diagrams for each threat.
`,
        format: {
            results: [
                {
                    filename: "threat-modelling.md",
                    content: "…"
                }
            ],
        },
        path: 'spec',
        carry: true,
    },

    {
        key: 'sequence-diagram',
        task: `Create a sequence diagram using Mermaid format of the required.`,
        format: {
            results: [
                {
                    filename: "sequences.md",
                    content: `${code}mermaid\nsequenceDiagram\nAlice->>Ahmed: …\n${code}\n`
                }
            ]
        },
        path: 'spec'
    },
    {
        key: 'linked-data',
        carry: true,
        task: `Create Linked Data descriptions of every instance of data that is persisted on the client (browser) or on the service. 
Include details such as who can access it, its license, who can access it, how it is protected (for example, end to end encryption), and its provenance, as well as if it includes any personally identifiable information (PII) or links to other people.
Base the data schemas on schema.org. Use ${name}.org as the base URI for the data.
Describe any schemas that created for reusable data in a section called "schemas."
Give each piece of data a unique identifier (URI) and use it in all references. Use Haibun identifiers when possible.`,
        format: {
            results: [
                {
                    filename: "linked-data.json",
                    content: {
                        schemas: {
                            [`${name}:id`]: `${name}:id…`,
                            [`${name}:example`]: 'value…'
                        },
                        instances: {
                            [`${name}:example`]: {
                                "type": "https://schema.org/Person"
                            }
                        }
                    }
                }
            ]
        },
        path: 'spec',
    },
    {
        key: 'data-relationships',
        task: `Create a Mermaid data relationship diagrams for every instance of the Linked Data. 

Include explanations of the diagrams in detail within the content field.`,

        format: {
            results: [
                {
                    filename: "data-relationships.md",
                    content: `${code}mermaid\nflowchart TD\n…\n${code}\n`
                }
            ]
        },
        path: 'spec'
    },
    {
        key: 'diagrams',
        task: `Create flowchart, sequence diagram, class diagram, state diagram, entity-relationship diagram, user journey, gantt, pie chart, and requirement diagrams.
Use the Linked Data, site map, OpenAPI spec, data relationships, as the basis for the diagrams.
Provide an explanation of each diagram, in detail, after the diagram within the content field.

Include a section on what information or data is missing to describe a complete application up-front.`,

        format: {
            results: [
                {
                    filename: "diagrams.md",
                    content: `${code}mermaid\nflowchart TD\n…\n${code}\n<explanation>`
                }
            ]
        },
        path: 'spec'
    },
    {
        key: 'object-map',
        task: `Create an object map of the work required, based on the the above works, especially the Linked Data and OpenAPI spec.
It must include these top level element types: "concept" (these specifications), "browser," "service," using Haiubn identifiers.
Top level elements must include "specifies," "requests from" and "responds to" identifers, 
and a "data" field (using Haibun identifiers from the above Linked Data spec) and "source" (referring to another defined top level element) as required.
This map must be completely consistent, so a graph can be generated from it.
`,
        format: {
            results: [
                {
                    filename: "object-map.json",
                    content: {
                        Objects: {
                            "user browser": {
                                "type": "browser",
                                "requests from": "service1",
                                "request purpose": "index files",
                                "input source": "<field data entered information into>"
                            },
                            "service1": {
                                "type": "service",
                                "response to": "user browser",
                                "response purpose": "return index files",
                                "data": [
                                    {
                                        "…Haibun identifier": "uri",
                                        source: "… Haibun identifier for service or entry point"
                                    },
                                    {
                                        "…Haibun identifier 2": "uri",
                                        source: "… Haibun identifier for service or entry point"
                                    }
                                ]
                            }
                        }
                    }
                },
            ]
        },
        path: 'spec'
    },
    {
        key: 'a-frame',
        task: `Create a complete, navigable XR version of the application using A-Frame, with a 3D model of the application's data (object graph, linked data, etc), and services that uses all Haibun identifiers.
Assign different z-dimension values for concept, user, browser, services, and data identifiers.
Use this library: vasturiano/3d-force-graph-vr. 

Do not include instructions in comments, include all functions neccessary to render the graph in the code.

Include a complete compatible node graph from the above works to render the graph.
The model must be navigable with a VR headset, and must be able to be navigated with a mouse or eye tracking (gaze).
The model must be able to be navigated with, or support an alternatie view for a screen reader. 
This code will be at least 200 lines line, plus the node graph, which will have at least 15 objects.
`,
        format: {
            results: [
                {
                    filename: "package.json",
                    content: "… npm requirements and scripts to install and run the application"
                },
                {
                    filename: "a-frame.html",
                    content: "… html that uses a-frame"
                },
                {
                    filename: "a-frame.ts",
                    content: "… type that uses a-frame and the vasturiano/3d-force-graph-vr library"
                },
                {
                    filename: "node-graph.ts",
                    content: "export const nodeGraph = {…}"
                }
            ]
        },
        path: 'visualization'
    },
    {
        key: 'haibun-tests',
        task: `You will use the Haibun testing system, which is like BDD, for e2e/integration testing, usually via the browser.
These Haibun scenario phrases are available:
${code} javascript
${Object.values(haibunSteps)
                .map((a) => `"${(a.gwta || a.match)}"`)
                .join(", ")};
${code}
Placeholders, like this {placeholder} appear, in the scenario phrases.  The phrases you write must use an applicable word instead of the one in the placeholder.
Write Haibun scenario phrases for every page of the main task, include accessibility tests after every browser action such as selecting, typing, and navigating.
For every placeholder, add a Set phrase, like this: \`Set {placeholder} to "value"\` in a separate placeholders file in the JSON results.
If a placeholder refers to an HTML element, use a Haibun identifier in the \`data-testid\` attribute to identify them, starting the id with "_hai-", like this: \`<input data-testid="_hai-username" />\`.
`,
        format: {
            results: [
                {
                    filename: "test1.feature",
                    content: "On the overview page\nI should see result 1\nI should see result 2",
                },
                {
                    filename: "placeholders.feature",
                    content: "Set overview to https://localhost:8080\nSet result 1 to //*[@id=\"result-1\"]"
                }
            ]
        },
        path: 'haibun'
    },
    {
        key: 'web-frontend',
        task: `
Create Typescript libraries for for all data access and service requests, designed for code reuse and to enable testing. 
Write complete, fully functional HTML pages and components using ${framework} that use the libraries and provide interfaces for all of the Haibun tests.
Use existing ${framework} components when available, or describe new ones. 
Do not use webpack.
Use the result "folder" field to indicate the proper directory.
Do not use TODO statements or say content will go here, include all required code.

Use the previously created Haibun Set placeholders to give each input component a corresponding Haibun id that starts with \`_hai-\`, like this: \`<input data-testid="_hai-username" />\`.
Make sure each component is accessible by a screen reader using ARIA attributes.
`,
        format: {
            results: [
                {
                    filename: "package.json",
                    content: "… npm requirements and scripts to install and run the application",
                    folder: "."
                },
                {
                    filename: "main.html",
                    content: `<!DOCTYPE html>\n<link rel="stylesheet" href="/main.css" />\n<script src="built/bundle.js">\n</script>`,
                    folder: "public"
                },
                {
                    filename: "main.css",
                    content: ".App {\n text-align: center;\n}",
                    folder: "public"
                },
                {
                    filename: "component.tsx",
                    content: `${readFileSync('./compies/src/React.tsx', 'utf-8')}`,
                    folder: "src"
                },
                {
                    filename: "main.ts",
                    content: "... libraries used by the application",
                    folder: 'src/lib'
                }
            ]
        },
        path: 'web',
        carry: true
    },

    {
        key: 'web-tests',
        task: `Write unit tests for each of the components created above. The tests must emphasize testing the libraries, with smoke tests for the components. `,
        format: {
            results: [
                {
                    filename: "main.test.ts",
                    content: "test('test', () => {\n expect(1).toBe(1);\n});",
                }
            ]
        },
        path: 'web'
    },
    {
        key: 'service-routing',
        task: `Re-use libraries identified above, or create libraries for all the service-level functions, that enable code reuse and easier testing.
Write fully functional ${serviceRouting} routes that use the libraries and are used with your OpenAPI spec. 
Do not use TODO statements or say content will go here, instead include all required code.`,
        format: {
            results: [
                {
                    filename: "endpoint1.ts",
                    content: `…. ${serviceRouting} routes`
                }
            ]
        },
        path: 'service'
    },
    {
        key: 'service-tests',
        task: `Write unit tests for your ${serviceRouting} routes`,
        format: {
            results: [
                {
                    filename: "route1.test.ts",
                    content: "test('test', () => {\n expect(1).toBe(1);\n});",
                }
            ]
        },
        path: 'service'
    },

    {
        key: 'service-docker',
        task: `Write a Docker compose file that creates images to deploy the application with the above work.`,
        format: {
            results: [
                {
                    filename: "docker-compose.yml",
                    content: "… docker stuffs"
                }
            ]
        },
        path: 'deploy',
        carry: true
    },

    {
        key: 'service-deploy',
        task: `Write an ${environment.script} file to deploy the application with the above work.`,
        format: {
            results: [
                {
                    filename: `${environment.script}`,
                    content: `${serviceRouting} stuffs`
                }
            ]
        },
        path: 'deploy'
    },
    {
        key: 'development-release-plan',
        task: `Detail very specific development and release instructions for the application in its ${environment.name} environment using ${serviceRouting} and ${database}, with a continuous integration and deployment pipeline.
This pipeline must include controls such as SAST tests, DAST tests, and vulnerability scanning.
Deployment must include implemented workflows for intelligent SEIM threat detection and resolution, using the OpenAPI spec and client / service source code and an API to the Web Application Firewall.
Include specific gates so the application is properly tested at each phase.
For example, automatic accessibility tests only catch about 70 % of problems, so the application is tested manually before it's reviewed or released. 
Make the testing based on Haibun tests as much as possible, that feed back into creating tickets with extensive details where possible, but include very specific authorities and experts when required.
For each step in the process, include concrete ways to verify how it is properly implemented, for example, a dashboard or document or signoff from a responsible person.
In a seperate section, indicate which tasks are in completed or in progress considering the above work, using checkboxes, and nest the tasks to indicate dependencies.

Include a Mermaid gantt chart.`,
        format: {
            results: [
                {
                    filename: "development-release-plan.md",
                    content: `…markdown\n${code}mermaid\ngantt\n…${code}`
                }
            ]
        },
        path: 'spec'
    },

    {
        key: 'support-plan',
        task: `Write a very detailed support plan that details how the application must receive support both technically and for end users.Include resource estimates.Include ways for people who cannot use a computer to receive support.`,
        format: {
            results: [
                {
                    filename: "support-plan.md",
                    content: "… support plan"
                }
            ]
        },
        path: 'support',
        carry: true
    },

    {
        key: 'costing',
        task: `Write a complete and detailed up - front and year to year cost estimate to run the service nationally, including accessibility support, as well as localization and internationalization support if specified.
Development will be by full time staff, so should not be included, but this should be mentioned, but academic and industry specialists will be used for non general development activities.
Use tables where required.`,
        format: {
            results: [
                {
                    "filename": "costing.md",
                    content: "…cost details"
                }
            ]
        },
        path: 'costing'
    },
    {
        key: 'savings-enhancements',
        task: `Write a complete and detailed estimate of how the service will save money across the entire ${organizationType}, and create new opportunities to better serve the public.`,
        format: {
            results: [
                {
                    filename: "savings-enhancements.md",
                    content: "…savings and enhancement details"
                }
            ]
        },
        path: 'costing'
    },

    {
        key: 'security-controls',
        task: `Write a set of ITSG - 33 security controls. The content field must contain the fields and values for each applicable test.`,
        format: {
            results: [
                {
                    filename: "itsg-controls.json",
                    content: {
                        controls: [
                            { "control name": "value", "control description": "value", "source catalog": "value", "control severity": "value", "application severity description": "value", "other fields...": "value" },
                            { "control name 2": "value", "control description": "value", "source catalog": "value", "control severity": "value", "application severity description": "value" }
                        ]
                    }
                },
            ]
        },
        path: 'auth'
    },

    {
        key: 'oscal-requirements',
        task: `Write specific instructions for adapting the system to use OSCAL, in md format.
Include detailed relevant OSCAL controls, catalogs and profiles and how they apply to the application.`,
        format: {
            results: [
                {
                    filename: "oscal-requirements.md",
                    content: "Outline of controls …"
                }
            ]
        },
        path: 'auth'
    },

    {
        key: 'saarules',
        task: `Write a set of security acceptance and authorization(SA & A) rules. Include applicable SA & A rules from the NIST 800 - 53 catalog, along with any required mitigations.
The content field must contain the fields for each applicable rule.`,
        format: {
            results: [
                {
                    filename: "saarules.json",
                    content: {
                        rules: [
                            {
                                "rule name": "rule description",
                                "another rule name": "rule description"
                            }
                        ]
                    }
                }
            ]
        },
        path: 'auth'
    },
    {
        key: 'impact-assessment',
        task: `Write an impact assessment in terms of accessibility, cultural and language translation, environmental impact, transparency, free and informed consent, how differently advantaged people might exploit or miss opportunities from it, and privacy.It must include very specific references to the implementation, using IDs or object names when available.
Do not use low level technical details like ${framework}, instead refer to standards and open source and what the low level functionality provides.
Include a section on risks to the hosting organization or how it might create moral hazard for the organization or any participants, including specific mitigations.
Never use passive words like "can," "must," or "should," always be very precise, specific and honest about implementation details that are outlined above, including how they will need human support.`,
        format: {
            results: [
                {
                    filename: "impact.md",
                    content: "The impact assessment for this application is evaluated as follows: …"
                }
            ]
        },
        path: 'auth',
        carry: true
    },

    {
        key: 'authorization',
        task: `Write a very formal and detailed authorization letter, talking about how it was reviewed with specific security people. 
In a separate section, outline and provide a flow of the authorization process that anyone could understand.
Give the application a Canadian protected information and assets level, based on personally identifiable information and impact. 
Say exactly why that level was chosen; based on what data, PII, interactions and impact. Provide examples for each qualifier.

Here are the Levels of protected information and assets:
Protected A: Applies to information or assets that, if compromised, could cause injury to an individual, organization or government.
Protected B: Applies to information or assets that, if compromised, could cause serious injury to an individual, organization or government.
Protected C: Applies to information or assets that, if compromised, could cause extremely grave injury to an individual, organization or government.
`,
        format: {
            results: [
                {
                    "filename": "authorization.md",
                    content: "The application is accepted for Protected B level. The mitigations outlined are ok. I authorize this on behalf of the department."
                }
            ]
        },
        path: 'auth'
    },
    {
        key: 'change-process',
        task: `Write an extremely detailed change management process so the application will be as effective as possible for its end users(members of the general public) in introducing its new ideas and how to best use them.
Include who will be involved in this process, including representation for end users who can't directly be involved in the development process, and how this process will be fair and transparent.`,
        format: {
            results: [
                {
                    filename: "change-process.md",
                    content: "The change management process for this application is as follows: …"
                }
            ]
        },
        path: 'society'
    },

    {
        key: 'pm-proclamation',
        task: `Write a bilingual French and English proclamation as the Prime Minister explaining how this application will help Canadians.`,
        format: {
            results: [
                {
                    filename: "pm-proclamation.md",
                    content: "This application will help Canadians by …"
                }
            ]
        },
        path: 'society'
    },

    {
        key: 'un-proclamation',
        task: `Write a very formal proclamation from the UN Secretary General explaining how this application will affect and relate to the world.`,
        format: {
            results: [
                {
                    filename: "un-proclamation.md",
                    content: "This application will help the world by …"
                }
            ]
        },
        path: 'society'
    },

    {
        key: 'canadian-review',
        task: `Write ten realistic and very different reviews by different Canadian personas, including minority, unusual or extreme ones, of the application.
It could include some of; how it makes them feel about ${organizationType}, how the app could be better, including a personal story about how it would affect them, and how it would help several different friends or family members, or an existing service that is much better. 
Some of the reviews should be very negative. They should all be very different.
`,
        format: {
            results: [
                {
                    filename: "canadian.md",
                    content: "When I used this application, …"
                }
            ]
        },
        path: 'society'
    },

    {
        key: 'opposition-review',
        task: `Write an extremely critical review of the application by the opposition party, including how they would do it better and what it got terribly wrong.`,
        format: {
            results: [
                {
                    filename: "opposition-party.md",
                    content: "The current ${organizationType} blew it again…"
                }
            ]
        },
        path: 'society'
    },

    {
        key: 'es-proclamation',
        task: `Write a review by someone in Estonia, with comparison to specific features of their approaches like e-stonia have existed for decades, of what they think of the application.`,
        format: {
            results: [
                {
                    filename: "es-proclamation.md",
                    content: "My thoughts are …"
                }
            ]
        },
        path: 'society'
    },
    {
        key: 'sa-proclamation',
        task: `Write a review by space aliens that possess unimaginable technology of what they think of the application. 
The space alien review must break the application down detail by detail, and explain how they would make it better.
Include very specific features the aliens find important in an information system.
`,
        format: {
            results: [
                {
                    filename: "sa-proclamation.md",
                    content: "… In comparing our current technology of essential mind-mass information realization transfer to the application, we find that …"
                }
            ]
        },
        path: 'society'
    },
];