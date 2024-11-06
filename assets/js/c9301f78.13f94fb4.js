"use strict";(self.webpackChunk_wix_website_jest_allure2_reporter=self.webpackChunk_wix_website_jest_allure2_reporter||[]).push([[6230],{6977:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>l,metadata:()=>r,toc:()=>a});const r=JSON.parse('{"id":"about/contributing","title":"Contributing","description":"We welcome issues and pull requests from the community.","source":"@site/../docs/about/contributing.md","sourceDirName":"about","slug":"/about/contributing","permalink":"/jest-allure2-reporter/about/contributing","draft":false,"unlisted":false,"editUrl":"https://github.com/wix-incubator/jest-allure2-reporter/tree/master/docs/../docs/about/contributing.md","tags":[],"version":"current","lastUpdatedBy":"Yaroslav Serhieiev","lastUpdatedAt":1701454955000,"sidebarPosition":4,"frontMatter":{"sidebar_position":4},"sidebar":"aboutSidebar","next":{"title":"Acknowledgments","permalink":"/jest-allure2-reporter/about/acknowledgements"}}');var t=s(4848),i=s(8453);const l={sidebar_position:4},o="Contributing",c={},a=[{value:"Issues",id:"issues",level:2},{value:"Pull requests",id:"pull-requests",level:2},{value:"Setup",id:"setup",level:3},{value:"Running tests",id:"running-tests",level:3},{value:"Checking your code",id:"checking-your-code",level:3}];function d(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components},{ArticleHeader:s}=n;return s||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("ArticleHeader",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"contributing",children:"Contributing"})}),"\n",(0,t.jsxs)(n.p,{children:["We welcome issues and pull requests from the community. ","\ud83d\udc9c"]}),"\n",(0,t.jsx)(n.h2,{id:"issues",children:"Issues"}),"\n",(0,t.jsx)(s,{}),"\n",(0,t.jsxs)(n.p,{children:["Open an issue on the ",(0,t.jsx)(n.a,{href:"https://github.com/wix-incubator/jest-allure2-reporter/issues",children:"issue tracker"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"Please include the following information:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Operating system"}),"\n",(0,t.jsx)(n.li,{children:"Node.js version"}),"\n",(0,t.jsx)(n.li,{children:"Jest version"}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"jest-allure2-reporter"})," version"]}),"\n",(0,t.jsx)(n.li,{children:"Reproduction repository"}),"\n",(0,t.jsx)(n.li,{children:"Steps to reproduce"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"pull-requests",children:"Pull requests"}),"\n",(0,t.jsx)(n.h3,{id:"setup",children:"Setup"}),"\n",(0,t.jsx)(n.p,{children:"This is a standard Node.js project. You'll need to have Node.js installed."}),"\n",(0,t.jsx)(n.p,{children:"Fork this repository, clone and install dependencies:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npm install\n"})}),"\n",(0,t.jsx)(n.h3,{id:"running-tests",children:"Running tests"}),"\n",(0,t.jsx)(n.p,{children:"Generate fixtures:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npm run record\n"})}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsxs)(n.p,{children:["If you want to check compatiblity with a specific Jest version, you can use the ",(0,t.jsx)(n.code,{children:"JEST_VERSION"})," environment variable:"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"JEST_VERSION=27 npm run record\n"})}),"\n",(0,t.jsx)(n.p,{children:"Run tests:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npm test\n"})}),"\n",(0,t.jsx)(n.p,{children:"To view the test results, regenerate the full version of the fixtures:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npm run start\n"})}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsxs)(n.p,{children:["If you want to check compatiblity with a specific Jest version, you can use the ",(0,t.jsx)(n.code,{children:"JEST_VERSION"})," environment variable:"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"JEST_VERSION=27 npm run start\n"})}),"\n",(0,t.jsx)(n.p,{children:"To re-run the Allure CLI server, run:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npm run serve\n"})}),"\n",(0,t.jsx)(n.h3,{id:"checking-your-code",children:"Checking your code"}),"\n",(0,t.jsx)(n.p,{children:"Before committing, run the linter and tests:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npm run lint\nnpm test\n"})}),"\n",(0,t.jsxs)(n.p,{children:["To create a commit, use ",(0,t.jsx)(n.a,{href:"https://github.com/commitizen/cz-cli",children:"Commitizen"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npx cz\n"})}),"\n",(0,t.jsxs)(n.p,{children:["and follow the instructions. We adhere to Angular's ",(0,t.jsx)(n.a,{href:"https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit",children:"commit message guidelines"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"Thanks in advance for your contribution!"})]})}function u(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>o});var r=s(6540);const t={},i=r.createContext(t);function l(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);