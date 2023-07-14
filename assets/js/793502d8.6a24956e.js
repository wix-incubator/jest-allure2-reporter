"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[789],{3406:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>p,frontMatter:()=>i,metadata:()=>u,toc:()=>d});var r=t(2322),s=t(5392),o=t(2605),a=t(3142);const i={description:"Behavior-driven way to group test results."},l="By Story",u={unversionedId:"docs/config/grouping/by-story",id:"docs/config/grouping/by-story",title:"By Story",description:"Behavior-driven way to group test results.",source:"@site/../../docs/docs/config/01-grouping/02-by-story.mdx",sourceDirName:"docs/config/01-grouping",slug:"/docs/config/grouping/by-story",permalink:"/jest-allure2-reporter/docs/config/grouping/by-story",draft:!1,unlisted:!1,editUrl:"https://github.com/wix-incubator/jest-allure2-reporter/tree/master/docs/../../docs/docs/config/01-grouping/02-by-story.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{description:"Behavior-driven way to group test results."},sidebar:"docsSidebar",previous:{title:"By Suite",permalink:"/jest-allure2-reporter/docs/config/grouping/by-suite"},next:{title:"By Package",permalink:"/jest-allure2-reporter/docs/config/grouping/by-package"}},c={},d=[{value:"Annotations API",id:"annotations-api",level:2},{value:"Configuration API",id:"configuration-api",level:2}];function h(e){const n=Object.assign({h1:"h1",admonition:"admonition",p:"p",code:"code",img:"img",a:"a",strong:"strong",ul:"ul",li:"li",h2:"h2",pre:"pre"},(0,s.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"by-story",children:"By Story"}),"\n",(0,r.jsx)(n.admonition,{type:"caution",children:(0,r.jsxs)(n.p,{children:["This website version refers to the unreleased version of ",(0,r.jsx)(n.code,{children:"jest-allure2-reporter"})," and is not yet available\nanywhere. Please use GitHub docs for the latest stable version."]})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"Grouping by story",src:t(5217).Z+"",width:"2048",height:"1200"})}),"\n",(0,r.jsxs)(n.p,{children:["This grouping option comes from the ",(0,r.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Behavior-driven_development",children:"Behavior-Driven Development"})," (BDD) methodology and\nallows users to group test results based on the ",(0,r.jsx)(n.strong,{children:"epic"}),", ",(0,r.jsx)(n.strong,{children:"feature"})," and ",(0,r.jsx)(n.strong,{children:"story"})," to which each test case belongs, where:"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"epic"})," is a high-level business goal."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"feature"})," is a functionality that delivers business value."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"story"})," is a user story that describes a feature from the end-user perspective."]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["This grouping is not enabled by default. Moreover, you need to decide how exactly you want to enable it: via ",(0,r.jsx)(n.a,{href:"#configuration-api",children:"configuration"})," or ",(0,r.jsx)(n.a,{href:"#annotations-api",children:"annotations"}),"."]}),"\n",(0,r.jsx)(n.h2,{id:"annotations-api",children:"Annotations API"}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.a,{href:"/jest-allure2-reporter/docs/api/labels",children:"annotation-based approach"})," gives you a fine-grained control over the names of your Epic, Feature and Story labels, but it requires you to add annotations to your test cases."]}),"\n",(0,r.jsxs)(n.p,{children:["In the previous example, it would make sense to group both client and server tests under the same features like ",(0,r.jsx)(n.strong,{children:"Login screen"})," and ",(0,r.jsx)(n.strong,{children:"Forgot password screen"}),", whereas the epic would be ",(0,r.jsx)(n.strong,{children:"Authentication"}),"."]}),"\n",(0,r.jsxs)(o.Z,{groupId:"configTab",children:[(0,r.jsx)(a.Z,{value:"demo",label:"Report",children:(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"Grouping by Story: annotation-based",src:t(169).Z+"",width:"2048",height:"1200"})})}),(0,r.jsx)(a.Z,{value:"structure",label:"Structure",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-plain",children:"\u2514\u2500 Authentication\n   \u251c\u2500 Login screen\n   \u2502  \u251c\u2500 should validate e-mail on client\n   \u2502  \u251c\u2500 should validate e-mail on server\n   \u2502  \u251c\u2500 should display login form on client\n   \u2502  \u251c\u2500 should return 401 if user is not found\n   \u2502  \u2514\u2500 should return 401 if password is incorrect\n   \u2514\u2500 Forgot password screen\n      \u251c\u2500 should validate e-mail on client\n      \u251c\u2500 should validate e-mail on server\n      \u251c\u2500 should return 401 if user is not found\n      \u2514\u2500 should return 401 if password is incorrect\n"})})}),(0,r.jsx)(a.Z,{value:"config",label:"Code",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",metastring:'title="login.test.js"',children:"import { $Epic, $Feature, $Story } from 'jest-allure2-reporter/annotations';\n\n$Epic('Authentication');\n$Feature('Login screen');\ndescribe('Login controller', () => {\n  $Story('should validate e-mail on server');\n  it('should validate e-mail', () => {\n    // ...\n  });\n\n  $Story('should return 401 if user is not found');\n  it('should return 401 if user is not found', () => {\n    // ...\n  });\n});\n"})})})]}),"\n",(0,r.jsx)(n.h2,{id:"configuration-api",children:"Configuration API"}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.strong,{children:"configuration-based approach"})," allows you to group test cases based on the available attributes like file path, ancestor describe blocks, test name and so on."]}),"\n",(0,r.jsxs)(n.p,{children:["It's a good option if you don't want to add annotations to your test cases by hand, but it's less flexible than the annotation-based approach. Still, it might be useful if your grouping by suite focuses mostly ",(0,r.jsx)(n.a,{href:"#file-oriented-example",children:"on the file structure"}),', and you want to add "a fresh perspective" by grouping tests by describe blocks and test names, for example.']}),"\n",(0,r.jsx)(n.p,{children:"Here's a simple example where we map:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"epic"})," to the top-level describe block"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"feature"})," to the second-level describe block"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"story"})," to the remaining describe blocks and test name itself"]}),"\n"]}),"\n",(0,r.jsxs)(o.Z,{groupId:"configTab",children:[(0,r.jsx)(a.Z,{value:"demo",label:"Report",children:(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"Grouping by Story: configuration-based",src:t(5329).Z+"",width:"2048",height:"1200"})})}),(0,r.jsx)(a.Z,{value:"structure",label:"Structure",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-plain",children:"\u251c\u2500 Login screen\n\u2502  \u251c\u2500 when loaded\n\u2502  \u2502  \u2514\u2500 should display login form\n\u2502  \u2514\u2500 when loaded and typed\n\u2502     \u251c\u2500 should validate e-mail\n\u2502     \u2514\u2500 should validate password\n\u251c\u2500 Forgot password screen\n\u2502  \u251c\u2500 when loaded\n\u2502  \u2502  \u2514\u2500 should display forgot password form\n\u2502  \u2514\u2500 when loaded and typed\n\u2502     \u2514\u2500 should validate e-mail\n\u251c\u2500 Login controller\n\u2502  \u251c\u2500 should return 401 if user is not found\n\u2502  \u2514\u2500 should return 401 if password is incorrect\n\u2514\u2500 Forgot password controller\n   \u251c\u2500 should return 401 if user is not found\n   \u2514\u2500 should return 401 if password is incorrect\n"})})}),(0,r.jsx)(a.Z,{value:"config",label:"Config",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",metastring:'title="jest.config.js"',children:"/** @type {import('@jest/types').Config.InitialOptions} */\nmodule.exports = {\n  testEnvironment: 'jest-allure2-reporter/environment-node',\n  reporters: [\n    'default',\n    ['jest-allure2-reporter', /** @type {import('jest-allure2-reporter').Options}*/ {\n      labels: {\n        epic: ({ test }) => test.ancestorTitles[0],\n        feature: ({ test }) => test.ancestorTitles.slice(1).join(' ') || undefined,\n        story: ({ test }) => test.title,\n      },\n    }],\n  ],\n};\n"})})})]})]})}const p=function(e={}){const{wrapper:n}=Object.assign({},(0,s.ah)(),e.components);return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(h,e)})):h(e)}},3142:(e,n,t)=>{t.d(n,{Z:()=>a});t(2784);var r=t(6277);const s={tabItem:"tabItem_OMyP"};var o=t(2322);function a(e){let{children:n,hidden:t,className:a}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,r.Z)(s.tabItem,a),hidden:t,children:n})}},2605:(e,n,t)=>{t.d(n,{Z:()=>w});var r=t(2784),s=t(6277),o=t(5425),a=t(7267),i=t(9065),l=t(4236),u=t(3432),c=t(9675);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:t}=e;return(0,r.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:t,attributes:r,default:s}}=e;return{value:n,label:t,attributes:r,default:s}}))}(t);return function(e){const n=(0,u.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function p(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function g(e){let{queryString:n=!1,groupId:t}=e;const s=(0,a.k6)(),o=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,l._X)(o),(0,r.useCallback)((e=>{if(!o)return;const n=new URLSearchParams(s.location.search);n.set(o,e),s.replace({...s.location,search:n.toString()})}),[o,s])]}function f(e){const{defaultValue:n,queryString:t=!1,groupId:s}=e,o=h(e),[a,l]=(0,r.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:o}))),[u,d]=g({queryString:t,groupId:s}),[f,b]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[s,o]=(0,c.Nk)(t);return[s,(0,r.useCallback)((e=>{t&&o.set(e)}),[t,o])]}({groupId:s}),m=(()=>{const e=u??f;return p({value:e,tabValues:o})?e:null})();(0,i.Z)((()=>{m&&l(m)}),[m]);return{selectedValue:a,selectValue:(0,r.useCallback)((e=>{if(!p({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);l(e),d(e),b(e)}),[d,b,o]),tabValues:o}}var b=t(717);const m={tabList:"tabList_M0Dn",tabItem:"tabItem_ysIP"};var v=t(2322);function y(e){let{className:n,block:t,selectedValue:r,selectValue:a,tabValues:i}=e;const l=[],{blockElementScrollPositionUntilNextRender:u}=(0,o.o5)(),c=e=>{const n=e.currentTarget,t=l.indexOf(n),s=i[t].value;s!==r&&(u(n),a(s))},d=e=>{let n=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const t=l.indexOf(e.currentTarget)+1;n=l[t]??l[0];break}case"ArrowLeft":{const t=l.indexOf(e.currentTarget)-1;n=l[t]??l[l.length-1];break}}n?.focus()};return(0,v.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":t},n),children:i.map((e=>{let{value:n,label:t,attributes:o}=e;return(0,v.jsx)("li",{role:"tab",tabIndex:r===n?0:-1,"aria-selected":r===n,ref:e=>l.push(e),onKeyDown:d,onClick:c,...o,className:(0,s.Z)("tabs__item",m.tabItem,o?.className,{"tabs__item--active":r===n}),children:t??n},n)}))})}function j(e){let{lazy:n,children:t,selectedValue:s}=e;const o=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=o.find((e=>e.props.value===s));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,v.jsx)("div",{className:"margin-top--md",children:o.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==s})))})}function x(e){const n=f(e);return(0,v.jsxs)("div",{className:(0,s.Z)("tabs-container",m.tabList),children:[(0,v.jsx)(y,{...e,...n}),(0,v.jsx)(j,{...e,...n})]})}function w(e){const n=(0,b.Z)();return(0,v.jsx)(x,{...e,children:d(e.children)},String(n))}},5217:(e,n,t)=>{t.d(n,{Z:()=>r});const r=t.p+"assets/images/config-01-grouping-05-2d8678d4207735094d62ec7c915114c1.jpg"},169:(e,n,t)=>{t.d(n,{Z:()=>r});const r=t.p+"assets/images/config-01-grouping-06-f95ebd1017664d898c799323019d63ca.jpg"},5329:(e,n,t)=>{t.d(n,{Z:()=>r});const r=t.p+"assets/images/config-01-grouping-07-f95ebd1017664d898c799323019d63ca.jpg"},5392:(e,n,t)=>{t.d(n,{Zo:()=>i,ah:()=>o});var r=t(2784);const s=r.createContext({});function o(e){const n=r.useContext(s);return r.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const a={};function i({components:e,children:n,disableParentContext:t}){let i;return i=t?"function"==typeof e?e({}):e||a:o(e),r.createElement(s.Provider,{value:i},n)}}}]);