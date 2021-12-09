(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5301:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(4352)}])},1314:function(e,n,r){"use strict";r.d(n,{rm:function(){return m}});var t=r(5893),i=r(7948),o=r(9008),u=r(1664),s=r(2293),l=r(3321),c=r(9226),a=r(155),d=r(5861);function f(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function h(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{},t=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),t.forEach((function(n){f(e,n,r[n])}))}return e}function x(e,n){if(null==e)return{};var r,t,i=function(e,n){if(null==e)return{};var r,t,i={},o=Object.keys(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||(i[r]=e[r]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var j=function(e){var n=e.href,r=e.children,i=x(e,["href","children"]);return(0,t.jsx)(u.default,{href:n,passHref:!0,children:(0,t.jsx)(l.Z,h({sx:{color:"white"},color:"error"},i,{children:r}))})},p=function(){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.default,{children:(0,t.jsx)("title",{children:"ABR Brush Viewer"})}),(0,t.jsx)(s.Z,{position:"sticky",children:(0,t.jsxs)(a.Z,{children:[(0,t.jsx)(d.Z,{variant:"h6",color:"inherit",component:"div",children:(0,t.jsx)(u.default,{href:"/",children:"ABR Brush Viewer"})}),(0,t.jsx)(c.Z,{flexGrow:1}),(0,t.jsx)(j,{href:"/docs",children:"Documentation"}),(0,t.jsx)(j,{href:"https://www.github.com/jlai/brush-viewer",children:"Github"})]})})]})},v=function(e){var n=e.children,r=e.padding;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(p,{}),(0,t.jsx)("main",{style:{padding:r},children:n})]})},m=function(e){var n=e.children;return(0,t.jsx)(v,{children:(0,t.jsx)(i.Z,{children:n})})}},4352:function(e,n,r){"use strict";r.r(n),r.d(n,{default:function(){return ge}});var t,i,o=r(5893),u=r(214),s=r.n(u),l=r(7294),c=r(5292),a=r(6743),d=r(9365),f=r(2166),h=r(3321),x=r(5861),j=r(6901),p=r(5157),v=r(1458),m=r(6298),b=r.n(m),g=function(e){var n=e.errorText;return(0,o.jsxs)(x.Z,{variant:"subtitle1",children:["Error: ",n]})},y=function(e){var n=e.fileInfo;return(0,o.jsxs)(x.Z,{variant:"subtitle1",sx:{mt:"16px"},children:[n.decodedBrushes," / ",n.totalBrushes]})},Z=function(){var e=(0,p.o)((function(e){return e.fileInfo})),n=0;return e&&e.totalBrushes&&(n=100*(e.decodedBrushes||0)/e.totalBrushes),(0,o.jsxs)("div",{className:b().loadingStatus,children:[(0,o.jsx)(v.Z,{variant:"determinate",value:n}),(null===e||void 0===e?void 0:e.totalBrushes)&&(0,o.jsx)(y,{fileInfo:e}),(null===e||void 0===e?void 0:e.errorText)&&(0,o.jsx)(g,{errorText:e.errorText})]})};(i=t||(t={})).Parsing="PARSING",i.Decoding="DECODING",i.Done="DONE",i.Error="ERROR";var w=r(3246),_=r.n(w);function O(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function P(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{},t=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),t.forEach((function(n){O(e,n,r[n])}))}return e}function k(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var r=[],t=!0,i=!1,o=void 0;try{for(var u,s=e[Symbol.iterator]();!(t=(u=s.next()).done)&&(r.push(u.value),!n||r.length!==n);t=!0);}catch(l){i=!0,o=l}finally{try{t||null==s.return||s.return()}finally{if(i)throw o}}return r}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var C=function(e){var n=e.show,r=e.fileLoadError,t=(0,l.useRef)(null);return(0,o.jsx)(a.Z,{in:n,timeout:200,nodeRef:t,classNames:P({},_()),children:(0,o.jsx)("div",{ref:t,className:"".concat(_().cover),children:(0,o.jsxs)("div",{className:_().loadingArea,children:[r&&(0,o.jsx)(I,{fileLoadError:r}),!r&&(0,o.jsx)(Z,{})]})})})},I=function(e){var n=e.fileLoadError,r=(0,p.o)((function(e){return e.setActiveFile})),t=(0,l.useCallback)((function(){r(null)}),[r]);return(0,o.jsx)(j.Z,{severity:"error",sx:{width:"100%"},onClose:t,children:n.message})},N=function(){var e=(0,p.o)((function(e){return e.setActiveFile})),n=(0,p.o)((function(e){return e.setFileLoadError})),r=(0,p.o)((function(e){return e.fileInfo})),i=(0,p.o)((function(e){return e.fileLoadError})),u=k((0,d.L)((function(){return{accept:[f.FILE],collect:function(e){return{highlighted:e.canDrop()}},drop:function(r){var t=r.files;1===(null===t||void 0===t?void 0:t.length)?e(t[0]):n({message:"Maximum one file at a time"})}}})),2),s=u[0].highlighted,a=u[1],j=k((0,c.s)({accept:".abr",multiple:!1,readFilesContent:!1}),2),v=j[0],m=j[1].plainFiles;(0,l.useEffect)((function(){m.length>0&&e(m[0])}),[m,e]);var b=i||r&&r.state!==t.Done;return(0,o.jsxs)("div",{className:"".concat(_().dropArea," ").concat(s?_().highlighted:""),ref:a,children:[(0,o.jsx)(x.Z,{variant:"h6",children:"Drag .abr file here, or"}),(0,o.jsx)(h.Z,{variant:"outlined",onClick:function(){return v()},children:"Open file"}),(0,o.jsx)(x.Z,{variant:"body1",children:"Contents are stored in memory and will not be uploaded to any server."}),(0,o.jsx)(C,{show:!!b,fileLoadError:i})]})},E=r(5675),S=r(2902),B=r(6886),F=r(5113),A=r(2883),D=r.n(A),L=function(e){return e.src},T=function(e){var n=e.brush,r=(0,p.o)((function(e){return e.getImageFileName(n.brushNum)})),t=null===r||void 0===r?void 0:r.replace(/^.*\//g,""),i=(0,l.useCallback)((function(e){return e.preventDefault(),!1}),[]);return(0,o.jsx)("a",{href:n.url,download:t,onClick:i,children:(0,o.jsx)(E.default,{src:n.url,width:150,height:150,unoptimized:!0,loader:L,alt:"Brush ".concat(n.brushNum),objectFit:"scale-down",objectPosition:"center center"})})},R=function(e){var n=e.brush,r=(0,o.jsxs)("div",{className:D().tooltip,children:[(0,o.jsxs)("div",{children:["Brush ",n.brushNum]}),(0,o.jsxs)("div",{children:[n.width," x ",n.height]})]});return(0,o.jsx)(S.Z,{title:r,children:(0,o.jsx)(F.Z,{elevation:6,sx:{width:200,height:200,backgroundColor:"black"},children:(0,o.jsx)(B.ZP,{container:!0,alignItems:"center",justifyContent:"center",sx:{width:"100%",height:"100%"},children:(0,o.jsx)(T,{brush:n})})})})},z=function(){var e=(0,p.o)((function(e){return e.brushes}))||[];return(0,o.jsx)(B.ZP,{container:!0,alignItems:"center",justifyContent:"center",gap:"8px",rowGap:"48px",sx:{mt:"64px",mb:"64px"},children:e.map((function(e){return(0,o.jsx)(B.ZP,{item:!0,xs:3,children:(0,o.jsx)(R,{brush:e})},e.url)}))})},G=r(1314),V=r(8520),W=r.n(V),X=r(6242),H=r(4267),K=r(2023),U=r(8445),Y=r(3946),J=r(4229),M=r(3441),q=r(7986),Q=r(7922),$=r(7031),ee=r(7109),ne=r(594),re=r(8245),te=r(657),ie=r(1425),oe=r(6580),ue=r(8951),se=r(7645),le=r(8377),ce=r(9350);function ae(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function de(e,n){if(null==e)return{};var r,t,i=function(e,n){if(null==e)return{};var r,t,i={},o=Object.keys(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||(i[r]=e[r]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var fe=function(e){var n=e.onClose;return(0,o.jsx)(se.Z,{children:(0,o.jsxs)(B.ZP,{container:!0,direction:"row",alignItems:"center",children:[(0,o.jsx)(B.ZP,{item:!0,flexGrow:1,children:"Settings"}),(0,o.jsx)(Y.Z,{onClick:n,children:(0,o.jsx)(ne.Z,{})})]})})},he=function(e){var n=e.options,r=e.onInputChange,t=e.inputValue,i=de(e,["options","onInputChange","inputValue"]);return(0,o.jsx)(re.Z,{freeSolo:!0,autoComplete:!1,filterOptions:function(e){return e},options:n,onInputChange:r,inputValue:t,renderInput:function(e){return(0,o.jsx)($.Z,function(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{},t=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),t.forEach((function(n){ae(e,n,r[n])}))}return e}({},e,i))}})},xe=["%f/%f - %n","%f/%n - %f","Brush %0n"],je=function(e){var n=e.open,r=e.onClose,t=(0,p.o)((function(e){return e.defaultImageNamePattern})),i=(0,p.o)((function(e){return e.imageNamePattern})),u=(0,p.o)((function(e){return e.setImageNamePattern})),s=(0,l.useState)(i),c=s[0],a=s[1],d=(0,ce._)(c),f=d.ok,j=(0,l.useCallback)((function(){u(c),null===r||void 0===r||r()}),[c,u,r]),v=(0,l.useCallback)((function(){a(t)}),[a,t]),m=(0,l.useCallback)((function(e,n){a(n)}),[a]);return(0,o.jsxs)(te.Z,{open:n,onClose:r,maxWidth:"md",fullWidth:!0,children:[(0,o.jsx)(fe,{onClose:r}),(0,o.jsx)(oe.Z,{children:(0,o.jsxs)(le.Z,{sx:{p:"16px"},children:[(0,o.jsxs)(le.Z,{sx:{mb:"16px"},children:[(0,o.jsx)(x.Z,{variant:"h6",children:"Set the pattern used to name image files"}),(0,o.jsxs)(ue.Z,{children:[(0,o.jsx)("code",{children:"%f"})," - brush set name"]}),(0,o.jsxs)(ue.Z,{children:[(0,o.jsx)("code",{children:"%n"})," - brush number (automatic leading zeroes)"]}),(0,o.jsxs)(ue.Z,{children:[(0,o.jsx)("code",{children:"%0n"})," - brush number (no leading zeroes)"]}),(0,o.jsxs)(ue.Z,{children:[(0,o.jsx)("code",{children:"%3n"})," - brush number (zero-padded to 3 digits)"]}),(0,o.jsxs)(ue.Z,{children:[(0,o.jsx)("code",{children:"/"})," - folder separator"]})]}),(0,o.jsx)(he,{options:xe,label:"Image Name Pattern",inputValue:c,onInputChange:m,error:!d.ok,helperText:d.message||"Pattern without file extension"})]})}),(0,o.jsxs)(ie.Z,{children:[(0,o.jsx)(h.Z,{onClick:v,children:"Load Defaults"}),(0,o.jsx)(h.Z,{variant:"contained",onClick:j,disabled:!f,children:"Save"})]})]})};function pe(e,n,r,t,i,o,u){try{var s=e[o](u),l=s.value}catch(c){return void r(c)}s.done?n(l):Promise.resolve(l).then(t,i)}var ve=function(){var e=(0,p.o)((function(e){return e.getImageFileName(1)})),n=(0,l.useState)(!1),r=n[0],t=n[1],i=(0,l.useCallback)((function(){return t(!0)}),[t]),u=(0,l.useCallback)((function(){return t(!1)}),[t]);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)($.Z,{fullWidth:!0,variant:"filled",value:e,label:"Images inside zip will be named like",InputProps:{readOnly:!0,endAdornment:(0,o.jsx)(ee.Z,{position:"end",children:(0,o.jsx)(h.Z,{onClick:i,children:"Configure"})})}}),(0,o.jsx)(je,{open:r,onClose:u})]})},me=function(){var e=(0,p.o)((function(e){return e.exportName})),n=(0,p.o)((function(e){return e.setExportName}));return(0,o.jsx)($.Z,{fullWidth:!0,label:"Brush Set Name",helperText:"Name used for zip file (excluding .zip)",value:e||"",onChange:function(e){return n(e.target.value)}})},be=function(){var e=(0,l.useState)(!1),n=e[0],r=e[1],t=(0,p.o)((function(e){return e.fileInfo})),i=(0,p.o)((function(e){return e.exportToZip})),u=(0,p.o)((function(e){return e.showingExportSettings})),s=(0,p.o)((function(e){return e.setShowingExportSettings})),c=(0,l.useCallback)((function(){var e;(e=W().mark((function e(){return W().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r(!0),e.next=3,i();case 3:r(!1);case 4:case"end":return e.stop()}}),e)})),function(){var n=this,r=arguments;return new Promise((function(t,i){var o=e.apply(n,r);function u(e){pe(o,t,i,u,s,"next",e)}function s(e){pe(o,t,i,u,s,"throw",e)}u(void 0)}))})()}),[i]);return(0,o.jsxs)(X.Z,{children:[(0,o.jsx)(U.Z,{title:null===t||void 0===t?void 0:t.fileName,action:(0,o.jsx)(Y.Z,{"aria-label":"settings",onClick:function(){return s(!u)},children:(0,o.jsx)(J.Z,{})})}),(0,o.jsx)(Q.Z,{in:u,timeout:"auto",children:(0,o.jsx)(H.Z,{children:(0,o.jsxs)(B.ZP,{container:!0,gap:"24px",children:[(0,o.jsx)(me,{}),(0,o.jsx)(ve,{})]})})}),(0,o.jsx)(K.Z,{children:(0,o.jsxs)(h.Z,{variant:"contained",onClick:c,endIcon:n?(0,o.jsx)(q.Z,{}):(0,o.jsx)(M.Z,{}),children:["Export ",null===t||void 0===t?void 0:t.totalBrushes," Images As Zip"]})})]})},ge=function(){var e=(0,p.o)((function(e){return e.brushes}));return(0,o.jsx)("div",{className:s().container,children:(0,o.jsxs)(G.rm,{children:[(0,o.jsx)(N,{}),e&&(0,o.jsx)(be,{}),e&&(0,o.jsx)(z,{})]})})}},3246:function(e){e.exports={dropArea:"BrushFilePicker_dropArea__m_tKX",highlighted:"BrushFilePicker_highlighted__HCCB7",cover:"BrushFilePicker_cover__dUZ_D",enter:"BrushFilePicker_enter__mJfY1",enterActive:"BrushFilePicker_enterActive__tDfxT",enterDone:"BrushFilePicker_enterDone__toXCy",exit:"BrushFilePicker_exit__uPNy2",exitActive:"BrushFilePicker_exitActive__cyUnv",loadingArea:"BrushFilePicker_loadingArea__pjsKZ"}},2883:function(e){e.exports={tooltip:"BrushSetImages_tooltip__W2L1R"}},214:function(e){e.exports={container:"Home_container__bCOhY"}},6298:function(e){e.exports={loadingStatus:"LoadingStatus_loadingStatus__I8se2"}}},function(e){e.O(0,[623,760,774,888,179],(function(){return n=5301,e(e.s=n);var n}));var n=e.O();_N_E=n}]);