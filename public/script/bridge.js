/*global define, __wxAppData, WeixinJSBridge, __wxConfig*/
// 通讯, storage, reload javscript,
// 代理 request，
// onCompassChange/onAccelerometerChange API
"use strict";
var ua = navigator.userAgent
Object.defineProperty(navigator, 'userAgent', {
  get : function () {
    return ua +' appservice webview/10000'
  }
})

var _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
  return typeof e
} : function(e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
};
! function(e, t) {
  if ("object" === ("undefined" == typeof exports ? "undefined" : _typeof2(exports)) && "object" === ("undefined" == typeof module ? "undefined" : _typeof2(module))) module.exports = t();
  else if ("function" == typeof define && define.amd) define([], t);
  else {
    var n = t();
    for (var o in n)("object" === ("undefined" == typeof exports ? "undefined" : _typeof2(exports)) ? exports : e)[o] = n[o]
  }
}(void 0, function() {

  function systemInfo() {
     return {
      model: /iPhone/.test(navigator.userAgent) ? 'iPhone6' : 'Android',
      pixelRatio: window.devicePixelRatio || 1,
      windowWidth: window.top.screen.width || 0,
      windowHeight: window.top.screen.height || 0,
      language: window.navigator.userLanguage || window.navigator.language,
      version: "6.3.9"
    }
  }

  function toResult(msg, data, command) {
    let obj = {
      ext: data,
      msg: msg
    }
    if (command) obj.command = command
    return obj
  }

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
    function o(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var r = n(1),
      i = o(r),
      s = n(14),
      a = o(s);
    (0, a["default"])(), window.MutationObserver = window.WebKitMutationObserver = window.File = void 0, window.WeixinJSBridge = i["default"]
  }, function(e, t, n) {
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
        c["default"].emit("triggerOnEvent", u, l, n.webviewID), c["default"].emit("triggerSubscribeEvent", u, l, n.webviewID)
      } else if ("GET_APP_DATA" === t) f["default"].sendMsgToNW({
        appData: __wxAppData,
        sdkName: "send_app_data"
      });
      else if ("WRITE_APP_DATA" === t)
        for (var d in n) {
          var p = n[d],
            v = p.__webviewId__;
          console.log(p), (0, m["default"])("appDataChange", {
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
      f = o(u),
      l = n(6),
      c = o(l),
      d = n(8),
      p = o(d),
      v = n(9),
      g = o(v),
      h = n(10),
      m = o(h),
      _ = n(11),
      w = o(_);
    f["default"].registerCallback(r), t["default"] = {
      invoke: w["default"],
      on: p["default"],
      subscribe: g["default"],
      publish: m["default"]
    }
  }, function(e, t, n) {
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
        fun: "openToolsLog"
      }, {
        fun: "openVendor"
      }])
    }, window.openToolsLog = function() {
      i["default"].sendMsgToNW({
        sdkName: "__open-tools-log"
      })
    }, window.openVendor = function() {
      i["default"].sendMsgToNW({
        sdkName: "__open-tools-vendor"
      })
    };
    var u = function() {
        return s
      },
      f = function(e, t) {
        s && (console.group(e), console.debug.apply(void 0, t), console.groupEnd(e))
      },
      l = function(e) {
        a.push(e)
      };
    t["default"] = {
      debugLog: f,
      debugInfo: l,
      isDev: u
    }
  }, function(e, t, n) {
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
      f = navigator.userAgent,
      l = parseInt(f.match(/webview\/(\d*)/)[1]),
      c = [],
      d = [],
      p = function() {
        for (var e in d) d[e].apply(this, arguments)
      },
      v = function(e) {
        d.push(e)
      },
      g = function(e) {
        var t = JSON.parse(JSON.stringify(e));
        t.to = "backgroundjs", t.comefrom = "webframe", t.command = "COMMAND_FROM_ASJS", t.appid = a, t.appname = u, t.apphash = s, t.webviewID = l, window.parent.postMessage(t, "*")
      },
      h = function(e) {
        e.command = "COMMAND_FROM_ASJS", e.appid = a, e.appname = u, e.apphash = s, e.webviewID = l;

        var storage = window.parent.__storage
        var args = e.args;
        delete e.to
        if (e.sdkName == 'setStorageSync') {
          if (args.key == null || args.data == null) {
            p(toResult({
              errMsg: "setStorage:fail"
            }, e))
          } else {
            storage.set(args.key, args.data, args.dataType)
            p(toResult({
              errMsg: "setStorage:ok"
            }, e))
          }
        } else if (e.sdkName == 'getStorageSync'){
          if (args.key == null || args.key == '') {
            return p(toResult({
              errMsg: "getStorage:fail"
            }), 'GET_ASSDK_RES')
          }
          var res = storage.get(args.key)
          p(toResult({
            data: res.data,
            dataType: res.dataType,
            errMsg: "getStorage:ok"
          }, e, 'GET_ASSDK_RES'))
        } else if (e.sdkName == 'clearStorageSync') {
          storage.clear()
          p(toResult({
            errMsg: "clearStorage:ok"
          }, e))
        } else if (e.sdkName == 'removeStorageSync') {
          if (args.key == null || args.key == '') {
            return p(toResult({
              errMsg: "removeStorage:fail"
            }), 'GET_ASSDK_RES')
          }
          storage.remove(args.key)
          p(toResult({
            errMsg: "removeStorage:ok"
          }, e, 'GET_ASSDK_RES'))
        } else if (e.sdkName == 'getStorageInfoSync') {
          var obj = storage.info()
          obj.errMsg =  "getStorageInfoSync:ok"
          p(toResult(obj, e, 'GET_ASSDK_RES'))
        } else if (e.sdkName == 'getSystemInfo'){
          let info = systemInfo()
          info.errMsg = "getSystemInfo:ok"
          p(toResult(info, e, 'GET_ASSDK_RES'))
        } else {
          console.log('Ignored sdk call ' + e.sdkName)
        }
        //var t = "____sdk____" + JSON.stringify(e),
        //  n = prompt(t);
        //n = JSON.parse(n), delete n.to, p(n)
      };
    window._____sendMsgToNW = g;
    var m = function(e) {
        e.to = "contentscript", e.comefrom = "webframe", e.webviewID = l, window.parent.postMessage(e, "*")
      },
      _ = function(e, t, n) {
        var o = (0, i.isSyncSDK)(e),
          r = {
            sdkName: e,
            args: t,
            callbackID: n
          };
        o ? h(r) : g(r)
      };
    window.addEventListener("message", function(e) {
      var t = e.data,
        n = t.to;
      if ("appservice" === n) return delete n.appservice, "complete" !== document.readyState ? void c.push(t) : void p(t)
    }), window.addEventListener("load", function() {
      c.forEach(function(e) {
        p(e)
      }), c = []
    }), m({
      command: "SHAKE_HANDS"
    }), t["default"] = {
      brigeToNW: _,
      sendMsgToNW: g,
      registerCallback: v
    }
  }, function(e, t) {
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
    t.MaxRequestConcurrent = i.Setting && i.Setting.MaxRequestConcurrent || 5, t.NetworkConfig = i && i.Network || {}, t.AppserviceMaxDataSize = __wxConfig.appserviceConfig.AppserviceMaxDataSize
  }, function(e, t) {
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
      return "object" === ("undefined" == typeof e ? "undefined" : _typeof2(e)) && null !== e
    }

    function s(e) {
      return void 0 === e
    }
    e.exports = n, n.EventEmitter = n, n.prototype._events = void 0, n.prototype._maxListeners = void 0, n.defaultMaxListeners = 10, n.prototype.setMaxListeners = function(e) {
      if (!r(e) || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");
      return this._maxListeners = e, this
    }, n.prototype.emit = function(e) {
      var t, n, r, a, u, f;
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
        for (a = Array.prototype.slice.call(arguments, 1), f = n.slice(), r = f.length, u = 0; u < r; u++) f[u].apply(this, a);
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
      }), "onAppEnterForeground" === e && (l.onAppShow || (t && t({}), l.onAppShow = !0)), f.hasOwnProperty(e) && t && f[e].push(t)
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t["default"] = r;
    var i = n(2),
      s = o(i),
      a = n(6),
      u = o(a),
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
        onCompassChange: [],
        onAccelerometerChange: [],
        onMusicPlay: [],
        onMusicPause: [],
        onMusicEnd: [],
        onMusicError: [],
        onPullDownRefresh: []
      },
      l = {
        onAppShow: !1
      };
    u["default"].on("triggerOnEvent", function(e, t, n) {
      if (f.hasOwnProperty(e)) {
        var o = f[e],
          r = !0,
          i = !1,
          s = void 0;
        try {
          for (var a, u = o[Symbol.iterator](); !(r = (a = u.next()).done); r = !0) {
            var l = a.value;
            l(t, n)
          }
        } catch (c) {
          i = !0, s = c
        } finally {
          try {
            !r && u["return"] && u["return"]()
          } finally {
            if (i) throw s
          }
        }
      }
    })
  }, function(e, t, n) {
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
      }), f[e] = t
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t["default"] = r;
    var i = n(2),
      s = o(i),
      a = n(6),
      u = o(a),
      f = {};
    u["default"].on("triggerSubscribeEvent", function(e, t, n) {
      f.hasOwnProperty(e) && f[e](t, n)
    })
  }, function(e, t, n) {
    function o(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }

    function r(e, t, n, o) {
      if (s["default"].debugLog(new Date + " WeixinJSBridge publish " + e, arguments), t && 0 !== e.indexOf("canvas")) {
        var r = JSON.stringify(t),
          i = r.length;
        if (i > f.AppserviceMaxDataSize) return console.group(new Date + " 数据传输错误"), console.error(e + " 数据传输长度为 " + i + " 已经超过最大长度 " + f.AppserviceMaxDataSize), void console.groupEnd()
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
      f = n(4)
  }, function(e, t, n) {
    function o(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }

    function r() {
      var e = Math.random();
      return M[e] ? r() : e
    }

    function i(e) {
      var t = e.command,
        n = e.msg || {},
        o = e.ext || {};
      if ("GET_ASSDK_RES" === t) {
        var r = o.callbackID;
        "function" == typeof M[r] && (M[r](n), delete M[r])
      }
    }

    function s(e, t, n) {
      if (u["default"].debugLog(new Date + " WeixinJSBridge invoke " + e, arguments), !l["default"].check.apply(this, arguments)) {
        var o = (0, w.isLockSDK)(e),
          i = +new Date;
        if (!(o && i - b < 200))
          if (b = i, u["default"].debugInfo({
              type: "invoke",
              eventName: e,
              data: arguments,
              timesmap: new Date
            }), y.hasOwnProperty(e)) y[e].apply(this, arguments);
          else {
            var s = r(),
              a = function(t) {
                if (t.errMsg.indexOf("ok") > -1 && ("navigateTo" === e || "redirectTo" === e)) {
                  var o = t.url || "",
                    r = o.match(/(([^\?]*)(\?([^\/]*))?)$/),
                    i = "",
                    s = {};
                  if (r) {
                    i = r[2] || "";
                    for (var a = (r[4] || "").split("&"), u = 0; u < a.length; ++u) {
                      var f = a[u].split("=");
                      2 == f.length && (s[f[0]] = f[1])
                    }
                  }
                  var l = e;
                  d["default"].emit("triggerOnEvent", "onAppRoute", {
                    path: i,
                    query: s,
                    openType: l,
                    webviewId: t.webviewId
                  })
                }
                n && n(t)
              };
            M[s] = a, v["default"].brigeToNW(e, t, s)
          }
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t["default"] = s;
    var a = n(2),
      u = o(a),
      f = n(5),
      l = o(f),
      c = n(6),
      d = o(c),
      p = n(3),
      v = o(p),
      g = n(12),
      h = o(g),
      m = n(13),
      _ = o(m),
      w = n(4),
      y = Object.assign(_["default"], h["default"]),
      b = 0,
      M = {};
    v["default"].registerCallback(i)
  }, function(e, t, n) {
    function o(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }

    function r(e, t) {
      if (f["default"].isTourist()) return console.group(new Date + " 无 AppID 关联"), console.warn("工具未检查安全域名，更多请参考文档：https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html"), console.groupEnd(), !0;
      try {
        var n = function() {
          for (var n = "webscoket" === t ? l.NetworkConfig.WsRequestDomain : l.NetworkConfig.RequestDomain, o = 0; o < n.length; o++)
            if (0 === e.indexOf(n[o])) return {
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
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function(e) {
        return "undefined" == typeof e ? "undefined" : _typeof2(e)
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : "undefined" == typeof e ? "undefined" : _typeof2(e)
      },
      s = n(6),
      a = o(s),
      u = n(5),
      f = o(u),
      l = n(4),
      c = null,
      d = 0,
      p = function(e, t, n) {
        if (d++, d > l.MaxRequestConcurrent) return d--, console.group(new Date + " wx.request 错误"), console.error("同时最多发起 " + l.MaxRequestConcurrent + " 个 wx.request 请求，更多请参考文档：https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html"), console.groupEnd(), void(n && n({
          errMsg: "request:fail;"
        }));
        var o = t.url,
          i = t.header || {};
        if (!r(o)) return d--, void(n && n({
          errMsg: "request:fail;"
        }));
        var s, a = new XMLHttpRequest,
          u = t.method || "POST",
          f = (t.complete, l.appconfig.networkTimeout && l.appconfig.networkTimeout.request);
        a.open(u, '/remoteProxy', !0), a.onreadystatechange = function() {
          if (3 == a.readyState, 4 == a.readyState) {
            a.onreadystatechange = null;
            var e = a.status;
            0 == e || (n && n({
              errMsg: "request:ok",
              data: a.responseText,
              statusCode: e
            }), d--, s && clearTimeout(s))
          }
        };
        a.setRequestHeader('X-Remote', t.url)
        var c = !1;
        for (var p in i)
          if (i.hasOwnProperty(p)) {
            var v = p.toLowerCase();
            c = "content-type" == v || c, "cookie" === v ? a.setRequestHeader("_Cookie", i[p]) : a.setRequestHeader(p, i[p])
          }
          "POST" != u || c || a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), a.setRequestHeader("X-Requested-With", "XMLHttpRequest"), "number" == typeof f && (s = setTimeout(function() {
          a.abort("timeout"), t.complete && t.complete(), t.complete = null, d--, n && n({
            errMsg: "request:fail"
          })
        }, f));
        var g = "string" == typeof t.data ? t.data : null;
        try {
          a.send(g)
        } catch (h) {
          d--, n && n({
            errMsg: "request:fail"
          })
        }
      },
      v = function(e, t, n) {
        var o = t.url,
          i = t.header;
        if (!r(o, "webscoket")) return void(n && n({
          errMsg: "connectSocket:fail"
        }));
        c = new WebSocket(o);
        for (var s in i) i.hasOwnProperty(s);
        c.onopen = function(e) {
          a["default"].emit("triggerOnEvent", "onSocketOpen", e)
        }, c.onmessage = function(e) {
          a["default"].emit("triggerOnEvent", "onSocketMessage", {
            data: e.data
          })
        }, c.onclose = function(e) {
          a["default"].emit("triggerOnEvent", "onSocketClose", e)
        }, c.onerror = function(e) {
          a["default"].emit("triggerOnEvent", "onSocketError", e)
        }, n && n({
          errMsg: "connectSocket:ok"
        })
      },
      g = function(e, t, n) {
        c ? (c.close(), c = null, n && n({
          errMsg: "closeSocket:ok"
        })) : n && n({
          errMsg: "closeSocket:fail"
        })
      },
      h = function(e, t, n) {
        var o = t.data;
        if (c) try {
          c.send(o), n && n({
            errMsg: "sendSocketMessage:ok"
          })
        } catch (r) {
          n && n({
            errMsg: "sendSocketMessage:fail," + r.message
          })
        } else n && n({
          errMsg: "sendSocketMessage:fail"
        })
      };
    t["default"] = {
      request: p,
      connectSocket: v,
      sendSocketMessage: h,
      closeSocket: g
    }
  }, function(e, t) {
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
      makePhoneCall: function(e, t, n) {
        var o = t.phoneNumber,
          r = {};
        o ? confirm("拨打 " + o + "?") ? r.errMsg = "makePhoneCall:ok" : r.errMsg = "makePhoneCall:cancel" : r.errMsg = "makePhoneCall:fail", n && n(r)
      },
      reportKeyValue: function() {},
      reportIDKey: function() {}
    }
  }, function(e, t) {
    function n() {
      var e = ["Pormise", "chrome", "Caches", "screen", "performance ", "getComputedStyle", "openDatabase"];
      e.forEach(function(e) {
        window[e] = void 0
      })
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t["default"] = n
  }])
});
!function () {
  WeixinJSBridge.subscribe('reload', function (data) {
    var xhr = new XMLHttpRequest()
    var p = data.path
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var text = xhr.responseText
          var path = p.replace(/\.js$/, '')
          var code = 'window.__wxRoute="' + path + '";' + text
          eval(code)
        }
      }
    }
    xhr.open('GET', '/generateJavascript?path=' + encodeURIComponent(p))
    xhr.send()
  })
}()
