
// const task = `A simple, fully functional multilingual (including French and English) Government web app that lets a person easily connect to a service, enter an identifier, and receive a globally unique, anonymous, cross-government service workflow identitier for extremely private processes like immigration or healthcare. The identifier can be used to follow up or check on current process consistently, but it must not be identifiable on its own. The identifier must not be associated with their identity. The app service must then upload a file with the identifiers to list of services, and receive a response.`;
// const task = `A web based application using Material that will let a user step through building an application using an AI. 
// For each step, a request will be submitted in the back end to an AI, which will return a response, which will be validated to see if it is well formed and passes specific tests. 
// If it doesn't, the result will be displayed, and it will be re-submitted. 
// If it passes, the application will go to the next task. The web page will also display summaries and suggestions provided by the AI at each step.
// The application should be fully functional, easy to use, accessible, and attractive. It should fully multilingual.
// const task = `A web service that helps people navigate the refugee process, including irregular migrants, by describing each step in different level of detail, with an AI assistant and live operators. 
// It should include guidance for safe entry, and avoiding detention.
// It includes live stats and key indicators
// The service must be very private and secure, and to help end users track the process of individuals.`;
export const overallTask = `A web Dashboard that provides actual live otters (not video or pictures but real touchable furry otters with smells) with real turbulence that the user can interact with.`;
//   export const overallTask = `An HTML5 page that queries a location for an index of JSON files which will be used to create a list of links. 
// Any file called "latest-pr.json" should use a "link" field for a link to the latest deployed PR, and a "title" field for the title of the PR.
// Any file that starts with "review-" should use the "link" and "title" fields to be added to a list of e2e test reviews links.
// If there are no PR or review files, the page should display a message saying there are no files of that type.
// `;

const xoverallTask = `A new Open Source web site to connect public servants, experts, and members of the public. They can connect to each other, and discuss topics. 
Although the system is implemented using abstracted vendor tech, strictly avoiding proprietary components. It must outline where any proprietary elements are included , and why.
A key feature is the site uses the graph database to indicate relationships between people and discussions, and also to organize information so it can be subscribed to at different levels.
The site uses open, portable Linked Data, which emphasises re-usability, portability and provenance, so people can use it in their own databases, or use it with their own algorithms.
The site will be designed with as few as possible unique features, and instead will use existing, well known, open source components, and integrate them using Linked Data. 
Rather than creating many different types of interactions, the same pattern of data and interactions will be used for all features, so that the site is easy to use and understand.
Every aspect of the application must be graphable using consistent Haibun identifiers, so that the concept, data, service, interfaces and elements, browser, user and government planes can be viewed together or by perspective.
The application can also query other information sources using Linked Data, and integrate the results.
Describe specific AI features that be integrated into the site to benefit end users, like sentiment analysis, summarization and topic maps, and a mechanism for users to moderate the results alongside other content.
The AI features will especially help to cluster content, but a beautiful and accessible visual interface will make it easy to dive into clustered content and reorganize it according to different perspectives.

Subscriptions are an extremely important part of the site. They can be very finely or coarsely created and shared or "forked."
Users can be notified of subscription changes using a variety of methods, and can subscribe to other users' subscriptions, and since every content type can be built on, form conversation groups around them.

All Typescript libraries for the application will be designed for re-use throughout the application, and in end user applications that can run standalone in browsers.

All help is integrated into the application at the component level using Haibun identifiers, with AI and discussion support at the component level. There is no need for a help page or manual.

All data, whether queried, human entered, or AI supplied, must be referenced by a known site, must be assigned provenance and a Haibun identifier, and graphable.
Features like upvoting and downvoting are not used, instead users must provide sentiment comments such as "support," "disagree," and these tags must include citations and user comments. 
The sentiment tags can also be commented on.
Use OpenID Connect, Decentralized Identifiers and Fediverse protocols for authorization. The site itself has no "create account" feature.
After logging in and when using Decentralized Identifiers, the site can also be used pseudonymously, including creating data. 
A moderation scheme allows any user to evaluate content, and users can adopt combinations of other user moderations.
The site must initially support hundreds of thousands of users, with tens of thousands of simultæneous requests.
This site will replace an existing site based on forum software. Highlight in all relevant writeups how the new site will provide contemporary, user friendly features suitable for a government-citizen portal.
All elements of the site can be developed using the outlined process, with users chosing their own transparent moderation scheme.
Include in relevant sections how the application can scale to millions of users.
For all content, use formal Government language, but avoid confusing phrases or words.
`;