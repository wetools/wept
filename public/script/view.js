// disable console.log
Object.defineProperty(console, 'log', {
  get: function () {
    return function(){}
  }
})
Object.defineProperty(console, 'info', {
  get: function () {
    return function(){}
  }
})

function _toConsumableArray(e) {
  if (Array.isArray(e)) {
    for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
    return n
  }
  return Array.from(e)
}

function _toArray(e) {
  return Array.isArray(e) ? e : Array.from(e)
}
var Reporter = function(e) {
    function t(i) {
      if (n[i]) return n[i].exports;
      var r = n[i] = {
        exports: {},
        id: i,
        loaded: !1
      };
      return e[i].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
  }([function(e, t, n) {
    "use strict";

    function i(e) {
      "undefined" != typeof WeixinJSBridge ? e() : document.addEventListener("WeixinJSBridgeReady", e, !1)
    }

    function r() {
      var e = arguments;
      i(function() {
        WeixinJSBridge.invoke.apply(WeixinJSBridge, e)
      })
    }

    function o() {
      !g || g.length <= 0 || (r("reportKeyValue", {
        dataArray: g
      }), g = [])
    }

    function a() {
      !A || A.length <= 0 || (r("reportIDKey", {
        dataArray: A
      }), A = [])
    }

    function s() {
      !f || f.length <= 0 || (r("systemLog", {
        dataArray: f
      }), f = [])
    }

    function c(e) {
      return function() {
        try {
          return e.apply(e, arguments)
        } catch (e) {
          throw errorReport(e), e
        }
      }
    }

    function c(e) {
      return function() {
        try {
          return e.apply(e, arguments)
        } catch (e) {
          console.error("reporter error:" + e.stack)
        }
      }
    }

    function l(e) {
      I.__defineGetter__(e, function() {
        return c(E[e])
      })
    }
    var d = n(1),
      u = 1,
      h = 20,
      p = 50,
      g = [],
      A = [],
      f = [],
      v = "",
      w = 50,
      m = 50,
      b = 20,
      x = 50,
      y = 0,
      _ = 0,
      k = 0,
      C = 0;
    r("getPublicLibVersion", {}, function(e) {
      try {
        v = e.version.appVersion + " " + e.version.libVersion
      } catch (e) {}
    });
    var E = {
        speedReport: function(e) {
          var t = e.direction,
            n = e.data,
            i = e.timeMark;
          if (!(Date.now() - y < m)) {
            var r = 0,
              o = 0;
            1 != t && 2 != t || (r = JSON.stringify(n || {}).length, o = i.nativeTime || 0), E.reportKeyValue({
              key: "Speed",
              value: t + "," + i.startTime + "," + o + "," + o + "," + i.endTime + "," + r
            })
          }
        },
        reportKeyValue: function(e) {
          var t = e.key,
            n = e.value;
          d.KeyValueType[t] && (Date.now() - y < m || (y = Date.now(), g.push({
            key: d.KeyValueType[t],
            value: n
          }), g.length >= h && o()))
        },
        reportIDKey: function(e) {
          var t = e.id,
            n = e.key;
          d.IDKeyType[n] && (Date.now() - _ < b || (_ = Date.now(), A.push({
            id: t ? t : "356",
            key: d.IDKeyType[n],
            value: 1
          }), A.length >= u && a()))
        },
        errorReport: function(e) {
          var t = e.key,
            n = e.error;
          d.ErrorType[t] && (E.reportIDKey({
            key: t
          }), E.reportKeyValue({
            key: "Error",
            value: d.ErrorType[t] + "," + n.name + "," + encodeURIComponent(n.message) + "," + encodeURIComponent(n.stack) + "," + encodeURIComponent(v)
          }), a(), o(), s())
        },
        log: function(e) {
          e && "string" == typeof e && (Date.now() - k < x || (k = Date.now(), f.push(e + ""), f.length >= p && s()))
        },
        submit: function() {
          Date.now() - C < w || (C = Date.now(), a(), o(), s())
        }
      },
      I = {};
    for (var S in E) l(S);
    "undefined" != typeof window && (window.onbeforeunload = function() {
      E.submit()
    }), e.exports = I
  }, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    t.IDKeyType = {
      login: 1,
      login_cancel: 2,
      login_fail: 3,
      request_fail: 4,
      connectSocket_fail: 5,
      closeSocket_fail: 6,
      sendSocketMessage_fail: 7,
      uploadFile_fail: 8,
      downloadFile_fail: 9,
      redirectTo_fail: 10,
      navigateTo_fail: 11,
      navigateBack_fail: 12,
      appServiceSDKScriptError: 13,
      webviewSDKScriptError: 14,
      jsEnginScriptError: 15,
      thirdScriptError: 16,
      webviewScriptError: 17,
      exparserScriptError: 18
    }, t.KeyValueType = {
      Speed: "13544",
      Error: "13582"
    }, t.ErrorType = {
      appServiceSDKScriptError: 1,
      webviewSDKScriptError: 2,
      jsEnginScriptError: 3,
      thirdScriptError: 4,
      webviewScriptError: 5,
      exparserScriptError: 6
    }
  }]),
  wx = function(e) {
    function t(i) {
      if (n[i]) return n[i].exports;
      var r = n[i] = {
        exports: {},
        id: i,
        loaded: !1
      };
      return e[i].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
  }([function(e, t, n) {
    "use strict";

    function i(e) {
      return l ? void(c[e] = u[e]) : void c.__defineGetter__(e, function() {
        return function() {
          try {
            return u[e].apply(this, arguments)
          } catch (e) {
            r(e)
          }
        }
      })
    }

    function r(e) {
      if ("[object Error]" === Object.prototype.toString.apply(e)) {
        if ("WebviewSdkKnownError" == e.type) throw e;
        console.error(e.stack), Reporter.errorReport({
          key: "webviewSDKScriptError",
          error: e
        })
      }
    }
    var o = n(1),
      a = n(2);
    n(3);
    var s = !1,
      c = {},
      l = "devtools" === (0, a.getPlatform)(),
      d = function(e, t) {
        (0, o.publish)("INVOKE_METHOD", {
          name: e,
          args: t
        })
      },
      u = {
        invoke: o.invoke,
        on: o.on,
        reportIDKey: function(e, t) {
          console.warn("reportIDKey has been removed wx")
        },
        reportKeyValue: function(e, t) {
          console.warn("reportKeyValue has been removed from wx")
        },
        initReady: function() {
          (0, o.invokeMethod)("initReady")
        },
        redirectTo: function(e) {
          d("redirectTo", e)
        },
        navigateTo: function(e) {
          d("navigateTo", e)
        },
        showKeyboard: function(e) {
          (0, o.invokeMethod)("showKeyboard", e)
        },
        showDatePickerView: function(e) {
          (0, o.invokeMethod)("showDatePickerView", e)
        },
        hideKeyboard: function(e) {
          (0, o.invokeMethod)("hideKeyboard", e)
        },
        insertMap: function(e) {
          (0, o.invokeMethod)("insertMap", e)
        },
        removeMap: function(e) {
          (0, o.invokeMethod)("removeMap", e)
        },
        updateMapCovers: function(e) {
          (0, o.invokeMethod)("updateMapCovers", e)
        },
        getRealRoute: a.getRealRoute,
        getCurrentRoute: function(e) {
          (0, o.invokeMethod)("getCurrentRoute", e, {
            beforeSuccess: function(e) {
              e.route = e.route.split("?")[0]
            }
          })
        },
        getLocalImgData: function(e) {
          "string" == typeof e.path ? u.getCurrentRoute({
            success: function(t) {
              var n = t.route;
              e.path = (0, a.getRealRoute)(n || "index.html", e.path), (0, o.invokeMethod)("getLocalImgData", e)
            }
          }) : (0, o.invokeMethod)("getLocalImgData", e)
        },
        insertVideoPlayer: function(e) {
          (0, o.invokeMethod)("insertVideoPlayer", e)
        },
        removeVideoPlayer: function(e) {
          (0, o.invokeMethod)("removeVideoPlayer", e)
        },
        onAppDataChange: function(e) {
          (0, o.subscribe)("pageInitData", function(t) {
            s === !1 && (s = !0, e(t))
          }), (0, o.publish)("pageReady", {}), (0, o.subscribe)("appDataChange", function(t) {
            setTimeout(function() {
              e(t)
            }, 0)
          })
        },
        publishPageEvent: function(e, t) {
          (0, o.publish)("PAGE_EVENT", {
            eventName: e,
            data: t
          })
        },
        onWxmlChange: function (e) {
          o.subscribe('reload', function(data) {
            if (/\.wxml$/.test(data.path)) {
              e(data)
            } else if (/\.wxss$/.test(data.path)) {
              var p = '/app/' + data.path
              var els = document.getElementsByTagName('link')
              ;[].slice.call(els).forEach(function(el) {
                var href = el.getAttribute('href').replace(/\?(.*)$/, '')
                if (p == href) {
                  console.info('Reload: ' + data.path)
                  el.setAttribute('href', href + '?id=' + Date.now())
                }
              })
            }
          })
        },
        animationToStyle: a.animationToStyle
      };
    for (var h in u) i(h);
    e.exports = c
  }, function(e, t) {
    "use strict";

    function n(e) {
      "undefined" != typeof WeixinJSBridge ? e() : document.addEventListener("WeixinJSBridgeReady", e, !1)
    }

    function i() {
      var e = arguments;
      n(function() {
        WeixinJSBridge.invoke.apply(WeixinJSBridge, e)
      })
    }

    function r() {
      var e = arguments;
      n(function() {
        WeixinJSBridge.on.apply(WeixinJSBridge, e)
      })
    }

    function o() {
      var e = Array.prototype.slice.call(arguments);
      e[1] = {
        data: e[1],
        options: {
          timestamp: Date.now()
        }
      }, n(function() {
        WeixinJSBridge.publish.apply(WeixinJSBridge, e)
      })
    }

    function a() {
      var e = Array.prototype.slice.call(arguments),
        t = e[1];
      e[1] = function(e, n) {
        var i = e.data,
          r = e.options,
          o = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2],
          a = r && r.timestamp || 0,
          s = Date.now();
        "function" == typeof t && t(i, n), Reporter.speedReport({
          direction: 2,
          data: i || {},
          timeMark: {
            startTime: a,
            endTime: s,
            nativeTime: o.nativeTime
          }
        })
      }, n(function() {
        WeixinJSBridge.subscribe.apply(WeixinJSBridge, e)
      })
    }

    function s(e) {
      var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
        n = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2],
        r = {};
      for (var o in t) "function" == typeof t[o] && (r[o] = t[o], delete t[o]);
      i(e, t, function(t) {
        t.errMsg = t.errMsg || e + ":ok";
        var i = 0 === t.errMsg.indexOf(e + ":ok"),
          o = 0 === t.errMsg.indexOf(e + ":cancel"),
          a = 0 === t.errMsg.indexOf(e + ":fail");
        "function" == typeof n.beforeAll && n.beforeAll(t), i ? ("function" == typeof n.beforeSuccess && n.beforeSuccess(t), "function" == typeof r.success && r.success(t), "function" == typeof n.afterSuccess && n.afterSuccess(t)) : o ? ("function" == typeof r.cancel && r.cancel(t), "function" == typeof n.cancel && n.cancel(t)) : a && ("function" == typeof r.fail && r.fail(t), "function" == typeof n.fail && n.fail(t)), "function" == typeof r.complete && r.complete(t), "function" == typeof n.complete && n.complete(t)
      })
    }

    function c(e, t) {
      r(e, t)
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.invoke = i, t.on = r, t.publish = o, t.subscribe = a, t.invokeMethod = s, t.onMethod = c
  }, function(e, t) {
    "use strict";

    function n(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function r(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }

    function o(e, t) {
      if (0 === t.indexOf("/")) return t.substr(1);
      if (0 === t.indexOf("./")) return o(e, t.substr(2));
      var n, i, r = t.split("/");
      for (n = 0, i = r.length; n < i && ".." === r[n]; n++);
      r.splice(0, n);
      var t = r.join("/"),
        a = e.length > 0 ? e.split("/") : [];
      a.splice(a.length - n - 1, n + 1);
      var s = a.concat(r),
        c = s.join("/");
      return c
    }

    function a(e) {
      var t = e.animates,
        n = e.option,
        i = void 0 === n ? {} : n,
        r = i.transformOrigin,
        o = i.transition;
      if ("undefined" == typeof o || "undefined" == typeof t) return {
        transformOrigin: "",
        transform: "",
        transition: ""
      };
      var a = t.filter(function(e) {
          var t = e.type;
          return "style" !== t
        }).map(function(e) {
          var t = e.type,
            n = e.args;
          switch (t) {
            case "matrix":
              return "matrix(" + n.join(",") + ")";
            case "matrix3d":
              return "matrix3d(" + n.join(",") + ")";
            case "rotate":
              return n = n.map(l), "rotate(" + n[0] + ")";
            case "rotate3d":
              return n[3] = l(n[3]), "rotate3d(" + n.join(",") + ")";
            case "rotateX":
              return n = n.map(l), "rotateX(" + n[0] + ")";
            case "rotateY":
              return n = n.map(l), "rotateY(" + n[0] + ")";
            case "rotateZ":
              return n = n.map(l), "rotateZ(" + n[0] + ")";
            case "scale":
              return "scale(" + n.join(",") + ")";
            case "scale3d":
              return "scale3d(" + n.join(",") + ")";
            case "scaleX":
              return "scaleX(" + n[0] + ")";
            case "scaleY":
              return "scaleY(" + n[0] + ")";
            case "scaleZ":
              return "scaleZ(" + n[0] + ")";
            case "translate":
              return n = n.map(c), "translate(" + n.join(",") + ")";
            case "translate3d":
              return n = n.map(c), "translate3d(" + n.join(",") + ")";
            case "translateX":
              return n = n.map(c), "translateX(" + n[0] + ")";
            case "translateY":
              return n = n.map(c), "translateY(" + n[0] + ")";
            case "translateZ":
              return n = n.map(c), "translateZ(" + n[0] + ")";
            case "skew":
              return n = n.map(l), "skew(" + n.join(",") + ")";
            case "skewX":
              return n = n.map(l), "skewX(" + n[0] + ")";
            case "skewY":
              return n = n.map(l), "skewY(" + n[0] + ")";
            default:
              return ""
          }
        }).join(" "),
        s = t.filter(function(e) {
          var t = e.type;
          return "style" === t
        }).reduce(function(e, t) {
          return e[t.args[0]] = t.args[1], e
        }, {});
      return {
        style: s,
        transformOrigin: r,
        transform: a,
        transition: o.duration + "ms " + o.timingFunction + " " + o.delay + "ms"
      }
    }

    function s() {
      return window.navigator ? window.navigator.userAgent.indexOf("wechatdevtools") > -1 ? "devtools" : "android" : "ios"
    }

    function c(e) {
      return "number" == typeof e ? e + "px" : e
    }

    function l(e) {
      return e + "deg"
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.getRealRoute = o, t.animationToStyle = a, t.getPlatform = s;
    t.WebviewSdkKnownError = function(e) {
      function t(e) {
        n(this, t);
        var r = i(this, Object.getPrototypeOf(t).call(this, "Webview-SDK:" + e));
        return r.type = "WebviewSdkKnownError", r
      }
      return r(t, e), t
    }(Error)
  }, function(e, t, n) {
    "use strict";

    function i(e) {
      "loading" !== document.readyState ? e() : document.addEventListener("DOMContentLoaded", e)
    }
    var r = n(1),
      o = !1,
      a = ["log", "warn", "error", "info", "debug"];
    a.forEach(function(e) {
      (0, r.subscribe)(e, function(t) {
        var n = t.log;
        console[e].apply(console, n)
      })
    }), (0, r.subscribe)("initLogs", function(e) {
      var t = e.logs;
      o === !1 && (o = !0, t.forEach(function(e) {
        var t = e.method,
          n = e.log;
        console[t].apply(console, n)
      }), o = !0)
    }), i(function() {
      setTimeout(function() {
        (0, r.publish)("DOMContentLoaded", {})
      }, 11)
    })
  }]),
  exparser = function(e) {
    function t(i) {
      if (n[i]) return n[i].exports;
      var r = n[i] = {
        exports: {},
        id: i,
        loaded: !1
      };
      return e[i].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
  }([function(e, t, n) {
    var i = n(1),
      r = n(3),
      o = n(4),
      a = n(5),
      s = n(9),
      c = n(10);
    t.Behavior = r, t.Element = o, t.Component = a, t.Observer = c, t.registerBehavior = r.create, t.registerElement = a.register, t.createElement = a.create, t.createTextNode = s.create, t.addListenerToElement = i.addListenerToElement, t.addListenerToShadowRoot = i.addListenerToShadowRoot, t.removeListenerFromElement = i.removeListenerFromElement, t.removeListenerFromShadowRoot = i.removeListenerFromShadowRoot, t.triggerEvent = i.triggerEvent, t.triggerDocumentEvent = i.triggerDocumentEvent
  }, function(e, t, n) {
    var i = n(2),
      r = function(e) {
        if (e) {
          for (var t = [], n = 0; n < e.length; n++) {
            var i = e[n];
            t.push({
              pageX: i.pageX,
              pageY: i.pageY,
              clientX: i.clientX,
              clientY: i.clientY,
              screenX: i.screenX,
              screenY: i.screenY
            })
          }
          return t
        }
      },
      o = Date.now(),
      a = function(e, t, n, i) {
        for (var a = !1, s = Date.now() - o, c = r(e.touches), l = e.target.__domElement || e.target, d = l.__wxElement || l, u = function() {
            e.preventDefault && e.preventDefault()
          }, h = function() {
            a = !0
          }, p = function(i, r) {
            var o = i.call(r, {
              target: d,
              currentTarget: r,
              type: t,
              timeStamp: s,
              touches: c,
              keyCode: e.keyCode,
              detail: n,
              preventDefault: u,
              stopPropagation: h
            });
            o === !1 && (u(), a = !0)
          }, g = null, A = l; A; A = A.parentNode) {
          var f = A.__wxElement || A;
          if (A.__wxElement && (A.__wxShadowRootEvents && A.__wxShadowRootEvents[t] && p(A.__wxShadowRootEvents[t], f), g !== f && (l = A, d = l.__wxElement || l), g = f.parentNode, a)) break;
          if (A.__wxEvents && A.__wxEvents[t] && p(A.__wxEvents[t], f), i || a) break
        }
      };
    t.addListenerToElement = function(e, t, n) {
      return e = e.__domElement || e, e.__wxEvents || (e.__wxEvents = Object.create(null)), e.__wxEvents[t] || (e.__wxEvents[t] = i.create()), e.__wxEvents[t].add(n)
    }, t.addListenerToShadowRoot = function(e, t, n) {
      return e = e.__domElement || e, e.__wxShadowRootEvents || (e.__wxShadowRootEvents = Object.create(null)), e.__wxShadowRootEvents[t] || (e.__wxShadowRootEvents[t] = i.create()), e.__wxShadowRootEvents[t].add(n)
    }, t.removeListenerFromElement = function(e, t, n) {
      e = e.__domElement || e, e.__wxEvents && e.__wxEvents[t] && e.__wxEvents[t].remove(n)
    }, t.removeListenerFromShadowRoot = function(e, t, n) {
      e = e.__domElement || e, e.__wxShadowRootEvents && e.__wxShadowRootEvents[t] && e.__wxShadowRootEvents[t].remove(n)
    }, t.triggerEvent = function(e, t, n, i) {
      a({
        target: e
      }, t, n, i)
    }, t.triggerDocumentEvent = a
  }, function(e, t) {
    var n = function() {};
    n.prototype = Object.create(Object.prototype, {
      constructor: {
        value: n,
        writable: !0,
        configurable: !0
      }
    }), n.create = function() {
      var e = Object.create(n.prototype);
      return e.empty = !0, e._arr = [], e._index = 0, e
    }, n.prototype.add = function(e) {
      var t = this._index++;
      return this._arr.push({
        id: t,
        func: e
      }), this.empty = !1, t
    }, n.prototype.remove = function(e) {
      var t = this._arr,
        n = 0;
      if ("function" == typeof e) {
        for (n = 0; n < t.length; n++)
          if (t[n].func === e) return t.splice(n, 1), this.empty = !t.length, !0
      } else
        for (n = 0; n < t.length; n++)
          if (t[n].id === e) return t.splice(n, 1), this.empty = !t.length, !0; return !1
    }, n.prototype.call = function(e, t) {
      for (var n = this._arr, i = !1, r = 0; r < n.length; r++) {
        var o = n[r].func.call(e, t);
        o === !1 && (i = !0)
      }
      if (i) return !1
    }, e.exports = n
  }, function(e, t) {
    var n = function() {};
    n.prototype = Object.create(Object.prototype, {
      constructor: {
        value: n,
        writable: !0,
        configurable: !0
      }
    });
    var i = ["created", "attached", "detached", "contentChanged"],
      r = 1;
    n.create = function(e) {
      var t = String(r++),
        o = n.list[e.is || ""] = Object.create(n.prototype, {
          is: {
            value: e.is || ""
          },
          _id: {
            value: t
          }
        });
      o.template = e.template, o.properties = Object.create(null), o.methods = Object.create(null), o.listeners = Object.create(null);
      for (var a = o.ancestors = [], s = "", c = 0; c < (e.behaviors || []).length; c++) {
        var l = e.behaviors[c];
        "string" == typeof l && (l = n.list[l]);
        for (s in l.properties) o.properties[s] = l.properties[s];
        for (s in l.methods) o.methods[s] = l.methods[s];
        for (var d = 0; d < l.ancestors.length; d++) a.indexOf(l.ancestors[d]) < 0 && a.push(l.ancestors[d])
      }
      for (s in e.properties) o.properties[s] = e.properties[s];
      for (s in e.listeners) o.listeners[s] = e.listeners[s];
      for (s in e) "function" == typeof e[s] && (i.indexOf(s) < 0 ? o.methods[s] = e[s] : o[s] = e[s]);
      return a.push(o), o
    }, n.list = Object.create(null), n.prototype.hasBehavior = function(e) {
      for (var t = 0; t < this.ancestors.length; t++)
        if (this.ancestors[t].is === e) return !0;
      return !1
    }, n.prototype.getAllListeners = function() {
      for (var e = Object.create(null), t = this.ancestors, n = 0; n < t.length; n++) {
        var i = this.ancestors[n];
        for (var r in i.listeners) e[r] ? e[r].push(i.listeners[r]) : e[r] = [i.listeners[r]]
      }
      return e
    }, n.prototype.getAllLifeTimeFuncs = function() {
      var e = Object.create(null),
        t = this.ancestors;
      return i.forEach(function(n) {
        for (var i = e[n] = [], r = 0; r < t.length; r++) {
          var o = t[r];
          o[n] && i.push(o[n])
        }
      }), e
    }, e.exports = n
  }, function(e, t, n) {
    var i = n(2),
      r = function() {};
    r.prototype = Object.create(Object.prototype, {
      constructor: {
        value: r,
        writable: !0,
        configurable: !0
      }
    }), r.initialize = function(e) {
      return e.__attached = !1, e.parentNode = null, e.childNodes = [], e.__attrObservers = i.create(), e.__childObservers = i.create(), e
    };
    var o = function(e) {
        if (!e.parentNode || e.parentNode.__attached) {
          var t = function(e) {
            e.__attached = !0;
            var n = e.childNodes;
            if (n)
              for (var i = 0; i < n.length; i++) t(e.childNodes[i])
          };
          t(e);
          var n = function(e) {
            e.__callLifeTimeFuncs("attached");
            var t = e.childNodes;
            if (t)
              for (var i = 0; i < t.length; i++) n(e.childNodes[i])
          };
          n(e)
        }
      },
      a = function(e) {
        if (e.__attached) {
          var t = function(e) {
            e.__attached = !1;
            var n = e.childNodes;
            if (n)
              for (var i = 0; i < n.length; i++) t(e.childNodes[i])
          };
          t(e);
          var n = function(e) {
            e.__callLifeTimeFuncs("detached");
            var t = e.childNodes;
            if (t)
              for (var i = 0; i < t.length; i++) n(e.childNodes[i])
          };
          n(e)
        }
      },
      s = function(e, t, n) {
        e.__callLifeTimeFuncs("contentChanged", {
          type: t,
          child: n
        }), e.__childObservers.empty || ("add" === t ? e.__childObservers.call(e, {
          type: "childList",
          target: e,
          add: n
        }) : e.__childObservers.call(e, {
          type: "childList",
          target: e,
          remove: n
        }))
      };
    r.prototype.appendChild = function(e) {
      var t = e.parentNode;
      return e.parentNode = this, t && t.childNodes.splice(t.childNodes.indexOf(e), 1), this.childNodes.push(e), this.__contentElement.appendChild(e.__domElement), t && (a(e), s(t, "remove", e)), o(e), s(this, "add", e), e
    }, r.prototype.insertBefore = function(e, t) {
      var n = this.childNodes.indexOf(t);
      if (n < 0) return this.appendChild(e);
      var i = e.parentNode;
      if (e.parentNode = this, i) {
        var r = i.childNodes.indexOf(e);
        i.childNodes.splice(r, 1), i === this && r < n && n--
      }
      return this.childNodes.splice(n, 0, e), this.__contentElement.insertBefore(e.__domElement, t.__domElement), i && (a(e), s(i, "remove", e)), o(e), s(this, "add", e), e
    }, r.prototype.removeChild = function(e) {
      var t = e.parentNode;
      return t !== this ? null : (e.parentNode = null, t && t.childNodes.splice(t.childNodes.indexOf(e), 1), this.__contentElement.removeChild(e.__domElement), t && (a(e), s(t, "remove", e)), e)
    }, r.prototype.replaceChild = function(e, t) {
      var n = this.childNodes.indexOf(t);
      if (n < 0) return this.appendChild(e), null;
      if (e === t) return a(e), s(this, "remove", e), o(e), s(this, "add", e), null;
      var i = e.parentNode;
      if (e.parentNode = this, t.parentNode = null, i) {
        var r = i.childNodes.indexOf(e);
        i.childNodes.splice(r, 1), i === this && r < n && n--
      }
      return this.childNodes[n] = e, this.__contentElement.replaceChild(e.__domElement, t.__domElement), a(t), s(this, "remove", t), i && (a(e), s(i, "remove", e)), o(e), s(this, "add", e), t
    }, r.prototype.triggerEvent = function(e, t, n) {
      exparser.triggerEvent(this, e, t, n)
    }, r.prototype.addListener = function(e, t) {
      exparser.addListenerToElement(this, e, t)
    }, r.prototype.removeListener = function(e, t) {
      exparser.removeListenerFromElement(this, e, t)
    }, r.prototype.setAttribute = function(e, t) {
      return this.__domElement.setAttribute(e, t)
    }, r.prototype.removeAttribute = function(e) {
      return this.__domElement.removeAttribute(e)
    }, r.prototype.replaceDocumentElement = function(e) {
      this.__attached || (e.parentNode.replaceChild(this.__domElement, e), o(this))
    }, e.exports = r
  }, function(e, t, n) {
    function i(e) {
      return e.replace(/[A-Z]/g, function(e) {
        return "-" + e.toLowerCase()
      })
    }
    var r = n(1),
      o = n(6),
      a = n(3),
      s = n(4),
      c = r.addListenerToElement,
      l = r.addListenerToShadowRoot,
      d = o.parseTemplate,
      u = function() {};
    u.prototype = Object.create(Object.prototype, {
      constructor: {
        value: u,
        writable: !0,
        configurable: !0
      }
    }), u.list = Object.create(null);
    var h = function(e, t, n, r) {
      var o = i(n);
      t.type === Boolean ? r ? e.setAttribute(o, "") : e.removeAttribute(o) : t.type === Object || t.type === Array ? e.setAttribute(o, JSON.stringify(r)) : e.setAttribute(o, r)
    };
    u.register = function(e) {
      var t = {
          is: {
            value: e.is || ""
          }
        },
        n = a.create(e),
        i = Object.create(null);
      Object.keys(n.properties).forEach(function(e) {
        var r = n.properties[e];
        r !== String && r !== Number && r !== Boolean && r !== Object && r !== Array || (r = {
          type: r
        }), void 0 === r.value && (r.type === String ? r.value = "" : r.type === Number ? r.value = 0 : r.type === Boolean ? r.value = !1 : r.type === Array ? r.value = [] : r.value = null), i[e] = {
          type: r.type,
          value: r.value,
          coerce: n.methods[r.coerce],
          observer: n.methods[r.observer],
          reflectToAttribute: !!r.reflectToAttribute,
          public: !!r.public
        }, t[e] = {
          enumerable: !0,
          get: function() {
            var t = this.__propData[e];
            return void 0 === t ? i[e].value : t
          },
          set: function(t) {
            var n = i[e];
            n.type === String ? t = String(t) : n.type === Number ? t = Number(t) : n.type === Boolean ? t = !!t : n.type === Array ? t instanceof Array || (t = [t]) : "object" != typeof t && (t = null);
            var r = this.__propData[e];
            n.coerce && (t = n.coerce.call(this, t, r)), this.__propData[e] = t, (n.public || n.reflectToAttribute) && h(this, n, e, t), this.__templateInstance.updateValues(this, this.__propData, e), n.observer && n.observer.call(this, t, r), n.public && !this.__attrObservers.empty && this.__attrObservers.call(this, {
              type: "properties",
              target: this,
              propertyName: e
            })
          }
        }
      });
      var r = u.list[n.is] = Object.create(s.prototype, t);
      r.__behavior = n;
      for (var o in n.methods) r[o] = n.methods[o];
      r.__lifeTimeFuncs = n.getAllLifeTimeFuncs(), r.__callLifeTimeFuncs = function(e, t) {
        for (var n = this.__lifeTimeFuncs[e], i = 0; i < n.length; i++) n[i].call(this, t)
      };
      var c = {};
      for (var l in i) c[l] = i[l].value;
      var p = document.getElementById(n.is);
      !n.template && p && "TEMPLATE" === p.tagName || (p = document.createElement("template"), p.innerHTML = n.template || ""), r.__defaultValues = JSON.stringify(c), r.__template = d(p, c, n.methods);
      var g = n.getAllListeners(),
        A = Object.create(null);
      for (var f in g) {
        for (var v = g[f], w = [], m = 0; m < v.length; m++) w.push(n.methods[v[m]]);
        A[f] = w
      }
      r.__innerEvents = A
    }, u.create = function(e) {
      e = e.toLowerCase();
      var t = document.createElement(e),
        n = u.list[e] || u.list[""],
        i = Object.create(n);
      i.__domElement = t, s.initialize(i), t.__wxElement = i;
      var r = n.__defaultValues || {};
      i.__propData = JSON.parse(r);
      var o = i.__templateInstance = i.__template.createInstance(i);
      i.__domElement.appendChild(o.frag), i.$ = o.idMap, i.$.dom = i.__domElement, i.__contentElement = i.$.content = o.contentElement || i.__domElement;
      var a = n.__innerEvents;
      for (var d in a) {
        var h = d.split(".", 2),
          p = h[h.length - 1],
          g = i,
          A = !0;
        if (2 === h.length && ("" !== h[0] && (g = i.$[h[0]]), A = !1), g)
          for (var f = a[d], v = 0; v < f.length; v++) A ? l(g, p, f[v].bind(i)) : c(g, p, f[v].bind(i))
      }
      return i.__callLifeTimeFuncs("created"), i
    }, u.hasProperty = function(e, t) {
      return void 0 !== e.__propData[t]
    }, s.prototype.hasBehavior = function(e) {
      return this.__behavior.hasBehavior(e)
    }, u.register({
      is: "",
      template: "<wx-content></wx-content>",
      properties: {}
    }), e.exports = u
  }, function(e, t, n) {
    function i(e) {
      return e.replace(/-([a-z])/g, function(e, t) {
        return t.toUpperCase()
      })
    }

    function r(e, t) {
      for (var n = 0; n < t.length; n++) e = e.childNodes[t[n]];
      return e
    }

    function o(e, t, n) {
      var i = l.parse(e);
      return {
        bindedProps: i.bindedProps,
        update: function(e, r, o, a) {
          var s = i.calculate(e, a, t);
          "prop" === n ? r[o] = s : "class" === n ? r.classList.toggle(o, !!s) : "style" === n ? r.style[o] = s : "text" === n ? r.textContent = s : s === !1 ? r.removeAttribute(o) : s === !0 ? r.setAttribute(o, "") : r.setAttribute(o, s)
        }
      }
    }

    function a(e) {
      for (var t = Object.create(null), n = 0; n < e.length; n++) t[e[n].name] = e[n].value;
      return t
    }

    function s(e, t, n) {
      var s = a(e.attributes),
        u = {
          parseTextContent: void 0 !== s["parse-text-content"],
          keepWhiteSpace: void 0 !== s["keep-white-space"]
        },
        h = e.content;
      if ("TEMPLATE" !== e.tagName)
        for (h = document.createDocumentFragment(); e.childNodes.length;) h.appendChild(e.childNodes[0]);
      var p = [],
        g = [],
        A = Object.create(null),
        f = Object.create(null),
        v = function(e) {
          var t = Object.create(null);
          for (var n in A) {
            var i = A[n];
            t[n] = r(e, i)
          }
          return t
        },
        w = function(e) {
          return p.length ? r(e, p) : null
        },
        m = function(e) {
          var t = Object.create(null),
            n = Object.create(null),
            i = null;
          return g.forEach(function(o) {
            var a = r(e, o.path),
              s = o.template.createInstance();
            a.parentNode.replaceChild(s.frag, a);
            for (var c in s.idMap) n[c] = s.idMap[c];
            i = s.contentElement || i, t[o.linkedProp] || (t[o.linkedProp] = []), t[o.linkedProp].push({
              instance: s,
              scope: o.scope
            })
          }), {
            idMap: n,
            contentElement: i,
            childLinksMap: t
          }
        },
        b = function(e) {
          var t = Object.create(null);
          for (var n in f) {
            var i = f[n];
            t[n] = [];
            for (var o = 0; o < i.length; o++) {
              var a = i[o],
                s = r(e, a.path);
              t[n].push({
                node: s,
                attr: a.attr,
                updater: a.updater
              })
            }
          }
          return t
        },
        x = function(e, r, s) {
          s = s || {};
          for (var u = 0; u < e.length; u++) {
            var h = e[u],
              v = r.concat(u);
            if (8 !== h.nodeType)
              if (3 !== h.nodeType)
                if ("WX-CONTENT" !== h.tagName)
                  if ("WX-REPEAT" !== h.tagName) {
                    var w = h.attributes;
                    if (w) {
                      for (var m = [], b = {}, y = 0; y < w.length; y++) {
                        var _ = w[y];
                        if ("id" === _.name) A[_.value] = r.concat(u), m.push("id");
                        else if ("parse-text-content" === _.name) b.parseTextContent = !0, m.push("parse-text-content");
                        else if ("keep-white-space" === _.name) b.keepWhiteSpace = !0, m.push("keep-white-space");
                        else {
                          var k = "",
                            C = "";
                          if (_.name.slice(-1) === d ? (k = "attr", C = _.name.slice(0, -1)) : ":" === _.name.slice(-1) ? (k = "prop", C = i(_.name.slice(0, -1))) : "class." === _.name.slice(0, 6) ? (k = "class", C = _.name.slice(6)) : "style." === _.name.slice(0, 6) && (k = "style", C = _.name.slice(6)), k) {
                            for (var E = o(_.value, n, k), I = E.bindedProps, S = E.update, T = 0; T < I.length; T++) {
                              var B = I[T];
                              f[B] || (f[B] = []), f[B].push({
                                path: v,
                                attr: C,
                                updater: S
                              })
                            }
                            m.push(_.name), S(null, h, C, t)
                          }
                        }
                      }
                      for (var N = 0; N < m.length; N++) h.removeAttribute(m[N]);
                      h.childNodes && x(h.childNodes, v, b), 1 === h.childNodes.length && "WX-CONTENT" === h.childNodes[0].tagName && (p.pop(), h.removeChild(h.childNodes[0]))
                    }
                  } else {
                    var D = a(h.attributes),
                      P = l.parseSingleVariable(D.items),
                      F = c.parseWxRepeat(h, t[P], n, {
                        index: D.index || "index",
                        item: D.item || "item"
                      });
                    g.push({
                      path: v,
                      scope: P,
                      linkedProp: P,
                      template: F
                    })
                  }
            else p = v;
            else {
              var M = h.textContent;
              if (s.keepWhiteSpace || (M = M.trim(), "" === M ? (h.parentNode.removeChild(h), u--) : h.textContent = M), s.parseTextContent) {
                for (var L = o(M, n, "text"), R = L.bindedProps, J = L.update, O = 0; O < R.length; O++) {
                  var H = R[O];
                  f[H] || (f[H] = []), f[H].push({
                    path: v,
                    attr: "",
                    updater: J
                  })
                }
                J(null, h, "", t)
              }
            } else h.parentNode.removeChild(h), u--
          }
        };
      return x(h.childNodes, [], u), 0 === p.length && (p.push(h.childNodes.length), h.appendChild(document.createElement("wx-content"))), 1 === h.childNodes.length && "WX-CONTENT" === h.childNodes[0].tagName && (p.pop(), h.removeChild(h.childNodes[0])), {
        createInstance: function() {
          var e = document.importNode(h, !0),
            t = v(e),
            n = w(e),
            i = b(e),
            r = m(e, i),
            o = r.childLinksMap;
          for (var a in r.idMap) t[a] = t[a] || r.idMap[a];
          return n = n || r.contentElement, {
            frag: e,
            idMap: t,
            contentElement: n,
            updateValues: function(e, t, n) {
              void 0 !== n && (i[n] && i[n].forEach(function(n) {
                n.updater(e, n.node, n.attr, t)
              }), o[n] && o[n].forEach(function(e) {
                e.instance.updateValues(t[e.scope])
              }))
            }
          }
        }
      }
    }
    var c = n(7),
      l = n(8),
      d = String.fromCharCode(36);
    t.parseTemplate = s
  }, function(e, t, n) {
    function i(e, t, n, i) {
      var o = i.index,
        a = i.item,
        s = r.parseTemplate(e, {}, n);
      return {
        createInstance: function() {
          var e = document.createElement("wx-repeat");
          return {
            frag: e,
            updateValues: function(t) {
              e.innerHTML = "";
              for (var n in t) {
                var i = {};
                i[o] = n, i[a] = t[n];
                var r = s.createInstance();
                e.appendChild(r.frag), r.updateValues(e, i, o), r.updateValues(e, i, a)
              }
            }
          }
        }
      }
    }
    var r = n(6);
    t.parseWxRepeat = i
  }, function(e, t) {
    var n = function() {};
    n.prototype = Object.create(Object.prototype, {
      constructor: {
        value: n,
        writable: !0,
        configurable: !0
      }
    }), n.parse = function(e) {
      for (var t = Object.create(n.prototype), i = e.split(/\{\{(.*?)\}\}/g), r = [], o = 0; o < i.length; o++)
        if (o % 2) {
          var a = i[o].match(/^(!?)([-_a-zA-Z0-9]+)(?:\((([-_a-zA-Z0-9]+)(,[-_a-zA-Z0-9]+)*)\))?$/) || [!1, ""],
            s = null;
          if (a[3]) {
            s = a[3].split(",");
            for (var c = 0; c < s.length; c++) r.indexOf(s[c]) < 0 && r.push(s[c])
          } else r.indexOf(a[2]) < 0 && r.push(a[2]);
          i[o] = {
            not: !!a[1],
            prop: a[2],
            callee: s
          }
        }
      return t.bindedProps = r, t.isSingleVariable = 3 === i.length && "" === i[0] && "" === i[2], t._slices = i, t
    }, n.parseSingleVariable = function(e) {
      var t = (e || "").match(/^\{\{([-_a-zA-Z0-9]+)\}\}$/);
      return t ? t[1] : ""
    };
    var i = function(e, t, n, i) {
      var r = "";
      if (i.callee) {
        for (var o = [], a = 0; a < i.callee.length; a++) o[a] = t[i.callee[a]];
        r = n[i.prop].apply(e, o)
      } else r = t[i.prop];
      return i.not ? !r : r
    };
    n.prototype.calculate = function(e, t, n) {
      var r = this._slices,
        o = null,
        a = "";
      if (this.isSingleVariable) o = r[1], a = i(e, t, n, o);
      else
        for (var s = 0; s < r.length; s++) o = r[s], a += s % 2 ? i(e, t, n, o) : o;
      return a
    }, e.exports = n
  }, function(e, t, n) {
    var i = n(2),
      r = function() {};
    r.prototype = Object.create(Object.prototype, {
      constructor: {
        value: r,
        writable: !0,
        configurable: !0
      }
    }), r.create = function(e) {
      var t = Object.create(r.prototype);
      return t.parentNode = null, t.__domElement = document.createTextNode(e || ""), t.__callLifeTimeFuncs = function() {}, t.__textObservers = i.create(), t
    }, Object.defineProperty(r.prototype, "textContent", {
      get: function() {
        return this.__domElement.textContent
      },
      set: function(e) {
        this.__domElement.textContent = e, this.__textObservers.empty || this.__textObservers.call(this, {
          type: "characterData",
          target: this
        })
      }
    }), e.exports = r
  }, function(e, t) {
    var n = function() {};
    n.prototype = Object.create(Object.prototype, {
      constructor: {
        value: n,
        writable: !0,
        configurable: !0
      }
    }), n.create = function(e) {
      var t = Object.create(n.prototype);
      return t._cb = e, t._binded = [], t
    }, n.prototype.observe = function(e, t) {
      t = t || {}, t.properties && e.__attrObservers && this._binded.push({
        funcArr: e.__attrObservers,
        id: e.__attrObservers.add(this._cb)
      }), t.childList && e.__childObservers && this._binded.push({
        funcArr: e.__childObservers,
        id: e.__childObservers.add(this._cb)
      }), t.characterData && e.__textObservers && this._binded.push({
        funcArr: e.__textObservers,
        id: e.__textObservers.add(this._cb)
      })
    }, n.prototype.disconnect = function() {
      for (var e = this._binded, t = 0; t < e.length; t++) e[t].funcArr.remove(e[t].id);
      this._binded = []
    }, e.exports = n
  }]);
! function(e) {
  var t = function(e) {
      return {
        animationName: e.animationName,
        elapsedTime: e.elapsedTime
      }
    },
    n = null;
  ["webkitAnimationStart", "webkitAnimationIteration", "webkitAnimationEnd", "animationstart", "animationiteration", "animationend", "webkitTransitionEnd", "transitionend"].forEach(function(i) {
    if (null === n && (n = "webkit" === i.slice(0, 6)), n) {
      if ("webkit" !== i.slice(0, 6)) return;
      i = i.slice(6).toLowerCase()
    } else if ("webkit" === i.slice(0, 6)) return;
    e.addEventListener(i, function(e) {
      exparser.triggerDocumentEvent(e, i, t(e), !0)
    }, !0)
  })
}(window),
function(e) {
  function t(e) {
    "undefined" != typeof WeixinJSBridge ? e() : document.addEventListener("WeixinJSBridgeReady", e, !1)
  }
  t(function() {
    WeixinJSBridge.subscribe("onAppRouteDone", function() {
      window.__onAppRouteDone = !0, exparser.triggerEvent(document, "routeDone", {})
    })
  }), t(function() {
    WeixinJSBridge.subscribe("setKeyboardValue", function(e) {
      e && e.data && exparser.triggerEvent(document, "setKeyboardValue", {
        value: e.data.value,
        cursor: e.data.cursor,
        inputId: e.data.inputId
      })
    })
  }), t(function() {
    WeixinJSBridge.subscribe("hideKeyboard", function(e) {
      exparser.triggerEvent(document, "hideKeyboard", {})
    })
  }), t(function() {
    WeixinJSBridge.on("onKeyboardComplete", function(e) {
      exparser.triggerEvent(document, "onKeyboardComplete", {
        value: e.value,
        inputId: e.inputId
      })
    })
  })
}(window),
function(e) {
  e.addEventListener("load", function(e) {
    exparser.triggerDocumentEvent(e, "load", void 0, !0)
  }, !0), e.addEventListener("error", function(e) {
    exparser.triggerDocumentEvent(e, "error", void 0, !0)
  }, !0), e.addEventListener("focus", function(e) {
    exparser.triggerDocumentEvent(e, "focus", void 0, !0)
  }, !0), e.addEventListener("blur", function(e) {
    exparser.triggerDocumentEvent(e, "blur", void 0, !0)
  }, !0)
}(window),
function(e) {
  e.addEventListener("change", function(e) {
    exparser.triggerDocumentEvent(e, "change", {
      value: e.target.value
    }, !0)
  }, !0), e.addEventListener("submit", function(e) {
    exparser.triggerDocumentEvent(e, "submit", void 0, !0)
  }, !0), e.addEventListener("reset", function(e) {
    exparser.triggerDocumentEvent(e, "reset", void 0, !0)
  }, !0)
}(window),
function(e) {
  e.addEventListener("keydown", function(e) {
    exparser.triggerDocumentEvent(e, "keydown")
  }, !0), e.addEventListener("keyup", function(e) {
    exparser.triggerDocumentEvent(e, "keyup")
  }, !0), e.addEventListener("keypress", function(e) {
    exparser.triggerDocumentEvent(e, "keypress")
  }, !0), e.addEventListener("input", function(e) {
    exparser.triggerDocumentEvent(e, "input")
  }, !0)
}(window),
function(e) {
  var t = 10,
    n = 350,
    i = 50,
    r = function(e) {
      return e.touches = [{
        pageX: e.pageX,
        pageY: e.pageY,
        clientX: e.clientX,
        clientY: e.clientY,
        screenX: e.screenX,
        screenY: e.screenY
      }], e
    },
    o = function(e, t) {
      return {
        target: t,
        touches: e.touches,
        preventDefault: e.preventDefault.bind(e)
      }
    },
    a = !1,
    s = 0,
    c = 0,
    l = 0,
    d = 0,
    u = null,
    h = !1,
    p = null,
    g = function(e) {
      for (; e; e = e.parentNode) {
        var t = e.__wxElem || e;
        if (t.__wxScrolling && Date.now() - t.__wxScrolling < i) return !0
      }
      return !1
    },
    A = function() {
      exparser.triggerDocumentEvent(d, "longtap", {
        x: c,
        y: l
      })
    },
    f = function(e, t, i) {
      s || (s = e.timeStamp, c = t, l = i, g(e.target) ? (u = null, h = !0, exparser.triggerDocumentEvent(e, "canceltap", {
        x: t,
        y: i
      })) : (u = setTimeout(A, n), h = !1), d = e, a || (p = e.target), exparser.triggerDocumentEvent(e, "track", {
        state: "start",
        x: t,
        y: i
      }), e.defaultPrevented && (s = 0))
    },
    v = function(e, n, i) {
      s && (u && (Math.abs(n - c) < t && Math.abs(i - l) < t || (h = !0, clearTimeout(u), u = null, exparser.triggerDocumentEvent(d, "canceltap", {
        x: n,
        y: i
      }))), a || (e = o(e, p)), exparser.triggerDocumentEvent(e, "track", {
        state: "move",
        x: n,
        y: i
      }))
    },
    w = function(e, t, n, i) {
      s && (s = 0, u && (clearTimeout(u), u = null), i && (e = d, t = c, n = l), a || (e = o(e, p)), exparser.triggerDocumentEvent(e, "track", {
        state: "end",
        x: t,
        y: n
      }), i || h || exparser.triggerDocumentEvent(d, "tap", {
        x: t,
        y: n
      }))
    };
  e.addEventListener("scroll", function(e) {
    e.target.__wxScrolling = Date.now()
  }, !0), e.addEventListener("touchstart", function(e) {
    a = !0, exparser.triggerDocumentEvent(e, "touchstart"), 1 === e.touches.length && f(e, e.touches[0].pageX, e.touches[0].pageY)
  }, !0), e.addEventListener("touchmove", function(e) {
    exparser.triggerDocumentEvent(e, "touchmove"), 1 === e.touches.length && v(e, e.touches[0].pageX, e.touches[0].pageY)
  }, !0), e.addEventListener("touchend", function(e) {
    exparser.triggerDocumentEvent(e, "touchend"), 0 === e.touches.length && w(e, e.changedTouches[0].pageX, e.changedTouches[0].pageY)
  }, !0), e.addEventListener("touchcancel", function(e) {
    exparser.triggerDocumentEvent(e, "touchcancel"), w(null, 0, 0, !0)
  }, !0), window.addEventListener("blur", function() {
    w(null, 0, 0, !0)
  }), e.addEventListener("mousedown", function(e) {
    a || s || (r(e), exparser.triggerDocumentEvent(e, "touchstart"), f(e, e.pageX, e.pageY))
  }, !0), e.addEventListener("mousemove", function(e) {
    !a && s && (r(e), exparser.triggerDocumentEvent(e, "touchmove"), v(e, e.pageX, e.pageY))
  }, !0), e.addEventListener("mouseup", function(e) {
    !a && s && (r(e), exparser.triggerDocumentEvent(e, "touchend"), w(e, e.pageX, e.pageY))
  }, !0)
}(window), window.exparser.registerBehavior({
    is: "wx-base",
    properties: {
      id: {
        type: String,
        public: !0
      },
      hidden: {
        type: Boolean,
        public: !0
      }
    },
    _isDevTools: function() {
      return /wechatdevtools/.test(window.navigator.userAgent.toLowerCase())
    },
    debounce: function(e, t, n) {
      var i = this;
      this.__debouncers = this.__debouncers || {}, this.__debouncers[e] && clearTimeout(this.__debouncers[e]), this.__debouncers[e] = setTimeout(function() {
        "function" == typeof t && t(), i.__debouncers[e] = void 0
      }, n)
    }
  }), window.exparser.registerBehavior({
    is: "wx-data-component",
    properties: {
      name: {
        type: String,
        public: !0
      }
    },
    getFormData: function() {
      return this.value || ""
    },
    resetFormData: function() {}
  }), window.exparser.registerBehavior({
    is: "wx-disabled",
    properties: {
      disabled: {
        type: Boolean,
        value: !1,
        public: !0
      }
    }
  }), window.exparser.registerBehavior({
    is: "wx-group",
    properties: {
      value: {
        type: String,
        public: !0
      },
      curItem: {
        type: Object
      }
    },
    listeners: {
      itemNameChange: "handleItemNameChange",
      itemCheckedChange: "handleItemCheckedChange",
      itemCheck: "handleCheck"
    },
    handleItemCheckedChange: function(e) {
      return e.target.checked ? this.curItem !== e.target && (!this.curItem || (this.curItem.checked = !1), this.curItem = e.target, this.value = e.target.value) : this.curItem === e.target && (this.curItem = null, this.value = ""), !1
    },
    handleItemNameChange: function(e) {
      return e.target === this.curItem && (this.value = e.detail.newval), !1
    },
    handleCheck: function(e) {
      return this.triggerEvent("change", {
        value: e.detail.value
      }, !0), !1
    },
    resetFormData: function() {
      if (this.hasBehavior("wx-data-component")) {
        var e = function e(t) {
          t.childNodes.forEach(function(t) {
            t instanceof exparser.Element && !t.hasBehavior("wx-group") && (t.hasBehavior("wx-item") && t.resetFormData(), e(t))
          })
        };
        e(this)
      }
    }
  }), window.exparser.registerBehavior({
    is: "wx-hover",
    properties: {
      hoverStartTime: {
        type: Number,
        value: 50
      },
      hoverStayTime: {
        type: Number,
        value: 100
      },
      hoverClass: {
        type: String,
        value: "",
        public: !0
      },
      hoverStyle: {
        type: String,
        value: "",
        public: !0
      }
    },
    listeners: {
      touchstart: "_hoverTouchStart",
      touchend: "_hoverTouchEnd",
      canceltap: "_hoverCancel",
      touchcancel: "_hoverCancel"
    },
    _hoverTouchStart: function(e) {
      var t = this;
      if ("none" == this.hoverStyle || "none" == this.hoverClass || this.disabled);
      else {
        if (window.__hoverStyleTimeId) return;
        this.__hoverStyleTimeId = setTimeout(function() {
          t.hoverClass ? t.$.dom.classList.add(t.hoverClass) : t.$.dom.classList.add(t.is.replace("wx-", "") + "-hover")
        }, this.hoverStartTime), window.__hoverStyleTimeId = this.__hoverStyleTimeId
      }
    },
    _hoverTouchEnd: function() {
      var e = this;
      this.__hoverStyleTimeId && (window.__hoverStyleTimeId == this.__hoverStyleTimeId && (window.__hoverStyleTimeId = void 0), this.__hoverStyleTimeId = void 0), setTimeout(function() {
        e._hoverReset()
      }, this.hoverStayTime)
    },
    _hoverCancel: function() {
      this.__hoverStyleTimeId && (clearTimeout(this.__hoverStyleTimeId), window.__hoverStyleTimeId == this.__hoverStyleTimeId && (window.__hoverStyleTimeId = void 0), this.__hoverStyleTimeId = void 0), this._hoverReset()
    },
    _hoverReset: function() {
      "none" == this.hoverStyle || "none" == this.hoverClass || (this.hoverClass ? this.$.dom.classList.remove(this.hoverClass) : this.$.dom.classList.remove(this.is.replace("wx-", "") + "-hover"))
    }
  }), window.exparser.registerBehavior({
    is: "wx-input-base",
    properties: {
      focus: {
        type: Number,
        value: 0,
        observer: "_focusChange",
        public: !0
      },
      autoFocus: {
        type: Boolean,
        value: !1,
        public: !0
      },
      placeholder: {
        type: String,
        value: "",
        observer: "_placeholderChange",
        public: !0
      },
      placeholderStyle: {
        type: String,
        value: "",
        public: !0
      },
      placeholderClass: {
        type: String,
        value: "",
        public: !0
      },
      formate: {
        type: String
      },
      formatePm: {
        type: String,
        value: "下午"
      },
      formateAm: {
        type: String,
        value: "上午"
      },
      fields: {
        type: String,
        value: "day",
        public: !0
      },
      start: {
        type: String,
        value: ""
      },
      end: {
        type: String,
        value: ""
      },
      value: {
        type: String,
        value: "",
        coerce: "_valueChange",
        public: !0
      },
      showValue: {
        type: String,
        value: "",
        observer: "_showValueChange"
      },
      maxlength: {
        type: Number,
        value: 140,
        observer: "_maxlengthChanged",
        public: !0
      },
      type: {
        type: String,
        value: "text",
        public: !0
      },
      password: {
        type: Boolean,
        value: !1,
        public: !0
      },
      disabled: {
        type: Boolean,
        value: !1,
        public: !0
      },
      bindinput: {
        type: String,
        value: "",
        public: !0
      }
    },
    resetFormData: function() {
      this._keyboardShow && (this.__formResetCallback = !0, wx.hideKeyboard()), this.value = "", this.showValue = ""
    },
    getFormData: function(e) {
      this._keyboardShow ? this.__formCallback = e : "function" == typeof e && e(this.value)
    },
    _formGetDataCallback: function() {
      "function" == typeof this.__formCallback && this.__formCallback(this.value), this.__formCallback = void 0
    },
    _focusChange: function(e) {
      this._couldFocus(Boolean(e))
    },
    _couldFocus: function(e) {
      !this._keyboardShow && this._attached && e && this._inputFocus()
    },
    _placeholderChange: function() {
      this._checkPlaceholderStyle(this.value)
    },
    _getPlaceholderClass: function(e) {
      return e ? e : "input-placeholder"
    },
    _checkPlaceholderStyle: function(e) {
      e ? (this.$.input.style.display = "flex", this.$.input.style.display = "-ms-flexbox", this.$.input.style.display = "-webkit-box", this.$.placeholder.style.display = "none") : (this.$.input.style.display = "none", this.$.placeholder.style.display = "flex", this.$.placeholder.style.display = "-ms-flexbox", this.$.placeholder.style.display = "-webkit-box")
    },
    _showValueFormate: function(e) {
      this.password || "password" == this.type ? this.showValue = e ? new Array(e.length + 1).join("●") : "" : this.showValue = e || ""
    },
    _maxlengthChanged: function(e, t) {
      if ("date" != this.type && "time" != this.type) {
        var n = this.value.slice(0, e);
        n != this.value && (this.value = n)
      }
    },
    _valueChange: function(e, t) {
      return console.info("!!! " + t + " => " + e), this._keyboardShow || ("date" != this.type && "time" != this.type && this.maxlength > 0 && (e = e.slice(0, this.maxlength)), this._checkPlaceholderStyle(e)), this._showValueFormate(e), e
    },
    _showValueChange: function(e) {
      return e
    }
  }), window.exparser.registerBehavior({
    is: "wx-item",
    properties: {
      value: {
        type: String,
        public: !0,
        observer: "valueChange"
      },
      checked: {
        type: Boolean,
        value: !1,
        observer: "checkedChange",
        public: !0
      }
    },
    valueChange: function(e, t) {
      this.triggerEvent("itemNameChange", {
        newval: e,
        oldval: t
      })
    },
    checkedChange: function(e, t) {
      this.triggerEvent("itemCheckedChange", {
        newval: e,
        oldval: t
      })
    },
    attached: function() {
      this.triggerEvent("itemNameChange", {
        newval: this.value,
        oldval: void 0
      }), this.triggerEvent("itemCheckedChange", {
        newval: this.checked,
        oldval: void 0
      })
    },
    itemCheck: function() {
      this.triggerEvent("itemCheck", {
        value: this.value
      })
    },
    resetFormData: function() {
      this.checked = !1
    }
  }), window.exparser.registerBehavior({
    is: "wx-label-target",
    properties: {},
    handleLabelTap: function() {}
  }), window.exparser.registerBehavior({
    is: "wx-mask-behavior",
    properties: {
      mask: {
        type: Boolean,
        value: !1,
        public: !0
      }
    },
    _getMaskStyle: function(e) {
      return e ? "" : "background-color: transparent"
    }
  }), window.exparser.registerBehavior({
    is: "wx-player",
    properties: {
      src: {
        type: String,
        observer: "srcChanged",
        public: !0
      },
      poster: {
        type: String,
        observer: "posterChanged",
        public: !0
      },
      _buttonType: {
        type: String,
        value: "play"
      },
      _currentTime: {
        type: String,
        value: "00:00"
      },
      _duration: {
        type: String,
        value: "00:00"
      }
    },
    _formatTime: function(e) {
      var t = Math.floor(e / 3600),
        n = Math.floor((e - 3600 * t) / 60),
        i = e - 3600 * t - 60 * n;
      return 0 == t ? (n >= 10 ? n : "0" + n) + ":" + (i >= 10 ? i : "0" + i) : (t >= 10 ? t : "0" + t) + ":" + (n >= 10 ? n : "0" + n) + ":" + (i >= 10 ? i : "0" + i)
    },
    _publish: function(e, t) {
      this.triggerEvent(e, t)
    },
    attached: function() {
      var e = this.$.player,
        t = this,
        n = {};
      for (var i in MediaError) n[MediaError[i]] = i;
      e.onerror = function(e) {
        if (e.stopPropagation(), e.srcElement.error) {
          var i = e.srcElement.error.code;
          t._publish("error", {
            errMsg: n[i]
          }), console.log(n[i])
        }
      }, e.onplay = function(n) {
        n.stopPropagation(), "AUDIO" == e.tagName && t._publish("play", {}), t._buttonType = "pause"
      }, e.onpause = function(n) {
        n.stopPropagation(), "AUDIO" == e.tagName && t._publish("pause", {}), t._buttonType = "play"
      }, "AUDIO" == e.tagName && (e.onratechange = function(n) {
        n.stopPropagation(), t._publish("ratechange", {
          playbackRate: e.playbackRate
        })
      }, e.onended = function(e) {
        e.stopPropagation(), t._publish("ended", {})
      });
      var r = 0;
      e.addEventListener("timeupdate", function(n) {
        n.stopPropagation(), "AUDIO" == e.tagName && Math.abs(e.currentTime - r) % e.duration >= 1 && (t._publish("timeupdate", {
          currentTime: e.currentTime,
          duration: e.duration
        }), r = 1e3 * e.currentTime), t._currentTime = t._formatTime(Math.floor(e.currentTime)), t._duration = t._formatTime(Math.floor(e.duration))
      })
    }
  }), window.exparser.registerElement({
    is: "wx-native",
    properties: {
      hidden: {
        type: Boolean,
        value: !1,
        public: !0,
        observer: "hiddenChanged"
      },
      _isReady: {
        type: Boolean,
        value: !1
      },
      _deferred: {
        type: Array,
        value: []
      },
      _isError: {
        type: Boolean,
        value: !1
      },
      _box: {
        type: Object,
        value: {
          left: 0,
          top: 0,
          width: 0,
          height: 0
        }
      }
    },
    _isiOS: function() {
      var e = window.navigator.userAgent.toLowerCase();
      return !/wechatdevtools/.test(e) && /iphone/.test(e)
    },
    _isAndroid: function() {
      var e = window.navigator.userAgent.toLowerCase();
      return !/wechatdevtools/.test(e) && /android/.test(e)
    },
    _isMobile: function() {
      var e = window.navigator.userAgent.toLowerCase();
      return !/wechatdevtools/.test(e) && (/iphone/.test(e) || /android/.test(e))
    },
    _getBox: function() {
      var e = this.$.dom.getBoundingClientRect(),
        t = {
          left: e.left + window.scrollX,
          top: e.top + window.scrollY,
          width: this.$.dom.offsetWidth,
          height: this.$.dom.offsetHeight
        };
      return t
    },
    _diff: function() {
      var e = this._getBox(),
        t = !1;
      for (var n in e) t = t || e[n] != this._box[n];
      return t
    },
    _ready: function() {
      this._isReady = !0, this._deferred.forEach(function(e) {
        this[e.callback].apply(this, e.args)
      }, this), this._deferred = []
    },
    hiddenChanged: function(e, t) {
      if (!this._isError) return this._isReady ? void this._hiddenChanged(e, t) : void this._deferred.push({
        callback: "hiddenChanged",
        args: [e, t]
      })
    },
    _pageReRenderCallback: function() {
      this._isError || this._diff() && (this._box = this._getBox(), this._updatePosition())
    }
  }), window.exparser.registerElement({
    is: "wx-action-sheet",
    template: '\n    <div class="wx-action-sheet-mask" id="mask" style.z-index="1000" style="display: none;"></div>\n    <div class="wx-action-sheet" class.wx-action-sheet-show="{{!hidden}}">\n      <div class="wx-action-sheet-menu">\n        <wx-content></wx-content>\n      </div>\n    </div>\n  ',
    behaviors: ["wx-base"],
    properties: {
      hidden: {
        type: Boolean,
        value: !0,
        observer: "hiddenChange",
        public: !0
      }
    },
    listeners: {
      "mask.tap": "hide",
      actionSheetCancel: "cancel"
    },
    cancel: function(e) {
      return this.hide(), !1
    },
    hide: function() {
      this.triggerEvent("change", {}, !0)
    },
    hiddenChange: function(e) {
      var t = this.$.mask;
      e ? (setTimeout(function() {
        t.style.display = "none"
      }, 300), t.style.backgroundColor = "rgba(0,0,0,0)") : (t.style.display = "block", t.focus(), t.style.backgroundColor = "rgba(0,0,0,0.6)")
    }
  }), window.exparser.registerElement({
    is: "wx-action-sheet-cancel",
    template: '\n    <div class="wx-action-sheet-middle" id="middle"></div>\n    <div class="wx-action-sheet-cancel" id="cancel">\n      <wx-content></wx-content>\n    </div>\n  ',
    properties: {},
    listeners: {
      "middle.tap": "handleMiddleTap",
      "cancel.tap": "handleCancelTap"
    },
    behaviors: ["wx-base"],
    handleMiddleTap: function(e) {
      return !1
    },
    handleCancelTap: function(e) {
      this.triggerEvent("actionSheetCancel")
    }
  }), window.exparser.registerElement({
    is: "wx-action-sheet-item",
    template: "\n    <wx-content></wx-content>\n  ",
    properties: {},
    behaviors: ["wx-base"]
  }), window.exparser.registerElement({
    is: "wx-audio",
    behaviors: ["wx-base", "wx-player"],
    template: '<audio id="player" loop$="{{loop}}" style="display: none;"></audio>\n  <div id="default" class="wx-audio-default" style="display: none;">\n    <div id="poster" class="wx-audio-left">\n      <div id="button" class$="wx-audio-button {{_buttonType}}"></div>\n    </div>\n    <div class="wx-audio-right">\n      <div class="wx-audio-time" parse-text-content>{{_currentTime}}</div>\n      <div class="wx-audio-info">\n        <div class="wx-audio-name" parse-text-content>{{name}}</div>\n        <div class="wx-audio-author" parse-text-content>{{author}}</div>\n      </div>\n    </div>\n  </div>\n  <div id="fakebutton"></div>',
    properties: {
      action: {
        type: Object,
        observer: "actionChanged",
        public: !0
      },
      name: {
        type: String,
        value: "未知歌曲",
        public: !0
      },
      author: {
        type: String,
        value: "未知作者",
        public: !0
      },
      loop: {
        type: Boolean,
        value: !1,
        public: !0
      },
      controls: {
        type: Boolean,
        value: !1,
        observer: "controlsChanged",
        public: !0
      },
      _srcTimer: {
        type: Number
      },
      _actionTimer: {
        type: Number
      },
      _canSrc: {
        type: Boolean,
        value: !0
      },
      _deferredSrc: {
        type: String,
        value: ""
      },
      _canAction: {
        type: Boolean,
        value: !1
      },
      _deferredAction: {
        type: Array,
        value: []
      }
    },
    _reset: function() {
      this._buttonType = "play", this._currentTime = "00:00", this._duration = "00:00"
    },
    _readySrc: function() {
      this._canSrc = !0, this.srcChanged(this._deferredSrc), this._deferredSrc = ""
    },
    _readyAction: function() {
      this._canAction = !0, this._deferredAction.forEach(function(e) {
        this.actionChanged(e)
      }, this), this._deferredAction = []
    },
    srcChanged: function(e, t) {
      if (e) {
        console.log("音频组件: 更新资源 " + e), clearTimeout(this._srcTimer), this._canAction = !1, this.$.player.src = e;
        var n = this;
        this._srcTimer = setTimeout(function() {
          n._reset(), n._readyAction()
        }, 0)
      }
    },
    posterChanged: function(e, t) {
      this.$.poster.style.backgroundImage = "url('" + e + "')"
    },
    controlsChanged: function(e, t) {
      this.$.default.style.display = e ? "" : "none"
    },
    actionChanged: function(e, t) {
      if (console.log("有新动作"), console.log(e), e) {
        if (!this._canAction) return void this._deferredAction.push(e);
        var n = e.method,
          i = null;
        if (null != (i = /^set([a-z|A-Z]*)/.exec(n))) {
          var r = i[1],
            o = e.data;
          r = r[0].toLowerCase() + r.slice(1), "playbackRate" == r || "currentTime" == r ? this.$.player[r] = o : this.triggerEvent("error", {
            errMsg: n + " is not a action"
          })
        } else "play" == n || "pause" == n ? this.$.fakebutton.click() : this.triggerEvent("error", {
          errMsg: n + " is not a action"
        });
        this.action = null
      }
    },
    attached: function() {
      var e = this.$.player,
        t = this;
      this.$.button.onclick = function(e) {
        e.stopPropagation(), t.action = {
          method: t._buttonType
        }
      }, this.$.fakebutton.onclick = function(n) {
        n.stopPropagation(), e[t.action.method]()
      }
    }
  }), window.exparser.registerElement({
    is: "wx-button",
    template: "\n    <wx-content></wx-content>\n  ",
    behaviors: ["wx-base", "wx-hover", "wx-label-target"],
    properties: {
      type: {
        type: String,
        value: "default",
        public: !0
      },
      size: {
        type: String,
        value: "default",
        public: !0
      },
      disabled: {
        type: Boolean,
        public: !0
      },
      plain: {
        type: Boolean,
        public: !0
      },
      loading: {
        type: Boolean,
        public: !0
      },
      formType: {
        type: String,
        public: !0
      }
    },
    listeners: {
      tap: "handleLabelTap"
    },
    handleLabelTap: function() {
      return !this.disabled && void("submit" === this.formType ? this.triggerEvent("formSubmit") : "reset" === this.formType && this.triggerEvent("formReset"))
    }
  }),
  function() {
    function e(e, t, n, i) {
      n = Array.prototype.slice.call(n);
      var r = e + "." + t + "(" + n.map(function(e) {
        return "string" == typeof e ? "'" + e + "'" : e
      }).join(", ") + ")";
      return i && (r = i + " = " + r), r
    }

    function t(e) {
      var t = e.slice(0);
      return t[3] = t[3] / 255, "rgba(" + t.join(",") + ")"
    }
    window.exparser.registerElement({
      is: "wx-canvas",
      behaviors: ["wx-base", "wx-native"],
      template: '<canvas id="canvas" width="300" height="150"></canvas>',
      properties: {
        canvasId: {
          type: String,
          public: !0
        },
        _style: {
          type: Object,
          value: {}
        }
      },
      _updatePosition: function() {
        this.$.canvas.width = this._box.width, this.$.canvas.height = this._box.height, this._isMobile() ? WeixinJSBridge.invoke("updateCanvas", {
          canvasId: this._canvasNumber,
          position: this._box
        }, function(e) {}) : this.actionsChanged(this.actions)
      },
      attached: function() {
        var e = (this.$.canvas, this);
        if (this._images = {}, this._box = this._getBox(), this.$.canvas.width = this.$.dom.offsetWidth, this.$.canvas.height = this.$.dom.offsetHeight, !this.canvasId) return this.triggerEvent("error", {
          errMsg: "canvas-id attribute is undefined"
        }), this._isError = !0, void(this.$.dom.style.display = "none");
        window.__canvasNumber__ = window.__canvasNumber__ || {};
        var t = __webviewId__ + "canvas" + this.canvasId;
        if ("number" == typeof window.__canvasNumber__[t]) return this.triggerEvent("error", {
          errMsg: "canvas-id " + e.canvasId + " in this page has already existed"
        }), this._isError = !0, void(this.$.dom.style.display = "none");
        for (var n in window.__canvasNumber__);
        "undefined" == typeof n ? window.__canvasNumber__[t] = 1e3 : window.__canvasNumber__[t] = window.__canvasNumber__[n] + 1, this._canvasNumber = window.__canvasNumber__[t], this._isMobile() ? (e._isReady = !1, WeixinJSBridge.invoke("insertCanvas", {
          canvasId: e._canvasNumber,
          position: e._box,
          hide: this.hidden
        }, function(t) {
          WeixinJSBridge.publish("canvasInsert", {
            canvasId: e.canvasId,
            canvasNumber: e._canvasNumber
          }), e._ready(), document.addEventListener("pageReRender", e._pageReRenderCallback.bind(e))
        })) : (WeixinJSBridge.publish("canvasInsert", {
          canvasId: e.canvasId,
          canvasNumber: e._canvasNumber
        }), WeixinJSBridge.subscribe("canvas" + e._canvasNumber + "actionsChanged", function(t) {
          var n = t.actions,
            i = t.reserve;
          e.actions = n, e.actionsChanged(n, i)
        }), e._ready(), document.addEventListener("pageReRender", e._pageReRenderCallback.bind(e)))
      },
      detached: function() {
        var e = __webviewId__ + "canvas" + this.canvasId;
        delete window.__canvasNumber__[e], this._isMobile() && WeixinJSBridge.invoke("removeCanvas", {
          canvasId: this._canvasNumber
        }, function(e) {}), WeixinJSBridge.publish("canvasRemove", {
          canvasId: this.canvasId,
          canvasNumber: this._canvasNumber
        })
      },
      actionsChanged: function(n) {
        var i = !(arguments.length <= 1 || void 0 === arguments[1]) && arguments[1];
        if (!this._isMobile() && n) {
          var r = this.$.canvas,
            o = r.getContext("2d"),
            a = this;
          i === !1 && (a._style.fillStyle = "#000000", a._style.strokeStyle = "#000000", a._style.shadowColor = "#000000", a._style.shadowBlur = 0, a._style.shadowOffsetX = 0, a._style.shadowOffsetY = 0, o.setTransform(1, 0, 0, 1, 0, 0), o.clearRect(0, 0, r.width, r.height)), n.forEach(function(n) {
            var i = this,
              r = n.method,
              s = n.data;
            if (/^set/.test(r)) {
              var c = r[3].toLowerCase() + r.slice(4),
                l = void 0,
                d = "";
              if ("fillStyle" == c || "strokeStyle" == c) {
                if ("normal" == s[0]) d = l = t(s[1]);
                else if ("linear" == s[0]) {
                  var l = o.createLinearGradient.apply(o, s[1]);
                  d = "context.createLinearGradient(" + s[1].join(",") + ")", s[2].forEach(function(e) {
                    var n = e[0],
                      i = t(e[1]);
                    l.addColorStop(n, i), d += ".addColorStop(" + i + ")"
                  })
                } else if ("radial" == s[0]) {
                  var u = s[1][0],
                    h = s[1][1],
                    p = s[1][2],
                    g = [u, h, 0, u, h, p],
                    l = o.createRadialGradient.apply(o, g);
                  d = e("context", "createRadialGradient", g), s[2].forEach(function(e) {
                    var n = e[0],
                      i = t(e[1]);
                    l.addColorStop(n, i), d += ".addColorStop(" + i + ")"
                  })
                }
                a._style[c] = l
              } else if ("globalAlpha" == c) d = l = s[0] / 255, a._style[c] = l;
              else if ("shadow" == c) {
                var A = ["shadowOffsetX", "shadowOffsetY", "shadowBlur", "shadowColor"];
                s.forEach(function(e, n) {
                  a._style[A[n]] = e, "shadowColor" == A[n] && (a._style.shadowColor = t(e))
                })
              } else "fontSize" == c ? a._style[c] = s[0] : a._style[c] = s[0]
            } else if ("fillPath" == r || "strokePath" == r || "fillText" == r) {
              r = r.replace(/Path/, ""), o.save();
              for (var u in a._style) "fontSize" == u ? o.font = o.font.replace(/\d+\.?\d*px/, a._style.fontSize + "px") : o[u] = a._style[u];
              if ("fill" == r || "stroke" == r) {
                o.beginPath();
                var f = s;
                f.forEach(function(e) {
                  if ("arc" == e.method) {
                    var t = e.data[3] + e.data[4];
                    e.data[4] = t, o.arc.apply(o, e.data)
                  } else o[e.method].apply(o, e.data)
                }), o[r]()
              } else o[r].apply(o, s);
              o.restore()
            } else "drawImage" == r ? ! function() {
              var e = _toArray(s),
                t = e[0],
                n = e.slice(1);
              i._images = i._images || {}, i._images[t] ? o.drawImage.apply(o, [i._images[t]].concat(_toConsumableArray(n))) : (i._images[t] = new Image, i._images[t].src = t, i._images[t].onload = function() {
                o.drawImage.apply(o, [i._images[t]].concat(_toConsumableArray(n)))
              })
            }() : o[r].apply(o, s)
          }, this)
        }
      },
      _hiddenChanged: function(e, t) {
        this._isMobile() ? (this.$.dom.style.display = e ? "none" : "", WeixinJSBridge.invoke("updateCanvas", {
          canvasId: this._canvasNumber,
          hide: e
        }, function(e) {
          console.log(e)
        })) : this.$.dom.style.display = e ? "none" : ""
      }
    })
  }(), window.exparser.registerElement({
    is: "wx-checkbox",
    template: '\n    <input id="input" type="checkbox" checked:="{{checked}}" disabled$="{{disabled}}" />\n    <wx-content></wx-content>\n  ',
    behaviors: ["wx-base", "wx-label-target", "wx-item", "wx-disabled"],
    properties: {},
    listeners: {
      "input.change": "inputChange"
    },
    handleLabelTap: function(e) {
      this.disabled || (this.checked = !this.checked, this.inputChange())
    },
    inputChange: function(e) {
      this.checked = this.$.input.checked, this.itemCheck()
    }
  }), window.exparser.registerElement({
    is: "wx-form",
    template: '\n    <span id="wrapper"><wx-content></wx-content></span>\n  ',
    behaviors: ["wx-base"],
    properties: {
      reportSubmit: {
        type: Boolean,
        value: !1,
        public: !0
      }
    },
    listeners: {
      formSubmit: "submitHandler",
      formReset: "resetHandler"
    },
    resetDfs: function(e) {
      if (e.childNodes)
        for (var t = 0; t < e.childNodes.length; ++t) {
          var n = e.childNodes[t];
          n instanceof exparser.Element && (n.hasBehavior("wx-data-component") && n.resetFormData(), this.resetDfs(n))
        }
    },
    getFormData: function(e, t) {
      return e.name && e.hasBehavior("wx-data-component") ? "WX-INPUT" === e.__domElement.tagName || "WX-PICKER" === e.__domElement.tagName ? e.getFormData(function(e) {
        t(e)
      }) : t(e.getFormData()) : t()
    },
    asyncDfs: function(e, t) {
      var n = this,
        i = function() {
          "function" == typeof t && t(), t = void 0
        };
      if (!e.childNodes) return i();
      for (var r = e.childNodes.length, o = 0; o < e.childNodes.length; ++o) {
        var a = e.childNodes[o];
        a instanceof exparser.Element ? ! function(e) {
          n.getFormData(e, function(t) {
            "undefined" != typeof t && (n._data[e.name] = t), n.asyncDfs(e, function() {
              0 == --r && i()
            })
          })
        }(a) : --r
      }
      0 == r && i()
    },
    submitHandler: function(e) {
      var t = this,
        n = {
          id: e.target.__domElement.id,
          dataset: e.target.__domElement.dataset,
          offsetTop: e.target.__domElement.offsetTop,
          offsetLeft: e.target.__domElement.offsetLeft
        };
      return this._data = Object.create(null), this.asyncDfs(this, function() {
        t.reportSubmit ? t._isDevTools() ? t.triggerEvent("submit", {
          value: t._data,
          formId: "the formId is a mock one",
          target: n
        }, !0) : WeixinJSBridge.invoke("reportSubmitForm", {}, function(e) {
          t.triggerEvent("submit", {
            value: t._data,
            formId: e.formId,
            target: n
          }, !0)
        }) : t.triggerEvent("submit", {
          value: t._data,
          target: n
        }, !0)
      }), !1
    },
    resetHandler: function(e) {
      var t = {
        id: e.target.__domElement.id,
        dataset: e.target.__domElement.dataset,
        offsetTop: e.target.__domElement.offsetTop,
        offsetLeft: e.target.__domElement.offsetLeft
      };
      return this._data = Object.create(null), this.resetDfs(this), this.triggerEvent("reset", {
        target: t
      }, !0), !1
    }
  }), window.exparser.registerElement({
    is: "wx-checkbox-group",
    template: '\n    <span id="wrapper"><wx-content></wx-content></span>\n  ',
    behaviors: ["wx-base", "wx-data-component", "wx-group"],
    properties: {
      value: {
        type: Array,
        value: []
      }
    },
    remove: function(e) {
      if (void 0 !== e) {
        var t = this.value.indexOf(e);
        t !== -1 && this.value.splice(t, 1)
      }
    },
    add: function(e) {
      void 0 !== e && this.value.indexOf(e) === -1 && this.value.push(e)
    },
    handleItemCheckedChange: function(e) {
      return e.target.checked ? this.add(e.target.value) : this.remove(e.target.value), !1
    },
    handleItemNameChange: function(e) {
      return e.target.checked && (this.remove(e.detail.oldval), this.add(e.detail.newval)), !1
    },
    handleCheck: function() {
      return this.triggerEvent("change", {
        value: this.value
      }, !0), !1
    }
  }), window.exparser.registerElement({
    is: "wx-icon",
    template: '<i class$="wx-icon-{{type}}" style.color="{{color}}" style.font-size="{{size}}px"></i>',
    behaviors: ["wx-base"],
    properties: {
      type: {
        type: String,
        public: !0
      },
      size: {
        type: Number,
        value: 23,
        public: !0
      },
      color: {
        type: String,
        public: !0
      }
    }
  }), window.exparser.registerElement({
    is: "wx-image",
    template: '<div id="div"></div>',
    behaviors: ["wx-base"],
    properties: {
      src: {
        type: String,
        observer: "srcChanged",
        public: !0
      },
      mode: {
        type: String,
        observer: "modeChanged",
        public: !0
      },
      _disableSizePositionRepeat: {
        type: Boolean,
        value: !1
      },
      backgroundSize: {
        type: String,
        observer: "backgroundSizeChanged",
        value: "100% 100%",
        public: !0
      },
      backgroundPosition: {
        type: String,
        observer: "backgroundPositionChanged",
        public: !0
      },
      backgroundRepeat: {
        type: String,
        observer: "backgroundRepeatChanged",
        value: "no-repeat",
        public: !0
      },
      _img: {
        type: Object
      }
    },
    _publishError: function(e) {
      this.triggerEvent("error", e)
    },
    _ready: function() {
      if (!(this._img && this._img instanceof Image)) {
        this._img = new Image;
        var e = this;
        this._img.onerror = function(t) {
          t.stopPropagation();
          var n = {
            errMsg: "GET " + e._img.src + " 404 (Not Found)"
          };
          e._publishError(n)
        }, this._img.onload = function(t) {
          t.stopPropagation(), e.triggerEvent("load", {})
        }
      }
    },
    attached: function() {
      this._ready(), this.backgroundSizeChanged(this.backgroundSize), this.backgroundRepeatChanged(this.backgroundRepeat)
    },
    _srcChanged: function(e) {
      this._img.src = e, this.$.div.style.backgroundImage = "url('" + e + "')"
    },
    srcChanged: function(e, t) {
      if (e) {
        var n = (this.$.div, window.navigator.userAgent.toLowerCase()),
          i = this;
        this._ready();
        var r = {
          success: function(e) {
            i._srcChanged(e.localData)
          },
          fail: function(e) {
            i._publishError(e)
          }
        };
        !/wechatdevtools/.test(n) && /iphone/.test(n) ? /^(http|https):\/\//.test(e) ? this._srcChanged(e) : /^wxfile:\/\//.test(e) ? (r.filePath = e, wx.getLocalImgData(r)) : (r.path = e, wx.getLocalImgData(r)) : !/wechatdevtools/.test(n) && /android/.test(n) ? /^wxfile:\/\//.test(e) || /^(http|https):\/\//.test(e) ? this._srcChanged(e) : wx.getCurrentRoute({
          success: function(t) {
            console.log(t), console.log(t.route);
            var n = wx.getRealRoute(t.route, e);
            console.log(n), i._srcChanged(n)
          }
        }) : this._srcChanged(e)
      }
    },
    _checkMode: function(e) {
      for (var t = ["scaleToFill", "aspectFit", "aspectFill", "top", "bottom", "center", "left", "right", "top left", "top right", "bottom left", "bottom right"], n = !1, i = 0; i < t.length; i++)
        if (e == t[i]) {
          n = !0;
          break
        }
      return n
    },
    modeChanged: function(e, t) {
      if (!this._checkMode(e)) return void(this._disableSizePositionRepeat = !1);
      switch (this._disableSizePositionRepeat = !0, this.$.div.style.backgroundSize = "auto auto", this.$.div.style.backgroundPosition = "0% 0%", this.$.div.style.backgroundRepeat = "no-repeat", e) {
        case "scaleToFill":
          this.$.div.style.backgroundSize = "100% 100%";
          break;
        case "aspectFit":
          this.$.div.style.backgroundSize = "contain", this.$.div.style.backgroundPosition = "center center";
          break;
        case "aspectFill":
          this.$.div.style.backgroundSize = "cover", this.$.div.style.backgroundPosition = "center center";
          break;
        case "top":
          this.$.div.style.backgroundPosition = "top center";
          break;
        case "bottom":
          this.$.div.style.backgroundPosition = "bottom center";
          break;
        case "center":
          this.$.div.style.backgroundPosition = "center center";
          break;
        case "left":
          this.$.div.style.backgroundPosition = "center left";
          break;
        case "right":
          this.$.div.style.backgroundPosition = "center right";
          break;
        case "top left":
          this.$.div.style.backgroundPosition = "top left";
          break;
        case "top right":
          this.$.div.style.backgroundPosition = "top right";
          break;
        case "bottom left":
          this.$.div.style.backgroundPosition = "bottom left";
          break;
        case "bottom right":
          this.$.div.style.backgroundPosition = "bottom right"
      }
    },
    backgroundSizeChanged: function(e, t) {
      this._disableSizePositionRepeat || (this.$.div.style.backgroundSize = e)
    },
    backgroundPositionChanged: function(e, t) {
      this._disableSizePositionRepeat || (this.$.div.style.backgroundPosition = e)
    },
    backgroundRepeatChanged: function(e, t) {
      this._disableSizePositionRepeat || (this.$.div.style.backgroundRepeat = e)
    }
  }), /wechatdevtools/.test(window.navigator.userAgent.toLowerCase()) && window.exparser.registerElement({
    is: "wx-input",
    template: '\n    <div id="wrapper" disabled$="{{disabled}}">\n      <p id="placeholder" class$="{{_getPlaceholderClass(placeholderClass)}}" style$="{{placeholderStyle}}" parse-text-content>{{placeholder}}</p>\n      <input id="input" type$="{{_getType(type,password)}}" maxlength$="{{maxlength}}" value$="{{showValue}}" disabled$="{{disabled}}" >\n    </div>\n    ',
    behaviors: ["wx-base", "wx-data-component", "wx-input-base"],
    properties: {},
    listeners: {
      tap: "_inputFocus",
      "input.focus": "_inputFocus",
      "input.blur": "_inputBlur",
      "input.change": "_inputChange",
      "input.input": "_inputKey"
    },
    attached: function() {
      var e = this;
      this._checkPlaceholderStyle(this.value), this._attached = !0, window.__onAppRouteDone && this._couldFocus(this.autoFocus), exparser.addListenerToElement(document, "routeDone", function() {
        e._couldFocus(e.autoFocus)
      }), exparser.addListenerToElement(document, "setKeyboardValue", function(t) {
        if (e._keyboardShow) {
          e.value = t.detail.value;
          var n = t.detail.cursor;
          "undefined" != typeof n && n != -1 && e.$.input.setSelectionRange(n, n)
        }
      }), exparser.addListenerToElement(document, "hideKeyboard", function(t) {
        e._keyboardShow && e.$.input.blur()
      }), exparser.addListenerToElement(document, "touchstart", function(t) {
        e._keyboardShow && e.$.input.blur()
      }), this.autoFocus && setTimeout(function() {
        e._couldFocus(e.autoFocus)
      }, 500)
    },
    _getType: function(e, t) {
      return t || "password" == e ? "password" : "text"
    },
    _showValueChange: function(e) {
      this.$.input.value = e
    },
    _inputFocus: function(e) {
      this.disabled || this._keyboardShow || (console.log("focus"), this._keyboardShow = !0, this.triggerEvent("focus", {
        value: this.value
      }, !0), this.$.placeholder.style.display = "none", this.$.input.style.display = "flex", this.$.input.focus())
    },
    _inputBlur: function(e) {
      this._keyboardShow = !1, this.focus = 0, this.triggerEvent("blur", {
        value: this.value
      }, !0), this._checkPlaceholderStyle(this.value)
    },
    _inputKey: function(e) {
      if (this.bindinput) {
        var t = {
          id: this.$.dom.id,
          dataset: this.$.dom.dataset,
          offsetTop: this.$.dom.offsetTop,
          offsetLeft: this.$.dom.offsetLeft
        };
        WeixinJSBridge.publish("SPECIAL_PAGE_EVENT", {
          eventName: this.bindinput,
          data: {
            data: {
              type: "input",
              timestamp: Date.now(),
              detail: {
                value: e.target.value,
                cursor: this.$.input.selectionStart
              },
              target: t,
              currentTarget: t,
              touches: []
            },
            eventName: this.bindinput
          }
        })
      }
      return !1
    },
    _inputChange: function(e) {
      var t = e.target.value;
      this.value = t, this.triggerEvent("change", {
        value: t
      }, !0), this._formGetDataCallback()
    }
  }), /wechatdevtools/.test(window.navigator.userAgent.toLowerCase()) || window.exparser.registerElement({
    is: "wx-input",
    template: '\n    <div id="wrapper" disabled$="{{disabled}}">\n      <p id="input" parse-text-content >{{showValue}}</p>\n    </div>\n  ',
    behaviors: ["wx-base", "wx-data-component", "wx-input-base"],
    properties: {},
    listeners: {
      tap: "_inputFocus"
    },
    attached: function() {
      var e = this;
      this._checkPlaceholderStyle(this.value), this._attached = !0, window.__onAppRouteDone && this._couldFocus(this.autoFocus), exparser.addListenerToElement(document, "routeDone", function() {
        e._couldFocus(e.autoFocus)
      }), exparser.addListenerToElement(document, "onKeyboardComplete", function(t) {
        t.detail.inputId == e._inputId && (e.value = t.detail.value, e.onKeyboardComplete())
      }), exparser.addListenerToElement(document, "touchstart", function() {
        e._keyboardShow && (e.onKeyboardComplete(), wx.hideKeyboard())
      }), exparser.addListenerToElement(document, "setKeyboardValue", function(t) {
        t.detail.inputId == e._inputId && (e.value = t.detail.value)
      })
    },
    onKeyboardComplete: function() {
      this.__formResetCallback && (this.value = "", this.__formResetCallback = void 0), this._formGetDataCallback(), this.triggerEvent("change", {
        value: this.value
      }, !0), this.triggerEvent("blur", {
        value: this.value
      }, !0), this._resetInputState()
    },
    _inputFocus: function(e) {
      if (!this.disabled) {
        if (this.triggerEvent("focus", {
            value: this.value
          }, !0), this._keyboardShow) return !0;
        var t = this.$.dom;
        this._placeholder = this.placeholder, this.placeholder = "";
        try {
          var n = window.getComputedStyle(t),
            i = ["Left", "Right"].map(function(e) {
              return parseInt(n["border" + e + "Width"]) + parseInt(n["padding" + e])
            }),
            r = ["Top", "Bottom"].map(function(e) {
              return parseInt(n["border" + e + "Width"]) + parseInt(n["padding" + e])
            }),
            o = t.getBoundingClientRect(),
            a = parseInt(n.fontWeight);
          isNaN(a) ? a = n.fontWeight : a < 500 ? a = "normal" : a >= 500 && (a = "bold");
          var s = {
            width: o.width - i[0] - i[1],
            height: o.height - r[0] - r[1],
            left: o.left + i[0] + window.scrollX,
            top: o.top + r[0] + window.scrollY,
            fontFamily: n.fontFamily,
            fontSize: parseFloat(n.fontSize) || 14,
            fontWeight: a,
            color: this._getHexColor(n.color),
            backgroundColor: "#00000000"
          };
          console.info(JSON.stringify(s)), this._showNativeInput(s)
        } catch (e) {
          this._resetInputState()
        }
        return !1
      }
    },
    _valueChange: function(e, t) {
      return this._keyboardShow || (this.maxlength > 0 && (e = e.slice(0, this.maxlength)), this._checkPlaceholderStyle(e)), e
    },
    _showNativeInput: function(e) {
      var t = this,
        n = {
          bindinput: this.bindinput,
          target: {
            id: this.$.dom.id,
            dataset: this.$.dom.dataset,
            offsetTop: this.$.dom.offsetTop,
            offsetLeft: this.$.dom.offsetLeft
          }
        };
      wx.showKeyboard({
        type: "password" == this.type ? "text" : this.type,
        maxLength: this.maxlength,
        defaultValue: this.value,
        password: this.password || "password" == this.type,
        style: e,
        data: this.bindinput ? JSON.stringify(n) : "",
        success: function(e) {
          /:ok/.test(e.errMsg) ? (t._inputId = e.inputId, t._keyboardShow = !0, t.showValue = " ") : console.error(e.errMsg)
        }
      })
    },
    _resetInputState: function() {
      this._keyboardShow = !1, this._inputId = void 0, "undefined" != typeof this._placeholder && (this.placeholder = this._placeholder, this._placeholder = void 0), this.focus = 0, this._checkPlaceholderStyle(this.value)
    },
    _getHexColor: function(e) {
      if (e.indexOf("#") >= 0) return e;
      var t = e.match(/\d+/g),
        n = parseInt(t[0]);
      n = n > 9 ? n.toString(16) : "0" + n;
      var i = parseInt(t[1]);
      i = i > 9 ? i.toString(16) : "0" + i;
      var r = parseInt(t[2]);
      r = r > 9 ? r.toString(16) : "0" + r;
      var o = "#" + n + i + r;
      if (t.length > 3) {
        var a = parseFloat(t.slice(3).join("."));
        0 == a ? o += "00" : a >= 1 ? o += "ff" : (a = parseInt(255 * a), a = a > 9 ? a.toString(16) : "0" + a, o += a)
      }
      return o
    },
    _checkPlaceholderStyle: function(e) {
      var t = e;
      e ? (this.$.input.classList.remove("input-placeholder"), this.placeholderClass && this.$.input.classList.remove(this.placeholderClass), this.$.input.setAttribute("style", "")) : this.placeholder && (this.$.input.classList.add("input-placeholder"), this.placeholderClass && this.$.input.classList.add(this.placeholderClass), this.placeholderStyle && this.$.input.setAttribute("style", this.placeholderStyle), t = this.placeholder), this._showValueFormate(t)
    }
  }), window.exparser.registerElement({
    is: "wx-label",
    template: "\n    <wx-content></wx-content>\n  ",
    properties: {
      for: {
        type: String,
        public: !0
      }
    },
    listeners: {
      tap: "onTap"
    },
    behaviors: ["wx-base"],
    handleNode: function(e) {
      return !!(e instanceof exparser.Element && e.hasBehavior("wx-label-target")) && (e.handleLabelTap(), !0)
    },
    dfs: function(e) {
      if (this.handleNode(e)) return !0;
      if (!e.childNodes) return !1;
      for (var t = 0; t < e.childNodes.length; ++t)
        if (this.dfs(e.childNodes[t])) return !0;
      return !1
    },
    onTap: function(e) {
      for (var t = e.target; t !== this; t = t.parentNode)
        if (t instanceof exparser.Element && t.hasBehavior("wx-label-target")) return;
      if (this.for) {
        var n = document.getElementById(this.for);
        n && this.handleNode(n.__wxElement)
      } else this.dfs(this)
    }
  }), window.exparser.registerElement({
    is: "wx-loading",
    template: '\n    <div class="wx-loading-mask" style$="background-color: transparent;"></div>\n    <div class="wx-loading">\n      <i class="wx-loading-icon"></i><p class="wx-loading-content"><wx-content></wx-content></p>\n    </div>\n  ',
    behaviors: ["wx-base"]
  }), window.exparser.registerElement({
    is: "wx-map",
    behaviors: ["wx-base", "wx-native"],
    template: '<div id="map" style="width: 100%; height: 100%;"></div>',
    properties: {
      latitude: {
        type: Number,
        public: !0,
        observer: "latitudeChanged",
        value: 39.92
      },
      longitude: {
        type: Number,
        public: !0,
        observer: "longitudeChanged",
        value: 116.46
      },
      scale: {
        type: Number,
        public: !0,
        observer: "scaleChanged",
        scale: 16
      },
      markers: {
        type: Array,
        value: [],
        public: !0,
        observer: "markersChanged"
      },
      covers: {
        type: Array,
        value: [],
        public: !0,
        observer: "coversChanged"
      },
      _mapId: {
        type: Number
      }
    },
    _delay: function(e, t, n) {
      this._deferred.push({
        callback: e,
        args: [t, n]
      })
    },
    _update: function(e, t) {
      e.mapId = this._mapId, e.hide = this.hidden, WeixinJSBridge.invoke("updateMap", e, function(e) {})
    },
    _updatePosition: function() {
      this._isMobile() && WeixinJSBridge.invoke("updateMap", {
        mapId: this._mapId,
        position: this._box,
        covers: this.covers || []
      }, function(e) {
        console.log(e)
      })
    },
    _hiddenChanged: function(e, t) {
      this._isMobile() ? (this.$.dom.style.display = e ? "none" : "", WeixinJSBridge.invoke("updateMap", {
        mapId: this._mapId,
        hide: e
      }, function(t) {
        console.log("地图组件: 显示/隐藏 " + e + " 响应: " + t.errMsg)
      })) : this.$.dom.style.display = e ? "none" : ""
    },
    latitudeChanged: function(e, t) {
      if (e) return this._isReady ? void(this._isMobile() && this._update({
        centerLatitude: e,
        centerLongitude: this.longitude
      }, "纬度")) : void this._delay("latitudeChanged", e, t)
    },
    longitudeChanged: function(e, t) {
      if (e) return this._isReady ? void(this._isMobile() && this._update({
        centerLatitude: this.latitude,
        centerLongitude: e
      }, "经度")) : void this._delay("longitudeChanged", e, t)
    },
    scaleChanged: function(e, t) {
      if (e) return this._isReady ? void(this._isMobile() && this._update({
        centerLatitude: this.latitude,
        centerLongitude: this.longitude,
        scale: e || 14
      }, "缩放")) : void this._delay("scaleChanged", e, t)
    },
    coversChanged: function() {
      var e = this,
        t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
        n = arguments[1];
      if (t) return this._isReady ? void(this._isMobile() && wx.getCurrentRoute({
        success: function(n) {
          t.forEach(function(e) {
            e.iconPath = wx.getRealRoute(n.route, e.iconPath)
          }), console.log(t), e._update({
            centerLatitude: e.latitude,
            centerLongitude: e.longitude,
            covers: t
          }, "覆盖物")
        }
      })) : void this._delay("coversChanged", t, n)
    },
    attached: function() {
      var e = this;
      if (this._box = this._getBox(), console.log({
          centerLongitude: this.longitude,
          centerLatitude: this.latitude
        }), this._isMobile()) WeixinJSBridge.invoke("insertMap", {
        position: this._box,
        centerLongitude: this.longitude,
        centerLatitude: this.latitude,
        scale: this.scale,
        covers: this.covers || [],
        markers: this.markers || [],
        hide: this.hidden
      }, function(t) {
        /ok/.test(t.errMsg) ? (e._mapId = t.mapId, e._ready(), document.addEventListener("pageReRender", e._pageReRenderCallback.bind(e))) : (console.log("地图组件: 插入失败 errMsg: " + t.errMsg), e.triggerEvent("error", {
          errMsg: t.errMsg
        }))
      });
      else {
        0 === this.markers.length ? this.markers.push({
          latitude: 23.099994,
          longitude: 113.32452,
          name: "T.I.T 创意园",
          desc: "广州市海珠区新港中路 397 号"
        }) : this.markers.length > 4 && (this.markers = this.marker.slice(0, 4));
        var t = this.markers.map(function(e) {
          return e.name = e.name || "", e.desc = e.desc || "", ["coord:" + e.latitude + "," + e.longitude, "title:" + encodeURIComponent(e.name), "addr:" + encodeURIComponent(e.desc)].join(";")
        }).join("|");
        console.log(t);
        var n = "http://apis.map.qq.com/tools/poimarker?type=0&marker=" + t + "&key=JMRBZ-R4HCD-X674O-PXLN4-B7CLH-42BSB&referer=wxdevtools",
          i = document.createElement("iframe");
        i.src = n, i.style.position = "absolute", i.style.top = 0, i.style.left = 0, this.$.dom.appendChild(i), this._ready()
      }
    },
    detached: function() {
      this._isMobile() && WeixinJSBridge.invoke("removeMap", {
        mapId: this._mapId
      }, function(e) {})
    }
  }), window.exparser.registerElement({
    is: "wx-mask",
    template: '\n    <div class="wx-mask" id="mask" style="display: none;">\n  ',
    behaviors: ["wx-base"],
    properties: {
      hidden: {
        type: Boolean,
        value: !0,
        observer: "hiddenChange",
        public: !0
      }
    },
    hiddenChange: function(e) {
      var t = this.$.mask;
      e === !0 ? (setTimeout(function() {
        t.style.display = "none"
      }, 300), this.$.mask.classList.add("wx-mask-transparent")) : (t.style.display = "block", t.focus(), t.classList.remove("wx-mask-transparent"))
    }
  }), window.exparser.registerElement({
    is: "wx-modal",
    template: '\n    <div id="mask" class="wx-modal-mask"></div>\n    <div class="wx-modal-dialog">\n      <div class="wx-modal-dialog-hd">\n        <strong parse-text-content>{{title}}</strong>\n      </div>\n      <div class="wx-modal-dialog-bd">\n        <wx-content></wx-content>\n      </div>\n      <div class="wx-modal-dialog-ft">\n        <a hidden$="{{noCancel}}" id="cancel" class="wx-modal-btn-default" parse-text-content>{{cancelText}}</a>\n        <a id="confirm" class="wx-modal-btn-primary" parse-text-content>{{confirmText}}</a>\n      </div>\n    </div>\n  ',
    behaviors: ["wx-base"],
    properties: {
      title: {
        type: String,
        public: !0
      },
      noCancel: {
        type: Boolean,
        value: !1,
        public: !0
      },
      confirmText: {
        type: String,
        value: "确定",
        public: !0
      },
      cancelText: {
        type: String,
        value: "取消",
        public: !0
      }
    },
    listeners: {
      "mask.tap": "_handleCancel",
      "confirm.tap": "_handleConfirm",
      "cancel.tap": "_handleCancel"
    },
    _handleConfirm: function() {
      this.triggerEvent("confirm", {}, !0)
    },
    _handleCancel: function() {
      this.triggerEvent("cancel", {}, !0)
    }
  }), window.exparser.registerElement({
    is: "wx-navigator",
    behaviors: ["wx-base", "wx-hover"],
    template: '<div id="wrapper"><wx-content></wx-content></div>',
    properties: {
      url: {
        type: String,
        public: !0
      },
      redirect: {
        type: Boolean,
        value: !1,
        public: !0
      },
      hoverClass: {
        type: String,
        value: "",
        public: !0
      },
      hoverStyle: {
        type: String,
        value: "",
        public: !0
      }
    },
    listeners: {
      tap: "navigateTo"
    },
    attached: function() {
      this.hoverStayTime = 400
    },
    navigateTo: function() {
      this.url ? this.redirect ? wx.redirectTo({
        url: this.url
      }) : wx.navigateTo({
        url: this.url
      }) : console.log("navigator should have url attribute")
    }
  }), window.exparser.registerElement({
    is: "wx-picker-item",
    template: '\n    <div class="wx-picker-item" class.wx-picker-item-disabled="{{disabled}}">\n      <wx-content></wx-content>\n    </div>\n  ',
    properties: {},
    behaviors: ["wx-base", "wx-disabled", "wx-item"]
  }), /wechatdevtools/.test(window.navigator.userAgent.toLowerCase()) && window.exparser.registerElement({
    is: "wx-picker",
    template: '\n  \t<div id="wrapper"><wx-content></wx-content></div>\n    <div id="picker" style="display:none;" class="wx-picker" >\n      <div class="wx-picker-hd">\n        <a class="wx-picker-action" id="cancel">取消</a>\n        <a class="wx-picker-action" id="confirm">确定</a>\n      </div>\n      <div class="wx-picker-bd" id="selectorarea" style="display:none;">\n        <div class="wx-picker-group" id="selector">\n          <div class="wx-picker-mask2"></div>\n          <div class="wx-picker-indicator"></div>\n          <div class="wx-picker-content" id="selectorinner"></div>\n        </div>\n      </div>\n      <div class="wx-picker-bd" id="time" style="display:none;">\n        <div class="wx-picker-group" id="hour" style="border-right:1px solid #E5E5E5;">\n          <div class="wx-picker-mask2"></div>\n          <div class="wx-picker-indicator"></div>\n          <div class="wx-picker-content" id="hourinner"></div>\n        </div>\n        <div class="wx-picker-group" id="minute">\n          <div class="wx-picker-mask2"></div>\n          <div class="wx-picker-indicator"></div>\n          <div class="wx-picker-content" id="minuteinner"></div>\n        </div>\n      </div>\n      <div class="wx-picker-bd" id="date" style="display:none;">\n        <div class="wx-picker-group" id="year" style="border-right:1px solid #E5E5E5;">\n           <div class="wx-picker-mask2"></div>\n          <div class="wx-picker-indicator"></div>\n          <div class="wx-picker-content" id="yearinner"></div>\n        </div>\n        <div class="wx-picker-group" id="month" style="border-right:1px solid #E5E5E5;">\n          <div class="wx-picker-mask2"></div>\n          <div class="wx-picker-indicator"></div>\n          <div class="wx-picker-content" id="monthinner"></div>\n        </div>\n        <div class="wx-picker-group" id="day">\n          <div class="wx-picker-mask2"></div>\n          <div class="wx-picker-indicator"></div>\n          <div class="wx-picker-content" id="dayinner"></div>\n        </div>\n      </div>\n    </div>\n  ',
    behaviors: ["wx-base", "wx-data-component"],
    properties: {
      curLoc: {
        type: Number,
        value: 0
      },
      diffLoc: {
        type: Number,
        value: 0
      },
      range: {
        type: Array,
        value: [],
        observer: "rangeChange",
        public: !0
      },
      value: {
        type: String,
        value: "",
        coerce: "valueChange",
        public: !0
      },
      mode: {
        type: String,
        value: "selector",
        observer: "modeChange",
        public: !0
      },
      fields: {
        type: String,
        value: "day",
        observer: "fieldsChange",
        public: !0
      },
      start: {
        type: String,
        value: "",
        public: !0
      },
      end: {
        type: String,
        value: "",
        public: !0
      },
      result: {
        type: Object,
        value: {}
      }
    },
    resetFormData: function() {
      this.value = ""
    },
    getFormData: function(e) {
      this.confirm(), "function" == typeof e && e(this.value)
    },
    attached: function() {
      "time" == this.mode ? (this.insertHour(), this.insertMinute()) : "date" == this.mode ? (this.insertYear(), this.insertMonth(), this.insertDay()) : this.insertItem(this.range)
    },
    fieldsChange: function(e) {
      "year" == e ? (console.log(1), this.$.month.style.display = "none", this.$.day.style.display = "none") : "month" == e ? this.$.day.style.display = "none" : (this.$.year.style.display = "flex", this.$.month.style.display = "flex", this.$.day.style.display = "flex")
    },
    modeChange: function(e) {
      if ("date" == e) {
        if (!this.value) {
          var t = new Date;
          this.value = t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate(), console.log(this.value)
        }
      } else "time" == e && (this.value || (this.value = "12:30"))
    },
    valueChange: function(e) {
      if ("date" == this.mode && e) {
        var t = e.split("-"),
          n = new Date,
          i = n.getFullYear(),
          r = n.getMonth() + 1,
          o = n.getDate();
        "day" == this.fields && t.length >= 3 ? (i = 34 * (1903 - t[0]), r = 34 * (4 - t[1]), o = 34 * (4 - t[2])) : "month" == this.fields && t.length >= 2 ? (i = 34 * (1903 - t[0]), r = 34 * (4 - t[1])) : i = 34 * (1903 - t[0]), this.result = {
          year: i,
          month: r,
          day: o
        }, this.$.yearinner.style.transform = "translate3d(0px, " + i + "px, 0px)", this.$.monthinner.style.transform = "translate3d(0px, " + r + "px, 0px)", this.$.dayinner.style.transform = "translate3d(0px, " + o + "px, 0px)"
      } else if ("time" == this.mode && e) {
        var a = e.split(":");
        if (a.length >= 2) {
          var s = 34 * (3 - a[0]),
            c = 34 * (3 - a[1]);
          this.result.hour = s, this.result.minute = c, this.$.hourinner.style.transform = "translate3d(0px, " + s + "px, 0px)", this.$.minuteinner.style.transform = "translate3d(0px, " + c + "px, 0px)"
        }
      } else isNaN(parseInt(e)) || (e >= this.range.length && (e = this.range.length - 1), this.curLoc = 34 * (3 - e), this.$.selectorinner.style.transform = "translate3d(0px, " + this.curLoc + "px, 0px)");
      return e
    },
    rangeChange: function(e) {
      this.value || (this.value = e ? parseInt(e.length / 2) : 0), this.insertItem(e)
    },
    insertItem: function(e) {
      if ("selector" == this.mode) {
        this.$.selectorinner.innerHTML = "";
        for (var t = 0; t < e.length; t++) {
          var n = document.createElement("wx-picker-item");
          n.innerHTML = '<div class="wx-picker-item">' + e[t] + "</div>", this.$.selectorinner.appendChild(n)
        }
      }
    },
    insertMonth: function() {
      if ("date" == this.mode && ("day" == this.fields || "month" == this.fields))
        for (var e = 1; e <= 12; e++) {
          var t = document.createElement("wx-picker-item"),
            n = e > 9 ? e : "0" + e;
          t.innerHTML = '<div class="wx-picker-item">' + n + "</div>", this.$.monthinner.appendChild(t)
        }
    },
    insertYear: function() {
      if ("date" == this.mode)
        for (var e = 1900; e <= 2900; e++) {
          var t = document.createElement("wx-picker-item");
          t.innerHTML = '<div class="wx-picker-item">' + e + "</div>", this.$.yearinner.appendChild(t)
        }
    },
    insertDay: function(e) {
      if ("date" == this.mode && "day" == this.fields) {
        this.$.dayinner.innerHTML = "";
        for (var t = 1; t <= 31; t++) {
          var n = document.createElement("wx-picker-item"),
            i = t > 9 ? t : "0" + t;
          n.innerHTML = '<div class="wx-picker-item">' + i + "</div>", this.$.dayinner.appendChild(n)
        }
      }
    },
    insertHour: function() {
      if ("time" == this.mode)
        for (var e = 0; e <= 23; e++) {
          var t = document.createElement("wx-picker-item"),
            n = e > 9 ? e : "0" + e;
          t.innerHTML = '<div class="wx-picker-item">' + n + "</div>", this.$.hourinner.appendChild(t)
        }
    },
    insertMinute: function() {
      if ("time" == this.mode)
        for (var e = 0; e <= 59; e++) {
          var t = document.createElement("wx-picker-item"),
            n = e > 9 ? e : "0" + e;
          t.innerHTML = '<div class="wx-picker-item">' + n + "</div>", this.$.minuteinner.appendChild(t)
        }
    },
    listeners: {
      tap: "showPickerView",
      "cancel.tap": "hide",
      "confirm.tap": "confirm",
      "selector.touchstart": "touchstart",
      "year.touchstart": "yearTouchstart",
      "month.touchstart": "monthTouchStart",
      "day.touchstart": "dayTouchStart",
      "hour.touchstart": "hourTouchStart",
      "minute.touchstart": "minuteTouchStart",
      touchmove: "moveWrapper",
      touchend: "moveEnd"
    },
    showPickerView: function() {
      "selector" == this.mode ? (this.$.picker.style.display = "block", this.$.selectorarea.style.display = "flex") : "time" == this.mode ? (this.$.picker.style.display = "block", this.$.time.style.display = "flex") : "date" == this.mode && (this.$.picker.style.display = "block", this.$.date.style.display = "flex")
    },
    pickerGetMaskStyle: function(e) {
      return "z-index:1000;" + (e ? "" : "background-color: transparent")
    },
    yearTouchstart: function(e) {
      this.$inner = this.$.yearinner, this.resultType = "year", this.curLoc = this.result.year || 0, this.childNodeLength = 1001, this.startLoc = e.touches[0].clientY
    },
    monthTouchStart: function(e) {
      this.$inner = this.$.monthinner, this.resultType = "month", this.curLoc = this.result.month || 0, this.childNodeLength = 12, this.startLoc = e.touches[0].clientY
    },
    dayTouchStart: function(e) {
      this.$inner = this.$.dayinner, this.resultType = "day", this.childNodeLength = 31, this.curLoc = this.result.day || 0, this.startLoc = e.touches[0].clientY
    },
    hourTouchStart: function(e) {
      this.$inner = this.$.hourinner, this.resultType = "hour", this.childNodeLength = 24, this.curLoc = this.result.hour || 0, this.startLoc = e.touches[0].clientY
    },
    minuteTouchStart: function(e) {
      this.$inner = this.$.minuteinner, this.resultType = "minute", this.childNodeLength = 60, this.curLoc = this.result.minute || 0, this.startLoc = e.touches[0].clientY
    },
    touchstart: function(e) {
      this.$inner = this.$.selectorinner, this.childNodeLength = this.range.length, this.startLoc = e.touches[0].clientY
    },
    moveWrapper: function(e) {
      if (this.$inner) return this.diffLoc = e.touches[0].clientY - this.startLoc, this.$inner.style.transition = "all 0s", this.$inner.style.transform = "translate3d(0px, " + (this.diffLoc + this.curLoc) + "px, 0px)", !1
    },
    moveEnd: function(e) {
      if (this.$inner) {
        this.curLoc = this.diffLoc + this.curLoc;
        var t = this.curLoc % 34;
        t < 0 && (t += 34), t < 17 ? this.curLoc = this.curLoc - t : this.curLoc = this.curLoc - t + 34, this.curLoc < Math.min(34 * (4 - this.childNodeLength), 0) ? this.curLoc = Math.min(34 * (4 - this.childNodeLength), 0) : this.curLoc > 102 && (this.curLoc = 102), this.$inner.style.transition = "all 0.3s", this.$inner.style.transform = "translate3d(0px, " + this.curLoc + "px, 0px)", this.result[this.resultType] = this.curLoc, console.log(this.result[this.resultType]), this.resultType = "", this.$inner = null
      }
    },
    hide: function() {
      return this.$.picker.style.display = "none", this.$.date.style.display = "none", this.$.selectorarea.style.display = "none", this.$.time.style.display = "none", !1
    },
    appendZero: function(e) {
      return e > 9 ? e : "0" + e
    },
    confirm: function(e) {
      if ("time" == this.mode) {
        var t = 3 - this.result.hour / 34,
          n = 3 - this.result.minute / 34;
        t = this.appendZero(t), n = this.appendZero(n), this.value = t + ":" + n
      } else if ("date" == this.mode) {
        var i = 1903 - this.result.year / 34,
          r = 4 - this.result.month / 34,
          o = 4 - this.result.day / 34;
        r = this.appendZero(r), o = this.appendZero(o), "day" == this.fields ? this.value = i + "-" + r + "-" + o : "month" == this.fields ? this.value = i + "-" + r : this.value = "" + i
      } else {
        var a = 3 - this.curLoc / 34;
        this.value = a
      }
      return console.log(this.value), this.triggerEvent("change", {
        value: this.value
      }, !0), this.hide(), !1
    }
  }), /wechatdevtools/.test(window.navigator.userAgent.toLowerCase()) || window.exparser.registerElement({
    is: "wx-picker",
    template: '<div id="wrapper"><wx-content></wx-content></div>',
    behaviors: ["wx-base", "wx-data-component"],
    properties: {
      range: {
        type: Array,
        value: [],
        public: !0
      },
      value: {
        type: String,
        value: "",
        public: !0
      },
      mode: {
        type: String,
        value: "selector",
        public: !0
      },
      fields: {
        type: String,
        value: "day",
        public: !0
      },
      start: {
        type: String,
        value: "",
        public: !0
      },
      end: {
        type: String,
        value: "",
        public: !0
      }
    },
    listeners: {
      tap: "showPickerView"
    },
    resetFormData: function() {
      "selector" == this.mode ? this.value = -1 : this.value = ""
    },
    getFormData: function(e) {
      this.__pickerShow ? this.__formCallback = e : "function" == typeof e && e(this.value)
    },
    formGetDataCallback: function() {
      "function" == typeof this.__formCallback && this.__formCallback(this.value), this.__formCallback = void 0
    },
    showPickerView: function() {
      "date" == this.mode || "time" == this.mode ? this.showDatePickerView() : this.showSelector()
    },
    getCustomerStyle: function() {
      var e = this.$.wrapper.getBoundingClientRect();
      return {
        width: e.width,
        height: e.height,
        left: e.left + window.scrollX,
        top: e.top + window.scrollY
      }
    },
    showSelector: function(e) {
      var t = this,
        n = parseInt(this.value);
      (isNaN(n) || n >= this.range.length) && (n = 0);
      for (var i = [], r = 0; r < this.range.length; r++) i.push(this.range[r] + "");
      WeixinJSBridge.invoke("showPickerView", {
        array: i,
        current: n,
        style: this.getCustomerStyle()
      }, function(e) {
        console.info(JSON.stringify(e)), /:ok/.test(e.errMsg) ? (t.value = e.index, t.triggerEvent("change", {
          value: t.value
        }, !0)) : console.error(e.errMsg), t.resetPickerState(), t.formGetDataCallback()
      }), this.__pickerShow = !0
    },
    showDatePickerView: function() {
      var e = this;
      WeixinJSBridge.invoke("showDatePickerView", {
        range: {
          start: this.start,
          end: this.end
        },
        mode: this.mode,
        current: this.value,
        fields: this.fields,
        style: this.getCustomerStyle()
      }, function(t) {
        console.info(JSON.stringify(t)), /:ok/.test(t.errMsg) ? (e.value = t.value, e.triggerEvent("change", {
          value: e.value
        }, !0)) : console.error(t.errMsg), e.resetPickerState(), e.formGetDataCallback()
      }), this.__pickerShow = !0
    },
    resetPickerState: function() {
      this.__pickerShow = !1
    }
  }), window.exparser.registerElement({
    is: "wx-progress",
    template: '\n    <div class="wx-progress-bar" style.height="{{strokeWidth}}px">\n      <div class="wx-progress-inner-bar" style.width="{{curPercent}}%" style.background-color="{{color}}"></div>\n    </div>\n    <p class="wx-progress-info" parse-text-content hidden$="{{!showInfo}}">\n      {{curPercent}}%\n    </p>\n  ',
    behaviors: ["wx-base"],
    properties: {
      percent: {
        type: Number,
        observer: "percentChange",
        public: !0
      },
      curPercent: {
        type: Number
      },
      showInfo: {
        type: Boolean,
        value: !1,
        public: !0
      },
      strokeWidth: {
        type: Number,
        value: 6,
        public: !0
      },
      color: {
        type: String,
        value: "#09BB07",
        public: !0
      },
      active: {
        type: Boolean,
        value: !1,
        public: !0,
        observer: "activeAnimation"
      }
    },
    percentChange: function(e) {
      e > 100 && (this.percent = 100), e < 0 && (this.percent = 0), this.__timerId && clearInterval(this.__timerId), this.activeAnimation(this.active)
    },
    activeAnimation: function(e) {
      if (!isNaN(this.percent))
        if (e) {
          var t = function() {
            return this.percent <= this.curPercent + 1 ? (this.curPercent = this.percent, void clearInterval(this.__timerId)) : void++this.curPercent
          };
          this.curPercent = 0, this.__timerId = setInterval(t.bind(this), 30), t.call(this)
        } else this.curPercent = this.percent
    },
    detached: function() {
      this.__timerId && clearInterval(this.__timerId)
    }
  }), window.exparser.registerElement({
    is: "wx-radio",
    template: '\n    <input id="input" class="wx-radio-check" type="radio" checked:="{{checked}}" disabled$="{{disabled}}"/>\n    <wx-content></wx-content>\n  ',
    behaviors: ["wx-base", "wx-label-target", "wx-disabled", "wx-item"],
    properties: {},
    listeners: {
      "input.change": "inputChange"
    },
    handleLabelTap: function(e) {
      this.disabled || this.checked || (this.checked = !this.checked, this.inputChange())
    },
    inputChange: function(e) {
      this.checked = this.$.input.checked, this.itemCheck()
    }
  }), window.exparser.registerElement({
    is: "wx-radio-group",
    template: '\n    <span id="wrapper">\n      <wx-content></wx-content>\n    </span>\n  ',
    behaviors: ["wx-base", "wx-data-component", "wx-group"],
    properties: {}
  }), window.exparser.registerElement({
    is: "wx-scroll-view",
    template: '\n    <div id="main" class="wx-scroll-view" style$="overflow-x: hidden; overflow-y: hidden;">\n      <wx-content></wx-content>\n    </div>\n  ',
    behaviors: ["wx-base"],
    properties: {
      scrollX: {
        type: Boolean,
        value: !1,
        public: !0
      },
      scrollY: {
        type: Boolean,
        value: !1,
        public: !0
      },
      upperThreshold: {
        type: Number,
        value: 50,
        public: !0
      },
      lowerThreshold: {
        type: Number,
        value: 50,
        public: !0
      },
      scrollTop: {
        type: Number,
        observer: "_scrollTopChanged",
        public: !0
      },
      scrollLeft: {
        type: Number,
        observer: "_scrollLeftChanged",
        public: !0
      },
      scrollIntoView: {
        type: String,
        observer: "_srollIntoViewChanged",
        public: !0
      }
    },
    listeners: {
      "main.track": "_handleTrack"
    },
    created: function() {
      this._lastScrollTop = this.scrollTop || 0, this._lastScrollLeft = this.scrollLeft || 0
    },
    attached: function() {
      var e = this;
      this._scrollTopChanged(this.scrollTop), this._scrollLeftChanged(this.scrollLeft), this._srollIntoViewChanged(this.scrollIntoView), this.__handleScroll = function(t) {
        e._handleScroll.bind(e, t)()
      }, this.$.main.addEventListener("scroll", this.__handleScroll), this.$.main.style.overflowX = this.scrollX ? "auto" : "hidden", this.$.main.style.overflowY = this.scrollY ? "auto" : "hidden", document.getElementById("__scroll_view_hack") && document.body.removeChild(document.getElementById("__scroll_view_hack"));
      var t = document.createElement("div");
      t.setAttribute("style", "position: fixed; left: 0; bottom: 0; line-height: 1; font-size: 1px; z-index: 10000; border-radius: 4px; box-shadow: 0 0 8px rgba(0,0,0,.4); width: 1px; height: 1px; overflow: hidden;"), t.innerText = ".", t.id = "__scroll_view_hack", document.body.appendChild(t)
    },
    detached: function() {
      this.$.main.removeEventListener("scroll", this.__handleScroll)
    },
    _getStyle: function(e, t) {
      var n = e ? "auto" : "hidden",
        i = t ? "auto" : "hidden";
      return "overflow-x: " + n + "; overflow-y: " + i + ";"
    },
    _handleTrack: function(e) {
      return "start" === e.detail.state ? (this._x = e.detail.x, this._y = e.detail.y, void(this._noBubble = null)) : ("end" === e.detail.state && (this._noBubble = !1), null === this._noBubble && this.scrollY && (Math.abs(this._y - e.detail.y) / Math.abs(this._x - e.detail.x) > 1 ? this._noBubble = !0 : this._noBubble = !1), null === this._noBubble && this.scrollX && (Math.abs(this._x - e.detail.x) / Math.abs(this._y - e.detail.y) > 1 ? this._noBubble = !0 : this._noBubble = !1), this._x = e.detail.x, this._y = e.detail.y, void(this._noBubble && e.stopPropagation()))
    },
    _handleScroll: function(e) {
      clearTimeout(this._timeout), this._timeout = setTimeout(function() {
        var e = this.$.main;
        if (this.triggerEvent("scroll", {
            scrollLeft: e.scrollLeft,
            scrollTop: e.scrollTop,
            scrollHeight: e.scrollHeight,
            scrollWidth: e.scrollWidth,
            deltaX: this._lastScrollLeft - e.scrollLeft,
            deltaY: this._lastScrollTop - e.scrollTop
          }, !0), this.scrollY) {
          var t = this._lastScrollTop - e.scrollTop > 0,
            n = this._lastScrollTop - e.scrollTop < 0;
          e.scrollTop <= this.upperThreshold && t && this.triggerEvent("scrolltoupper", {
            direction: "top"
          }, !0), e.scrollTop + e.offsetHeight + this.lowerThreshold >= e.scrollHeight && n && this.triggerEvent("scrolltolower", {
            direction: "bottom"
          }, !0)
        }
        if (this.scrollX) {
          var i = this._lastScrollLeft - e.scrollLeft > 0,
            r = this._lastScrollLeft - e.scrollLeft < 0;
          e.scrollLeft <= this.upperThreshold && i && this.triggerEvent("scrolltoupper", {
            direction: "left"
          }, !0), e.scrollLeft + e.offsetWidth + this.lowerThreshold >= e.scrollWidth && r && this.triggerEvent("scrolltolower", {
            direction: "right"
          }, !0)
        }
        this.scrollTop = this._lastScrollTop = e.scrollTop, this.scrollLeft = this._lastScrollLeft = e.scrollLeft
      }.bind(this), 50)
    },
    _scrollTopChanged: function(e) {
      this.scrollY && (this.$.main.scrollTop = e)
    },
    _scrollLeftChanged: function(e) {
      this.scrollX && (this.$.main.scrollLeft = e)
    },
    _srollIntoViewChanged: function(e) {
      if (e) {
        var t = this.$.dom.querySelector("#" + e);
        t && (this.$.main.scrollTop = t.offsetTop)
      }
    }
  }), window.exparser.registerElement({
    is: "wx-slider",
    template: '\n    <div class="wx-slider-wrapper" class.wx-slider-disabled="{{disabled}}">\n      <div class="wx-slider-tap-area" id="wrapper">\n        <div class="wx-slider-handle-wrapper">\n          <div class="wx-slider-handle" style.left="{{_getValueWidth(value,min,max)}}" id="handle"></div>\n          <div class="wx-slider-track" style.width="{{_getValueWidth(value,min,max)}}"></div>\n          <div class="wx-slider-step" id="step"></div>\n        </div>\n      </div>\n      <span hidden$="{{!showValue}}" class="wx-slider-value">\n        <p parse-text-content>{{value}}</p>\n      </span>\n    </div>\n  ',
    properties: {
      min: {
        type: Number,
        value: 0,
        public: !0,
        observer: "_revalicateRange"
      },
      max: {
        type: Number,
        value: 100,
        public: !0,
        observer: "_revalicateRange"
      },
      step: {
        type: Number,
        value: 1,
        public: !0
      },
      value: {
        type: Number,
        value: 0,
        public: !0,
        coerce: "_filterValue"
      },
      showValue: {
        type: Boolean,
        value: !1,
        public: !0
      }
    },
    listeners: {
      "handle.track": "_onTrack",
      "wrapper.tap": "_onTap"
    },
    behaviors: ["wx-base", "wx-data-component", "wx-disabled"],
    _filterValue: function(e) {
      if (e < this.min) return this.min;
      if (e > this.max) return this.max;
      var t = Math.round((e - this.min) / this.step);
      return t * this.step + this.min
    },
    _revalicateRange: function() {
      this.value = this._filterValue(this.value)
    },
    _getValueWidth: function(e, t, n) {
      return 100 * (e - t) / (n - t) + "%"
    },
    _getXPosition: function(e) {
      for (var t = e.offsetLeft; e; e = e.offsetParent) t += e.offsetLeft;
      return t - document.body.scrollLeft
    },
    _onUserChangedValue: function(e) {
      var t = this.$.step.offsetWidth,
        n = this._getXPosition(this.$.step),
        i = (e.detail.x - n) * (this.max - this.min) / t + this.min;
      i = this._filterValue(i), this.value = i
    },
    _onTrack: function(e) {
      if (!this.disabled) return "move" === e.detail.state ? (this._onUserChangedValue(e), !1) : void("end" === e.detail.state && this.triggerEvent("change", {
        value: this.value
      }, !0))
    },
    _onTap: function(e) {
      this.disabled || (this._onUserChangedValue(e), this.triggerEvent("change", {
        value: this.value
      }, !0))
    },
    resetFormData: function() {
      this.value = this.min
    }
  }), window.exparser.registerElement({
    is: "wx-swiper",
    template: '\n    <div id="slidesWrapper" class="wx-swiper-wrapper">\n      <div id="slides" class="wx-swiper-slides" class.wx-swiper-slides-tracking="{{_tracking}}" style.transition-duration="{{duration}}ms">\n        <wx-content></wx-content>\n      </div>\n      <div id="slidesDots" hidden$="{{!indicatorDots}}" class="wx-swiper-dots" class.wx-swiper-dots-horizontal="{{!vertical}}" class.wx-swiper-dots-vertical="{{vertical}}">\n        <wx-repeat items="{{_slidesVisible}}">\n          <div data-dot-index$="{{index}}" class="wx-swiper-dot" class.wx-swiper-dot-active="{{item}}" style.transition-duration="{{duration}}ms"></div>\n        </wx-repeat>\n      </div>\n    </div>\n  ',
    behaviors: ["wx-base"],
    properties: {
      indicatorDots: {
        type: Boolean,
        value: !1,
        public: !0
      },
      vertical: {
        type: Boolean,
        value: !1,
        observer: "_initSlides"
      },
      autoplay: {
        type: Boolean,
        value: !1,
        observer: "_autoplayChanged",
        public: !0
      },
      interval: {
        type: Number,
        value: 5e3,
        public: !0
      },
      duration: {
        type: Number,
        value: 1e3,
        public: !0
      },
      current: {
        type: Number,
        value: 0,
        coerce: "_normalizeCurrentSlide",
        observer: "_currentSlideChanged",
        public: !0
      },
      _slidesVisible: Array,
      _tracking: Boolean
    },
    listeners: {
      "slides.track": "handleContentTrack",
      "slidesDots.tap": "handleDotTap"
    },
    attached: function() {
      this._attached = !0, this._initSlides(), this.autoplay && this._scheduleNextSlide()
    },
    detached: function() {
      this._attached = !1, this._cancelSchedule()
    },
    contentChanged: function() {
      this._initSlides()
    },
    _initSlides: function() {
      if (this._attached) {
        for (var e = this.$.content.childNodes, t = 0, n = this.vertical, i = 0; i < e.length; i++) {
          var r = e[i];
          "WX-SWIPER-ITEM" === r.tagName && (r.style.position = "absolute", r.style.width = "100%", r.style.height = "100%", n ? (r.style.left = 0, r.style.top = 100 * t + "%") : (r.style.top = 0, r.style.left = 100 * t + "%"), t++)
        }
        this._slideCount = t;
        var o = this._normalizeCurrentSlide(this.current);
        n ? (this.$.slides.style.top = 100 * -o + "%", this.$.slides.style.left = 0) : (this.$.slides.style.top = 0, this.$.slides.style.left = 100 * -o + "%"), this._updateDots(o)
      }
    },
    _getDirectionName: function(e) {
      return e ? "vertical" : "horizontal"
    },
    _scheduleNextSlide: function() {
      var e = this;
      this._cancelSchedule(), this._attached && (this._scheduleTimeoutObj = setTimeout(function() {
        e._scheduleTimeoutObj = null, e.current++
      }, this.interval))
    },
    _cancelSchedule: function() {
      this._scheduleTimeoutObj && (clearTimeout(this._scheduleTimeoutObj), this._scheduleTimeoutObj = null)
    },
    _updateDots: function(e) {
      for (var t = [], n = 0; n < this._slideCount; n++) t[n] = n === e;
      this._slidesVisible = t
    },
    _gotoSlide: function(e) {
      this._slideCount && (this._updateDots(e), this.vertical ? this.$.slides.style.top = -100 * e + "%" : this.$.slides.style.left = -100 * e + "%", this.autoplay && this._scheduleNextSlide(), this.triggerEvent("change", {
        current: e
      }, !0))
    },
    _autoplayChanged: function(e) {
      e ? this._scheduleNextSlide() : this._cancelSchedule()
    },
    _normalizeCurrentSlide: function(e) {
      return this._slideCount ? (Math.round(e) % this._slideCount + this._slideCount) % this._slideCount : e
    },
    _currentSlideChanged: function(e) {
      this._gotoSlide(e)
    },
    handleDotTap: function(e) {
      var t = Number(e.target.dataset.dotIndex);
      this.current = t
    },
    handleContentTrack: function(e) {
      if ("start" === e.detail.state) return this._contentTrackX = parseFloat(this.$.slides.style.left), this._contentTrackY = parseFloat(this.$.slides.style.top), this._contentTrackStartX = e.detail.x, this._contentTrackStartY = e.detail.y, this._contentTrackPrevX = e.detail.x, this._contentTrackPrevY = e.detail.y, this._contentTrackS = 0, this._contentTrackT = Date.now(), this._tracking = !0, void(this._trackingDirectionChecked = !1);
      if (this._tracking) {
        var t = e.detail.x - this._contentTrackStartX,
          n = e.detail.y - this._contentTrackStartY,
          i = e.detail.x - this._contentTrackPrevX,
          r = e.detail.y - this._contentTrackPrevY;
        if (this._contentTrackPrevX = e.detail.x, this._contentTrackPrevY = e.detail.y, !this._trackingDirectionChecked) {
          if (Math.abs(t) <= Math.abs(n) && !this.vertical || Math.abs(t) >= Math.abs(n) && this.vertical) return void(this._tracking = !1);
          this._trackingDirectionChecked = !0
        }
        if ("end" === e.detail.state) {
          this.autoplay && this._scheduleNextSlide(), this._tracking = !1;
          var o = 0;
          Math.abs(this._contentTrackS) / (Date.now() - this._contentTrackT) > 1 && (o = 50 * this._contentTrackS / Math.abs(this._contentTrackS));
          var a = 0;
          return a = this.vertical ? this._normalizeCurrentSlide(-(parseFloat(this.$.slides.style.top) + o) / 100) : this._normalizeCurrentSlide(-(parseFloat(this.$.slides.style.left) + o) / 100), void(this.current !== a ? this.current = a : this.vertical ? this.$.slides.style.top = -100 * a + "%" : this.$.slides.style.left = -100 * a + "%")
        }
        this._cancelSchedule();
        var s = this._slideCount,
          c = function(e) {
            return .5 - .25 / (e + .5)
          };
        if (this._contentTrackS = 0,
          this._contentTrackT = Date.now(), this.vertical) {
          var l = this._contentTrackY + n / this.$.slidesWrapper.offsetHeight * 100;
          l > 0 ? l = 100 * c(l / 100) : 100 - l > 100 * s ? l = 100 * (1 - c(1 - l / 100 - s) - s) : this._contentTrackS = r, this.$.slides.style.top = l + "%"
        } else {
          var d = this._contentTrackX + t / this.$.slidesWrapper.offsetWidth * 100;
          d > 0 ? d = 100 * c(d / 100) : 100 - d > 100 * s ? d = 100 * (1 - c(1 - d / 100 - s) - s) : this._contentTrackS = i, this.$.slides.style.left = d + "%"
        }
        return !1
      }
    }
  }), window.exparser.registerElement({
    is: "wx-swiper-item",
    template: "\n    <wx-content></wx-content>\n  ",
    properties: {},
    behaviors: ["wx-base"]
  }), window.exparser.registerElement({
    is: "wx-switch",
    template: '\n    <div class$="{{getDisabledClass(disabled)}}" style="display: inline-block">\n      <span hidden$="{{!isSwitch(type)}}">\n        <input id="switchInput" class="weui_switch" type="checkbox" checked:="{{checked}}" disabled$="{{disabled}}" />\n      </span>\n      <span hidden$="{{!isCheckbox(type)}}">\n        <label class="weui_switch_checkbox_wrapper">\n          <span id="checkbox" class$="weui_switch_checkbox{{getCheckboxClass(checked)}}">\n            <span class="weui_switch_checkbox_inner">\n            </span>\n            <input id="checkboxInput" type="checkbox" class="weui_switch_checkbox_input" checked$="{{checked}}" disabled$="{{disabled}}" />\n          </span>\n        </label>\n      </span>\n    </div>\n  ',
    properties: {
      checked: {
        type: Boolean,
        value: !1,
        public: !0
      },
      type: {
        type: String,
        value: "switch",
        public: !0
      }
    },
    behaviors: ["wx-base", "wx-label-target", "wx-disabled", "wx-data-component"],
    listeners: {
      "switchInput.change": "onInputChange",
      "checkboxInput.change": "onInputChange"
    },
    handleLabelTap: function(e) {
      this.disabled || (this.checked = !this.checked)
    },
    onInputChange: function(e) {
      return this.checked = !this.checked, this.disabled ? void(this.checked = !this.checked) : void this.triggerEvent("change", {
        value: this.checked
      }, !0)
    },
    getCheckboxClass: function(e) {
      return e ? " weui_switch_checkbox_checked" : ""
    },
    isSwitch: function(e) {
      return "switch" === e
    },
    isCheckbox: function(e) {
      return "checkbox" === e
    },
    getDisabledClass: function(e) {
      return e ? "weui_switch_disabled" : ""
    },
    getFormData: function() {
      return this.checked
    },
    resetFormData: function() {
      this.checked = !1
    }
  }), window.exparser.registerElement({
    is: "wx-text",
    template: '\n    <span id="raw" style="display:none;"><wx-content></wx-content></span>\n    <span id="main"></span>\n  ',
    behaviors: ["wx-base"],
    properties: {
      selectable: {
        type: Boolean,
        value: !1,
        public: !0
      }
    },
    _htmlEncode: function(e) {
      return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&apos;")
    },
    _contentChanged: function() {
      this.$.main.innerHTML = this._htmlEncode(this.$.raw.textContent).replace(/\n/g, "<br>")
    },
    attached: function() {
      this._contentChanged()
    },
    contentChanged: function() {
      this._contentChanged()
    }
  }), window.exparser.registerElement({
    is: "wx-toast",
    template: '\n    <div class="wx-toast-mask" id="mask" style$="{{_getMaskStyle(mask)}}"></div>\n    <div class="wx-toast">\n      <i class$="wx-toast-icon wx-icon-{{icon}}" style.color="#FFFFFF" style.font-size="55px" style.display="block"></i>\n      <p class="wx-toast-content"><wx-content></wx-content></p>\n    </div>\n  ',
    behaviors: ["wx-base", "wx-mask-behavior"],
    properties: {
      icon: {
        type: String,
        value: "success_no_circle",
        public: !0
      },
      hidden: {
        type: Boolean,
        value: !0,
        public: !0,
        observer: "hiddenChange"
      },
      duration: {
        type: Number,
        value: 1500,
        public: !0,
        observer: "durationChange"
      }
    },
    durationChange: function(e, t) {
      this.timer && (clearTimeout(this.timer), this.hiddenChange(this.hidden))
    },
    hiddenChange: function(e) {
      if (!e && 0 != this.duration) {
        var t = this;
        this.timer = setTimeout(function() {
          t.triggerEvent("change", {
            value: t.hidden
          }, !0)
        }, this.duration)
      }
    }
  }), window.exparser.registerElement({
    is: "wx-video",
    behaviors: ["wx-base", "wx-player", "wx-native"],
    template: '<div class="wx-video-container">\n    <video id="player" webkit-playsinline style="display: none;"></video>\n    <div id="default" class="wx-video-bar" style="display: none;">\n      <div id="button" class$="wx-video-button {{_buttonType}}"></div>\n      <div class="wx-video-time" parse-text-content>{{_currentTime}}</div>\n      <div id="progress" class="wx-video-progress">\n        <div id="ball" class="wx-video-ball" style$="left: {{_progressLeft}}px;">\n          <div class="wx-video-inner"></div>\n        </div>\n        <div class="wx-video-inner" style$="width: {{_progressLength}}px;"></div>\n      </div>\n      <div class="wx-video-time" parse-text-content>{{_duration}}</div>\n      <div id="fullscreen" class="wx-video-fullscreen"></div>\n    </div>\n  </div>\n  <div id="fakebutton"></div>',
    properties: {
      _videoId: {
        type: Number
      },
      _isLockTimeUpdateProgress: {
        type: Boolean,
        value: !1
      },
      _rate: {
        type: Number,
        value: 0
      },
      _progressLeft: {
        type: Number,
        value: -22
      },
      _progressLength: {
        type: Number,
        value: 0
      }
    },
    _reset: function() {
      this._buttonType = "play", this._currentTime = "00:00", this._duration = "00:00", this._progressLeft = -22, this._progressLength = 0
    },
    _update: function(e, t) {
      var n = this;
      e.videoPlayerId = this._videoId, e.hide = this.hidden, console.log(e), WeixinJSBridge.invoke("updateVideoPlayer", e, function(e) {
        /ok/.test(e.errMsg) ? console.log("视频组件: 更新" + t + "成功 " + e.errMsg) : n._publish("error", {
          errMsg: e.errMsg
        })
      })
    },
    _updatePosition: function() {
      this._isiOS() ? this._update({
        position: this._box
      }, "位置") : (this.$.player.width = this._box.width, this.$.player.height = this._box.height)
    },
    _hiddenChanged: function(e, t) {
      this._isiOS() ? (this.$.dom.style.display = e ? "none" : "", this._update({
        hide: e
      }, e ? "隐藏" : "显示")) : (this.$.player.pause(), this.$.dom.style.display = e ? "none" : "")
    },
    posterChanged: function(e, t) {
      if (!this._isError) return this._isReady ? void(this._isiOS() && (/http:\/\//.test(e) || /https:\/\//.test(e)) ? this._update({
        poster: e
      }, "封面") : this.$.player.poster = e) : void this._deferred.push({
        callback: "posterChanged",
        args: [e, t]
      })
    },
    srcChanged: function(e, t) {
      if (!this._isError && e) {
        if (!this._isReady) return void this._deferred.push({
          callback: "srcChanged",
          args: [e, t]
        });
        if (this._isiOS()) console.log("视频组件: 当前环境 iphone"), /wxfile:\/\//.test(e) || /http:\/\//.test(e) || /https:\/\//.test(e) ? this._update({
          filePath: e
        }, "资源") : this._publish("error", {
          errMsg: "MEDIA_ERR_SRC_NOT_SUPPORTED"
        });
        else {
          console.log("视频组件: 当前环境 Android/开发者工具"), this.$.player.src = e, console.log(this.$.player.src);
          var n = this;
          setTimeout(function() {
            n._reset()
          }, 0)
        }
      }
    },
    _computeRate: function(e) {
      var t = this.$.progress.getBoundingClientRect().left,
        n = this.$.progress.offsetWidth,
        i = (e - t) / n;
      return i < 0 ? i = 0 : i > 1 && (i = 1), i
    },
    _setProgress: function(e) {
      this._progressLength = Math.floor(this.$.progress.offsetWidth * e), this._progressLeft = this._progressLength - 22
    },
    attached: function() {
      console.log("来了");
      var e = this;
      this._isiOS() ? (console.log("视频组件: iOS 不显示默认控件"), this._box = this._getBox(), WeixinJSBridge.invoke("insertVideoPlayer", {
        position: this._box,
        hide: this.hidden
      }, function(t) {
        /ok/.test(t.errMsg) ? (e._videoId = t.videoPlayerId, e._ready(), document.addEventListener("pageReRender", e._pageReRenderCallback.bind(e))) : (e._isError = !0, e.$.dom.style.display = "none", e._publish("error", {
          errMsg: t.errMsg
        }))
      })) : (this.$.default.style.display = "", this.$.player.style.display = "", this.$.player.addEventListener("timeupdate", function(t) {
        t.stopPropagation();
        var n = e.$.player.currentTime / e.$.player.duration;
        e._isLockTimeUpdateProgress || e._setProgress(n)
      }), this.$.button.onclick = function(t) {
        t.stopPropagation(), e.$.player[e._buttonType]()
      }, this.$.progress.onclick = function(t) {
        t.stopPropagation();
        var n = e._computeRate(t.clientX);
        e.$.player.currentTime = e.$.player.duration * n
      }, this._isAndroid() ? this.$.ball.ontouchstart = function() {
        e._isLockTimeUpdateProgress = !0;
        var t = function(t) {
            t.stopPropagation(), t.preventDefault(), e._rate = e._computeRate(t.touches[0].clientX), e._setProgress(e._rate)
          },
          n = function n(i) {
            e.$.player.currentTime = e.$.player.duration * e._rate, document.removeEventListener("touchmove", t), document.removeEventListener("touchend", n), e._isLockTimeUpdateProgress = !1
          };
        document.addEventListener("touchmove", t), document.addEventListener("touchend", n)
      } : this.$.ball.onmousedown = function() {
        e._isLockTimeUpdateProgress = !0;
        var t = function(t) {
            t.stopPropagation(), t.preventDefault(), e._rate = e._computeRate(t.clientX), e._setProgress(e._rate)
          },
          n = function n(i) {
            e.$.player.currentTime = e.$.player.duration * e._rate, document.removeEventListener("mousemove", t), document.removeEventListener("mouseup", n), e._isLockTimeUpdateProgress = !1
          };
        document.addEventListener("mousemove", t), document.addEventListener("mouseup", n)
      }, this.$.fullscreen.onclick = function(t) {
        t.stopPropagation(), e.$.player.webkitEnterFullscreen()
      }, this._ready(), document.addEventListener("pageReRender", this._pageReRenderCallback.bind(this)))
    },
    detached: function() {
      console.log("滚粗啦"), this._isiOS() && wx.removeVideoPlayer({
        videoPLayerId: this._videoId,
        success: function(e) {}
      })
    }
  }), window.exparser.registerElement({
    is: "wx-view",
    template: "<wx-content></wx-content>",
    behaviors: ["wx-base"],
    properties: {
      inline: {
        type: Boolean,
        public: !0
      }
    }
  }), ! function(e) {
    function t(i) {
      if (n[i]) return n[i].exports;
      var r = n[i] = {
        exports: {},
        id: i,
        loaded: !1
      };
      return e[i].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
  }([function(e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }

    function r(e, t, n) {
      if ("reRenderTime" === e) {
        var i = Date.now();
        if (i - t <= 200) return
      }
      var r = _[e];
      r && (Reporter.reportKeyValue({
        key: "Speed",
        value: r + "," + t + ",0,0," + n
      }), Reporter.log("VirtualDom SpeedReport:" + e + ",startTime:" + t + ",endTime:" + n + ",cost:" + (n - t)))
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.reset = t.getVirtualTree = t.createVirtualTree = t.createText = t.createElement = void 0;
    var o = n(14),
      a = i(o),
      s = n(5),
      c = i(s),
      l = n(2),
      d = n(12),
      u = n(8),
      h = n(6),
      p = i(h),
      g = n(13);
    (0, u.setRem)();
    var curr
    var A = "__DOMReady",
      f = t.createElement = function(e, t, n, i) {
        return new a.default(e, t, n, i)
      },
      v = t.createText = function(e) {
        return new c.default(e)
      },
      w = t.createVirtualTree = function e(t, n) {
        if ((0, l.isString)(t) || Number(t) === t && Number(t) % 1 === 0) return v(String(t), n);
        var i = [];
        return t.children.forEach(function(t) {
          i.push(e(t, n))
        }), f(t.tag, t.attr, i, n)
      },
      m = t.getVirtualTree = function(e, t) {
        var n = window.__generateFunc__(e);
        n.tag = "body"
        curr = w(n, t)
        return curr
      },
      b = void 0,
      x = void 0,
      y = {};
    t.reset = function() {
      b = void 0, x = void 0, y = {}
    }, window.onerror = function(e, t, n, i, r) {
      console.error(r.stack), Reporter.errorReport({
        key: "webviewScriptError",
        error: r
      })
    };
    var _ = {
        funcReady: 3,
        firstGetData: 4,
        firstRenderTime: 5,
        reRenderTime: 6,
        forceUpdateRenderTime: 7
      },
      k = {
        webviewStartTime: Date.now(),
        funcReady: 0,
        renderStart: 0
      },
      C = function(e) {
        e.ext && ("undefined" != typeof e.ext.webviewId && (window.__webviewId__ = e.ext.webviewId), "undefined" != typeof e.ext.downloadDomain && (window.__downloadDomain__ = e.ext.downloadDomain)), p.default.setData(e.data),
        b = m(p.default.getData(), !0),
        x = b.render(), x.replaceDocumentElement(document.body), setTimeout(function() {
          wx.publishPageEvent(A, {}), wx.initReady()
        }, 0)
      },
      E = function(e) {
        p.default.setData(e.data);
        var t = m(p.default.getData(), !1),
          n = b.diff(t);
        n.apply(x), b = t
      },
      I = function(e) {
        var t = JSON.parse(JSON.stringify(p.default.getData()));
        for (var n in e.data) t[n] = e.data[n];
        var i = m(t, !1),
          r = b.diff(i);
        r.apply(x), b = i
      };
    document.addEventListener("generateFuncReady", function(e) {
      k.funcReady = Date.now(), r("funcReady", k.webviewStartTime, k.funcReady), window.__generateFunc__ = e.detail.generateFunc, wx.onAppDataChange && window.__generateFunc__ && wx.onAppDataChange((0, d.catchError)(function(e) {
        k.renderStart = Date.now(), e.options && e.options.firstRender ? (r("firstGetData", k.funcReady, k.renderStart),
      C(e), r("firstRenderTime", k.renderStart, Date.now())) : (e.options && "action" === e.options.type ? I(e) : E(e), document.dispatchEvent(new CustomEvent("pageReRender", {})), r("reRenderTime", k.renderStart, Date.now()))
      })), window.__enablePullUpRefresh__ && ! function() {
        var e = null;
        window.onscroll = function() {
          clearTimeout(e), e = setTimeout(function() {
            (0, g.checkScrollBottom)() && wx.publishPageEvent("onPullUpRefresh", {})
          }, 50)
        }
      }();

      wx.onWxmlChange(function () {
        // should be rendered
        if (!curr) return
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var text = xhr.responseText
              var func = new Function(text + '\n return $gwx("./' +__path__+ '.wxml")')
              window.__generateFunc__ = func()
              var oldTree = curr
              var o = m(p.default.getData(), false),

              a = oldTree.diff(o);

              a.apply(x),  document.dispatchEvent(new CustomEvent("pageReRender", {}));
              console.info('Hot apply: ' + __path__ + '.wxml')
            }
          }
        }
        xhr.open('GET', '/generateFunc?path=' + encodeURIComponent(__path__))
        xhr.send()
      })
    })
  }, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.PATCH_TYPE = {
      NONE: 0,
      TEXT: 1,
      VNODE: 2,
      PROPS: 3,
      REORDER: 4,
      INSERT: 5,
      REMOVE: 6
    }, t.ATTRIBUTE_NAME = ["class", "style"], t.RPX_RATE = 20, t.BASE_DEVICE_WIDTH = 750, t.PULL_UP_THREDHOLD = 50, t.INLINE_STYLE = ["placeholderStyle", "hoverStyle"]
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.uuid = t.transformRpx = t.getPrototype = t.isArray = t.isString = t.isVirtualText = t.isVirtualNode = t.isEmptyObject = t.isObject = void 0;
    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
      },
      r = n(1),
      o = (t.isObject = function(e) {
        return "object" === ("undefined" == typeof e ? "undefined" : i(e)) && null !== e
      }, t.isEmptyObject = function(e) {
        for (var t in e) return !1;
        return !0
      }, t.isVirtualNode = function(e) {
        return e && "WxVirtualNode" === e.type
      }, t.isVirtualText = function(e) {
        return e && "WxVirtualText" === e.type
      }, t.isString = function(e) {
        return "[object String]" === Object.prototype.toString.call(e)
      }),
      a = (t.isArray = function(e) {
        return Array.isArray ? Array.isArray(e) : "[object Array]" === Object.prototype.toString.call(e)
      }, t.getPrototype = function(e) {
        return Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__ ? e.__proto__ : e.constructor ? e.constructor.prototype : void 0
      }, function(e) {
        for (var t = 0, n = 1, i = !1, r = !1, o = 0; o < e.length; ++o) {
          var a = e[o];
          a >= "0" && a <= "9" ? i ? (n *= .1, t += (a - "0") * n) : t = 10 * t + (a - "0") : "." === a ? i = !0 : "-" === a && (r = !0)
        }
        return r ? -t : t
      }),
      s = /(:|\s)[+-]?\d+(\.\d+)?rpx/g;
    t.transformRpx = function(e) {
      if (!o(e)) return e;
      var t = e.match(s);
      return t && t.forEach(function(t) {
        var n = a(t);
        n = n * r.RPX_RATE / r.BASE_DEVICE_WIDTH;
        var i = t[0] + n + "rem";
        e = e.replace(t, i)
      }), e
    }, t.uuid = function() {
      var e = function() {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
      };
      return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
    }
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.removeProperty = t.applyProperties = void 0;
    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
      },
      r = n(2),
      o = n(1),
      a = /^data-/,
      s = function(e) {
        return {
          id: e.id,
          offsetLeft: e.__domElement.offsetLeft,
          offsetTop: e.__domElement.offsetTop,
          dataset: e.__domElement.dataset
        }
      },
      c = function(e, t, n, i) {
        e.__wxEventHandleName || (e.__wxEventHandleName = Object.create(null)), void 0 === e.__wxEventHandleName[t] && e.addListener(t, function(n) {
          if (e.__wxEventHandleName[t]) return n.target = s(n.target), n.currentTarget = s(n.currentTarget), window.wx.publishPageEvent(e.__wxEventHandleName[t], n), !i && void 0
        }), e.__wxEventHandleName[t] = n
      },
      l = (t.applyProperties = function(e, t) {
        for (var n in t) {
          var s = t[n],
            d = exparser.Component.hasProperty(e, n);
          void 0 === s ? l(e, n) : d ? o.INLINE_STYLE.indexOf(n) !== -1 ? e[n] = (0, r.transformRpx)(s) : e[n] = s : "bind" === n.slice(0, 4) ? c(e, n.slice(4), s) : "catch" === n.slice(0, 5) ? c(e, n.slice(5), s, !0) : "on" === n.slice(0, 2) ? c(e, n.slice(2), s) : o.ATTRIBUTE_NAME.indexOf(n) !== -1 || a.test(n) ? "style" === n ? e.setAttribute(n, (0, r.transformRpx)(s)) : e.setAttribute(n, s) : "animation" === n && "object" === ("undefined" == typeof s ? "undefined" : i(s)) && s.actions && s.actions.length > 0 && ! function() {
            var t = function() {
                if (n < o) {
                  var t = wx.animationToStyle(i[n]),
                    a = t.transition,
                    s = t.transform,
                    c = t.transformOrigin,
                    l = t.style;
                  e.__domElement.style.transition = a, e.__domElement.style.transform = s, e.__domElement.style.transformOrigin = c, e.__domElement.style.webkitTransition = a, e.__domElement.style.webkitTransform = s, e.__domElement.style.webkitTransformOrigin = c;
                  for (var d in l) e.__domElement.style[d] = (0, r.transformRpx)(" " + l[d])
                }
              },
              n = 0,
              i = s.actions,
              o = s.actions.length;
            e.addListener("transitionend", function() {
              n += 1, t()
            }), t()
          }()
        }
      }, t.removeProperty = function(e, t) {
        var n = exparser.Component.hasProperty(e, t);
        n ? e[t] = void 0 : "bind" === t.slice(0, 4) ? c(e, t.slice(4), "") : "catch" === t.slice(0, 5) ? c(e, t.slice(5), "", !0) : "on" === t.slice(0, 2) ? c(e, t.slice(2), "") : (o.ATTRIBUTE_NAME.indexOf(t) !== -1 || a.test(t)) && e.removeAttribute(t)
      })
  }, function(e, t, n) {
    "use strict";

    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
          }
        }
        return function(t, n, i) {
          return n && e(t.prototype, n), i && e(t, i), t
        }
      }(),
      o = n(2),
      a = {},
      s = function() {
        function e() {
          i(this, e)
        }
        return r(e, null, [{
          key: "add",
          value: function(e) {
            e.uuid = (0, o.uuid)(), a[e.uuid] = e
          }
        }, {
          key: "find",
          value: function(e) {
            return a.hasOwnProperty(e) ? a[e] : void console.error("Can not find uuid", e)
          }
        }, {
          key: "switch",
          value: function(e, t) {
            t.uuid = e.uuid, a[t.uuid] = t
          }
        }, {
          key: "reset",
          value: function() {
            a = {}
          }
        }]), e
      }();
    t.default = s
  }, function(e, t) {
    "use strict";

    function n(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
          }
        }
        return function(t, n, i) {
          return n && e(t.prototype, n), i && e(t, i), t
        }
      }(),
      r = function() {
        function e(t) {
          n(this, e), this.text = String(t)
        }
        return i(e, [{
          key: "render",
          value: function(e) {
            var t = e ? e.document || exparser : exparser;
            return t.createTextNode(this.text)
          }
        }]), e
      }();
    r.prototype.type = "WxVirtualText", t.default = r
  }, function(e, t, n) {
    "use strict";

    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
          }
        }
        return function(t, n, i) {
          return n && e(t.prototype, n), i && e(t, i), t
        }
      }(),
      o = n(7),
      a = {},
      s = function() {
        function e() {
          i(this, e)
        }
        return r(e, null, [{
          key: "getData",
          value: function() {
            return a
          }
        }, {
          key: "setData",
          value: function(e) {
            for (var t in e) {
              for (var n = (0, o.parsePath)(t), i = a, r = void 0, s = void 0, c = 0; c < n.length; c++) Number(n[c]) === n[c] && Number(n[c]) % 1 === 0 ? Array.isArray(i) || (r[s] = [], i = r[s]) : "[object Object]" !== Object.prototype.toString.call(i) && (r[s] = {}, i = r[s]), s = n[c], r = i, i = i[n[c]];
              r && (r[s] = e[t])
            }
          }
        }]), e
      }();
    t.default = s
  }, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.parsePath = function(e) {
      for (var t = e.length, n = [], i = "", r = 0, o = !1, a = !1, s = 0; s < t; s++) {
        var c = e[s];
        if ("\\" === c) s + 1 < t && ("." === e[s + 1] || "[" === e[s + 1] || "]" === e[s + 1]) ? (i += e[s + 1], s++) : i += "\\";
        else if ("." === c) i && (n.push(i), i = "");
        else if ("[" === c) {
          if (i && (n.push(i), i = ""), 0 === n.length) throw new Error("path can not start with []: " + e);
          a = !0, o = !1
        } else if ("]" === c) {
          if (!o) throw new Error("must have number in []: " + e);
          a = !1, n.push(r), r = 0
        } else if (a) {
          if (c < "0" || c > "9") throw new Error("only number 0-9 could inside []: " + e);
          o = !0, r = 10 * r + c.charCodeAt(0) - 48
        } else i += c
      }
      if (i && n.push(i), 0 === n.length) throw new Error("path can not be empty");
      return n
    }
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.setRem = void 0;
    var i = n(1);
    t.setRem = function() {
      document.addEventListener("DOMContentLoaded", function() {
        var e = window.innerWidth > 0 ? window.innerWidth : screen.width;
        document.documentElement.style.fontSize = e / i.RPX_RATE + "px"
      }, 1e3)
    }
  }, function(e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.appendPatch = t.diffProps = t.diffChildren = t.diffNode = t.diff = void 0;
    var r = n(2),
      o = n(11),
      a = n(1),
      s = n(15),
      c = i(s),
      l = n(16),
      d = i(l),
      u = n(4),
      h = i(u),
      p = (t.diff = function(e, t) {
        h.default.reset();
        var n = {};
        return p(e, t, n, 0), new d.default(e, n)
      }, t.diffNode = function(e, t, n, i) {
        if (e !== t) {
          var o = n[i];
          if (null == t) o = f(o, new c.default(a.PATCH_TYPE.REMOVE, e));
          else if ((0, r.isVirtualNode)(t))
            if ((0, r.isVirtualNode)(e))
              if (e.tagName === t.tagName && e.virtualKey === t.virtualKey) {
                h.default.switch(e, t);
                var s = A(e.props, t.props);
                s && (o = f(o, new c.default(a.PATCH_TYPE.PROPS, e, s))), o = g(e, t, n, o, i)
              } else h.default.add(t), o = f(o, new c.default(a.PATCH_TYPE.VNODE, e, t));
          else h.default.add(t), o = f(o, new c.default(a.PATCH_TYPE.VNODE, e, t));
          else {
            if (!(0, r.isVirtualText)(t)) throw console.log("unknow node type", e, t), {
              message: "unknow node type",
              node: t
            };
            t.text !== e.text && (o = f(o, new c.default(a.PATCH_TYPE.TEXT, e, t)))
          }
          o && (n[i] = o)
        }
      }),
      g = t.diffChildren = function(e, t, n, i, s) {
        for (var l = e.children, d = (0, o.listDiff)(l, t.children, "virtualKey"), u = d.children, g = l.length > u.length ? l.length : u.length, A = 0; A < g; ++A) {
          var v = l[A],
            w = u[A];
          ++s, v ? p(v, w, n, s) : w && (h.default.add(w), i = f(i, new c.default(a.PATCH_TYPE.INSERT, v, w))), (0, r.isVirtualNode)(v) && (s += v.descendants)
        }
        return d.moves && (i = f(i, new c.default(a.PATCH_TYPE.REORDER, e, d.moves))), i
      },
      A = t.diffProps = function(e, t) {
        var n = {};
        for (var i in e) {
          i in t || (n[i] = void 0);
          var o = e[i],
            a = t[i];
          o !== a && (n[i] = a)
        }
        for (var s in t) s in e || (n[s] = t[s]);
        return (0, r.isEmptyObject)(n) ? void 0 : n
      },
      f = t.appendPatch = function(e, t) {
        return e ? (e.push(t), e) : [t]
      }
  }, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = (t.getDomIndex = function(e, t, i) {
        if (i && 0 != i.length) {
          i = i.sort(function(e, t) {
            return e - t
          });
          var r = {};
          return n(e, t, i, r, 0), r
        }
        return {}
      }, t.mapIndexToDom = function e(t, n, r, o, a) {
        if (t) {
          i(r, a, a) && (o[a] = t);
          var s = n.children;
          if (s)
            for (var c = t.childNodes, l = 0; l < s.length; ++l) {
              var d = s[l];
              ++a;
              var u = a + (d.descendants || 0);
              i(r, a, u) && e(c[l], d, r, o, a), a = u
            }
        }
      }),
      i = t.oneOfIndexesInRange = function(e, t, n) {
        for (var i = 0, r = e.length - 1; i <= r;) {
          var o = r + i >> 1,
            a = e[o];
          if (a < t) i = o + 1;
          else {
            if (!(a > n)) return !0;
            r = o - 1
          }
        }
        return !1
      }
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.getItemKey = t.makeKeyAndFreeIndexes = t.listDiff = void 0;
    var i = n(2),
      r = (t.listDiff = function(e, t, n) {
        function a(e, t, n) {
          return e.splice(t, 1), {
            index: t,
            key: n
          }
        }
        var s = r(e, n),
          c = s.keyIndexes;
        if (s.freeIndexes, (0, i.isEmptyObject)(c)) return {
          children: t,
          moves: null
        };
        var l = r(t, n),
          d = l.keyIndexes,
          u = l.freeIndexes;
        if ((0, i.isEmptyObject)(d)) return {
          children: t,
          moves: null
        };
        for (var h = [], p = 0, g = 0, A = 0; A < e.length; ++A) {
          var f = e[A],
            v = o(f, n);
          if (v)
            if (d.hasOwnProperty(v)) {
              var w = d[v];
              h.push(t[w])
            } else ++g, h.push(null);
          else if (p < u.length) {
            var m = u[p];
            h.push(t[m]), ++p
          } else ++g, h.push(null)
        }
        for (var b = u[p] || t.length, x = 0; x < t.length; ++x) {
          var y = t[x];
          o(y, n) ? c.hasOwnProperty(o(y, n)) || h.push(y) : x >= b && h.push(y)
        }
        for (var _ = h.slice(0), k = 0, C = [], E = [], I = 0; I < t.length;) {
          for (var S = t[I], T = o(S, n), B = _[k], N = o(B, n); null === B;) C.push(a(_, k, N)), B = _[k], N = o(B, n);
          N === T ? (++k, ++I) : T ? (N ? d[N] === I + 1 ? E.push({
            key: T,
            index: I
          }) : (C.push(a(_, k, N)), B = _[k], B && o(B, n) === T ? ++k : E.push({
            key: T,
            index: I
          })) : E.push({
            key: T,
            index: I
          }), ++I) : C.push(a(_, k, N))
        }
        for (; k < _.length;) {
          var D = _[k],
            P = o(D, n);
          C.push(a(_, k, P))
        }
        return C.length === g && 0 == E.length ? {
          children: h,
          moves: null
        } : {
          children: h,
          moves: {
            removes: C,
            inserts: E
          }
        }
      }, t.makeKeyAndFreeIndexes = function(e, t) {
        for (var n = {}, i = [], r = 0; r < e.length; ++r) {
          var a = e[r],
            s = o(a, t);
          s ? n[s] = r : i.push(r)
        }
        return {
          keyIndexes: n,
          freeIndexes: i
        }
      }),
      o = t.getItemKey = function(e, t) {
        if (e && t) return (0, i.isString)(t) ? e[t] : t(e)
      }
  }, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.catchError = function(e) {
      return function() {
        for (var t = arguments.length, n = Array(t), i = 0; i < t; i++) n[i] = arguments[i];
        try {
          e.apply(void 0, n)
        } catch (e) {
          console.error(e.stack), Reporter.errorReport({
            key: "exparserScriptError",
            error: e
          })
        }
      }
    }
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.checkScrollBottom = t.getScrollHeight = t.getWindowHeight = void 0;
    var i = n(1),
      r = t.getWindowHeight = function() {
        return "CSS1Compat" === document.compatMode ? document.documentElement.clientHeight : document.body.clientHeight
      },
      o = t.getScrollHeight = function() {
        var e = 0,
          t = 0;
        return document.body && (e = document.body.scrollHeight), document.documentElement && (t = document.documentElement.scrollHeight), Math.max(e, t)
      },
      a = 0;
    t.checkScrollBottom = function() {
      var e = a - window.scrollY < 0;
      return a = window.scrollY, !!(window.scrollY + r() + i.PULL_UP_THREDHOLD >= o() && e)
    }
  }, function(e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }

    function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
          }
        }
        return function(t, n, i) {
          return n && e(t.prototype, n), i && e(t, i), t
        }
      }(),
      a = n(2),
      s = n(3),
      c = n(9),
      l = n(5),
      d = i(l),
      u = n(4),
      h = i(u),
      p = function() {
        function e(t, n, i, o) {
          r(this, e), this.tagName = t || "div", this.props = n || {}, this.children = i || [], o && h.default.add(this), this.virtualKey = this.props["wx-virtual-key"], this.descendants = 0;
          for (var s = 0; s < this.children.length; ++s) {
            var c = this.children[s];
            (0, a.isVirtualNode)(c) ? this.descendants += c.descendants: (0, a.isString)(c) ? this.children[s] = new d.default(c) : (0, a.isVirtualText)(c) || console.log("invalid child", t, n, i, c), ++this.descendants
          }
        }
        return o(e, [{
          key: "render",
          value: function() {
            var e = this,
              t = exparser.createElement(this.tagName);
            (0, s.applyProperties)(t, this.props);
            var n = exparser.Observer.create(function(n) {
              var i = h.default.find(e.uuid);
              i.props.hasOwnProperty([n.propertyName]) && (i.props[n.propertyName] = t[n.propertyName])
            });
            return n.observe(t, {
              properties: !0
            }), this.children.forEach(function(e) {
              var n = e.render();
              t.appendChild(n)
            }), t
          }
        }, {
          key: "diff",
          value: function(e) {
            return (0, c.diff)(this, e)
          }
        }]), e
      }();
    p.prototype.type = "WxVirtualNode", t.default = p
  }, function(e, t, n) {
    "use strict";

    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
          }
        }
        return function(t, n, i) {
          return n && e(t.prototype, n), i && e(t, i), t
        }
      }(),
      o = n(3),
      a = n(1),
      s = function() {
        function e(t, n, r) {
          i(this, e), this.type = Number(t), this.vNode = n, this.patch = r
        }
        return r(e, [{
          key: "apply",
          value: function(t) {
            switch (this.type) {
              case a.PATCH_TYPE.TEXT:
                return e.stringPatch(t, this.patch);
              case a.PATCH_TYPE.VNODE:
                return e.vNodePatch(t, this.patch);
              case a.PATCH_TYPE.PROPS:
                return e.applyProperties(t, this.patch, this.vNode.props);
              case a.PATCH_TYPE.REORDER:
                return e.reorderChildren(t, this.patch);
              case a.PATCH_TYPE.INSERT:
                return e.insertNode(t, this.patch);
              case a.PATCH_TYPE.REMOVE:
                return e.removeNode(t);
              default:
                return t
            }
          }
        }], [{
          key: "stringPatch",
          value: function(e, t) {
            var n = e.parentNode,
              i = t.render();
            return n && i !== e && n.replaceChild(i, e), i
          }
        }, {
          key: "vNodePatch",
          value: function(e, t) {
            var n = e.parentNode,
              i = t.render();
            return n && i !== e && n.replaceChild(i, e), i
          }
        }, {
          key: "applyProperties",
          value: function(e, t, n) {
            return (0, o.applyProperties)(e, t, n), e
          }
        }, {
          key: "reorderChildren",
          value: function(e, t) {
            var n = t.removes,
              i = t.inserts,
              r = e.childNodes,
              o = {};
            return n.forEach(function(t) {
              var n = r[t.index];
              t.key && (o[t.key] = n), e.removeChild(n)
            }), i.forEach(function(t) {
              var n = o[t.key];
              e.insertBefore(n, r[t.index])
            }), e
          }
        }, {
          key: "insertNode",
          value: function(e, t) {
            var n = t.render();
            return e && e.appendChild(n), e
          }
        }, {
          key: "removeNode",
          value: function(e) {
            var t = e.parentNode;
            return t && t.removeChild(e), null
          }
        }]), e
      }();
    t.default = s
  }, function(e, t, n) {
    "use strict";

    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
          }
        }
        return function(t, n, i) {
          return n && e(t.prototype, n), i && e(t, i), t
        }
      }(),
      o = n(10),
      a = function() {
        function e(t, n) {
          i(this, e), this.oldTree = t, this.patches = n, this.patchIndexes = Object.keys(this.patches).map(function(e) {
            return Number(e)
          })
        }
        return r(e, [{
          key: "apply",
          value: function(e) {
            var t = this;
            if (0 === this.patchIndexes.length) return e;
            var n = (0, o.getDomIndex)(e, this.oldTree, this.patchIndexes);
            return this.patchIndexes.forEach(function(e) {
              var i = n[e];
              if (i) {
                var r = t.patches[e];
                r.forEach(function(e) {
                  e.apply(i)
                })
              }
            }), e
          }
        }]), e
      }();
    t.default = a
  }]);
wx.version = {
  updateTime: "2016.10.10 19:57:19",
  info: "",
  version: 30
};
document.addEventListener('touchstart', function (e) {
})
document.addEventListener('touchend', function (e) {
})
document.addEventListener('touchmove', function (e) {
})
document.addEventListener('touchcancel', function (e) {
})
document.addEventListener('focus', function (e) {
})
document.addEventListener('blur', function (e) {
})
