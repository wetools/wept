"use strict";
var _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
  return typeof e
} : function(e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
};
! function(e, n) {
  if ("object" === ("undefined" == typeof exports ? "undefined" : _typeof2(exports)) && "object" === ("undefined" == typeof module ? "undefined" : _typeof2(module))) module.exports = n();
  else if ("function" == typeof define && define.amd) define([], n);
  else {
    var t = n();
    for (var i in t)("object" === ("undefined" == typeof exports ? "undefined" : _typeof2(exports)) ? exports : e)[i] = t[i]
  }
}(void 0, function() {
  return function(e) {
    function n(i) {
      if (t[i]) return t[i].exports;
      var o = t[i] = {
        exports: {},
        id: i,
        loaded: !1
      };
      return e[i].call(o.exports, o, o.exports, n), o.loaded = !0, o.exports
    }
    var t = {};
    return n.m = e, n.c = t, n.p = "", n(0)
  }([function(e, n, t) {
    function i(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    var o = t(1),
      r = i(o),
      a = t(9),
      d = i(a),
      s = navigator.userAgent,
      u = s.indexOf("wechatdevtools") > 0,
      c = s.indexOf("devtoolsedit") > 0;
    u ? (0, r["default"])() : c && (0, d["default"])()
  }, function(e, n, t) {
    function i(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }

    function o(e, n, t, i) {
      var o = {
        to: e,
        msg: n,
        command: t,
        ext: i
      };
      o.comefrom = "webframe", o.webviewID = A.webviewID, o = JSON.parse(JSON.stringify(o)), window.parent.postMessage(o, "*")
    }

    function r(e) {
      var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        t = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
        i = {
          sdkName: e,
          args: n
        },
        r = {
          isOn: t,
          url: location.href,
          title: document.title,
          desc: document.title,
          img_url: document.images.length ? document.images[0].src : f.DEFAULT_SHARE_IMG_URL,
          link: void 0
        };
      o("backgroundjs", i, v, r)
    }

    function a(e, n, t) {
      p.isWeapp || (console.group(new Date + " wx." + (0, p.getSdkDisplayName)(e) + " end"), console.debug((0, p.getSdkArgs)(e, n)), console.groupEnd()), "preVerifyJSAPI" === e && ! function() {
        var e = t.args.verifyJsApiList || [],
          n = t.sdkResExt,
          i = [],
          o = [];
        e.forEach(function(e) {
          (n.defaultPurview[e] || n.purviewFormGetA8key[e] || n.purviewFromPreVerify[e]) && (0 === o.length ? i.push(o) : 6 === o.length && (o = [], i.push(o)), o.push((0, p.getSdkDisplayName)(e)))
        }), p.isWeapp || (console.group(new Date + " 当前页面通过 wx.config 获取到的 JSSDK 权限如下"), console.table(i), console.groupEnd())
      }(), E[e] && E[e].fn ? E[e].fn(n) : f.registerMethod[e] && r(f.registerMethod[e])
    }

    function d(e, n, t) {
      window.WeixinJSBridge ? a(e, n, t) : document.addEventListener("WeixinJSBridgeReady", function() {
        a(e, n, t)
      })
    }

    function s(e) {
      var n = (e.data, e.eventName);
      M._subscribe[n] && M._subscribe[n](e.data)
    }

    function u() {
      window.WeixinJSBridge = M;
      var e = document.createEvent("UIEvent");
      e.initEvent("WeixinJSBridgeReady", !1, !1), document.dispatchEvent(e), I["default"].register(function() {
        var e = {},
          n = {};
        o("backgroundjs", e, "PULLDOWN_REFRESH", n)
      }), o("contentscript", {}, w)
    }

    function c() {
      "complete" === document.readyState ? u() : window.addEventListener("load", function(e) {
        u()
      })
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var l = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function(e) {
      return "undefined" == typeof e ? "undefined" : _typeof2(e)
    } : function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : "undefined" == typeof e ? "undefined" : _typeof2(e)
    };
    n["default"] = c;
    var f = t(2),
      A = t(3),
      p = t(4),
      m = t(5),
      y = i(m),
      g = t(6),
      I = i(g),
      v = "EXEC_JSSDK",
      h = "TO_APP_SERVICE",
      w = "SHAKE_HANDS",
      b = "COMMAND_GET_TITLE";
    (0, y["default"])(A.isAndroid ? "Android" : "iPhone");
    var M = {},
      E = M._debugCache = {},
      S = M._subscribe = {};
    M.invoke = function(e, n, t) {
      f.NotInvokeSdk[e] || /^__sys/.test(e) || (E[e] = {
        fn: t
      }, p.isWeapp || (console.group(new Date + " wx." + (0, p.getSdkDisplayName)(e) + " begin"), console.debug((0, p.getSdkArgs)(e, n)), console.groupEnd()), r(e, n))
    }, M.on = function(e, n) {
      E[e] = {
        fn: n
      }, r(e, {}, !0)
    }, M.call = function() {
      console.error("WeixinJSBridge.call 不被支持，请参考 http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html 进行正确调用")
    }, M.log = function(e) {
      console.log(e)
    }, M.publish = function(e, n) {
      var t = {
        eventName: e,
        data: n
      };
      o("backgroundjs", t, h)
    }, M.subscribe = function(e, n) {
      S[e] = n
    }, window.addEventListener("message", function(e) {
      var n = e.data;
      if (n && "object" === ("undefined" == typeof n ? "undefined" : l(n))) {
        if (n && ("geolocation" === n.module || "locationPicker" === n.module)) {
          var t = n;
          return "geolocation" == n.module && (t = {
            module: "locationPicker",
            latlng: {
              lat: n.lat,
              lng: n.lng
            },
            poiaddress: "" + n.province + n.city,
            poiname: n.addr,
            cityname: n.city
          }), void alert("map handle:" + JSON.stringify(t))
        }
        var i = n.msg;
        if (i) {
          var r = n.command,
            a = n.ext;
          if ("CUSTOM" === r) { return s(i) }
          if ("webframe" === n.to && r && A.webviewID === n.webviewID && "INIT_DEVTOOLS_SUCCESS" !== r) {
            if ("MSG_FROM_APPSERVICE" === r) return void s(i);
            if ("COMMAND_GET_TITLE" === r) {
              var u = {
                title: document.title
              };
              return void o("backgroundjs", u, b)
            }
            var c = i.sdkName,
              f = i.res || {};
            A.isAndroid && ("checkJsApi" === c ? f.checkResult = JSON.stringify(f.checkResult) : "chooseImage" === c && (f.localIds = JSON.stringify(f.localIds))), "GET_JSSDK_RES" !== r && "INVOKE_SDK" !== r || d(c, f, a), "STOP_PULL_DOWN_REFRESH" === r && I["default"].reset()
          }
        }
      }
    })
  }, function(e, n) {
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var t = {
        reportKeyValue: !0,
        initReady: !0,
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
      r = {
        shareTimeline: "menu:share:timeline",
        sendAppMessage: "menu:share:appmessage",
        shareQQ: "menu:share:qq",
        shareWeiboApp: "menu:share:weiboApp",
        shareQZone: "menu:share:QZone",
        config: "preVerifyJSAPI"
      },
      a = {
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
    n.NotInvokeSdk = t, n.registerMethod = o, n.methodTrans = r, n.DEFAULT_SHARE_IMG_URL = d, n.sdkDisplayName = a, n.doNotDisplayArgsConfig = i
  }, function(e, n) {
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var t = navigator.userAgent,
      i = t.match(/webview\/(\d*)/),
      o = i ? parseInt(t.match(/webview\/(\d*)/)[1]) : 0,
      r = t.indexOf("Android") !== -1,
      a = t.indexOf("iPhone") !== -1,
      d = t.indexOf("weapp") !== -1;
    n.isAndroid = r, n.isiPhone = a, n.webviewID = o, n.isWeapp = d
  }, function(e, n, t) {
    function i(e) {
      return r.sdkDisplayName[e] || e
    }

    function o(e) {
      var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        t = JSON.parse(JSON.stringify(n));
      if (delete t.verifyAppId, "preVerifyJSAPI" === e) t.jsApiList = t.verifyJsApiList || [], t.jsApiList.forEach(function(e, n) {
        t.jsApiList[n] = i(e)
      }), delete t.verifyJsApiList, t.verifyNonceStr && (t.nonceStr = t.verifyNonceStr), delete t.verifyNonceStr, t.verifySignature && (t.signature = t.verifySignature), delete t.verifySignature, t.verifyTimestamp && (t.timestamp = t.verifyTimestamp), delete t.verifyTimestamp, delete t.verifySignType;
      else
        for (var o in n) r.doNotDisplayArgsConfig[o] && delete t[o];
      return t
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.isWeapp = n.getSdkArgs = n.getSdkDisplayName = void 0;
    var r = t(2),
      a = navigator.userAgent.indexOf("weapp") > 0;
    n.getSdkDisplayName = i, n.getSdkArgs = o, n.isWeapp = a
  }, function(e, n) {
    function t(e) {
      var n = function() {
        return e
      };
      Object.defineProperty(navigator, "platform", {
        get: n
      })
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n["default"] = t
  }, function(e, n, t) {
    function i(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }

    function o() {
      if (!v) {
        v = document.createElement("div");
        var e = document.createElement("i");
        "dark" === __wxConfig.window.backgroundTextStyle ? e.style.backgroundImage = "url(" + l["default"] + ")" : e.style.backgroundImage = "url(" + A["default"] + ")", e.style.width = "32px", e.style.position = "absolute", e.style.height = "6px", e.style.left = "50%", e.style.bottom = "20px", e.style.backgroundRepeat = "no-repeat", e.style.marginLeft = "-16px", e.style.backgroundSize = "cover", v.appendChild(e), v.style.width = "100%", v.style.position = "fixed", v.style.top = "0px", v.style.backgroundColor = __wxConfig.window.backgroundColor, document.body.insertBefore(v, document.body.firstChild)
      }
    }

    function r() {
      window.addEventListener("touchstart", function(e) {
        0 == window.scrollY && (o(), y = !0, g = e.touches[0].pageY, window.document.body.style.transition = "all linear 0", v.style.transition = "all linear 0")
      }, !0)
    }

    function a() {
      window.addEventListener("touchmove", function(e) {
        y && __wxConfig.window.enablePullDownRefresh && (I = e.touches[0].pageY - g, I = Math.max(0, I), I = Math.min(p, I), window.document.body.style.marginTop = I + "px", v.style.height = I + "px")
      })
    }

    function d() {
      window.addEventListener("touchend", function(e) {
        y = !1, I > m ? ("function" == typeof h && h(), I = m, window.document.body.style.marginTop = I + "px", v.style.height = I + "px", setTimeout(s, 3e3)) : s()
      })
    }

    function s() {
      window.document.body.style.transition = "all linear 0.3s", window.document.body.style.marginTop = "0px", v && (v.style.transition = "all linear 0.3s", v.style.height = "0px")
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var u = t(3),
      c = t(7),
      l = i(c),
      f = t(8),
      A = i(f),
      p = 100,
      m = 50,
      y = !1,
      g = 0,
      I = 0,
      v = null,
      h = null;
    n["default"] = {
      register: function(e) {
        u.isWeapp && (u.isAndroid || u.isiPhone) && (h = e, r(), a(), d())
      },
      reset: s
    }
  }, function(e, n) {
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n["default"] = "data:image/gif;base64,R0lGODlhQAAMAMQZAPT09Orq6ubm5unp6dPT06ysrPz8/NbW1q+vr9fX1+vr687Ozv39/fr6+tXV1Z6ens3NzZ2dnZubm66urpycnKurq+Xl5czMzJmZmf///wAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphODFiMWQ5My0wMDIwLTRiYmItYjVlMS04YjI4NTFkMzMzMjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjFEQzRGRkU4NkU4MTFFNjkwOTg4NjNGN0JEMzY0OTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjFEQzRGRkQ4NkU4MTFFNjkwOTg4NjNGN0JEMzY0OTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDplY2RjM2MyNC03NDBkLTQ1NzMtOTc0Ni1iZGQ2MzhlMjEyYjUiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo3MGUzZDU2Ny1jZTk1LTExNzktYWFmZC04MmQ1NzRhYmI2YzIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQJFAAZACwAAAAAQAAMAAAFvmCWMQTyPAjBiGzrukOyLMnw3jegCIICtIACZkgs/HC3xuHCbB4ayJshYKlaA4aRkMgtZKOtZXPsALuo1nQgQ+C6MQSzaDCuX2xyQHpvASDeXAhyGQl2YwmDCnxpChKARBSDEIZNEIMCi1YCjo8YD5KUTAuXmVUCf52CcoWhiHKKpQptnXFydKF4ZnqlAAZbbxVfcg6UZYMZaHxrGUFvRscZSnYOUMdTysIkExEREyrQLAMHMwe54AABPAFHGSEAIfkECRQAGQAsAAAAAEAADAAABb9gJgKKICiAqK4syxDI8yAE097tkCxLMqyGgGVIDBhwOEABw2wWUshW43CpWg8NkZDIDURdy6a4cPyqqNa0IwPgui1QM0FMxxDMokF6fxko3lwKeBkIdWIIgwl8aQkCgEQCgxKGTRSDEItWEI6PFpF4k5QYD5eZVQt/nYJ4haKIeIqmCW2dcV9zond4eqY/W29egwZhdRVleA6ZaxlBwMd4SnVPgyJTfA5ZKgABJgG21C8TERETNdQrAwc8Bz8iIQAh+QQFFAAZACwAAAAAQAAMAAAFv2AmDsmyJIOormwLKIKgAG3dMgTyPAjBqI3DZUg8NGw2Q8DCbAYMyBqggKlaC7SMkMh1RFvLpjjwXTGo1nTBMOC6L6lyBiCuW7JlQnqPISTeXAlyGQp2YgqDCHxpCBCARBCDAoZNAoMSi1YUjo8XC5KUTJZymJkYD3+dgnKFoYhyiqYIbZ1xZXSheF96pgQZDo9egxlhdmSDBmh8FVBBbw5Hw0rGUMNTfFgrAwcmB7bDIgABMQG6wzgTERETPiIhADs="
  }, function(e, n) {
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n["default"] = "data:image/gif;base64,R0lGODlhQAAMAIABAP///////yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphODFiMWQ5My0wMDIwLTRiYmItYjVlMS04YjI4NTFkMzMzMjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0Q5MjI2RkE4NkU1MTFFNkFDRDc5Mjc3OTE2NjVFRTMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0Q5MjI2Rjk4NkU1MTFFNkFDRDc5Mjc3OTE2NjVFRTMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphODFiMWQ5My0wMDIwLTRiYmItYjVlMS04YjI4NTFkMzMzMjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6YTgxYjFkOTMtMDAyMC00YmJiLWI1ZTEtOGIyODUxZDMzMzIyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkECRQAAQAsAAAAAEAADAAAAkVMgInG7a7Wmy+CZhWlOe3ZLaH3YWEJnaOErhd6uCscj7Q8w+6Nn3re6nV4tp/QQvQFjxFaLeN8IqVNZzE5pbKi2SiVUQAAIfkECRQAAQAsAAAAAEAADAAAAkWMgWnL3QmBmy7KZSGlWe3aXeH1YSNZBqN6pkfrnjL6yS47h7cd53q/AvosO1hq2CkGj60l01kKQqM/ZYZBvGGvWpPGUAAAIfkEBRQAAQAsAAAAAEAADAAAAkWMgWnL7amcbBCuWufEVj+OHCDgfWDJjGqGBivZvm/rrrRsxzmKq/de6o1+Pp0QQxwah8Uk0smpnWjSKLVZDVFTrG02UgAAOw=="
  }, function(e, n) {
    function t(e, n, t, i) {
      var o = {
        to: e,
        msg: t,
        command: n,
        ext: i
      };
      o = JSON.parse(JSON.stringify(o)), window.parent.postMessage(o, "*")
    }

    function i() {
      var e = Math.random();
      return l[e] ? initMappingID() : e
    }

    function o() {
      window.EditBridge = f;
      var e = document.createEvent("UIEvent");
      e.initEvent("EditBridgeReady", !1, !1), document.dispatchEvent(e), t("contentscript", "SHAKE_HANDS", {})
    }

    function r() {
      "complete" === document.readyState ? o() : window.addEventListener("load", function(e) {
        o()
      })
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var a = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function(e) {
      return "undefined" == typeof e ? "undefined" : _typeof2(e)
    } : function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : "undefined" == typeof e ? "undefined" : _typeof2(e)
    };
    n["default"] = r, window.addEventListener("message", function(e) {
      var n = e.data;
      if (n && "object" === ("undefined" == typeof n ? "undefined" : a(n))) {
        var t = n.to;
        if ("webframe" === t) {
          var i = n.command,
            o = n.msg,
            r = n.ext;
          if ("RETURN_RES" === i) {
            var f = parseInt(o.ret),
              A = r.callID;
            0 === f ? l[A](null, o.res) : l[A](o.ret, {})
          } else if ("FILE_CHANGE" === i) {
            var p = o.eventType,
              m = o.fileName,
              y = o.info;
            d && d(p, m, y)
          } else "WINDOW_CHANGE" === i ? s && s(o.eventType) : "WEBVIEW_SHOW_CHANGE" === i ? u && u(o.editWebview) : "OPEN_FILE" === i && c && c(o)
        }
      }
    });
    var d, s, u, c, l = {},
      f = {};
    f.on = function(e, n) {
      "FILE_CHANGE" === e && (d = n), "WINDOW_CHANGE" === e && (s = n), "WEBVIEW_SHOW_CHANGE" === e && (u = n), "OPEN_FILE" === e && (c = n)
    }, f.getFileList = function(e, n) {
      var o = void 0,
        r = void 0;
      n ? (o = e, r = n) : (o = {}, r = e);
      var a = i();
      l[a] = r, t("backgroundjs", "GET_FILE_LIST", {
        options: o
      }, {
        callID: a
      })
    }, f.getFile = function(e, n) {
      var o = i();
      l[o] = n, t("backgroundjs", "GET_FILE_DATA", {
        path: e
      }, {
        callID: o
      })
    }, f.saveFile = function(e, n, o) {
      var r = i();
      l[r] = o, t("backgroundjs", "SAVE_FILE_DATA", {
        path: e,
        data: n
      }, {
        callID: r
      })
    }, f.addFile = function(e, n) {
      var o = i();
      l[o] = n, t("backgroundjs", "ADD_FILE", {
        path: e
      }, {
        callID: o
      })
    }, f.delFile = function(e, n) {
      var o = i();
      l[o] = n, t("backgroundjs", "DEL_FILE", {
        path: e
      }, {
        callID: o
      })
    }, f.rename = function(e, n, o) {
      var r = i();
      l[r] = o, t("backgroundjs", "RENAME_FILE", {
        oldPath: e,
        newPath: n
      }, {
        callID: r
      })
    }, f.mkdir = function(e, n) {
      var o = i();
      l[o] = n, t("backgroundjs", "MAKE_DIR", {
        path: e
      }, {
        callID: o
      })
    }, f.rmdir = function(e, n) {
      var o = i();
      l[o] = n, t("backgroundjs", "RM_DIR", {
        path: e
      }, {
        callID: o
      })
    }, f.getProjectInfo = function(e) {
      var n = i();
      l[n] = e, t("backgroundjs", "GET_PROJECT_INFO", {}, {
        callID: n
      })
    }, f.setEditWebview = function(e, n) {
      var o = i();
      l[o] = n, t("backgroundjs", "SET_EDIT_WEBVIEW", {
        editWebview: e
      }, {
        callID: o
      })
    }
  }])
});
