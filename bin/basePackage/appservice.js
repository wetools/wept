"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (e) {
  function t(n) {
    if (o[n]) return o[n].exports;
    var r = o[n] = {
      i: n,
      l: !1,
      exports: {}
    };
    return e[n].call(r.exports, r, r.exports, t), r.l = !0, r.exports;
  }

  var o = {};
  t.m = e, t.c = o, t.d = function (e, o, n) {
    t.o(e, o) || Object.defineProperty(e, o, {
      enumerable: !0,
      get: n
    });
  }, t.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    });
  }, t.t = function (e, o) {
    if (1 & o && (e = t(e)), 8 & o) return e;
    if (4 & o && "object" == _typeof(e) && e && e.__esModule) return e;
    var n = Object.create(null);
    if (t.r(n), Object.defineProperty(n, "default", {
      enumerable: !0,
      value: e
    }), 2 & o && "string" != typeof e) for (var r in e) {
      t.d(n, r, function (t) {
        return e[t];
      }.bind(null, r));
    }
    return n;
  }, t.n = function (e) {
    var o = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };
    return t.d(o, "a", o), o;
  }, t.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, t.p = "", t(t.s = 203);
}({
  20: function _(e) {
    "use strict";

    window.__devtoolsConfig = window.__devtoolsConfig || {
      setting: {}
    }, window.__wxConfig = window.__wxConfig || {};
    var t = {
      getSystemInfo: !0,
      getBatteryInfo: !0,
      getBackgroundAudioState: !0,
      setBackgroundAudioState: !0,
      operateBackgroundAudio: !0,
      createRequestTask: !0,
      createUploadTask: !0,
      createDownloadTask: !0,
      createSocketTask: !0,
      operateSocketTask: !0,
      createAudioInstance: !0,
      unlink: !0,
      createLoadSubPackageTask: !0,
      getMenuButtonBoundingClientRect: !0,
      getPermissionBytes: !0,
      createUDPSocket: !0,
      bindUDPSocket: !0
    },
        o = __devtoolsConfig,
        n = o.network || {},
        r = o.permission,
        s = o.setting && o.setting.MaxDataSize || 1048576,
        i = o.setting && o.setting.MaxRequestConcurrent || 10,
        a = o.setting && o.setting.MaxWebsocketConnect || 10;
    e.exports = {
      syncSDKList: t,
      isSyncSDK: function isSyncSDK(e) {
        return !!t[e] || /Sync$/.test(e);
      },
      DevtoolsConfig: o,
      NetworkConfig: n,
      Permission: r,
      AppserviceMaxDataSize: s,
      MaxRequestConcurrent: i,
      MaxWebsocketConnect: a,
      urlCheckErrReason: "url not in domain list",
      needTransArgsBase64Api: {
        encodeArrayBufferSync: !0,
        decodeArrayBufferSync: !0
      },
      canNotReadFromCodePackage: {
        js: !0,
        wxss: !0,
        wxml: !0
      }
    };
  },
  203: function _(e, t, o) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = o(20),
        r = o(204),
        s = o(207),
        i = o(218),
        a = o(219),
        c = o(220),
        u = o(24);
    -1 !== u.navigator.userAgent.indexOf("game") || c(), window.__global.getNewWeixinJSBridge = function () {
      var _s = s(),
          e = _s.invoke,
          _i = i(),
          t = _i.publish,
          _a = a(),
          o = _a.subscribe,
          n = _a.triggerSubscribeEvent,
          _r = r(),
          c = _r.on,
          u = _r.triggerOnEvent;

      return {
        invoke: e,
        publish: t,
        subscribe: o,
        on: c,

        get __triggerOnEvent() {
          return u;
        },

        get __triggerSubscribeEvent() {
          return n;
        }

      };
    }, window.WeixinJSBridge = window.__global.WeixinJSBridge = window.__global.getNewWeixinJSBridge("global"), window.__global.WeixinJSBridgeMap = {
      __globalBridge: window.WeixinJSBridge
    }, n.DevtoolsConfig.online && n.DevtoolsConfig.autoTest && setInterval(function () {
      console.clear();
    }, 1e4), function () {
      try {
        var _e = new u.XMLHttpRequest();

        _e.responseType = "text", _e.open("GET", "/calibration/".concat(Date.now()), !0), _e.send();
      } catch (e) {}
    }();
  },
  204: function _(e, t, o) {
    "use strict";

    function n(e, t, o) {
      var n = c[e];
      "function" == typeof n && n(t, o);
    }

    function r(e, t) {
      s.debugLog("".concat(new Date(), " WeixinJSBridge on ").concat(e), arguments), s.debugInfo({
        type: "on",
        eventName: e,
        data: arguments,
        timesmap: new Date()
      }), t && (c[e] = t);
    }

    var s = o(25),
        i = o(31),
        a = o(37),
        c = {};
    var u = !1;

    e.exports = function () {
      return u || (u = !0, i.registerCallback(function (e) {
        var t = e.command,
            o = e.data,
            r = e.webviewID;
        "APPSERVICE_ON_EVENT" === t && n(o.eventName, o.data, r);
      })), a.on("triggerOnEvent", function (e, t, o) {
        i.send({
          command: "APPSERVICE_ON_EVENT_TO_AUDITS",
          eventName: e,
          data: t
        }), n(e, t, o);
      }), window.DeviceOrientation = function (e, t, o) {
        n("onAccelerometerChange", {
          x: e,
          y: t,
          z: o
        });
      }, {
        on: r,
        triggerOnEvent: n
      };
    };
  },
  205: function _(e, t, o) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var n = o(31),
        r = function r() {
      return void n.send({
        command: "SYSTEM",
        data: {
          api: "build"
        }
      });
    };

    Object.defineProperty(window, "build", {
      get: function get() {
        return r(), r;
      }
    });

    var s = function s() {
      return void n.send({
        command: "SYSTEM",
        data: {
          api: "preview"
        }
      });
    };

    Object.defineProperty(window, "preview", {
      get: function get() {
        return console.log("loading..."), s(), s;
      }
    });

    var i = function i() {
      return void n.send({
        command: "SYSTEM",
        data: {
          api: "upload"
        }
      });
    };

    Object.defineProperty(window, "upload", {
      get: function get() {
        return i(), i;
      }
    });
  },
  206: function _(e) {
    "use strict";

    function t() {
      t.init.call(this);
    }

    function o(e) {
      return void 0 === e._maxListeners ? t.defaultMaxListeners : e._maxListeners;
    }

    function n(e, t, n, r) {
      var s, i, a;
      if ("function" != typeof n) throw new TypeError('The "listener" argument must be of type Function. Received type ' + _typeof(n));
      if (void 0 === (i = e._events) ? (i = e._events = Object.create(null), e._eventsCount = 0) : (void 0 !== i.newListener && (e.emit("newListener", t, n.listener ? n.listener : n), i = e._events), a = i[t]), void 0 === a) a = i[t] = n, ++e._eventsCount;else if ("function" == typeof a ? a = i[t] = r ? [n, a] : [a, n] : r ? a.unshift(n) : a.push(n), 0 < (s = o(e)) && a.length > s && !a.warned) {
        a.warned = !0;
        var c = new Error("Possible EventEmitter memory leak detected. " + a.length + " " + t + " listeners added. Use emitter.setMaxListeners() to increase limit");
        c.name = "MaxListenersExceededWarning", c.emitter = e, c.type = t, c.count = a.length, function (e) {
          console && console.warn && console.warn(e);
        }(c);
      }
      return e;
    }

    function r(e, t, o) {
      var n = {
        fired: !1,
        wrapFn: void 0,
        target: e,
        type: t,
        listener: o
      },
          r = function () {
        for (var e = [], t = 0; t < arguments.length; t++) {
          e.push(arguments[t]);
        }

        this.fired || (this.target.removeListener(this.type, this.wrapFn), this.fired = !0, l(this.listener, this.target, e));
      }.bind(n);

      return r.listener = o, n.wrapFn = r, r;
    }

    function s(e, t, o) {
      var n = e._events;
      if (void 0 === n) return [];
      var r = n[t];
      return void 0 === r ? [] : "function" == typeof r ? o ? [r.listener || r] : [r] : o ? function (e) {
        for (var t = Array(e.length), o = 0; o < t.length; ++o) {
          t[o] = e[o].listener || e[o];
        }

        return t;
      }(r) : a(r, r.length);
    }

    function i(e) {
      var t = this._events;

      if (void 0 !== t) {
        var o = t[e];
        if ("function" == typeof o) return 1;
        if (void 0 !== o) return o.length;
      }

      return 0;
    }

    function a(e, t) {
      for (var o = Array(t), n = 0; n < t; ++n) {
        o[n] = e[n];
      }

      return o;
    }

    var c,
        u = "object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) ? Reflect : null,
        l = u && "function" == typeof u.apply ? u.apply : function (e, t, o) {
      return Function.prototype.apply.call(e, t, o);
    };
    c = u && "function" == typeof u.ownKeys ? u.ownKeys : Object.getOwnPropertySymbols ? function (e) {
      return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
    } : function (e) {
      return Object.getOwnPropertyNames(e);
    };

    var d = Number.isNaN || function (e) {
      return e != e;
    };

    e.exports = t, t.EventEmitter = t, t.prototype._events = void 0, t.prototype._eventsCount = 0, t.prototype._maxListeners = void 0;
    var f = 10;
    Object.defineProperty(t, "defaultMaxListeners", {
      enumerable: !0,
      get: function get() {
        return f;
      },
      set: function set(e) {
        if ("number" != typeof e || 0 > e || d(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
        f = e;
      }
    }), t.init = function () {
      (void 0 === this._events || this._events === Object.getPrototypeOf(this)._events) && (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
    }, t.prototype.setMaxListeners = function (e) {
      if ("number" != typeof e || 0 > e || d(e)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
      return this._maxListeners = e, this;
    }, t.prototype.getMaxListeners = function () {
      return o(this);
    }, t.prototype.emit = function (e) {
      for (var t = [], o = 1; o < arguments.length; o++) {
        t.push(arguments[o]);
      }

      var n = "error" === e,
          r = this._events;
      if (void 0 !== r) n = n && void 0 === r.error;else if (!n) return !1;

      if (n) {
        var s;
        if (0 < t.length && (s = t[0]), s instanceof Error) throw s;
        var i = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
        throw i.context = s, i;
      }

      var c = r[e];
      if (void 0 === c) return !1;
      if ("function" == typeof c) l(c, this, t);else {
        var u = c.length,
            d = a(c, u);

        for (o = 0; o < u; ++o) {
          l(d[o], this, t);
        }
      }
      return !0;
    }, t.prototype.addListener = function (e, t) {
      return n(this, e, t, !1);
    }, t.prototype.on = t.prototype.addListener, t.prototype.prependListener = function (e, t) {
      return n(this, e, t, !0);
    }, t.prototype.once = function (e, t) {
      if ("function" != typeof t) throw new TypeError('The "listener" argument must be of type Function. Received type ' + _typeof(t));
      return this.on(e, r(this, e, t)), this;
    }, t.prototype.prependOnceListener = function (e, t) {
      if ("function" != typeof t) throw new TypeError('The "listener" argument must be of type Function. Received type ' + _typeof(t));
      return this.prependListener(e, r(this, e, t)), this;
    }, t.prototype.removeListener = function (e, t) {
      var o, n, r, s, i;
      if ("function" != typeof t) throw new TypeError('The "listener" argument must be of type Function. Received type ' + _typeof(t));
      if (void 0 === (n = this._events)) return this;
      if (void 0 === (o = n[e])) return this;
      if (o === t || o.listener === t) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete n[e], n.removeListener && this.emit("removeListener", e, o.listener || t));else if ("function" != typeof o) {
        for (r = -1, s = o.length - 1; 0 <= s; s--) {
          if (o[s] === t || o[s].listener === t) {
            i = o[s].listener, r = s;
            break;
          }
        }

        if (0 > r) return this;
        0 === r ? o.shift() : function (e, t) {
          for (; t + 1 < e.length; t++) {
            e[t] = e[t + 1];
          }

          e.pop();
        }(o, r), 1 === o.length && (n[e] = o[0]), void 0 !== n.removeListener && this.emit("removeListener", e, i || t);
      }
      return this;
    }, t.prototype.off = t.prototype.removeListener, t.prototype.removeAllListeners = function (e) {
      var t, o, n;
      if (void 0 === (o = this._events)) return this;
      if (void 0 === o.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== o[e] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete o[e]), this;

      if (0 === arguments.length) {
        var r,
            s = Object.keys(o);

        for (n = 0; n < s.length; ++n) {
          "removeListener" === (r = s[n]) || this.removeAllListeners(r);
        }

        return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this;
      }

      if ("function" == typeof (t = o[e])) this.removeListener(e, t);else if (void 0 !== t) for (n = t.length - 1; 0 <= n; n--) {
        this.removeListener(e, t[n]);
      }
      return this;
    }, t.prototype.listeners = function (e) {
      return s(this, e, !0);
    }, t.prototype.rawListeners = function (e) {
      return s(this, e, !1);
    }, t.listenerCount = function (e, t) {
      return "function" == typeof e.listenerCount ? e.listenerCount(t) : i.call(e, t);
    }, t.prototype.listenerCount = i, t.prototype.eventNames = function () {
      return 0 < this._eventsCount ? c(this._events) : [];
    };
  },
  207: function _(e, t, o) {
    "use strict";

    function n(e, t, o) {
      if (y[e]) for (var _e2 in t) {
        t[_e2] instanceof ArrayBuffer && (t[_e2] = h(t[_e2]));
      }
      if (c[e]) for (var _o in t) {
        c[e].is(t[_o]) && (t[_o] = c[e].trans(t, t[_o]));
      }

      if (f.debugLog("".concat(new Date(), " WeixinJSBridge invoke ").concat(e), arguments), f.debugInfo({
        type: "invoke",
        eventName: e,
        data: arguments,
        timesmap: new Date()
      }), u[e] && u[e](t), !r.check(e, t, o)) {
        var _n = w(e),
            _r2 = _(_n, o);

        if (!i[e] || i[e](e, t, o)) {
          if (l[e]) {
            var _n2 = l[e](e, t, o);

            if (!_n2) return;
            t = _n2;
          }

          if (a[e]) a[e](e, t, _r2);else {
            var _o2 = v++;

            if (_n) {
              var _o3 = d.sync(e, t);

              k(_o3), delete _o3.to, _r2(_o3);
            } else m[_o2] = _r2, s.send({
              command: "APPSERVICE_INVOKE",
              data: {
                api: e,
                args: t,
                callbackID: _o2
              }
            });
          }
        }
      }
    }

    var r = o(44),
        s = o(31),
        i = o(208),
        a = o(209),
        c = o(214),
        u = o(215),
        l = o(216),
        d = o(217),
        f = o(25),
        p = o(20),
        g = f.base64ToArrayBuffer,
        h = f.arrayBufferToBase64,
        w = p.isSyncSDK,
        y = p.needTransArgsBase64Api,
        m = {};
    var v = 1;

    var k = function k(e) {
      if (e && e.__cover) {
        for (var _t in e.__cover) {
          "base64" == _t && (e[e.__cover[_t]] = g(e.base64), delete e.base64);
        }

        delete e.__cover;
      }
    };

    var b = !1;

    var _ = function _(e, t) {
      return function (o) {
        "function" == typeof t && (e ? t(o) : setTimeout(function () {
          t(o);
        }, 0));
      };
    };

    e.exports = function () {
      return b || (b = !0, s.registerCallback(function (e) {
        var t = e.command,
            o = e.data;

        if ("APPSERVICE_INVOKE_CALLBACK" === t) {
          var _e3 = o.callbackID,
              _t2 = m[_e3];
          k(o.res), "function" == typeof _t2 && _t2(o.res), delete m[_e3];
        }
      })), {
        invoke: n
      };
    };
  },
  208: function _(e, t, o) {
    "use strict";

    var n = o(20),
        r = o(25),
        s = r.checkUrl,
        i = n.urlCheckErrReason;
    e.exports = {
      downloadFile: function downloadFile(e, t, o) {
        return !!s(t.url, "downloadFile") || (o({
          errMsg: "".concat(e, ":fail ").concat(i)
        }), !1);
      },
      uploadFile: function uploadFile(e, t, o) {
        return !!s(t.url, "uploadFile") || (o({
          errMsg: "".concat(e, ":fail ").concat(i)
        }), !1);
      },
      createUploadTask: function createUploadTask(e, t, o) {
        return t.__skipDomainCheck__ || s(t.url, "uploadFile") || (o({
          errMsg: "".concat(e, ":fail ").concat(i)
        }), !1);
      },
      createDownloadTask: function createDownloadTask(e, t, o) {
        return t.__skipDomainCheck__ || s(t.url, "downloadFile") || (o({
          errMsg: "".concat(e, ":fail ").concat(i)
        }), !1);
      },
      operateWXData: function operateWXData(e, t) {
        return t.data && "webapi_getuserinfo" === t.data.api_name && !t.data.from_component && (console.group("".concat(new Date(), " \u63A5\u53E3\u8C03\u6574")), console.warn("获取 wx.getUserInfo 接口后续将不再出现授权弹窗，请注意升级\n参考文档: https://developers.weixin.qq.com/blogdetail?action=get_post_info&lang=zh_CN&token=1650183953&docid=0000a26e1aca6012e896a517556c01"), console.groupEnd()), !0;
      },
      authorize: function authorize(e, t) {
        return "scope.userInfo" === t.scope && (console.group("".concat(new Date(), " \u63A5\u53E3\u8C03\u6574")), console.error('wx.authorize({scope: "scope.userInfo"}) 不会出现授权弹窗，请使用 <button open-type="getUserInfo />\n参考文档: https://developers.weixin.qq.com/blogdetail?action=get_post_info&lang=zh_CN&token=1650183953&docid=0000a26e1aca6012e896a517556c01'), console.groupEnd()), !0;
      }
    };
  },
  209: function _(e, t, o) {
    "use strict";

    var n = o(210),
        r = o(212),
        s = o(213),
        i = Object.assign({}, n, r, s);
    e.exports = i;
  },
  21: function _(e) {
    var t = window.navigator || window.__global.navigator,
        o = window.WebSocket || window.__global.WebSocket,
        n = window.prompt || window.__global.prompt,
        r = t.userAgent.match(/port\/(\d*)/),
        s = "ws://127.0.0.1:".concat(r ? parseInt(r[1]) : 9974);
    var i = 0;

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

          if (i++ >= 10) return;
          var e = this._protocol;

          if (this._needToken) {
            e = "".concat(e, "#").concat(n("GET_MESSAGE_TOKEN"), "#");
          }

          this._ws = new o(s, e), this._ws.onopen = function () {
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
              var _t3 = JSON.parse(e.data);

              _this2._callback.forEach(function (e) {
                try {
                  e.call(_this2, _t3);
                } catch (e) {}
              });
            } catch (e) {}
          };
        }
      }, {
        key: "send",
        value: function send(e) {
          this._ws && this._ws.readyState === o.OPEN ? this._ws.send(JSON.stringify(e)) : this._msgQueue.push(e);
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
  210: function _(e, t, o) {
    "use strict";

    function n(e, t) {
      var o = e.origin,
          n = e.tls;
      console.group("".concat(new Date(), " wx.request \u9519\u8BEF")), console.error("".concat(o, " \u5BF9\u5E94\u7684\u670D\u52A1\u5668 TLS \u4E3A ").concat(n, " \uFF0C\u5C0F\u7A0B\u5E8F\u8981\u6C42\u7684 TLS \u7248\u672C\u5FC5\u987B\u5927\u4E8E\u7B49\u4E8E 1.2 \u3002\u63A7\u5236\u53F0\u8F93\u5165 showRequestInfo() \u53EF\u4EE5\u83B7\u53D6\u66F4\u8BE6\u7EC6\u4FE1\u606F\u3002")), console.groupEnd(), t({
        errMsg: "request:fail 小程序要求的 TLS 版本必须大于等于 1.2"
      });
    }

    function r(e, t) {
      var o = e.origin;
      console.group("".concat(new Date(), " wx.request \u9519\u8BEF")), console.error("".concat(o, " \u5BF9\u5E94\u7684\u670D\u52A1\u5668\u8BC1\u4E66\u65E0\u6548\u3002\u63A7\u5236\u53F0\u8F93\u5165 showRequestInfo() \u53EF\u4EE5\u83B7\u53D6\u66F4\u8BE6\u7EC6\u4FE1\u606F\u3002")), console.groupEnd(), t({
        errMsg: "request:fail 对应的服务器证书无效。"
      });
    }

    var s = o(37),
        i = o(20),
        a = o(25),
        c = o(24),
        u = o(211),
        l = i.MaxRequestConcurrent,
        d = i.urlCheckErrReason,
        f = i.DevtoolsConfig,
        p = a.checkUrl,
        g = void 0 !== f && f && f.libNumberVersion || 999999999,
        h = {};
    var w = 1,
        y = 0;

    var m = function m(e) {
      return function (t) {
        "function" == typeof e && e(t);
      };
    },
        v = function v(e, t, o, i) {
      var a = function a(e) {
        setTimeout(function () {
          y--, "function" == typeof o && o(e);
        });
      };

      if (++y > l) return console.group("".concat(new Date(), " request \u9519\u8BEF")), console.error("\u540C\u65F6\u6700\u591A\u53D1\u8D77 ".concat(l, " \u4E2A request \u8BF7\u6C42\uFF0C\u66F4\u591A\u8BF7\u53C2\u8003\u6587\u6863\uFF1Ahttps://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html")), console.groupEnd(), void a({
        errMsg: "".concat(e, ":fail exceed max task count")
      });
      var f = t.url,
          h = t.responseType,
          w = t.__skipDomainCheck__;
      if (!w && !p(f)) return void a({
        errMsg: "".concat(e, ":fail ").concat(d)
      });
      var m = t.method || "POST";
      if (0 > ["OPTIONS", "GET", "HEAD", "POST", "PUT", "DELETE", "TRACE", "CONNECT"].indexOf(m)) return void a({
        errMsg: "".concat(e, ":fail method is invalid")
      });
      var v = u.getSecuryDetailsByURL(f);

      if (v.isReady) {
        if (!v.isSecuryTLS) return void n(v, a);
        if (!v.isSecuryCertificate) return void r(v, a);
      }

      var k = t.header || {},
          S = new c.XMLHttpRequest();
      S.responseType = h || "text", S.timeout = t.timeout || __wxConfig.networkTimeout && __wxConfig.networkTimeout.request || 6e4, S.open(m, t.url, !0), S.onreadystatechange = function () {
        if (S.readyState === (S.HEADERS_RECEIVED || 2)) try {
          var _e4 = {};

          try {
            _e4 = JSON.parse(S.getResponseHeader("for-weapp-devtools"));
          } catch (e) {}

          "function" == typeof i && 1009093 <= g && i({
            state: "headersReceived",
            header: _(_e4 || {}),
            cookies: b(_e4 || {})
          });
        } catch (e) {
          console.error(e);
        }

        if (S.readyState, 4 === S.readyState) {
          S.onreadystatechange = null;
          var _o4 = S.status;
          if (0 === _o4) ;else {
            var _t4 = function _t4(t) {
              if (!t.isSecuryTLS) return void n(t, a);
              if (!t.isSecuryCertificate) return void r(t, a);
              if (S.responseURL && !w && !p(S.responseURL)) return void a({
                errMsg: "".concat(e, ":fail ").concat(d)
              });
              var s = {
                errMsg: "".concat(e, ":ok"),
                header: _(_c || {}),
                cookies: b(_c || {}),
                statusCode: _o4
              };
              s.data = "arraybuffer" === h ? S.response : S.responseText, a(s);
            };

            var _i2 = u.getSecuryDetailsByURL(f);

            var _c = {};

            try {
              _c = JSON.parse(S.getResponseHeader("for-weapp-devtools"));
            } catch (e) {}

            _i2.isReady ? _t4(_i2) : s.once("TLS_CHECK_READY_".concat(_i2.id), _t4);
          }
        }
      }, S.onerror = function () {
        a({
          errMsg: "".concat(e, ":fail")
        });
      }, S.ontimeout = function () {
        a({
          errMsg: "".concat(e, ":fail timeout")
        });
      }, S.onabort = function () {
        a({
          errMsg: "".concat(e, ":fail abort")
        });
      };
      var T = 0;

      for (var _e5 in k) {
        "content-type" === _e5.toLowerCase() && T++;
      }

      2 <= T && delete k["content-type"];
      var E = !1;

      for (var _e6 in k) {
        if (k.hasOwnProperty(_e6)) {
          var _t5 = _e6.toLowerCase();

          E = "content-type" === _t5 || E, "cookie" === _t5 ? S.setRequestHeader("_Cookie", k[_e6]) : S.setRequestHeader(_e6, k[_e6]);
        }
      }

      "POST" !== m || E || S.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
      var C = t.data;

      try {
        S.send(C);
      } catch (t) {
        a({
          errMsg: "".concat(e, ":fail")
        });
      }

      return S;
    },
        k = function k() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return e;
    },
        b = function b(e) {
      var t = [];

      for (var _o5 in e) {
        if ("set-cookie" === _o5.toLowerCase()) {
          var _n3 = e[_o5],
              _r3 = Object.prototype.toString.call(_n3);

          if ("[object String]" === _r3) {
            t.push(k(_n3.trim()));
            continue;
          }

          if ("[object Array]" === _r3) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = _n3[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _e7 = _step.value;
                t.push(k(_e7.trim()));
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

            continue;
          }
        }
      }

      return t;
    },
        _ = function _(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ",";
      var o = {};

      for (var _n4 in e) {
        var _r4 = Object.prototype.toString.call(e[_n4]);

        o[_n4] = "[object Array]" === _r4 ? e[_n4].join(t) : e[_n4];
      }

      return o;
    };

    e.exports = {
      request: v,
      createRequestTask: function createRequestTask(e, t, o) {
        var n = m(o),
            r = {
          id: w++,
          url: t.url,
          data: t.data,
          header: t.header,
          method: t.method,
          callback: function callback(e, t) {
            var o = {};
            o = 0 === t.errMsg.indexOf("request:ok") ? {
              requestTaskId: e,
              state: "success",
              data: t.data,
              header: t.header,
              statusCode: t.statusCode,
              cookies: t.cookies
            } : {
              requestTaskId: e,
              state: "fail",
              errMsg: t.errMsg.replace(/^request:fail ?/, "")
            }, delete h[e], s.emit("triggerOnEvent", "onRequestTaskStateChange", o);
          }
        };
        n({
          errMsg: "".concat(e, ":ok"),
          requestTaskId: r.id
        }), h[r.id] = r, r.xhr = v("request", t, r.callback.bind(void 0, r.id), function (e) {
          s.emit("triggerOnEvent", "onRequestTaskStateChange", Object.assign({}, e, {
            requestTaskId: r.id
          }));
        });
      },
      operateRequestTask: function operateRequestTask(e, t, o) {
        var n = m(o),
            r = t.requestTaskId,
            s = t.operationType,
            i = h[r];
        if (!i) return n({
          errMsg: "".concat(e, ":fail task not found")
        });
        if ("abort" !== s) return n({
          errMsg: "".concat(e, ":fail illegal operationType ").concat(s)
        });

        try {
          i.xhr.abort(), n({
            errMsg: "".concat(e, ":ok")
          });
        } catch (o) {
          n({
            errMsg: "".concat(e, ":fail ").concat(o)
          });
        }
      }
    };
  },
  211: function _(e, t, o) {
    "use strict";

    function n(e) {
      var t = c.document.createElement("a");
      return t.href = e, {
        protocol: t.protocol,
        origin: t.origin,
        fullPath: "".concat(t.origin, "/").concat(t.pathname)
      };
    }

    function r(e) {
      var _n5 = n(e),
          o = _n5.protocol,
          r = _n5.origin,
          i = _n5.fullPath;

      var a = t.securityDetails[r];
      return s.isTourist() || !u.urlCheck || "https:" !== o ? (a = {
        isReady: !0,
        isSecuryTLS: !0,
        isSecuryCertificate: !0
      }, t.securityDetails[r] = a, a) : a || (a = {
        isReady: !1,
        id: l++,
        tls: "",
        isSecuryTLS: !1,
        securityState: "",
        isSecuryCertificate: !1,
        protocol: o,
        origin: r,
        fullPath: i,
        url: e
      }, t.securityDetails[r] = a, a);
    }

    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var s = o(44),
        i = o(37),
        a = o(20),
        c = o(24),
        u = a.DevtoolsConfig;
    t.securityDetails = window.securityDetails = {
      "https://servicewechat.com": {
        isSecuryTLS: !0,
        securityState: "secure",
        isReady: !0,
        isSecuryCertificate: !0,
        tls: "TLS 1.2"
      }
    };
    var l = 1e4;
    t.parseURL = n, window.setSecurityDetails = function (e, o) {
      var _n6 = n(e),
          r = _n6.origin;

      o = JSON.parse(o);
      var s = t.securityDetails[r];
      s || (s = t.securityDetails[r] = {});
      var _o6 = o,
          a = _o6.protocol,
          c = _o6.securityState;
      var u = !1;
      a && (u = 1.2 <= parseFloat(a.replace("TLS ", ""))), s.isSecuryTLS = u, s.tls = a, s.securityState = c, s.isSecuryCertificate = "insecure" !== c, s.isReady = !0, s.remoteAddress = o.remoteAddress, s.statusCode = o.statusCode;
      var l = s.id;
      i.emit("TLS_CHECK_READY_".concat(l), t.securityDetails[r]);
    }, t.getSecuryDetailsByURL = r, t.default = {
      securityDetails: t.securityDetails,
      getSecuryDetailsByURL: r,
      parseURL: n
    };
  },
  212: function _(e) {
    "use strict";

    var t = {
      0: "log",
      1: "info",
      2: "warn",
      3: "error"
    };
    e.exports = {
      reportKeyValue: function reportKeyValue(e, t, o) {
        o({
          errMsg: "".concat(e, ":ok")
        });
      },
      reportIDKey: function reportIDKey(e, t, o) {
        o({
          errMsg: "".concat(e, ":ok")
        });
      },
      log: function log(e, o) {
        (o.dataArray || []).forEach(function (e) {
          var o = t[e.level];
          o && e.msg && console[o](e.msg);
        });
      }
    };
  },
  213: function _(e, t, o) {
    "use strict";

    function n(e) {
      (window.alert ? window.alert : c.alert)("SET_SOCKET_HEADER:".concat(JSON.stringify(e)));
    }

    function r(e) {
      console.group("".concat(new Date(), " \u65E0\u7F51\u7EDC\u72B6\u6001\u6A21\u62DF")), console.error("\u5DF2\u5F00\u542F\u65E0\u7F51\u7EDC\u72B6\u6001\u6A21\u62DF\uFF0C\u7F51\u7EDC\u8BF7\u6C42 ".concat(e, " \u5DF2\u88AB\u963B\u6B62\uFF1B\u5728\u6A21\u62DF\u5668\u5DE5\u5177\u680F\u5207\u6362\u7F51\u7EDC\u72B6\u6001\uFF0C\u53EF\u6062\u590D\u7F51\u7EDC\u8BF7\u6C42\u3002")), console.groupEnd();
    }

    var s = o(37),
        i = o(20),
        a = o(25),
        c = o(24),
        u = i.MaxWebsocketConnect,
        l = i.urlCheckErrReason,
        d = i.DevtoolsConfig,
        f = a.checkUrl,
        p = "未完成的操作",
        g = {};
    var h = 1;

    var w = window.WebSocket || c.WebSocket,
        y = function y(e) {
      return function (t) {
        "function" == typeof e && e(t);
      };
    },
        m = {
      1000: "normal closure",
      1001: "going away",
      1002: "protocol error",
      1003: "unsupported data",
      1004: "reserved",
      1005: "no status rcvd",
      1006: "abnormal closure",
      1007: "invalid frame payload data",
      1008: "policy violation",
      1009: "message too big",
      1010: "mandatory ext.",
      1011: "internal server error",
      1015: "tls handshake"
    };

    var v;
    window.addEventListener("networkChange", function (e) {
      if (d.networkStatus = e.detail.networkStatus, "none" === d.networkStatus) for (var _e8 in v && (v.close(), v = void 0), g) {
        var _t6 = g[_e8].socket;
        _t6 && _t6.close();
      }
    }), e.exports = {
      connectSocket: function connectSocket(e, t, o) {
        var i = t.url,
            a = t.header,
            c = y(o);
        if ("none" === d.networkStatus) return r(i), void c({
          errMsg: "".concat(e, ":fail network is down")
        });

        if (f(i, "socket")) {
          if (a && 0 < Object.keys(a).length && n(a), !v || v.readyState !== w.OPEN && v.readyState !== w.CONNECTING) {
            try {
              v = new w(i, t.protocols || []);
            } catch (e) {
              s.emit("triggerOnEvent", "onSocketError", {
                errMsg: p
              }), v = void 0;
            }

            return v ? (v.binaryType = "arraybuffer", v.onopen = function () {
              s.emit("triggerOnEvent", "onSocketOpen", {});
            }, v.onmessage = function (e) {
              s.emit("triggerOnEvent", "onSocketMessage", {
                data: e.data
              });
            }, v.onclose = function (e) {
              s.emit("triggerOnEvent", "onSocketClose", {
                code: e.code,
                reason: e.reason || m[e.code] || ""
              }), v = void 0;
            }, v.onerror = function () {
              s.emit("triggerOnEvent", "onSocketError", {
                errMsg: p
              }), v = void 0;
            }, void c({
              errMsg: "connectSocket:ok"
            })) : void c({
              errMsg: "connectSocket:fail"
            });
          }

          c({
            errMsg: "connectSocket:fail websocket is connected"
          });
        } else c({
          errMsg: "connectSocket:fail ".concat(l)
        });
      },
      sendSocketMessage: function sendSocketMessage(e, t, o) {
        var n = y(o),
            r = t.data;
        var s = "fail";
        if (v) try {
          v.readyState === w.OPEN ? (v.send(r), s = "ok") : s = "fail webSocket is not connected";
        } catch (t) {
          s = "fail ".concat(t.message);
        }
        n({
          errMsg: "".concat(e, ":").concat(s)
        });
      },
      closeSocket: function closeSocket(e, t, o) {
        var n = y(o);
        if (v) try {
          v.close(t.code, t.reason), n({
            errMsg: "closeSocket:ok"
          });
        } catch (t) {
          n({
            errMsg: "closeSocket:fail ".concat(t)
          });
        } else n({
          errMsg: "closeSocket:fail"
        });
        v = void 0;
      },
      createSocketTask: function createSocketTask(e, t, o) {
        var i = y(o),
            a = Object.keys(g).length,
            c = t.url,
            v = t.header,
            k = t.protocols,
            b = t.__skipDomainCheck__,
            _ = h++,
            S = {
          socketTaskId: _,
          url: c,
          protocols: k,
          header: v
        };

        if (i({
          socketTaskId: _,
          errMsg: "".concat(e, ":ok")
        }), a >= u) return void setTimeout(function () {
          console.group("".concat(new Date(), " websocket \u9519\u8BEF")), console.error("\u540C\u65F6\u6700\u591A\u53D1\u8D77 ".concat(u, " \u4E2A socket \u8BF7\u6C42\uFF0C\u66F4\u591A\u8BF7\u53C2\u8003\u6587\u6863\uFF1Ahttps://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html")), console.groupEnd(), s.emit("triggerOnEvent", "onSocketTaskStateChange", {
            socketTaskId: _,
            state: "error",
            errMsg: "exceed max task count"
          });
        });
        if ("none" === d.networkStatus) return void setTimeout(function () {
          r(c), s.emit("triggerOnEvent", "onSocketTaskStateChange", {
            socketTaskId: _,
            state: "error",
            errMsg: "network is down"
          });
        });
        if (!b && !f(c, "socket")) return void setTimeout(function () {
          s.emit("triggerOnEvent", "onSocketTaskStateChange", {
            socketTaskId: _,
            state: "error",
            errMsg: l
          });
        });
        g[_] = S, v && 0 < Object.keys(v).length && n(v);
        var T = __wxConfig.networkTimeout && __wxConfig.networkTimeout.connectSocket || 6e4;
        var E,
            C = !1;

        try {
          E = new w(c, t.protocols || []);
        } catch (e) {
          if (C) return;
          s.emit("triggerOnEvent", "onSocketTaskStateChange", {
            socketTaskId: _,
            state: "error",
            errMsg: p
          }), delete g[_];
        }

        if (!E) return;
        var x = setTimeout(function () {
          C = !0, s.emit("triggerOnEvent", "onSocketTaskStateChange", {
            socketTaskId: _,
            state: "error",
            errMsg: "Timed out connecting to server."
          }), delete g[_], E && E.close();
        }, T);
        E.binaryType = "arraybuffer", E.onopen = function () {
          clearTimeout(x), s.emit("triggerOnEvent", "onSocketTaskStateChange", {
            socketTaskId: _,
            state: "open"
          });
        }, E.onmessage = function (e) {
          if (!C) {
            var _t7 = e.data;
            s.emit("triggerOnEvent", "onSocketTaskStateChange", {
              socketTaskId: _,
              data: _t7,
              state: "message"
            });
          }
        }, E.onclose = function (e) {
          C || (s.emit("triggerOnEvent", "onSocketTaskStateChange", {
            socketTaskId: _,
            state: "close",
            code: e.code,
            reason: e.reason || m[e.code] || ""
          }), delete g[_]);
        }, E.onerror = function () {
          C || (s.emit("triggerOnEvent", "onSocketTaskStateChange", {
            socketTaskId: _,
            state: "error",
            errMsg: p
          }), delete g[_]);
        }, S.socket = E;
      },
      operateSocketTask: function operateSocketTask(e, t, o) {
        var n = t.socketTaskId,
            r = t.operationType,
            s = t.code,
            i = t.reason,
            a = t.data,
            c = y(o),
            u = g[n];
        if (!u) return c({
          errMsg: "".concat(e, ":fail task not found")
        });
        if ("send" !== r) {
          if ("close" !== r) c({
            errMsg: "".concat(e, ":fail illegal operationType ").concat(r)
          });else try {
            u.socket.close(t.code, t.reason), c({
              errMsg: "".concat(e, ":ok")
            });
          } catch (o) {
            c({
              errMsg: "".concat(e, ":fail ").concat(o.message)
            });
          }
        } else try {
          u.socket.readyState === w.OPEN ? (u.socket.send(a), c({
            errMsg: "".concat(e, ":ok")
          })) : c({
            errMsg: "".concat(e, ":fail webSocket is not connected")
          });
        } catch (o) {
          c({
            errMsg: "".concat(e, ":fail ").concat(o.message)
          });
        }
      }
    };
  },
  214: function _(e, t, o) {
    "use strict";

    var n = o(25),
        r = n.arrayBufferToBase64;
    e.exports = {
      writeFile: {
        is: function is(e) {
          return e instanceof ArrayBuffer;
        },
        trans: function trans(e, t) {
          return e.__dataisab = !0, r(t);
        }
      },
      writeFileSync: {
        is: function is(e) {
          return e instanceof ArrayBuffer;
        },
        trans: function trans(e, t) {
          return e.__dataisab = !0, r(t);
        }
      },
      fs_appendFile: {
        is: function is(e) {
          return e instanceof ArrayBuffer;
        },
        trans: function trans(e, t) {
          return e.__dataisab = !0, r(t);
        }
      },
      fs_appendFileSync: {
        is: function is(e) {
          return e instanceof ArrayBuffer;
        },
        trans: function trans(e, t) {
          return e.__dataisab = !0, r(t);
        }
      }
    };
  },
  215: function _(e, t, o) {
    var _o7 = o(20),
        n = _o7.canNotReadFromCodePackage;

    e.exports = {
      readFile: function readFile(e) {
        var t = e.filePath;

        if (0 !== t.indexOf(__wxConfig.env.LOCAL_PROTOCOL)) {
          var _e9 = t.split("."),
              _o8 = 1 < _e9.length ? _e9[_e9.length - 1] : "";

          _o8 && n[_o8] && (console.group("".concat(new Date(), " \u8BFB\u53D6\u6587\u4EF6\u5931\u8D25")), console.info("\u65E0\u6CD5\u8BFB\u53D6 ".concat(t, " \u6587\u4EF6\uFF0C\u8BE5\u6587\u4EF6\u7ECF\u8FC7\u7F16\u8BD1\u540E\u5728\u79FB\u52A8\u8BBE\u5907\u4E0A\u4E0D\u5B58\u5728")), console.groupEnd());
        }
      }
    };
  },
  216: function _(e, t, o) {
    "use strict";

    var n = o(24),
        r = n.navigator.userAgent,
        s = function s(e, t, o) {
      if (!/gameservice/.test(r)) return t;

      var s = t.canvasId,
          i = function i() {
        o({
          errMsg: "".concat(e, ":fail canvas not found")
        });
      };

      if (!s) return void (/Sync$/.test(e) ? i() : setTimeout(i));
      var _t$x = t.x,
          a = _t$x === void 0 ? 0 : _t$x,
          _t$y = t.y,
          c = _t$y === void 0 ? 0 : _t$y,
          _t$width = t.width,
          u = _t$width === void 0 ? s.width : _t$width,
          _t$height = t.height,
          l = _t$height === void 0 ? s.height : _t$height,
          _t$destWidth = t.destWidth,
          d = _t$destWidth === void 0 ? s.width : _t$destWidth,
          _t$destHeight = t.destHeight,
          f = _t$destHeight === void 0 ? s.height : _t$destHeight,
          _t$fileType = t.fileType,
          p = _t$fileType === void 0 ? "png" : _t$fileType,
          g = n.document.createElement("canvas");
      Object.setPrototypeOf(g, n.canvasProto), g.width = d, g.height = f;
      var h = g.getContext("2d");
      h && (Object.setPrototypeOf(h, n.canvas2dContextProto), h.drawImage(s, a, c, u, l, 0, 0, d, f));
      var w = "jpg" === p ? "image/jpeg" : "image/png",
          y = isNaN(t.quality) ? 1 : 0 < t.quality && 1 >= t.quality ? t.quality : 1;
      return {
        dataURL: g.toDataURL(w, y).replace(/^data:image\/(jpg|png);base64,/, ""),
        fileType: p
      };
    };

    e.exports = {
      canvasToTempFilePath: s,
      canvasToTempFilePathSync: s
    };
  },
  217: function _(e, t, o) {
    "use strict";

    var n = o(24);
    e.exports = {
      sync: function sync(e, t) {
        var o = new n.XMLHttpRequest();
        var params = {
          api: e,
          args: t,
          t: Date.now(),
          userAgent: window.navigator.userAgent || ''
        };
        var str = encodeURIComponent(JSON.stringify(params));
        return o.open("POST", "/apihelper/assdk?t=".concat(str), !1), o.send(JSON.stringify({
          api: e,
          args: t
        })), 200 === o.status ? JSON.parse(o.responseText) : {
          errMsg: "".concat(e, ":fail")
        };
      }
    };
  },
  218: function _(e, t, o) {
    "use strict";

    function n(e, t, o, n) {
      if (r.debugLog("".concat(new Date(), " WeixinJSBridge publish ").concat(e), arguments), t && 0 !== e.indexOf("canvas")) {
        var _o9 = JSON.stringify(t).length;
        _o9 > 1048576 && (console.group("".concat(new Date(), " \u6570\u636E\u4F20\u8F93\u957F\u5EA6\u8FC7\u957F")), console.warn("".concat("vdSyncBatch" === e ? "setData" : e, " \u6570\u636E\u4F20\u8F93\u957F\u5EA6\u4E3A ").concat(Math.floor(_o9 / 1024), " KB\uFF0C\u5B58\u5728\u6709\u6027\u80FD\u95EE\u9898\uFF01")), console.groupEnd());
      }

      r.debugInfo({
        type: "publish",
        eventName: e,
        data: arguments,
        timesmap: new Date()
      }), "appDataChange" !== e && "pageInitData" !== e && "__updateAppData" !== e || n || s.send({
        command: "SEND_APP_DATA",
        data: __wxAppData
      }), "invokeWebviewMethod" === e && t && t.data && "appDataChange" === t.data.name && (c && s.send({
        command: "SEND_APP_DATA",
        data: __wxAppData
      }), c = !0), ("vdSync" === e || "vdSyncBatch" === e) && (c && s.send({
        command: "SEND_APP_DATA",
        data: __wxAppData
      }), c = !0), s.send({
        command: "APPSERVICE_PUBLISH",
        data: {
          eventName: e,
          data: t,
          webviewIds: o
        }
      });
    }

    var r = o(25),
        s = o(31),
        i = o(20),
        a = i.AppserviceMaxDataSize;
    var c = !0,
        u = !1;

    e.exports = function () {
      return u || (u = !0, s.registerCallback(function (e) {
        var t = e.command,
            o = e.data,
            r = e.fromWebviewID;

        if ("WRITE_APP_DATA" === t) {
          (function () {
            var e = {},
                t = getCurrentPages();

            for (var _r5 in t.forEach(function (t) {
              e[t.__route__ || t.route] = t;
            }), o) {
              var _t8 = o[_r5],
                  _s2 = _t8.__webviewId__;

              for (var _o10 in e[_r5] && "function" == typeof e[_r5].setData ? (c = !1, e[_r5].setData(_t8)) : wx && wx.invokeWebviewMethod ? (c = !1, wx.invokeWebviewMethod({
                name: "appDataChange",
                args: {
                  data: _t8
                }
              })) : n("appDataChange", {
                data: {
                  data: _t8
                }
              }, [_s2], !0), Object.assign(__wxAppData[_r5], _t8), __wxAppData[_r5]) {
                void 0 === _t8[_o10] && delete __wxAppData[_r5][_o10];
              }
            }
          })();
        } else "GET_APP_DATA" === t && s.send({
          command: "SEND_APP_DATA",
          data: __wxAppData
        });
      })), {
        publish: n
      };
    };
  },
  219: function _(e, t, o) {
    "use strict";

    function n(e, t, o) {
      var n = c[e];
      "function" == typeof n && n(t, o);
    }

    function r(e, t) {
      s.debugLog("".concat(new Date(), " WeixinJSBridge subscribe ").concat(e), arguments), s.debugInfo({
        type: "subscribe",
        eventName: e,
        data: arguments,
        timesmap: new Date()
      }), c[e] = t;
    }

    var s = o(25),
        i = o(37),
        a = o(31),
        c = {};
    var u = !1;

    e.exports = function () {
      return u || (u = !0, a.registerCallback(function (e) {
        var t = e.command,
            o = e.data,
            r = e.fromWebviewID;
        "WEBVIEW_PUBLISH" === t && n(o.eventName, o.data, r);
      })), i.on("triggerSubscribeEvent", function (e, t, o) {
        n(e, t, o);
      }), {
        subscribe: r,
        triggerSubscribeEvent: n
      };
    };
  },
  220: function _(e, t, o) {
    "use strict";

    var n = o(24);

    e.exports = function () {
      if (["Caches", "screen", "performance ", "getComputedStyle", "openDatabase", "btoa", "Image"].forEach(function (e) {
        delete window[e];
      }), window.chrome = void 0, "complete" === n.document.readyState) n.history.replaceState({}, n.document.title || "", "".concat(location.href, "?load"));else {
        var _e10 = function _e10() {
          n.history.replaceState({}, n.document.title || "", "".concat(location.href, "?load")), n.removeEventListener("load", _e10);
        };

        n.addEventListener("load", _e10);
      }
    };
  },
  24: function _(e) {
    "use strict";

    e.exports = window.__global;
  },
  25: function _(e, t, o) {
    "use strict";

    function n(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "`";
      return e ? "`" === t ? e.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$") : '"' === t ? e.replace(/\\/g, "\\\\").replace(/\r\n/g, "\n").replace(/\n/g, "\\n").replace(/"/g, '\\"') : "'" === t ? e.replace(/\\/g, "\\\\").replace(/\r\n/g, "\n").replace(/\n/g, "\\n").replace(/'/g, "\\'") : e : e;
    }

    var r = o(31),
        s = o(44),
        i = o(20),
        a = o(24);
    o(205);
    var c = i.NetworkConfig,
        u = i.DevtoolsConfig;
    var l = !1,
        d = [];
    r.registerCallback(function (e) {
      var t = e.command,
          o = e.data;
      "SYSTEM_CALLBACK" === t && function (e, t) {
        switch (e) {
          case "showSystemInfo":
            {
              var _e11 = t.memory,
                  _o11 = t.restartInfo,
                  _n7 = _o11.restartTimes;
              console.group("".concat(new Date(), " \u5DE5\u5177\u7CFB\u7EDF\u4FE1\u606F")), console.info("".concat(_o11.beginTime, " \u542F\u52A8\u5DE5\u5177\uFF0C\u6267\u884C\u7F16\u8BD1 ").concat(_n7, " \u6B21\uFF0C \u5F53\u524D\u5185\u5B58\u5360\u7528 ").concat(_e11.toFixed(2), "m")), console.table(t.info), console.groupEnd();
              break;
            }

          case "checkProxy":
            console.group("".concat(new Date(), " \u4EE3\u7406\u4FE1\u606F")), console.table(t), console.groupEnd();
            break;

          case "showDecryptedInfo":
            console.group("".concat(new Date(), " \u52A0\u89E3\u5BC6\u4FE1\u606F")), console.table(t), console.groupEnd();
        }
      }(o.api, o.data);
    }), window.showDebugInfo = function (e, t) {
      var o = d.filter(function (o) {
        var n = !e || (Array.isArray(e) ? e.includes(o.type) : o.type === e),
            r = !t || (Array.isArray(t) ? t.includes(o.eventName) : o.eventName === t);
        if (n && r) return o;
      });
      console.group("showDebugInfo"), o.forEach(function (e) {
        console.group("".concat(e.timesmap, " WeixinJSBridge ").concat(e.type, " ").concat(e.eventName)), console.debug.apply(window, e.data), console.groupEnd();
      }), console.groupEnd(), l = !0;
    };

    var f = function f() {
      return console.clear(), void (l = !1);
    };

    Object.defineProperty(window, "closeDebug", {
      get: function get() {
        return f(), f;
      }
    });

    var p = function p() {
      return void console.table(d);
    };

    Object.defineProperty(window, "showDebugInfoTable", {
      get: function get() {
        return p(), p;
      }
    });

    var g = function g() {
      return void console.table([{
        fun: "build",
        "arg[0]": "",
        "arg[1]": "",
        example: "build",
        description: "build / reload"
      }, {
        fun: "preview",
        "arg[0]": "",
        "arg[1]": "",
        example: "preview",
        description: "preview with QR code"
      }, {
        fun: "upload",
        "arg[0]": "",
        "arg[1]": "",
        example: "upload",
        description: "upload the app"
      }, {
        fun: "showDebugInfo",
        "arg[0]": "type -- String || Array; publish on subscribe invoke GetMsg",
        "arg[1]": "eventName -- String || Array;",
        example: 'showDebugInfo() showDebugInfo("publish") showDebugInfo(["publish", "invoke"], "onAppRoute")',
        description: "open tools logs"
      }, {
        fun: "closeDebug"
      }, {
        fun: "showDebugInfoTable"
      }, {
        fun: "openToolsLog",
        "arg[0]": "",
        "arg[1]": "",
        example: "openVendor",
        description: "open log folder"
      }, {
        fun: "openPlugin",
        "arg[0]": "",
        "arg[1]": "",
        example: "openPlugin",
        description: "open plugin folder"
      }, {
        fun: "openVendor",
        "arg[0]": "",
        "arg[1]": "",
        example: "openVendor",
        description: "open vendor folder"
      }, {
        fun: "showRequestInfo",
        "arg[0]": "",
        "arg[1]": "",
        example: "showRequestInfo",
        description: "show request info"
      }, {
        fun: "showSystemInfo",
        "arg[0]": "",
        "arg[1]": "",
        example: "showSystemInfo",
        description: "show tools info"
      }, {
        fun: "checkProxy",
        "arg[0]": "type -- String; url",
        example: 'checkProxy("http://www.qq.com")',
        description: "checkProxy of the input url"
      }, {
        fun: "showDecryptedInfo",
        "arg[0]": "",
        example: "showDecryptedInfo",
        description: "show API decrypted info"
      }, {
        fun: "cleanAppCache",
        "arg[0]": "",
        example: "cleanAppCache",
        description: "clean application cache"
      }]);
    };

    Object.defineProperty(window, "help", {
      get: function get() {
        return g(), g;
      }
    });

    var h = function h() {
      return function () {
        var e = {};

        for (var _t9 in window.securityDetails) {
          if (0 !== _t9.indexOf("http://".concat(__wxConfig.apphash))) {
            var _o12 = window.securityDetails[_t9];
            delete _o12.id, delete _o12.command, delete _o12.isReady, delete _o12.url, e[_t9] = _o12;
          }
        }

        console.table(e);
      }();
    };

    Object.defineProperty(window, "showRequestInfo", {
      get: function get() {
        return h(), h;
      }
    });

    var w = function w(e, t) {
      r.send({
        command: "SYSTEM",
        data: {
          api: e,
          data: t
        }
      });
    },
        y = function y() {
      return w("openToolsLog");
    };

    Object.defineProperty(window, "openToolsLog", {
      get: function get() {
        return y(), y;
      }
    });

    var m = function m() {
      return w("openPlugin");
    };

    Object.defineProperty(window, "openPlugin", {
      get: function get() {
        return m(), m;
      }
    });

    var v = function v() {
      return w("openVendor");
    };

    Object.defineProperty(window, "openVendor", {
      get: function get() {
        return v(), v;
      }
    });
    Object.defineProperty(window, "showSystemInfo", {
      get: function get() {
        return console.log("loading..."), function () {
          return w("showSystemInfo");
        }(), function () {};
      }
    }), window.checkProxy = function (e) {
      return "string" == typeof e ? (console.log("checking..."), void w("checkProxy", e)) : console.log("param should be string");
    };

    var k = function k() {
      return w("syncMessage");
    };

    Object.defineProperty(window, "syncMessage", {
      get: function get() {
        return k(), k;
      }
    });

    var b = function b() {
      return void r.send({
        command: "SYSTEM",
        data: {
          api: "showDecryptedInfo"
        }
      });
    };

    Object.defineProperty(window, "showDecryptedInfo", {
      get: function get() {
        return b(), b;
      }
    });

    var _ = function _() {
      return r.send({
        command: "SYSTEM",
        data: {
          api: "cleanAppCache"
        }
      }), void console.warn("应用缓存已清理完成，建议重新启动");
    };

    Object.defineProperty(window, "cleanAppCache", {
      get: function get() {
        return _(), _;
      }
    });

    var S = function S(e) {
      var t = /^(?:http|ws)s?:\/\/((?:\d{1,3}\.){3}\d{1,3})(?::\d{1,5})?/i.exec(e);

      if (t) {
        var _e12 = u.localhostIp,
            _o13 = u.networkMask;
        if (!_e12 || !_o13) return !1;
        var _n8 = t[1];
        return _e12.split(".").map(function (e, t) {
          return e & _o13[t];
        }).join(".") === _n8.split(".").map(function (e, t) {
          return e & _o13[t];
        }).join(".");
      }

      return !1;
    },
        T = /^(http|ws)s?:\/\/[\w-.]+(:\d+)?/i;

    var E = !0;
    window.__disPlayURLCheckWarning = !0;

    var C = function C(e) {
      var t = /^(?:http|ws)s?:\/\/((?:\d{1,3}\.){3}\d{1,3})(?::\d{1,5})?/i.exec(e);

      if (t) {
        return t[1] === u.localhostIp;
      }

      return !1;
    };

    e.exports = {
      debugLog: function debugLog(e, t) {
        l && (console.group(e), console.debug.apply(null, t), console.groupEnd());
      },
      debugInfo: function debugInfo(e) {
        l || (d.length > 100 && (d = []), d.push(e));
      },
      isDev: function isDev() {
        return l;
      },
      base64ToArrayBuffer: function base64ToArrayBuffer(e) {
        var t = a.atob(e),
            o = t.length,
            n = new Uint8Array(o);

        for (var _e13 = 0; _e13 < o; _e13++) {
          n[_e13] = t.charCodeAt(_e13);
        }

        return n.buffer;
      },
      arrayBufferToBase64: function arrayBufferToBase64(e) {
        var t = "";
        var o = new Uint8Array(e),
            n = o.byteLength;

        for (var _e14 = 0; _e14 < n; _e14++) {
          t += String.fromCharCode(o[_e14]);
        }

        return a.btoa(t);
      },
      escapeQuot: n,
      checkUrl: function checkUrl(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "request";
        if (s.isTourist()) return E && (console.group("".concat(new Date(), " \u65E0 AppID \u5173\u8054")), console.warn("工具未检查合法域名，更多请参考文档：https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html"), console.groupEnd(), E = !1), !0;
        if (!u.urlCheck) return window.__disPlayURLCheckWarning && (console.group("".concat(new Date(), " \u914D\u7F6E\u4E2D\u5173\u95ED\u5408\u6CD5\u57DF\u540D\u3001web-view\uFF08\u4E1A\u52A1\u57DF\u540D\uFF09\u3001TLS \u7248\u672C\u4EE5\u53CA HTTPS \u8BC1\u4E66\u68C0\u67E5")), console.warn("工具未校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书。"), console.groupEnd(), window.__disPlayURLCheckWarning = !1), !0;
        if (!e) return !1;
        if (/(\?|&)skip_domain_check=true(&|$)/.test(e)) return !0;

        if (["request", "downloadFile", "uploadFile", "socket"].includes(t)) {
          if (C(e)) return setTimeout(function () {
            console.error("Cannot send network request to localhost.");
          }), !1;
          if (S(e)) return !0;
        }

        if (!(e = T.exec(e.toLowerCase()))) return !1;
        if (e = e[0], /^http:\/\/(tmp|usr|store)\/?$/gi.test(e)) return !0;

        try {
          var _o14 = [];
          _o14 = "downloadFile" === t ? c.download : "uploadFile" === t ? c.upload : "socket" === t ? c.socket : c.request;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = _o14[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _n9 = _step2.value;

              var _o15 = T.exec(_n9.toLowerCase());

              if (_o15 && _o15[0] === e) return !0;

              if ("socket" === t && u.setting.WebsocketSkipPortCheck) {
                if (new RegExp("^".concat(_n9, "(:\\d+)?$")).test(e)) return !0;
              }
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

          var _r6 = [];
          _o14.forEach(function (e) {
            _r6.push([e]);
          }), console.group("".concat(new Date(), " ").concat(t, " \u5408\u6CD5\u57DF\u540D\u6821\u9A8C\u51FA\u9519")), console.info("如若已在管理后台更新域名配置，请刷新项目配置后重新编译项目，操作路径：“详情-域名信息”"), console.error(" ".concat(n(e, "`"), " \u4E0D\u5728\u4EE5\u4E0B ").concat(t, " \u5408\u6CD5\u57DF\u540D\u5217\u8868\u4E2D\uFF0C\u8BF7\u53C2\u8003\u6587\u6863\uFF1Ahttps://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html")), console.table(_r6), console.groupEnd();
        } catch (t) {
          return console.error(t), !1;
        }

        return !1;
      },
      isLocalhost: C,
      isInLAN: S
    };
  },
  31: function _(e, t, o) {
    "use strict";

    var n = o(24),
        r = n.navigator.userAgent,
        s = o(21);
    var i;

    var a = function a() {
      if (i) return i;
      var e = "APPSERVICE";
      return /widgetservice/.test(r) ? e = "WIDGETSERVICE" : /gameservice/.test(r) && (e = "GAMESERVICE"), i = new s(e), /gameservice/.test(r) && i.registerCallback(function (e) {
        var t = e.command,
            o = e.data;

        if ("SET_CANVAS" === t) {
          var _e15 = n.document.getElementById("myCanvas");

          _e15.setAttribute("width", o.width), _e15.setAttribute("height", o.height), _e15.setAttribute("style", o.style);
        }
      }), i;
    };

    e.exports = {
      send: function send(e) {
        a().send(e);
      },
      registerCallback: function registerCallback(e) {
        a().registerCallback(e);
      }
    };
  },
  37: function _(e, t, o) {
    "use strict";

    var n = o(206).EventEmitter;
    e.exports = new n();
  },
  44: function _(e, t, o) {
    "use strict";

    var n = o(20),
        r = n.DevtoolsConfig,
        s = function s() {
      return "touristappid" === r.appid;
    },
        i = s() ? Object.assign({}, r.userInfo) : {};

    delete r.userInfo;
    var a = {
      login: function login(e, t, o) {
        o({
          errMsg: "login:ok",
          code: "the code is a mock one"
        });
      },
      authorize: function authorize(e, t, o) {
        o({
          errMsg: "authorize:fail"
        });
      },
      operateWXData: function operateWXData(e, t, o) {
        o({
          errMsg: "operateWXData:ok",
          data: {
            data: JSON.stringify({
              nickName: i.nickName,
              avatarUrl: i.headUrl,
              gender: "male" === i.sex ? 1 : 2,
              province: i.province,
              city: i.city,
              country: i.country
            })
          }
        });
      },
      openSetting: function openSetting(e, t, o) {
        o({
          errMsg: "openSetting:ok",
          authSetting: [{
            scope: "scope.userInfo",
            state: 1
          }]
        });
      }
    };
    e.exports = {
      isTourist: s,
      fake: a,
      check: function check() {
        for (var _len = arguments.length, e = new Array(_len), _key = 0; _key < _len; _key++) {
          e[_key] = arguments[_key];
        }

        var t = e[0];
        return s() && a.hasOwnProperty(t) && (console.group("".concat(new Date(), " \u65E0 AppID \u5173\u8054")), console.warn("\u8BF7\u6CE8\u610F\u65E0 AppID \u5173\u8054\u4E0B\uFF0C\u8C03\u7528 wx.".concat(t, " \u662F\u53D7\u9650\u7684, API \u7684\u8FD4\u56DE\u662F\u5DE5\u5177\u7684\u6A21\u62DF\u8FD4\u56DE")), console.groupEnd(), setTimeout(function () {
          a[t].apply(null, e);
        }), !0);
      }
    };
  }
});

