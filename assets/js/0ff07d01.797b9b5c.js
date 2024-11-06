"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[5131],{8261:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>A,contentTitle:()=>a,default:()=>c,frontMatter:()=>i,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"docs/config/history","title":"History","description":"Monitor long-term trends in your test execution.","source":"@site/../docs/docs/config/06-history.mdx","sourceDirName":"docs/config","slug":"/docs/config/history","permalink":"/jest-allure2-reporter/docs/config/history","draft":false,"unlisted":false,"editUrl":"https://github.com/wix-incubator/jest-allure2-reporter/tree/master/docs/../docs/docs/config/06-history.mdx","tags":[],"version":"current","lastUpdatedBy":"Yaroslav Serhieiev","lastUpdatedAt":1714818852000,"sidebarPosition":6,"frontMatter":{"description":"Monitor long-term trends in your test execution."},"sidebar":"docsSidebar","previous":{"title":"Executor","permalink":"/jest-allure2-reporter/docs/config/executor"},"next":{"title":"Error handling \ud83d\udea7","permalink":"/jest-allure2-reporter/docs/config/errors"}}');var n=r(4848),o=r(8453);const i={description:"Monitor long-term trends in your test execution."},a="History",A={},l=[{value:"Test Retries",id:"test-retries",level:2},{value:"Trends",id:"trends",level:2},{value:"Test Case ID",id:"test-case-id",level:2},{value:"Keeping History",id:"keeping-history",level:2},{value:"Automating History",id:"automating-history",level:2},{value:"Summary",id:"summary",level:2}];function d(e){const t={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",header:"header",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",section:"section",strong:"strong",sup:"sup",ul:"ul",...(0,o.R)(),...e.components},{ArticleHeader:s,Details:i}=t;return s||h("ArticleHeader",!0),i||h("Details",!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.header,{children:(0,n.jsx)(t.h1,{id:"history",children:"History"})}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"History",src:r(741).A+"",width:"2048",height:"1200"})}),"\n",(0,n.jsxs)(t.p,{children:["One of notable features of Allure 2 is the ability to monitor ",(0,n.jsx)(t.em,{children:"test retries"})," and ",(0,n.jsx)(t.em,{children:"long-term trends"})," in your test execution.\nThis is an easy way to spot flaky tests and track the overall health of your test suite.\nWe'll discuss each of these features in detail below."]}),"\n",(0,n.jsx)(t.h2,{id:"test-retries",children:"Test Retries"}),"\n",(0,n.jsx)(s,{}),"\n",(0,n.jsxs)(t.p,{children:["Jest provides a feature called ",(0,n.jsx)(t.a,{href:"https://jestjs.io/docs/jest-object#jestretrytimesnumretries-options",children:(0,n.jsx)(t.code,{children:"jest.retryTimes(n)"})})," \u2014\nthis is useful when your tests or your test environment are not reliable enough, and you want\nto run each failed test multiple times hoping that it will pass eventually."]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"Retries",src:r(2890).A+"",width:"2048",height:"1200"})}),"\n",(0,n.jsxs)(t.p,{children:["The test retry feature is automatically enabled with ",(0,n.jsx)(t.code,{children:"jest-allure2-reporter"}),", requiring no additional configuration on your part."]}),"\n",(0,n.jsxs)(t.p,{children:["If some of your tests didn't pass on the first time, you'll\nsee ",(0,n.jsx)("img",{src:r(2586).A,width:22,alt:"a retry icon"}),"\nimmediately in the reports. Inside ",(0,n.jsx)(t.strong,{children:"Retries"})," tab you can click on the previous recorded attempts\nand inspect all the necessary details of their execution."]}),"\n",(0,n.jsxs)(t.admonition,{type:"tip",children:[(0,n.jsxs)(t.p,{children:["If you attempt to retry your tests using unconventional methods, such as\nrunning ",(0,n.jsx)(t.code,{children:"jest"})," multiple times, you'll need to make sure that you don't delete the\n",(0,n.jsx)(t.code,{children:"allure-results"})," directory between the runs:"]}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",metastring:'title="jest.config.js"',children:"/** @type {import('@jest/types').Config.InitialOptions} */\nmodule.exports = {\n  // ...\n  reporters: [\n    // ...\n    ['jest-allure2-reporter', {\n// highlight-next-line\n      overwriteResultsDir: false,\n    }]\n  ],\n};\n"})}),(0,n.jsxs)(t.p,{children:["Still, this is not a recommended way to do it due to performance reasons and potential conflicts\nwith ",(0,n.jsx)(t.a,{href:"/jest-allure2-reporter/docs/config/executor",children:"Executor"})," and ",(0,n.jsx)(t.a,{href:"/jest-allure2-reporter/docs/config/environment",children:"Environment"})," information, which are not designed to be collected multiple times."]})]}),"\n",(0,n.jsx)(t.h2,{id:"trends",children:"Trends"}),"\n",(0,n.jsx)("img",{src:r(7802).A,width:398,alt:""}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.em,{children:"Long-term trends"})," are the ability to track test execution history over time and analyze it."]}),"\n",(0,n.jsxs)(t.p,{children:["On the ",(0,n.jsx)(t.strong,{children:"Graphs"})," page, you can see all available trends, and on the ",(0,n.jsx)(t.strong,{children:"Overview"})," page, you can see\nthe ",(0,n.jsx)(t.strong,{children:"History Trend"}),"."]}),"\n",(0,n.jsx)(t.admonition,{type:"tip",children:(0,n.jsxs)(t.p,{children:["All charts are interactive, and you can click on them to see the details of a particular test run,\nprovided that you have configured ",(0,n.jsx)(t.a,{href:"/jest-allure2-reporter/docs/config/executor",children:"Executor"})," information."]})}),"\n",(0,n.jsxs)(i,{children:[(0,n.jsx)("summary",{children:"Click to see all built-in trends"}),(0,n.jsxs)("dl",{children:[(0,n.jsx)("dt",{children:(0,n.jsx)("strong",{children:"History Trend"})}),(0,n.jsxs)("dd",{children:[(0,n.jsx)("img",{src:r(7802).A,width:398,alt:""}),(0,n.jsx)(t.p,{children:"Shows the number of passed and failed tests over time."})]}),(0,n.jsx)("dt",{children:(0,n.jsx)("strong",{children:"Duration trend"})}),(0,n.jsxs)("dd",{children:[(0,n.jsx)("img",{src:r(6780).A,width:398,alt:""}),(0,n.jsx)(t.p,{children:"Shows the average duration of test runs over time."})]}),(0,n.jsx)("dt",{children:(0,n.jsx)("strong",{children:"Retries trend"})}),(0,n.jsxs)("dd",{children:[(0,n.jsx)("img",{src:r(2464).A,width:398,alt:""}),(0,n.jsx)(t.p,{children:"Helps to see whether your tests become more or less reliable over time."})]}),(0,n.jsx)("dt",{children:(0,n.jsx)("strong",{children:"Categories trend"})}),(0,n.jsxs)("dd",{children:[(0,n.jsx)("img",{src:r(9412).A,width:398,alt:""}),(0,n.jsx)(t.p,{children:"Provides a breakdown of test defects by categories."})]})]})]}),"\n",(0,n.jsx)(t.h2,{id:"test-case-id",children:"Test Case ID"}),"\n",(0,n.jsx)(t.p,{children:"To make the history feature work in an environment where tests can be renamed,\nskipped, or moved around, Allure 2 Framework needs a way to identify tests\nacross multiple test runs in the past, present, and future."}),"\n",(0,n.jsxs)(t.p,{children:["The property behind test identification is ",(0,n.jsx)(t.code,{children:"testCaseId"})," \u2014 a unique identifier\ngenerated for each test",(0,n.jsx)(t.sup,{children:(0,n.jsx)(t.a,{href:"#user-content-fn-1",id:"user-content-fnref-1","data-footnote-ref":!0,"aria-describedby":"footnote-label",children:"1"})}),". When Allure 2 framework aggregates reports from multiple\ntest runs in the past, this identifier is the only way to tell which tests are the same,\nand which are different."]}),"\n",(0,n.jsxs)(t.p,{children:["So, when ",(0,n.jsx)(t.strong,{children:"Test A"})," and ",(0,n.jsx)(t.strong,{children:"Test B"})," are considered the same,\nwhat does that ",(0,n.jsx)(t.em,{children:"actually"})," mean? The answer may vary on your project specifics\nand the way you write tests. Ask yourself: are two tests the same..."]}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"if they have the same name but are located in different files?"}),"\n",(0,n.jsx)(t.li,{children:"if they have the same name and file name, but the source code has changed?"}),"\n",(0,n.jsx)(t.li,{children:"if their order of execution is different (e.g. you moved a test a few lines up or down, and now it's executed before another test)?"}),"\n"]}),"\n",(0,n.jsxs)(t.p,{children:["Well, the ",(0,n.jsx)(t.em,{children:"default behavior"})," of ",(0,n.jsx)(t.code,{children:"jest-allure2-reporter"})," is to consider tests the same if they\nare located in the ",(0,n.jsx)(t.em,{children:"same file"})," (relative POSIX path) and have the ",(0,n.jsx)(t.em,{children:"same name"}),".\nThis is the most common case, and it works well for most projects."]}),"\n",(0,n.jsxs)(t.p,{children:["If you want to change this behavior, you can use the ",(0,n.jsx)(t.code,{children:"testCaseId"})," option:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",metastring:'title="jest.config.js"',children:"const { createHash } = require('crypto');\nconst md5 = (data) => createHash('md5').update(data).digest('hex');\n\n/** @type {import('@jest/types').Config.InitialOptions} */\nmodule.exports = {\n  // ...\n  reporters: [\n    // ...\n    ['jest-allure2-reporter', {\n      testCaseId: ({ package, file, test }) => {\n        return md5(`${package.name}:${file.path.posix}:${test.fullName}`);\n      },\n    }]\n  ],\n};\n"})}),"\n",(0,n.jsx)(t.h2,{id:"keeping-history",children:"Keeping History"}),"\n",(0,n.jsx)(t.p,{children:"As much as the history feature sounds awesome, it doesn't work out of the box \u2014\nunless you do some extra work to keep the history files around."}),"\n",(0,n.jsxs)(t.p,{children:["By default, ",(0,n.jsx)(t.code,{children:"allure generate"})," command generates just a single report without any history.\nUpon closer inspection, this isn't entirely accurate.\nWithin the ",(0,n.jsx)(t.code,{children:"allure-report/history"})," directory, the Allure 2 Framework puts a few JSON files\nencapsulating your test execution history:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-plain",children:"categories-trend.json\nduration-trend.json\nhistory-trend.json\nhistory.json\nretry-trend.json\n"})}),"\n",(0,n.jsxs)(t.p,{children:["These history files are important to keep.\nBefore generating the next report, you'll need to copy the history files from the\n",(0,n.jsx)(t.code,{children:"allure-report/history"})," directory of the previous report to the ",(0,n.jsx)(t.code,{children:"allure-results/history"})," directory",(0,n.jsx)(t.sup,{children:(0,n.jsx)(t.a,{href:"#user-content-fn-2",id:"user-content-fnref-2","data-footnote-ref":!0,"aria-describedby":"footnote-label",children:"2"})}),",\ne.g.:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-sh",children:"cp -r allure-report/history allure-results/\n"})}),"\n",(0,n.jsxs)(t.p,{children:["Now, when you run ",(0,n.jsx)(t.code,{children:"allure generate"}),", it will generate a report with the history of the previous run."]}),"\n",(0,n.jsxs)(t.p,{children:["To reiterate, for generating the third report \u2014\nwhich includes the history of the first and second runs \u2014\nonce again, you need to copy ",(0,n.jsx)(t.code,{children:"allure-report/history"})," to ",(0,n.jsx)(t.code,{children:"allure-results/history"}),",\nfollowed by executing the ",(0,n.jsx)(t.code,{children:"allure generate"})," command."]}),"\n",(0,n.jsxs)(t.p,{children:["In other words, it is similar to ",(0,n.jsx)(t.code,{children:"reduce"})," chaining concept:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"function makeReport(allureReportHistory, allureResults) {\n  return // ... make a report\n}\n\nconst report1 = makeReport(null, results1);\nconst report2 = makeReport(report1.history, results2);\nconst report3 = makeReport(report2.history, results3);\n// ... and so on\n"})}),"\n",(0,n.jsxs)(t.p,{children:["This is why you'll just need to keep the history files from the ",(0,n.jsx)(t.strong,{children:"last"})," (not every!) report.\nAs long as you keep putting them into ",(0,n.jsx)(t.code,{children:"allure-results/history"})," directory, you'll be able to\ntrace the history of your previous test runs."]}),"\n",(0,n.jsx)(t.h2,{id:"automating-history",children:"Automating History"}),"\n",(0,n.jsxs)(t.p,{children:["While this issue largely falls outside the scope of this project,\nit is clear that copying history files manually is not a sustainable solution.\nA more efficient approach could be to automate this process with a script or use the\n",(0,n.jsx)(t.a,{href:"https://github.com/fescobar/allure-docker-service",children:"Allure Docker Service"}),", which is designed for tasks like this."]}),"\n",(0,n.jsx)(t.p,{children:"The latter provides a Docker container that runs Allure 2 Framework with some REST API\non top of it. You will be able to maintain multiple projects, send test results via POST requests,\nand access your reports via web UI with the history and other server-dependent features."}),"\n",(0,n.jsx)(t.h2,{id:"summary",children:"Summary"}),"\n",(0,n.jsx)(t.p,{children:"Effectively setting up and managing history in Allure 2 Framework may require an initial investment of time and effort."}),"\n",(0,n.jsx)(t.p,{children:"However, it becomes an invaluable asset, especially for larger teams and extensive projects, aiding in long-term trend analysis and overall test management.\nOnce you have a solid understanding of the more basic features of the framework, it's highly recommended to revisit and establish history tracking for your project."}),"\n","\n",(0,n.jsxs)(t.section,{"data-footnotes":!0,className:"footnotes",children:[(0,n.jsx)(t.h2,{className:"sr-only",id:"footnote-label",children:"Footnotes"}),"\n",(0,n.jsxs)(t.ol,{children:["\n",(0,n.jsxs)(t.li,{id:"user-content-fn-1",children:["\n",(0,n.jsxs)(t.p,{children:["For clarity, test and test case are being used interchangeably \u2014 here and there we refer\nto ",(0,n.jsx)(t.code,{children:"test('...', () => {})"})," and ",(0,n.jsx)(t.code,{children:"it('should ...'. () => {})"})," statements in Jest. ",(0,n.jsx)(t.a,{href:"#user-content-fnref-1","data-footnote-backref":"","aria-label":"Back to reference 1",className:"data-footnote-backref",children:"\u21a9"})]}),"\n"]}),"\n",(0,n.jsxs)(t.li,{id:"user-content-fn-2",children:["\n",(0,n.jsxs)(t.p,{children:["Please note directory names \u2014 ",(0,n.jsx)(t.code,{children:"allure-report/history"})," and ",(0,n.jsx)(t.code,{children:"allure-results/history"}),"\nare not the same \u2014 the former is a directory with HTML files, the latter is a directory\nwith JSON files containing pure data not rendered yet. ",(0,n.jsx)(t.a,{href:"#user-content-fnref-2","data-footnote-backref":"","aria-label":"Back to reference 2",className:"data-footnote-backref",children:"\u21a9"})]}),"\n"]}),"\n"]}),"\n"]})]})}function c(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}function h(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}},9412:(e,t,r)=>{r.d(t,{A:()=>s});const s=r.p+"assets/images/graphs-category-trend-6ea8f349ff18dd4ff911b53f309e93c1.jpg"},6780:(e,t,r)=>{r.d(t,{A:()=>s});const s=r.p+"assets/images/graphs-duration-trend-6bce7a426b1cea33a74739f6190ea229.jpg"},7802:(e,t,r)=>{r.d(t,{A:()=>s});const s=r.p+"assets/images/graphs-history-trend-ee7a0dd1252e09c9041fae7506bc0299.jpg"},2464:(e,t,r)=>{r.d(t,{A:()=>s});const s=r.p+"assets/images/graphs-retry-trend-7b46b965a53fb612366b5c5f2d8ff1c8.jpg"},2586:(e,t,r)=>{r.d(t,{A:()=>s});const s="data:image/jpeg;base64,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"},741:(e,t,r)=>{r.d(t,{A:()=>s});const s=r.p+"assets/images/config-history-01-560917f6d0386466fd5ecb83a21ed3ec.jpg"},2890:(e,t,r)=>{r.d(t,{A:()=>s});const s=r.p+"assets/images/config-history-02-f0456ddbcb02076151f92cbee91fa753.jpg"},8453:(e,t,r)=>{r.d(t,{R:()=>i,x:()=>a});var s=r(6540);const n={},o=s.createContext(n);function i(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),s.createElement(o.Provider,{value:t},e.children)}}}]);