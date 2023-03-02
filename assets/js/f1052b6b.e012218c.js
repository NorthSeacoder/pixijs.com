"use strict";(self.webpackChunkpixi_docusaurus=self.webpackChunkpixi_docusaurus||[]).push([[1998],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>k});var r=a(67294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},s=Object.keys(e);for(r=0;r<s.length;r++)a=s[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)a=s[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var i=r.createContext({}),d=function(e){var t=r.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},p=function(e){var t=d(e.components);return r.createElement(i.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,s=e.originalType,i=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),u=d(a),m=n,k=u["".concat(i,".").concat(m)]||u[m]||c[m]||s;return a?r.createElement(k,l(l({ref:t},p),{},{components:a})):r.createElement(k,l({ref:t},p))}));function k(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var s=a.length,l=new Array(s);l[0]=m;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o[u]="string"==typeof e?e:n,l[1]=o;for(var d=2;d<s;d++)l[d]=a[d];return r.createElement.apply(null,l)}return r.createElement.apply(null,a)}m.displayName="MDXCreateElement"},17970:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>u,frontMatter:()=>s,metadata:()=>o,toc:()=>d});var r=a(87462),n=(a(67294),a(3905));const s={id:"PIXI.LoaderParser.pixi_assets",title:"Interface: PIXI.LoaderParser",sidebar_label:"PIXI.LoaderParser",custom_edit_url:null},l=void 0,o={unversionedId:"api/interfaces/PIXI.LoaderParser.pixi_assets",id:"api/interfaces/PIXI.LoaderParser.pixi_assets",title:"Interface: PIXI.LoaderParser",description:"@pixi/assets.LoaderParser",source:"@site/docs/api/interfaces/PIXI.LoaderParser.pixi_assets.mdx",sourceDirName:"api/interfaces",slug:"/api/interfaces/PIXI.LoaderParser.pixi_assets",permalink:"/api/interfaces/PIXI.LoaderParser.pixi_assets",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"PIXI.LoaderParser.pixi_assets",title:"Interface: PIXI.LoaderParser",sidebar_label:"PIXI.LoaderParser",custom_edit_url:null},sidebar:"apiSidebar",previous:{title:"PIXI.LoadTextureConfig",permalink:"/api/interfaces/PIXI.LoadTextureConfig.pixi_assets"},next:{title:"PIXI.PreferOrder",permalink:"/api/interfaces/PIXI.PreferOrder.pixi_assets"}},i={},d=[{value:"Summary",id:"summary",level:2},{value:"Members",id:"members",level:2},{value:"config",id:"config",level:3},{value:"load",id:"load",level:3},{value:"name",id:"name",level:3},{value:"parse",id:"parse",level:3},{value:"test",id:"test",level:3},{value:"testParse",id:"testparse",level:3},{value:"unload",id:"unload",level:3}],p={toc:d};function u(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("div",{class:"package-name"},(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"../modules/pixi_assets"},"@pixi/assets"),".LoaderParser")),(0,n.kt)("p",null,"All functions are optional here. The flow",":","\nfor every asset,"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("inlineCode",{parentName:"li"},"parser.test()"),":"," Test the asset url."),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("inlineCode",{parentName:"li"},"parser.load()"),":"," If test passes call the load function with the url"),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("inlineCode",{parentName:"li"},"parser.testParse()"),":"," Test to see if the asset should be parsed by the plugin"),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("inlineCode",{parentName:"li"},"parse.parse()"),":"," If test is parsed, then run the parse function on the asset.")),(0,n.kt)("p",null,"some plugins may only be used for parsing, some only for loading and some for both!"),(0,n.kt)("h2",{id:"summary"},"Summary"),(0,n.kt)("details",null,(0,n.kt)("summary",null,"Properties"),(0,n.kt)("p",null,(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Name"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"config"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"CONFIG")),(0,n.kt)("td",{parentName:"tr",align:null},"A config to adjust the parser")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"load"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"(url",":"," string, loadAsset",":"," LoadAsset","<","META_DATA",">",", loader",":"," Loader) =",">"," Promise","<","T",">")),(0,n.kt)("td",{parentName:"tr",align:null},"This is the promise that loads the URL provided resolves with a loaded asset if returned by the parser.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"name"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"string")),(0,n.kt)("td",{parentName:"tr",align:null},"The name of the parser (this can be used when specifying loadParser in a LoadAsset)")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"parse"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"(asset",":"," ASSET, loadAsset",":"," LoadAsset","<","META_DATA",">",", loader",":"," Loader) =",">"," Promise","<","T",">")),(0,n.kt)("td",{parentName:"tr",align:null},"Gets called on the asset it testParse passes. Useful to convert a raw asset into something more useful than")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"test"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"(url",":"," string, loadAsset",":"," LoadAsset","<","META_DATA",">",", loader",":"," Loader) =",">"," boolean")),(0,n.kt)("td",{parentName:"tr",align:null},"each URL to load will be tested here, if the test is passed the assets are loaded using the load function below. Good place to test for things like file extensions!")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"testParse"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"(asset",":"," ASSET, loadAsset",":"," LoadAsset","<","META_DATA",">",", loader",":"," Loader) =",">"," Promise","<","boolean",">")),(0,n.kt)("td",{parentName:"tr",align:null},"This function is used to test if the parse function should be run on the asset If this returns true then parse is called with the asset")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"unload"),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("code",null,"(asset",":"," ASSET, loadAsset",":"," LoadAsset","<","META_DATA",">",", loader",":"," Loader) =",">"," void")),(0,n.kt)("td",{parentName:"tr",align:null},"If an asset is parsed using this parser, the unload function will be called when the user requests an asset to be unloaded. This is useful for things like sounds or textures that can be unloaded from memory")))))),(0,n.kt)("h2",{id:"members"},"Members"),(0,n.kt)("article",null,(0,n.kt)("h3",{id:"config"},"config"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Type:")," ",(0,n.kt)("code",null,"CONFIG")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Description:")," A config to adjust the parser")),(0,n.kt)("hr",null),(0,n.kt)("article",null,(0,n.kt)("h3",{id:"load"},"load"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Type:")," ",(0,n.kt)("code",null,"(url",":"," string, loadAsset",":"," LoadAsset","<","META_DATA",">",", loader",":"," Loader) =",">"," Promise","<","T",">")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Description:")," This is the promise that loads the URL provided resolves with a loaded asset if returned by the parser.")),(0,n.kt)("hr",null),(0,n.kt)("article",null,(0,n.kt)("h3",{id:"name"},"name"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Type:")," ",(0,n.kt)("code",null,"string")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Description:")," The name of the parser (this can be used when specifying loadParser in a LoadAsset)")),(0,n.kt)("hr",null),(0,n.kt)("article",null,(0,n.kt)("h3",{id:"parse"},"parse"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Type:")," ",(0,n.kt)("code",null,"(asset",":"," ASSET, loadAsset",":"," LoadAsset","<","META_DATA",">",", loader",":"," Loader) =",">"," Promise","<","T",">")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Description:")," Gets called on the asset it testParse passes. Useful to convert a raw asset into something more useful than")),(0,n.kt)("hr",null),(0,n.kt)("article",null,(0,n.kt)("h3",{id:"test"},"test"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Type:")," ",(0,n.kt)("code",null,"(url",":"," string, loadAsset",":"," LoadAsset","<","META_DATA",">",", loader",":"," Loader) =",">"," boolean")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Description:")," each URL to load will be tested here, if the test is passed the assets are loaded using the load function below. Good place to test for things like file extensions!")),(0,n.kt)("hr",null),(0,n.kt)("article",null,(0,n.kt)("h3",{id:"testparse"},"testParse"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Type:")," ",(0,n.kt)("code",null,"(asset",":"," ASSET, loadAsset",":"," LoadAsset","<","META_DATA",">",", loader",":"," Loader) =",">"," Promise","<","boolean",">")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Description:")," This function is used to test if the parse function should be run on the asset If this returns true then parse is called with the asset")),(0,n.kt)("hr",null),(0,n.kt)("article",null,(0,n.kt)("h3",{id:"unload"},"unload"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Type:")," ",(0,n.kt)("code",null,"(asset",":"," ASSET, loadAsset",":"," LoadAsset","<","META_DATA",">",", loader",":"," Loader) =",">"," void")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Description:")," If an asset is parsed using this parser, the unload function will be called when the user requests an asset to be unloaded. This is useful for things like sounds or textures that can be unloaded from memory")),(0,n.kt)("hr",null))}u.isMDXComponent=!0}}]);