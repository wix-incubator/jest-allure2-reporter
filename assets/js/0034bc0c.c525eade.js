"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[519],{6576:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var n=s(5893),r=s(1151);s(3992),s(425);const a={description:"Have an informative overview of your test results."},o="Statuses",i={unversionedId:"docs/config/statuses",id:"docs/config/statuses",title:"Statuses",description:"Have an informative overview of your test results.",source:"@site/../docs/docs/config/02-statuses.mdx",sourceDirName:"docs/config",slug:"/docs/config/statuses",permalink:"/jest-allure2-reporter/docs/config/statuses",draft:!1,unlisted:!1,editUrl:"https://github.com/wix-incubator/jest-allure2-reporter/tree/alpha/docs/../docs/docs/config/02-statuses.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{description:"Have an informative overview of your test results."},sidebar:"docsSidebar",previous:{title:"By Category",permalink:"/jest-allure2-reporter/docs/config/grouping/by-category"},next:{title:"Environment",permalink:"/jest-allure2-reporter/docs/config/environment"}},l={},c=[{value:"\ud83d\udfe2 Passed",id:"passed",level:2},{value:"\ud83d\udd34 Failed",id:"failed",level:2},{value:"\ud83d\udfe1 Broken",id:"broken",level:2},{value:"\u26aa Skipped",id:"skipped",level:2},{value:"\ud83d\udfe3 Unknown",id:"unknown",level:2}];function d(e){const t=Object.assign({h1:"h1",admonition:"admonition",p:"p",code:"code",a:"a",h2:"h2",pre:"pre",em:"em"},(0,r.ah)(),e.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"statuses",children:"Statuses"}),"\n",(0,n.jsx)(t.admonition,{type:"caution",children:(0,n.jsxs)(t.p,{children:["This website version refers to the unreleased version of ",(0,n.jsx)(t.code,{children:"jest-allure2-reporter"}),", partially available as ",(0,n.jsx)(t.code,{children:"2.0.0-alpha.*"})," release.\nPlease use GitHub docs for the latest stable version, ",(0,n.jsx)(t.code,{children:"1.x.x"}),"."]})}),"\n",(0,n.jsx)(t.p,{children:"Jest Allure 2 Reporter supports all the standard statuses defined by the Allure Framework."}),"\n",(0,n.jsxs)(t.p,{children:["It provides a clear indication whether your test cases have ",(0,n.jsx)(t.a,{href:"#passed",children:(0,n.jsx)(t.code,{children:"passed"})}),", ",(0,n.jsx)(t.a,{href:"#failed",children:(0,n.jsx)(t.code,{children:"failed"})}),", were ",(0,n.jsx)(t.a,{href:"#broken",children:(0,n.jsx)(t.code,{children:"broken"})}),",\n",(0,n.jsx)(t.a,{href:"#skipped",children:(0,n.jsx)(t.code,{children:"skipped"})}),", or whether their status is ",(0,n.jsx)(t.a,{href:"#unknown",children:(0,n.jsx)(t.code,{children:"unknown"})}),"."]}),"\n",(0,n.jsx)(t.h2,{id:"passed",children:"\ud83d\udfe2 Passed"}),"\n",(0,n.jsxs)(t.p,{children:["Status ",(0,n.jsx)(t.code,{children:"passed"})," is reported when the test case has passed successfully:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"test('passed test', () => {\n  expect(2 + 2).toBe(4);\n});\n"})}),"\n",(0,n.jsx)(t.h2,{id:"failed",children:"\ud83d\udd34 Failed"}),"\n",(0,n.jsxs)(t.p,{children:["Status ",(0,n.jsx)(t.code,{children:"failed"})," is reported when the test case has revealed a product defect, or it has invalid assertions:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"test('failed test', () => {\n  expect(2 + 2).not.toBe(4);\n});\n"})}),"\n",(0,n.jsx)(t.admonition,{type:"tip",children:(0,n.jsxs)(t.p,{children:["You can build a ",(0,n.jsx)(t.a,{href:"/jest-allure2-reporter/docs/config/errors#defect-categories",children:"custom defects classification"})," system based on\ntest status, error messages, and stack traces."]})}),"\n",(0,n.jsx)(t.h2,{id:"broken",children:"\ud83d\udfe1 Broken"}),"\n",(0,n.jsxs)(t.p,{children:["Status ",(0,n.jsx)(t.code,{children:"broken"})," is reported when the test case has failed due to an error in the test code:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"test('broken test', () => {\n  const user = null;\n  // TypeError: Cannot read property 'name' of null\n  expect(user.name).toBe('John');\n});\n"})}),"\n",(0,n.jsxs)(t.admonition,{type:"tip",children:[(0,n.jsxs)(t.p,{children:["If your test assertions ",(0,n.jsx)(t.em,{children:"throw errors directly"})," instead of using or extending\nJest's ",(0,n.jsxs)(t.a,{href:"https://jestjs.io/docs/expect",children:[(0,n.jsx)(t.code,{children:"expect"})," API"]}),", they will be reported as \u2060\ud83d\udfe1\xa0Broken tests by default."]}),(0,n.jsxs)(t.p,{children:["To report them as \ud83d\udd34\xa0Failed tests, you can use a ",(0,n.jsx)(t.code,{children:"status"})," customizer function:"]}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",metastring:'title="jest.config.js"',children:"module.exports = {\n  // ...\n  reporters: [\n    // ...\n    ['jest-allure2-reporter', {\n// highlight-next-line\n      status: ({ value }) => value === 'broken' ? 'failed' : value,\n    }],\n  ],\n};\n"})})]}),"\n",(0,n.jsx)(t.h2,{id:"skipped",children:"\u26aa Skipped"}),"\n",(0,n.jsxs)(t.p,{children:["Status ",(0,n.jsx)(t.code,{children:"skipped"})," is reported when the test case has been skipped due to a ",(0,n.jsx)(t.code,{children:"test.skip"})," or ",(0,n.jsx)(t.code,{children:"test.todo"})," call:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"test.skip('skipped test', () => {\n  expect(2 + 2).toBe(4);\n});\n\ntest.todo('todo test');\n"})}),"\n",(0,n.jsx)(t.admonition,{type:"note",children:(0,n.jsxs)(t.p,{children:["There's no way to distinguish between ",(0,n.jsx)(t.code,{children:"test.skip"})," and ",(0,n.jsx)(t.code,{children:"test.todo"})," calls, so both will be reported as skipped."]})}),"\n",(0,n.jsx)(t.h2,{id:"unknown",children:"\ud83d\udfe3 Unknown"}),"\n",(0,n.jsxs)(t.p,{children:["Status ",(0,n.jsx)(t.code,{children:"unknown"})," is reported when information about the test case result has been lost or not created:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"test('unknown test', () => {\n  process.exit(0); // the test information will be unrecoverable\n});\n"})}),"\n",(0,n.jsx)(t.admonition,{type:"info",children:(0,n.jsxs)(t.p,{children:["In the real world scenarios, this might happen if you use ",(0,n.jsx)(t.code,{children:"--bail"})," in Jest with\nmultiple test suites running in parallel, and one of them fails. In this case,\nJest will exit immediately, and the reporter will not be able to wait for the\ntest results from the other workers."]})})]})}const u=function(e={}){const{wrapper:t}=Object.assign({},(0,r.ah)(),e.components);return t?(0,n.jsx)(t,Object.assign({},e,{children:(0,n.jsx)(d,e)})):d(e)}},425:(e,t,s)=>{s.d(t,{Z:()=>o});s(7294);var n=s(6010);const r={tabItem:"tabItem_Ymn6"};var a=s(5893);function o(e){let{children:t,hidden:s,className:o}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,n.Z)(r.tabItem,o),hidden:s,children:t})}},3992:(e,t,s)=>{s.d(t,{Z:()=>k});var n=s(7294),r=s(6010),a=s(2957),o=s(6550),i=s(1270),l=s(5238),c=s(3609),d=s(2560);function u(e){return n.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,n.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:t,children:s}=e;return(0,n.useMemo)((()=>{const e=t??function(e){return u(e).map((e=>{let{props:{value:t,label:s,attributes:n,default:r}}=e;return{value:t,label:s,attributes:n,default:r}}))}(s);return function(e){const t=(0,c.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,s])}function p(e){let{value:t,tabValues:s}=e;return s.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:s}=e;const r=(0,o.k6)(),a=function(e){let{queryString:t=!1,groupId:s}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!s)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return s??null}({queryString:t,groupId:s});return[(0,l._X)(a),(0,n.useCallback)((e=>{if(!a)return;const t=new URLSearchParams(r.location.search);t.set(a,e),r.replace({...r.location,search:t.toString()})}),[a,r])]}function x(e){const{defaultValue:t,queryString:s=!1,groupId:r}=e,a=h(e),[o,l]=(0,n.useState)((()=>function(e){let{defaultValue:t,tabValues:s}=e;if(0===s.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!p({value:t,tabValues:s}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${s.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=s.find((e=>e.default))??s[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:a}))),[c,u]=f({queryString:s,groupId:r}),[x,b]=function(e){let{groupId:t}=e;const s=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,a]=(0,d.Nk)(s);return[r,(0,n.useCallback)((e=>{s&&a.set(e)}),[s,a])]}({groupId:r}),j=(()=>{const e=c??x;return p({value:e,tabValues:a})?e:null})();(0,i.Z)((()=>{j&&l(j)}),[j]);return{selectedValue:o,selectValue:(0,n.useCallback)((e=>{if(!p({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);l(e),u(e),b(e)}),[u,b,a]),tabValues:a}}var b=s(1048);const j={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var m=s(5893);function v(e){let{className:t,block:s,selectedValue:n,selectValue:o,tabValues:i}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,a.o5)(),d=e=>{const t=e.currentTarget,s=l.indexOf(t),r=i[s].value;r!==n&&(c(t),o(r))},u=e=>{let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const s=l.indexOf(e.currentTarget)+1;t=l[s]??l[0];break}case"ArrowLeft":{const s=l.indexOf(e.currentTarget)-1;t=l[s]??l[l.length-1];break}}t?.focus()};return(0,m.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":s},t),children:i.map((e=>{let{value:t,label:s,attributes:a}=e;return(0,m.jsx)("li",{role:"tab",tabIndex:n===t?0:-1,"aria-selected":n===t,ref:e=>l.push(e),onKeyDown:u,onClick:d,...a,className:(0,r.Z)("tabs__item",j.tabItem,a?.className,{"tabs__item--active":n===t}),children:s??t},t)}))})}function g(e){let{lazy:t,children:s,selectedValue:r}=e;const a=(Array.isArray(s)?s:[s]).filter(Boolean);if(t){const e=a.find((e=>e.props.value===r));return e?(0,n.cloneElement)(e,{className:"margin-top--md"}):null}return(0,m.jsx)("div",{className:"margin-top--md",children:a.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==r})))})}function w(e){const t=x(e);return(0,m.jsxs)("div",{className:(0,r.Z)("tabs-container",j.tabList),children:[(0,m.jsx)(v,{...e,...t}),(0,m.jsx)(g,{...e,...t})]})}function k(e){const t=(0,b.Z)();return(0,m.jsx)(w,{...e,children:u(e.children)},String(t))}},1151:(e,t,s)=>{s.d(t,{Zo:()=>i,ah:()=>a});var n=s(7294);const r=n.createContext({});function a(e){const t=n.useContext(r);return n.useMemo((()=>"function"==typeof e?e(t):{...t,...e}),[t,e])}const o={};function i({components:e,children:t,disableParentContext:s}){let i;return i=s?"function"==typeof e?e({}):e||o:a(e),n.createElement(r.Provider,{value:i},t)}}}]);