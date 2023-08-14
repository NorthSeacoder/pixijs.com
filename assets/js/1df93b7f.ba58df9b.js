"use strict";(self.webpackChunkpixi_docusaurus=self.webpackChunkpixi_docusaurus||[]).push([[3237],{5327:(e,t,i)=>{i.r(t),i.d(t,{default:()=>Z});var n=i(2263),s=i(902),a=i(6010);const r="heroBackground_QArt",o="heroBanner_pQnV",l="heroLogo_EYQj";var d=i(9960);const c="button_sPMG",h="buttonShadow_o7NZ",p="outline_NKzY",u="white_flyO";var g=i(5893);function m(e){let t=c;return e.white&&(t+=` ${u}`),e.outline&&(t+=` ${p}`),e.anim&&(t+=` ${e.anim}`),(0,g.jsxs)(d.Z,{className:t,to:e.link,style:e?.style||{},children:[(0,g.jsx)("div",{className:h,children:(0,g.jsx)("div",{})}),(0,g.jsx)("span",{children:e.label}),(0,g.jsxs)("svg",{className:"next",version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 23 14",xmlSpace:"preserve",children:[(0,g.jsx)("line",{x1:"22",y1:"7",x2:"16",y2:"1"}),(0,g.jsx)("line",{x1:"22",y1:"7",x2:"16",y2:"13"}),(0,g.jsx)("line",{x1:"0",y1:"7",x2:"23",y2:"7"})]})]})}function x(){return(0,g.jsxs)("header",{className:(0,a.Z)("hero hero--dark",o),children:[(0,g.jsx)("iframe",{className:r,src:"/header/index.html"}),(0,g.jsxs)("div",{className:"container",children:[(0,g.jsx)("img",{className:l,src:"/images/logo.svg",alt:""}),(0,g.jsx)("h1",{className:"hero__subtitle",children:"The HTML5 Creation Engine"}),(0,g.jsx)("h4",{className:"hero__subsubtitle",children:"Create beautiful digital content with the fastest, most flexible 2D WebGL renderer."}),(0,g.jsxs)("div",{className:"buttonRow",children:[(0,g.jsx)(m,{label:"Download",link:"https://github.com/pixijs/pixijs/releases"}),"\xa0",(0,g.jsx)(m,{label:"Get Started",link:"/tutorial",white:!0,outline:!0})]})]})]})}const f="testimonialsSection_PtYd",v="carouselText_jMN2",b="carouselWrapper_fl0O",y="carousel_ikfF",w="carouselItem_GpMR";function j(){const e=["adobe","20th_century_fox","barclays","bbc","bose","cartoon_network","disney","google","hbo","hm","lego","lucasfilm","marvel","mcdonalds","orange","pbs","rayban","redbull","spotify","steam","tedx","toyota","ubisoft","volkswagen","youtube"];return(0,g.jsxs)("div",{className:`${f} padding-vert--lg`,children:[(0,g.jsx)("p",{className:v,children:"A mature solution for hundreds of global brands"}),(0,g.jsx)("div",{style:{"--carousel-amount":e.length},className:b,children:(0,g.jsx)("div",{className:`col col--12 ${y}`,children:[...e,...e].map(((e,t)=>(0,g.jsx)("div",{className:w,children:(0,g.jsx)("img",{src:`/images/brand-logos/${e}.png`})},t)))})})]})}const N="highlights_dgss",k="devices_MMUi",_=JSON.parse('[{"heading":"Fast","description":"PixiJS\' strength is speed. When it comes to 2D rendering, PixiJS is the fastest there is."},{"heading":"Flexible","description":"Friendly, feature-rich API lets PixiJS take care of the fundamentals whilst you focus on producing incredible multiplatform experiences."},{"heading":"Free","description":"PixiJS is and always will be Open Source, with a large and supportive community pushing its growth and evolution."}]'),S=JSON.parse('{"U":"/images/devices/device-background.png","H":[{"img":"/images/devices/device-desktop.png","alt":"Desktop","styles":{"left":"50%","width":"386px","top":0,"zIndex":1,"marginLeft":"-193px","dataDelay":0,"transform":"translateY(200vh)"},"canvas":{"left":"19px","top":"28px","width":"348px","height":"198px"}},{"img":"/images/devices/device-ipad.png","alt":"iPad","styles":{"left":"60.79%","width":"155px","top":"138px","zIndex":2,"dataDelay":0.15,"transform":"translateY(200vh)"},"canvas":{"left":"17px","top":"16px","width":"124px","height":"164px"}},{"img":"/images/devices/device-iphone.png","alt":"iPhone","styles":{"left":"75.35%","width":"92px","top":"177px","zIndex":3,"dataDelay":0.45,"transform":"translateY(200vh)"},"canvas":{"left":"10px","top":"18px","width":"72px","height":"126px"}},{"img":"/images/devices/device-phone.png","alt":"Phone","styles":{"width":"170px","right":0,"bottom":0,"zIndex":4,"dataDelay":0.75,"transform":"translateY(200vh)"},"canvas":{"left":"20px","top":"9px","width":"132px","height":"80px"}},{"img":"/images/devices/device-laptop.png","alt":"Laptop","styles":{"left":"6.16%","width":"355px","top":"127px","zIndex":2,"dataDelay":0.3,"transform":"translateY(200vh)"},"canvas":{"left":"46px","top":"16px","width":"264px","height":"166px"}},{"img":"/images/devices/device-tablet.png","alt":"Tablet","styles":{"left":0,"width":"195px","bottom":0,"zIndex":4,"dataDelay":0.6,"transform":"translateY(200vh)"},"canvas":{"left":"17px","top":"15px","width":"160px","height":"95px"}}]}');var V=i(7294);const C=new Map,D=new WeakMap;let P,I=0;function $(e){return Object.keys(e).sort().filter((t=>void 0!==e[t])).map((t=>{return`${t}_${"root"===t?(i=e.root,i?(D.has(i)||(I+=1,D.set(i,I.toString())),D.get(i)):"0"):e[t]}`;var i})).toString()}function M(e,t,i={},n=P){if(void 0===window.IntersectionObserver&&void 0!==n){const s=e.getBoundingClientRect();return t(n,{isIntersecting:n,target:e,intersectionRatio:"number"==typeof i.threshold?i.threshold:0,time:0,boundingClientRect:s,intersectionRect:s,rootBounds:s}),()=>{}}const{id:s,observer:a,elements:r}=function(e){let t=$(e),i=C.get(t);if(!i){const n=new Map;let s;const a=new IntersectionObserver((t=>{t.forEach((t=>{var i;const a=t.isIntersecting&&s.some((e=>t.intersectionRatio>=e));e.trackVisibility&&void 0===t.isVisible&&(t.isVisible=a),null==(i=n.get(t.target))||i.forEach((e=>{e(a,t)}))}))}),e);s=a.thresholds||(Array.isArray(e.threshold)?e.threshold:[e.threshold||0]),i={id:t,observer:a,elements:n},C.set(t,i)}return i}(i);let o=r.get(e)||[];return r.has(e)||r.set(e,o),o.push(t),a.observe(e),function(){o.splice(o.indexOf(t),1),0===o.length&&(r.delete(e),a.unobserve(e)),0===r.size&&(a.disconnect(),C.delete(s))}}class O extends V.Component{constructor(e){super(e),this.node=null,this._unobserveCb=null,this.handleNode=e=>{this.node&&(this.unobserve(),e||this.props.triggerOnce||this.props.skip||this.setState({inView:!!this.props.initialInView,entry:void 0})),this.node=e||null,this.observeNode()},this.handleChange=(e,t)=>{e&&this.props.triggerOnce&&this.unobserve(),isPlainChildren(this.props)||this.setState({inView:e,entry:t}),this.props.onChange&&this.props.onChange(e,t)},this.state={inView:!!e.initialInView,entry:void 0}}componentDidUpdate(e){e.rootMargin===this.props.rootMargin&&e.root===this.props.root&&e.threshold===this.props.threshold&&e.skip===this.props.skip&&e.trackVisibility===this.props.trackVisibility&&e.delay===this.props.delay||(this.unobserve(),this.observeNode())}componentWillUnmount(){this.unobserve(),this.node=null}observeNode(){if(!this.node||this.props.skip)return;const{threshold:e,root:t,rootMargin:i,trackVisibility:n,delay:s,fallbackInView:a}=this.props;this._unobserveCb=M(this.node,this.handleChange,{threshold:e,root:t,rootMargin:i,trackVisibility:n,delay:s},a)}unobserve(){this._unobserveCb&&(this._unobserveCb(),this._unobserveCb=null)}render(){if(!isPlainChildren(this.props)){const{inView:e,entry:t}=this.state;return this.props.children({inView:e,entry:t,ref:this.handleNode})}const e=this.props,{children:t,as:i}=e,n=function(e,t){if(null==e)return{};var i,n,s={},a=Object.keys(e);for(0;n<a.length;n++)a[n],t.indexOf(i)>=0||(s[i]=e[i]);return s}(e,null);return React.createElement(i||"div",_extends({ref:this.handleNode},n),t)}}function A({threshold:e,delay:t,trackVisibility:i,rootMargin:n,root:s,triggerOnce:a,skip:r,initialInView:o,fallbackInView:l,onChange:d}={}){var c;const[h,p]=V.useState(null),u=V.useRef(),[g,m]=V.useState({inView:!!o,entry:void 0});u.current=d,V.useEffect((()=>{if(r||!h)return;let o;return o=M(h,((e,t)=>{m({inView:e,entry:t}),u.current&&u.current(e,t),t.isIntersecting&&a&&o&&(o(),o=void 0)}),{root:s,rootMargin:n,threshold:e,trackVisibility:i,delay:t},l),()=>{o&&o()}}),[Array.isArray(e)?e.toString():e,h,s,n,a,r,i,l,t]);const x=null==(c=g.entry)?void 0:c.target,f=V.useRef();h||!x||a||r||f.current===x||(f.current=x,m({inView:!!o,entry:void 0}));const v=[p,g.inView,g.entry];return v.ref=v[0],v.inView=v[1],v.entry=v[2],v}const T=()=>{const{ref:e,inView:t}=A({triggerOnce:!0});return(0,g.jsx)("div",{ref:e,className:"container flex",children:_.map(((e,i)=>t?(0,g.jsxs)("div",{className:"col col--4 padding-vert--md offering-anim",style:{transform:"translateX(100vw)",animationDelay:`${Number(.15*i)}s`},children:[(0,g.jsx)("span",{children:`0${i+1}`}),(0,g.jsx)("h2",{className:"underline",children:e.heading}),(0,g.jsx)("p",{children:e.description})]},i):null))})},J=()=>{const{ref:e,inView:t}=A({triggerOnce:!0});return(0,g.jsx)("div",{ref:e,className:k,children:S.H.map(((e,i)=>{const n=e.styles.dataDelay;return t?(0,g.jsxs)("div",{className:"device-anim",style:{...e.styles,position:"absolute",animationDelay:`${n}s`},children:[(0,g.jsx)("img",{src:e.img,alt:e.alt}),(0,g.jsx)("canvas",{style:{position:"absolute",background:`#ecedf1 url(${S.U}) center center`,border:"1px solid #b1b8c4",...e.canvas}})]},i):null}))})};function L(){return(0,g.jsxs)("div",{className:`padding-vert--lg ${N} features`,style:{clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)"},children:[(0,g.jsx)(T,{}),(0,g.jsx)(J,{})]})}const R="wrapper_BtuJ",G="title_xi1R",E="features_wn1h",W="feature_N9w0",F=JSON.parse('[{"icon":"/images/features/feature-multiplatform.png","heading":"Multi-platform Support","description":"Interactive, visually compelling content on desktop, mobile and beyond, all reached with a single codebase to deliver transferable experiences.","data-anim":"feature-r-in"},{"icon":"/images/features/feature-type.png","heading":"Advanced Text Rendering","description":"Beautiful anti-aliased text at native and retina resolutions means that Pixi copy is as easy on the eye as it is on any other delivery method.","data-anim":"feature-l-in"},{"icon":"/images/features/feature-tinting-blending.png","heading":"Tinting & Blending Modes","description":"Designers and clients will be thrilled by Photoshop quality blending and colour modes.","data-anim":"feature-r-in"},{"icon":"/images/features/feature-scenegraph.png","heading":"Full Scene Graph","description":"Organise your objects in hierarchical trees, with parent-child relationships.","data-anim":"feature-l-in"},{"icon":"/images/features/feature-sprite-sheet.png","heading":"Sprite Sheet Support","description":"PixiJS caters for a range of sprite sheet formats and includes advanced support for features like trimming and rotational packing.","data-anim":"feature-r-in"},{"icon":"/images/features/feature-canvas.png","heading":"Renderer Auto-detect","description":"Certain, older platforms may not be able to use WebGL. Not a problem with PixiJS as Canvas fallback is seamless and automated.","data-anim":"feature-l-in"},{"icon":"/images/features/feature-asset-loader.png","heading":"Asset Loader","description":"Sprite-sheets, graphics, fonts, animation data (soon to have Adobe Animate support). All your incoming assets can be loaded and handled by PixiJS.","data-anim":"feature-r-in"},{"icon":"/images/features/feature-apps.png","heading":"Deploy into Apps","description":"Use technologies such as Cordova to rapidly deploy your Pixi project as an App. Superb for both concepting and full delivery.","data-anim":"feature-l-in"},{"icon":"/images/features/feature-api.png","heading":"Easy API","description":"Designed to be intuitive and easy to pick up. Developers old and new will find themselves right at home with its simple yet powerful API.","data-anim":"feature-r-in"},{"icon":"/images/features/feature-accessibility.png","heading":"Accessibility","description":"PixiJS is an inclusive technology and all content can be made to be screen reader accessible with ease. The only WebGL renderer out there that does.","data-anim":"feature-l-in"},{"icon":"/images/features/feature-filters.png","heading":"WebGL Filters","description":"Use and create your own spectacular WebGL filters and shaders to give your projects next-level visual fidelity and performance.","data-anim":"feature-r-in"},{"icon":"/images/features/feature-multitouch.png","heading":"Multi-touch Interactivity","description":"True multi-touch input and tracking means that you can create interactions such as pinch-to-scale that give audiences native feeling experiences.","data-anim":"feature-l-in"}]');function U(){const[e,t]=A({triggerOnce:!0}),[i,n]=A({triggerOnce:!0});return(0,g.jsxs)("div",{className:`${R} padding--md padding-vert--xl`,children:[(0,g.jsx)("div",{ref:i,className:"col col--12 margin-bottom--lg",children:n&&(0,g.jsx)("h2",{className:`${G} underline short-up-anim`,style:{opacity:0,animationDuration:"0.3s",animationDelay:"0.5s"},children:"PixiJS Features"})}),(0,g.jsx)("div",{ref:e,className:`row ${E}`,children:F.map(((e,i)=>{if(!t)return null;const n=i%2,s=Math.floor(i/2),a=F.length/2;let r=.5;return 0===n?r+=.15*s:r=.15*(s+a),(0,g.jsxs)("div",{className:`${W} col col--6 ${e["data-anim"]}-anim`,style:{opacity:0,transform:"translateX(300px)",animationDelay:`${r}s`},children:[(0,g.jsx)("img",{src:e.icon}),(0,g.jsxs)("div",{children:[(0,g.jsx)("h6",{children:e.heading}),(0,g.jsx)("p",{children:e.description})]})]},i)}))})]})}const Y="closing_TUKb",z=(e,t)=>({opacity:0,animationDuration:`${e}s`,animationDelay:`${t}s`});function B(){const[e,t]=A({triggerOnce:!0});return(0,g.jsx)("div",{className:`${Y} padding-vert--xl`,children:(0,g.jsx)("div",{ref:e,children:t&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("h3",{className:"short-up-anim",style:z(.3,.25),children:"Elevate your Traditional HTML5 Techniques"}),(0,g.jsx)("h5",{className:"short-up-anim",style:z(.3,.4),children:"Unbeatable performance, intuitive API, globally used and battle\xadtested."}),(0,g.jsxs)("div",{className:"buttonRow",children:[(0,g.jsx)(m,{anim:"short-up-anim",style:z(.3,.55),label:"Download",link:"https://github.com/pixijs/pixijs/releases"}),"\xa0",(0,g.jsx)(m,{anim:"short-up-anim",style:z(.3,.7),label:"Get Started",link:"/tutorial",outline:!0})]})]})})})}function H(){const{siteConfig:e}=(0,n.Z)();return(0,g.jsx)(s.Z,{title:`${e.title} | The HTML5 Creation Engine`,description:"PixiJS - The HTML5 Creation Engine. Create beautiful digital content with the fastest, most flexible 2D WebGL renderer.",children:(0,g.jsx)("main",{children:(0,g.jsxs)("div",{className:"text--center",children:[(0,g.jsx)(x,{}),(0,g.jsx)(j,{}),(0,g.jsx)(L,{}),(0,g.jsx)(U,{}),(0,g.jsx)(B,{})]})})})}function Z(){return(0,g.jsx)(H,{})}}}]);