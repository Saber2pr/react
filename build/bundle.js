var react=function(e){"use strict";var S="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function t(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function n(e,t){return e(t={exports:{}},t.exports),t.exports}var C=n(function(e,t){var n,r,a,l;Object.defineProperty(t,"__esModule",{value:!0}),(r=n=n||{}).Text=Symbol("Text"),r.Fragment=Symbol("DocumentFragment"),r.Root=Symbol("Container"),r.Hook=Symbol("Hook"),r.Host=Symbol("Host"),r.Unknown=Symbol("Unknown"),t.NodeType=n,(l=a=a||{}).Place=Symbol("Place"),l.Update=Symbol("Update"),l.Delete=Symbol("Delete"),l.Create=Symbol("Create"),l.getEffectLevel=function(e){switch(e){case l.Create:return 4;case l.Update:return 3;case l.Place:return 2;case l.Delete:return 1;default:return 0}},t.EffectType=a});t(C);C.NodeType,C.EffectType;var f=n(function(e,t){var n,r;Object.defineProperty(t,"__esModule",{value:!0}),n=t.Reflection||(t.Reflection={}),r=new WeakMap,n.setInternalFiber=function(e){var t=e.tag;r.set(t,e)},n.getInternalFiber=function(e){var t=e.tag;return r.get(t)},n.setContainerFiber=function(e){var t=e.stateNode;r.set(t,e)},n.getContainerFiber=function(e){var t=e.stateNode;return r.get(t)},n.hasContainerFiber=function(e){return r.has(e)}});t(f);f.Reflection;var k=n(function(e,t){Object.defineProperty(t,"__esModule",{value:!0});function n(e){return{tag:"#text",$$typeof:C.NodeType.Text,props:{nodeValue:e}}}function r(e){var t;return(t=Array.prototype).concat.apply(t,e)}var a;(a||(a={})).toArray=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return r(r(e)).reduce(function(e,t){return!1===t||void 0===t?e:"number"==typeof t?e.concat(n(t)):"string"==typeof t?e.concat(n(t)):e.concat(t)},[])},t.Children=a});t(k);k.Children;var E=n(function(e,t){Object.defineProperty(t,"__esModule",{value:!0});t.isSameTag=function(e,t){return e.tag===t.tag};t.isHookFiber=function(e){return e.$$typeof===C.NodeType.Hook};function n(e){return e.$$typeof===C.NodeType.Root}t.isRootFiber=n;function r(e){return e.$$typeof===C.NodeType.Host}t.isHostFiber=r;function a(e){return e.$$typeof===C.NodeType.Text}t.isTextFiber=a;t.isFragmentFiber=function(e){return e.$$typeof===C.NodeType.Fragment};t.isHostParentFiber=function(e){return r(e)||n(e)};t.isHostChildFiber=function(e){return r(e)||a(e)}});t(E);E.isSameTag,E.isHookFiber,E.isRootFiber,E.isHostFiber,E.isTextFiber,E.isFragmentFiber,E.isHostParentFiber,E.isHostChildFiber;var O=n(function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var r=1e4,a=Symbol("MAX_STACK_ID");t.setMaxStackSize=function(e){r=e};t.resetStackSize=function(e){void 0===e&&(e="default");var t=o[a];t&&(t[e]=0)};function l(){o[a]={}}var u;t.resetStack=l;t.watchStackSize=function(e){return(u=u||[]).push(e),function(){u.splice(u.indexOf(e),1)}};var o=function(t){void 0===t&&(t="default"),o[a]||l();var n=o[a];if(t in n?n[t]++:n[t]=1,n[t]>r)throw new Error("STACK SIZE OVERFLOW: "+t+", try to reset the MAX_STACK_SIZE("+r+");\n      method: React.setMaxCallSize()");u&&u.forEach(function(e){return e({id:t,size:n[t]},n)})};t.TestStackSize=o});t(O);O.setMaxStackSize,O.resetStackSize,O.resetStack,O.watchStackSize,O.TestStackSize;var i=n(function(e,t){var p=S&&S.__assign||function(){return(p=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};function y(e,t,n){var r=p(p({},e),{return:n,effectType:C.EffectType.Place,alternate:t});return b(n,t),r}function b(e,t){t.effectType=C.EffectType.Delete;var n=e.effectList||[];n.push(t),e.effectList=n;var r=t.child;r&&(r.effectType=C.EffectType.Delete)}Object.defineProperty(t,"__esModule",{value:!0}),t.reconcileChildren=function(e,t){var n,r;E.isHookFiber(e)&&((r=(n=e).alternate)?E.isSameTag(r,n)?n.effectType=C.EffectType.Update:(n.effectType=C.EffectType.Place,r.effectType=C.EffectType.Delete):n.effectType=C.EffectType.Create),t=k.Children.toArray(t);for(var a,l,u,o,i=e.alternate,c=i?i.child:null,f=null,s=0;s<t.length||c;){O.TestStackSize("reconcileChildren");var d=f,v=c;v&&v.effectType===C.EffectType.Delete&&(v=null);var m=s<t.length&&t[s];v&&m&&E.isSameTag(m,v)?(l=m,o=e,f=p(p(p({},u=v),l),{return:o,effectType:C.EffectType.Update,alternate:u})):v&&m&&!E.isSameTag(m,v)?f=y(m,v,e):!v&&m?(a=e,f=p(p({},m),{return:a,effectType:C.EffectType.Create})):v&&!m&&b(e,v),c=c&&c.sibling,0!==s&&e.child?d&&(m?d.sibling=f:(d.sibling=null,delete d.sibling)):e.child=f,s++}return e.child}});t(i);i.reconcileChildren;var s=n(function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var n={};t.HostConfig=n,t.setHostConfig=function(e){Object.assign(n,e)}});t(s);s.HostConfig,s.setHostConfig;var d=n(function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.getHostSiblingFiber=function(e){var t=e;e:for(;;){for(O.TestStackSize("getHostSiblingFiber");!t.sibling;){if(!t.return||E.isHostParentFiber(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;!E.isHostChildFiber(t);){if(t.effectType===C.EffectType.Place)continue e;if(!t.child)continue e;t=(t.child.return=t).child}if(t.effectType!==C.EffectType.Place)return t}},t.getHostParentFiber=function(e){for(var t=e.return;t;){if(O.TestStackSize("getHostParentFiber"),E.isHostParentFiber(t))return t;t=t.return}},t.getHostChildFiber=function(e){for(var t=e.child;t;){if(O.TestStackSize("getHostChildFiber"),E.isHostChildFiber(t))return t;t=t.child}}});t(d);d.getHostSiblingFiber,d.getHostParentFiber,d.getHostChildFiber;var c=n(function(e,t){function n(e){var t,n=e.effectType;if(E.isHookFiber(e)){switch(n){case C.EffectType.Create:r(e);break;case C.EffectType.Update:a(t=e),r(t);break;case C.EffectType.Place:r(e),u(e);break;case C.EffectType.Delete:a(e),i(e)}f.Reflection.setInternalFiber(e)}else switch(n){case C.EffectType.Create:l(e);break;case C.EffectType.Update:o(e);break;case C.EffectType.Place:u(e);break;case C.EffectType.Delete:i(e)}}function r(e){var t=e.memoizedState;if(t){var n=t.in;if(n){for(var r=[];n.length;){O.TestStackSize("commitHookEffectList");var a=n.pop()();a&&r.push(a)}t.out=r}}}function a(e){var t=e.memoizedState;if(t){var n=t.out;if(n)for(;n.length;){O.TestStackSize("commitHookEffectList:1"),n.pop()()}}}function l(e){var t=d.getHostParentFiber(e).stateNode,n=e.stateNode;s.HostConfig.appendChild(t,n)}function u(e){var t=d.getHostParentFiber(e);if(t)for(var n=t.stateNode,r=d.getHostSiblingFiber(e),a=e;;){if(O.TestStackSize("commitPlace"),a.$$typeof===C.NodeType.Host||a.$$typeof===C.NodeType.Text){var l=a.stateNode;r?s.HostConfig.insertBefore(n,l,r.stateNode):s.HostConfig.appendChild(n,l)}else if(a.child){a=(a.child.return=a).child;continue}if(a===e)return;for(;!a.sibling;){if(O.TestStackSize("commitPlace:1"),!a.return||a.return===e)return;a=a.return}a.sibling.return=a.return,a=a.sibling}}function o(e){var t=e.alternate,n=e.props,r=e.stateNode,a=t?t.props:{},l=Object.fromEntries(Object.entries(n).filter(function(e){var t=e[0];return!["ref","children"].includes(t)}));s.HostConfig.updateProps(r,l,a)}function i(e){var t=e;if(E.isHookFiber(t)){var n=d.getHostChildFiber(t);if(n){var r=n.stateNode;s.HostConfig.removeSelf(r),c(n)}}else{r=t.stateNode;s.HostConfig.removeSelf(r)}c(t)}function c(e){e.return=null,e.child=null,e.sibling=null;var t=e.alternate;t&&(t.return=null,t.child=null,t.sibling=null)}Object.defineProperty(t,"__esModule",{value:!0}),t.createStateNode=function(e){var t=e.tag,n=e.props,r=null;if(E.isTextFiber(e)&&(r=s.HostConfig.createTextNode(n.nodeValue)),E.isRootFiber(e)&&(r=e.stateNode),E.isHostFiber(e)&&(r=s.HostConfig.createElement(t)),E.isFragmentFiber(e)&&(r=s.HostConfig.createDocumentFragment()),n.ref){var a=n.ref;"function"==typeof a?a(r):a.current=r}return r},t.commitWork=function(e){(function(e){for(var t=e.effectList||[],n=[],r=function(t){if(n.find(function(e){return e.effect===t}))return"continue";var e={level:C.EffectType.getEffectLevel(t.effectType),effect:t};n.push(e)},a=0,l=t;a<l.length;a++){r(l[a])}return e.effectList=n.sort(function(e,t){return t.level-e.level}).map(function(e){return e.effect}),e.effectList})(e).forEach(n),E.isRootFiber(e)&&f.Reflection.setContainerFiber(e),E.isHookFiber(e)&&f.Reflection.setInternalFiber(e),O.resetStack();var t=e.callback;t&&t(e)},t.commitCreate=l,t.commitPlace=u,t.commitUpdate=o,t.commitDelete=i});t(c);c.createStateNode,c.commitWork,c.commitCreate,c.commitPlace,c.commitUpdate,c.commitDelete;var v=n(function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var n=0;t.getIndex=function(){var e=n;return n++,e};t.resetIndex=function(){n=0}});t(v);v.getIndex,v.resetIndex;var m=n(function(e,t){var l=S&&S.__spreadArrays||function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),a=0;for(t=0;t<n;t++)for(var l=arguments[t],u=0,o=l.length;u<o;u++,a++)r[a]=l[u];return r};Object.defineProperty(t,"__esModule",{value:!0});var n=null,u=null;function r(e,t){var n=function(e){if(E.isHookFiber(e))return function(e){var t=e.tag,n=e.props;if(e.alternate=f.Reflection.getInternalFiber(e),n.children&&1===n.children.length){var r=n.children[0];if(E.isTextFiber(r)){var a=r.props;r=a.nodeValue}n.children=r}v.resetIndex();var l=t(n),u=i.reconcileChildren(e,l);return e.child=u}(e);if(E.isRootFiber(e))return o(e);if(E.isTextFiber(e))return o(e);if(E.isHostFiber(e))return o(e);if(E.isFragmentFiber(e))return o(e)}(e);if(n)return n;for(var r=e;r;){if(r===t)return r;if(a(r,t),r.sibling)return r.sibling;r=r.return,O.TestStackSize("performUnitOfWork")}}function a(e,t){var n=e.return;if(n){var r=n.effectList||[],a=e.effectList||[];r.push.apply(r,l(a,[e])),e.effectList=[],delete e.effectList,E.isHookFiber(n)&&n.effectType===C.EffectType.Update&&r.push(n),n.effectList=r,n===t&&(u=n)}}function o(e){var t=e.props.children,n=e.stateNode,r=e.alternate,a=!!r&&E.isSameTag(e,r);n&&a||(e.stateNode=c.createStateNode(e),c.commitUpdate(e));var l=i.reconcileChildren(e,t);return e.child=l}t.getCurrentWorkInProgress=function(){return n},t.renderRoot=function(e){for(n||((n=e).effectList=null,n=n);n&&(n=r(n,e))!==e;)O.TestStackSize("renderRoot");u&&(c.commitWork(u),u=n=null)}});t(m);m.getCurrentWorkInProgress,m.renderRoot;var P=n(function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var n=[],r=0;function a(e){requestIdleCallback?requestIdleCallback(e):setTimeout(e)}function l(e){if(!requestAnimationFrame){var t=Date.now(),n=Math.max(r+16,t);return setTimeout(function(){return e(r=n)},n-t)}requestAnimationFrame(e)}function u(e,t){switch(void 0===t&&(t="normal"),n.push(e),t){case"normal":a(o);break;case"layout":l(i);break;default:a(o)}}function o(){O.TestStackSize("scheduleUnitOfWorkNormalMode");var e=n.pop();e&&m.renderRoot(e),n.length&&a(o)}function i(){O.TestStackSize("scheduleUnitOfWorkLayoutMode");var e=n.pop();e&&m.renderRoot(e),n.length&&l(i)}t.scheduleWork=u,t.createRenderer=function(a){return s.setHostConfig(a),{createContainer:function(e,t,n){var r={$$typeof:C.NodeType.Root,props:{children:[e]},stateNode:t,callback:n};a.removeAllChild(t),u(r)},updateContainer:function(e,t,n){var r={$$typeof:C.NodeType.Root,props:{children:[e]},stateNode:t,callback:n};r.alternate=f.Reflection.getContainerFiber(r),u(r)},isContainer:function(e){return f.Reflection.hasContainerFiber(e)}}}});t(P);P.scheduleWork,P.createRenderer;var r=n(function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.is=function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t}});t(r);r.is;var F=n(function(e,t){Object.defineProperty(t,"__esModule",{value:!0});function o(e,t){if(null===t)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!r.is(e[n],t[n]))return!1;return!0}function i(e){var t=v.getIndex(),n=m.getCurrentWorkInProgress(),r=n.memoizedState||{};return t in r||(r[t]=e,n.memoizedState=r),[r[t],function(e){e!==r[t]&&(r[t]=e,P.scheduleWork(n))}]}t.useState=i;t.useReducer=function(e,t,n){var r=f(e),a=n?r(t,n):t,l=i(a),u=l[0],o=l[1];return[u,function(e){return o(r(u,e))}]};function c(e){return i({current:e})[0]}t.useRef=c;var f=function(e,t){var n=c(e),r=c(null);return t&&o(t,r.current)?n.current:(n.current=e,r.current=t,e)};t.useCallBack=f;t.useMemo=function(e,t){var n=c(null),r=c(null);return t&&o(t,r.current)||(n.current=e(),r.current=t),n.current};t.useEffect=function(e,t){var n,r,a=m.getCurrentWorkInProgress(),l=a.memoizedState,u=c(null);t&&o(t,u.current)||(u.current=t,a.memoizedState=((r=(n=l||{}).in||[]).push(e),n.in=r,n))};t.useImperativeHandle=function(e,t,n){var r=c(null);if(!n||!o(n,r.current)){r.current=n;var a=t();"function"==typeof e?e(a):e.current=a}};t.useContext=function(e){return e.value}});t(F);F.useState,F.useReducer,F.useRef,F.useCallBack,F.useMemo,F.useEffect,F.useImperativeHandle,F.useContext;var M=n(function(e,t){var a=S&&S.__assign||function(){return(a=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0});t.createTextElement=function(e){return{tag:"#text",$$typeof:C.NodeType.Text,props:{nodeValue:e}}};t.createElement=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];return t=a(a({},t),{children:k.Children.toArray.apply(k.Children,n)}),"string"==typeof e?{$$typeof:C.NodeType.Host,tag:e,props:t}:"function"==typeof e?{$$typeof:C.NodeType.Hook,tag:e,props:t}:e===C.NodeType.Fragment?{$$typeof:C.NodeType.Fragment,tag:"#fragment",props:t}:{$$typeof:C.NodeType.Unknown,tag:e,props:t}}});t(M);M.createTextElement,M.createElement;var H=n(function(e,t){var a=S&&S.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n};Object.defineProperty(t,"__esModule",{value:!0});t.forwardRef=function(r){return function(e){var t=e.ref,n=a(e,["ref"]);return r(n,t)}}});t(H);H.forwardRef;var R=n(function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.createContext=function(r){return{Provider:function(e){var t=e.children,n=e.value;return r=n,t},Consumer:function(e){return(0,e.children)(r)},value:r}}});t(R);R.createContext;var w=n(function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var i=R.createContext({});t.lazy=function(o){return function(e){var n=F.useContext(i),t=n.fallback,r=n.result,a=F.useState(t),l=a[0],u=a[1];return F.useEffect(function(){r?u(r):o(e).then(function(e){var t=(0,e.default)();u(t),n.result=t})},[n.fallback]),l}};t.Suspense=function(e){var t=e.fallback,n=e.children;return F.useContext(i).fallback=t,n}});t(w);w.lazy,w.Suspense;var a=n(function(e,t){var n=S&&S.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var r=n(F);t.createRenderer=P.createRenderer;var a,l,u=n(M),o=n(w),i=n(R),c=n(O);(l=a=a||{}).useCallBack=r.useCallBack,l.useMemo=r.useMemo,l.useReducer=r.useReducer,l.useRef=r.useRef,l.useState=r.useState,l.useEffect=r.useEffect,l.useImperativeHandle=r.useImperativeHandle,l.createElement=u.createElement,l.Children=k.Children,l.Fragment=C.NodeType.Fragment,l.forwardRef=H.forwardRef,l.lazy=o.lazy,l.Suspense=o.Suspense,l.createContext=i.createContext,l.Stack=c,t.React=a;var f=r.useCallBack;t.useCallBack=f;var s=r.useMemo;t.useMemo=s;var d=r.useReducer;t.useReducer=d;var v=r.useRef;t.useRef=v;var m=r.useState;t.useState=m;var p=r.useEffect;t.useEffect=p;var y=r.useImperativeHandle;t.useImperativeHandle=y;var b=C.NodeType.Fragment;t.Fragment=b;var E=H.forwardRef;t.forwardRef=E;var h=o.lazy;t.lazy=h;var g=o.Suspense;t.Suspense=g;var T=i.createContext;t.createContext=T;var _=c;t.Stack=_,t.default=a});t(a);a.createRenderer,a.React,a.useCallBack,a.useMemo,a.useReducer,a.useRef,a.useState,a.useEffect,a.useImperativeHandle,a.Fragment,a.forwardRef,a.lazy,a.Suspense,a.createContext,a.Stack;var p=n(function(e,n){Object.defineProperty(n,"__esModule",{value:!0}),function(e){for(var t in e)n.hasOwnProperty(t)||(n[t]=e[t])}(a);var t=a;n.default=t.default});t(p);var l=n(function(e,t){var n,r;Object.defineProperty(t,"__esModule",{value:!0}),(r=n=n||{}).createElement=function(e){return document.createElement(e)},r.createDocumentFragment=function(){return document.createDocumentFragment()},r.createTextNode=function(e){return document.createTextNode(String(e))},r.insertBefore=function(e,t,n){e.insertBefore(t,n)},r.appendChild=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];e.append.apply(e,t)},r.removeSelf=function(e){e.remove()},r.removeAllChild=function(e){e.innerHTML=""},r.updateProps=function(r,e,a){if(Object.entries(e).forEach(function(e){var t=e[0],n=e[1];"style"!==t&&a[t]!==n&&(t.startsWith("on")&&(t=t.toLowerCase()),"dangerouslySetInnerHTML"===t&&(t="innerHTML",n=n.__html),r[t]=n)}),e.style){var t=e.style,l=a.style||{};Object.entries(t).forEach(function(e){var t=e[0],n=e[1];l[t]!==n&&(r.style[t]=n)})}},t.HostConfig=n});t(l);l.HostConfig;var u=n(function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.HostConfig=l.HostConfig;var n,r=P.createRenderer(l.HostConfig);(n||(n={})).render=function(e,t,n){if(null===t)throw new Error("Target container is not a DOM element.");r.isContainer(t)?r.updateContainer(e,t,n):r.createContainer(e,t,n)},t.ReactDOM=n,t.default=n});t(u);u.HostConfig,u.ReactDOM;var y=n(function(e,n){Object.defineProperty(n,"__esModule",{value:!0}),function(e){for(var t in e)n.hasOwnProperty(t)||(n[t]=e[t])}(u);var t=u;n.default=t.default});t(y);var b=n(function(e,t){var n=S&&S.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var l=n(p);t.TestIf=function(){var e=l.useState(!0),t=e[0],n=e[1],r=l.useCallBack(function(){return n(!t)},[t]),a=l.useCallBack(function(){return n(!t)});return l.default.createElement("div",null,l.default.createElement("div",null,"TestIf Demo"),t&&l.default.createElement("ol",null,l.default.createElement("li",null,"apple"),l.default.createElement("li",null,"banana"),l.default.createElement("li",null,"orange")),l.default.createElement("button",{onclick:r},"change(with deps)"),l.default.createElement("button",{onclick:a},"change(without deps)"))}});t(b);b.TestIf;var h=n(function(e,t){var n=S&&S.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var r=n(p);t.TestList=function(){var e=r.useState([1,2,3]),t=e[0],n=e[1];return r.default.createElement("div",null,r.default.createElement("div",null,"TestList Demo"),r.default.createElement("ul",null,t.map(function(e){return r.default.createElement("li",null,e)})),r.default.createElement("button",{onclick:function(){return n([1,2,3,4,5])}},"append"),r.default.createElement("button",{onclick:function(){return n([1])}},"remove"),r.default.createElement("button",{onclick:function(){return n([0,1,2,3])}},"insert"))}});t(h);h.TestList;var g=n(function(e,t){var n=S&&S.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var l=n(p);t.TestPlace=function(){var e=l.useState(l.default.createElement("p",null,"to be placed")),t=e[0],n=e[1],r=l.useRef(!0),a=l.useRef();return l.default.createElement("div",null,l.default.createElement("div",{ref:a},"TestPlace Demo"),t,l.default.createElement("button",{onclick:function(){r.current?n(l.default.createElement("div",null,l.default.createElement("header",null,"header"),l.default.createElement("ul",null,l.default.createElement("li",null,"content1"),l.default.createElement("li",null,"content2")),l.default.createElement("footer",null,"footer"))):n(l.default.createElement("p",null,"to be placed")),r.current=!r.current}},"place"),l.default.createElement("button",{onclick:function(){return console.log(a)}},"console ref"))}});t(g);g.TestPlace;var T=n(function(e,t){var n=S&&S.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var u=n(p);t.TestUseMemo=function(){function e(){return n+1}var t=u.useState(0),n=t[0],r=t[1],a=u.useMemo(e,[]),l=e();return u.default.createElement("div",null,u.default.createElement("div",null,"TestUseMemo Demo"),u.default.createElement("div",null,u.default.createElement("ul",null,u.default.createElement("li",null,"state:",n),u.default.createElement("li",null,"memoState:",a),u.default.createElement("li",null,"no memoState:",l)),u.default.createElement("button",{onclick:function(){return r(n+1)}},"update")))}});t(T);T.TestUseMemo;var _=n(function(e,t){var n=S&&S.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var r=n(p);t.TestUseReducer=function(){var e=r.useReducer(function(e,t){switch(t.type){case"add":return{count:e.count+1};case"sub":return{count:e.count-1};default:return e}},{count:0},{type:"add"}),t=e[0],n=e[1];return r.default.createElement("div",null,r.default.createElement("div",null,"TestUseReducer Demo"),r.default.createElement("div",null,r.default.createElement("div",null,"state:",t.count),r.default.createElement("button",{onclick:function(){return n({type:"add"})}},"add"),r.default.createElement("button",{onclick:function(){return n({type:"sub"})}},"sub")))}});t(_);_.TestUseReducer;var j=n(function(e,t){var n=S&&S.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});function r(e){var t=e.list;return u.default.createElement("ul",null,t.map(function(e){return u.default.createElement("li",null,e)}))}function a(e){var t=e.children;return u.default.createElement("ul",null,t.map(function(e){return u.default.createElement("li",null,e)}))}function l(e){var t=e.children;return u.default.createElement("div",null,t)}var u=n(p);t.TestChildren=function(){return u.default.createElement("div",null,u.default.createElement("div",null,"TestChildren"),u.default.createElement(r,{list:[1,2,3]}),u.default.createElement(a,null,[4,5,6]),u.default.createElement(l,null,"this is a single string child"))}});t(j);j.TestChildren;var x=n(function(e,t){var n=S&&S.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var r=n(p);t.TestStyle=function(){var e=r.useState("red"),t=e[0],n=e[1];return r.default.createElement("div",null,r.default.createElement("div",null,"TestStyle Demo"),r.default.createElement("div",{style:{color:t}},"what color it is now?"),r.default.createElement("button",{onclick:function(){return n("blue")}},"change"))}});t(x);x.TestStyle;var o=n(function(e,t){var n=S&&S.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var r=n(p),a=r.createRenderer(y.HostConfig),l=document.createElement("div");document.body.append(l);var u={state:0};t.TestCreateRenderer=function(){var e=u.state;return r.default.createElement("div",null,r.default.createElement("hr",null),r.default.createElement("div",null,"This is a UpdateContainer Test"),r.default.createElement("div",null,e),r.default.createElement("button",{onclick:function(){u.state++,a.updateContainer(r.default.createElement(t.TestCreateRenderer,null),l,function(){return console.log(u.state)})}},"add"))},a.createContainer(r.default.createElement(t.TestCreateRenderer,null),l)});t(o);o.TestCreateRenderer;var z=n(function(e,t){var n=S&&S.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var r=n(p);t.TestSetInnerHTML=function(){return r.default.createElement("div",null,r.default.createElement("div",null,"TestSetInnerHTML Demo"),r.default.createElement("div",{dangerouslySetInnerHTML:{__html:"<div>\n          <strong>from dangerouslySetInnerHTML</strong>\n        </div>"}}))}});t(z);z.TestSetInnerHTML;var I=n(function(e,t){var n=S&&S.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});function r(){var e=a.useState(0),t=e[0],n=e[1];return a.default.createElement(a.default.Fragment,null,a.default.createElement("p",null,"in fragment1"),a.default.createElement("p",null,"in fragment2"),a.default.createElement(a.default.Fragment,null,a.default.createElement("div",null,"fragment in fragment"),t,a.default.createElement("button",{onclick:function(){return n(t+1)}},"add")))}var a=n(p);t.TestFragment=function(){return a.default.createElement("div",null,a.default.createElement("div",null,"TestFragment Demo"),a.default.createElement("div",null,a.default.createElement(r,null)))}});t(I);I.TestFragment;var N=n(function(e,t){var n=S&&S.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});function r(){a.useEffect(function(){return l.push("A"),console.log("mount",l),function(){l.pop(),console.log("unmount",l)}});var e=a.useState(0),t=e[0],n=e[1];return a.default.createElement("div",null,a.default.createElement("p",null,"I'm a subscriber"),t,a.default.createElement("button",{onclick:function(){return n(t+1)}},"update hook"))}var a=n(p),l=[];t.TestUseEffect=function(){var e=a.useState(!0),t=e[0],n=e[1];return a.useEffect(function(){return console.log("willUpdate"),function(){console.log("didupdate")}}),a.default.createElement("div",null,a.default.createElement("div",null,"TestUseEffect Demo"),a.default.createElement("div",null,t?a.default.createElement(r,null):a.default.createElement("div",null,a.default.createElement("div",null,"cleaned"),a.default.createElement("p",null,"cleaned2"))),a.default.createElement("button",{onclick:function(){return n(!t)}},"place hook by host"))}});t(N);N.TestUseEffect;var D=n(function(e,t){var n=S&&S.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var r=n(p),a=r.forwardRef(function(e,t){var n=r.useRef();return r.useImperativeHandle(t,function(){return{focus:function(){console.log("input focus!"),n.current.focus()}}}),r.default.createElement("input",{type:"text",ref:n})});t.TestForwardRef=function(){var e=r.useRef();return r.default.createElement("div",null,r.default.createElement("div",null,"TestForwardRef Demo"),r.default.createElement("div",null,r.default.createElement(a,{ref:e})),r.default.createElement("button",{onclick:function(){return e.current.focus()}},"focus the input"))}});t(D);D.TestForwardRef;var L=n(function(e,t){var n=S&&S.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});function r(e){var t=e.children;return l.default.createElement(u.Provider,{value:{name:"qwq"}},t)}function a(){return l.default.createElement(u.Consumer,null,function(e){var t=e.name;return l.default.createElement("p",null,t)})}var l=n(p),u=l.default.createContext({name:""});t.TestContext=function(){return l.default.createElement("div",null,l.default.createElement("div",null,"TestContext Demo"),l.default.createElement("div",null,l.default.createElement(r,null,l.default.createElement("div",null,l.default.createElement(a,null)))))}});t(L);L.TestContext;var U=n(function(e,t){var n=S&&S.__awaiter||function(e,u,o,i){return new(o=o||Promise)(function(n,t){function r(e){try{l(i.next(e))}catch(e){t(e)}}function a(e){try{l(i.throw(e))}catch(e){t(e)}}function l(e){var t;e.done?n(e.value):((t=e.value)instanceof o?t:new o(function(e){e(t)})).then(r,a)}l((i=i.apply(e,u||[])).next())})},r=S&&S.__generator||function(n,r){var a,l,u,e,o={label:0,sent:function(){if(1&u[0])throw u[1];return u[1]},trys:[],ops:[]};return e={next:t(0),throw:t(1),return:t(2)},"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(t){return function(e){return function(t){if(a)throw new TypeError("Generator is already executing.");for(;o;)try{if(a=1,l&&(u=2&t[0]?l.return:t[0]?l.throw||((u=l.return)&&u.call(l),0):l.next)&&!(u=u.call(l,t[1])).done)return u;switch(l=0,u&&(t=[2&t[0],u.value]),t[0]){case 0:case 1:u=t;break;case 4:return o.label++,{value:t[1],done:!1};case 5:o.label++,l=t[1],t=[0];continue;case 7:t=o.ops.pop(),o.trys.pop();continue;default:if(!(u=0<(u=o.trys).length&&u[u.length-1])&&(6===t[0]||2===t[0])){o=0;continue}if(3===t[0]&&(!u||t[1]>u[0]&&t[1]<u[3])){o.label=t[1];break}if(6===t[0]&&o.label<u[1]){o.label=u[1],u=t;break}if(u&&o.label<u[2]){o.label=u[2],o.ops.push(t);break}u[2]&&o.ops.pop(),o.trys.pop();continue}t=r.call(n,o)}catch(e){t=[6,e],l=0}finally{a=u=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}([t,e])}}},a=S&&S.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var l=a(p),u=l.lazy(function(){return n(void 0,void 0,void 0,function(){return r(this,function(e){switch(e.label){case 0:return[4,(void 0===(t=2e3)&&(t=1e3),new Promise(function(e){return setTimeout(e,t)}))];case 1:return e.sent(),console.log("lazy-component loaded."),[2,{default:function(){return l.default.createElement("div",null,l.default.createElement("p",null,"lazy content"))}}]}var t})})});t.TestLazy=function(){var e=l.useState(!0),t=e[0],n=e[1];return l.default.createElement("div",null,l.default.createElement("div",null,"TestLazy Demo"),l.default.createElement("div",null,t?l.default.createElement(l.Suspense,{fallback:l.default.createElement("p",null,"loading...")},l.default.createElement(u,null)):l.default.createElement("p",null,"lazy is unmount")),l.default.createElement("button",{onclick:function(){return n(!t)}},t?"unmount the lazy":"mount the lazy"))}});t(U);U.TestLazy;var $=n(function(e,t){var n=S&&S.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t},r=S&&S.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=n(p),l=r(y),u={state:0},o=[function(){var e=u.state;return a.default.createElement("div",null,a.default.createElement("div",null,"This is a RerenderRoot Test"),a.default.createElement("div",null,e),a.default.createElement("button",{onclick:function(){u.state++,l.default.render(a.default.createElement(i,null),document.getElementById("root"))}},"add"))},b.TestIf,h.TestList,g.TestPlace,T.TestUseMemo,_.TestUseReducer,j.TestChildren,x.TestStyle,z.TestSetInnerHTML,I.TestFragment,N.TestUseEffect,D.TestForwardRef,L.TestContext,U.TestLazy],i=function(){var e=a.useState(!1),t=e[0],n=e[1];return c(t),a.default.createElement("div",null,a.default.createElement("header",null,a.default.createElement("h1",null,"React Features Tests")),a.default.createElement("main",null,a.default.createElement("section",null,a.default.createElement("button",{onClick:function(){return n(!t)}},t?"关闭性能分析":"启用性能分析")),a.default.createElement("section",null,a.default.createElement("ol",null,o.map(function(e,t){return a.default.createElement("li",null,0!==t&&a.default.createElement("hr",null),a.default.createElement(e,null))})))),a.default.createElement("footer",null,a.default.createElement("i",null,"by ",a.default.createElement("a",{href:"https://saber2pr.top/"},"saber2pr"))))},c=function(e){void 0===e&&(e=!1);var t=a.useRef();a.useEffect(function(){e?t.current=a.default.Stack.watchStackSize(console.log):t.current&&(t.current(),t.current=null)},[e])};l.default.render(a.default.createElement(i,null),document.getElementById("root"))}),A=t($);return e.__moduleExports=$,e.default=A,e}({});
