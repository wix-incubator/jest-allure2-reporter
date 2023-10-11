"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[132],{7992:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>d});var n=r(5893),s=r(1151);const o={sidebar_position:1,slug:"/docs"},i="Introduction",a={unversionedId:"docs/introduction/index",id:"docs/introduction/index",title:"Introduction",description:"This website version refers to the unreleased version of jest-allure2-reporter, partially available as 2.0.0-alpha.* release.",source:"@site/../docs/docs/introduction/index.mdx",sourceDirName:"docs/introduction",slug:"/docs",permalink:"/jest-allure2-reporter/docs",draft:!1,unlisted:!1,editUrl:"https://github.com/wix-incubator/jest-allure2-reporter/tree/alpha/docs/../docs/docs/introduction/index.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,slug:"/docs"},sidebar:"docsSidebar",next:{title:"Installation",permalink:"/jest-allure2-reporter/docs/installation"}},l={},d=[{value:"What is <code>jest-allure2-reporter</code>?",id:"what-is-jest-allure2-reporter",level:2},{value:"Why one more Allure reporter for Jest?",id:"why-one-more-allure-reporter-for-jest",level:2},{value:"Takeaways",id:"takeaways",level:2}];function c(e){const t=Object.assign({h1:"h1",admonition:"admonition",p:"p",code:"code",h2:"h2",a:"a",strong:"strong",sup:"sup",ul:"ul",li:"li",section:"section",ol:"ol"},(0,s.ah)(),e.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"introduction",children:"Introduction"}),"\n",(0,n.jsx)(t.admonition,{type:"caution",children:(0,n.jsxs)(t.p,{children:["This website version refers to the unreleased version of ",(0,n.jsx)(t.code,{children:"jest-allure2-reporter"}),", partially available as ",(0,n.jsx)(t.code,{children:"2.0.0-alpha.*"})," release.\nPlease use GitHub docs for the latest stable version, ",(0,n.jsx)(t.code,{children:"1.x.x"}),"."]})}),"\n",(0,n.jsx)(t.p,{children:"Thanks for choosing Jest Allure 2 Reporter!"}),"\n",(0,n.jsx)(t.p,{children:"Whether you're a developer, QA professional, or someone involved in unit, integration, or end-to-end testing, this tool will make your testing process more efficient, organized, and insightful."}),"\n",(0,n.jsx)("div",{className:"text--center",children:(0,n.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/NpEaa2P7qZI",title:"YouTube video player",frameBorder:0,allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0})}),"\n",(0,n.jsxs)(t.h2,{id:"what-is-jest-allure2-reporter",children:["What is ",(0,n.jsx)(t.code,{children:"jest-allure2-reporter"}),"?"]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"https://www.npmjs.com/package/jest-allure2-reporter",children:(0,n.jsx)(t.code,{children:"jest-allure2-reporter"})})," is a reporting toolkit for ",(0,n.jsx)(t.a,{href:"https://jestjs.io/",children:"Jest"}),", a widely popular testing framework in the JavaScript ecosystem."]}),"\n",(0,n.jsxs)(t.p,{children:["The produced reports look like directories with multiple JSON files.\nThey can be viewed using the ",(0,n.jsxs)(t.a,{href:"https://docs.qameta.io/allure/#_commandline",children:[(0,n.jsx)(t.code,{children:"allure"})," command-line tool"]}),", a flexible, feature-rich reporting tool that provides clear and concise test result representation."]}),"\n",(0,n.jsxs)(t.p,{children:["It provides several ",(0,n.jsx)(t.strong,{children:"entry points"}),":"]}),"\n",(0,n.jsxs)("dl",{children:[(0,n.jsx)("dt",{children:(0,n.jsx)("code",{children:"jest-allure2-reporter"})}),(0,n.jsx)("dd",{children:"The reporter itself, which is responsible for collecting test results and generating a report."}),(0,n.jsxs)("dd",{children:["DSL to add additional metadata to your test definitions: ",(0,n.jsx)("code",{children:"$Link"}),", ",(0,n.jsx)("code",{children:"$Owner"}),"."]}),(0,n.jsxs)("dd",{children:[(0,n.jsx)(t.code,{children:"allure"})," runtime API to use inside your tests: ",(0,n.jsx)("code",{children:"allure.step"}),", ",(0,n.jsx)("code",{children:"allure.attachment"}),"."]}),(0,n.jsx)("dt",{children:(0,n.jsxs)(t.p,{children:[(0,n.jsx)("b",{children:"Environment packages"}),", to enable the annotations, media attachments and provide additional test data:"]})}),(0,n.jsx)("dd",{children:(0,n.jsxs)("dl",{children:[(0,n.jsx)("dt",{children:(0,n.jsx)("code",{children:"jest-allure2-reporter/environment-node"})}),(0,n.jsx)("dd",{children:"For Node.js tests."}),(0,n.jsx)("dt",{children:(0,n.jsx)("code",{children:"jest-allure2-reporter/environment-jsdom"})}),(0,n.jsx)("dd",{children:"For browser tests."}),(0,n.jsx)("dt",{children:(0,n.jsx)("code",{children:"jest-allure2-reporter/environment-decorator"})}),(0,n.jsx)("dd",{children:"For advanced use cases where you need to extend an already customized test environment."})]})})]}),"\n",(0,n.jsx)(t.h2,{id:"why-one-more-allure-reporter-for-jest",children:"Why one more Allure reporter for Jest?"}),"\n",(0,n.jsxs)(t.p,{children:["Jest's evolution from Jasmine to its own ",(0,n.jsx)(t.a,{href:"https://github.com/jestjs/jest/pull/3668",children:"Circus test runner"})," in ",(0,n.jsx)(t.a,{href:"https://jestjs.io/blog/2021/05/25/jest-27#flipping-defaults",children:"version 27.0.0"})," brought new opportunities for enhanced testing, but it also created a void: existing Allure reporters",(0,n.jsx)(t.sup,{children:(0,n.jsx)(t.a,{href:"#user-content-fn-1",id:"user-content-fnref-1","data-footnote-ref":!0,"aria-describedby":"footnote-label",children:"1"})}),", designed for Jasmine, fell short of leveraging Jest's new features and refined test lifecycle."]}),"\n",(0,n.jsxs)(t.p,{children:["While community-made reporters sought to bridge this gap",(0,n.jsx)(t.sup,{children:(0,n.jsx)(t.a,{href:"#user-content-fn-2",id:"user-content-fnref-2","data-footnote-ref":!0,"aria-describedby":"footnote-label",children:"2"})}),(0,n.jsx)(t.sup,{children:(0,n.jsx)(t.a,{href:"#user-content-fn-3",id:"user-content-fnref-3","data-footnote-ref":!0,"aria-describedby":"footnote-label",children:"3"})}),(0,n.jsx)(t.sup,{children:(0,n.jsx)(t.a,{href:"#user-content-fn-4",id:"user-content-fnref-4","data-footnote-ref":!0,"aria-describedby":"footnote-label",children:"4"})}),", they had their own shortcomings \u2014 issues with irregular maintenance, limited reach, and significant feature gaps were prevalent. Most critically, they took a non-idiomatic approach by acting as extensions to Jest's ",(0,n.jsx)(t.code,{children:"testEnvironment"}),", which led to a critical shortcomings: e.g., inability to report early test issues like ",(0,n.jsx)(t.code,{children:"SyntaxError"})," or test environment setup failures."]}),"\n",(0,n.jsx)(t.h2,{id:"takeaways",children:"Takeaways"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:["This reporter is a powerful tool tailor-made for the ",(0,n.jsx)(t.strong,{children:"modern"}),' Jest ecosystem, not "yet another Allure reporter".']}),"\n",(0,n.jsx)(t.li,{children:"Easy to understand, straightforward to adopt, and flexible to work with \u2013 it's the Jest Allure reporter you've been waiting for."}),"\n",(0,n.jsxs)(t.li,{children:["It is progressive by design \u2014 you can start using it like a ",(0,n.jsx)(t.a,{href:"https://jestjs.io/docs/configuration#reporters-arraymodulename--modulename-options",children:"standard reporter"}),", but the more you invest in it, the more you get out of it."]}),"\n"]}),"\n",(0,n.jsxs)(t.p,{children:["Ready to explore what this reporter can do for you? ",(0,n.jsx)(t.a,{href:"/jest-allure2-reporter/docs/config/",children:"Begin your journey here."})]}),"\n",(0,n.jsxs)(t.section,{"data-footnotes":!0,className:"footnotes",children:[(0,n.jsx)(t.h2,{className:"sr-only",id:"footnote-label",children:"Footnotes"}),"\n",(0,n.jsxs)(t.ol,{children:["\n",(0,n.jsxs)(t.li,{id:"user-content-fn-1",children:["\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"https://github.com/allure-framework/allure-js/tree/master/packages/allure-jest",children:"https://github.com/allure-framework/allure-js/tree/master/packages/allure-jest"})," ",(0,n.jsx)(t.a,{href:"#user-content-fnref-1","data-footnote-backref":!0,className:"data-footnote-backref","aria-label":"Back to content",children:"\u21a9"})]}),"\n"]}),"\n",(0,n.jsxs)(t.li,{id:"user-content-fn-2",children:["\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"https://github.com/zaqqaz/jest-allure",children:"https://github.com/zaqqaz/jest-allure"})," ",(0,n.jsx)(t.a,{href:"#user-content-fnref-2","data-footnote-backref":!0,className:"data-footnote-backref","aria-label":"Back to content",children:"\u21a9"})]}),"\n"]}),"\n",(0,n.jsxs)(t.li,{id:"user-content-fn-3",children:["\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"https://github.com/ryparker/jest-circus-allure-environment",children:"https://github.com/ryparker/jest-circus-allure-environment"})," ",(0,n.jsx)(t.a,{href:"#user-content-fnref-3","data-footnote-backref":!0,className:"data-footnote-backref","aria-label":"Back to content",children:"\u21a9"})]}),"\n"]}),"\n",(0,n.jsxs)(t.li,{id:"user-content-fn-4",children:["\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"https://github.com/c4lifa/jest-allure-circus",children:"https://github.com/c4lifa/jest-allure-circus"})," ",(0,n.jsx)(t.a,{href:"#user-content-fnref-4","data-footnote-backref":!0,className:"data-footnote-backref","aria-label":"Back to content",children:"\u21a9"})]}),"\n"]}),"\n"]}),"\n"]})]})}const h=function(e={}){const{wrapper:t}=Object.assign({},(0,s.ah)(),e.components);return t?(0,n.jsx)(t,Object.assign({},e,{children:(0,n.jsx)(c,e)})):c(e)}},1151:(e,t,r)=>{r.d(t,{Zo:()=>a,ah:()=>o});var n=r(7294);const s=n.createContext({});function o(e){const t=n.useContext(s);return n.useMemo((()=>"function"==typeof e?e(t):{...t,...e}),[t,e])}const i={};function a({components:e,children:t,disableParentContext:r}){let a;return a=r?"function"==typeof e?e({}):e||i:o(e),n.createElement(s.Provider,{value:a},t)}}}]);