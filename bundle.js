!function(t){var n={};function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)e.d(o,r,function(n){return t[n]}.bind(null,r));return o},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=5)}([function(t,n,e){var o=e(1);"string"==typeof o&&(o=[[t.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};e(3)(o,r);o.locals&&(t.exports=o.locals)},function(t,n,e){(t.exports=e(2)(!1)).push([t.i,"* {\n  box-sizing: border-box;\n}\n\nbody {\n  box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  font-family: Arial;\n  background: #f5f5f5;\n}\n\n.container {\n  box-sizing: border-box;\n  margin: auto;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  max-width: 75%;\n}\n.sidebar {\n  flex-grow: 1;\n}\n.content {\n  flex-grow: 9999;\n}\n.sidebar, .content {\n  box-sizing: border-box;\n  vertical-align: top;\n  background: #ddd;\n  border: 1px solid #888;\n  border-radius: 5px;\n  padding: .7rem;\n  margin: 5px;\n}\n\n.sidebar {\n  width: 30%;  \n}\n\n.todos {\n  width: 95%;\n  display: flex;\n  flex-direction: column;\n  margin: auto;\n}\n\n.project {\n  width: 75%;\n  margin: auto;\n  margin-bottom: .5rem;\n  border: .5px solid black;\n  border-radius: 5px;\n  padding: .6rem;\n  font-size: 1.4rem;\n  background: rgba(0,0,0,.1);\n}\n.project:hover {\n  background: rgba(0,0,0,.15);\n}\n\n.todo {\n  margin-bottom: 5px;\n  padding-left: 25px;\n  border-top-left-radius: 10px;\n  border-top-right-radius: 10px;\n  border-bottom: 1px solid gray;\n}\n\n.todo:hover {\n  background: rgba(0,0,0,.05);  \n}\n\n.new-todo {\n  border-bottom: 1px dotted #aaa;\n\n}\n.new-todo input {\n  width: 95%;\n  margin: auto;\n  margin-bottom: 1rem;\n  border: 1px solid black;\n  border-radius: 5px;\n  display: block;\n  padding: .6rem;\n  font-size: 1.7rem;\n}\n\n.btn-new {\n  display: block;\n  border: none;\n  border-radius: 5px;\n  background: none;\n  color: #333;\n  font-weight: bold;\n  margin: auto;\n  padding: .7rem;\n  cursor: pointer;\n}\n.btn-new:hover {\n  text-decoration: underline;\n  color: #000;\n}",""])},function(t,n,e){"use strict";t.exports=function(t){var n=[];return n.toString=function(){return this.map(function(n){var e=function(t,n){var e=t[1]||"",o=t[3];if(!o)return e;if(n&&"function"==typeof btoa){var r=(s=o,a=btoa(unescape(encodeURIComponent(JSON.stringify(s)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),"/*# ".concat(c," */")),i=o.sources.map(function(t){return"/*# sourceURL=".concat(o.sourceRoot).concat(t," */")});return[e].concat(i).concat([r]).join("\n")}var s,a,c;return[e].join("\n")}(n,t);return n[2]?"@media ".concat(n[2],"{").concat(e,"}"):e}).join("")},n.i=function(t,e){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];null!=i&&(o[i]=!0)}for(var s=0;s<t.length;s++){var a=t[s];null!=a[0]&&o[a[0]]||(e&&!a[2]?a[2]=e:e&&(a[2]="(".concat(a[2],") and (").concat(e,")")),n.push(a))}},n}},function(t,n,e){var o,r,i={},s=(o=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===r&&(r=o.apply(this,arguments)),r}),a=function(t){var n={};return function(t,e){if("function"==typeof t)return t();if(void 0===n[t]){var o=function(t,n){return n?n.querySelector(t):document.querySelector(t)}.call(this,t,e);if(window.HTMLIFrameElement&&o instanceof window.HTMLIFrameElement)try{o=o.contentDocument.head}catch(t){o=null}n[t]=o}return n[t]}}(),c=null,d=0,l=[],u=e(4);function f(t,n){for(var e=0;e<t.length;e++){var o=t[e],r=i[o.id];if(r){r.refs++;for(var s=0;s<r.parts.length;s++)r.parts[s](o.parts[s]);for(;s<o.parts.length;s++)r.parts.push(g(o.parts[s],n))}else{var a=[];for(s=0;s<o.parts.length;s++)a.push(g(o.parts[s],n));i[o.id]={id:o.id,refs:1,parts:a}}}}function p(t,n){for(var e=[],o={},r=0;r<t.length;r++){var i=t[r],s=n.base?i[0]+n.base:i[0],a={css:i[1],media:i[2],sourceMap:i[3]};o[s]?o[s].parts.push(a):e.push(o[s]={id:s,parts:[a]})}return e}function h(t,n){var e=a(t.insertInto);if(!e)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=l[l.length-1];if("top"===t.insertAt)o?o.nextSibling?e.insertBefore(n,o.nextSibling):e.appendChild(n):e.insertBefore(n,e.firstChild),l.push(n);else if("bottom"===t.insertAt)e.appendChild(n);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r=a(t.insertAt.before,e);e.insertBefore(n,r)}}function b(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var n=l.indexOf(t);n>=0&&l.splice(n,1)}function m(t){var n=document.createElement("style");if(void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0===t.attrs.nonce){var o=function(){0;return e.nc}();o&&(t.attrs.nonce=o)}return v(n,t.attrs),h(t,n),n}function v(t,n){Object.keys(n).forEach(function(e){t.setAttribute(e,n[e])})}function g(t,n){var e,o,r,i;if(n.transform&&t.css){if(!(i="function"==typeof n.transform?n.transform(t.css):n.transform.default(t.css)))return function(){};t.css=i}if(n.singleton){var s=d++;e=c||(c=m(n)),o=w.bind(null,e,s,!1),r=w.bind(null,e,s,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(e=function(t){var n=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",v(n,t.attrs),h(t,n),n}(n),o=function(t,n,e){var o=e.css,r=e.sourceMap,i=void 0===n.convertToAbsoluteUrls&&r;(n.convertToAbsoluteUrls||i)&&(o=u(o));r&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var s=new Blob([o],{type:"text/css"}),a=t.href;t.href=URL.createObjectURL(s),a&&URL.revokeObjectURL(a)}.bind(null,e,n),r=function(){b(e),e.href&&URL.revokeObjectURL(e.href)}):(e=m(n),o=function(t,n){var e=n.css,o=n.media;o&&t.setAttribute("media",o);if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}.bind(null,e),r=function(){b(e)});return o(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;o(t=n)}else r()}}t.exports=function(t,n){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(n=n||{}).attrs="object"==typeof n.attrs?n.attrs:{},n.singleton||"boolean"==typeof n.singleton||(n.singleton=s()),n.insertInto||(n.insertInto="head"),n.insertAt||(n.insertAt="bottom");var e=p(t,n);return f(e,n),function(t){for(var o=[],r=0;r<e.length;r++){var s=e[r];(a=i[s.id]).refs--,o.push(a)}t&&f(p(t,n),n);for(r=0;r<o.length;r++){var a;if(0===(a=o[r]).refs){for(var c=0;c<a.parts.length;c++)a.parts[c]();delete i[a.id]}}}};var y,x=(y=[],function(t,n){return y[t]=n,y.filter(Boolean).join("\n")});function w(t,n,e,o){var r=e?"":o.css;if(t.styleSheet)t.styleSheet.cssText=x(n,r);else{var i=document.createTextNode(r),s=t.childNodes;s[n]&&t.removeChild(s[n]),s.length?t.insertBefore(i,s[n]):t.appendChild(i)}}},function(t,n){t.exports=function(t){var n="undefined"!=typeof window&&window.location;if(!n)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var e=n.protocol+"//"+n.host,o=e+n.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,n){var r,i=n.trim().replace(/^"(.*)"$/,function(t,n){return n}).replace(/^'(.*)'$/,function(t,n){return n});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?t:(r=0===i.indexOf("//")?i:0===i.indexOf("/")?e+i:o+i.replace(/^\.\//,""),"url("+JSON.stringify(r)+")")})}},function(t,n,e){"use strict";e.r(n);e(0);var o=class{constructor(t,n,e,o){this.title=t,this.description=n,this.dueDate=e,this.priority=o}appendTo(t,n=null){const e=document.createElement("div");e.classList.add("todo"),e.innerHTML=`\n    <h1>${this.title}</h1>\n    <p>${this.description}</p>\n    <p>Due: ${this.dueDate}</p>\n    <p>Priority: ${this.priority}</p>\n    `,n&&e.addEventListener("click",()=>n(this)),t.appendChild(e)}};var r=class{constructor(t="New Project"){this.title=t,this.todos=[],this.todoCount=0}appendTo(t,n=null){const e=document.createElement("div");e.classList.add("project"),e.textContent=this.title,n&&e.addEventListener("click",()=>n(this)),t.appendChild(e)}newTodo(t,n,e,r){const i=new o(t,n,e,r);this.todos.push(i),this.todoCount+=1}};const i=new class{constructor(){this.projects=document.querySelector(".projects"),this.todos=document.querySelector(".todos"),this.handleProjectClick=this.handleProjectClick.bind(this),this.handleTodoClick=this.handleTodoClick.bind(this)}createProject(t){const n=new r(t);return this.render(n),n}createTodo(t,n,e,r){const i=new o(t,n,e,r);return this.render(i),i}handleProjectClick(t){t.todoCount>0&&(this.todos.innerHTML="",t.todos.forEach(t=>this.render(t)))}handleTodoClick(t){alert(`You have clicked on ${t.title}`)}render(t){if(t instanceof r)t.appendTo(this.projects,this.handleProjectClick);else{if(!(t instanceof o))return!1;t.appendTo(this.todos,this.handleTodoClick)}}renderProject(t){t.todoCount>0&&t.todos.forEach(t=>this.render(t))}},s=i.createProject("Project1");s.newTodo("Todo Item 1","sample todo item is this",new Date,"HIGH"),s.newTodo("Todo Item 2","sample todo item is this",new Date,"HIGH");const a=i.createProject("Project2");a.newTodo("2.nd project Todo Item 1","sample todo item is this",new Date,"HIGH"),a.newTodo("2.nd project Todo Item 2","sample todo item is this",new Date,"HIGH")}]);