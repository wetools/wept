! function(e, t) {
  if ("object" == typeof exports && "object" == typeof module) module.exports = t();
  else if ("function" == typeof define && define.amd) define([], t);
  else {
    var n = t();
    for (var i in n)("object" == typeof exports ? exports : e)[i] = n[i]
  }
}(this, function() {
  return function(e) {
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
        "default": e
      }
    }
    var o = n(1),
      a = i(o),
      r = n(14),
      d = i(r),
      s = navigator.userAgent,
      u = s.indexOf("wechatdevtools") > 0,
      A = s.indexOf("devtoolsedit") > 0;
    u ? (0, a["default"])() : A && (0, d["default"])()
  }, function(e, t, n) {
    "use strict";

    function i(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return t["default"] = e, t
    }

    function o(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }

    function a(e, t, n, i) {
      var o = {
        to: e,
        msg: t,
        command: n,
        ext: i
      };
      o.comefrom = "webframe", o.webviewID = p.webviewID, o = JSON.parse(JSON.stringify(o)), "backgroundjs" === e && (o.__id = D, D++), window.parent.postMessage(o, "*")
    }

    function r(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
        i = {
          sdkName: e,
          args: t
        },
        o = {
          isOn: n,
          url: location.href,
          title: document.title,
          desc: document.title,
          img_url: document.images.length ? document.images[0].src : g.DEFAULT_SHARE_IMG_URL,
          link: void 0
        };
      a("backgroundjs", i, M, o)
    }

    function d(e, t, n) {
      m.isWeapp || (console.group(new Date + " wx." + (0, m.getSdkDisplayName)(e) + " end"), console.debug((0, m.getSdkArgs)(e, t)), console.groupEnd()), "preVerifyJSAPI" === e && ! function() {
        var e = n.args.verifyJsApiList || [],
          t = n.sdkResExt,
          i = [],
          o = [];
        e.forEach(function(e) {
          (t.defaultPurview[e] || t.purviewFormGetA8key[e] || t.purviewFromPreVerify[e]) && (0 === o.length ? i.push(o) : 6 === o.length && (o = [], i.push(o)), o.push((0, m.getSdkDisplayName)(e)))
        }), m.isWeapp || (console.group(new Date + " 当前页面通过 wx.config 获取到的 JSSDK 权限如下"), console.table(i), console.groupEnd())
      }(), R[e] && R[e].fn ? R[e].fn(t) : g.registerMethod[e] && r(g.registerMethod[e])
    }

    function s(e, t, n) {
      window.WeixinJSBridge ? d(e, t, n) : document.addEventListener("WeixinJSBridgeReady", function() {
        d(e, t, n)
      })
    }

    function u(e) {
      var t = (e.data, e.eventName);
      C._subscribe[t] && C._subscribe[t](e.data)
    }

    function A() {
      window.WeixinJSBridge = C;
      var e = document.createEvent("UIEvent");
      e.initEvent("WeixinJSBridgeReady", !1, !1), document.dispatchEvent(e), v["default"].register(function() {
        var e = {},
          t = {};
        a("backgroundjs", e, "PULLDOWN_REFRESH", t)
      }), a("contentscript", {}, S)
    }

    function c() {
      "complete" === document.readyState ? A() : window.addEventListener("load", function(e) {
        A()
      }), document.addEventListener("generateFuncReady", function() {
        a("backgroundjs", {}, b)
      })
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
      return typeof e
    } : function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    t["default"] = c;
    var g = n(2),
      p = n(3),
      m = n(4),
      f = n(5),
      I = o(f),
      h = n(6),
      v = o(h),
      E = n(9),
      y = i(E),
      M = "EXEC_JSSDK",
      w = "TO_APP_SERVICE",
      S = "SHAKE_HANDS",
      k = "COMMAND_GET_TITLE",
      b = "WEBVIEW_READY";
    (0, I["default"])(p.isAndroid ? "Android" : "iPhone");
    var D = 0,
      C = {},
      R = C._debugCache = {},
      B = C._subscribe = {},
      Q = C.privateCache = {};
    C.invoke = function(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        n = arguments[2];
      return y[e] ? void y[e](t, n) : g.NotInvokeSdk[e] || /^__sys/.test(e) ? void 0 : ((0, m.isPrivateSdk)(e) ? (t.__id = +new Date, Q[t.__id] = n) : R[e] = {
        fn: n
      }, m.isWeapp || (console.group(new Date + " wx." + (0, m.getSdkDisplayName)(e) + " begin"), console.debug((0, m.getSdkArgs)(e, t)), console.groupEnd()), "disableScrollBounce" === e ? void v["default"].togglePullDownRefresh(t.disable) : void r(e, t))
    }, C.on = function(e, t) {
      R[e] = {
        fn: t
      }, r(e, {}, !0)
    }, C.call = function() {
      console.error("WeixinJSBridge.call 不被支持，请参考 http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html 进行正确调用")
    }, C.log = function(e) {
      console.log(e)
    }, C.publish = function(e, t, n) {
      e = n ? "sys_" + e : "publish_" + e;
      var i = {
        eventName: e,
        data: t
      };
      a("backgroundjs", i, w)
    }, C.subscribe = function(e, t) {
      B[e] = t
    }, window.addEventListener("message", function(e) {
      var t = e.data;
      if (t && "object" === ("undefined" == typeof t ? "undefined" : l(t))) {
        if (t && ("geolocation" === t.module || "locationPicker" === t.module)) {
          var n = t;
          return "geolocation" == t.module && (n = {
            module: "locationPicker",
            latlng: {
              lat: t.lat,
              lng: t.lng
            },
            poiaddress: "" + t.province + t.city,
            poiname: t.addr,
            cityname: t.city
          }), void alert("map handle:" + JSON.stringify(n))
        }
        var i = t.msg;
        if (i) {
          var o = t.command,
            r = t.ext;
          if ("webframe" === t.to && o && p.webviewID === t.webviewID && "INIT_DEVTOOLS_SUCCESS" !== o) {
            if ("MSG_FROM_APPSERVICE" === o) return void u(i);
            if ("COMMAND_GET_TITLE" === o) {
              var d = {
                title: document.title
              };
              return void a("backgroundjs", d, k)
            }
            var A = i.sdkName,
              c = i.res || {};
            if ((0, m.isPrivateSdk)(A)) {
              var g = r.args;
              return void Q[g.__id](c)
            }
            p.isAndroid && ("checkJsApi" === A ? c.checkResult = JSON.stringify(c.checkResult) : "chooseImage" === A && (c.localIds = JSON.stringify(c.localIds))), "GET_JSSDK_RES" !== o && "INVOKE_SDK" !== o || s(A, c, r), "STOP_PULL_DOWN_REFRESH" === o && v["default"].reset()
          }
        }
      }
    })
  }, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = {
        reportKeyValue: !0,
        reportIDKey: !0,
        systemLog: !0
      },
      i = {
        appId: !0,
        verifyAppId: !0,
        verifyNonceStr: !0,
        verifySignType: !0,
        verifySignature: !0,
        verifyTimestamp: !0,
        origin: !0,
        webviewId: !0,
        __isFromOn__: !0,
        __domain__: !0,
        __url__: !0
      },
      o = {
        "menu:share:timeline": "shareTimeline",
        "menu:share:appmessage": "sendAppMessage",
        "menu:share:qq": "shareQQ",
        "menu:share:weiboApp": "shareWeiboApp",
        "menu:share:QZone": "shareQZone"
      },
      a = {
        shareTimeline: "menu:share:timeline",
        sendAppMessage: "menu:share:appmessage",
        shareQQ: "menu:share:qq",
        shareWeiboApp: "menu:share:weiboApp",
        shareQZone: "menu:share:QZone",
        config: "preVerifyJSAPI"
      },
      r = {
        shareTimeline: "onMenuShareTimeline",
        sendAppMessage: "onMenuShareAppMessage",
        shareQQ: "onMenuShareQQ",
        shareWeiboApp: "onMenuShareWeibo",
        shareQZone: "onMenuShareQZone",
        "menu:share:timeline": "onMenuShareTimeline",
        "menu:share:appmessage": "onMenuShareAppMessage",
        "menu:share:qq": "onMenuShareQQ",
        "menu:share:weiboApp": "onMenuShareWeibo",
        "menu:share:QZone": "onMenuShareQZone",
        preVerifyJSAPI: "config",
        imagePreview: "previewImage",
        geoLocation: "getLocation",
        openProductViewWithPid: "openProductSpecificView",
        batchAddCard: "addCard",
        batchViewCard: "openCard",
        getBrandWCPayRequest: "chooseWXPay",
        showPickerView: "showPickerView",
        showDatePickerView: "showDatePickerView"
      },
      d = "http://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRt8Qia4lv7k3M9J1SKqKCImxJCt7j9rHYicKDI45jRPBxdzdyREWnk0ia0N5TMnMfth7SdxtzMvVgXg/0";
    t.NotInvokeSdk = n, t.registerMethod = o, t.methodTrans = a, t.DEFAULT_SHARE_IMG_URL = d, t.sdkDisplayName = r, t.doNotDisplayArgsConfig = i
  }, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = navigator.userAgent,
      i = n.match(/webview\/(\d*)/),
      o = i ? parseInt(n.match(/webview\/(\d*)/)[1]) : 0,
      a = n.indexOf("Android") !== -1,
      r = n.indexOf("iPhone") !== -1,
      d = n.indexOf("weapp") !== -1;
    t.isAndroid = a, t.isiPhone = r, t.webviewID = o, t.isWeapp = d
  }, function(e, t, n) {
    "use strict";

    function i(e) {
      return r.sdkDisplayName[e] || e
    }

    function o(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        n = JSON.parse(JSON.stringify(t));
      if (delete n.verifyAppId, "preVerifyJSAPI" === e) n.jsApiList = n.verifyJsApiList || [], n.jsApiList.forEach(function(e, t) {
        n.jsApiList[t] = i(e)
      }), delete n.verifyJsApiList, n.verifyNonceStr && (n.nonceStr = n.verifyNonceStr), delete n.verifyNonceStr, n.verifySignature && (n.signature = n.verifySignature), delete n.verifySignature, n.verifyTimestamp && (n.timestamp = n.verifyTimestamp), delete n.verifyTimestamp, delete n.verifySignType;
      else
        for (var o in t) r.doNotDisplayArgsConfig[o] && delete n[o];
      return n
    }

    function a(e) {
      return /^private_/.test(e)
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.isPrivateSdk = t.isWeapp = t.getSdkArgs = t.getSdkDisplayName = void 0;
    var r = n(2),
      d = navigator.userAgent.indexOf("weapp") > 0;
    t.getSdkDisplayName = i, t.getSdkArgs = o, t.isWeapp = d, t.isPrivateSdk = a
  }, function(e, t) {
    "use strict";

    function n(e) {
      var t = function() {
        return e
      };
      Object.defineProperty(navigator, "platform", {
        get: t
      })
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t["default"] = n
  }, function(e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }

    function o() {
      if (!E) {
        E = document.createElement("div");
        var e = document.createElement("i");
        "dark" === __wxConfig.window.backgroundTextStyle ? e.style.backgroundImage = "url(" + l["default"] + ")" : e.style.backgroundImage = "url(" + p["default"] + ")", e.style.width = "32px", e.style.position = "absolute", e.style.height = "6px", e.style.left = "50%", e.style.bottom = "20px", e.style.backgroundRepeat = "no-repeat", e.style.marginLeft = "-16px", e.style.backgroundSize = "cover", E.appendChild(e), E.style.width = "100%", E.style.position = "fixed", E.style.top = "0px", E.style.backgroundColor = __wxConfig.window.backgroundColor, document.body.insertBefore(E, document.body.firstChild)
      }
    }

    function a() {
      window.addEventListener("touchstart", function(e) {
        0 == window.scrollY && (o(), I = !0, h = e.touches[0].pageY, window.document.body.style.transition = "all linear 0", E.style.transition = "all linear 0")
      }, !0)
    }

    function r() {
      window.addEventListener("touchmove", function(e) {
        I && __wxConfig.window.enablePullDownRefresh && !M && (v = e.touches[0].pageY - h, v = Math.max(0, v), v = Math.min(m, v), window.document.body.style.marginTop = v + "px", E.style.height = v + "px")
      })
    }

    function d() {
      window.addEventListener("touchend", function(e) {
        I = !1, v > f ? ("function" == typeof y && y(), v = f, window.document.body.style.marginTop = v + "px", E.style.height = v + "px", setTimeout(s, 3e3)) : s()
      })
    }

    function s() {
      window.document.body.style.transition = "all linear 0.3s", window.document.body.style.marginTop = "0px", E && (E.style.transition = "all linear 0.3s", E.style.height = "0px")
    }

    function u(e) {
      M = e
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var A = n(3),
      c = n(7),
      l = i(c),
      g = n(8),
      p = i(g),
      m = 100,
      f = 50,
      I = !1,
      h = 0,
      v = 0,
      E = null,
      y = null,
      M = !1;
    t["default"] = {
      register: function(e) {
        A.isWeapp && (A.isAndroid || A.isiPhone) && window.__wxConfig && window.__wxConfig.window && window.__wxConfig.window.enablePullDownRefresh && (y = e, a(), r(), d())
      },
      reset: s,
      togglePullDownRefresh: u
    }
  }, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t["default"] = "data:image/gif;base64,R0lGODlhQAAMAMQZAPT09Orq6ubm5unp6dPT06ysrPz8/NbW1q+vr9fX1+vr687Ozv39/fr6+tXV1Z6ens3NzZ2dnZubm66urpycnKurq+Xl5czMzJmZmf///wAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphODFiMWQ5My0wMDIwLTRiYmItYjVlMS04YjI4NTFkMzMzMjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjFEQzRGRkU4NkU4MTFFNjkwOTg4NjNGN0JEMzY0OTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjFEQzRGRkQ4NkU4MTFFNjkwOTg4NjNGN0JEMzY0OTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDplY2RjM2MyNC03NDBkLTQ1NzMtOTc0Ni1iZGQ2MzhlMjEyYjUiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo3MGUzZDU2Ny1jZTk1LTExNzktYWFmZC04MmQ1NzRhYmI2YzIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQJFAAZACwAAAAAQAAMAAAFvmCWMQTyPAjBiGzrukOyLMnw3jegCIICtIACZkgs/HC3xuHCbB4ayJshYKlaA4aRkMgtZKOtZXPsALuo1nQgQ+C6MQSzaDCuX2xyQHpvASDeXAhyGQl2YwmDCnxpChKARBSDEIZNEIMCi1YCjo8YD5KUTAuXmVUCf52CcoWhiHKKpQptnXFydKF4ZnqlAAZbbxVfcg6UZYMZaHxrGUFvRscZSnYOUMdTysIkExEREyrQLAMHMwe54AABPAFHGSEAIfkECRQAGQAsAAAAAEAADAAABb9gJgKKICiAqK4syxDI8yAE097tkCxLMqyGgGVIDBhwOEABw2wWUshW43CpWg8NkZDIDURdy6a4cPyqqNa0IwPgui1QM0FMxxDMokF6fxko3lwKeBkIdWIIgwl8aQkCgEQCgxKGTRSDEItWEI6PFpF4k5QYD5eZVQt/nYJ4haKIeIqmCW2dcV9zond4eqY/W29egwZhdRVleA6ZaxlBwMd4SnVPgyJTfA5ZKgABJgG21C8TERETNdQrAwc8Bz8iIQAh+QQFFAAZACwAAAAAQAAMAAAFv2AmDsmyJIOormwLKIKgAG3dMgTyPAjBqI3DZUg8NGw2Q8DCbAYMyBqggKlaC7SMkMh1RFvLpjjwXTGo1nTBMOC6L6lyBiCuW7JlQnqPISTeXAlyGQp2YgqDCHxpCBCARBCDAoZNAoMSi1YUjo8XC5KUTJZymJkYD3+dgnKFoYhyiqYIbZ1xZXSheF96pgQZDo9egxlhdmSDBmh8FVBBbw5Hw0rGUMNTfFgrAwcmB7bDIgABMQG6wzgTERETPiIhADs="
  }, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t["default"] = "data:image/gif;base64,R0lGODlhQAAMAIABAP///////yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphODFiMWQ5My0wMDIwLTRiYmItYjVlMS04YjI4NTFkMzMzMjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0Q5MjI2RkE4NkU1MTFFNkFDRDc5Mjc3OTE2NjVFRTMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0Q5MjI2Rjk4NkU1MTFFNkFDRDc5Mjc3OTE2NjVFRTMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphODFiMWQ5My0wMDIwLTRiYmItYjVlMS04YjI4NTFkMzMzMjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6YTgxYjFkOTMtMDAyMC00YmJiLWI1ZTEtOGIyODUxZDMzMzIyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkECRQAAQAsAAAAAEAADAAAAkVMgInG7a7Wmy+CZhWlOe3ZLaH3YWEJnaOErhd6uCscj7Q8w+6Nn3re6nV4tp/QQvQFjxFaLeN8IqVNZzE5pbKi2SiVUQAAIfkECRQAAQAsAAAAAEAADAAAAkWMgWnL3QmBmy7KZSGlWe3aXeH1YSNZBqN6pkfrnjL6yS47h7cd53q/AvosO1hq2CkGj60l01kKQqM/ZYZBvGGvWpPGUAAAIfkEBRQAAQAsAAAAAEAADAAAAkWMgWnL7amcbBCuWufEVj+OHCDgfWDJjGqGBivZvm/rrrRsxzmKq/de6o1+Pp0QQxwah8Uk0smpnWjSKLVZDVFTrG02UgAAOw=="
  }, function(e, t, n) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }

    function o(e, t) {
      var n = E();
      y(n, e), n.id = v(), document.body.appendChild(n), n.addEventListener("click", function(e) {
        var t = n.dataset.data;
        WeixinJSBridge.publish("onShareAppMessage", {
          data: t,
          path: location.pathname
        }, !0)
      }), t({
        errMsg: "insertShareButton:ok",
        shareButtonId: n.id
      })
    }

    function a(e, t) {
      var n = e.shareButtonId,
        i = document.getElementById(n);
      i ? (y(i, e), t({
        errMsg: "insertShareButton:ok"
      })) : t({
        errMsg: "insertShareButton:faile shareButtonId:" + n + " not found"
      })
    }

    function r(e, t) {
      var n = e.shareButtonId,
        i = document.getElementById(n);
      i ? (i.remove(), t({
        errMsg: "removeShareButton:ok"
      })) : t({
        errMsg: "removeShareButton:faile shareButtonId:" + n + " not found"
      })
    }

    function d(e, t) {
      var n = E();
      y(n, e, "contact"), n.id = v(), document.body.appendChild(n), n.addEventListener("click", function(e) {
        var t = n.dataset.sessionFrom;
        WeixinJSBridge.publish("insertContactButton", {
          sessionFrom: t
        }, !0)
      }), t({
        errMsg: "insertShareButton:ok",
        contactButtonId: n.id
      })
    }

    function s(e, t) {
      var n = e.contactButtonId,
        i = document.getElementById(n);
      i ? (y(i, e, "contact"), t({
        errMsg: "insertShareButton:ok"
      })) : t({
        errMsg: "updateContactButton:faile contactButtonId:" + n + " not found"
      })
    }

    function u(e, t) {
      var n = e.contactButtonId,
        i = document.getElementById(n);
      i ? (i.remove(), t({
        errMsg: "removeContactButton:ok"
      })) : t({
        errMsg: "removeContactButton:faile contactButtonId:" + n + " not found"
      })
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.removeContactButton = t.updateContactButton = t.insertContactButton = t.removeShareButton = t.updateShareButton = t.insertShareButton = void 0;
    var A = n(10),
      c = i(A),
      l = n(11),
      g = i(l),
      p = n(12),
      m = i(p),
      f = n(13),
      I = i(f),
      h = {},
      v = function() {
        var e = Math.random();
        return h[e] ? initMappingID() : e
      },
      E = function() {
        var e = document.createElement("img");
        return e.style.position = "absolute", e
      },
      y = function(e, t, n) {
        var i = t.buttonType,
          o = t.hide,
          a = t.position,
          r = t.data,
          d = t.sessionFrom;
        "default-light" === i ? e.src = "contact" === n ? I["default"] : g["default"] : e.src = "contact" === n ? m["default"] : c["default"], e.style.top = a.top + "px", e.style.left = a.left + "px", e.style.width = a.width + "px", e.style.height = a.height + "px", e.style.zIndex = 1e8, e.dataset.data = r, e.dataset.sessionFrom = d, o && (e.style.display = "none")
      };
    t.insertShareButton = o, t.updateShareButton = a, t.removeShareButton = r, t.insertContactButton = d, t.updateContactButton = s, t.removeContactButton = u
  }, function(e, t) {
    e.exports = "data:image/png;base64,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"
  }, function(e, t) {
    e.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFMAAABQCAYAAABlJkmuAAAAAXNSR0IArs4c6QAABPBJREFUeAHtm12IFWUYxz2trWReWWYuQmhudZMX1kKwi64KurRJ4V4k7F50kxFdeOO9JBR2IYQsgUFXfoJRXYhGVATLYhdLxLZGkGgRmGsZuLiZZR5/f50Ds2fnnJ0588zHmXkf+DMz7/vO8/E775mZMzNn0aISWrVafRFtKmHp9iUD8g/0P9pt771kHoFYMwEdKVn5tuXWSHrL2yyHbCOUyFsdTG3+iwZLhMCu1ACYarqJttpFKYmnBjDVfAP1lgSDTZlNYKrrOnreJlIJvCwAU93X0LMlQBG/xBAwNeQKejp+tIJ7CAlTw35DawqOI155EWBq6EW0Ol7EAu8dEaaG/4RWFhhJ66W1AFO7TKLlzaJWmnW2Qx8FdpLnk2idt1zL8nH0KHrE00MsH0Qaq+UDqBWbYKetlUplJmjntoMJvCdUEOpBuh5cjwQpLRsn0HaAztYHzD1M4GkW9aOdaBvqRlnb1yQwCNB/sk4kVHwgPoXeR5dRHu00SemQkV8jwefQKaR7jXm3j0mwI3c0SWoz+iLv9ALyO0Jbqyc028+BRNagrwKSbKemw6KS2QkIUor9FjqAHkbtbrsy+b4DUteFn6I3UZqXNUl+YEsWJ+k9yDcgd9B+Ei0N6m/jtsWpHjgBuRtYmpFFA6k58ElqMAG5n4A6UGdyaFG1Cdpn+P4olRMQID8k2OsJFpOl628IPsCvoVuJz0xA7iNYUUF+R20vCyTLZC+NADlMjKMKVED7mZr6AHm1VltiX3NA9hHkS7SkFqxAy8vU0gvIX/w1JQITkLqX+CNa4Q9WkPW/qGMjIM/X15PUMXOUQEUE+Td16dbbPJACa37RzqzUfcdX5TxB0+y4gK54mq5bv8a2Cq/pP9bvoCog7pBjlfWoJh9D7P9tox1Nv+bkqGck+npbPXzSWXISTflFQTpmtWwtwNQHMULcEy0HjbojSR5UojFM9zAn0HtoG9KzG3PDb1TTDZn0jOy6kN4ki2p6P/JzNIw0sxO3iAnqOjldI8HRiEn+wPi9aFW6mXLgDG86kaZr5LYa3QqZ4zjjBtLNcG60kHkeZ1xSVztzE/JvEfTtEAmOMWaLf7+s1kPkepYx6T8sI2gH0gtOjexPOl7LClxQ3EaJeu3nWGZzi5DALzVJ7hh9ubt4b5LvFH2pnASDPmQdzPVYtt70wv0bgTvkoLE+WW/7EsuuzNIjeCeaQX7TS6K9mSUVIrA/WW99mmV3iF2TG0ICurD22+9s5P5tW3/CrOsd9g3JUQrpmSQO+RLTjHwm5K6ZDvPlrB8Z/ZkmUwtOIt97ieka84Vae96X5Kr/Tuq4/kouciWRZUg/BWW5PdkEwSLfAdQT1JdJG8lsQbLTmSRQpKBA3INmkV4+dQaBOL89dbL5gHt8vzqSHgFm1rso6CaF2t5pBIq+M+ixRv1FaRcDFI5Pg4E037N7z4ODwNC7P6i9aG3UGQTyPh36/PXqa97pb6hbb9Y3Vje2qJvNGMzpi3PM1NsMznwEKpqvvu15q5xgTB+6zQuQ84YofOLMzJxjSD89B9OQuYPpYBoSMHTlZqaDaUjA0JWbmQ6mIQFDV25mOpiGBAxduZnpYBoSMHTlZqaDaUjA0JWbmQ6mIQFDV25mOpiGBAxdLfinqoVu2xvm0vau3Nfc8CN0MB1MQwKGrtzMdDANCRi6cjPTEOZdcuY6Skmg1Q4AAAAASUVORK5CYII="
  }, function(e, t) {
    e.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABRCAYAAABBuPE1AAAAAXNSR0IArs4c6QAAA1tJREFUeAHtm89rE0EcxZttbA00ePBc8CLkEEMlNId69uKtWKt/gqRevcejeBNRj/aiKNibHpVST4GQ5gc9F/RYEaE1BNLG9y1ZSNXa3eyb7Ya8hWUmuztv5vuZN9nJTnZqSpsIiIAIiIAIiMB4EEiVSqXLnU7neb/fv4Umz41Hs09t5X4qlfqYyWTK1Wr1+6lXOTiRHkBcdaB9HpJzMMQqYrK678bZAG/gxDjrdF7XecTkIapxH87/6pjYYzKQ2ggEBJIA0SQEUiBJBEgycqRAkgiQZORIgSQRIMnIkQJJIkCSkSMFkkSAJCNHCiSJAElGjhRIEgGSjBxJApkm6SRaJp/P9x008CsW2p41m80nSPty5OiE57E29LhQKDw0CYEcHeRxScB8IJARIQ6KzwskB+SxioY2CaZACiSJAElGjhRIEgGSjBwpkCQCJBk5UiBJBEgycqRAkgiQZORIIsh9klaSZGKPybPXKZJEgNSWD77OwsLCop93mXr2TgpgvkMlsfeig8AshrfZbLbsax8eHq75eZdpKox40LUPdMwv6K61Wq1XYfTZ18KNNwDyM55iX2BrD+u12+2Ui8WvnXQ6fader+8MVxZ3HhCvAuJ71xD9uKgg4cT1mZmZcq1WM0fGvhWLxUtHR0dXer3ebey2KHUxrkZQQEYdykG/Ms6C0u12z7rE2XkGyEQMZWeEAgpHmpDbUJ6dnV087+/DgLE6vWwkR9pQxl7GvwzWnbZujMRDgQS8b4jtB+7K9+TCk70camhPT09fy+Vy1wXxJET7FGpC/ndxzhHWXZvTmvAqNiEP5cjwVUxOCYEk9bVACiSJAElGjhRIEgGSTFIc+YUUT+wy+JGyZZUmAiR+ry+jQW+w/4ydxIgVWluxv8YKw7JJJGJCPmIsIxXD5P8+ADwN+sDXJttBKkqEI4M0lHUNwLyE1k3seyxN05k4kBY01pI28eBlEc5s2mfGNpEgDdz29vYuQC4huyGQEQngeeoB3Lnied4jSEV6O2xiHen3AVzZB9AKHhGuIH/gHw+bTjxIH1ij0djAnXwJMHf9Y2FSgRyihTt6E8vJdhPatMNIPw2d/m9WIP/AgzX5PcC06dELgLS1cW1RCFQqFZksCkCVFQEREAEREIHEEvgNdubEHW4rptkAAAAASUVORK5CYII="
  }, function(e, t) {
    e.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABRCAYAAABBuPE1AAAAAXNSR0IArs4c6QAAAsJJREFUeAHtm71KA0EUhbOijT8o6APY2FgoCFYW9nYK/pSWkvTaig9hrY2iYKmdIOgLWGgrqIUgIpKoIOh6RjMQgpid3bOb3cwZOEyMd86d++UmG3fdUklDBERABERABESgGAQCs80wDIcxbUNzUD9U5FHD5k+gchAET1kVYkEeIOFSVkkzynMIkMsZ5SpZkFUkLHonNjOrAeRA85Np/WxBhmklaKcvQP7Ul8UeurJI4kMOgSS9ygIpkCQCJBt1pECSCJBs1JECSSJAslFHCiSJAMlGHSmQJAIkG3WkQJIIkGzUkQJJIkCyUUcKpBsBXOBLY9zCdB36PRVvMrhtqxjRjZcaUq5xw5trNimDvBNI0ptLBxuBJBEg2agjBZJEgGSjjhRIEgGSjTpSIEkESDbqSIEkESDZqCMFkkSAZKOOJIM0dwJ02si0JtuR5naKThvHtiCci5y2j9Oau+vG5frcKffZGIi2JlNapV5ffiZzpjnieEXcart3jj3MQB8R9xw7zLnOiJmuEDfubE5egD2MQQ8R95wozHnrEbLtIKbX2Zi0ALkHoUloC3qHMhn2M5JRxhtMKrhytxPHzFQbZ11e1rBAXqOgRUA0s5fDfv1JUvwuFk/7DNHAS9KR5q1sbuU1IL0fcUDeg9oztOJ7FzZ2z88/CDQ+0eoxjglDiKkC4merWJffF/1g4wzSBY5LbNFBMg42Lrw6NlYgSS+tQAokiQDJRh0pkCQCJJs8deQFqaZ22JznCeQ8COxDL+0gETOn2eseZPbu38CX/zUo8llz/wg5VAyQs9Aj1HI42PoZCoKj0GUrkn7ScawaEPugo/9gOlr6Gw6IAbQJff0F1F8yMSsHxAWo1gwzpp3fywBxArpphOk3kQTVA+IIdFaHeZrASksBsQfahqZEIyEBQMzTX34Jq9FyERABERABERCBXwLfe8eGVVx752oAAAAASUVORK5CYII="
  }, function(e, t) {
    "use strict";

    function n(e, t, n, i) {
      var o = {
        to: e,
        msg: n,
        command: t,
        ext: i
      };
      "backgroundjs" === e && (o.__id = d, d++), o = JSON.parse(JSON.stringify(o)), window.parent.postMessage(o, "*")
    }

    function i() {
      var e = Math.random();
      return l[e] ? initMappingID() : e
    }

    function o() {
      window.EditBridge = g;
      var e = document.createEvent("UIEvent");
      e.initEvent("EditBridgeReady", !1, !1), document.dispatchEvent(e), n("contentscript", "SHAKE_HANDS", {})
    }

    function a() {
      "complete" === document.readyState ? o() : window.addEventListener("load", function(e) {
        o()
      })
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
      return typeof e
    } : function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    t["default"] = a;
    var d = 0;
    window.addEventListener("message", function(e) {
      var t = e.data;
      if (t && "object" === ("undefined" == typeof t ? "undefined" : r(t))) {
        var n = t.to;
        if ("webframe" === n) {
          var i = t.command,
            o = t.msg,
            a = t.ext;
          if ("RETURN_RES" === i) {
            var d = parseInt(o.ret),
              g = a.callID;
            0 === d ? l[g](null, o.res) : l[g](o.ret, {})
          } else if ("FILE_CHANGE" === i) {
            var p = o.eventType,
              m = o.fileName,
              f = o.info;
            s && s(p, m, f)
          } else "WINDOW_CHANGE" === i ? u && u(o.eventType) : "WEBVIEW_SHOW_CHANGE" === i ? A && A(o.editWebview) : "OPEN_FILE" === i && c && c(o)
        }
      }
    });
    var s, u, A, c, l = {},
      g = {};
    g.on = function(e, t) {
      "FILE_CHANGE" === e && (s = t), "WINDOW_CHANGE" === e && (u = t), "WEBVIEW_SHOW_CHANGE" === e && (A = t), "OPEN_FILE" === e && (c = t)
    }, g.getFileList = function(e, t) {
      var o = void 0,
        a = void 0;
      t ? (o = e, a = t) : (o = {}, a = e);
      var r = i();
      l[r] = a, n("backgroundjs", "GET_FILE_LIST", {
        options: o
      }, {
        callID: r
      })
    }, g.getFile = function(e, t) {
      var o = i();
      l[o] = t, n("backgroundjs", "GET_FILE_DATA", {
        path: e
      }, {
        callID: o
      })
    }, g.saveFile = function(e, t, o) {
      var a = i();
      l[a] = o, n("backgroundjs", "SAVE_FILE_DATA", {
        path: e,
        data: t
      }, {
        callID: a
      })
    }, g.addFile = function(e, t) {
      var o = i();
      l[o] = t, n("backgroundjs", "ADD_FILE", {
        path: e
      }, {
        callID: o
      })
    }, g.delFile = function(e, t) {
      var o = i();
      l[o] = t, n("backgroundjs", "DEL_FILE", {
        path: e
      }, {
        callID: o
      })
    }, g.rename = function(e, t, o) {
      var a = i();
      l[a] = o, n("backgroundjs", "RENAME_FILE", {
        oldPath: e,
        newPath: t
      }, {
        callID: a
      })
    }, g.mkdir = function(e, t) {
      var o = i();
      l[o] = t, n("backgroundjs", "MAKE_DIR", {
        path: e
      }, {
        callID: o
      })
    }, g.rmdir = function(e, t) {
      var o = i();
      l[o] = t, n("backgroundjs", "RM_DIR", {
        path: e
      }, {
        callID: o
      })
    }, g.getProjectInfo = function(e) {
      var t = i();
      l[t] = e, n("backgroundjs", "GET_PROJECT_INFO", {}, {
        callID: t
      })
    }, g.setEditWebview = function(e, t) {
      var o = i();
      l[o] = t, n("backgroundjs", "SET_EDIT_WEBVIEW", {
        editWebview: e
      }, {
        callID: o
      })
    }, g.findStr = function(e, t, o) {
      "function" == typeof t && (o = t, t = {
        cwd: "."
      }), t.cwd || (t.cwd = ".");
      var a = i();
      l[a] = o, n("backgroundjs", "FIND_STR", {
        options: t,
        str: e
      }, {
        callID: a
      })
    }, g.showFileInFolder = function(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      n("backgroundjs", "SHOW_ITEM_IN_FOLDER", {
        options: t,
        filePath: e
      })
    }, g.formatCode = function(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        o = arguments[2],
        a = i();
      l[a] = o, n("backgroundjs", "FORMAT_CODE", {
        code: e,
        options: t
      }, {
        callID: a
      })
    }
  }])
});
