"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[408],{2909:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>h,frontMatter:()=>l,metadata:()=>c,toc:()=>d});var r=n(5893),s=n(1151),o=n(3992),a=n(425);const l={description:"Developer-oriented way to group test results."},i="By Package",c={unversionedId:"docs/config/grouping/by-package",id:"docs/config/grouping/by-package",title:"By Package",description:"Developer-oriented way to group test results.",source:"@site/../docs/docs/config/01-grouping/03-by-package.mdx",sourceDirName:"docs/config/01-grouping",slug:"/docs/config/grouping/by-package",permalink:"/jest-allure2-reporter/docs/config/grouping/by-package",draft:!1,unlisted:!1,editUrl:"https://github.com/wix-incubator/jest-allure2-reporter/tree/alpha/docs/../docs/docs/config/01-grouping/03-by-package.mdx",tags:[],version:"current",sidebarPosition:3,frontMatter:{description:"Developer-oriented way to group test results."},sidebar:"docsSidebar",previous:{title:"By Story",permalink:"/jest-allure2-reporter/docs/config/grouping/by-story"},next:{title:"By Defect Category",permalink:"/jest-allure2-reporter/docs/config/grouping/by-defect"}},u={},d=[{value:"Achieving three levels",id:"achieving-three-levels",level:3}];function p(e){const t=Object.assign({h1:"h1",admonition:"admonition",p:"p",code:"code",img:"img",ul:"ul",li:"li",strong:"strong",pre:"pre",h3:"h3"},(0,s.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"by-package",children:"By Package"}),"\n",(0,r.jsx)(t.admonition,{type:"caution",children:(0,r.jsxs)(t.p,{children:["This website version refers to the unreleased version of ",(0,r.jsx)(t.code,{children:"jest-allure2-reporter"}),", partially available as ",(0,r.jsx)(t.code,{children:"2.0.0-alpha.*"})," release.\nPlease use GitHub docs for the latest stable version, ",(0,r.jsx)(t.code,{children:"1.x.x"}),"."]})}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.img,{alt:"Grouping by package",src:n(2729).Z+"",width:"2048",height:"1200"})}),"\n",(0,r.jsx)(t.p,{children:"This grouping feature is the least helpful outside of Java world, where packages are used to organize the codebase."}),"\n",(0,r.jsxs)(t.p,{children:["It strictly follows ",(0,r.jsx)(t.code,{children:"com.example.package.ClassName"})," naming convention, where:"]}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"com.example.package"})," is a ",(0,r.jsx)(t.strong,{children:"package"}),","]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"com.example.package.ClassName"})," is a ",(0,r.jsx)(t.strong,{children:"test class"}),","]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"shouldAssertAndDoSomething"})," is a ",(0,r.jsx)(t.strong,{children:"test method"}),"."]}),"\n"]}),"\n",(0,r.jsxs)(t.p,{children:["It doesn't map well to JavaScript, hence for the most time you'll be able to utilize\nonly two grouping levels: ",(0,r.jsx)(t.strong,{children:"package"})," and ",(0,r.jsx)(t.strong,{children:"test method"}),". [^1]"]}),"\n",(0,r.jsx)(t.p,{children:"A couple of feasible options are:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["use ",(0,r.jsx)(t.code,{children:"package"})," to group tests by ",(0,r.jsx)(t.code,{children:"package.json"})," name;"]}),"\n",(0,r.jsxs)(t.li,{children:["use ",(0,r.jsx)(t.code,{children:"package"})," to group tests by the file path;"]}),"\n",(0,r.jsxs)(t.li,{children:["use ",(0,r.jsx)(t.code,{children:"testMethod"})," to group tests by the full test name"]}),"\n"]}),"\n",(0,r.jsxs)(o.Z,{groupId:"configTab",children:[(0,r.jsx)(a.Z,{value:"demo",label:"Report",children:(0,r.jsx)(t.p,{children:(0,r.jsx)(t.img,{alt:"Grouping by Story: configuration-based",src:n(5544).Z+"",width:"2048",height:"1200"})})}),(0,r.jsx)(a.Z,{value:"structure",label:"Structure",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-plain",children:"\u2514\u2500 @my-company/my-package\n   \u251c\u2500 Forgot password controller should return 401 if password is incorrect\n   \u251c\u2500 Forgot password controller should return 401 if user is not found\n   \u251c\u2500 Forgot password screen when loaded and typed should validate e-mail\n   \u251c\u2500 Forgot password screen when loaded should display forgot password form\n   \u251c\u2500 Login controller should return 401 if password is incorrect\n   \u251c\u2500 Login controller should return 401 if user is not found\n   \u251c\u2500 Login screen when loaded and typed should validate password\n   \u251c\u2500 Login screen when loaded and typed should validate password\n   \u2514\u2500 Login screen when loaded should display login form\n"})})}),(0,r.jsx)(a.Z,{value:"config",label:"Config",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-js",metastring:'title="jest.config.js"',children:"/** @type {import('@jest/types').Config.InitialOptions} */\nmodule.exports = {\n  testEnvironment: 'jest-allure2-reporter/environment-node',\n  reporters: [\n    'default',\n    ['jest-allure2-reporter', /** @type {import('jest-allure2-reporter').Options}*/ {\n      labels: {\n        package: ({ manifest }) => manifest.name,\n        // NOTE: `testClass` won't work due to the aforementioned issue\n        testClass: ({ file }) => file.path,\n        testMethod: ({ test }) => test.fullName,\n      },\n    }],\n  ],\n};\n"})})})]}),"\n",(0,r.jsx)(t.h3,{id:"achieving-three-levels",children:"Achieving three levels"}),"\n",(0,r.jsx)(t.admonition,{title:"Disclaimer",type:"info",children:(0,r.jsx)(t.p,{children:"The example below is simplified and does not handle edge cases like folder names with spaces, and other non-alphanumeric characters."})}),"\n",(0,r.jsx)(t.p,{children:"So, especially curious souls may try this hacky configuration to get all three levels,\nbut it's an open question whether it's worth the effort:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-js",metastring:'title="jest.config.js"',children:"/** @type {import('@jest/types').Config.InitialOptions} */\nmodule.exports = {\n  testEnvironment: 'jest-allure2-reporter/environment-node',\n  reporters: [\n    'default',\n    ['jest-allure2-reporter',\n    /** @type {import('jest-allure2-reporter').Options}*/\n    {\n      labels: {\n        package: ({ filePath }) => filePath.slice(0, -1).join('.'),\n        testClass: ({ filePath }) => filePath.join('.').replace(/\\.test\\.[jt]s$/, ''),\n        testMethod: ({ testCase }) => testCase.fullName,\n      },\n    }],\n  ],\n};\n"})}),"\n",(0,r.jsxs)(t.p,{children:["This example is a proof of concept to help you understand better how this grouping strategy was supposed to work in the first place.\nIt demonstrates that if you map file paths like ",(0,r.jsx)(t.code,{children:"src/components/MyComponent.test.js"})," to pseudo-classes like ",(0,r.jsx)(t.code,{children:"src.components.MyComponent"}),",\nthe generated report will recognize these labels and group tests accordingly."]})]})}const h=function(e={}){const{wrapper:t}=Object.assign({},(0,s.ah)(),e.components);return t?(0,r.jsx)(t,Object.assign({},e,{children:(0,r.jsx)(p,e)})):p(e)}},425:(e,t,n)=>{n.d(t,{Z:()=>a});n(7294);var r=n(6010);const s={tabItem:"tabItem_Ymn6"};var o=n(5893);function a(e){let{children:t,hidden:n,className:a}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,r.Z)(s.tabItem,a),hidden:n,children:t})}},3992:(e,t,n)=>{n.d(t,{Z:()=>w});var r=n(7294),s=n(6010),o=n(2957),a=n(6550),l=n(1270),i=n(5238),c=n(3609),u=n(2560);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:s}}=e;return{value:t,label:n,attributes:r,default:s}}))}(n);return function(e){const t=(0,c.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function h(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function g(e){let{queryString:t=!1,groupId:n}=e;const s=(0,a.k6)(),o=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,i._X)(o),(0,r.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(s.location.search);t.set(o,e),s.replace({...s.location,search:t.toString()})}),[o,s])]}function f(e){const{defaultValue:t,queryString:n=!1,groupId:s}=e,o=p(e),[a,i]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!h({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:o}))),[c,d]=g({queryString:n,groupId:s}),[f,m]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[s,o]=(0,u.Nk)(n);return[s,(0,r.useCallback)((e=>{n&&o.set(e)}),[n,o])]}({groupId:s}),b=(()=>{const e=c??f;return h({value:e,tabValues:o})?e:null})();(0,l.Z)((()=>{b&&i(b)}),[b]);return{selectedValue:a,selectValue:(0,r.useCallback)((e=>{if(!h({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);i(e),d(e),m(e)}),[d,m,o]),tabValues:o}}var m=n(1048);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var j=n(5893);function x(e){let{className:t,block:n,selectedValue:r,selectValue:a,tabValues:l}=e;const i=[],{blockElementScrollPositionUntilNextRender:c}=(0,o.o5)(),u=e=>{const t=e.currentTarget,n=i.indexOf(t),s=l[n].value;s!==r&&(c(t),a(s))},d=e=>{let t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const n=i.indexOf(e.currentTarget)+1;t=i[n]??i[0];break}case"ArrowLeft":{const n=i.indexOf(e.currentTarget)-1;t=i[n]??i[i.length-1];break}}t?.focus()};return(0,j.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":n},t),children:l.map((e=>{let{value:t,label:n,attributes:o}=e;return(0,j.jsx)("li",{role:"tab",tabIndex:r===t?0:-1,"aria-selected":r===t,ref:e=>i.push(e),onKeyDown:d,onClick:u,...o,className:(0,s.Z)("tabs__item",b.tabItem,o?.className,{"tabs__item--active":r===t}),children:n??t},t)}))})}function y(e){let{lazy:t,children:n,selectedValue:s}=e;const o=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===s));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,j.jsx)("div",{className:"margin-top--md",children:o.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==s})))})}function v(e){const t=f(e);return(0,j.jsxs)("div",{className:(0,s.Z)("tabs-container",b.tabList),children:[(0,j.jsx)(x,{...e,...t}),(0,j.jsx)(y,{...e,...t})]})}function w(e){const t=(0,m.Z)();return(0,j.jsx)(v,{...e,children:d(e.children)},String(t))}},5544:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/config-01-grouping-07-f95ebd1017664d898c799323019d63ca.jpg"},2729:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/config-01-grouping-08-b471f07fc322cc2518b8ad0cf467e976.jpg"},1151:(e,t,n)=>{n.d(t,{Zo:()=>l,ah:()=>o});var r=n(7294);const s=r.createContext({});function o(e){const t=r.useContext(s);return r.useMemo((()=>"function"==typeof e?e(t):{...t,...e}),[t,e])}const a={};function l({components:e,children:t,disableParentContext:n}){let l;return l=n?"function"==typeof e?e({}):e||a:o(e),r.createElement(s.Provider,{value:l},t)}}}]);