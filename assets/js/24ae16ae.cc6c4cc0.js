"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[8292],{4364:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>u,default:()=>p,frontMatter:()=>l,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"docs/config/environment","title":"Environment","description":"Get hold of the environment information for your test runs.","source":"@site/../docs/docs/config/04-environment.mdx","sourceDirName":"docs/config","slug":"/docs/config/environment","permalink":"/jest-allure2-reporter/docs/config/environment","draft":false,"unlisted":false,"editUrl":"https://github.com/wix-incubator/jest-allure2-reporter/tree/master/docs/../docs/docs/config/04-environment.mdx","tags":[],"version":"current","lastUpdatedBy":"Yaroslav Serhieiev","lastUpdatedAt":1714818852000,"sidebarPosition":4,"frontMatter":{"description":"Get hold of the environment information for your test runs."},"sidebar":"docsSidebar","previous":{"title":"Statuses","permalink":"/jest-allure2-reporter/docs/config/statuses"},"next":{"title":"Executor","permalink":"/jest-allure2-reporter/docs/config/executor"}}');var o=n(4848),a=n(8453),s=n(9489),i=n(7227);const l={description:"Get hold of the environment information for your test runs."},u="Environment",c={},d=[{value:"Configuration",id:"configuration",level:2}];function f(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",strong:"strong",...(0,a.R)(),...e.components},{ArticleHeader:r}=t;return r||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("ArticleHeader",!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.header,{children:(0,o.jsx)(t.h1,{id:"environment",children:"Environment"})}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:"Environment"})," is a feature that allows you to capture and display specific details related to the test execution environment, such as the operating system, browser version, device information, or any other global information that is relevant to the entire test run."]}),"\n",(0,o.jsx)(t.p,{children:"Such information can be especially insightful when you're troubleshooting test failures in a heterogeneous environment, e.g. when tests fail on CI but pass locally, or when you're trying to pinpoint the cause of a test failure on a specific platform or a version of some software."}),"\n",(0,o.jsxs)(t.p,{children:["It is always a good idea to include environment information in your test reports, as soon as you start running tests anywhere further than your local machine. When you will be setting it up, try to configure saving ",(0,o.jsx)(t.a,{href:"/jest-allure2-reporter/docs/config/executor",children:"Executor"})," information as well."]}),"\n",(0,o.jsx)(t.h2,{id:"configuration",children:"Configuration"}),"\n",(0,o.jsx)(r,{}),"\n",(0,o.jsxs)(t.p,{children:["By default, the environment information is not included in the report. To enable it, you need to add the following configuration to your ",(0,o.jsx)(t.code,{children:"jest.config.js"})," file."]}),"\n",(0,o.jsxs)(t.p,{children:["In the example below, we're using the ",(0,o.jsx)(t.a,{href:"https://lodash.com",children:"lodash"})," library to filter out any sensitive information from the environment variables, and we also include the name and version of the package under test, as well as the type of the operating system:"]}),"\n",(0,o.jsxs)(s.A,{groupId:"configTab",children:[(0,o.jsx)(i.A,{value:"config",label:"Config",children:(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-js",metastring:'title="jest.config.js"',children:"const _ = require('lodash');\nconst os = require('os');\n\n/** @type {import('@jest/types').Config.InitialOptions} */\nmodule.exports = {\n  // ...\n  reporters: [\n    // ...\n    ['jest-allure2-reporter', {\n      environment: async ({ manifest }) => ({\n        'package.name': await manifest((p) => p.name),\n        'package.version': await manifest((p) => p.version),\n        'os.type': os.type(),\n\n        ..._\n          .chain(process.env)\n          .omitBy((value, key) => /secret|password|token/i.test(key))\n          .mapKeys((value, key) => 'env.' + key)\n          .value(),\n      }),\n    }],\n  ],\n};\n"})})}),(0,o.jsx)(i.A,{value:"demo",label:"Preview",children:(0,o.jsx)("img",{src:n(2792).A,width:398,alt:"Environment"})})]})]})}function p(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(f,{...e})}):f(e)}},7227:(e,t,n)=>{n.d(t,{A:()=>s});n(6540);var r=n(4164);const o={tabItem:"tabItem_Ymn6"};var a=n(4848);function s(e){let{children:t,hidden:n,className:s}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,r.A)(o.tabItem,s),hidden:n,children:t})}},9489:(e,t,n)=>{n.d(t,{A:()=>j});var r=n(6540),o=n(4164),a=n(4245),s=n(6347),i=n(6494),l=n(2814),u=n(5167),c=n(9900);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function f(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:o}}=e;return{value:t,label:n,attributes:r,default:o}}))}(n);return function(e){const t=(0,u.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function p(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function h(e){let{queryString:t=!1,groupId:n}=e;const o=(0,s.W6)(),a=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,l.aZ)(a),(0,r.useCallback)((e=>{if(!a)return;const t=new URLSearchParams(o.location.search);t.set(a,e),o.replace({...o.location,search:t.toString()})}),[a,o])]}function m(e){const{defaultValue:t,queryString:n=!1,groupId:o}=e,a=f(e),[s,l]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!p({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:a}))),[u,d]=h({queryString:n,groupId:o}),[m,v]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[o,a]=(0,c.Dv)(n);return[o,(0,r.useCallback)((e=>{n&&a.set(e)}),[n,a])]}({groupId:o}),b=(()=>{const e=u??m;return p({value:e,tabValues:a})?e:null})();(0,i.A)((()=>{b&&l(b)}),[b]);return{selectedValue:s,selectValue:(0,r.useCallback)((e=>{if(!p({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);l(e),d(e),v(e)}),[d,v,a]),tabValues:a}}var v=n(1062);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var g=n(4848);function y(e){let{className:t,block:n,selectedValue:r,selectValue:s,tabValues:i}=e;const l=[],{blockElementScrollPositionUntilNextRender:u}=(0,a.a_)(),c=e=>{const t=e.currentTarget,n=l.indexOf(t),o=i[n].value;o!==r&&(u(t),s(o))},d=e=>{let t=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const n=l.indexOf(e.currentTarget)+1;t=l[n]??l[0];break}case"ArrowLeft":{const n=l.indexOf(e.currentTarget)-1;t=l[n]??l[l.length-1];break}}t?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.A)("tabs",{"tabs--block":n},t),children:i.map((e=>{let{value:t,label:n,attributes:a}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:r===t?0:-1,"aria-selected":r===t,ref:e=>l.push(e),onKeyDown:d,onClick:c,...a,className:(0,o.A)("tabs__item",b.tabItem,a?.className,{"tabs__item--active":r===t}),children:n??t},t)}))})}function x(e){let{lazy:t,children:n,selectedValue:a}=e;const s=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=s.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:(0,o.A)("margin-top--md",e.props.className)}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:s.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a})))})}function w(e){const t=m(e);return(0,g.jsxs)("div",{className:(0,o.A)("tabs-container",b.tabList),children:[(0,g.jsx)(y,{...t,...e}),(0,g.jsx)(x,{...t,...e})]})}function j(e){const t=(0,v.A)();return(0,g.jsx)(w,{...e,children:d(e.children)},String(t))}},2792:(e,t,n)=>{n.d(t,{A:()=>r});const r=n.p+"assets/images/config-environment-01-a26b3fb4e299e051e2500f690a480b00.jpg"},8453:(e,t,n)=>{n.d(t,{R:()=>s,x:()=>i});var r=n(6540);const o={},a=r.createContext(o);function s(e){const t=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),r.createElement(a.Provider,{value:t},e.children)}}}]);