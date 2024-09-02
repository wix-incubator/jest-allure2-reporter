"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[89],{5540:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>h,frontMatter:()=>l,metadata:()=>c,toc:()=>d});var n=r(5893),s=r(1151),a=r(3992),o=r(425);const l={description:"Fine-grained control over the test flow"},i="Steps",c={id:"docs/features/steps",title:"Steps",description:"Fine-grained control over the test flow",source:"@site/../docs/docs/features/02-steps.mdx",sourceDirName:"docs/features",slug:"/docs/features/steps",permalink:"/jest-allure2-reporter/docs/features/steps",draft:!1,unlisted:!1,editUrl:"https://github.com/wix-incubator/jest-allure2-reporter/tree/beta/docs/../docs/docs/features/02-steps.mdx",tags:[],version:"current",lastUpdatedBy:"Yaroslav Serhieiev",lastUpdatedAt:1723810744e3,sidebarPosition:2,frontMatter:{description:"Fine-grained control over the test flow"},sidebar:"docsSidebar",previous:{title:"Descriptions",permalink:"/jest-allure2-reporter/docs/features/descriptions"},next:{title:"Attachments",permalink:"/jest-allure2-reporter/docs/features/attachments"}},u={},d=[{value:"Built-in hooks",id:"built-in-hooks",level:2},{value:"Custom steps",id:"custom-steps",level:2},{value:"Wrapping functions",id:"wrapping-functions",level:3},{value:"Status override",id:"status-override",level:3}];function p(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...e.components},{ArticleHeader:r}=t;return r||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("ArticleHeader",!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.header,{children:(0,n.jsx)(t.h1,{id:"steps",children:"Steps"})}),"\n",(0,n.jsx)(t.p,{children:"Steps are the building blocks of your tests."}),"\n",(0,n.jsxs)(t.p,{children:["Each test is composed of one or more steps, and each step can have its own ",(0,n.jsx)(t.a,{href:"/jest-allure2-reporter/docs/config/statuses",children:"status"}),",\n",(0,n.jsx)(t.a,{href:"/jest-allure2-reporter/docs/features/descriptions",children:"description"}),", ",(0,n.jsx)(t.a,{href:"/jest-allure2-reporter/docs/features/attachments",children:"attachments"})," and even nested steps."]}),"\n",(0,n.jsx)(t.h2,{id:"built-in-hooks",children:"Built-in hooks"}),"\n",(0,n.jsx)(r,{}),"\n",(0,n.jsxs)(t.p,{children:["The simplest steps to start with are the built-in hooks in Jest: ",(0,n.jsx)(t.code,{children:"beforeAll"}),", ",(0,n.jsx)(t.code,{children:"beforeEach"}),", ",(0,n.jsx)(t.code,{children:"afterEach"})," and ",(0,n.jsx)(t.code,{children:"afterAll"}),"."]}),"\n",(0,n.jsx)(t.p,{children:"This way, you will see the name and status of each hook in the report."}),"\n",(0,n.jsxs)(a.Z,{groupId:"approach",children:[(0,n.jsx)(o.Z,{value:"docblock",label:"Docblocks",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"beforeAll(async () => {\n  /**\n   * Launch the browser for all tests\n   */\n});\n\nbeforeEach(async () => {\n  /**\n   * Visit the page before the test starts\n   */\n});\n\nafterEach(async () => {\n  /**\n   * Take a screenshot after each test\n   */\n});\n\nafterAll(async () => {\n  /**\n   * Close the browser after all tests\n   */\n});\n"})})}),(0,n.jsx)(o.Z,{value:"dsl",label:"DSL",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"import { $Description } from 'jest-allure2-reporter/api';\n\n$Description('Launch the browser for all tests')\nbeforeAll(async () => {\n  // ...\n});\n\n$Description('Visit the page before the test starts')\nbeforeEach(async () => {\n  // ...\n});\n\n$Description('Take a screenshot after each test')\nafterEach(async () => {\n  // ...\n});\n\n$Description('Close the browser after all tests')\nafterAll(async () => {\n  // ...\n});\n"})})}),(0,n.jsx)(o.Z,{value:"demo",label:"Preview",children:(0,n.jsx)(t.p,{children:"TODO: add screenshot"})})]}),"\n",(0,n.jsx)(t.h2,{id:"custom-steps",children:"Custom steps"}),"\n",(0,n.jsx)(t.p,{children:"Custom steps add more structure to your tests and make them easier to read and understand.\nYou can add additional information to the report such as step description, parameters, attachments, etc."}),"\n",(0,n.jsx)(t.p,{children:"Moreover, custom steps can be nested, which allows you to create a tree-like structure of your tests."}),"\n",(0,n.jsx)(t.h3,{id:"wrapping-functions",children:"Wrapping functions"}),"\n",(0,n.jsx)(t.p,{children:"There are several ways to turn your functions into steps:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.code,{children:"allure.step"})," function \u2013 best for anonymous, one-time steps."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.code,{children:"allure.createStep"})," function \u2013 best for reusable functions."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.code,{children:"@Step"})," decorator \u2013 best for reusable class methods."]}),"\n"]}),"\n",(0,n.jsxs)(a.Z,{children:[(0,n.jsxs)(o.Z,{value:"step",children:[(0,n.jsxs)(t.p,{children:["Using ",(0,n.jsx)(t.code,{children:"allure.step"})," function is the simplest way to define a step:"]}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"import { allure } from 'jest-allure2-reporter/api';\n\ntest('Login test', async () => {\n  await allure.step('Open login page', async () => {\n    // ...\n  });\n\n  await allure.step('Enter credentials', async () => {\n    allure.parameter('login', 'admin');\n    // ...\n  });\n\n  await allure.step('Submit the form', async () => {\n    // ...\n  });\n});\n"})}),(0,n.jsx)(t.p,{children:"The drawback of this approach is that you can't reuse steps in other tests.\nBesides, adding parameters is going to be a bit verbose."})]}),(0,n.jsxs)(o.Z,{value:"createStep",children:[(0,n.jsxs)(t.p,{children:["A more advanced technique is to wrap your functions with ",(0,n.jsx)(t.code,{children:"allure.createStep"}),",\nwhich allows you to reuse steps in other tests and add parameters:"]}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"import { allure } from 'jest-allure2-reporter/api';\n\nexport const open = allure.createStep('Open login page', async () => {\n  // ...\n});\n\nexport const enterCredentials = allure.createStep(\n  'Enter credentials',\n  ['Login'],\n  async (login, password) => {\n    // ...\n  }\n);\n\nexport const submit = allure.createStep('Submit the form', async () => {\n  // ...\n});\n"})})]}),(0,n.jsxs)(o.Z,{value:"@Step",children:[(0,n.jsxs)(t.p,{children:["For aspect-oriented programmers, there is a decorator-based approach. It works only with class methods,\nbut otherwise it's similar to ",(0,n.jsx)(t.code,{children:"allure.createStep"}),":"]}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"import { Step } from 'jest-allure2-reporter/api';\n\nclass LoginPageObject {\n  @Step('Open login page')\n  async open() {\n    // ...\n  }\n\n  @Step('Enter credentials', ['Login'])\n  async enterCredentials(login, password) {\n    // ...\n  }\n\n  @Step('Submit the form')\n  async submit() {\n    // ...\n  }\n}\n"})})]}),(0,n.jsx)(o.Z,{value:"demo",label:"Preview",children:(0,n.jsx)(t.p,{children:"TODO: add screenshot"})})]}),"\n",(0,n.jsx)(t.h3,{id:"status-override",children:"Status override"}),"\n",(0,n.jsx)(t.p,{children:"In some cases, you might want to have control over the step status and its status details. Furthermore, you might want to make the status conditional and programmatic, and here's how:"}),"\n",(0,n.jsxs)(a.Z,{children:[(0,n.jsx)(o.Z,{value:"logStep",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"import { allure } from 'jest-allure2-reporter/api';\n\ntest('Login test', async () => {\n  try {\n    // ...\n  } catch (error) {\n    await allure.step('Unexpected error (Recoverable)', () => {\n      await allure.attachment(\n        'screenshot.png',\n        page.screenshot({ fullPage: true },\n      );\n\n      if (isRecoverable()) {\n        allure.status('skipped', {\n          message: error.message,\n          trace: error.stack,\n        });\n      } else {\n        throw error;\n      }\n    });\n  }\n});\n"})})}),(0,n.jsx)(o.Z,{value:"demo",label:"Preview",children:(0,n.jsx)(t.p,{children:"TODO: add screenshot"})})]})]})}function h(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(p,{...e})}):p(e)}},425:(e,t,r)=>{r.d(t,{Z:()=>o});r(7294);var n=r(512);const s={tabItem:"tabItem_Ymn6"};var a=r(5893);function o(e){let{children:t,hidden:r,className:o}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,n.Z)(s.tabItem,o),hidden:r,children:t})}},3992:(e,t,r)=>{r.d(t,{Z:()=>y});var n=r(7294),s=r(512),a=r(2957),o=r(6550),l=r(1270),i=r(5238),c=r(3609),u=r(1027);function d(e){return n.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,n.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:t,children:r}=e;return(0,n.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:r,attributes:n,default:s}}=e;return{value:t,label:r,attributes:n,default:s}}))}(r);return function(e){const t=(0,c.lx)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,r])}function h(e){let{value:t,tabValues:r}=e;return r.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:r}=e;const s=(0,o.k6)(),a=function(e){let{queryString:t=!1,groupId:r}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:t,groupId:r});return[(0,i._X)(a),(0,n.useCallback)((e=>{if(!a)return;const t=new URLSearchParams(s.location.search);t.set(a,e),s.replace({...s.location,search:t.toString()})}),[a,s])]}function m(e){const{defaultValue:t,queryString:r=!1,groupId:s}=e,a=p(e),[o,i]=(0,n.useState)((()=>function(e){let{defaultValue:t,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!h({value:t,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=r.find((e=>e.default))??r[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:a}))),[c,d]=f({queryString:r,groupId:s}),[m,b]=function(e){let{groupId:t}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(t),[s,a]=(0,u.Nk)(r);return[s,(0,n.useCallback)((e=>{r&&a.set(e)}),[r,a])]}({groupId:s}),j=(()=>{const e=c??m;return h({value:e,tabValues:a})?e:null})();(0,l.Z)((()=>{j&&i(j)}),[j]);return{selectedValue:o,selectValue:(0,n.useCallback)((e=>{if(!h({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);i(e),d(e),b(e)}),[d,b,a]),tabValues:a}}var b=r(1048);const j={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var x=r(5893);function g(e){let{className:t,block:r,selectedValue:n,selectValue:o,tabValues:l}=e;const i=[],{blockElementScrollPositionUntilNextRender:c}=(0,a.o5)(),u=e=>{const t=e.currentTarget,r=i.indexOf(t),s=l[r].value;s!==n&&(c(t),o(s))},d=e=>{let t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const r=i.indexOf(e.currentTarget)+1;t=i[r]??i[0];break}case"ArrowLeft":{const r=i.indexOf(e.currentTarget)-1;t=i[r]??i[i.length-1];break}}t?.focus()};return(0,x.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":r},t),children:l.map((e=>{let{value:t,label:r,attributes:a}=e;return(0,x.jsx)("li",{role:"tab",tabIndex:n===t?0:-1,"aria-selected":n===t,ref:e=>i.push(e),onKeyDown:d,onClick:u,...a,className:(0,s.Z)("tabs__item",j.tabItem,a?.className,{"tabs__item--active":n===t}),children:r??t},t)}))})}function v(e){let{lazy:t,children:r,selectedValue:a}=e;const o=(Array.isArray(r)?r:[r]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===a));return e?(0,n.cloneElement)(e,{className:(0,s.Z)("margin-top--md",e.props.className)}):null}return(0,x.jsx)("div",{className:"margin-top--md",children:o.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==a})))})}function w(e){const t=m(e);return(0,x.jsxs)("div",{className:(0,s.Z)("tabs-container",j.tabList),children:[(0,x.jsx)(g,{...t,...e}),(0,x.jsx)(v,{...t,...e})]})}function y(e){const t=(0,b.Z)();return(0,x.jsx)(w,{...e,children:d(e.children)},String(t))}},1151:(e,t,r)=>{r.d(t,{Z:()=>l,a:()=>o});var n=r(7294);const s={},a=n.createContext(s);function o(e){const t=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),n.createElement(a.Provider,{value:t},e.children)}}}]);