function _toArray(e) {
  return Array.isArray(e) ? e : Array.from(e)
}

function _toConsumableArray(e) {
  if (Array.isArray(e)) {
    for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
    return n
  }
  return Array.from(e)
}! function(e) {
  if (!e.WeixinJSBridge) {
    if (e.navigator && e.navigator.userAgent) {
      var t = e.navigator.userAgent;
      if (t.indexOf("appservice") > -1 || t.indexOf("wechatdevtools") > -1) return
    }
    var n = e.hasOwnProperty("document"),
      i = !1,
      o = {},
      r = 0,
      a = {},
      s = "custom_event_",
      l = {};
    if (n) {
      var t = e.navigator.userAgent,
        c = t.indexOf("Android") != -1;
      i = !c
    }
    var d = function(t, n, r) {
        if (i) e.webkit.messageHandlers.invokeHandler.postMessage({
          event: t,
          paramsString: n,
          callbackId: r
        });
        else {
          var a = WeixinJSCore.invokeHandler(t, n, r);
          if ("undefined" != typeof a && "function" == typeof o[r] && "" !== a) {
            try {
              a = JSON.parse(a)
            } catch (e) {
              a = {}
            }
            o[r](a), delete o[r]
          }
        }
      },
      u = function(t, n, o) {
        i ? e.webkit.messageHandlers.publishHandler.postMessage({
          event: t,
          paramsString: n,
          webviewIds: o
        }) : WeixinJSCore.publishHandler(t, n, o)
      },
      h = function(e, t, n) {
        var i = JSON.stringify(t || {}),
          a = ++r;
        o[a] = n, d(e, i, a)
      },
      p = function(e, t) {
        var n = o[e];
        "function" == typeof n && n(t), delete o[e]
      },
      g = function(e, t) {
        a[e] = t
      },
      f = function(e, t, n) {
        n = n || [], n = JSON.stringify(n);
        var i = s + e,
          o = JSON.stringify(t);
        u(i, o, n)
      },
      A = function(e, t) {
        l[s + e] = t
      },
      v = function(e, t, n, i) {
        var o;
        o = e.indexOf(s) != -1 ? l[e] : a[e], "function" == typeof o && o(t, n, i)
      };
    e.WeixinJSBridge = {
      invoke: h,
      invokeCallbackHandler: p,
      on: g,
      publish: f,
      subscribe: A,
      subscribeHandler: v
    }
  }
}(this);
var Reporter = function(e) {
    function t(i) {
      if (n[i]) return n[i].exports;
      var o = n[i] = {
        exports: {},
        id: i,
        loaded: !1
      };
      return e[i].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
  }([function(e, t, n) {
    function i(e) {
      "undefined" != typeof WeixinJSBridge ? e() : document.addEventListener("WeixinJSBridgeReady", e, !1)
    }

    function o() {
      var e = arguments;
      i(function() {
        WeixinJSBridge.invoke.apply(WeixinJSBridge, e)
      })
    }

    function r() {
      !g || g.length <= 0 || (o("reportKeyValue", {
        dataArray: g
      }), g = [])
    }

    function a() {
      !f || f.length <= 0 || (o("reportIDKey", {
        dataArray: f
      }), f = [])
    }

    function s() {
      !A || A.length <= 0 || (o("systemLog", {
        dataArray: A
      }), A = [])
    }

    function l(e) {
      return function() {
        try {
          return e.apply(e, arguments)
        } catch (e) {
          throw errorReport(e), e
        }
      }
    }

    function l(e) {
      return function() {
        try {
          return e.apply(e, arguments)
        } catch (e) {
          console.error("reporter error:" + e.stack)
        }
      }
    }

    function c(e) {
      S.__defineGetter__(e, function() {
        return l(E[e])
      })
    }
    var d = n(1),
      u = 1,
      h = 20,
      p = 50,
      g = [],
      f = [],
      A = [],
      v = "",
      b = 50,
      m = 50,
      w = 20,
      y = 50,
      x = 0,
      _ = 0,
      C = 0,
      k = 0;
    o("getPublicLibVersion", {}, function(e) {
      try {
        v = e.version.appVersion + " " + e.version.libVersion
      } catch (e) {}
    });
    var E = {
        reportKeyValue: function(e) {
          var t = e.key,
            n = e.value;
          d.KeyValueType[t] && (Date.now() - x < m || (x = Date.now(), g.push({
            key: d.KeyValueType[t],
            value: n
          }), g.length >= h && r()))
        },
        reportIDKey: function(e) {
          var t = e.id,
            n = e.key;
          d.IDKeyType[n] && (Date.now() - _ < w || (_ = Date.now(), f.push({
            id: t ? t : "356",
            key: d.IDKeyType[n],
            value: 1
          }), f.length >= u && a()))
        },
        errorReport: function(e) {
          var t = e.key,
            n = e.error,
            i = e.extend;
          if (d.ErrorType[t]) {
            E.reportIDKey({
              key: t
            });
            var o = n.message;
            o = i ? o + " " + i : o, E.reportKeyValue({
              key: "Error",
              value: d.ErrorType[t] + "," + n.name + "," + encodeURIComponent(o) + "," + encodeURIComponent(n.stack) + "," + encodeURIComponent(v)
            }), a(), r(), s()
          }
        },
        log: function(e) {
          e && "string" == typeof e && (Date.now() - C < y || (C = Date.now(), A.push(e + ""), A.length >= p && s()))
        },
        submit: function() {
          Date.now() - k < b || (k = Date.now(), a(), r(), s())
        }
      },
      S = {};
    for (var I in E) c(I);
    "undefined" != typeof window && (window.onbeforeunload = function() {
      E.submit()
    }), e.exports = S
  }, function(e, t) {
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
      var o = n[i] = {
        exports: {},
        id: i,
        loaded: !1
      };
      return e[i].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
  }({
    0: function(e, t, n) {
      function i(e) {
        return c ? void(l[e] = u[e]) : void l.__defineGetter__(e, function() {
          return function() {
            try {
              return u[e].apply(this, arguments)
            } catch (e) {
              o(e)
            }
          }
        })
      }

      function o(e) {
        if ("[object Error]" === Object.prototype.toString.apply(e)) {
          if ("WebviewSdkKnownError" == e.type) throw e;
          console.error(e.stack), Reporter.errorReport({
            key: "webviewSDKScriptError",
            error: e
          })
        }
      }
      var r = n(13),
        a = n(14);
      n(15);
      var s = !1,
        l = {},
        c = "devtools" === (0, a.getPlatform)(),
        d = function(e, t) {
          (0, r.publish)("INVOKE_METHOD", {
            name: e,
            args: t
          })
        },
        u = {
          invoke: r.invoke,
          on: r.on,
          reportIDKey: function(e, t) {
            console.warn("reportIDKey has been removed wx")
          },
          reportKeyValue: function(e, t) {
            console.warn("reportKeyValue has been removed from wx")
          },
          initReady: function() {
            (0, r.invokeMethod)("initReady")
          },
          redirectTo: function(e) {
            d("redirectTo", e)
          },
          navigateTo: function(e) {
            d("navigateTo", e)
          },
          showKeyboard: function(e) {
            (0, r.invokeMethod)("showKeyboard", e)
          },
          showDatePickerView: function(e) {
            (0, r.invokeMethod)("showDatePickerView", e)
          },
          hideKeyboard: function(e) {
            (0, r.invokeMethod)("hideKeyboard", e)
          },
          insertMap: function(e) {
            (0, r.invokeMethod)("insertMap", e)
          },
          removeMap: function(e) {
            (0, r.invokeMethod)("removeMap", e)
          },
          updateMapCovers: function(e) {
            (0, r.invokeMethod)("updateMapCovers", e)
          },
          getRealRoute: a.getRealRoute,
          getCurrentRoute: function(e) {
            (0, r.invokeMethod)("getCurrentRoute", e, {
              beforeSuccess: function(e) {
                e.route = e.route.split("?")[0]
              }
            })
          },
          getLocalImgData: function(e) {
            "string" == typeof e.path ? u.getCurrentRoute({
              success: function(t) {
                var n = t.route;
                e.path = (0, a.getRealRoute)(n || "index.html", e.path), (0, r.invokeMethod)("getLocalImgData", e)
              }
            }) : (0, r.invokeMethod)("getLocalImgData", e)
          },
          insertVideoPlayer: function(e) {
            (0, r.invokeMethod)("insertVideoPlayer", e)
          },
          removeVideoPlayer: function(e) {
            (0, r.invokeMethod)("removeVideoPlayer", e)
          },
          onAppDataChange: function(e) {
            (0, r.subscribe)("pageInitData", function(t) {
              s === !1 && (s = !0, e(t))
            }), (0, r.publish)("pageReady", {}), (0, r.subscribe)("appDataChange", function(t) {
              setTimeout(function() {
                e(t)
              }, 0)
            })
          },
          publishPageEvent: function(e, t) {
            (0, r.publish)("PAGE_EVENT", {
              eventName: e,
              data: t
            })
          },
          animationToStyle: a.animationToStyle
        };
      for (var h in u) i(h);
      e.exports = l
    },
    13: function(e, t) {
      function n(e) {
        "undefined" != typeof WeixinJSBridge ? e() : document.addEventListener("WeixinJSBridgeReady", e, !1)
      }

      function i() {
        var e = arguments;
        n(function() {
          WeixinJSBridge.invoke.apply(WeixinJSBridge, e)
        })
      }

      function o() {
        var e = arguments;
        n(function() {
          WeixinJSBridge.on.apply(WeixinJSBridge, e)
        })
      }

      function r() {
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
            o = e.options,
            r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            a = o && o.timestamp || 0,
            s = Date.now();
          if ("function" == typeof t && t(i, n), s - a > 20) {
            var l = JSON.stringify(i || {}).length;
            Reporter.reportKeyValue({
              key: "Speed",
              value: "2," + a + "," + r.nativeTime + "," + r.nativeTime + "," + s + "," + l
            })
          }
        }, n(function() {
          WeixinJSBridge.subscribe.apply(WeixinJSBridge, e)
        })
      }

      function s(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          o = {};
        for (var r in t) "function" == typeof t[r] && (o[r] = t[r], delete t[r]);
        i(e, t, function(t) {
          t.errMsg = t.errMsg || e + ":ok";
          var i = 0 === t.errMsg.indexOf(e + ":ok"),
            r = 0 === t.errMsg.indexOf(e + ":cancel"),
            a = 0 === t.errMsg.indexOf(e + ":fail");
          "function" == typeof n.beforeAll && n.beforeAll(t), i ? ("function" == typeof n.beforeSuccess && n.beforeSuccess(t), "function" == typeof o.success && o.success(t), "function" == typeof n.afterSuccess && n.afterSuccess(t)) : r ? ("function" == typeof o.cancel && o.cancel(t), "function" == typeof n.cancel && n.cancel(t)) : a && ("function" == typeof o.fail && o.fail(t), "function" == typeof n.fail && n.fail(t)), "function" == typeof o.complete && o.complete(t), "function" == typeof n.complete && n.complete(t)
        })
      }

      function l(e, t) {
        o(e, t)
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.invoke = i, t.on = o, t.publish = r, t.subscribe = a, t.invokeMethod = s, t.onMethod = l
    },
    14: function(e, t) {
      function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }

      function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
      }

      function o(e, t) {
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

      function r(e, t) {
        if (0 === t.indexOf("/")) return t.substr(1);
        if (0 === t.indexOf("./")) return r(e, t.substr(2));
        var n, i, o = t.split("/");
        for (n = 0, i = o.length; n < i && ".." === o[n]; n++);
        o.splice(0, n);
        var t = o.join("/"),
          a = e.length > 0 ? e.split("/") : [];
        a.splice(a.length - n - 1, n + 1);
        var s = a.concat(o),
          l = s.join("/");
        return l
      }

      function a(e) {
        var t = e.animates,
          n = e.option,
          i = void 0 === n ? {} : n,
          o = i.transformOrigin,
          r = i.transition;
        if ("undefined" == typeof r || "undefined" == typeof t) return {
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
                return n = n.map(c), "rotate(" + n[0] + ")";
              case "rotate3d":
                return n[3] = c(n[3]), "rotate3d(" + n.join(",") + ")";
              case "rotateX":
                return n = n.map(c), "rotateX(" + n[0] + ")";
              case "rotateY":
                return n = n.map(c), "rotateY(" + n[0] + ")";
              case "rotateZ":
                return n = n.map(c), "rotateZ(" + n[0] + ")";
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
                return n = n.map(l), "translate(" + n.join(",") + ")";
              case "translate3d":
                return n = n.map(l), "translate3d(" + n.join(",") + ")";
              case "translateX":
                return n = n.map(l), "translateX(" + n[0] + ")";
              case "translateY":
                return n = n.map(l), "translateY(" + n[0] + ")";
              case "translateZ":
                return n = n.map(l), "translateZ(" + n[0] + ")";
              case "skew":
                return n = n.map(c), "skew(" + n.join(",") + ")";
              case "skewX":
                return n = n.map(c), "skewX(" + n[0] + ")";
              case "skewY":
                return n = n.map(c), "skewY(" + n[0] + ")";
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
          transformOrigin: o,
          transform: a,
          transition: r.duration + "ms " + r.timingFunction + " " + r.delay + "ms"
        }
      }

      function s() {
        return window.navigator ? window.navigator.userAgent.indexOf("wechatdevtools") > -1 ? "devtools" : "android" : "ios"
      }

      function l(e) {
        return "number" == typeof e ? e + "px" : e
      }

      function c(e) {
        return e + "deg"
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getRealRoute = r, t.animationToStyle = a, t.getPlatform = s;
      t.WebviewSdkKnownError = function(e) {
        function t(e) {
          n(this, t);
          var o = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "Webview-SDK:" + e));
          return o.type = "WebviewSdkKnownError", o
        }
        return o(t, e), t
      }(Error)
    },
    15: function(e, t, n) {
      function i(e) {
        "loading" !== document.readyState ? e() : document.addEventListener("DOMContentLoaded", e)
      }
      var o = n(13),
        r = !1,
        a = ["log", "warn", "error", "info", "debug"];
      a.forEach(function(e) {
        (0, o.subscribe)(e, function(t) {
          var n = t.log;
          console[e].apply(console, n)
        })
      }), (0, o.subscribe)("initLogs", function(e) {
        var t = e.logs;
        r === !1 && (r = !0, t.forEach(function(e) {
          var t = e.method,
            n = e.log;
          console[t].apply(console, n)
        }), r = !0)
      }), i(function() {
        setTimeout(function() {
          (0, o.publish)("DOMContentLoaded", {})
        }, 100)
      })
    }
  }),
  exparser = function(e) {
    function t(i) {
      if (n[i]) return n[i].exports;
      var o = n[i] = {
        exports: {},
        id: i,
        loaded: !1
      };
      return e[i].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
  }([function(e, t, n) {
    var i = n(1),
      o = n(2),
      r = n(3),
      a = n(4),
      s = n(6),
      l = n(12),
      c = n(11),
      d = n(5);
    t.Behavior = r, t.Element = a, t.TextNode = l, t.VirtualNode = c, t.Component = s, t.Observer = d, t.registerBehavior = r.create, t.registerElement = s.register, t.createElement = s.create, t.createTextNode = l.create, t.createVirtualNode = c.create, t.appendChild = a.appendChild, t.insertBefore = a.insertBefore, t.removeChild = a.removeChild, t.replaceChild = a.replaceChild, t.addListenerToElement = o.addListenerToElement, t.removeListenerFromElement = o.removeListenerFromElement, t.triggerEvent = o.triggerEvent, t.addGlobalErrorListener = i.addGlobalErrorListener, t.removeGlobalErrorListener = i.removeGlobalErrorListener;
    var u = {
      renderingMode: "full",
      keepWhiteSpace: !1,
      parseTextContent: !0,
      throwGlobalError: !1
    };
    s._setGlobalOptionsGetter(function() {
      return t.globalOptions
    }), i._setGlobalOptionsGetter(function() {
      return t.globalOptions
    }), t.globalOptions = u
  }, function(e, t) {
    var n = function() {};
    n.prototype = Object.create(Object.prototype, {
      constructor: {
        value: n,
        writable: !0,
        configurable: !0
      }
    });
    var i = null;
    n._setGlobalOptionsGetter = function(e) {
      i = e
    }, n.create = function(e) {
      var t = Object.create(n.prototype);
      return t.empty = !0, t._type = e, t._arr = [], t._index = 0, t
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
      for (var n = this._arr, i = !1, o = 0; o < n.length; o++) {
        var a = r(this._type, n[o].func, e, t);
        a === !1 && (i = !0)
      }
      if (i) return !1
    };
    var o = function(e, t) {
        if (!t.type || a.call(null, [e, t]) !== !1) {
          if (console.error(t.message), i().throwGlobalError) throw e;
          console.error(e.stack)
        }
      },
      r = n.safeCallback = function(e, t, n, i) {
        try {
          return t.apply(n, i)
        } catch (a) {
          var r = "Exparser " + (e || "Error Listener") + " Error @ ";
          n && (r += n.is), r += "#" + (t.name || "(anonymous)"), o(a, {
            message: r,
            type: e,
            element: n,
            method: t,
            args: i
          })
        }
      },
      a = n.create();
    n.addGlobalErrorListener = function(e) {
      return a.add(e)
    }, n.removeGlobalErrorListener = function(e) {
      return a.remove(e)
    }, e.exports = n
  }, function(e, t, n) {
    var i = n(1),
      o = Date.now(),
      r = function(e, t, n, i) {
        i = i || {};
        var r = i.originalEvent,
          a = !i.bubbles,
          s = !i.composed,
          l = i.extraFields || {},
          c = !1,
          d = Date.now() - o,
          u = e.__wxElement || e;
        e === u.shadowRoot && (u = e);
        var h = function() {
            r && r.preventDefault()
          },
          p = function() {
            c = !0
          },
          g = {
            target: u,
            currentTarget: u,
            type: t,
            timeStamp: d,
            detail: n,
            preventDefault: h,
            stopPropagation: p
          };
        for (var f in l) g[f] = l[f];
        for (var A = function(e, t) {
            g.currentTarget = t;
            var n = e.call(t, [g]);
            n === !1 && (h(), c = !0)
          }, v = u.parentNode, b = u; b && (v === b && (v = b.parentNode), b.__wxEvents && b.__wxEvents[t] && A(b.__wxEvents[t], b), !a && !c);)
          if (b.__host) {
            if (s) break;
            v && v.__domElement || (v = b.__host, g.target = v), b = b.__host
          } else {
            var m = !0;
            (b.__domElement || b.__virtual) && (m = !1), b = m || s ? b.parentNode : b.__slotParent
          }
      };
    t.addListenerToElement = function(e, t, n) {
      var o = e.__wxElement || e;
      return e === o.shadowRoot && (o = e), o.__wxEvents || (o.__wxEvents = Object.create(null)), o.__wxEvents[t] || (o.__wxEvents[t] = i.create("Event Listener")), o.__wxEvents[t].add(n)
    }, t.removeListenerFromElement = function(e, t, n) {
      var i = e.__wxElement || e;
      e === i.shadowRoot && (i = e), i.__wxEvents && i.__wxEvents[t] && i.__wxEvents[t].remove(n)
    }, t.triggerEvent = r
  }, function(e, t, n) {
    var i = n(1),
      o = function() {};
    o.prototype = Object.create(Object.prototype, {
      constructor: {
        value: o,
        writable: !0,
        configurable: !0
      }
    });
    var r = ["created", "attached", "detached"],
      a = 1;
    o.create = function(e) {
      var t = String(a++),
        n = o.list[e.is || ""] = Object.create(o.prototype, {
          is: {
            value: e.is || ""
          },
          _id: {
            value: t
          }
        });
      n.template = e.template, n.properties = Object.create(null), n.methods = Object.create(null), n.listeners = Object.create(null);
      for (var i = n.ancestors = [], s = "", l = 0; l < (e.behaviors || []).length; l++) {
        var c = e.behaviors[l];
        "string" == typeof c && (c = o.list[c]);
        for (s in c.properties) n.properties[s] = c.properties[s];
        for (s in c.methods) n.methods[s] = c.methods[s];
        for (var d = 0; d < c.ancestors.length; d++) i.indexOf(c.ancestors[d]) < 0 && i.push(c.ancestors[d])
      }
      for (s in e.properties) n.properties[s] = e.properties[s];
      for (s in e.listeners) n.listeners[s] = e.listeners[s];
      for (s in e) "function" == typeof e[s] && (r.indexOf(s) < 0 ? n.methods[s] = e[s] : n[s] = e[s]);
      return i.push(n), n
    }, o.list = Object.create(null), o.prototype.hasBehavior = function(e) {
      for (var t = 0; t < this.ancestors.length; t++)
        if (this.ancestors[t].is === e) return !0;
      return !1
    }, o.prototype.getAllListeners = function() {
      for (var e = Object.create(null), t = this.ancestors, n = 0; n < t.length; n++) {
        var i = this.ancestors[n];
        for (var o in i.listeners) e[o] ? e[o].push(i.listeners[o]) : e[o] = [i.listeners[o]]
      }
      return e
    }, o.prototype.getAllLifeTimeFuncs = function() {
      var e = Object.create(null),
        t = this.ancestors;
      return r.forEach(function(n) {
        for (var o = e[n] = i.create("Lifetime Method"), r = 0; r < t.length; r++) {
          var a = t[r];
          a[n] && o.add(a[n])
        }
      }), e
    }, e.exports = o
  }, function(e, t, n) {
    var i = n(2),
      o = n(5),
      r = function() {};
    r.prototype = Object.create(Object.prototype, {
      constructor: {
        value: r,
        writable: !0,
        configurable: !0
      }
    });
    var a = null;
    r._setCompnentSystem = function(e) {
      a = e
    }, r.initialize = function(e) {
      e.__attached = !1, e.parentNode = null, e.childNodes = [], e.__slotParent = null, e.__slotChildren = e.childNodes, e.__subtreeObserversCount = 0
    };
    var s = function(e) {
        if (!e.parentNode || e.parentNode.__attached) {
          var t = function(e) {
            e.__attached = !0, e.shadowRoot instanceof r && t(e.shadowRoot);
            var n = e.childNodes;
            if (n)
              for (var i = 0; i < n.length; i++) t(n[i])
          };
          t(e);
          var n = function(e) {
            e.__lifeTimeFuncs && a._callLifeTimeFuncs(e, "attached"), e.shadowRoot instanceof r && n(e.shadowRoot);
            var t = e.childNodes;
            if (t)
              for (var i = 0; i < t.length; i++) n(t[i])
          };
          n(e)
        }
      },
      l = function(e) {
        if (e.__attached) {
          var t = function(e) {
            e.__attached = !1, e.shadowRoot instanceof r && t(e.shadowRoot);
            var n = e.childNodes;
            if (n)
              for (var i = 0; i < n.length; i++) t(n[i])
          };
          t(e);
          var n = function(e) {
            e.__lifeTimeFuncs && a._callLifeTimeFuncs(e, "detached"), e.shadowRoot instanceof r && n(e.shadowRoot);
            var t = e.childNodes;
            if (t)
              for (var i = 0; i < t.length; i++) n(t[i])
          };
          n(e)
        }
      },
      c = function(e, t, n) {
        if (e.__childObservers && !e.__childObservers.empty || e.__subtreeObserversCount) {
          var i = null;
          i = "add" === t ? {
            type: "childList",
            target: e,
            addedNodes: [n]
          } : {
            type: "childList",
            target: e,
            removedNodes: [n]
          }, o._callObservers(e, "__childObservers", i)
        }
      },
      d = function(e, t, n, i) {
        var o = e;
        if (o instanceof r) {
          for (; o.__virtual;) {
            var a = o.__slotParent;
            if (!a) return;
            if (t && !n) {
              var s = a.__slotChildren.indexOf(o);
              n = a.__slotChildren[s + 1]
            }
            o = a
          }
          o instanceof r && (o = o.__domElement)
        }
        var l = null;
        if (t)
          if (t.__virtual) {
            var c = document.createDocumentFragment(),
              d = function(e) {
                for (var t = 0; t < e.__slotChildren.length; t++) {
                  var n = e.__slotChildren[t];
                  n.__virtual ? d(n) : c.appendChild(n.__domElement)
                }
              };
            d(t), l = c
          } else l = t.__domElement;
        var u = null;
        if (n)
          if (n.__virtual) {
            var h = e,
              p = 0;
            if (i) {
              var g = function(e) {
                for (var t = 0; t < e.__slotChildren.length; t++) {
                  var n = e.__slotChildren[t];
                  n.__virtual ? g(n) : o.removeChild(n.__domElement)
                }
              };
              g(n), i = !1, p = e.__slotChildren.indexOf(n) + 1
            } else h = n.__slotParent, p = h.__slotChildren.indexOf(n);
            if (t) {
              var f = function(e, t) {
                for (; t < e.__slotChildren.length; t++) {
                  var n = e.__slotChildren[t];
                  if (!n.__virtual) return n;
                  var i = f(n, 0);
                  if (i) return i
                }
              };
              n = null;
              for (var A = h; n = f(A, p), !n && A.__virtual; A = A.__slotParent) p = A.__slotParent.__slotChildren.indexOf(A) + 1;
              n && (u = n.__domElement)
            }
          } else u = n.__domElement;
        i ? l ? o.replaceChild(l, u) : o.removeChild(u) : l && (u ? o.insertBefore(l, u) : o.appendChild(l))
      },
      u = function(e, t, n, i) {
        var r = -1;
        if (n && (r = e.childNodes.indexOf(n), r < 0)) return !1;
        i && (t === n ? i = !1 : (e.__subtreeObserversCount && o._updateSubtreeCaches(n, -e.__subtreeObserversCount), n.parentNode = null, n.__slotParent = null));
        var a = null,
          u = e;
        if (e.__slots && (u = e.__slots[""]), t) {
          a = t.parentNode, t.parentNode = e, t.__slotParent = u;
          var h = e.__subtreeObserversCount;
          if (a) {
            var p = a.childNodes.indexOf(t);
            a.childNodes.splice(p, 1), a === e && p < r && r--, h -= a.__subtreeObserversCount
          }
          h && o._updateSubtreeCaches(t, h)
        }
        return d(u, t, n, i), r === -1 && (r = e.childNodes.length), t ? e.childNodes.splice(r, i ? 1 : 0, t) : e.childNodes.splice(r, i ? 1 : 0), i && (l(n), c(e, "remove", n)), t && (a && (l(t), c(a, "remove", t)), s(t), c(e, "add", t)), !0
      },
      h = function(e, t, n, i) {
        var o = i ? n : t,
          r = u(e, t, n, i);
        return r ? o : null
      };
    r._attachShadowRoot = function(e, t) {
      d(e, t, null, !1)
    }, r.appendChild = function(e, t) {
      return h(e, t, null, !1)
    }, r.insertBefore = function(e, t, n) {
      return h(e, t, n, !1)
    }, r.removeChild = function(e, t) {
      return h(e, null, t, !0)
    }, r.replaceChild = function(e, t, n) {
      return h(e, t, n, !0)
    }, r.prototype.appendChild = function(e) {
      return h(this, e, null, !1)
    }, r.prototype.insertBefore = function(e, t) {
      return h(this, e, t, !1)
    }, r.prototype.removeChild = function(e) {
      return h(this, null, e, !0)
    }, r.prototype.replaceChild = function(e, t) {
      return h(this, e, t, !0)
    }, r.prototype.triggerEvent = function(e, t, n) {
      i.triggerEvent(this, e, t, n)
    }, r.prototype.addListener = function(e, t) {
      i.addListenerToElement(this, e, t)
    }, r.prototype.removeListener = function(e, t) {
      i.removeListenerFromElement(this, e, t)
    }, r.replaceDocumentElement = function(e, t) {
      e.__attached || (t.parentNode.replaceChild(e.__domElement, t), s(e))
    }, r.prototype.hasBehavior = function(e) {
      return !!this.__behavior && this.__behavior.hasBehavior(e)
    }, e.exports = r
  }, function(e, t, n) {
    var i = n(1),
      o = function() {};
    o.prototype = Object.create(Object.prototype, {
      constructor: {
        value: o,
        writable: !0,
        configurable: !0
      }
    }), o.create = function(e) {
      var t = Object.create(o.prototype);
      return t._cb = e, t._noSubtreeCb = function(t) {
        t.target === this && e.call(this, t)
      }, t._binded = [], t
    }, o.prototype.observe = function(e, t) {
      t = t || {};
      var n = 0,
        o = t.subtree ? this._cb : this._noSubtreeCb;
      t.properties && (e.__propObservers || (e.__propObservers = i.create("Observer Callback")), this._binded.push({
        funcArr: e.__propObservers,
        id: e.__propObservers.add(o),
        subtree: t.subtree ? e : null
      }), n++), t.childList && (e.__childObservers || (e.__childObservers = i.create("Observer Callback")), this._binded.push({
        funcArr: e.__childObservers,
        id: e.__childObservers.add(o),
        subtree: t.subtree ? e : null
      }), n++), t.characterData && (e.__textObservers || (e.__textObservers = i.create("Observer Callback")), this._binded.push({
        funcArr: e.__textObservers,
        id: e.__textObservers.add(o),
        subtree: t.subtree ? e : null
      }), n++), t.subtree && r(e, n)
    }, o.prototype.disconnect = function() {
      for (var e = this._binded, t = 0; t < e.length; t++) {
        var n = e[t];
        n.funcArr.remove(n.id), n.subtree && r(n.subtree, -1)
      }
      this._binded = []
    };
    var r = o._updateSubtreeCaches = function(e, t) {
      e.__subtreeObserversCount += t;
      var n = e.childNodes;
      if (n)
        for (var i = 0; i < n.length; i++) r(n[i], t)
    };
    o._callObservers = function(e, t, n) {
      do e[t] && e[t].call(e, [n]), e = e.parentNode; while (e && e.__subtreeObserversCount)
    }, e.exports = o
  }, function(e, t, n) {
    function i(e) {
      return e.replace(/[A-Z]/g, function(e) {
        return "-" + e.toLowerCase()
      })
    }
    var o = n(1),
      r = n(2),
      a = n(7),
      s = n(3),
      l = n(4),
      c = n(5),
      d = r.addListenerToElement,
      u = function() {};
    u.prototype = Object.create(Object.prototype, {
      constructor: {
        value: u,
        writable: !0,
        configurable: !0
      }
    }), u.list = Object.create(null), a._setCompnentSystem(u), l._setCompnentSystem(u), u._setGlobalOptionsGetter = function(e) {
      a._setGlobalOptionsGetter(e)
    };
    var h = function(e, t, n, o) {
      var r = i(n);
      t.type === Boolean ? o ? e.__domElement.setAttribute(r, "") : e.__domElement.removeAttribute(r) : t.type === Object || t.type === Array ? e.__domElement.setAttribute(r, JSON.stringify(o)) : e.__domElement.setAttribute(r, o)
    };
    u.register = function(e) {
      var t = e.options || {},
        n = {
          is: {
            value: e.is || ""
          }
        },
        i = s.create(e),
        r = Object.create(null);
      Object.keys(i.properties).forEach(function(e) {
        var t = i.properties[e];
        t !== String && t !== Number && t !== Boolean && t !== Object && t !== Array || (t = {
          type: t
        }), void 0 === t.value && (t.type === String ? t.value = "" : t.type === Number ? t.value = 0 : t.type === Boolean ? t.value = !1 : t.type === Array ? t.value = [] : t.value = null), r[e] = {
          type: t.type,
          value: t.value,
          coerce: i.methods[t.coerce],
          observer: i.methods[t.observer],
          public: !!t.public
        }, n[e] = {
          enumerable: !0,
          get: function() {
            var t = this.__propData[e];
            return void 0 === t ? r[e].value : t
          },
          set: function(t) {
            var n = r[e];
            n.type === String ? t = String(t) : n.type === Number ? t = Number(t) : n.type === Boolean ? t = !!t : n.type === Array ? t instanceof Array || (t = [t]) : "object" != typeof t && (t = null);
            var i = this.__propData[e];
            if (n.coerce) {
              var a = o.safeCallback("Property Filter", n.coerce, this, [t, i]);
              void 0 !== a && (t = a)
            }
            this.__propData[e] = t, n.public && h(this, n, e, t), this.__templateInstance.updateValues(this, this.__propData, e), n.observer && o.safeCallback("Property Observer", n.observer, this, [t, i]), n.public && (this.__propObservers && !this.__propObservers.empty || this.__subtreeObserversCount) && c._callObservers(this, "__propObservers", {
              type: "properties",
              target: this,
              propertyName: e
            })
          }
        }
      });
      var d = Object.create(l.prototype, n);
      d.__behavior = i;
      for (var p in i.methods) d[p] = i.methods[p];
      d.__lifeTimeFuncs = i.getAllLifeTimeFuncs();
      var g = Object.create(null),
        f = {};
      for (var A in r) f[A] = r[A].value, g[A] = !!r[A].public;
      var v = document.getElementById(i.is);
      !i.template && v && "TEMPLATE" === v.tagName || (v = document.createElement("template"), v.innerHTML = i.template || "");
      var b = a.create(v, f, i.methods, t);
      d.__propPublic = g;
      var m = i.getAllListeners(),
        w = Object.create(null);
      for (var y in m) {
        for (var x = m[y], _ = [], C = 0; C < x.length; C++) _.push(i.methods[x[C]]);
        w[y] = _
      }
      u.list[i.is] = {
        proto: d,
        template: b,
        defaultValuesJSON: JSON.stringify(f),
        innerEvents: w
      }
    }, u.create = function(e) {
      e = e ? e.toLowerCase() : "virtual";
      var t = document.createElement(e),
        n = u.list[e] || u.list[""],
        i = Object.create(n.proto);
      l.initialize(i), i.__domElement = t, t.__wxElement = i, i.__propData = JSON.parse(n.defaultValuesJSON);
      var o = i.__templateInstance = n.template.createInstance(i);
      o.shadowRoot instanceof l ? (l._attachShadowRoot(i, o.shadowRoot), i.shadowRoot = o.shadowRoot, i.__slotChildren = [o.shadowRoot], o.shadowRoot.__slotParent = i) : (i.__domElement.appendChild(o.shadowRoot), i.shadowRoot = t, i.__slotChildren = t.childNodes), i.shadowRoot.__host = i, i.$ = o.idMap, i.$$ = t, o.slots[""] || (o.slots[""] = t), i.__slots = o.slots, i.__slots[""].__slotChildren = i.childNodes;
      var r = n.innerEvents;
      for (var a in r) {
        var s = a.split(".", 2),
          c = s[s.length - 1],
          h = i,
          p = !0;
        if (2 === s.length && "" !== s[0] && (p = !1, "this" !== s[0] && (h = i.$[s[0]])), h)
          for (var g = r[a], f = 0; f < g.length; f++) p ? d(h.shadowRoot, c, g[f].bind(i)) : d(h, c, g[f].bind(i))
      }
      return u._callLifeTimeFuncs(i, "created"), i
    }, u.hasProperty = function(e, t) {
      return void 0 !== e.__propPublic[t]
    }, u.hasPublicProperty = function(e, t) {
      return e.__propPublic[t] === !0
    }, u._callLifeTimeFuncs = function(e, t) {
      var n = e.__lifeTimeFuncs[t];
      n.call(e, [])
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

    function o(e) {
      for (var t = Object.create(null), n = 0; n < e.length; n++) t[e[n].name] = e[n].value;
      return t
    }

    function r(e, t, n, i, o) {
      for (var a = null, s = 0, l = null, p = 0; p < e.length; p++) {
        var g = e[p];
        if (void 0 === g.name) a = h.create(g.text), g.exp && o.add(g.exp, a.__domElement, "textContent", y), c.appendChild(t, a);
        else {
          var f = g.attrs;
          if ("virtual" === g.name) a = u.create(g.virtual);
          else if (g.custom)
            for (a = A.create(g.name), s = 0; s < f.length; s++) l = f[s], l.updater ? l.updater(a, l.name, l.value) : a.__behavior.properties[l.name].type === Boolean ? a[l.name] = !0 : a[l.name] = l.value, l.exp && o.add(l.exp, a, l.name, l.updater);
          else
            for (a = d.wrap(document.importNode(g.prerendered, !1)), s = 0; s < f.length; s++) l = f[s], o.add(l.exp, a.__domElement, l.name, l.updater);
          c.appendChild(t, a), g.id && (n[g.id] = a), void 0 !== g.slot && (i[g.slot] = a), r(g.children, a, n, i, o)
        }
      }
    }

    function a(e, t, n, i, o) {
      for (var r = null, s = 0, l = null, c = 0; c < e.length; c++) {
        var d = e[c];
        if (void 0 === d.name) r = document.createTextNode(d.text), d.exp && o.add(d.exp, r, "textContent", y), t.appendChild(r);
        else {
          var u = d.attrs;
          for (r = document.importNode(d.prerendered, !1), s = 0; s < u.length; s++) l = u[s], o.add(l.exp, r, l.name, l.updater);
          t.appendChild(r), d.id && (n[d.id] = r), void 0 !== d.slot && (i[d.slot] = r), a(d.children, r, n, i, o)
        }
      }
    }
    var s = n(8),
      l = n(9),
      c = n(4),
      d = n(10),
      u = n(11),
      h = n(12),
      p = String.fromCharCode(36),
      g = function() {};
    g.prototype = Object.create(Object.prototype, {
      constructor: {
        value: g,
        writable: !0,
        configurable: !0
      }
    });
    var f = function() {};
    f.prototype = Object.create(Object.prototype, {
      constructor: {
        value: f,
        writable: !0,
        configurable: !0
      }
    });
    var A = null;
    g._setCompnentSystem = function(e) {
      A = e
    };
    var v = function() {
      return {
        renderingMode: "native",
        keepWhiteSpace: !1,
        parseTextContent: !1
      }
    };
    g._setGlobalOptionsGetter = function(e) {
      v = e
    };
    var b = function(e, t, n) {
        e[t] = n
      },
      m = function(e, t, n) {
        e.__domElement.classList.toggle(t, !!n)
      },
      w = function(e, t, n) {
        e.__domElement.style[t] = n
      },
      y = function(e, t, n) {
        e[t] = n
      },
      x = function(e, t, n) {
        n === !0 ? e.setAttribute(t, "") : n === !1 || void 0 === n || null === n ? e.removeAttribute(t) : e.setAttribute(t, n)
      },
      _ = function(e, t, n) {
        e.classList.toggle(t, !!n)
      },
      C = function(e, t, n) {
        e.style[t] = n
      },
      k = {
        name: "virtual",
        virtual: "slot",
        slot: "",
        attrs: [],
        children: []
      },
      E = {
        name: "virtual",
        slot: "",
        attrs: [],
        prerendered: document.createElement("virtual"),
        children: []
      };
    g.create = function(e, t, n, r) {
      var a = v(),
        s = r.renderingMode || a.renderingMode,
        c = k;
      "native" === s && (c = E);
      var d = o(e.attributes),
        u = {
          parseTextContent: void 0 !== d["parse-text-content"] || r.parseTextContent || a.parseTextContent,
          keepWhiteSpace: void 0 !== d["keep-white-space"] || r.keepWhiteSpace || a.keepWhiteSpace
        },
        h = e.content;
      if ("TEMPLATE" !== e.tagName)
        for (h = document.createDocumentFragment(); e.childNodes.length;) h.appendChild(e.childNodes[0]);
      var f = !1,
        A = function(e, o, r, a) {
          for (var d = void 0, u = 0; u < o.length; u++) {
            var h = o[u],
              g = r.concat(e.length);
            if (8 !== h.nodeType)
              if (3 !== h.nodeType)
                if ("WX-CONTENT" !== h.tagName && "SLOT" !== h.tagName) {
                  var v = h.tagName.indexOf("-") >= 0 && "native" !== s,
                    k = null;
                  v || (k = document.createElement(h.tagName));
                  var E = "",
                    S = h.attributes,
                    I = [];
                  if (S) {
                    for (var T = {}, B = 0; B < S.length; B++) {
                      var D = S[B];
                      if ("id" === D.name) E = D.value;
                      else if ("parse-text-content" === D.name) T.parseTextContent = !0;
                      else if ("keep-white-space" === D.name) T.keepWhiteSpace = !0;
                      else {
                        d = void 0;
                        var N = void 0,
                          P = D.name;
                        D.name.slice(-1) === p ? v ? (N = b, P = i(D.name.slice(0, -1))) : (N = x, P = D.name.slice(0, -1)) : ":" === D.name.slice(-1) ? (N = v ? b : y, P = i(D.name.slice(0, -1))) : "class." === D.name.slice(0, 6) ? (N = v ? m : _, P = D.name.slice(6)) : "style." === D.name.slice(0, 6) && (N = v ? w : C, P = D.name.slice(6)), N && (d = l.parse(D.value, n));
                        var F = d ? d.calculate(null, t) : D.value;
                        v || (N || x)(k, P, F), (v || d) && I.push({
                          name: P,
                          value: F,
                          updater: N,
                          exp: d
                        })
                      }
                    }
                    var R = {
                      name: h.tagName.toLowerCase(),
                      id: E,
                      custom: v,
                      attrs: I,
                      prerendered: k,
                      children: []
                    };
                    e.push(R), "VIRTUAL" === h.tagName && (R.virtual = "virtual"), h.childNodes && A(R.children, h.childNodes, g, T), 1 === R.children.length && R.children[0] === c && (R.children.pop(), R.slot = "")
                  }
                } else f = !0, e.push(c);
            else {
              var O = h.textContent;
              if (!a.keepWhiteSpace) {
                if (O = O.trim(), "" === O) continue;
                h.textContent = O
              }
              d = void 0, a.parseTextContent && (d = l.parse(O, n)), e.push({
                exp: d,
                text: d ? d.calculate(null, t) : O
              })
            }
          }
        },
        S = [];
      A(S, h.childNodes, [], u), f || S.push(c), 1 === S.length && S[0] === c && S.pop();
      var I = Object.create(g.prototype);
      return I._tagTreeRoot = S, I._renderingMode = s, I
    }, g.prototype.createInstance = function() {
      var e = Object.create(f.prototype),
        t = Object.create(null),
        n = Object.create(null),
        i = s.create(),
        o = document.createDocumentFragment();
      return "native" === this._renderingMode ? a(this._tagTreeRoot, o, t, n, i) : (o = u.create("shadow-root"), r(this._tagTreeRoot, o, t, n, i)), e.shadowRoot = o, e.idMap = t, e.slots = n, e._binding = i, e
    }, f.prototype.updateValues = function(e, t, n) {
      n && this._binding.update(e, t, n)
    }, e.exports = g
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
      return e._bindings = Object.create(null), e
    }, n.prototype.add = function(e, t, n, i) {
      for (var o = {
          exp: e,
          targetElem: t,
          targetProp: n,
          updateFunc: i
        }, r = this._bindings, a = e.bindedProps, s = 0; s < a.length; s++) {
        var l = a[s];
        r[l] || (r[l] = []), r[l].push(o)
      }
    }, n.prototype.update = function(e, t, n) {
      var i = this._bindings[n];
      if (i)
        for (var o = 0; o < i.length; o++) {
          var r = i[o];
          r.updateFunc(r.targetElem, r.targetProp, r.exp.calculate(e, t))
        }
    }, e.exports = n
  }, function(e, t, n) {
    var i = n(1),
      o = function() {};
    o.prototype = Object.create(Object.prototype, {
      constructor: {
        value: o,
        writable: !0,
        configurable: !0
      }
    }), o.parse = function(e, t) {
      for (var n = Object.create(o.prototype), i = e.split(/\{\{(.*?)\}\}/g), r = [], a = 0; a < i.length; a++)
        if (a % 2) {
          var s = i[a].match(/^(!?)([-_a-zA-Z0-9]+)(?:\((([-_a-zA-Z0-9]+)(,[-_a-zA-Z0-9]+)*)\))?$/) || [!1, ""],
            l = null;
          if (s[3]) {
            l = s[3].split(",");
            for (var c = 0; c < l.length; c++) r.indexOf(l[c]) < 0 && r.push(l[c])
          } else r.indexOf(s[2]) < 0 && r.push(s[2]);
          i[a] = {
            not: !!s[1],
            prop: s[2],
            callee: l
          }
        }
      return n.bindedProps = r, n.isSingleVariable = 3 === i.length && "" === i[0] && "" === i[2], n._slices = i, n._methods = t, n
    };
    var r = function(e, t, n, o) {
      var r = "";
      if (o.callee) {
        for (var a = [], s = 0; s < o.callee.length; s++) a[s] = t[o.callee[s]];
        r = i.safeCallback("Template Method", n[o.prop], e, a), void 0 !== r && null !== r || (r = "")
      } else r = t[o.prop];
      return o.not ? !r : r;
    };
    o.prototype.calculate = function(e, t) {
      var n = this._slices,
        i = null,
        o = "";
      if (this.isSingleVariable) i = n[1], o = r(e, t, this._methods, i);
      else
        for (var a = 0; a < n.length; a++) i = n[a], o += a % 2 ? r(e, t, this._methods, i) : i;
      return o
    }, e.exports = o
  }, function(e, t, n) {
    var i = n(4),
      o = function() {};
    o.prototype = Object.create(i.prototype, {
      constructor: {
        value: o,
        writable: !0,
        configurable: !0
      }
    }), o.wrap = function(e) {
      var t = Object.create(o.prototype);
      return i.initialize(t), t.__domElement = e, e.__wxElement = t, t.$$ = e, t
    }, e.exports = o
  }, function(e, t, n) {
    var i = n(4),
      o = function() {};
    o.prototype = Object.create(i.prototype, {
      constructor: {
        value: o,
        writable: !0,
        configurable: !0
      }
    }), o.create = function(e) {
      var t = Object.create(o.prototype);
      return t.__virtual = !0, t.is = e, i.initialize(t, null), t
    }, e.exports = o
  }, function(e, t, n) {
    var i = n(5),
      o = function() {};
    o.prototype = Object.create(Object.prototype, {
      constructor: {
        value: o,
        writable: !0,
        configurable: !0
      }
    }), o.create = function(e) {
      var t = Object.create(o.prototype);
      return t.$$ = t.__domElement = document.createTextNode(e || ""), t.__domElement.__wxElement = t, t.__subtreeObserversCount = 0, t.parentNode = null, t
    }, Object.defineProperty(o.prototype, "textContent", {
      get: function() {
        return this.__domElement.textContent
      },
      set: function(e) {
        this.__domElement.textContent = e, (this.__textObservers && !this.__textObservers.empty || this.__subtreeObserversCount) && i._callObservers(this, "__textObservers", {
          type: "characterData",
          target: this
        })
      }
    }), e.exports = o
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
      exparser.triggerEvent(e.target, i, t(e))
    }, !0)
  })
}(window),
function(e) {
  function t(e) {
    "undefined" != typeof WeixinJSBridge ? e() : document.addEventListener("WeixinJSBridgeReady", e, !1)
  }
  t(function() {
    WeixinJSBridge.subscribe("onAppRouteDone", function() {
      window.__onAppRouteDone = !0, exparser.triggerEvent(document, "routeDone", {}, {
        bubbles: !0
      })
    }), WeixinJSBridge.subscribe("setKeyboardValue", function(e) {
      e && e.data && exparser.triggerEvent(document, "setKeyboardValue", {
        value: e.data.value,
        cursor: e.data.cursor,
        inputId: e.data.inputId
      }, {
        bubbles: !0
      })
    }), WeixinJSBridge.subscribe("hideKeyboard", function(e) {
      exparser.triggerEvent(document, "hideKeyboard", {}, {
        bubbles: !0
      })
    }), WeixinJSBridge.on("onKeyboardComplete", function(e) {
      exparser.triggerEvent(document, "onKeyboardComplete", {
        value: e.value,
        inputId: e.inputId
      }, {
        bubbles: !0
      })
    }), WeixinJSBridge.on("onTextAreaHeightChange", function(e) {
      exparser.triggerEvent(document, "onTextAreaHeightChange", {
        height: e.height,
        lineCount: e.lineCount,
        inputId: e.inputId
      }, {
        bubbles: !0
      })
    }), WeixinJSBridge.on("onKeyboardShow", function(e) {
      exparser.triggerEvent(document, "onKeyboardShow", {
        inputId: e.inputId
      }, {
        bubbles: !0
      })
    })
  })
}(window),
function(e) {
  exparser.globalOptions.renderingMode = "native", e.addEventListener("change", function(e) {
    exparser.triggerEvent(e.target, "change", {
      value: e.target.value
    })
  }, !0), e.addEventListener("input", function(e) {
    exparser.triggerEvent(e.target, "input")
  }, !0), e.addEventListener("load", function(e) {
    exparser.triggerEvent(e.target, "load")
  }, !0), e.addEventListener("error", function(e) {
    exparser.triggerEvent(e.target, "error")
  }, !0), e.addEventListener("focus", function(e) {
    exparser.triggerEvent(e.target, "focus"), e.preventDefault()
  }, !0), e.addEventListener("blur", function(e) {
    exparser.triggerEvent(e.target, "blur")
  }, !0)
}(window),
function(e) {
  function t(e) {
    "undefined" != typeof WeixinJSBridge ? e() : document.addEventListener("WeixinJSBridgeReady", e, !1)
  }
  var n = function(e, t, n) {
      exparser.triggerEvent(e.target, t, n, {
        bubbles: !0,
        composed: !0,
        extraFields: {
          touches: e.touches,
          changedTouches: e.changedTouches
        }
      })
    },
    i = 10,
    o = 350,
    r = 50,
    a = function(e, t) {
      return e[t ? "changedTouches" : "touches"] = [{
        identifier: 0,
        pageX: e.pageX,
        pageY: e.pageY,
        clientX: e.clientX,
        clientY: e.clientY,
        screenX: e.screenX,
        screenY: e.screenY,
        target: e.target
      }], e
    },
    s = function(e, t) {
      return {
        target: t,
        touches: e.touches,
        changedTouches: e.changedTouches,
        preventDefault: e.preventDefault.bind(e)
      }
    },
    l = !1,
    c = 0,
    d = 0,
    u = 0,
    h = 0,
    p = null,
    g = !1,
    f = null,
    A = function(e) {
      for (; e; e = e.parentNode) {
        var t = e.__wxElem || e;
        if (t.__wxScrolling && Date.now() - t.__wxScrolling < r) return !0
      }
      return !1
    },
    v = function() {
      n(h, "longtap", {
        x: d,
        y: u
      })
    },
    b = function(e, t, i) {
      c || (c = e.timeStamp, d = t, u = i, A(e.target) ? (p = null, g = !0, n(e, "canceltap", {
        x: t,
        y: i
      })) : (p = setTimeout(v, o), g = !1), h = e, l || (f = e.target), n(e, "track", {
        state: "start",
        x: t,
        y: i
      }), e.defaultPrevented && (c = 0))
    },
    m = function(e, t, o) {
      c && (p && (Math.abs(t - d) < i && Math.abs(o - u) < i || (g = !0, clearTimeout(p), p = null, n(h, "canceltap", {
        x: t,
        y: o
      }))), l || (e = s(e, f)), n(e, "track", {
        state: "move",
        x: t,
        y: o
      }))
    },
    w = function(e, t, i, o) {
      c && (c = 0, p && (clearTimeout(p), p = null), o && (e = h, t = d, i = u), l || (e = s(e, f)), n(e, "track", {
        state: "end",
        x: t,
        y: i
      }), o || g || (n(h, "tap", {
        x: t,
        y: i
      }), x(h)))
    };
  e.addEventListener("scroll", function(e) {
    e.target.__wxScrolling = Date.now()
  }, !0), e.addEventListener("touchstart", function(e) {
    l = !0, n(e, "touchstart"), 1 === e.touches.length && b(e, e.touches[0].pageX, e.touches[0].pageY)
  }, !0), e.addEventListener("touchmove", function(e) {
    n(e, "touchmove"), 1 === e.touches.length && m(e, e.touches[0].pageX, e.touches[0].pageY)
  }, !0), e.addEventListener("touchend", function(e) {
    n(e, "touchend"), 0 === e.touches.length && w(e, e.changedTouches[0].pageX, e.changedTouches[0].pageY)
  }, !0), e.addEventListener("touchcancel", function(e) {
    n(e, "touchcancel"), w(null, 0, 0, !0)
  }, !0), window.addEventListener("blur", function() {
    w(null, 0, 0, !0)
  }), e.addEventListener("mousedown", function(e) {
    l || c || (a(e, !1), n(e, "touchstart"), b(e, e.pageX, e.pageY))
  }, !0), e.addEventListener("mousemove", function(e) {
    !l && c && (a(e, !1), n(e, "touchmove"), m(e, e.pageX, e.pageY))
  }, !0), e.addEventListener("mouseup", function(e) {
    !l && c && (a(e, !0), n(e, "touchend"), w(e, e.pageX, e.pageY))
  }, !0);
  var y = {},
    x = function(e) {
      if (y.selector)
        for (var t = y.selector, n = e.target; n;) {
          if (n.tagName && 0 === n.tagName.indexOf("WX-")) {
            var i = n.className.split(" ").map(function(e) {
              return "." + e
            });
            ["#" + n.id].concat(i).forEach(function(e) {
              t.indexOf(e) > -1 && _(n, e)
            })
          }
          n = n.parentNode
        }
    },
    _ = function(e, n) {
      for (var i = 0; i < y.data.length; i++) {
        var o = y.data[i];
        if (o.element === n) {
          var r = {
            eventID: o.eventID,
            page: o.page,
            element: o.element,
            action: o.action,
            time: Date.now()
          };
          0 === n.indexOf(".") && (r.index = Array.prototype.indexOf.call(o.nodes, e)), t(function() {
            WeixinJSBridge.publish("analyticsReport", {
              data: r
            })
          });
          break
        }
      }
    };
  t(function() {
    WeixinJSBridge.subscribe("analyticsConfig", function(e) {
      "[object Array]" === Object.prototype.toString.call(e.data) && (y.data = e.data, y.selector = [], y.data.forEach(function(e) {
        e.element && (y.selector.push(e.element), 0 === e.element.indexOf(".") && (e.nodes = document.body.querySelectorAll(e.element)))
      }))
    })
  })
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
    "this.itemNameChange": "handleItemNameChange",
    "this.itemCheckedChange": "handleItemCheckedChange",
    "this.itemCheck": "handleCheck"
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
    }), !1
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
        t.hoverClass ? t.$$.classList.add(t.hoverClass) : t.$$.classList.add(t.is.replace("wx-", "") + "-hover")
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
    "none" == this.hoverStyle || "none" == this.hoverClass || (this.hoverClass ? this.$$.classList.remove(this.hoverClass) : this.$$.classList.remove(this.is.replace("wx-", "") + "-hover"))
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
    value: {
      type: String,
      value: "",
      observer: "defaultValueChange",
      public: !0
    },
    _value: {
      type: String,
      value: "",
      coerce: "_valueChange"
    },
    showValue: {
      type: String,
      value: ""
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
    this._keyboardShow && (this.__formResetCallback = !0, wx.hideKeyboard()), this._value = "", this.showValue = ""
  },
  getFormData: function(e) {
    this._keyboardShow ? this.__formCallback = e : "function" == typeof e && e(this._value)
  },
  _formGetDataCallback: function() {
    "function" == typeof this.__formCallback && this.__formCallback(this._value), this.__formCallback = void 0
  },
  _focusChange: function(e) {
    e != this.focus && this._couldFocus(Boolean(e))
  },
  _couldFocus: function(e) {
    !this._keyboardShow && this._attached && e && this._inputFocus()
  },
  _getPlaceholderClass: function(e) {
    return "input-placeholder " + e
  },
  _showValueFormate: function(e) {
    this.password || "password" == this.type ? this.showValue = e ? new Array(e.length + 1).join("●") : "" : this.showValue = e || ""
  },
  _maxlengthChanged: function(e, t) {
    var n = this._value.slice(0, e);
    n != this._value && (this._value = n)
  },
  defaultValueChange: function(e) {
    this.maxlength > 0 && (e = e.slice(0, this.maxlength)), this._value = e
  },
  _showValueChange: function(e) {
    return e
  },
  _placeholderChange: function() {
    this._checkPlaceholderStyle(this._value)
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
    }, {
      bubbles: !0
    })
  },
  checkedChange: function(e, t) {
    this.triggerEvent("itemCheckedChange", {
      newval: e,
      oldval: t
    }, {
      bubbles: !0
    })
  },
  attached: function() {
    this.triggerEvent("itemNameChange", {
      newval: this.value,
      oldval: void 0
    }, {
      bubbles: !0
    }), this.triggerEvent("itemCheckedChange", {
      newval: this.checked,
      oldval: void 0
    }, {
      bubbles: !0
    })
  },
  itemCheck: function() {
    this.triggerEvent("itemCheck", {
      value: this.value
    }, {
      bubbles: !0
    })
  },
  resetFormData: function() {
    this.checked = !1
  }
}), window.exparser.registerBehavior({
  is: "wx-label-target",
  properties: {},
  handleLabelTap: function(e) {}
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
    return this._isiOS() || this._isAndroid()
  },
  _getBox: function() {
    var e = this.$$.getBoundingClientRect(),
      t = {
        left: e.left + window.scrollX,
        top: e.top + window.scrollY,
        width: this.$$.offsetWidth,
        height: this.$$.offsetHeight
      };
    return t
  },
  _diff: function() {
    var e = this._getBox();
    for (var t in e)
      if (e[t] !== this._box[t]) return !0;
    return !1
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
    playing: {
      type: Boolean,
      value: !1
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
        })
      }
    }, e.onplay = function(e) {
      t.playing = !0, e.stopPropagation(), t._publish("play", {}), t._buttonType = "pause", "function" == typeof t.onPlay && t.onPlay(e)
    }, e.onpause = function(e) {
      t.playing = !1, e.stopPropagation(), t._publish("pause", {}), t._buttonType = "play", "function" == typeof t.onPause && t.onPause(e)
    }, e.onended = function(e) {
      t.playing = !1, e.stopPropagation(), t._publish("ended", {}), "function" == typeof t.onEnded && t.onEnded(e)
    }, "AUDIO" == e.tagName && (e.onratechange = function(n) {
      n.stopPropagation(), t._publish("ratechange", {
        playbackRate: e.playbackRate
      })
    });
    var o = 0;
    e.addEventListener("timeupdate", function(n) {
      n.stopPropagation(), "AUDIO" == e.tagName && Math.abs(e.currentTime - o) % e.duration >= 1 && (t._publish("timeupdate", {
        currentTime: e.currentTime,
        duration: e.duration
      }), o = 1e3 * e.currentTime), t._currentTime = t._formatTime(Math.floor(e.currentTime)), t._duration = t._formatTime(Math.floor(e.duration)), "function" == typeof t.onTimeUpdate && t.onTimeUpdate(n)
    })
  }
}), window.exparser.registerElement({
  is: "wx-action-sheet",
  template: '\n    <div class="wx-action-sheet-mask" id="mask" style.z-index="1000" style="display: none;"></div>\n    <div class="wx-action-sheet" class.wx-action-sheet-show="{{!hidden}}">\n      <div class="wx-action-sheet-menu">\n        <slot></slot>\n      </div>\n    </div>\n  ',
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
    "this.actionSheetCancel": "cancel"
  },
  cancel: function(e) {
    return this.hide(), !1
  },
  hide: function() {
    this.triggerEvent("change")
  },
  hiddenChange: function(e) {
    var t = this.$.mask;
    e ? (setTimeout(function() {
      t.style.display = "none"
    }, 300), t.style.backgroundColor = "rgba(0,0,0,0)") : (t.style.display = "block", t.focus(), t.style.backgroundColor = "rgba(0,0,0,0.6)")
  }
}), window.exparser.registerElement({
  is: "wx-action-sheet-item",
  template: "\n    <slot></slot>\n  ",
  properties: {},
  behaviors: ["wx-base"]
}), window.exparser.registerElement({
  is: "wx-action-sheet-cancel",
  template: '\n    <div class="wx-action-sheet-middle" id="middle"></div>\n    <div class="wx-action-sheet-cancel" id="cancel">\n      <slot></slot>\n    </div>\n  ',
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
    this.triggerEvent("actionSheetCancel", void 0, {
      bubbles: !0
    })
  }
}), window.exparser.registerElement({
  is: "wx-button",
  template: "\n    <slot></slot>\n  ",
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
    tap: "_preventTapOnDisabled",
    longtap: "_preventTapOnDisabled",
    canceltap: "_preventTapOnDisabled",
    "this.tap": "_onThisTap"
  },
  _preventTapOnDisabled: function() {
    if (this.disabled) return !1
  },
  _onThisTap: function() {
    "submit" === this.formType ? this.triggerEvent("formSubmit", void 0, {
      bubbles: !0
    }) : "reset" === this.formType && this.triggerEvent("formReset", void 0, {
      bubbles: !0
    })
  },
  handleLabelTap: function(e) {
    exparser.triggerEvent(this.shadowRoot, "tap", e.detail, {
      bubbles: !0,
      composed: !0,
      extraFields: {
        touches: e.touches,
        changedTouches: e.changedTouches
      }
    })
  }
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
      clearTimeout(this._srcTimer), this._canAction = !1, this.$.player.src = e;
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
    if (e) {
      if (!this._canAction) return void this._deferredAction.push(e);
      var n = e.method,
        i = null;
      if (null != (i = /^set([a-z|A-Z]*)/.exec(n))) {
        var o = i[1],
          r = e.data;
        o = o[0].toLowerCase() + o.slice(1), "playbackRate" == o || "currentTime" == o ? this.$.player[o] = r : this.triggerEvent("error", {
          errMsg: n + " is not an action"
        })
      } else "play" == n || "pause" == n ? this.$.fakebutton.click() : this.triggerEvent("error", {
        errMsg: n + " is not an action"
      });
      this.action = null
    }
  },
  attached: function() {
    var e = this,
      t = this.$.player,
      n = this;
    this.$.button.onclick = function(e) {
      e.stopPropagation(), n.action = {
        method: n._buttonType
      }
    }, this.$.fakebutton.onclick = function(e) {
      e.stopPropagation(), t[n.action.method]()
    }, WeixinJSBridge.subscribe("audio_" + this.id + "_actionChanged", function(t) {
      e.action = t, e.actionChanged
    })
  }
}), window.exparser.registerElement({
  is: "wx-checkbox",
  template: '\n    <input id="input" type="checkbox" checked:="{{checked}}" disabled$="{{disabled}}" />\n    <slot></slot>\n  ',
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
});
var touchEventNames = ["start", "move", "end", "cancel"],
  format = function(e, t, n, i) {
    n = Array.prototype.slice.call(n);
    var o = e + "." + t + "(" + n.map(function(e) {
      return "string" == typeof e ? "'" + e + "'" : e
    }).join(", ") + ")";
    return i && (o = i + " = " + o), o
  },
  resolveColor = function(e) {
    var t = e.slice(0);
    return t[3] = t[3] / 255, "rgba(" + t.join(",") + ")"
  },
  getCanvasTouches = function(e) {
    var t = this;
    return [].concat(_toConsumableArray(e)).map(function(e) {
      return {
        identifier: e.identifier,
        x: e.pageX - t._box.left,
        y: e.pageY - t._box.top
      }
    })
  };
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
      },
      bindtouchstart: {
        type: String,
        value: "",
        public: !0
      },
      bindtouchmove: {
        type: String,
        value: "",
        public: !0
      },
      bindtouchend: {
        type: String,
        value: "",
        public: !0
      },
      bindtouchcancel: {
        type: String,
        value: "",
        public: !0
      },
      disableScroll: {
        type: Boolean,
        value: !1,
        public: !0,
        observer: "disableScrollChanged"
      }
    },
    _updatePosition: function() {
      this.$.canvas.width = this._box.width, this.$.canvas.height = this._box.height, this._isMobile() ? WeixinJSBridge.invoke("updateCanvas", {
        canvasId: this._canvasNumber,
        position: this._box
      }, function(e) {}) : this.actionsChanged(this.actions)
    },
    attached: function() {
      var e = this,
        t = (this.$.canvas, this);
      if (this._images = {}, this._box = this._getBox(), this.$.canvas.width = this.$$.offsetWidth, this.$.canvas.height = this.$$.offsetHeight, !this.canvasId) return this.triggerEvent("error", {
        errMsg: "canvas-id attribute is undefined"
      }), this._isError = !0, void(this.$$.style.display = "none");
      window.__canvasNumbers__ = window.__canvasNumbers__ || {};
      var n = window.__webviewId__ + "canvas" + this.canvasId;
      return window.__canvasNumbers__.hasOwnProperty(n) ? (this.triggerEvent("error", {
        errMsg: "canvas-id " + t.canvasId + " in this page has already existed"
      }), this._isError = !0, void(this.$$.style.display = "none")) : (window.__canvasNumber__ = window.__canvasNumber__ || 1e5, window.__canvasNumbers__[n] = window.__canvasNumber__ + __webviewId__, window.__canvasNumber__ += 1e5, this._canvasNumber = window.__canvasNumbers__[n], void(this._isMobile() ? ! function() {
        t._isReady = !1;
        var n = {
            target: {
              target: e.$$.id,
              dataset: e.$$.dataset,
              offsetTop: e.$$.offsetTop,
              offsetLeft: e.$$.offsetLeft
            },
            startTime: +new Date
          },
          i = !1;
        touchEventNames.forEach(function(t) {
          e["bindtouch" + t] && (n["onTouch" + (t.charAt(0).toUpperCase() + t.slice(1))] = e["bindtouch" + t], i = !0)
        }), WeixinJSBridge.invoke("insertCanvas", {
          data: JSON.stringify({
            type: "canvas",
            webviewId: window.__webviewId__,
            canvasNumber: t._canvasNumber
          }),
          gesture: i,
          canvasId: t._canvasNumber,
          position: t._box,
          hide: e.hidden,
          disableScroll: e.disableScroll
        }, function(e) {
          WeixinJSBridge.publish("canvasInsert", {
            canvasId: t.canvasId,
            canvasNumber: t._canvasNumber,
            data: n
          }), t._ready(), document.addEventListener("pageReRender", t._pageReRenderCallback.bind(t))
        })
      }() : (WeixinJSBridge.publish("canvasInsert", {
        canvasId: t.canvasId,
        canvasNumber: t._canvasNumber
      }), WeixinJSBridge.subscribe("canvas" + t._canvasNumber + "actionsChanged", function(e) {
        var n = e.actions,
          i = e.reserve;
        t.actions = n, t.actionsChanged(n, i)
      }), WeixinJSBridge.subscribe("invokeCanvasToDataUrl" + t._canvasNumber, function() {
        var t = e.$.canvas.toDataURL().replace(/^data:image\/(jpg|png);base64,/, "");
        WeixinJSBridge.publish("onCanvasToDataUrl_" + e._canvasNumber, {
          dataUrl: t
        })
      }), t._ready(), document.addEventListener("pageReRender", t._pageReRenderCallback.bind(t)), this.addTouchEventForWebview())))
    },
    detached: function() {
      var e = __webviewId__ + "canvas" + this.canvasId;
      delete window.__canvasNumbers__[e], this._isMobile() && WeixinJSBridge.invoke("removeCanvas", {
        canvasId: this._canvasNumber
      }, function(e) {}), WeixinJSBridge.publish("canvasRemove", {
        canvasId: this.canvasId,
        canvasNumber: this._canvasNumber
      })
    },
    addTouchEventForWebview: function() {
      var e = this;
      touchEventNames.forEach(function(t) {
        e.$$.addEventListener("touch" + t, function(n) {
          if (e["bindtouch" + t]) {
            var i = getCanvasTouches.call(e, n.touches),
              o = getCanvasTouches.call(e, n.changedTouches);
            i.length + o.length > 0 && wx.publishPageEvent(e["bindtouch" + t], {
              type: "touch" + t,
              timeStamp: n.timeStamp,
              target: {
                id: n.target.parentElement.id,
                offsetLeft: n.target.offsetLeft,
                offsetTop: n.target.offsetTop,
                dataset: n.target.parentElement.dataset
              },
              touches: i,
              changedTouches: o
            })
          }
          e.disableScroll && (n.preventDefault(), n.stopPropagation())
        })
      })
    },
    actionsChanged: function(e) {
      var t = !(arguments.length <= 1 || void 0 === arguments[1]) && arguments[1];
      if (!this._isMobile() && e) {
        var n = this.$.canvas,
          i = n.getContext("2d"),
          o = this;
        t === !1 && (o._style.fillStyle = "#000000", o._style.strokeStyle = "#000000", o._style.shadowColor = "#000000", o._style.shadowBlur = 0, o._style.shadowOffsetX = 0, o._style.shadowOffsetY = 0, i.setTransform(1, 0, 0, 1, 0, 0), i.clearRect(0, 0, n.width, n.height)), e.forEach(function(e) {
          var t = this,
            n = e.method,
            r = e.data;
          if (/^set/.test(n)) {
            var a = n[3].toLowerCase() + n.slice(4),
              s = void 0,
              l = "";
            if ("fillStyle" === a || "strokeStyle" === a) {
              if ("normal" === r[0]) l = s = resolveColor(r[1]);
              else if ("linear" === r[0]) {
                var s = i.createLinearGradient.apply(i, r[1]);
                l = "context.createLinearGradient(" + r[1].join(",") + ")", r[2].forEach(function(e) {
                  var t = e[0],
                    n = resolveColor(e[1]);
                  s.addColorStop(t, n), l += ".addColorStop(" + n + ")"
                })
              } else if ("radial" === r[0]) {
                var c = r[1][0],
                  d = r[1][1],
                  u = r[1][2],
                  h = [c, d, 0, c, d, u],
                  s = i.createRadialGradient.apply(i, h);
                l = format("context", "createRadialGradient", h), r[2].forEach(function(e) {
                  var t = e[0],
                    n = resolveColor(e[1]);
                  s.addColorStop(t, n), l += ".addColorStop(" + n + ")"
                })
              }
              o._style[a] = s
            } else if ("globalAlpha" === a) l = s = r[0] / 255, o._style[a] = s;
            else if ("shadow" === a) {
              var p = ["shadowOffsetX", "shadowOffsetY", "shadowBlur", "shadowColor"];
              r.forEach(function(e, t) {
                o._style[p[t]] = e, "shadowColor" === p[t] && (o._style.shadowColor = resolveColor(e))
              })
            } else "fontSize" === a ? o._style[a] = r[0] : o._style[a] = r[0]
          } else if ("fillPath" === n || "strokePath" === n || "fillText" === n) {
            n = n.replace(/Path/, ""), i.save();
            for (var c in o._style) "fontSize" === c ? i.font = i.font.replace(/\d+\.?\d*px/, o._style.fontSize + "px") : i[c] = o._style[c];
            if ("fill" === n || "stroke" === n) {
              i.beginPath();
              var g = r;
              g.forEach(function(e) {
                if ("arc" === e.method) {
                  var t = e.data[3] + e.data[4];
                  e.data[4] = t, i.arc.apply(i, e.data)
                } else i[e.method].apply(i, e.data)
              }), i[n]()
            } else i[n].apply(i, r);
            i.restore()
          } else "drawImage" === n ? ! function() {
            var e = _toArray(r),
              n = e[0],
              o = e.slice(1);
            t._images[n] ? i.drawImage.apply(i, [t._images[n]].concat(_toConsumableArray(o))) : (t._images[n] = new Image, t._images[n].src = n, t._images[n].onload = function() {
              i.drawImage.apply(i, [this._images[n]].concat(_toConsumableArray(o)))
            })
          }() : i[n].apply(i, r)
        }, this)
      }
    },
    _hiddenChanged: function(e, t) {
      this._isMobile() ? (this.$$.style.display = e ? "none" : "", WeixinJSBridge.invoke("updateCanvas", {
        canvasId: this._canvasNumber,
        hide: e
      }, function(e) {})) : this.$$.style.display = e ? "none" : ""
    },
    disableScrollChanged: function(e, t) {
      this._isMobile() && WeixinJSBridge.invoke("updateCanvas", {
        canvasId: this._canvasNumber,
        disableScroll: e
      }, function(e) {})
    }
  }), window.exparser.registerElement({
    is: "wx-checkbox-group",
    template: "\n    <slot></slot>\n  ",
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
      }), !1
    }
  }), window.exparser.registerElement({
    is: "wx-form",
    template: '\n    <span id="wrapper"><slot></slot></span>\n  ',
    behaviors: ["wx-base"],
    properties: {
      reportSubmit: {
        type: Boolean,
        value: !1,
        public: !0
      }
    },
    listeners: {
      "this.formSubmit": "submitHandler",
      "this.formReset": "resetHandler"
    },
    resetDfs: function(e) {
      if (e.childNodes)
        for (var t = 0; t < e.childNodes.length; ++t) {
          var n = e.childNodes[t];
          n instanceof exparser.Element && (n.hasBehavior("wx-data-component") && n.resetFormData(), this.resetDfs(n))
        }
    },
    getFormData: function(e, t) {
      return e.name && e.hasBehavior("wx-data-component") ? "WX-INPUT" === e.__domElement.tagName || "WX-PICKER" === e.__domElement.tagName || "WX-TEXTAREA" === e.__domElement.tagName ? e.getFormData(function(e) {
        t(e)
      }) : t(e.getFormData()) : t()
    },
    asyncDfs: function(e, t) {
      var n = this,
        i = function() {
          "function" == typeof t && t(), t = void 0
        };
      if (!e.childNodes) return i();
      for (var o = e.childNodes.length, r = 0; r < e.childNodes.length; ++r) {
        var a = e.childNodes[r];
        a instanceof exparser.Element ? ! function(e) {
          n.getFormData(e, function(t) {
            "undefined" != typeof t && (n._data[e.name] = t), n.asyncDfs(e, function() {
              0 == --o && i()
            })
          })
        }(a) : --o
      }
      0 == o && i()
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
        }) : WeixinJSBridge.invoke("reportSubmitForm", {}, function(e) {
          t.triggerEvent("submit", {
            value: t._data,
            formId: e.formId,
            target: n
          })
        }) : t.triggerEvent("submit", {
          value: t._data,
          target: n
        })
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
      }), !1
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
          t.stopPropagation(), e.triggerEvent("load", {
            width: this.width,
            height: this.height
          })
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
        var o = {
          success: function(e) {
            i._srcChanged(e.localData)
          },
          fail: function(e) {
            i._publishError(e)
          }
        };
        !/wechatdevtools/.test(n) && /iphone/.test(n) ? /^(http|https):\/\//.test(e) || /^\s*data:image\//.test(e) ? this._srcChanged(e) : /^wxfile:\/\//.test(e) ? (o.filePath = e,
          wx.getLocalImgData(o)) : (o.path = e, wx.getLocalImgData(o)) : !/wechatdevtools/.test(n) && /android/.test(n) ? /^wxfile:\/\//.test(e) || /^(http|https):\/\//.test(e) || /^\s*data:image\//.test(e) ? this._srcChanged(e) : wx.getCurrentRoute({
          success: function(t) {
            var n = wx.getRealRoute(t.route, e);
            i._srcChanged(n)
          }
        }) : this._srcChanged(e.replace("wxfile://", ""))
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
  }),
  function() {
    /wechatdevtools/.test(window.navigator.userAgent.toLowerCase()) && window.exparser.registerElement({
      is: "wx-input",
      template: '\n      <div id="wrapper" disabled$="{{disabled}}">\n        <p id="placeholder" class$="{{_getPlaceholderClass(placeholderClass)}}" style$="{{_getPlaceholderStyle(placeholderStyle)}}" parse-text-content>{{placeholder}}</p>\n        <input id="input" type$="{{_getType(type,password)}}" maxlength$="{{maxlength}}" value$="{{showValue}}" disabled$="{{disabled}}" >\n      </div>\n      ',
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
        this._checkPlaceholderStyle(this._value), this._attached = !0, this.updateInput(), window.__onAppRouteDone && this._couldFocus(this.autoFocus), this.__routeDoneId = exparser.addListenerToElement(document, "routeDone", function() {
          e._couldFocus(e.autoFocus)
        }), this.__setKeyboardValueId = exparser.addListenerToElement(document, "setKeyboardValue", function(t) {
          if (e._keyboardShow) {
            e._value = t.detail.value;
            var n = t.detail.cursor;
            "undefined" != typeof n && n != -1 && e.$.input.setSelectionRange(n, n)
          }
        }), this.__hideKeyboardId = exparser.addListenerToElement(document, "hideKeyboard", function(t) {
          e._keyboardShow && e.$.input.blur()
        }), document.addEventListener("touchstart", this.onDocumentTouchStart.bind(this)), document.addEventListener("pageReRender", this.updateInput.bind(this)), this.autoFocus && setTimeout(function() {
          e._couldFocus(e.autoFocus)
        }, 500)
      },
      detached: function() {
        document.removeEventListener("pageReRender", this.updateInput.bind(this)), document.removeEventListener("touchstart", this.onDocumentTouchStart.bind(this)), exparser.removeListenerFromElement(document, "routeDone", this.__routeDoneId), exparser.removeListenerFromElement(document, "hideKeyboard", this.__hideKeyboardId), exparser.removeListenerFromElement(document, "onKeyboardComplete", this.__onKeyboardCompleteId), exparser.removeListenerFromElement(document, "setKeyboardValue", this.__setKeyboardValueId)
      },
      onDocumentTouchStart: function() {
        this._keyboardShow && this.$.input.blur()
      },
      _getType: function(e, t) {
        return t || "password" == e ? "password" : "text"
      },
      _showValueChange: function(e) {
        this.$.input.value = e
      },
      _inputFocus: function(e) {
        this.disabled || this._keyboardShow || (this._keyboardShow = !0, this.triggerEvent("focus", {
          value: this._value
        }), this.$.input.focus())
      },
      _inputBlur: function(e) {
        this._keyboardShow = !1, this.triggerEvent("blur", {
          value: this._value
        }), this._checkPlaceholderStyle(this._value)
      },
      _inputKey: function(e) {
        var t = e.target.value;
        if (this._checkPlaceholderStyle(t), this.bindinput) {
          var n = {
            id: this.$$.id,
            dataset: this.$$.dataset,
            offsetTop: this.$$.offsetTop,
            offsetLeft: this.$$.offsetLeft
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
                target: n,
                currentTarget: n,
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
        this._value = t, this.triggerEvent("change", {
          value: t
        }), this._formGetDataCallback()
      },
      updateInput: function() {
        var e = window.getComputedStyle(this.$$),
          t = this.$$.getBoundingClientRect(),
          n = ["Left", "Right"].map(function(t) {
            return parseFloat(e["border" + t + "Width"]) + parseFloat(e["padding" + t])
          }),
          i = ["Top", "Bottom"].map(function(t) {
            return parseFloat(e["border" + t + "Width"]) + parseFloat(e["padding" + t])
          }),
          o = this.$.input;
        o.style.width = t.width - n[0] - n[1] + "px", o.style.height = t.height - i[0] - i[1] + "px", o.style.color = e.color;
        var r = this.$.placeholder;
        r.style.width = t.width - n[0] - n[1] + "px", r.style.height = t.height - i[0] - i[1] + "px"
      },
      _valueChange: function(e, t) {
        return this.maxlength > 0 && (e = e.slice(0, this.maxlength)), this._checkPlaceholderStyle(e), this._showValueChange(e), e
      },
      _getPlaceholderStyle: function(e) {
        return e + ";z-index:1;position:absolute;"
      },
      _checkPlaceholderStyle: function(e) {
        e ? this.$.placeholder.style.display = "none" : (this.$.placeholder.style.display = "flex", this.$.placeholder.style.display = "-ms-flexbox", this.$.placeholder.style.display = "-webkit-box")
      }
    })
  }(),
  function() {
    /wechatdevtools/.test(window.navigator.userAgent.toLowerCase()) || window.exparser.registerElement({
      is: "wx-input",
      template: '\n      <div id="wrapper" disabled$="{{disabled}}">\n        <p id="input" parse-text-content >{{showValue}}</p>\n        <p id="placeholder" class$="{{_getPlaceholderClass(placeholderClass)}}" style$="{{_getPlaceholderStyle(placeholderStyle)}}"></p>\n      </div>\n    ',
      behaviors: ["wx-base", "wx-data-component", "wx-input-base"],
      properties: {},
      listeners: {
        tap: "_inputFocus"
      },
      attached: function() {
        var e = this;
        this._checkPlaceholderStyle(this._value), this._attached = !0, window.__onAppRouteDone && this._couldFocus(this.autoFocus), this.__routeDoneId = exparser.addListenerToElement(document, "routeDone", function() {
          e._couldFocus(e.autoFocus)
        }), this.__onKeyboardCompleteId = exparser.addListenerToElement(document, "onKeyboardComplete", function(t) {
          e._keyboardShow && t.detail.inputId == e._inputId && (e._value = t.detail.value, e.onKeyboardComplete())
        }), this.__setKeyboardValueId = exparser.addListenerToElement(document, "setKeyboardValue", function(t) {
          e._keyboardShow && t.detail.inputId == e._inputId && (e._value = t.detail.value)
        }), document.addEventListener("touchstart", this.onDocumentTouchStart.bind(this)), document.addEventListener("pageReRender", this.pageReRenderCallback.bind(this))
      },
      detached: function() {
        document.removeEventListener("pageReRender", this.pageReRenderCallback.bind(this)), document.removeEventListener("touchstart", this.onDocumentTouchStart.bind(this)), exparser.removeListenerFromElement(document, "routeDone", this.__routeDoneId), exparser.removeListenerFromElement(document, "onKeyboardComplete", this.__onKeyboardCompleteId), exparser.removeListenerFromElement(document, "setKeyboardValue", this.__setKeyboardValueId)
      },
      onDocumentTouchStart: function() {
        this._keyboardShow && (this.onKeyboardComplete(), wx.hideKeyboard())
      },
      onKeyboardComplete: function() {
        this.__formResetCallback && (this._value = "", this.__formResetCallback = void 0), this._formGetDataCallback(), this.triggerEvent("change", {
          value: this._value
        }), this.triggerEvent("blur", {
          value: this._value
        }), this._resetInputState()
      },
      getComputedStyle: function() {
        var e = this.$$,
          t = window.getComputedStyle(e),
          n = e.getBoundingClientRect(),
          i = ["Left", "Right"].map(function(e) {
            return parseInt(t["border" + e + "Width"]) + parseInt(t["padding" + e])
          }),
          o = ["Top", "Bottom"].map(function(e) {
            return parseInt(t["border" + e + "Width"]) + parseInt(t["padding" + e])
          }),
          r = parseInt(t.fontWeight);
        isNaN(r) ? r = t.fontWeight : r < 500 ? r = "normal" : r >= 500 && (r = "bold");
        var a = t.textAlign;
        return ["left", "center", "right"].indexOf(a) < 0 && (a = "left"), {
          width: n.width - i[0] - i[1],
          height: n.height - o[0] - o[1],
          left: n.left + i[0] + window.scrollX,
          top: n.top + o[0] + window.scrollY,
          fontFamily: t.fontFamily,
          fontSize: parseFloat(t.fontSize) || 16,
          fontWeight: r,
          color: this._getHexColor(t.color),
          backgroundColor: "#00000000",
          marginBottom: parseFloat(t.marginBottom),
          textAlign: a
        }
      },
      getPlaceholderStyle: function() {
        var e = this.$.placeholder,
          t = window.getComputedStyle(e),
          n = parseInt(t.fontWeight);
        return isNaN(n) ? n = t.fontWeight : n < 500 ? n = "normal" : n >= 500 && (n = "bold"), this.placeholderStyle && this.placeholderStyle.split(";"), {
          fontSize: parseFloat(t.fontSize) || 16,
          fontWeight: n,
          color: this._getHexColor(t.color)
        }
      },
      pageReRenderCallback: function() {
        this._updateInput()
      },
      _inputFocus: function(e) {
        return !this.disabled && (this.triggerEvent("focus", {
          value: this._value
        }), !this._keyboardShow && (this._showNativeInput(), !1))
      },
      defaultValueChange: function(e) {
        this.maxlength > 0 && (e = e.slice(0, this.maxlength)), e != this._value && (this._value = e, this._inputId && this._keyboardShow && WeixinJSBridge.invoke("updateInput", {
          value: e || "",
          inputId: this._inputId
        }, function(e) {}))
      },
      _valueChange: function(e, t) {
        return this._keyboardShow || (this.maxlength > 0 && (e = e.slice(0, this.maxlength)), this._checkPlaceholderStyle(e)), e
      },
      _showNativeInput: function(e) {
        var t = this;
        this.inputArgs = {
          type: "password" == this.type ? "text" : this.type,
          maxLength: this.maxlength,
          defaultValue: this._value,
          password: this.password || "password" == this.type,
          style: this.getComputedStyle(),
          data: this.formateEventTarget(),
          placeholder: this.placeholder,
          placeholderStyle: this.getPlaceholderStyle()
        }, WeixinJSBridge.invoke("showKeyboard", this.inputArgs, function(e) {
          /:ok/.test(e.errMsg) && (t._inputId = e.inputId, t._keyboardShow = !0, t.showValue = " ")
        })
      },
      _diff: function(e, t) {
        var n = {},
          i = !1;
        for (var o in t) "[object String]" === Object.prototype.toString.call(t[o]) ? e[o] != t[o] && (n[o] = t[o], i = !0) : "[object Object]" === Object.prototype.toString.call(t[o]) && JSON.stringify(t[o]) != JSON.stringify(e[o]) && (n[o] = t[o], i = !0);
        return i ? n : void 0
      },
      formateEventTarget: function() {
        var e = {
          bindinput: this.bindinput,
          target: {
            id: this.$$.id,
            dataset: this.$$.dataset,
            offsetTop: this.$$.offsetTop,
            offsetLeft: this.$$.offsetLeft
          }
        };
        return e.currentTarget = e.target, this.bindinput ? JSON.stringify(e) : ""
      },
      _updateInput: function() {
        if (this._keyboardShow) {
          var e = {
              maxLength: this.maxlength,
              password: this.password || "password" == this.type,
              placeholder: this.placeholder,
              style: this.getComputedStyle(),
              data: this.formateEventTarget(),
              placeholderStyle: this.getPlaceholderStyle()
            },
            t = this._diff(this.inputArgs, e);
          t && (this.inputArgs = e, t.inputId = this._inputId, WeixinJSBridge.invoke("updateInput", t, function(e) {}))
        }
      },
      _resetInputState: function() {
        this._keyboardShow = !1, this._inputId = void 0, this._checkPlaceholderStyle(this._value)
      },
      _getHexColor: function(e) {
        if (e.indexOf("#") >= 0) return e;
        var t = e.match(/\d+/g),
          n = [];
        if (t.map(function(e, t) {
            if (t < 3) {
              var i = parseInt(e);
              i = i > 9 ? i.toString(16) : "0" + i, n.push(i)
            }
          }), t.length > 3) {
          var i = parseFloat(t.slice(3).join("."));
          0 == i ? n.push("00") : i >= 1 ? n.push("ff") : (i = parseInt(255 * i), i = i > 9 ? i.toString(16) : "0" + i, n.push(i))
        }
        return "#" + n.join("")
      },
      _getPlaceholderStyle: function(e) {
        return e + ";display:none;"
      },
      _checkPlaceholderStyle: function(e) {
        var t = e;
        e ? (this.$.input.classList.remove("input-placeholder"), this.placeholderClass && this.$.input.classList.remove(this.placeholderClass), this.$.input.setAttribute("style", ""), this.password || "password" == this.type ? this.showValue = e ? new Array(e.length + 1).join("●") : "" : this.showValue = e || "") : (this.placeholder && (this.$.input.classList.add("input-placeholder"), this.placeholderClass && this.$.input.classList.add(this.placeholderClass), this.placeholderStyle && this.$.input.setAttribute("style", this.placeholderStyle), t = this.placeholder), this.showValue = t || "")
      }
    })
  }(), window.exparser.registerElement({
    is: "wx-label",
    template: "\n    <slot></slot>\n  ",
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
    _handleNode: function(e, t) {
      return !!(e instanceof exparser.Element && e.hasBehavior("wx-label-target")) && (e.handleLabelTap(t), !0)
    },
    dfs: function(e, t) {
      if (this._handleNode(e, t)) return !0;
      if (!e.childNodes) return !1;
      for (var n = 0; n < e.childNodes.length; ++n)
        if (this.dfs(e.childNodes[n], t)) return !0;
      return !1
    },
    onTap: function(e) {
      for (var t = e.target; t instanceof exparser.Element && t !== this; t = t.parentNode)
        if (t.hasBehavior("wx-label-target")) return;
      if (this.for) {
        var n = document.getElementById(this.for);
        n && this._handleNode(n.__wxElement, e)
      } else this.dfs(this, e)
    }
  }), window.exparser.registerElement({
    is: "wx-loading",
    template: '\n    <div class="wx-loading-mask" style$="background-color: transparent;"></div>\n    <div class="wx-loading">\n      <i class="wx-loading-icon"></i><p class="wx-loading-content"><slot></slot></p>\n    </div>\n  ',
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
      }, function(e) {})
    },
    _hiddenChanged: function(e, t) {
      this._isMobile() ? (this.$$.style.display = e ? "none" : "", WeixinJSBridge.invoke("updateMap", {
        mapId: this._mapId,
        hide: e
      }, function(e) {})) : this.$$.style.display = e ? "none" : ""
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
          }), e._update({
            centerLatitude: e.latitude,
            centerLongitude: e.longitude,
            covers: t
          }, "覆盖物")
        }
      })) : void this._delay("coversChanged", t, n)
    },
    attached: function() {
      var e = this;
      if (this._box = this._getBox(), this._isMobile()) WeixinJSBridge.invoke("insertMap", {
        position: this._box,
        centerLongitude: this.longitude,
        centerLatitude: this.latitude,
        scale: this.scale,
        covers: this.covers || [],
        markers: this.markers || [],
        hide: this.hidden
      }, function(t) {
        /ok/.test(t.errMsg) ? (e._mapId = t.mapId, e._ready(), document.addEventListener("pageReRender", e._pageReRenderCallback.bind(e))) : e.triggerEvent("error", {
          errMsg: t.errMsg
        })
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
          }).join("|"),
          n = "http://apis.map.qq.com/tools/poimarker?type=0&marker=" + t + "&key=JMRBZ-R4HCD-X674O-PXLN4-B7CLH-42BSB&referer=wxdevtools",
          i = document.createElement("iframe");
        i.src = n, i.style.position = "absolute", i.style.top = 0, i.style.left = 0, this.$$.appendChild(i), this._ready()
      }
    },
    detached: function() {
      this._isMobile() && WeixinJSBridge.invoke("removeMap", {
        mapId: this._mapId
      }, function(e) {})
    }
  }), window.exparser.registerElement({
    is: "wx-modal",
    template: '\n    <div id="mask" class="wx-modal-mask"></div>\n    <div class="wx-modal-dialog">\n      <div class="wx-modal-dialog-hd">\n        <strong parse-text-content>{{title}}</strong>\n      </div>\n      <div class="wx-modal-dialog-bd">\n        <slot></slot>\n      </div>\n      <div class="wx-modal-dialog-ft">\n        <a hidden$="{{noCancel}}" id="cancel" class="wx-modal-btn-default" parse-text-content>{{cancelText}}</a>\n        <a id="confirm" class="wx-modal-btn-primary" parse-text-content>{{confirmText}}</a>\n      </div>\n    </div>\n  ',
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
      this.triggerEvent("confirm")
    },
    _handleCancel: function() {
      this.triggerEvent("cancel")
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
    is: "wx-navigator",
    behaviors: ["wx-base", "wx-hover"],
    template: "<slot></slot>",
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
      }) : console.error("navigator should have url attribute")
    }
  }), window.exparser.registerElement({
    is: "wx-picker",
    template: '<div id="wrapper"><slot></slot></div>',
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
      },
      disabled: {
        type: Boolean,
        value: !1,
        public: !0
      }
    },
    listeners: {
      "wrapper.tap": "showPickerView"
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
      var t = this;
      if (!this.disabled) {
        var n = parseInt(this.value);
        (isNaN(n) || n >= this.range.length) && (n = 0);
        for (var i = [], o = 0; o < this.range.length; o++) i.push(this.range[o] + "");
        WeixinJSBridge.invoke("showPickerView", {
          array: i,
          current: n,
          style: this.getCustomerStyle()
        }, function(e) {
          /:ok/.test(e.errMsg) && (t.value = e.index, t.triggerEvent("change", {
            value: t.value
          })), t.resetPickerState(), t.formGetDataCallback()
        }), this.__pickerShow = !0
      }
    },
    showDatePickerView: function() {
      var e = this;
      this.disabled || (WeixinJSBridge.invoke("showDatePickerView", {
        range: {
          start: this.start,
          end: this.end
        },
        mode: this.mode,
        current: this.value,
        fields: this.fields,
        style: this.getCustomerStyle()
      }, function(t) {
        /:ok/.test(t.errMsg) && (e.value = t.value, e.triggerEvent("change", {
          value: e.value
        })), e.resetPickerState(), e.formGetDataCallback()
      }), this.__pickerShow = !0)
    },
    resetPickerState: function() {
      this.__pickerShow = !1
    }
  }), window.exparser.registerElement({
    is: "wx-radio",
    template: '\n    <input id="input" class="wx-radio-check" type="radio" checked:="{{checked}}" disabled$="{{disabled}}"/>\n    <slot></slot>\n  ',
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
    is: "wx-radio-group",
    template: "\n    <slot></slot>\n  ",
    behaviors: ["wx-base", "wx-data-component", "wx-group"],
    properties: {}
  }), window.exparser.registerElement({
    is: "wx-scroll-view",
    template: '\n    <div id="main" class="wx-scroll-view" style$="overflow-x: hidden; overflow-y: hidden;">\n      <slot></slot>\n    </div>\n  ',
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
        t.preventDefault(), t.stopPropagation(), e._handleScroll.bind(e, t)()
      }, this.__handleTouchMove = function(t) {
        var n = t.touches[0].pageY,
          i = e.$.main;
        e.__touchStartY < n ? i.scrollTop > 0 && t.stopPropagation() : i.scrollHeight > i.offsetHeight + i.scrollTop && t.stopPropagation()
      }, this.__handleTouchStart = function(t) {
        e.__touchStartY = t.touches[0].pageY
      }, this.$.main.addEventListener("touchstart", this.__handleTouchStart), this.$.main.addEventListener("touchmove", this.__handleTouchMove), this.$.main.addEventListener("scroll", this.__handleScroll), this.$.main.style.overflowX = this.scrollX ? "auto" : "hidden", this.$.main.style.overflowY = this.scrollY ? "auto" : "hidden", document.getElementById("__scroll_view_hack") && document.body.removeChild(document.getElementById("__scroll_view_hack"));
      var t = document.createElement("div");
      t.setAttribute("style", "position: fixed; left: 0; bottom: 0; line-height: 1; font-size: 1px; z-index: 10000; border-radius: 4px; box-shadow: 0 0 8px rgba(0,0,0,.4); width: 1px; height: 1px; overflow: hidden;"), t.innerText = ".", t.id = "__scroll_view_hack", document.body.appendChild(t)
    },
    detached: function() {
      this.$.main.removeEventListener("scroll", this.__handleScroll), this.$.main.removeEventListener("touchstart", this.__handleTouchStart), this.$.main.removeEventListener("touchmove", this.__handleTouchMove)
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
          }), this.scrollY) {
          var t = this._lastScrollTop - e.scrollTop > 0,
            n = this._lastScrollTop - e.scrollTop < 0;
          e.scrollTop <= this.upperThreshold && t && this.triggerEvent("scrolltoupper", {
            direction: "top"
          }), e.scrollTop + e.offsetHeight + this.lowerThreshold >= e.scrollHeight && n && this.triggerEvent("scrolltolower", {
            direction: "bottom"
          })
        }
        if (this.scrollX) {
          var i = this._lastScrollLeft - e.scrollLeft > 0,
            o = this._lastScrollLeft - e.scrollLeft < 0;
          e.scrollLeft <= this.upperThreshold && i && this.triggerEvent("scrolltoupper", {
            direction: "left"
          }), e.scrollLeft + e.offsetWidth + this.lowerThreshold >= e.scrollWidth && o && this.triggerEvent("scrolltolower", {
            direction: "right"
          })
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
        var t = this.$$.querySelector("#" + e);
        t && (this.$.main.scrollTop = t.offsetTop)
      }
    }
  }), window.exparser.registerElement({
    is: "wx-slider",
    template: '\n    <div class="wx-slider-wrapper" class.wx-slider-disabled="{{disabled}}">\n      <div class="wx-slider-tap-area" id="wrapper">\n        <div class="wx-slider-handle-wrapper" style.background-color="{{color}}">\n          <div class="wx-slider-handle" style.left="{{_getValueWidth(value,min,max)}}" id="handle"></div>\n          <div class="wx-slider-track" style.width="{{_getValueWidth(value,min,max)}}" style.background-color="{{selectedColor}}"></div>\n          <div class="wx-slider-step" id="step"></div>\n        </div>\n      </div>\n      <span hidden$="{{!showValue}}" class="wx-slider-value">\n        <p parse-text-content>{{value}}</p>\n      </span>\n    </div>\n  ',
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
      },
      color: {
        type: String,
        value: "#e9e9e9"
      },
      selectedColor: {
        type: String,
        value: "#1aad19"
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
      }))
    },
    _onTap: function(e) {
      this.disabled || (this._onUserChangedValue(e), this.triggerEvent("change", {
        value: this.value
      }))
    },
    resetFormData: function() {
      this.value = this.min
    }
  }), window.exparser.registerElement({
    is: "wx-swiper",
    template: '\n    <div id="slidesWrapper" class="wx-swiper-wrapper">\n      <div id="slides" class="wx-swiper-slides" class.wx-swiper-slides-tracking="{{_tracking}}" style.transition-duration="{{duration}}ms">\n        <slot></slot>\n      </div>\n      <div id="slidesDots" hidden$="{{!indicatorDots}}" class="wx-swiper-dots" class.wx-swiper-dots-horizontal="{{!vertical}}" class.wx-swiper-dots-vertical="{{vertical}}">\n      </div>\n    </div>\n  ',
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
      _tracking: Boolean
    },
    listeners: {
      "slides.track": "handleContentTrack",
      "slidesDots.tap": "handleDotTap",
      "this.wxSwiperItemChanged": "_itemChanged"
    },
    attached: function() {
      this._attached = !0, this._initSlides(), this.autoplay && this._scheduleNextSlide()
    },
    detached: function() {
      this._attached = !1, this._cancelSchedule()
    },
    _initSlides: function() {
      if (this._attached) {
        var e = 0,
          t = this.vertical,
          n = [],
          i = function e(t) {
            for (var i = 0; i < t.childNodes.length; i++) {
              var o = t.childNodes[i];
              o.hasBehavior("wx-swiper-item") ? n.push(o) : o instanceof exparser.Element && e(o)
            }
          };
        i(this);
        for (var o = 0; o < n.length; o++) {
          var r = n[o].$$;
          r.style.position = "absolute", r.style.width = "100%", r.style.height = "100%", t ? (r.style.left = 0, r.style.top = 100 * e + "%") : (r.style.top = 0, r.style.left = 100 * e + "%"), e++
        }
        this._slideCount = e;
        var a = this._normalizeCurrentSlide(this.current);
        t ? (this.$.slides.style.top = 100 * -a + "%", this.$.slides.style.left = 0) : (this.$.slides.style.top = 0, this.$.slides.style.left = 100 * -a + "%"), this._updateDots(a)
      }
    },
    _itemChanged: function(e) {
      return e.target._relatedSwiper = this, this._initSlides(), !1
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
      var t = this.$.slidesDots;
      t.innerHTML = "";
      for (var n = document.createDocumentFragment(), i = 0; i < this._slideCount; i++) {
        var o = document.createElement("div");
        o.setAttribute("data-dot-index", i), i === e ? o.setAttribute("class", "wx-swiper-dot wx-swiper-dot-active") : o.setAttribute("class", "wx-swiper-dot"), n.appendChild(o)
      }
      t.appendChild(n)
    },
    _gotoSlide: function(e) {
      this._slideCount && (this._updateDots(e), this.vertical ? this.$.slides.style.top = -100 * e + "%" : this.$.slides.style.left = -100 * e + "%", this.autoplay && this._scheduleNextSlide(), this.triggerEvent("change", {
        current: e
      }))
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
          o = e.detail.y - this._contentTrackPrevY;
        if (this._contentTrackPrevX = e.detail.x, this._contentTrackPrevY = e.detail.y, !this._trackingDirectionChecked) {
          if (Math.abs(t) <= Math.abs(n) && !this.vertical || Math.abs(t) >= Math.abs(n) && this.vertical) return void(this._tracking = !1);
          this._trackingDirectionChecked = !0
        }
        if ("end" === e.detail.state) {
          this.autoplay && this._scheduleNextSlide(), this._tracking = !1;
          var r = 0;
          Math.abs(this._contentTrackS) / (Date.now() - this._contentTrackT) > .15 && (r = 50 * this._contentTrackS / Math.abs(this._contentTrackS));
          var a = 0;
          return a = this.vertical ? this._normalizeCurrentSlide(-(parseFloat(this.$.slides.style.top) + r) / 100) : this._normalizeCurrentSlide(-(parseFloat(this.$.slides.style.left) + r) / 100), void(this.current !== a ? this.current = a : this.vertical ? this.$.slides.style.top = -100 * a + "%" : this.$.slides.style.left = -100 * a + "%")
        }
        this._cancelSchedule();
        var s = this._slideCount,
          l = function(e) {
            return .5 - .25 / (e + .5)
          };
        if (this._contentTrackS = 0, this._contentTrackT = Date.now(), this.vertical) {
          var c = this._contentTrackY + n / this.$.slidesWrapper.offsetHeight * 100;
          c > 0 ? c = 100 * l(c / 100) : 100 - c > 100 * s ? c = 100 * (1 - l(1 - c / 100 - s) - s) : this._contentTrackS = o, this.$.slides.style.top = c + "%"
        } else {
          var d = this._contentTrackX + t / this.$.slidesWrapper.offsetWidth * 100;
          d > 0 ? d = 100 * l(d / 100) : 100 - d > 100 * s ? d = 100 * (1 - l(1 - d / 100 - s) - s) : this._contentTrackS = i, this.$.slides.style.left = d + "%"
        }
        return !1
      }
    }
  }), window.exparser.registerElement({
    is: "wx-swiper-item",
    template: "\n    <slot></slot>\n  ",
    properties: {},
    listeners: {
      "this.wxSwiperItemChanged": "_invalidChild"
    },
    behaviors: ["wx-base"],
    _invalidChild: function(e) {
      if (e.target !== this) return !1
    },
    attached: function() {
      this._relatedSwiper = null, this.triggerEvent("wxSwiperItemChanged", void 0, {
        bubbles: !0
      })
    },
    detached: function() {
      this._relatedSwiper && (this._relatedSwiper.triggerEvent("wxSwiperItemChanged"), this._relatedSwiper = null)
    }
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
      })
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
    template: '\n    <span id="raw" style="display:none;"><slot></slot></span>\n    <span id="main"></span>\n  ',
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
    _update: function() {
      for (var e = this.$.raw, t = document.createDocumentFragment(), n = 0, i = e.childNodes.length; n < i; n++) {
        var o = e.childNodes.item(n);
        if (o.nodeType === o.TEXT_NODE) {
          var r = document.createElement("span");
          r.innerHTML = this._htmlEncode(o.textContent).replace(/\n/g, "<br>"), t.appendChild(r)
        } else o.nodeType === o.ELEMENT_NODE && "WX-TEXT" === o.tagName && t.appendChild(o.cloneNode(!0))
      }
      this.$.main.innerHTML = "", this.$.main.appendChild(t)
    },
    created: function() {
      this._observer = exparser.Observer.create(function() {
        this._update()
      }), this._observer.observe(this, {
        childList: !0,
        subtree: !0,
        characterData: !0
      })
    },
    attached: function() {
      this._update()
    }
  }),
  function() {
    /wechatdevtools/.test(window.navigator.userAgent.toLowerCase()) && window.exparser.registerElement({
      is: "wx-textarea",
      behaviors: ["wx-base", "wx-data-component"],
      template: '<div id="wrapped">\n      <div id="placeholder" class$="{{_getPlaceholderClass(placeholderClass)}}" style$="{{_getPlaceholderStyle(placeholderStyle)}}"  parse-text-content>\n        {{placeholder}}\n      </div>\n      <textarea id="textarea"  ></textarea>\n      <div id="compute" class="compute"></div>\n    </div>\n    ',
      properties: {
        value: {
          type: String,
          value: "",
          public: !0,
          coerce: "defaultValueChange"
        },
        maxlength: {
          type: Number,
          value: 140,
          public: !0,
          observer: "maxlengthChanged"
        },
        placeholder: {
          type: String,
          value: "",
          public: !0
        },
        hidden: {
          type: Boolean,
          value: !1,
          public: !0
        },
        disabled: {
          type: Boolean,
          value: !1,
          public: !0
        },
        focus: {
          type: Number,
          value: 0,
          public: !0,
          observer: "focusChanged"
        },
        autoFocus: {
          type: Boolean,
          value: !1,
          public: !0
        },
        placeholderClass: {
          type: String,
          value: "textarea-placeholder",
          public: !0
        },
        placeholderStyle: {
          type: String,
          value: "",
          public: !0
        },
        autoHeight: {
          type: Boolean,
          value: !1,
          public: !0
        }
      },
      listeners: {
        "textarea.input": "onTextAreaInput",
        "textarea.focus": "onTextAreaFocus",
        "textarea.blur": "onTextAreaBlur"
      },
      resetFormData: function() {
        this.$.textarea.value = "", this.value = ""
      },
      getFormData: function(e) {
        var t = this;
        this.value = this.$.textarea.value, setTimeout(function() {
          "function" == typeof e && e(t.value)
        }, 0)
      },
      couldFocus: function(e) {
        this.disabled || this.$.textarea.focus()
      },
      focusChanged: function(e, t) {
        return e != t && this.couldFocus(Boolean(e)), e
      },
      attached: function() {
        var e = this;
        this.__scale = 750 / window.innerWidth, this.getComputedStyle(), this.checkRows(this.value), document.addEventListener("pageReRender", this.updateTextArea.bind(this)), this.__routeDoneId = exparser.addListenerToElement(document, "routeDone", function() {
          e.couldFocus(e.autoFocus)
        }), this.__attached = !0
      },
      detached: function() {
        document.removeEventListener("pageReRender", this.updateTextArea.bind(this)), exparser.removeListenerFromElement(document, "routeDone", this.__routeDoneId)
      },
      getHexColor: function(e) {
        if (e.indexOf("#") >= 0) return e;
        var t = e.match(/\d+/g),
          n = [];
        if (t.map(function(e, t) {
            if (t < 3) {
              var i = parseInt(e);
              i = i > 9 ? i.toString(16) : "0" + i, n.push(i)
            }
          }), t.length > 3) {
          var i = parseFloat(t.slice(3).join("."));
          0 == i ? n.push("00") : i >= 1 ? n.push("ff") : (i = parseInt(255 * i), i = i > 9 ? i.toString(16) : "0" + i, n.push(i))
        }
        return "#" + n.join("")
      },
      getComputedStyle: function() {
        var e = window.getComputedStyle(this.$$),
          t = this.$$.getBoundingClientRect(),
          n = ["Left", "Right"].map(function(t) {
            return parseFloat(e["border" + t + "Width"]) + parseFloat(e["padding" + t])
          }),
          i = ["Top", "Bottom"].map(function(t) {
            return parseFloat(e["border" + t + "Width"]) + parseFloat(e["padding" + t])
          }),
          o = this.$.textarea;
        o.style.width = t.width - n[0] - n[1] + "px", o.style.height = t.height - i[0] - i[1] + "px", o.style.fontWeight = e.fontWeight, o.style.fontSize = e.fontSize || "16px", o.style.color = e.color, this.$.compute.style.fontSize = e.fontSize || "16px", this.$.compute.style.width = o.style.width, this.$.placeholder.style.width = o.style.width, this.$.placeholder.style.height = o.style.height, this.disabled ? o.setAttribute("disabled", !0) : o.removeAttribute("disabled"), this.$$.style.display = this.hidden ? "none" : ""
      },
      getCurrentRows: function(e) {
        var t = window.getComputedStyle(this.$.compute),
          n = 1.2 * (parseFloat(t.fontSize) || 16);
        return this.$.compute.innerText = e, this.$.compute.appendChild(document.createElement("br")), {
          height: Math.max(this.$.compute.scrollHeight, n),
          heightRpx: this.__scale * this.$.compute.scrollHeight,
          lineHeight: n,
          lineCount: Math.ceil(this.$.compute.scrollHeight / n)
        }
      },
      onTextAreaInput: function(e) {
        this.value = e.target.value
      },
      onTextAreaFocus: function(e) {
        this.triggerEvent("focus", {
          value: this.value
        })
      },
      onTextAreaBlur: function(e) {
        this.triggerEvent("blur", {
          value: this.value
        })
      },
      updateTextArea: function() {
        this.getComputedStyle()
      },
      hiddenChanged: function(e, t) {
        this.$$.style.display = e ? "none" : ""
      },
      _getPlaceholderStyle: function(e) {
        var t = ["position:absolute"],
          n = ["font-size", "font-weight", "color"];
        try {
          var i = e.split(";");
          for (var o in i) {
            var r = i[o].split(":");
            n.indexOf(r[0].trim()) >= 0 && t.push(r.join(":"))
          }
        } catch (e) {
          t = []
        }
        return t.join(";")
      },
      defaultValueChange: function(e) {
        return this.maxlength > 0 && e.length > this.maxlength && (e = e.slice(0, this.maxlength)), this.checkPlaceholderStyle(e), this.$.textarea.value = e, this.__attached && this.checkRows(e), e
      },
      checkRows: function(e) {
        var t = this.getCurrentRows(e);
        if (this.lastRows != t.lineCount) {
          if (this.lastRows = t.lineCount, this.autoHeight) {
            var n = t.height < t.lineHeight ? t.lineHeight : t.height;
            this.$$.style.height = n + "px", this.getComputedStyle()
          }
          this.triggerEvent("linechange", t)
        }
      },
      checkPlaceholderStyle: function(e) {
        this.$.placeholder.style.display = e ? "none" : ""
      },
      _getPlaceholderClass: function(e) {
        return "textarea-placeholder " + e
      },
      maxlengthChanged: function(e) {
        this.value.length > e && (this.value = this.value.slice(e))
      }
    })
  }(),
  function() {
    /wechatdevtools/.test(window.navigator.userAgent.toLowerCase()) || window.exparser.registerElement({
      is: "wx-textarea",
      behaviors: ["wx-base", "wx-native", "wx-data-component"],
      template: '<div id="textarea" >\n          <p id="placeholder" class$="{{_getPlaceholderClass(placeholderClass)}}" style$="{{_getPlaceholderStyle(placeholderStyle)}}"></p>\n        </div>',
      properties: {
        value: {
          type: String,
          value: "",
          coerce: "defaultValueChange",
          public: !0
        },
        maxlength: {
          type: Number,
          value: 140,
          public: !0
        },
        placeholder: {
          type: String,
          value: "",
          public: !0
        },
        disabled: {
          type: Boolean,
          value: !1,
          public: !0
        },
        hidden: {
          type: Boolean,
          value: !1,
          public: !0,
          observer: "hiddenChanged"
        },
        focus: {
          type: Boolean,
          value: !1,
          public: !0,
          observer: "focusChanged"
        },
        autoFocus: {
          type: Boolean,
          value: !1,
          public: !0
        },
        placeholderStyle: {
          type: String,
          value: "",
          public: !0
        },
        placeholderClass: {
          type: String,
          value: "textarea-placeholder",
          public: !0
        },
        autoHeight: {
          type: Boolean,
          value: !1,
          public: !0
        },
        confirm: {
          type: Boolean,
          value: !0,
          public: !0
        }
      },
      resetFormData: function() {
        this._keyboardShow && (this.__formResetCallback = !0, wx.hideKeyboard()), this.value = ""
      },
      getFormData: function(e) {
        this._keyboardShow ? this.__formCallback = e : "function" == typeof e && e(this.value)
      },
      attached: function() {
        var e = this;
        this._isReady = !1, this.__scale = 750 / window.innerWidth, this.insertTextArea(), document.addEventListener("pageReRender", this.reRenderCallback.bind(this)), this.__onKeyboardShowId = exparser.addListenerToElement(document, "onKeyboardShow", this.onKeyboardShow.bind(this)), this.__onKeyboardCompleteId = exparser.addListenerToElement(document, "onKeyboardComplete", this.onKeyboardComplete.bind(this)), this.__onTextAreaHeightChangeId = exparser.addListenerToElement(document, "onTextAreaHeightChange", this.onTextAreaHeightChange.bind(this)), this.__routeDoneId = exparser.addListenerToElement(document, "routeDone", function() {
          e.couldFocus(e.autoFocus)
        })
      },
      detached: function() {
        document.removeEventListener("pageReRender", this.reRenderCallback.bind(this)), exparser.removeListenerFromElement(document, "onKeyboardShow", this.__onKeyboardShowId), exparser.removeListenerFromElement(document, "onKeyboardComplete", this.__onKeyboardCompleteId), exparser.removeListenerFromElement(document, "onTextAreaHeightChange", this.__onTextAreaHeightChangeId), exparser.removeListenerFromElement(document, "routeDone", this.__routeDoneId), WeixinJSBridge.invoke("removeTextArea", {
          inputId: this._inputId
        }, function(e) {})
      },
      couldFocus: function(e) {
        this._isReady && window.__onAppRouteDone && !this.disabled && e && WeixinJSBridge.invoke("showKeyboard", {
          inputId: this._inputId
        }, function(e) {})
      },
      focusChanged: function(e) {
        this.couldFocus(e)
      },
      onKeyboardShow: function(e) {
        e.detail.inputId === this._inputId && (this._keyboardShow = !0, this.triggerEvent("focus", {
          value: this.value
        }))
      },
      onKeyboardComplete: function(e) {
        e.detail.inputId === this._inputId && (this.textAreaValue = e.detail.value, this.value = e.detail.value, this.__formResetCallback && (this.value = "", this.__formResetCallback = void 0), "function" == typeof this.__formCallback && this.__formCallback(this.value), this.triggerEvent("blur", {
          value: this.value
        }), this.resetInputState())
      },
      onTextAreaHeightChange: function(e) {
        e.detail.inputId === this._inputId && (this.triggerEvent("linechange", {
          lineCount: e.detail.lineCount,
          height: e.detail.height,
          heightRpx: e.detail.height * this.__scale
        }), this.autoHeight && (this.styleHeight = e.detail.height + this.invalidHeight, this.$$.style.height = this.styleHeight + "px", document.dispatchEvent(new CustomEvent("pageReRender", {}))))
      },
      getHexColor: function(e) {
        if (e.indexOf("#") >= 0) return e;
        var t = e.match(/\d+/g),
          n = [];
        if (t.map(function(e, t) {
            if (t < 3) {
              var i = parseInt(e);
              i = i > 9 ? i.toString(16) : "0" + i, n.push(i)
            }
          }), t.length > 3) {
          var i = parseFloat(t.slice(3).join("."));
          0 == i ? n.push("00") : i >= 1 ? n.push("ff") : (i = parseInt(255 * i), i = i > 9 ? i.toString(16) : "0" + i, n.push(i))
        }
        return "#" + n.join("")
      },
      getComputedStyle: function() {
        var e = window.getComputedStyle(this.$$),
          t = this.$$.getBoundingClientRect(),
          n = ["Left", "Right"].map(function(t) {
            return parseFloat(e["border" + t + "Width"]) + parseFloat(e["padding" + t])
          }),
          i = ["Top", "Bottom"].map(function(t) {
            return parseFloat(e["border" + t + "Width"]) + parseFloat(e["padding" + t])
          }),
          o = parseInt(e.fontWeight);
        isNaN(o) ? o = e.fontWeight : o < 500 ? o = "normal" : o >= 500 && (o = "bold"), this.invalidHeight = i[0] + i[1], this.invalidWidth = n[0] + n[1];
        var r = {
          width: t.width - this.invalidWidth,
          left: t.left + n[0] + window.scrollX,
          top: t.top + i[0] + window.scrollY,
          fontWeight: o,
          fontSize: parseFloat(e.fontSize) || 14,
          color: this.getHexColor(e.color),
          marginBottom: parseFloat(e.marginBottom)
        };
        return this.autoHeight || (r.height = t.height - this.invalidHeight), r
      },
      getPlaceholderStyle: function() {
        var e = this.$.placeholder,
          t = window.getComputedStyle(e),
          n = parseInt(t.fontWeight);
        return isNaN(n) ? n = t.fontWeight : n < 500 ? n = "normal" : n >= 500 && (n = "bold"), this.placeholderStyle && this.placeholderStyle.split(";"), {
          fontSize: parseFloat(t.fontSize) || 16,
          fontWeight: n,
          color: this.getHexColor(t.color)
        }
      },
      insertTextArea: function() {
        var e = this;
        this.args = {
          style: this.getComputedStyle(),
          placeholderStyle: this.getPlaceholderStyle(),
          maxLength: this.maxlength,
          value: this.value,
          placeholder: this.placeholder,
          hidden: this.hidden,
          disabled: this.disabled,
          autoSize: this.autoHeight,
          confirm: this.confirm
        }, WeixinJSBridge.invoke("insertTextArea", this.args, function(t) {
          if (/:ok/.test(t.errMsg)) {
            if (e._ready(), e._inputId = t.inputId, e.couldFocus(e.autoFocus), e._isiOS() && (e.triggerEvent("linechange", {
                lineCount: t.lineCount,
                height: t.height,
                heightRpx: t.height * e.__scale
              }), e.autoHeight && (e.styleHeight = t.height + e.invalidHeight, e.$$.style.height = e.styleHeight + "px", document.dispatchEvent(new CustomEvent("pageReRender", {}))), e._needUpdate)) {
              var n = {
                style: e.getComputedStyle(),
                placeholderStyle: e.getPlaceholderStyle(),
                maxLength: e.maxlength,
                value: e.value,
                placeholder: e.placeholder,
                hidden: e.hidden,
                disabled: e.disabled,
                autoSize: e.autoHeight,
                confirm: e.confirm
              };
              e.updateTextArea(n)
            }
          } else console.error(t.errMsg)
        })
      },
      diff: function e(t, n) {
        var e = {},
          i = !1;
        for (var o in n) "[object String]" === Object.prototype.toString.call(n[o]) ? t[o] != n[o] && (e[o] = n[o], i = !0) : "[object Object]" === Object.prototype.toString.call(n[o]) && JSON.stringify(n[o]) != JSON.stringify(t[o]) && (e[o] = n[o], i = !0);
        return i ? e : void 0
      },
      reRenderCallback: function() {
        var e = {
          style: this.getComputedStyle(),
          placeholderStyle: this.getPlaceholderStyle(),
          maxLength: this.maxlength,
          placeholder: this.placeholder,
          disabled: this.disabled,
          hidden: this.hidden,
          autoSize: this.autoHeight,
          confirm: this.confirm
        };
        this.updateTextArea(e)
      },
      updateTextArea: function(e) {
        var t = this;
        if (!this._isReady) return void(this._needUpdate = !0);
        this.autoHeight && this.styleHeight && (this.$$.style.height = this.styleHeight + "px");
        var n = this.diff(this.args, e);
        n && (n.inputId = this._inputId, WeixinJSBridge.invoke("updateTextArea", n, function(n) {
          /:ok/.test(n.errMsg) && (t.args = e)
        }))
      },
      resetInputState: function() {
        this._keyboardShow = !1
      },
      hiddenChanged: function(e) {
        this.$$.style.display = e ? "none" : ""
      },
      _getPlaceholderStyle: function(e) {
        return e + ";display:none;"
      },
      _getPlaceholderClass: function(e) {
        return "textarea-placeholder " + e
      },
      defaultValueChange: function(e, t) {
        return this.maxlength > 0 && e.length > this.maxlength && (e = e.slice(0, this.maxlength)), this.textAreaValue != e && this.updateTextArea({
          value: e
        }), e
      }
    })
  }(), window.exparser.registerElement({
    is: "wx-toast",
    template: '\n    <div class="wx-toast-mask" id="mask" style$="{{_getMaskStyle(mask)}}"></div>\n    <div class="wx-toast">\n      <i class$="wx-toast-icon wx-icon-{{icon}}" style.color="#FFFFFF" style.font-size="55px" style.display="block"></i>\n      <p class="wx-toast-content"><slot></slot></p>\n    </div>\n  ',
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
          })
        }, this.duration)
      }
    }
  });
var _slicedToArray = function() {
    function e(e, t) {
      var n = [],
        i = !0,
        o = !1,
        r = void 0;
      try {
        for (var a, s = e[Symbol.iterator](); !(i = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); i = !0);
      } catch (e) {
        o = !0, r = e
      } finally {
        try {
          !i && s.return && s.return()
        } finally {
          if (o) throw r
        }
      }
      return n
    }
    return function(t, n) {
      if (Array.isArray(t)) return t;
      if (Symbol.iterator in Object(t)) return e(t, n);
      throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }
  }(),
  _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e
  } : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
  };
window.exparser.registerElement({
  is: "wx-video",
  behaviors: ["wx-base", "wx-player", "wx-native"],
  template: '<div class="wx-video-container">\n    <video id="player" webkit-playsinline style="display: none;"></video>\n    <div id="default" class$="wx-video-bar {{_barType}}" style="display: none;">\n      <div id="controls" class="wx-video-controls">\n        <div id="button" class$="wx-video-button {{_buttonType}}"></div>\n        <div class="wx-video-time" parse-text-content>{{_currentTime}}</div>\n        <div id="progress" class="wx-video-progress">\n          <div id="ball" class="wx-video-ball" style$="left: {{_progressLeft}}px;">\n            <div class="wx-video-inner"></div>\n          </div>\n          <div class="wx-video-inner" style$="width: {{_progressLength}}px;"></div>\n        </div>\n        <div class="wx-video-time" parse-text-content>{{_duration}}</div>\n      </div>\n      <div id="danmuBtn" class$="wx-video-danmu-btn {{_danmuStatus}}" style="display: none">弹幕</div>\n      <div id="fullscreen" class="wx-video-fullscreen"></div>\n    </div>\n    <div id="danmu" class="wx-video-danmu" style="z-index: -9999">\n    </div>\n  </div>\n  <div id="fakebutton"></div>',
  properties: {
    autoplay: {
      type: Boolean,
      value: !1,
      public: !0
    },
    danmuBtn: {
      type: Boolean,
      value: !1,
      public: !0,
      observer: "danmuBtnChanged"
    },
    enableDanmu: {
      type: Boolean,
      value: !1,
      observer: "enableDanmuChanged",
      public: !0
    },
    enableFullScreen: {
      type: Boolean,
      value: !1,
      public: !0
    },
    controls: {
      type: Boolean,
      value: !0,
      public: !0,
      observer: "controlsChanged"
    },
    danmuList: {
      type: Array,
      value: [],
      public: !0
    },
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
    },
    _barType: {
      type: String,
      value: "full"
    },
    _danmuStatus: {
      type: String,
      value: ""
    }
  },
  listeners: {
    "ball.touchstart": "onBallTouchStart"
  },
  _reset: function() {
    this._buttonType = "play", this._currentTime = "00:00", this._duration = "00:00", this._progressLeft = -22, this._progressLength = 0, this._barType = this.controls ? "full" : "part"
  },
  _update: function(e, t) {
    var n = this;
    e.videoPlayerId = this._videoId, e.hide = this.hidden, WeixinJSBridge.invoke("updateVideoPlayer", e, function(e) {
      /ok/.test(e.errMsg) || n._publish("error", {
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
    this._isiOS() ? (this.$$.style.display = e ? "none" : "", this._update({
      hide: e
    }, e ? "隐藏" : "显示")) : (this.$.player.pause(), this.$$.style.display = e ? "none" : "")
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
      if (this._isiOS()) /wxfile:\/\//.test(e) || /http:\/\//.test(e) || /https:\/\//.test(e) ? this._update({
        filePath: e
      }, "资源") : this._publish("error", {
        errMsg: "MEDIA_ERR_SRC_NOT_SUPPORTED"
      });
      else if (this._isDevTools()) {
        this.$.player.src = e.replace("wxfile://", "");
        var n = this;
        setTimeout(function() {
          n._reset()
        }, 0)
      } else {
        this.$.player.src = e;
        var n = this;
        setTimeout(function() {
          n._reset()
        }, 0)
      }
    }
  },
  controlsChanged: function(e, t) {
    this.$.controls.style.display = e ? "flex" : "none"
  },
  danmuBtnChanged: function(e, t) {
    this.$.danmuBtn.style.display = e ? "" : "none"
  },
  enableDanmuChanged: function(e, t) {
    this._danmuStatus = e ? "active" : "", this.$.danmu.style.zIndex = e ? "0" : "-9999"
  },
  actionChanged: function(e, t) {
    if (this._isiOS());
    else {
      if ("object" !== ("undefined" == typeof e ? "undefined" : _typeof(e))) return;
      var n = e.method,
        i = e.data;
      if (console.log("video action: " + n), "play" === n) this.$.player.play();
      else if ("pause" === n) this.$.player.pause();
      else if ("seek" === n) this.$.player.currentTime = i[0], this._resetDanmu();
      else if ("sendDanmu" === n) {
        var o = _slicedToArray(i, 2),
          r = o[0],
          a = o[1],
          s = parseInt(this.$.player.currentTime);
        this.danmuObject[s] ? this.danmuObject[s].push({
          text: r,
          color: a,
          time: s
        }) : this.danmuObject[s] = [{
          text: r,
          color: a,
          time: s
        }]
      }
    }
  },
  onPlay: function(e) {
    var t = this,
      n = document.querySelectorAll(".wx-video-danmu-item");
    Array.prototype.forEach.apply(n, [function(e) {
      var n = 3 * (parseInt(getComputedStyle(e).left) + e.offsetWidth) / (e.offsetWidth + t.$$.offsetWidth);
      e.style.left = "-" + e.offsetWidth + "px", e.style.transitionDuration = n + "s", e.style.webkitTransitionDuration = n + "s"
    }])
  },
  onPause: function(e) {
    var t = document.querySelectorAll(".wx-video-danmu-item");
    Array.prototype.forEach.apply(t, [function(e) {
      e.style.left = getComputedStyle(e).left
    }])
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
  _sendDanmu: function(e) {
    if (this.playing && !e.flag) {
      e.flag = !0;
      var t = document.createElement("p");
      t.className += "wx-video-danmu-item", t.textContent = e.text, t.style.top = this._genDanmuPosition() + "%", t.style.color = e.color, this.$.danmu.appendChild(t), t.style.left = "-" + t.offsetWidth + "px"
    }
  },
  _genDanmuPosition: function() {
    if (this.lastDanmuPosition) {
      var e = 100 * Math.random();
      Math.abs(e - this.lastDanmuPosition) < 10 ? this.lastDanmuPosition = (this.lastDanmuPosition + 50) % 100 : this.lastDanmuPosition = e
    } else this.lastDanmuPosition = 100 * Math.random();
    return this.lastDanmuPosition
  },
  attached: function() {
    var e = this,
      t = this;
    this._isiOS() ? (this._box = this._getBox(), WeixinJSBridge.invoke("insertVideoPlayer", {
      position: this._box,
      hide: this.hidden,
      enableDanmu: this.enableDanmu,
      showDanmuBtn: this.danmuBtn,
      showBasicControls: this.controls,
      autoplay: this.autoplay,
      danmuList: this.danmuList
    }, function(e) {
      /ok/.test(e.errMsg) ? (t._videoId = e.videoPlayerId, t._ready(), document.addEventListener("pageReRender", t._pageReRenderCallback.bind(t)), WeixinJSBridge.publish("videoPlayerInsert", {
        domId: t.id,
        videoPlayerId: e.videoPlayerId
      })) : (t._isError = !0, t.$$.style.display = "none", t._publish("error", {
        errMsg: e.errMsg
      }))
    })) : (WeixinJSBridge.publish("videoPlayerInsert", {
      domId: this.id,
      videoPlayerId: 0
    }), this.$.default.style.display = "", this.$.player.style.display = "", this.$.player.autoplay = this.autoplay, this.danmuObject = this.danmuList.reduce(function(e, t) {
      return "number" == typeof t.time && t.time >= 0 && "string" == typeof t.text && t.text.length > 0 && (e[t.time] ? e[t.time].push({
        text: t.text,
        color: t.color || "#ffffff"
      }) : e[t.time] = [{
        text: t.text,
        color: t.color || "#ffffff"
      }]), e
    }, {}), this.$.player.addEventListener("timeupdate", function(e) {
      e.stopPropagation();
      var n = t.$.player.currentTime / t.$.player.duration;
      t._isLockTimeUpdateProgress || t._setProgress(n);
      var i = t.danmuObject[parseInt(t.$.player.currentTime)];
      void 0 !== i && i.length > 0 && i.forEach(function(e) {
        t._sendDanmu(e)
      })
    }), this.$.button.onclick = function(e) {
      e.stopPropagation(), t.$.player[t._buttonType]()
    }, this.$.progress.onclick = function(e) {
      e.stopPropagation();
      var n = t._computeRate(e.clientX);
      t.$.player.currentTime = t.$.player.duration * n, t._resetDanmu()
    }, this.$.fullscreen.onclick = function(e) {
      e.stopPropagation(), t.enableFullScreen = !t.enableFullScreen, t.enableFullScreen && t.$.player.webkitEnterFullscreen(), t.triggerEvent("togglefullscreen", {
        enable: t.enableFullScreen
      })
    }, this.$.danmuBtn.onclick = function(e) {
      e.stopPropagation(), t.enableDanmu = !t.enableDanmu, t.triggerEvent("toggledanmu", {
        enable: t.enableDanmu
      })
    }, this._ready(), document.addEventListener("pageReRender", this._pageReRenderCallback.bind(this))), WeixinJSBridge.subscribe("video_" + this.id + "_actionChanged", function(t) {
      e.action = t, e.actionChanged(t)
    })
  },
  detached: function() {
    this._isiOS() && wx.removeVideoPlayer({
      videoPLayerId: this._videoId,
      success: function(e) {}
    })
  },
  onBallTouchStart: function() {
    var e = this;
    e._isLockTimeUpdateProgress = !0;
    var t = function(t) {
        t.stopPropagation(), t.preventDefault(), e._rate = e._computeRate(t.touches[0].clientX), e._setProgress(e._rate)
      },
      n = function n(i) {
        e.$.player.currentTime = e.$.player.duration * e._rate, document.removeEventListener("touchmove", t), document.removeEventListener("touchend", n), e._isLockTimeUpdateProgress = !1, e._resetDanmu()
      };
    document.addEventListener("touchmove", t), document.addEventListener("touchend", n)
  },
  _resetDanmu: function() {
    var e = this;
    this.$.danmu.innerHTML = "", Object.keys(this.danmuObject).forEach(function(t) {
      e.danmuObject[t].forEach(function(e) {
        e.flag = !1
      })
    })
  }
}), window.exparser.registerElement({
  is: "wx-view",
  template: "<slot></slot>",
  behaviors: ["wx-base"],
  properties: {
    inline: {
      type: Boolean,
      public: !0
    }
  }
});
var __viewEngine__ = function(e) {
    function t(i) {
      if (n[i]) return n[i].exports;
      var o = n[i] = {
        exports: {},
        id: i,
        loaded: !1
      };
      return e[i].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
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

    function o(e, t, n) {
      if ("reRenderTime" === e) {
        var i = Date.now();
        if (i - t <= 200) return
      }
      var o = _[e];
      o && (Reporter.reportKeyValue({
        key: "Speed",
        value: o + "," + t + ",0,0," + n
      }), Reporter.log("VirtualDom SpeedReport:" + e + ",startTime:" + t + ",endTime:" + n + ",cost:" + (n - t)))
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.reset = t.getVirtualTree = t.createVirtualTree = t.createText = t.createElement = t.setCssToHead = void 0;
    var r = n(1);
    Object.defineProperty(t, "setCssToHead", {
      enumerable: !0,
      get: function() {
        return r.setCssToHead
      }
    });
    var a = n(4),
      s = i(a),
      l = n(12),
      c = i(l),
      d = n(13),
      u = i(d),
      h = n(15),
      p = n(3),
      g = n(16);
    (0, r.init)();
    var f = "__DOMReady",
      A = t.createElement = function(e, t, n, i, o) {
        return new s.default(e, t, n, i, o)
      },
      v = t.createText = function(e) {
        return new c.default(e)
      },
      b = t.createVirtualTree = function e(t, n) {
        if ((0, p.isString)(t) || Number(t) === t && Number(t) % 1 === 0) return v(String(t), n);
        var i = [];
        return t.children.forEach(function(t) {
          i.push(e(t, n))
        }), A(t.tag, t.attr, t.wxKey, i, n)
      },
      m = t.getVirtualTree = function(e, t) {
        var n = window.__generateFunc__(e);
        return n.tag = "body", b(n, t)
      },
      w = void 0,
      y = void 0,
      x = {};
    t.reset = function() {
      w = void 0, y = void 0, x = {}
    };
    window.onerror = function(e, t, n, i, o) {
      console.error(o.stack), Reporter.errorReport({
        key: "webviewScriptError",
        error: o
      })
    };
    var _ = {
        funcReady: 3,
        firstGetData: 4,
        firstRenderTime: 5,
        reRenderTime: 6,
        forceUpdateRenderTime: 7
      },
      C = {
        webviewStartTime: Date.now(),
        funcReady: 0,
        renderStart: 0
      },
      k = function(e) {
        e.ext && ("undefined" != typeof e.ext.webviewId && (window.__webviewId__ = e.ext.webviewId), "undefined" != typeof e.ext.downloadDomain && (window.__downloadDomain__ = e.ext.downloadDomain), e.ext.enablePullUpRefresh && (window.__enablePullUpRefresh__ = !0)), w = m(u.default.getData(e.data), !0), y = w.render(), exparser.Element.replaceDocumentElement(y, document.body), setTimeout(function() {
          wx.publishPageEvent(f, {}), wx.initReady(), (0, g.enablePullUpRefresh)()
        }, 0)
      },
      E = function(e) {
        var t = void 0;
        t = e.options && "action" === e.options.type ? m(u.default.getActionData(e.data), !1) : m(u.default.getData(e.data), !1);
        var n = w.diff(t);
        n.apply(y), w = t
      };
    document.addEventListener("generateFuncReady", function(e) {
      C.funcReady = Date.now(), o("funcReady", C.webviewStartTime, C.funcReady), window.__generateFunc__ = e.detail.generateFunc, wx.onAppDataChange && window.__generateFunc__ && wx.onAppDataChange((0, h.catchError)(function(e) {
        C.renderStart = Date.now(), e.options && e.options.firstRender ? (o("firstGetData", C.funcReady, C.renderStart), k(e), o("firstRenderTime", C.renderStart, Date.now())) : (E(e), document.dispatchEvent(new CustomEvent("pageReRender", {})), o("reRenderTime", C.renderStart, Date.now()))
      }))
    })
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.setCssToHead = t.init = void 0;
    var i = n(2),
      o = n(3),
      r = function() {
        document.addEventListener("DOMContentLoaded", function() {
          var e = window.innerWidth > 0 ? window.innerWidth : screen.width;
          document.documentElement.style.fontSize = e / i.RPX_RATE + "px"
        }, 1e3)
      };
    t.init = function() {
      window.__webview_engine_version__ = .01, r()
    }, t.setCssToHead = function(e) {
      e = (0, o.transformRpx)(e);
      var t = document.createElement("style"),
        n = document.head || document.getElementsByTagName("head")[0];
      t.type = "text/css", t.styleSheet ? t.styleSheet.cssText = e : t.appendChild(document.createTextNode(e)), n.appendChild(t)
    }
  }, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    t.PATCH_TYPE = {
      NONE: 0,
      TEXT: 1,
      VNODE: 2,
      PROPS: 3,
      REORDER: 4,
      INSERT: 5,
      REMOVE: 6
    }, t.WX_KEY = "wxKey", t.ATTRIBUTE_NAME = ["class", "style"], t.RPX_RATE = 20, t.BASE_DEVICE_WIDTH = 750, t.INLINE_STYLE = ["placeholderStyle", "hoverStyle"]
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.getPageConfig = t.getDataType = t.uuid = t.transformRpx = t.getPrototype = t.isArray = t.isString = t.isUndefined = t.isVirtualText = t.isVirtualNode = t.isEmptyObject = t.isObject = void 0;
    var i = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
        }
        return e
      },
      o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
      },
      r = n(2),
      a = (t.isObject = function(e) {
        return "object" === ("undefined" == typeof e ? "undefined" : o(e)) && null !== e
      }, t.isEmptyObject = function(e) {
        for (var t in e) return !1;
        return !0
      }, t.isVirtualNode = function(e) {
        return e && "WxVirtualNode" === e.type
      }, t.isVirtualText = function(e) {
        return e && "WxVirtualText" === e.type
      }, t.isUndefined = function(e) {
        return "[object Undefined]" === Object.prototype.toString.call(e)
      }, t.isString = function(e) {
        return "[object String]" === Object.prototype.toString.call(e)
      }),
      s = (t.isArray = function(e) {
        return Array.isArray ? Array.isArray(e) : "[object Array]" === Object.prototype.toString.call(e)
      }, t.getPrototype = function(e) {
        return Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__ ? e.__proto__ : e.constructor ? e.constructor.prototype : void 0
      }, window.screen.width || 375),
      l = window.devicePixelRatio || 2,
      c = 1e-4,
      d = function(e) {
        return e = e / r.BASE_DEVICE_WIDTH * s, e = Math.floor(e + c), 0 === e ? 1 === l ? 1 : .5 : e
      },
      u = function(e) {
        for (var t = 0, n = 1, i = !1, o = !1, r = 0; r < e.length; ++r) {
          var a = e[r];
          a >= "0" && a <= "9" ? i ? (n *= .1, t += (a - "0") * n) : t = 10 * t + (a - "0") : "." === a ? i = !0 : "-" === a && (o = !0)
        }
        return o && (t = -t), d(t)
      },
      h = /%%\?[+-]?\d+(\.\d+)?rpx\?%%/g,
      p = /(:|\s)[+-]?\d+(\.\d+)?rpx/g;
    t.transformRpx = function(e, t) {
      if (!a(e)) return e;
      var n = void 0;
      return n = t ? e.match(p) : e.match(h), n && n.forEach(function(n) {
        var i = u(n),
          o = (t ? n[0] : "") + i + "px";
        e = e.replace(n, o)
      }), e
    }, t.uuid = function() {
      var e = function() {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
      };
      return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
    }, t.getDataType = function(e) {
      return Object.prototype.toString.call(e).split(" ")[1].split("]")[0]
    }, t.getPageConfig = function() {
      var e = {};
      if (window.__wxConfig && window.__wxConfig.window) e = window.__wxConfig.window;
      else {
        var t = {};
        window.__wxConfig && window.__wxConfig.global && window.__wxConfig.global.window && (t = window.__wxConfig.global.window);
        var n = {};
        window.__wxConfig && window.__wxConfig.page && window.__wxConfig.page[window.__route__] && window.__wxConfig.page[window.__route__].window && (n = window.__wxConfig.page[window.__route__].window), e = i({}, t, n)
      }
      return e
    }
  }, function(e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }

    function o(e, t) {
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
      a = n(3),
      s = n(5),
      l = n(6),
      c = n(12),
      d = i(c),
      u = n(10),
      h = i(u),
      p = (n(2), function() {
        function e(t, n, i, r, s) {
          o(this, e), this.tagName = t || "div", this.props = n || {}, this.children = r || [], s && h.default.add(this), (0, a.isUndefined)(i) ? this.wxKey = void 0 : this.wxKey = String(i), this.descendants = 0;
          for (var l = 0; l < this.children.length; ++l) {
            var c = this.children[l];
            (0, a.isVirtualNode)(c) ? this.descendants += c.descendants: (0, a.isString)(c) ? this.children[l] = new d.default(c) : (0, a.isVirtualText)(c) || console.log("invalid child", t, n, r, c), ++this.descendants
          }
        }
        return r(e, [{
          key: "render",
          value: function() {
            var e = "virtual" !== this.tagName ? exparser.createElement(this.tagName) : exparser.VirtualNode.create("virtual");
            return (0, s.applyProperties)(e, this.props), this.children.forEach(function(t) {
              var n = t.render();
              e.appendChild(n)
            }), e
          }
        }, {
          key: "diff",
          value: function(e) {
            return (0, l.diff)(this, e)
          }
        }]), e
      }());
    p.prototype.type = "WxVirtualNode", t.default = p
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
      o = n(3),
      r = n(2),
      a = /^data-/,
      s = function(e) {
        return {
          id: e.id,
          offsetLeft: e.$$.offsetLeft,
          offsetTop: e.$$.offsetTop,
          dataset: e.$$.dataset
        }
      },
      l = function(e) {
        if (e) {
          for (var t = [], n = 0; n < e.length; n++) {
            var i = e[n];
            t.push({
              identifier: i.identifier,
              pageX: i.pageX,
              pageY: i.pageY,
              clientX: i.clientX,
              clientY: i.clientY
            })
          }
          return t
        }
      },
      c = function(e, t, n, i) {
        e.__wxEventHandleName || (e.__wxEventHandleName = Object.create(null)), void 0 === e.__wxEventHandleName[t] && e.addListener(t, function(n) {
          if (e.__wxEventHandleName[t]) return window.wx.publishPageEvent(e.__wxEventHandleName[t], {
            type: n.type,
            timeStamp: n.timeStamp,
            target: s(n.target),
            currentTarget: s(this),
            detail: n.detail,
            touches: l(n.touches),
            changedTouches: l(n.changedTouches)
          }), !i && void 0
        }), e.__wxEventHandleName[t] = n
      },
      d = (t.applyProperties = function(e, t) {
        for (var n in t) {
          var s = t[n],
            l = exparser.Component.hasProperty(e, n);
          void 0 === s ? d(e, n) : l ? r.INLINE_STYLE.indexOf(n) !== -1 ? e[n] = (0, o.transformRpx)(s, !0) : e[n] = s : "bind" === n.slice(0, 4) ? c(e, n.slice(4), s) : "catch" === n.slice(0, 5) ? c(e, n.slice(5), s, !0) : "on" === n.slice(0, 2) ? c(e, n.slice(2), s) : r.ATTRIBUTE_NAME.indexOf(n) !== -1 || a.test(n) ? "style" === n ? e.$$.setAttribute(n, (0, o.transformRpx)(s, !0)) : e.$$.setAttribute(n, s) : "animation" === n && "object" === ("undefined" == typeof s ? "undefined" : i(s)) && s.actions && s.actions.length > 0 && ! function() {
            var t = function() {
                if (n < r) {
                  var t = wx.animationToStyle(i[n]),
                    a = t.transition,
                    s = t.transform,
                    l = t.transformOrigin,
                    c = t.style;
                  e.$$.style.transition = a, e.$$.style.transform = s, e.$$.style.transformOrigin = l, e.$$.style.webkitTransition = a, e.$$.style.webkitTransform = s, e.$$.style.webkitTransformOrigin = l;
                  for (var d in c) e.$$.style[d] = (0, o.transformRpx)(" " + c[d], !0)
                }
              },
              n = 0,
              i = s.actions,
              r = s.actions.length;
            e.addListener("transitionend", function() {
              n += 1, t()
            }), t()
          }()
        }
      }, t.removeProperty = function(e, t) {
        var n = exparser.Component.hasProperty(e, t);
        n ? e[t] = void 0 : "bind" === t.slice(0, 4) ? c(e, t.slice(4), "") : "catch" === t.slice(0, 5) ? c(e, t.slice(5), "", !0) : "on" === t.slice(0, 2) ? c(e, t.slice(2), "") : (r.ATTRIBUTE_NAME.indexOf(t) !== -1 || a.test(t)) && e.$$.removeAttribute(t)
      })
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
    var o = n(7),
      r = i(o),
      a = n(8),
      s = i(a),
      l = n(10),
      c = i(l),
      d = n(3),
      u = n(11),
      h = n(2),
      p = (t.diff = function(e, t) {
        c.default.reset();
        var n = {};
        return p(e, t, n, 0), new s.default(e, n)
      }, t.diffNode = function(e, t, n, i) {
        if (e !== t) {
          var o = n[i];
          if (null == t) o = A(o, new r.default(h.PATCH_TYPE.REMOVE, e));
          else if ((0, d.isVirtualNode)(t))
            if ((0, d.isVirtualNode)(e))
              if (e.tagName === t.tagName && e.wxKey === t.wxKey) {
                c.default.switch(e, t);
                var a = f(e.props, t.props);
                a && (o = A(o, new r.default(h.PATCH_TYPE.PROPS, e, a))), o = g(e, t, n, o, i)
              } else c.default.add(t), o = A(o, new r.default(h.PATCH_TYPE.VNODE, e, t));
          else c.default.add(t), o = A(o, new r.default(h.PATCH_TYPE.VNODE, e, t));
          else {
            if (!(0, d.isVirtualText)(t)) throw console.log("unknow node type", e, t), {
              message: "unknow node type",
              node: t
            };
            t.text !== e.text && (o = A(o, new r.default(h.PATCH_TYPE.TEXT, e, t)))
          }
          o && (n[i] = o)
        }
      }),
      g = t.diffChildren = function(e, t, n, i, o) {
        for (var a = e.children, s = (0, u.listDiff)(a, t.children), l = s.children, g = a.length > l.length ? a.length : l.length, f = 0; f < g; ++f) {
          var v = a[f],
            b = l[f];
          ++o, v ? p(v, b, n, o) : b && (c.default.add(b), i = A(i, new r.default(h.PATCH_TYPE.INSERT, v, b))), (0, d.isVirtualNode)(v) && (o += v.descendants)
        }
        return s.moves && (i = A(i, new r.default(h.PATCH_TYPE.REORDER, e, s.moves))), i
      },
      f = t.diffProps = function(e, t) {
        var n = {};
        for (var i in e) {
          i in t || (n[i] = void 0);
          var o = e[i],
            r = t[i];
          o !== r && (n[i] = r)
        }
        for (var a in t) a in e || (n[a] = t[a]);
        return (0, d.isEmptyObject)(n) ? void 0 : n
      },
      A = t.appendPatch = function(e, t) {
        return e ? (e.push(t), e) : [t]
      }
  }, function(e, t, n) {
    "use strict";

    function i(e, t) {
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
      r = n(5),
      a = n(2),
      s = function() {
        function e(t, n, o) {
          i(this, e), this.type = Number(t), this.vNode = n, this.patch = o
        }
        return o(e, [{
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
            return (0, r.applyProperties)(e, t, n), e
          }
        }, {
          key: "reorderChildren",
          value: function(e, t) {
            var n = t.removes,
              i = t.inserts,
              o = e.childNodes,
              r = {};
            return n.forEach(function(t) {
              var n = o[t.index];
              t.key && (r[t.key] = n), e.removeChild(n)
            }), i.forEach(function(t) {
              var n = r[t.key];
              e.insertBefore(n, o[t.index])
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
      r = n(9),
      a = function() {
        function e(t, n) {
          i(this, e), this.oldTree = t, this.patches = n, this.patchIndexes = Object.keys(this.patches).map(function(e) {
            return Number(e)
          })
        }
        return o(e, [{
          key: "apply",
          value: function(e) {
            var t = this;
            if (0 === this.patchIndexes.length) return e;
            var n = (0, r.getDomIndex)(e, this.oldTree, this.patchIndexes);
            return this.patchIndexes.forEach(function(e) {
              var i = n[e];
              if (i) {
                var o = t.patches[e];
                o.forEach(function(e) {
                  e.apply(i)
                })
              }
            }), e
          }
        }]), e
      }();
    t.default = a
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
          var o = {};
          return n(e, t, i, o, 0), o
        }
        return {}
      }, t.mapIndexToDom = function e(t, n, o, r, a) {
        if (t) {
          i(o, a, a) && (r[a] = t);
          var s = n.children;
          if (s)
            for (var l = t.childNodes, c = 0; c < s.length; ++c) {
              var d = s[c];
              ++a;
              var u = a + (d.descendants || 0);
              i(o, a, u) && e(l[c], d, o, r, a), a = u
            }
        }
      }),
      i = t.oneOfIndexesInRange = function(e, t, n) {
        for (var i = 0, o = e.length - 1; i <= o;) {
          var r = o + i >> 1,
            a = e[r];
          if (a < t) i = r + 1;
          else {
            if (!(a > n)) return !0;
            o = r - 1
          }
        }
        return !1
      }
  }, function(e, t, n) {
    "use strict";

    function i(e, t) {
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
      r = (n(3), function() {
        function e() {
          i(this, e)
        }
        return o(e, null, [{
          key: "add",
          value: function(e) {}
        }, {
          key: "find",
          value: function(e) {}
        }, {
          key: "switch",
          value: function(e, t) {}
        }, {
          key: "reset",
          value: function() {}
        }]), e
      }());
    t.default = r
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.getItemKey = t.makeKeyAndFreeIndexes = t.listDiff = void 0;
    var i = n(3),
      o = (t.listDiff = function(e, t) {
        function n(e, t, n) {
          return e.splice(t, 1), {
            index: t,
            key: n
          }
        }
        var a = o(e),
          s = a.keyIndexes;
        a.freeIndexes;
        if ((0, i.isEmptyObject)(s)) return {
          children: t,
          moves: null
        };
        var l = o(t),
          c = l.keyIndexes,
          d = l.freeIndexes;
        if ((0, i.isEmptyObject)(c)) return {
          children: t,
          moves: null
        };
        for (var u = [], h = 0, p = 0, g = 0; g < e.length; ++g) {
          var f = e[g],
            A = r(f);
          if (A)
            if (c.hasOwnProperty(A)) {
              var v = c[A];
              u.push(t[v])
            } else ++p, u.push(null);
          else if (h < d.length) {
            var b = d[h];
            u.push(t[b]), ++h
          } else ++p, u.push(null)
        }
        for (var m = d[h] || t.length, w = 0; w < t.length; ++w) {
          var y = t[w];
          r(y) ? s.hasOwnProperty(r(y)) || u.push(y) : w >= m && u.push(y)
        }
        for (var x = u.slice(0), _ = 0, C = [], k = [], E = 0; E < t.length;) {
          for (var S = t[E], I = r(S), T = x[_], B = r(T); null === T;) C.push(n(x, _, B)), T = x[_], B = r(T);
          B === I ? (++_, ++E) : I ? (B ? c[B] === E + 1 ? k.push({
            key: I,
            index: E
          }) : (C.push(n(x, _, B)), T = x[_], T && r(T) === I ? ++_ : k.push({
            key: I,
            index: E
          })) : k.push({
            key: I,
            index: E
          }), ++E) : C.push(n(x, _, B))
        }
        for (; _ < x.length;) {
          var D = x[_],
            N = r(D);
          C.push(n(x, _, N))
        }
        return C.length === p && 0 == k.length ? {
          children: u,
          moves: null
        } : {
          children: u,
          moves: {
            removes: C,
            inserts: k
          }
        }
      }, t.makeKeyAndFreeIndexes = function(e) {
        for (var t = {}, n = [], i = 0; i < e.length; ++i) {
          var o = e[i],
            a = r(o);
          a ? t[a] = i : n.push(i)
        }
        return {
          keyIndexes: t,
          freeIndexes: n
        }
      }),
      r = t.getItemKey = function(e) {
        if (e) return e.wxKey
      }
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
      o = function() {
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
    o.prototype.type = "WxVirtualText", t.default = o
  }, function(e, t, n) {
    "use strict";

    function i(e, t) {
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
      r = n(14),
      a = {},
      s = function() {
        function e() {
          i(this, e)
        }
        return o(e, null, [{
          key: "getActionData",
          value: function(e) {
            var t = JSON.parse(JSON.stringify(a));
            for (var n in e) {
              var i = (0, r.parsePath)(n),
                o = (0, r.getObjectByPath)(a, i),
                s = o.obj,
                l = o.key,
                c = (0, r.getObjectByPath)(t, i),
                d = c.obj,
                u = c.key;
              s && delete s[l], d && (d[u] = e[n])
            }
            return t
          }
        }, {
          key: "getData",
          value: function(e) {
            for (var t in e) {
              var n = (0, r.parsePath)(t),
                i = (0, r.getObjectByPath)(a, n),
                o = i.obj,
                s = i.key;
              o && (o[s] = e[t])
            }
            return a
          }
        }]), e
      }();
    t.default = s
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.getObjectByPath = t.parsePath = void 0;
    var i = n(3);
    t.parsePath = function(e) {
      for (var t = e.length, n = [], i = "", o = 0, r = !1, a = !1, s = 0; s < t; s++) {
        var l = e[s];
        if ("\\" === l) s + 1 < t && ("." === e[s + 1] || "[" === e[s + 1] || "]" === e[s + 1]) ? (i += e[s + 1], s++) : i += "\\";
        else if ("." === l) i && (n.push(i), i = "");
        else if ("[" === l) {
          if (i && (n.push(i), i = ""), 0 === n.length) throw new Error("path can not start with []: " + e);
          a = !0, r = !1
        } else if ("]" === l) {
          if (!r) throw new Error("must have number in []: " + e);
          a = !1, n.push(o), o = 0
        } else if (a) {
          if (l < "0" || l > "9") throw new Error("only number 0-9 could inside []: " + e);
          r = !0, o = 10 * o + l.charCodeAt(0) - 48
        } else i += l
      }
      if (i && n.push(i), 0 === n.length) throw new Error("path can not be empty");
      return n
    }, t.getObjectByPath = function(e, t) {
      for (var n = void 0, o = void 0, r = e, a = 0; a < t.length; a++) Number(t[a]) === t[a] && t[a] % 1 === 0 ? Array.isArray(r) || (n[o] = [], r = n[o]) : "Object" !== (0, i.getDataType)(r) && (n[o] = {}, r = n[o]), o = t[a], n = r, r = r[t[a]];
      return {
        obj: n,
        key: o
      }
    }
  }, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    t.catchError = function(e) {
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
    };
    exparser.addGlobalErrorListener(function(e, t) {
      Reporter.errorReport({
        key: "webviewScriptError",
        error: e,
        extend: t.message
      })
    })
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.enablePullUpRefresh = t.triggerPullUpRefresh = t.checkScrollBottom = t.getScrollHeight = t.getWindowHeight = void 0;
    var i = (n(3), 20),
      o = t.getWindowHeight = function() {
        return "CSS1Compat" === document.compatMode ? document.documentElement.clientHeight : document.body.clientHeight
      },
      r = t.getScrollHeight = function() {
        var e = 0,
          t = 0;
        return document.body && (e = document.body.scrollHeight), document.documentElement && (t = document.documentElement.scrollHeight), Math.max(e, t)
      },
      a = 0,
      s = t.checkScrollBottom = function() {
        var e = a - window.scrollY <= 0;
        return a = window.scrollY, !!(window.scrollY + o() + i >= r() && e)
      },
      l = null,
      c = t.triggerPullUpRefresh = function() {
        clearTimeout(l), l = setTimeout(function() {
          wx.publishPageEvent("onReachBottom", {})
        }, 50)
      };
    t.enablePullUpRefresh = function() {
      window.__enablePullUpRefresh__ && ! function() {
        s() && c(), window.onscroll = function() {
          s() && c()
        };
        var e = 0;
        window.addEventListener("touchstart", function(t) {
          e = t.touches[0].pageY
        }), window.addEventListener("touchmove", function(t) {
          var n = t.touches[0].pageY;
          n < e && s() && c()
        })
      }()
    }
  }]),
  __setCssToHead__ = __viewEngine__.setCssToHead;
! function(e) {
  function t() {
    var t = document.createElement("style");
    if (document.getElementsByTagName("head")[0].insertBefore(t, document.getElementsByTagName("head")[0].firstChild), t.styleSheet) t.styleSheet.disabled || (t.styleSheet.cssText = e);
    else try {
      t.innerHTML = e
    } catch (n) {
      t.innerText = e
    }
  }
  window.document && "complete" === window.document.readyState ? t() : window.onload = t
}('html {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  height: 100%;\n}\nbody {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\nwx-action-sheet-item {\n  background-color: #FFFFFF;\n  position: relative;\n  padding: 10px 0;\n  text-align: center;\n  font-size: 18px;\n  display: block;\n}\nwx-action-sheet-item:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 1px;\n  border-top: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 0;\n  transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n  transform: scaleY(0.5);\n}\nwx-action-sheet-item:active {\n  background-color: #ECECEC;\n}\nwx-action-sheet .wx-action-sheet {\n  position: fixed;\n  left: 0;\n  bottom: 0;\n  -webkit-transform: translate(0, 100%);\n          transform: translate(0, 100%);\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  z-index: 5000;\n  width: 100%;\n  background-color: #FFFFFF;\n  -webkit-transition: -webkit-transform .3s;\n  transition: -webkit-transform .3s;\n  transition: transform .3s;\n  transition: transform .3s, -webkit-transform .3s;\n}\nwx-action-sheet .wx-action-sheet-show {\n  -webkit-transform: translate(0, 0);\n          transform: translate(0, 0);\n}\nwx-action-sheet .wx-action-sheet-menu {\n  background-color: #FFFFFF;\n}\nwx-action-sheet .wx-action-sheet-mask {\n  position: fixed;\n  z-index: 1000;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  -webkit-transition: background-color 0.3s;\n  transition: background-color 0.3s;\n  background-color: rgba(0, 0, 0, 0.6);\n}\nwx-audio {\n  display: inline-block;\n  line-height: 0;\n}\nwx-audio > .wx-audio-default {\n  max-width: 100%;\n  min-width: 302px;\n  height: 65px;\n  background: #fcfcfc;\n  border: 1px solid #e0e0e0;\n  border-radius: 2.5px;\n  display: inline-block;\n  overflow: hidden;\n}\nwx-audio > .wx-audio-default > .wx-audio-left {\n  width: 65px;\n  height: 65px;\n  float: left;\n  background-color: #e6e6e6;\n  background-size: cover;\n  background-position: 50% 50%;\n}\nwx-audio > .wx-audio-default > .wx-audio-left > .wx-audio-button {\n  width: 24px;\n  height: 24px;\n  margin: 20.5px;\n  background-size: cover;\n}\nwx-audio > .wx-audio-default > .wx-audio-left > .wx-audio-button.play {\n  background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAB4dJREFUaAXNWg1MlVUYvpcfIRCJ+MnCaOBl8dOcOCEQZ9kmI5cQG5Yb6MifKbMaGVobOtlibTWHDpgpxBUwF07826iFsMkYJhg559JdGiQSkUzSBA0QkZ7n4/u+nXsvwf3jwru99/y/3/N+3znvec97rlbjABofH38GYtaAV4MjwDqwH9gHTBoE3wd3gA3gi+B6rVY7hHR2CKD9wFngs+BHYGuJYziWMqiscwgP8wLvBQ+AHUWURZle1mqhtXQAhLui7xZwPvgFsBENDg7+Drp069at2z09Pf03b978u6mpqZ+dVq1aFRAVFeW/aNGigNDQ0JfDwsISfXx8wowETBT+QpIPLsf0GpuomvrXIgUAPhhizoGXi+II+tq1az/o9fpLFRUVd8S26fJZWVkLN2/enBgTE/PW/PnzF5v0b0P5HSjxp0m9WXFaBQD+NYw6C1bf+vDwcF9DQ4N+/fr19ciPm0m1osLT01N76tSpNaD3PTw8FgpD+TXSoESrUGeWnVIBgM/EiDKwJ0eiPNrS0nJsw4YNNd3d3aOscxSFhIS4V1dXpyckJGRB5jxZ7jDSbVDiW7lslriY1cgVMvjjKErgR0dH/zl06NCuFStWfOdo8HwkZVL2wYMHP3ny5AlNLonPPi5jkSpMfyb9AhjAadMIlsBjrndmZ2fnnThxos9UwEyUMzIynj9y5EgB1gb3ExK/xBuTTSczBQCeC/ZnsDTnCR6f9YMbN25QiNMoOjras7W1tcjb2ztcfijXRKzpwjaaQgBPU0lrI4HntOGbdzZ4AuYzt2/fvm9sbOweyyBiOidjlCr4Y6QAyrTzkqlEx9GSkpJ9zpo2BGNKfHZRUdF+1D+W24iNGFVSpxAAcxekryK9/cuXLx/FoqpWe85iBlPpvbi4uB0yBE4lHabSvyyLX2AXyhJ42nmYytPsMBcI+80ZWKZeGQsxEqtEkgJ4+3Sm9sh1Gm5SM2EqFfnWpsRSV1dXIYzbI2NWv0AqGiXXl+4Bd1ihs0XZu3fvHhgYGNBXVVUlWDTAyk7p6ekNIyMj7fIwYiVmIwWkNvo2trgHAQEBy+CghW7cuPGLvr6+L3fu3PmSJNBBP8R09erVHwVxEwrgU/AwkqQ00DFT8lamqkEICgqKKy4u1sMU7li6dKnVLvL/Pbe0tLRFaEsidi1+UlB5ng3ctBYsWLBV6GRxFnJ4yjIj7CX36uvrS1NTU+uwEM3ara3Al/gaTl+EPC6Vi/hNRUhHR8dPSt5Rqbu7+3Nr1679rL+//3BBQYHyYJvFd3V1iTNkNRV4RZF2G6TkHZ36+vpG5uXlHcah59Pk5GSbj5AY3y1gi6ACisOk4UlKaJyJrBYnsuTa2trjzc3N7/r7+9N1sYo6OzsfCAN0VEB9GzwGCo0zlnV1dfVOTEzMhn3Xl5eXx1rzIBOMflRAsv8UopxhrRFoT18vL68QHCu/am9vz7FUjglGHyow6xQcHBxjKwgqwKCTRIweKHlnpZhGDfC7LP4CJhgH3QCUxzd/AmboA0kP8zNNcDt+w8ZUvHv37l+tedaSJUueFfrfpwJ0oSVLxLiN0DgjWWxsDxobG79JSUn53haXRafT+QrAOjiFDEoFg05K3tEpduoxg8FweuXKlRlJSUm1toAnpvDwcB55FTJQAdUFYMRMaXFkil34l9zc3K2RkZElV65ceWSPbCz414XxF6kAXWfpdMNwHyNmQge7skNDQ3dOnjy5PzAwMLewsLDLLmEYDJMb5ObmFiXLIeZ6FxzNGOK+IFeyk91f4enTpyNtbW3HIiIiNsHCNCmy7U1zcnKWCTIuEDu/AOn8RKLRMFbJcJ9StjRlBIN94Y40ZmZmboqNja3iScrS8dP1IyaEWt4W+kmYaYVILHA/8GGglbHKdevWqV+FHaYjOGofw811hcfZOV1fW9pxzE1wcXGJlscSq6SA+qZhJfai8nN2wNHtDhb0pt7eXoe9Qcq1lRg3hRvNkLtyytuHfAHlKVOI+UIwQxYaRolramrSmZ8LhLefJIAnRmKVSFUAHbiq8yeqNRpGiWE5XlXKs5WWlZUthu3/SHh+voxVqlKnEEuYRvTPee5czjKjxDCr2bMVnYNF9IO7fRRQAokHxIuPeCig3t4YKcAeUCIYiRrcffjwYUd8fPyHzo6PwuJ4XL9+/QAWrjILOHWmDu5SAWjHa500sBSNZoibUWKGvNnuDOKbNwFPLLytITYjUteAWIuOvNbZptQxxF1ZWXnYGWuCc57TRnjzhMFbGmIyI7MpJPbAdMpEuQzsKdc/hi+jT0tLO+NoE0tTSWsjL9h58vP45qe8YppSAQqBEmaXfAy0MlbJcJ+tXqUMUMMdlpsUIuE78JYVO89mznn7LvmUh8gL+xzKknVS6hmrZLiPETNrr1npmNG3oXsg7LCKaFobx1yzKhKhBE3sFnA+mCFuI4IyBuyWzYjb/MHQh+lFN09SPIxgirxIlxhepeIWiHL41vPBFl90i4MtykOROfVXA4tAT9YJisyJP3tMu4gnA29aB2UY4V4DXg1m/FMH9gMrMSd6jwwe8PxtAPMU6JC/2/wHuyI2cMsNBRIAAAAASUVORK5CYII=\');\n}\nwx-audio > .wx-audio-default > .wx-audio-left > .wx-audio-button.pause {\n  background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABatJREFUaAXVWl1IpFUYnllZGUf3wlz6MXER1ES7s83VUDJw6KpdaSTDwMnYFSK6KNirooHullKQCNzQRjZ/wom1u9ALQ0mT1ktFdEBWXLdibaH1jwmx5zme83W+z2Hm+7bZmc8X3jl/73vO837n/z3j9aSBjo6O8lBNC7gZXAUuBxeCz4FJj8APwTHwCngaPOX1evcRZocAuhAcAt8G74KdEnWoyzpobGYIjfnBn4D/BqeLWBfr9Du1wmtXAZXnQPY9cBj8HNhEe3t7sbW1tfn19fW7m5ubD5aXl7dnZmYeUKipqel8dXV1UUlJyfmysrILFRUV9X6/n8PMSveREQYPYHgdWgsTpW0ZAPDPQ3kC/JJeCUEvLi7+NDg4+EskEvldL0sVD4VCz3Z1db1SW1v7egJj7kD/Coy4l6qelAYAfB0quQ02vno8Hr8/OTkZaWtrmzo4ODhK1Uiycp/P5x0fH28JBAKh3Nxcow3osDdaYcRCMv2kBgD8O1D+BuyTlcTn5+cj7e3t0Y2NjX+SVey0rLS09OzY2Fiwvr4+BN1cqX+A8CqM+E6mTwRnTuTIDAn+FpIC/OHh4V+9vb0fNzQ0jKYbPJtknaybbbAtCYNt35JYZJY5SNgDctj8DFEBfnd3d627u/vT4eHhP8zqTybV0dHxTH9//+f5+fkVsgX2xKuJhtMJAwCeE/Y3sBiPBF9XV/fh0tISK8kY1dTU+BYWFvo0IzgnLlontmkIATyXSq42Ajy7kl8+0+D5ldgm29aGEzFNSIwUEWQyADlc59VSGe/r6/ssU8PmGI75l20TA3LjsoTYiNEgYwjBMu6CPKuIr4/Vph+TasyQzGJkbm7ubaxO1yQEDqVyDKU9pvUe+AhpAZ7rPJbKHyjgBuKyTUwSCzESqyBhAL4+D1PXZZ6Hm9STWCpV/U5DYiEmTe+6xOwRQwiJEAq/pQCPB0VFRdf+7w7LutJJ3LG3t7dvaseOdzGMImoIXVaN8WzjNvDERkzEpnAiFJjP4OvzMhJQBTyYqbjdEDov7+/vf4+6pu0wZQcGBi7arV/JWbAFiN2Lnzcg8COFuGkVFBSo2a70UoYEhC5+OqWgJoAv+mdeXt5bWpat6M7Ozk1tc7vMIfSa0lxdXf1VxZ2ETsGz7sfRoV4sFtMxNtOAF1hAugs6jrn3lxcmDV0VDTBuRrxJaYWujFowltMA40LNa6ArUWugLBgLaYByfXjUHVaTd13UgvEcDTjVRAPodBJE74GKuzW0YHxEA+gxE0TXh4q7NbRgfEgDeIQWRL+Nirs1tGCM0YAVBZZOJxV3a2jBuEIDphVYesxU3EnIY4ETeco+jg71LBinacAUWNxueFSlx4yCTmh0dPRLJ4AoOzIy8oWTNihLbNpxmpin1H2AnrcrFJqdnf0KM901tzFiUoQ94M3GxsYPZHoC94FW9gBJnEYZoa8SBy1hGNNuIWIiNg2PwKwbIPYDdhF9lZqgK6LEpA0fYv3PAHQF94IbCikdrcXFxWdVOtsh/abEpOG4ITGbvBI9EBA3f3qJo9FoUFPIapROX81zTYzEKkgNIQ8s4qwOH2d7PPQS9/T0vKjS2QqJQXqsFYSwxCrSpsmK6yVdi7zx0APmoVuvs7Pz/Wx55+jkHRoa+jonJ+cp4gHdAV+CAcbrjckASsCI0+vcpQGw7h6CVrDwRvMCTS8xvwbLM0Fsy+KZJha+1hCbiYw5oOdCkM86V1UejWBXZmJOsA22pXkeCIOvNAmfmk4MIQWaIYZTwiemYDAY3dracsUTU1IDpBGn95FP9Yac2KfzmVUzgkssHxfCYOGGR2gQvXp0jNG3lOyh+wKosrLykmWMq3q4SYXBth+6laLtEL3hqr8a2AZuFYQhrvizR8pJbAWeKA1j6OFuATeDq8D09hWClc+Jp0ceGHn/5hWWt8C0/N3mX15C4bDnCIuAAAAAAElFTkSuQmCC\');\n}\nwx-audio > .wx-audio-default > .wx-audio-right {\n  box-sizing: border-box;\n  height: 65px;\n  margin-left: 65px;\n  padding: 11px 16.5px 13.5px 15px;\n  overflow: hidden;\n}\nwx-audio > .wx-audio-default > .wx-audio-right > .wx-audio-info {\n  margin-right: 70px;\n  overflow: hidden;\n}\nwx-audio > .wx-audio-default > .wx-audio-right > .wx-audio-info > .wx-audio-name {\n  height: 22.5px;\n  line-height: 22.5px;\n  margin-bottom: 3.5px;\n  font-size: 14px;\n  color: #353535;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\nwx-audio > .wx-audio-default > .wx-audio-right > .wx-audio-info > .wx-audio-author {\n  height: 14.5px;\n  line-height: 14.5px;\n  font-size: 12px;\n  color: #888888;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\nwx-audio > .wx-audio-default > .wx-audio-right > .wx-audio-time {\n  margin-top: 3.5px;\n  height: 16.5px;\n  font-size: 12px;\n  color: #888888;\n  float: right;\n}\nwx-button {\n  position: relative;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 14px;\n  padding-right: 14px;\n  box-sizing: border-box;\n  font-size: 18px;\n  text-align: center;\n  text-decoration: none;\n  line-height: 2.55555556;\n  border-radius: 5px;\n  -webkit-tap-highlight-color: transparent;\n  overflow: hidden;\n  color: #000000;\n  background-color: #F8F8F8;\n}\nwx-button:after {\n  content: " ";\n  width: 200%;\n  height: 200%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  -webkit-transform: scale(0.5);\n          transform: scale(0.5);\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n  box-sizing: border-box;\n  border-radius: 10px;\n}\nwx-button[type=default] {\n  color: #000000;\n  background-color: #F8F8F8;\n}\nwx-button[type=primary] {\n  color: #FFFFFF;\n  background-color: #1AAD19;\n}\nwx-button[type=warn] {\n  color: #FFFFFF;\n  background-color: #E64340;\n}\nwx-button[type=warn]:not([disabled]):visited {\n  color: #FFFFFF;\n}\nwx-button[type=warn]:not([disabled]):active {\n  color: rgba(255, 255, 255, 0.6);\n  background-color: #CE3C39;\n}\nwx-button[disabled] {\n  color: rgba(0, 0, 0, 0.3);\n}\nwx-button[disabled][type=default] {\n  color: rgba(0, 0, 0, 0.3);\n  background-color: #F7F7F7;\n}\nwx-button[disabled][type=primary] {\n  background-color: #9ED99D;\n}\nwx-button[disabled][type=warn] {\n  background-color: #EC8B89;\n}\nwx-button[type=primary][plain] {\n  color: #1aad19;\n  border: 1px solid #1aad19;\n  background-color: transparent;\n}\nwx-button[type=primary][plain]:not([disabled]):active {\n  color: rgba(26, 173, 25, 0.6);\n  border-color: rgba(26, 173, 25, 0.6);\n  background-color: transparent;\n}\nwx-button[type=primary][plain][disabled] {\n  color: rgba(0, 0, 0, 0.2);\n  border-color: rgba(0, 0, 0, 0.2);\n}\nwx-button[type=primary][plain]:after {\n  border-width: 0;\n}\nwx-button[type=default][plain] {\n  color: #353535;\n  border: 1px solid #353535;\n  background-color: transparent;\n}\nwx-button[type=default][plain]:not([disabled]):active {\n  color: rgba(53, 53, 53, 0.6);\n  border-color: rgba(53, 53, 53, 0.6);\n  background-color: transparent;\n}\nwx-button[type=default][plain][disabled] {\n  color: rgba(0, 0, 0, 0.2);\n  border-color: rgba(0, 0, 0, 0.2);\n}\nwx-button[type=default][plain]:after {\n  border-width: 0;\n}\nwx-button[plain] {\n  color: #353535;\n  border: 1px solid #353535;\n  background-color: transparent;\n}\nwx-button[plain]:not([disabled]):active {\n  color: rgba(53, 53, 53, 0.6);\n  border-color: rgba(53, 53, 53, 0.6);\n  background-color: transparent;\n}\nwx-button[plain][disabled] {\n  color: rgba(0, 0, 0, 0.2);\n  border-color: rgba(0, 0, 0, 0.2);\n}\nwx-button[plain]:after {\n  border-width: 0;\n}\nwx-button[type=warn][plain] {\n  color: #e64340;\n  border: 1px solid #e64340;\n  background-color: transparent;\n}\nwx-button[type=warn][plain]:not([disabled]):active {\n  color: rgba(230, 67, 64, 0.6);\n  border-color: rgba(230, 67, 64, 0.6);\n  background-color: transparent;\n}\nwx-button[type=warn][plain][disabled] {\n  color: rgba(0, 0, 0, 0.2);\n  border-color: rgba(0, 0, 0, 0.2);\n}\nwx-button[type=warn][plain]:after {\n  border-width: 0;\n}\nwx-button[size=mini] {\n  display: inline-block;\n  line-height: 2.3;\n  font-size: 13px;\n  padding: 0 1.34em;\n}\nwx-button[loading]:before {\n  content: " ";\n  display: inline-block;\n  width: 18px;\n  height: 18px;\n  vertical-align: middle;\n  -webkit-animation: wx-button-loading-animate 1s steps(12, end) infinite;\n          animation: wx-button-loading-animate 1s steps(12, end) infinite;\n  background: transparent url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iciIgd2lkdGg9JzEyMHB4JyBoZWlnaHQ9JzEyMHB4JyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIiBjbGFzcz0iYmsiPjwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjRTlFOUU5JwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICA8L3JlY3Q+CiAgICA8cmVjdCB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzk4OTY5NycKICAgICAgICAgIHRyYW5zZm9ybT0ncm90YXRlKDMwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4KICAgICAgICAgICAgICAgICByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyM5Qjk5OUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz4KICAgIDwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjQTNBMUEyJwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoOTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNBQkE5QUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCMkIyQjInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCQUI4QjknCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxODAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDMkMwQzEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyMTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDQkNCQ0InCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEMkQyRDInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEQURBREEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNFMkUyRTInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0Pgo8L3N2Zz4=) no-repeat;\n  background-size: 100%;\n}\nwx-button[loading][type=primary] {\n  color: rgba(255, 255, 255, 0.6);\n  background-color: #179B16;\n}\nwx-button[loading][type=primary][plain] {\n  color: #1aad19;\n  background-color: transparent;\n}\nwx-button[loading][type=default] {\n  color: rgba(0, 0, 0, 0.6);\n  background-color: #DEDEDE;\n}\nwx-button[loading][type=default][plain] {\n  color: #353535;\n  background-color: transparent;\n}\nwx-button[loading][type=warn] {\n  color: rgba(255, 255, 255, 0.6);\n  background-color: #CE3C39;\n}\nwx-button[loading][type=warn][plain] {\n  color: #e64340;\n  background-color: transparent;\n}\n@-webkit-keyframes wx-button-loading-animate {\n  0% {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n            transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    -webkit-transform: rotate3d(0, 0, 1, 360deg);\n            transform: rotate3d(0, 0, 1, 360deg);\n  }\n}\n@keyframes wx-button-loading-animate {\n  0% {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n            transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    -webkit-transform: rotate3d(0, 0, 1, 360deg);\n            transform: rotate3d(0, 0, 1, 360deg);\n  }\n}\n.button-hover {\n  background-color: rgba(0, 0, 0, 0.1);\n}\n.button-hover[type=primary] {\n  background-color: #179B16;\n}\n.button-hover[type=default] {\n  background-color: #DEDEDE;\n}\nwx-canvas {\n  width: 300px;\n  height: 150px;\n  display: block;\n}\nwx-icon {\n  display: inline-block;\n  font-size: 0;\n}\nwx-icon i {\n  font: normal normal normal 14px/1 "weui";\n}\n@font-face {\n  font-weight: normal;\n  font-style: normal;\n  font-family: "weui";\n  src: url(\'data:application/octet-stream;base64,AAEAAAALAIAAAwAwR1NVQrD+s+0AAAE4AAAAQk9TLzJAKEx1AAABfAAAAFZjbWFw64JcfgAAAhQAAAI0Z2x5ZvCBJt8AAARsAAAHLGhlYWQIuM5WAAAA4AAAADZoaGVhCC0D+AAAALwAAAAkaG10eDqYAAAAAAHUAAAAQGxvY2EO3AzsAAAESAAAACJtYXhwAR4APgAAARgAAAAgbmFtZeNcHtgAAAuYAAAB5nBvc3RP98ExAAANgAAAANYAAQAAA+gAAABaA+gAAP//A+kAAQAAAAAAAAAAAAAAAAAAABAAAQAAAAEAAKZXmK1fDzz1AAsD6AAAAADS2MTEAAAAANLYxMQAAAAAA+kD6QAAAAgAAgAAAAAAAAABAAAAEAAyAAQAAAAAAAIAAAAKAAoAAAD/AAAAAAAAAAEAAAAKAB4ALAABREZMVAAIAAQAAAAAAAAAAQAAAAFsaWdhAAgAAAABAAAAAQAEAAQAAAABAAgAAQAGAAAAAQAAAAAAAQOqAZAABQAIAnoCvAAAAIwCegK8AAAB4AAxAQIAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA6gHqDwPoAAAAWgPpAAAAAAABAAAAAAAAAAAAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAAAAAUAAAADAAAALAAAAAQAAAFwAAEAAAAAAGoAAwABAAAALAADAAoAAAFwAAQAPgAAAAQABAABAADqD///AADqAf//AAAAAQAEAAAAAQACAAMABAAFAAYABwAIAAkACgALAAwADQAOAA8AAAEGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAMQAAAAAAAAADwAA6gEAAOoBAAAAAQAA6gIAAOoCAAAAAgAA6gMAAOoDAAAAAwAA6gQAAOoEAAAABAAA6gUAAOoFAAAABQAA6gYAAOoGAAAABgAA6gcAAOoHAAAABwAA6ggAAOoIAAAACAAA6gkAAOoJAAAACQAA6goAAOoKAAAACgAA6gsAAOoLAAAACwAA6gwAAOoMAAAADAAA6g0AAOoNAAAADQAA6g4AAOoOAAAADgAA6g8AAOoPAAAADwAAAAAALgBmAKIA3gEaAV4BtgHkAgoCRgKIAtIDFANOA5YAAAACAAAAAAOvA60ACwAXAAABDgEHHgEXPgE3LgEDLgEnPgE3HgEXDgEB9bz5BQX5vLv5BQX5u6zjBQXjrKvjBQXjA60F+by7+gQE+ru8+fy0BOSrq+QEBOSrq+QAAAIAAAAAA7MDswALACEAAAEOAQceARc+ATcuAQMHBiIvASY2OwERNDY7ATIWFREzMhYB7rn7BQX7ucL+BQX+JHYPJg92DgwYXQsHJggKXRgMA7MF/sK5+wUF+7nC/v31mhISmhIaARcICwsI/ukaAAADAAAAAAOtA6sACwAZACIAAAEOAQceARc+ATcuAQMUBisBIiY1ETY3MxYXJy4BNDYyFhQGAfC49gUF9ri++gUF+poKBxwHCgEILAgBHxMZGSYZGQOrBfq+uPYFBfa4vvr9dQcKCgcBGggBAQg5ARklGRklGQAAAAACAAAAAAOSA8IADQAfAAABDgEHERYEFzYkNxEuARMBBi8BJj8BNh8BFjclNh8BFgH0gchUCQEDkZEBAwlUyHr+vwQDlAMCFQMDegMEAScEAxMDA8IePRz+w9TwJCTw1AE9HD3+3f7DAgOZBAMcBANdAgL2AwMTBAADAAAAAAOCA7AADQAZACIAAAEOAQcRHgEXPgE3ES4BBzMWFQcGByMmLwE0EyImNDYyFhQGAfV7wVEJ+YuL+QlRwZIuCQoBBCIEAQogDhISHBISA7AdOxr+z8vnIyPnywExGjv3AQjYBAEBBNgI/rETHBISHBMAAAACAAAAAAO9A70AFwAjAAABLgE/AT4BHwEWMjclNhYXJxYUBwEGJiclJgAnBgAHFgAXNgABIAUCBQMFEAdiBxIGARMHEQYCBgb+0AYQBgIcBf79x77/AAUFAQC+xwEDAccGEQcEBwIFTAQF5QYBBgIGEAb+1QYBBqzHAQMFBf79x77/AAUFAQAABAAAAAADrwOtAAsAFwAtADEAAAEOAQceARc+ATcuAQMuASc+ATceARcOARMFDgEvASYGDwEGFh8BFjI3AT4BJiIXFjEXAfW8+QUF+by7+QUF+bus4wUF46yr4wUF4yv+9gcRBmAGDwUDBQEGfQUQBgElBQELDxQBAQOtBfm8u/oEBPq7vPn8tATkq6vkBATkq6vkAiLdBQEFSQUCBgQHEQaABgUBIQUPCwQBAQAAAAABAAAAAAO7AzoAFwAAEy4BPwE+AR8BFjY3ATYWFycWFAcBBiInPQoGBwUIGQzLDSALAh0MHgsNCgr9uQscCwGzCyEOCw0HCZMJAQoBvgkCCg0LHQv9sQsKAAAAAAIAAAAAA7gDuAALABEAAAEGAgceARc2JDcmABMhETMRMwHuvP0FBf28xQEABQX/ADr+2i35A7gF/wDFvP0FBf28xQEA/d4BTv7fAAAEAAAAAAOvA60AAwAPABsAIQAAARYxFwMOAQceARc+ATcuAQMuASc+ATceARcOAQMjFTM1IwLlAQHyvPkFBfm8u/kFBfm7rOMFBeOsq+MFBePZJP3ZAoMBAQEsBfm8u/oEBPq7vPn8tATkq6vkBATkq6vkAi39JAADAAAAAAPDA8MACwAbACQAAAEGAAcWABc2ADcmAAczMhYVAw4BKwEiJicDNDYTIiY0NjIWFAYB7sD+/AUFAQTAyQEHBQX++d42CAoOAQUEKgQFAQ4KIxMaGiYaGgPDBf75ycD+/AUFAQTAyQEH5woI/tMEBgYEASwIC/4oGicZGScaAAAEAAAAAAPAA8AACAASAB4AKgAAAT4BNCYiBhQWFyMVMxEjFTM1IwMGAAcWBBc+ATcmAgMuASc+ATceARcOAQH0GCEhMCEhUY85Ock6K83++AQEAQjNuf8FBf/Hq+MEBOOrq+MEBOMCoAEgMSAgMSA6Hf7EHBwCsQT++M25/wUF/7nNAQj8pwTjq6vjBATjq6vjAAAAAwAAAAADpwOnAAsAFwAjAAABBycHFwcXNxc3JzcDDgEHHgEXPgE3LgEDLgEnPgE3HgEXDgECjpqaHJqaHJqaHJqatrn1BQX1ubn1BQX1uajfBATfqKjfBATfAqqamhyamhyamhyamgEZBfW5ufUFBfW5ufX8xwTfqKjfBATfqKjfAAAAAwAAAAAD6QPpABEAHQAeAAABDgEjLgEnPgE3HgEXFAYHAQcBPgE3LgEnDgEHHgEXAo41gEmq4gQE4qqq4gQvKwEjOf3giLUDA7WIiLUDBLSIASMrLwTiqqriBATiqkmANP7dOQEZA7WIiLUDA7WIiLUDAAACAAAAAAPoA+gACwAnAAABBgAHFgAXNgA3JgADFg4BIi8BBwYuATQ/AScmPgEyHwE3Nh4BFA8BAfTU/uUFBQEb1NQBGwUF/uUDCgEUGwqiqAobEwqoogoBFBsKoqgKGxMKqAPoBf7l1NT+5QUFARvU1AEb/WgKGxMKqKIKARQbCqKoChsTCqiiCgEUGwqiAAAAABAAxgABAAAAAAABAAQAAAABAAAAAAACAAcABAABAAAAAAADAAQACwABAAAAAAAEAAQADwABAAAAAAAFAAsAEwABAAAAAAAGAAQAHgABAAAAAAAKACsAIgABAAAAAAALABMATQADAAEECQABAAgAYAADAAEECQACAA4AaAADAAEECQADAAgAdgADAAEECQAEAAgAfgADAAEECQAFABYAhgADAAEECQAGAAgAnAADAAEECQAKAFYApAADAAEECQALACYA+ndldWlSZWd1bGFyd2V1aXdldWlWZXJzaW9uIDEuMHdldWlHZW5lcmF0ZWQgYnkgc3ZnMnR0ZiBmcm9tIEZvbnRlbGxvIHByb2plY3QuaHR0cDovL2ZvbnRlbGxvLmNvbQB3AGUAdQBpAFIAZQBnAHUAbABhAHIAdwBlAHUAaQB3AGUAdQBpAFYAZQByAHMAaQBvAG4AIAAxAC4AMAB3AGUAdQBpAEcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAAcwB2AGcAMgB0AHQAZgAgAGYAcgBvAG0AIABGAG8AbgB0AGUAbABsAG8AIABwAHIAbwBqAGUAYwB0AC4AaAB0AHQAcAA6AC8ALwBmAG8AbgB0AGUAbABsAG8ALgBjAG8AbQAAAAIAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAECAQMBBAEFAQYBBwEIAQkBCgELAQwBDQEOAQ8BEAERAAZjaXJjbGUIZG93bmxvYWQEaW5mbwxzYWZlX3N1Y2Nlc3MJc2FmZV93YXJuB3N1Y2Nlc3MOc3VjY2Vzc19jaXJjbGURc3VjY2Vzc19ub19jaXJjbGUHd2FpdGluZw53YWl0aW5nX2NpcmNsZQR3YXJuC2luZm9fY2lyY2xlBmNhbmNlbAZzZWFyY2gFY2xvc2UAAAAA\') format(\'truetype\');\n}\n[class^="wx-icon-"]:before,\n[class*=" wx-icon-"]:before {\n  margin: 0;\n}\n.wx-icon-success {\n  color: #09BB07;\n}\n.wx-icon-success:before {\n  content: "\\EA06";\n}\n.wx-icon-info {\n  color: #10AEFF;\n}\n.wx-icon-info:before {\n  content: "\\EA03";\n}\n.wx-icon-warn {\n  color: #F76260;\n}\n.wx-icon-warn:before {\n  content: "\\EA0B";\n}\n.wx-icon-waiting {\n  color: #10AEFF;\n}\n.wx-icon-waiting:before {\n  content: "\\EA09";\n}\n.wx-icon-safe_success {\n  color: #09BB07;\n}\n.wx-icon-safe_success:before {\n  content: "\\EA04";\n}\n.wx-icon-safe_warn {\n  color: #FFBE00;\n}\n.wx-icon-safe_warn:before {\n  content: "\\EA05";\n}\n.wx-icon-success_circle {\n  color: #09BB07;\n}\n.wx-icon-success_circle:before {\n  content: "\\EA07";\n}\n.wx-icon-success_no_circle {\n  color: #09BB07;\n}\n.wx-icon-success_no_circle:before {\n  content: "\\EA08";\n}\n.wx-icon-waiting_circle {\n  color: #10AEFF;\n}\n.wx-icon-waiting_circle:before {\n  content: "\\EA0A";\n}\n.wx-icon-circle {\n  color: #C9C9C9;\n}\n.wx-icon-circle:before {\n  content: "\\EA01";\n}\n.wx-icon-download {\n  color: #09BB07;\n}\n.wx-icon-download:before {\n  content: "\\EA02";\n}\n.wx-icon-info_circle {\n  color: #09BB07;\n}\n.wx-icon-info_circle:before {\n  content: "\\EA0C";\n}\n.wx-icon-cancel {\n  color: #F43530;\n}\n.wx-icon-cancel:before {\n  content: "\\EA0D";\n}\n.wx-icon-search {\n  color: #B2B2B2;\n}\n.wx-icon-search:before {\n  content: "\\EA0E";\n}\n.wx-icon-clear {\n  color: #B2B2B2;\n}\n.wx-icon-clear:before {\n  content: "\\EA0F";\n}\n[class^="wx-icon-"]:before,\n[class*=" wx-icon-"]:before {\n  box-sizing: border-box;\n}\nwx-image {\n  width: 320px;\n  height: 240px;\n  display: inline-block;\n  overflow: hidden;\n}\nwx-image > div {\n  width: 100%;\n  height: 100%;\n}\nwx-image > img {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  display: block;\n}\n.input-placeholder {\n  color: gray;\n}\nwx-input {\n  height: 1.4rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  text-overflow: clip;\n  overflow: hidden;\n  white-space: nowrap;\n  font-family: UICTFontTextStyleBody;\n  min-height: 1.4rem;\n}\nwx-input input {\n  min-height: 1.4rem;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  border: none;\n  height: inherit;\n  width: inherit;\n  font-size: inherit;\n  font-weight: inherit;\n  font-family: UICTFontTextStyleBody;\n  color: inherit;\n  background: transparent;\n  display: inherit;\n  padding: 0;\n  margin: 0;\n  outline: none;\n  vertical-align: middle;\n  text-align: inherit;\n  overflow: inherit;\n  white-space: inherit;\n  text-overflow: inherit;\n  -webkit-tap-highlight-color: transparent;\n  z-index: 2;\n}\nwx-input[disabled] p {\n  color: grey;\n}\nwx-input div {\n  position: relative;\n  min-height: 1.4rem;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  text-overflow: inherit;\n  border: none;\n  height: inherit;\n  width: inherit;\n  font-size: inherit;\n  font-weight: inherit;\n  font-family: UICTFontTextStyleBody;\n  color: inherit;\n  background: inherit;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  padding: 0;\n  margin: 0;\n  outline: none;\n  text-align: inherit;\n  -webkit-tap-highlight-color: transparent;\n}\nwx-input div[type=password] p {\n  color: black;\n}\nwx-input div p {\n  height: inherit;\n  min-height: 1.4rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  text-overflow: inherit;\n  white-space: nowrap;\n  text-align: inherit;\n  overflow: hidden;\n  vertical-align: middle;\n  width: 100%;\n}\n.wx-loading {\n  position: fixed;\n  z-index: 2000000000;\n  width: 7.6em;\n  min-height: 7.6em;\n  top: 180px;\n  left: 50%;\n  margin-left: -3.8em;\n  background: rgba(40, 40, 40, 0.75);\n  text-align: center;\n  border-radius: 5px;\n  color: #FFFFFF;\n  font-size: 16px;\n  line-height: normal;\n}\n.wx-loading-icon {\n  margin: 30px 0 10px;\n  width: 38px;\n  height: 38px;\n  vertical-align: baseline;\n  display: inline-block;\n  -webkit-animation: weuiLoading 1s steps(12, end) infinite;\n          animation: weuiLoading 1s steps(12, end) infinite;\n  background: transparent url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iciIgd2lkdGg9JzEyMHB4JyBoZWlnaHQ9JzEyMHB4JyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIiBjbGFzcz0iYmsiPjwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjRTlFOUU5JwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICA8L3JlY3Q+CiAgICA8cmVjdCB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzk4OTY5NycKICAgICAgICAgIHRyYW5zZm9ybT0ncm90YXRlKDMwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4KICAgICAgICAgICAgICAgICByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyM5Qjk5OUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz4KICAgIDwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjQTNBMUEyJwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoOTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNBQkE5QUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCMkIyQjInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCQUI4QjknCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxODAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDMkMwQzEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyMTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDQkNCQ0InCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEMkQyRDInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEQURBREEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNFMkUyRTInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0Pgo8L3N2Zz4=) no-repeat;\n  background-size: 100%;\n}\n.wx-loading-content {\n  margin: 0 0 15px;\n}\n.wx-loading-mask {\n  position: fixed;\n  z-index: 1000;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n@-webkit-keyframes weuiLoading {\n  0% {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    -webkit-transform: rotate3d(0, 0, 1, 360deg);\n  }\n}\n@keyframes weuiLoading {\n  0% {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    -webkit-transform: rotate3d(0, 0, 1, 360deg);\n  }\n}\nwx-map {\n  position: relative;\n  width: 300px;\n  height: 150px;\n  display: block;\n}\nwx-map div {\n  width: 100%;\n  height: 100%;\n}\nwx-map iframe {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  border: none;\n  top: 0;\n  left: 0;\n}\n.wx-mask {\n  position: fixed;\n  z-index: inherit;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  -webkit-transition: background-color 0.3s;\n  transition: background-color 0.3s;\n  background-color: inherit;\n}\n.wx-mask[show=false] {\n  display: none;\n}\n.wx-mask-transparent {\n  background-color: rgba(0, 0, 0, 0);\n}\nwx-mask {\n  z-index: 1000;\n  position: fixed;\n  background-color: rgba(0, 0, 0, 0.6);\n}\nwx-modal .wx-modal-mask {\n  z-index: inherit;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  -webkit-transition: background-color 0.3s;\n  transition: background-color 0.3s;\n  background-color: inherit;\n  z-index: 1000;\n  position: fixed;\n  background-color: rgba(0, 0, 0, 0.6);\n  -webkit-animation: fadeIn ease .3s forwards;\n          animation: fadeIn ease .3s forwards;\n}\nwx-modal .wx-modal-dialog {\n  position: fixed;\n  z-index: 5000;\n  width: 85%;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  background-color: #FAFAFC;\n  text-align: center;\n  border-radius: 3px;\n  overflow: hidden;\n}\nwx-modal .wx-modal-dialog-hd {\n  padding: 1.2em 20px .5em;\n}\nwx-modal .wx-modal-dialog-hd strong {\n  font-weight: normal;\n  font-size: 17px;\n}\nwx-modal .wx-modal-dialog-bd {\n  text-align: left;\n  padding: 0 20px;\n  font-size: 15px;\n  color: #888;\n  word-wrap: break-word;\n  word-break: break-all;\n}\nwx-modal .wx-modal-dialog-ft {\n  position: relative;\n  line-height: 42px;\n  margin-top: 20px;\n  font-size: 17px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\nwx-modal .wx-modal-dialog-ft:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 1px;\n  border-top: 1px solid #D5D5D6;\n  color: #D5D5D6;\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\nwx-modal .wx-modal-dialog-ft a {\n  position: relative;\n  display: block;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  text-decoration: none;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\nwx-modal .wx-modal-dialog-ft a[hidden] {\n  display: none;\n}\nwx-modal .wx-modal-dialog-ft a:active {\n  background-color: #eee;\n}\nwx-modal .wx-modal-btn-primary {\n  color: #3CC51F;\n}\nwx-modal .wx-modal-btn-default {\n  color: #000000;\n}\nwx-modal .wx-modal-btn-default:before {\n  content: " ";\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 1px;\n  height: 100%;\n  border-right: 1px solid #D5D5D6;\n  color: #D5D5D6;\n  -webkit-transform-origin: 100% 0;\n          transform-origin: 100% 0;\n  -webkit-transform: scaleX(0.5);\n          transform: scaleX(0.5);\n}\n@media screen and (min-width: 1024px) {\n  wx-modal .wx-modal-dialog {\n    width: 35%;\n  }\n}\n@-webkit-keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\nwx-picker {\n  display: block;\n}\nwx-progress {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.wx-progress-bar {\n  background-color: #EBEBEB;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.wx-progress-inner-bar {\n  width: 0;\n  height: 100%;\n}\n.wx-progress-info {\n  margin-top: 0;\n  margin-bottom: 0;\n  min-width: 2em;\n  margin-left: 15px;\n  font-size: 16px;\n}\nwx-radio-group {\n  display: block;\n}\nwx-scroll-view {\n  display: block;\n  width: 100%;\n}\n.wx-scroll-view {\n  position: relative;\n  -webkit-overflow-scrolling: touch;\n  height: 100%;\n}\nwx-swiper {\n  display: block;\n  height: 150px;\n}\nwx-swiper .wx-swiper-wrapper {\n  overflow: hidden;\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\nwx-swiper .wx-swiper-slides {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  -webkit-transition-property: top, left;\n  transition-property: top, left;\n  -webkit-transition-timing-function: ease;\n          transition-timing-function: ease;\n}\nwx-swiper .wx-swiper-slides-tracking {\n  -webkit-transition: none;\n  transition: none;\n}\nwx-swiper .wx-swiper-dots {\n  position: absolute;\n  font-size: 20px;\n  line-height: 20px;\n}\nwx-swiper .wx-swiper-dots-horizontal {\n  left: 50%;\n  bottom: 0;\n  text-align: center;\n  white-space: nowrap;\n  height: 24px;\n  transform: translate(-50%, 0);\n  -webkit-transform: translate(-50%, 0);\n}\nwx-swiper .wx-swiper-dots-vertical {\n  right: 0;\n  top: 50%;\n  text-align: right;\n  width: 24px;\n  transform: translate(0, -50%);\n  -webkit-transform: translate(0, -50%);\n}\nwx-swiper .wx-swiper-dot {\n  display: inline-block;\n  width: 24px;\n  text-align: center;\n  cursor: pointer;\n  color: grey;\n  -webkit-transition-property: color;\n  transition-property: color;\n  -webkit-transition-timing-function: ease;\n          transition-timing-function: ease;\n}\nwx-swiper .wx-swiper-dot-active {\n  color: black;\n}\nwx-swiper .wx-swiper-dot::before {\n  content: "\\2022";\n}\nwx-swiper-item {\n  display: block;\n  overflow: hidden;\n}\nwx-slider {\n  margin: 10px 18px;\n  padding: 0;\n  display: block;\n}\nwx-slider .wx-slider-wrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  min-height: 16px;\n}\nwx-slider .wx-slider-tap-area {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  padding: 8px 0;\n}\nwx-slider .wx-slider-handle-wrapper {\n  position: relative;\n  height: 2px;\n  border-radius: 5px;\n  background-color: #e9e9e9;\n  cursor: pointer;\n  -webkit-transition: background-color 0.3s ease;\n  transition: background-color 0.3s ease;\n  -webkit-tap-highlight-color: transparent;\n}\nwx-slider .wx-slider-track {\n  height: 100%;\n  border-radius: 6px;\n  background-color: #1aad19;\n  -webkit-transition: background-color 0.3s ease;\n  transition: background-color 0.3s ease;\n}\nwx-slider .wx-slider-handle {\n  position: absolute;\n  width: 28px;\n  height: 28px;\n  left: 50%;\n  top: 50%;\n  margin-left: -14px;\n  margin-top: -14px;\n  cursor: pointer;\n  border-radius: 50%;\n  background-color: #fff;\n  z-index: 2;\n  -webkit-transition: border-color 0.3s ease;\n  transition: border-color 0.3s ease;\n  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);\n}\nwx-slider .wx-slider-step {\n  position: absolute;\n  width: 100%;\n  height: 2px;\n  background: transparent;\n  z-index: 1;\n}\nwx-slider .wx-slider-value {\n  color: #888;\n  font-size: 14px;\n  margin-left: 1em;\n}\nwx-slider .wx-slider-disabled .wx-slider-track {\n  background-color: #ccc;\n}\nwx-slider .wx-slider-disabled .wx-slider-handle {\n  background-color: #FFF;\n  border-color: #ccc;\n}\n* {\n  margin: 0;\n}\nwx-switch {\n  display: inline-block;\n  -webkit-tap-highlight-color: transparent;\n}\n.weui_switch {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n       appearance: none;\n  position: relative;\n  width: 52px;\n  height: 32px;\n  border: 1px solid #DFDFDF;\n  outline: 0;\n  border-radius: 16px;\n  box-sizing: border-box;\n  background: #DFDFDF;\n}\n.weui_switch:before {\n  content: " ";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 50px;\n  height: 30px;\n  border-radius: 15px;\n  background-color: #FDFDFD;\n  -webkit-transition: -webkit-transform .3s;\n  transition: -webkit-transform .3s;\n  transition: transform .3s;\n  transition: transform .3s, -webkit-transform .3s;\n}\n.weui_switch:after {\n  content: " ";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  background-color: #FFFFFF;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);\n  -webkit-transition: -webkit-transform .3s;\n  transition: -webkit-transform .3s;\n  transition: transform .3s;\n  transition: transform .3s, -webkit-transform .3s;\n}\n.weui_switch:checked {\n  border-color: #04BE02;\n  background-color: #04BE02;\n}\n.weui_switch:checked:checked:before {\n  -webkit-transform: scale(0);\n          transform: scale(0);\n}\n.weui_switch:checked:after {\n  -webkit-transform: translateX(20px);\n          transform: translateX(20px);\n}\n.weui_switch_checkbox_wrapper {\n  font-size: 12px;\n  display: inline-block;\n  position: relative;\n}\n.weui_switch_checkbox {\n  white-space: nowrap;\n  outline: none;\n  display: inline-block;\n  line-height: 1;\n  position: relative;\n  vertical-align: middle;\n}\n.weui_switch_checkbox_inner {\n  position: relative;\n  top: 0;\n  left: 0;\n  display: inline-block;\n  width: 14px;\n  height: 14px;\n  border-radius: 3px;\n  border: 1px solid #d9d9d9;\n  background-color: #fff;\n  -webkit-transition: border-color 0.1s cubic-bezier(0.71, -0.46, 0.29, 1.46), background-color 0.1s cubic-bezier(0.71, -0.46, 0.29, 1.46);\n  transition: border-color 0.1s cubic-bezier(0.71, -0.46, 0.29, 1.46), background-color 0.1s cubic-bezier(0.71, -0.46, 0.29, 1.46);\n}\n.weui_switch_checkbox_inner:after {\n  -webkit-transform: rotate(45deg) scale(0);\n  transform: rotate(45deg) scale(0);\n  position: absolute;\n  left: 4px;\n  top: 1px;\n  display: table;\n  width: 5px;\n  height: 8px;\n  border: 2px solid #fff;\n  border-top: 0;\n  border-left: 0;\n  content: \' \';\n  -webkit-transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6);\n  transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6);\n}\n.weui_switch_checkbox_input {\n  position: absolute;\n  left: 0;\n  z-index: 1;\n  cursor: pointer;\n  opacity: 0;\n  filter: alpha(opacity=0);\n  top: 0;\n  bottom: 0;\n  right: 0;\n  width: 100%;\n  height: 100%;\n}\n.weui_switch_checkbox_checked .weui_switch_checkbox_inner {\n  border-color: #04BE02;\n  background-color: #04BE02;\n}\n.weui_switch_checkbox_checked .weui_switch_checkbox_inner:after {\n  -webkit-transform: rotate(45deg) scale(1);\n  transform: rotate(45deg) scale(1);\n  position: absolute;\n  left: 4px;\n  top: 1px;\n  display: table;\n  width: 5px;\n  height: 8px;\n  border: 2px solid #fff;\n  border-top: 0;\n  border-left: 0;\n  content: \' \';\n  -webkit-transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;\n  transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;\n}\n.weui_switch_disabled .weui_switch:checked {\n  background-color: #DFDFDF;\n  border: #DFDFDF;\n}\n.weui_switch_disabled .weui_switch {\n  background-color: #DFDFDF;\n  border: #DFDFDF;\n}\n.weui_switch_disabled .weui_switch:before {\n  background-color: #DFDFDF;\n  border: #DFDFDF;\n}\n.weui_switch_disabled .weui_switch_checkbox_inner {\n  background-color: #DFDFDF;\n  border: #DFDFDF;\n}\n.weui_switch_disabled span {\n  color: #ccc;\n}\nwx-text[selectable] {\n  -moz-user-select: text;\n   -ms-user-select: text;\n       user-select: text;\n  -webkit-user-select: text;\n}\n.wx-toast {\n  position: fixed;\n  z-index: 2000000000;\n  width: 7.6em;\n  min-height: 7.6em;\n  top: 180px;\n  left: 50%;\n  margin-left: -3.8em;\n  background: rgba(40, 40, 40, 0.75);\n  text-align: center;\n  border-radius: 5px;\n  color: #FFFFFF;\n  font-size: 16px;\n  line-height: normal;\n}\n.wx-toast-icon {\n  margin-top: 14px;\n  margin-bottom: 8px;\n  font-family: weui;\n  font-style: normal;\n}\n.wx-toast-content {\n  margin: 0 0 15px;\n}\n.wx-toast-mask {\n  position: fixed;\n  z-index: 1000;\n  background-color: rgba(0, 0, 0, 0.6);\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\nwx-video {\n  width: 300px;\n  height: 225px;\n  display: inline-block;\n  line-height: 0;\n  overflow: hidden;\n}\nwx-video .wx-video-container {\n  width: 100%;\n  height: 100%;\n  background-color: black;\n  display: inline-block;\n  position: relative;\n}\nwx-video video {\n  width: 100%;\n  height: 100%;\n}\nwx-video .wx-video-bar {\n  height: 44px;\n  background-color: rgba(0, 0, 0, 0.5);\n  overflow: hidden;\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 0 10px;\n}\nwx-video .wx-video-bar.full {\n  left: 0;\n}\nwx-video .wx-video-bar.part {\n  margin: 5px;\n  border-radius: 5px;\n  height: 34px;\n}\nwx-video .wx-video-bar > .wx-video-controls {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  margin: 0 8.5px;\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-button {\n  width: 13px;\n  height: 15px;\n  margin: 14.5px 12.5px 14.5px 0;\n  background-size: cover;\n  background-position: 50% 50%;\n  background-repeat: no-repeat;\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-button.play {\n  background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAAAAXNSR0IArs4c6QAAAWhJREFUSA1j+P///0cgBoHjQGzCQCsAtgJB/AMy5wCxGNXtQ9iBwvoA5BUCMQvVLEQxHpNzDSjkRhXLMM3GKrIeKKpEkYVYjcUu+AMo3ALE3GRZiN1MvKKPgbIRJFuG10j8koeA0gZEW4jfLIKyf4EqpgOxMEELCRpFnIJ3QGU5QMyM00LizCFa1SWgSkeslhFtBGkKVwGVy6FYSJp+klR/A6quB2JOkIWMIK0oNlOf8xBoZDE9LAI7nYn6HsBq4l96WHQEaLUpAyiOaASeAM2NgvuPBpaACt82IEYtfKls0UagecpwXyAzqGTRdaA57sjmYrAptAjUsCkGYlYMg9EFyLQI1IiZB8Ti6Obh5JNh0QmgHlOcBuKSIMGi50C18UDMiMssvOJEWPQLqKYbiHnxGkRIkoBF24DyaoTMIEoeh0W3geI+RBlArCI0iz4D+RVAzEasfqLVAQ19AcSg5LoYiKWI1kiiQgCMBLnEEcfDSgAAAABJRU5ErkJggg==\');\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-button.pause {\n  background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAgCAYAAAAffCjxAAAAAXNSR0IArs4c6QAAAFlJREFUSA3tksEKACAIQ7X//5zq98wOgQayum8QaGweHhMzG/6OujzKAymn+0LMqivu1XznWmX8/echTIyMyAgTwA72iIwwAexgj8gIE8CO3aMRbDPMaEy5BRGaKcZv8YxRAAAAAElFTkSuQmCC\');\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-progress {\n  height: 2px;\n  margin: 21px 12px;\n  background-color: rgba(255, 255, 255, 0.5);\n  position: relative;\n  -webkit-box-flex: 2;\n      -ms-flex-positive: 2;\n          flex-grow: 2;\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-progress > .wx-video-ball {\n  width: 16px;\n  height: 16px;\n  padding: 14px;\n  position: absolute;\n  top: -21px;\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-progress > .wx-video-ball > .wx-video-inner {\n  width: 100%;\n  height: 100%;\n  background-color: #ffffff;\n  border-radius: 50%;\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-progress > .wx-video-inner {\n  width: 0;\n  height: 100%;\n  background-color: #ffffff;\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-time {\n  height: 14.5px;\n  line-height: 14.5px;\n  margin-top: 15px;\n  margin-bottom: 14.5px;\n  font-size: 12px;\n  color: #cbcbcb;\n}\nwx-video .wx-video-bar > .wx-video-danmu-btn {\n  white-space: nowrap;\n  line-height: 1;\n  padding: 2px 10px;\n  border: 1px solid #fff;\n  border-radius: 5px;\n  font-size: 13px;\n  color: #fff;\n  margin: 0 8.5px;\n}\nwx-video .wx-video-bar > .wx-video-danmu-btn.active {\n  border-color: #48c23d;\n  background-color: #48c23d;\n}\nwx-video .wx-video-bar > .wx-video-fullscreen {\n  width: 17px;\n  height: 17px;\n  /*margin: 13.5px 16px 13.5px 17px;*/\n  margin: 0 8.5px;\n  background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAAQRJREFUWAnt1d0NwiAQB/CmS7hHX5zFxLF0Ah2hE/lg7BT4PyMJUj6Oyt299BIioZT7ARYG59wLpTXmoXOMGO/QecxtwyWW4o42AupGALkFdX1MkHxE3Q7jIbQPqNthQogpJoZkMLRlsn/gFMQEk4OoY0oQVUwNoobhQFQwgMxUKFkt0C8+Zy61d8SeR5iHWCLOwF/MCb8Tp//ex3QFsE1HlCfKFUX2OijNFMnPKD7k76YcBoL402Zh8B77+MjlXrVvwfglXA32b0MrRgxCE2nBiEJaMOIQLkYFwsGoQWoYVUgJow4pYD4Weq4ayBqfwDYQmnUK0301kITujuawu65/l2B5A4z3Qe+Ut7EBAAAAAElFTkSuQmCC\');\n  background-size: cover;\n  background-position: 50% 50%;\n  background-repeat: no-repeat;\n}\nwx-video .wx-video-danmu {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  margin-bottom: 44px;\n}\nwx-video .wx-video-danmu > .wx-video-danmu-item {\n  line-height: 1;\n  position: absolute;\n  color: #ffffff;\n  white-space: nowrap;\n  left: 100%;\n  -webkit-transition: 3s linear;\n  transition: 3s linear;\n}\nwx-view {\n  display: block;\n}\nwx-view[hidden] {\n  display: none;\n}\n.navigator-hover {\n  background-color: rgba(0, 0, 0, 0.1);\n  opacity: 0.7;\n}\nwx-navigator {\n  height: auto;\n  width: auto;\n  display: block;\n}\nwx-action-sheet-cancel {\n  background-color: #FFFFFF;\n  font-size: 18px;\n}\nwx-action-sheet-cancel .wx-action-sheet-middle {\n  background-color: #EFEFF4;\n  height: 6px;\n  width: 100%;\n}\nwx-action-sheet-cancel .wx-action-sheet-cancel {\n  background-color: inherit;\n  position: relative;\n  padding: 10px 0;\n  text-align: center;\n  font-size: inherit;\n  display: block;\n}\nwx-action-sheet-cancel .wx-action-sheet-cancel:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  border-top: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 0;\n  transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n  transform: scaleY(0.5);\n}\nwx-action-sheet-cancel .wx-action-sheet-cancel:active {\n  background-color: #ECECEC;\n}\n.textarea-placeholder {\n  color: grey;\n}\nwx-textarea {\n  width: 300px;\n  height: 150px;\n  display: block;\n  position: relative;\n}\nwx-textarea textarea {\n  outline: none;\n  border: none;\n  resize: none;\n  background-color: transparent;\n  line-height: 1.2;\n  z-index: 2;\n  position: absolute;\n  padding: 0;\n  font-family: inherit;\n  background: transparent;\n}\nwx-textarea .compute {\n  color: transparent;\n  top: 0;\n  z-index: 0;\n}\nwx-textarea div {\n  word-break: break-all;\n  line-height: 1.2;\n  font-family: inherit;\n  position: absolute;\n}\n\n/*# sourceMappingURL=wx-components.css.map */'),
wx.version = {
  updateTime: "2016.10.31 21:37:45",
  info: "",
  version: 30
};
