"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[261],{8209:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>l,default:()=>f,frontMatter:()=>i,metadata:()=>c,toc:()=>d});var r=n(5893),s=n(1151),o=n(3992),a=n(425);const i={description:"Get to know the exact machine behind your test runs."},l="Executor",c={unversionedId:"docs/config/executor",id:"docs/config/executor",title:"Executor",description:"Get to know the exact machine behind your test runs.",source:"@site/../docs/docs/config/05-executor.mdx",sourceDirName:"docs/config",slug:"/docs/config/executor",permalink:"/jest-allure2-reporter/docs/config/executor",draft:!1,unlisted:!1,editUrl:"https://github.com/wix-incubator/jest-allure2-reporter/tree/alpha/docs/../docs/docs/config/05-executor.mdx",tags:[],version:"current",sidebarPosition:5,frontMatter:{description:"Get to know the exact machine behind your test runs."},sidebar:"docsSidebar",previous:{title:"Environment",permalink:"/jest-allure2-reporter/docs/config/environment"},next:{title:"History",permalink:"/jest-allure2-reporter/docs/config/history"}},u={},d=[{value:"Configuration",id:"configuration",level:2},{value:"Overrides",id:"overrides",level:2}];function h(e){const t=Object.assign({h1:"h1",admonition:"admonition",p:"p",code:"code",strong:"strong",ul:"ul",li:"li",sup:"sup",a:"a",h2:"h2",pre:"pre",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",section:"section",ol:"ol"},(0,s.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"executor",children:"Executor"}),"\n",(0,r.jsx)(t.admonition,{type:"caution",children:(0,r.jsxs)(t.p,{children:["This website version refers to the unreleased version of ",(0,r.jsx)(t.code,{children:"jest-allure2-reporter"}),", partially available as ",(0,r.jsx)(t.code,{children:"2.0.0-alpha.*"})," release.\nPlease use GitHub docs for the latest stable version, ",(0,r.jsx)(t.code,{children:"1.x.x"}),"."]})}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"Executor"})," information is crucial as it allows you to identify the entity or system that executed the tests.\nTypically, this would be a build agent on your CI/CD server, but, in a way, a developer's host machine is also an executor."]}),"\n",(0,r.jsx)(t.p,{children:"While this feature might not be significant for a single test run on your local machine, it becomes invaluable:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"When you want to navigate the history of your test runs."}),"\nExecutor info provides the necessary URLs and identifiers to form a comprehensive record of your test runs. When viewed over time, this history can reveal trends and patterns that may not be evident from a single test run. Are your tests taking longer to execute? Are they failing more frequently? When did they last pass successfully? These are all questions that the executor info can help answer."]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"When you want to analyze the test results based on the executor."}),"\nThis is a great idea when your tests are flaky, but you suspect that the flakiness is caused by a specific build agent on your CI/CD server.\nSuch errors can crop up when the agents are manually provisioned, or when they lack uniformity: variations in network configurations, different software versions, or a shift in the alignment of stars in the night sky above the data center",(0,r.jsx)(t.sup,{children:(0,r.jsx)(t.a,{href:"#user-content-fn-1",id:"user-content-fnref-1","data-footnote-ref":!0,"aria-describedby":"footnote-label",children:"1"})}),"!"]}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"configuration",children:"Configuration"}),"\n",(0,r.jsx)(t.p,{children:"By default, the executor information is included in the report if a CI/CD environment is detected.\nHowever, if you want to report local test runs as well, you'll need to tweak the configuration at your taste, e.g.:"}),"\n",(0,r.jsxs)(o.Z,{groupId:"configTab",children:[(0,r.jsx)(a.Z,{value:"demo",label:"Report",children:(0,r.jsx)("img",{src:n(9161).Z,width:398,alt:"Executor"})}),(0,r.jsx)(a.Z,{value:"config",label:"Config",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-js",metastring:'title="jest.config.js"',children:"const os = require('os');\n\n/** @type {import('@jest/types').Config.InitialOptions} */\nmodule.exports = {\n  // ...\n  reporters: [\n    // ...\n    ['jest-allure2-reporter', {\n      executor: ({ value }) => ({\n        name: os.hostname(),\n        type: os.platform(),\n\n        ...value,\n      }),\n    }]\n  ],\n};\n"})})})]}),"\n",(0,r.jsxs)(t.p,{children:["The ",(0,r.jsx)(t.code,{children:"defaultValue"})," is based on [",(0,r.jsx)(t.code,{children:"ci-info"}),"] npm package, but you can override any of its properties,\nas shown above in the example."]}),"\n",(0,r.jsx)(t.h2,{id:"overrides",children:"Overrides"}),"\n",(0,r.jsxs)(t.p,{children:["In the table below you can see all available ",(0,r.jsx)(t.code,{children:"ExecutorInfo"})," properties:"]}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Property"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"name"})}),(0,r.jsx)(t.td,{children:"A human-readable name of the executor, e.g. Jenkins, Teamcity, etc."})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"type"})}),(0,r.jsxs)(t.td,{children:["Executor type (",(0,r.jsx)(t.code,{children:"jenkins"}),", ",(0,r.jsx)(t.code,{children:"teamcity"}),", ",(0,r.jsx)(t.code,{children:"bamboo"}),", etc.), determines the icon in the report."]})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"buildName"})}),(0,r.jsx)(t.td,{children:"Display name of the build in the Executor widget."})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"buildUrl"})}),(0,r.jsxs)(t.td,{children:["Makes ",(0,r.jsx)(t.code,{children:"buildName"})," link clickable in the Executor widget to take you to the build page."]})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"buildOrder"})}),(0,r.jsx)(t.td,{children:"Index of the build, used to sort builds chronologically in the [Trend] widget."})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"reportUrl"})}),(0,r.jsx)(t.td,{children:"URL of the current Allure report, used to navigate between reports in the [Trend] widget."})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"reportName"})}),(0,r.jsx)(t.td,{children:"Name of the current Allure report. Purpose is unclear."})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"url"})}),(0,r.jsx)(t.td,{children:"Base URL of the server where Allure reports are hosted. Purpose is unclear."})]})]})]}),"\n",(0,r.jsxs)(t.section,{"data-footnotes":!0,className:"footnotes",children:[(0,r.jsx)(t.h2,{className:"sr-only",id:"footnote-label",children:"Footnotes"}),"\n",(0,r.jsxs)(t.ol,{children:["\n",(0,r.jsxs)(t.li,{id:"user-content-fn-1",children:["\n",(0,r.jsxs)(t.p,{children:["On a more serious note, it is not entirely unheard of for a build agent to have a faulty hardware component, such as a faulty RAM module. Such issues can be hard to detect, as they may only manifest themselves under heavy load, or when the agent is running a specific type of tests. ",(0,r.jsx)(t.a,{href:"#user-content-fnref-1","data-footnote-backref":!0,className:"data-footnote-backref","aria-label":"Back to content",children:"\u21a9"})]}),"\n"]}),"\n"]}),"\n"]})]})}const f=function(e={}){const{wrapper:t}=Object.assign({},(0,s.ah)(),e.components);return t?(0,r.jsx)(t,Object.assign({},e,{children:(0,r.jsx)(h,e)})):h(e)}},425:(e,t,n)=>{n.d(t,{Z:()=>a});n(7294);var r=n(6010);const s={tabItem:"tabItem_Ymn6"};var o=n(5893);function a(e){let{children:t,hidden:n,className:a}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,r.Z)(s.tabItem,a),hidden:n,children:t})}},3992:(e,t,n)=>{n.d(t,{Z:()=>w});var r=n(7294),s=n(6010),o=n(2957),a=n(6550),i=n(1270),l=n(5238),c=n(3609),u=n(2560);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:s}}=e;return{value:t,label:n,attributes:r,default:s}}))}(n);return function(e){const t=(0,c.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function f(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function p(e){let{queryString:t=!1,groupId:n}=e;const s=(0,a.k6)(),o=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,l._X)(o),(0,r.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(s.location.search);t.set(o,e),s.replace({...s.location,search:t.toString()})}),[o,s])]}function x(e){const{defaultValue:t,queryString:n=!1,groupId:s}=e,o=h(e),[a,l]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!f({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:o}))),[c,d]=p({queryString:n,groupId:s}),[x,b]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[s,o]=(0,u.Nk)(n);return[s,(0,r.useCallback)((e=>{n&&o.set(e)}),[n,o])]}({groupId:s}),m=(()=>{const e=c??x;return f({value:e,tabValues:o})?e:null})();(0,i.Z)((()=>{m&&l(m)}),[m]);return{selectedValue:a,selectValue:(0,r.useCallback)((e=>{if(!f({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);l(e),d(e),b(e)}),[d,b,o]),tabValues:o}}var b=n(1048);const m={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var j=n(5893);function g(e){let{className:t,block:n,selectedValue:r,selectValue:a,tabValues:i}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,o.o5)(),u=e=>{const t=e.currentTarget,n=l.indexOf(t),s=i[n].value;s!==r&&(c(t),a(s))},d=e=>{let t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const n=l.indexOf(e.currentTarget)+1;t=l[n]??l[0];break}case"ArrowLeft":{const n=l.indexOf(e.currentTarget)-1;t=l[n]??l[l.length-1];break}}t?.focus()};return(0,j.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":n},t),children:i.map((e=>{let{value:t,label:n,attributes:o}=e;return(0,j.jsx)("li",{role:"tab",tabIndex:r===t?0:-1,"aria-selected":r===t,ref:e=>l.push(e),onKeyDown:d,onClick:u,...o,className:(0,s.Z)("tabs__item",m.tabItem,o?.className,{"tabs__item--active":r===t}),children:n??t},t)}))})}function y(e){let{lazy:t,children:n,selectedValue:s}=e;const o=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===s));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,j.jsx)("div",{className:"margin-top--md",children:o.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==s})))})}function v(e){const t=x(e);return(0,j.jsxs)("div",{className:(0,s.Z)("tabs-container",m.tabList),children:[(0,j.jsx)(g,{...e,...t}),(0,j.jsx)(y,{...e,...t})]})}function w(e){const t=(0,b.Z)();return(0,j.jsx)(v,{...e,children:d(e.children)},String(t))}},9161:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/config-executor-01-e723b7171e517fbb606409ad466251f8.jpg"},1151:(e,t,n)=>{n.d(t,{Zo:()=>i,ah:()=>o});var r=n(7294);const s=r.createContext({});function o(e){const t=r.useContext(s);return r.useMemo((()=>"function"==typeof e?e(t):{...t,...e}),[t,e])}const a={};function i({components:e,children:t,disableParentContext:n}){let i;return i=n?"function"==typeof e?e({}):e||a:o(e),r.createElement(s.Provider,{value:i},t)}}}]);