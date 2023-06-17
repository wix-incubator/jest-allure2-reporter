"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[830],{876:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var a=n(2784);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),p=u(n),m=r,h=p["".concat(s,".").concat(m)]||p[m]||d[m]||i;return n?a.createElement(h,l(l({ref:t},c),{},{components:n})):a.createElement(h,l({ref:t},c))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=m;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[p]="string"==typeof e?e:r,l[1]=o;for(var u=2;u<i;u++)l[u]=n[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3142:(e,t,n)=>{n.d(t,{Z:()=>l});var a=n(2784),r=n(6277);const i={tabItem:"tabItem_OMyP"};function l(e){let{children:t,hidden:n,className:l}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(i.tabItem,l),hidden:n},t)}},2605:(e,t,n)=>{n.d(t,{Z:()=>w});var a=n(7896),r=n(2784),i=n(6277),l=n(5425),o=n(7267),s=n(4236),u=n(3432),c=n(9675);function p(e){return function(e){return r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:r}}=e;return{value:t,label:n,attributes:a,default:r}}))}function d(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??p(n);return function(e){const t=(0,u.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function m(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function h(e){let{queryString:t=!1,groupId:n}=e;const a=(0,o.k6)(),i=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,s._X)(i),(0,r.useCallback)((e=>{if(!i)return;const t=new URLSearchParams(a.location.search);t.set(i,e),a.replace({...a.location,search:t.toString()})}),[i,a])]}function f(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,i=d(e),[l,o]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:i}))),[s,u]=h({queryString:n,groupId:a}),[p,f]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,i]=(0,c.Nk)(n);return[a,(0,r.useCallback)((e=>{n&&i.set(e)}),[n,i])]}({groupId:a}),b=(()=>{const e=s??p;return m({value:e,tabValues:i})?e:null})();(0,r.useLayoutEffect)((()=>{b&&o(b)}),[b]);return{selectedValue:l,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:i}))throw new Error(`Can't select invalid tab value=${e}`);o(e),u(e),f(e)}),[u,f,i]),tabValues:i}}var b=n(717);const y={tabList:"tabList_M0Dn",tabItem:"tabItem_ysIP"};function v(e){let{className:t,block:n,selectedValue:o,selectValue:s,tabValues:u}=e;const c=[],{blockElementScrollPositionUntilNextRender:p}=(0,l.o5)(),d=e=>{const t=e.currentTarget,n=c.indexOf(t),a=u[n].value;a!==o&&(p(t),s(a))},m=e=>{let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const n=c.indexOf(e.currentTarget)+1;t=c[n]??c[0];break}case"ArrowLeft":{const n=c.indexOf(e.currentTarget)-1;t=c[n]??c[c.length-1];break}}t?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":n},t)},u.map((e=>{let{value:t,label:n,attributes:l}=e;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:o===t?0:-1,"aria-selected":o===t,key:t,ref:e=>c.push(e),onKeyDown:m,onClick:d},l,{className:(0,i.Z)("tabs__item",y.tabItem,l?.className,{"tabs__item--active":o===t})}),n??t)})))}function k(e){let{lazy:t,children:n,selectedValue:a}=e;const i=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=i.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},i.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a}))))}function g(e){const t=f(e);return r.createElement("div",{className:(0,i.Z)("tabs-container",y.tabList)},r.createElement(v,(0,a.Z)({},e,t)),r.createElement(k,(0,a.Z)({},e,t)))}function w(e){const t=(0,b.Z)();return r.createElement(g,(0,a.Z)({key:String(t)},e))}},4329:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>h,frontMatter:()=>o,metadata:()=>u,toc:()=>p});var a=n(7896),r=(n(2784),n(876)),i=n(2605),l=n(3142);const o={sidebar_position:6,description:"Prioritize your test cases and their impact on the product."},s="Severity",u={unversionedId:"annotations/severity",id:"annotations/severity",title:"Severity",description:"Prioritize your test cases and their impact on the product.",source:"@site/../../docs/annotations/severity.mdx",sourceDirName:"annotations",slug:"/annotations/severity",permalink:"/jest-allure2-reporter/docs/annotations/severity",draft:!1,editUrl:"https://github.com/wix-incubator/jest-allure2-reporter/tree/master/docs/../../docs/annotations/severity.mdx",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6,description:"Prioritize your test cases and their impact on the product."},sidebar:"docsSidebar",previous:{title:"People",permalink:"/jest-allure2-reporter/docs/annotations/people"},next:{title:"Links",permalink:"/jest-allure2-reporter/docs/annotations/links"}},c={},p=[{value:"Test file",id:"test-file",level:2},{value:"Test suite",id:"test-suite",level:2},{value:"Test case",id:"test-case",level:2},{value:"Examples",id:"examples",level:2},{value:"About severity levels",id:"about-severity-levels",level:2}],d={toc:p},m="wrapper";function h(e){let{components:t,...n}=e;return(0,r.kt)(m,(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"severity"},"Severity"),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"This website version refers to the unreleased version of ",(0,r.kt)("inlineCode",{parentName:"p"},"jest-allure2-reporter")," and is not yet available\nanywhere. Please use GitHub docs for the latest stable version.")),(0,r.kt)("p",null,"In Allure reports, you can determine the ",(0,r.kt)("strong",{parentName:"p"},"severity")," of each test case.\nThis helps you to prioritize the test cases and to determine the impact of a failed test case.\nThe severity can be one of the following values: ",(0,r.kt)("em",{parentName:"p"},"blocker"),", ",(0,r.kt)("em",{parentName:"p"},"critical"),", ",(0,r.kt)("em",{parentName:"p"},"normal"),", ",(0,r.kt)("em",{parentName:"p"},"minor"),", ",(0,r.kt)("em",{parentName:"p"},"trivial"),".\nThe default severity is ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("em",{parentName:"strong"},"normal")),"."),(0,r.kt)("p",null,"There are two ways to define the severity of a test case:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"declaratively, via ",(0,r.kt)("inlineCode",{parentName:"li"},"@severity")," JSDoc annotation;"),(0,r.kt)("li",{parentName:"ul"},"programmatically, via ",(0,r.kt)("inlineCode",{parentName:"li"},"$Severity")," annotation function.")),(0,r.kt)("p",null,"The ",(0,r.kt)("strong",{parentName:"p"},"severity")," can be defined in the following places:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"on a ",(0,r.kt)("em",{parentName:"li"},"test file")," level;"),(0,r.kt)("li",{parentName:"ul"},"on a ",(0,r.kt)("em",{parentName:"li"},"test suite")," level;"),(0,r.kt)("li",{parentName:"ul"},"on a ",(0,r.kt)("em",{parentName:"li"},"test case")," level.")),(0,r.kt)("h2",{id:"test-file"},"Test file"),(0,r.kt)("p",null,"In a test file, you can define the severity for all test cases in the file.\nThis is especially useful for test files that contain multiple top-level ",(0,r.kt)("inlineCode",{parentName:"p"},"describe")," blocks."),(0,r.kt)(i.Z,{groupId:"approach",mdxType:"Tabs"},(0,r.kt)(l.Z,{value:"jsdoc",label:"JSDoc",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"/**\n * @severity critical\n */\n\ndescribe('Sanity: Login flow', () => {\n  it('should login with valid credentials', () => {\n    /* ... test code ... */\n  });\n});\n\ndescribe('Sanity: Dashboard', () => {\n  it('should show the dashboard', () => {\n    /* ... test code ... */\n  });\n});\n"))),(0,r.kt)(l.Z,{value:"dsl",label:"Function",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import { allure } from 'jest-allure2-reporter';\n\nallure.severity('critical');\n\ndescribe('Sanity: Login flow', () => {\n  it('should login with valid credentials', () => {\n    /* ... test code ... */\n  });\n});\n\ndescribe('Sanity: Dashboard', () => {\n  it('should show the dashboard', () => {\n    /* ... test code ... */\n  });\n});\n")))),(0,r.kt)("h2",{id:"test-suite"},"Test suite"),(0,r.kt)("p",null,"You can define the severity for each test suite individually."),(0,r.kt)(i.Z,{groupId:"approach",mdxType:"Tabs"},(0,r.kt)(l.Z,{value:"jsdoc",label:"JSDoc",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"describe('Sanity: Login flow', () => {\n  /**\n   * @severity critical\n   */\n\n  it('should login with valid credentials', () => {\n    /* ... test code ... */\n  });\n});\n\ndescribe('Dashboard', () => {\n  /**\n   * @severity minor\n   */\n\n  it('should show the dashboard', () => {\n    /* ... test code ... */\n  });\n});\n")),(0,r.kt)("p",null,"Please note that you have to put the JSDoc comment inside the test suite function body.")),(0,r.kt)(l.Z,{value:"dsl",label:"Function",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import { $Severity } from 'jest-allure2-reporter/annotations';\n\n$Severity('blocker')\ndescribe('Sanity: Login flow', () => {\n  it('should login with valid credentials', () => {\n    /* ... test code ... */\n  });\n});\n\n$Severity('minor')\ndescribe('Sanity: Dashboard', () => {\n    it('should show the dashboard', () => {\n    /* ... test code ... */\n  });\n});\n")))),(0,r.kt)("h2",{id:"test-case"},"Test case"),(0,r.kt)("p",null,"You can define the severity for each test case individually."),(0,r.kt)(i.Z,{groupId:"approach",mdxType:"Tabs"},(0,r.kt)(l.Z,{value:"jsdoc",label:"JSDoc",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"it('should login with valid credentials', () => {\n  /**\n   * @severity critical\n   */\n\n  /* ... test code ... */\n});\n")),(0,r.kt)("p",null,"Please note that you have to put the JSDoc comment inside the test function body.")),(0,r.kt)(l.Z,{value:"dsl",label:"Function",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"$Severity('critical')\nit('should login with valid credentials', () => {\n  /* ... */\n});\n")))),(0,r.kt)("h2",{id:"examples"},"Examples"),(0,r.kt)("p",null,"In the generated report, the severity is displayed in the test case description:"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"TODO: add screenshot")),(0,r.kt)("h2",{id:"about-severity-levels"},"About severity levels"),(0,r.kt)("p",null,"Keep in mind that the meaning of each severity level is subjective and varies from project to project.\nIt is merely a convention that you can use to communicate the importance of a test case or an issue."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Blocker"),": This is the highest severity level. A blocker issue or a test case failure is something that completely prevents further testing or use of the product or system. It must be addressed immediately."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Critical"),": A critical issue is a major problem that significantly impacts the functionality of the product or system, but does not entirely prevent its use or testing. It should be addressed as soon as possible after any blocker issues."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Normal"),": A normal severity issue is a moderate problem. It impacts the product or system in a noticeable way, but it's not as crucial as blocker or critical issues. It should be addressed in the course of normal workflow."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Minor"),": A minor issue has a small impact on the product or system. It might cause some inconvenience or confusion, but it doesn't significantly affect the overall functionality. These are usually lower priority issues."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Trivial"),": A trivial issue is a very minor problem, often related to aesthetics, user experience, deprecated features, or aspects of the product still in alpha or beta stages rather than core functionality. Trivial issues are the lowest priority and are typically addressed last, if at all.")))}h.isMDXComponent=!0}}]);