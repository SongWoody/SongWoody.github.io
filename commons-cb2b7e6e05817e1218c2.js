"use strict";(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[351],{3204:function(e){const t=/[\p{Lu}]/u,a=/[\p{Ll}]/u,n=/^[\p{Lu}](?![\p{Lu}])/gu,r=/([\p{Alpha}\p{N}_]|$)/u,i=/[_.\- ]+/,s=new RegExp("^"+i.source),l=new RegExp(i.source+r.source,"gu"),o=new RegExp("\\d+"+r.source,"gu"),c=(e,r)=>{if("string"!=typeof e&&!Array.isArray(e))throw new TypeError("Expected the input to be `string | string[]`");if(r={pascalCase:!1,preserveConsecutiveUppercase:!1,...r},0===(e=Array.isArray(e)?e.map((e=>e.trim())).filter((e=>e.length)).join("-"):e.trim()).length)return"";const i=!1===r.locale?e=>e.toLowerCase():e=>e.toLocaleLowerCase(r.locale),c=!1===r.locale?e=>e.toUpperCase():e=>e.toLocaleUpperCase(r.locale);if(1===e.length)return r.pascalCase?c(e):i(e);return e!==i(e)&&(e=((e,n,r)=>{let i=!1,s=!1,l=!1;for(let o=0;o<e.length;o++){const c=e[o];i&&t.test(c)?(e=e.slice(0,o)+"-"+e.slice(o),i=!1,l=s,s=!0,o++):s&&l&&a.test(c)?(e=e.slice(0,o-1)+"-"+e.slice(o-1),l=s,s=!1,i=!0):(i=n(c)===c&&r(c)!==c,l=s,s=r(c)===c&&n(c)!==c)}return e})(e,i,c)),e=e.replace(s,""),e=r.preserveConsecutiveUppercase?((e,t)=>(n.lastIndex=0,e.replace(n,(e=>t(e)))))(e,i):i(e),r.pascalCase&&(e=c(e.charAt(0))+e.slice(1)),((e,t)=>(l.lastIndex=0,o.lastIndex=0,e.replace(l,((e,a)=>t(a))).replace(o,(e=>t(e)))))(e,c)};e.exports=c,e.exports.default=c},8032:function(e,t,a){a.d(t,{L:function(){return g},M:function(){return x},P:function(){return E},S:function(){return D},_:function(){return l},a:function(){return s},b:function(){return d},g:function(){return u},h:function(){return o}});var n=a(7294),r=(a(3204),a(5697)),i=a.n(r);function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},s.apply(this,arguments)}function l(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)t.indexOf(a=i[n])>=0||(r[a]=e[a]);return r}const o=()=>"undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;function c(e,t,a){const n={};let r="gatsby-image-wrapper";return"fixed"===a?(n.width=e,n.height=t):"constrained"===a&&(r="gatsby-image-wrapper gatsby-image-wrapper-constrained"),{className:r,"data-gatsby-image-wrapper":"",style:n}}function d(e,t,a,n,r){return void 0===r&&(r={}),s({},a,{loading:n,shouldLoad:e,"data-main-image":"",style:s({},r,{opacity:t?1:0})})}function u(e,t,a,n,r,i,l,o){const c={};i&&(c.backgroundColor=i,"fixed"===a?(c.width=n,c.height=r,c.backgroundColor=i,c.position="relative"):("constrained"===a||"fullWidth"===a)&&(c.position="absolute",c.top=0,c.left=0,c.bottom=0,c.right=0)),l&&(c.objectFit=l),o&&(c.objectPosition=o);const d=s({},e,{"aria-hidden":!0,"data-placeholder-image":"",style:s({opacity:t?0:1,transition:"opacity 500ms linear"},c)});return d}const p=["children"],m=function(e){let{layout:t,width:a,height:r}=e;return"fullWidth"===t?n.createElement("div",{"aria-hidden":!0,style:{paddingTop:r/a*100+"%"}}):"constrained"===t?n.createElement("div",{style:{maxWidth:a,display:"block"}},n.createElement("img",{alt:"",role:"presentation","aria-hidden":"true",src:"data:image/svg+xml;charset=utf-8,%3Csvg%20height='"+r+"'%20width='"+a+"'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E",style:{maxWidth:"100%",display:"block",position:"static"}})):null},g=function(e){let{children:t}=e,a=l(e,p);return n.createElement(n.Fragment,null,n.createElement(m,s({},a)),t,null)},h=["src","srcSet","loading","alt","shouldLoad"],f=["fallback","sources","shouldLoad"],y=function(e){let{src:t,srcSet:a,loading:r,alt:i="",shouldLoad:o}=e,c=l(e,h);return n.createElement("img",s({},c,{decoding:"async",loading:r,src:o?t:void 0,"data-src":o?void 0:t,srcSet:o?a:void 0,"data-srcset":o?void 0:a,alt:i}))},b=function(e){let{fallback:t,sources:a=[],shouldLoad:r=!0}=e,i=l(e,f);const o=i.sizes||(null==t?void 0:t.sizes),c=n.createElement(y,s({},i,t,{sizes:o,shouldLoad:r}));return a.length?n.createElement("picture",null,a.map((e=>{let{media:t,srcSet:a,type:i}=e;return n.createElement("source",{key:t+"-"+i+"-"+a,type:i,media:t,srcSet:r?a:void 0,"data-srcset":r?void 0:a,sizes:o})})),c):c};var w;y.propTypes={src:r.string.isRequired,alt:r.string.isRequired,sizes:r.string,srcSet:r.string,shouldLoad:r.bool},b.displayName="Picture",b.propTypes={alt:r.string.isRequired,shouldLoad:r.bool,fallback:r.exact({src:r.string.isRequired,srcSet:r.string,sizes:r.string}),sources:r.arrayOf(r.oneOfType([r.exact({media:r.string.isRequired,type:r.string,sizes:r.string,srcSet:r.string.isRequired}),r.exact({media:r.string,type:r.string.isRequired,sizes:r.string,srcSet:r.string.isRequired})]))};const v=["fallback"],E=function(e){let{fallback:t}=e,a=l(e,v);return t?n.createElement(b,s({},a,{fallback:{src:t},"aria-hidden":!0,alt:""})):n.createElement("div",s({},a))};E.displayName="Placeholder",E.propTypes={fallback:r.string,sources:null==(w=b.propTypes)?void 0:w.sources,alt:function(e,t,a){return e[t]?new Error("Invalid prop `"+t+"` supplied to `"+a+"`. Validation failed."):null}};const x=function(e){return n.createElement(n.Fragment,null,n.createElement(b,s({},e)),n.createElement("noscript",null,n.createElement(b,s({},e,{shouldLoad:!0}))))};x.displayName="MainImage",x.propTypes=b.propTypes;const k=["as","className","class","style","image","loading","imgClassName","imgStyle","backgroundColor","objectFit","objectPosition"],S=["style","className"],L=e=>e.replace(/\n/g,""),C=function(e,t,a){for(var n=arguments.length,r=new Array(n>3?n-3:0),s=3;s<n;s++)r[s-3]=arguments[s];return e.alt||""===e.alt?i().string.apply(i(),[e,t,a].concat(r)):new Error('The "alt" prop is required in '+a+'. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html')},_={image:i().object.isRequired,alt:C},N=["as","image","style","backgroundColor","className","class","onStartLoad","onLoad","onError"],T=["style","className"],I=new Set;let j,O;const R=function(e){let{as:t="div",image:r,style:i,backgroundColor:d,className:u,class:p,onStartLoad:m,onLoad:g,onError:h}=e,f=l(e,N);const{width:y,height:b,layout:w}=r,v=c(y,b,w),{style:E,className:x}=v,k=l(v,T),S=(0,n.useRef)(),L=(0,n.useMemo)((()=>JSON.stringify(r.images)),[r.images]);p&&(u=p);const C=function(e,t,a){let n="";return"fullWidth"===e&&(n='<div aria-hidden="true" style="padding-top: '+a/t*100+'%;"></div>'),"constrained"===e&&(n='<div style="max-width: '+t+'px; display: block;"><img alt="" role="presentation" aria-hidden="true" src="data:image/svg+xml;charset=utf-8,%3Csvg%20height=\''+a+"'%20width='"+t+"'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E\" style=\"max-width: 100%; display: block; position: static;\"></div>"),n}(w,y,b);return(0,n.useEffect)((()=>{j||(j=a.e(731).then(a.bind(a,6731)).then((e=>{let{renderImageToString:t,swapPlaceholderImage:a}=e;return O=t,{renderImageToString:t,swapPlaceholderImage:a}})));const e=S.current.querySelector("[data-gatsby-image-ssr]");if(e&&o())return e.complete?(null==m||m({wasCached:!0}),null==g||g({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)):(null==m||m({wasCached:!0}),e.addEventListener("load",(function t(){e.removeEventListener("load",t),null==g||g({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)}))),void I.add(L);if(O&&I.has(L))return;let t,n;return j.then((e=>{let{renderImageToString:a,swapPlaceholderImage:l}=e;S.current&&(S.current.innerHTML=a(s({isLoading:!0,isLoaded:I.has(L),image:r},f)),I.has(L)||(t=requestAnimationFrame((()=>{S.current&&(n=l(S.current,L,I,i,m,g,h))}))))})),()=>{t&&cancelAnimationFrame(t),n&&n()}}),[r]),(0,n.useLayoutEffect)((()=>{I.has(L)&&O&&(S.current.innerHTML=O(s({isLoading:I.has(L),isLoaded:I.has(L),image:r},f)),null==m||m({wasCached:!0}),null==g||g({wasCached:!0}))}),[r]),(0,n.createElement)(t,s({},k,{style:s({},E,i,{backgroundColor:d}),className:x+(u?" "+u:""),ref:S,dangerouslySetInnerHTML:{__html:C},suppressHydrationWarning:!0}))},q=(0,n.memo)((function(e){return e.image?(0,n.createElement)(R,e):null}));q.propTypes=_,q.displayName="GatsbyImage";const z=["src","__imageData","__error","width","height","aspectRatio","tracedSVGOptions","placeholder","formats","quality","transformOptions","jpgOptions","pngOptions","webpOptions","avifOptions","blurredOptions","breakpoints","outputPixelDensities"];function P(e){return function(t){let{src:a,__imageData:r,__error:i}=t,o=l(t,z);return i&&console.warn(i),r?n.createElement(e,s({image:r},o)):(console.warn("Image not loaded",a),null)}}const A=P((function(e){let{as:t="div",className:a,class:r,style:i,image:o,loading:p="lazy",imgClassName:m,imgStyle:h,backgroundColor:f,objectFit:y,objectPosition:b}=e,w=l(e,k);if(!o)return console.warn("[gatsby-plugin-image] Missing image prop"),null;r&&(a=r),h=s({objectFit:y,objectPosition:b,backgroundColor:f},h);const{width:v,height:C,layout:_,images:N,placeholder:T,backgroundColor:I}=o,j=c(v,C,_),{style:O,className:R}=j,q=l(j,S),z={fallback:void 0,sources:[]};return N.fallback&&(z.fallback=s({},N.fallback,{srcSet:N.fallback.srcSet?L(N.fallback.srcSet):void 0})),N.sources&&(z.sources=N.sources.map((e=>s({},e,{srcSet:L(e.srcSet)})))),n.createElement(t,s({},q,{style:s({},O,i,{backgroundColor:f}),className:R+(a?" "+a:"")}),n.createElement(g,{layout:_,width:v,height:C},n.createElement(E,s({},u(T,!1,_,v,C,I,y,b))),n.createElement(x,s({"data-gatsby-image-ssr":"",className:m},w,d("eager"===p,!1,z,p,h)))))})),M=function(e,t){for(var a=arguments.length,n=new Array(a>2?a-2:0),r=2;r<a;r++)n[r-2]=arguments[r];return"fullWidth"!==e.layout||"width"!==t&&"height"!==t||!e[t]?i().number.apply(i(),[e,t].concat(n)):new Error('"'+t+'" '+e[t]+" may not be passed when layout is fullWidth.")},W=new Set(["fixed","fullWidth","constrained"]),F={src:i().string.isRequired,alt:C,width:M,height:M,sizes:i().string,layout:e=>{if(void 0!==e.layout&&!W.has(e.layout))return new Error("Invalid value "+e.layout+'" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".')}};A.displayName="StaticImage",A.propTypes=F;const D=P(q);D.displayName="StaticImage",D.propTypes=F},7274:function(e,t,a){a.d(t,{Z:function(){return u}});var n=a(7294),r=a(1883);var i=()=>n.createElement("aside",{className:"sidebar"},n.createElement("h4",null,"Menu"),n.createElement("ul",null,n.createElement("li",null,"Spring Boot"),n.createElement("li",null,"Android"),n.createElement("li",null,"JavaScript"))),s=a(8032);const l={display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"8px 20px",backgroundColor:"#ffffff"},o={display:"flex",alignItems:"center",textDecoration:"none",color:"#333",fontSize:"18px",fontWeight:"bold",letterSpacing:"0.5px"},c={borderRadius:"10%",marginRight:"8px"};var d=e=>{let{title:t,rootPath:r}=e;return n.createElement("header",{style:l},n.createElement("a",{href:r,style:o},n.createElement(s.S,{style:c,layout:"fixed",formats:["auto","webp","avif"],src:"../images/nini_woody_15.png",width:38,height:25,quality:95,alt:"Logo picture",__imageData:a(5578)}),t))};var u=e=>{let{location:t,title:a,children:s}=e;const l="/"===t.pathname;let o;return console.log("title: "+a),o=l?n.createElement("h1",{className:"main-heading"},n.createElement(r.Link,{to:"/"},a)):n.createElement(r.Link,{className:"header-link-home",to:"/"},a),n.createElement("div",{className:"global-wrapper","data-is-root-path":l},n.createElement("div",{className:"layout-container"},n.createElement("div",{className:"inner-container"},n.createElement(d,{title:a,rootPath:"/"}),n.createElement("main",{className:"content"},s),n.createElement("footer",null,"© ",(new Date).getFullYear(),", Built with"," ",n.createElement("a",{href:"https://www.gatsbyjs.com"},"Gatsby"))),n.createElement(i,null)))}},9357:function(e,t,a){var n=a(7294),r=a(1883);t.Z=e=>{var t,a,i;let{description:s,title:l,children:o}=e;const{site:c}=(0,r.useStaticQuery)("2841359383"),d=s||c.siteMetadata.description,u=null===(t=c.siteMetadata)||void 0===t?void 0:t.title;return n.createElement(n.Fragment,null,n.createElement("title",null,u?l+" | "+u:l),n.createElement("meta",{name:"description",content:d}),n.createElement("meta",{property:"og:title",content:l}),n.createElement("meta",{property:"og:description",content:d}),n.createElement("meta",{property:"og:type",content:"website"}),n.createElement("meta",{name:"twitter:card",content:"summary"}),n.createElement("meta",{name:"twitter:creator",content:(null===(a=c.siteMetadata)||void 0===a||null===(i=a.social)||void 0===i?void 0:i.twitter)||""}),n.createElement("meta",{name:"twitter:title",content:l}),n.createElement("meta",{name:"twitter:description",content:d}),o)}},5578:function(e){e.exports=JSON.parse('{"layout":"fixed","backgroundColor":"#789838","images":{"fallback":{"src":"/static/3ce17fade5bc848a67c95eac158412b9/66674/nini_woody_15.png","srcSet":"/static/3ce17fade5bc848a67c95eac158412b9/66674/nini_woody_15.png 38w,\\n/static/3ce17fade5bc848a67c95eac158412b9/3e2d7/nini_woody_15.png 76w","sizes":"38px"},"sources":[{"srcSet":"/static/3ce17fade5bc848a67c95eac158412b9/3c18f/nini_woody_15.avif 38w,\\n/static/3ce17fade5bc848a67c95eac158412b9/d0a34/nini_woody_15.avif 76w","type":"image/avif","sizes":"38px"},{"srcSet":"/static/3ce17fade5bc848a67c95eac158412b9/f9190/nini_woody_15.webp 38w,\\n/static/3ce17fade5bc848a67c95eac158412b9/85b6c/nini_woody_15.webp 76w","type":"image/webp","sizes":"38px"}]},"width":38,"height":25}')}}]);
//# sourceMappingURL=commons-cb2b7e6e05817e1218c2.js.map