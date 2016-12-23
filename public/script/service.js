;
var __WAServiceStartTime__ = Date.now();
! function(e) {
  if ("function" == typeof logxx && logxx("jsbridge start"), !e.WeixinJSBridge) {
    if (e.navigator && e.navigator.userAgent) {
      var t = e.navigator.userAgent;
      if (t.indexOf("appservice") > -1 || t.indexOf("wechatdevtools") > -1) return
    }
    var n = e.hasOwnProperty("document"),
      o = !1,
      r = {},
      i = 0,
      a = {},
      s = "custom_event_",
      c = {};
    if (n) {
      var t = e.navigator.userAgent,
        u = t.indexOf("Android") != -1;
      o = !u
    }
    var l = function(t, n, i) {
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
      d = function(e, t, n) {
        var o = JSON.stringify(t || {}),
          a = ++i;
        r[a] = n, l(e, o, a)
      },
      p = function(e, t) {
        var n = r[e];
        "function" == typeof n && n(t), delete r[e]
      },
      h = function(e, t) {
        a[e] = t
      },
      v = function(e, t, n) {
        n = n || [], n = JSON.stringify(n);
        var o = s + e,
          r = JSON.stringify(t);
        f(o, r, n)
      },
      g = function(e, t) {
        c[s + e] = t
      },
      y = function(e, t, n, o) {
        var r;
        r = e.indexOf(s) != -1 ? c[e] : a[e], "function" == typeof r && r(t, n, o)
      };
    e.WeixinJSBridge = {
      invoke: d,
      invokeCallbackHandler: p,
      on: h,
      publish: v,
      subscribe: g,
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
      !v || v.length <= 0 || (r("reportKeyValue", {
        dataArray: v
      }), v = [])
    }

    function a() {
      !g || g.length <= 0 || (r("reportIDKey", {
        dataArray: g
      }), g = [])
    }

    function s() {
      !y || y.length <= 0 || (r("systemLog", {
        dataArray: y
      }), y = [])
    }

    function c() {
      return "undefined" != typeof window && window.navigator ? window.navigator.userAgent.indexOf("appservice") > -1 ? "devtools" : window.navigator.userAgent.toLowerCase().indexOf("android") > -1 ? "android" : "" : "ios"
    }

    function u(e) {
      return function() {
        try {
          return e.apply(e, arguments)
        } catch (e) {
          console.error("reporter error:" + e.message)
        }
      }
    }

    function l(e) {
      B.__defineGetter__(e, function() {
        return u(D[e])
      })
    }
    var f = n(1),
      d = 1,
      p = 20,
      h = 50,
      v = [],
      g = [],
      y = [],
      b = "",
      m = 50,
      w = 50,
      _ = 20,
      k = 50,
      S = 500,
      T = 0,
      A = 0,
      P = 0,
      M = 0,
      x = {},
      C = {},
      O = 3,
      I = 10,
      E = 50;
    "function" == typeof logxx && logxx("reporter-sdk start"), r("getPublicLibVersion", {}, function(e) {
      try {
        b = e.version.appVersion + " " + e.version.libVersion
      } catch (e) {}
    });
    var R = "ios" === c(),
      j = ("devtools" === c(), function() {}),
      D = {
        surroundThirdByTryCatch: function(e, t) {
          return function() {
            var n = void 0;
            try {
              var o = Date.now();
              n = e.apply(e, arguments);
              var r = Date.now();
              r - o > 1e3 && D.speedReport({
                key: "thirdScriptRunTime",
                data: {},
                timeMark: {
                  startTime: o,
                  endTime: r,
                  nativeTime: 0
                }
              })
            } catch (e) {
              D.thirdErrorReport({
                error: e,
                extend: t
              })
            }
            return n
          }
        },
        speedReport: function(e) {
          var t = e.key,
            n = e.data,
            o = e.timeMark,
            r = e.force;
          if (f.SpeedValueType[t]) {
            var i = f.SpeedValueType[t];
            if (r || !(Date.now() - (x[i] || 0) < S)) {
              var a = 0,
                s = 0;
              n && (a = JSON.stringify(n).length), 1 != i && 2 != i || (s = o.nativeTime || 0), x[i] = Date.now();
              var c = i + "," + o.startTime + "," + s + "," + s + "," + o.endTime + "," + a;
              D.reportKeyValue({
                key: "Speed",
                value: c,
                force: !0
              })
            }
          }
        },
        reportKeyValue: function(e) {
          var t = e.key,
            n = e.value,
            o = e.force;
          f.KeyValueType[t] && (!o && Date.now() - T < w || (T = Date.now(), v.push({
            key: f.KeyValueType[t],
            value: n
          }), v.length >= p && i()))
        },
        reportIDKey: function(e) {
          var t = e.id,
            n = e.key,
            o = e.force;
          f.IDKeyType[n] && (!o && Date.now() - A < _ || (A = Date.now(), g.push({
            id: t ? t : R ? "356" : "358",
            key: f.IDKeyType[n],
            value: 1
          }), g.length >= d && a()))
        },
        thirdErrorReport: function(e) {
          var t = e.error,
            n = e.extend;
          D.errorReport({
            key: "thirdScriptError",
            error: t,
            extend: n
          })
        },
        errorReport: function(e) {
          var t = e.key,
            n = e.error,
            o = e.extend;
          if (f.ErrorType[t]) {
            var r = o ? n.message + " " + o : n.message,
              c = t + "\n" + r + "\n" + n.stack;
            if (console.error(c), "undefined" != typeof window && "undefined" != typeof window.__webviewId__ ? WeixinJSBridge.publish("WEBVIEW_ERROR_MSG", {
                data: {
                  msg: c
                },
                options: {
                  timestamp: Date.now()
                }
              }) : D.triggerErrorMessage(c), !(Object.keys(C).length > E)) {
              var u = f.ErrorType[t] + "," + n.name + "," + encodeURIComponent(r) + "," + encodeURIComponent(n.stack) + "," + encodeURIComponent(b);
              C[u] || (C[u] = 0), C[u]++, "thirdScriptError" === t && C[u] > O || C[u] > I || (D.reportIDKey({
                key: t
              }), D.reportKeyValue({
                key: "Error",
                value: u
              }), a(), i(), s())
            }
          }
        },
        log: function(e, t) {
          e && "string" == typeof e && (!t && Date.now() - P < k || (P = Date.now(), y.push(e + ""), y.length >= h && s()))
        },
        submit: function() {
          Date.now() - M < m || (M = Date.now(), a(), i(), s())
        },
        registerErrorListener: function(e) {
          "function" == typeof e && (j = e)
        },
        unRegisterErrorListener: function() {
          j = function() {}
        },
        triggerErrorMessage: function(e) {
          j(e)
        }
      },
      B = {};
    for (var L in D) l(L);
    "undefined" != typeof window && (window.onbeforeunload = function() {
      D.submit()
    }), e.exports = B
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
      exparserScriptError: 18,
      startRecord: 19,
      startRecord_fail: 20,
      getLocation: 21,
      getLocation_fail: 22,
      chooseLocation: 23,
      chooseLocation_fail: 24,
      openAddress: 25,
      openAddress_fail: 26,
      openLocation: 27,
      openLocation_fail: 28,
      makePhoneCall: 29,
      makePhoneCall_fail: 30,
      operateWXData: 31,
      operateWXData_fail: 32,
      checkLogin: 33,
      checkLogin_fail: 34,
      refreshSession: 35,
      refreshSession_fail: 36,
      chooseVideo: 37,
      chooseVideo_fail: 38,
      chooseImage: 39,
      chooseImage_fail: 40,
      verifyPaymentPassword: 41,
      verifyPaymentPassword_fail: 42,
      requestPayment: 43,
      requestPayment_fail: 44,
      bindPaymentCard: 45,
      bindPaymentCard_fail: 46,
      requestPaymentToBank: 47,
      requestPaymentToBank_fail: 48,
      openDocument: 49,
      openDocument_fail: 50,
      chooseContact: 51,
      chooseContact_fail: 52,
      operateMusicPlayer: 53,
      operateMusicPlayer_fail: 54,
      getMusicPlayerState_fail: 55,
      playVoice_fail: 56,
      setNavigationBarTitle_fail: 57,
      switchTab_fail: 58,
      getImageInfo_fail: 59,
      enableCompass_fail: 60,
      enableAccelerometer_fail: 61,
      getStorage_fail: 62,
      setStorage_fail: 63,
      clearStorage_fail: 64,
      removeStorage_fail: 65,
      getStorageInfo_fail: 66,
      getStorageSync_fail: 67,
      setStorageSync_fail: 68
    }, t.KeyValueType = {
      Speed: "13544",
      Error: "13582"
    }, t.SpeedValueType = {
      webview2AppService: 1,
      appService2Webview: 2,
      funcReady: 3,
      firstGetData: 4,
      firstRenderTime: 5,
      reRenderTime: 6,
      forceUpdateRenderTime: 7,
      appRoute2newPage: 8,
      newPage2pageReady: 9,
      thirdScriptRunTime: 10,
      pageframe: 11,
      WAWebview: 12
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
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return t.default = e, t
    }

    function r(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }

    function i(e) {
      C.__defineGetter__(e, function() {
        return (0, l.surroundByTryCatchFactory)(L[e], "wx." + e)
      })
    }

    function a(e, t, n) {
      var o = (0, l.paramCheck)(t, n);
      return !o || (B(e, t, e + ":fail parameter error: " + o), !1)
    }

    function s(e, t) {
      var n = /^(.*)\.html/gi.exec(t.url);
      return !n || __wxConfig.pages.indexOf(n[1]) !== -1 || (B(e, t, e + ":fail url not in app.json"), !1)
    }
    var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
      },
      u = n(1),
      l = n(2),
      f = n(3),
      d = r(f),
      p = n(4),
      h = r(p),
      v = n(7),
      g = r(v),
      y = n(8);
    n(9), n(10), n(11);
    var b = n(6),
      m = n(12),
      w = n(13),
      _ = n(15),
      k = o(_);
    "function" == typeof logxx && logxx("sdk start");
    var S = function() {},
      T = {},
      A = "",
      P = [],
      M = [],
      x = void 0,
      C = {},
      O = ("devtools" === (0, l.getPlatform)(), !1),
      I = !1,
      E = [],
      R = [],
      j = void 0,
      D = void 0;
    "devtools" === (0, l.getPlatform)() && (0, u.subscribe)("SPECIAL_PAGE_EVENT", function(e) {
      var t = e.data,
        n = e.eventName,
        o = e.ext,
        r = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
      if (t && "input" == t.type && "function" == typeof x) {
        var i = x({
            data: t,
            eventName: n,
            webviewId: r
          }),
          a = t.detail.value;
        if (o && o.setKeyboardValue)
          if ("undefined" == typeof i);
          else if ("Object" === (0, l.getDataType)(i)) {
          var s = {};
          a != i.value && (s.value = i.value + ""), isNaN(parseInt(i.cursor)) || (s.cursor = parseInt(i.cursor)), (0, u.publish)("setKeyboardValue", s, [r])
        } else a != i && (0, u.publish)("setKeyboardValue", {
          value: i + "",
          cursor: -1
        }, [r])
      }
    });
    var B = function(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
          n = arguments.length <= 2 || void 0 === arguments[2] ? "" : arguments[2];
        console.error(n), Reporter.triggerErrorMessage(n);
        var o = Reporter.surroundThirdByTryCatch(t.fail || S, "sdk catch error in " + e + " fail callback function"),
          r = Reporter.surroundThirdByTryCatch(t.complete || S, "sdk catch error in " + e + " complete callback function");
        o({
          errMsg: n
        }), r({
          errMsg: n
        })
      },
      L = {
        invoke: u.invoke,
        on: u.on,
        drawCanvas: w.drawCanvas,
        createContext: w.createContext,
        createCanvasContext: w.createCanvasContext,
        canvasToTempFilePath: w.canvasToTempFilePath,
        reportIDKey: function(e, t) {},
        reportKeyValue: function(e, t) {},
        onPullDownRefresh: function(e) {
          console.log("onPullDownRefresh has been removed from api list")
        },
        setNavigationBarTitle: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
          a("setNavigationBarTitle", e, {
            title: ""
          }) && (0, u.invokeMethod)("setNavigationBarTitle", e)
        },
        showNavigationBarLoading: function(e) {
          (0, u.invokeMethod)("showNavigationBarLoading", e)
        },
        hideNavigationBarLoading: function(e) {
          (0, u.invokeMethod)("hideNavigationBarLoading", e)
        },
        stopPullDownRefresh: function(e) {
          (0, u.invokeMethod)("stopPullDownRefresh", e)
        },
        redirectTo: function(e) {
          !(arguments.length <= 1 || void 0 === arguments[1]) && arguments[1];
          a("redirectTo", e, {
            url: ""
          }) && (e.url = (0, l.getRealRoute)(A, e.url), e.url = (0, l.encodeUrlQuery)(e.url), s("redirectTo", e) && (0, u.invokeMethod)("redirectTo", e, {
            afterSuccess: function() {
              A = e.url
            }
          }))
        },
        navigateTo: function(e) {
          !(arguments.length <= 1 || void 0 === arguments[1]) && arguments[1];
          a("navigateTo", e, {
            url: ""
          }) && (e.url = (0, l.getRealRoute)(A, e.url), e.url = (0, l.encodeUrlQuery)(e.url), s("navigateTo", e) && (0, u.invokeMethod)("navigateTo", e, {
            afterSuccess: function() {
              A = e.url, (0, m.notifyCurrentRoutetoContext)(A)
            }
          }))
        },
        switchTab: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
          a("switchTab", e, {
            url: ""
          }) && (/\?.*$/.test(e.url) && (console.warn("wx.switchTab: url 不支持 queryString"), e.url = e.url.replace(/\?.*$/, "")), e.url = (0, l.getRealRoute)(A, e.url), e.url = (0, l.encodeUrlQuery)(e.url), s("switchTab", e) && (0, u.invokeMethod)("switchTab", e, {
            afterSuccess: function() {
              A = e.url, (0, m.notifyCurrentRoutetoContext)(A)
            }
          }))
        },
        navigateBack: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
          "number" != typeof e.delta ? e.delta = 1 : (e.delta = parseInt(e.delta), e.delta < 1 && (e.delta = 1)), (0, u.invokeMethod)("navigateBack", e)
        },
        getStorage: function(e) {
          a("getStorage", e, {
            key: ""
          }) && (0, u.invokeMethod)("getStorage", e, {
            beforeSuccess: function(e) {
              e.data = (0, l.stringToAnyType)(e.data, e.dataType), delete e.dataType
            }
          })
        },
        getStorageSync: function(e) {
          if (a("getStorageSync", e, "")) {
            var t = "ios" === (0, l.getPlatform)() ? "getStorage" : "getStorageSync",
              n = void 0;
            return (0, u.invokeMethod)(t, {
              key: e
            }, {
              beforeAll: function() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                n = (0, l.stringToAnyType)(e.data, e.dataType)
              }
            }), n
          }
        },
        setStorage: function(e) {
          if (a("setStorage", e, {
              key: ""
            })) {
            var t = (0, l.anyTypeToString)(e.data),
              n = t.data,
              o = t.dataType;
            (0, u.invokeMethod)("setStorage", {
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
          var t = arguments.length <= 1 || void 0 === arguments[1] ? "" : arguments[1];
          if (a("setStorage", e, "")) {
            var n = "ios" === (0, l.getPlatform)() ? "setStorage" : "setStorageSync",
              o = (0, l.anyTypeToString)(t),
              r = o.data,
              i = o.dataType;
            (0, u.invokeMethod)(n, {
              key: e,
              data: r,
              dataType: i
            })
          }
        },
        removeStorage: function(e) {
          a("removeStorage", e, {
            key: ""
          }) && (0, u.invokeMethod)("removeStorage", e)
        },
        removeStorageSync: function(e) {
          a("removeStorageSync", e, "") && (0, u.invokeMethod)("removeStorageSync", {
            key: e
          })
        },
        clearStorage: function(e) {
          (0, u.invokeMethod)("clearStorage", e)
        },
        clearStorageSync: function() {
          var e = "ios" === (0, l.getPlatform)() ? "clearStorage" : "clearStorageSync";
          (0, u.invokeMethod)(e)
        },
        getStorageInfo: function(e) {
          (0, u.invokeMethod)("getStorageInfo", e)
        },
        getStorageInfoSync: function() {
          var e = void 0;
          return (0, u.invokeMethod)("getStorageInfoSync", {}, {
            beforeAll: function(t) {
              e = t, delete t.errMsg
            }
          }), e
        },
        request: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
          if (a("request", e, {
              url: ""
            })) {
            if ((0, l.validateUrl)(e.url) === !1) return void B("request", e, 'request:fail invalid url "' + e.url + '"');
            if ("function" === e.data) return void B("request", e, "request:fail data should not be Function");
            var t = (0, l.getDataType)(e.header);
            e.header = e.header || {}, e.header = (0, l.convertObjectValueToString)(e.header), "Undefined" !== t && "Object" !== t && (console.warn("wx.request: header must be an object"), e.header = {}), e.header = Object.keys(e.header).reduce(function(t, n) {
              return "content-type" === n.toLowerCase() ? t[n.toLowerCase()] = e.header[n] : t[n] = e.header[n], t
            }, {}), e.method && (e.method = e.method.toUpperCase());
            var n = e.header || {},
              o = "GET";
            "string" == typeof e.method && (o = e.method.toUpperCase());
            var r = void 0;
            e.dataType = e.dataType || "json", n["content-type"] = n["content-type"] || "application/json", r = "undefined" == typeof e.data ? "" : "string" != typeof e.data ? n["content-type"].indexOf("application/x-www-form-urlencoded") > -1 ? (0, l.urlEncodeFormData)(e.data, !0) : n["content-type"].indexOf("application/json") > -1 ? JSON.stringify(e.data) : "object" === c(e.data) ? JSON.stringify(e.data) : r.toString() : e.data, "GET" == o && (e.url = (0, l.addQueryStringToUrl)(e.url, e.data)), (0, u.invokeMethod)("request", {
              url: e.url,
              data: r,
              header: n,
              method: o,
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
          if (a("connectSocket", e, {
              url: ""
            })) {
            "object" !== c(e.header) && "undefined" != typeof e.header && (console.warn("connectSocket: header must be an object"), delete e.header);
            var t = {};
            e.header && (t = (0, l.convertObjectValueToString)(e.header)), (0, u.invokeMethod)("connectSocket", (0, l.assign)({}, e, {
              header: t
            }))
          }
        },
        closeSocket: function(e) {
          (0, u.invokeMethod)("closeSocket", e)
        },
        sendSocketMessage: function(e) {
          var t = (0, l.getDataType)(e.data);
          "devtools" === (0, l.getPlatform)() ? (0, u.invokeMethod)("sendSocketMessage", e) : "String" === t ? (0, u.invokeMethod)("sendSocketMessage", e) : "ArrayBuffer" === t && (0, u.invokeMethod)("sendSocketMessage", (0, l.assign)(e, {
            data: (0, l.arrayBufferToBase64)(e.data),
            isBuffer: !0
          }))
        },
        onSocketOpen: function(e) {
          a("onSocketOpen", e, S) && (0, u.onMethod)("onSocketOpen", Reporter.surroundThirdByTryCatch(e, "onSocketOpen"))
        },
        onSocketClose: function(e) {
          a("onSocketClose", e, S) && (0, u.onMethod)("onSocketClose", Reporter.surroundThirdByTryCatch(e, "onSocketClose"))
        },
        onSocketMessage: function(e) {
          if (a("onSocketMessage", e, S)) {
            var t = Reporter.surroundThirdByTryCatch(e, "onSocketMessage");
            (0, u.onMethod)("onSocketMessage", function(e) {
              "devtools" !== (0, l.getPlatform)() && e.isBuffer === !0 && (e.data = (0, l.base64ToArrayBuffer)(e.data)), delete e.isBuffer, "devtools" === (0, l.getPlatform)() && "Blob" === (0, l.getDataType)(e.data) ? (0, l.blobToArrayBuffer)(e.data, function(n) {
                e.data = n, t(e)
              }) : t(e)
            })
          }
        },
        onSocketError: function(e) {
          (0, u.onMethod)("onSocketError", Reporter.surroundThirdByTryCatch(e, "onSocketError"))
        },
        uploadFile: function(e) {
          if (a("uploadFile", e, {
              url: "",
              filePath: "",
              name: ""
            })) {
            "object" !== c(e.header) && "undefined" != typeof e.header && (console.warn("uploadFile: header must be an object"), delete e.header), "object" !== c(e.formData) && "undefined" != typeof e.formData && (console.warn("uploadFile: formData must be an object"), delete e.formData);
            var t = {},
              n = {};
            e.header && (t = (0, l.convertObjectValueToString)(e.header)), e.formData && (n = (0, l.convertObjectValueToString)(e.formData)), (0, u.invokeMethod)("uploadFile", (0, l.assign)({}, e, {
              header: t,
              formData: n
            }))
          }
        },
        downloadFile: function(e) {
          a("downloadFile", e, {
            url: ""
          }) && (0, u.invokeMethod)("downloadFile", e, {
            beforeSuccess: function(e) {
              var t = [200, 304];
              t.indexOf(e.statusCode) === -1 && delete e.tempFilePath
            }
          })
        },
        chooseImage: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
          (0, u.invokeMethod)("chooseImage", (0, l.assign)({
            count: 9,
            sizeType: ["original", "compressed"],
            sourceType: ["album", "camera"]
          }, e))
        },
        previewImage: function(e) {
          a("previewImage", e, {
            urls: [""]
          }) && (0, u.invokeMethod)("previewImage", e)
        },
        getImageInfo: function(e) {
          a("getImageInfo", e, {
            src: ""
          }) && (/^(http|https):\/\//.test(e.src) ? (0, u.invokeMethod)("downloadFile", {
            url: e.src
          }, {
            afterSuccess: function(t) {
              e.src = t.tempFilePath, (0, u.invokeMethod)("getImageInfo", e, {
                beforeSuccess: function(t) {
                  t.path = e.src
                }
              })
            },
            afterFail: function() {
              B("getImageInfo", e, "getImageInfo:fail download image fail")
            }
          }) : /^wxfile:\/\//.test(e.src) ? (0, u.invokeMethod)("getImageInfo", e, {
            beforeSuccess: function(t) {
              t.path = e.src
            }
          }) : (e.src = (0, l.getRealRoute)(A, e.src, !1), (0, u.invokeMethod)("getImageInfo", e, {
            beforeSuccess: function(t) {
              t.path = e.src
            }
          })))
        },
        startRecord: function(e) {
          L.appStatus === b.AppStatus.BACK_GROUND && L.hanged === !1 || (0, u.invokeMethod)("startRecord", e)
        },
        stopRecord: function(e) {
          (0, u.invokeMethod)("stopRecord", e)
        },
        playVoice: function(e) {
          a("playVoice", e, {
            filePath: ""
          }) && (0, u.invokeMethod)("playVoice", e)
        },
        pauseVoice: function(e) {
          (0, u.invokeMethod)("pauseVoice", e)
        },
        stopVoice: function(e) {
          (0, u.invokeMethod)("stopVoice", e)
        },
        onVoicePlayEnd: function(e) {
          (0, u.onMethod)("onVoicePlayEnd", Reporter.surroundThirdByTryCatch(e, "onVoicePlayEnd"))
        },
        chooseVideo: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
          e.sourceType = e.sourceType || ["album", "camera"], e.camera = e.camera || ["front", "back"], (0, u.invokeMethod)("chooseVideo", e)
        },
        getLocation: function(e) {
          console.log("getLocation", e, L.appStatus, L.hanged), L.appStatus === b.AppStatus.BACK_GROUND && L.hanged === !1 || (0, u.invokeMethod)("getLocation", e)
        },
        openLocation: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
          a("openLocation", e, {
            latitude: .1,
            longitude: .1
          }) && (0, u.invokeMethod)("openLocation", e)
        },
        chooseLocation: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
          (0, u.invokeMethod)("chooseLocation", e)
        },
        getNetworkType: function(e) {
          (0, u.invokeMethod)("getNetworkType", e)
        },
        getSystemInfo: function(e) {
          var t = (0, l.getPlatform)();
          (0, u.invokeMethod)("getSystemInfo", e, {
            beforeSuccess: function(e) {
              e.platform = t
            }
          })
        },
        getSystemInfoSync: function(e) {
          var t = {},
            n = (0, l.getPlatform)();
          return (0, u.invokeMethod)("getSystemInfo", {}, {
            beforeSuccess: function() {
              var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
              t = e, t.platform = n, delete e.errMsg
            }
          }), t
        },
        onAccelerometerChange: function(e) {
          O || ((0, u.invokeMethod)("enableAccelerometer", {
            enable: !0
          }), O = !0), E.push(Reporter.surroundThirdByTryCatch(e, "onAccelerometerChange"))
        },
        onCompassChange: function(e) {
          I || ((0, u.invokeMethod)("enableCompass", {
            enable: !0
          }), I = !0), R.push(Reporter.surroundThirdByTryCatch(e, "onCompassChange"))
        },
        reportAction: function(e) {
          (0, u.invokeMethod)("reportAction", e)
        },
        getBackgroundAudioPlayerState: function(e) {
          (0, u.invokeMethod)("getMusicPlayerState", e, {
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("getBackgroundAudioPlayerState", "getMusicPlayerState")
            }
          })
        },
        playBackgroundAudio: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
          L.appStatus === b.AppStatus.BACK_GROUND && L.hanged === !1 || (0, u.invokeMethod)("operateMusicPlayer", (0, l.assign)({
            operationType: "play"
          }, e), {
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("operateMusicPlayer", "playBackgroundAudio")
            }
          })
        },
        pauseBackgroundAudio: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
          (0, u.invokeMethod)("operateMusicPlayer", (0, l.assign)({
            operationType: "pause"
          }, e), {
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("operateMusicPlayer", "pauseBackgroundAudio")
            }
          })
        },
        seekBackgroundAudio: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
          a("seekBackgroundAudio", e, {
            position: 1
          }) && (0, u.invokeMethod)("operateMusicPlayer", (0, l.assign)({
            operationType: "seek"
          }, e), {
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("operateMusicPlayer", "seekBackgroundAudio")
            }
          })
        },
        stopBackgroundAudio: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
          console.log("stopBackgroundAudio"), (0, u.invokeMethod)("operateMusicPlayer", (0, l.assign)({
            operationType: "stop"
          }, e), {
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("operateMusicPlayer", "stopBackgroundAudio")
            }
          })
        },
        onBackgroundAudioPlay: function(e) {
          (0, u.onMethod)("onMusicPlay", Reporter.surroundThirdByTryCatch(e, "onBackgroundAudioPlay"))
        },
        onBackgroundAudioPause: function(e) {
          (0, u.onMethod)("onMusicPause", Reporter.surroundThirdByTryCatch(e, "onBackgroundAudioPause"))
        },
        onBackgroundAudioStop: function(e) {
          (0, u.onMethod)("onMusicEnd", Reporter.surroundThirdByTryCatch(e, "onBackgroundAudioStop"))
        },
        login: function(e) {
          (0, u.invokeMethod)("login", e)
        },
        checkLogin: function(e) {
          (0, u.invokeMethod)("checkLogin", e)
        },
        checkSession: function(e) {
          j && clearTimeout(j), (0, u.invokeMethod)("refreshSession", e, {
            beforeSuccess: function(e) {
              j = setTimeout(function() {
                (0, u.invokeMethod)("refreshSession")
              }, 1e3 * e.expireIn), delete e.err_code, delete e.expireIn
            },
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("refreshSession", "checkSession")
            }
          })
        },
        authorize: function(e) {
          (0, u.invokeMethod)("authorize", e)
        },
        getUserInfo: function(e) {
          (0, u.invokeMethod)("operateWXData", (0, l.assign)({
            data: {
              api_name: "webapi_getuserinfo",
              data: e.data || {}
            }
          }, e), {
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("operateWXData", "getUserInfo")
            },
            beforeSuccess: function(e) {
              "android" === (0, l.getPlatform)() && (e.data = JSON.parse(e.data)), e.rawData = e.data.data;
              try {
                e.userInfo = JSON.parse(e.data.data), e.signature = e.data.signature, e.data.encryptData && (console.group(new Date + " encryptData 字段即将废除"), console.warn("请使用 encryptedData 和 iv 字段进行解密，详见：https://mp.weixin.qq.com/debug/wxadoc/dev/api/open.html"), console.groupEnd(), e.encryptData = e.data.encryptData), e.data.encryptedData && (e.encryptedData = e.data.encryptedData, e.iv = e.data.iv), delete e.data
              } catch (e) {}
            }
          })
        },
        getFriends: function(e) {
          (0, u.invokeMethod)("operateWXData", {
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
              "android" === (0, l.getPlatform)() && (e.data = JSON.parse(e.data)), e.rawData = e.data.data;
              try {
                e.friends = JSON.parse(e.data.data), e.signature = e.data.signature, delete e.data
              } catch (e) {}
            }
          })
        },
        requestPayment: function(e) {
          a("requestPayment", e, {
            timeStamp: "",
            nonceStr: "",
            package: "",
            signType: "",
            paySign: ""
          }) && (0, u.invokeMethod)("requestPayment", e)
        },
        verifyPaymentPassword: function(e) {
          (0, u.invokeMethod)("verifyPaymentPassword", e)
        },
        bindPaymentCard: function(e) {
          (0, u.invokeMethod)("bindPaymentCard", e)
        },
        requestPaymentToBank: function(e) {
          (0, u.invokeMethod)("requestPaymentToBank", e)
        },
        scanCode: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
          a("scanCode", e, {}) && (0, u.invokeMethod)("scanCode", e)
        },
        openAddress: function(e) {
          (0, u.invokeMethod)("openAddress", e)
        },
        saveFile: function(e) {
          a("saveFile", e, {
            tempFilePath: ""
          }) && (0, u.invokeMethod)("saveFile", e)
        },
        openDocument: function(e) {
          a("openDocument", e, {
            filePath: ""
          }) && (0, u.invokeMethod)("openDocument", e)
        },
        chooseContact: function(e) {
          (0, u.invokeMethod)("chooseContact", e)
        },
        makePhoneCall: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
          a("makePhoneCall", e, {
            phoneNumber: ""
          }) && (0, u.invokeMethod)("makePhoneCall", e)
        },
        onAppRoute: function(e, t) {
          P.push(e)
        },
        onAppRouteDone: function(e, t) {
          M.push(e)
        },
        onAppEnterBackground: function(e) {
          k.onAppEnterBackground.call(L, e)
        },
        onAppEnterForeground: function(e) {
          k.onAppEnterForeground.call(L, e)
        },
        setAppData: function(e) {
          var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
            n = arguments[2];
          arguments[3];
          if (t.forceUpdate = "undefined" != typeof t.forceUpdate && t.forceUpdate, (0, l.isObject)(e) === !1) throw new l.AppServiceSdkKnownError("setAppData:data should be an object");
          ! function() {
            var o = !1,
              r = {},
              i = function(e, t, n) {
                o = !0, r[e] = t, "Array" === n || "Object" === n ? T[e] = JSON.parse(JSON.stringify(t)) : T[e] = t
              };
            for (var a in e) {
              var s = e[a],
                c = T[a],
                f = (0, l.getDataType)(c),
                d = (0, l.getDataType)(s);
              f !== d ? i(a, s, d) : "Array" == f || "Object" == f ? JSON.stringify(c) !== JSON.stringify(s) && i(a, s, d) : "String" == f || "Number" == f || "Boolean" == f ? c.toString() !== s.toString() && i(a, s, d) : "Date" == f ? c.getTime().toString() !== s.getTime().toString() && i(a, s, d) : c !== s && i(a, s, d)
            }
            t.forceUpdate ? (0, u.publish)("appDataChange", {
              data: e,
              option: {
                timestamp: Date.now(),
                forceUpdate: !0
              }
            }, n) : o && (0, u.publish)("appDataChange", {
              data: r
            }, n)
          }()
        },
        onPageEvent: function(e, t) {
          console.warn("'onPageEvent' is deprecated, use 'Page[eventName]'")
        },
        createAnimation: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
          if (a("createAnimation", e, {})) return new d.default(e)
        },
        createAudioContext: function(e) {
          return h.default.call(L, e, D)
        },
        createVideoContext: function(e) {
          return new g.default(e)
        },
        createMapContext: function(e) {
          return new y.MapContext(e)
        },
        onWebviewEvent: function(e, t) {
          x = e, (0, u.subscribe)("PAGE_EVENT", function(t) {
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
        onNativeEvent: function(e) {
          ["onCanvasTouchStart", "onCanvasTouchMove", "onCanvasTouchEnd"].forEach(function(t) {
            (0, u.onMethod)(t, function(n, o) {
              e({
                data: n,
                eventName: t,
                webviewId: o
              })
            })
          })
        },
        hideKeyboard: function(e) {
          "devtools" == (0, l.getPlatform)() ? (0, u.publish)("hideKeyboard", {}) : (0, u.invokeMethod)("hideKeyboard", e)
        },
        getPublicLibVersion: function() {
          var e = void 0;
          return (0, u.invokeMethod)("getPublicLibVersion", {
            complete: function(t) {
              t.version ? e = t.version : (e = t, delete e.errMsg)
            }
          }), e
        },
        showModal: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
            t = {
              title: "",
              content: "",
              confirmText: "确定",
              cancelText: "取消",
              showCancel: !0,
              confirmColor: "#3CC51F",
              cancelColor: "#000000"
            };
          if (t = (0, l.extend)(t, e), a("showModal", t, {
              title: "",
              content: "",
              confirmText: "",
              cancelText: "",
              confirmColor: "",
              cancelColor: ""
            })) return t.confirmText.length > 4 ? void B("showModal", e, "showModal:fail confirmText length should not large then 4") : t.cancelText.length > 4 ? void B("showModal", e, "showModal:fail cancelText length should not large then 4") : void(0, u.invokeMethod)("showModal", t, {
            beforeSuccess: function(e) {
              e.confirm = Boolean(e.confirm)
            }
          })
        },
        showToast: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
            t = {
              duration: 1500,
              title: "",
              icon: "success",
              mask: !1
            };
          t = (0, l.extend)(t, e), delete t.image, ["success", "loading"].indexOf(t.icon) < 0 && (t.icon = "success"), t.duration > 1e4 && (t.duration = 1e4), a("showToast", t, {
            duration: 1,
            title: "",
            icon: ""
          }) && (0, u.invokeMethod)("showToast", t)
        },
        hideToast: function(e) {
          (0, u.invokeMethod)("hideToast", e)
        },
        showActionSheet: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
            t = {
              itemList: [],
              itemColor: "#000000"
            };
          if (t = (0, l.extend)(t, e), t.cancelText = "取消", t.cancelColor = "#000000", a("showActionSheet", t, {
              itemList: ["1"],
              itemColor: ""
            })) return e.itemList.length > 6 ? void B("showActionSheet", e, "showActionSheet:fail parameter error: itemList should not be large than 6") : void(0, u.invokeMethod)("showActionSheet", t, {
            beforeCancel: function(t) {
              try {
                "function" == typeof e.success && e.success({
                  errMsg: "showActionSheet:ok",
                  cancel: !0
                })
              } catch (e) {
                Reporter.thirdErrorReport({
                  error: e,
                  extend: "showActionSheet success callback error"
                })
              }
            }
          })
        },
        getSavedFileList: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
          (0, u.invokeMethod)("getSavedFileList", e)
        },
        getSavedFileInfo: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
          a("getSavedFileInfo", e, {
            filePath: ""
          }) && (0, u.invokeMethod)("getSavedFileInfo", e)
        },
        removeSavedFile: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
          a("removeSavedFile", e, {
            filePath: ""
          }) && (0, u.invokeMethod)("removeSavedFile", e)
        }
      };
    L.appStatus = b.AppStatus.FORE_GROUND, L.hanged = !1, (0, u.subscribe)("INVOKE_METHOD", function(e, t) {
      var n = e.name,
        o = e.args;
      L[n](o, !0)
    }), (0, u.subscribe)("WEBVIEW_ERROR_MSG", function(e, t) {
      var n = e.msg;
      Reporter.triggerErrorMessage(n)
    }), (0, u.onMethod)("onAppRoute", function(e) {
      var t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
      if (e.path = e.path.substring(0, e.path.length - 5), e.webviewId = "undefined" != typeof e.webviewId ? e.webviewId : t, A = e.path, "appLaunch" !== e.openType)
        for (var n in e.query) e.query[n] = decodeURIComponent(e.query[n]);
      "navigateBack" != e.openType && "redirectTo" != e.openType || (0, w.clearOldWebviewCanvas)(), (0, w.notifyWebviewIdtoCanvas)(e.webviewId), (0, y.notifyWebviewIdtoMap)(e.webviewId), D = e.webviewId, P.forEach(function(t) {
        t(e)
      })
    }), (0, u.onMethod)("onAppRouteDone", function(e) {
      var t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
      e.path = e.path.substring(0, e.path.length - 5), e.webviewId = "undefined" != typeof e.webviewId ? e.webviewId : t, A = e.path, M.forEach(function(t) {
        t(e)
      }), (0, u.publish)("onAppRouteDone", {}, [t])
    }), (0, u.onMethod)("onKeyboardValueChange", function(e) {
      var t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1],
        n = e.value,
        o = e.cursor;
      if (e.data && "function" == typeof x) {
        var r = JSON.parse(e.data);
        if (r.bindinput) {
          var i;
          try {
            i = x({
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
            throw new l.AppServiceSdkKnownError("bind key input error")
          }
          if (r.setKeyboardValue)
            if (void 0 === i || null === i || i === !1);
            else if ("Object" === (0, l.getDataType)(i)) {
            var a = {
              inputId: e.inputId
            };
            n != i.value && (a.value = i.value + ""), isNaN(parseInt(i.cursor)) || (a.cursor = parseInt(i.cursor), "undefined" == typeof a.value && (a.value = n), a.cursor > a.value.length && (a.cursor = -1)), (0, u.invokeMethod)("setKeyboardValue", a)
          } else n != i && (0, u.invokeMethod)("setKeyboardValue", {
            value: i + "",
            cursor: -1,
            inputId: e.inputId
          })
        }
      }(0, u.publish)("setKeyboardValue", {
        value: n,
        cursor: o,
        inputId: e.inputId
      }, [t])
    });
    var F = function(e, t, n) {
        var o = [],
          r = [];
        if ("onTouchStart" === t) {
          for (var i in e) o.push(e[i]);
          var a = {
            x: n.touch.x,
            y: n.touch.y,
            identifier: n.touch.id
          };
          r.push(a), o.push(a)
        } else if ("onTouchMove" === t)
          for (var s in e) {
            var c = e[s],
              u = !1;
            for (var l in n.touches) {
              var f = {
                x: n.touches[l].x,
                y: n.touches[l].y,
                identifier: n.touches[l].id
              };
              if (f.identifier === c.identifier && (c.x !== f.x || c.y !== f.y)) {
                o.push(f), r.push(f), u = !0;
                break
              }
            }
            u || o.push(c)
          } else if ("onTouchEnd" === t) {
            var d = {
              x: n.touch.x,
              y: n.touch.y,
              identifier: n.touch.id
            };
            for (var p in e) {
              var h = e[p];
              h.identifier === d.identifier ? r.push(d) : o.push(h)
            }
          } else if ("onTouchCancel" === t)
          for (var v in n.touches) {
            var g = {
              x: n.touches[v].x,
              y: n.touches[v].y,
              identifier: n.touches[v].id
            };
            r.push(g)
          } else if ("onLongPress" === t) {
            var y = {
              x: n.touch.x,
              y: n.touch.y,
              identifier: n.touch.id
            };
            for (var b in e) e[b].identifier === y.identifier ? o.push(y) : o.push(e[b]);
            r.push(y)
          }
        return {
          touches: o,
          changedTouches: r
        }
      },
      N = {
        onTouchStart: "touchstart",
        onTouchMove: "touchmove",
        onTouchEnd: "touchend",
        onTouchCancel: "touchcancel",
        onLongPress: "longtap"
      };
    ["onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel", "onLongPress"].forEach(function(e) {
      (0, u.onMethod)(e, function(t) {
        var n = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1],
          o = JSON.parse(t.data),
          r = o.canvasNumber;
        w.canvasInfo.hasOwnProperty(r) || console.error("No such canvas " + r + " register in " + n + ", but trigger " + e + " event.");
        var i = w.canvasInfo[r].data;
        if (i[e] && "function" == typeof x) {
          var a = F(i.lastTouches, e, t),
            s = a.touches,
            c = a.changedTouches;
          i.lastTouches = s, "onTouchMove" === e && 0 === c.length || x({
            data: {
              type: N[e],
              timeStamp: new Date - i.startTime,
              target: i.target,
              touches: s,
              changedTouches: c
            },
            eventName: i[e],
            webviewId: n
          })
        }
      })
    }), ["onVideoPlay", "onVideoPause", "onVideoEnded", "onVideoTimeUpdate", "onVideoClickFullScreenBtn", "onVideoClickDanmuBtn"].forEach(function(e) {
      (0, u.onMethod)(e, function() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
          n = arguments[1],
          o = "bind" + e.substring(7).toLowerCase(),
          r = JSON.parse(t.data),
          i = r.handlers,
          a = r.event,
          s = r.createdTimestamp;
        if (i[o] && "function" == typeof x) {
          var c = {
            type: o.substring(4),
            target: a.target,
            currentTarget: a.currentTarget,
            timeStamp: Date.now() - s,
            detail: {}
          };
          "bindtimeupdate" === o && (c.detail = {
            currentTime: t.position
          }), x({
            data: c,
            eventName: i[o],
            webviewId: n
          })
        }
      })
    }), (0, u.onMethod)("onAccelerometerChange", function() {
      var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
      arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
      E.forEach(function(t) {
        "function" == typeof t && t(e)
      })
    }), (0, u.onMethod)("onCompassChange", function() {
      var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
      arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
      R.forEach(function(t) {
        "function" == typeof t && t(e)
      })
    }), (0, u.onMethod)("onError", function() {
      var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
      arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
      console.error("thirdScriptError", "\n", "sdk uncaught third Error", "\n", e.message, "\n", e.stack)
    }), (0, u.onMethod)("onMapMarkerClick", function() {
      var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
        t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
      if (e.data && "function" == typeof x) {
        var n = JSON.parse(e.data);
        n.bindmarkertap && x({
          data: {
            markerId: n.markerId
          },
          eventName: n.bindmarkertap,
          webviewId: t
        })
      }
    }), (0, u.onMethod)("onMapControlClick", function() {
      var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
        t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
      if (e.data && "function" == typeof x) {
        var n = JSON.parse(e.data);
        n.bindcontroltap && x({
          data: {
            controlId: n.controlId
          },
          eventName: n.bindcontroltap,
          webviewId: t
        })
      }
    }), (0, u.onMethod)("onMapRegionChange", function() {
      var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
        t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1],
        n = y.mapInfo[t + "_" + e.mapId];
      n && n.bindregionchange && "function" == typeof x && x({
        data: {
          type: e.type
        },
        eventName: n.bindregionchange,
        webviewId: t
      })
    }), (0, u.onMethod)("onMapClick", function() {
      var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
        t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1],
        n = y.mapInfo[t + "_" + e.mapId];
      n && n.bindtap && "function" == typeof x && x({
        data: {},
        eventName: n.bindtap,
        webviewId: t
      })
    });
    for (var W in L) i(W);
    e.exports = C
  }, function(e, t, n) {
    function o() {
      WeixinJSBridge.invoke.apply(WeixinJSBridge, arguments)
    }

    function r() {
      WeixinJSBridge.on.apply(WeixinJSBridge, arguments)
    }

    function i() {
      var e = Array.prototype.slice.call(arguments);
      e[1] = {
        data: e[1],
        options: {
          timestamp: Date.now()
        }
      }, WeixinJSBridge.publish.apply(WeixinJSBridge, e)
    }

    function a() {
      var e = Array.prototype.slice.call(arguments),
        t = e[1];
      e[1] = function(e, n) {
        var o = e.data,
          r = e.options,
          i = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2],
          a = r && r.timestamp || 0,
          s = Date.now();
        "function" == typeof t && t(o, n), Reporter.speedReport({
          key: "webview2AppService",
          data: o || {},
          timeMark: {
            startTime: a,
            endTime: s,
            nativeTime: i.nativeTime || 0
          }
        })
      }, WeixinJSBridge.subscribe.apply(WeixinJSBridge, e)
    }

    function s(e) {
      var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
        n = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2],
        r = {};
      for (var i in t) "function" == typeof t[i] && (r[i] = Reporter.surroundThirdByTryCatch(t[i], "sdk catch error in " + e + " " + i + " callback function"), delete t[i]);
      var a = {};
      for (var s in n) "function" == typeof n[s] && (a[s] = (0, u.surroundByTryCatchFactory)(n[s], "sdk catch error in ${name} ${key} callback function"));
      o(e, t, function(t) {
        t.errMsg = t.errMsg || e + ":ok";
        var n = 0 === t.errMsg.indexOf(e + ":ok"),
          o = 0 === t.errMsg.indexOf(e + ":cancel"),
          i = 0 === t.errMsg.indexOf(e + ":fail");
        "function" == typeof a.beforeAll && a.beforeAll(t), n ? ("function" == typeof a.beforeSuccess && a.beforeSuccess(t), "function" == typeof r.success && r.success(t), "function" == typeof a.afterSuccess && a.afterSuccess(t)) : o ? ("function" == typeof a.beforeCancel && a.beforeCancel(t), "function" == typeof r.cancel && r.cancel(t), "function" == typeof a.afterCancel && a.afterCancel(t), Reporter.triggerErrorMessage(t.errMsg), Reporter.reportIDKey({
          key: e + "_cancel"
        })) : i && ("function" == typeof a.beforeFail && a.beforeFail(t), "function" == typeof r.fail && r.fail(t), "function" == typeof a.afterFail && a.afterFail(t), Reporter.triggerErrorMessage(t.errMsg), Reporter.reportIDKey({
          key: e + "_fail"
        })), "function" == typeof r.complete && r.complete(t), "function" == typeof a.afterAll && a.afterAll(t)
      }), Reporter.reportIDKey({
        key: e
      })
    }

    function c(e, t) {
      r(e, (0, u.surroundByTryCatchFactory)(t, "sdk catch error in " + e + " callback function"))
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.invoke = o, t.on = r, t.publish = i, t.subscribe = a, t.invokeMethod = s, t.onMethod = c;
    var u = n(2)
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
      if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n
      }
      return Array.from(e)
    }

    function a(e, t) {
      return function() {
        try {
          return e.apply(e, arguments)
        } catch (e) {
          if ("[object Error]" === Object.prototype.toString.apply(e)) {
            if ("AppServiceSdkKnownError" == e.type) throw e;
            Reporter.errorReport({
              key: "appServiceSDKScriptError",
              error: e,
              extend: t
            })
          }
        }
      }
    }

    function s(e) {
      var t = Object.prototype.toString.call(e).split(" ")[1].split("]")[0];
      return e = "Array" == t || "Object" == t ? JSON.stringify(e) : "String" == t || "Number" == t || "Boolean" == t ? e.toString() : "Date" == t ? e.getTime().toString() : "Undefined" == t ? "undefined" : "Null" == t ? "null" : "", {
        data: e,
        dataType: t
      }
    }

    function c(e, t) {
      return e = "String" == t ? e : "Array" == t || "Object" == t ? JSON.parse(e) : "Number" == t ? parseFloat(e) : "Boolean" == t ? "true" == e : "Date" == t ? new Date(parseInt(e)) : "Undefined" == t ? void 0 : "Null" == t ? null : ""
    }

    function u(e) {
      return Object.prototype.toString.call(e).split(" ")[1].split("]")[0]
    }

    function l(e) {
      return "Object" === u(e)
    }

    function f(e, t) {
      var n = arguments.length <= 2 || void 0 === arguments[2] ? "parameter" : arguments[2],
        o = u(t),
        r = u(e);
      if (r != o) return n + " should be " + o + " instead of " + r + ";";
      switch (result = "", o) {
        case "Object":
          for (var i in t) result += f(e[i], t[i], n + "." + i);
          break;
        case "Array":
          if (e.length < t.length) return n + " should have at least " + t.length + " item;";
          for (var a = 0; a < t.length; ++a) result += f(e[a], t[a], n + "[" + a + "]")
      }
      return result
    }

    function d(e, t) {
      var n = arguments.length <= 2 || void 0 === arguments[2] || arguments[2];
      if (n && (t = m(t)), 0 === t.indexOf("/")) return t.substr(1);
      if (0 === t.indexOf("./")) return d(e, t.substr(2), !1);
      var o, r, i = t.split("/");
      for (o = 0, r = i.length; o < r && ".." === i[o]; o++);
      i.splice(0, o);
      var t = i.join("/"),
        a = e.length > 0 ? e.split("/") : [];
      a.splice(a.length - o - 1, o + 1);
      var s = a.concat(i),
        c = s.join("/");
      return c
    }

    function p() {
      return "undefined" != typeof window && window.navigator ? window.navigator.userAgent.indexOf("appservice") > -1 ? "devtools" : window.navigator.userAgent.toLowerCase().indexOf("android") > -1 ? "android" : "" : "android" === __wxConfig.platform ? "android" : "devtools" === __wxConfig.platform ? "devtools" : "ios"
    }

    function h(e) {
      var t = !(arguments.length <= 1 || void 0 === arguments[1]) && arguments[1];
      if ("object" !== ("undefined" == typeof e ? "undefined" : A(e))) return e;
      var n = [],
        o = !1;
      [].concat(i(Object.keys(e)), i(Object.keys(e).map(function(t) {
        return e[t]
      }))).forEach(function(e) {
        decodeURIComponent(e) !== e && (o = !0)
      }), o && t && (console.group("" + new Date), console.warn("wx.request 修复了之前不会对 data 进行 encodeURIComponent 的问题，你不再需要对 data 进行 encodeURIComponent 了"), console.groupEnd());
      for (var r in e) e.hasOwnProperty(r) && (t ? n.push(encodeURIComponent(r) + "=" + encodeURIComponent(e[r])) : n.push(r + "=" + e[r]));
      return n.join("&")
    }

    function v(e, t) {
      if ("string" == typeof e && "object" === ("undefined" == typeof t ? "undefined" : A(t)) && Object.keys(t).length > 0) {
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
          }, {}),
          i = Object.keys(t).reduce(function(e, n) {
            return "object" === A(t[n]) ? e[encodeURIComponent(n)] = encodeURIComponent(JSON.stringify(t[n])) : e[encodeURIComponent(n)] = encodeURIComponent(t[n]), e
          }, {});
        return o + "?" + h(y(r, i))
      }
      return e
    }

    function g(e) {
      return /^(http|https):\/\/.*/i.test(e)
    }

    function y() {
      for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
      return t.reduce(function(e, t) {
        for (var n in t) e[n] = t[n];
        return e
      }, {})
    }

    function b(e) {
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

    function m(e) {
      if ("string" != typeof e) throw new P("wx.redirectTo: invalid url:" + e);
      var t = e.split("?")[0],
        n = e.split("?")[1];
      return t += ".html", "undefined" != typeof n ? t + "?" + n : t
    }

    function w(e, t) {
      for (var n in t) e[n] = t[n];
      return e
    }

    function _(e) {
      for (var t = "", n = new Uint8Array(e), o = n.byteLength, r = 0; r < o; r++) t += String.fromCharCode(n[r]);
      return x(t)
    }

    function k(e) {
      for (var t = C(e), n = t.length, o = new Uint8Array(n), r = 0; r < n; r++) o[r] = t.charCodeAt(r);
      return o.buffer
    }

    function S(e, t) {
      var n = new FileReader;
      n.onload = function() {
        t(this.result)
      }, n.readAsArrayBuffer(e)
    }

    function T(e) {
      return Object.keys(e).reduce(function(t, n) {
        return "string" != typeof e[n] ? t[n] = Object.prototype.toString.apply(e[n]) : t[n] = e[n], t
      }, {})
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var A = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
      return typeof e
    } : function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
    };
    t.surroundByTryCatchFactory = a, t.getDataType = u, t.isObject = l, t.paramCheck = f, t.getRealRoute = d, t.getPlatform = p, t.urlEncodeFormData = h, t.addQueryStringToUrl = v, t.validateUrl = g, t.assign = y, t.encodeUrlQuery = b, t.extend = w, t.arrayBufferToBase64 = _, t.base64ToArrayBuffer = k, t.blobToArrayBuffer = S, t.convertObjectValueToString = T;
    var P = (t.anyTypeToString = a(s, "anyTypeToString"), t.stringToAnyType = a(c, "stringToAnyType"), t.AppServiceSdkKnownError = function(e) {
        function t(e) {
          n(this, t);
          var r = o(this, Object.getPrototypeOf(t).call(this, "APP-SERVICE-SDK:" + e));
          return r.type = "AppServiceSdkKnownError", r
        }
        return r(t, e), t
      }(Error)),
      M = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      x = x || function(e) {
        for (var t, n, o = String(e), r = "", i = 0, a = M; o.charAt(0 | i) || (a = "=", i % 1); r += a.charAt(63 & t >> 8 - i % 1 * 8)) {
          if (n = o.charCodeAt(i += .75), n > 255) throw new Error('"btoa" failed');
          t = t << 8 | n
        }
        return r
      },
      C = C || function(e) {
        var t = String(e).replace(/=+$/, ""),
          n = "";
        if (t.length % 4 === 1) throw new Error('"atob" failed');
        for (var o, r, i = 0, a = 0; r = t.charAt(a++); ~r && (o = i % 4 ? 64 * o + r : r, i++ % 4) ? n += String.fromCharCode(255 & o >> (-2 * i & 6)) : 0) r = M.indexOf(r);
        return n
      }
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
              s = arguments.length <= 7 || void 0 === arguments[7] ? 0 : arguments[7],
              c = arguments.length <= 8 || void 0 === arguments[8] ? 0 : arguments[8],
              u = arguments.length <= 9 || void 0 === arguments[9] ? 0 : arguments[9],
              l = arguments.length <= 10 || void 0 === arguments[10] ? 1 : arguments[10],
              f = arguments.length <= 11 || void 0 === arguments[11] ? 0 : arguments[11],
              d = arguments.length <= 12 || void 0 === arguments[12] ? 0 : arguments[12],
              p = arguments.length <= 13 || void 0 === arguments[13] ? 0 : arguments[13],
              h = arguments.length <= 14 || void 0 === arguments[14] ? 0 : arguments[14],
              v = arguments.length <= 15 || void 0 === arguments[15] ? 1 : arguments[15];
            return this.currentStepAnimates.push({
              type: "matrix3d",
              args: [e, t, n, o, r, i, a, s, c, u, l, f, d, p, h, v]
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
  }, function(e, t, n) {
    function o(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function r(e, t) {
      var n = this,
        o = new l(e, t);
      return o._getAppStatus = function() {
        return n.appStatus
      }, o._getHanged = function() {
        return n.hanged
      }, this.onAppEnterBackground(function() {
        o.pause()
      }), o
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
    }();
    t.default = r;
    var a = (n(1), n(2), n(5)),
      s = n(6),
      c = {},
      u = new a.EventEmitter2;
    WeixinJSBridge.subscribe("audioInsert", function(e, t) {
      var n = e.audioId;
      c[t + "_" + n] = !0, u.emit("audioInsert_" + t + "_" + n)
    });
    var l = function() {
      function e(t, n) {
        if (o(this, e), "string" != typeof t) throw new Error("audioId should be a String");
        this.audioId = t, this.webviewId = n
      }
      return i(e, [{
        key: "setSrc",
        value: function(e) {
          this._sendAction({
            method: "setSrc",
            data: e
          })
        }
      }, {
        key: "play",
        value: function() {
          var e = this._getAppStatus();
          this._getHanged();
          e === s.AppStatus.BACK_GROUND || this._sendAction({
            method: "play"
          })
        }
      }, {
        key: "pause",
        value: function() {
          this._sendAction({
            method: "pause"
          })
        }
      }, {
        key: "seek",
        value: function(e) {
          this._sendAction({
            method: "setCurrentTime",
            data: e
          })
        }
      }, {
        key: "_ready",
        value: function(e) {
          c[this.webviewId + "_" + this.audioId] ? e() : u.on("audioInsert_" + this.webviewId + "_" + this.audioId, function() {
            e()
          })
        }
      }, {
        key: "_sendAction",
        value: function(e) {
          var t = this;
          this._ready(function() {
            WeixinJSBridge.publish("audio_" + t.audioId + "_actionChanged", e, [t.webviewId])
          })
        }
      }]), e
    }()
  }, function(e, t, n) {
    var o, r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
      return typeof e
    } : function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
    };
    ! function(i) {
      function a() {
        this._events = {}, this._conf && s.call(this, this._conf)
      }

      function s(e) {
        e ? (this._conf = e, e.delimiter && (this.delimiter = e.delimiter), this._events.maxListeners = e.maxListeners !== i ? e.maxListeners : p, e.wildcard && (this.wildcard = e.wildcard), e.newListener && (this.newListener = e.newListener), this.wildcard && (this.listenerTree = {})) : this._events.maxListeners = p
      }

      function c(e) {
        console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", e), console.trace && console.trace()
      }

      function u(e) {
        this._events = {}, this.newListener = !1, s.call(this, e)
      }

      function l(e, t, n, o) {
        if (!n) return [];
        var r, i, a, s, c, u, f, d = [],
          p = t.length,
          h = t[o],
          v = t[o + 1];
        if (o === p && n._listeners) {
          if ("function" == typeof n._listeners) return e && e.push(n._listeners), [n];
          for (r = 0, i = n._listeners.length; r < i; r++) e && e.push(n._listeners[r]);
          return [n]
        }
        if ("*" === h || "**" === h || n[h]) {
          if ("*" === h) {
            for (a in n) "_listeners" !== a && n.hasOwnProperty(a) && (d = d.concat(l(e, t, n[a], o + 1)));
            return d
          }
          if ("**" === h) {
            f = o + 1 === p || o + 2 === p && "*" === v, f && n._listeners && (d = d.concat(l(e, t, n, p)));
            for (a in n) "_listeners" !== a && n.hasOwnProperty(a) && ("*" === a || "**" === a ? (n[a]._listeners && !f && (d = d.concat(l(e, t, n[a], p))), d = d.concat(l(e, t, n[a], o))) : d = a === v ? d.concat(l(e, t, n[a], o + 2)) : d.concat(l(e, t, n[a], o)));
            return d
          }
          d = d.concat(l(e, t, n[h], o + 1))
        }
        if (s = n["*"], s && l(e, t, s, o + 1), c = n["**"])
          if (o < p) {
            c._listeners && l(e, t, c, p);
            for (a in c) "_listeners" !== a && c.hasOwnProperty(a) && (a === v ? l(e, t, c[a], o + 2) : a === h ? l(e, t, c[a], o + 1) : (u = {}, u[a] = c[a], l(e, t, {
              "**": u
            }, o + 1)))
          } else c._listeners ? l(e, t, c, p) : c["*"] && c["*"]._listeners && l(e, t, c["*"], p);
        return d
      }

      function f(e, t) {
        e = "string" == typeof e ? e.split(this.delimiter) : e.slice();
        for (var n = 0, o = e.length; n + 1 < o; n++)
          if ("**" === e[n] && "**" === e[n + 1]) return;
        for (var r = this.listenerTree, a = e.shift(); a !== i;) {
          if (r[a] || (r[a] = {}), r = r[a], 0 === e.length) return r._listeners ? ("function" == typeof r._listeners && (r._listeners = [r._listeners]), r._listeners.push(t), !r._listeners.warned && this._events.maxListeners > 0 && r._listeners.length > this._events.maxListeners && (r._listeners.warned = !0, c(r._listeners.length))) : r._listeners = t, !0;
          a = e.shift()
        }
        return !0
      }
      var d = Array.isArray ? Array.isArray : function(e) {
          return "[object Array]" === Object.prototype.toString.call(e)
        },
        p = 10;
      u.EventEmitter2 = u, u.prototype.delimiter = ".", u.prototype.setMaxListeners = function(e) {
        e !== i && (this._events || a.call(this), this._events.maxListeners = e, this._conf || (this._conf = {}), this._conf.maxListeners = e)
      }, u.prototype.event = "", u.prototype.once = function(e, t) {
        return this.many(e, 1, t), this
      }, u.prototype.many = function(e, t, n) {
        function o() {
          0 === --t && r.off(e, o), n.apply(this, arguments)
        }
        var r = this;
        if ("function" != typeof n) throw new Error("many only accepts instances of Function");
        return o._origin = n, this.on(e, o), r
      }, u.prototype.emit = function() {
        this._events || a.call(this);
        var e = arguments[0];
        if ("newListener" === e && !this.newListener && !this._events.newListener) return !1;
        var t, n, o, r, i, s = arguments.length;
        if (this._all && this._all.length) {
          if (i = this._all.slice(), s > 3)
            for (t = new Array(s), r = 0; r < s; r++) t[r] = arguments[r];
          for (o = 0, n = i.length; o < n; o++) switch (this.event = e, s) {
            case 1:
              i[o].call(this, e);
              break;
            case 2:
              i[o].call(this, e, arguments[1]);
              break;
            case 3:
              i[o].call(this, e, arguments[1], arguments[2]);
              break;
            default:
              i[o].apply(this, t)
          }
        }
        if (this.wildcard) {
          i = [];
          var c = "string" == typeof e ? e.split(this.delimiter) : e.slice();
          l.call(this, i, c, this.listenerTree, 0)
        } else {
          if (i = this._events[e], "function" == typeof i) {
            switch (this.event = e, s) {
              case 1:
                i.call(this);
                break;
              case 2:
                i.call(this, arguments[1]);
                break;
              case 3:
                i.call(this, arguments[1], arguments[2]);
                break;
              default:
                for (t = new Array(s - 1), r = 1; r < s; r++) t[r - 1] = arguments[r];
                i.apply(this, t)
            }
            return !0
          }
          i && (i = i.slice())
        }
        if (i && i.length) {
          if (s > 3)
            for (t = new Array(s - 1), r = 1; r < s; r++) t[r - 1] = arguments[r];
          for (o = 0, n = i.length; o < n; o++) switch (this.event = e, s) {
            case 1:
              i[o].call(this);
              break;
            case 2:
              i[o].call(this, arguments[1]);
              break;
            case 3:
              i[o].call(this, arguments[1], arguments[2]);
              break;
            default:
              i[o].apply(this, t)
          }
          return !0
        }
        if (!this._all && "error" === e) throw arguments[1] instanceof Error ? arguments[1] : new Error("Uncaught, unspecified 'error' event.");
        return !!this._all
      }, u.prototype.emitAsync = function() {
        this._events || a.call(this);
        var e = arguments[0];
        if ("newListener" === e && !this.newListener && !this._events.newListener) return Promise.resolve([!1]);
        var t, n, o, r, i, s = [],
          c = arguments.length;
        if (this._all) {
          if (c > 3)
            for (t = new Array(c), r = 1; r < c; r++) t[r] = arguments[r];
          for (o = 0, n = this._all.length; o < n; o++) switch (this.event = e, c) {
            case 1:
              s.push(this._all[o].call(this, e));
              break;
            case 2:
              s.push(this._all[o].call(this, e, arguments[1]));
              break;
            case 3:
              s.push(this._all[o].call(this, e, arguments[1], arguments[2]));
              break;
            default:
              s.push(this._all[o].apply(this, t))
          }
        }
        if (this.wildcard) {
          i = [];
          var u = "string" == typeof e ? e.split(this.delimiter) : e.slice();
          l.call(this, i, u, this.listenerTree, 0)
        } else i = this._events[e];
        if ("function" == typeof i) switch (this.event = e, c) {
          case 1:
            s.push(i.call(this));
            break;
          case 2:
            s.push(i.call(this, arguments[1]));
            break;
          case 3:
            s.push(i.call(this, arguments[1], arguments[2]));
            break;
          default:
            for (t = new Array(c - 1), r = 1; r < c; r++) t[r - 1] = arguments[r];
            s.push(i.apply(this, t))
        } else if (i && i.length) {
          if (c > 3)
            for (t = new Array(c - 1), r = 1; r < c; r++) t[r - 1] = arguments[r];
          for (o = 0, n = i.length; o < n; o++) switch (this.event = e, c) {
            case 1:
              s.push(i[o].call(this));
              break;
            case 2:
              s.push(i[o].call(this, arguments[1]));
              break;
            case 3:
              s.push(i[o].call(this, arguments[1], arguments[2]));
              break;
            default:
              s.push(i[o].apply(this, t))
          }
        } else if (!this._all && "error" === e) return arguments[1] instanceof Error ? Promise.reject(arguments[1]) : Promise.reject("Uncaught, unspecified 'error' event.");
        return Promise.all(s)
      }, u.prototype.on = function(e, t) {
        if ("function" == typeof e) return this.onAny(e), this;
        if ("function" != typeof t) throw new Error("on only accepts instances of Function");
        return this._events || a.call(this), this.emit("newListener", e, t), this.wildcard ? (f.call(this, e, t), this) : (this._events[e] ? ("function" == typeof this._events[e] && (this._events[e] = [this._events[e]]), this._events[e].push(t), !this._events[e].warned && this._events.maxListeners > 0 && this._events[e].length > this._events.maxListeners && (this._events[e].warned = !0, c(this._events[e].length))) : this._events[e] = t, this)
      }, u.prototype.onAny = function(e) {
        if ("function" != typeof e) throw new Error("onAny only accepts instances of Function");
        return this._all || (this._all = []), this._all.push(e), this
      }, u.prototype.addListener = u.prototype.on, u.prototype.off = function(e, t) {
        function n(e) {
          if (e !== i) {
            var t = Object.keys(e);
            for (var o in t) {
              var a = t[o],
                s = e[a];
              s instanceof Function || "object" !== ("undefined" == typeof s ? "undefined" : r(s)) || null === s || (Object.keys(s).length > 0 && n(e[a]), 0 === Object.keys(s).length && delete e[a])
            }
          }
        }
        if ("function" != typeof t) throw new Error("removeListener only takes instances of Function");
        var o, a = [];
        if (this.wildcard) {
          var s = "string" == typeof e ? e.split(this.delimiter) : e.slice();
          a = l.call(this, null, s, this.listenerTree, 0)
        } else {
          if (!this._events[e]) return this;
          o = this._events[e], a.push({
            _listeners: o
          })
        }
        for (var c = 0; c < a.length; c++) {
          var u = a[c];
          if (o = u._listeners, d(o)) {
            for (var f = -1, p = 0, h = o.length; p < h; p++)
              if (o[p] === t || o[p].listener && o[p].listener === t || o[p]._origin && o[p]._origin === t) {
                f = p;
                break
              }
            if (f < 0) continue;
            return this.wildcard ? u._listeners.splice(f, 1) : this._events[e].splice(f, 1), 0 === o.length && (this.wildcard ? delete u._listeners : delete this._events[e]), this.emit("removeListener", e, t), this
          }(o === t || o.listener && o.listener === t || o._origin && o._origin === t) && (this.wildcard ? delete u._listeners : delete this._events[e], this.emit("removeListener", e, t))
        }
        return n(this.listenerTree), this
      }, u.prototype.offAny = function(e) {
        var t, n = 0,
          o = 0;
        if (e && this._all && this._all.length > 0) {
          for (t = this._all, n = 0, o = t.length; n < o; n++)
            if (e === t[n]) return t.splice(n, 1), this.emit("removeListenerAny", e), this
        } else {
          for (t = this._all, n = 0, o = t.length; n < o; n++) this.emit("removeListenerAny", t[n]);
          this._all = []
        }
        return this
      }, u.prototype.removeListener = u.prototype.off, u.prototype.removeAllListeners = function(e) {
        if (0 === arguments.length) return !this._events || a.call(this), this;
        if (this.wildcard)
          for (var t = "string" == typeof e ? e.split(this.delimiter) : e.slice(), n = l.call(this, null, t, this.listenerTree, 0), o = 0; o < n.length; o++) {
            var r = n[o];
            r._listeners = null
          } else this._events && (this._events[e] = null);
        return this
      }, u.prototype.listeners = function(e) {
        if (this.wildcard) {
          var t = [],
            n = "string" == typeof e ? e.split(this.delimiter) : e.slice();
          return l.call(this, t, n, this.listenerTree, 0), t
        }
        return this._events || a.call(this), this._events[e] || (this._events[e] = []), d(this._events[e]) || (this._events[e] = [this._events[e]]), this._events[e]
      }, u.prototype.listenerCount = function(e) {
        return this.listeners(e).length
      }, u.prototype.listenersAny = function() {
        return this._all ? this._all : []
      }, o = function() {
        return u
      }.call(t, n, t, e), !(o !== i && (e.exports = o))
    }()
  }, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    t.LOG_LIMIT = 1024, t.AppStatus = {
      FORE_GROUND: 0,
      BACK_GROUND: 1
    }
  }, function(e, t, n) {
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
      i = n(1),
      a = n(2),
      s = n(5),
      c = "ios" !== (0, a.getPlatform)(),
      u = {},
      l = new s.EventEmitter2;
    WeixinJSBridge.subscribe("videoPlayerInsert", function(e, t) {
      var n = e.domId,
        o = e.videoPlayerId;
      u[n] = u[n] || o, l.emit("videoPlayerInsert", n)
    });
    var f = function() {
      function e(t) {
        if (o(this, e), "string" != typeof t) throw new Error("video ID should be a String");
        this.domId = t
      }
      return r(e, [{
        key: "play",
        value: function() {
          this._invokeMethod("play")
        }
      }, {
        key: "pause",
        value: function() {
          this._invokeMethod("pause")
        }
      }, {
        key: "seek",
        value: function(e) {
          this._invokeMethod("seek", [e])
        }
      }, {
        key: "sendDanmu",
        value: function(e) {
          var t = e.text,
            n = e.color;
          this._invokeMethod("sendDanmu", [t, n])
        }
      }, {
        key: "_invokeMethod",
        value: function(e, t) {
          function n() {
            c ? (this.action = {
              method: e,
              data: t
            }, this._sendAction()) : (0, i.invokeMethod)("operateVideoPlayer", {
              data: t,
              videoPlayerId: u[this.domId],
              type: e
            })
          }
          var o = this;
          "number" == typeof u[this.domId] ? n.apply(this) : l.on("videoPlayerInsert", function(e) {
            n.apply(o)
          })
        }
      }, {
        key: "_sendAction",
        value: function() {
          WeixinJSBridge.publish("video_" + this.domId + "_actionChanged", this.action)
        }
      }]), e
    }();
    t.default = f
  }, function(e, t, n) {
    function o(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function r(e) {
      d = e
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.mapInfo = t.MapContext = t.notifyWebviewIdtoMap = void 0;
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
      a = n(1),
      s = n(2),
      c = n(5),
      u = {},
      l = {},
      f = new c.EventEmitter2,
      d = 0,
      p = 0;
    WeixinJSBridge.subscribe("mapInsert", function(e, t) {
      var n = e.domId,
        o = e.mapId,
        r = e.bindregionchange,
        i = e.bindtap,
        a = e.showLocation,
        s = t + "_" + n;
      u[s] = u[s] || o, l[t + "_" + o] = {
        bindregionchange: r,
        bindtap: i,
        showLocation: a
      }, f.emit("mapInsert")
    });
    var h = function() {
      function e(t) {
        var n = this;
        if (o(this, e), "string" != typeof t) throw new Error("map ID should be a String");
        this.domId = t, WeixinJSBridge.subscribe("doMapActionCallback", function(e, t) {
          var o = e.callbackId;
          "getMapCenterLocation" === e.method && o && "function" == typeof n[o] && (n[o]({
            longitude: e.longitude,
            latitude: e.latitude
          }), delete n[o])
        })
      }
      return i(e, [{
        key: "_invoke",
        value: function(e, t) {
          var n = (0, s.getPlatform)();
          if ("ios" === n || "android" === n) {
            var o = l[d + "_" + t.mapId];
            if ("moveToMapLocation" === e) return void(o && o.showLocation ? (0,
              a.invokeMethod)(e, t) : console.error("only show-location set to true can invoke moveToLocation"));
            (0, a.invokeMethod)(e, t)
          } else {
            t.method = e;
            var r = "callback" + d + "_" + t.mapId + "_" + p++;
            this[r] = t.success, t.callbackId = r, (0, a.publish)("doMapAction" + t.mapId, t, [d])
          }
        }
      }, {
        key: "_invokeMethod",
        value: function(e, t) {
          var n = this,
            o = d + "_" + this.domId;
          "number" == typeof u[o] || u[o] ? (t.mapId = u[o], this._invoke(e, t)) : f.on("mapInsert", function() {
            t.mapId = u[o], n._invoke(e, t)
          })
        }
      }, {
        key: "getCenterLocation",
        value: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
          this._invokeMethod("getMapCenterLocation", e)
        }
      }, {
        key: "moveToLocation",
        value: function() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
          this._invokeMethod("moveToMapLocation", e)
        }
      }]), e
    }();
    t.notifyWebviewIdtoMap = r, t.MapContext = h, t.mapInfo = l
  }, function(module, exports) {
    if ("undefined" == typeof navigator) try {
      eval("const GeneratorFunction = Object.getPrototypeOf(function *() {}).constructor; const f = new GeneratorFunction('', 'console.log(0)'); f().__proto__.__proto__.next = () => {};")
    } catch (e) {}
  }, function(e, t, n) {
    (function(e) {
      var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
      };
      n(1);
      if ("undefined" != typeof Function) {
        var o = Function;
        e = {}, Function.constructor = function() {
          return arguments[arguments.length - 1] = "console.warn('can not create Function')", o.apply(this, arguments)
        }, Function.prototype.constructor = function() {
          return arguments[arguments.length - 1] = "console.warn('can not create Function')", o.apply(this, arguments)
        }, Function = function() {
          return "return this" === arguments[arguments.length - 1] ? arguments[arguments.length - 1] = "return global" : arguments[arguments.length - 1] = "console.warn('can not create Function')", o.apply(this, arguments)
        }, Function.constructor.__proto__ = null
      }
      "undefined" != typeof eval && (eval = void 0), "undefined" != typeof navigator && ! function() {
        var e = setTimeout;
        setTimeout = function(n, o) {
          if ("function" != typeof n) throw new TypeError("setTimetout expects a function as first argument but got " + ("undefined" == typeof n ? "undefined" : t(n)) + ".");
          var r = Reporter.surroundThirdByTryCatch(n, "sdk catch error in setTimeout callback");
          return e(r, o)
        };
        var n = setInterval;
        setInterval = function(e, o) {
          if ("function" != typeof e) throw new TypeError("setInterval expects a function as first argument but got " + ("undefined" == typeof e ? "undefined" : t(e)) + ".");
          Reporter.surroundThirdByTryCatch(e, "sdk catch error in setInterval callback");
          return n(e, o)
        }
      }()
    }).call(t, function() {
      return this
    }())
  }, function(e, t, n) {
    var o = n(1),
      r = n(2),
      i = n(6);
    "undefined" != typeof __wxConfig && __wxConfig.debug && "devtools" !== (0, r.getPlatform)() && ! function() {
      var e = [],
        t = [],
        n = ["log", "warn", "error", "info", "debug"];
      n.forEach(function(n) {
        var r = console[n];
        console[n] = function() {
          e.length > i.LOG_LIMIT && e.shift();
          var a = Array.prototype.slice.call(arguments);
          e.push({
            method: n,
            log: a
          }), r.apply(console, arguments), t.length > 0 && (0, o.publish)(n, {
            log: a
          }, t)
        }
      }), (0, o.subscribe)("DOMContentLoaded", function(n, r) {
        t.push(r), (0, o.publish)("initLogs", {
          logs: e
        }, [r])
      })
    }(), "undefined" == typeof console.group && (console.group = function() {}), "undefined" == typeof console.groupEnd && (console.groupEnd = function() {})
  }, function(e, t, n) {
    function o(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function r(e) {
      y = e
    }

    function i(e) {
      return "number" == typeof e
    }

    function a(e) {
      var t = null;
      if (null != (t = /^#([0-9|A-F|a-f]{6})$/.exec(e))) {
        var n = parseInt(t[1].slice(0, 2), 16),
          o = parseInt(t[1].slice(2, 4), 16),
          r = parseInt(t[1].slice(4), 16);
        return [n, o, r, 255]
      }
      if (null != (t = /^rgb\((.+)\)$/.exec(e))) return t[1].split(",").map(function(e) {
        return parseInt(e.trim())
      }).concat(255);
      if (null != (t = /^rgba\((.+)\)$/.exec(e))) return t[1].split(",").map(function(e, t) {
        return 3 == t ? Math.floor(255 * parseFloat(e.trim())) : parseInt(e.trim())
      });
      var i = e.toLowerCase();
      if (d.predefinedColor.hasOwnProperty(i)) {
        t = /^#([0-9|A-F|a-f]{6})$/.exec(d.predefinedColor[i]);
        var n = parseInt(t[1].slice(0, 2), 16),
          o = parseInt(t[1].slice(2, 4), 16),
          r = parseInt(t[1].slice(4), 16);
        return [n, o, r, 255]
      }
      console.group("非法颜色: " + e), console.error("不支持颜色：" + e), console.groupEnd()
    }

    function s(e) {
      if (Array.isArray(e)) {
        var t = [];
        return e.forEach(function(e) {
          t.push(s(e))
        }), t
      }
      if ("object" == ("undefined" == typeof e ? "undefined" : u(e))) {
        var t = {};
        for (var n in e) t[n] = s(e[n]);
        return t
      }
      return e
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.Context = t.notifyCurrentRoutetoContext = void 0;
    var c = function() {
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
      u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
      },
      l = n(2),
      f = n(13),
      d = n(14),
      p = ["scale", "rotate", "translate", "save", "restore"],
      h = ["drawImage", "fillText", "fill", "stroke", "fillRect", "strokeRect", "clearRect"],
      v = ["beginPath", "moveTo", "lineTo", "rect", "arc", "quadraticCurveTo", "bezierCurveTo", "closePath"],
      g = ["setFillStyle", "setStrokeStyle", "setGlobalAlpha", "setShadow", "setFontSize", "setLineCap", "setLineJoin", "setLineWidth", "setMiterLimit"],
      y = "",
      b = function() {
        function e(t, n) {
          o(this, e), this.type = t, this.data = n, this.colorStop = []
        }
        return c(e, [{
          key: "addColorStop",
          value: function(e, t) {
            this.colorStop.push([e, a(t)])
          }
        }]), e
      }(),
      m = function() {
        function e(t) {
          o(this, e), this.actions = [], this.path = [], this.canvasId = t
        }
        return c(e, [{
          key: "getActions",
          value: function() {
            var e = s(this.actions);
            return this.actions = [], this.path = [], e
          }
        }, {
          key: "clearActions",
          value: function() {
            this.actions = [], this.path = []
          }
        }, {
          key: "draw",
          value: function() {
            var e = !(arguments.length <= 0 || void 0 === arguments[0]) && arguments[0],
              t = this.canvasId,
              n = s(this.actions);
            this.actions = [], this.path = [], (0, f.drawCanvas)({
              canvasId: t,
              actions: n,
              reserve: e
            })
          }
        }, {
          key: "createLinearGradient",
          value: function(e, t, n, o) {
            return new b("linear", [e, t, n, o])
          }
        }, {
          key: "createCircularGradient",
          value: function(e, t, n) {
            return new b("radial", [e, t, n])
          }
        }]), e
      }();
    [].concat(p, h).forEach(function(e) {
      "fill" == e || "stroke" == e ? m.prototype[e] = function() {
        this.actions.push({
          method: e + "Path",
          data: s(this.path)
        })
      } : "fillRect" === e ? m.prototype[e] = function(e, t, n, o) {
        this.actions.push({
          method: "fillPath",
          data: [{
            method: "rect",
            data: [e, t, n, o]
          }]
        })
      } : "strokeRect" === e ? m.prototype[e] = function(e, t, n, o) {
        this.actions.push({
          method: "strokePath",
          data: [{
            method: "rect",
            data: [e, t, n, o]
          }]
        })
      } : "fillText" == e ? m.prototype[e] = function(t, n, o) {
        this.actions.push({
          method: e,
          data: [t.toString(), n, o]
        })
      } : "drawImage" == e ? m.prototype[e] = function(t, n, o, r, a) {
        "devtools" == (0, l.getPlatform)() || /wxfile:\/\//.test(t) || (t = (0, l.getRealRoute)(y, t).replace(/.html$/, "")), i(r) && i(a) ? data = [t, n, o, r, a] : data = [t, n, o], this.actions.push({
          method: e,
          data: data
        })
      } : m.prototype[e] = function() {
        this.actions.push({
          method: e,
          data: [].slice.apply(arguments)
        })
      }
    }), v.forEach(function(e) {
      "beginPath" == e ? m.prototype[e] = function() {
        this.path = []
      } : "lineTo" == e ? m.prototype.lineTo = function() {
        0 == this.path.length ? this.path.push({
          method: "moveTo",
          data: [].slice.apply(arguments)
        }) : this.path.push({
          method: "lineTo",
          data: [].slice.apply(arguments)
        })
      } : m.prototype[e] = function() {
        this.path.push({
          method: e,
          data: [].slice.apply(arguments)
        })
      }
    }), g.forEach(function(e) {
      "setFillStyle" == e || "setStrokeStyle" == e ? m.prototype[e] = function() {
        var t = arguments[0];
        "string" == typeof t ? this.actions.push({
          method: e,
          data: ["normal", a(t)]
        }) : "object" == ("undefined" == typeof t ? "undefined" : u(t)) && t instanceof b && this.actions.push({
          method: e,
          data: [t.type, t.data, t.colorStop]
        })
      } : "setGlobalAlpha" === e ? m.prototype[e] = function() {
        var t = [].slice.apply(arguments, [0, 1]);
        t[0] = Math.floor(255 * parseFloat(t[0])), this.actions.push({
          method: e,
          data: t
        })
      } : "setShadow" == e ? m.prototype[e] = function() {
        var t = [].slice.apply(arguments, [0, 4]);
        t[3] = a(t[3]), this.actions.push({
          method: e,
          data: t
        })
      } : m.prototype[e] = function() {
        this.actions.push({
          method: e,
          data: [].slice.apply(arguments, [0, 1])
        })
      }
    }), t.notifyCurrentRoutetoContext = r, t.Context = m
  }, function(e, t, n) {
    function o(e, t) {
      return e + "canvas" + t
    }

    function r() {
      for (var e in g)
        if (0 == e.indexOf(h + "canvas")) {
          g[e];
          delete g[e]
        }
    }

    function i(e) {
      h = e
    }

    function a(e, t) {
      var n = !(arguments.length <= 2 || void 0 === arguments[2]) && arguments[2],
        o = arguments[3],
        r = arguments[4],
        i = arguments[5],
        a = (0, d.getPlatform)();
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

    function s(e) {
      var t = e.canvasId,
        n = e.actions,
        r = e.reserve,
        i = e.success,
        s = e.fail,
        c = e.complete;
      if (t && Array.isArray(n)) {
        var u = o(h, t);
        if ("number" == typeof g[u]) {
          var l = g[u];
          a(l, n, r, i, s, c)
        } else y[u] = y[u] || [], y[u] = y[u].concat({
          actions: n,
          reserve: r,
          success: i,
          fail: s,
          complete: c
        })
      }
    }

    function c(e) {
      var t = (0, d.getPlatform)();
      "ios" === t || "android" === t ? (0, l.invokeMethod)("canvasToTempFilePath", e) : (WeixinJSBridge.subscribe("onCanvasToDataUrl_" + e.canvasId, function(t) {
        var n = t.dataUrl;
        (0, l.invokeMethod)("base64ToTempFilePath", (0, d.assign)({
          base64Data: n
        }, e), {
          beforeAll: function(e) {
            e.errMsg = e.errMsg.replace("base64ToTempFilePath", "canvasToTempFilePath")
          }
        })
      }), (0, l.publish)("invokeCanvasToDataUrl_" + e.canvasId, {
        canvasId: e.canvasId
      }))
    }

    function u(e) {
      if (e.canvasId) {
        var t = o(h, e.canvasId);
        if ("number" == typeof g[t]) e.canvasId = g[t], c(e);
        else {
          var n = {
            errMsg: "canvasToTempFilePath: fail canvas is empty"
          };
          "function" == typeof e.fail && e.fail(n), "function" == typeof e.complete && e.complete(n)
        }
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.createCanvasContext = t.createContext = t.canvasToTempFilePath = t.drawCanvas = t.notifyWebviewIdtoCanvas = t.clearOldWebviewCanvas = t.canvasInfo = void 0;
    var l = n(1),
      f = n(12),
      d = n(2),
      p = n(5),
      h = (new p.EventEmitter2, 0),
      v = {},
      g = {},
      y = {};
    WeixinJSBridge.subscribe("canvasInsert", function(e, t) {
      var n = e.canvasId,
        r = e.canvasNumber,
        i = e.data,
        s = o(h, n);
      v[r] = {
        lastTouches: [],
        data: i
      }, g[s] = g[s] || r, Array.isArray(y[s]) && (y[s].forEach(function(e) {
        a(r, e.actions, e.reserve, e.success, e.fail, e.complete)
      }), delete y[s])
    }), WeixinJSBridge.subscribe("canvasRemove", function(e, t) {
      var n = e.canvasId,
        r = o(h, n);
      g[r] && delete g[r]
    });
    var b = function() {
        return new f.Context
      },
      m = function(e) {
        return new f.Context(e)
      };
    t.canvasInfo = v, t.clearOldWebviewCanvas = r, t.notifyWebviewIdtoCanvas = i, t.drawCanvas = s, t.canvasToTempFilePath = u, t.createContext = b, t.createCanvasContext = m
  }, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = {
      aliceblue: "#f0f8ff",
      antiquewhite: "#faebd7",
      aqua: "#00ffff",
      aquamarine: "#7fffd4",
      azure: "#f0ffff",
      beige: "#f5f5dc",
      bisque: "#ffe4c4",
      black: "#000000",
      blanchedalmond: "#ffebcd",
      blue: "#0000ff",
      blueviolet: "#8a2be2",
      brown: "#a52a2a",
      burlywood: "#deb887",
      cadetblue: "#5f9ea0",
      chartreuse: "#7fff00",
      chocolate: "#d2691e",
      coral: "#ff7f50",
      cornflowerblue: "#6495ed",
      cornsilk: "#fff8dc",
      crimson: "#dc143c",
      cyan: "#00ffff",
      darkblue: "#00008b",
      darkcyan: "#008b8b",
      darkgoldenrod: "#b8860b",
      darkgray: "#a9a9a9",
      darkgrey: "#a9a9a9",
      darkgreen: "#006400",
      darkkhaki: "#bdb76b",
      darkmagenta: "#8b008b",
      darkolivegreen: "#556b2f",
      darkorange: "#ff8c00",
      darkorchid: "#9932cc",
      darkred: "#8b0000",
      darksalmon: "#e9967a",
      darkseagreen: "#8fbc8f",
      darkslateblue: "#483d8b",
      darkslategray: "#2f4f4f",
      darkslategrey: "#2f4f4f",
      darkturquoise: "#00ced1",
      darkviolet: "#9400d3",
      deeppink: "#ff1493",
      deepskyblue: "#00bfff",
      dimgray: "#696969",
      dimgrey: "#696969",
      dodgerblue: "#1e90ff",
      firebrick: "#b22222",
      floralwhite: "#fffaf0",
      forestgreen: "#228b22",
      fuchsia: "#ff00ff",
      gainsboro: "#dcdcdc",
      ghostwhite: "#f8f8ff",
      gold: "#ffd700",
      goldenrod: "#daa520",
      gray: "#808080",
      grey: "#808080",
      green: "#008000",
      greenyellow: "#adff2f",
      honeydew: "#f0fff0",
      hotpink: "#ff69b4",
      indianred: "#cd5c5c",
      indigo: "#4b0082",
      ivory: "#fffff0",
      khaki: "#f0e68c",
      lavender: "#e6e6fa",
      lavenderblush: "#fff0f5",
      lawngreen: "#7cfc00",
      lemonchiffon: "#fffacd",
      lightblue: "#add8e6",
      lightcoral: "#f08080",
      lightcyan: "#e0ffff",
      lightgoldenrodyellow: "#fafad2",
      lightgray: "#d3d3d3",
      lightgrey: "#d3d3d3",
      lightgreen: "#90ee90",
      lightpink: "#ffb6c1",
      lightsalmon: "#ffa07a",
      lightseagreen: "#20b2aa",
      lightskyblue: "#87cefa",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      lightsteelblue: "#b0c4de",
      lightyellow: "#ffffe0",
      lime: "#00ff00",
      limegreen: "#32cd32",
      linen: "#faf0e6",
      magenta: "#ff00ff",
      maroon: "#800000",
      mediumaquamarine: "#66cdaa",
      mediumblue: "#0000cd",
      mediumorchid: "#ba55d3",
      mediumpurple: "#9370db",
      mediumseagreen: "#3cb371",
      mediumslateblue: "#7b68ee",
      mediumspringgreen: "#00fa9a",
      mediumturquoise: "#48d1cc",
      mediumvioletred: "#c71585",
      midnightblue: "#191970",
      mintcream: "#f5fffa",
      mistyrose: "#ffe4e1",
      moccasin: "#ffe4b5",
      navajowhite: "#ffdead",
      navy: "#000080",
      oldlace: "#fdf5e6",
      olive: "#808000",
      olivedrab: "#6b8e23",
      orange: "#ffa500",
      orangered: "#ff4500",
      orchid: "#da70d6",
      palegoldenrod: "#eee8aa",
      palegreen: "#98fb98",
      paleturquoise: "#afeeee",
      palevioletred: "#db7093",
      papayawhip: "#ffefd5",
      peachpuff: "#ffdab9",
      peru: "#cd853f",
      pink: "#ffc0cb",
      plum: "#dda0dd",
      powderblue: "#b0e0e6",
      purple: "#800080",
      rebeccapurple: "#663399",
      red: "#ff0000",
      rosybrown: "#bc8f8f",
      royalblue: "#4169e1",
      saddlebrown: "#8b4513",
      salmon: "#fa8072",
      sandybrown: "#f4a460",
      seagreen: "#2e8b57",
      seashell: "#fff5ee",
      sienna: "#a0522d",
      silver: "#c0c0c0",
      skyblue: "#87ceeb",
      slateblue: "#6a5acd",
      slategray: "#708090",
      slategrey: "#708090",
      snow: "#fffafa",
      springgreen: "#00ff7f",
      steelblue: "#4682b4",
      tan: "#d2b48c",
      teal: "#008080",
      thistle: "#d8bfd8",
      tomato: "#ff6347",
      turquoise: "#40e0d0",
      violet: "#ee82ee",
      wheat: "#f5deb3",
      white: "#ffffff",
      whitesmoke: "#f5f5f5",
      yellow: "#ffff00",
      yellowgreen: "#9acd32"
    };
    t.predefinedColor = n
  }, function(e, t, n) {
    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.onAppEnterBackground = t.onAppEnterForeground = void 0;
    var r = n(1),
      i = n(6),
      a = n(5),
      s = o(a),
      c = new s.default;
    (0, r.onMethod)("onAppEnterForeground", function() {
      var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
      c.emit("onAppEnterForeground", e)
    }), (0, r.onMethod)("onAppEnterBackground", function() {
      var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
      c.emit("onAppEnterBackground", e)
    });
    var u = function(e) {
        var t = this;
        setTimeout(e, 0), c.on("onAppEnterForeground", function(n) {
          (0, r.publish)("onAppEnterForeground", n), t.appStatus = i.AppStatus.FORE_GROUND, "function" == typeof e && e(n)
        })
      },
      l = function(e) {
        var t = this;
        c.on("onAppEnterBackground", function(n) {
          n = n || {}, (0, r.publish)("onAppEnterBackground", n), "hide" !== n.mode && (t.appStatus = i.AppStatus.BACK_GROUND), "close" === n.mode ? t.hanged = !1 : "hang" === n.mode && (t.hanged = !0), "function" == typeof e && e(n)
        })
      };
    t.onAppEnterForeground = u, t.onAppEnterBackground = l
  }]),
  __appServiceEngine__ = function(e) {
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
    }), Object.defineProperty(t, "getCurrentPages", {
      enumerable: !0,
      get: function() {
        return o.getCurrentPages
      }
    });
    var r = n(14);
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
    }), "function" == typeof logxx && logxx("app-service-engine start")
  }, function(e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.getRouteToPage = t.getWebviewIdToPage = t.setWxRouteBegin = t.setWxRoute = t.setWxConfig = t.reset = t.pageHolder = t.getCurrentPages = t.getCurrentPage = void 0;
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      i = n(2),
      a = n(5),
      s = o(a),
      c = n(2),
      u = n(12),
      l = n(13),
      f = void 0,
      d = {},
      p = {},
      h = [],
      v = 0,
      g = ("ios" === (0, c.getPlatform)(), []);
    __wxConfig.tabBar && __wxConfig.tabBar.list && "object" === r(__wxConfig.tabBar.list) && "function" == typeof __wxConfig.tabBar.list.forEach && __wxConfig.tabBar.list.forEach(function(e) {
      g.push(e.pagePath)
    });
    var y = {
        appRouteTime: 0,
        newPageTime: 0,
        pageReadyTime: 0
      },
      b = function(e, t, n) {
        Reporter.speedReport({
          key: e,
          timeMark: {
            startTime: t,
            endTime: n
          }
        })
      },
      m = (t.getCurrentPage = function() {
        return f
      }, t.getCurrentPages = function() {
        var e = [];
        return h.forEach(function(t) {
          e.push(t.page)
        }), e
      }, t.pageHolder = function(e) {
        if (!__wxRouteBegin) throw (0, c.error)("Page 注册错误", "Please do not register multiple Pages in " + __wxRoute + ".js"), new i.AppServiceEngineKnownError("Please do not register multiple Pages in " + __wxRoute + ".js");
        __wxRouteBegin = !1;
        var t = __wxConfig.pages,
          n = t[v];
        if (v++, "Object" !== (0, c.getDataType)(e)) throw (0, c.error)("Page 注册错误", "Options is not object: " + JSON.stringify(e) + " in " + __wxRoute + ".js"), new i.AppServiceEngineKnownError("Options is not object: " + JSON.stringify(e) + " in " + __wxRoute + ".js");
        (0, c.info)("Register Page: " + n), p[n] = e
      }, (0, c.surroundByTryCatch)(function(e, t) {
        if (!e.__webviewReady__) {
          (0, c.info)("Update view with init data"), (0, c.info)(e.data);
          var n = {};
          n.webviewId = t, n.enablePullUpRefresh = e.hasOwnProperty("onReachBottom");
          var o = {
            data: {
              data: e.data,
              ext: n,
              options: {
                firstRender: !0
              }
            }
          };
          (0, c.publish)("appDataChange", o, [t]), e.__webviewReady__ = !0, e.__waitingData__.forEach(function(t) {
            e.setData(t)
          }), e.__waitingData__ = [], (0, l.triggerAnalytics)("pageReady", e)
        }
      })),
      w = function(e, t, n) {
        var o = void 0;
        p.hasOwnProperty(e) ? o = p[e] : ((0, c.warn)("Page route 错误", "Page[" + e + "] not found. May be caused by: 1. Forgot to add page route in app.json. 2. Invoking Page() in async task."), o = {}), y.newPageTime = Date.now();
        var r = new s.default(o, t, e);
        m(r, t), (0, c.isDevTools)() && (__wxAppData[e] = r.data, __wxAppData[e].__webviewId__ = t, (0, c.publish)(u.UPDATE_APP_DATA)), f = {
          page: r,
          webviewId: t,
          route: e
        }, h.push(f), r.onLoad(n), r.onShow(), d[t] = {
          page: r,
          route: e
        }, (0, l.triggerAnalytics)("enterPage", r), b("appRoute2newPage", y.appRouteTime, y.newPageTime)
      },
      _ = function(e) {
        e.page.onHide(), (0, l.triggerAnalytics)("leavePage", e.page)
      },
      k = function(e) {
        e.page.onUnload(), (0, c.isDevTools)() && (delete __wxAppData[e.route], (0, c.publish)(u.UPDATE_APP_DATA)), delete d[e.webviewId], h = h.slice(0, h.length - 1), (0, l.triggerAnalytics)("leavePage", e.page)
      },
      S = function(e) {
        return g.indexOf(e.route) !== -1 || g.indexOf(e.route + ".html") !== -1
      },
      T = function(e, t, n, o) {
        if ((0, c.info)("On app route: " + e), y.appRouteTime = Date.now(), "navigateTo" === o) f && _(f), d.hasOwnProperty(t) ? (0, c.error)("Page route 错误(system error)", "navigateTo with an already exist webviewId " + t) : w(e, t, n);
        else if ("redirectTo" === o) f && k(f), d.hasOwnProperty(t) ? (0, c.error)("Page route 错误(system error)", "redirectTo with an already exist webviewId " + t) : w(e, t, n);
        else if ("navigateBack" === o) {
          for (var r = !1, i = h.length - 1; i >= 0; i--) {
            var a = h[i];
            if (a.webviewId === t) {
              r = !0, f = a, a.page.onShow(), (0, l.triggerAnalytics)("enterPage", a);
              break
            }
            k(a)
          }
          r || (0, c.error)("Page route 错误(system error)", "navigateBack with an unexist webviewId " + t)
        } else if ("switchTab" === o) {
          for (var s = !0; h.length > 1;) k(h[h.length - 1]), s = !1;
          if (h[0].webviewId === t) f = h[0];
          else {
            if (S(h[0]) ? s && _(h[0]) : k(h[0]), d.hasOwnProperty(t)) {
              var u = d[t].page;
              f = {
                webviewId: t,
                route: e,
                page: u
              }, u.onShow(), (0, l.triggerAnalytics)("enterPage", u)
            } else w(e, t, n);
            h = [f]
          }
        } else "appLaunch" === o ? d.hasOwnProperty(t) ? (0, c.error)("Page route 错误(system error)", "apppLaunch with an already exist webviewId " + t) : w(e, t, n) : (0, c.error)("Page route 错误(system error)", "Illegal open type: " + o)
      },
      A = function(e, t, n) {
        if (!d.hasOwnProperty(e)) return void(0, c.warn)("事件警告", "OnWebviewEvent: " + t + ", WebviewId: " + e + " not found");
        var o = d[e],
          r = o.page;
        return t === u.DOM_READY_EVENT ? (y.pageReadyTime = Date.now(), (0, c.info)("Invoke event onReady in page: " + o.route), r.onReady(), void b("newPage2pageReady", y.newPageTime, y.pageReadyTime)) : ((0, c.info)("Invoke event " + t + " in page: " + o.route), r.hasOwnProperty(t) ? r[t](n) : void(0, c.warn)("事件警告", "Do not have " + t + " handler in current page: " + o.route + ". Please make sure that " + t + " handler has been defined in " + o.route + ", or " + o.route + " has been added into app.json"))
      },
      P = function(e) {
        var t = d[e],
          n = t.page;
        n.hasOwnProperty("onPullDownRefresh") && ((0, c.info)("Invoke event onPullDownRefresh in page: " + t.route), n.onPullDownRefresh(), (0, l.triggerAnalytics)("pullDownRefresh", n))
      },
      M = function(e, t) {
        var n = e,
          o = d[t],
          r = o.page,
          i = "onShareAppMessage";
        if (r.hasOwnProperty(i)) {
          (0, c.info)("Invoke event onShareAppMessage in page: " + o.route);
          var a = r[i]() || {};
          n.title = a.title || e.title, n.desc = a.desc || e.desc, n.path = a.path ? (0, c.addHtmlSuffixToUrl)(a.path) : e.path, n.success = a.success, n.cancel = a.cancel, n.fail = a.fail, n.complete = a.complete
        }
        return n
      };
    wx.onAppRoute((0, c.surroundByTryCatch)(function(e) {
      var t = e.path,
        n = e.webviewId,
        o = e.query || {},
        r = e.openType;
      T(t, n, o, r)
    }), "onAppRoute"), wx.onWebviewEvent((0, c.surroundByTryCatch)(function(e) {
      var t = e.webviewId,
        n = e.eventName,
        o = e.data;
      return A(t, n, o)
    }, "onWebviewEvent")), WeixinJSBridge.on("onPullDownRefresh", (0, c.surroundByTryCatch)(function(e, t) {
      P(t)
    }, "onPullDownRefresh"));
    var x = function(e, t) {
      var n = M(e, t);
      WeixinJSBridge.invoke("shareAppMessage", n, function(e) {
        /^shareAppMessage:ok/.test(e.errMsg) && "function" == typeof n.success ? n.success(e) : /^shareAppMessage:cancel/.test(e.errMsg) && "function" == typeof n.cancel ? n.cancel(e) : /^shareAppMessage:fail/.test(e.errMsg) && "function" == typeof n.fail && n.cancel(e), "function" == typeof n.complete && n.complete(e)
      })
    };
    WeixinJSBridge.on("onShareAppMessage", (0, c.surroundByTryCatch)(x, "onShareAppMessage"));
    t.reset = function() {
      f = void 0, d = {}, p = {}, h = [], v = 0
    }, t.setWxConfig = function(e) {
      __wxConfig = e
    }, t.setWxRoute = function(e) {
      __wxRoute = e
    }, t.setWxRouteBegin = function(e) {
      __wxRouteBegin = e
    }, t.getWebviewIdToPage = function() {
      return d
    }, t.getRouteToPage = function() {
      return p
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

    function i() {
      var e = "";
      return "undefined" != typeof window && window.navigator ? window.navigator.userAgent.indexOf("appservice") > -1 ? e = "devtools" : window.navigator.userAgent.toLowerCase().indexOf("android") > -1 && (e = "android") : e = "android" === __wxConfig.platform ? "android" : "devtools" === __wxConfig.platform ? "devtools" : "ios", e
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
      return typeof e
    } : function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    t.getPlatform = i;
    var s = (t.isEmptyObject = function(e) {
        for (var t in e)
          if (e.hasOwnProperty(t)) return !1;
        return !0
      }, t.extend = function(e, t) {
        for (var n = Object.keys(t), o = n.length; o--;) e[n[o]] = t[n[o]];
        return e
      }),
      c = (t.noop = function() {}, t.getDataType = function(e) {
        return Object.prototype.toString.call(e).split(" ")[1].split("]")[0]
      }, t.isObject = function(e) {
        return null !== e && "object" === ("undefined" == typeof e ? "undefined" : a(e))
      }, Object.prototype.hasOwnProperty),
      u = (t.hasOwn = function(e, t) {
        return c.call(e, t)
      }, t.def = function(e, t, n, o) {
        Object.defineProperty(e, t, {
          value: n,
          enumerable: !!o,
          writable: !0,
          configurable: !0
        })
      }, Object.prototype.toString),
      l = "[object Object]",
      f = (t.isPlainObject = function(e) {
        return u.call(e) === l
      }, t.error = function(e, t) {
        console.group(new Date + " " + e), console.error(t), console.groupEnd()
      }, t.warn = function(e, t) {
        console.group(new Date + " " + e), console.warn(t), console.groupEnd()
      }, t.info = function(e) {
        __wxConfig && __wxConfig.debug && console.info(e)
      }, t.surroundByTryCatch = function(e, t) {
        return function() {
          try {
            return e.apply(e, arguments)
          } catch (e) {
            return f(e, t),
              function() {}
          }
        }
      }, t.errorReport = function(e, t) {
        if ("[object Error]" === Object.prototype.toString.apply(e)) {
          if ("AppServiceEngineKnownError" === e.type) throw e;
          Reporter.errorReport({
            key: "jsEnginScriptError",
            error: e,
            extend: t
          })
        }
      });
    t.AppServiceEngineKnownError = function(e) {
      function t(e) {
        n(this, t);
        var r = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "APP-SERVICE-Engine:" + e));
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
      e[1] ? e[1].options = s(e[1].options || {}, t.options) : e[1] = t, WeixinJSBridge.publish.apply(WeixinJSBridge, e)
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
      s = n(6),
      c = n(7),
      u = o(c),
      l = n(8),
      f = o(l),
      d = ["onLoad", "onReady", "onShow", "onRouteEnd", "onHide", "onUnload"],
      p = function(e) {
        for (var t = 0; t < d.length; ++t)
          if (d[t] === e) return !0;
        return "data" === e
      },
      h = ["__wxWebviewId__", "__route__", "__webviewReady__", "__waitingData__"],
      v = function(e) {
        return h.indexOf(e) !== -1
      },
      g = function() {
        function e() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            n = this,
            o = arguments[1],
            i = arguments[2];
          r(this, e), this.__wxWebviewId__ = o, this.__route__ = i, this.__waitingData__ = [], this.__webviewReady__ = !1, t.data = t.data || {}, (0, a.isPlainObject)(t.data) || (0, a.error)("Page data error", "data must be an object, your data is " + JSON.stringify(t.data)), this.data = JSON.parse(JSON.stringify(t.data)), d.forEach(function(e) {
            n[e] = function() {
              var n = (t[e] || a.noop).bind(this);
              (0, a.info)(this.__route__ + ": " + e + " have been invoked");
              try {
                n.apply(this, arguments)
              } catch (t) {
                Reporter.thirdErrorReport({
                  error: t,
                  extend: "Page " + this.__route__ + " catch error in lifeCycleMethod " + e + " function"
                })
              }
            }.bind(n)
          });
          var s = function(e) {
            v(e) ? (0, a.warn)("关键字保护", "Page's " + e + " is write-protected") : p(e) || ("Function" === (0, a.getDataType)(t[e]) ? n[e] = function() {
              var n;
              try {
                n = t[e].apply(this, arguments)
              } catch (t) {
                Reporter.thirdErrorReport({
                  error: t,
                  extend: "Page " + this.__route__ + " catch error in Page." + e + " function"
                })
              }
              return n
            }.bind(n) : n[e] = (0, f.default)(t[e]))
          };
          for (var c in t) s(c);
          "function" == typeof t.onShareAppMessage && WeixinJSBridge.invoke("showShareMenu", {}, a.info)
        }
        return i(e, [{
          key: "update",
          value: function() {
            (0, a.warn)("将被废弃", "Page.update is deprecated, setData updates the view implicitly. [It will be removed in 2016.11]")
          }
        }, {
          key: "forceUpdate",
          value: function() {
            (0, a.warn)("将被废弃", "Page.forceUpdate is deprecated, setData updates the view implicitly. [It will be removed in 2016.11]")
          }
        }, {
          key: "setData",
          value: function(e) {
            try {
              var t = (0, a.getDataType)(e);
              "Object" !== t && (0, a.error)("类型错误", "setData accepts an Object rather than some " + t);
              for (var n in e) {
                var o = (0, s.getObjectByPath)(this.data, n),
                  r = o.obj,
                  i = o.key;
                r && (r[i] = (0, f.default)(e[n]))
              }
              this.__webviewReady__ ? u.default.emit(e, this.__wxWebviewId__) : this.__waitingData__.push(e)
            } catch (e) {
              (0, a.errorReport)(e)
            }
          }
        }]), e
      }();
    t.default = g
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.getObjectByPath = t.parsePath = void 0;
    var o = n(2),
      r = t.parsePath = function(e) {
        for (var t = e.length, n = [], r = "", i = 0, a = !1, s = !1, c = 0; c < t; c++) {
          var u = e[c];
          if ("\\" === u) c + 1 < t && ("." === e[c + 1] || "[" === e[c + 1] || "]" === e[c + 1]) ? (r += e[c + 1], c++) : r += "\\";
          else if ("." === u) r && (n.push(r), r = "");
          else if ("[" === u) {
            if (r && (n.push(r), r = ""), 0 === n.length) throw (0, o.error)("数据路径错误", "Path can not start with []: " + e), new o.AppServiceEngineKnownError("Path can not start with []: " + e);
            s = !0, a = !1
          } else if ("]" === u) {
            if (!a) throw (0, o.error)("数据路径错误", "Must have number in []: " + e), new o.AppServiceEngineKnownError("Must have number in []: " + e);
            s = !1, n.push(i), i = 0
          } else if (s) {
            if (u < "0" || u > "9") throw (0, o.error)("数据路径错误", "Only number 0-9 could inside []: " + e), new o.AppServiceEngineKnownError("Only number 0-9 could inside []: " + e);
            a = !0, i = 10 * i + u.charCodeAt(0) - 48
          } else r += u
        }
        if (r && n.push(r), 0 === n.length) throw (0, o.error)("数据路径错误", "Path can not be empty"), new o.AppServiceEngineKnownError("Path can not be empty");
        return n
      };
    t.getObjectByPath = function(e, t) {
      for (var n = r(t), i = void 0, a = void 0, s = e, c = 0; c < n.length; c++) Number(n[c]) === n[c] && n[c] % 1 === 0 ? Array.isArray(s) || (i[a] = [], s = i[a]) : (0, o.isPlainObject)(s) || (i[a] = {}, s = i[a]), a = n[c], i = s, s = s[n[c]];
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
      a = 17,
      s = {},
      c = 0,
      u = null,
      l = function() {
        for (var e in s) s[e] && f.emitSync(s[e], e);
        s = {}, u = null
      },
      f = function() {
        function e() {
          o(this, e)
        }
        return r(e, null, [{
          key: "emitSync",
          value: function(e, t) {
            (0, i.publish)("appDataChange", {
              data: {
                data: e
              }
            }, [t]), c = Date.now()
          }
        }, {
          key: "emit",
          value: function(t, n) {
            if (Date.now() - c < a) {
              s[n] || (s[n] = {});
              for (var o in t) s[n][o] = t[o];
              return void(u || (u = setTimeout(l, a)))
            }
            e.emitSync(t, n)
          }
        }]), e
      }();
    t.default = f
  }, function(e, t, n) {
    "use strict";
    e.exports = n(9)
  }, function(e, t, n) {
    "use strict";

    function o(e) {}

    function r(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : o;
      if (null === e) return null;
      var n = (0, s.copyValue)(e);
      if (null !== n) return n;
      var r = (0, s.copyCollection)(e, t),
        a = null !== r ? r : e,
        c = [e],
        u = [a];
      return i(e, t, a, c, u)
    }

    function i(e, t, n, o, r) {
      if (null === e) return null;
      var u = (0, s.copyValue)(e);
      if (null !== u) return u;
      var l = (0, c.getKeys)(e).concat((0, c.getSymbols)(e)),
        f = void 0,
        d = void 0,
        p = void 0,
        h = void 0,
        v = void 0,
        g = void 0,
        y = void 0,
        b = void 0;
      for (f = 0, d = l.length; f < d; ++f) p = l[f], h = e[p], v = (0, c.indexOf)(o, h), g = void 0, y = void 0, b = void 0, v === -1 ? (g = (0, s.copy)(h, t), y = null !== g ? g : h, null !== h && /^(?:function|object)$/.test("undefined" == typeof h ? "undefined" : a(h)) && (o.push(h), r.push(y))) : b = r[v], n[p] = b || i(h, t, y, o, r);
      return n
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      s = n(10),
      c = n(11);
    t.default = r
  }, function(e, t) {
    "use strict";

    function n(e, t) {
      var n = r(e);
      return null !== n ? n : o(e, t)
    }

    function o(e, t) {
      if ("function" != typeof t) throw new TypeError("customizer is must be a Function");
      if ("function" == typeof e) return e;
      var n = a.call(e);
      if ("[object Array]" === n) return [];
      if ("[object Object]" === n && e.constructor === Object) return {};
      if ("[object Date]" === n) return new Date(e.getTime());
      if ("[object RegExp]" === n) {
        var o = String(e),
          r = o.lastIndexOf("/");
        return new RegExp(o.slice(1, r), o.slice(r + 1))
      }
      var i = t(e);
      return void 0 !== i ? i : null
    }

    function r(e) {
      var t = "undefined" == typeof e ? "undefined" : i(e);
      return null !== e && "object" !== t && "function" !== t ? e : null
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      a = Object.prototype.toString;
    t.copy = n, t.copyCollection = o, t.copyValue = r
  }, function(e, t) {
    "use strict";

    function n(e, t) {
      if ("[object Array]" !== r.call(e)) throw new TypeError("array must be an Array");
      var n = void 0,
        o = void 0,
        i = void 0;
      for (n = 0, o = e.length; n < o; ++n)
        if (i = e[n], i === t || i !== i && t !== t) return n;
      return -1
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      r = Object.prototype.toString,
      i = "function" == typeof Object.keys ? function(e) {
        return Object.keys(e)
      } : function(e) {
        var t = "undefined" == typeof e ? "undefined" : o(e);
        if (null === e || "function" !== t && "object" !== t) throw new TypeError("obj must be an Object");
        var n = [],
          r = void 0;
        for (r in e) Object.prototype.hasOwnProperty.call(e, r) && n.push(r);
        return n
      },
      a = "function" == typeof Symbol ? function(e) {
        return Object.getOwnPropertySymbols(e)
      } : function() {
        return []
      };
    t.getKeys = i, t.getSymbols = a, t.indexOf = n
  }, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    t.DOM_READY_EVENT = "__DOMReady", t.UPDATE_APP_DATA = "__updateAppData"
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.triggerAnalytics = void 0;
    var o = n(1),
      r = n(6),
      i = n(2),
      a = {},
      s = {},
      c = function(e, t) {
        if ("start" !== e.action && "start_and_report" !== e.action || (s[e.eventID] = {
            eventID: e.eventID,
            data: {}
          }), s[e.eventID]) {
          var n = e.data || {};
          if (t && e.page === t.__route__)
            for (var o in n) {
              var i = n[o];
              if (i.indexOf("[]") > -1) {
                if (!(e.index > -1)) continue;
                i = i.replace("[]", "[" + e.index + "]")
              }
              var a = (0, r.getObjectByPath)(t.data || {}, i);
              "undefined" != typeof a.obj && "undefined" != typeof a.key && a.obj[a.key] && (s[e.eventID].data[o] = a.obj[a.key])
            }
          "report" !== e.action && "start_and_report" !== e.action || ! function() {
            var t = [];
            Object.keys(s[e.eventID].data).forEach(function(n) {
              t.push({
                id: n,
                value: s[e.eventID].data[n]
              })
            }), s[e.eventID].data = t, console.log("reportRealtimeAction"), console.log(s[e.eventID]), WeixinJSBridge.invoke("reportRealtimeAction", {
              actionData: JSON.stringify(s[e.eventID])
            }), s[e.eventID] = null
          }()
        }
      },
      u = !1,
      l = (t.triggerAnalytics = function(e, t) {
        "pageReady" === e && t && l(t), "launch" !== e || u || (u = !0);
        var n = a[e];
        n && n.forEach(function(n) {
          "enterPage" === e || "leavePage" === e || "pullDownRefresh" === e ? t && n.page === t.__route__ && c(n, t) : c(n)
        })
      }, function(e) {
        if (e && e.__webviewReady__) {
          var t = e.__route__,
            n = a.click,
            o = [];
          n && (n.forEach(function(e) {
            e.page === t && e.element && o.push({
              eventID: e.eventID,
              page: t,
              element: e.element,
              action: e.action
            })
          }), 0 !== o.length && WeixinJSBridge.publish("analyticsConfig", {
            data: o
          }, [e.__wxWebviewId__]))
        }
      });
    WeixinJSBridge.subscribe("analyticsReport", function(e, t) {
      var n = e.data,
        r = a.click,
        u = void 0,
        l = void 0;
      if (r && ("start" === n.action || "start_and_report" === n.action || s[n.eventID])) {
        for (var f = (0, o.getCurrentPages)(), d = 0; d < f.length; d++) {
          var p = f[d];
          if (p.__wxWebviewId__ === t) {
            l = p;
            break
          }
        }
        if (l) {
          for (var h = 0; h < r.length; h++) {
            var v = r[h];
            if (n.eventID === v.eventID && n.page === v.page && n.element === v.element) {
              u = (0, i.extend)({}, v);
              break
            }
          }
          u && (u.index = n.index, c(u, l))
        }
      }
    })
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
      s = n(13),
      c = ["onLaunch", "onShow", "onHide", "onUnlaunch"],
      u = !0,
      l = function(e) {
        for (var t = 0; t < c.length; ++t)
          if (c[t] === e) return !0;
        return !1
      },
      f = function(e) {
        return "getCurrentPage" === e
      },
      d = function() {
        function e(t) {
          var n = this;
          o(this, e), c.forEach(function(e) {
            var o = function() {
              var n = (t[e] || i.noop).bind(this);
              (0, i.info)("App: " + e + " have been invoked");
              try {
                n.apply(this, arguments)
              } catch (t) {
                Reporter.thirdErrorReport({
                  error: t,
                  extend: "App catch error in lifeCycleMethod " + e + " function"
                })
              }
            };
            n[e] = o.bind(n)
          });
          var r = function(e) {
            f(e) ? (0, i.warn)("关键字保护", "App's " + e + " is write-protected") : l(e) || ("[object Function]" === Object.prototype.toString.call(t[e]) ? n[e] = function() {
              var n;
              try {
                n = t[e].apply(this, arguments)
              } catch (t) {
                Reporter.thirdErrorReport({
                  error: t,
                  extend: "App catch error in  " + e + " function"
                })
              }
              return n
            }.bind(n) : n[e] = t[e])
          };
          for (var d in t) r(d);
          this.onError && Reporter.registerErrorListener(this.onError), this.onLaunch(), (0, s.triggerAnalytics)("launch");
          var p = function() {
              var e = (0, a.getCurrentPages)();
              e.length && e[e.length - 1].onHide(), this.onHide(), (0, s.triggerAnalytics)("background")
            },
            h = function() {
              if (this.onShow(), u) u = !1;
              else {
                var e = (0, a.getCurrentPages)();
                e.length && (e[e.length - 1].onShow(), (0, s.triggerAnalytics)("foreground"))
              }
            };
          wx.onAppEnterBackground(p.bind(this)), wx.onAppEnterForeground(h.bind(this))
        }
        return r(e, [{
          key: "getCurrentPage",
          value: function() {
            (0, i.warn)("将被废弃", "App.getCurrentPage is deprecated, please use getCurrentPages. [It will be removed in 2016.11]");
            var e = (0, a.getCurrentPage)();
            if (e) return e.page
          }
        }]), e
      }(),
      p = void 0;
    t.appHolder = (0, i.surroundByTryCatch)(function(e) {
      p = new d(e)
    }, "create app instance"), t.getApp = function() {
      return p
    }
  }]),
  Page = __appServiceEngine__.Page,
  App = __appServiceEngine__.App,
  getApp = __appServiceEngine__.getApp,
  getCurrentPages = __appServiceEngine__.getCurrentPages;
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
          var s = n.join("/");
          return /\.js$/.test(s) || (s += ".js"), require(s)
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
        s = {
          exports: {}
        },
        c = void 0;
      a && (c = a(r(o), s, s.exports)), i.exports = s.exports || c, i.status = t
    }
    return i.exports
  }
}(), wx.version = {
  updateTime: "2016.12.22 20:03:49",
  info: "",
  version: 30
};;
var __WAServiceEndTime__ = Date.now();
