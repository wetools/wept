! function(e) {
  if (!e.WeixinJSBridge) {
    if (e.navigator && e.navigator.userAgent) {
      var t = e.navigator.userAgent;
      if (t.indexOf("appservice") > -1 || t.indexOf("wechatdevtools") > -1) return
    }
    var n = e.hasOwnProperty("document"),
      r = !1,
      o = {},
      i = 0,
      a = {},
      s = "custom_event_",
      u = {};
    if (n) {
      var t = e.navigator.userAgent,
        c = t.indexOf("Android") != -1;
      r = !c
    }
    var l = function(t, n, i) {
        if (r) e.webkit.messageHandlers.invokeHandler.postMessage({
          event: t,
          paramsString: n,
          callbackId: i
        });
        else {
          var a = WeixinJSCore.invokeHandler(t, n, i);
          if ("undefined" != typeof a && "function" == typeof o[i] && "" !== a) {
            try {
              a = JSON.parse(a)
            } catch (e) {
              a = {}
            }
            o[i](a), delete o[i]
          }
        }
      },
      f = function(t, n, o) {
        r ? e.webkit.messageHandlers.publishHandler.postMessage({
          event: t,
          paramsString: n,
          webviewIds: o
        }) : WeixinJSCore.publishHandler(t, n, o)
      },
      p = function(e, t, n) {
        var r = JSON.stringify(t || {}),
          a = ++i;
        o[a] = n, l(e, r, a)
      },
      d = function(e, t) {
        var n = o[e];
        "function" == typeof n && n(t), delete o[e]
      },
      h = function(e, t) {
        a[e] = t
      },
      v = function(e, t, n) {
        n = n || [], n = JSON.stringify(n);
        var r = s + e,
          o = JSON.stringify(t);
        f(r, o, n)
      },
      y = function(e, t) {
        u[s + e] = t
      },
      g = function(e, t, n, r) {
        var o;
        o = e.indexOf(s) != -1 ? u[e] : a[e], "function" == typeof o && o(t, n, r)
      };
    e.WeixinJSBridge = {
      invoke: p,
      invokeCallbackHandler: d,
      on: h,
      publish: v,
      subscribe: y,
      subscribeHandler: g
    }
  }
}(this);
var Reporter = function(e) {
    function t(r) {
      if (n[r]) return n[r].exports;
      var o = n[r] = {
        exports: {},
        id: r,
        loaded: !1
      };
      return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
  }([function(e, t, n) {
    function r(e) {
      "undefined" != typeof WeixinJSBridge ? e() : document.addEventListener("WeixinJSBridgeReady", e, !1)
    }

    function o() {
      var e = arguments;
      r(function() {
        WeixinJSBridge.invoke.apply(WeixinJSBridge, e)
      })
    }

    function i() {
      !h || h.length <= 0 || (o("reportKeyValue", {
        dataArray: h
      }), h = [])
    }

    function a() {
      !v || v.length <= 0 || (o("reportIDKey", {
        dataArray: v
      }), v = [])
    }

    function s() {
      !y || y.length <= 0 || (o("systemLog", {
        dataArray: y
      }), y = [])
    }

    function u(e) {
      return function() {
        try {
          return e.apply(e, arguments)
        } catch (e) {
          throw errorReport(e), e
        }
      }
    }

    function u(e) {
      return function() {
        try {
          return e.apply(e, arguments)
        } catch (e) {
          console.error("reporter error:" + e.stack)
        }
      }
    }

    function c(e) {
      M.__defineGetter__(e, function() {
        return u(A[e])
      })
    }
    var l = n(1),
      f = 1,
      p = 20,
      d = 50,
      h = [],
      v = [],
      y = [],
      g = "",
      b = 50,
      m = 50,
      w = 20,
      _ = 50,
      S = 0,
      k = 0,
      P = 0,
      T = 0;
    o("getPublicLibVersion", {}, function(e) {
      try {
        g = e.version.appVersion + " " + e.version.libVersion
      } catch (e) {}
    });
    var A = {
        reportKeyValue: function(e) {
          var t = e.key,
            n = e.value;
          l.KeyValueType[t] && (Date.now() - S < m || (S = Date.now(), h.push({
            key: l.KeyValueType[t],
            value: n
          }), h.length >= p && i()))
        },
        reportIDKey: function(e) {
          var t = e.id,
            n = e.key;
          l.IDKeyType[n] && (Date.now() - k < w || (k = Date.now(), v.push({
            id: t ? t : "356",
            key: l.IDKeyType[n],
            value: 1
          }), v.length >= f && a()))
        },
        errorReport: function(e) {
          var t = e.key,
            n = e.error,
            r = e.extend;
          if (l.ErrorType[t]) {
            A.reportIDKey({
              key: t
            });
            var o = n.message;
            o = r ? o + " " + r : o, A.reportKeyValue({
              key: "Error",
              value: l.ErrorType[t] + "," + n.name + "," + encodeURIComponent(o) + "," + encodeURIComponent(n.stack) + "," + encodeURIComponent(g)
            }), a(), i(), s()
          }
        },
        log: function(e) {
          e && "string" == typeof e && (Date.now() - P < _ || (P = Date.now(), y.push(e + ""), y.length >= d && s()))
        },
        submit: function() {
          Date.now() - T < b || (T = Date.now(), a(), i(), s())
        }
      },
      M = {};
    for (var x in A) c(x);
    "undefined" != typeof window && (window.onbeforeunload = function() {
      A.submit()
    }), e.exports = M
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
    function t(r) {
      if (n[r]) return n[r].exports;
      var o = n[r] = {
        exports: {},
        id: r,
        loaded: !1
      };
      return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
  }([function(e, t, n) {
    function r(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }

    function o(e) {
      if ("[object Error]" === Object.prototype.toString.apply(e)) {
        if ("AppServiceSdkKnownError" == e.type) throw e;
        M ? console.error(e.stack) : console.error(e.message), Reporter.errorReport({
          key: "appServiceSDKScriptError",
          error: e
        })
      }
    }

    function i(e) {
      return function() {
        try {
          return e.apply(e, arguments)
        } catch (e) {
          o(e)
        }
      }
    }

    function a(e) {
      A.__defineGetter__(e, function() {
        return i(j[e])
      })
    }

    function s(e, t, n) {
      var r = (0, f.paramCheck)(t, n);
      if (r) {
        r = e + ":fail parameter error: " + r, console.error(r);
        try {
          t && "function" == typeof t.fail && t.fail({
            errMsg: r
          })("function" == typeof t.complete) && t.complete({
            errMsg: r
          })
        } catch (e) {
          u(e)
        }
        return !1
      }
      return !0
    }

    function u(e) {
      console.error(e.stack), Reporter.errorReport({
        key: "thirdScriptError",
        error: e
      })
    }
    var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      l = n(1),
      f = n(2),
      p = n(3),
      d = r(p),
      h = n(4),
      v = r(h),
      y = n(5),
      g = r(y);
    n(7), n(8), n(9);
    var b = n(11),
      m = n(12),
      w = function() {},
      _ = {},
      S = "",
      k = [],
      P = [],
      T = void 0,
      A = {},
      M = "devtools" === (0, f.getPlatform)(),
      x = !1,
      O = !1,
      E = [],
      I = [],
      C = void 0;
    "devtools" === (0, f.getPlatform)() && (0, l.subscribe)("SPECIAL_PAGE_EVENT", function(e) {
      var t = e.data,
        n = e.eventName,
        r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      if (t && "input" == t.type && "function" == typeof T) {
        var o = T({
          data: t,
          eventName: n,
          webviewId: r
        });
        "String" === (0, f.getDataType)(o) ? o != t.detail.value && (0, l.publish)("setKeyboardValue", {
          value: o,
          cursor: -1
        }, [r]): "Object" === (0, f.getDataType)(o) && (0, l.publish)("setKeyboardValue", {
          value: o.value || "",
          cursor: "undefined" == typeof o.cursor ? -1 : o.cursor
        }, [r])
      }
    });
    var j = {
      invoke: l.invoke,
      on: l.on,
      drawCanvas: m.drawCanvas,
      createContext: m.createContext,
      canvasToTempFilePath: m.canvasToTempFilePath,
      reportIDKey: function(e, t) {},
      reportKeyValue: function(e, t) {},
      onPullDownRefresh: function(e) {
        console.log("onPullDownRefresh has been removed from api list")
      },
      setNavigationBarTitle: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        s("setNavigationBarTitle", e, {
          title: ""
        }) && (0, l.invokeMethod)("setNavigationBarTitle", e)
      },
      showNavigationBarLoading: function(e) {
        (0, l.invokeMethod)("showNavigationBarLoading", e)
      },
      hideNavigationBarLoading: function(e) {
        (0, l.invokeMethod)("hideNavigationBarLoading", e)
      },
      stopPullDownRefresh: function(e) {
        (0, l.invokeMethod)("stopPullDownRefresh", e)
      },
      redirectTo: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        s("redirectTo", e, {
          url: ""
        }) && (e.url = (0, f.getRealRoute)(S, e.url), e.url = (0, f.encodeUrlQuery)(e.url), "devtools" === (0, f.getPlatform)() && t === !1 ? setTimeout(function() {
          (0, l.invokeMethod)("redirectTo", e, {
            afterSuccess: function() {
              S = e.url
            }
          })
        }, 200) : (0, l.invokeMethod)("redirectTo", e, {
          afterSuccess: function() {
            S = e.url
          }
        }))
      },
      navigateTo: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        s("navigateTo", e, {
          url: ""
        }) && (e.url = (0, f.getRealRoute)(S, e.url), e.url = (0, f.encodeUrlQuery)(e.url), "devtools" === (0, f.getPlatform)() && t === !1 ? setTimeout(function() {
          (0, l.invokeMethod)("navigateTo", e, {
            afterSuccess: function() {
              S = e.url, (0, b.notifyCurrentRoutetoContext)(S)
            }
          })
        }, 200) : (0, l.invokeMethod)("navigateTo", e, {
          afterSuccess: function() {
            S = e.url, (0, b.notifyCurrentRoutetoContext)(S)
          }
        }))
      },
      navigateBack: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        e.delta = e.delta || 1, (0, l.invokeMethod)("navigateBack", e)
      },
      getStorage: function(e) {
        s("getStorage", e, {
          key: ""
        }) && (0, l.invokeMethod)("getStorage", e, {
          beforeSuccess: function(e) {
            e.data = (0, f.stringToAnyType)(e.data, e.dataType), delete e.dataType
          }
        })
      },
      getStorageSync: function(e) {
        var t = "ios" === (0, f.getPlatform)() ? "getStorage" : "getStorageSync",
          n = void 0;
        return (0, l.invokeMethod)(t, {
          key: e
        }, {
          beforeAll: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            n = (0, f.stringToAnyType)(e.data, e.dataType)
          }
        }), n
      },
      setStorage: function(e) {
        if (s("setStorage", e, {
            key: ""
          })) {
          var t = (0, f.anyTypeToString)(e.data),
            n = t.data,
            r = t.dataType;
          (0, l.invokeMethod)("setStorage", {
            key: e.key,
            data: n,
            dataType: r,
            success: e.success,
            fail: e.fail,
            complete: e.complete
          })
        }
      },
      setStorageSync: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
          n = "ios" === (0, f.getPlatform)() ? "setStorage" : "setStorageSync",
          r = (0, f.anyTypeToString)(t),
          o = r.data,
          i = r.dataType;
        (0, l.invokeMethod)(n, {
          key: e,
          data: o,
          dataType: i
        })
      },
      removeStorage: function(e) {
        (0, l.invokeMethod)("removeStorage", e)
      },
      removeStorageSync: function(e) {
        (0, l.invokeMethod)("removeStorageSync", {
          key: e
        })
      },
      clearStorage: function(e) {
        (0, l.invokeMethod)("clearStorage", e)
      },
      clearStorageSync: function() {
        var e = "ios" === (0, f.getPlatform)() ? "clearStorage" : "clearStorageSync";
        (0, l.invokeMethod)(e)
      },
      getStorageInfo: function(e) {
        (0, l.invokeMethod)("getStorageInfo", e)
      },
      getStorageInfoSync: function() {
        var e = void 0;
        return (0, l.invokeMethod)("getStorageInfoSync", {}, {
          beforeAll: function(t) {
            e = t, delete t.errMsg
          }
        }), e
      },
      request: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        if (s("request", e, {
            url: ""
          })) {
          if ((0, f.validateUrl)(e.url) === !1) {
            var t = {
              errMsg: 'request: fail, invalid url "' + e.url + '"'
            };
            return "function" == typeof e.fail && e.fail(t), void("function" == typeof e.complete && e.complete(t))
          }
          var n = (0, f.getDataType)(e.header);
          "Undefined" !== n && "Object" !== n && (console.warn("wx.request: header is " + n + ", expect Object."), e.header = {});
          var r = e.header || {},
            o = e.method || "GET",
            i = void 0;
          if (e.dataType = e.dataType || "json", r["content-type"] = r["content-type"] || "application/json", "function" == typeof e.data) throw new f.AppServiceSdkKnownError("request: data can not be a function.");
          i = "string" != typeof e.data ? r["content-type"].indexOf("application/x-www-form-urlencoded") > -1 ? (0, f.urlEncodeFormData)(e.data) : r["content-type"].indexOf("application/json") > -1 ? JSON.stringify(e.data) : "object" === c(e.data) ? JSON.stringify(e.data) : i.toString() : e.data, "GET" === o.toUpperCase() && (e.url = (0, f.addQueryStringToUrl)(e.url, e.data)), (0, l.invokeMethod)("request", {
            url: e.url,
            data: i,
            header: r,
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
        s("connectSocket", e, {
          url: ""
        }) && (0, l.invokeMethod)("connectSocket", e)
      },
      closeSocket: function(e) {
        (0, l.invokeMethod)("closeSocket", e)
      },
      sendSocketMessage: function(e) {
        var t = (0, f.getDataType)(e.data);
        "devtools" === (0, f.getPlatform)() ? (0, l.invokeMethod)("sendSocketMessage", e) : "String" === t ? (0, l.invokeMethod)("sendSocketMessage", e) : "ArrayBuffer" === t && (0, l.invokeMethod)("sendSocketMessage", (0, f.assign)(e, {
          data: (0, f.arrayBufferToBase64)(e.data),
          isBuffer: !0
        }))
      },
      onSocketOpen: function(e) {
        s("onSocketOpen", e, w) && (0, l.onMethod)("onSocketOpen", e)
      },
      onSocketClose: function(e) {
        s("onSocketClose", e, w) && (0, l.onMethod)("onSocketClose", e)
      },
      onSocketMessage: function(e) {
        s("onSocketMessage", e, function() {}) && (0, l.onMethod)("onSocketMessage", function(t) {
          if ("devtools" !== (0, f.getPlatform)() && t.isBuffer === !0) try {
            t.data = (0, f.base64ToArrayBuffer)(t.data)
          } catch (e) {}
          delete t.isBuffer, "devtools" === (0, f.getPlatform)() && "Blob" === (0, f.getDataType)(t.data) ? (0, f.blobToArrayBuffer)(t.data, function(n) {
            t.data = n, e(t)
          }) : e(t)
        })
      },
      onSocketError: function(e) {
        s("onSocketError", e, w) && (0, l.onMethod)("onSocketError", e)
      },
      uploadFile: function(e) {
        s("uploadFile", e, {
          url: "",
          filePath: "",
          name: ""
        }) && (0, l.invokeMethod)("uploadFile", e)
      },
      downloadFile: function(e) {
        s("downloadFile", e, {
          url: ""
        }) && (0, l.invokeMethod)("downloadFile", e)
      },
      chooseImage: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        (0, l.invokeMethod)("chooseImage", (0, f.assign)({
          count: 9,
          sizeType: ["original", "compressed"],
          sourceType: ["album", "camera"]
        }, e))
      },
      previewImage: function(e) {
        s("previewImage", e, {
          urls: [""]
        }) && (0, l.invokeMethod)("previewImage", e)
      },
      getImageInfo: function(e) {
        s("getImageInfo", e, {
          src: ""
        }) && (/^(http|https):\/\//.test(e.src) ? (0, l.invokeMethod)("downloadFile", {
          url: e.src
        }, {
          afterSuccess: function(t) {
            e.src = t.tempFilePath, (0, l.invokeMethod)("getImageInfo", e, {
              beforeSuccess: function(t) {
                t.path = e.src
              }
            })
          },
          afterFail: function() {
            var t = {
              errMsg: "getImageInfo:fail download image fail"
            };
            "function" == typeof e.fail && e.fail(t), "function" == typeof e.complete && e.complete(t)
          }
        }) : /^wxfile:\/\//.test(e.src) ? (0, l.invokeMethod)("getImageInfo", e, {
          beforeSuccess: function(t) {
            t.path = e.src
          }
        }) : (e.src = (0, f.getRealRoute)(S, e.src, !1), (0, l.invokeMethod)("getImageInfo", e, {
          beforeSuccess: function(t) {
            t.path = e.src
          }
        })))
      },
      startRecord: function(e) {
        (0, l.invokeMethod)("startRecord", e)
      },
      stopRecord: function(e) {
        (0, l.invokeMethod)("stopRecord", e)
      },
      playVoice: function(e) {
        s("playVoice", e, {
          filePath: ""
        }) && (0, l.invokeMethod)("playVoice", e)
      },
      pauseVoice: function(e) {
        (0, l.invokeMethod)("pauseVoice", e)
      },
      stopVoice: function(e) {
        (0, l.invokeMethod)("stopVoice", e)
      },
      onVoicePlayEnd: function(e) {
        (0, l.onMethod)("onVoicePlayEnd", e)
      },
      chooseVideo: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        e.sourceType = e.sourceType || ["album", "camera"], e.camera = e.camera || ["front", "back"], (0, l.invokeMethod)("chooseVideo", e)
      },
      getLocation: function(e) {
        (0, l.invokeMethod)("getLocation", e)
      },
      openLocation: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        s("openLocation", e, {}) && (0, l.invokeMethod)("openLocation", e)
      },
      chooseLocation: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        (0, l.invokeMethod)("chooseLocation", e)
      },
      getNetworkType: function(e) {
        (0, l.invokeMethod)("getNetworkType", e)
      },
      getSystemInfo: function(e) {
        var t = (0, f.getPlatform)();
        (0, l.invokeMethod)("getSystemInfo", e, {
          beforeSuccess: function(e) {
            e.platform = t
          }
        })
      },
      getSystemInfoSync: function(e) {
        var t = {},
          n = (0, f.getPlatform)();
        return (0, l.invokeMethod)("getSystemInfo", {}, {
          beforeSuccess: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            t = e, t.platform = n, delete e.errMsg
          }
        }), t
      },
      onAccelerometerChange: function(e) {
        x || ((0, l.invokeMethod)("enableAccelerometer", {
          enable: !0
        }), x = !0), E.push(e)
      },
      onCompassChange: function(e) {
        O || ((0, l.invokeMethod)("enableCompass", {
          enable: !0
        }), O = !0), I.push(e)
      },
      reportAction: function(e) {
        (0, l.invokeMethod)("reportAction", e)
      },
      getBackgroundAudioPlayerState: function(e) {
        (0, l.invokeMethod)("getMusicPlayerState", e)
      },
      playBackgroundAudio: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        (0, l.invokeMethod)("operateMusicPlayer", (0, f.assign)({
          operationType: "play"
        }, e), {
          beforeAll: function(e) {
            e.errMsg = e.errMsg.replace("operateMusicPlayer", "playBackgroundAudio")
          }
        })
      },
      pauseBackgroundAudio: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        (0, l.invokeMethod)("operateMusicPlayer", (0, f.assign)({
          operationType: "pause"
        }, e), {
          beforeAll: function(e) {
            e.errMsg = e.errMsg.replace("operateMusicPlayer", "pauseBackgroundAudio")
          }
        })
      },
      seekBackgroundAudio: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        (0, l.invokeMethod)("operateMusicPlayer", (0, f.assign)({
          operationType: "seek"
        }, e), {
          beforeAll: function(e) {
            e.errMsg = e.errMsg.replace("operateMusicPlayer", "seekBackgroundAudio")
          }
        })
      },
      stopBackgroundAudio: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        (0, l.invokeMethod)("operateMusicPlayer", (0, f.assign)({
          operationType: "stop"
        }, e), {
          beforeAll: function(e) {
            e.errMsg = e.errMsg.replace("operateMusicPlayer", "stopBackgroundAudio")
          }
        })
      },
      onBackgroundAudioPlay: function(e) {
        (0, l.onMethod)("onMusicPlay", e)
      },
      onBackgroundAudioPause: function(e) {
        (0, l.onMethod)("onMusicPause", e)
      },
      onBackgroundAudioStop: function(e) {
        (0, l.onMethod)("onMusicEnd", e)
      },
      login: function(e) {
        (0, l.invokeMethod)("login", e)
      },
      checkLogin: function(e) {
        (0, l.invokeMethod)("checkLogin", e)
      },
      checkSession: function(e) {
        C && clearTimeout(C), (0, l.invokeMethod)("refreshSession", e, {
          beforeSuccess: function(e) {
            C = setTimeout(function() {
              (0, l.invokeMethod)("refreshSession")
            }, 1e3 * e.expireIn), delete e.err_code, delete e.expireIn
          },
          beforeAll: function(e) {
            e.errMsg = e.errMsg.replace("refreshSession", "checkSession")
          }
        })
      },
      authorize: function(e) {
        (0, l.invokeMethod)("authorize", e)
      },
      getUserInfo: function(e) {
        (0, l.invokeMethod)("operateWXData", (0, f.assign)({
          data: {
            api_name: "webapi_getuserinfo",
            data: e.data || {}
          }
        }, e), {
          beforeAll: function(e) {
            e.errMsg = e.errMsg.replace("operateWXData", "getUserInfo")
          },
          beforeSuccess: function(e) {
            "android" === (0, f.getPlatform)() && (e.data = JSON.parse(e.data)), e.rawData = e.data.data;
            try {
              e.userInfo = JSON.parse(e.data.data), e.signature = e.data.signature, e.data.encryptData && (e.encryptData = e.data.encryptData), e.data.encryptedData && (e.encryptedData = e.data.encryptedData, e.iv = e.data.iv), delete e.data
            } catch (e) {}
          }
        })
      },
      getFriends: function(e) {
        (0, l.invokeMethod)("operateWXData", {
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
            "android" === (0, f.getPlatform)() && (e.data = JSON.parse(e.data)), e.rawData = e.data.data;
            try {
              e.friends = JSON.parse(e.data.data), e.signature = e.data.signature, delete e.data
            } catch (e) {}
          }
        })
      },
      requestPayment: function(e) {
        (0, l.invokeMethod)("requestPayment", e)
      },
      verifyPaymentPassword: function(e) {
        (0, l.invokeMethod)("verifyPaymentPassword", e)
      },
      bindPaymentCard: function(e) {
        (0, l.invokeMethod)("bindPaymentCard", e)
      },
      openAddress: function(e) {
        (0, l.invokeMethod)("openAddress", e)
      },
      saveFile: function(e) {
        (0, l.invokeMethod)("saveFile", e)
      },
      openDocument: function(e) {
        (0, l.invokeMethod)("openDocument", e)
      },
      chooseContact: function(e) {
        (0, l.invokeMethod)("chooseContact", e)
      },
      makePhoneCall: function(e) {
        (0, l.invokeMethod)("makePhoneCall", e)
      },
      onAppRoute: function(e, t) {
        k.push(e)
      },
      onAppRouteDone: function(e, t) {
        P.push(e)
      },
      onAppEnterBackground: function(e, t) {
        (0, l.onMethod)("onAppEnterBackground", function() {
          "function" == typeof e && e.apply(e, arguments), Reporter.submit()
        })
      },
      onAppEnterForeground: function(e, t) {
        (0, l.onMethod)("onAppEnterForeground", e)
      },
      setAppData: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = arguments[2];
        arguments[3];
        if (t.forceUpdate = "undefined" != typeof t.forceUpdate && t.forceUpdate, (0, f.isObject)(e) === !1) throw new f.AppServiceSdkKnownError("setAppData:data should be an object");
        ! function() {
          var r = !1,
            o = {},
            i = function(e, t, n) {
              r = !0, o[e] = t, "Array" === n || "Object" === n ? _[e] = JSON.parse(JSON.stringify(t)) : _[e] = t
            };
          for (var a in e) {
            var s = e[a],
              u = _[a],
              c = (0, f.getDataType)(u),
              p = (0, f.getDataType)(s);
            c !== p ? i(a, s, p) : "Array" == c || "Object" == c ? JSON.stringify(u) !== JSON.stringify(s) && i(a, s, p) : "String" == c || "Number" == c || "Boolean" == c ? u.toString() !== s.toString() && i(a, s, p) : "Date" == c ? u.getTime().toString() !== s.getTime().toString() && i(a, s, p) : u !== s && i(a, s, p)
          }
          t.forceUpdate ? (0, l.publish)("appDataChange", {
            data: e,
            option: {
              timestamp: Date.now(),
              forceUpdate: !0
            }
          }, n) : r && (0, l.publish)("appDataChange", {
            data: o
          }, n)
        }()
      },
      onPageEvent: function(e, t) {
        console.warn("'onPageEvent' is deprecated, use 'Page[eventName]'")
      },
      createAnimation: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        if (s("createAnimation", e, {})) return new d.default(e)
      },
      createAudioContext: function(e) {
        return new v.default(e)
      },
      createVideoContext: function(e) {
        return new g.default(e)
      },
      onWebviewEvent: function(e, t) {
        T = e, (0, l.subscribe)("PAGE_EVENT", function(t) {
          var n = t.data,
            r = t.eventName,
            o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
          e({
            data: n,
            eventName: r,
            webviewId: o
          })
        })
      },
      onNativeEvent: function(e) {
        ["onCanvasTouchStart", "onCanvasTouchMove", "onCanvasTouchEnd"].forEach(function(t) {
          (0, l.onMethod)(t, function(n, r) {
            e({
              data: n,
              eventName: t,
              webviewId: r
            })
          })
        })
      },
      hideKeyboard: function(e) {
        "devtools" == (0, f.getPlatform)() ? (0, l.publish)("hideKeyboard", {}) : (0, l.invokeMethod)("hideKeyboard", e)
      },
      getPublicLibVersion: function() {
        var e = void 0;
        return (0, l.invokeMethod)("getPublicLibVersion", {
          complete: function(t) {
            t.version ? e = t.version : (e = t, delete e.errMsg)
          }
        }), e
      },
      showModal: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = {
            title: "",
            content: "",
            confirmText: "确定",
            cancelText: "取消",
            showCancel: !0,
            confirmColor: "#3CC51F",
            cancelColor: "#000000"
          };
        t = (0, f.extend)(t, e), s("showModal", t, {
          title: "",
          content: "",
          confirmText: "",
          cancelText: "",
          confirmColor: "",
          cancelColor: ""
        }) && (0, l.invokeMethod)("showModal", t)
      },
      showToast: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = {
            duration: 1500,
            title: "",
            icon: "success"
          };
        t = (0, f.extend)(t, e), delete t.image, ["success", "loading"].indexOf(t.icon) < 0 && (t.icon = "success"), t.duration > 1e4 && (t.duration = 1e4), s("showToast", t, {
          duration: 1,
          title: "",
          icon: ""
        }) && (0, l.invokeMethod)("showToast", t)
      },
      hideToast: function(e) {
        (0, l.invokeMethod)("hideToast", e)
      },
      showActionSheet: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = {
            itemList: [],
            itemColor: "#000000"
          };
        if (t = (0, f.extend)(t, e), t.cancelText = "取消", t.cancelColor = "#000000", s("showActionSheet", t, {
            itemList: ["1"],
            itemColor: ""
          }))
          if (e.itemList.length > 6) {
            var n = "showActionSheet:fail parameter error: itemList should not be large than 6";
            console.error(n);
            try {
              "function" == typeof e.fail && e.fail({
                errMsg: n
              })("function" == typeof e.complete) && e.complete({
                errMsg: n
              })
            } catch (e) {
              u(e)
            }
          } else(0, l.invokeMethod)("showActionSheet", t, {
            beforeCancel: function(t) {
              try {
                "function" == typeof e.success && e.success({
                  errMsg: "showActionSheet:ok",
                  cancel: !0
                })
              } catch (e) {
                u(e)
              }
            }
          })
      },
      getSavedFileList: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        (0, l.invokeMethod)("getSavedFileList", e)
      },
      getSavedFileInfo: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        s("getSavedFileInfo", e, {
          filePath: ""
        }) && (0, l.invokeMethod)("getSavedFileInfo", e)
      },
      removeSavedFile: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        s("removeSavedFile", e, {
          filePath: ""
        }) && (0, l.invokeMethod)("removeSavedFile", e)
      }
    };
    (0, l.subscribe)("pageReady", function() {
      (0, l.publish)("pageInitData", {
        data: _
      })
    }), (0, l.subscribe)("INVOKE_METHOD", i(function(e, t) {
      var n = e.name,
        r = e.args;
      j[n](r, !0)
    })), (0, l.onMethod)("onAppRoute", i(function(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      if (e.path = e.path.substring(0, e.path.length - 5), e.webviewId = "undefined" != typeof e.webviewId ? e.webviewId : t, S = e.path, "appLaunch" !== e.openType)
        for (var n in e.query) e.query[n] = decodeURIComponent(e.query[n]);
      "navigateBack" != e.openType && "redirectTo" != e.openType || (0, m.clearOldWebviewCanvas)(), (0, m.notifyWebviewIdtoCanvas)(e.webviewId), k.forEach(function(t) {
        t(e)
      })
    })), (0, l.onMethod)("onAppRouteDone", i(function(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      e.path = e.path.substring(0, e.path.length - 5), e.webviewId = "undefined" != typeof e.webviewId ? e.webviewId : t, S = e.path, P.forEach(function(t) {
        t(e)
      }), (0, l.publish)("onAppRouteDone", {}, [t])
    })), (0, l.onMethod)("onKeyboardValueChange", i(function(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
        n = e.value,
        r = e.cursor;
      if (e.data && "function" == typeof T) {
        var o = JSON.parse(e.data);
        if (o.bindinput) {
          var i;
          try {
            i = T({
              data: {
                type: "input",
                target: o.target,
                currentTarget: o.target,
                timeStamp: Date.now(),
                touches: [],
                detail: {
                  value: e.value,
                  cursor: e.cursor
                }
              },
              eventName: o.bindinput,
              webviewId: t
            })
          } catch (e) {
            throw new f.AppServiceSdkKnownError("bind key input error")
          }
          "String" === (0, f.getDataType)(i) ? (r = -1, n = i, (0, l.invokeMethod)("setKeyboardValue", {
            value: n,
            cursor: r,
            inputId: e.inputId
          })) : "Object" === (0, f.getDataType)(i) && (n = i.value || "", r = "undefined" == typeof i.cursor ? -1 : i.cursor, (0, l.invokeMethod)("setKeyboardValue", {
            value: n,
            cursor: r,
            inputId: e.inputId
          }))
        }
      }(0, l.publish)("setKeyboardValue", {
        value: n,
        cursor: r,
        inputId: e.inputId
      }, [t])
    }));
    var D = function(e, t, n) {
        var r = [],
          o = [];
        if ("onTouchStart" === t) {
          for (var i in e) r.push(e[i]);
          var a = {
            x: n.touch.x,
            y: n.touch.y,
            identifier: n.touch.id
          };
          o.push(a), r.push(a)
        } else if ("onTouchMove" === t)
          for (var s in e) {
            var u = e[s],
              c = !1;
            for (var l in n.touches) {
              var f = {
                x: n.touches[l].x,
                y: n.touches[l].y,
                identifier: n.touches[l].id
              };
              if (f.identifier === u.identifier && (u.x !== f.x || u.y !== f.y)) {
                r.push(f), o.push(f), c = !0;
                break
              }
            }
            c || r.push(u)
          } else if ("onTouchEnd" === t) {
            console.log(n.touch);
            var p = {
              x: n.touch.x,
              y: n.touch.y,
              identifier: n.touch.id
            };
            for (var d in e) {
              var h = e[d];
              h.identifier === p.identifier ? o.push(p) : r.push(h)
            }
          } else if ("onTouchCancel" === t)
          for (var v in n.touches) {
            var y = {
              x: n.touches[v].x,
              y: n.touches[v].y,
              identifier: n.touches[v].id
            };
            o.push(y)
          }
        return {
          touches: r,
          changedTouches: o
        }
      },
      R = {
        onTouchStart: "touchstart",
        onTouchMove: "touchmove",
        onTouchEnd: "touchend",
        onTouchCancel: "touchcancel"
      };
    ["onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"].forEach(function(e) {
        (0, l.onMethod)(e, i(function(t) {
          var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
            r = JSON.parse(t.data),
            o = r.canvasNumber;
          m.canvasInfo.hasOwnProperty(o) || console.error("No such canvas " + o + " register in " + n + ", but trigger " + e + " event.");
          var i = m.canvasInfo[o].data;
          if (i[e] && "function" == typeof T) {
            var a = D(i.lastTouches, e, t),
              s = a.touches,
              u = a.changedTouches;
            i.lastTouches = s, "onTouchMove" === e && 0 === u.length || T({
              data: {
                type: R[e],
                timeStamp: new Date - i.startTime,
                target: i.target,
                touches: s,
                changedTouches: u
              },
              eventName: i[e],
              webviewId: n
            })
          }
        }))
      }), (0, l.onMethod)("onAccelerometerChange", i(function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        E.forEach(function(t) {
          "function" == typeof t && t(e)
        })
      })), (0, l.onMethod)("onCompassChange", i(function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        I.forEach(function(t) {
          "function" == typeof t && t(e)
        })
      })), (0, l.onMethod)("onError", i(function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        console.error(e.stack)
      })),
      function() {
        "android" === (0, f.getPlatform)() && (window.onerror = function(e, t, n, r, o) {
          u(o)
        })
      }();
    for (var B in j) a(B);
    e.exports = A
  }, function(e, t) {
    function n() {
      WeixinJSBridge.invoke.apply(WeixinJSBridge, arguments)
    }

    function r() {
      WeixinJSBridge.on.apply(WeixinJSBridge, arguments)
    }

    function o() {
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
        var r = e.data,
          o = e.options,
          i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          a = o && o.timestamp || 0,
          s = Date.now();
        if ("function" == typeof t && t(r, n), s - a > 20) {
          var u = JSON.stringify(r || {}).length;
          Reporter.reportKeyValue({
            key: "Speed",
            value: "1," + a + "," + i.nativeTime + "," + i.nativeTime + "," + s + "," + u
          })
        }
      }, WeixinJSBridge.subscribe.apply(WeixinJSBridge, e)
    }

    function a(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
        o = {},
        i = {},
        a = function(e) {
          "function" == typeof t[e] && (o[e] = t[e], i[e] = function() {
            try {
              o[e].apply(WeixinJSBridge, arguments)
            } catch (e) {
              console.error(e.stack), Reporter.errorReport({
                key: "thirdScriptError",
                error: e
              })
            }
          }, delete t[e])
        };
      for (var s in t) a(s);
      n(e, t, function(t) {
        t.errMsg = t.errMsg || e + ":ok";
        var n = 0 === t.errMsg.indexOf(e + ":ok"),
          o = 0 === t.errMsg.indexOf(e + ":cancel"),
          a = 0 === t.errMsg.indexOf(e + ":fail");
        "function" == typeof r.beforeAll && r.beforeAll(t), n ? ("function" == typeof r.beforeSuccess && r.beforeSuccess(t), "function" == typeof i.success && i.success(t), "function" == typeof r.afterSuccess && r.afterSuccess(t)) : o ? ("function" == typeof r.beforeCancel && r.beforeCancel(t), "function" == typeof i.cancel && i.cancel(t), "function" == typeof r.afterCancel && r.afterCancel(t), Reporter.reportIDKey({
          key: e + "_cancel"
        })) : a && ("function" == typeof r.beforeFail && r.beforeFail(t), "function" == typeof i.fail && i.fail(t), "function" == typeof r.afterFail && r.afterFail(t), Reporter.reportIDKey({
          key: e + "_fail"
        })), "function" == typeof i.complete && i.complete(t), "function" == typeof r.afterAll && r.afterAll(t)
      }), Reporter.reportIDKey({
        key: e
      })
    }

    function s(e, t) {
      r(e, t)
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.invoke = n, t.on = r, t.publish = o, t.subscribe = i, t.invokeMethod = a, t.onMethod = s
  }, function(e, t) {
    function n(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function r(e, t) {
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

    function s(e) {
      return Object.prototype.toString.call(e).split(" ")[1].split("]")[0]
    }

    function u(e) {
      return "Object" === s(e)
    }

    function c(e, t) {
      var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "data",
        r = s(t),
        o = s(e);
      if (o != r) return n + " should be " + r + " instead of " + o + ";";
      switch (result = "", r) {
        case "String":
        case "Number":
        case "RegExp":
        case "Undefined":
        case "Boolean":
        case "Null":
        case "function":
          break;
        case "Object":
          for (var i in t) result += c(e[i], t[i], n + "." + i);
          break;
        case "Array":
          if (e.length < t.length) return n + " should have at least " + t.length + " item;";
          for (var a = 0; a < t.length; ++a) result += c(e[a], t[a], n + "[" + a + "]")
      }
      return result
    }

    function l(e, t) {
      var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
      if (n && (t = g(t)), 0 === t.indexOf("/")) return t.substr(1);
      if (0 === t.indexOf("./")) return l(e, t.substr(2), !1);
      var r, o, i = t.split("/");
      for (r = 0, o = i.length; r < o && ".." === i[r]; r++);
      i.splice(0, r);
      var t = i.join("/"),
        a = e.length > 0 ? e.split("/") : [];
      a.splice(a.length - r - 1, r + 1);
      var s = a.concat(i),
        u = s.join("/");
      return u
    }

    function f() {
      return "undefined" != typeof window && window.navigator ? window.navigator.userAgent.indexOf("appservice") > -1 ? "devtools" : window.navigator.userAgent.toLowerCase().indexOf("android") > -1 ? "android" : "" : "ios"
    }

    function p(e) {
      if ("object" !== ("undefined" == typeof e ? "undefined" : S(e))) return e;
      var t = [];
      for (var n in e) e.hasOwnProperty(n) && t.push(n + "=" + e[n]);
      return t.join("&")
    }

    function d(e, t) {
      if ("string" == typeof e && "object" === ("undefined" == typeof t ? "undefined" : S(t)) && Object.keys(t).length > 0) {
        var n = e.split("?"),
          r = n[0],
          o = (n[1] || "").split("&").reduce(function(e, t) {
            if ("string" == typeof t && t.length > 0) {
              var n = t.split("="),
                r = n[0],
                o = n[1];
              e[r] = o
            }
            return e
          }, {});
        for (var i in t) t.hasOwnProperty(i) && ("object" === S(t[i]) && (t[i] = JSON.stringify(t[i])), t[i] = encodeURIComponent(t[i]));
        return r + "?" + p(v(o, t))
      }
      return e
    }

    function h(e) {
      return /^(http|https):\/\/.*/i.test(e)
    }

    function v() {
      for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
      return t.reduce(function(e, t) {
        for (var n in t) e[n] = t[n];
        return e
      }, {})
    }

    function y(e) {
      if ("string" == typeof e) {
        var t = e.split("?"),
          n = t[0],
          r = (t[1] || "").split("&").reduce(function(e, t) {
            if ("string" == typeof t && t.length > 0) {
              var n = t.split("="),
                r = n[0],
                o = n[1];
              e[r] = o
            }
            return e
          }, {}),
          o = [];
        for (var i in r) r.hasOwnProperty(i) && o.push(i + "=" + encodeURIComponent(r[i]));
        return o.length > 0 ? n + "?" + o.join("&") : e
      }
      return e
    }

    function g(e) {
      if ("string" != typeof e) throw new k("wx.redirectTo: invalid url:" + e);
      var t = e.split("?")[0],
        n = e.split("?")[1];
      return t += ".html", "undefined" != typeof n ? t + "?" + n : t
    }

    function b(e, t) {
      for (var n in t) e[n] = t[n];
      return e
    }

    function m(e) {
      for (var t = "", n = new Uint8Array(e), r = n.byteLength, o = 0; o < r; o++) t += String.fromCharCode(n[o]);
      return T(t)
    }

    function w(e) {
      for (var t = A(e), n = t.length, r = new Uint8Array(n), o = 0; o < n; o++) r[o] = t.charCodeAt(o);
      return r.buffer
    }

    function _(e, t) {
      var n = new FileReader;
      n.onload = function() {
        t(this.result)
      }, n.readAsArrayBuffer(e)
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var S = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
      return typeof e
    } : function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    t.anyTypeToString = i, t.stringToAnyType = a, t.getDataType = s, t.isObject = u, t.paramCheck = c, t.getRealRoute = l, t.getPlatform = f, t.urlEncodeFormData = p, t.addQueryStringToUrl = d, t.validateUrl = h, t.assign = v, t.encodeUrlQuery = y, t.extend = b, t.arrayBufferToBase64 = m, t.base64ToArrayBuffer = w, t.blobToArrayBuffer = _;
    var k = t.AppServiceSdkKnownError = function(e) {
        function t(e) {
          n(this, t);
          var o = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "APP-SERVICE-SDK:" + e));
          return o.type = "AppServiceSdkKnownError", o
        }
        return o(t, e), t
      }(Error),
      P = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      T = T || function(e) {
        for (var t, n, r = String(e), o = "", i = 0, a = P; r.charAt(0 | i) || (a = "=", i % 1); o += a.charAt(63 & t >> 8 - i % 1 * 8)) {
          if (n = r.charCodeAt(i += .75), n > 255) throw new Error('"btoa" failed');
          t = t << 8 | n
        }
        return o
      },
      A = A || function(e) {
        var t = String(e).replace(/=+$/, ""),
          n = "";
        if (t.length % 4 === 1) throw new Error('"atob" failed');
        for (var r, o, i = 0, a = 0; o = t.charAt(a++); ~o && (r = i % 4 ? 64 * r + o : o, i++ % 4) ? n += String.fromCharCode(255 & r >> (-2 * i & 6)) : 0) o = P.indexOf(o);
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

    function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
        }
      }(),
      i = function() {
        function e() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          r(this, e), this.actions = [], this.currentTransform = [], this.currentStepAnimates = [], this.option = {
            transition: {
              duration: "undefined" != typeof t.duration ? t.duration : 400,
              timingFunction: "undefined" != typeof t.timingFunction ? t.timingFunction : "linear",
              delay: "undefined" != typeof t.delay ? t.delay : 0
            },
            transformOrigin: t.transformOrigin || "50% 50% 0"
          }
        }
        return o(e, [{
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
              t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return this.currentStepAnimates.forEach(function(t) {
              "style" !== t.type ? e.currentTransform[t.type] = t : e.currentTransform[t.type + "." + t.args[0]] = t
            }), this.actions.push({
              animates: Object.keys(this.currentTransform).reduce(function(t, r) {
                return [].concat(n(t), [e.currentTransform[r]])
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
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
              t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
              n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
              r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1,
              o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
              i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 1;
            return this.currentStepAnimates.push({
              type: "matrix",
              args: [e, t, n, r, o, i]
            }), this
          }
        }, {
          key: "matrix3d",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
              t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
              n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
              r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
              o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
              i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 1,
              a = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
              s = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : 0,
              u = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : 0,
              c = arguments.length > 9 && void 0 !== arguments[9] ? arguments[9] : 0,
              l = arguments.length > 10 && void 0 !== arguments[10] ? arguments[10] : 1,
              f = arguments.length > 11 && void 0 !== arguments[11] ? arguments[11] : 0,
              p = arguments.length > 12 && void 0 !== arguments[12] ? arguments[12] : 0,
              d = arguments.length > 13 && void 0 !== arguments[13] ? arguments[13] : 0,
              h = arguments.length > 14 && void 0 !== arguments[14] ? arguments[14] : 0,
              v = arguments.length > 15 && void 0 !== arguments[15] ? arguments[15] : 1;
            return this.currentStepAnimates.push({
              type: "matrix3d",
              args: [e, t, n, r, o, i, a, s, u, c, l, f, p, d, h, v]
            }), this.stepping = !1, this
          }
        }, {
          key: "rotate",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
            return this.currentStepAnimates.push({
              type: "rotate",
              args: [e]
            }), this
          }
        }, {
          key: "rotate3d",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
              n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
              r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
            return this.currentStepAnimates.push({
              type: "rotate3d",
              args: [e, t, n, r]
            }), this.stepping = !1, this
          }
        }, {
          key: "rotateX",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
            return this.currentStepAnimates.push({
              type: "rotateX",
              args: [e]
            }), this.stepping = !1, this
          }
        }, {
          key: "rotateY",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
            return this.currentStepAnimates.push({
              type: "rotateY",
              args: [e]
            }), this.stepping = !1, this
          }
        }, {
          key: "rotateZ",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
            return this.currentStepAnimates.push({
              type: "rotateZ",
              args: [e]
            }), this.stepping = !1, this
          }
        }, {
          key: "scale",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
              t = arguments[1];
            return t = "undefined" != typeof t ? t : e, this.currentStepAnimates.push({
              type: "scale",
              args: [e, t]
            }), this
          }
        }, {
          key: "scale3d",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
              t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
              n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
            return this.currentStepAnimates.push({
              type: "scale3d",
              args: [e, t, n]
            }), this
          }
        }, {
          key: "scaleX",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            return this.currentStepAnimates.push({
              type: "scaleX",
              args: [e]
            }), this
          }
        }, {
          key: "scaleY",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            return this.currentStepAnimates.push({
              type: "scaleY",
              args: [e]
            }), this
          }
        }, {
          key: "scaleZ",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            return this.currentStepAnimates.push({
              type: "scaleZ",
              args: [e]
            }), this
          }
        }, {
          key: "skew",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            return this.currentStepAnimates.push({
              type: "skew",
              args: [e, t]
            }), this
          }
        }, {
          key: "skewX",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
            return this.currentStepAnimates.push({
              type: "skewX",
              args: [e]
            }), this
          }
        }, {
          key: "skewY",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
            return this.currentStepAnimates.push({
              type: "skewY",
              args: [e]
            }), this
          }
        }, {
          key: "translate",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            return this.currentStepAnimates.push({
              type: "translate",
              args: [e, t]
            }), this
          }
        }, {
          key: "translate3d",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
              n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
            return this.currentStepAnimates.push({
              type: "translate3d",
              args: [e, t, n]
            }), this
          }
        }, {
          key: "translateX",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
            return this.currentStepAnimates.push({
              type: "translateX",
              args: [e]
            }), this
          }
        }, {
          key: "translateY",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
            return this.currentStepAnimates.push({
              type: "translateY",
              args: [e]
            }), this
          }
        }, {
          key: "translateZ",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
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
    function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
        }
      }(),
      i = (n(1), n(2), function() {
        function e(t) {
          if (r(this, e), "string" != typeof t) throw new Error("audioId should be a String");
          this.audioId = t
        }
        return o(e, [{
          key: "play",
          value: function() {
            this._sendAction({
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
          key: "_sendAction",
          value: function(e) {
            WeixinJSBridge.publish("audio_" + this.audioId + "_actionChanged", e)
          }
        }]), e
      }());
    t.default = i
  }, function(e, t, n) {
    function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
        }
      }(),
      i = n(1),
      a = n(2),
      s = n(6),
      u = "ios" !== (0, a.getPlatform)(),
      c = {},
      l = new s.EventEmitter2;
    WeixinJSBridge.subscribe("videoPlayerInsert", function(e, t) {
      var n = e.domId,
        r = e.videoPlayerId;
      c[n] = c[n] || r, l.emit("videoPlayerInsert", n)
    });
    var f = function() {
      function e(t) {
        if (r(this, e), "string" != typeof t) throw new Error("video ID should be a String");
        this.domId = t
      }
      return o(e, [{
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
            u ? (this.action = {
              method: e,
              data: t
            }, this._sendAction()) : (0, i.invokeMethod)("operateVideoPlayer", {
              data: t,
              videoPlayerId: c[this.domId],
              type: e
            })
          }
          var r = this;
          "number" == typeof c[this.domId] ? n.apply(this) : l.on("videoPlayerInsert", function(e) {
            n.apply(r)
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
    var r, o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
      return typeof e
    } : function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    ! function(i) {
      function a() {
        this._events = {}, this._conf && s.call(this, this._conf)
      }

      function s(e) {
        e ? (this._conf = e, e.delimiter && (this.delimiter = e.delimiter), this._events.maxListeners = e.maxListeners !== i ? e.maxListeners : d, e.wildcard && (this.wildcard = e.wildcard), e.newListener && (this.newListener = e.newListener), this.wildcard && (this.listenerTree = {})) : this._events.maxListeners = d
      }

      function u(e) {
        console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", e), console.trace && console.trace()
      }

      function c(e) {
        this._events = {}, this.newListener = !1, s.call(this, e)
      }

      function l(e, t, n, r) {
        if (!n) return [];
        var o, i, a, s, u, c, f, p = [],
          d = t.length,
          h = t[r],
          v = t[r + 1];
        if (r === d && n._listeners) {
          if ("function" == typeof n._listeners) return e && e.push(n._listeners), [n];
          for (o = 0, i = n._listeners.length; o < i; o++) e && e.push(n._listeners[o]);
          return [n]
        }
        if ("*" === h || "**" === h || n[h]) {
          if ("*" === h) {
            for (a in n) "_listeners" !== a && n.hasOwnProperty(a) && (p = p.concat(l(e, t, n[a], r + 1)));
            return p
          }
          if ("**" === h) {
            f = r + 1 === d || r + 2 === d && "*" === v, f && n._listeners && (p = p.concat(l(e, t, n, d)));
            for (a in n) "_listeners" !== a && n.hasOwnProperty(a) && ("*" === a || "**" === a ? (n[a]._listeners && !f && (p = p.concat(l(e, t, n[a], d))), p = p.concat(l(e, t, n[a], r))) : p = a === v ? p.concat(l(e, t, n[a], r + 2)) : p.concat(l(e, t, n[a], r)));
            return p
          }
          p = p.concat(l(e, t, n[h], r + 1))
        }
        if (s = n["*"], s && l(e, t, s, r + 1), u = n["**"])
          if (r < d) {
            u._listeners && l(e, t, u, d);
            for (a in u) "_listeners" !== a && u.hasOwnProperty(a) && (a === v ? l(e, t, u[a], r + 2) : a === h ? l(e, t, u[a], r + 1) : (c = {}, c[a] = u[a], l(e, t, {
              "**": c
            }, r + 1)))
          } else u._listeners ? l(e, t, u, d) : u["*"] && u["*"]._listeners && l(e, t, u["*"], d);
        return p
      }

      function f(e, t) {
        e = "string" == typeof e ? e.split(this.delimiter) : e.slice();
        for (var n = 0, r = e.length; n + 1 < r; n++)
          if ("**" === e[n] && "**" === e[n + 1]) return;
        for (var o = this.listenerTree, a = e.shift(); a !== i;) {
          if (o[a] || (o[a] = {}), o = o[a], 0 === e.length) return o._listeners ? ("function" == typeof o._listeners && (o._listeners = [o._listeners]), o._listeners.push(t), !o._listeners.warned && this._events.maxListeners > 0 && o._listeners.length > this._events.maxListeners && (o._listeners.warned = !0, u(o._listeners.length))) : o._listeners = t, !0;
          a = e.shift()
        }
        return !0
      }
      var p = Array.isArray ? Array.isArray : function(e) {
          return "[object Array]" === Object.prototype.toString.call(e)
        },
        d = 10;
      c.EventEmitter2 = c, c.prototype.delimiter = ".", c.prototype.setMaxListeners = function(e) {
        e !== i && (this._events || a.call(this), this._events.maxListeners = e, this._conf || (this._conf = {}), this._conf.maxListeners = e)
      }, c.prototype.event = "", c.prototype.once = function(e, t) {
        return this.many(e, 1, t), this
      }, c.prototype.many = function(e, t, n) {
        function r() {
          0 === --t && o.off(e, r), n.apply(this, arguments)
        }
        var o = this;
        if ("function" != typeof n) throw new Error("many only accepts instances of Function");
        return r._origin = n, this.on(e, r), o
      }, c.prototype.emit = function() {
        this._events || a.call(this);
        var e = arguments[0];
        if ("newListener" === e && !this.newListener && !this._events.newListener) return !1;
        var t, n, r, o, i, s = arguments.length;
        if (this._all && this._all.length) {
          if (i = this._all.slice(), s > 3)
            for (t = new Array(s), o = 0; o < s; o++) t[o] = arguments[o];
          for (r = 0, n = i.length; r < n; r++) switch (this.event = e, s) {
            case 1:
              i[r].call(this, e);
              break;
            case 2:
              i[r].call(this, e, arguments[1]);
              break;
            case 3:
              i[r].call(this, e, arguments[1], arguments[2]);
              break;
            default:
              i[r].apply(this, t)
          }
        }
        if (this.wildcard) {
          i = [];
          var u = "string" == typeof e ? e.split(this.delimiter) : e.slice();
          l.call(this, i, u, this.listenerTree, 0)
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
                for (t = new Array(s - 1), o = 1; o < s; o++) t[o - 1] = arguments[o];
                i.apply(this, t)
            }
            return !0
          }
          i && (i = i.slice())
        }
        if (i && i.length) {
          if (s > 3)
            for (t = new Array(s - 1), o = 1; o < s; o++) t[o - 1] = arguments[o];
          for (r = 0, n = i.length; r < n; r++) switch (this.event = e, s) {
            case 1:
              i[r].call(this);
              break;
            case 2:
              i[r].call(this, arguments[1]);
              break;
            case 3:
              i[r].call(this, arguments[1], arguments[2]);
              break;
            default:
              i[r].apply(this, t)
          }
          return !0
        }
        if (!this._all && "error" === e) throw arguments[1] instanceof Error ? arguments[1] : new Error("Uncaught, unspecified 'error' event.");
        return !!this._all
      }, c.prototype.emitAsync = function() {
        this._events || a.call(this);
        var e = arguments[0];
        if ("newListener" === e && !this.newListener && !this._events.newListener) return Promise.resolve([!1]);
        var t, n, r, o, i, s = [],
          u = arguments.length;
        if (this._all) {
          if (u > 3)
            for (t = new Array(u), o = 1; o < u; o++) t[o] = arguments[o];
          for (r = 0, n = this._all.length; r < n; r++) switch (this.event = e, u) {
            case 1:
              s.push(this._all[r].call(this, e));
              break;
            case 2:
              s.push(this._all[r].call(this, e, arguments[1]));
              break;
            case 3:
              s.push(this._all[r].call(this, e, arguments[1], arguments[2]));
              break;
            default:
              s.push(this._all[r].apply(this, t))
          }
        }
        if (this.wildcard) {
          i = [];
          var c = "string" == typeof e ? e.split(this.delimiter) : e.slice();
          l.call(this, i, c, this.listenerTree, 0)
        } else i = this._events[e];
        if ("function" == typeof i) switch (this.event = e, u) {
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
            for (t = new Array(u - 1), o = 1; o < u; o++) t[o - 1] = arguments[o];
            s.push(i.apply(this, t))
        } else if (i && i.length) {
          if (u > 3)
            for (t = new Array(u - 1), o = 1; o < u; o++) t[o - 1] = arguments[o];
          for (r = 0, n = i.length; r < n; r++) switch (this.event = e, u) {
            case 1:
              s.push(i[r].call(this));
              break;
            case 2:
              s.push(i[r].call(this, arguments[1]));
              break;
            case 3:
              s.push(i[r].call(this, arguments[1], arguments[2]));
              break;
            default:
              s.push(i[r].apply(this, t))
          }
        } else if (!this._all && "error" === e) return arguments[1] instanceof Error ? Promise.reject(arguments[1]) : Promise.reject("Uncaught, unspecified 'error' event.");
        return Promise.all(s)
      }, c.prototype.on = function(e, t) {
        if ("function" == typeof e) return this.onAny(e), this;
        if ("function" != typeof t) throw new Error("on only accepts instances of Function");
        return this._events || a.call(this), this.emit("newListener", e, t), this.wildcard ? (f.call(this, e, t), this) : (this._events[e] ? ("function" == typeof this._events[e] && (this._events[e] = [this._events[e]]), this._events[e].push(t), !this._events[e].warned && this._events.maxListeners > 0 && this._events[e].length > this._events.maxListeners && (this._events[e].warned = !0, u(this._events[e].length))) : this._events[e] = t, this)
      }, c.prototype.onAny = function(e) {
        if ("function" != typeof e) throw new Error("onAny only accepts instances of Function");
        return this._all || (this._all = []), this._all.push(e), this
      }, c.prototype.addListener = c.prototype.on, c.prototype.off = function(e, t) {
        function n(e) {
          if (e !== i) {
            var t = Object.keys(e);
            for (var r in t) {
              var a = t[r],
                s = e[a];
              s instanceof Function || "object" !== ("undefined" == typeof s ? "undefined" : o(s)) || null === s || (Object.keys(s).length > 0 && n(e[a]), 0 === Object.keys(s).length && delete e[a])
            }
          }
        }
        if ("function" != typeof t) throw new Error("removeListener only takes instances of Function");
        var r, a = [];
        if (this.wildcard) {
          var s = "string" == typeof e ? e.split(this.delimiter) : e.slice();
          a = l.call(this, null, s, this.listenerTree, 0)
        } else {
          if (!this._events[e]) return this;
          r = this._events[e], a.push({
            _listeners: r
          })
        }
        for (var u = 0; u < a.length; u++) {
          var c = a[u];
          if (r = c._listeners, p(r)) {
            for (var f = -1, d = 0, h = r.length; d < h; d++)
              if (r[d] === t || r[d].listener && r[d].listener === t || r[d]._origin && r[d]._origin === t) {
                f = d;
                break
              }
            if (f < 0) continue;
            return this.wildcard ? c._listeners.splice(f, 1) : this._events[e].splice(f, 1), 0 === r.length && (this.wildcard ? delete c._listeners : delete this._events[e]), this.emit("removeListener", e, t), this
          }(r === t || r.listener && r.listener === t || r._origin && r._origin === t) && (this.wildcard ? delete c._listeners : delete this._events[e], this.emit("removeListener", e, t))
        }
        return n(this.listenerTree), this
      }, c.prototype.offAny = function(e) {
        var t, n = 0,
          r = 0;
        if (e && this._all && this._all.length > 0) {
          for (t = this._all, n = 0, r = t.length; n < r; n++)
            if (e === t[n]) return t.splice(n, 1), this.emit("removeListenerAny", e), this
        } else {
          for (t = this._all, n = 0, r = t.length; n < r; n++) this.emit("removeListenerAny", t[n]);
          this._all = []
        }
        return this
      }, c.prototype.removeListener = c.prototype.off, c.prototype.removeAllListeners = function(e) {
        if (0 === arguments.length) return !this._events || a.call(this), this;
        if (this.wildcard)
          for (var t = "string" == typeof e ? e.split(this.delimiter) : e.slice(), n = l.call(this, null, t, this.listenerTree, 0), r = 0; r < n.length; r++) {
            var o = n[r];
            o._listeners = null
          } else this._events && (this._events[e] = null);
        return this
      }, c.prototype.listeners = function(e) {
        if (this.wildcard) {
          var t = [],
            n = "string" == typeof e ? e.split(this.delimiter) : e.slice();
          return l.call(this, t, n, this.listenerTree, 0), t
        }
        return this._events || a.call(this), this._events[e] || (this._events[e] = []), p(this._events[e]) || (this._events[e] = [this._events[e]]), this._events[e]
      }, c.prototype.listenerCount = function(e) {
        return this.listeners(e).length
      }, c.prototype.listenersAny = function() {
        return this._all ? this._all : []
      }, r = function() {
        return c
      }.call(t, n, t, e), !(r !== i && (e.exports = r))
    }()
  }, function(module, exports) {
    if ("undefined" == typeof navigator) try {
      eval("const GeneratorFunction = Object.getPrototypeOf(function *() {}).constructor; const f = new GeneratorFunction('', 'console.log(0)'); f().__proto__.__proto__.next = () => {};")
    } catch (e) {}
  }, function(e, t, n) {
    (function(e) {
      n(1);
      if ("undefined" != typeof Function) {
        var t = Function;
        e = {}, Function.constructor = function() {
          return arguments[arguments.length - 1] = "console.warn('can not create Function')", t.apply(this, arguments)
        }, Function.prototype.constructor = function() {
          return arguments[arguments.length - 1] = "console.warn('can not create Function')", t.apply(this, arguments)
        }, Function = function() {
          return "return this" === arguments[arguments.length - 1] ? arguments[arguments.length - 1] = "return global" : arguments[arguments.length - 1] = "console.warn('can not create Function')", t.apply(this, arguments)
        }
      }
      "undefined" != typeof eval && (eval = void 0), "undefined" != typeof navigator && ! function() {
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
    var r = n(1),
      o = n(2),
      i = n(10);
    "undefined" != typeof __wxConfig && __wxConfig.debug && "devtools" !== (0, o.getPlatform)() && ! function() {
      var e = [],
        t = ["log", "warn", "error", "info", "debug"];
      t.forEach(function(t) {
        var n = console[t];
        console[t] = function() {
          e.length > i.LOG_LIMIT && e.shift();
          var o = Array.prototype.slice.call(arguments);
          e.push({
            method: t,
            log: o
          }), n.apply(console, arguments), (0, r.publish)(t, {
            log: o
          })
        }
      }), (0, r.subscribe)("DOMContentLoaded", function() {
        (0, r.publish)("initLogs", {
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
    function r(e) {
      v = e
    }

    function o(e) {
      return "number" == typeof e
    }

    function i(e) {
      var t = null;
      if (null != (t = /^#([0-9|A-F|a-f]{6})$/.exec(e))) {
        var n = parseInt(t[1].slice(0, 2), 16),
          r = parseInt(t[1].slice(2, 4), 16),
          o = parseInt(t[1].slice(4), 16);
        return [n, r, o, 255]
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

    function s() {
      this.actions = [], this.path = []
    }

    function u(e) {
      if (Array.isArray(e)) {
        var t = [];
        return e.forEach(function(e) {
          t.push(u(e))
        }), t
      }
      if ("object" == ("undefined" == typeof e ? "undefined" : c(e))) {
        var t = {};
        for (var n in e) t[n] = u(e[n]);
        return t
      }
      return e
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.Context = t.notifyCurrentRoutetoContext = void 0;
    var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      l = n(2),
      f = ["scale", "rotate", "translate", "save", "restore"],
      p = ["drawImage", "fillText", "fill", "stroke", "clearRect"],
      d = ["beginPath", "moveTo", "lineTo", "rect", "arc", "quadraticCurveTo", "bezierCurveTo", "closePath"],
      h = ["setFillStyle", "setStrokeStyle", "setGlobalAlpha", "createLinearGradient", "createRadialGradient", "setShadow", "setFontSize", "setLineCap", "setLineJoin", "setLineWidth", "setMiterLimit"],
      v = "";
    a.prototype.addColorStop = function(e, t) {
      this.colorStop.push([e, i(t)])
    }, s.prototype.getActions = function() {
      var e = u(this.actions);
      return this.actions = [], this.path = [], e
    }, s.prototype.clearActions = function() {
      this.actions = [], this.path = []
    }, [].concat(f, p).forEach(function(e) {
      "fill" == e || "stroke" == e ? s.prototype[e] = function() {
        this.actions.push({
          method: e + "Path",
          data: u(this.path)
        })
      } : "fillText" == e ? s.prototype[e] = function(t, n, r) {
        this.actions.push({
          method: e,
          data: [t.toString(), n, r]
        })
      } : "drawImage" == e ? s.prototype[e] = function(t, n, r, i, a) {
        "devtools" == (0, l.getPlatform)() || /wxfile:\/\//.test(t) || (t = (0, l.getRealRoute)(v, t).replace(/.html$/, "")), o(i) && o(a) ? data = [t, n, r, i, a] : data = [t, n, r], this.actions.push({
          method: e,
          data: data
        })
      } : s.prototype[e] = function() {
        this.actions.push({
          method: e,
          data: [].slice.apply(arguments)
        })
      }
    }), d.forEach(function(e) {
      "beginPath" == e ? s.prototype[e] = function() {
        this.path = []
      } : "lineTo" == e ? s.prototype.lineTo = function() {
        0 == this.path.length ? this.path.push({
          method: "moveTo",
          data: [].slice.apply(arguments)
        }) : this.path.push({
          method: "lineTo",
          data: [].slice.apply(arguments)
        })
      } : s.prototype[e] = function() {
        this.path.push({
          method: e,
          data: [].slice.apply(arguments)
        })
      }
    }), h.forEach(function(e) {
      "createLinearGradient" == e ? s.prototype[e] = function() {
        return new a("linear", [].slice.apply(arguments, [0, 4]))
      } : "createRadialGradient" == e ? s.prototype[e] = function() {
        return new a("radial", [].slice.apply(arguments, [0, 3]))
      } : "setFillStyle" == e || "setStrokeStyle" == e ? s.prototype[e] = function() {
        var t = arguments[0];
        "string" == typeof t ? this.actions.push({
          method: e,
          data: ["normal", i(t)]
        }) : "object" == ("undefined" == typeof t ? "undefined" : c(t)) && t instanceof a && this.actions.push({
          method: e,
          data: [t.type, t.data, t.colorStop]
        })
      } : "setGlobalAlpha" === e ? s.prototype[e] = function() {
        var t = [].slice.apply(arguments, [0, 1]);
        t[0] = Math.floor(255 * parseFloat(t[0])), this.actions.push({
          method: e,
          data: t
        })
      } : "setShadow" == e ? s.prototype[e] = function() {
        var t = [].slice.apply(arguments, [0, 4]);
        t[3] = i(t[3]), this.actions.push({
          method: e,
          data: t
        })
      } : s.prototype[e] = function() {
        this.actions.push({
          method: e,
          data: [].slice.apply(arguments, [0, 1])
        })
      }
    }), t.notifyCurrentRoutetoContext = r, t.Context = s
  }, function(e, t, n) {
    function r(e, t) {
      return e + "canvas" + t
    }

    function o() {
      for (var e in g)
        if (0 == e.indexOf(v + "canvas")) {
          g[e];
          delete g[e]
        }
    }

    function i(e) {
      v = e
    }

    function a(e, t) {
      var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
        r = arguments[3],
        o = arguments[4],
        i = arguments[5],
        a = (0, d.getPlatform)();
      "ios" == a || "android" == a ? WeixinJSBridge.invoke("drawCanvas", {
        canvasId: e,
        reserve: n,
        actions: t
      }, function(e) {
        e.errMsg && /ok/.test(e.errMsg) ? "function" == typeof r && r(e) : "function" == typeof o && o(e), "function" == typeof i && i(e)
      }) : WeixinJSBridge.publish("canvas" + e + "actionsChanged", {
        actions: t,
        reserve: n
      })
    }

    function s(e) {
      var t = e.canvasId,
        n = e.actions,
        o = e.reserve,
        i = e.success,
        s = e.fail,
        u = e.complete;
      if (t && Array.isArray(n)) {
        var c = r(v, t);
        if ("number" == typeof g[c]) {
          var l = g[c];
          a(l, n, o, i, s, u)
        } else b[c] = b[c] || [], b[c] = b[c].concat({
          actions: n,
          reserve: o,
          success: i,
          fail: s,
          complete: u
        })
      }
    }

    function u(e) {
      var t = (0, d.getPlatform)();
      "ios" === t || "android" === t ? (0, f.invokeMethod)("canvasToTempFilePath", e) : (WeixinJSBridge.subscribe("onCanvasToDataUrl_" + e.canvasId, function(t) {
        var n = t.dataUrl;
        (0, f.invokeMethod)("base64ToTempFilePath", (0, d.assign)({
          base64Data: n
        }, e), {
          beforeAll: function(e) {
            e.errMsg = e.errMsg.replace("base64ToTempFilePath", "canvasToTempFilePath")
          }
        })
      }), (0, f.publish)("invokeCanvasToDataUrl_" + e.canvasId, {
        canvasId: e.canvasId
      }))
    }

    function c(e) {
      if (e.canvasId) {
        var t = r(v, e.canvasId);
        if ("number" == typeof g[t]) e.canvasId = g[t], u(e);
        else {
          var n = {
            errMsg: "canvasToTempFilePath: fail canvas is empty"
          };
          "function" == typeof e.fail && e.fail(n), "function" == typeof e.complete && e.complete(n)
        }
      }
    }

    function l() {
      return new p.Context
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.createContext = t.canvasToTempFilePath = t.drawCanvas = t.notifyWebviewIdtoCanvas = t.clearOldWebviewCanvas = t.canvasInfo = void 0;
    var f = n(1),
      p = n(11),
      d = n(2),
      h = n(6),
      v = (new h.EventEmitter2, 0),
      y = {},
      g = {},
      b = {};
    WeixinJSBridge.subscribe("canvasInsert", function(e, t) {
      var n = e.canvasId,
        o = e.canvasNumber,
        i = e.data,
        s = r(v, n);
      y[o] = {
        lastTouches: [],
        data: i
      }, g[s] = g[s] || o, Array.isArray(b[s]) && (b[s].forEach(function(e) {
        a(o, e.actions, e.success, e.fail, e.complete)
      }), delete b[s])
    }), WeixinJSBridge.subscribe("canvasRemove", function(e, t) {
      var n = e.canvasId,
        o = r(v, n);
      g[o] && delete g[o]
    }), t.canvasInfo = y, t.clearOldWebviewCanvas = o, t.notifyWebviewIdtoCanvas = i, t.drawCanvas = s, t.canvasToTempFilePath = c, t.createContext = l
  }]),
  __appServiceEngine__ = function(e) {
    function t(r) {
      if (n[r]) return n[r].exports;
      var o = n[r] = {
        exports: {},
        id: r,
        loaded: !1
      };
      return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
  }([function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = n(1);
    Object.defineProperty(t, "Page", {
      enumerable: !0,
      get: function() {
        return r.pageHolder
      }
    }), Object.defineProperty(t, "getCurrentPages", {
      enumerable: !0,
      get: function() {
        return r.getCurrentPages
      }
    });
    var o = n(14);
    Object.defineProperty(t, "App", {
      enumerable: !0,
      get: function() {
        return o.appHolder
      }
    }), Object.defineProperty(t, "getApp", {
      enumerable: !0,
      get: function() {
        return o.getApp
      }
    })
  }, function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.getRouteToPage = t.getWebviewIdToPage = t.setWxRouteBegin = t.setWxRoute = t.setWxConfig = t.reset = t.pageHolder = t.getCurrentPages = t.getCurrentPage = void 0;
    var o = n(2),
      i = n(5),
      a = r(i),
      s = n(2),
      u = n(12),
      c = n(13),
      l = void 0,
      f = {},
      p = {},
      d = [],
      h = 0,
      v = {
        appRouteTime: 0,
        newPageTime: 0,
        pageReadyTime: 0
      },
      y = function(e, t, n) {
        var r = u.SPEED_REPORT_TYPE[e];
        r && (Reporter.reportKeyValue({
          key: "Speed",
          value: r + "," + t + ",0,0," + n
        }), Reporter.log("JSEngine SpeedReport:" + e + ",startTime:" + t + ",endTime:" + n + ",cost:" + (n - t)))
      },
      g = (t.getCurrentPage = function() {
        return l
      }, t.getCurrentPages = function() {
        var e = [];
        return d.forEach(function(t) {
          e.push(t.page)
        }), e
      }, t.pageHolder = function(e) {
        if (!__wxRouteBegin) throw (0, s.error)("Page 注册错误", "Please do not register multiple Pages in " + __wxRoute + ".js"), new o.AppServiceEngineKnownError("Please do not register multiple Pages in " + __wxRoute + ".js");
        __wxRouteBegin = !1;
        var t = __wxConfig.pages,
          n = t[h];
        if (h++, "Object" !== (0, s.getDataType)(e)) throw (0, s.error)("Page 注册错误", "Options is not object: " + JSON.stringify(e) + " in " + __wxRoute + ".js"), new o.AppServiceEngineKnownError("Options is not object: " + JSON.stringify(e) + " in " + __wxRoute + ".js");
        (0, s.info)("Register Page: " + n), p[n] = e
      },
      window.Reload = function (obj) {
        var pages = __wxConfig.pages;
        if (pages.indexOf(window.__wxRoute) == -1) return
        f[window.__wxRoute] = obj
        var keys = Object.keys(f)
        var isCurr = l.route == window.__wxRoute
        keys.forEach(function (key) {
          var option = f[key];
          key = Number(key)
          var query = option.__query__
          // current instance
          var page = option.page
          var route = option.route
          // page created
          if (route == window.__wxRoute) {
            isCurr && page.onHide()
            page.onUnload()
            // create new page instance
            var newPage = new a.default(obj, key, route)
            newPage.__query__ = query
            if (isCurr) l.page = newPage
            option.page = newPage
            newPage.onLoad(query)
            if (isCurr) newPage.onShow()
            window.__wxAppData[route] = newPage.data
            window.__wxAppData[route].__webviewId__ = key
            s.publish(u.UPDATE_APP_DATA)
            s.info("Update view with init data")
            s.info(newPage.data)
            s.publish("appDataChange", {
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

        console.info("Reload page: " + window.__wxRoute)
      } ,function(e, t, n) {
        var r = void 0;
        p.hasOwnProperty(e) ? r = p[e] : ((0, s.warn)("Page route 错误", "Page[" + e + "] not found. May be caused by: 1. Forgot to add page route in app.json. 2. Invoking Page() in async task."), r = {}), v.newPageTime = Date.now();
        var o = new a.default(r, t, e);
        var query = Object.assign({}, n);
        (0, s.isDevTools)() && (__wxAppData[e] = o.data, __wxAppData[e].__webviewId__ = t, (0, s.publish)(u.UPDATE_APP_DATA)), l = {
          page: o,
          webviewId: t,
          route: e
        }, d.push(l), o.onLoad(n), o.onShow(), f[t] = {
          __query__: query,
          page: o,
          route: e
        }, (0, c.triggerAnalytics)("enterPage", o), y("appRoute2newPage", v.appRouteTime, v.newPageTime)
      }),
      b = function(e) {
        e.page.onHide(), (0, c.triggerAnalytics)("leavePage", e.page)
      },
      m = function(e) {
        e.page.onUnload(), (0, s.isDevTools)() && (delete __wxAppData[e.route], (0, s.publish)(u.UPDATE_APP_DATA)), delete f[e.webviewId], d = d.slice(0, d.length - 1), (0, c.triggerAnalytics)("leavePage", e.page)
      },
      w = function(e, t, n, r) {
        if ((0, s.info)("On app route: " + e), v.appRouteTime = Date.now(), "navigateTo" === r) l && b(l), f.hasOwnProperty(t) ? (0, s.error)("Page route 错误(system error)", "navigateTo with an already exist webviewId " + t) : g(e, t, n);
        else if ("redirectTo" === r) l && m(l), f.hasOwnProperty(t) ? (0, s.error)("Page route 错误(system error)", "redirectTo with an already exist webviewId " + t) : g(e, t, n);
        else if ("navigateBack" === r) {
          for (var o = !1, i = d.length - 1; i >= 0; i--) {
            var a = d[i];
            if (a.webviewId === t) {
              o = !0, l = a, a.page.onShow(), (0, c.triggerAnalytics)("enterPage", a);
              break
            }
            m(a)
          }
          o || (0, s.error)("Page route 错误(system error)", "navigateBack with an unexist webviewId " + t)
        } else if ("switchTab" === r) {
          if (l && b(l), f.hasOwnProperty(t)) {
            var u = f[t].page;
            l = {
              webviewId: t,
              route: e,
              page: u
            }, u.onShow(), (0, c.triggerAnalytics)("enterPage", u)
          } else g(e, t, n);
          d = [l]
        } else "appLaunch" === r ? f.hasOwnProperty(t) ? (0, s.error)("Page route 错误(system error)", "apppLaunch with an already exist webviewId " + t) : g(e, t, n) : (0, s.error)("Page route 错误(system error)", "Illegal open type: " + r)
      },
      _ = function(e, t, n) {
        if (!f.hasOwnProperty(e)) return void(0, s.warn)("事件警告", "OnWebviewEvent: " + t + ", WebviewId: " + e + " not found");
        var r = f[e],
          o = r.page;
        if (t === u.DOM_READY_EVENT) return v.pageReadyTime = Date.now(), o.onReady(), void y("newPage2pageReady", v.newPageTime, v.pageReadyTime);
        if ((0, s.info)("Invoke event " + t + " in page: " + r.route), !o.hasOwnProperty(t)) return void(0, s.warn)("事件警告", "Do not have " + t + " handler in current page: " + r.route + ". Please make sure that " + t + " handler has been defined in " + r.route + ", or " + r.route + " has been added into app.json");
        var i = void 0;
        try {
          i = o[t](n)
        } catch (e) {
          console.error(e.stack), Reporter.errorReport({
            key: "thirdScriptError",
            error: e
          })
        }
        return i
      },
      S = function(e) {
        var t = f[e],
          n = t.page;
        n.hasOwnProperty("onPullDownRefresh") && ((0, s.info)("Invoke event onPullDownRefresh in page: " + t.route), n.onPullDownRefresh())
      },
      k = function(e, t) {
        var n = e,
          r = f[t],
          o = r.page;
        if (o.hasOwnProperty("onMenuShareAppMessage")) {
          (0, s.info)("Invoke event onMenuShareAppMessage in page: " + r.route);
          var i = o.onMenuShareAppMessage() || {};
          n.title = i.title || e.title, n.desc = i.desc || e.desc, n.imgUrl = i.imgUrl || e.imgUrl, n.path = i.path ? (0, s.addHtmlSuffixToUrl)(i.path) : e.path, n.shareAppCard = "undefined" != typeof i.shareAppCard && i.shareAppCard
        }
        return n
      },
      P = function(e, t) {
        var n = e,
          r = f[t],
          o = r.page;
        if (o.hasOwnProperty("onMenuShareTimeline")) {
          (0, s.info)("Invoke event onMenuShareTimeline in page: " + r.route);
          var i = o.onMenuShareTimeline() || {};
          n.title = i.title || e.title, n.imgUrl = i.imgUrl || e.imgUrl, n.path = i.path ? (0, s.addHtmlSuffixToUrl)(i.path) : e.path
        }
        return n
      };
    wx.onAppRoute((0, s.surroundByTryCatch)(function(e) {
      var t = e.path,
        n = e.webviewId,
        r = e.query || {},
        o = e.openType;
      w(t, n, r, o)
    })), wx.onWebviewEvent((0, s.surroundByTryCatch)(function(e) {
      var t = e.webviewId,
        n = e.eventName,
        r = e.data;
      return _(t, n, r)
    })), WeixinJSBridge.on("onPullDownRefresh", (0, s.surroundByTryCatch)(function(e, t) {
      S(t)
    })), WeixinJSBridge.on("onMenuShareAppMessage", (0, s.surroundByTryCatch)(function(e, t) {
      var n = k(e, t);
      WeixinJSBridge.invoke("shareAppMessage", n, function() {})
    })), WeixinJSBridge.on("onMenuShareTimeline", (0, s.surroundByTryCatch)(function(e, t) {
      var n = P(e, t);
      WeixinJSBridge.invoke("shareTimeline", n, function() {})
    })), WeixinJSBridge.subscribe("pageReady", (0, s.surroundByTryCatch)(function(e, t) {
      if (!f.hasOwnProperty(t)) throw (0, s.error)("系统错误", "On pageReady can not find " + t + ", App service not ready"), new o.AppServiceEngineKnownError("On pageReady can not find " + t + ", App service not ready");
      var n = f[t].page,
        r = {};
      (0, s.info)("Update view with init data"), (0, s.info)(n.data), r.webviewId = t, r.enablePullUpRefresh = n.hasOwnProperty("onReachBottom"), (0, s.publish)("pageInitData", {
        data: {
          data: n.data,
          ext: r,
          options: {
            firstRender: !0
          }
        }
      }, [t]), n.__webviewReady__ = !0, n.__waitingData__.forEach(function(e) {
        n.setData(e)
      }), n.__waitingData__ = [], (0, c.triggerAnalytics)("pageReady", n)
    }));
    t.reset = function() {
      l = void 0, f = {}, p = {}, d = [], h = 0
    }, t.setWxConfig = function(e) {
      __wxConfig = e
    }, t.setWxRoute = function(e) {
      __wxRoute = e
    }, t.setWxRouteBegin = function(e) {
      __wxRouteBegin = e
    }, t.getWebviewIdToPage = function() {
      return f
    }, t.getRouteToPage = function() {
      return p
    }
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = n(3);
    Object.keys(r).forEach(function(e) {
      "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
        enumerable: !0,
        get: function() {
          return r[e]
        }
      })
    });
    var o = n(4);
    Object.keys(o).forEach(function(e) {
      "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
        enumerable: !0,
        get: function() {
          return o[e]
        }
      })
    })
  }, function(e, t) {
    "use strict";

    function n(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function r(e, t) {
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
        for (var n = Object.keys(t), r = n.length; r--;) e[n[r]] = t[n[r]];
        return e
      }),
      s = (t.noop = function() {}, t.getDataType = function(e) {
        return Object.prototype.toString.call(e).split(" ")[1].split("]")[0]
      }, t.isObject = function(e) {
        return null !== e && "object" === ("undefined" == typeof e ? "undefined" : i(e))
      }, Object.prototype.hasOwnProperty),
      u = (t.hasOwn = function(e, t) {
        return s.call(e, t)
      }, t.def = function(e, t, n, r) {
        Object.defineProperty(e, t, {
          value: n,
          enumerable: !!r,
          writable: !0,
          configurable: !0
        })
      }, Object.prototype.toString),
      c = "[object Object]",
      l = (t.isPlainObject = function(e) {
        return u.call(e) === c
      }, t.error = function(e, t) {
        console.group(new Date + " " + e), console.error(t), console.groupEnd()
      }, t.warn = function(e, t) {
        console.group(new Date + " " + e), console.warn(t), console.groupEnd()
      }, t.info = function(e) {
        __wxConfig && __wxConfig.debug && console.info(e)
      }, t.surroundByTryCatch = function(e) {
        return function() {
          try {
            return e.apply(e, arguments)
          } catch (e) {
            return l(e),
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
    t.AppServiceEngineKnownError = function(e) {
      function t(e) {
        n(this, t);
        var o = r(this, Object.getPrototypeOf(t).call(this, "APP-SERVICE-Engine:" + e));
        return o.type = "AppServiceEngineKnownError", o
      }
      return o(t, e), t
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

    function r(e) {
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
    var i = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
        }
      }(),
      a = n(2),
      s = n(6),
      u = n(7),
      c = r(u),
      l = n(8),
      f = r(l),
      p = ["onLoad", "onReady", "onShow", "onRouteEnd", "onHide", "onUnload"],
      d = function(e) {
        for (var t = 0; t < p.length; ++t)
          if (p[t] === e) return !0;
        return "data" === e
      },
      h = ["__wxWebviewId__", "__route__", "__webviewReady__", "__waitingData__"],
      v = function(e) {
        return h.indexOf(e) !== -1
      },
      y = function() {
        function e() {
          var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
            n = this,
            r = arguments[1],
            i = arguments[2];
          o(this, e), this.__wxWebviewId__ = r, this.__route__ = i, this.__webviewReady__ = !1, this.__waitingData__ = [], this.data = JSON.parse(JSON.stringify(t.data || {})), p.forEach(function(e) {
            var r = function() {
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
            };
            n[e] = r.bind(n)
          });
          for (var s in t) v(s) ? (0, a.warn)("关键字保护", "Page's " + s + " is write-protected") : d(s) || ("Function" === (0, a.getDataType)(t[s]) ? this[s] = t[s].bind(this) : this[s] = (0, f.default)(t[s]))
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
                var r = (0, s.getObjectByPath)(this.data, n),
                  o = r.obj,
                  i = r.key;
                o && (o[i] = (0, f.default)(e[n]))
              }
              this.__webviewReady__ ? c.default.emit(e, this.__wxWebviewId__) : this.__waitingData__.push(e)
            } catch (e) {
              (0, a.errorReport)(e)
            }
          }
        }]), e
      }();
    t.default = y
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.getObjectByPath = t.parsePath = void 0;
    var r = n(2),
      o = t.parsePath = function(e) {
        for (var t = e.length, n = [], o = "", i = 0, a = !1, s = !1, u = 0; u < t; u++) {
          var c = e[u];
          if ("\\" === c) u + 1 < t && ("." === e[u + 1] || "[" === e[u + 1] || "]" === e[u + 1]) ? (o += e[u + 1], u++) : o += "\\";
          else if ("." === c) o && (n.push(o), o = "");
          else if ("[" === c) {
            if (o && (n.push(o), o = ""), 0 === n.length) throw (0, r.error)("数据路径错误", "Path can not start with []: " + e), new r.AppServiceEngineKnownError("Path can not start with []: " + e);
            s = !0, a = !1
          } else if ("]" === c) {
            if (!a) throw (0, r.error)("数据路径错误", "Must have number in []: " + e), new r.AppServiceEngineKnownError("Must have number in []: " + e);
            s = !1, n.push(i), i = 0
          } else if (s) {
            if (c < "0" || c > "9") throw (0, r.error)("数据路径错误", "Only number 0-9 could inside []: " + e), new r.AppServiceEngineKnownError("Only number 0-9 could inside []: " + e);
            a = !0, i = 10 * i + c.charCodeAt(0) - 48
          } else o += c
        }
        if (o && n.push(o), 0 === n.length) throw (0, r.error)("数据路径错误", "Path can not be empty"), new r.AppServiceEngineKnownError("Path can not be empty");
        return n
      };
    t.getObjectByPath = function(e, t) {
      for (var n = o(t), i = void 0, a = void 0, s = e, u = 0; u < n.length; u++) Number(n[u]) === n[u] && n[u] % 1 === 0 ? Array.isArray(s) || (i[a] = [], s = i[a]) : (0, r.isPlainObject)(s) || (i[a] = {}, s = i[a]), a = n[u], i = s, s = s[n[u]];
      return {
        obj: i,
        key: a
      }
    }
  }, function(e, t, n) {
    "use strict";

    function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
        }
      }(),
      i = n(2),
      a = function() {
        function e() {
          r(this, e)
        }
        return o(e, null, [{
          key: "emit",
          value: function(e, t) {
            (0, i.publish)("appDataChange", {
              data: {
                data: e
              }
            }, [t])
          }
        }]), e
      }();
    t.default = a
  }, function(e, t, n) {
    "use strict";
    e.exports = n(9)
  }, function(e, t, n) {
    "use strict";

    function r(e) {}

    function o(e) {
      var t = arguments.length <= 1 || void 0 === arguments[1] ? r : arguments[1];
      if (null === e) return null;
      var n = (0, s.copyValue)(e);
      if (null !== n) return n;
      var o = (0, s.copyCollection)(e, t),
        a = null !== o ? o : e,
        u = [e],
        c = [a];
      return i(e, t, a, u, c)
    }

    function i(e, t, n, r, o) {
      if (null === e) return null;
      var c = (0, s.copyValue)(e);
      if (null !== c) return c;
      var l = (0, u.getKeys)(e).concat((0, u.getSymbols)(e)),
        f = void 0,
        p = void 0,
        d = void 0,
        h = void 0,
        v = void 0,
        y = void 0,
        g = void 0,
        b = void 0;
      for (f = 0, p = l.length; f < p; ++f) d = l[f], h = e[d], v = (0, u.indexOf)(r, h), y = void 0, g = void 0, b = void 0, v === -1 ? (y = (0, s.copy)(h, t), g = null !== y ? y : h, null !== h && /^(?:function|object)$/.test("undefined" == typeof h ? "undefined" : a(h)) && (r.push(h), o.push(g))) : b = o[v], n[d] = b || i(h, t, g, r, o);
      return n
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
      },
      s = n(10),
      u = n(11);
    t.default = o
  }, function(e, t) {
    "use strict";

    function n(e, t) {
      var n = o(e);
      return null !== n ? n : r(e, t)
    }

    function r(e, t) {
      if ("function" != typeof t) throw new TypeError("customizer is must be a Function");
      if ("function" == typeof e) return e;
      var n = a.call(e);
      if ("[object Array]" === n) return [];
      if ("[object Object]" === n && e.constructor === Object) return {};
      if ("[object Date]" === n) return new Date(e.getTime());
      if ("[object RegExp]" === n) {
        var r = String(e),
          o = r.lastIndexOf("/");
        return new RegExp(r.slice(1, o), r.slice(o + 1))
      }
      var i = t(e);
      return void 0 !== i ? i : null
    }

    function o(e) {
      var t = "undefined" == typeof e ? "undefined" : i(e);
      return null !== e && "object" !== t && "function" !== t ? e : null
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
      },
      a = Object.prototype.toString;
    t.copy = n, t.copyCollection = r, t.copyValue = o
  }, function(e, t) {
    "use strict";

    function n(e, t) {
      if ("[object Array]" !== o.call(e)) throw new TypeError("array must be an Array");
      var n = void 0,
        r = void 0,
        i = void 0;
      for (n = 0, r = e.length; n < r; ++n)
        if (i = e[n], i === t || i !== i && t !== t) return n;
      return -1
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
      },
      o = Object.prototype.toString,
      i = "function" == typeof Object.keys ? function(e) {
        return Object.keys(e)
      } : function(e) {
        var t = "undefined" == typeof e ? "undefined" : r(e);
        if (null === e || "function" !== t && "object" !== t) throw new TypeError("obj must be an Object");
        var n = [],
          o = void 0;
        for (o in e) Object.prototype.hasOwnProperty.call(e, o) && n.push(o);
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
    t.DOM_READY_EVENT = "__DOMReady", t.SPEED_REPORT_TYPE = {
      appRoute2newPage: 8,
      newPage2pageReady: 9
    }, t.UPDATE_APP_DATA = "__updateAppData"
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.triggerAnalytics = void 0;
    var r = n(1),
      o = n(6),
      i = n(2),
      a = {},
      s = {},
      u = function(e, t) {
        if ("reset" === e.action && (s[e.eventID] = {
            eventID: e.eventID,
            data: []
          }), s[e.eventID]) {
          var n = e.data || {};
          if (t && e.page === t.__route__)
            for (var r in n) {
              var i = n[r];
              if (i.indexOf("[]") > -1) {
                if (!(e.index > -1)) continue;
                i = i.replace("[]", "[" + e.index + "]")
              }
              var a = (0, o.getObjectByPath)(t.data || {}, i);
              if ("undefined" == typeof a.obj || "undefined" == typeof a.key) return;
              s[e.eventID].data.push({
                id: r,
                value: a.obj[a.key]
              })
            }
          "report" === e.action && (WeixinJSBridge.invoke("reportRealtimeAction", {
            actionData: JSON.stringify(s[e.eventID])
          }), s[e.eventID] = null)
        }
      },
      c = (t.triggerAnalytics = function(e, t) {
        "pageReady" === e && t && c(t);
        var n = a[e];
        n && n.forEach(function(n) {
          "enterPage" === e || "leavePage" === e ? t && n.page === t.__route__ && u(n, t) : u(n)
        })
      }, function(e) {
        if (e && e.__webviewReady__) {
          var t = e.__route__,
            n = a.click,
            r = [];
          n && (n.forEach(function(e) {
            e.page === t && e.element && r.push({
              eventID: e.eventID,
              page: t,
              element: e.element,
              action: e.action
            })
          }), 0 !== r.length && WeixinJSBridge.publish("analyticsConfig", {
            data: r
          }))
        }
      });
    WeixinJSBridge.subscribe("analyticsReport", function(e, t) {
      var n = e.data,
        o = a.click,
        c = void 0,
        l = void 0;
      if (o && ("reset" === n.action || s[n.eventID])) {
        for (var f = (0, r.getCurrentPages)(), p = 0; p < f.length; p++) {
          var d = f[p];
          if (d.__wxWebviewId__ === t) {
            l = d;
            break
          }
        }
        if (l) {
          for (var h = 0; h < o.length; h++) {
            var v = o[h];
            if (n.eventID === v.eventID && n.page === v.page && n.element === v.element) {
              c = (0, i.extend)({}, v);
              break
            }
          }
          c && (c.index = n.index, u(c, l))
        }
      }
    })
  }, function(e, t, n) {
    "use strict";

    function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.getApp = t.appHolder = void 0;
    var o = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
        }
      }(),
      i = n(2),
      a = n(1),
      s = n(13),
      u = ["onLaunch", "onShow", "onHide", "onUnlaunch"],
      c = function(e) {
        for (var t = 0; t < u.length; ++t)
          if (u[t] === e) return !0;
        return !1
      },
      l = function(e) {
        return "getCurrentPage" === e
      },
      f = function() {
        function e(t) {
          var n = this;
          r(this, e), u.forEach(function(e) {
            var r = function() {
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
            n[e] = r.bind(n)
          });
          for (var o in t) l(o) ? (0, i.warn)("关键字保护", "App's " + o + " is write-protected") : c(o) || ("[object Function]" === Object.prototype.toString.call(t[o]) ? this[o] = t[o].bind(this) : this[o] = t[o]);
          this.onLaunch(), (0, s.triggerAnalytics)("launch");
          var f = function() {
              var e = (0, a.getCurrentPages)();
              e.length && e[e.length - 1].onHide(), this.onHide(), (0, s.triggerAnalytics)("background")
            },
            p = function() {
              this.onShow();
              var e = (0, a.getCurrentPages)();
              e.length && (e[e.length - 1].onShow(), (0, s.triggerAnalytics)("foreground"))
            };
          WeixinJSBridge.on("onAppEnterBackground", f.bind(this)), WeixinJSBridge.on("onAppEnterForeground", p.bind(this))
        }
        return o(e, [{
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
      p = new f(e)
    }), t.getApp = function() {
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
  define = function(t, r) {
    n[t] = {
      status: e,
      factory: r
    }
  };
  var r = function(e) {
      var t = e.match(/(.*)\/([^\/]+)?$/);
      return t && t[1] ? t[1] : "./"
    },
    o = function(e) {
      var t = r(e);
      return function(e) {
        if ("string" != typeof e) throw new Error("require args must be a string");
        for (var n = [], r = (t + "/" + e).split("/"), o = 0, i = r.length; o < i; ++o) {
          var a = r[o];
          if ("" != a && "." != a)
            if (".." == a) {
              if (0 == n.length) throw new Error("can't find module : " + e);
              n.pop()
            } else o + 1 < i && ".." == r[o + 1] ? o++ : n.push(a)
        }
        try {
          var s = n.join("/");
          return /\.js$/.test(s) || (s += ".js"), require(s)
        } catch (e) {
          throw e
        }
      }
    };
  require = function(r) {
    if ("string" != typeof r) throw new Error("require args must be a string");
    var i = n[r];
    if (!i) throw new Error('module "' + r + '" is not defined');
    if (i.status === e) {
      var a = i.factory,
        s = {
          exports: {}
        },
        u = void 0;
      a && (u = a(o(r), s, s.exports)), i.exports = s.exports || u, i.status = t
    }
    return i.exports
  }
}(), wx.version = {
  updateTime: "2016.10.31 21:37:45",
  info: "",
  version: 30
};
