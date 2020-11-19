"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (e) {
  function t(o) {
    if (n[o]) return n[o].exports;
    var r = n[o] = {
      i: o,
      l: !1,
      exports: {}
    };
    return e[o].call(r.exports, r, r.exports, t), r.l = !0, r.exports;
  }

  var n = {};
  t.m = e, t.c = n, t.d = function (e, n, o) {
    t.o(e, n) || Object.defineProperty(e, n, {
      enumerable: !0,
      get: o
    });
  }, t.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    });
  }, t.t = function (e, n) {
    if (1 & n && (e = t(e)), 8 & n) return e;
    if (4 & n && "object" == _typeof(e) && e && e.__esModule) return e;
    var o = Object.create(null);
    if (t.r(o), Object.defineProperty(o, "default", {
      enumerable: !0,
      value: e
    }), 2 & n && "string" != typeof e) for (var r in e) {
      t.d(o, r, function (t) {
        return e[t];
      }.bind(null, r));
    }
    return o;
  }, t.n = function (e) {
    var n = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };
    return t.d(n, "a", n), n;
  }, t.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, t.p = "", t(t.s = 261);
}({
  19: function _(e) {
    var t = window.navigator || window.__global.navigator,
        n = window.WebSocket || window.__global.WebSocket,
        o = window.prompt || window.__global.prompt,
        r = t.userAgent.match(/port\/(\d*)/),
        i = "ws://127.0.0.1:".concat(r ? parseInt(r[1]) : 9974);
    var a = 0;

    e.exports =
    /*#__PURE__*/
    function () {
      function _class(e) {
        var _this = this;

        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;

        _classCallCheck(this, _class);

        this._protocol = e, this._needToken = t, this._ws = null, this._msgQueue = [], this._callback = [], "complete" == document.readyState ? setTimeout(function () {
          _this.connect();
        }) : window.addEventListener("load", function () {
          _this.connect();
        });
      }

      _createClass(_class, [{
        key: "connect",
        value: function connect() {
          var _this2 = this;

          if (a++ >= 10) return;
          var e = this._protocol;

          if (this._needToken) {
            e = "".concat(e, "#").concat(o("GET_MESSAGE_TOKEN"), "#");
          }

          this._ws = new n(i, e), this._ws.onopen = function () {
            var e = [].concat(_this2._msgQueue);
            _this2._msgQueue = [], e.forEach(function (e) {
              _this2.send(e);
            });
          }, this._ws.onclose = function () {
            _this2._ws = null, setTimeout(function () {
              _this2.connect();
            }, 100);
          }, this._ws.onmessage = function (e) {
            try {
              var _t = JSON.parse(e.data);

              _this2._callback.forEach(function (e) {
                try {
                  e.call(_this2, _t);
                } catch (e) {}
              });
            } catch (e) {}
          };
        }
      }, {
        key: "send",
        value: function send(e) {
          this._ws && this._ws.readyState === n.OPEN ? this._ws.send(JSON.stringify(e)) : this._msgQueue.push(e);
        }
      }, {
        key: "registerCallback",
        value: function registerCallback(e) {
          "function" == typeof e && this._callback.push(e);
        }
      }]);

      return _class;
    }();
  },
  261: function _(e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var o = n(262),
        r = n(264),
        i = n(265),
        a = n(266),
        c = n(267),
        s = n(268),
        l = n(269),
        d = n(270),
        u = n(271),
        f = n(272),
        p = n(278),
        _ = n(280),
        g = n(281),
        _g$default = g.default,
        m = _g$default.isWebDebugger,
        w = _g$default.isMiniProgramHtmlWebview,
        E = _g$default.isMiniProgram,
        b = _g$default.isAppService,
        v = _g$default.isGame,
        h = _g$default.isIDEPlugin,
        y = _g$default.isSimulatorPlugin,
        O = _g$default.isSubAppWindow;

    u.default(), O || (a.default(), c.default(), s.default()), w && r.default(), m && f.default(), (v || b) && o.default(), (v || E || b) && (l.default(), d.default()), (v || E || w) && i.default(), h && p.default(), y && _.default();
  },
  262: function _(e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = n(263);

    t.default = function () {
      var e = Object.getOwnPropertyNames(window).filter(function (e) {
        return 0 > o.nodeGlobal.indexOf(e);
      });
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = e[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _t4 = _step.value;
          if (o.windowRemain[_t4]) continue;

          var _e3 = Object.getOwnPropertyDescriptor(window, _t4);

          _e3 && !0 !== _e3.configurable || delete window[_t4];
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      for (var _e in document) {
        if (o.documentRemain[_e]) continue;

        var _t2 = Object.getOwnPropertyDescriptor(document, _e);

        _t2 && !0 !== _t2.configurable || (delete document[_e], Object.defineProperty(document, _e, {
          configurable: !0,
          value: void 0
        }));
      }

      for (var _e2 in window.__global.document) {
        if (o.__globalDocumentRemain[_e2]) continue;

        var _t3 = Object.getOwnPropertyDescriptor(window.__global.document, _e2);

        _t3 && !0 !== _t3.configurable || (delete window.__global.document[_e2], Object.defineProperty(window.__global.document, _e2, {
          configurable: !0,
          value: void 0
        }));
      }
    };
  },
  263: function _(e, t) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.windowRemain = {
      parent: !0,
      __global: !0,
      atob: !0,
      onload: !0,
      setTimeout: !0,
      setInterval: !0,
      clearTimeout: !0,
      clearInterval: !0,
      requestAnimationFrame: !0,
      cancelAnimationFrame: !0,
      WebGLRenderingContext: !0,
      innerWidth: !0,
      innerHeight: !0,
      process: !0,
      require: !0,
      navigator: !0,
      self: !0,
      performance: !0,
      webkitURL: !0,
      scrollTo: !0
    }, t.windowCanNotEnumerable = ["XMLHttpRequest", "WebSocket", "Audio", "DOMParser", "AudioContext", "WebGLRenderingContext", "WebAssembly"], t.documentRemain = {
      body: !0,
      createElement: !0,
      createDocumentFragment: !0,
      head: !0
    }, t.nodeGlobal = ["Object", "Function", "Array", "Number", "parseFloat", "parseInt", "Boolean", "String", "Symbol", "Date", "Promise", "RegExp", "Error", "EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "JSON", "Math", "Intl", "ArrayBuffer", "Uint8Array", "Int8Array", "Uint16Array", "Int16Array", "Uint32Array", "Int32Array", "Float32Array", "Float64Array", "Uint8ClampedArray", "DataView", "Map", "Set", "WeakMap", "WeakSet", "Proxy", "Reflect", "Infinity", "NaN", "undefined", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape", "eval", "isFinite", "isNaN", "WebAssembly", "console", "DTRACE_NET_SERVER_CONNECTION", "DTRACE_NET_STREAM_END", "DTRACE_HTTP_SERVER_REQUEST", "DTRACE_HTTP_SERVER_RESPONSE", "DTRACE_HTTP_CLIENT_REQUEST", "DTRACE_HTTP_CLIENT_RESPONSE", "global", "process", "GLOBAL", "root", "Buffer", "clearImmediate", "clearInterval", "clearTimeout", "setImmediate", "setInterval", "setTimeout"], t.__globalDocumentRemain = {
      readyState: !0,
      onreadystatechange: !0,
      createElement: !0,
      getElementById: !0,
      addEventListener: !0,
      getElementsByTagName: !0,
      Image: !0
    }, t.default = {
      windowRemain: t.windowRemain,
      windowCanNotEnumerable: t.windowCanNotEnumerable,
      documentRemain: t.documentRemain,
      nodeGlobal: t.nodeGlobal,
      __globalDocumentRemain: t.__globalDocumentRemain
    };
  },
  264: function _(e, t) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = function () {
      window.__wxjs_environment = "miniprogram";
    };
  },
  265: function _(e, t) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = function () {
      window.addEventListener("contextmenu", function (e) {
        e.preventDefault(), alert("contextmenu:".concat(e.clientX, ":").concat(e.clientX));
      }, !0);
    };
  },
  266: function _(e, t) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = function () {
      document.addEventListener("mousewheel", function (e) {
        e.ctrlKey && e.preventDefault();
      }, {
        passive: !1
      });
    };
  },
  267: function _(e, t) {
    "use strict";

    function n(e) {
      e.preventDefault(), e.stopPropagation();
    }

    function o(e) {
      e.preventDefault(), e.stopPropagation();
    }

    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = !1;

    var i = function i() {
      if (!r) {
        var _e4 = document.body;
        _e4 && (_e4.addEventListener("dragover", n, !1), _e4.addEventListener("drop", o, !1)), r = !0;
      }
    };

    t.default = function () {
      "complete" === document.readyState || "interactive" === document.readyState ? i() : document.onreadystatechange = function () {
        ("interactive" === document.readyState || "complete" === document.readyState) && i();
      };
    };
  },
  268: function _(e, t) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = function () {
      window.addEventListener("message", function (e) {
        var t = e.data;
        t && "object" == _typeof(t) && function (e) {
          if (e && ("geolocation" === e.module || "locationPicker" === e.module)) {
            var _t5 = e;
            "geolocation" === e.module && (_t5 = {
              module: "locationPicker",
              latlng: {
                lat: e.lat,
                lng: e.lng
              },
              poiaddress: "".concat(e.province).concat(e.city),
              poiname: e.addr,
              cityname: e.city
            }), window.__global.alert("map handle:".concat(JSON.stringify(_t5)));
          }
        }(t);
      });
    };
  },
  269: function _(e, t) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = function () {
      var e = console.error.bind(console),
          t = console.warn.bind(console);
      console.error = function () {
        for (var _len = arguments.length, t = new Array(_len), _key = 0; _key < _len; _key++) {
          t[_key] = arguments[_key];
        }

        try {
          if (1 >= t.length) return t[0] instanceof Error && t[0].stack ? e(t[0].stack) : e.apply(void 0, t);

          for (var _i = 0, _t6 = t; _i < _t6.length; _i++) {
            var n = _t6[_i];
            if ("object" == _typeof(n)) return e.apply(void 0, t);
          }

          return e(t.join(" "));
        } catch (n) {
          e.apply(void 0, t);
        }
      }, console.warn = function () {
        for (var _len2 = arguments.length, n = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          n[_key2] = arguments[_key2];
        }

        try {
          if (1 >= n.length) return n[0] instanceof Error && n[0].stack ? e(n[0].stack) : t.apply(void 0, n);

          for (var _i2 = 0, _n = n; _i2 < _n.length; _i2++) {
            var _e5 = _n[_i2];
            if ("object" == _typeof(_e5)) return t.apply(void 0, n);
          }

          return t(n.join(" "));
        } catch (e) {
          t.apply(void 0, n);
        }
      };
    };
  },
  270: function _(e, t) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = function () {
      window.onerror = function (e, t, n, o, r) {
        try {
          return window.__global.WeixinJSBridge.__triggerOnEvent("onError", r), !0;
        } catch (e) {}

        return !1;
      };
    };
  },
  271: function _(e, t) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var n = {
      origin: !0
    },
        o = function o() {},
        r = function r(e, t) {
      for (var _n2 in Object.setPrototypeOf(e, t), t) {
        try {
          e[_n2] = t[_n2];
        } catch (e) {}
      }
    };

    t.default = function () {
      if (location.protocol.startsWith("chrome-extension")) return;
      var e = window.alert,
          t = window.prompt,
          i = XMLHttpRequest,
          a = {
        dialogDisable: !1,
        alert: function alert() {
          if (!window.__global.dialogDisable) return e.apply(window, arguments);
        },
        prompt: function prompt() {
          if (!window.__global.dialogDisable) return t.apply(window, arguments);
        },
        parent: window.parent,
        Worker: Worker,
        WebSocket: WebSocket,
        XMLHttpRequest: i,
        FileReader: FileReader,
        atob: window.atob.bind(window),
        btoa: window.btoa.bind(window),
        requestAnimationFrame: window.requestAnimationFrame,
        cancelAnimationFrame: window.cancelAnimationFrame,
        setTimeout: setTimeout,
        clearTimeout: clearTimeout,
        setInterval: setInterval,
        CustomEvent: CustomEvent,
        clearInterval: clearInterval,
        Image: Image,
        Audio: Audio,
        navigator: navigator,
        addEventListener: window.addEventListener.bind(window),
        removeEventListener: window.removeEventListener.bind(window),
        canvasProto: {},
        canvasWebGlContextProto: {},
        canvas2dContextProto: {},
        history: window.history,
        networkLog: function networkLog(e) {
          var t = JSON.stringify(e),
              n = new i();
          n.addEventListener("load", function () {}), n.addEventListener("error", o), n.open(e.method || "POST", "/networklog/".concat(e.type, "/").concat(e.reqId), !0), n.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), e.timestampMs && n.setRequestHeader("x-timestamp-ms", e.timestampMs.toString()), n.send(t);
        },
        createCustomImage: function createCustomImage(e, t) {
          var n = "";
          var o = window.__global.Image;
          return new (
          /*#__PURE__*/
          function (_o) {
            _inherits(_class2, _o);

            function _class2() {
              _classCallCheck(this, _class2);

              return _possibleConstructorReturn(this, _getPrototypeOf(_class2).apply(this, arguments));
            }

            _createClass(_class2, [{
              key: "src",
              set: function set(t) {
                var o = e(t);
                n = o, _set(_getPrototypeOf(_class2.prototype), "src", o, this, true);
              },
              get: function get() {
                return t(n);
              }
            }]);

            return _class2;
          }(o))();
        },
        document: {}
      },
          c = document.createElement("canvas"),
          s = document.createElement("canvas"),
          l = c.getContext("2d"),
          d = s.getContext("webgl");

      try {
        r(a.canvasProto, Object.getPrototypeOf(c));
      } catch (e) {}

      try {
        r(a.canvasWebGlContextProto, Object.getPrototypeOf(d));
      } catch (e) {}

      try {
        r(a.canvas2dContextProto, Object.getPrototypeOf(l));
      } catch (e) {}

      for (var _t7 in window.document) {
        if (!n[_t7]) try {
          a.document[_t7] = "function" == typeof window.document[_t7] ? window.document[_t7].bind(document) : window.document[_t7];
        } catch (e) {}
      }

      window.__global = a;
    };
  },
  272: function _(e, t, n) {
    "use strict";

    function o() {
      (function () {
        var e = ["ontouchstart", "ontouchend", "ontouchmove", "ontouchcancel"],
            t = [window.__proto__, document.__proto__];

        for (var _i3 = 0, _e6 = e; _i3 < _e6.length; _i3++) {
          var _n3 = _e6[_i3];
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = t[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _e7 = _step2.value;
              _n3 in _e7 || Object.defineProperty(_e7, _n3, {
                value: null,
                writable: !0,
                configurable: !0,
                enumerable: !0
              });
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      })(), window.WeixinJSBridge = r.default();
      var e = document.createEvent("UIEvent");
      e.initEvent("WeixinJSBridgeReady", !1, !1), document.dispatchEvent(e);
    }

    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = n(273);

    t.default = function () {
      "complete" === document.readyState ? o() : window.addEventListener("load", function () {
        o();
      });
    };
  },
  273: function _(e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var o = n(274),
        r = n(277),
        i = function i() {
      console.error("WeixinJSBridge.call 不被支持，请参考 http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html 进行正确调用");
    },
        a = function a(e) {
      console.log(e);
    };

    t.default = function () {
      return {
        invoke: o.default(),
        on: r.default(),
        call: i,
        log: a
      };
    };
  },
  274: function _(e, t, n) {
    "use strict";

    function o(e, t, n) {
      if (!/^__sys/.test(e)) {
        if ("shareTimeline" === e || "sendAppMessage" === e) {
          var _t8 = "shareTimeline" === e ? "onMenuShareTimeline" : "onMenuShareAppMessage",
              _n4 = "shareTimeline" === e ? "updateTimelineShareData" : "updateAppMessageShareData";

          console.warn("wx.".concat(_t8, " is about to be abandoned, please use wx.").concat(_n4, ". See https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#10 for more detail."));
        }

        console.group("".concat(new Date(), " wx.").concat(i.default.getSdkDisplayName(e), " begin")), console.info(i.default.getSdkArgs(e, t)), console.groupEnd();

        var _o2 = c++;

        a[_o2] = {
          api: e,
          cb: n
        }, r.default.send({
          command: "WEBDEBUGGER_INVOKE",
          data: {
            api: e,
            args: t,
            callbackID: _o2
          }
        });
      }
    }

    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = n(67),
        i = n(275),
        a = {};
    var c = 1,
        s = !1;

    t.default = function () {
      return s || (s = !0, r.default.registerCallback(function (e) {
        var t = e.command,
            n = e.data;

        if ("WEBDEBUGGER_INVOKE_CALLBACK" === t) {
          var _e8 = n.callbackID,
              _t9 = a[_e8];

          if (_t9 && "function" == typeof _t9.cb) {
            var _e9 = _t9.api,
                _o3 = n.res,
                _r = n.ext;

            if (console.group("".concat(new Date(), " wx.").concat(i.default.getSdkDisplayName(_e9), " end")), console.info(i.default.getSdkArgs(_e9, _o3)), console.groupEnd(), "preVerifyJSAPI" === _e9 && /^config:ok/.test(_o3.errMsg)) {
              var _e10 = _r.args.verifyJsApiList || [],
                  _t10 = _r.sdkResExt,
                  _n5 = [];

              var _o4 = [];
              _e10.forEach(function (e) {
                (_t10.defaultPurview[e] || _t10.purviewFormGetA8key[e] || _t10.purviewFromPreVerify[e]) && (0 === _o4.length ? _n5.push(_o4) : 6 === _o4.length && (_o4 = [], _n5.push(_o4)), _o4.push(i.default.getSdkDisplayName(e)));
              }), console.group("".concat(new Date(), " \u5F53\u524D\u9875\u9762\u901A\u8FC7 wx.config \u83B7\u53D6\u5230\u7684 JSSDK \u6743\u9650\u5982\u4E0B")), console.table(_n5), console.groupEnd();
            }

            "function" == typeof _t9.cb && _t9.cb(_o3);
          }

          delete a[_e8];
        } else "WEBDEBUGGER_GET_TITLE" === t && self === top && r.default.send({
          command: "WEBDEBUGGER_GET_TITLE_RES",
          data: {
            title: document.title
          }
        });
      })), o;
    };
  },
  275: function _(e, t, n) {
    "use strict";

    function o(e) {
      return r.default.sdkDisplayName[e] || e;
    }

    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = n(276);
    t.default = {
      getSdkArgs: function getSdkArgs(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var n = JSON.parse(JSON.stringify(t));
        if (delete n.verifyAppId, "preVerifyJSAPI" === e) n.jsApiList = n.verifyJsApiList || [], n.jsApiList.forEach(function (e, t) {
          n.jsApiList[t] = o(e);
        }), n.verifyNonceStr && (n.nonceStr = n.verifyNonceStr), n.verifySignature && (n.signature = n.verifySignature), n.verifyTimestamp && (n.timestamp = n.verifyTimestamp), delete n.verifyJsApiList, delete n.verifyNonceStr, delete n.verifySignature, delete n.verifyTimestamp, delete n.verifySignType;else for (var _e11 in t) {
          r.default.doNotDisplayArgsConfig[_e11] && delete n[_e11];
        }
        return n;
      },
      getSdkDisplayName: o
    };
  },
  276: function _(e, t) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = {
      sdkDisplayName: {
        shareTimeline: "onMenuShareTimeline",
        sendAppMessage: "onMenuShareAppMessage",
        shareQQ: "onMenuShareQQ",
        shareWeiboApp: "onMenuShareWeibo",
        shareQZone: "onMenuShareQZone",
        "menu:share:timeline": "onMenuShareTimeline",
        "menu:share:appmessage": "onMenuShareAppMessage",
        "menu:share:qq": "onMenuShareQQ",
        "menu:share:weiboApp": "onMenuShareWeibo",
        "menu:share:QZone": "onMenuShareQZone",
        preVerifyJSAPI: "config",
        imagePreview: "previewImage",
        geoLocation: "getLocation",
        openProductViewWithPid: "openProductSpecificView",
        batchAddCard: "addCard",
        batchViewCard: "openCard",
        getBrandWCPayRequest: "chooseWXPay",
        showPickerView: "showPickerView",
        showDatePickerView: "showDatePickerView"
      },
      doNotDisplayArgsConfig: {
        appId: !0,
        verifyAppId: !0,
        verifyNonceStr: !0,
        verifySignType: !0,
        verifySignature: !0,
        verifyTimestamp: !0,
        origin: !0,
        webviewId: !0,
        __isFromOn__: !0,
        __domain__: !0,
        __url__: !0
      }
    };
  },
  277: function _(e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = n(67),
        r = {};
    var i = !1;

    t.default = function () {
      return i || (i = !0, o.default.registerCallback(function (e) {
        var t = e.command,
            n = e.data;

        if ("WEBDEBUGGER_ON_EVENT" === t) {
          var _e12 = r[n.eventName];
          "function" == typeof _e12 && _e12(n.data);
        }
      })), function (e, t) {
        r[e] = t;
      };
    };
  },
  278: function _(e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = n(68),
        r = n(69),
        i = n(279);

    t.default = function () {
      var e = window.navigator.userAgent.match(/pluginid\/(\S*)/),
          t = e ? e[1] : "";
      t && (Object.defineProperty(window, "wechatide", {
        value: new o.default(t),
        writable: !1,
        enumerable: !1,
        configurable: !1
      }), Object.defineProperty(window, "pluginStorage", {
        value: new r.default(),
        writable: !1,
        enumerable: !1,
        configurable: !1
      }), Object.defineProperty(window, "logger", {
        value: new i.default(t),
        writable: !1,
        enumerable: !1,
        configurable: !1
      }), window.dispatchEvent(new CustomEvent("wechatideReady", {
        detail: window.wechatide
      })), window.dispatchEvent(new CustomEvent("pluginStorageReady", {
        detail: window.pluginStorage
      })));
    };
  },
  279: function _(e, t) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default =
    /*#__PURE__*/
    function () {
      function _class3(e) {
        _classCallCheck(this, _class3);

        this.pluginId = e;
      }

      _createClass(_class3, [{
        key: "error",
        value: function error() {
          for (var _len3 = arguments.length, e = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            e[_key3] = arguments[_key3];
          }

          window.wechatide.invoke("PLUGIN_LOGGER_ERROR", {
            msg: e || [],
            pluginId: this.pluginId
          });
        }
      }, {
        key: "info",
        value: function info() {
          for (var _len4 = arguments.length, e = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            e[_key4] = arguments[_key4];
          }

          window.wechatide.invoke("PLUGIN_LOGGER_INFO", {
            msg: e || [],
            pluginId: this.pluginId
          });
        }
      }]);

      return _class3;
    }();
  },
  280: function _(e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = n(68),
        r = n(69),
        i = {
      APPSERVICE: {
        onBeforeInvoke: "APPSERVICE_ON_BEFORE_INVOKE",
        offBeforeInvoke: "APPSERVICE_OFF_BEFORE_INVOKE",
        onAfterInvoke: "APPSERVICE_ON_AFTER_INVOKE",
        offAfterInvoke: "APPSERVICE_OFF_AFTER_INVOKE",
        onBeforeTriggerEvent: "APPSERVICE_ON_BEFORE_TRIGGER_EVENT",
        offBeforeTriggerEvent: "APPSERVICE_OFF_BEFORE_TRIGGER_EVENT",
        onAfterTriggerEvent: "APPSERVICE_ON_AFTER_TRIGGER_EVENT",
        offAfterTriggerEvent: "APPSERVICE_OFF_AFTER_TRIGGER_EVENT"
      },
      WEBVIEW: {
        onBeforeInvoke: "WEBVIEW_ON_BEFORE_INVOKE",
        offBeforeInvoke: "WEBVIEW_OFF_BEFORE_INVOKE",
        onAfterInvoke: "WEBVIEW_ON_AFTER_INVOKE",
        offAfterInvoke: "WEBVIEW_OFF_AFTER_INVOKE",
        onBeforeTriggerEvent: "WEBVIEW_ON_BEFORE_TRIGGER_EVENT",
        offBeforeTriggerEvent: "WEBVIEW_OFF_BEFORE_TRIGGER_EVENT",
        onAfterTriggerEvent: "WEBVIEW_ON_AFTER_TRIGGER_EVENT",
        offAfterTriggerEvent: "WEBVIEW_OFF_AFTER_TRIGGER_EVENT"
      }
    };

    var a =
    /*#__PURE__*/
    function (_o$default) {
      _inherits(a, _o$default);

      function a(e) {
        var _this3;

        _classCallCheck(this, a);

        _this3 = _possibleConstructorReturn(this, _getPrototypeOf(a).call(this, e)), _this3.callbackCounter = 1, _this3.callbackMap = {}, _this3.__messager.registerCallback(function (e) {
          var t = e.command,
              n = e.data;

          if ("SIMULATOR_PLUGIN_HOOK_CALLBACK" === t) {
            var _e13 = n.callbackID,
                _t11 = n.args,
                _o5 = n.eventName;

            var _r2;

            _r2 = _o5 ? _this3.callbackMap[_e13].cb(_o5, _t11) : _this3.callbackMap[_e13].cb(_t11), Promise.resolve(_r2).then(function (t) {
              t && _this3.__messager.send({
                command: "SIMULATOR_PLUGIN_HOOK_CALLBACK_RETURN",
                data: t,
                callbackID: _e13
              });
            });
          }
        });
        return _this3;
      }

      _createClass(a, [{
        key: "wrapCallback",
        value: function wrapCallback(e, t, n) {
          n = "function" == typeof n ? n : function () {}, this.deleteFromCallbackMap(e, t);
          var o = this.callbackCounter;
          return this.callbackMap[o] = {
            cb: n,
            type: e,
            api: t
          }, this.callbackCounter++, o;
        }
      }, {
        key: "deleteFromCallbackMap",
        value: function deleteFromCallbackMap(e, t) {
          for (var _n6 in this.callbackMap) {
            if (this.callbackMap[_n6].type === e && this.callbackMap[_n6].api === t) {
              delete this.callbackMap[_n6];
              break;
            }
          }
        }
      }, {
        key: "recordOffMethod",
        value: function recordOffMethod(e, t) {
          var _t12 = _slicedToArray(t, 2),
              n = _t12[0],
              o = _t12[1],
              r = e.split("_");

          r[1] = "ON";
          var i = r.join("_");
          this.deleteFromCallbackMap(i, n), this.invoke(e, {
            api: n,
            options: o
          });
        }
      }, {
        key: "recordOnMethod",
        value: function recordOnMethod(e, t) {
          var _t13 = _slicedToArray(t, 3),
              n = _t13[0],
              o = _t13[1],
              r = _t13[2];

          this.invoke(e, {
            callbackID: this.wrapCallback(e, n, r),
            api: n,
            options: o
          });
        }
      }, {
        key: "simulator",
        get: function get() {
          return {
            appservice: this.appservice,
            webview: this.webview
          };
        }
      }, {
        key: "appservice",
        get: function get() {
          var _this4 = this;

          var e = i.APPSERVICE;
          return {
            onBeforeInvoke: function onBeforeInvoke() {
              for (var _len5 = arguments.length, t = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                t[_key5] = arguments[_key5];
              }

              _this4.recordOnMethod(e.onBeforeInvoke, t);
            },
            offBeforeInvke: function offBeforeInvke() {
              for (var _len6 = arguments.length, t = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                t[_key6] = arguments[_key6];
              }

              _this4.recordOffMethod(e.offBeforeInvoke, t);
            },
            onAfterInvoke: function onAfterInvoke() {
              for (var _len7 = arguments.length, t = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                t[_key7] = arguments[_key7];
              }

              _this4.recordOnMethod(e.onAfterInvoke, t);
            },
            offAfterInvoke: function offAfterInvoke() {
              for (var _len8 = arguments.length, t = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                t[_key8] = arguments[_key8];
              }

              _this4.recordOffMethod(e.offAfterInvoke, t);
            },
            onBeforeTriggerEvent: function onBeforeTriggerEvent() {
              for (var _len9 = arguments.length, t = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                t[_key9] = arguments[_key9];
              }

              _this4.recordOnMethod(e.onBeforeTriggerEvent, t);
            },
            offBeforeTriggerEvent: function offBeforeTriggerEvent() {
              for (var _len10 = arguments.length, t = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                t[_key10] = arguments[_key10];
              }

              _this4.recordOffMethod(e.offBeforeTriggerEvent, t);
            },
            onAfterTriggerEvent: function onAfterTriggerEvent() {
              for (var _len11 = arguments.length, t = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
                t[_key11] = arguments[_key11];
              }

              _this4.recordOnMethod(e.onAfterTriggerEvent, t);
            },
            offAfterTriggerEvent: function offAfterTriggerEvent() {
              for (var _len12 = arguments.length, t = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
                t[_key12] = arguments[_key12];
              }

              _this4.recordOffMethod(e.offAfterTriggerEvent, t);
            }
          };
        }
      }, {
        key: "webview",
        get: function get() {
          var _this5 = this;

          var e = i.WEBVIEW;
          return {
            onBeforeInvoke: function onBeforeInvoke() {
              for (var _len13 = arguments.length, t = new Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
                t[_key13] = arguments[_key13];
              }

              _this5.recordOnMethod(e.onBeforeInvoke, t);
            },
            offBeforeInvke: function offBeforeInvke() {
              for (var _len14 = arguments.length, t = new Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
                t[_key14] = arguments[_key14];
              }

              _this5.recordOffMethod(e.offBeforeInvoke, t);
            },
            onAfterInvoke: function onAfterInvoke() {
              for (var _len15 = arguments.length, t = new Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
                t[_key15] = arguments[_key15];
              }

              _this5.recordOnMethod(e.onAfterInvoke, t);
            },
            offAfterInvoke: function offAfterInvoke() {
              for (var _len16 = arguments.length, t = new Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
                t[_key16] = arguments[_key16];
              }

              _this5.recordOffMethod(e.offAfterInvoke, t);
            },
            onBeforeTriggerEvent: function onBeforeTriggerEvent() {
              for (var _len17 = arguments.length, t = new Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
                t[_key17] = arguments[_key17];
              }

              _this5.recordOnMethod(e.onBeforeTriggerEvent, t);
            },
            offBeforeTriggerEvent: function offBeforeTriggerEvent() {
              for (var _len18 = arguments.length, t = new Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
                t[_key18] = arguments[_key18];
              }

              _this5.recordOffMethod(e.offBeforeTriggerEvent, t);
            },
            onAfterTriggerEvent: function onAfterTriggerEvent() {
              for (var _len19 = arguments.length, t = new Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
                t[_key19] = arguments[_key19];
              }

              _this5.recordOnMethod(e.onAfterTriggerEvent, t);
            },
            offAfterTriggerEvent: function offAfterTriggerEvent() {
              for (var _len20 = arguments.length, t = new Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {
                t[_key20] = arguments[_key20];
              }

              _this5.recordOffMethod(e.offAfterTriggerEvent, t);
            }
          };
        }
      }]);

      return a;
    }(o.default);

    t.default = function () {
      var e = window.navigator.userAgent.match(/pluginid\/(\S*)/),
          t = e ? e[1] : "";
      t && (Object.defineProperty(window, "wechatide", {
        value: new a(t),
        writable: !1,
        enumerable: !1,
        configurable: !1
      }), Object.defineProperty(window, "pluginStorage", {
        value: new r.default(),
        writable: !1,
        enumerable: !1,
        configurable: !1
      }), window.dispatchEvent(new CustomEvent("wechatideReady", {
        detail: window.wechatide
      })), window.dispatchEvent(new CustomEvent("pluginStorageReady", {
        detail: window.pluginStorage
      })));
    };
  },
  281: function _(e, t) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = navigator.userAgent || "",
        o = 0 < n.indexOf(" webdebugger "),
        r = 0 < n.indexOf(" miniprogramhtmlwebview "),
        i = 0 < n.indexOf(" miniprogram "),
        a = 0 < n.indexOf(" gameservice "),
        c = 0 < n.indexOf(" appservice "),
        s = 0 < n.indexOf(" wechatideplugin "),
        l = 0 < n.indexOf(" simulatorplugin "),
        d = /^chrome-extension:\/\/\w+\/html\/subapp-window.html/.test(location.href);
    t.default = {
      isWebDebugger: o,
      isMiniProgramHtmlWebview: r,
      isMiniProgram: i,
      isAppService: c,
      isGame: a,
      isIDEPlugin: s,
      isSimulatorPlugin: l,
      isSubAppWindow: d
    };
  },
  67: function _(e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = n(19),
        r = navigator.userAgent.match(/webview\/([\w]*)/),
        i = r ? r[1] : "",
        a = "".concat(Date.now()).concat(Math.floor(1e4 * Math.random()));
    var c;

    var s = function s() {
      if (c) return c;
      return c = new o("WEBDEBUGGER_".concat(a));
    };

    t.default = {
      send: function send(e) {
        e.webviewID = i, e.runtimeID = a, s().send(e);
      },
      registerCallback: function registerCallback(e) {
        s().registerCallback(e);
      }
    };
  },
  68: function _(e, t, n) {
    "use strict";

    function o(e, t) {
      var n = i();
      return this.__callbackMap[n] = {
        callback: e,
        resolve: t
      }, n;
    }

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var r = n(19),
        i = function () {
      var e = 1;
      return function () {
        return e++;
      };
    }();

    t.default =
    /*#__PURE__*/
    function () {
      function _class4(e) {
        var _this6 = this;

        _classCallCheck(this, _class4);

        this.__callbackMap = {}, this.__onEvent = {}, Object.defineProperty(this, "__callbackMap", {
          value: {},
          writable: !1,
          enumerable: !1,
          configurable: !1
        }), Object.defineProperty(this, "__onEvent", {
          value: {},
          writable: !1,
          enumerable: !1,
          configurable: !1
        }), Object.defineProperty(this, "__messager", {
          value: new r("PLUGIN_".concat(e)),
          writable: !1,
          enumerable: !1,
          configurable: !1
        }), this.__messager.registerCallback(function (e) {
          var t = e.command,
              n = e.data;

          if ("INVOKE_CALLBACK" === t) {
            var _e14 = n.callbackID,
                _t14 = n.res,
                _o6 = _this6.__callbackMap[_e14];
            _o6 && ("function" == typeof _o6.callback && _o6.callback(_t14), "function" == typeof _o6.resolve && _o6.resolve(_t14)), delete _this6.__callbackMap[_e14];
          }

          if ("ON_EVENT" === t) {
            var _e15 = n.eventName,
                _t15 = n.res,
                _o7 = _this6.__onEvent[_e15];
            "function" == typeof _o7 && _o7(_t15);
          }
        });
      }

      _createClass(_class4, [{
        key: "invoke",
        get: function get() {
          var _this7 = this;

          return function (e, t, n) {
            return new Promise(function (r) {
              n = "function" == typeof n ? n : function () {}, _this7.__messager.send({
                command: e,
                data: t,
                callbackID: o.call(_this7, n, r)
              });
            });
          };
        }
      }, {
        key: "on",
        get: function get() {
          var _this8 = this;

          return function (e, t) {
            _this8.__onEvent[e] = t;
          };
        }
      }]);

      return _class4;
    }();
  },
  69: function _(e, t) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default =
    /*#__PURE__*/
    function () {
      function _class5() {
        _classCallCheck(this, _class5);
      }

      _createClass(_class5, [{
        key: "getItem",
        value: function getItem(e) {
          return regeneratorRuntime.async(function getItem$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return regeneratorRuntime.awrap(window.wechatide.invoke("PLUGIN_STORAGE_GET_ITEM", {
                    key: e
                  }));

                case 2:
                  return _context.abrupt("return", _context.sent.value);

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          });
        }
      }, {
        key: "setItem",
        value: function setItem(e, t) {
          return regeneratorRuntime.async(function setItem$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return regeneratorRuntime.awrap(window.wechatide.invoke("PLUGIN_STORAGE_SET_ITEM", {
                    key: e,
                    value: t
                  }));

                case 2:
                case "end":
                  return _context2.stop();
              }
            }
          });
        }
      }, {
        key: "removeItem",
        value: function removeItem(e) {
          return regeneratorRuntime.async(function removeItem$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return regeneratorRuntime.awrap(window.wechatide.invoke("PLUGIN_STORAGE_REMOVE_ITEM", {
                    key: e
                  }));

                case 2:
                case "end":
                  return _context3.stop();
              }
            }
          });
        }
      }]);

      return _class5;
    }();
  }
});

