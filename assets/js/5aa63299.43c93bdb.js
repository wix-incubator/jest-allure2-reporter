"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[125],{876:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>g});var n=r(2784);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),p=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},u=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),c=p(r),d=a,g=c["".concat(s,".").concat(d)]||c[d]||m[d]||i;return r?n.createElement(g,l(l({ref:t},u),{},{components:r})):n.createElement(g,l({ref:t},u))}));function g(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,l=new Array(i);l[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[c]="string"==typeof e?e:a,l[1]=o;for(var p=2;p<i;p++)l[p]=r[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},2265:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var n=r(7896),a=(r(2784),r(876));const i={},l=void 0,o={unversionedId:"README",id:"README",title:"README",description:"Stand With Ukraine",source:"@site/../../docs/README.md",sourceDirName:".",slug:"/",permalink:"/jest-allure2-reporter/docs/",draft:!1,editUrl:"https://github.com/wix-incubator/jest-allure2-reporter/tree/master/docs/../../docs/README.md",tags:[],version:"current",frontMatter:{}},s={},p=[{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2},{value:"Contributing",id:"contributing",level:2},{value:"License",id:"license",level:2}],u={toc:p},c="wrapper";function m(e){let{components:t,...i}=e;return(0,a.kt)(c,(0,n.Z)({},u,i,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://stand-with-ukraine.pp.ua"},(0,a.kt)("img",{parentName:"a",src:"https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner-direct-single.svg",alt:"Stand With Ukraine"}))),(0,a.kt)("div",{align:"center"},(0,a.kt)("img",{src:"img/logo-full.svg",height:"300"}),(0,a.kt)("h1",{id:"jest-allure2-reporter"},"jest-allure2-reporter"),(0,a.kt)("p",null,"Idiomatic Jest reporter for Allure Framework"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://badge.fury.io/js/jest-allure2-reporter"},(0,a.kt)("img",{parentName:"a",src:"https://badge.fury.io/js/jest-allure2-reporter.svg",alt:"npm version"})),"\n",(0,a.kt)("a",{parentName:"p",href:"https://github.com/wix-incubator/jest-allure2-reporter/actions/workflows/ci.yml"},(0,a.kt)("img",{parentName:"a",src:"https://github.com/wix-incubator/jest-allure2-reporter/actions/workflows/ci.yml/badge.svg",alt:"CI"})),"\n",(0,a.kt)("a",{parentName:"p",href:"https://github.com/semantic-release/semantic-release"},(0,a.kt)("img",{parentName:"a",src:"https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release",alt:"semantic-release: angular"})),"\n",(0,a.kt)("a",{parentName:"p",href:"http://commitizen.github.io/cz-cli/"},(0,a.kt)("img",{parentName:"a",src:"https://img.shields.io/badge/commitizen-friendly-brightgreen.svg",alt:"Commitizen friendly"})))),(0,a.kt)("h2",{id:"installation"},"Installation"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"This is an express guide to get you started quickly. Please visit ",(0,a.kt)("a",{parentName:"p",href:"https://wix-incubator.github.io/jest-allure2-reporter/"},"our documentation website")," for more information.")),(0,a.kt)("p",null,"Your project should have ",(0,a.kt)("a",{parentName:"p",href:"https://jestjs.io"},(0,a.kt)("inlineCode",{parentName:"a"},"jest"))," installed. The minimum supported version is ",(0,a.kt)("inlineCode",{parentName:"p"},"27.x"),"."),(0,a.kt)("p",null,"Run in your project:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npm install --save-dev jest-allure2-reporter\n")),(0,a.kt)("p",null,"Edit your Jest config, e.g. ",(0,a.kt)("inlineCode",{parentName:"p"},"jest.config.js"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-diff"},"/** @type {import('@jest/types').Config.InitialOptions} */\nmodule.exports = {\n  // ...\n  reporters: [\n    'default',\n+   'jest-allure2-reporter',\n  ],\n};\n")),(0,a.kt)("h2",{id:"usage"},"Usage"),(0,a.kt)("p",null,"Run your tests with ",(0,a.kt)("inlineCode",{parentName:"p"},"jest")," as usual, e.g.:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npm test\n")),(0,a.kt)("p",null,"and then view the results:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"allure serve\n")),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Example screenshot",src:r(4988).Z,width:"1920",height:"1080"})),(0,a.kt)("p",null,"If you need to generate a static report, e.g., on CI, run instead:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"allure generate\n")),(0,a.kt)("p",null,"Make sure you have ",(0,a.kt)("inlineCode",{parentName:"p"},"allure")," CLI installed beforehand. For more information about it, refer to the official ",(0,a.kt)("a",{parentName:"p",href:"https://docs.qameta.io/allure/#_get_started"},"Allure docs"),"."),(0,a.kt)("h2",{id:"contributing"},"Contributing"),(0,a.kt)("p",null,"See the ",(0,a.kt)("a",{parentName:"p",href:"https://wix-incubator.github.io/jest-allure2-reporter/docs/contributing"},"Contributing")," guide on the website."),(0,a.kt)("h2",{id:"license"},"License"),(0,a.kt)("p",null,"Licensed under ",(0,a.kt)("a",{parentName:"p",href:"../LICENSE"},"MIT License"),"."))}m.isMDXComponent=!0},4988:(e,t,r)=>{r.d(t,{Z:()=>n});const n=r.p+"assets/images/example-8e80852e1dcb46cf17fa7416fe57cc51.png"}}]);