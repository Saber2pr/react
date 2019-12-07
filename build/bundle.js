var react = (function (exports) {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var ReactDefaults = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	 * @Author: saber2pr
	 * @Date: 2019-12-06 19:30:24
	 * @Last Modified by: saber2pr
	 * @Last Modified time: 2019-12-06 19:47:12
	 */
	var HostConfig;
	(function (HostConfig) {
	    function createElement(tag) {
	        return document.createElement(tag);
	    }
	    HostConfig.createElement = createElement;
	    function createDocumentFragment() {
	        return document.createDocumentFragment();
	    }
	    HostConfig.createDocumentFragment = createDocumentFragment;
	    function createTextNode(data) {
	        return document.createTextNode(String(data));
	    }
	    HostConfig.createTextNode = createTextNode;
	    function insertBefore(parent, newChild, refChild) {
	        parent.insertBefore(newChild, refChild);
	    }
	    HostConfig.insertBefore = insertBefore;
	    function appendChild(parent) {
	        var nodes = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            nodes[_i - 1] = arguments[_i];
	        }
	        parent.append.apply(parent, nodes);
	    }
	    HostConfig.appendChild = appendChild;
	    function replaceChild(parent, newChild, oldChild) {
	        parent.replaceChild(newChild, oldChild);
	    }
	    HostConfig.replaceChild = replaceChild;
	    function removeSelf(node) {
	        node.remove();
	    }
	    HostConfig.removeSelf = removeSelf;
	    function removeAllChild(node) {
	        node.innerHTML = "";
	    }
	    HostConfig.removeAllChild = removeAllChild;
	    function updateProps(node, newProps, oldProps) {
	        Object.entries(newProps).forEach(function (_a) {
	            var k = _a[0], v = _a[1];
	            if (k === "style")
	                return;
	            if (oldProps[k] === v)
	                return;
	            node[k] = v;
	        });
	        if (newProps["style"]) {
	            var newStyle = newProps["style"];
	            var oldStyle_1 = oldProps["style"] || {};
	            Object.entries(newStyle).forEach(function (_a) {
	                var k = _a[0], v = _a[1];
	                if (oldStyle_1[k] === v)
	                    return;
	                node.style[k] = v;
	            });
	        }
	    }
	    HostConfig.updateProps = updateProps;
	})(HostConfig || (HostConfig = {}));
	exports.HostConfig = HostConfig;
	});

	unwrapExports(ReactDefaults);
	var ReactDefaults_1 = ReactDefaults.HostConfig;

	var ReactTypes = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	 * @Author: saber2pr
	 * @Date: 2019-12-06 16:47:37
	 * @Last Modified by: saber2pr
	 * @Last Modified time: 2019-12-06 17:17:11
	 */
	var NodeType;
	(function (NodeType) {
	    NodeType.Text = Symbol("Text");
	    NodeType.Fragment = Symbol("DocumentFragment");
	    NodeType.Root = Symbol("Container");
	    NodeType.Hook = Symbol("Hook");
	    NodeType.Host = Symbol("Host");
	    NodeType.Unknown = Symbol("Unknown");
	})(NodeType = exports.NodeType || (exports.NodeType = {}));
	var EffectType;
	(function (EffectType) {
	    EffectType.Place = Symbol("Place");
	    EffectType.Update = Symbol("Update");
	    EffectType.Delete = Symbol("Delete");
	    EffectType.Create = Symbol("Create");
	    EffectType.getEffectLevel = function (effectType) {
	        switch (effectType) {
	            case EffectType.Create:
	                return 4;
	            case EffectType.Update:
	                return 2;
	            case EffectType.Place:
	                return 3;
	            case EffectType.Delete:
	                return 1;
	            default:
	                return 0;
	        }
	    };
	})(EffectType = exports.EffectType || (exports.EffectType = {}));
	});

	unwrapExports(ReactTypes);
	var ReactTypes_1 = ReactTypes.NodeType;
	var ReactTypes_2 = ReactTypes.EffectType;

	var ReactHostConfig = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	 * @Author: saber2pr
	 * @Date: 2019-12-06 16:44:01
	 * @Last Modified by: saber2pr
	 * @Last Modified time: 2019-12-06 19:45:55
	 */
	var HostConfig = {};
	exports.HostConfig = HostConfig;
	function setHostConfig(config) {
	    Object.assign(HostConfig, config);
	}
	exports.setHostConfig = setHostConfig;
	});

	unwrapExports(ReactHostConfig);
	var ReactHostConfig_1 = ReactHostConfig.HostConfig;
	var ReactHostConfig_2 = ReactHostConfig.setHostConfig;

	var ReactFiberElement = createCommonjsModule(function (module, exports) {
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	 * @Author: saber2pr
	 * @Date: 2019-12-06 17:09:48
	 * @Last Modified by: saber2pr
	 * @Last Modified time: 2019-12-06 17:10:12
	 */


	function createStateNode(hostFiber) {
	    var type = hostFiber.$$typeof, tag = hostFiber.tag, props = hostFiber.props;
	    var stateNode = null;
	    if (type === ReactTypes.NodeType.Text) {
	        stateNode = ReactHostConfig.HostConfig.createTextNode(props.nodeValue);
	    }
	    if (type === ReactTypes.NodeType.Root) {
	        stateNode = hostFiber.stateNode;
	    }
	    if (type === ReactTypes.NodeType.Host) {
	        stateNode = ReactHostConfig.HostConfig.createElement(tag);
	    }
	    if (props.ref) {
	        var ref = props.ref;
	        if (typeof ref === "function") {
	            ref(stateNode);
	        }
	        else {
	            ref.current = stateNode;
	        }
	    }
	    return stateNode;
	}
	exports.createStateNode = createStateNode;
	var Children;
	(function (Children) {
	    Children.toArray = function () {
	        var children = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            children[_i] = arguments[_i];
	        }
	        return children.flat(2).reduce(function (acc, ch) {
	            if (ch === undefined)
	                return acc;
	            if (typeof ch === "number") {
	                return acc.concat(createTextElement(ch));
	            }
	            if (typeof ch === "string") {
	                if (!ch.replace(/ |\r?\n|\r/g, ""))
	                    return acc;
	                return acc.concat(createTextElement(ch));
	            }
	            return acc.concat(ch);
	        }, []);
	    };
	})(Children || (Children = {}));
	exports.Children = Children;
	var createTextElement = function (nodeValue) { return ({
	    tag: "#text",
	    $$typeof: ReactTypes.NodeType.Text,
	    props: { nodeValue: nodeValue }
	}); };
	exports.createTextElement = createTextElement;
	var createElement = function (tag, props) {
	    var children = [];
	    for (var _i = 2; _i < arguments.length; _i++) {
	        children[_i - 2] = arguments[_i];
	    }
	    props = __assign(__assign({}, props), { children: Children.toArray.apply(Children, children) });
	    if (typeof tag === "string") {
	        return { $$typeof: ReactTypes.NodeType.Host, tag: tag, props: props };
	    }
	    if (typeof tag === "function") {
	        return { $$typeof: ReactTypes.NodeType.Hook, tag: tag, props: props };
	    }
	    return { $$typeof: ReactTypes.NodeType.Unknown, tag: tag, props: props };
	};
	exports.createElement = createElement;
	});

	unwrapExports(ReactFiberElement);
	var ReactFiberElement_1 = ReactFiberElement.createStateNode;
	var ReactFiberElement_2 = ReactFiberElement.Children;
	var ReactFiberElement_3 = ReactFiberElement.createTextElement;
	var ReactFiberElement_4 = ReactFiberElement.createElement;

	var ReactShared = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	 * @Author: saber2pr
	 * @Date: 2019-12-06 17:13:32
	 * @Last Modified by: saber2pr
	 * @Last Modified time: 2019-12-06 17:16:43
	 */
	var MAX_CALL_SIZE = 10000;
	var setMaxCallSize = function (size) {
	    MAX_CALL_SIZE = size;
	};
	exports.setMaxCallSize = setMaxCallSize;
	var TestCallSize = function (id) {
	    if (id === void 0) { id = "default"; }
	    if (!TestCallSize["size"]) {
	        TestCallSize["size"] = {};
	    }
	    var size = TestCallSize["size"];
	    if (id in size) {
	        size[id]++;
	    }
	    else {
	        size[id] = 1;
	    }
	    if (size[id] > MAX_CALL_SIZE) {
	        throw new Error("CALL SIZE OVERFLOW: " + id + ", try to reset the MAX_CALL_SIZE(" + MAX_CALL_SIZE + ")");
	    }
	};
	exports.TestCallSize = TestCallSize;
	var is = function (x, y) {
	    return (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y);
	};
	exports.is = is;
	function areHookInputsEqual(nextDeps, prevDeps) {
	    if (prevDeps === null) {
	        return false;
	    }
	    for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
	        if (is(nextDeps[i], prevDeps[i])) {
	            continue;
	        }
	        return false;
	    }
	    return true;
	}
	exports.areHookInputsEqual = areHookInputsEqual;
	var index = 0;
	var getIndex = function () {
	    var currentIndex = index;
	    index++;
	    return currentIndex;
	};
	exports.getIndex = getIndex;
	var resetIndex = function () {
	    index = 0;
	};
	exports.resetIndex = resetIndex;
	});

	unwrapExports(ReactShared);
	var ReactShared_1 = ReactShared.setMaxCallSize;
	var ReactShared_2 = ReactShared.TestCallSize;
	var ReactShared_3 = ReactShared.is;
	var ReactShared_4 = ReactShared.areHookInputsEqual;
	var ReactShared_5 = ReactShared.getIndex;
	var ReactShared_6 = ReactShared.resetIndex;

	var ReactFiberReflection = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Reflection;
	(function (Reflection) {
	    function setInternalFiber(hookFiber) {
	        var constructor = hookFiber.tag;
	        constructor["_internalFiber"] = hookFiber;
	    }
	    Reflection.setInternalFiber = setInternalFiber;
	    function getInternalFiber(hookFiber) {
	        var constructor = hookFiber.tag;
	        return constructor["_internalFiber"];
	    }
	    Reflection.getInternalFiber = getInternalFiber;
	    function setContainerFiber(rootFiber) {
	        var container = rootFiber.stateNode;
	        container["_rootContainer"] = rootFiber;
	    }
	    Reflection.setContainerFiber = setContainerFiber;
	    function getContainerFiber(rootFiber) {
	        var container = rootFiber.stateNode;
	        if (container) {
	            return container["_rootContainer"];
	        }
	        else {
	            return null;
	        }
	    }
	    Reflection.getContainerFiber = getContainerFiber;
	    function hasContainerFiber(container) {
	        return container["_rootContainer"];
	    }
	    Reflection.hasContainerFiber = hasContainerFiber;
	})(Reflection = exports.Reflection || (exports.Reflection = {}));
	});

	unwrapExports(ReactFiberReflection);
	var ReactFiberReflection_1 = ReactFiberReflection.Reflection;

	var ReactIs = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	 * @Author: saber2pr
	 * @Date: 2019-12-06 17:13:21
	 * @Last Modified by: saber2pr
	 * @Last Modified time: 2019-12-06 17:14:54
	 */

	exports.isHostParent = function (fiber) {
	    return fiber.$$typeof === ReactTypes.NodeType.Host || fiber.$$typeof === ReactTypes.NodeType.Root;
	};
	exports.isHost = function (fiber) {
	    return fiber.$$typeof === ReactTypes.NodeType.Host || fiber.$$typeof === ReactTypes.NodeType.Text;
	};
	exports.isSameTag = function (element, oldFiber) {
	    return element.tag === oldFiber.tag;
	};
	});

	unwrapExports(ReactIs);
	var ReactIs_1 = ReactIs.isHostParent;
	var ReactIs_2 = ReactIs.isHost;
	var ReactIs_3 = ReactIs.isSameTag;

	var ReactFiberChildren = createCommonjsModule(function (module, exports) {
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	 * @Author: saber2pr
	 * @Date: 2019-12-06 17:08:56
	 * @Last Modified by: saber2pr
	 * @Last Modified time: 2019-12-06 21:54:36
	 */




	function reconcileChildren(fiber, children) {
	    children = ReactFiberElement.Children.toArray(children);
	    var alternate = fiber.alternate;
	    var nextOldFiber = alternate ? alternate.child : null;
	    var newFiber = null;
	    var i = 0;
	    while (i < children.length || nextOldFiber) {
	        var prevChild = newFiber;
	        var oldFiber = nextOldFiber;
	        var element = i < children.length && children[i];
	        // update
	        if (oldFiber && element && ReactIs.isSameTag(element, oldFiber)) {
	            newFiber = __assign(__assign(__assign({}, oldFiber), element), { return: fiber, effectType: ReactTypes.EffectType.Update, alternate: oldFiber });
	        }
	        // place
	        else if (oldFiber && element && !ReactIs.isSameTag(element, oldFiber)) {
	            newFiber = __assign(__assign({}, element), { return: fiber, effectType: ReactTypes.EffectType.Place, alternate: oldFiber });
	        }
	        // create
	        else if (!oldFiber && element) {
	            newFiber = __assign(__assign({}, element), { return: fiber, effectType: ReactTypes.EffectType.Create });
	        }
	        // delete
	        else if (oldFiber && !element) {
	            oldFiber.effectType = ReactTypes.EffectType.Delete;
	            var effectList = fiber.effectList || [];
	            effectList.push(oldFiber);
	            fiber.effectList = effectList;
	        }
	        // next alternate
	        if (nextOldFiber)
	            nextOldFiber = nextOldFiber.sibling;
	        if (i === 0 || !fiber.child) {
	            fiber.child = newFiber; // link: fiber->child
	        }
	        else if (prevChild) {
	            if (element) {
	                prevChild.sibling = newFiber; // link: fiber.sibling->fiber
	            }
	            else {
	                prevChild.sibling = null; // unlink: fiber.sibling
	                delete prevChild.sibling;
	            }
	        }
	        i++;
	        ReactShared.TestCallSize("reconcileChildren");
	    }
	    return fiber.child;
	}
	exports.reconcileChildren = reconcileChildren;
	});

	unwrapExports(ReactFiberChildren);
	var ReactFiberChildren_1 = ReactFiberChildren.reconcileChildren;

	var ReactFiberTraverse = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	 * @Author: saber2pr
	 * @Date: 2019-12-06 17:11:57
	 * @Last Modified by:   saber2pr
	 * @Last Modified time: 2019-12-06 17:11:57
	 */



	function getHostSiblingFiber(fiber) {
	    var node = fiber;
	    siblings: while (true) {
	        ReactShared.TestCallSize("getHostSiblingFiber");
	        while (!node.sibling) {
	            if (!node.return || ReactIs.isHostParent(node.return)) {
	                return null;
	            }
	            node = node.return;
	        }
	        node.sibling.return = node.return;
	        node = node.sibling;
	        while (!ReactIs.isHost(node)) {
	            if (node.effectType === ReactTypes.EffectType.Place) {
	                continue siblings;
	            }
	            if (!node.child) {
	                continue siblings;
	            }
	            else {
	                node.child.return = node;
	                node = node.child;
	            }
	        }
	        if (!(node.effectType === ReactTypes.EffectType.Place)) {
	            return node;
	        }
	    }
	}
	exports.getHostSiblingFiber = getHostSiblingFiber;
	function getHostParentFiber(fiber) {
	    var parent = fiber.return;
	    while (parent) {
	        ReactShared.TestCallSize("getHostParentFiber");
	        if (ReactIs.isHostParent(parent)) {
	            return parent;
	        }
	        parent = parent.return;
	    }
	}
	exports.getHostParentFiber = getHostParentFiber;
	function getHostChildFiber(fiber) {
	    var child = fiber.child;
	    while (child) {
	        ReactShared.TestCallSize("getHostChildFiber");
	        if (ReactIs.isHost(child)) {
	            return child;
	        }
	        child = child.child;
	    }
	}
	exports.getHostChildFiber = getHostChildFiber;
	});

	unwrapExports(ReactFiberTraverse);
	var ReactFiberTraverse_1 = ReactFiberTraverse.getHostSiblingFiber;
	var ReactFiberTraverse_2 = ReactFiberTraverse.getHostParentFiber;
	var ReactFiberTraverse_3 = ReactFiberTraverse.getHostChildFiber;

	var ReactFiberCommitWork = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	 * @Author: saber2pr
	 * @Date: 2019-12-06 17:09:07
	 * @Last Modified by: saber2pr
	 * @Last Modified time: 2019-12-06 21:50:17
	 */




	function commitWork(fiber) {
	    var effectList = sortEffectList(fiber);
	    effectList.forEach(commitUnitOfWork);
	    fiber.effectList = null;
	    // set root alternate
	    if (fiber.$$typeof === ReactTypes.NodeType.Root) {
	        ReactFiberReflection.Reflection.setContainerFiber(fiber);
	    }
	    // set hook alternate
	    else if (fiber.$$typeof === ReactTypes.NodeType.Hook) {
	        ReactFiberReflection.Reflection.setInternalFiber(fiber);
	    }
	    var callback = fiber.callback;
	    if (callback)
	        callback(fiber);
	}
	exports.commitWork = commitWork;
	function sortEffectList(fiber) {
	    var effectList = fiber.effectList || [];
	    fiber.effectList = effectList
	        .map(function (effect) { return ({
	        level: ReactTypes.EffectType.getEffectLevel(effect.effectType),
	        effect: effect
	    }); })
	        .sort(function (a, b) { return b.level - a.level; })
	        .map(function (task) { return task.effect; });
	    return fiber.effectList;
	}
	function commitUnitOfWork(fiber) {
	    var type = fiber.$$typeof, effectTag = fiber.effectType;
	    if (type === ReactTypes.NodeType.Hook) ;
	    else {
	        switch (effectTag) {
	            case ReactTypes.EffectType.Create:
	                commitCreate(fiber);
	                break;
	            case ReactTypes.EffectType.Update:
	                commitUpdate(fiber);
	                break;
	            case ReactTypes.EffectType.Place:
	                commitPlace(fiber);
	                break;
	            case ReactTypes.EffectType.Delete:
	                commitDelete(fiber);
	                break;
	        }
	    }
	}
	function commitCreate(hostFiber) {
	    var HostParent = ReactFiberTraverse.getHostParentFiber(hostFiber);
	    var parent = HostParent.stateNode;
	    var node = hostFiber.stateNode;
	    ReactHostConfig.HostConfig.appendChild(parent, node);
	}
	exports.commitCreate = commitCreate;
	function commitPlace(hostFiber) {
	    var alternate = hostFiber.alternate, newChild = hostFiber.stateNode;
	    var oldChild = alternate.stateNode;
	    var HostParent = ReactFiberTraverse.getHostParentFiber(alternate);
	    var parent = HostParent.stateNode;
	    ReactHostConfig.HostConfig.replaceChild(parent, newChild, oldChild);
	    // replace child node
	    var HostChild = ReactFiberTraverse.getHostChildFiber(hostFiber);
	    if (HostChild) {
	        var HostChildNode = HostChild.stateNode;
	        var HostChildSibling = ReactFiberTraverse.getHostSiblingFiber(HostChild);
	        if (HostChildSibling) {
	            var HostChildSiblingNode = HostChildSibling.stateNode;
	            ReactHostConfig.HostConfig.insertBefore(newChild, HostChildNode, HostChildSiblingNode);
	        }
	        else {
	            ReactHostConfig.HostConfig.appendChild(newChild, HostChildNode);
	        }
	    }
	}
	exports.commitPlace = commitPlace;
	function commitUpdate(hostFiber) {
	    var alternate = hostFiber.alternate;
	    var newProps = hostFiber.props;
	    var node = hostFiber.stateNode;
	    var oldProps = alternate ? alternate.props : {};
	    var newPropsToUpdate = Object.fromEntries(Object.entries(newProps).filter(function (_a) {
	        var k = _a[0];
	        return !["ref", "children"].includes(k);
	    }));
	    ReactHostConfig.HostConfig.updateProps(node, newPropsToUpdate, oldProps);
	}
	exports.commitUpdate = commitUpdate;
	function commitDelete(hostFiber) {
	    var stateNode = hostFiber.stateNode;
	    console.log("delete", hostFiber);
	    ReactHostConfig.HostConfig.removeSelf(stateNode);
	}
	exports.commitDelete = commitDelete;
	});

	unwrapExports(ReactFiberCommitWork);
	var ReactFiberCommitWork_1 = ReactFiberCommitWork.commitWork;
	var ReactFiberCommitWork_2 = ReactFiberCommitWork.commitCreate;
	var ReactFiberCommitWork_3 = ReactFiberCommitWork.commitPlace;
	var ReactFiberCommitWork_4 = ReactFiberCommitWork.commitUpdate;
	var ReactFiberCommitWork_5 = ReactFiberCommitWork.commitDelete;

	var ReactFiberWorkLoop = createCommonjsModule(function (module, exports) {
	var __spreadArrays = (commonjsGlobal && commonjsGlobal.__spreadArrays) || function () {
	    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
	    for (var r = Array(s), k = 0, i = 0; i < il; i++)
	        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
	            r[k] = a[j];
	    return r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	 * @Author: saber2pr
	 * @Date: 2019-12-06 17:12:44
	 * @Last Modified by: saber2pr
	 * @Last Modified time: 2019-12-06 21:53:51
	 */







	var workInProgress = null;
	var pendingCommit = null;
	var getCurrentWorkInProgress = function () { return workInProgress; };
	exports.getCurrentWorkInProgress = getCurrentWorkInProgress;
	function renderRoot(root) {
	    if (!workInProgress)
	        workInProgress = createWorkInProgress(root);
	    while (workInProgress) {
	        workInProgress = performUnitOfWork(workInProgress, root);
	        if (workInProgress === root)
	            break;
	        ReactShared.TestCallSize("renderRoot");
	    }
	    if (pendingCommit) {
	        ReactFiberCommitWork.commitWork(pendingCommit);
	        workInProgress = null;
	        pendingCommit = null;
	    }
	}
	exports.renderRoot = renderRoot;
	function createWorkInProgress(fiber) {
	    workInProgress = fiber;
	    workInProgress.effectList = null;
	    return workInProgress;
	}
	function performUnitOfWork(fiber, top) {
	    var next = beginWork(fiber);
	    if (next)
	        return next;
	    var current = fiber;
	    while (current) {
	        if (current === top)
	            return current;
	        completeWork(current, top);
	        if (current.sibling)
	            return current.sibling;
	        current = current.return;
	        ReactShared.TestCallSize("performUnitOfWork");
	    }
	}
	function completeWork(fiber, top) {
	    var parent = fiber.return;
	    if (parent) {
	        var parentEffectList = parent.effectList || [];
	        var fiberEffectList = fiber.effectList || [];
	        parent.effectList = parentEffectList.concat.apply(parentEffectList, __spreadArrays(fiberEffectList, [fiber]));
	        fiber.effectList = [];
	        delete fiber.effectList;
	        if (parent === top)
	            pendingCommit = parent;
	    }
	}
	function beginWork(fiber) {
	    if (fiber.$$typeof === ReactTypes.NodeType.Hook) {
	        return updateHOOKComponent(fiber);
	    }
	    if (fiber.$$typeof === ReactTypes.NodeType.Root) {
	        return updateHostComponent(fiber);
	    }
	    if (fiber.$$typeof === ReactTypes.NodeType.Text) {
	        return updateHostComponent(fiber);
	    }
	    if (fiber.$$typeof === ReactTypes.NodeType.Host) {
	        return updateHostComponent(fiber);
	    }
	}
	function updateHOOKComponent(hookFiber) {
	    var constructor = hookFiber.tag, props = hookFiber.props;
	    var alternate = ReactFiberReflection.Reflection.getInternalFiber(hookFiber);
	    if (alternate) {
	        hookFiber.alternate = alternate;
	    }
	    else {
	        ReactFiberReflection.Reflection.setInternalFiber(hookFiber);
	    }
	    ReactShared.resetIndex();
	    var children = constructor(props);
	    return ReactFiberChildren.reconcileChildren(hookFiber, children);
	}
	function updateHostComponent(hostFiber) {
	    var children = hostFiber.props.children, stateNode = hostFiber.stateNode, alternate = hostFiber.alternate;
	    if (!stateNode || (alternate && !ReactIs.isSameTag(hostFiber, alternate))) {
	        hostFiber.stateNode = ReactFiberElement.createStateNode(hostFiber);
	        ReactFiberCommitWork.commitUpdate(hostFiber);
	    }
	    return ReactFiberChildren.reconcileChildren(hostFiber, children);
	}
	});

	unwrapExports(ReactFiberWorkLoop);
	var ReactFiberWorkLoop_1 = ReactFiberWorkLoop.getCurrentWorkInProgress;
	var ReactFiberWorkLoop_2 = ReactFiberWorkLoop.renderRoot;

	var ReactFiberReconciler = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	 * @Author: saber2pr
	 * @Date: 2019-12-06 19:07:32
	 * @Last Modified by: saber2pr
	 * @Last Modified time: 2019-12-06 21:54:22
	 */





	var updateQueue = [];
	var lastTime = 0;
	function pushEffect(callback) {
	    if (requestIdleCallback) {
	        requestIdleCallback(callback);
	    }
	    else {
	        setTimeout(callback);
	    }
	}
	function pushLayoutEffect(callback) {
	    if (requestAnimationFrame) {
	        requestAnimationFrame(callback);
	    }
	    else {
	        var now = Date.now();
	        var nextTime_1 = Math.max(lastTime + 16, now);
	        return setTimeout(function () { return callback((lastTime = nextTime_1)); }, nextTime_1 - now);
	    }
	}
	function scheduleWork(fiber, mode) {
	    if (mode === void 0) { mode = "normal"; }
	    updateQueue.push(fiber);
	    switch (mode) {
	        case "normal":
	            pushEffect(scheduleUnitOfWorkNormalMode);
	            break;
	        case "layout":
	            pushLayoutEffect(scheduleUnitOfWorkLayoutMode);
	            break;
	        default:
	            pushEffect(scheduleUnitOfWorkNormalMode);
	    }
	}
	exports.scheduleWork = scheduleWork;
	function scheduleUnitOfWorkNormalMode() {
	    ReactShared.TestCallSize("scheduleUnitOfWorkNormalMode");
	    var update = updateQueue.pop();
	    if (update)
	        ReactFiberWorkLoop.renderRoot(update);
	    if (updateQueue.length) {
	        pushEffect(scheduleUnitOfWorkNormalMode);
	    }
	}
	function scheduleUnitOfWorkLayoutMode() {
	    ReactShared.TestCallSize("scheduleUnitOfWorkLayoutMode");
	    var update = updateQueue.pop();
	    if (update)
	        ReactFiberWorkLoop.renderRoot(update);
	    if (updateQueue.length) {
	        pushLayoutEffect(scheduleUnitOfWorkLayoutMode);
	    }
	}
	function createRenderer(HostConfig) {
	    ReactHostConfig.setHostConfig(HostConfig);
	    var createContainer = function (component, container, callback) {
	        var rootFiber = {
	            $$typeof: ReactTypes.NodeType.Root,
	            props: { children: [component] },
	            stateNode: container,
	            callback: callback
	        };
	        HostConfig.removeAllChild(container);
	        scheduleWork(rootFiber);
	    };
	    var updateContainer = function (component, container, callback) {
	        var rootFiber = {
	            $$typeof: ReactTypes.NodeType.Root,
	            props: { children: [component] },
	            stateNode: container,
	            alternate: ReactFiberReflection.Reflection.getContainerFiber(container),
	            callback: callback
	        };
	        scheduleWork(rootFiber);
	    };
	    return {
	        createContainer: createContainer,
	        updateContainer: updateContainer
	    };
	}
	exports.createRenderer = createRenderer;
	});

	unwrapExports(ReactFiberReconciler);
	var ReactFiberReconciler_1 = ReactFiberReconciler.scheduleWork;
	var ReactFiberReconciler_2 = ReactFiberReconciler.createRenderer;

	var ReactFiberHooks = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	 * @Author: saber2pr
	 * @Date: 2019-12-06 17:11:09
	 * @Last Modified by: saber2pr
	 * @Last Modified time: 2019-12-06 19:09:39
	 */



	function useState(initialState) {
	    var id = ReactShared.getIndex();
	    var fiber = ReactFiberWorkLoop.getCurrentWorkInProgress();
	    var memoizedState = fiber.memoizedState || {};
	    if (!(id in memoizedState)) {
	        memoizedState[id] = initialState;
	        fiber.memoizedState = memoizedState;
	    }
	    var setState = function (state) {
	        if (state === memoizedState[id])
	            return;
	        memoizedState[id] = state;
	        ReactFiberReconciler.scheduleWork(fiber);
	    };
	    return [memoizedState[id], setState];
	}
	exports.useState = useState;
	var useReducer = function (initReducer, initialState, initAction) {
	    var reducer = useCallBack(initReducer);
	    var initState = initAction
	        ? reducer(initialState, initAction)
	        : initialState;
	    var _a = useState(initState), state = _a[0], setState = _a[1];
	    var dispatch = function (action) { return setState(reducer(state, action)); };
	    return [state, dispatch];
	};
	exports.useReducer = useReducer;
	function useRef(value) {
	    var state = useState({ current: value })[0];
	    return state;
	}
	exports.useRef = useRef;
	function useCallBack(callback, deps) {
	    if (deps === void 0) { deps = []; }
	    var ref = useRef(callback);
	    var prevDepsRef = useRef(null);
	    if (ReactShared.areHookInputsEqual(deps, prevDepsRef.current)) {
	        return ref.current;
	    }
	    else {
	        ref.current = callback;
	        prevDepsRef.current = deps;
	        return callback;
	    }
	}
	exports.useCallBack = useCallBack;
	function useMemo(memoFunc, deps) {
	    if (deps === void 0) { deps = []; }
	    var ref = useRef(null);
	    var prevDepsRef = useRef(null);
	    if (ReactShared.areHookInputsEqual(deps, prevDepsRef.current)) {
	        return ref.current;
	    }
	    else {
	        ref.current = memoFunc();
	        prevDepsRef.current = deps;
	        return ref.current;
	    }
	}
	exports.useMemo = useMemo;
	});

	unwrapExports(ReactFiberHooks);
	var ReactFiberHooks_1 = ReactFiberHooks.useState;
	var ReactFiberHooks_2 = ReactFiberHooks.useReducer;
	var ReactFiberHooks_3 = ReactFiberHooks.useRef;
	var ReactFiberHooks_4 = ReactFiberHooks.useCallBack;
	var ReactFiberHooks_5 = ReactFiberHooks.useMemo;

	var React_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	 * @Author: saber2pr
	 * @Date: 2019-12-06 16:44:19
	 * @Last Modified by: saber2pr
	 * @Last Modified time: 2019-12-06 20:56:42
	 */

	exports.HostConfig = ReactDefaults.HostConfig;




	var renderer = ReactFiberReconciler.createRenderer(ReactDefaults.HostConfig);
	var React;
	(function (React) {
	    React.render = function (component, container, callback) {
	        var hasContainerFiber = ReactFiberReflection.Reflection.hasContainerFiber(container);
	        if (hasContainerFiber) {
	            renderer.updateContainer(component, container, callback);
	        }
	        else {
	            renderer.createContainer(component, container, callback);
	        }
	    };
	    React.createElement = ReactFiberElement.createElement;
	    React.Children = ReactFiberElement.Children;
	    React.useCallBack = ReactFiberHooks.useCallBack;
	    React.useMemo = ReactFiberHooks.useMemo;
	    React.useReducer = ReactFiberHooks.useReducer;
	    React.useRef = ReactFiberHooks.useRef;
	    React.useState = ReactFiberHooks.useState;
	    React.createRenderer = ReactFiberReconciler.createRenderer;
	})(React = exports.React || (exports.React = {}));
	var useCallBack = ReactFiberHooks.useCallBack;
	exports.useCallBack = useCallBack;
	var useMemo = ReactFiberHooks.useMemo;
	exports.useMemo = useMemo;
	var useReducer = ReactFiberHooks.useReducer;
	exports.useReducer = useReducer;
	var useRef = ReactFiberHooks.useRef;
	exports.useRef = useRef;
	var useState = ReactFiberHooks.useState;
	exports.useState = useState;
	var createRenderer = ReactFiberReconciler.createRenderer;
	exports.createRenderer = createRenderer;
	exports.default = React;
	});

	unwrapExports(React_1);
	var React_2 = React_1.HostConfig;
	var React_3 = React_1.React;
	var React_4 = React_1.useCallBack;
	var React_5 = React_1.useMemo;
	var React_6 = React_1.useReducer;
	var React_7 = React_1.useRef;
	var React_8 = React_1.useState;
	var React_9 = React_1.createRenderer;

	var lib = createCommonjsModule(function (module, exports) {
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(React_1);
	var React_1$1 = React_1;
	exports.default = React_1$1.default;
	});

	unwrapExports(lib);

	var TestIF = createCommonjsModule(function (module, exports) {
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
	    result["default"] = mod;
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	 * @Author: saber2pr
	 * @Date: 2019-12-06 15:28:47
	 * @Last Modified by: saber2pr
	 * @Last Modified time: 2019-12-06 17:28:45
	 */
	var __1 = __importStar(lib);
	exports.TestIf = function () {
	    var _a = __1.useState(true), isShow = _a[0], setState = _a[1];
	    var clickWithDeps = __1.useCallBack(function () { return setState(!isShow); }, [isShow]);
	    var clickWithoutDes = __1.useCallBack(function () { return setState(!isShow); });
	    return (__1.default.createElement("div", null,
	        __1.default.createElement("div", null, "TestIf Demo"),
	        isShow && (__1.default.createElement("ol", null,
	            __1.default.createElement("li", null, "apple"),
	            __1.default.createElement("li", null, "banana"),
	            __1.default.createElement("li", null, "orange"))),
	        __1.default.createElement("button", { onclick: clickWithDeps }, "change(with deps)"),
	        __1.default.createElement("button", { onclick: clickWithoutDes }, "change(without deps)")));
	};
	});

	unwrapExports(TestIF);
	var TestIF_1 = TestIF.TestIf;

	var TestList = createCommonjsModule(function (module, exports) {
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
	    result["default"] = mod;
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	 * @Author: saber2pr
	 * @Date: 2019-12-06 15:28:50
	 * @Last Modified by: saber2pr
	 * @Last Modified time: 2019-12-06 16:29:05
	 */
	var __1 = __importStar(lib);
	exports.TestList = function () {
	    var _a = __1.useState([1, 2, 3]), list = _a[0], setList = _a[1];
	    return (__1.default.createElement("div", null,
	        __1.default.createElement("div", null, "TestList Demo"),
	        __1.default.createElement("ul", null, list.map(function (l) { return (__1.default.createElement("li", null, l)); })),
	        __1.default.createElement("button", { onclick: function () { return setList([1, 2, 3, 4, 5]); } }, "append"),
	        __1.default.createElement("button", { onclick: function () { return setList([1]); } }, "remove"),
	        __1.default.createElement("button", { onclick: function () { return setList([0, 1, 2, 3]); } }, "insert")));
	};
	});

	unwrapExports(TestList);
	var TestList_1 = TestList.TestList;

	var TestPlace = createCommonjsModule(function (module, exports) {
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
	    result["default"] = mod;
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	 * @Author: saber2pr
	 * @Date: 2019-12-06 15:28:44
	 * @Last Modified by: saber2pr
	 * @Last Modified time: 2019-12-06 16:41:58
	 */
	var __1 = __importStar(lib);
	exports.TestPlace = function () {
	    var _a = __1.useState(__1.default.createElement("p", null, "to be placed")), state = _a[0], setState = _a[1];
	    var flag = __1.useRef(true);
	    var ref = __1.useRef();
	    return (__1.default.createElement("div", null,
	        __1.default.createElement("div", { ref: ref }, "TestPlace Demo"),
	        state,
	        __1.default.createElement("button", { onclick: function () {
	                if (flag.current) {
	                    setState(__1.default.createElement("div", null,
	                        __1.default.createElement("header", null, "header"),
	                        __1.default.createElement("ul", null,
	                            __1.default.createElement("li", null, "content1"),
	                            __1.default.createElement("li", null, "content2")),
	                        __1.default.createElement("footer", null, "footer")));
	                }
	                else {
	                    setState(__1.default.createElement("p", null, "to be placed"));
	                }
	                flag.current = !flag.current;
	            } }, "place"),
	        __1.default.createElement("button", { onclick: function () { return console.log(ref); } }, "console ref")));
	};
	});

	unwrapExports(TestPlace);
	var TestPlace_1 = TestPlace.TestPlace;

	var TestUseMemo = createCommonjsModule(function (module, exports) {
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
	    result["default"] = mod;
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	 * @Author: saber2pr
	 * @Date: 2019-12-06 15:39:28
	 * @Last Modified by: saber2pr
	 * @Last Modified time: 2019-12-06 16:29:18
	 */
	var __1 = __importStar(lib);
	exports.TestUseMemo = function () {
	    var _a = __1.useState(0), state = _a[0], setState = _a[1];
	    var expression = function () {
	        return state + 1;
	    };
	    var resultMemo = __1.useMemo(expression);
	    var result = expression();
	    return (__1.default.createElement("div", null,
	        __1.default.createElement("div", null, "TestUseMemo Demo"),
	        __1.default.createElement("div", null,
	            __1.default.createElement("ul", null,
	                __1.default.createElement("li", null,
	                    "state:",
	                    state),
	                __1.default.createElement("li", null,
	                    "memoState:",
	                    resultMemo),
	                __1.default.createElement("li", null,
	                    "no memoState:",
	                    result)),
	            __1.default.createElement("button", { onclick: function () { return setState(state + 1); } }, "update"))));
	};
	});

	unwrapExports(TestUseMemo);
	var TestUseMemo_1 = TestUseMemo.TestUseMemo;

	var TestUseReducer = createCommonjsModule(function (module, exports) {
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
	    result["default"] = mod;
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	 * @Author: saber2pr
	 * @Date: 2019-12-06 15:39:28
	 * @Last Modified by: saber2pr
	 * @Last Modified time: 2019-12-06 16:29:24
	 */
	var __1 = __importStar(lib);
	exports.TestUseReducer = function () {
	    var _a = __1.useReducer(function (state, action) {
	        switch (action.type) {
	            case "add":
	                return { count: state.count + 1 };
	            case "sub":
	                return { count: state.count - 1 };
	            default:
	                return state;
	        }
	    }, { count: 0 }, { type: "add" }), state = _a[0], dispatch = _a[1];
	    return (__1.default.createElement("div", null,
	        __1.default.createElement("div", null, "TestUseReducer Demo"),
	        __1.default.createElement("div", null,
	            __1.default.createElement("div", null,
	                "state:",
	                state.count),
	            __1.default.createElement("button", { onclick: function () { return dispatch({ type: "add" }); } }, "add"),
	            __1.default.createElement("button", { onclick: function () { return dispatch({ type: "sub" }); } }, "sub"))));
	};
	});

	unwrapExports(TestUseReducer);
	var TestUseReducer_1 = TestUseReducer.TestUseReducer;

	var TestChildren = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	 * @Author: saber2pr
	 * @Date: 2019-12-06 17:32:18
	 * @Last Modified by: saber2pr
	 * @Last Modified time: 2019-12-06 17:36:54
	 */
	var __1 = __importDefault(lib);
	var ListFromProps = function (_a) {
	    var list = _a.list;
	    return (__1.default.createElement("ul", null, list.map(function (l) { return (__1.default.createElement("li", null, l)); })));
	};
	var ListFromChildren = function (_a) {
	    var children = _a.children;
	    return (__1.default.createElement("ul", null, children.map(function (l) { return (__1.default.createElement("li", null, l)); })));
	};
	exports.TestChildren = function () {
	    return (__1.default.createElement("div", null,
	        __1.default.createElement("div", null, "TestChildren"),
	        __1.default.createElement(ListFromProps, { list: [1, 2, 3] }),
	        __1.default.createElement(ListFromChildren, null, [4, 5, 6])));
	};
	});

	unwrapExports(TestChildren);
	var TestChildren_1 = TestChildren.TestChildren;

	var TestStyle = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	 * @Author: saber2pr
	 * @Date: 2019-12-06 19:52:53
	 * @Last Modified by:   saber2pr
	 * @Last Modified time: 2019-12-06 19:52:53
	 */
	var __1 = __importDefault(lib);

	exports.TestStyle = function () {
	    var _a = React_1.useState("red"), state = _a[0], setState = _a[1];
	    return (__1.default.createElement("div", null,
	        __1.default.createElement("div", null, "TestStyle Demo"),
	        __1.default.createElement("div", { style: { color: state } }, "what color it is now?"),
	        __1.default.createElement("button", { onclick: function () { return setState("blue"); } }, "change")));
	};
	});

	unwrapExports(TestStyle);
	var TestStyle_1 = TestStyle.TestStyle;

	var TestCreateRenderer = createCommonjsModule(function (module, exports) {
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
	    result["default"] = mod;
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	 * @Author: saber2pr
	 * @Date: 2019-12-06 20:38:27
	 * @Last Modified by:   saber2pr
	 * @Last Modified time: 2019-12-06 20:38:27
	 */
	var __1 = __importStar(lib);
	var renderer = __1.default.createRenderer(__1.HostConfig);
	var container = document.createElement("div");
	document.body.append(container);
	var Store = {
	    state: 0
	};
	exports.TestCreateRenderer = function () {
	    var state = Store.state;
	    return (__1.default.createElement("div", null,
	        __1.default.createElement("hr", null),
	        __1.default.createElement("div", null, "This is a UpdateContainer Test"),
	        __1.default.createElement("div", null, state),
	        __1.default.createElement("button", { onclick: function () {
	                Store.state++;
	                renderer.updateContainer(__1.default.createElement(exports.TestCreateRenderer, null), container, function () {
	                    return console.log(Store.state);
	                });
	            } }, "add")));
	};
	renderer.createContainer(__1.default.createElement(exports.TestCreateRenderer, null), container);
	});

	unwrapExports(TestCreateRenderer);
	var TestCreateRenderer_1 = TestCreateRenderer.TestCreateRenderer;

	var Test = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	 * @Author: saber2pr
	 * @Date: 2019-12-06 17:41:19
	 * @Last Modified by: saber2pr
	 * @Last Modified time: 2019-12-06 21:55:13
	 */









	var Store = {
	    state: 0
	};
	var TestRerenderRoot = function () {
	    var state = Store.state;
	    return (lib.React.createElement("div", null,
	        lib.React.createElement("div", null, "This is a RerenderRoot Test"),
	        lib.React.createElement("div", null, state),
	        lib.React.createElement("button", { onclick: function () {
	                Store.state++;
	                lib.React.render(lib.React.createElement(App, null), document.getElementById("root"));
	            } }, "add")));
	};
	var Tests = [
	    TestRerenderRoot,
	    TestIF.TestIf,
	    TestList.TestList,
	    TestPlace.TestPlace,
	    TestUseMemo.TestUseMemo,
	    TestUseReducer.TestUseReducer,
	    TestChildren.TestChildren,
	    TestStyle.TestStyle
	];
	var App = function () {
	    return (lib.React.createElement("div", null,
	        lib.React.createElement("header", null,
	            lib.React.createElement("h1", null, "React Features Tests")),
	        lib.React.createElement("main", null,
	            lib.React.createElement("ol", null, Tests.map(function (Test, i) { return (lib.React.createElement("li", null,
	                i !== 0 && lib.React.createElement("hr", null),
	                lib.React.createElement(Test, null))); }))),
	        lib.React.createElement("footer", null,
	            lib.React.createElement("i", null,
	                "by ",
	                lib.React.createElement("a", { href: "https://saber2pr.top/" }, "saber2pr")))));
	};
	lib.React.render(lib.React.createElement(App, null), document.getElementById("root"));
	});

	var Test$1 = unwrapExports(Test);

	exports.__moduleExports = Test;
	exports.default = Test$1;

	return exports;

}({}));
