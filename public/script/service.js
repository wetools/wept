! function(e) {
  if (!e.WeixinJSBridge) {
    if (e.navigator && e.navigator.userAgent) {
      var t = e.navigator.userAgent;
      if (t.indexOf("appservice") > -1 || t.indexOf("wechatdevtools") > -1) return
    }
    var n = e.hasOwnProperty("document"),
      o = !1,
      r = {},
      i = 0,
      a = {},
      u = "custom_event_",
      c = {};
    if (n) {
      var t = e.navigator.userAgent,
        s = t.indexOf("Android") != -1;
      o = !s
    }
    var p = function(t, n, i) {
        if (o) e.webkit.messageHandlers.invokeHandler.postMessage({
          event: t,
          paramsString: n,
          callbackId: i
        });
        else {
          var a = WeixinJSCore.invokeHandler(t, n, i);
          if ("undefined" != typeof a && "function" == typeof r[i] && "" !== a) {
            try {
              a = JSON.parse(a)
            } catch (e) {
              a = {}
            }
            r[i](a), delete r[i]
          }
        }
      },
      f = function(t, n, r) {
        o ? e.webkit.messageHandlers.publishHandler.postMessage({
          event: t,
          paramsString: n,
          webviewIds: r
        }) : WeixinJSCore.publishHandler(t, n, r)
      },
      l = function(e, t, n) {
        var o = JSON.stringify(t || {}),
          a = ++i;
        r[a] = n, p(e, o, a)
      },
      d = function(e, t) {
        var n = r[e];
        "function" == typeof n && n(t), delete r[e]
      },
      h = function(e, t) {
        a[e] = t
      },
      g = function(e, t, n) {
        n = n || [], n = JSON.stringify(n);
        var o = u + e,
          r = JSON.stringify(t);
        f(o, r, n)
      },
      v = function(e, t) {
        c[u + e] = t
      },
      y = function(e, t, n, o) {
        var r;
        r = e.indexOf(u) != -1 ? c[e] : a[e], "function" == typeof r && r(t, n, o)
      };
    e.WeixinJSBridge = {
      invoke: l,
      invokeCallbackHandler: d,
      on: h,
      publish: g,
      subscribe: v,
      subscribeHandler: y
    }
  }
}(this);
var Reporter = function(e) {
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
      "undefined" != typeof WeixinJSBridge ? e() : document.addEventListener("WeixinJSBridgeReady", e, !1)
    }

    function r() {
      var e = arguments;
      o(function() {
        WeixinJSBridge.invoke.apply(WeixinJSBridge, e)
      })
    }

    function i() {
      !h || h.length <= 0 || (r("reportKeyValue", {
        dataArray: h
      }), h = [])
    }

    function a() {
      !g || g.length <= 0 || (r("reportIDKey", {
        dataArray: g
      }), g = [])
    }

    function u() {
      !v || v.length <= 0 || (r("systemLog", {
        dataArray: v
      }), v = [])
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

    function s(e) {
      O.__defineGetter__(e, function() {
        return c(T[e])
      })
    }
    var p = n(1),
      f = 1,
      l = 20,
      d = 50,
      h = [],
      g = [],
      v = [],
      y = "",
      w = 50,
      b = 50,
      m = 20,
      S = 50,
      _ = 0,
      k = 0,
      A = 0,
      P = 0;
    r("getPublicLibVersion", {}, function(e) {
      try {
        y = e.version.appVersion + " " + e.version.libVersion
      } catch (e) {}
    });
    var T = {
        reportKeyValue: function(e) {
          var t = e.key,
            n = e.value;
          p.KeyValueType[t] && (Date.now() - _ < b || (_ = Date.now(), h.push({
            key: p.KeyValueType[t],
            value: n
          }), h.length >= l && i()))
        },
        reportIDKey: function(e) {
          var t = e.id,
            n = e.key;
          p.IDKeyType[n] && (Date.now() - k < m || (k = Date.now(), g.push({
            id: t ? t : "356",
            key: p.IDKeyType[n],
            value: 1
          }), g.length >= f && a()))
        },
        errorReport: function(e) {
          var t = e.key,
            n = e.error;
          p.ErrorType[t] && (T.reportIDKey({
            key: t
          }), T.reportKeyValue({
            key: "Error",
            value: p.ErrorType[t] + "," + n.name + "," + encodeURIComponent(n.message) + "," + encodeURIComponent(n.stack) + "," + encodeURIComponent(y)
          }), a(), i(), u())
        },
        log: function(e) {
          e && "string" == typeof e && (Date.now() - A < S || (A = Date.now(), v.push(e + ""), v.length >= d && u()))
        },
        submit: function() {
          Date.now() - P < w || (P = Date.now(), a(), i(), u())
        }
      },
      O = {};
    for (var M in T) s(M);
    "undefined" != typeof window && (window.onbeforeunload = function() {
      T.submit()
    }), e.exports = O
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
        default: e
      }
    }

    function r(e) {
      if ("[object Error]" === Object.prototype.toString.apply(e)) {
        if ("AppServiceSdkKnownError" == e.type) throw e;
        S ? console.error(e.stack) : console.error(e.message), Reporter.errorReport({
          key: "appServiceSDKScriptError",
          error: e
        })
      }
    }

    function i(e) {
      return S ? e : function() {
        try {
          return e.apply(e, arguments)
        } catch (e) {
          r(e)
        }
      }
    }

    function a(e) {
      m.__defineGetter__(e, function() {
        return i(T[e])
      })
    }

    function u(e, t, n) {
      var o = (0, p.paramCheck)(t, n);
      return !o || (o = e + ":fail parameter error: " + o, t && ("function" == typeof t.fail && t.fail({
        errMsg: o
      }), "function" == typeof t.complete && t.complete({
        errMsg: o
      })), console.error(o), !1)
    }
    var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
      },
      s = n(1),
      p = n(2),
      f = n(3),
      l = o(f);
    n(4), n(5), n(6);
    var d = n(8),
      h = n(9),
      g = {},
      v = "",
      y = [],
      w = [],
      b = void 0,
      m = {},
      S = "devtools" === (0, p.getPlatform)(),
      _ = !1,
      k = !1,
      A = [],
      P = [];
    "devtools" === (0, p.getPlatform)() && (0, s.subscribe)("SPECIAL_PAGE_EVENT", function(e) {
      var t = e.data,
        n = e.eventName,
        o = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
      if (t && "input" == t.type && "function" == typeof b) {
        var r = b({
          data: t,
          eventName: n,
          webviewId: o
        });
        "String" === (0, p.getDataType)(r) ? r != t.detail.value && (0, s.publish)("setKeyboardValue", {
          value: r,
          cursor: -1
        }, [o]): "Object" === (0, p.getDataType)(r) && (0, s.publish)("setKeyboardValue", {
          value: r.value || "",
          cursor: "undefined" == typeof r.cursor ? -1 : r.cursor
        }, [o])
      }
    });
    var T = {
      invoke: s.invoke,
      on: s.on,
      drawCanvas: h.drawCanvas,
      createContext: h.createContext,
      toTempFilePath: h.toTempFilePath,
      reportIDKey: function(e, t) {},
      reportKeyValue: function(e, t) {},
      onPullDownRefresh: function(e) {
        console.log("onPullDownRefresh has been removed from api list")
      },
      setNavigationBarTitle: function() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
        u("setNavigationBarTitle", e, {
          title: ""
        }) && (0, s.invokeMethod)("setNavigationBarTitle", e)
      },
      showNavigationBarLoading: function(e) {
        (0, s.invokeMethod)("showNavigationBarLoading", e)
      },
      hideNavigationBarLoading: function(e) {
        (0, s.invokeMethod)("hideNavigationBarLoading", e)
      },
      stopPullDownRefresh: function(e) {
        (0, s.invokeMethod)("stopPullDownRefresh", e)
      },
      redirectTo: function(e) {
        u("redirectTo", e, {
          url: ""
        }) && (e.url = (0, p.getRealRoute)(v, e.url), e.url = (0, p.encodeUrlQuery)(e.url), (0, s.invokeMethod)("redirectTo", e, {
          afterSuccess: function() {
            v = e.url
          }
        }))
      },
      navigateTo: function(e) {
        u("navigateTo", e, {
          url: ""
        }) && (e.url = (0, p.getRealRoute)(v, e.url), e.url = (0, p.encodeUrlQuery)(e.url), (0, s.invokeMethod)("navigateTo", e, {
          afterSuccess: function() {
            v = e.url, (0, d.notifyCurrentRoutetoContext)(v)
          }
        }))
      },
      navigateBack: function(e) {
        (0, s.invokeMethod)("navigateBack", e)
      },
      getStorage: function(e) {
        u("getStorage", e, {
          key: ""
        }) && (0, s.invokeMethod)("getStorage", e, {
          beforeSuccess: function(e) {
            e.data = (0, p.stringToAnyType)(e.data, e.dataType), delete e.dataType
          }
        })
      },
      getStorageSync: function(e) {
        var t = "ios" === (0, p.getPlatform)() ? "getStorage" : "getStorageSync",
          n = void 0;
        return (0, s.invokeMethod)(t, {
          key: e
        }, {
          beforeAll: function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            n = (0, p.stringToAnyType)(e.data, e.dataType)
          }
        }), n
      },
      setStorage: function(e) {
        if (u("setStorage", e, {
            key: ""
          })) {
          var t = (0, p.anyTypeToString)(e.data),
            n = t.data,
            o = t.dataType;
          (0, s.invokeMethod)("setStorage", {
            key: e.key,
            data: n,
            dataType: o,
            success: e.success,
            fail: e.fail,
            complete: e.complete
          })
        }
      },
      setStorageSync: function(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? "" : arguments[1],
          n = "ios" === (0, p.getPlatform)() ? "setStorage" : "setStorageSync",
          o = (0, p.anyTypeToString)(t),
          r = o.data,
          i = o.dataType;
        (0, s.invokeMethod)(n, {
          key: e,
          data: r,
          dataType: i
        })
      },
      clearStorage: function(e) {
        (0, s.invokeMethod)("clearStorage", e)
      },
      clearStorageSync: function() {
        var e = "ios" === (0, p.getPlatform)() ? "clearStorage" : "clearStorageSync";
        (0, s.invokeMethod)(e)
      },
      request: function() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
        if (u("request", e, {
            url: ""
          })) {
          if ((0, p.validateUrl)(e.url) === !1) {
            var t = {
              errMsg: 'request: fail, invalid url "' + e.url + '"'
            };
            return "function" == typeof e.fail && e.fail(t), void("function" == typeof e.complete && e.complete(t))
          }
          var n = (0, p.getDataType)(e.header);
          "Undefined" !== n && "Object" !== n && (console.warn("wx.request: header is " + n + ", expect Object."), e.header = {});
          var o = e.header || {},
            r = e.method || "GET",
            i = void 0;
          if (e.dataType = e.dataType || "json", o["content-type"] = o["content-type"] || "application/json", "function" == typeof e.data) throw new p.AppServiceSdkKnownError("request: data can not be a function.");
          i = "string" != typeof e.data ? o["content-type"].indexOf("application/x-www-form-urlencoded") > -1 ? (0, p.urlEncodeFormData)(e.data) : o["content-type"].indexOf("application/json") > -1 ? JSON.stringify(e.data) : "object" === c(e.data) ? JSON.stringify(e.data) : i.toString() : e.data, "GET" === r.toUpperCase() && (e.url = (0, p.addQueryStringToUrl)(e.url, e.data)), (0, s.invokeMethod)("request", {
            url: e.url,
            data: i,
            header: o,
            method: r,
            success: e.success,
            fail: e.fail,
            complete: e.complete
          }, {
            beforeSuccess: function(t) {
              if ("json" === e.dataType) try {
                t.data = JSON.parse(t.data)
              } catch (e) {}
            }
          })
        }
      },
      connectSocket: function(e) {
        u("connectSocket", e, {
          url: ""
        }) && (0, s.invokeMethod)("connectSocket", e)
      },
      closeSocket: function(e) {
        (0, s.invokeMethod)("closeSocket", e)
      },
      sendSocketMessage: function(e) {
        u("sendSocketMessage", e, {
          data: ""
        }) && (0, s.invokeMethod)("sendSocketMessage", e)
      },
      onSocketOpen: function(e) {
        u("onSocketOpen", e, function() {}) && (0, s.onMethod)("onSocketOpen", e)
      },
      onSocketClose: function(e) {
        u("onSocketClose", e, function() {}) && (0, s.onMethod)("onSocketClose", e)
      },
      onSocketMessage: function(e) {
        u("onSocketMessage", e, function() {}) && (0, s.onMethod)("onSocketMessage", e)
      },
      onSocketError: function(e) {
        u("onSocketError", e, function() {}) && (0, s.onMethod)("onSocketError", e)
      },
      uploadFile: function(e) {
        u("uploadFile", e, {
          url: "",
          filePath: "",
          name: ""
        }) && (0, s.invokeMethod)("uploadFile", e)
      },
      downloadFile: function(e) {
        u("downloadFile", e, {
          url: ""
        }) && (0, s.invokeMethod)("downloadFile", e)
      },
      chooseImage: function() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
        (0, s.invokeMethod)("chooseImage", (0, p.assign)({
          count: 9,
          sizeType: ["original", "compressed"],
          sourceType: ["album", "camera"]
        }, e), e)
      },
      previewImage: function(e) {
        u("previewImage", e, {
          urls: [""]
        }) && (0, s.invokeMethod)("previewImage", e)
      },
      startRecord: function(e) {
        (0, s.invokeMethod)("startRecord", e)
      },
      stopRecord: function(e) {
        (0, s.invokeMethod)("stopRecord", e)
      },
      playVoice: function(e) {
        u("playVoice", e, {
          filePath: ""
        }) && (0, s.invokeMethod)("playVoice", e)
      },
      pauseVoice: function(e) {
        (0, s.invokeMethod)("pauseVoice", e)
      },
      stopVoice: function(e) {
        (0, s.invokeMethod)("stopVoice", e)
      },
      onVoicePlayEnd: function(e) {
        (0, s.onMethod)("onVoicePlayEnd", e)
      },
      chooseVideo: function() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
        e.sourceType = e.sourceType || ["album", "camera"], e.camera = e.camera || ["front", "back"], (0, s.invokeMethod)("chooseVideo", e)
      },
      getLocation: function(e) {
        (0, s.invokeMethod)("getLocation", e)
      },
      openLocation: function() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
        u("openLocation", e, {}) && (0, s.invokeMethod)("openLocation", e)
      },
      getNetworkType: function(e) {
        (0, s.invokeMethod)("getNetworkType", e)
      },
      getSystemInfo: function(e) {
        (0, s.invokeMethod)("getSystemInfo", e)
      },
      onAccelerometerChange: function(e) {
        _ || ((0, s.invokeMethod)("enableAccelerometer", {
          enable: !0
        }), _ = !0), A.push(e)
      },
      onCompassChange: function(e) {
        k || ((0, s.invokeMethod)("enableCompass", {
          enable: !0
        }), k = !0), P.push(e)
      },
      reportAction: function(e) {
        (0, s.invokeMethod)("reportAction", e)
      },
      getBackgroundAudioPlayerState: function(e) {
        (0, s.invokeMethod)("getMusicPlayerState", e)
      },
      playBackgroundAudio: function() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
        (0, s.invokeMethod)("operateMusicPlayer", (0, p.assign)({
          operationType: "play"
        }, e), {
          beforeAll: function(e) {
            e.errMsg = e.errMsg.replace("operateMusicPlayer", "playBackgroundAudio")
          }
        })
      },
      pauseBackgroundAudio: function() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
        (0, s.invokeMethod)("operateMusicPlayer", (0, p.assign)({
          operationType: "pause"
        }, e), {
          beforeAll: function(e) {
            e.errMsg = e.errMsg.replace("operateMusicPlayer", "pauseBackgroundAudio")
          }
        })
      },
      seekBackgroundAudio: function() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
        (0, s.invokeMethod)("operateMusicPlayer", (0, p.assign)({
          operationType: "seek"
        }, e), {
          beforeAll: function(e) {
            e.errMsg = e.errMsg.replace("operateMusicPlayer", "seekBackgroundAudio")
          }
        })
      },
      stopBackgroundAudio: function() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
        (0, s.invokeMethod)("operateMusicPlayer", (0, p.assign)({
          operationType: "stop"
        }, e), {
          beforeAll: function(e) {
            e.errMsg = e.errMsg.replace("operateMusicPlayer", "stopBackgroundAudio")
          }
        })
      },
      onBackgroundAudioPlay: function(e) {
        (0, s.onMethod)("onMusicPlay", e)
      },
      onBackgroundAudioPause: function(e) {
        (0, s.onMethod)("onMusicPause", e)
      },
      onBackgroundAudioStop: function(e) {
        (0, s.onMethod)("onMusicEnd", e)
      },
      login: function(e) {
        (0, s.invokeMethod)("login", e)
      },
      checkLogin: function(e) {
        (0, s.invokeMethod)("checkLogin", e)
      },
      authorize: function(e) {
        (0, s.invokeMethod)("authorize", e)
      },
      getUserInfo: function(e) {
        (0, s.invokeMethod)("operateWXData", (0, p.assign)({
          data: {
            api_name: "webapi_getuserinfo",
            data: e.data || {}
          }
        }, e), {
          beforeAll: function(e) {
            e.errMsg = e.errMsg.replace("operateWXData", "getUserInfo")
          },
          beforeSuccess: function(e) {
            "android" === (0, p.getPlatform)() && (e.data = JSON.parse(e.data)), e.rawData = e.data.data;
            try {
              e.userInfo = JSON.parse(e.data.data), e.signature = e.data.signature, e.encryptData = e.data.encryptData, delete e.data
            } catch (e) {}
          }
        })
      },
      getFriends: function(e) {
        (0, s.invokeMethod)("operateWXData", {
          data: {
            api_name: "webapi_getfriends",
            data: e.data || {}
          },
          success: e.success,
          fail: e.fail,
          complete: e.complete
        }, {
          beforeAll: function(e) {
            e.errMsg = e.errMsg.replace("operateWXData", "getFriends")
          },
          beforeSuccess: function(e) {
            "android" === (0, p.getPlatform)() && (e.data = JSON.parse(e.data)), e.rawData = e.data.data;
            try {
              e.friends = JSON.parse(e.data.data), e.signature = e.data.signature, delete e.data
            } catch (e) {}
          }
        })
      },
      requestPayment: function(e) {
        (0, s.invokeMethod)("requestPayment", e)
      },
      verifyPaymentPassword: function(e) {
        (0, s.invokeMethod)("verifyPaymentPassword", e)
      },
      bindPaymentCard: function(e) {
        (0, s.invokeMethod)("bindPaymentCard", e)
      },
      openAddress: function(e) {
        (0, s.invokeMethod)("openAddress", e)
      },
      saveFile: function(e) {
        (0, s.invokeMethod)("saveFile", e)
      },
      openDocument: function(e) {
        (0, s.invokeMethod)("openDocument", e)
      },
      chooseContact: function(e) {
        (0, s.invokeMethod)("chooseContact", e)
      },
      makePhoneCall: function(e) {
        (0, s.invokeMethod)("makePhoneCall", e)
      },
      onAppRoute: function(e, t) {
        y.push(e)
      },
      onAppRouteDone: function(e, t) {
        w.push(e)
      },
      onAppEnterBackground: function(e, t) {
        (0, s.onMethod)("onAppEnterBackground", function() {
          "function" == typeof e && e.apply(e, arguments), Reporter.submit()
        })
      },
      onAppEnterForeground: function(e, t) {
        (0, s.onMethod)("onAppEnterForeground", e)
      },
      setAppData: function(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
          n = arguments[2];
        arguments[3];
        if (t.forceUpdate = "undefined" != typeof t.forceUpdate && t.forceUpdate, (0, p.isObject)(e) === !1) throw new p.AppServiceSdkKnownError("setAppData:data should be an object");
        ! function() {
          var o = !1,
            r = {},
            i = function(e, t, n) {
              o = !0, r[e] = t, "Array" === n || "Object" === n ? g[e] = JSON.parse(JSON.stringify(t)) : g[e] = t
            };
          for (var a in e) {
            var u = e[a],
              c = g[a],
              f = (0, p.getDataType)(c),
              l = (0, p.getDataType)(u);
            f !== l ? i(a, u, l) : "Array" == f || "Object" == f ? JSON.stringify(c) !== JSON.stringify(u) && i(a, u, l) : "String" == f || "Number" == f || "Boolean" == f ? c.toString() !== u.toString() && i(a, u, l) : "Date" == f ? c.getTime().toString() !== u.getTime().toString() && i(a, u, l) : c !== u && i(a, u, l)
          }
          t.forceUpdate ? (0, s.publish)("appDataChange", {
            data: e,
            option: {
              timestamp: Date.now(),
              forceUpdate: !0
            }
          }, n) : o && (0, s.publish)("appDataChange", {
            data: r
          }, n)
        }()
      },
      onPageEvent: function(e, t) {
        console.warn("'onPageEvent' is deprecated, use 'Page[eventName]'")
      },
      createAnimation: function() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
        if (u("createAnimation", e, {})) return new l.default(e)
      },
      onWebviewEvent: function(e, t) {
        b = e, (0, s.subscribe)("PAGE_EVENT", function(t) {
          var n = t.data,
            o = t.eventName,
            r = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
          e({
            data: n,
            eventName: o,
            webviewId: r
          })
        })
      },
      hideKeyboard: function(e) {
        "devtools" == (0, p.getPlatform)() ? (0, s.publish)("hideKeyboard", {}) : (0, s.invokeMethod)("hideKeyboard", e)
      },
      getPublicLibVersion: function() {
        var e = void 0;
        return (0, s.invokeMethod)("getPublicLibVersion", {
          complete: function(t) {
            t.version ? e = t.version : (e = t, delete e.errMsg)
          }
        }), e
      }
    };
    (0, s.subscribe)("pageReady", function() {
      (0, s.publish)("pageInitData", {
        data: g
      })
    }), (0, s.subscribe)("INVOKE_METHOD", i(function(e, t) {
      var n = e.name,
        o = e.args;
      T[n](o)
    })), (0, s.onMethod)("onAppRoute", i(function(e) {
      var t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
      e.path = e.path.substring(0, e.path.length - 5), e.webviewId = "undefined" != typeof e.webviewId ? e.webviewId : t, v = e.path;
      for (var n in e.query) e.query[n] = decodeURIComponent(e.query[n]);
      "navigateBack" != e.openType && "redirectTo" != e.openType || (0, h.clearOldWebviewCanvas)(), (0, h.notifyWebviewIdtoCanvas)(e.webviewId), y.forEach(function(t) {
        t(e)
      })
    })), (0, s.onMethod)("onAppRouteDone", i(function(e) {
      var t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
      e.path = e.path.substring(0, e.path.length - 5), e.webviewId = "undefined" != typeof e.webviewId ? e.webviewId : t, v = e.path, w.forEach(function(t) {
        t(e)
      }), (0, s.publish)("onAppRouteDone", {}, [t])
    })), (0, s.onMethod)("onKeyboardValueChange", i(function(e) {
      var t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1],
        n = e.value,
        o = e.cursor;
      if (e.data && "function" == typeof b) {
        var r = JSON.parse(e.data);
        if (r.bindinput) {
          var i;
          try {
            i = b({
              data: {
                type: "input",
                target: r.target,
                currentTarget: r.target,
                timeStamp: Date.now(),
                touches: [],
                detail: {
                  value: e.value,
                  cursor: e.cursor
                }
              },
              eventName: r.bindinput,
              webviewId: t
            })
          } catch (e) {
            throw new p.AppServiceSdkKnownError("bind key input error")
          }
          "String" === (0, p.getDataType)(i) ? (o = -1, n = i, (0, s.invokeMethod)("setKeyboardValue", {
            value: n,
            cursor: o,
            inputId: e.inputId
          })) : "Object" === (0, p.getDataType)(i) && (n = i.value || "", o = "undefined" == typeof i.cursor ? -1 : i.cursor, (0, s.invokeMethod)("setKeyboardValue", {
            value: n,
            cursor: o,
            inputId: e.inputId
          }))
        }
      }(0, s.publish)("setKeyboardValue", {
        value: n,
        cursor: o,
        inputId: e.inputId
      }, [t])
    })), ["onCanvasTouchStart", "onCanvasTouchMove", "onCanvasTouchEnd", "onCanvasTouchCancel"].forEach(function(e) {
      (0, s.onMethod)(e, i(function(t) {
        var n = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1],
          o = t.touches,
          r = t.data;
        r && (r = JSON.parse(r), r[e] && "function" == typeof b && b({
          data: {
            touches: o,
            type: e.slice(8).toLowerCase(),
            target: r.target,
            currentTarget: r.target,
            timestamp: Date.now()
          },
          eventName: r[e],
          webviewId: n
        }))
      }))
    }), (0, s.onMethod)("onAccelerometerChange", i(function() {
      var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
      arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
      A.forEach(function(t) {
        "function" == typeof t && t(e)
      })
    })), (0, s.onMethod)("onCompassChange", i(function() {
      var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
      arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
      P.forEach(function(t) {
        "function" == typeof t && t(e)
      })
    }));
    for (var O in T) a(O);
    e.exports = m
  }, function(e, t) {
    function n() {
      WeixinJSBridge.invoke.apply(WeixinJSBridge, arguments)
    }

    function o() {
      WeixinJSBridge.on.apply(WeixinJSBridge, arguments)
    }

    function r() {
      var e = Array.prototype.slice.call(arguments);
      e[1] = {
        data: e[1],
        options: {
          timestamp: Date.now()
        }
      }, WeixinJSBridge.publish.apply(WeixinJSBridge, e)
    }

    function i() {
      var e = Array.prototype.slice.call(arguments),
        t = e[1];
      e[1] = function(e, n) {
        var o = e.data,
          r = e.options,
          i = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2],
          a = r && r.timestamp || 0,
          u = Date.now();
        if ("function" == typeof t && t(o, n), u - a > 20) {
          var c = JSON.stringify(o || {}).length;
          Reporter.reportKeyValue({
            key: "Speed",
            value: "1," + a + "," + i.nativeTime + "," + i.nativeTime + "," + u + "," + c
          })
        }
      }, WeixinJSBridge.subscribe.apply(WeixinJSBridge, e)
    }

    function a(e) {
      var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
        o = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2],
        r = {};
      for (var i in t) "function" == typeof t[i] && (r[i] = t[i], delete t[i]);
      n(e, t, function(t) {
        t.errMsg = t.errMsg || e + ":ok";
        var n = 0 === t.errMsg.indexOf(e + ":ok"),
          i = 0 === t.errMsg.indexOf(e + ":cancel"),
          a = 0 === t.errMsg.indexOf(e + ":fail");
        "function" == typeof o.beforeAll && o.beforeAll(t), n ? ("function" == typeof o.beforeSuccess && o.beforeSuccess(t), "function" == typeof r.success && r.success(t), "function" == typeof o.afterSuccess && o.afterSuccess(t)) : i ? ("function" == typeof r.cancel && r.cancel(t), "function" == typeof o.cancel && o.cancel(t), Reporter.reportIDKey({
          key: e + "_cancel"
        })) : a && ("function" == typeof r.fail && r.fail(t), "function" == typeof o.fail && o.fail(t), Reporter.reportIDKey({
          key: e + "_fail"
        })), "function" == typeof r.complete && r.complete(t), "function" == typeof o.complete && o.complete(t)
      }), Reporter.reportIDKey({
        key: e
      })
    }

    function u(e, t) {
      o(e, t)
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.invoke = n, t.on = o, t.publish = r, t.subscribe = i, t.invokeMethod = a, t.onMethod = u
  }, function(e, t) {
    function n(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
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

    function i(e) {
      var t = Object.prototype.toString.call(e).split(" ")[1].split("]")[0];
      return e = "Array" == t || "Object" == t ? JSON.stringify(e) : "String" == t || "Number" == t || "Boolean" == t ? e.toString() : "Date" == t ? e.getTime().toString() : "Undefined" == t ? "undefined" : "Null" == t ? "null" : "", {
        data: e,
        dataType: t
      }
    }

    function a(e, t) {
      return e = "String" == t ? e : "Array" == t || "Object" == t ? JSON.parse(e) : "Number" == t ? parseFloat(e) : "Boolean" == t ? "true" == e : "Date" == t ? new Date(parseInt(e)) : "Undefined" == t ? void 0 : "Null" == t ? null : ""
    }

    function u(e) {
      return Object.prototype.toString.call(e).split(" ")[1].split("]")[0]
    }

    function c(e) {
      return "Object" === u(e)
    }

    function s(e, t) {
      var n = arguments.length <= 2 || void 0 === arguments[2] ? "data" : arguments[2],
        o = u(t),
        r = u(e);
      if (r != o) return n + " should be " + o + " instead of " + r + ";";
      switch (result = "", o) {
        case "String":
        case "Number":
        case "RegExp":
        case "Undefined":
        case "Boolean":
        case "Null":
        case "function":
          break;
        case "Object":
          for (var i in t) result += s(e[i], t[i], n + "." + i);
          break;
        case "Array":
          if (e.length < t.length) return n + " should have at least " + t.length + " item;";
          for (var a = 0; a < t.length; ++a) result += s(e[a], t[a], n + "[" + a + "]")
      }
      return result
    }

    function p(e, t) {
      var n = arguments.length <= 2 || void 0 === arguments[2] || arguments[2];
      if (n && (t = y(t)), 0 === t.indexOf("/")) return t.substr(1);
      if (0 === t.indexOf("./")) return p(e, t.substr(2), !1);
      var o, r, i = t.split("/");
      for (o = 0, r = i.length; o < r && ".." === i[o]; o++);
      i.splice(0, o);
      var t = i.join("/"),
        a = e.length > 0 ? e.split("/") : [];
      a.splice(a.length - o - 1, o + 1);
      var u = a.concat(i),
        c = u.join("/");
      return c
    }

    function f() {
      return "undefined" != typeof window && window.navigator ? window.navigator.userAgent.indexOf("appservice") > -1 ? "devtools" : window.navigator.userAgent.toLowerCase().indexOf("android") > -1 ? "android" : "" : "ios"
    }

    function l(e) {
      if ("object" !== ("undefined" == typeof e ? "undefined" : w(e))) return e;
      var t = [];
      for (var n in e) e.hasOwnProperty(n) && t.push(n + "=" + e[n]);
      return t.join("&")
    }

    function d(e, t) {
      if ("string" == typeof e && "object" === ("undefined" == typeof t ? "undefined" : w(t)) && Object.keys(t).length > 0) {
        var n = e.split("?"),
          o = n[0],
          r = (n[1] || "").split("&").reduce(function(e, t) {
            if ("string" == typeof t && t.length > 0) {
              var n = t.split("="),
                o = n[0],
                r = n[1];
              e[o] = r
            }
            return e
          }, {});
        for (var i in t) t.hasOwnProperty(i) && ("object" === w(t[i]) && (t[i] = JSON.stringify(t[i])), t[i] = encodeURIComponent(t[i]));
        return o + "?" + l(g(r, t))
      }
      return e
    }

    function h(e) {
      return /^(http|https):\/\/.*/i.test(e)
    }

    function g() {
      for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
      return t.reduce(function(e, t) {
        for (var n in t) e[n] = t[n];
        return e
      }, {})
    }

    function v(e) {
      if ("string" == typeof e) {
        var t = e.split("?"),
          n = t[0],
          o = (t[1] || "").split("&").reduce(function(e, t) {
            if ("string" == typeof t && t.length > 0) {
              var n = t.split("="),
                o = n[0],
                r = n[1];
              e[o] = r
            }
            return e
          }, {}),
          r = [];
        for (var i in o) o.hasOwnProperty(i) && r.push(i + "=" + encodeURIComponent(o[i]));
        return r.length > 0 ? n + "?" + r.join("&") : e
      }
      return e
    }

    function y(e) {
      if ("string" != typeof e) throw new b("wx.redirectTo: invalid url:" + e);
      var t = e.split("?")[0],
        n = e.split("?")[1];
      return t += ".html", "undefined" != typeof n ? t + "?" + n : t
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
      return typeof e
    } : function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
    };
    t.anyTypeToString = i, t.stringToAnyType = a, t.getDataType = u, t.isObject = c, t.paramCheck = s, t.getRealRoute = p, t.getPlatform = f, t.urlEncodeFormData = l, t.addQueryStringToUrl = d, t.validateUrl = h, t.assign = g, t.encodeUrlQuery = v;
    var b = t.AppServiceSdkKnownError = function(e) {
      function t(e) {
        n(this, t);
        var r = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "APP-SERVICE-SDK:" + e));
        return r.type = "AppServiceSdkKnownError", r
      }
      return r(t, e), t
    }(Error)
  }, function(e, t) {
    function n(e) {
      if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n
      }
      return Array.from(e)
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
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
          }
        }
        return function(t, n, o) {
          return n && e(t.prototype, n), o && e(t, o), t
        }
      }(),
      i = function() {
        function e() {
          var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
          o(this, e), this.actions = [], this.currentTransform = [], this.currentStepAnimates = [], this.option = {
            transition: {
              duration: "undefined" != typeof t.duration ? t.duration : 400,
              timingFunction: "undefined" != typeof t.timingFunction ? t.timingFunction : "linear",
              delay: "undefined" != typeof t.delay ? t.delay : 0
            },
            transformOrigin: t.transformOrigin || "50% 50% 0"
          }
        }
        return r(e, [{
          key: "export",
          value: function() {
            var e = this.actions;
            return this.actions = [], {
              actions: e
            }
          }
        }, {
          key: "step",
          value: function() {
            var e = this,
              t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            return this.currentStepAnimates.forEach(function(t) {
              "style" !== t.type ? e.currentTransform[t.type] = t : e.currentTransform[t.type + "." + t.args[0]] = t
            }), this.actions.push({
              animates: Object.keys(this.currentTransform).reduce(function(t, o) {
                return [].concat(n(t), [e.currentTransform[o]])
              }, []),
              option: {
                transformOrigin: "undefined" != typeof t.transformOrigin ? t.transformOrigin : this.option.transformOrigin,
                transition: {
                  duration: "undefined" != typeof t.duration ? t.duration : this.option.transition.duration,
                  timingFunction: "undefined" != typeof t.timingFunction ? t.timingFunction : this.option.transition.timingFunction,
                  delay: "undefined" != typeof t.delay ? t.delay : this.option.transition.delay
                }
              }
            }), this.currentStepAnimates = [], this
          }
        }, {
          key: "matrix",
          value: function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0],
              t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1],
              n = arguments.length <= 2 || void 0 === arguments[2] ? 0 : arguments[2],
              o = arguments.length <= 3 || void 0 === arguments[3] ? 1 : arguments[3],
              r = arguments.length <= 4 || void 0 === arguments[4] ? 1 : arguments[4],
              i = arguments.length <= 5 || void 0 === arguments[5] ? 1 : arguments[5];
            return this.currentStepAnimates.push({
              type: "matrix",
              args: [e, t, n, o, r, i]
            }), this
          }
        }, {
          key: "matrix3d",
          value: function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0],
              t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1],
              n = arguments.length <= 2 || void 0 === arguments[2] ? 0 : arguments[2],
              o = arguments.length <= 3 || void 0 === arguments[3] ? 0 : arguments[3],
              r = arguments.length <= 4 || void 0 === arguments[4] ? 0 : arguments[4],
              i = arguments.length <= 5 || void 0 === arguments[5] ? 1 : arguments[5],
              a = arguments.length <= 6 || void 0 === arguments[6] ? 0 : arguments[6],
              u = arguments.length <= 7 || void 0 === arguments[7] ? 0 : arguments[7],
              c = arguments.length <= 8 || void 0 === arguments[8] ? 0 : arguments[8],
              s = arguments.length <= 9 || void 0 === arguments[9] ? 0 : arguments[9],
              p = arguments.length <= 10 || void 0 === arguments[10] ? 1 : arguments[10],
              f = arguments.length <= 11 || void 0 === arguments[11] ? 0 : arguments[11],
              l = arguments.length <= 12 || void 0 === arguments[12] ? 0 : arguments[12],
              d = arguments.length <= 13 || void 0 === arguments[13] ? 0 : arguments[13],
              h = arguments.length <= 14 || void 0 === arguments[14] ? 0 : arguments[14],
              g = arguments.length <= 15 || void 0 === arguments[15] ? 1 : arguments[15];
            return this.currentStepAnimates.push({
              type: "matrix3d",
              args: [e, t, n, o, r, i, a, u, c, s, p, f, l, d, h, g]
            }), this.stepping = !1, this
          }
        }, {
          key: "rotate",
          value: function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
            return this.currentStepAnimates.push({
              type: "rotate",
              args: [e]
            }), this
          }
        }, {
          key: "rotate3d",
          value: function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0],
              t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1],
              n = arguments.length <= 2 || void 0 === arguments[2] ? 0 : arguments[2],
              o = arguments.length <= 3 || void 0 === arguments[3] ? 0 : arguments[3];
            return this.currentStepAnimates.push({
              type: "rotate3d",
              args: [e, t, n, o]
            }), this.stepping = !1, this
          }
        }, {
          key: "rotateX",
          value: function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
            return this.currentStepAnimates.push({
              type: "rotateX",
              args: [e]
            }), this.stepping = !1, this
          }
        }, {
          key: "rotateY",
          value: function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
            return this.currentStepAnimates.push({
              type: "rotateY",
              args: [e]
            }), this.stepping = !1, this
          }
        }, {
          key: "rotateZ",
          value: function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
            return this.currentStepAnimates.push({
              type: "rotateZ",
              args: [e]
            }), this.stepping = !1, this
          }
        }, {
          key: "scale",
          value: function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0],
              t = arguments[1];
            return t = "undefined" != typeof t ? t : e, this.currentStepAnimates.push({
              type: "scale",
              args: [e, t]
            }), this
          }
        }, {
          key: "scale3d",
          value: function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0],
              t = arguments.length <= 1 || void 0 === arguments[1] ? 1 : arguments[1],
              n = arguments.length <= 2 || void 0 === arguments[2] ? 1 : arguments[2];
            return this.currentStepAnimates.push({
              type: "scale3d",
              args: [e, t, n]
            }), this
          }
        }, {
          key: "scaleX",
          value: function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0];
            return this.currentStepAnimates.push({
              type: "scaleX",
              args: [e]
            }), this
          }
        }, {
          key: "scaleY",
          value: function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0];
            return this.currentStepAnimates.push({
              type: "scaleY",
              args: [e]
            }), this
          }
        }, {
          key: "scaleZ",
          value: function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0];
            return this.currentStepAnimates.push({
              type: "scaleZ",
              args: [e]
            }), this
          }
        }, {
          key: "skew",
          value: function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0],
              t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
            return this.currentStepAnimates.push({
              type: "skew",
              args: [e, t]
            }), this
          }
        }, {
          key: "skewX",
          value: function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
            return this.currentStepAnimates.push({
              type: "skewX",
              args: [e]
            }), this
          }
        }, {
          key: "skewY",
          value: function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
            return this.currentStepAnimates.push({
              type: "skewY",
              args: [e]
            }), this
          }
        }, {
          key: "translate",
          value: function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0],
              t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
            return this.currentStepAnimates.push({
              type: "translate",
              args: [e, t]
            }), this
          }
        }, {
          key: "translate3d",
          value: function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0],
              t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1],
              n = arguments.length <= 2 || void 0 === arguments[2] ? 0 : arguments[2];
            return this.currentStepAnimates.push({
              type: "translate3d",
              args: [e, t, n]
            }), this
          }
        }, {
          key: "translateX",
          value: function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
            return this.currentStepAnimates.push({
              type: "translateX",
              args: [e]
            }), this
          }
        }, {
          key: "translateY",
          value: function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
            return this.currentStepAnimates.push({
              type: "translateY",
              args: [e]
            }), this
          }
        }, {
          key: "translateZ",
          value: function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
            return this.currentStepAnimates.push({
              type: "translateZ",
              args: [e]
            }), this
          }
        }, {
          key: "opacity",
          value: function(e) {
            return this.currentStepAnimates.push({
              type: "style",
              args: ["opacity", e]
            }), this
          }
        }, {
          key: "backgroundColor",
          value: function(e) {
            return this.currentStepAnimates.push({
              type: "style",
              args: ["backgroundColor", e]
            }), this
          }
        }, {
          key: "width",
          value: function(e) {
            return "number" == typeof e && (e += "px"), this.currentStepAnimates.push({
              type: "style",
              args: ["width", e]
            }), this
          }
        }, {
          key: "height",
          value: function(e) {
            return "number" == typeof e && (e += "px"), this.currentStepAnimates.push({
              type: "style",
              args: ["height", e]
            }), this
          }
        }, {
          key: "left",
          value: function(e) {
            return "number" == typeof e && (e += "px"), this.currentStepAnimates.push({
              type: "style",
              args: ["left", e]
            }), this
          }
        }, {
          key: "right",
          value: function(e) {
            return "number" == typeof e && (e += "px"), this.currentStepAnimates.push({
              type: "style",
              args: ["right", e]
            }), this
          }
        }, {
          key: "top",
          value: function(e) {
            return "number" == typeof e && (e += "px"), this.currentStepAnimates.push({
              type: "style",
              args: ["top", e]
            }), this
          }
        }, {
          key: "bottom",
          value: function(e) {
            return "number" == typeof e && (e += "px"), this.currentStepAnimates.push({
              type: "style",
              args: ["bottom", e]
            }), this
          }
        }]), e
      }();
    t.default = i
  }, function(module, exports) {
    if (!("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.indexOf("appservice") > -1)) try {
      eval("const GeneratorFunction = Object.getPrototypeOf(function *() {}).constructor; const f = new GeneratorFunction('', 'console.log(0)'); f().__proto__.__proto__.next = () => {};")
    } catch (e) {}
  }, function(e, t, n) {
    (function(e) {
      n(1);
      if ("undefined" != typeof Function) {
      }
      "undefined" != typeof eval, "undefined" != typeof navigator && ! function() {
        var e = setTimeout;
        setTimeout = function(t, n) {
          if ("function" == typeof t) return e(t, n)
        };
        var t = setInterval;
        setInterval = function(e, n) {
          if ("function" == typeof e) return t(e, n)
        }
      }()
    }).call(t, function() {
      return this
    }())
  }, function(e, t, n) {
    var o = n(1),
      r = n(2),
      i = n(7);
    "undefined" != typeof __wxConfig && __wxConfig.debug && "devtools" !== (0, r.getPlatform)() && ! function() {
      var e = [],
        t = ["log", "warn", "error", "info", "debug"];
      t.forEach(function(t) {
        var n = console[t];
        console[t] = function() {
          e.length > i.LOG_LIMIT && e.shift();
          var r = Array.prototype.slice.call(arguments);
          e.push({
            method: t,
            log: r
          }), n.apply(console, arguments), (0, o.publish)(t, {
            log: r
          })
        }
      }), (0, o.subscribe)("DOMContentLoaded", function() {
        (0, o.publish)("initLogs", {
          logs: e
        })
      })
    }()
  }, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    t.LOG_LIMIT = 1024
  }, function(e, t, n) {
    function o(e) {
      g = e
    }

    function r(e) {
      return "number" == typeof e
    }

    function i(e) {
      var t = null;
      if (null != (t = /^#([0-9|A-F|a-f]{6})$/.exec(e))) {
        var n = parseInt(t[1].slice(0, 2), 16),
          o = parseInt(t[1].slice(2, 4), 16),
          r = parseInt(t[1].slice(4), 16);
        return [n, o, r, 255]
      }
      return null != (t = /^rgb\((.+)\)$/.exec(e)) ? t[1].split(",").map(function(e) {
        return parseInt(e.trim())
      }).concat(255) : null != (t = /^rgba\((.+)\)$/.exec(e)) ? t[1].split(",").map(function(e, t) {
        return 3 == t ? Math.floor(255 * parseFloat(e.trim())) : parseInt(e.trim())
      }) : void 0
    }

    function a(e, t) {
      this.type = e, this.data = t, this.colorStop = []
    }

    function u() {
      this.actions = [], this.path = []
    }

    function c(e) {
      if (Array.isArray(e)) {
        var t = [];
        return e.forEach(function(e) {
          t.push(c(e))
        }), t
      }
      if ("object" == ("undefined" == typeof e ? "undefined" : s(e))) {
        var t = {};
        for (var n in e) t[n] = c(e[n]);
        return t
      }
      return e
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.Context = t.notifyCurrentRoutetoContext = void 0;
    var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
      },
      p = n(2),
      f = ["scale", "rotate", "translate", "save", "restore"],
      l = ["drawImage", "fillText", "fill", "stroke", "clearRect"],
      d = ["beginPath", "moveTo", "lineTo", "rect", "arc", "quadraticCurveTo", "bezierCurveTo", "closePath"],
      h = ["setFillStyle", "setStrokeStyle", "setGlobalAlpha", "createLinearGradient", "createRadialGradient", "setShadow", "setFontSize", "setLineCap", "setLineJoin", "setLineWidth", "setMiterLimit"],
      g = "";
    a.prototype.addColorStop = function(e, t) {
      this.colorStop.push([e, i(t)])
    }, u.prototype.getActions = function() {
      var e = c(this.actions);
      return this.actions = [], this.path = [], e
    }, u.prototype.clearActions = function() {
      this.actions = [], this.path = []
    }, [].concat(f, l).forEach(function(e) {
      "fill" == e || "stroke" == e ? u.prototype[e] = function() {
        this.actions.push({
          method: e + "Path",
          data: c(this.path)
        })
      } : "fillText" == e ? u.prototype[e] = function(t, n, o) {
        this.actions.push({
          method: e,
          data: [t.toString(), n, o]
        })
      } : "drawImage" == e ? u.prototype[e] = function(t, n, o, i, a) {
        "devtools" == (0, p.getPlatform)() || /wxfile:\/\//.test(t) || (t = (0, p.getRealRoute)(g, t).replace(/.html$/, "")), r(i) && r(a) ? data = [t, n, o, i, a] : data = [t, n, o], this.actions.push({
          method: e,
          data: data
        })
      } : u.prototype[e] = function() {
        this.actions.push({
          method: e,
          data: [].slice.apply(arguments)
        })
      }
    }), d.forEach(function(e) {
      "beginPath" == e ? u.prototype[e] = function() {
        this.path = []
      } : "lineTo" == e ? u.prototype.lineTo = function() {
        0 == this.path.length ? this.path.push({
          method: "moveTo",
          data: [].slice.apply(arguments)
        }) : this.path.push({
          method: "lineTo",
          data: [].slice.apply(arguments)
        })
      } : u.prototype[e] = function() {
        this.path.push({
          method: e,
          data: [].slice.apply(arguments)
        })
      }
    }), h.forEach(function(e) {
      "createLinearGradient" == e ? u.prototype[e] = function() {
        return new a("linear", [].slice.apply(arguments, [0, 4]))
      } : "createRadialGradient" == e ? u.prototype[e] = function() {
        return new a("radial", [].slice.apply(arguments, [0, 3]))
      } : "setFillStyle" == e || "setStrokeStyle" == e ? u.prototype[e] = function() {
        var t = arguments[0];
        "string" == typeof t ? this.actions.push({
          method: e,
          data: ["normal", i(t)]
        }) : "object" == ("undefined" == typeof t ? "undefined" : s(t)) && t instanceof a && this.actions.push({
          method: e,
          data: [t.type, t.data, t.colorStop]
        })
      } : "setGlobalAlpha" === e ? u.prototype[e] = function() {
        var t = [].slice.apply(arguments, [0, 1]);
        t[0] = Math.floor(255 * parseFloat(t[0])), this.actions.push({
          method: e,
          data: t
        })
      } : "setShadow" == e ? u.prototype[e] = function() {
        var t = [].slice.apply(arguments, [0, 4]);
        t[3] = i(t[3]), this.actions.push({
          method: e,
          data: t
        })
      } : u.prototype[e] = function() {
        this.actions.push({
          method: e,
          data: [].slice.apply(arguments, [0, 1])
        })
      }
    }), t.notifyCurrentRoutetoContext = o, t.Context = u
  }, function(e, t, n) {
    function o(e, t) {
      return e + "canvas" + t
    }

    function r() {
      for (var e in h)
        if (0 == e.indexOf(d + "canvas")) {
          h[e];
          delete h[e]
        }
    }

    function i(e) {
      d = e
    }

    function a(e, t) {
      var n = !(arguments.length <= 2 || void 0 === arguments[2]) && arguments[2],
        o = arguments[3],
        r = arguments[4],
        i = arguments[5],
        a = (0, l.getPlatform)();
      "ios" == a || "android" == a ? WeixinJSBridge.invoke("drawCanvas", {
        canvasId: e,
        reserve: n,
        actions: t
      }, function(e) {
        e.errMsg && /ok/.test(e.errMsg) ? "function" == typeof o && o(e) : "function" == typeof r && r(e), "function" == typeof i && i(e)
      }) : WeixinJSBridge.publish("canvas" + e + "actionsChanged", {
        actions: t,
        reserve: n
      })
    }

    function u(e) {
      var t = e.canvasId,
        n = e.actions,
        r = e.reserve,
        i = e.success,
        u = e.fail,
        c = e.complete;
      if (t && Array.isArray(n)) {
        var s = o(d, t);
        if ("number" == typeof h[s]) {
          var p = h[s];
          a(p, n, r, i, u, c)
        } else g[s] = g[s] || [], g[s] = g[s].concat({
          actions: n,
          reserve: r,
          success: i,
          fail: u,
          complete: c
        })
      }
    }

    function c(e) {
      if (e.canvasId) {
        var t = o(d, e.canvasId);
        if ("number" == typeof h[t]) e.canvasId = h[t], (0, p.invokeMethod)("toTempFilePath", e);
        else {
          var n = {
            errMsg: "toTempFilePath: fail canvas is empty"
          };
          "function" == typeof e.fail && e.fail(n), "function" == typeof e.complete && e.complete(n)
        }
      }
    }

    function s() {
      return new f.Context
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.createContext = t.toTempFilePath = t.drawCanvas = t.notifyWebviewIdtoCanvas = t.clearOldWebviewCanvas = void 0;
    var p = n(1),
      f = n(8),
      l = n(2),
      d = 0,
      h = {},
      g = {};
    WeixinJSBridge.subscribe("canvasInsert", function(e, t) {
      var n = e.canvasId,
        r = e.canvasNumber,
        i = o(d, n);
      h[i] = h[i] || r, Array.isArray(g[i]) && (g[i].forEach(function(e) {
        a(r, e.actions, e.success, e.fail, e.complete)
      }), delete g[i])
    }), WeixinJSBridge.subscribe("canvasRemove", function(e, t) {
      var n = e.canvasId,
        r = o(d, n);
      h[r] && delete h[r]
    }), t.clearOldWebviewCanvas = r, t.notifyWebviewIdtoCanvas = i, t.drawCanvas = u, t.toTempFilePath = c, t.createContext = s
  }]),
  __appServiceEngine = function(e) {
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
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = n(1);
    Object.defineProperty(t, "Page", {
      enumerable: !0,
      get: function() {
        return o.pageHolder
      }
    });
    var r = n(9);
    Object.defineProperty(t, "App", {
      enumerable: !0,
      get: function() {
        return r.appHolder
      }
    }), Object.defineProperty(t, "getApp", {
      enumerable: !0,
      get: function() {
        return r.getApp
      }
    })
  }, function(e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.getRouteToPage = t.getWebviewIdToPage = t.setWxRouteBegin = t.setWxRoute = t.setWxConfig = t.reset = t.pageHolder = t.getCurrentPage = void 0;
    var r = n(2),
      i = n(5),
      a = o(i),
      u = n(2),
      c = n(8),
      s = void 0,
      p = {},
      f = {},
      l = 0,
      d = {
        appRouteTime: 0,
        newPageTime: 0,
        pageReadyTime: 0
      },
      h = function(e, t, n) {
        var o = c.SPEED_REPORT_TYPE[e];
        o && (Reporter.reportKeyValue({
          key: "Speed",
          value: o + "," + t + ",0,0," + n
        }), Reporter.log("JSEngine SpeedReport:" + e + ",startTime:" + t + ",endTime:" + n + ",cost:" + (n - t)))
      },
      g = (t.getCurrentPage = function() {
        return s
      }, t.pageHolder = function(e) {
        if (!__wxRouteBegin) throw (0, u.error)("Page注册错误", "不要在 " + __wxRoute + ".js 注册多个Page"), new r.AppServiceEngineKnownError("Please do not register multiple Page in " + __wxRoute + ".js");
        __wxRouteBegin = !1;
        var t = __wxConfig.pages,
          n = t[l];
        if (n !== __wxRoute) {
          var o = t[l];
          throw (0, u.error)("Page注册错误", "没有在 " + o + ".js 找到Page"), new r.AppServiceEngineKnownError("Please register Page in " + o + ".js")
        }
        if (l++, "Object" !== (0, u.getDataType)(e)) throw (0, u.error)("Page注册错误", __wxRoute + ".js中Page()的参数不是对象: " + JSON.stringify(e)), new r.AppServiceEngineKnownError("Options is not object: " + JSON.stringify(e) + " in " + __wxRoute + ".js");
        (0, u.info)("Register Page: " + n), f[n] = e
      },
      window.Reload = function (e) {
        var pages = __wxConfig.pages;
        if (pages.indexOf(window.__wxRoute) == -1) return
        f[window.__wxRoute] = e
        var keys = Object.keys(p)
        var isCurr = s.route == window.__wxRoute
        keys.forEach(function (key) {
          var o = p[key];
          key = Number(key)
          var query = o.__query__
          // current instance
          var page = o.page
          var route = o.route
          // page created
          if (route == window.__wxRoute) {
            isCurr && page.onHide()
            page.onUnload()
            // create new page instance
            var newPage = new a.default(e, key, route)
            newPage.__query__ = query
            if (isCurr) s.page = newPage
            o.page = newPage
            newPage.onLoad()
            if (isCurr) newPage.onShow()
            window.__wxAppData[route] = newPage.data
            window.__wxAppData[route].__webviewId__ = key
            u.publish(c.UPDATE_APP_DATA)
            u.info("Update view with init data")
            u.info(newPage.data)
            u.publish("appDataChange", {
              data: {
                data: newPage.data
              },
              option: {
                timestamp: Date.now()
              }
            })
            newPage.__webviewReady__ = true
            newPage.onReady()
          }
        })

        u.info("Reload page: " + window.__wxRoute)
      }, function(e, t, n) {
        var o = void 0;
        f.hasOwnProperty(e) ? o = f[e] : ((0, u.warn)("Page[" + e + "] not found. May be caused by: 1. Forgot to add page route in app.json. 2. Invoking Page() in async task."), o = {}), d.newPageTime = Date.now();
        var r = new a.default(o, t, e);
        (0, u.isDevTools)() && (__wxAppData[e] = r.data, __wxAppData[e].__webviewId__ = t, (0, u.publish)(c.UPDATE_APP_DATA)), s = {
          page: r,
          webviewId: t,
          route: e
        }, r.onLoad(n), r.onShow(), p[t] = {
          page: r,
          route: e
        }, h("appRoute2newPage", d.appRouteTime, d.newPageTime)
      }),
      v = function(e) {
        e.page.onHide()
      },
      y = function(e) {
        e.page.onUnload(), (0, u.isDevTools)() && (delete __wxAppData[e.route], (0, u.publish)(c.UPDATE_APP_DATA)), delete p[e.webviewId]
      },
      w = function(e, t, n, o) {
        if ((0, u.info)("On app route: " + e), d.appRouteTime = Date.now(), "navigateTo" === o) s && v(s), p.hasOwnProperty(t) ? (0, u.error)("Page route错误", "navigateTo 一个已经存在的webviewId" + t) : g(e, t, n);
        else if ("redirectTo" === o) s && y(s), p.hasOwnProperty(t) ? (0, u.error)("Page route错误", "redirectTo 一个已经存在的webviewId" + t) : g(e, t, n);
        else if ("navigateBack" === o)
          if (s && y(s), p.hasOwnProperty(t)) {
            var r = p[t].page;
            s = {
              webviewId: t,
              route: e,
              page: r
            }, r.onShow()
          } else(0, u.error)("Page route错误", "navigateBack 一个不存在的webviewId" + t);
        else if ("switchTab" === o)
          if (s && v(s), p.hasOwnProperty(t)) {
            var i = p[t].page;
            s = {
              webviewId: t,
              route: e,
              page: i
            }, i.onShow()
          } else g(e, t, n);
        else "appLaunch" === o ? p.hasOwnProperty(t) ? (0, u.error)("Page route错误", "apppLaunch 一个已经存在的webviewId" + t) : g(e, t, n) : (0, u.error)("Page route错误", "非法Open type: " + o)
      },
      b = function(e, t, n, o) {
        if (s) s.page.onRouteEnd();
        else if ((0, u.warn)("page isn't ready yet"), p.hasOwnProperty(t)) {
          var r = p[t].page;
          s = {
            webviewId: t,
            route: e,
            page: r
          }, r.onRouteEnd()
        } else g(e, t, n)
      },
      m = function(e, t, n) {
        if (!p.hasOwnProperty(e)) throw new r.AppServiceEngineKnownError("OnWebviewEvent: " + t + ", WebviewId: " + e + " not found");
        var o = p[e],
          i = o.page;
        if (t === c.DOM_READY_EVENT) return d.pageReadyTime = Date.now(), i.onReady(), void h("newPage2pageReady", d.newPageTime, d.pageReadyTime);
        if ((0, u.info)("Invoke event " + t + " in page: " + o.route), !i.hasOwnProperty(t)) throw new r.AppServiceEngineKnownError("Do not have " + t + " handler in current page: " + o.route + ". Please make sure that " + t + " handler has been defined in " + o.route + ", or " + o.route + " has been added into app.json");
        return i[t](n)
      },
      S = function(e) {
        var t = p[e],
          n = t.page;
        n.hasOwnProperty("onPullDownRefresh") && ((0, u.info)("Invoke event onPullDownRefresh in page: " + t.route), n.onPullDownRefresh())
      },
      _ = function(e, t) {
        var n = e,
          o = p[t],
          r = o.page;
        if (r.hasOwnProperty("onMenuShareAppMessage")) {
          (0, u.info)("Invoke event onMenuShareAppMessage in page: " + o.route);
          var i = r.onMenuShareAppMessage() || {};
          n.title = i.title || e.title, n.desc = i.desc || e.desc, n.imgUrl = i.imgUrl || e.imgUrl, n.path = i.path ? (0, u.addHtmlSuffixToUrl)(i.path) : e.path, n.shareAppCard = "undefined" != typeof i.shareAppCard && i.shareAppCard
        }
        return n
      },
      k = function(e, t) {
        var n = e,
          o = p[t],
          r = o.page;
        if (r.hasOwnProperty("onMenuShareTimeline")) {
          (0, u.info)("Invoke event onMenuShareTimeline in page: " + o.route);
          var i = r.onMenuShareTimeline() || {};
          n.title = i.title || e.title, n.imgUrl = i.imgUrl || e.imgUrl, n.path = i.path ? (0, u.addHtmlSuffixToUrl)(i.path) : e.path
        }
        return n
      };
    wx.onAppRoute((0, u.surroundByTryCatch)(function(e) {
      var t = e.path,
        n = e.webviewId,
        o = e.query || {},
        r = e.openType;
      w(t, n, o, r)
    })), wx.onAppRouteDone((0, u.surroundByTryCatch)(function(e) {
      var t = e.path,
        n = e.webviewId,
        o = e.query || {},
        r = e.openType;
      b(t, n, o, r)
    })), wx.onWebviewEvent((0, u.surroundByTryCatch)(function(e) {
      var t = e.webviewId,
        n = e.eventName,
        o = e.data;
      return m(t, n, o)
    })), WeixinJSBridge.on("onPullDownRefresh", (0, u.surroundByTryCatch)(function(e, t) {
      S(t)
    })), WeixinJSBridge.on("onMenuShareAppMessage", (0, u.surroundByTryCatch)(function(e, t) {
      var n = _(e, t);
      WeixinJSBridge.invoke("shareAppMessage", n, function() {})
    })), WeixinJSBridge.on("onMenuShareTimeline", (0, u.surroundByTryCatch)(function(e, t) {
      var n = k(e, t);
      WeixinJSBridge.invoke("shareTimeline", n, function() {})
    })), WeixinJSBridge.subscribe("pageReady", (0, u.surroundByTryCatch)(function(e, t) {
      if (!p.hasOwnProperty(t)) throw new r.AppServiceEngineKnownError("App service not ready, webviewId: " + t);
      var n = p[t].page,
        o = {};
      (0, u.info)("Update view with init data"), o.webviewId = t, __wxConfig && __wxConfig.downloadDomain && (o.downloadDomain = __wxConfig.downloadDomain), (0, u.publish)("pageInitData", {
        data: {
          data: n.data,
          ext: o,
          options: {
            type: "data",
            firstRender: !0
          }
        }
      }, [t]), n.__webviewReady__ = !0, (0, u.isEmptyObject)(n.__waitingData__) || ((0, u.info)("Update view with waiting data"), (0, u.info)(n.__waitingData__), (0, u.publish)("appDataChange", {
        data: {
          data: n.__waitingData__,
          options: {
            type: "data"
          }
        }
      }, [t]), n.__waitingData__ = {}), (0, u.isEmptyObject)(n.__waitingAction__) || ((0, u.info)("Update view with waiting action"), (0, u.info)(n.__waitingAction__), (0, u.publish)("appDataChange", {
        data: {
          data: n.__waitingAction__,
          options: {
            type: "action"
          }
        }
      }, [t]), n.__waitingAction__ = {})
    }));
    t.reset = function() {
      s = void 0, p = {}, f = {}, l = 0
    }, t.setWxConfig = function(e) {
      __wxConfig = e
    }, t.setWxRoute = function(e) {
      __wxRoute = e
    }, t.setWxRouteBegin = function(e) {
      __wxRouteBegin = e
    }, t.getWebviewIdToPage = function() {
      return p
    }, t.getRouteToPage = function() {
      return f
    }
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = n(3);
    Object.keys(o).forEach(function(e) {
      "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
        enumerable: !0,
        get: function() {
          return o[e]
        }
      })
    });
    var r = n(4);
    Object.keys(r).forEach(function(e) {
      "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
        enumerable: !0,
        get: function() {
          return r[e]
        }
      })
    })
  }, function(e, t) {
    "use strict";

    function n(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
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
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
      },
      a = (t.isEmptyObject = function(e) {
        for (var t in e)
          if (e.hasOwnProperty(t)) return !1;
        return !0
      }, t.extend = function(e, t) {
        for (var n = Object.keys(t), o = n.length; o--;) e[n[o]] = t[n[o]];
        return e
      }),
      u = (t.noop = function() {}, t.getDataType = function(e) {
        return Object.prototype.toString.call(e).split(" ")[1].split("]")[0]
      }, t.isObject = function(e) {
        return null !== e && "object" === ("undefined" == typeof e ? "undefined" : i(e))
      }, Object.prototype.hasOwnProperty),
      c = (t.hasOwn = function(e, t) {
        return u.call(e, t)
      }, t.def = function(e, t, n, o) {
        Object.defineProperty(e, t, {
          value: n,
          enumerable: !!o,
          writable: !0,
          configurable: !0
        })
      }, Object.prototype.toString),
      s = "[object Object]",
      p = (t.isPlainObject = function(e) {
        return c.call(e) === s
      }, t.error = function(e, t) {
        console.group("%c" + e, "color: red; font-size: x-large"), console.error("%c" + t, "color: red; font-size: x-large"), console.groupEnd()
      }, t.warn = function(e) {
        __wxConfig && __wxConfig.debug && console.warn(e)
      }, t.info = function(e) {
        __wxConfig && __wxConfig.debug && console.info(e)
      }, t.surroundByTryCatch = function(e) {
        return function() {
          try {
            return e.apply(e, arguments)
          } catch (e) {
            return p(e),
              function() {}
          }
        }
      }, t.errorReport = function(e) {
        if ("[object Error]" === Object.prototype.toString.apply(e)) {
          if ("AppServiceEngineKnownError" === e.type) throw e;
          console.error(e.stack), Reporter.errorReport({
            key: "jsEnginScriptError",
            error: e
          })
        }
      });
    t.deepCopy = function(e) {
      return "undefined" == typeof e ? e : JSON.parse(JSON.stringify(e))
    }, t.AppServiceEngineKnownError = function(e) {
      function t(e) {
        n(this, t);
        var r = o(this, Object.getPrototypeOf(t).call(this, "APP-SERVICE-Engine:" + e));
        return r.type = "AppServiceEngineKnownError", r
      }
      return r(t, e), t
    }(Error), t.publish = function() {
      var e = Array.prototype.slice.call(arguments),
        t = {
          options: {
            timestamp: Date.now()
          }
        };
      e[1] ? e[1].options = a(e[1].options || {}, t.options) : e[1] = t, WeixinJSBridge.publish.apply(WeixinJSBridge, e)
    }
  }, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    t.isDevTools = function() {
      return !!("undefined" != typeof window && window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf("appservice") > -1)
    }, t.addHtmlSuffixToUrl = function(e) {
      if ("string" != typeof e) return e;
      var t = e.split("?")[0],
        n = e.split("?")[1];
      return t += ".html", "undefined" != typeof n ? t + "?" + n : t
    }, t.removeHtmlSuffixFromUrl = function(e) {
      return "string" == typeof e && e.indexOf(".html") === e.length - 4 ? e.substring(0, e.length - 5) : e
    }
  }, function(e, t, n) {
    "use strict";

    function o(e) {
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
    var i = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
          }
        }
        return function(t, n, o) {
          return n && e(t.prototype, n), o && e(t, o), t
        }
      }(),
      a = n(2),
      u = n(6),
      c = n(7),
      s = o(c),
      p = ["onLoad", "onReady", "onShow", "onRouteEnd", "onHide", "onUnload"],
      f = function(e) {
        for (var t = 0; t < p.length; ++t)
          if (p[t] === e) return !0;
        return "data" === e
      },
      l = ["__wxWebviewId__", "__route__", "__webviewReady__", "__waitingData__", "__waitingAction__"],
      d = function(e) {
        return l.indexOf(e) !== -1
      },
      h = function() {
        function e() {
          var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
            n = this,
            o = arguments[1],
            i = arguments[2];
          r(this, e), this.__wxWebviewId__ = o, this.__route__ = i, this.__webviewReady__ = !1, this.__waitingData__ = {}, this.__waitingAction__ = {}, this.data = JSON.parse(JSON.stringify(t.data || {})), p.forEach(function(e) {
            n[e] = function() {
              var n = (t[e] || a.noop).bind(this);
              (0, a.info)(this.__route__ + ": " + e + " have been invoked");
              try {
                n.apply(this, arguments)
              } catch (e) {
                console.error(e.stack), Reporter.errorReport({
                  key: "thirdScriptError",
                  error: e
                })
              }
            }.bind(n)
          });
          var u = function(e) {
            d(e) ? (0, a.warn)("Page's " + e + " is write-protected") : f(e) || ("[object Function]" === Object.prototype.toString.call(t[e]) ? n[e] = function() {
              var n;
              try {
                n = t[e].apply(this, arguments)
              } catch (e) {
                console.error(e.stack), Reporter.errorReport({
                  key: "thirdScriptError",
                  error: e
                })
              }
              return n
            }.bind(n) : n[e] = (0, a.deepCopy)(t[e]))
          };
          for (var c in t) u(c)
        }
        return i(e, [{
          key: "update",
          value: function() {
            (0, a.warn)("Page.update is deprecated, setData updates the view implicitly")
          }
        }, {
          key: "forceUpdate",
          value: function() {
            (0, a.warn)("Page.forceUpdate is deprecated, setData updates the view implicitly")
          }
        }, {
          key: "setData",
          value: function(e) {
            try {
              var t = (0, a.getDataType)(e);
              "Object" !== t && (0, a.warn)("setData accepts an Object rather than some " + t);
              for (var n in e) {
                var o = (0, u.getObjectByPath)(this.data, n),
                  r = o.obj,
                  i = o.key;
                r && (r[i] = (0, a.deepCopy)(e[n]))
              }
              this.__webviewReady__ ? s.default.emit(e, "data", this.__wxWebviewId__) : (0, a.extend)(this.__waitingData__, e)
            } catch (e) {
              (0, a.errorReport)(e)
            }
          }
        }, {
          key: "setAction",
          value: function(e) {
            try {
              this.__webviewReady__ ? s.default.emit(e, "action", this.__wxWebviewId__) : (0, a.extend)(this.__waitingAction__, e)
            } catch (e) {
              (0, a.errorReport)(e)
            }
          }
        }]), e
      }();
    t.default = h
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.getObjectByPath = t.parsePath = void 0;
    var o = n(2),
      r = t.parsePath = function(e) {
        for (var t = e.length, n = [], r = "", i = 0, a = !1, u = !1, c = 0; c < t; c++) {
          var s = e[c];
          if ("\\" === s) c + 1 < t && ("." === e[c + 1] || "[" === e[c + 1] || "]" === e[c + 1]) ? (r += e[c + 1], c++) : r += "\\";
          else if ("." === s) r && (n.push(r), r = "");
          else if ("[" === s) {
            if (r && (n.push(r), r = ""), 0 === n.length) throw new o.AppServiceEngineKnownError("path can not start with []: " + e);
            u = !0, a = !1
          } else if ("]" === s) {
            if (!a) throw new o.AppServiceEngineKnownError("must have number in []: " + e);
            u = !1, n.push(i), i = 0
          } else if (u) {
            if (s < "0" || s > "9") throw new o.AppServiceEngineKnownError("only number 0-9 could inside []: " + e);
            a = !0, i = 10 * i + s.charCodeAt(0) - 48
          } else r += s
        }
        if (r && n.push(r), 0 === n.length) throw new o.AppServiceEngineKnownError("path can not be empty");
        return n
      };
    t.getObjectByPath = function(e, t) {
      for (var n = r(t), i = void 0, a = void 0, u = e, c = 0; c < n.length; c++) Number(n[c]) === n[c] && n[c] % 1 === 0 ? Array.isArray(u) || (i[a] = [], u = i[a]) : (0, o.isPlainObject)(u) || (i[a] = {}, u = i[a]), a = n[c], i = u, u = u[n[c]];
      return {
        obj: i,
        key: a
      }
    }
  }, function(e, t, n) {
    "use strict";

    function o(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
          }
        }
        return function(t, n, o) {
          return n && e(t.prototype, n), o && e(t, o), t
        }
      }(),
      i = n(2),
      a = function() {
        function e() {
          o(this, e)
        }
        return r(e, null, [{
          key: "emit",
          value: function(e, t, n) {
            (0, i.info)("Update view with"), (0, i.info)(e), (0, i.publish)("appDataChange", {
              data: {
                data: e,
                options: {
                  type: t
                }
              }
            }, [n])
          }
        }]), e
      }();
    t.default = a
  }, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    t.DOM_READY_EVENT = "__DOMReady", t.SPEED_REPORT_TYPE = {
      appRoute2newPage: 8,
      newPage2pageReady: 9
    }, t.UPDATE_APP_DATA = "__updateAppData"
  }, function(e, t, n) {
    "use strict";

    function o(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.getApp = t.appHolder = void 0;
    var r = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
          }
        }
        return function(t, n, o) {
          return n && e(t.prototype, n), o && e(t, o), t
        }
      }(),
      i = n(2),
      a = n(1),
      u = ["onLaunch", "onShow", "onHide", "onUnlaunch"],
      c = !0,
      s = function(e) {
        for (var t = 0; t < u.length; ++t)
          if (u[t] === e) return !0;
        return !1
      },
      p = function(e) {
        return "getCurrentPage" === e
      },
      f = function() {
        function e(t) {
          var n = this;
          o(this, e), u.forEach(function(e) {
            var o = function() {
              var n = (t[e] || i.noop).bind(this);
              (0, i.info)("App: " + e + " have been invoked");
              try {
                n.apply(this, arguments)
              } catch (e) {
                console.error(e.stack), Reporter.errorReport({
                  key: "thirdScriptError",
                  error: e
                })
              }
            };
            n[e] = o.bind(n)
          });
          for (var r in t) p(r) ? (0, i.warn)("App's " + r + " is write-protected") : s(r) || ("[object Function]" === Object.prototype.toString.call(t[r]) ? this[r] = t[r].bind(this) : this[r] = t[r]);
          this.onLaunch();
          var a = function() {
              var e = this.getCurrentPage();
              e && e.onHide(), this.onHide()
            },
            f = function() {
              if (this.onShow(), c) c = !1;
              else {
                var e = this.getCurrentPage();
                e && e.onShow()
              }
            };
          WeixinJSBridge.on("onAppEnterBackground", a.bind(this)), WeixinJSBridge.on("onAppEnterForeground", f.bind(this))
        }
        return r(e, [{
          key: "getCurrentPage",
          value: function() {
            var e = (0, a.getCurrentPage)();
            if (e) return e.page
          }
        }]), e
      }(),
      l = void 0;
    t.appHolder = (0, i.surroundByTryCatch)(function(e) {
      l = new f(e)
    }), t.getApp = function() {
      return l
    }
  }]),
  Page = __appServiceEngine.Page,
  App = __appServiceEngine.App,
  getApp = __appServiceEngine.getApp;
! function() {
  var e = 1,
    t = 2,
    n = {};
  define = function(t, o) {
    n[t] = {
      status: e,
      factory: o
    }
  };
  var o = function(e) {
      var t = e.match(/(.*)\/([^\/]+)?$/);
      return t && t[1] ? t[1] : "./"
    },
    r = function(e) {
      var t = o(e);
      return function(e) {
        if ("string" != typeof e) throw new Error("require args must be a string");
        for (var n = [], o = (t + "/" + e).split("/"), r = 0, i = o.length; r < i; ++r) {
          var a = o[r];
          if ("" != a && "." != a)
            if (".." == a) {
              if (0 == n.length) throw new Error("can't find module : " + e);
              n.pop()
            } else r + 1 < i && ".." == o[r + 1] ? r++ : n.push(a)
        }
        try {
          var u = n.join("/");
          return /\.js$/.test(u) || (u += ".js"), require(u)
        } catch (e) {
          throw e
        }
      }
    };
  require = function(o) {
    if ("string" != typeof o) throw new Error("require args must be a string");
    var i = n[o];
    if (!i) throw new Error('module "' + o + '" is not defined');
    if (i.status === e) {
      var a = i.factory,
        u = {
          exports: {}
        },
        c = void 0;
      a && (c = a(r(o), u, u.exports)), i.exports = u.exports || c, i.status = t
    }
    return i.exports
  }
}(), wx.version = {
  updateTime: "2016.10.11 19:52:52",
  info: "",
  version: 30
};
