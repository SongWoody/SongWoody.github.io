"use strict";(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[351],{9662:function(t,e,n){var r=n(614),o=n(6330),a=TypeError;t.exports=function(t){if(r(t))return t;throw a(o(t)+" is not a function")}},1223:function(t,e,n){var r=n(5112),o=n(30),a=n(3070).f,c=r("unscopables"),i=Array.prototype;void 0===i[c]&&a(i,c,{configurable:!0,value:o(null)}),t.exports=function(t){i[c][t]=!0}},9670:function(t,e,n){var r=n(111),o=String,a=TypeError;t.exports=function(t){if(r(t))return t;throw a(o(t)+" is not an object")}},1318:function(t,e,n){var r=n(5656),o=n(1400),a=n(6244),c=function(t){return function(e,n,c){var i,u=r(e),l=a(u),s=o(c,l);if(t&&n!=n){for(;l>s;)if((i=u[s++])!=i)return!0}else for(;l>s;s++)if((t||s in u)&&u[s]===n)return t||s||0;return!t&&-1}};t.exports={includes:c(!0),indexOf:c(!1)}},4326:function(t,e,n){var r=n(1702),o=r({}.toString),a=r("".slice);t.exports=function(t){return a(o(t),8,-1)}},3072:function(t,e,n){var r=n(7854),o=Object.defineProperty;t.exports=function(t,e){try{o(r,t,{value:e,configurable:!0,writable:!0})}catch(n){r[t]=e}return e}},9781:function(t,e,n){var r=n(7293);t.exports=!r((function(){return 7!==Object.defineProperty({},1,{get:function(){return 7}})[1]}))},4154:function(t){var e="object"==typeof document&&document.all,n=void 0===e&&void 0!==e;t.exports={all:e,IS_HTMLDDA:n}},317:function(t,e,n){var r=n(7854),o=n(111),a=r.document,c=o(a)&&o(a.createElement);t.exports=function(t){return c?a.createElement(t):{}}},8113:function(t){t.exports="undefined"!=typeof navigator&&String(navigator.userAgent)||""},7392:function(t,e,n){var r,o,a=n(7854),c=n(8113),i=a.process,u=a.Deno,l=i&&i.versions||u&&u.version,s=l&&l.v8;s&&(o=(r=s.split("."))[0]>0&&r[0]<4?1:+(r[0]+r[1])),!o&&c&&(!(r=c.match(/Edge\/(\d+)/))||r[1]>=74)&&(r=c.match(/Chrome\/(\d+)/))&&(o=+r[1]),t.exports=o},748:function(t){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},7293:function(t){t.exports=function(t){try{return!!t()}catch(e){return!0}}},4374:function(t,e,n){var r=n(7293);t.exports=!r((function(){var t=function(){}.bind();return"function"!=typeof t||t.hasOwnProperty("prototype")}))},6916:function(t,e,n){var r=n(4374),o=Function.prototype.call;t.exports=r?o.bind(o):function(){return o.apply(o,arguments)}},1702:function(t,e,n){var r=n(4374),o=Function.prototype,a=o.call,c=r&&o.bind.bind(a,a);t.exports=r?c:function(t){return function(){return a.apply(t,arguments)}}},5005:function(t,e,n){var r=n(7854),o=n(614);t.exports=function(t,e){return arguments.length<2?(n=r[t],o(n)?n:void 0):r[t]&&r[t][e];var n}},8173:function(t,e,n){var r=n(9662),o=n(8554);t.exports=function(t,e){var n=t[e];return o(n)?void 0:r(n)}},7854:function(t,e,n){var r=function(t){return t&&t.Math===Math&&t};t.exports=r("object"==typeof globalThis&&globalThis)||r("object"==typeof window&&window)||r("object"==typeof self&&self)||r("object"==typeof n.g&&n.g)||function(){return this}()||this||Function("return this")()},2597:function(t,e,n){var r=n(1702),o=n(7908),a=r({}.hasOwnProperty);t.exports=Object.hasOwn||function(t,e){return a(o(t),e)}},3501:function(t){t.exports={}},490:function(t,e,n){var r=n(5005);t.exports=r("document","documentElement")},4664:function(t,e,n){var r=n(9781),o=n(7293),a=n(317);t.exports=!r&&!o((function(){return 7!==Object.defineProperty(a("div"),"a",{get:function(){return 7}}).a}))},8361:function(t,e,n){var r=n(1702),o=n(7293),a=n(4326),c=Object,i=r("".split);t.exports=o((function(){return!c("z").propertyIsEnumerable(0)}))?function(t){return"String"===a(t)?i(t,""):c(t)}:c},614:function(t,e,n){var r=n(4154),o=r.all;t.exports=r.IS_HTMLDDA?function(t){return"function"==typeof t||t===o}:function(t){return"function"==typeof t}},8554:function(t){t.exports=function(t){return null==t}},111:function(t,e,n){var r=n(614),o=n(4154),a=o.all;t.exports=o.IS_HTMLDDA?function(t){return"object"==typeof t?null!==t:r(t)||t===a}:function(t){return"object"==typeof t?null!==t:r(t)}},1913:function(t){t.exports=!1},2190:function(t,e,n){var r=n(5005),o=n(614),a=n(7976),c=n(3307),i=Object;t.exports=c?function(t){return"symbol"==typeof t}:function(t){var e=r("Symbol");return o(e)&&a(e.prototype,i(t))}},6244:function(t,e,n){var r=n(7466);t.exports=function(t){return r(t.length)}},4758:function(t){var e=Math.ceil,n=Math.floor;t.exports=Math.trunc||function(t){var r=+t;return(r>0?n:e)(r)}},30:function(t,e,n){var r,o=n(9670),a=n(6048),c=n(748),i=n(3501),u=n(490),l=n(317),s=n(6200),f="prototype",p="script",m=s("IE_PROTO"),v=function(){},d=function(t){return"<"+p+">"+t+"</"+p+">"},y=function(t){t.write(d("")),t.close();var e=t.parentWindow.Object;return t=null,e},g=function(){try{r=new ActiveXObject("htmlfile")}catch(a){}var t,e,n;g="undefined"!=typeof document?document.domain&&r?y(r):(e=l("iframe"),n="java"+p+":",e.style.display="none",u.appendChild(e),e.src=String(n),(t=e.contentWindow.document).open(),t.write(d("document.F=Object")),t.close(),t.F):y(r);for(var o=c.length;o--;)delete g[f][c[o]];return g()};i[m]=!0,t.exports=Object.create||function(t,e){var n;return null!==t?(v[f]=o(t),n=new v,v[f]=null,n[m]=t):n=g(),void 0===e?n:a.f(n,e)}},6048:function(t,e,n){var r=n(9781),o=n(3353),a=n(3070),c=n(9670),i=n(5656),u=n(1956);e.f=r&&!o?Object.defineProperties:function(t,e){c(t);for(var n,r=i(e),o=u(e),l=o.length,s=0;l>s;)a.f(t,n=o[s++],r[n]);return t}},3070:function(t,e,n){var r=n(9781),o=n(4664),a=n(3353),c=n(9670),i=n(4948),u=TypeError,l=Object.defineProperty,s=Object.getOwnPropertyDescriptor,f="enumerable",p="configurable",m="writable";e.f=r?a?function(t,e,n){if(c(t),e=i(e),c(n),"function"==typeof t&&"prototype"===e&&"value"in n&&m in n&&!n[m]){var r=s(t,e);r&&r[m]&&(t[e]=n.value,n={configurable:p in n?n[p]:r[p],enumerable:f in n?n[f]:r[f],writable:!1})}return l(t,e,n)}:l:function(t,e,n){if(c(t),e=i(e),c(n),o)try{return l(t,e,n)}catch(r){}if("get"in n||"set"in n)throw u("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},7976:function(t,e,n){var r=n(1702);t.exports=r({}.isPrototypeOf)},6324:function(t,e,n){var r=n(1702),o=n(2597),a=n(5656),c=n(1318).indexOf,i=n(3501),u=r([].push);t.exports=function(t,e){var n,r=a(t),l=0,s=[];for(n in r)!o(i,n)&&o(r,n)&&u(s,n);for(;e.length>l;)o(r,n=e[l++])&&(~c(s,n)||u(s,n));return s}},1956:function(t,e,n){var r=n(6324),o=n(748);t.exports=Object.keys||function(t){return r(t,o)}},2140:function(t,e,n){var r=n(6916),o=n(614),a=n(111),c=TypeError;t.exports=function(t,e){var n,i;if("string"===e&&o(n=t.toString)&&!a(i=r(n,t)))return i;if(o(n=t.valueOf)&&!a(i=r(n,t)))return i;if("string"!==e&&o(n=t.toString)&&!a(i=r(n,t)))return i;throw c("Can't convert object to primitive value")}},4488:function(t,e,n){var r=n(8554),o=TypeError;t.exports=function(t){if(r(t))throw o("Can't call method on "+t);return t}},6200:function(t,e,n){var r=n(2309),o=n(9711),a=r("keys");t.exports=function(t){return a[t]||(a[t]=o(t))}},5465:function(t,e,n){var r=n(7854),o=n(3072),a="__core-js_shared__",c=r[a]||o(a,{});t.exports=c},2309:function(t,e,n){var r=n(1913),o=n(5465);(t.exports=function(t,e){return o[t]||(o[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.32.1",mode:r?"pure":"global",copyright:"© 2014-2023 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.32.1/LICENSE",source:"https://github.com/zloirock/core-js"})},6293:function(t,e,n){var r=n(7392),o=n(7293),a=n(7854).String;t.exports=!!Object.getOwnPropertySymbols&&!o((function(){var t=Symbol("symbol detection");return!a(t)||!(Object(t)instanceof Symbol)||!Symbol.sham&&r&&r<41}))},1400:function(t,e,n){var r=n(9303),o=Math.max,a=Math.min;t.exports=function(t,e){var n=r(t);return n<0?o(n+e,0):a(n,e)}},5656:function(t,e,n){var r=n(8361),o=n(4488);t.exports=function(t){return r(o(t))}},9303:function(t,e,n){var r=n(4758);t.exports=function(t){var e=+t;return e!=e||0===e?0:r(e)}},7466:function(t,e,n){var r=n(9303),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},7908:function(t,e,n){var r=n(4488),o=Object;t.exports=function(t){return o(r(t))}},7593:function(t,e,n){var r=n(6916),o=n(111),a=n(2190),c=n(8173),i=n(2140),u=n(5112),l=TypeError,s=u("toPrimitive");t.exports=function(t,e){if(!o(t)||a(t))return t;var n,u=c(t,s);if(u){if(void 0===e&&(e="default"),n=r(u,t,e),!o(n)||a(n))return n;throw l("Can't convert object to primitive value")}return void 0===e&&(e="number"),i(t,e)}},4948:function(t,e,n){var r=n(7593),o=n(2190);t.exports=function(t){var e=r(t,"string");return o(e)?e:e+""}},6330:function(t){var e=String;t.exports=function(t){try{return e(t)}catch(n){return"Object"}}},9711:function(t,e,n){var r=n(1702),o=0,a=Math.random(),c=r(1..toString);t.exports=function(t){return"Symbol("+(void 0===t?"":t)+")_"+c(++o+a,36)}},3307:function(t,e,n){var r=n(6293);t.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},3353:function(t,e,n){var r=n(9781),o=n(7293);t.exports=r&&o((function(){return 42!==Object.defineProperty((function(){}),"prototype",{value:42,writable:!1}).prototype}))},5112:function(t,e,n){var r=n(7854),o=n(2309),a=n(2597),c=n(9711),i=n(6293),u=n(3307),l=r.Symbol,s=o("wks"),f=u?l.for||l:l&&l.withoutSetter||c;t.exports=function(t){return a(s,t)||(s[t]=i&&a(l,t)?l[t]:f("Symbol."+t)),s[t]}},9244:function(t,e,n){n(1223)("flatMap")},3842:function(t,e,n){n.d(e,{Z:function(){return p}});var r=n(7294),o=n(1883);var a=t=>{let{title:e,rootPath:n}=t;return r.createElement("div",{className:"header-wrapper"},r.createElement(o.Link,{to:n,className:"header-link"},e))},c=n(5785),i=(n(9244),n(821));const u=t=>{let{category:e,posts:n,level:a=0}=t;const{0:c,1:i}=(0,r.useState)(!1),l=Object.keys(e.children).length>0,s=n.length>0,f=l||s;return a>=3&&l?r.createElement(r.Fragment,null,r.createElement("div",{className:"category-header"},r.createElement("span",{className:"category-name"},e.name),s&&r.createElement("span",{className:"post-count"},"(",n.length,")")),r.createElement("div",{className:"category-content"},Object.values(e.children).map((t=>r.createElement(u,{key:t.name,category:t,posts:t.posts,level:a}))),s&&r.createElement("div",{className:"posts"},n.map((t=>r.createElement(o.Link,{key:t.fields.slug,to:t.fields.slug,className:"post-link"},t.frontmatter.title)))))):r.createElement("div",{className:"category-node"},r.createElement("button",{className:"category-header",onClick:()=>i(!c),onKeyDown:t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),i(!c))}},f&&r.createElement("span",{className:"arrow "+(c?"open":"")},"▶"),r.createElement("span",{className:"category-name"},e.name),s&&r.createElement("span",{className:"post-count"},"(",n.length,")")),c&&r.createElement("div",{className:"category-content"},l&&r.createElement("div",{className:"subcategories"},Object.values(e.children).map((t=>r.createElement(u,{key:t.name,category:t,posts:t.posts,level:a+1})))),s&&r.createElement("div",{className:"posts"},n.map((t=>r.createElement(o.Link,{key:t.fields.slug,to:t.fields.slug,className:"post-link"},t.frontmatter.title))))))};var l=t=>{let{data:e}=t;const n=e.allMarkdownRemark.nodes,o={};return n.forEach((t=>{if(t.frontmatter.categories){let e=o;t.frontmatter.categories.forEach(((n,r)=>{e[n]||(e[n]={name:n,children:{},posts:[]}),r===t.frontmatter.categories.length-1&&e[n].posts.push(t),e=e[n].children}))}})),r.createElement("div",{className:"category-tree"},r.createElement("h4",null,"Categories"),Object.values(o).map((t=>r.createElement(u,{key:t.name,category:t,posts:t.posts}))))};const s=t=>{let{tags:e}=t;return r.createElement("div",{className:"tag-list"},r.createElement("h4",null,"Tags"),r.createElement("div",{className:"tags"},e.map(((t,e)=>r.createElement(o.Link,{key:e,to:"/tags/"+t,className:"tag"},"#",t)))))};var f=()=>{const{isMenuOpen:t,toggleMenu:e}=(0,i.A)();return r.createElement(o.StaticQuery,{query:"2046863741",render:n=>{const o=n.allMarkdownRemark.nodes,a=(0,c.Z)(new Set(o.flatMap((t=>t.frontmatter.tags||[])))).sort();return r.createElement("aside",{className:"sidebar "+(t?"open":"")},r.createElement("button",{className:"close-button",onClick:e,"aria-label":"Close Menu"},r.createElement("span",{className:"close-icon"})),r.createElement("nav",{className:"sidebar-content"},r.createElement(l,{data:n}),r.createElement(s,{tags:a})))}})};var p=t=>{let{location:e,title:n,children:o}=t;const c="/"===e.pathname;return r.createElement(i.H,null,r.createElement("div",{className:"global-wrapper","data-is-root-path":c},r.createElement(a,{title:n,rootPath:"/"}),r.createElement("div",{className:"layout-container"},r.createElement("div",{className:"inner-container"},r.createElement("main",{className:"content"},o),r.createElement("footer",null,r.createElement("a",{href:"https://github.com/SongWoody",target:"_blank",rel:"noopener noreferrer"},"GitHub"))),r.createElement(f,null))))}},9357:function(t,e,n){var r=n(7294),o=n(1883);e.Z=t=>{var e,n,a;let{description:c,title:i,children:u}=t;const{site:l}=(0,o.useStaticQuery)("2841359383"),s=c||l.siteMetadata.description,f=null===(e=l.siteMetadata)||void 0===e?void 0:e.title;return r.createElement(r.Fragment,null,r.createElement("title",null,f?i+" | "+f:i),r.createElement("meta",{name:"description",content:s}),r.createElement("meta",{property:"og:title",content:i}),r.createElement("meta",{property:"og:description",content:s}),r.createElement("meta",{property:"og:type",content:"website"}),r.createElement("meta",{name:"twitter:card",content:"summary"}),r.createElement("meta",{name:"twitter:creator",content:(null===(n=l.siteMetadata)||void 0===n||null===(a=n.social)||void 0===a?void 0:a.twitter)||""}),r.createElement("meta",{name:"twitter:title",content:i}),r.createElement("meta",{name:"twitter:description",content:s}),u)}}}]);
//# sourceMappingURL=commons-8bfc6e9965f4c9365360.js.map