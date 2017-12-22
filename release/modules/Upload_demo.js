define(["react","react-dom"],function(e,t){return function(e){function t(o){if(n[o])return n[o].exports;var a=n[o]={exports:{},id:o,loaded:!1};return e[o].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}({0:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=n(1),c=o(u);n(345);var f=n(347),s=o(f),d=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.componentDidMount=function(){},n.state={},n}return i(t,e),l(t,[{key:"render",value:function(){return c.default.createElement("div",{className:"Upload_demo"},c.default.createElement(s.default,null))}}]),t}(c.default.Component);t.default=d},1:function(t,n){t.exports=e},109:function(e,n){e.exports=t},345:function(e,t){},347:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=n(1),c=o(u),f=n(109);o(f);n(348);var s=n(350),d=o(s);(0,d.default)();var p=function(e){function t(){var e,n,o,i;a(this,t);for(var l=arguments.length,u=Array(l),c=0;c<l;c++)u[c]=arguments[c];return n=o=r(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),o.fileData=[],o.fileDataUp=[],o.fileindex=0,o.state={mediaCount:0,loading:!1},o.mediaCheck=function(e){console.log(e)},o.currentPosition=function(e){console.log(e.target),o.readAsDataURL(e.target)},o.clearImage=function(){o.fileData=[],o.fileDataUp=[],o.setState({mediaCount:0});for(var e=document.getElementsByClassName("close"),t=e.length,n=0;n<t;n++)e[0].click()},o.readAsDataURL=function(e){for(var t=o,n=0;n<e.files.length;n++){o.fileindex++;var a={id:o.fileindex,file:e.files[n]};o.fileData.push(a);var r=new FileReader;r.readAsDataURL(e.files[n]),r.dataobj=a,r.onload=function(e){var n=t.refs.fileContent,o=t.refs.fileadd,a=document.createElement("div"),r=document.createElement("label");r.innerHTML="X",r.attributes.fileid=e.currentTarget.dataobj.id,r.className="close",r.addEventListener("click",function(e){var o=t.fileData.findIndex(function(t){return t.id==e.target.attributes.fileid}),a=t.fileData.slice(0,o),r=t.fileData.slice(o+1,t.fileData.length),i=a.concat(r);return t.fileData=i,t.setState({mediaCount:t.fileData.length}),n.removeChild(e.target.parentNode),t.props.changeFile(t.fileData),!1});var i=document.createElement("img"),l=this.result.substring(this.result.indexOf(":")+1,this.result.indexOf("/"));"video"===l?i.src="./assets/M_ImageSelectUp/video.png":"audio"===l?i.src="./assets/M_ImageSelectUp/audio.png":"image"===l?i.src=this.result:i.src="./assets/M_ImageSelectUp/file.png",i.className="showImge",i.style.width="100%",i.style.height="100%",a.appendChild(r),a.appendChild(i),n.insertBefore(a,o)}}o.props.changeFile(o.fileData),o.setState({mediaCount:o.fileData.length})},o.sendImgs=function(){var e=o.fileData,t=new FormData;t.append("DataType","UploadFile"),t.append("UploadFolder","/CommonReport/"),t.append("IsConvertOffice",""),t.append("GetFileName","y"),t.append("TCID",""),t.append("UploadTargetKey","n"),t.append("GetFileInfo","y");for(var n=0;n<e.length;n++)o.fileDataUp.push(e[n].file),t.append("file",e[n].file)},i=n,r(o,i)}return i(t,e),l(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this,t=this.state.mediaCount;return c.default.createElement("div",{className:"default M_ImageSelectUp"},c.default.createElement("div",{className:"divcls",style:{width:"auto",textAlign:"left"}},"附件列表：(共",t,"个)"),c.default.createElement("div",{className:"unload",ref:"fileContent"},c.default.createElement("div",{ref:"fileadd",className:"add"},"+",c.default.createElement("form",{ref:"uploadform"},c.default.createElement("input",{ref:"fileinput",type:"file",multiple:!0,onChange:function(t){return e.currentPosition(t)},name:"media"})))))}}]),t}(c.default.Component);t.default=p},348:function(e,t){},350:function(e,t,n){"use strict";!function(){var t=function(e){return function(){var t=e.createElement,n=8,o=1e3,a=["clientX","clientY","pageX","pageY","screenX","screenY","radiusX","radiusY"],r={downPos:{},lastPos:{}},i=function(e){if(!e)return!1;var t=e.getAttribute("disabled");return t!==!1&&null!==t},l=function(e,t){var n=t||e.currentTarget;n&&!i(n)&&n.focus()},u={input:function(e){l(e),e.stopPropagation()},textarea:function(e){l(e),e.stopPropagation()},select:function(e){l(e),e.stopPropagation()},label:function(e){var t,n=e.currentTarget.getAttribute("for");t=n?document.getElementById(n):e.currentTarget.querySelectorAll("input, textarea, select")[0],t&&l(e,t)}},c=function(e){"function"==typeof e.persist&&e.persist(),e.fastclick=!0,e.type="click",e.button=0},f=function(e,t){if("function"==typeof t.persist&&t.persist(),e)for(var n=0;n<a.length;n+=1){var o=a[n];t[o]=e[o]}},s=function(){return!r.touched&&(!r.lastTouchDate||(new Date).getTime()>r.lastTouchDate+o)},d=function(e){r.invalid=e.touches&&e.touches.length>1||r.invalid},p=function(e,t){var n=!s();n&&t.target!==r.target&&t.preventDefault(),"function"!=typeof e||n||e(t),"click"===t.type&&(r.invalid=!1,r.touched=!1,r.moved=!1)},m=function(e,t){r.invalid=!1,r.moved=!1,r.touched=!0,r.target=t.target,r.lastTouchDate=(new Date).getTime(),f(t.touches[0],r.downPos),f(t.touches[0],r.lastPos),d(t),"function"==typeof e&&e(t)},h=function(e,t){r.touched=!0,r.lastTouchDate=(new Date).getTime(),f(t.touches[0],r.lastPos),d(t),(Math.abs(r.downPos.clientX-r.lastPos.clientX)>n||Math.abs(r.downPos.clientY-r.lastPos.clientY)>n)&&(r.moved=!0),"function"==typeof e&&e(t)},v=function(e,t,n,o){if(r.touched=!0,r.lastTouchDate=(new Date).getTime(),d(o),"function"==typeof e&&e(o),!r.invalid&&!r.moved){var a=o.currentTarget.getBoundingClientRect();r.lastPos.clientX-(r.lastPos.radiusX||0)<=a.right&&r.lastPos.clientX+(r.lastPos.radiusX||0)>=a.left&&r.lastPos.clientY-(r.lastPos.radiusY||0)<=a.bottom&&r.lastPos.clientY+(r.lastPos.radiusY||0)>=a.top&&(i(o.currentTarget)||("function"==typeof t&&(f(r.lastPos,o),c(o),t(o)),!o.defaultPrevented&&u[n]&&u[n](o)))}},g=function(e,t){var n={};for(var o in t)n[o]=t[o];return n.onClick=p.bind(null,t.onClick),n.onMouseDown=p.bind(null,t.onMouseDown),n.onMouseMove=p.bind(null,t.onMouseMove),n.onMouseUp=p.bind(null,t.onMouseUp),n.onTouchStart=m.bind(null,t.onTouchStart),n.onTouchMove=h.bind(null,t.onTouchMove),n.onTouchEnd=v.bind(null,t.onTouchEnd,t.onClick,e),"function"==typeof Object.freeze&&Object.freeze(n),n};if(e.createElement=function(){var e=Array.prototype.slice.call(arguments),n=e[0],o=e[1];return n&&"string"==typeof n&&(o&&"function"==typeof o.onClick||u[n])&&(e[1]=g(n,o||{})),t.apply(null,e)},"object"==typeof e.DOM)for(var y in e.DOM)e.DOM[y]=e.createElement.bind(null,y)}},o=n(1);e.exports=t(o)}()}})});