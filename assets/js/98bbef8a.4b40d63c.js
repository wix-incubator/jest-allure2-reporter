"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[2535],{3681:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>u,frontMatter:()=>s,metadata:()=>l,toc:()=>c});var r=t(5893),i=t(1151);const s={sidebar_position:7},a="Plugin API",l={id:"api/plugin-api",title:"Plugin API",description:"The Plugin API in jest-allure2-reporter allows you to extend and customize the functionality of Allure reporting. This powerful feature enables you to add custom behaviors, modify existing ones, or integrate with other tools and services.",source:"@site/../docs/api/05-plugin-api.mdx",sourceDirName:"api",slug:"/api/plugin-api",permalink:"/jest-allure2-reporter/api/plugin-api",draft:!1,unlisted:!1,editUrl:"https://github.com/wix-incubator/jest-allure2-reporter/tree/beta/docs/../docs/api/05-plugin-api.mdx",tags:[],version:"current",lastUpdatedBy:"Yaroslav Serhieiev",lastUpdatedAt:1725015775e3,sidebarPosition:7,frontMatter:{sidebar_position:7},sidebar:"apiSidebar",previous:{title:"Test Run",permalink:"/jest-allure2-reporter/api/config/test-run"}},o={},c=[{value:"Overview",id:"overview",level:2},{value:"Plugin Context",id:"plugin-context",level:2},{value:"<code>runtime</code>",id:"runtime",level:3},{value:"<code>handlebars</code>",id:"handlebars",level:3},{value:"<code>contentAttachmentHandlers</code>",id:"contentattachmenthandlers",level:3},{value:"<code>fileAttachmentHandlers</code>",id:"fileattachmenthandlers",level:3},{value:"<code>inferMimeType</code>",id:"infermimetype",level:3},{value:"Examples",id:"examples",level:2},{value:"Custom Attachment Handler",id:"custom-attachment-handler",level:3},{value:"Custom MIME Type Inference",id:"custom-mime-type-inference",level:3},{value:"Adding a Handlebars Helper",id:"adding-a-handlebars-helper",level:3},{value:"Best Practices",id:"best-practices",level:2},{value:"Limitations and Considerations",id:"limitations-and-considerations",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components},{ArticleHeader:t}=n;return t||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("ArticleHeader",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"plugin-api",children:"Plugin API"})}),"\n",(0,r.jsxs)(n.p,{children:["The Plugin API in ",(0,r.jsx)(n.code,{children:"jest-allure2-reporter"})," allows you to extend and customize the functionality of Allure reporting. This powerful feature enables you to add custom behaviors, modify existing ones, or integrate with other tools and services."]}),"\n",(0,r.jsx)(n.h2,{id:"overview",children:"Overview"}),"\n",(0,r.jsx)(t,{}),"\n",(0,r.jsxs)(n.p,{children:["Plugins are registered using the ",(0,r.jsx)(n.code,{children:"allure.$plug()"})," method, which takes a callback function as its argument. This callback receives a context object that provides access to various aspects of the Allure runtime."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"import { allure } from 'jest-allure2-reporter/api';\n\nallure.$plug((context) => {\n  // Plugin implementation\n});\n"})}),"\n",(0,r.jsx)(n.h2,{id:"plugin-context",children:"Plugin Context"}),"\n",(0,r.jsxs)(n.p,{children:["The plugin context (",(0,r.jsx)(n.code,{children:"AllureRuntimePluginContext"}),") provides the following properties and methods:"]}),"\n",(0,r.jsx)(n.h3,{id:"runtime",children:(0,r.jsx)(n.code,{children:"runtime"})}),"\n",(0,r.jsxs)(n.p,{children:["Type: ",(0,r.jsx)(n.code,{children:"IAllureRuntime"})]}),"\n",(0,r.jsxs)(n.p,{children:["Gives access to the ",(0,r.jsx)(n.a,{href:"/jest-allure2-reporter/api/runtime-api",children:"Allure runtime"}),", allowing you to interact with the core Allure functionality."]}),"\n",(0,r.jsx)(n.h3,{id:"handlebars",children:(0,r.jsx)(n.code,{children:"handlebars"})}),"\n",(0,r.jsxs)(n.p,{children:["Type: ",(0,r.jsx)(n.code,{children:"HandlebarsAPI"})]}),"\n",(0,r.jsx)(n.p,{children:"Provides access to the Handlebars templating engine, which can be useful for generating custom content."}),"\n",(0,r.jsx)(n.h3,{id:"contentattachmenthandlers",children:(0,r.jsx)(n.code,{children:"contentAttachmentHandlers"})}),"\n",(0,r.jsxs)(n.p,{children:["Type: ",(0,r.jsx)(n.code,{children:"Record<string, ContentAttachmentHandler>"})]}),"\n",(0,r.jsx)(n.p,{children:"A collection of handlers for content attachments. You can add custom handlers or modify existing ones."}),"\n",(0,r.jsx)(n.h3,{id:"fileattachmenthandlers",children:(0,r.jsx)(n.code,{children:"fileAttachmentHandlers"})}),"\n",(0,r.jsxs)(n.p,{children:["Type: ",(0,r.jsx)(n.code,{children:"Record<string, FileAttachmentHandler>"})]}),"\n",(0,r.jsx)(n.p,{children:"A collection of handlers for file attachments. You can add custom handlers or modify existing ones."}),"\n",(0,r.jsx)(n.h3,{id:"infermimetype",children:(0,r.jsx)(n.code,{children:"inferMimeType"})}),"\n",(0,r.jsxs)(n.p,{children:["Type: ",(0,r.jsx)(n.code,{children:"MIMEInferer"})]}),"\n",(0,r.jsx)(n.p,{children:"A function to infer the MIME type of attachments. You can replace this with a custom implementation if needed."}),"\n",(0,r.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,r.jsx)(n.h3,{id:"custom-attachment-handler",children:"Custom Attachment Handler"}),"\n",(0,r.jsx)(n.p,{children:"Here's an example of how you might use the Plugin API to add a custom attachment handler:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"import { allure } from 'jest-allure2-reporter/api';\n\nallure.$plug((context) => {\n  context.contentAttachmentHandlers['json'] = async ({ content, name, outDir }) => {\n    const jsonContent = JSON.stringify(JSON.parse(content), null, 2);\n    const fileName = `${name}.json`;\n    const filePath = path.join(outDir, fileName);\n\n    await fs.writeFile(filePath, jsonContent);\n\n    return fileName;\n  };\n});\n\n// ...\n\nallure.attachment('{\"key\": \"value\"}', {\n  name: 'my-attachment',\n  type: 'application/json',\n  handler: 'json',\n});\n"})}),"\n",(0,r.jsx)(n.p,{children:"The example above adds a new content attachment handler for 'json' type.\nIt prettifies JSON content before saving it as an attachment."}),"\n",(0,r.jsxs)(n.p,{children:["If you have a handler for one time use, you can pass it as a function to ",(0,r.jsx)(n.code,{children:"handler"})," option:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"allure.fileAttachment('my-file.txt', {\n  type: 'application/json',\n  handler: async (context) => {\n    /* your handler code */\n    return fileName;\n  },\n});\n"})}),"\n",(0,r.jsx)(n.h3,{id:"custom-mime-type-inference",children:"Custom MIME Type Inference"}),"\n",(0,r.jsx)(n.p,{children:"You can also customize how MIME types are inferred for attachments:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"import { allure } from 'jest-allure2-reporter/api';\n\nallure.$plug((context) => {\n  context.inferMimeType = ({ sourcePath, content }) => {\n    const mimeType = 'application/vnd.allure.image.diff';\n\n    if (sourcePath && sourcePath.endsWith('.screenshot.json'))\n      return mimeType;\n\n    if (content && content.expected && content.actual && content.diff)\n      return mimeType;\n\n    return undefined; // use default inference\n  };\n});\n"})}),"\n",(0,r.jsx)(n.h3,{id:"adding-a-handlebars-helper",children:"Adding a Handlebars Helper"}),"\n",(0,r.jsxs)(n.p,{children:["The Plugin API allows you to extend the Handlebars templating engine used by ",(0,r.jsx)(n.code,{children:"jest-allure2-reporter"}),".\nThis can be particularly useful for customizing how information is displayed in your reports."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"import { allure, Step } from 'jest-allure2-reporter/api';\n\n// Register the plugin\nallure.$plug((context) => {\n  // Add a custom Handlebars helper\n  context.handlebars.registerHelper('uppercase', function(str) {\n    return str.toUpperCase();\n  });\n});\n\n// Use the custom helper in a step\nclass TestHelper {\n  @Step('Perform {{uppercase action}}', ['action'])\n  performAction(action) {\n    // Perform the action\n    console.log(`Performing action: ${action}`);\n  }\n}\n\n// In your test\ntest('Custom Handlebars helper example', () => {\n  const helper = new TestHelper();\n  helper.performAction('click');\n});\n"})}),"\n",(0,r.jsx)(n.p,{children:'This will result in a step in your Allure report with the name "Perform action: CLICK" instead of "Perform action: click".'}),"\n",(0,r.jsx)(n.p,{children:"Using custom Handlebars helpers like this allows you to format and manipulate the text in your step names, descriptions, and other areas where Handlebars templates are used in Allure reporting. This can lead to more readable and informative reports, especially when dealing with complex test scenarios or when you want to highlight certain information in your steps."}),"\n",(0,r.jsx)(n.h2,{id:"best-practices",children:"Best Practices"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Avoid Side Effects"}),": Your plugins should not have unintended side effects on the test execution or reporting process."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Error Handling"}),": Implement proper error handling in your plugins to prevent crashes or unexpected behavior."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Performance"}),": Be mindful of the performance impact of your plugins, especially for large test suites."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Documentation"}),": If you're creating plugins for others to use, provide clear documentation on how to use and configure them."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"limitations-and-considerations",children:"Limitations and Considerations"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"The Plugin API is powerful but should be used judiciously. Overusing or misusing plugins can lead to complex and hard-to-maintain test setups."}),"\n",(0,r.jsx)(n.li,{children:"Be aware of potential conflicts between multiple plugins. If you're using multiple plugins, ensure they don't interfere with each other."}),"\n",(0,r.jsxs)(n.li,{children:["The Plugin API is subject to change in future versions of ",(0,r.jsx)(n.code,{children:"jest-allure2-reporter"}),". Always refer to the latest documentation when upgrading."]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Remember to use this feature responsibly and in alignment with your team's testing and reporting strategies."})]})}function u(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>l,a:()=>a});var r=t(7294);const i={},s=r.createContext(i);function a(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);