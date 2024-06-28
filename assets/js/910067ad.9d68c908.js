"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[112],{7017:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>c,toc:()=>d});var r=t(5893),s=t(1151),a=t(3992),l=t(425);const o={description:"Track your test cases in external systems and link them to your Allure report."},i="Links",c={id:"docs/api/links",title:"Links",description:"Track your test cases in external systems and link them to your Allure report.",source:"@site/../docs/docs/api/07-links.mdx",sourceDirName:"docs/api",slug:"/docs/api/links",permalink:"/jest-allure2-reporter/docs/api/links",draft:!1,unlisted:!1,editUrl:"https://github.com/wix-incubator/jest-allure2-reporter/tree/beta/docs/../docs/docs/api/07-links.mdx",tags:[],version:"current",lastUpdatedBy:"Yaroslav Serhieiev",lastUpdatedAt:1714818852e3,sidebarPosition:7,frontMatter:{description:"Track your test cases in external systems and link them to your Allure report."},sidebar:"docsSidebar",previous:{title:"Severity",permalink:"/jest-allure2-reporter/docs/api/severity"},next:{title:"Labels",permalink:"/jest-allure2-reporter/docs/api/labels"}},u={},d=[{value:"Issue Links",id:"issue-links",level:2},{value:"TMS Links",id:"tms-links",level:2},{value:"Custom Links",id:"custom-links",level:2},{value:"Configuration",id:"configuration",level:2}];function h(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...e.components},{ArticleHeader:t}=n;return t||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("ArticleHeader",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"links",children:"Links"}),"\n",(0,r.jsx)(t,{}),"\n",(0,r.jsx)(n.p,{children:"In Allure reports, you can add different types of links to your test cases for better context and traceability, e.g.:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["links to ",(0,r.jsx)(n.strong,{children:"issues"})," in your issue tracker (e.g. JIRA, GitHub, etc.);"]}),"\n",(0,r.jsxs)(n.li,{children:["links to test cases in your Test Management System (",(0,r.jsx)(n.strong,{children:"TMS"}),");"]}),"\n",(0,r.jsxs)(n.li,{children:["links to any ",(0,r.jsx)(n.strong,{children:"custom"})," URL."]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"There are two ways to add links to your test cases:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["declaratively, using JSDoc annotations such as ",(0,r.jsx)(n.code,{children:"@link"}),", ",(0,r.jsx)(n.code,{children:"@issue"}),", and ",(0,r.jsx)(n.code,{children:"@tms"}),";"]}),"\n",(0,r.jsxs)(n.li,{children:["programmatically, using annotation functions from the 'jest-allure2-reporter/api' package such as ",(0,r.jsx)(n.code,{children:"$Link"}),", ",(0,r.jsx)(n.code,{children:"$Issue"}),", and ",(0,r.jsx)(n.code,{children:"$TmsLink"}),"."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"issue-links",children:"Issue Links"}),"\n",(0,r.jsx)(n.p,{children:"You can link an issue in your issue tracker to a test case."}),"\n",(0,r.jsxs)(a.Z,{groupId:"approach",children:[(0,r.jsx)(l.Z,{value:"docblock",label:"Docblocks",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"it('should validate non-ASCII passwords', () => {\n  /**\n   * A customer ticket from our Support team.\n   * @issue AUTH-123\n   */\n\n  /* ... test code ... */\n});\n"})})}),(0,r.jsx)(l.Z,{value:"dsl",label:"DSL",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { $Issue } from 'jest-allure2-reporter/api';\n\n// A customer ticket from our Support team.\n$Issue('AUTH-123');\nit('should validate non-ASCII passwords', () => {\n  /* ... test code ... */\n});\n"})})}),(0,r.jsx)(l.Z,{value:"demo",label:"Preview",children:(0,r.jsx)(n.p,{children:"TODO: add screenshot"})})]}),"\n",(0,r.jsx)(n.h2,{id:"tms-links",children:"TMS Links"}),"\n",(0,r.jsx)(n.p,{children:"You can link a test case in your Test Management System (TMS) to a test case as shown below."}),"\n",(0,r.jsxs)(a.Z,{groupId:"approach",children:[(0,r.jsx)(l.Z,{value:"docblock",label:"Docblocks",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"it('should be connected to TMS', () => {\n  /**\n   * @tms TMS-123\n   */\n\n  /* ... test code ... */\n});\n"})})}),(0,r.jsx)(l.Z,{value:"dsl",label:"DSL",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { $TmsLink } from 'jest-allure2-reporter/api';\n\n$TmsLink('TMS-123');\nit('should be connected to TMS', () => {\n  /* ... */\n});\n"})})}),(0,r.jsx)(l.Z,{value:"demo",label:"Preview",children:(0,r.jsx)(n.p,{children:"TODO: add screenshot"})})]}),"\n",(0,r.jsx)(n.h2,{id:"custom-links",children:"Custom Links"}),"\n",(0,r.jsx)(n.p,{children:"You can link an arbitrary URL to a test case:"}),"\n",(0,r.jsxs)(a.Z,{groupId:"approach",children:[(0,r.jsx)(l.Z,{value:"docblock",label:"Docblocks",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"it('should demonstrate how the links work', () => {\n  /**\n   * @link https://example.com/custom\n   */\n\n  /* ... test code ... */\n});\n"})})}),(0,r.jsx)(l.Z,{value:"dsl",label:"DSL",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { $Link } from 'jest-allure2-reporter/api';\n\n$Link('https://example.com/custom');\nit('should demonstrate how the links work', () => {\n  /* ... */\n});\n"})})}),(0,r.jsx)(l.Z,{value:"demo",label:"Preview",children:(0,r.jsx)(n.p,{children:"TODO: add screenshot"})})]}),"\n",(0,r.jsxs)(n.p,{children:["Advanced users can also specify a custom link type and ",(0,r.jsx)(n.a,{href:"#configuration",children:"configure the URL pattern"})," for it."]}),"\n",(0,r.jsxs)(a.Z,{groupId:"approach",children:[(0,r.jsx)(l.Z,{value:"docblock",label:"Docblocks",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"it('should demonstrate how the links work', () => {\n/**\n * @link docs features/links\n */\n\n  /* ... test code ... */\n});\n"})})}),(0,r.jsx)(l.Z,{value:"dsl",label:"DSL",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { $Link } from 'jest-allure2-reporter/api';\n\n$Link('docs', 'features/links');\nit('should demonstrate how the links work', () => {\n  /* ... */\n});\n"})})}),(0,r.jsx)(l.Z,{value:"demo",label:"Preview",children:(0,r.jsx)(n.p,{children:"TODO: add screenshot"})})]}),"\n",(0,r.jsx)(n.h2,{id:"configuration",children:"Configuration"}),"\n",(0,r.jsx)(n.admonition,{title:"Work in progress",type:"caution"}),"\n",(0,r.jsxs)(n.p,{children:["To handle link generation for custom link types, TMS, and issue ids, you need to configure the 'jest-allure2-reporter' in your ",(0,r.jsx)(n.code,{children:"jest.config.js"})," file."]}),"\n",(0,r.jsx)(n.p,{children:"You can specify URL patterns for each type of link. When generating the Allure report, the annotation function or JSDoc will replace the ID in the URL pattern with the actual ID provided in your test case."}),"\n",(0,r.jsx)(n.p,{children:"Below is an example configuration:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:'module.exports = {\n  reporters: [\n    [\n      "jest-allure2-reporter",\n      {\n        issueLinkTemplate: "http://your-tracker.com/issue/{}",\n        tmsLinkTemplate: "http://your-tms.com/case/{}",\n        customLinkTemplate: "https://your-custom-url/{}"\n      }\n    ]\n  ]\n}\n'})}),"\n",(0,r.jsxs)(n.p,{children:["In this example, ",(0,r.jsx)(n.code,{children:"{}"})," will be replaced with the issue id, tms id, or custom id you've specified"]})]})}function p(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},425:(e,n,t)=>{t.d(n,{Z:()=>l});t(7294);var r=t(512);const s={tabItem:"tabItem_Ymn6"};var a=t(5893);function l(e){let{children:n,hidden:t,className:l}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,r.Z)(s.tabItem,l),hidden:t,children:n})}},3992:(e,n,t)=>{t.d(n,{Z:()=>y});var r=t(7294),s=t(512),a=t(2957),l=t(6550),o=t(1270),i=t(5238),c=t(3609),u=t(2560);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:t}=e;return(0,r.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:t,attributes:r,default:s}}=e;return{value:n,label:t,attributes:r,default:s}}))}(t);return function(e){const n=(0,c.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function p(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:t}=e;const s=(0,l.k6)(),a=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,i._X)(a),(0,r.useCallback)((e=>{if(!a)return;const n=new URLSearchParams(s.location.search);n.set(a,e),s.replace({...s.location,search:n.toString()})}),[a,s])]}function j(e){const{defaultValue:n,queryString:t=!1,groupId:s}=e,a=h(e),[l,i]=(0,r.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:a}))),[c,d]=m({queryString:t,groupId:s}),[j,x]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[s,a]=(0,u.Nk)(t);return[s,(0,r.useCallback)((e=>{t&&a.set(e)}),[t,a])]}({groupId:s}),f=(()=>{const e=c??j;return p({value:e,tabValues:a})?e:null})();(0,o.Z)((()=>{f&&i(f)}),[f]);return{selectedValue:l,selectValue:(0,r.useCallback)((e=>{if(!p({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);i(e),d(e),x(e)}),[d,x,a]),tabValues:a}}var x=t(1048);const f={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var b=t(5893);function k(e){let{className:n,block:t,selectedValue:r,selectValue:l,tabValues:o}=e;const i=[],{blockElementScrollPositionUntilNextRender:c}=(0,a.o5)(),u=e=>{const n=e.currentTarget,t=i.indexOf(n),s=o[t].value;s!==r&&(c(n),l(s))},d=e=>{let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const t=i.indexOf(e.currentTarget)+1;n=i[t]??i[0];break}case"ArrowLeft":{const t=i.indexOf(e.currentTarget)-1;n=i[t]??i[i.length-1];break}}n?.focus()};return(0,b.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":t},n),children:o.map((e=>{let{value:n,label:t,attributes:a}=e;return(0,b.jsx)("li",{role:"tab",tabIndex:r===n?0:-1,"aria-selected":r===n,ref:e=>i.push(e),onKeyDown:d,onClick:u,...a,className:(0,s.Z)("tabs__item",f.tabItem,a?.className,{"tabs__item--active":r===n}),children:t??n},n)}))})}function g(e){let{lazy:n,children:t,selectedValue:s}=e;const a=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=a.find((e=>e.props.value===s));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,b.jsx)("div",{className:"margin-top--md",children:a.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==s})))})}function v(e){const n=j(e);return(0,b.jsxs)("div",{className:(0,s.Z)("tabs-container",f.tabList),children:[(0,b.jsx)(k,{...e,...n}),(0,b.jsx)(g,{...e,...n})]})}function y(e){const n=(0,x.Z)();return(0,b.jsx)(v,{...e,children:d(e.children)},String(n))}},1151:(e,n,t)=>{t.d(n,{Z:()=>o,a:()=>l});var r=t(7294);const s={},a=r.createContext(s);function l(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);