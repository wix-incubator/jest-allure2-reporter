"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[4308],{5783:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>c,toc:()=>d});var s=t(5893),i=t(1151);const a={sidebar_position:2},r="Docblocks",c={id:"api/docblocks",title:"Docblocks",description:"Docblocks cannot be applied to describe statements.",source:"@site/../docs/api/01-docblocks.mdx",sourceDirName:"api",slug:"/api/docblocks",permalink:"/jest-allure2-reporter/api/docblocks",draft:!1,unlisted:!1,editUrl:"https://github.com/wix-incubator/jest-allure2-reporter/tree/beta/docs/../docs/api/01-docblocks.mdx",tags:[],version:"current",lastUpdatedBy:"Yaroslav Serhieiev",lastUpdatedAt:1726058876e3,sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"apiSidebar",previous:{title:"Exports",permalink:"/jest-allure2-reporter/api"},next:{title:"Annotations",permalink:"/jest-allure2-reporter/api/annotations"}},o={},d=[{value:"Plain comments",id:"plain-comments",level:2},{value:"<code>@description</code> / <code>@desc</code>",id:"description--desc",level:2},{value:"<code>@descriptionHtml</code>",id:"descriptionhtml",level:2},{value:"<code>@displayName</code>",id:"displayname",level:2},{value:"<code>@fullName</code>",id:"fullname",level:2},{value:"<code>@historyId</code>",id:"historyid",level:2},{value:"<code>@issue</code>",id:"issue",level:2},{value:"<code>@owner</code>",id:"owner",level:2},{value:"<code>@package</code>",id:"package",level:2},{value:"<code>@severity</code>",id:"severity",level:2},{value:"<code>@epic</code>, <code>@feature</code>, <code>@story</code>",id:"epic-feature-story",level:2},{value:"<code>@tag</code>",id:"tag",level:2},{value:"<code>@thread</code>",id:"thread",level:2},{value:"<code>@tms</code>",id:"tms",level:2},{value:"<code>@url</code>",id:"url",level:2},{value:"<code>@parentSuite</code>, <code>@suite</code>, <code>@subSuite</code>",id:"parentsuite-suite-subsuite",level:2}];function l(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,i.a)(),...e.components},{ArticleHeader:t}=n;return t||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("ArticleHeader",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"docblocks",children:"Docblocks"})}),"\n",(0,s.jsx)(n.admonition,{type:"info",children:(0,s.jsxs)(n.p,{children:["Docblocks cannot be applied to ",(0,s.jsx)(n.code,{children:"describe"})," statements.\nIf you want to apply a docblock to all tests in the file,\nyou can put it on the first line of the file."]})}),"\n",(0,s.jsxs)(n.p,{children:["Docblocks (JSDoc-style comments) are the least intrusive way to add metadata to your tests.\nThese annotations get parsed by ",(0,s.jsx)(n.code,{children:"jest-allure2-reporter"})," and used as a source of information for your test reports."]}),"\n",(0,s.jsx)(n.h2,{id:"plain-comments",children:"Plain comments"}),"\n",(0,s.jsx)(t,{}),"\n",(0,s.jsxs)(n.p,{children:["Plain comments act as ",(0,s.jsx)(n.a,{href:"#description--desc",children:(0,s.jsx)(n.code,{children:"@description"})})," annotations, when applied to a test case."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\n * This test demonstrates the addition operation.\n */\ntest('should add two numbers', () => {\n  expect(1 + 2).toBe(3);\n});\n"})}),"\n",(0,s.jsxs)(n.p,{children:["For hooks, they act as ",(0,s.jsx)(n.a,{href:"#displayname",children:(0,s.jsx)(n.code,{children:"@displayName"})})," annotations."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\n * Navigate to the home page\n */\nbeforeEach(async () => {\n  await page.goto('https://example.com');\n});\n"})}),"\n",(0,s.jsxs)(n.h2,{id:"description--desc",children:[(0,s.jsx)(n.code,{children:"@description"})," / ",(0,s.jsx)(n.code,{children:"@desc"})]}),"\n",(0,s.jsx)(n.p,{children:"Adds a Markdown description to a test case."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\n * @description\n * This test demonstrates the addition operation.\n */\ntest('should add two numbers', () => {\n  expect(1 + 2).toBe(3);\n});\n"})}),"\n",(0,s.jsx)(n.h2,{id:"descriptionhtml",children:(0,s.jsx)(n.code,{children:"@descriptionHtml"})}),"\n",(0,s.jsx)(n.p,{children:"Adds an HTML description to a test case."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\n * @descriptionHtml\n * This test demonstrates the <code>-</code> operator.\n */\ntest('should subtract two numbers', () => {\n  expect(2 - 1).toBe(1);\n});\n"})}),"\n",(0,s.jsx)(n.h2,{id:"displayname",children:(0,s.jsx)(n.code,{children:"@displayName"})}),"\n",(0,s.jsxs)(n.p,{children:["Overrides test names specified in ",(0,s.jsx)(n.code,{children:"test('...')"})," or ",(0,s.jsx)(n.code,{children:"it('...')"})," in the test report."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\n * @displayName 1 + 1 = 2\n */\ntest('First test', () => {\n  expect(1 + 1).toBe(2);\n});\n"})}),"\n",(0,s.jsxs)(n.p,{children:["When applied to a hook, it sets a custom display name for the hook, similar to a ",(0,s.jsx)(n.a,{href:"#plain-comments",children:"plain comment"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:'/**\n * @displayName Custom "beforeEach" hook\n */\nbeforeEach(() => {\n  // Hook implementation\n});\n'})}),"\n",(0,s.jsx)(n.h2,{id:"fullname",children:(0,s.jsx)(n.code,{children:"@fullName"})}),"\n",(0,s.jsx)(n.p,{children:"Sets a full name for a test case, which can be used for more detailed identification.\nBy default, full names are also used for tracking test history across multiple runs or retries."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\n * @fullName Arithmetic > Addition > Valid assertion\n */\ntest('First test', () => {\n  expect(1 + 1).toBe(2);\n});\n"})}),"\n",(0,s.jsx)(n.h2,{id:"historyid",children:(0,s.jsx)(n.code,{children:"@historyId"})}),"\n",(0,s.jsx)(n.p,{children:"Assigns a custom history ID to a test case, useful for tracking test history across multiple runs or retries."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\n * @historyId HISTORY-2\n */\ntest('First test', () => {\n  expect(2 + 2).toBe(3);\n});\n"})}),"\n",(0,s.jsx)(n.h2,{id:"issue",children:(0,s.jsx)(n.code,{children:"@issue"})}),"\n",(0,s.jsx)(n.p,{children:"Links an issue to a test case."}),"\n",(0,s.jsx)(n.p,{children:"For an individual test:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\n * @issue XMLRPC-15\n */\ntest('Proving the fix', () => {\n  expect(1 + 1).toBe(2);\n});\n"})}),"\n",(0,s.jsx)(n.p,{children:"For all tests in the file, put the docblock at the very top:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\n * @issue XMLRPC-15\n */\n\n// Rest of your test file...\n"})}),"\n",(0,s.jsx)(n.h2,{id:"owner",children:(0,s.jsx)(n.code,{children:"@owner"})}),"\n",(0,s.jsx)(n.p,{children:"Specifies the owner of a test or suite."}),"\n",(0,s.jsx)(n.p,{children:"For an individual test:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\n * @owner John Doe\n */\ntest('Test maintained by John', () => {\n  // Test implementation\n});\n"})}),"\n",(0,s.jsx)(n.p,{children:"For all tests in the file:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\n * @owner John Doe\n */\n\n// Rest of your test file...\n"})}),"\n",(0,s.jsx)(n.h2,{id:"package",children:(0,s.jsx)(n.code,{children:"@package"})}),"\n",(0,s.jsx)(n.p,{children:"Specifies the package for a test or suite, useful for organizing tests."}),"\n",(0,s.jsx)(n.p,{children:"For an individual test:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\n * @package e2e.pragmas\n */\ntest('should log a message', () => {\n  // Test implementation\n});\n"})}),"\n",(0,s.jsx)(n.p,{children:"For all tests in the file:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\n * @package e2e.my-tests\n */\n\n// Rest of your test file...\n"})}),"\n",(0,s.jsx)(n.h2,{id:"severity",children:(0,s.jsx)(n.code,{children:"@severity"})}),"\n",(0,s.jsx)(n.p,{children:"Sets the severity level for a test or suite."}),"\n",(0,s.jsx)(n.p,{children:"For an individual test:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\n * @severity critical\n */\ntest('Important test', () => {\n  expect(1 + 1).toBe(2);\n});\n"})}),"\n",(0,s.jsx)(n.p,{children:"For all tests in the file:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\n * @severity critical\n */\n\n// Rest of your test file...\n"})}),"\n",(0,s.jsxs)(n.h2,{id:"epic-feature-story",children:[(0,s.jsx)(n.code,{children:"@epic"}),", ",(0,s.jsx)(n.code,{children:"@feature"}),", ",(0,s.jsx)(n.code,{children:"@story"})]}),"\n",(0,s.jsx)(n.p,{children:"Categorizes tests into epics and features for better organization."}),"\n",(0,s.jsx)(n.p,{children:"Example:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\n * @epic Arithmetic operations\n * @feature Addition\n */\n\n// Rest of your test file...\n\n/**\n * @story Sane assumptions\n */\ntest('1 + 1 should equal 2', () => {\n  expect(1 + 1).toBe(2);\n});\n"})}),"\n",(0,s.jsx)(n.h2,{id:"tag",children:(0,s.jsx)(n.code,{children:"@tag"})}),"\n",(0,s.jsx)(n.p,{children:"Adds tags to a test or suite."}),"\n",(0,s.jsx)(n.p,{children:"For an individual test:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\n * @tag arithmetic, addition\n */\ntest('First test', () => {\n  expect(1 + 1).toBe(2);\n});\n"})}),"\n",(0,s.jsx)(n.p,{children:"For all tests in the file:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\n * @tag arithmetic\n */\n\n// Rest of your test file...\n"})}),"\n",(0,s.jsx)(n.h2,{id:"thread",children:(0,s.jsx)(n.code,{children:"@thread"})}),"\n",(0,s.jsxs)(n.p,{children:["Specifies a custom thread for concurrent tests.\nDo not use it unless you want to control tests on the ",(0,s.jsx)(n.a,{href:"#TODO",children:"Timeline"})," manually."]}),"\n",(0,s.jsx)(n.p,{children:"For an individual test:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\n * @thread IV\n */\ntest('Concurrent test', () => {\n  expect(1 + 1).toBe(2);\n});\n"})}),"\n",(0,s.jsx)(n.p,{children:"For all tests in the file:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\n * @thread IV\n */\n\n// Rest of your test file...\n"})}),"\n",(0,s.jsx)(n.h2,{id:"tms",children:(0,s.jsx)(n.code,{children:"@tms"})}),"\n",(0,s.jsx)(n.p,{children:"Links a test management system (TMS) case to a test."}),"\n",(0,s.jsx)(n.p,{children:"For an individual test:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\n * @tms TMS-1234\n */\ntest('should be linked to a TMS ticket', () => {\n  expect(1 + 1).toBe(2);\n});\n"})}),"\n",(0,s.jsx)(n.p,{children:"For all tests in the file:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\n * @tms TMS-1234\n */\n\n// Rest of your test file...\n"})}),"\n",(0,s.jsx)(n.h2,{id:"url",children:(0,s.jsx)(n.code,{children:"@url"})}),"\n",(0,s.jsx)(n.p,{children:"Adds a custom URL link to a test or suite."}),"\n",(0,s.jsx)(n.p,{children:"For an individual test:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\n * @url https://en.wikipedia.org/wiki/Addition \u2795 Addition\n */\ntest('1 + 1 = 2', () => {\n  expect(1 + 1).toBe(2);\n});\n"})}),"\n",(0,s.jsx)(n.p,{children:"For all tests in the file:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\n * @url https://en.wikipedia.org/wiki/Arithmetic \ud83d\udd22 Arithmetic\n */\n\n// Rest of your test file...\n"})}),"\n",(0,s.jsxs)(n.h2,{id:"parentsuite-suite-subsuite",children:[(0,s.jsx)(n.code,{children:"@parentSuite"}),", ",(0,s.jsx)(n.code,{children:"@suite"}),", ",(0,s.jsx)(n.code,{children:"@subSuite"})]}),"\n",(0,s.jsx)(n.p,{children:"Organizes tests into a hierarchical suite structure."}),"\n",(0,s.jsx)(n.p,{children:"Example:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"/**\n * @parentSuite Custom Parent Suite\n */\n\n// ...\n\n/**\n * @suite Custom Suite\n * @subSuite Custom Sub-Suite\n */\ntest('Test with custom suite hierarchy', () => {\n  // Test implementation\n});\n"})}),"\n",(0,s.jsx)(n.p,{children:"These docblock annotations provide a powerful way to enrich your tests with metadata, improving the organization and readability of your Allure reports. By using these annotations, you can create more informative and structured test reports that help in better understanding and maintaining your test suite."})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>c,a:()=>r});var s=t(7294);const i={},a=s.createContext(i);function r(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);