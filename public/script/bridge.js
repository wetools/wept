"use strict";
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
      s = n(17),
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
          f = (n.type, n.data || {});
        0 === u.indexOf("publish_") ? (u = u.replace(/^publish_/, ""), c["default"].emit("triggerSubscribeEvent", u, f, n.webviewID)) : (u = u.replace(/^sys_/, ""), c["default"].emit("triggerOnEvent", u, f, n.webviewID))
      } else if ("GET_APP_DATA" === t) l["default"].sendMsgToNW({
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
      l = o(u),
      f = n(6),
      c = o(f),
      d = n(8),
      p = o(d),
      v = n(10),
      g = o(v),
      h = n(11),
      _ = o(h),
      m = n(12),
      w = o(m);
    l["default"].registerCallback(r), t["default"] = {
      invoke: w["default"],
      on: p["default"],
      subscribe: g["default"],
      publish: _["default"]
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
      }, {
        fun: "showRequestInfo"
      }])
    }, window.showRequestInfo = function() {
      console.table(window.securityDetails)
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
      l = function(e, t) {
        s && (console.group(e), console.debug.apply(void 0, t), console.groupEnd(e))
      },
      f = function(e) {
        a.push(e)
      };
    t["default"] = {
      debugLog: l,
      debugInfo: f,
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
      l = navigator.userAgent,
      f = parseInt(l.match(/webview\/(\d*)/)[1]),
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
        t.to = "backgroundjs", t.comefrom = "webframe", t.command = "COMMAND_FROM_ASJS", t.appid = a, t.appname = u, t.apphash = s, t.webviewID = f, window.parent.postMessage(t, "*")
      },
      h = function(e) {
        e.command = "COMMAND_FROM_ASJS", e.appid = a, e.appname = u, e.apphash = s, e.webviewID = f;
        var t = "____sdk____" + JSON.stringify(e),
          n = prompt(t);
        n = JSON.parse(n), delete n.to, p(n)
      };
    window._____sendMsgToNW = g;
    var _ = function(e) {
        e.to = "contentscript", e.comefrom = "webframe", e.webviewID = f, window.parent.postMessage(e, "*")
      },
      m = function(e, t, n) {
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
    }), _({
      command: "SHAKE_HANDS"
    }), t["default"] = {
      brigeToNW: m,
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
      var t, n, r, a, u, l;
      if (this._events || (this._events = {}), "error" === e && (!this._events.error || i(this._events.error) && !this._events.error.length)) {
        if (t = arguments[1], t instanceof Error) throw t;
        var f = new Error('Uncaught, unspecified "error" event. (' + t + ")");
        throw f.context = t, f
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
        for (a = Array.prototype.slice.call(arguments, 1), l = n.slice(), r = l.length, u = 0; u < r; u++) l[u].apply(this, a);
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
      }), "onAppEnterForeground" === e && (p.onAppShow || (t && t({}), p.onAppShow = !0)), c[e] && t && c[e].push(t), d[e] && t && (d[e] = t)
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t["default"] = r;
    var i = n(2),
      s = o(i),
      a = n(6),
      u = o(a),
      l = n(9),
      f = o(l),
      c = {
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
        onCompassChange: [],
        onAccelerometerChange: [],
        onPullDownRefresh: []
      },
      d = {
        onShareAppMessage: !0
      },
      p = {
        onAppShow: !1
      };
    u["default"].on("triggerOnEvent", function(e, t, n) {
      if (c[e]) {
        var o = c[e],
          r = !0,
          i = !1,
          s = void 0;
        try {
          for (var a, u = o[Symbol.iterator](); !(r = (a = u.next()).done); r = !0) {
            var l = a.value;
            l(t, n)
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
      d[e] && "function" == typeof d[e] && (0, f["default"])(t, n, d[e]), "insertContactButton" === e && (console.group(new Date + "  调用临时会话成功"), console.log("sessionFrom: " + t.sessionFrom), console.groupEnd())
    })
  }, function(e, t) {
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
      }), l[e] = t
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t["default"] = r;
    var i = n(2),
      s = o(i),
      a = n(6),
      u = o(a),
      l = {};
    u["default"].on("triggerSubscribeEvent", function(e, t, n) {
      l[e] && l[e](t, n)
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
        if (i > l.AppserviceMaxDataSize) return console.group(new Date + " 数据传输错误"), console.error(e + " 数据传输长度为 " + i + " 已经超过最大长度 " + l.AppserviceMaxDataSize), void console.groupEnd()
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
      l = n(4)
  }, function(e, t, n) {
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
      if (u["default"].debugLog(new Date + " WeixinJSBridge invoke " + e, arguments), !f["default"].check.apply(this, arguments)) {
        var o = (0, b.isLockSDK)(e),
          i = +new Date;
        if (!(o && i - S < 200))
          if (S = o ? i : 0, u["default"].debugInfo({
              type: "invoke",
              eventName: e,
              data: arguments,
              timesmap: new Date
            }), M.hasOwnProperty(e)) M[e].apply(this, arguments);
          else {
            if (y["default"].hasOwnProperty(e) && !y["default"][e].apply(this, arguments)) return;
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
                      var l = a[u].split("=");
                      2 == l.length && (s[l[0]] = l[1])
                    }
                  }
                  var f = e;
                  d["default"].emit("triggerOnEvent", "onAppRoute", {
                    path: i,
                    query: s,
                    openType: f,
                    webviewId: t.webviewId
                  })
                }
                n && n(t)
              };
            k[s] = a, v["default"].brigeToNW(e, t, s)
          }
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t["default"] = s;
    var a = n(2),
      u = o(a),
      l = n(5),
      f = o(l),
      c = n(6),
      d = o(c),
      p = n(3),
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
      l = n(15),
      f = null,
      c = 0,
      d = function(e, t, n) {
        if (c++, c > u.MaxRequestConcurrent) return c--, console.group(new Date + " wx.request 错误"), console.error("同时最多发起 " + u.MaxRequestConcurrent + " 个 wx.request 请求，更多请参考文档：https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html"), console.groupEnd(), void(n && n({
          errMsg: "request:fail"
        }));
        var o = t.url,
          r = t.header || {};
        if (!(0, l.checkUrl)(o)) return c--, void(n && n({
          errMsg: "request:fail"
        }));
        if (!(0, a.checkTLS)(o)) return c--, void(n && n({
          errMsg: "request:fail 小程序要求的 TLS 版本必须大于等于 1.2"
        }));
        var i, s = new XMLHttpRequest,
          f = t.method || "POST",
          d = (t.complete, u.appconfig.networkTimeout && u.appconfig.networkTimeout.request);
        s.open(f, '/remoteProxy', !0), s.onreadystatechange = function() {
          if (3 == s.readyState, 4 == s.readyState) {
            s.onreadystatechange = null;
            var e = s.status;
            s.setRequestHeader('X-Remote', t.url)
            0 == e || setTimeout(function() {
              return (0, a.checkTLS)(t.url) ? (n && n({
                errMsg: "request:ok",
                data: s.responseText,
                statusCode: e
              }), c--, void(i && clearTimeout(i))) : (c--, void(n && n({
                errMsg: "request:fail 小程序要求的 TLS 版本必须大于等于 1.2"
              })))
            }, 30)
          }
        }, s.onerror = function() {
          n && n({
            errMsg: "request:fail"
          })
        };
        var p = 0;
        for (var v in r) "content-type" === v.toLowerCase() && p++;
        p >= 2 && delete r["content-type"];
        var g = !1;
        for (var h in r)
          if (r.hasOwnProperty(h)) {
            var _ = h.toLowerCase();
            g = "content-type" == _ || g, "cookie" === _ ? s.setRequestHeader("_Cookie", r[h]) : s.setRequestHeader(h, r[h])
          }
          "POST" != f || g || s.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), s.setRequestHeader("X-Requested-With", "XMLHttpRequest"), "number" == typeof d && (i = setTimeout(function() {
          s.abort("timeout"), t.complete && t.complete(), t.complete = null, c--, n && n({
            errMsg: "request:fail"
          })
        }, d));
        var m = "string" == typeof t.data ? t.data : null;
        try {
          s.send(m)
        } catch (w) {
          c--, n && n({
            errMsg: "request:fail"
          })
        }
      },
      p = function(e, t, n) {
        var o = t.url,
          r = t.header;
        if (!(0, l.checkUrl)(o, "webscoket")) return void(n && n({
          errMsg: "connectSocket:fail"
        }));
        f = new WebSocket(o);
        for (var s in r) r.hasOwnProperty(s);
        f.onopen = function(e) {
          i["default"].emit("triggerOnEvent", "onSocketOpen", e)
        }, f.onmessage = function(e) {
          i["default"].emit("triggerOnEvent", "onSocketMessage", {
            data: e.data
          })
        }, f.onclose = function(e) {
          i["default"].emit("triggerOnEvent", "onSocketClose", e)
        }, f.onerror = function(e) {
          i["default"].emit("triggerOnEvent", "onSocketError", e)
        }, n && n({
          errMsg: "connectSocket:ok"
        })
      },
      v = function(e, t, n) {
        f ? (f.close(), f = null, n && n({
          errMsg: "closeSocket:ok"
        })) : n && n({
          errMsg: "closeSocket:fail"
        })
      },
      g = function(e, t, n) {
        var o = t.data;
        if (f) try {
          f.send(o), n && n({
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
      return true
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.securityDetails = t.checkTLS = void 0;
    var s = n(5),
      a = o(s),
      u = window.securityDetails = {};
    t.checkTLS = i, t.securityDetails = u
  }, function(e, t, n) {
    function o(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }

    function r(e, t) {
      return console.warn('WEPT 请求时不检查安全域名')
    }
    var i = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function(e) {
        return "undefined" == typeof e ? "undefined" : _typeof2(e)
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : "undefined" == typeof e ? "undefined" : _typeof2(e)
      },
      s = n(5),
      a = o(s),
      u = n(4),
      l = function(e, t, n) {
        return !!r(t.url, "upload") || (n({
          errMsg: e + ":fail illegal host"
        }), !1)
      },
      f = function(e, t, n) {
        return !!r(t.url, "download") || (n({
          errMsg: e + ":fail illegal host"
        }), !1)
      };
    e.exports = {
      uploadFile: l,
      downloadFile: f,
      checkUrl: r
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
      var e = ["Promise", "chrome", "Caches", "screen", "performance ", "getComputedStyle", "openDatabase"];
      e.forEach(function(e) {
        window[e] = void 0
      }), window.addEventListener("load", function(e) {
        history.replaceState({}, {}, location.href + "?load")
      })
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t["default"] = n
  }])
});
