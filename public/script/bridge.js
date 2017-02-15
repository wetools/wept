! function(e, t) {
  if ("object" == typeof exports && "object" == typeof module) module.exports = t();
  else if ("function" == typeof define && define.amd) define([], t);
  else {
    var n = t();
    for (var o in n)("object" == typeof exports ? exports : e)[o] = n[o]
  }
}(this, function() {
  return function(e) {
    function t(o) {
      if (n[o]) return n[o].exports;
      var r = n[o] = {
        exports: {},
        id: o,
        loaded: !1
      };
      return e[o].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
  }([function(e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var r = n(1),
      i = o(r),
      s = n(17),
      a = o(s);
    (0, a["default"])(), window.MutationObserver = window.WebKitMutationObserver = window.File = void 0, window.WeixinJSBridge = i["default"]
  }, function(e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }

    function r(e) {
      var t = e.command,
        n = e.msg || {},
        o = e.ext || {};
      if ("WINDOW_GET_WEBAPP_ERROR" === t) {
        var r = n.fileName,
          i = n.errStr;
        return console.group("%c加载 " + r + " 错误", "color: red; font-size: x-large"), console.error("%c" + i, "color: red; font-size: x-large"), void console.groupEnd()
      }
      if ("MSG_FROM_WEBVIEW" === t || "GET_ASSDK_RES" === t) {
        var a = n.eventName || o.sdkName;
        s["default"].debugLog(new Date + " GetMsg " + a, [a, n, o]), s["default"].debugInfo({
          type: "GetMsg",
          eventName: a,
          data: [a, n, o],
          timesmap: new Date
        })
      }
      if ("MSG_FROM_WEBVIEW" === t) {
        var u = n.eventName,
          l = (n.type, n.data || {});
        0 === u.indexOf("publish_") ? (u = u.replace(/^publish_/, ""), f["default"].emit("triggerSubscribeEvent", u, l, n.webviewID)) : (u = u.replace(/^sys_/, ""), f["default"].emit("triggerOnEvent", u, l, n.webviewID))
      } else if ("GET_APP_DATA" === t) c["default"].sendMsgToNW({
        appData: __wxAppData,
        sdkName: "send_app_data"
      });
      else if ("WRITE_APP_DATA" === t)
        for (var d in n) {
          var p = n[d],
            v = p.__webviewId__;
          console.log(p), (0, _["default"])("appDataChange", {
            data: {
              data: p
            }
          }, [v], !0)
        }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i = n(2),
      s = o(i),
      a = n(5),
      u = (o(a), n(3)),
      c = o(u),
      l = n(6),
      f = o(l),
      d = n(8),
      p = o(d),
      v = n(10),
      g = o(v),
      h = n(11),
      _ = o(h),
      m = n(12),
      w = o(m);
    c["default"].registerCallback(r), t["default"] = {
      invoke: w["default"],
      on: p["default"],
      subscribe: g["default"],
      publish: _["default"]
    }
  }, function(e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = n(3),
      i = o(r),
      s = !1,
      a = [];
    window.showDebugInfo = function(e, t) {
      var n = a.filter(function(n) {
        var o = !e || (Array.isArray(e) ? e.includes(n.type) : n.type === e),
          r = !t || (Array.isArray(t) ? t.includes(n.eventName) : n.eventName === t);
        if (o && r) return n
      });
      console.group("showDebugInfo"), n.forEach(function(e) {
        console.group(e.timesmap + " WeixinJSBridge " + e.type + " " + e.eventName), console.debug.apply(window, e.data), console.groupEnd()
      }), console.groupEnd(), s = !0
    }, window.closeDebug = function() {
      console.clear(), s = !1
    }, window.showDebugInfoTable = function() {
      console.table(a)
    }, window.help = function() {
      console.table([{
        fun: "showDebugInfo",
        "arg[0]": "type -- String || Array; publish on subscribe invoke GetMsg",
        "arg[1]": "eventName -- String || Array;",
        example: 'showDebugInfo() showDebugInfo("publish") showDebugInfo(["publish", "invoke"], "onAppRoute")',
        openToolsLog: "open tools logs"
      }, {
        fun: "closeDebug"
      }, {
        fun: "showDebugInfoTable"
      }, {
        fun: "openToolsLog",
        "arg[0]": "",
        "arg[1]": "",
        example: "openVendor() ",
        openToolsLog: "open log folder"
      }, {
        fun: "openVendor",
        "arg[0]": "",
        "arg[1]": "",
        example: "openVendor() ",
        openToolsLog: "open vendor folder"
      }, {
        fun: "showRequestInfo",
        "arg[0]": "",
        "arg[1]": "",
        example: "showRequestInfo() ",
        openToolsLog: "show request info"
      }, {
        fun: "showSystemInfo",
        "arg[0]": "",
        "arg[1]": "",
        example: "showSystemInfo() ",
        openToolsLog: "show tools info"
      }])
    }, window.showRequestInfo = function() {
      var e = JSON.parse(JSON.stringify(window.securityDetails));
      for (var t in e) {
        0 === t.indexOf("http://" + __wxConfig.apphash) && delete window.securityDetails[t];
        var n = e[t];
        delete n.id, delete n.command, delete n.isReady, delete n.url;
        var o = document.createElement("a");
        o.href = t, n.host = o.host
      }
      console.table(e)
    }, window.openToolsLog = function() {
      i["default"].sendMsgToNW({
        sdkName: "__open-tools-log"
      })
    }, window.openVendor = function() {
      i["default"].sendMsgToNW({
        sdkName: "__open-tools-vendor"
      })
    }, window.showNewFeatureCheck = function() {
      i["default"].sendMsgToNW({
        sdkName: "__show-new-feature-check"
      })
    }, window.showSystemInfo = function() {
      i["default"].sendMsgToNW({
        sdkName: "__show-sys-info"
      })
    }, window.hhdmb = function() {
      i["default"].sendMsgToNW({
        sdkName: "__hhdmbadmb"
      })
    };
    var u = function() {
        return s
      },
      c = function(e, t) {
        s && (console.group(e), console.debug.apply(void 0, t), console.groupEnd(e))
      },
      l = function(e) {
        a.push(e)
      };
    t["default"] = {
      debugLog: c,
      debugInfo: l,
      isDev: u
    }
  }, function(e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = n(2),
      i = (o(r), n(4)),
      s = __wxConfig.apphash,
      a = __wxConfig.appid,
      u = __wxConfig.appname,
      c = navigator.userAgent,
      l = parseInt(c.match(/webview\/(\d*)/)[1]),
      f = [],
      d = [],
      p = function() {
        for (var e in d) d[e].apply(this, arguments)
      },
      v = function(e) {
        d.push(e)
      },
      g = 0,
      h = function(e) {
        var t = JSON.parse(JSON.stringify(e));
        t.to = "backgroundjs", t.comefrom = "webframe", t.command = "COMMAND_FROM_ASJS", t.appid = a, t.appname = u, t.apphash = s, t.webviewID = l, t.__id = g, g++, window.parent.postMessage(t, "*")
      },
      _ = function(e) {
        e.command = "COMMAND_FROM_ASJS", e.appid = a, e.appname = u, e.apphash = s, e.webviewID = l;
        var t = "____sdk____" + JSON.stringify(e),
          n = prompt(t);
        n = JSON.parse(n), delete n.to, p(n)
      };
    window._____sendMsgToNW = h;
    var m = function(e) {
        e.to = "contentscript", e.comefrom = "webframe", e.webviewID = l, window.parent.postMessage(e, "*")
      },
      w = function(e, t, n) {
        var o = (0, i.isSyncSDK)(e),
          r = {
            sdkName: e,
            args: t,
            callbackID: n
          };
        o ? _(r) : h(r)
      };
    window.addEventListener("message", function(e) {
      var t = e.data,
        n = t.to;
      if ("appservice" === n) return delete n.appservice, "complete" !== document.readyState ? void f.push(t) : void p(t)
    }), window.addEventListener("load", function() {
      f.forEach(function(e) {
        p(e)
      }), f = []
    }), m({
      command: "SHAKE_HANDS"
    }), t["default"] = {
      brigeToNW: w,
      sendMsgToNW: h,
      registerCallback: v
    }
  }, function(e, t) {
    "use strict";

    function n(e) {
      return "getSystemInfo" === e || /Sync$/.test(e)
    }

    function o(e) {
      return "navigateTo" === e || "redirectTo" === e
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.isSyncSDK = n, t.isLockSDK = o;
    var r = t.appconfig = Object.assign({
        domain: [""],
        networkTimeout: {
          request: 3e4,
          connectSocket: 3e4,
          uploadFile: 3e4,
          downloadFile: 3e4
        }
      }, __wxConfig),
      i = t.projectConfig = r.projectConfig || {};
    t.MaxRequestConcurrent = i.Setting && i.Setting.MaxRequestConcurrent || 5, t.NetworkConfig = i && i.Network || {}, t.AppserviceMaxDataSize = __wxConfig.appserviceConfig.AppserviceMaxDataSize, t.Permission = i.permission || {}
  }, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = function() {
        return __wxConfig.isTourist
      },
      o = n() ? Object.assign(__wxConfig.userInfo) : {};
    delete __wxConfig.userInfo;
    var r = {
        login: function(e, t, n) {
          n({
            errMsg: "login:ok",
            code: "the code is a mock one"
          })
        },
        authorize: function(e, t, n) {
          n({
            errMsg: "authorize:fail"
          })
        },
        operateWXData: function(e, t, n) {
          n({
            errMsg: "operateWXData:ok",
            data: {
              data: JSON.stringify({
                nickName: o.nickName,
                avatarUrl: o.headUrl,
                gender: "male" === o.sex ? 1 : 2,
                province: o.province,
                city: o.city,
                country: o.country
              })
            }
          })
        }
      },
      i = function(e) {
        var t = this,
          o = arguments;
        return !(!n() || !r.hasOwnProperty(e)) && (console.group(new Date + " 无 AppID 关联"), console.warn("请注意无 AppID 关联下，调用 wx." + e + " 是受限的, API 的返回是工具的模拟返回"), console.groupEnd(), setTimeout(function() {
          r[e].apply(t, o)
        }), !0)
      };
    t["default"] = {
      isTourist: n,
      fake: r,
      check: i
    }
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = n(7).EventEmitter;
    t["default"] = new o
  }, function(e, t) {
    function n() {
      this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
    }

    function o(e) {
      return "function" == typeof e
    }

    function r(e) {
      return "number" == typeof e
    }

    function i(e) {
      return "object" == typeof e && null !== e
    }

    function s(e) {
      return void 0 === e
    }
    e.exports = n, n.EventEmitter = n, n.prototype._events = void 0, n.prototype._maxListeners = void 0, n.defaultMaxListeners = 10, n.prototype.setMaxListeners = function(e) {
      if (!r(e) || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");
      return this._maxListeners = e, this
    }, n.prototype.emit = function(e) {
      var t, n, r, a, u, c;
      if (this._events || (this._events = {}), "error" === e && (!this._events.error || i(this._events.error) && !this._events.error.length)) {
        if (t = arguments[1], t instanceof Error) throw t;
        var l = new Error('Uncaught, unspecified "error" event. (' + t + ")");
        throw l.context = t, l
      }
      if (n = this._events[e], s(n)) return !1;
      if (o(n)) switch (arguments.length) {
        case 1:
          n.call(this);
          break;
        case 2:
          n.call(this, arguments[1]);
          break;
        case 3:
          n.call(this, arguments[1], arguments[2]);
          break;
        default:
          a = Array.prototype.slice.call(arguments, 1), n.apply(this, a)
      } else if (i(n))
        for (a = Array.prototype.slice.call(arguments, 1), c = n.slice(), r = c.length, u = 0; u < r; u++) c[u].apply(this, a);
      return !0
    }, n.prototype.addListener = function(e, t) {
      var r;
      if (!o(t)) throw TypeError("listener must be a function");
      return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, o(t.listener) ? t.listener : t), this._events[e] ? i(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, i(this._events[e]) && !this._events[e].warned && (r = s(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners, r && r > 0 && this._events[e].length > r && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace())), this
    }, n.prototype.on = n.prototype.addListener, n.prototype.once = function(e, t) {
      function n() {
        this.removeListener(e, n), r || (r = !0, t.apply(this, arguments))
      }
      if (!o(t)) throw TypeError("listener must be a function");
      var r = !1;
      return n.listener = t, this.on(e, n), this
    }, n.prototype.removeListener = function(e, t) {
      var n, r, s, a;
      if (!o(t)) throw TypeError("listener must be a function");
      if (!this._events || !this._events[e]) return this;
      if (n = this._events[e], s = n.length, r = -1, n === t || o(n.listener) && n.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);
      else if (i(n)) {
        for (a = s; a-- > 0;)
          if (n[a] === t || n[a].listener && n[a].listener === t) {
            r = a;
            break
          }
        if (r < 0) return this;
        1 === n.length ? (n.length = 0, delete this._events[e]) : n.splice(r, 1), this._events.removeListener && this.emit("removeListener", e, t)
      }
      return this
    }, n.prototype.removeAllListeners = function(e) {
      var t, n;
      if (!this._events) return this;
      if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
      if (0 === arguments.length) {
        for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
        return this.removeAllListeners("removeListener"), this._events = {}, this
      }
      if (n = this._events[e], o(n)) this.removeListener(e, n);
      else if (n)
        for (; n.length;) this.removeListener(e, n[n.length - 1]);
      return delete this._events[e], this
    }, n.prototype.listeners = function(e) {
      var t;
      return t = this._events && this._events[e] ? o(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
    }, n.prototype.listenerCount = function(e) {
      if (this._events) {
        var t = this._events[e];
        if (o(t)) return 1;
        if (t) return t.length
      }
      return 0
    }, n.listenerCount = function(e, t) {
      return e.listenerCount(t)
    }
  }, function(e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }

    function r(e, t) {
      s["default"].debugLog(new Date + " WeixinJSBridge on " + e, arguments), s["default"].debugInfo({
        type: "on",
        eventName: e,
        data: arguments,
        timesmap: new Date
      }), "onAppEnterForeground" === e && (p.onAppShow || (t && t({}), p.onAppShow = !0)), f[e] && t && (f[e] = [t]), d[e] && t && (d[e] = t)
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t["default"] = r;
    var i = n(2),
      s = o(i),
      a = n(6),
      u = o(a),
      c = n(9),
      l = o(c),
      f = {
        onSocketOpen: [],
        onSocketError: [],
        onSocketMessage: [],
        onSocketClose: [],
        onAppTerminate: [],
        onAppRoute: [],
        onAppRouteDone: [],
        onAppEnterBackground: [],
        onAppEnterForeground: [],
        onMusicPlay: [],
        onMusicPause: [],
        onMusicEnd: [],
        onMusicError: [],
        onPullDownRefresh: [],
        onCompassChange: [],
        onAccelerometerChange: [],
        onNetworkStatusChange: []
      },
      d = {
        onShareAppMessage: !0
      },
      p = {
        onAppShow: !1
      };
    u["default"].on("triggerOnEvent", function(e, t, n) {
      if (f[e]) {
        var o = f[e],
          r = !0,
          i = !1,
          s = void 0;
        try {
          for (var a, u = o[Symbol.iterator](); !(r = (a = u.next()).done); r = !0) {
            var c = a.value;
            c(t, n)
          }
        } catch (p) {
          i = !0, s = p
        } finally {
          try {
            !r && u["return"] && u["return"]()
          } finally {
            if (i) throw s
          }
        }
      }
      d[e] && "function" == typeof d[e] && (0, l["default"])(t, n, d[e]), "insertContactButton" === e && (console.group(new Date + "  调用临时会话成功"), console.log("sessionFrom: " + t.sessionFrom), console.groupEnd())
    }), window.DeviceOrientation = function(e, t, n) {
      f.onAccelerometerChange.forEach(function(o) {
        o({
          x: e,
          y: t,
          z: n
        })
      })
    }
  }, function(e, t) {
    "use strict";

    function n(e, t) {
      var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {},
        o = Object.assign({
          title: __wxConfig.app_nickname,
          desc: "",
          imgUrl: ""
        }, e);
      n(o, t)
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t["default"] = n
  }, function(e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }

    function r(e, t) {
      s["default"].debugLog(new Date + " WeixinJSBridge subscribe", arguments), s["default"].debugInfo({
        type: "subscribe",
        eventName: e,
        data: arguments,
        timesmap: new Date
      }), c[e] = t
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t["default"] = r;
    var i = n(2),
      s = o(i),
      a = n(6),
      u = o(a),
      c = {};
    u["default"].on("triggerSubscribeEvent", function(e, t, n) {
      c[e] && c[e](t, n)
    })
  }, function(e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }

    function r(e, t, n, o) {
      if (s["default"].debugLog(new Date + " WeixinJSBridge publish " + e, arguments), t && 0 !== e.indexOf("canvas")) {
        var r = JSON.stringify(t),
          i = r.length;
        if (i > c.AppserviceMaxDataSize) return console.group(new Date + " 数据传输错误"), console.error(e + " 数据传输长度为 " + i + " 已经超过最大长度 " + c.AppserviceMaxDataSize), void console.groupEnd()
      }
      s["default"].debugInfo({
        type: "publish",
        eventName: e,
        data: arguments,
        timesmap: new Date
      }), "appDataChange" !== e && "pageInitData" !== e && "__updateAppData" !== e || o || u["default"].sendMsgToNW({
        appData: __wxAppData,
        sdkName: "send_app_data"
      }), u["default"].sendMsgToNW({
        eventName: e,
        data: t,
        webviewIds: n,
        sdkName: "publish"
      })
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t["default"] = r;
    var i = n(2),
      s = o(i),
      a = n(3),
      u = o(a),
      c = n(4)
  }, function(e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }

    function r() {
      var e = Math.random();
      return k[e] ? r() : e
    }

    function i(e) {
      var t = e.command,
        n = e.msg || {},
        o = e.ext || {};
      if ("GET_ASSDK_RES" === t) {
        var r = o.callbackID;
        "function" == typeof k[r] && (k[r](n), delete k[r])
      }
    }

    function s(e, t, n) {
      if (f["default"].isTourist()) return !0;
      var o = function() {
        "function" == typeof n && n.apply(n, arguments)
      };
      if (b.Permission[e]) {
        var r = b.Permission[e];
        if (0 === r.state) return o({
          errMsg: e + ":fail no permission"
        }), !1
      }
      return !0
    }

    function a(e, t, n) {
      if (c["default"].debugLog(new Date + " WeixinJSBridge invoke " + e, arguments), !f["default"].check.apply(this, arguments)) {
        var o = (0, b.isLockSDK)(e),
          i = +new Date;
        if (!(o && i - S < 200) && (S = o ? i : 0, c["default"].debugInfo({
            type: "invoke",
            eventName: e,
            data: arguments,
            timesmap: new Date
          }), s(e, t, n)))
          if (M[e]) M[e].apply(this, arguments);
          else {
            if (y["default"][e] && !y["default"][e].apply(this, arguments)) return;
            var a = r(),
              u = function(e) {
                n && n(e)
              };
            k[a] = u, v["default"].brigeToNW(e, t, a)
          }
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t["default"] = a;
    var u = n(2),
      c = o(u),
      l = n(5),
      f = o(l),
      d = n(6),
      p = (o(d), n(3)),
      v = o(p),
      g = n(13),
      h = o(g),
      _ = n(16),
      m = o(_),
      w = n(15),
      y = o(w),
      b = n(4),
      M = Object.assign(m["default"], h["default"]),
      S = 0,
      k = {};
    v["default"].registerCallback(i)
  }, function(e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = n(6),
      i = o(r),
      s = n(5),
      a = (o(s), n(14)),
      u = n(4),
      c = n(15),
      l = null,
      f = 0,
      d = function(e, t, n) {
        if (f++, f > u.MaxRequestConcurrent) return f--, console.group(new Date + " wx.request 错误"), console.error("同时最多发起 " + u.MaxRequestConcurrent + " 个 wx.request 请求，更多请参考文档：https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html"), console.groupEnd(), void(n && n({
          errMsg: "request:fail"
        }));
        var o = t.url,
          r = t.header || {};
        if (!(0, c.checkUrl)(o)) return f--, void(n && n({
          errMsg: "request:fail"
        }));
        if (!(0, a.checkTLS)(o)) return f--, void(n && n({
          errMsg: "request:fail 小程序要求的 TLS 版本必须大于等于 1.2"
        }));
        var s, l = new XMLHttpRequest,
          d = t.method || "POST",
          p = (t.complete, u.appconfig.networkTimeout && u.appconfig.networkTimeout.request);
        var ms = t.url.match(/^https?:\/\/[^\/]+/)
        var host = ms ? ms[0] : ''
        var url = t.url.replace(host, '')
        l.open(d, url, !0), l.onreadystatechange = function() {
          if (3 == l.readyState, 4 == l.readyState) {
            l.onreadystatechange = null;
            var e = l.status;
            if (0 == e);
            else {
              var r = a.securityDetails[o];
              if (r) {
                var u = function() {
                  f--, s && clearTimeout(s), (0, a.checkTLS)(t.url) ? n && n({
                    errMsg: "request:ok",
                    data: l.responseText,
                    statusCode: e
                  }) : n && n({
                    errMsg: "request:fail 小程序要求的 TLS 版本必须大于等于 1.2"
                  })
                };
                r.isReady ? u() : i["default"].once("TLS_CHECK_READY_" + r.id, u)
              } else f--, s && clearTimeout(s), n && n({
                errMsg: "request:ok",
                data: l.responseText,
                statusCode: e
              })
            }
          }
        }, l.onerror = function() {
          n && n({
            errMsg: "request:fail"
          })
        };
        if (host) l.setRequestHeader('X-Remote', host);
        var v = 0;
        for (var g in r) "content-type" === g.toLowerCase() && v++;
        v >= 2 && delete r["content-type"];
        var h = !1;
        for (var _ in r)
          if (r.hasOwnProperty(_)) {
            var m = _.toLowerCase();
            h = "content-type" == m || h, "cookie" === m ? l.setRequestHeader("_Cookie", r[_]) : l.setRequestHeader(_, r[_])
          }
          "POST" != d || h || l.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), l.setRequestHeader("X-Requested-With", "XMLHttpRequest"), "number" == typeof p && (s = setTimeout(function() {
          l.abort("timeout"), t.complete && t.complete(), t.complete = null, f--, n && n({
            errMsg: "request:fail"
          })
        }, p));
        var w = "string" == typeof t.data ? t.data : null;
        try {
          l.send(w)
        } catch (y) {
          f--, n && n({
            errMsg: "request:fail"
          })
        }
      },
      p = function(e, t, n) {
        var o = t.url,
          r = t.header;
        if (!(0, c.checkUrl)(o, "webscoket")) return void(n && n({
          errMsg: "connectSocket:fail"
        }));
        l = new WebSocket(o);
        for (var s in r) r.hasOwnProperty(s);
        l.onopen = function(e) {
          i["default"].emit("triggerOnEvent", "onSocketOpen", e)
        }, l.onmessage = function(e) {
          i["default"].emit("triggerOnEvent", "onSocketMessage", {
            data: e.data
          })
        }, l.onclose = function(e) {
          i["default"].emit("triggerOnEvent", "onSocketClose", e)
        }, l.onerror = function(e) {
          i["default"].emit("triggerOnEvent", "onSocketError", e)
        }, n && n({
          errMsg: "connectSocket:ok"
        })
      },
      v = function(e, t, n) {
        l ? (l.close(), l = null, n && n({
          errMsg: "closeSocket:ok"
        })) : n && n({
          errMsg: "closeSocket:fail"
        })
      },
      g = function(e, t, n) {
        var o = t.data;
        if (l) try {
          l.send(o), n && n({
            errMsg: "sendSocketMessage:ok"
          })
        } catch (r) {
          n && n({
            errMsg: "sendSocketMessage:fail " + r.message
          })
        } else n && n({
          errMsg: "sendSocketMessage:fail"
        })
      };
    t["default"] = {
      request: d,
      connectSocket: p,
      sendSocketMessage: g,
      closeSocket: v
    }
  }, function(e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }

    function r(e) {
      var t = document.createElement("a");
      return t.href = e, t.href
    }

    function i(e) {
      if (true) return !0;
      if (0 !== e.indexOf("https://")) return !0;
      e = r(e);
      var t = l[e],
        n = !1;
      if (void 0 === t) {
        var o = f++;
        return l[e] = {
          isReady: n,
          id: o
        }, !0
      }
      if (!t.isReady) return !0;
      var i = !1,
        s = t.protocol;
      return s && (s = s.replace("TLS ", ""), i = parseFloat(s) >= 1.2), i
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.securityDetails = t.checkTLS = void 0;
    var s = n(5),
      a = o(s),
      u = n(6),
      c = o(u),
      l = window.securityDetails = {},
      f = 1e4;
    window.setSecurityDetails = function(e, t) {
      t = JSON.parse(t), l[e] = Object.assign(l[e], t), l[e].isReady = !0;
      var n = l[e].id;
      c["default"].emit("TLS_CHECK_READY_" + n)
    }, t.checkTLS = i, t.securityDetails = l
  }, function(e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }

    function r(e, t) {
      if (true) return console.warn("工具未检查安全域名，更多请参考文档：https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html"),!0;
      if (!__wxConfig.urlCheck) return console.group(new Date + " 配置中关闭 URL 校验"), console.warn("开发者主动关闭 URL 检查，工具未检查安全域名"), console.groupEnd(), !0;
      try {
        var n = function() {
          var n = [];
          n = "download" === t ? u.NetworkConfig.DownloadDomain : "upload" === t ? u.NetworkConfig.UploadDomain : "webscoket" === t ? u.NetworkConfig.WsRequestDomain : u.NetworkConfig.RequestDomain;
          for (var o = 0; o < n.length; o++)
            if (e && 0 === e.indexOf(n[o])) return {
              v: !0
            };
          var r = [];
          n.forEach(function(e) {
            r.push([e])
          }), console.group(new Date + " 合法域名校验出错"), console.error(" " + e + " 不在以下合法域名列表中，请参考文档：https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html"), console.table(r), console.groupEnd()
        }();
        if ("object" === ("undefined" == typeof n ? "undefined" : i(n))) return n.v
      } catch (o) {
        return console.error(o), !1
      }
    }
    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      s = n(5),
      a = o(s),
      u = n(4),
      c = function(e, t, n) {
        return !!r(t.url, "upload") || (n({
          errMsg: e + ":fail illegal host"
        }), !1)
      },
      l = function(e, t, n) {
        return !!r(t.url, "download") || (n({
          errMsg: e + ":fail illegal host"
        }), !1)
      };
    e.exports = {
      uploadFile: c,
      downloadFile: l,
      checkUrl: r
    }
  }, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t["default"] = {
      openAddress: function(e, t, n) {
        n && n({
          errMsg: "openAddress:ok",
          userName: "张三",
          addressPostalCode: "510000",
          provinceFirstStageName: "广东省",
          addressCitySecondStageName: "广州市",
          addressCountiesThirdStageName: "天河区",
          addressDetailInfo: "某巷某号",
          nationalCode: "510630"
        })
      },
      chooseContact: function(e, t, n) {
        n && n({
          errMsg: "chooseContact:ok",
          phoneNumber: "18688888888",
          firstName: "lin",
          middleName: "none",
          lastName: "chao"
        })
      },
      reportKeyValue: function() {},
      reportIDKey: function() {}
    }
  }, function(e, t) {
    "use strict";

    function n() {
      var e = ["Promise", "Caches", "screen", "performance ", "getComputedStyle", "openDatabase"];
      e.forEach(function(e) {
        delete window[e]
      }), window.chrome = void 0, window.addEventListener("load", function(e) {
        history.replaceState({}, {}, location.href + "?load")
      })
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t["default"] = n
  }])
});
