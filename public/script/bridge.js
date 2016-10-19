/*global define, __wxAppData, WeixinJSBridge, __wxConfig*/
// 通讯, storage, reload javscript,
// 代理 request，
// onCompassChangem/onAccelerometerChange API
"use strict";
var ua = navigator.userAgent
Object.defineProperty(navigator, 'userAgent', {
  get : function () {
    return ua +' appservice webview/10000'
  }
})

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
  return typeof e
} : function(e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
};
! function(e, t) {
  if ("object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "object" === ("undefined" == typeof module ? "undefined" : _typeof(module))) module.exports = t();
  else if ("function" == typeof define && define.amd) define([], t);
  else {
    var n = t();
    for (var o in n)("object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) ? exports : e)[o] = n[o]
  }
}(void 0, function() {
  var storage = window.parent.__storage

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
      s = n(13),
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
        d["default"].emit("triggerOnEvent", u, l, n.webviewID), d["default"].emit("triggerSubscribeEvent", u, l, n.webviewID)
      } else if ("GET_APP_DATA" === t) f["default"].sendMsgToNW({
        appData: __wxAppData,
        sdkName: "send_app_data"
      });
      else if ("WRITE_APP_DATA" === t)
        for (var c in n) {
          var p = n[c],
            v = p.__webviewId__;
          (0, _["default"])("appDataChange", {
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
      a = n(4),
      u = (o(a), n(3)),
      f = o(u),
      l = n(5),
      d = o(l),
      c = n(7),
      p = o(c),
      v = n(8),
      g = o(v),
      h = n(9),
      _ = o(h),
      m = n(11),
      w = o(m);
    f["default"].registerCallback(r), t["default"] = {
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
      i = (o(r), __wxConfig.apphash),
      s = __wxConfig.appid,
      a = __wxConfig.appname,
      u = navigator.userAgent,
      f = parseInt(u.match(/webview\/(\d*)/)[1]),
      l = [],
      d = [],
      c = function() {
        for (var e in d) d[e].apply(this, arguments)
      },
      p = function(e) {
        d.push(e)
      },
      v = function(e) {
        var t = JSON.parse(JSON.stringify(e));
        t.to = "backgroundjs", t.comefrom = "webframe", t.command = "COMMAND_FROM_ASJS", t.appid = s, t.appname = a, t.apphash = i, t.webviewID = f, window.parent.postMessage(t, "*")
      },
      g = function(e) {
        e.command = "COMMAND_FROM_ASJS", e.appid = s, e.appname = a, e.apphash = i, e.webviewID = f;
        var t = "____sdk____" + JSON.stringify(e);
        var args = e.args;
        delete e.to
        if (e.sdkName == 'setStorageSync') {
          if (args.key == null || args.data == null) {
            c(toResult({
              errMsg: "setStorage:fail"
            }, e))
          } else {
            storage.set(args.key, args.data, args.dataType)
            c(toResult({
              errMsg: "setStorage:ok"
            }, e))
          }
        } else if (e.sdkName == 'getStorageSync'){
          if (args.key == null || args.key == '') {
            return c(toResult({
              errMsg: "getStorage:fail"
            }), 'GET_ASSDK_RES')
          }
          var res = storage.get(args.key)
          c(toResult({
            data: res.data,
            dataType: res.dataType,
            errMsg: "getStorage:ok"
          }, e, 'GET_ASSDK_RES'))
        } else if (e.sdkName == 'clearStorageSync') {
          storage.clear()
          c(toResult({
            errMsg: "clearStorage:ok"
          }, e))
        } else {
          console.log('Ignored sdk call ' + JSON.stringify(o))
        }
        //  n = prompt(t);
        //n = JSON.parse(n), delete n.to, c(n)
      };
    window._____sendMsgToNW = v;
    var h = function(e) {
        e.to = "contentscript", e.comefrom = "webframe", e.webviewID = f, window.parent.postMessage(e, "*")
      },
      _ = function(e, t, n) {
        var o = /Sync$/.test(e),
          r = {
            sdkName: e,
            args: t,
            callbackID: n
          };
        o ? g(r) : v(r)
      };
    window.addEventListener("message", function(e) {
      var t = e.data,
        n = t.to;
      if ("appservice" === n) return delete n.appservice, "complete" !== document.readyState ? void l.push(t) : void c(t)
    }), window.addEventListener("load", function() {
      l.forEach(function(e) {
        c(e)
      }), l = []
    }), h({
      command: "SHAKE_HANDS"
    }), t["default"] = {
      brigeToNW: _,
      sendMsgToNW: v,
      registerCallback: p
    }
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
        return !(!n() || !r.hasOwnProperty(e)) && (console.warn("请注意无 AppID 关联下，调用 wx." + e + " 是受限的, API 的返回是工具的模拟返回"), setTimeout(function() {
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
    var o = n(6).EventEmitter;
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
      return "object" === ("undefined" == typeof e ? "undefined" : _typeof(e)) && null !== e
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
      a = n(5),
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
        onMusicPlay: [],
        onCompassChange: [],
        onAccelerometerChange: [],
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
        } catch (d) {
          i = !0, s = d
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
      a = n(5),
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
        if (i > f.AppserviceMaxDataSize) return void console.error("%c " + e + " 数据传输长度为 " + i + " 已经超过最大长度 " + f.AppserviceMaxDataSize, "color: red; font-size: x-large")
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
      f = n(10)
  }, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = t.appconfig = Object.assign({
        domain: [""],
        networkTimeout: {
          request: 3e4,
          connectSocket: 3e4,
          uploadFile: 3e4,
          downloadFile: 3e4
        }
      }, __wxConfig),
      o = t.projectConfig = n.projectConfig || {};
    t.MaxRequestConcurrent = o.Setting && o.Setting.MaxRequestConcurrent || 5, t.NetworkConfig = o && o.Network || {}, t.AppserviceMaxDataSize = __wxConfig.appserviceConfig.AppserviceMaxDataSize
  }, function(e, t, n) {
    function o(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }

    function r() {
      var e = Math.random();
      return _[e] ? r() : e
    }

    function i(e) {
      var t = e.command,
        n = e.msg || {},
        o = e.ext || {};
      if ("GET_ASSDK_RES" === t) {
        var r = o.callbackID;
        _[r](n), delete _[r]
      }
    }

    function s(e, t, n) {
      if (u["default"].debugLog(new Date + " WeixinJSBridge invoke " + e, arguments), !l["default"].check.apply(this, arguments))
        if (u["default"].debugInfo({
            type: "invoke",
            eventName: e,
            data: arguments,
            timesmap: new Date
          }), m.hasOwnProperty(e)) m[e].apply(this, arguments);
        else {
          var o = r(),
            i = function(t) {
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
                c["default"].emit("triggerOnEvent", "onAppRoute", {
                  path: i,
                  query: s,
                  openType: l,
                  webviewId: t.webviewId
                })
              }
              n && n(t)
            };
          _[o] = i, v["default"].brigeToNW(e, t, o)
        }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t["default"] = s;
    var a = n(2),
      u = o(a),
      f = n(4),
      l = o(f),
      d = n(5),
      c = o(d),
      p = n(3),
      v = o(p),
      g = n(12),
      h = o(g),
      _ = {};
    v["default"].registerCallback(i);
    var m = Object.assign({
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
    }, h["default"])
  }, function(e, t, n) {
    function o(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }

    function r(e, t) {
      if (u["default"].isTourist()) {
        console.warn("请注意 WEPT 会使用后台转发请求")
        return true
      }
      return true
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i = n(5),
      s = o(i),
      a = n(4),
      u = o(a),
      f = n(10),
      l = null,
      d = 0,
      c = function(e, t, n) {
        if (d++, d > f.MaxRequestConcurrent) return d--, console.error("%c 最多同时发起 " + f.MaxRequestConcurrent + " 个 wx.request 请求", "color: red; font-size: x-large"), void(n && n({
          errMsg: "request:fail;"
        }));
        var o = t.url,
          i = t.header || {};
        if (!r(o)) return d--, console.error("%c URL 域名不合法，请在 mp 后台配置后重试", "color: red; font-size: x-large"), void(n && n({
          errMsg: "request:fail;"
        }));
        var s, a = new XMLHttpRequest,
          u = t.method || "GET",
          l = (t.complete, f.appconfig.networkTimeout && f.appconfig.networkTimeout.request);
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
          "POST" != u || c || a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), a.setRequestHeader("X-Requested-With", "XMLHttpRequest"), "number" == typeof l && (s = setTimeout(function() {
          a.abort("timeout"), t.complete && t.complete(), t.complete = null, d--, n && n({
            errMsg: "request:fail"
          })
        }, l));
        var g = "string" == typeof t.data ? t.data : null;
        try {
          a.send(g)
        } catch (h) {
          d--, n && n({
            errMsg: "request:fail"
          })
        }
      },
      p = function(e, t, n) {
        var o = t.url,
          i = t.header;
        if (!r(o, "webscoket")) return n && n({
          errMsg: "connectSocket:fail"
        }), void console.error("%c URL 域名不合法，请在 mp 后台配置后，重启项目继续测试", "color: red; font-size: x-large");
        l = new WebSocket(o);
        for (var a in i) i.hasOwnProperty(a);
        l.onopen = function(e) {
          s["default"].emit("triggerOnEvent", "onSocketOpen", e)
        }, l.onmessage = function(e) {
          s["default"].emit("triggerOnEvent", "onSocketMessage", {
            data: e.data
          })
        }, l.onclose = function(e) {
          s["default"].emit("triggerOnEvent", "onSocketClose", e)
        }, l.onerror = function(e) {
          s["default"].emit("triggerOnEvent", "onSocketError", e)
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
            errMsg: "sendSocketMessage:fail," + r.message
          })
        } else n && n({
          errMsg: "sendSocketMessage:fail"
        })
      };
    t["default"] = {
      request: c,
      connectSocket: p,
      sendSocketMessage: g,
      closeSocket: v
    }
  }, function(e, t) {
    function n(e) {
      var t = ["Pormise", "chrome", "Caches", "screen"];
      t.forEach(function(e) {
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
          var func = new Function('window.__wxRoute="' + path + '";\n' + text)
          func()
        }
      }
    }
    xhr.open('GET', '/generateJavascript?path=' + encodeURIComponent(p))
    xhr.send()
  })
}()
