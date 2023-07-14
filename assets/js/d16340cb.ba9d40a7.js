"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[701],{6931:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>c,toc:()=>d});var s=t(2322),r=t(5392),a=t(2605),l=t(3142);const o={description:"Track your test cases in external systems and link them to your Allure report."},i="Links",c={unversionedId:"docs/api/links",id:"docs/api/links",title:"Links",description:"Track your test cases in external systems and link them to your Allure report.",source:"@site/../../docs/docs/api/07-links.mdx",sourceDirName:"docs/api",slug:"/docs/api/links",permalink:"/jest-allure2-reporter/docs/api/links",draft:!1,unlisted:!1,editUrl:"https://github.com/wix-incubator/jest-allure2-reporter/tree/master/docs/../../docs/docs/api/07-links.mdx",tags:[],version:"current",sidebarPosition:7,frontMatter:{description:"Track your test cases in external systems and link them to your Allure report."},sidebar:"docsSidebar",previous:{title:"Severity",permalink:"/jest-allure2-reporter/docs/api/severity"},next:{title:"Labels",permalink:"/jest-allure2-reporter/docs/api/labels"}},u={},d=[{value:"Issue Links",id:"issue-links",level:2},{value:"TMS Links",id:"tms-links",level:2},{value:"Custom Links",id:"custom-links",level:2},{value:"Configuration",id:"configuration",level:2}];function h(e){const n=Object.assign({h1:"h1",admonition:"admonition",p:"p",code:"code",ul:"ul",li:"li",strong:"strong",h2:"h2",pre:"pre",a:"a"},(0,r.ah)(),e.components);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"links",children:"Links"}),"\n",(0,s.jsx)(n.admonition,{type:"caution",children:(0,s.jsxs)(n.p,{children:["This website version refers to the unreleased version of ",(0,s.jsx)(n.code,{children:"jest-allure2-reporter"})," and is not yet available\nanywhere. Please use GitHub docs for the latest stable version."]})}),"\n",(0,s.jsx)(n.p,{children:"In Allure reports, you can add different types of links to your test cases for better context and traceability, e.g.:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["links to ",(0,s.jsx)(n.strong,{children:"issues"})," in your issue tracker (e.g. JIRA, GitHub, etc.);"]}),"\n",(0,s.jsxs)(n.li,{children:["links to test cases in your Test Management System (",(0,s.jsx)(n.strong,{children:"TMS"}),");"]}),"\n",(0,s.jsxs)(n.li,{children:["links to any ",(0,s.jsx)(n.strong,{children:"custom"})," URL."]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"There are two ways to add links to your test cases:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["declaratively, using JSDoc annotations such as ",(0,s.jsx)(n.code,{children:"@link"}),", ",(0,s.jsx)(n.code,{children:"@issue"}),", and ",(0,s.jsx)(n.code,{children:"@tms"}),";"]}),"\n",(0,s.jsxs)(n.li,{children:["programmatically, using annotation functions from the 'jest-allure2-reporter/annotations' package such as ",(0,s.jsx)(n.code,{children:"$Link"}),", ",(0,s.jsx)(n.code,{children:"$Issue"}),", and ",(0,s.jsx)(n.code,{children:"$TmsLink"}),"."]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"issue-links",children:"Issue Links"}),"\n",(0,s.jsx)(n.p,{children:"You can link an issue in your issue tracker to a test case."}),"\n",(0,s.jsxs)(a.Z,{groupId:"approach",children:[(0,s.jsx)(l.Z,{value:"jsdoc",label:"JSDoc",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"it('should validate non-ASCII passwords', () => {\n  /**\n   * A customer ticket from our Support team.\n   * @issue AUTH-123\n   */\n\n  /* ... test code ... */\n});\n"})})}),(0,s.jsx)(l.Z,{value:"dsl",label:"Function",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"import { $Issue } from 'jest-allure2-reporter/annotations';\n\n// A customer ticket from our Support team.\n$Issue('AUTH-123');\nit('should validate non-ASCII passwords', () => {\n  /* ... test code ... */\n});\n"})})}),(0,s.jsx)(l.Z,{value:"demo",label:"Demo",children:(0,s.jsx)(n.p,{children:"TODO: add screenshot"})})]}),"\n",(0,s.jsx)(n.h2,{id:"tms-links",children:"TMS Links"}),"\n",(0,s.jsx)(n.p,{children:"You can link a test case in your Test Management System (TMS) to a test case as shown below."}),"\n",(0,s.jsxs)(a.Z,{groupId:"approach",children:[(0,s.jsx)(l.Z,{value:"jsdoc",label:"JSDoc",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"it('should be connected to TMS', () => {\n  /**\n   * @tms TMS-123\n   */\n\n  /* ... test code ... */\n});\n"})})}),(0,s.jsx)(l.Z,{value:"dsl",label:"Function",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"import { $TmsLink } from 'jest-allure2-reporter/annotations';\n\n$TmsLink('TMS-123');\nit('should be connected to TMS', () => {\n  /* ... */\n});\n"})})}),(0,s.jsx)(l.Z,{value:"demo",label:"Demo",children:(0,s.jsx)(n.p,{children:"TODO: add screenshot"})})]}),"\n",(0,s.jsx)(n.h2,{id:"custom-links",children:"Custom Links"}),"\n",(0,s.jsx)(n.p,{children:"You can link an arbitrary URL to a test case:"}),"\n",(0,s.jsxs)(a.Z,{groupId:"approach",children:[(0,s.jsx)(l.Z,{value:"jsdoc",label:"JSDoc",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"it('should demonstrate how the links work', () => {\n  /**\n   * @link https://example.com/custom\n   */\n\n  /* ... test code ... */\n});\n"})})}),(0,s.jsx)(l.Z,{value:"dsl",label:"Function",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"import { $Link } from 'jest-allure2-reporter/annotations';\n\n$Link('https://example.com/custom');\nit('should demonstrate how the links work', () => {\n  /* ... */\n});\n"})})}),(0,s.jsx)(l.Z,{value:"demo",label:"Demo",children:(0,s.jsx)(n.p,{children:"TODO: add screenshot"})})]}),"\n",(0,s.jsxs)(n.p,{children:["Advanced users can also specify a custom link type and ",(0,s.jsx)(n.a,{href:"#configuration",children:"configure the URL pattern"})," for it."]}),"\n",(0,s.jsxs)(a.Z,{groupId:"approach",children:[(0,s.jsx)(l.Z,{value:"jsdoc",label:"JSDoc",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"it('should demonstrate how the links work', () => {\n/**\n * @link docs features/links\n */\n\n  /* ... test code ... */\n});\n"})})}),(0,s.jsx)(l.Z,{value:"dsl",label:"Function",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"import { $Link } from 'jest-allure2-reporter/annotations';\n\n$Link('docs', 'features/links');\nit('should demonstrate how the links work', () => {\n  /* ... */\n});\n"})})}),(0,s.jsx)(l.Z,{value:"demo",label:"Demo",children:(0,s.jsx)(n.p,{children:"TODO: add screenshot"})})]}),"\n",(0,s.jsx)(n.h2,{id:"configuration",children:"Configuration"}),"\n",(0,s.jsx)(n.admonition,{title:"Work in progress",type:"caution"}),"\n",(0,s.jsxs)(n.p,{children:["To handle link generation for custom link types, TMS, and issue ids, you need to configure the 'jest-allure2-reporter' in your ",(0,s.jsx)(n.code,{children:"jest.config.js"})," file."]}),"\n",(0,s.jsx)(n.p,{children:"You can specify URL patterns for each type of link. When generating the Allure report, the annotation function or JSDoc will replace the ID in the URL pattern with the actual ID provided in your test case."}),"\n",(0,s.jsx)(n.p,{children:"Below is an example configuration:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'module.exports = {\n  reporters: [\n    [\n      "jest-allure2-reporter",\n      {\n        issueLinkTemplate: "http://your-tracker.com/issue/{}",\n        tmsLinkTemplate: "http://your-tms.com/case/{}",\n        customLinkTemplate: "https://your-custom-url/{}"\n      }\n    ]\n  ]\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["In this example, ",(0,s.jsx)(n.code,{children:"{}"})," will be replaced with the issue id, tms id, or custom id you've specified"]})]})}const p=function(e={}){const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?(0,s.jsx)(n,Object.assign({},e,{children:(0,s.jsx)(h,e)})):h(e)}},3142:(e,n,t)=>{t.d(n,{Z:()=>l});t(2784);var s=t(6277);const r={tabItem:"tabItem_OMyP"};var a=t(2322);function l(e){let{children:n,hidden:t,className:l}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,s.Z)(r.tabItem,l),hidden:t,children:n})}},2605:(e,n,t)=>{t.d(n,{Z:()=>y});var s=t(2784),r=t(6277),a=t(5425),l=t(7267),o=t(9065),i=t(4236),c=t(3432),u=t(9675);function d(e){return s.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,s.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:t}=e;return(0,s.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:t,attributes:s,default:r}}=e;return{value:n,label:t,attributes:s,default:r}}))}(t);return function(e){const n=(0,c.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function p(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:t}=e;const r=(0,l.k6)(),a=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,i._X)(a),(0,s.useCallback)((e=>{if(!a)return;const n=new URLSearchParams(r.location.search);n.set(a,e),r.replace({...r.location,search:n.toString()})}),[a,r])]}function j(e){const{defaultValue:n,queryString:t=!1,groupId:r}=e,a=h(e),[l,i]=(0,s.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const s=t.find((e=>e.default))??t[0];if(!s)throw new Error("Unexpected error: 0 tabValues");return s.value}({defaultValue:n,tabValues:a}))),[c,d]=m({queryString:t,groupId:r}),[j,x]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[r,a]=(0,u.Nk)(t);return[r,(0,s.useCallback)((e=>{t&&a.set(e)}),[t,a])]}({groupId:r}),f=(()=>{const e=c??j;return p({value:e,tabValues:a})?e:null})();(0,o.Z)((()=>{f&&i(f)}),[f]);return{selectedValue:l,selectValue:(0,s.useCallback)((e=>{if(!p({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);i(e),d(e),x(e)}),[d,x,a]),tabValues:a}}var x=t(717);const f={tabList:"tabList_M0Dn",tabItem:"tabItem_ysIP"};var b=t(2322);function k(e){let{className:n,block:t,selectedValue:s,selectValue:l,tabValues:o}=e;const i=[],{blockElementScrollPositionUntilNextRender:c}=(0,a.o5)(),u=e=>{const n=e.currentTarget,t=i.indexOf(n),r=o[t].value;r!==s&&(c(n),l(r))},d=e=>{let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const t=i.indexOf(e.currentTarget)+1;n=i[t]??i[0];break}case"ArrowLeft":{const t=i.indexOf(e.currentTarget)-1;n=i[t]??i[i.length-1];break}}n?.focus()};return(0,b.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":t},n),children:o.map((e=>{let{value:n,label:t,attributes:a}=e;return(0,b.jsx)("li",{role:"tab",tabIndex:s===n?0:-1,"aria-selected":s===n,ref:e=>i.push(e),onKeyDown:d,onClick:u,...a,className:(0,r.Z)("tabs__item",f.tabItem,a?.className,{"tabs__item--active":s===n}),children:t??n},n)}))})}function g(e){let{lazy:n,children:t,selectedValue:r}=e;const a=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=a.find((e=>e.props.value===r));return e?(0,s.cloneElement)(e,{className:"margin-top--md"}):null}return(0,b.jsx)("div",{className:"margin-top--md",children:a.map(((e,n)=>(0,s.cloneElement)(e,{key:n,hidden:e.props.value!==r})))})}function v(e){const n=j(e);return(0,b.jsxs)("div",{className:(0,r.Z)("tabs-container",f.tabList),children:[(0,b.jsx)(k,{...e,...n}),(0,b.jsx)(g,{...e,...n})]})}function y(e){const n=(0,x.Z)();return(0,b.jsx)(v,{...e,children:d(e.children)},String(n))}},5392:(e,n,t)=>{t.d(n,{Zo:()=>o,ah:()=>a});var s=t(2784);const r=s.createContext({});function a(e){const n=s.useContext(r);return s.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const l={};function o({components:e,children:n,disableParentContext:t}){let o;return o=t?"function"==typeof e?e({}):e||l:a(e),s.createElement(r.Provider,{value:o},n)}}}]);