"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[991],{2406:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>c,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"docs/config/grouping/by-package","title":"By Package","description":"Developer-oriented way to group test results.","source":"@site/../docs/docs/config/01-grouping/03-by-package.mdx","sourceDirName":"docs/config/01-grouping","slug":"/docs/config/grouping/by-package","permalink":"/jest-allure2-reporter/docs/config/grouping/by-package","draft":false,"unlisted":false,"editUrl":"https://github.com/wix-incubator/jest-allure2-reporter/tree/master/docs/../docs/docs/config/01-grouping/03-by-package.mdx","tags":[],"version":"current","lastUpdatedBy":"Yaroslav Serhieiev","lastUpdatedAt":1714818852000,"sidebarPosition":3,"frontMatter":{"description":"Developer-oriented way to group test results.","toc_min_heading_level":3},"sidebar":"docsSidebar","previous":{"title":"By Story","permalink":"/jest-allure2-reporter/docs/config/grouping/by-story"},"next":{"title":"By Category","permalink":"/jest-allure2-reporter/docs/config/grouping/by-category"}}');var s=n(4848),o=n(8453),a=n(9489),l=n(7227);const i={description:"Developer-oriented way to group test results.",toc_min_heading_level:3},c="By Package",u={},d=[{value:"Achieving three levels",id:"achieving-three-levels",level:2}];function p(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components},{ArticleHeader:r}=t;return r||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("ArticleHeader",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"by-package",children:"By Package"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"Grouping by package",src:n(1179).A+"",width:"2048",height:"1200"})}),"\n",(0,s.jsx)(t.p,{children:"This grouping feature is the least helpful outside of Java world, where packages are used to organize the codebase."}),"\n",(0,s.jsxs)(t.p,{children:["It strictly follows ",(0,s.jsx)(t.code,{children:"com.example.package.ClassName"})," naming convention, where:"]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"com.example.package"})," is a ",(0,s.jsx)(t.strong,{children:"package"}),","]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"com.example.package.ClassName"})," is a ",(0,s.jsx)(t.strong,{children:"test class"}),","]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"shouldAssertAndDoSomething"})," is a ",(0,s.jsx)(t.strong,{children:"test method"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(t.p,{children:["It doesn't map well to JavaScript\n",(0,s.jsx)(t.a,{href:"https://github.com/orgs/allure-framework/discussions/2027",children:"\u207d\xb9\u207e"}),".\nHence, normally you'll be able to utilize only two grouping levels: ",(0,s.jsx)(t.strong,{children:"package"})," and ",(0,s.jsx)(t.strong,{children:"test method"}),"."]}),"\n",(0,s.jsx)(t.p,{children:"A couple of feasible options are:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["use ",(0,s.jsx)(t.code,{children:"package"})," to group tests by ",(0,s.jsx)(t.code,{children:"package.json"})," name;"]}),"\n",(0,s.jsxs)(t.li,{children:["use ",(0,s.jsx)(t.code,{children:"package"})," to group tests by the file path;"]}),"\n",(0,s.jsxs)(t.li,{children:["use ",(0,s.jsx)(t.code,{children:"testMethod"})," to group tests by the full test name"]}),"\n"]}),"\n",(0,s.jsxs)(a.A,{groupId:"configTab",children:[(0,s.jsx)(l.A,{value:"config",label:"Config",children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",metastring:'title="jest.config.js"',children:"/** @type {import('@jest/types').Config.InitialOptions} */\nmodule.exports = {\n  testEnvironment: 'jest-allure2-reporter/environment-node',\n  reporters: [\n    'default',\n    ['jest-allure2-reporter', /** @type {import('jest-allure2-reporter').ReporterOptions}*/ {\n      labels: {\n        package: ({ manifest }) => manifest.name,\n        // \u26a0\ufe0f `testClass` won't work due to the aforementioned issue\n        testClass: ({ file }) => file.path,\n        testMethod: ({ test }) => test.fullName,\n      },\n    }],\n  ],\n};\n"})})}),(0,s.jsx)(l.A,{value:"demo",label:"Preview",children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-plain",children:"\u2514\u2500 @my-company/my-package\n   \u251c\u2500 Forgot password controller should return 401 if password is incorrect\n   \u251c\u2500 Forgot password controller should return 401 if user is not found\n   \u251c\u2500 Forgot password screen when loaded and typed should validate e-mail\n   \u251c\u2500 Forgot password screen when loaded should display forgot password form\n   \u251c\u2500 Login controller should return 401 if password is incorrect\n   \u251c\u2500 Login controller should return 401 if user is not found\n   \u251c\u2500 Login screen when loaded and typed should validate password\n   \u251c\u2500 Login screen when loaded and typed should validate password\n   \u2514\u2500 Login screen when loaded should display login form\n"})})})]}),"\n",(0,s.jsx)(t.h2,{id:"achieving-three-levels",children:"Achieving three levels"}),"\n",(0,s.jsx)(r,{}),"\n",(0,s.jsx)(t.admonition,{title:"Disclaimer",type:"info",children:(0,s.jsx)(t.p,{children:"The example below is simplified and does not handle edge cases like folder names with spaces, and other non-alphanumeric characters."})}),"\n",(0,s.jsx)(t.p,{children:"So, especially curious souls may try this hacky configuration to get all three levels,\nbut it's an open question whether it's worth the effort:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",metastring:'title="jest.config.js"',children:"/** @type {import('@jest/types').Config.InitialOptions} */\nmodule.exports = {\n  testEnvironment: 'jest-allure2-reporter/environment-node',\n  reporters: [\n    'default',\n    ['jest-allure2-reporter',\n    /** @type {import('jest-allure2-reporter').ReporterOptions}*/\n    {\n      labels: {\n        package: ({ filePath }) => filePath.slice(0, -1).join('.'),\n        testClass: ({ filePath }) => filePath.join('.').replace(/\\.test\\.[jt]s$/, ''),\n        testMethod: ({ testCase }) => testCase.fullName,\n      },\n    }],\n  ],\n};\n"})}),"\n",(0,s.jsxs)(t.p,{children:["This example is a proof of concept to help you understand better how this grouping strategy was supposed to work in the first place.\nIt demonstrates that if you map file paths like ",(0,s.jsx)(t.code,{children:"src/components/MyComponent.test.js"})," to pseudo-classes like ",(0,s.jsx)(t.code,{children:"src.components.MyComponent"}),",\nthe generated report will recognize these labels and group tests accordingly."]})]})}function h(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(p,{...e})}):p(e)}},7227:(e,t,n)=>{n.d(t,{A:()=>a});n(6540);var r=n(4164);const s={tabItem:"tabItem_Ymn6"};var o=n(4848);function a(e){let{children:t,hidden:n,className:a}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,r.A)(s.tabItem,a),hidden:n,children:t})}},9489:(e,t,n)=>{n.d(t,{A:()=>w});var r=n(6540),s=n(4164),o=n(4245),a=n(6347),l=n(6494),i=n(2814),c=n(5167),u=n(9900);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:s}}=e;return{value:t,label:n,attributes:r,default:s}}))}(n);return function(e){const t=(0,c.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function h(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function g(e){let{queryString:t=!1,groupId:n}=e;const s=(0,a.W6)(),o=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,i.aZ)(o),(0,r.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(s.location.search);t.set(o,e),s.replace({...s.location,search:t.toString()})}),[o,s])]}function f(e){const{defaultValue:t,queryString:n=!1,groupId:s}=e,o=p(e),[a,i]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!h({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:o}))),[c,d]=g({queryString:n,groupId:s}),[f,m]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[s,o]=(0,u.Dv)(n);return[s,(0,r.useCallback)((e=>{n&&o.set(e)}),[n,o])]}({groupId:s}),b=(()=>{const e=c??f;return h({value:e,tabValues:o})?e:null})();(0,l.A)((()=>{b&&i(b)}),[b]);return{selectedValue:a,selectValue:(0,r.useCallback)((e=>{if(!h({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);i(e),d(e),m(e)}),[d,m,o]),tabValues:o}}var m=n(1062);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var j=n(4848);function x(e){let{className:t,block:n,selectedValue:r,selectValue:a,tabValues:l}=e;const i=[],{blockElementScrollPositionUntilNextRender:c}=(0,o.a_)(),u=e=>{const t=e.currentTarget,n=i.indexOf(t),s=l[n].value;s!==r&&(c(t),a(s))},d=e=>{let t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const n=i.indexOf(e.currentTarget)+1;t=i[n]??i[0];break}case"ArrowLeft":{const n=i.indexOf(e.currentTarget)-1;t=i[n]??i[i.length-1];break}}t?.focus()};return(0,j.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.A)("tabs",{"tabs--block":n},t),children:l.map((e=>{let{value:t,label:n,attributes:o}=e;return(0,j.jsx)("li",{role:"tab",tabIndex:r===t?0:-1,"aria-selected":r===t,ref:e=>i.push(e),onKeyDown:d,onClick:u,...o,className:(0,s.A)("tabs__item",b.tabItem,o?.className,{"tabs__item--active":r===t}),children:n??t},t)}))})}function y(e){let{lazy:t,children:n,selectedValue:o}=e;const a=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=a.find((e=>e.props.value===o));return e?(0,r.cloneElement)(e,{className:(0,s.A)("margin-top--md",e.props.className)}):null}return(0,j.jsx)("div",{className:"margin-top--md",children:a.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==o})))})}function v(e){const t=f(e);return(0,j.jsxs)("div",{className:(0,s.A)("tabs-container",b.tabList),children:[(0,j.jsx)(x,{...t,...e}),(0,j.jsx)(y,{...t,...e})]})}function w(e){const t=(0,m.A)();return(0,j.jsx)(v,{...e,children:d(e.children)},String(t))}},1179:(e,t,n)=>{n.d(t,{A:()=>r});const r=n.p+"assets/images/config-01-grouping-08-b471f07fc322cc2518b8ad0cf467e976.jpg"},8453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>l});var r=n(6540);const s={},o=r.createContext(s);function a(e){const t=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),r.createElement(o.Provider,{value:t},e.children)}}}]);