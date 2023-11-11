"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[112],{7017:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>u,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>c,toc:()=>d});var t=s(5893),r=s(1151),l=s(3992),a=s(425);const o={description:"Track your test cases in external systems and link them to your Allure report."},i="Links",c={unversionedId:"docs/api/links",id:"docs/api/links",title:"Links",description:"Track your test cases in external systems and link them to your Allure report.",source:"@site/../docs/docs/api/07-links.mdx",sourceDirName:"docs/api",slug:"/docs/api/links",permalink:"/jest-allure2-reporter/docs/api/links",draft:!1,unlisted:!1,editUrl:"https://github.com/wix-incubator/jest-allure2-reporter/tree/alpha/docs/../docs/docs/api/07-links.mdx",tags:[],version:"current",sidebarPosition:7,frontMatter:{description:"Track your test cases in external systems and link them to your Allure report."},sidebar:"docsSidebar",previous:{title:"Severity",permalink:"/jest-allure2-reporter/docs/api/severity"},next:{title:"Labels",permalink:"/jest-allure2-reporter/docs/api/labels"}},u={},d=[{value:"Issue Links",id:"issue-links",level:2},{value:"TMS Links",id:"tms-links",level:2},{value:"Custom Links",id:"custom-links",level:2},{value:"Configuration",id:"configuration",level:2}];function h(e){const n=Object.assign({h1:"h1",admonition:"admonition",p:"p",code:"code",ul:"ul",li:"li",strong:"strong",h2:"h2",pre:"pre",a:"a"},(0,r.ah)(),e.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"links",children:"Links"}),"\n",(0,t.jsx)(n.admonition,{type:"caution",children:(0,t.jsxs)(n.p,{children:["This website version refers to the unreleased version of ",(0,t.jsx)(n.code,{children:"jest-allure2-reporter"}),", partially available as ",(0,t.jsx)(n.code,{children:"2.0.0-alpha.*"})," release.\nPlease use GitHub docs for the latest stable version, ",(0,t.jsx)(n.code,{children:"1.x.x"}),"."]})}),"\n",(0,t.jsx)(n.p,{children:"In Allure reports, you can add different types of links to your test cases for better context and traceability, e.g.:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["links to ",(0,t.jsx)(n.strong,{children:"issues"})," in your issue tracker (e.g. JIRA, GitHub, etc.);"]}),"\n",(0,t.jsxs)(n.li,{children:["links to test cases in your Test Management System (",(0,t.jsx)(n.strong,{children:"TMS"}),");"]}),"\n",(0,t.jsxs)(n.li,{children:["links to any ",(0,t.jsx)(n.strong,{children:"custom"})," URL."]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"There are two ways to add links to your test cases:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["declaratively, using JSDoc annotations such as ",(0,t.jsx)(n.code,{children:"@link"}),", ",(0,t.jsx)(n.code,{children:"@issue"}),", and ",(0,t.jsx)(n.code,{children:"@tms"}),";"]}),"\n",(0,t.jsxs)(n.li,{children:["programmatically, using annotation functions from the 'jest-allure2-reporter' package such as ",(0,t.jsx)(n.code,{children:"$Link"}),", ",(0,t.jsx)(n.code,{children:"$Issue"}),", and ",(0,t.jsx)(n.code,{children:"$TmsLink"}),"."]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"issue-links",children:"Issue Links"}),"\n",(0,t.jsx)(n.p,{children:"You can link an issue in your issue tracker to a test case."}),"\n",(0,t.jsxs)(l.Z,{groupId:"approach",children:[(0,t.jsx)(a.Z,{value:"docblock",label:"Docblocks",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"it('should validate non-ASCII passwords', () => {\n  /**\n   * A customer ticket from our Support team.\n   * @issue AUTH-123\n   */\n\n  /* ... test code ... */\n});\n"})})}),(0,t.jsx)(a.Z,{value:"dsl",label:"DSL",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"import { $Issue } from 'jest-allure2-reporter';\n\n// A customer ticket from our Support team.\n$Issue('AUTH-123');\nit('should validate non-ASCII passwords', () => {\n  /* ... test code ... */\n});\n"})})}),(0,t.jsx)(a.Z,{value:"demo",label:"Preview",children:(0,t.jsx)(n.p,{children:"TODO: add screenshot"})})]}),"\n",(0,t.jsx)(n.h2,{id:"tms-links",children:"TMS Links"}),"\n",(0,t.jsx)(n.p,{children:"You can link a test case in your Test Management System (TMS) to a test case as shown below."}),"\n",(0,t.jsxs)(l.Z,{groupId:"approach",children:[(0,t.jsx)(a.Z,{value:"docblock",label:"Docblocks",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"it('should be connected to TMS', () => {\n  /**\n   * @tms TMS-123\n   */\n\n  /* ... test code ... */\n});\n"})})}),(0,t.jsx)(a.Z,{value:"dsl",label:"DSL",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"import { $TmsLink } from 'jest-allure2-reporter';\n\n$TmsLink('TMS-123');\nit('should be connected to TMS', () => {\n  /* ... */\n});\n"})})}),(0,t.jsx)(a.Z,{value:"demo",label:"Preview",children:(0,t.jsx)(n.p,{children:"TODO: add screenshot"})})]}),"\n",(0,t.jsx)(n.h2,{id:"custom-links",children:"Custom Links"}),"\n",(0,t.jsx)(n.p,{children:"You can link an arbitrary URL to a test case:"}),"\n",(0,t.jsxs)(l.Z,{groupId:"approach",children:[(0,t.jsx)(a.Z,{value:"docblock",label:"Docblocks",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"it('should demonstrate how the links work', () => {\n  /**\n   * @link https://example.com/custom\n   */\n\n  /* ... test code ... */\n});\n"})})}),(0,t.jsx)(a.Z,{value:"dsl",label:"DSL",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"import { $Link } from 'jest-allure2-reporter';\n\n$Link('https://example.com/custom');\nit('should demonstrate how the links work', () => {\n  /* ... */\n});\n"})})}),(0,t.jsx)(a.Z,{value:"demo",label:"Preview",children:(0,t.jsx)(n.p,{children:"TODO: add screenshot"})})]}),"\n",(0,t.jsxs)(n.p,{children:["Advanced users can also specify a custom link type and ",(0,t.jsx)(n.a,{href:"#configuration",children:"configure the URL pattern"})," for it."]}),"\n",(0,t.jsxs)(l.Z,{groupId:"approach",children:[(0,t.jsx)(a.Z,{value:"docblock",label:"Docblocks",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"it('should demonstrate how the links work', () => {\n/**\n * @link docs features/links\n */\n\n  /* ... test code ... */\n});\n"})})}),(0,t.jsx)(a.Z,{value:"dsl",label:"DSL",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"import { $Link } from 'jest-allure2-reporter';\n\n$Link('docs', 'features/links');\nit('should demonstrate how the links work', () => {\n  /* ... */\n});\n"})})}),(0,t.jsx)(a.Z,{value:"demo",label:"Preview",children:(0,t.jsx)(n.p,{children:"TODO: add screenshot"})})]}),"\n",(0,t.jsx)(n.h2,{id:"configuration",children:"Configuration"}),"\n",(0,t.jsx)(n.admonition,{title:"Work in progress",type:"caution"}),"\n",(0,t.jsxs)(n.p,{children:["To handle link generation for custom link types, TMS, and issue ids, you need to configure the 'jest-allure2-reporter' in your ",(0,t.jsx)(n.code,{children:"jest.config.js"})," file."]}),"\n",(0,t.jsx)(n.p,{children:"You can specify URL patterns for each type of link. When generating the Allure report, the annotation function or JSDoc will replace the ID in the URL pattern with the actual ID provided in your test case."}),"\n",(0,t.jsx)(n.p,{children:"Below is an example configuration:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:'module.exports = {\n  reporters: [\n    [\n      "jest-allure2-reporter",\n      {\n        issueLinkTemplate: "http://your-tracker.com/issue/{}",\n        tmsLinkTemplate: "http://your-tms.com/case/{}",\n        customLinkTemplate: "https://your-custom-url/{}"\n      }\n    ]\n  ]\n}\n'})}),"\n",(0,t.jsxs)(n.p,{children:["In this example, ",(0,t.jsx)(n.code,{children:"{}"})," will be replaced with the issue id, tms id, or custom id you've specified"]})]})}const p=function(e={}){const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?(0,t.jsx)(n,Object.assign({},e,{children:(0,t.jsx)(h,e)})):h(e)}},425:(e,n,s)=>{s.d(n,{Z:()=>a});s(7294);var t=s(6010);const r={tabItem:"tabItem_Ymn6"};var l=s(5893);function a(e){let{children:n,hidden:s,className:a}=e;return(0,l.jsx)("div",{role:"tabpanel",className:(0,t.Z)(r.tabItem,a),hidden:s,children:n})}},3992:(e,n,s)=>{s.d(n,{Z:()=>y});var t=s(7294),r=s(6010),l=s(2957),a=s(6550),o=s(1270),i=s(5238),c=s(3609),u=s(2560);function d(e){return t.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,t.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:s}=e;return(0,t.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:s,attributes:t,default:r}}=e;return{value:n,label:s,attributes:t,default:r}}))}(s);return function(e){const n=(0,c.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,s])}function p(e){let{value:n,tabValues:s}=e;return s.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:s}=e;const r=(0,a.k6)(),l=function(e){let{queryString:n=!1,groupId:s}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!s)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return s??null}({queryString:n,groupId:s});return[(0,i._X)(l),(0,t.useCallback)((e=>{if(!l)return;const n=new URLSearchParams(r.location.search);n.set(l,e),r.replace({...r.location,search:n.toString()})}),[l,r])]}function j(e){const{defaultValue:n,queryString:s=!1,groupId:r}=e,l=h(e),[a,i]=(0,t.useState)((()=>function(e){let{defaultValue:n,tabValues:s}=e;if(0===s.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:s}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${s.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const t=s.find((e=>e.default))??s[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:n,tabValues:l}))),[c,d]=m({queryString:s,groupId:r}),[j,x]=function(e){let{groupId:n}=e;const s=function(e){return e?`docusaurus.tab.${e}`:null}(n),[r,l]=(0,u.Nk)(s);return[r,(0,t.useCallback)((e=>{s&&l.set(e)}),[s,l])]}({groupId:r}),b=(()=>{const e=c??j;return p({value:e,tabValues:l})?e:null})();(0,o.Z)((()=>{b&&i(b)}),[b]);return{selectedValue:a,selectValue:(0,t.useCallback)((e=>{if(!p({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);i(e),d(e),x(e)}),[d,x,l]),tabValues:l}}var x=s(1048);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var f=s(5893);function k(e){let{className:n,block:s,selectedValue:t,selectValue:a,tabValues:o}=e;const i=[],{blockElementScrollPositionUntilNextRender:c}=(0,l.o5)(),u=e=>{const n=e.currentTarget,s=i.indexOf(n),r=o[s].value;r!==t&&(c(n),a(r))},d=e=>{let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const s=i.indexOf(e.currentTarget)+1;n=i[s]??i[0];break}case"ArrowLeft":{const s=i.indexOf(e.currentTarget)-1;n=i[s]??i[i.length-1];break}}n?.focus()};return(0,f.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":s},n),children:o.map((e=>{let{value:n,label:s,attributes:l}=e;return(0,f.jsx)("li",{role:"tab",tabIndex:t===n?0:-1,"aria-selected":t===n,ref:e=>i.push(e),onKeyDown:d,onClick:u,...l,className:(0,r.Z)("tabs__item",b.tabItem,l?.className,{"tabs__item--active":t===n}),children:s??n},n)}))})}function g(e){let{lazy:n,children:s,selectedValue:r}=e;const l=(Array.isArray(s)?s:[s]).filter(Boolean);if(n){const e=l.find((e=>e.props.value===r));return e?(0,t.cloneElement)(e,{className:"margin-top--md"}):null}return(0,f.jsx)("div",{className:"margin-top--md",children:l.map(((e,n)=>(0,t.cloneElement)(e,{key:n,hidden:e.props.value!==r})))})}function v(e){const n=j(e);return(0,f.jsxs)("div",{className:(0,r.Z)("tabs-container",b.tabList),children:[(0,f.jsx)(k,{...e,...n}),(0,f.jsx)(g,{...e,...n})]})}function y(e){const n=(0,x.Z)();return(0,f.jsx)(v,{...e,children:d(e.children)},String(n))}},1151:(e,n,s)=>{s.d(n,{Zo:()=>o,ah:()=>l});var t=s(7294);const r=t.createContext({});function l(e){const n=t.useContext(r);return t.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const a={};function o({components:e,children:n,disableParentContext:s}){let o;return o=s?"function"==typeof e?e({}):e||a:l(e),t.createElement(r.Provider,{value:o},n)}}}]);