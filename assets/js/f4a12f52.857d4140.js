"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[343],{82:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>l,default:()=>p,frontMatter:()=>a,metadata:()=>c,toc:()=>d});var r=t(5893),s=t(1151),o=t(3992),i=t(425);const a={description:"Behavior-driven way to group test results."},l="By Story",c={unversionedId:"docs/config/grouping/by-story",id:"docs/config/grouping/by-story",title:"By Story",description:"Behavior-driven way to group test results.",source:"@site/../docs/docs/config/01-grouping/02-by-story.mdx",sourceDirName:"docs/config/01-grouping",slug:"/docs/config/grouping/by-story",permalink:"/jest-allure2-reporter/docs/config/grouping/by-story",draft:!1,unlisted:!1,editUrl:"https://github.com/wix-incubator/jest-allure2-reporter/tree/alpha/docs/../docs/docs/config/01-grouping/02-by-story.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{description:"Behavior-driven way to group test results."},sidebar:"docsSidebar",previous:{title:"By Suite",permalink:"/jest-allure2-reporter/docs/config/grouping/by-suite"},next:{title:"By Package",permalink:"/jest-allure2-reporter/docs/config/grouping/by-package"}},u={},d=[{value:"Using annotations",id:"using-annotations",level:2},{value:"Using configuration",id:"using-configuration",level:2},{value:"Many-to-many mapping",id:"many-to-many-mapping",level:2}];function h(e){const n=Object.assign({h1:"h1",admonition:"admonition",p:"p",code:"code",a:"a",img:"img",strong:"strong",ul:"ul",li:"li",em:"em",h2:"h2",pre:"pre"},(0,s.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"by-story",children:"By Story"}),"\n",(0,r.jsx)(n.admonition,{type:"caution",children:(0,r.jsxs)(n.p,{children:["This website version refers to the unreleased version of ",(0,r.jsx)(n.code,{children:"jest-allure2-reporter"}),", partially available as ",(0,r.jsx)(n.code,{children:"2.0.0-alpha.*"})," release.\nPlease use GitHub docs for the latest stable version, ",(0,r.jsx)(n.code,{children:"1.x.x"}),"."]})}),"\n",(0,r.jsxs)(n.p,{children:["This grouping option is a concept that comes from the ",(0,r.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Behavior-driven_development",children:"Behavior-Driven Development"})," (BDD) methodology.\nUnlike the ",(0,r.jsx)(n.a,{href:"/jest-allure2-reporter/docs/config/grouping/by-suite",children:"suite-based grouping"}),", which is based on the technical structure of your test suite, the story-based grouping\nhelps you to focus on the business value of your tests and view them from the end-user perspective."]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"Grouping by story",src:t(6502).Z+"",width:"2048",height:"1200"})}),"\n",(0,r.jsxs)(n.p,{children:["The story-oriented hierarchy has 4 mandatory levels: ",(0,r.jsx)(n.strong,{children:"epic"}),", ",(0,r.jsx)(n.strong,{children:"feature"}),", ",(0,r.jsx)(n.strong,{children:"story"})," and ",(0,r.jsx)(n.strong,{children:"test case"}),"."]}),"\n",(0,r.jsx)(n.admonition,{title:"Glossary",type:"info",children:(0,r.jsxs)("dl",{children:[(0,r.jsx)("dt",{children:(0,r.jsx)("strong",{children:"Epic"})}),(0,r.jsx)("dd",{children:"High-level business goal"}),(0,r.jsx)("dt",{children:(0,r.jsx)("strong",{children:"Feature"})}),(0,r.jsx)("dd",{children:"Functionality that delivers business value"}),(0,r.jsx)("dt",{children:(0,r.jsx)("strong",{children:"Story"})}),(0,r.jsx)("dd",{children:"User story that describes a feature from the end-user perspective"}),(0,r.jsx)("dt",{children:(0,r.jsx)("strong",{children:"Test Case"})}),(0,r.jsxs)("dd",{children:["Atomic, lowest-level unit. In Jest, it is a single ",(0,r.jsx)("code",{children:"it"})," or ",(0,r.jsx)("code",{children:"test"})," function."]})]})}),"\n",(0,r.jsx)(n.p,{children:"Before you start using this grouping option, you need to decide how exactly you want to implement it:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["via ",(0,r.jsx)(n.a,{href:"#annotations-api",children:"annotations"})," \u2013 a more granular approach, which allows you to control the grouping on a per-test basis;"]}),"\n",(0,r.jsxs)(n.li,{children:["via ",(0,r.jsx)(n.a,{href:"#configuration-api",children:"configuration"})," \u2013 a quick option to enable it all at once, based on general rules;"]}),"\n",(0,r.jsxs)(n.li,{children:["via ",(0,r.jsx)(n.em,{children:"mixing these approaches"})," \u2013 a compromise between the two, where the configuration serves as a fallback for missing annotations."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"using-annotations",children:"Using annotations"}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.a,{href:"/jest-allure2-reporter/docs/api/labels",children:"annotation-based approach"})," gives you a fine-grained control over the names of your epic, feature and story labels, but it requires you to add annotations to ",(0,r.jsx)(n.em,{children:"every and each test case"})," (sic!) which can be tedious."]}),"\n",(0,r.jsxs)(n.p,{children:["Let's take the same project as in the previous article, where there are two parts: client and server.\nBoth them deal with the same functionality \u2013 authentication and restoring forgotten passwords.\nHence, it would make sense to group both client and server tests under the same epic named ",(0,r.jsx)(n.strong,{children:"Authentication"}),", and continue grouping them by features and stories regardless of the application layer."]}),"\n",(0,r.jsxs)(o.Z,{groupId:"configTab",children:[(0,r.jsx)(i.Z,{value:"docblock",label:"Docblocks",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",metastring:'title="login.test.js"',children:"/**\n * @epic Authentication\n * @feature Login screen\n */\ndescribe('Login controller', () => {\n  it('should validate e-mail', () => {\n    /** @story Validation */\n    // ...\n  });\n\n  it('should return 401 if user is not found', () => {\n    /** @story Validation */\n    // ...\n  });\n});\n"})})}),(0,r.jsx)(i.Z,{value:"dsl",label:"DSL",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",metastring:'title="login.test.js"',children:"import { $Epic, $Feature, $Story } from 'jest-allure2-reporter';\n\n$Epic('Authentication');\n$Feature('Login screen');\ndescribe('Login controller', () => {\n  $Story('Validation');\n  it('should validate e-mail', () => {\n    // ...\n  });\n\n  $Story('Validation');\n  it('should return 401 if user is not found', () => {\n    // ...\n  });\n});\n"})})}),(0,r.jsx)(i.Z,{value:"demo",label:"Preview",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-plain",children:"\u2514\u2500 Authentication\n   \u251c\u2500 Login screen\n   \u2502  \u251c\u2500 General\n   \u2502  \u2502  \u251c\u2500 should display login form on client\n   \u2502  \u251c\u2500 Validation\n   \u2502  \u2502  \u251c\u2500 should validate e-mail on client\n   \u2502  \u2502  \u251c\u2500 should validate e-mail on server\n   \u2502  \u2502  \u251c\u2500 should return 401 if user is not found\n   \u2502  \u2502  \u2514\u2500 should return 401 if password is incorrect\n   \u2514\u2500 Forgot password screen\n      \u2514\u2500 Validation\n         \u251c\u2500 should validate e-mail on client\n         \u251c\u2500 should validate e-mail on server\n         \u251c\u2500 should return 401 if user is not found\n         \u2514\u2500 should return 401 if password is incorrect\n"})})})]}),"\n",(0,r.jsxs)(n.p,{children:["As mentioned before, the annotation-based approach requires you to annotate literally ",(0,r.jsx)(n.strong,{children:"every test case"})," with all\nthe three labels (epic, feature and story), otherwise the report will be stubbornly displaying a flat structure in ",(0,r.jsx)(n.strong,{children:"Behaviors"})," section."]}),"\n",(0,r.jsxs)(n.admonition,{type:"tip",children:[(0,r.jsx)(n.p,{children:"To relax the requirement to annotate all your test cases, you can add a fallback via configuration, e.g.:"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",metastring:'title="jest.config.js"',children:"/** @type {import('@jest/types').Config.InitialOptions} */\nmodule.exports = {\n  testEnvironment: 'jest-allure2-reporter/environment-node',\n  reporters: [\n    'default',\n    [\n      'jest-allure2-reporter',\n      /** @type {import('jest-allure2-reporter').Options} */\n      {\n        labels: {\n          epic: ({ value }) => value ?? 'Uncategorized',\n          feature: ({ value }) => value ?? 'Untitled feature',\n          story: ({ value }) => value ?? 'Untitled story',\n        },\n      },\n    ],\n  ],\n};\n"})})]}),"\n",(0,r.jsx)(n.h2,{id:"using-configuration",children:"Using configuration"}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.strong,{children:"configuration-based approach"})," allows you to group test cases based on the available attributes like the test file path, the ancestor describe blocks and any\nother contextually available information."]}),"\n",(0,r.jsxs)(n.p,{children:["It is much faster to implement than if you were to annotate every test case by hand, but it is also less flexible.\nStill, there are many cases where it can be useful, especially if you have a large test suite and you want to add some structure to it.\nFor example, if your grouping by suite focuses mostly ",(0,r.jsx)(n.a,{href:"/jest-allure2-reporter/docs/config/grouping/by-suite#file-oriented-example",children:"on the file structure"}),',\nthe story-based grouping may add "a fresh perspective" by grouping tests by describe blocks and test names, for example.']}),"\n",(0,r.jsx)(n.p,{children:"Let's explore a simple example, where we'll map:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"epic"})," to the top-level describe block"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"feature"})," to the middle-level describe blocks"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"story"})," to the lowest-level describe block"]}),"\n"]}),"\n",(0,r.jsxs)(o.Z,{groupId:"configTab",children:[(0,r.jsx)(i.Z,{value:"config",label:"Config",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",metastring:'title="jest.config.js"',children:"/** @type {import('@jest/types').Config.InitialOptions} */\nmodule.exports = {\n  testEnvironment: 'jest-allure2-reporter/environment-node',\n  reporters: [\n    'default',\n    ['jest-allure2-reporter', /** @type {import('jest-allure2-reporter').Options}*/ {\n      labels: {\n        epic: ({ testCase }) => testCase.ancestorTitles.at(0) ?? '(uncategorized)',\n        feature: ({ testCase }) => testCase.ancestorTitles.slice(1, -1).join(' > ') || '(uncategorized)',\n        story: ({ testCase }) => testCase.ancestorTitles.slice(2).at(-1) ?? '(uncategorized)',\n      },\n    }],\n  ],\n};\n"})})}),(0,r.jsx)(i.Z,{value:"demo",label:"Preview",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-plain",children:"\u251c\u2500 Login screen\n\u2502  \u251c\u2500 when loaded\n\u2502  \u2502  \u2514\u2500 should display login form\n\u2502  \u2514\u2500 when loaded and typed\n\u2502     \u251c\u2500 should validate e-mail\n\u2502     \u2514\u2500 should validate password\n\u251c\u2500 Forgot password screen\n\u2502  \u251c\u2500 when loaded\n\u2502  \u2502  \u2514\u2500 should display forgot password form\n\u2502  \u2514\u2500 when loaded and typed\n\u2502     \u2514\u2500 should validate e-mail\n\u251c\u2500 Login controller\n\u2502  \u251c\u2500 should return 401 if user is not found\n\u2502  \u2514\u2500 should return 401 if password is incorrect\n\u2514\u2500 Forgot password controller\n   \u251c\u2500 should return 401 if user is not found\n   \u2514\u2500 should return 401 if password is incorrect\n"})})})]}),"\n",(0,r.jsx)(n.h2,{id:"many-to-many-mapping",children:"Many-to-many mapping"}),"\n",(0,r.jsx)(n.p,{children:"It is worth mentioning that Allure allows you to map a test case to multiple epics, features and stories, but\nyou should use this feature with caution, as it may lead to a very complex report structure."}),"\n",(0,r.jsxs)(o.Z,{groupId:"approach",children:[(0,r.jsx)(i.Z,{value:"docblock",label:"Docblocks",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",metastring:'title="login.test.js"',children:"it('should validate e-mail', () => {\n  /**\n   * @epic Authentication\n   * @feature Login screen\n   * @story Validation\n   *\n   * @epic Security\n   * @feature XSS prevention\n   * @story Login form\n   */\n\n   // ...\n});\n"})})}),(0,r.jsx)(i.Z,{value:"dsl",label:"DSL",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",metastring:'title="login.test.js"',children:"$Epic('Authentication');\n$Feature('Login screen');\n$Story('Validation');\n$Epic('Security');\n$Feature('XSS prevention');\n$Story('Login form');\nit('should validate e-mail', () => {\n   // ...\n});\n"})})})]})]})}const p=function(e={}){const{wrapper:n}=Object.assign({},(0,s.ah)(),e.components);return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(h,e)})):h(e)}},425:(e,n,t)=>{t.d(n,{Z:()=>i});t(7294);var r=t(6010);const s={tabItem:"tabItem_Ymn6"};var o=t(5893);function i(e){let{children:n,hidden:t,className:i}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,r.Z)(s.tabItem,i),hidden:t,children:n})}},3992:(e,n,t)=>{t.d(n,{Z:()=>w});var r=t(7294),s=t(6010),o=t(2957),i=t(6550),a=t(1270),l=t(5238),c=t(3609),u=t(2560);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:t}=e;return(0,r.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:t,attributes:r,default:s}}=e;return{value:n,label:t,attributes:r,default:s}}))}(t);return function(e){const n=(0,c.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function p(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function g(e){let{queryString:n=!1,groupId:t}=e;const s=(0,i.k6)(),o=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,l._X)(o),(0,r.useCallback)((e=>{if(!o)return;const n=new URLSearchParams(s.location.search);n.set(o,e),s.replace({...s.location,search:n.toString()})}),[o,s])]}function f(e){const{defaultValue:n,queryString:t=!1,groupId:s}=e,o=h(e),[i,l]=(0,r.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:o}))),[c,d]=g({queryString:t,groupId:s}),[f,m]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[s,o]=(0,u.Nk)(t);return[s,(0,r.useCallback)((e=>{t&&o.set(e)}),[t,o])]}({groupId:s}),b=(()=>{const e=c??f;return p({value:e,tabValues:o})?e:null})();(0,a.Z)((()=>{b&&l(b)}),[b]);return{selectedValue:i,selectValue:(0,r.useCallback)((e=>{if(!p({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);l(e),d(e),m(e)}),[d,m,o]),tabValues:o}}var m=t(1048);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var y=t(5893);function j(e){let{className:n,block:t,selectedValue:r,selectValue:i,tabValues:a}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,o.o5)(),u=e=>{const n=e.currentTarget,t=l.indexOf(n),s=a[t].value;s!==r&&(c(n),i(s))},d=e=>{let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const t=l.indexOf(e.currentTarget)+1;n=l[t]??l[0];break}case"ArrowLeft":{const t=l.indexOf(e.currentTarget)-1;n=l[t]??l[l.length-1];break}}n?.focus()};return(0,y.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":t},n),children:a.map((e=>{let{value:n,label:t,attributes:o}=e;return(0,y.jsx)("li",{role:"tab",tabIndex:r===n?0:-1,"aria-selected":r===n,ref:e=>l.push(e),onKeyDown:d,onClick:u,...o,className:(0,s.Z)("tabs__item",b.tabItem,o?.className,{"tabs__item--active":r===n}),children:t??n},n)}))})}function v(e){let{lazy:n,children:t,selectedValue:s}=e;const o=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=o.find((e=>e.props.value===s));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,y.jsx)("div",{className:"margin-top--md",children:o.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==s})))})}function x(e){const n=f(e);return(0,y.jsxs)("div",{className:(0,s.Z)("tabs-container",b.tabList),children:[(0,y.jsx)(j,{...e,...n}),(0,y.jsx)(v,{...e,...n})]})}function w(e){const n=(0,m.Z)();return(0,y.jsx)(x,{...e,children:d(e.children)},String(n))}},6502:(e,n,t)=>{t.d(n,{Z:()=>r});const r=t.p+"assets/images/config-01-grouping-05-2d8678d4207735094d62ec7c915114c1.jpg"},1151:(e,n,t)=>{t.d(n,{Zo:()=>a,ah:()=>o});var r=t(7294);const s=r.createContext({});function o(e){const n=r.useContext(s);return r.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const i={};function a({components:e,children:n,disableParentContext:t}){let a;return a=t?"function"==typeof e?e({}):e||i:o(e),r.createElement(s.Provider,{value:a},n)}}}]);