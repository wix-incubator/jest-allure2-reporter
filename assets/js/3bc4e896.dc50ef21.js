"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[1431],{6310:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>a,contentTitle:()=>l,default:()=>p,frontMatter:()=>i,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"api/index","title":"Exports","description":"The jest-allure2-reporter package provides several entry points to enhance your Jest testing experience with Allure reporting capabilities.","source":"@site/../docs/api/index.mdx","sourceDirName":"api","slug":"/api","permalink":"/jest-allure2-reporter/api","draft":false,"unlisted":false,"editUrl":"https://github.com/wix-incubator/jest-allure2-reporter/tree/master/docs/../docs/api/index.mdx","tags":[],"version":"current","lastUpdatedBy":"Yaroslav Serhieiev","lastUpdatedAt":1730882347000,"sidebarPosition":1,"frontMatter":{"sidebar_position":1,"slug":"/api"},"sidebar":"apiSidebar","next":{"title":"Docblocks","permalink":"/jest-allure2-reporter/api/docblocks"}}');var s=n(4848),o=n(8453);const i={sidebar_position:1,slug:"/api"},l="Exports",a={},c=[{value:"Main Entry Point",id:"main-entry-point",level:2},{value:"<code>jest-allure2-reporter</code>",id:"jest-allure2-reporter",level:3},{value:"API Entry Point",id:"api-entry-point",level:2},{value:"<code>jest-allure2-reporter/api</code>",id:"jest-allure2-reporterapi",level:3},{value:"Global Typings",id:"global-typings",level:3},{value:"Environment Packages",id:"environment-packages",level:2},{value:"<code>jest-allure2-reporter/environment-node</code>",id:"jest-allure2-reporterenvironment-node",level:3},{value:"<code>jest-allure2-reporter/environment-jsdom</code>",id:"jest-allure2-reporterenvironment-jsdom",level:3},{value:"<code>jest-allure2-reporter/environment-decorator</code>",id:"jest-allure2-reporterenvironment-decorator",level:3}];function d(e){const r={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components},{ArticleHeader:n}=r;return n||function(e,r){throw new Error("Expected "+(r?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("ArticleHeader",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r.header,{children:(0,s.jsx)(r.h1,{id:"exports",children:"Exports"})}),"\n",(0,s.jsxs)(r.p,{children:["The ",(0,s.jsx)(r.code,{children:"jest-allure2-reporter"})," package provides several entry points to enhance your Jest testing experience with Allure reporting capabilities."]}),"\n",(0,s.jsx)(r.h2,{id:"main-entry-point",children:"Main Entry Point"}),"\n",(0,s.jsx)(n,{}),"\n",(0,s.jsx)(r.h3,{id:"jest-allure2-reporter",children:(0,s.jsx)(r.code,{children:"jest-allure2-reporter"})}),"\n",(0,s.jsx)(r.p,{children:"The core reporter module for collecting test results and generating Allure reports."}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-javascript",metastring:'title="jest.config.js"',children:"/** @type {import('@jest/types').Config.InitialOptions} */\nmodule.exports = {\n  // ...other Jest configurations\n  reporters: [\n    'default',\n    ['jest-allure2-reporter',\n      /** @type {import('jest-allure2-reporter').ReporterOptions} */\n      {\n        // Reporter options go here\n      }\n    ]\n  ],\n};\n"})}),"\n",(0,s.jsxs)(r.p,{children:["For detailed configuration options, see the ",(0,s.jsx)(r.a,{href:"/jest-allure2-reporter/api/config/",children:"Configuration Guide"}),"."]}),"\n",(0,s.jsx)(r.p,{children:"You can extend this class to customize the reporting behavior:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-javascript",children:"import { execa } from 'execa';\nimport JestAllure2Reporter from 'jest-allure2-reporter';\n\nclass CustomizedJestAllure2Reporter extends JestAllure2Reporter {\n  async onRunComplete(contexts, results) {\n    await super.onRunComplete(contexts, results);\n    // Illustrative example: Generate Allure report after test run\n    await execa('allure', ['generate', '--clean']);\n  }\n}\n"})}),"\n",(0,s.jsxs)(r.p,{children:["The main entry point also exports the ",(0,s.jsx)(r.code,{children:"ReporterOptions"})," type for TypeScript users, so you\ncan define presets and configurations with type safety:"]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"import type { ReporterOptions } from 'jest-allure2-reporter';\n\nexport const myPreset1: ReporterOptions = {\n  resultsDir: 'artifacts/allure-results',\n  testCase: {\n    // ...\n  },\n};\n"})}),"\n",(0,s.jsx)(r.h2,{id:"api-entry-point",children:"API Entry Point"}),"\n",(0,s.jsx)(r.h3,{id:"jest-allure2-reporterapi",children:(0,s.jsx)(r.code,{children:"jest-allure2-reporter/api"})}),"\n",(0,s.jsx)(r.p,{children:"This module exports functions and objects for enhancing your tests with Allure metadata and runtime capabilities."}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-javascript",children:"import {\n  $Description,\n  $Link,\n  $Owner,\n  allure,\n  Attachment,\n  Step\n} from 'jest-allure2-reporter/api';\n"})}),"\n",(0,s.jsx)(r.p,{children:"Key exports include:"}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsxs)(r.li,{children:[(0,s.jsx)(r.a,{href:"/jest-allure2-reporter/api/annotations",children:"Annotations"}),": Functions like ",(0,s.jsx)(r.code,{children:"$Description"}),", ",(0,s.jsx)(r.code,{children:"$Link"}),", ",(0,s.jsx)(r.code,{children:"$Owner"})," for adding metadata to your tests."]}),"\n",(0,s.jsxs)(r.li,{children:[(0,s.jsx)(r.a,{href:"/jest-allure2-reporter/api/decorators",children:"Decorators"}),": ",(0,s.jsx)(r.code,{children:"@Attachment"})," and ",(0,s.jsx)(r.code,{children:"@Step"})," for enhancing class-based test drivers."]}),"\n",(0,s.jsxs)(r.li,{children:[(0,s.jsx)(r.a,{href:"/jest-allure2-reporter/api/runtime-api",children:"Runtime API"}),": The ",(0,s.jsx)(r.code,{children:"allure"})," object for interacting with Allure during test execution."]}),"\n"]}),"\n",(0,s.jsxs)(r.p,{children:["If you prefer not to use imports, you can use the global typings provided by ",(0,s.jsx)(r.code,{children:"jest-allure2-reporter/globals"}),"."]}),"\n",(0,s.jsx)(r.h3,{id:"global-typings",children:"Global Typings"}),"\n",(0,s.jsxs)(r.p,{children:["For TypeScript projects, you can add Allure types globally by including them in your ",(0,s.jsx)(r.code,{children:"tsconfig.json"}),":"]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-js",children:'{\n  "compilerOptions": {\n    "types": ["jest-allure2-reporter/globals"]\n  }\n}\n'})}),"\n",(0,s.jsx)(r.p,{children:"Alternatively, you can import them directly somewhere in your test files:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-typescript",children:"import 'jest-allure2-reporter/globals';\n"})}),"\n",(0,s.jsx)(r.h2,{id:"environment-packages",children:"Environment Packages"}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.a,{href:"https://jestjs.io/docs/configuration#testenvironment-string",children:"Jest test environments"})," provide the context in which tests are run: ",(0,s.jsx)(r.code,{children:"node"}),", ",(0,s.jsx)(r.code,{children:"jsdom"}),", or custom environments."]}),"\n",(0,s.jsxs)(r.p,{children:["Custom environments are crucial for ",(0,s.jsx)(r.code,{children:"jest-allure2-reporter"})," as they enable the collection of detailed metadata and ensure that annotations, runtime API calls, and decorators can pass information to the reporter \u2014 usually this happens through interprocess communication (IPC) since Jest spawns separate worker processes for each test file, and there are no built-in mechanisms for sharing custom data between workers and the main process."]}),"\n",(0,s.jsxs)(r.p,{children:["Although ",(0,s.jsx)(r.code,{children:"jest-allure2-reporter"})," technically works with the default Jest environments, the produced reports will be less informative and lacking custom metadata. To get the most out of Allure, you should use one of the provided custom environments."]}),"\n",(0,s.jsx)(r.h3,{id:"jest-allure2-reporterenvironment-node",children:(0,s.jsx)(r.code,{children:"jest-allure2-reporter/environment-node"})}),"\n",(0,s.jsxs)(r.p,{children:["\u2b50 ",(0,s.jsx)(r.strong,{children:"Recommended choice"}),"."]}),"\n",(0,s.jsx)(r.p,{children:"This test environment is designed to work with Node.js tests and Allure."}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-javascript",children:"// jest.config.js\nmodule.exports = {\n  testEnvironment: 'jest-allure2-reporter/environment-node',\n  // ...\n};\n"})}),"\n",(0,s.jsx)(r.h3,{id:"jest-allure2-reporterenvironment-jsdom",children:(0,s.jsx)(r.code,{children:"jest-allure2-reporter/environment-jsdom"})}),"\n",(0,s.jsx)(r.p,{children:"A Jest environment for browser-like tests using jsdom, with Allure support."}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-javascript",children:"// jest.config.js\nmodule.exports = {\n  testEnvironment: 'jest-allure2-reporter/environment-jsdom',\n  // ...\n};\n"})}),"\n",(0,s.jsx)(r.h3,{id:"jest-allure2-reporterenvironment-decorator",children:(0,s.jsx)(r.code,{children:"jest-allure2-reporter/environment-decorator"})}),"\n",(0,s.jsx)(r.p,{children:"A utility for creating custom Jest environments with Allure support."}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-javascript",metastring:'title="custom-allure-environment.js"',children:"import allureDecorator from 'jest-allure2-reporter/environment-decorator';\nimport JestEnvironmentCustom from './JestEnvironmentCustom';\n\nexport default allureDecorator(JestEnvironmentCustom);\n"})}),"\n",(0,s.jsxs)(r.p,{children:["This is useful for non-standard test environments where you need to bring Allure capabilities in.\nFor more information on custom environments, see the ",(0,s.jsx)(r.a,{href:"https://jestjs.io/docs/configuration#testenvironment-string",children:"Jest documentation"}),"."]})]})}function p(e={}){const{wrapper:r}={...(0,o.R)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,r,n)=>{n.d(r,{R:()=>i,x:()=>l});var t=n(6540);const s={},o=t.createContext(s);function i(e){const r=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function l(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),t.createElement(o.Provider,{value:r},e.children)}}}]);