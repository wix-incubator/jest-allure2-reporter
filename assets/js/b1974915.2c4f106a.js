"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[868],{876:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>k});var r=n(2784);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),c=u(n),d=a,k=c["".concat(s,".").concat(d)]||c[d]||m[d]||l;return n?r.createElement(k,o(o({ref:t},p),{},{components:n})):r.createElement(k,o({ref:t},p))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[c]="string"==typeof e?e:a,o[1]=i;for(var u=2;u<l;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},2949:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>m,frontMatter:()=>l,metadata:()=>i,toc:()=>u});var r=n(7896),a=(n(2784),n(876));const l={sidebar_position:4},o="Contributing",i={unversionedId:"contributing",id:"contributing",title:"Contributing",description:"We welcome issues and pull requests from the community.",source:"@site/../../docs/contributing.md",sourceDirName:".",slug:"/contributing",permalink:"/jest-allure2-reporter/docs/contributing",draft:!1,editUrl:"https://github.com/wix-incubator/jest-allure2-reporter/tree/master/docs/../../docs/contributing.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"docsSidebar",previous:{title:"Labels",permalink:"/jest-allure2-reporter/docs/api/labels"}},s={},u=[{value:"Issues",id:"issues",level:2},{value:"Pull requests",id:"pull-requests",level:2},{value:"Setup",id:"setup",level:3},{value:"Running tests",id:"running-tests",level:3},{value:"Checking your code",id:"checking-your-code",level:3}],p={toc:u},c="wrapper";function m(e){let{components:t,...n}=e;return(0,a.kt)(c,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"contributing"},"Contributing"),(0,a.kt)("p",null,"We welcome issues and pull requests from the community. \ud83d\udc9c"),(0,a.kt)("h2",{id:"issues"},"Issues"),(0,a.kt)("p",null,"Open an issue on the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/wix-incubator/jest-allure2-reporter/issues"},"issue tracker"),"."),(0,a.kt)("p",null,"Please include the following information:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Operating system"),(0,a.kt)("li",{parentName:"ul"},"Node.js version"),(0,a.kt)("li",{parentName:"ul"},"Jest version"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"jest-allure2-reporter")," version"),(0,a.kt)("li",{parentName:"ul"},"Reproduction repository"),(0,a.kt)("li",{parentName:"ul"},"Steps to reproduce")),(0,a.kt)("h2",{id:"pull-requests"},"Pull requests"),(0,a.kt)("h3",{id:"setup"},"Setup"),(0,a.kt)("p",null,"This is a standard Node.js project. You'll need to have Node.js installed."),(0,a.kt)("p",null,"Fork this repository, clone and install dependencies:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npm install\n")),(0,a.kt)("h3",{id:"running-tests"},"Running tests"),(0,a.kt)("p",null,"Generate fixtures:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npm run record\n")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"If you want to check compatiblity with a specific Jest version, you can use the ",(0,a.kt)("inlineCode",{parentName:"p"},"JEST_VERSION")," environment variable:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"JEST_VERSION=27 npm run record\n")),(0,a.kt)("p",null,"Run tests:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npm test\n")),(0,a.kt)("p",null,"To view the test results, regenerate the full version of the fixtures:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npm run start\n")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"If you want to check compatiblity with a specific Jest version, you can use the ",(0,a.kt)("inlineCode",{parentName:"p"},"JEST_VERSION")," environment variable:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"JEST_VERSION=27 npm run start\n")),(0,a.kt)("p",null,"To re-run the Allure CLI server, run:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npm run serve\n")),(0,a.kt)("h3",{id:"checking-your-code"},"Checking your code"),(0,a.kt)("p",null,"Before committing, run the linter and tests:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npm run lint\nnpm test\n")),(0,a.kt)("p",null,"To create a commit, use ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/commitizen/cz-cli"},"Commitizen"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npx cz\n")),(0,a.kt)("p",null,"and follow the instructions. We adhere to Angular's ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit"},"commit message guidelines"),"."),(0,a.kt)("p",null,"Thanks in advance for your contribution!"))}m.isMDXComponent=!0}}]);