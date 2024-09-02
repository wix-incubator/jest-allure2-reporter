"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[5769],{2441:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>p,frontMatter:()=>l,metadata:()=>d,toc:()=>u});var r=n(5893),s=n(1151),o=n(3992),i=n(425);const l={description:"The most common way to group test results."},a="By Suite",d={id:"docs/config/grouping/by-suite",title:"By Suite",description:"The most common way to group test results.",source:"@site/../docs/docs/config/01-grouping/01-by-suite.mdx",sourceDirName:"docs/config/01-grouping",slug:"/docs/config/grouping/by-suite",permalink:"/jest-allure2-reporter/docs/config/grouping/by-suite",draft:!1,unlisted:!1,editUrl:"https://github.com/wix-incubator/jest-allure2-reporter/tree/beta/docs/../docs/docs/config/01-grouping/01-by-suite.mdx",tags:[],version:"current",lastUpdatedBy:"Yaroslav Serhieiev",lastUpdatedAt:1725271315e3,sidebarPosition:1,frontMatter:{description:"The most common way to group test results."},sidebar:"docsSidebar",previous:{title:"Grouping",permalink:"/jest-allure2-reporter/docs/config/grouping/"},next:{title:"By Story",permalink:"/jest-allure2-reporter/docs/config/grouping/by-story"}},c={},u=[{value:"Default preset",id:"default-preset",level:2},{value:"File-oriented example",id:"file-oriented-example",level:2},{value:"Test-oriented example",id:"test-oriented-example",level:2}];function h(e){const t={admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",header:"header",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,s.a)(),...e.components},{ArticleHeader:l}=t;return l||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("ArticleHeader",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"by-suite",children:"By Suite"})}),"\n",(0,r.jsx)(t.p,{children:"This is perhaps the most common way to group test results, and it makes the most sense for projects using Jest."}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.img,{alt:"Grouping by suite",src:n(4819).Z+"",width:"2048",height:"1200"})}),"\n",(0,r.jsxs)(t.p,{children:["The suite hierarchy consists of up to four levels: ",(0,r.jsx)(t.strong,{children:"parent suite"}),", ",(0,r.jsx)(t.strong,{children:"suite"}),", ",(0,r.jsx)(t.strong,{children:"sub-suite"})," and ",(0,r.jsx)(t.strong,{children:"test case"}),"."]}),"\n",(0,r.jsx)(t.admonition,{title:"Glossary",type:"info",children:(0,r.jsxs)("dl",{children:[(0,r.jsx)("dt",{children:(0,r.jsx)("strong",{children:"Parent Suite"})}),(0,r.jsxs)("dd",{children:["The highest level of the hierarchy used to group test results by package (e.g., ",(0,r.jsx)("code",{children:"client"}),", ",(0,r.jsx)("code",{children:"server"}),"), test directory (e.g., ",(0,r.jsx)("code",{children:"e2e"}),", ",(0,r.jsx)("code",{children:"unit"}),", ",(0,r.jsx)("code",{children:"integration"}),"), or any other relevant criteria. ",(0,r.jsx)("em",{children:"It is not configured by default"}),", but you can easily add it to your reports."]}),(0,r.jsx)("dt",{children:(0,r.jsx)("strong",{children:"Suite"})}),(0,r.jsxs)("dd",{children:["Serves as the primary grouping level, typically based on test file paths. However, you can choose alternative criteria such as feature or component directories (",(0,r.jsx)("code",{children:"LoginScreen"}),", ",(0,r.jsx)("code",{children:"ProfileScreen"}),", ",(0,r.jsx)("code",{children:"core"}),", ",(0,r.jsx)("code",{children:"utils"}),"), or top-level describe block names, if preferred."]}),(0,r.jsx)("dt",{children:(0,r.jsx)("strong",{children:"Subsuite"})}),(0,r.jsx)("dd",{children:"Helpful when dealing with a large number of test cases within a single suite. By default, test cases are grouped per top-level describe block. However, if there are numerous nested describe blocks (or, vice versa \u2014 lots of files and directories), you can look for alternative configurations."}),(0,r.jsx)("dt",{children:(0,r.jsx)("strong",{children:"Test Case"})}),(0,r.jsx)("dd",{children:"Represents the actual test. By default, it displays the test name, including the inner describe block names. You have the flexibility to choose a test name format that best suits your needs \u2013 see a few examples below in this article."})]})}),"\n",(0,r.jsx)(t.p,{children:"Below we'll explore a few examples of how to configure the grouping by suite."}),"\n",(0,r.jsx)(t.h2,{id:"default-preset",children:"Default preset"}),"\n",(0,r.jsx)(l,{}),"\n",(0,r.jsxs)(t.p,{children:["By default, ",(0,r.jsx)(t.code,{children:"jest-allure2-reporter"})," provides 3 levels of grouping: ",(0,r.jsx)(t.strong,{children:"suite"}),", ",(0,r.jsx)(t.strong,{children:"sub-suite"}),", and ",(0,r.jsx)(t.strong,{children:"test case"}),":"]}),"\n",(0,r.jsxs)(t.ol,{children:["\n",(0,r.jsxs)(t.li,{children:["The ",(0,r.jsx)(t.strong,{children:"suite"})," level is based on the ",(0,r.jsx)(t.em,{children:"test file path"}),"."]}),"\n",(0,r.jsxs)(t.li,{children:["The ",(0,r.jsx)(t.strong,{children:"sub-suite"})," level is based on the ",(0,r.jsx)(t.em,{children:"top-level describe block"}),"."]}),"\n",(0,r.jsxs)(t.li,{children:["The ",(0,r.jsx)(t.strong,{children:"test case"})," level is based on the ",(0,r.jsx)(t.em,{children:"test name"})," (including the inner describe block names)."]}),"\n"]}),"\n",(0,r.jsxs)(o.Z,{groupId:"configTab",children:[(0,r.jsx)(i.Z,{value:"demo",label:"Preview",children:(0,r.jsx)(t.p,{children:(0,r.jsx)(t.img,{alt:"Default grouping",src:n(9133).Z+"",width:"2048",height:"1200"})})}),(0,r.jsx)(i.Z,{value:"structure",label:"Structure",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-plain",children:"\u251c\u2500 client/auth/LoginScreen.test.js\n\u2502  \u2514\u2500 Login screen\n\u2502     \u251c\u2500 when loaded should display login form\n\u2502     \u2514\u2500 when loaded and typed should validate e-mail\n\u2502     \u2514\u2500 when loaded and typed should validate password\n\u251c\u2500 client/auth/ForgotPasswordScreen.test.js\n\u2502  \u2514\u2500 Forgot password screen\n\u2502     \u251c\u2500 when loaded should display forgot password form\n\u2502     \u2514\u2500 when loaded and typed should validate e-mail\n\u251c\u2500 server/controllers/login.test.js\n|  \u2514\u2500 Login controller\n|     \u251c\u2500 should return 401 if user is not found\n|     \u2514\u2500 should return 401 if password is incorrect\n\u2514\u2500 server/controllers/forgotPassword.test.js\n   \u2514\u2500 Forgot password controller\n      \u251c\u2500 should return 401 if user is not found\n      \u2514\u2500 should return 401 if password is incorrect\n"})})}),(0,r.jsx)(i.Z,{value:"config",label:"Config",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-js",metastring:'title="jest.config.js"',children:"/** @type {import('@jest/types').Config.InitialOptions} */\nmodule.exports = {\n  testEnvironment: 'jest-allure2-reporter/environment-node',\n  reporters: [\n    'default',\n    'jest-allure2-reporter',\n    // You don't need to configure anything special\n    // to get this structure.\n  ],\n};\n"})})})]}),"\n",(0,r.jsx)(t.h2,{id:"file-oriented-example",children:"File-oriented example"}),"\n",(0,r.jsx)(t.p,{children:"This example might be useful for projects with many test files and relatively few test cases per file."}),"\n",(0,r.jsxs)(o.Z,{groupId:"configTab",children:[(0,r.jsx)(i.Z,{value:"demo",label:"Preview",children:(0,r.jsx)(t.p,{children:(0,r.jsx)(t.img,{alt:"File-oriented grouping",src:n(6395).Z+"",width:"2048",height:"1200"})})}),(0,r.jsx)(i.Z,{value:"structure",label:"Structure",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-plain",children:"\u251c\u2500 client\n\u2502  \u2514\u2500 auth\n\u2502     \u251c\u2500 LoginScreen.test.js\n\u2502     \u2502  \u251c\u2500 Login screen when loaded should display login form\n\u2502     \u2502  \u251c\u2500 Login screen when loaded and typed should validate e-mail\n\u2502     \u2502  \u2514\u2500 Login screen when loaded and typed should validate password\n\u2502     \u2514\u2500 ForgotPasswordScreen.test.js\n\u2502        \u251c\u2500 Forgot password screen when loaded should display forgot password form\n\u2502        \u2514\u2500 Forgot password screen when loaded and typed should validate e-mail\n\u2514\u2500 server\n   \u2514\u2500 controllers\n      \u251c\u2500 login.test.js\n      \u2502  \u251c\u2500 Login controller should return 401 if user is not found\n      \u2502  \u2514\u2500 Login controller should return 401 if password is incorrect\n      \u2514\u2500 ForgotPasswordScreen.test.js\n         \u251c\u2500 Forgot password controller should return 401 if user is not found\n         \u2514\u2500 Forgot password controller should return 401 if password is incorrect\n"})})}),(0,r.jsx)(i.Z,{value:"config",label:"Config",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-js",metastring:'title="jest.config.js"',children:"/** @type {import('@jest/types').Config.InitialOptions} */\nmodule.exports = {\n  testEnvironment: 'jest-allure2-reporter/environment-node',\n  reporters: [\n    'default',\n    ['jest-allure2-reporter',\n      /** @type {import('jest-allure2-reporter').ReporterOptions}*/\n      {\n        testCase: {\n          name: ({ testCase }) => [\n            ...testCase.ancestorTitles,\n            testCase.title\n          ].join(' \xbb '),\n          labels: {\n            parentSuite: ({ filePath }) => filePath[0],\n            suite: ({ filePath }) => filePath[1],\n            subSuite: ({ filePath }) => filePath.slice(2).join('/'),\n          },\n        },\n      },\n    ],\n  ],\n};\n"})})})]}),"\n",(0,r.jsx)(t.h2,{id:"test-oriented-example",children:"Test-oriented example"}),"\n",(0,r.jsx)(t.p,{children:"This example should fit projects with a smaller number of test files and numerous test cases per file."}),"\n",(0,r.jsxs)(o.Z,{groupId:"configTab",children:[(0,r.jsx)(i.Z,{value:"demo",label:"Preview",children:(0,r.jsx)(t.p,{children:(0,r.jsx)(t.img,{alt:"Test-oriented grouping",src:n(2860).Z+"",width:"2048",height:"1200"})})}),(0,r.jsx)(i.Z,{value:"structure",label:"Structure",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-plain",children:"\u251c\u2500 client/auth/LoginScreen.test.js\n\u2502  \u251c\u2500 Login screen\n\u2502  \u2502  \u251c\u2500 when loaded\n\u2502  \u2502  \u2502  \u2514\u2500 should display login form\n\u2502  \u2502  \u2514\u2500 when loaded and typed\n\u2502  \u2502     \u251c\u2500 should validate e-mail\n\u2502  \u2502     \u2514\u2500 should validate password\n\u2502  \u2514\u2500 Forgot password screen\n\u2502     \u251c\u2500 when loaded\n\u2502     \u2502  \u2514\u2500 should display forgot password form\n\u2502     \u2514\u2500 when loaded and typed\n\u2502        \u2514\u2500 should validate e-mail\n\u2514\u2500 server/controllers/login.test.js\n   \u251c\u2500 Login controller\n   \u2502  \u251c\u2500 should return 401 if user is not found\n   \u2502  \u2514\u2500 should return 401 if password is incorrect\n   \u2514\u2500 Forgot password controller\n      \u251c\u2500 should return 401 if user is not found\n      \u2514\u2500 should return 401 if password is incorrect\n"})})}),(0,r.jsx)(i.Z,{value:"config",label:"Config",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-js",metastring:'title="jest.config.js"',children:"/** @type {import('@jest/types').Config.InitialOptions} */\nmodule.exports = {\n  testEnvironment: 'jest-allure2-reporter/environment-node',\n  reporters: [\n    'default',\n    ['jest-allure2-reporter', /** @type {import('jest-allure2-reporter').ReporterOptions}*/ {\n      labels: {\n        parentSuite: ({ filePath }) => filePath.join('/'),\n        suite: ({ testCase }) => testCase.ancestorTitles[0],\n        subSuite: ({ testCase }) => testCase.ancestorTitles.slice(1).join(' ') || undefined,\n        test: ({ testCase }) => testCase.title,\n      },\n    }],\n  ],\n};\n"})})})]})]})}function p(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},425:(e,t,n)=>{n.d(t,{Z:()=>i});n(7294);var r=n(512);const s={tabItem:"tabItem_Ymn6"};var o=n(5893);function i(e){let{children:t,hidden:n,className:i}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,r.Z)(s.tabItem,i),hidden:n,children:t})}},3992:(e,t,n)=>{n.d(t,{Z:()=>w});var r=n(7294),s=n(512),o=n(2957),i=n(6550),l=n(1270),a=n(5238),d=n(3609),c=n(1027);function u(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??function(e){return u(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:s}}=e;return{value:t,label:n,attributes:r,default:s}}))}(n);return function(e){const t=(0,d.lx)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function p(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function g(e){let{queryString:t=!1,groupId:n}=e;const s=(0,i.k6)(),o=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,a._X)(o),(0,r.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(s.location.search);t.set(o,e),s.replace({...s.location,search:t.toString()})}),[o,s])]}function f(e){const{defaultValue:t,queryString:n=!1,groupId:s}=e,o=h(e),[i,a]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!p({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:o}))),[d,u]=g({queryString:n,groupId:s}),[f,m]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[s,o]=(0,c.Nk)(n);return[s,(0,r.useCallback)((e=>{n&&o.set(e)}),[n,o])]}({groupId:s}),j=(()=>{const e=d??f;return p({value:e,tabValues:o})?e:null})();(0,l.Z)((()=>{j&&a(j)}),[j]);return{selectedValue:i,selectValue:(0,r.useCallback)((e=>{if(!p({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);a(e),u(e),m(e)}),[u,m,o]),tabValues:o}}var m=n(1048);const j={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var b=n(5893);function x(e){let{className:t,block:n,selectedValue:r,selectValue:i,tabValues:l}=e;const a=[],{blockElementScrollPositionUntilNextRender:d}=(0,o.o5)(),c=e=>{const t=e.currentTarget,n=a.indexOf(t),s=l[n].value;s!==r&&(d(t),i(s))},u=e=>{let t=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const n=a.indexOf(e.currentTarget)+1;t=a[n]??a[0];break}case"ArrowLeft":{const n=a.indexOf(e.currentTarget)-1;t=a[n]??a[a.length-1];break}}t?.focus()};return(0,b.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":n},t),children:l.map((e=>{let{value:t,label:n,attributes:o}=e;return(0,b.jsx)("li",{role:"tab",tabIndex:r===t?0:-1,"aria-selected":r===t,ref:e=>a.push(e),onKeyDown:u,onClick:c,...o,className:(0,s.Z)("tabs__item",j.tabItem,o?.className,{"tabs__item--active":r===t}),children:n??t},t)}))})}function v(e){let{lazy:t,children:n,selectedValue:o}=e;const i=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=i.find((e=>e.props.value===o));return e?(0,r.cloneElement)(e,{className:(0,s.Z)("margin-top--md",e.props.className)}):null}return(0,b.jsx)("div",{className:"margin-top--md",children:i.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==o})))})}function y(e){const t=f(e);return(0,b.jsxs)("div",{className:(0,s.Z)("tabs-container",j.tabList),children:[(0,b.jsx)(x,{...t,...e}),(0,b.jsx)(v,{...t,...e})]})}function w(e){const t=(0,m.Z)();return(0,b.jsx)(y,{...e,children:u(e.children)},String(t))}},4819:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/config-01-grouping-01-c6e789ac2f662eb8f79a40aad724d0ba.jpg"},9133:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/config-01-grouping-02-1d1e77ad4e503dc5818ea5febe0ca301.jpg"},6395:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/config-01-grouping-03-1d1e77ad4e503dc5818ea5febe0ca301.jpg"},2860:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/config-01-grouping-04-1d1e77ad4e503dc5818ea5febe0ca301.jpg"},1151:(e,t,n)=>{n.d(t,{Z:()=>l,a:()=>i});var r=n(7294);const s={},o=r.createContext(s);function i(e){const t=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),r.createElement(o.Provider,{value:t},e.children)}}}]);