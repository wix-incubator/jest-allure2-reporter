"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[348],{876:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var a=n(2784);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),u=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=u(e.components);return a.createElement(i.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=u(n),m=r,h=p["".concat(i,".").concat(m)]||p[m]||d[m]||o;return n?a.createElement(h,l(l({ref:t},c),{},{components:n})):a.createElement(h,l({ref:t},c))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=m;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[p]="string"==typeof e?e:r,l[1]=s;for(var u=2;u<o;u++)l[u]=n[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3142:(e,t,n)=>{n.d(t,{Z:()=>l});var a=n(2784),r=n(6277);const o={tabItem:"tabItem_OMyP"};function l(e){let{children:t,hidden:n,className:l}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(o.tabItem,l),hidden:n},t)}},2605:(e,t,n)=>{n.d(t,{Z:()=>k});var a=n(7896),r=n(2784),o=n(6277),l=n(5425),s=n(7267),i=n(4236),u=n(3432),c=n(9675);function p(e){return function(e){return r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:r}}=e;return{value:t,label:n,attributes:a,default:r}}))}function d(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??p(n);return function(e){const t=(0,u.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function m(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function h(e){let{queryString:t=!1,groupId:n}=e;const a=(0,s.k6)(),o=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,i._X)(o),(0,r.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(a.location.search);t.set(o,e),a.replace({...a.location,search:t.toString()})}),[o,a])]}function f(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,o=d(e),[l,s]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:o}))),[i,u]=h({queryString:n,groupId:a}),[p,f]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,o]=(0,c.Nk)(n);return[a,(0,r.useCallback)((e=>{n&&o.set(e)}),[n,o])]}({groupId:a}),b=(()=>{const e=i??p;return m({value:e,tabValues:o})?e:null})();(0,r.useLayoutEffect)((()=>{b&&s(b)}),[b]);return{selectedValue:l,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);s(e),u(e),f(e)}),[u,f,o]),tabValues:o}}var b=n(717);const y={tabList:"tabList_M0Dn",tabItem:"tabItem_ysIP"};function w(e){let{className:t,block:n,selectedValue:s,selectValue:i,tabValues:u}=e;const c=[],{blockElementScrollPositionUntilNextRender:p}=(0,l.o5)(),d=e=>{const t=e.currentTarget,n=c.indexOf(t),a=u[n].value;a!==s&&(p(t),i(a))},m=e=>{let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const n=c.indexOf(e.currentTarget)+1;t=c[n]??c[0];break}case"ArrowLeft":{const n=c.indexOf(e.currentTarget)-1;t=c[n]??c[c.length-1];break}}t?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":n},t)},u.map((e=>{let{value:t,label:n,attributes:l}=e;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:s===t?0:-1,"aria-selected":s===t,key:t,ref:e=>c.push(e),onKeyDown:m,onClick:d},l,{className:(0,o.Z)("tabs__item",y.tabItem,l?.className,{"tabs__item--active":s===t})}),n??t)})))}function v(e){let{lazy:t,children:n,selectedValue:a}=e;const o=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},o.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a}))))}function g(e){const t=f(e);return r.createElement("div",{className:(0,o.Z)("tabs-container",y.tabList)},r.createElement(w,(0,a.Z)({},e,t)),r.createElement(v,(0,a.Z)({},e,t)))}function k(e){const t=(0,b.Z)();return r.createElement(g,(0,a.Z)({key:String(t)},e))}},5597:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>s,metadata:()=>u,toc:()=>p});var a=n(7896),r=(n(2784),n(876)),o=n(2605),l=n(3142);const s={sidebar_position:5,description:"Claim the ownership of test cases and suites."},i="People",u={unversionedId:"api/people",id:"api/people",title:"People",description:"Claim the ownership of test cases and suites.",source:"@site/../../docs/api/people.mdx",sourceDirName:"api",slug:"/api/people",permalink:"/jest-allure2-reporter/docs/api/people",draft:!1,editUrl:"https://github.com/wix-incubator/jest-allure2-reporter/tree/master/docs/../../docs/api/people.mdx",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,description:"Claim the ownership of test cases and suites."},sidebar:"docsSidebar",previous:{title:"Parameters",permalink:"/jest-allure2-reporter/docs/api/parameters"},next:{title:"Severity",permalink:"/jest-allure2-reporter/docs/api/severity"}},c={},p=[{value:"Owner",id:"owner",level:2},{value:"Lead",id:"lead",level:2},{value:"Examples",id:"examples",level:2},{value:"Advanced usage",id:"advanced-usage",level:2}],d={toc:p},m="wrapper";function h(e){let{components:t,...n}=e;return(0,r.kt)(m,(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"people"},"People"),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"This website version refers to the unreleased version of ",(0,r.kt)("inlineCode",{parentName:"p"},"jest-allure2-reporter")," and is not yet available\nanywhere. Please use GitHub docs for the latest stable version.")),(0,r.kt)("p",null,"In Allure reports, you can indicate the ",(0,r.kt)("strong",{parentName:"p"},"owner")," and the team ",(0,r.kt)("strong",{parentName:"p"},"lead")," for each test case.\nThis allows for better organization, responsibility allocation, and communication within your team.\nAdvanced solutions can leverage this information to notify the relevant people about test failures\nor to assign automatic tasks to them."),(0,r.kt)("p",null,"There are two ways to associate a test case with a person:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"declaratively, via ",(0,r.kt)("inlineCode",{parentName:"li"},"@owner")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"@lead")," JSDoc annotations;"),(0,r.kt)("li",{parentName:"ul"},"programmatically, via ",(0,r.kt)("inlineCode",{parentName:"li"},"$Owner")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"$Lead")," annotation functions.")),(0,r.kt)("h2",{id:"owner"},"Owner"),(0,r.kt)("p",null,"The owner of a test suite is the person who is responsible for the test suite and all test cases in it."),(0,r.kt)("p",null,"Here is how you can associate an entire test file with an owner:"),(0,r.kt)(o.Z,{groupId:"approach",mdxType:"Tabs"},(0,r.kt)(l.Z,{value:"jsdoc",label:"JSDoc",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"/**\n * @owner John Doe <john.doe@example.com>\n */\n\ndescribe('Sanity: Login flow', () => {\n  it('should login with valid credentials', () => {\n    /* ... test code ... */\n  });\n});\n\ndescribe('Sanity: Dashboard', () => {\n  it('should show the dashboard', () => {\n    /* ... test code ... */\n  });\n});\n"))),(0,r.kt)(l.Z,{value:"dsl",label:"Function",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import { allure } from 'jest-allure2-reporter';\n\nallure.owner('John Doe <john.doe@example.com>');\n\ndescribe('Sanity: Login flow', () => {\n  it('should login with valid credentials', () => {\n    /* ... test code ... */\n  });\n});\n\ndescribe('Sanity: Dashboard', () => {\n  it('should show the dashboard', () => {\n    /* ... test code ... */\n  });\n});\n")))),(0,r.kt)("p",null,"Here is how you can associate a selected test suite with an owner:"),(0,r.kt)(o.Z,{groupId:"approach",mdxType:"Tabs"},(0,r.kt)(l.Z,{value:"jsdoc",label:"JSDoc",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"describe('Sanity: Login flow', () => {\n  /**\n   * @owner John Doe <john.doe@example.com>\n   */\n\n  it('should login with valid credentials', () => {\n    /* ... test code ... */\n  });\n});\n")),(0,r.kt)("p",null,"Please note that you have to put the JSDoc comment inside the test suite function body.")),(0,r.kt)(l.Z,{value:"dsl",label:"Function",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import { $Owner } from 'jest-allure2-reporter/annotations';\n\n$Owner('John Doe <john.doe@example.com>');\ndescribe('Sanity: Login flow', () => {\n  it('should login with valid credentials', () => {\n    /* ... test code ... */\n  });\n});\n")))),(0,r.kt)("p",null,"You can also assign an owner for each test case individually."),(0,r.kt)(o.Z,{groupId:"approach",mdxType:"Tabs"},(0,r.kt)(l.Z,{value:"jsdoc",label:"JSDoc",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"it('should login with valid credentials', () => {\n  /**\n   * @owner John Doe <john.doe@example.com>\n   */\n\n  /* ... test code ... */\n});\n")),(0,r.kt)("p",null,"Please note that you have to put the JSDoc comment inside the test function body.")),(0,r.kt)(l.Z,{value:"dsl",label:"Function",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"```js\n$Owner('John Doe <john.doe@example.com>');\nit('should login with valid credentials', () => {\n/* ... */\n")),(0,r.kt)("p",null,"  });"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"```\n")))),(0,r.kt)("h2",{id:"lead"},"Lead"),(0,r.kt)("p",null,"The team lead might be the second person responsible for the test suite or the test case."),(0,r.kt)(o.Z,{groupId:"approach",mdxType:"Tabs"},(0,r.kt)(l.Z,{value:"jsdoc",label:"JSDoc",mdxType:"TabItem"},(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"@lead")," annotation follows the same rules and syntax as the ",(0,r.kt)("inlineCode",{parentName:"p"},"@owner"),", e.g.:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"/**\n * @owner John Doe <john.doe@example.com>\n * @lead Jane Smith <jane.smith@example.com>\n */\n\ndescribe('Sanity: Login flow', () => {\n  it('should login with valid credentials', () => {\n    /* ... test code ... */\n  });\n\n  it('should open the new Login page version', () => {\n    /**\n     * @owner Mark Doe <mark.doe@example.com>\n     * @lead Mary Smith <mary.smith@example.com>\n     */\n\n    /* ... test code ... */\n  });\n});\n"))),(0,r.kt)(l.Z,{value:"dsl",label:"Function",mdxType:"TabItem"},(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"$Lead")," annotation follows the same rules and syntax as the ",(0,r.kt)("inlineCode",{parentName:"p"},"$Owner"),", e.g.:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import { $Lead, $Owner } from 'jest-allure2-reporter/annotations';\n\n$Owner('John Doe <john.doe@example.com>');\n$Lead('Jane Smith <jane.smith@example.com>');\ndescribe('Sanity: Login flow', () => {\n  it('should login with valid credentials', () => {\n    /* ... test code ... */\n  });\n\n  $Owner('Mark Doe <mark.doe@example.com>');\n  $Lead('Mary Smith <mary.smith@example.com>');\n  it('should open the new Login page version', () => {\n    /* ... test code ... */\n  });\n});\n")))),(0,r.kt)("h2",{id:"examples"},"Examples"),(0,r.kt)("p",null,"In the generated report, the owner and lead are displayed in the test case description:"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"TODO: add screenshot")),(0,r.kt)("h2",{id:"advanced-usage"},"Advanced usage"),(0,r.kt)("p",null,"You can use the owner and lead information in your custom reporters and plugins.\n",(0,r.kt)("inlineCode",{parentName:"p"},"TODO: read more about query functions to use in your custom reporters and plugins")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import * as query from 'jest-allure2-reporter/query';\n\n/**\n * Simplistic implementation of a notification reporter.\n * @implements {Reporter}\n */\nexport default class NotifyJestReporter {\n  /**\n   */\n  async onRunComplete(contexts, results) {\n    const owners = new Map();\n    const leads = new Map();\n\n    for (const testFileResult of results.testResults) {\n      for (const testCaseResult of testFileResult.testResults) {\n        if (testCaseResult.status !== 'failed') {\n          continue;\n        }\n\n        const owner = query.owner(testCaseResult);\n        const lead = query.lead(testCaseResult);\n\n        if (owner) {\n          await this.#notify(owner, testCaseResult);\n        }\n\n        if (lead && lead !== owner) {\n          await this.#notify(lead, testCaseResult);\n        }\n      }\n    }\n  }\n\n  async #notify(person, testCaseResult) {\n    // ... some code to send a notification to the person ...\n  }\n}\n")))}h.isMDXComponent=!0}}]);