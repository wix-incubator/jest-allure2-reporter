"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[277],{1328:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>i,default:()=>p,frontMatter:()=>l,metadata:()=>c,toc:()=>d});var s=t(5893),r=t(1151),a=t(3992),o=t(425);const l={description:"Claim the ownership of test cases and suites."},i="People",c={unversionedId:"docs/api/people",id:"docs/api/people",title:"People",description:"Claim the ownership of test cases and suites.",source:"@site/../docs/docs/api/05-people.mdx",sourceDirName:"docs/api",slug:"/docs/api/people",permalink:"/jest-allure2-reporter/docs/api/people",draft:!1,unlisted:!1,editUrl:"https://github.com/wix-incubator/jest-allure2-reporter/tree/alpha/docs/../docs/docs/api/05-people.mdx",tags:[],version:"current",sidebarPosition:5,frontMatter:{description:"Claim the ownership of test cases and suites."},sidebar:"docsSidebar",previous:{title:"Parameters",permalink:"/jest-allure2-reporter/docs/api/parameters"},next:{title:"Severity",permalink:"/jest-allure2-reporter/docs/api/severity"}},u={},d=[{value:"Basic usage",id:"basic-usage",level:2},{value:"Examples",id:"examples",level:2},{value:"Advanced usage",id:"advanced-usage",level:2}];function h(e){const n=Object.assign({h1:"h1",admonition:"admonition",p:"p",code:"code",strong:"strong",ul:"ul",li:"li",h2:"h2",pre:"pre"},(0,r.ah)(),e.components);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"people",children:"People"}),"\n",(0,s.jsx)(n.admonition,{type:"caution",children:(0,s.jsxs)(n.p,{children:["This website version refers to the unreleased version of ",(0,s.jsx)(n.code,{children:"jest-allure2-reporter"}),", partially available as ",(0,s.jsx)(n.code,{children:"2.0.0-alpha.*"})," release.\nPlease use GitHub docs for the latest stable version, ",(0,s.jsx)(n.code,{children:"1.x.x"}),"."]})}),"\n",(0,s.jsxs)(n.p,{children:["In Allure reports, you can indicate who is the ",(0,s.jsx)(n.strong,{children:"owner"})," of any given test case.\nThis allows for better organization, responsibility allocation, and communication within your team.\nAdvanced solutions can leverage this information to notify the relevant people about test failures\nor to assign automatic tasks to them."]}),"\n",(0,s.jsx)(n.p,{children:"There are two ways to associate a test case with a person:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["declaratively, via ",(0,s.jsx)(n.code,{children:"@owner"})," JSDoc annotations;"]}),"\n",(0,s.jsxs)(n.li,{children:["programmatically, via ",(0,s.jsx)(n.code,{children:"$Owner"})," annotation functions."]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"basic-usage",children:"Basic usage"}),"\n",(0,s.jsx)(n.p,{children:"The owner of a test suite is the person who is responsible for the test suite and all test cases in it."}),"\n",(0,s.jsx)(n.p,{children:"Here is how you can associate an entire test file with an owner:"}),"\n",(0,s.jsxs)(a.Z,{groupId:"approach",children:[(0,s.jsx)(o.Z,{value:"docblock",label:"Docblocks",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"/**\n * @owner John Doe <john.doe@example.com>\n */\n\ndescribe('Sanity: Login flow', () => {\n  it('should login with valid credentials', () => {\n    /* ... test code ... */\n  });\n});\n\ndescribe('Sanity: Dashboard', () => {\n  it('should show the dashboard', () => {\n    /* ... test code ... */\n  });\n});\n"})})}),(0,s.jsx)(o.Z,{value:"dsl",label:"DSL",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"import { allure } from 'jest-allure2-reporter';\n\nallure.owner('John Doe <john.doe@example.com>');\n\ndescribe('Sanity: Login flow', () => {\n  it('should login with valid credentials', () => {\n    /* ... test code ... */\n  });\n});\n\ndescribe('Sanity: Dashboard', () => {\n  it('should show the dashboard', () => {\n    /* ... test code ... */\n  });\n});\n"})})})]}),"\n",(0,s.jsx)(n.p,{children:"Here is how you can associate a selected test suite with an owner:"}),"\n",(0,s.jsxs)(a.Z,{groupId:"approach",children:[(0,s.jsxs)(o.Z,{value:"docblock",label:"Docblocks",children:[(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"describe('Sanity: Login flow', () => {\n  /**\n   * @owner John Doe <john.doe@example.com>\n   */\n\n  it('should login with valid credentials', () => {\n    /* ... test code ... */\n  });\n});\n"})}),(0,s.jsx)(n.p,{children:"Please note that you have to put the JSDoc comment inside the test suite function body."})]}),(0,s.jsx)(o.Z,{value:"dsl",label:"DSL",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"import { $Owner } from 'jest-allure2-reporter';\n\n$Owner('John Doe <john.doe@example.com>');\ndescribe('Sanity: Login flow', () => {\n  it('should login with valid credentials', () => {\n    /* ... test code ... */\n  });\n});\n"})})})]}),"\n",(0,s.jsx)(n.p,{children:"You can also assign an owner for each test case individually."}),"\n",(0,s.jsxs)(a.Z,{groupId:"approach",children:[(0,s.jsxs)(o.Z,{value:"docblock",label:"Docblocks",children:[(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"it('should login with valid credentials', () => {\n  /**\n   * @owner John Doe <john.doe@example.com>\n   */\n\n  /* ... test code ... */\n});\n"})}),(0,s.jsx)(n.p,{children:"Please note that you have to put the JSDoc comment inside the test function body."})]}),(0,s.jsx)(o.Z,{value:"dsl",label:"DSL",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"$Owner('John Doe <john.doe@example.com>');\nit('should login with valid credentials', () => {\n/* ... */\n});\n"})})})]}),"\n",(0,s.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,s.jsx)(n.p,{children:"In the generated report, the owner is displayed in the test case description:"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"TODO: add screenshot"})}),"\n",(0,s.jsx)(n.h2,{id:"advanced-usage",children:"Advanced usage"}),"\n",(0,s.jsxs)(n.p,{children:["You can use the owner information in your custom reporters and plugins.\n",(0,s.jsx)(n.code,{children:"TODO: read more about query functions to use in your custom reporters and plugins"})]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"import * as query from 'jest-allure2-reporter/query';\n\n/**\n * Simplistic implementation of a notification reporter.\n * @implements {Reporter}\n */\nexport default class NotifyJestReporter {\n  /**\n   */\n  async onRunComplete(contexts, results) {\n    const owners = new Set();\n\n    for (const testFileResult of results.testResults) {\n      for (const testCaseResult of testFileResult.testResults) {\n        if (testCaseResult.status === 'failed') {\n          const owner = query.owner(testCaseResult);\n          if (owner) {\n            owners.add(owner);\n          }\n        }\n      }\n    }\n\n    for (const owner of owners) {\n      await this.#notify(owner);\n    }\n  }\n\n  async #notify(person) {\n    // ... some code to send a notification to the person ...\n  }\n}\n"})})]})}const p=function(e={}){const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?(0,s.jsx)(n,Object.assign({},e,{children:(0,s.jsx)(h,e)})):h(e)}},425:(e,n,t)=>{t.d(n,{Z:()=>o});t(7294);var s=t(6010);const r={tabItem:"tabItem_Ymn6"};var a=t(5893);function o(e){let{children:n,hidden:t,className:o}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,s.Z)(r.tabItem,o),hidden:t,children:n})}},3992:(e,n,t)=>{t.d(n,{Z:()=>y});var s=t(7294),r=t(6010),a=t(2957),o=t(6550),l=t(1270),i=t(5238),c=t(3609),u=t(2560);function d(e){return s.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,s.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:t}=e;return(0,s.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:t,attributes:s,default:r}}=e;return{value:n,label:t,attributes:s,default:r}}))}(t);return function(e){const n=(0,c.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function p(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:t}=e;const r=(0,o.k6)(),a=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,i._X)(a),(0,s.useCallback)((e=>{if(!a)return;const n=new URLSearchParams(r.location.search);n.set(a,e),r.replace({...r.location,search:n.toString()})}),[a,r])]}function f(e){const{defaultValue:n,queryString:t=!1,groupId:r}=e,a=h(e),[o,i]=(0,s.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const s=t.find((e=>e.default))??t[0];if(!s)throw new Error("Unexpected error: 0 tabValues");return s.value}({defaultValue:n,tabValues:a}))),[c,d]=m({queryString:t,groupId:r}),[f,b]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[r,a]=(0,u.Nk)(t);return[r,(0,s.useCallback)((e=>{t&&a.set(e)}),[t,a])]}({groupId:r}),x=(()=>{const e=c??f;return p({value:e,tabValues:a})?e:null})();(0,l.Z)((()=>{x&&i(x)}),[x]);return{selectedValue:o,selectValue:(0,s.useCallback)((e=>{if(!p({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);i(e),d(e),b(e)}),[d,b,a]),tabValues:a}}var b=t(1048);const x={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var j=t(5893);function v(e){let{className:n,block:t,selectedValue:s,selectValue:o,tabValues:l}=e;const i=[],{blockElementScrollPositionUntilNextRender:c}=(0,a.o5)(),u=e=>{const n=e.currentTarget,t=i.indexOf(n),r=l[t].value;r!==s&&(c(n),o(r))},d=e=>{let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const t=i.indexOf(e.currentTarget)+1;n=i[t]??i[0];break}case"ArrowLeft":{const t=i.indexOf(e.currentTarget)-1;n=i[t]??i[i.length-1];break}}n?.focus()};return(0,j.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":t},n),children:l.map((e=>{let{value:n,label:t,attributes:a}=e;return(0,j.jsx)("li",{role:"tab",tabIndex:s===n?0:-1,"aria-selected":s===n,ref:e=>i.push(e),onKeyDown:d,onClick:u,...a,className:(0,r.Z)("tabs__item",x.tabItem,a?.className,{"tabs__item--active":s===n}),children:t??n},n)}))})}function g(e){let{lazy:n,children:t,selectedValue:r}=e;const a=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=a.find((e=>e.props.value===r));return e?(0,s.cloneElement)(e,{className:"margin-top--md"}):null}return(0,j.jsx)("div",{className:"margin-top--md",children:a.map(((e,n)=>(0,s.cloneElement)(e,{key:n,hidden:e.props.value!==r})))})}function w(e){const n=f(e);return(0,j.jsxs)("div",{className:(0,r.Z)("tabs-container",x.tabList),children:[(0,j.jsx)(v,{...e,...n}),(0,j.jsx)(g,{...e,...n})]})}function y(e){const n=(0,b.Z)();return(0,j.jsx)(w,{...e,children:d(e.children)},String(n))}},1151:(e,n,t)=>{t.d(n,{Zo:()=>l,ah:()=>a});var s=t(7294);const r=s.createContext({});function a(e){const n=s.useContext(r);return s.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const o={};function l({components:e,children:n,disableParentContext:t}){let l;return l=t?"function"==typeof e?e({}):e||o:a(e),s.createElement(r.Provider,{value:l},n)}}}]);