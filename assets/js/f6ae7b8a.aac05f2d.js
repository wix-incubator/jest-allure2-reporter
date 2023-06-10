"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[160],{876:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>k});var r=n(2784);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),u=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(i.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=u(n),m=a,k=p["".concat(i,".").concat(m)]||p[m]||d[m]||l;return n?r.createElement(k,o(o({ref:t},c),{},{components:n})):r.createElement(k,o({ref:t},c))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=m;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[p]="string"==typeof e?e:a,o[1]=s;for(var u=2;u<l;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3142:(e,t,n)=>{n.d(t,{Z:()=>o});var r=n(2784),a=n(6277);const l={tabItem:"tabItem_OMyP"};function o(e){let{children:t,hidden:n,className:o}=e;return r.createElement("div",{role:"tabpanel",className:(0,a.Z)(l.tabItem,o),hidden:n},t)}},2605:(e,t,n)=>{n.d(t,{Z:()=>T});var r=n(7896),a=n(2784),l=n(6277),o=n(5425),s=n(7267),i=n(4236),u=n(3432),c=n(9675);function p(e){return function(e){return a.Children.map(e,(e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:a}}=e;return{value:t,label:n,attributes:r,default:a}}))}function d(e){const{values:t,children:n}=e;return(0,a.useMemo)((()=>{const e=t??p(n);return function(e){const t=(0,u.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function m(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function k(e){let{queryString:t=!1,groupId:n}=e;const r=(0,s.k6)(),l=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,i._X)(l),(0,a.useCallback)((e=>{if(!l)return;const t=new URLSearchParams(r.location.search);t.set(l,e),r.replace({...r.location,search:t.toString()})}),[l,r])]}function f(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,l=d(e),[o,s]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:l}))),[i,u]=k({queryString:n,groupId:r}),[p,f]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,l]=(0,c.Nk)(n);return[r,(0,a.useCallback)((e=>{n&&l.set(e)}),[n,l])]}({groupId:r}),b=(()=>{const e=i??p;return m({value:e,tabValues:l})?e:null})();(0,a.useLayoutEffect)((()=>{b&&s(b)}),[b]);return{selectedValue:o,selectValue:(0,a.useCallback)((e=>{if(!m({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);s(e),u(e),f(e)}),[u,f,l]),tabValues:l}}var b=n(717);const h={tabList:"tabList_M0Dn",tabItem:"tabItem_ysIP"};function y(e){let{className:t,block:n,selectedValue:s,selectValue:i,tabValues:u}=e;const c=[],{blockElementScrollPositionUntilNextRender:p}=(0,o.o5)(),d=e=>{const t=e.currentTarget,n=c.indexOf(t),r=u[n].value;r!==s&&(p(t),i(r))},m=e=>{let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const n=c.indexOf(e.currentTarget)+1;t=c[n]??c[0];break}case"ArrowLeft":{const n=c.indexOf(e.currentTarget)-1;t=c[n]??c[c.length-1];break}}t?.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":n},t)},u.map((e=>{let{value:t,label:n,attributes:o}=e;return a.createElement("li",(0,r.Z)({role:"tab",tabIndex:s===t?0:-1,"aria-selected":s===t,key:t,ref:e=>c.push(e),onKeyDown:m,onClick:d},o,{className:(0,l.Z)("tabs__item",h.tabItem,o?.className,{"tabs__item--active":s===t})}),n??t)})))}function g(e){let{lazy:t,children:n,selectedValue:r}=e;const l=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=l.find((e=>e.props.value===r));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},l.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==r}))))}function v(e){const t=f(e);return a.createElement("div",{className:(0,l.Z)("tabs-container",h.tabList)},a.createElement(y,(0,r.Z)({},e,t)),a.createElement(g,(0,r.Z)({},e,t)))}function T(e){const t=(0,b.Z)();return a.createElement(v,(0,r.Z)({key:String(t)},e))}},1767:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>k,frontMatter:()=>s,metadata:()=>u,toc:()=>p});var r=n(7896),a=(n(2784),n(876)),l=n(2605),o=n(3142);const s={sidebar_position:7,description:"Track your test cases in external systems and link them to your Allure report."},i="Links",u={unversionedId:"annotations/links",id:"annotations/links",title:"Links",description:"Track your test cases in external systems and link them to your Allure report.",source:"@site/../../docs/annotations/links.mdx",sourceDirName:"annotations",slug:"/annotations/links",permalink:"/jest-allure2-reporter/docs/annotations/links",draft:!1,editUrl:"https://github.com/wix-incubator/jest-allure2-reporter/tree/master/docs/../../docs/annotations/links.mdx",tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7,description:"Track your test cases in external systems and link them to your Allure report."},sidebar:"docsSidebar",previous:{title:"Severity",permalink:"/jest-allure2-reporter/docs/annotations/severity"},next:{title:"Labels",permalink:"/jest-allure2-reporter/docs/annotations/labels"}},c={},p=[{value:"Issue Links",id:"issue-links",level:2},{value:"TMS Links",id:"tms-links",level:2},{value:"Custom Links",id:"custom-links",level:2},{value:"Configuration",id:"configuration",level:2}],d={toc:p},m="wrapper";function k(e){let{components:t,...n}=e;return(0,a.kt)(m,(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"links"},"Links"),(0,a.kt)("p",null,"In Allure reports, you can add different types of links to your test cases for better context and traceability, e.g.:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"links to ",(0,a.kt)("strong",{parentName:"li"},"issues")," in your issue tracker (e.g. JIRA, GitHub, etc.);"),(0,a.kt)("li",{parentName:"ul"},"links to test cases in your Test Management System (",(0,a.kt)("strong",{parentName:"li"},"TMS"),");"),(0,a.kt)("li",{parentName:"ul"},"links to any ",(0,a.kt)("strong",{parentName:"li"},"custom")," URL.")),(0,a.kt)("p",null,"There are two ways to add links to your test cases:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"declaratively, using JSDoc annotations such as ",(0,a.kt)("inlineCode",{parentName:"li"},"@link"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"@issue"),", and ",(0,a.kt)("inlineCode",{parentName:"li"},"@tmsLink"),";"),(0,a.kt)("li",{parentName:"ul"},"programmatically, using annotation functions from the 'jest-allure2-reporter/annotations' package such as ",(0,a.kt)("inlineCode",{parentName:"li"},"$Link"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"$Issue"),", and ",(0,a.kt)("inlineCode",{parentName:"li"},"$TmsLink"),".")),(0,a.kt)("h2",{id:"issue-links"},"Issue Links"),(0,a.kt)("p",null,"You can link an issue in your issue tracker to a test case."),(0,a.kt)(l.Z,{groupId:"approach",mdxType:"Tabs"},(0,a.kt)(o.Z,{value:"jsdoc",label:"JSDoc",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"it('should validate non-ASCII passwords', () => {\n  /**\n   * A customer ticket from our Support team.\n   * @issue AUTH-123\n   */\n\n  /* ... test code ... */\n});\n"))),(0,a.kt)(o.Z,{value:"dsl",label:"Function",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { $Issue } from 'jest-allure2-reporter/annotations';\n\n// A customer ticket from our Support team.\n$Issue('AUTH-123');\nit('should validate non-ASCII passwords', () => {\n  /* ... test code ... */\n});\n")))),(0,a.kt)("p",null,"This will add a link to the issue in the Allure report:"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"TODO: add screenshot")),(0,a.kt)("h2",{id:"tms-links"},"TMS Links"),(0,a.kt)("p",null,"You can link a test case in your Test Management System (TMS) to a test case as shown below."),(0,a.kt)(l.Z,{groupId:"approach",mdxType:"Tabs"},(0,a.kt)(o.Z,{value:"jsdoc",label:"JSDoc",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"it('should be connected to TMS', () => {\n  /**\n   * @tmsLink TMS-123\n   */\n\n  /* ... test code ... */\n});\n"))),(0,a.kt)(o.Z,{value:"dsl",label:"Function",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { $TmsLink } from 'jest-allure2-reporter/annotations';\n\n$TmsLink('TMS-123');\nit('should be connected to TMS', () => {\n  /* ... */\n});\n")))),(0,a.kt)("p",null,"This will add a link to the issue in the Allure report:"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"TODO: add screenshot")),(0,a.kt)("h2",{id:"custom-links"},"Custom Links"),(0,a.kt)("p",null,"You can link an arbitrary URL to a test case:"),(0,a.kt)(l.Z,{groupId:"approach",mdxType:"Tabs"},(0,a.kt)(o.Z,{value:"jsdoc",label:"JSDoc",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"it('should demonstrate how the links work', () => {\n  /**\n   * @link https://example.com/custom\n   */\n\n  /* ... test code ... */\n});\n"))),(0,a.kt)(o.Z,{value:"dsl",label:"Function",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { $Link } from 'jest-allure2-reporter/annotations';\n\n$Link('https://example.com/custom');\nit('should demonstrate how the links work', () => {\n  /* ... */\n});\n")))),(0,a.kt)("p",null,"Advanced users can also specify a custom link type:"),(0,a.kt)(l.Z,{groupId:"approach",mdxType:"Tabs"},(0,a.kt)(o.Z,{value:"jsdoc",label:"JSDoc",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"it('should demonstrate how the links work', () => {\n/**\n * @link docs features/links\n */\n\n  /* ... test code ... */\n});\n"))),(0,a.kt)(o.Z,{value:"dsl",label:"Function",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { $Link } from 'jest-allure2-reporter/annotations';\n\n$Link('docs', 'features/links');\nit('should demonstrate how the links work', () => {\n  /* ... */\n});\n")))),(0,a.kt)("p",null,"This will add the custom link to the Allure report:"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"TODO: add screenshot")),(0,a.kt)("h2",{id:"configuration"},"Configuration"),(0,a.kt)("p",null,"To handle link generation for custom link types, TMS, and issue ids, you need to configure the 'jest-allure2-reporter' in your ",(0,a.kt)("inlineCode",{parentName:"p"},"jest.config.js")," file."),(0,a.kt)("p",null,"You can specify URL patterns for each type of link. When generating the Allure report, the annotation function or JSDoc will replace the ID in the URL pattern with the actual ID provided in your test case."),(0,a.kt)("p",null,"Below is an example configuration:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'module.exports = {\n  reporters: [\n    [\n      "jest-allure2-reporter",\n      {\n        issueLinkTemplate: "http://your-tracker.com/issue/{}",\n        tmsLinkTemplate: "http://your-tms.com/case/{}",\n        customLinkTemplate: "https://your-custom-url/{}"\n      }\n    ]\n  ]\n}\n')),(0,a.kt)("p",null,"In this example, ",(0,a.kt)("inlineCode",{parentName:"p"},"{}")," will be replaced with the issue id, tms id, or custom id you've specified"))}k.isMDXComponent=!0}}]);