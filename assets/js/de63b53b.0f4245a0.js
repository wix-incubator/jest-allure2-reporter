"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[548],{7536:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var n=r(2322),s=r(5392);r(2605),r(3142);const a={description:"QA and Product Manager perspective on test results."},o="By Defect Category",i={unversionedId:"docs/config/grouping/by-defect",id:"docs/config/grouping/by-defect",title:"By Defect Category",description:"QA and Product Manager perspective on test results.",source:"@site/../../docs/docs/config/01-grouping/04-by-defect.mdx",sourceDirName:"docs/config/01-grouping",slug:"/docs/config/grouping/by-defect",permalink:"/jest-allure2-reporter/docs/config/grouping/by-defect",draft:!1,unlisted:!1,editUrl:"https://github.com/wix-incubator/jest-allure2-reporter/tree/master/docs/../../docs/docs/config/01-grouping/04-by-defect.mdx",tags:[],version:"current",sidebarPosition:4,frontMatter:{description:"QA and Product Manager perspective on test results."},sidebar:"docsSidebar",previous:{title:"By Package",permalink:"/jest-allure2-reporter/docs/config/grouping/by-package"},next:{title:"Statuses",permalink:"/jest-allure2-reporter/docs/config/statuses"}},l={},c=[];function u(e){const t=Object.assign({h1:"h1",admonition:"admonition",p:"p",code:"code",img:"img",em:"em",pre:"pre"},(0,s.ah)(),e.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"by-defect-category",children:"By Defect Category"}),"\n",(0,n.jsx)(t.admonition,{type:"caution",children:(0,n.jsxs)(t.p,{children:["This website version refers to the unreleased version of ",(0,n.jsx)(t.code,{children:"jest-allure2-reporter"})," and is not yet available\nanywhere. Please use GitHub docs for the latest stable version."]})}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"Defect categories",src:r(6752).Z+"",width:"2048",height:"1200"})}),"\n",(0,n.jsxs)(t.p,{children:["One of the most important things when your builds start failing is to understand ",(0,n.jsx)(t.em,{children:"what exactly is broken"}),"."]}),"\n",(0,n.jsx)(t.p,{children:"By defining defect categories, you can easily distinguish between different types of errors and failures."}),"\n",(0,n.jsx)(t.p,{children:"There are two built-in defect categories:"}),"\n",(0,n.jsxs)("dl",{children:[(0,n.jsx)("dt",{children:(0,n.jsx)("strong",{children:"Product defect"})}),(0,n.jsxs)("dd",{children:["A failed Jest assertion, e.g. ",(0,n.jsx)("code",{children:"expect(countOfPosts).toBe(1)"}),"."]}),(0,n.jsx)("dt",{children:(0,n.jsx)("strong",{children:"Test defect"})}),(0,n.jsxs)("dd",{children:["A failed test, e.g. ",(0,n.jsx)("code",{children:"throw new TypeError('Cannot read property 'name' of null')"}),"."]})]}),"\n",(0,n.jsx)(t.p,{children:"We recommend to invest some time into configuring the reporter to distinguish between different types of product defects, especially if you have end-to-end tests that are prone to flakiness, e.g.:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",metastring:'title="jest.config.js"',children:"/**\n * @type {import('@jest/types').Config.InitialOptions}\n */\nmodule.exports = {\n  // ... your jest config\n  reporters: [\n    'default',\n    ['jest-allure2-reporter',\n      /** @type {import('jest-allure2-reporter').JestAllure2ReporterOptions} */\n      {\n// highlight-start\n        categories: [\n          {\n            name: \"Visual Regression\",\n            // optional `matchedStatuses`\n            matchedStatuses: [\"failed\"],\n            // optional `messageRegex`\n            messageRegex: \"Expected .*to match a screenshot.*\",\n            // optional `traceRegex`\n            traceRegex: \".*visual-regression.*\",\n          },\n          //\n          // ... other categories\n          //\n        ],\n// highlight-end\n      }\n    ],\n  ],\n};\n"})})]})}const d=function(e={}){const{wrapper:t}=Object.assign({},(0,s.ah)(),e.components);return t?(0,n.jsx)(t,Object.assign({},e,{children:(0,n.jsx)(u,e)})):u(e)}},3142:(e,t,r)=>{r.d(t,{Z:()=>o});r(2784);var n=r(6277);const s={tabItem:"tabItem_OMyP"};var a=r(2322);function o(e){let{children:t,hidden:r,className:o}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,n.Z)(s.tabItem,o),hidden:r,children:t})}},2605:(e,t,r)=>{r.d(t,{Z:()=>w});var n=r(2784),s=r(6277),a=r(5425),o=r(7267),i=r(9065),l=r(4236),c=r(3432),u=r(9675);function d(e){return n.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,n.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:t,children:r}=e;return(0,n.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:r,attributes:n,default:s}}=e;return{value:t,label:r,attributes:n,default:s}}))}(r);return function(e){const t=(0,c.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,r])}function f(e){let{value:t,tabValues:r}=e;return r.some((e=>e.value===t))}function h(e){let{queryString:t=!1,groupId:r}=e;const s=(0,o.k6)(),a=function(e){let{queryString:t=!1,groupId:r}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:t,groupId:r});return[(0,l._X)(a),(0,n.useCallback)((e=>{if(!a)return;const t=new URLSearchParams(s.location.search);t.set(a,e),s.replace({...s.location,search:t.toString()})}),[a,s])]}function g(e){const{defaultValue:t,queryString:r=!1,groupId:s}=e,a=p(e),[o,l]=(0,n.useState)((()=>function(e){let{defaultValue:t,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!f({value:t,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=r.find((e=>e.default))??r[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:a}))),[c,d]=h({queryString:r,groupId:s}),[g,b]=function(e){let{groupId:t}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(t),[s,a]=(0,u.Nk)(r);return[s,(0,n.useCallback)((e=>{r&&a.set(e)}),[r,a])]}({groupId:s}),m=(()=>{const e=c??g;return f({value:e,tabValues:a})?e:null})();(0,i.Z)((()=>{m&&l(m)}),[m]);return{selectedValue:o,selectValue:(0,n.useCallback)((e=>{if(!f({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);l(e),d(e),b(e)}),[d,b,a]),tabValues:a}}var b=r(717);const m={tabList:"tabList_M0Dn",tabItem:"tabItem_ysIP"};var y=r(2322);function v(e){let{className:t,block:r,selectedValue:n,selectValue:o,tabValues:i}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,a.o5)(),u=e=>{const t=e.currentTarget,r=l.indexOf(t),s=i[r].value;s!==n&&(c(t),o(s))},d=e=>{let t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const r=l.indexOf(e.currentTarget)+1;t=l[r]??l[0];break}case"ArrowLeft":{const r=l.indexOf(e.currentTarget)-1;t=l[r]??l[l.length-1];break}}t?.focus()};return(0,y.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":r},t),children:i.map((e=>{let{value:t,label:r,attributes:a}=e;return(0,y.jsx)("li",{role:"tab",tabIndex:n===t?0:-1,"aria-selected":n===t,ref:e=>l.push(e),onKeyDown:d,onClick:u,...a,className:(0,s.Z)("tabs__item",m.tabItem,a?.className,{"tabs__item--active":n===t}),children:r??t},t)}))})}function x(e){let{lazy:t,children:r,selectedValue:s}=e;const a=(Array.isArray(r)?r:[r]).filter(Boolean);if(t){const e=a.find((e=>e.props.value===s));return e?(0,n.cloneElement)(e,{className:"margin-top--md"}):null}return(0,y.jsx)("div",{className:"margin-top--md",children:a.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==s})))})}function j(e){const t=g(e);return(0,y.jsxs)("div",{className:(0,s.Z)("tabs-container",m.tabList),children:[(0,y.jsx)(v,{...e,...t}),(0,y.jsx)(x,{...e,...t})]})}function w(e){const t=(0,b.Z)();return(0,y.jsx)(j,{...e,children:d(e.children)},String(t))}},6752:(e,t,r)=>{r.d(t,{Z:()=>n});const n=r.p+"assets/images/config-03-errors-01-4d388140ed372f7ed83ebd5eeea69ad9.jpg"},5392:(e,t,r)=>{r.d(t,{Zo:()=>i,ah:()=>a});var n=r(2784);const s=n.createContext({});function a(e){const t=n.useContext(s);return n.useMemo((()=>"function"==typeof e?e(t):{...t,...e}),[t,e])}const o={};function i({components:e,children:t,disableParentContext:r}){let i;return i=r?"function"==typeof e?e({}):e||o:a(e),n.createElement(s.Provider,{value:i},t)}}}]);