"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[444],{5917:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>d,contentTitle:()=>o,default:()=>p,frontMatter:()=>l,metadata:()=>c,toc:()=>u});var n=s(5893),r=s(1151),i=s(3992),a=s(425);const l={description:"Prioritize your test cases and their impact on the product."},o="Severity",c={unversionedId:"docs/api/severity",id:"docs/api/severity",title:"Severity",description:"Prioritize your test cases and their impact on the product.",source:"@site/../docs/docs/api/06-severity.mdx",sourceDirName:"docs/api",slug:"/docs/api/severity",permalink:"/jest-allure2-reporter/docs/api/severity",draft:!1,unlisted:!1,editUrl:"https://github.com/wix-incubator/jest-allure2-reporter/tree/alpha/docs/../docs/docs/api/06-severity.mdx",tags:[],version:"current",sidebarPosition:6,frontMatter:{description:"Prioritize your test cases and their impact on the product."},sidebar:"docsSidebar",previous:{title:"People",permalink:"/jest-allure2-reporter/docs/api/people"},next:{title:"Links",permalink:"/jest-allure2-reporter/docs/api/links"}},d={},u=[{value:"Test file",id:"test-file",level:2},{value:"Test suite",id:"test-suite",level:2},{value:"Test case",id:"test-case",level:2},{value:"About severity levels",id:"about-severity-levels",level:2}];function h(e){const t=Object.assign({h1:"h1",admonition:"admonition",p:"p",code:"code",strong:"strong",em:"em",ul:"ul",li:"li",h2:"h2",pre:"pre"},(0,r.ah)(),e.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"severity",children:"Severity"}),"\n",(0,n.jsx)(t.admonition,{type:"caution",children:(0,n.jsxs)(t.p,{children:["This website version refers to the unreleased version of ",(0,n.jsx)(t.code,{children:"jest-allure2-reporter"}),", partially available as ",(0,n.jsx)(t.code,{children:"2.0.0-alpha.*"})," release.\nPlease use GitHub docs for the latest stable version, ",(0,n.jsx)(t.code,{children:"1.x.x"}),"."]})}),"\n",(0,n.jsxs)(t.p,{children:["In Allure reports, you can determine the ",(0,n.jsx)(t.strong,{children:"severity"})," of each test case.\nThis helps you to prioritize the test cases and to determine the impact of a failed test case.\nThe severity can be one of the following values: ",(0,n.jsx)(t.em,{children:"blocker"}),", ",(0,n.jsx)(t.em,{children:"critical"}),", ",(0,n.jsx)(t.em,{children:"normal"}),", ",(0,n.jsx)(t.em,{children:"minor"}),", ",(0,n.jsx)(t.em,{children:"trivial"}),".\nThe default severity is ",(0,n.jsx)(t.strong,{children:(0,n.jsx)(t.em,{children:"normal"})}),"."]}),"\n",(0,n.jsx)(t.p,{children:"There are two ways to define the severity of a test case:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:["declaratively, via ",(0,n.jsx)(t.code,{children:"@severity"})," JSDoc annotation;"]}),"\n",(0,n.jsxs)(t.li,{children:["programmatically, via ",(0,n.jsx)(t.code,{children:"$Severity"})," annotation function."]}),"\n"]}),"\n",(0,n.jsxs)(t.p,{children:["The ",(0,n.jsx)(t.strong,{children:"severity"})," can be defined in the following places:"]}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:["on a ",(0,n.jsx)(t.em,{children:"test file"})," level;"]}),"\n",(0,n.jsxs)(t.li,{children:["on a ",(0,n.jsx)(t.em,{children:"test suite"})," level;"]}),"\n",(0,n.jsxs)(t.li,{children:["on a ",(0,n.jsx)(t.em,{children:"test case"})," level."]}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"test-file",children:"Test file"}),"\n",(0,n.jsxs)(t.p,{children:["In a test file, you can define the severity for all test cases in the file.\nThis is especially useful for test files that contain multiple top-level ",(0,n.jsx)(t.code,{children:"describe"})," blocks."]}),"\n",(0,n.jsxs)(i.Z,{groupId:"approach",children:[(0,n.jsx)(a.Z,{value:"jsdoc",label:"JSDoc",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"/**\n * @severity critical\n */\n\ndescribe('Sanity: Login flow', () => {\n  it('should login with valid credentials', () => {\n    /* ... test code ... */\n  });\n});\n\ndescribe('Sanity: Dashboard', () => {\n  it('should show the dashboard', () => {\n    /* ... test code ... */\n  });\n});\n"})})}),(0,n.jsx)(a.Z,{value:"dsl",label:"Function",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"import { allure } from 'jest-allure2-reporter';\n\nallure.severity('critical');\n\ndescribe('Sanity: Login flow', () => {\n  it('should login with valid credentials', () => {\n    /* ... test code ... */\n  });\n});\n\ndescribe('Sanity: Dashboard', () => {\n  it('should show the dashboard', () => {\n    /* ... test code ... */\n  });\n});\n"})})}),(0,n.jsx)(a.Z,{value:"demo",label:"Demo",children:(0,n.jsx)(t.p,{children:"TODO: add screenshot"})})]}),"\n",(0,n.jsx)(t.h2,{id:"test-suite",children:"Test suite"}),"\n",(0,n.jsx)(t.p,{children:"You can define the severity for each test suite individually."}),"\n",(0,n.jsxs)(i.Z,{groupId:"approach",children:[(0,n.jsxs)(a.Z,{value:"jsdoc",label:"JSDoc",children:[(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"describe('Sanity: Login flow', () => {\n  /**\n   * @severity critical\n   */\n\n  it('should login with valid credentials', () => {\n    /* ... test code ... */\n  });\n});\n\ndescribe('Dashboard', () => {\n  /**\n   * @severity minor\n   */\n\n  it('should show the dashboard', () => {\n    /* ... test code ... */\n  });\n});\n"})}),(0,n.jsx)(t.p,{children:"Please note that you have to put the JSDoc comment inside the test suite function body."})]}),(0,n.jsx)(a.Z,{value:"dsl",label:"Function",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"import { $Severity } from 'jest-allure2-reporter/annotations';\n\n$Severity('blocker')\ndescribe('Sanity: Login flow', () => {\n  it('should login with valid credentials', () => {\n    /* ... test code ... */\n  });\n});\n\n$Severity('minor')\ndescribe('Sanity: Dashboard', () => {\n    it('should show the dashboard', () => {\n    /* ... test code ... */\n  });\n});\n"})})}),(0,n.jsx)(a.Z,{value:"demo",label:"Demo",children:(0,n.jsx)(t.p,{children:"TODO: add screenshot"})})]}),"\n",(0,n.jsx)(t.h2,{id:"test-case",children:"Test case"}),"\n",(0,n.jsx)(t.p,{children:"You can define the severity for each test case individually."}),"\n",(0,n.jsxs)(i.Z,{groupId:"approach",children:[(0,n.jsxs)(a.Z,{value:"jsdoc",label:"JSDoc",children:[(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"it('should login with valid credentials', () => {\n  /**\n   * @severity critical\n   */\n\n  /* ... test code ... */\n});\n"})}),(0,n.jsx)(t.p,{children:"Please note that you have to put the JSDoc comment inside the test function body."})]}),(0,n.jsx)(a.Z,{value:"dsl",label:"Function",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"$Severity('critical')\nit('should login with valid credentials', () => {\n  /* ... */\n});\n"})})}),(0,n.jsx)(a.Z,{value:"demo",label:"Demo",children:(0,n.jsx)(t.p,{children:"TODO: add screenshot"})})]}),"\n",(0,n.jsx)(t.h2,{id:"about-severity-levels",children:"About severity levels"}),"\n",(0,n.jsx)(t.p,{children:"Keep in mind that the meaning of each severity level is subjective and varies from project to project.\nIt is merely a convention that you can use to communicate the importance of a test case or an issue."}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"Blocker"}),": This is the highest severity level. A blocker issue or a test case failure is something that completely prevents further testing or use of the product or system. It must be addressed immediately."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"Critical"}),": A critical issue is a major problem that significantly impacts the functionality of the product or system, but does not entirely prevent its use or testing. It should be addressed as soon as possible after any blocker issues."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"Normal"}),": A normal severity issue is a moderate problem. It impacts the product or system in a noticeable way, but it's not as crucial as blocker or critical issues. It should be addressed in the course of normal workflow."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"Minor"}),": A minor issue has a small impact on the product or system. It might cause some inconvenience or confusion, but it doesn't significantly affect the overall functionality. These are usually lower priority issues."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"Trivial"}),": A trivial issue is a very minor problem, often related to aesthetics, user experience, deprecated features, or aspects of the product still in alpha or beta stages rather than core functionality. Trivial issues are the lowest priority and are typically addressed last, if at all."]}),"\n"]})]})}const p=function(e={}){const{wrapper:t}=Object.assign({},(0,r.ah)(),e.components);return t?(0,n.jsx)(t,Object.assign({},e,{children:(0,n.jsx)(h,e)})):h(e)}},425:(e,t,s)=>{s.d(t,{Z:()=>a});s(7294);var n=s(6010);const r={tabItem:"tabItem_Ymn6"};var i=s(5893);function a(e){let{children:t,hidden:s,className:a}=e;return(0,i.jsx)("div",{role:"tabpanel",className:(0,n.Z)(r.tabItem,a),hidden:s,children:t})}},3992:(e,t,s)=>{s.d(t,{Z:()=>w});var n=s(7294),r=s(6010),i=s(2957),a=s(6550),l=s(1270),o=s(5238),c=s(3609),d=s(2560);function u(e){return n.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,n.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:t,children:s}=e;return(0,n.useMemo)((()=>{const e=t??function(e){return u(e).map((e=>{let{props:{value:t,label:s,attributes:n,default:r}}=e;return{value:t,label:s,attributes:n,default:r}}))}(s);return function(e){const t=(0,c.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,s])}function p(e){let{value:t,tabValues:s}=e;return s.some((e=>e.value===t))}function m(e){let{queryString:t=!1,groupId:s}=e;const r=(0,a.k6)(),i=function(e){let{queryString:t=!1,groupId:s}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!s)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return s??null}({queryString:t,groupId:s});return[(0,o._X)(i),(0,n.useCallback)((e=>{if(!i)return;const t=new URLSearchParams(r.location.search);t.set(i,e),r.replace({...r.location,search:t.toString()})}),[i,r])]}function v(e){const{defaultValue:t,queryString:s=!1,groupId:r}=e,i=h(e),[a,o]=(0,n.useState)((()=>function(e){let{defaultValue:t,tabValues:s}=e;if(0===s.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!p({value:t,tabValues:s}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${s.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=s.find((e=>e.default))??s[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:i}))),[c,u]=m({queryString:s,groupId:r}),[v,f]=function(e){let{groupId:t}=e;const s=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,i]=(0,d.Nk)(s);return[r,(0,n.useCallback)((e=>{s&&i.set(e)}),[s,i])]}({groupId:r}),b=(()=>{const e=c??v;return p({value:e,tabValues:i})?e:null})();(0,l.Z)((()=>{b&&o(b)}),[b]);return{selectedValue:a,selectValue:(0,n.useCallback)((e=>{if(!p({value:e,tabValues:i}))throw new Error(`Can't select invalid tab value=${e}`);o(e),u(e),f(e)}),[u,f,i]),tabValues:i}}var f=s(1048);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var j=s(5893);function x(e){let{className:t,block:s,selectedValue:n,selectValue:a,tabValues:l}=e;const o=[],{blockElementScrollPositionUntilNextRender:c}=(0,i.o5)(),d=e=>{const t=e.currentTarget,s=o.indexOf(t),r=l[s].value;r!==n&&(c(t),a(r))},u=e=>{let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const s=o.indexOf(e.currentTarget)+1;t=o[s]??o[0];break}case"ArrowLeft":{const s=o.indexOf(e.currentTarget)-1;t=o[s]??o[o.length-1];break}}t?.focus()};return(0,j.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":s},t),children:l.map((e=>{let{value:t,label:s,attributes:i}=e;return(0,j.jsx)("li",{role:"tab",tabIndex:n===t?0:-1,"aria-selected":n===t,ref:e=>o.push(e),onKeyDown:u,onClick:d,...i,className:(0,r.Z)("tabs__item",b.tabItem,i?.className,{"tabs__item--active":n===t}),children:s??t},t)}))})}function y(e){let{lazy:t,children:s,selectedValue:r}=e;const i=(Array.isArray(s)?s:[s]).filter(Boolean);if(t){const e=i.find((e=>e.props.value===r));return e?(0,n.cloneElement)(e,{className:"margin-top--md"}):null}return(0,j.jsx)("div",{className:"margin-top--md",children:i.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==r})))})}function g(e){const t=v(e);return(0,j.jsxs)("div",{className:(0,r.Z)("tabs-container",b.tabList),children:[(0,j.jsx)(x,{...e,...t}),(0,j.jsx)(y,{...e,...t})]})}function w(e){const t=(0,f.Z)();return(0,j.jsx)(g,{...e,children:u(e.children)},String(t))}},1151:(e,t,s)=>{s.d(t,{Zo:()=>l,ah:()=>i});var n=s(7294);const r=n.createContext({});function i(e){const t=n.useContext(r);return n.useMemo((()=>"function"==typeof e?e(t):{...t,...e}),[t,e])}const a={};function l({components:e,children:t,disableParentContext:s}){let l;return l=s?"function"==typeof e?e({}):e||a:i(e),n.createElement(r.Provider,{value:l},t)}}}]);