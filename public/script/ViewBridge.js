"use strict";
// WeixinJSBridge for view part
!function () {
  function n(e, n, t, i) {
    var o = {
      to: e,
      msg: n,
      command: t,
      ext: i || {}
    };
    o.comefrom = "webframe", o.webviewID = d;
    // send message to socket
    window.top.postMessage(JSON.parse(JSON.stringify(o)), '*')
  }

  function t(e) {
    var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
      i = !(arguments.length <= 2 || void 0 === arguments[2]) && arguments[2],
      o = {
        sdkName: e,
        args: t
      },
      r = {
        isOn: i,
        url: location.href,
        title: document.title,
        desc: document.title,
        img_url: document.images.length ? document.images[0].src : l,
        link: void 0
      };
    n("backgroundjs", o, m, r)
  }

  function i(e) {
    var n = e.type,
      t = e.sdkName;
    if ("REGISTER_SDK" === n) console.info("[JSSDK Info] 注册 %c %s", "color:blue", t);
    else {
      var i = e.isErr;
      if (i) {
        var o = b[t] || t;
        if (!I[o]) return;
        console.error("[JSSDK Error] %s \ninput %s;\noutput %s", t, JSON.stringify(e.inputArgs || {}), JSON.stringify(e.sdkRes || {}))
      } else console.info("[JSSDK Info]%c %s %c \ninput %c %s; %c \noutput %c %s", "color:blue", t, "color:black", "color:purple", JSON.stringify(e.inputArgs || {}), "color:black", "color:purple", JSON.stringify(e.sdkRes || {}))
    }
  }

  function o(e, n) {
    I[e] && I[e].fn ? I[e].fn(n) : S[e] && t(S[e])
  }

  function r(e, n) {
    window.WeixinJSBridge ? o(e, n) : document.addEventListener("WeixinJSBridgeReady", function() {
      o(e, n)
    })
  }

  function a(e) {
    var n = (e.data, e.eventName);
    h._subscribe[n] && h._subscribe[n](e.data)
  }

  function initWeixinJSBridge() {
    window.WeixinJSBridge = h;
    var e = document.createEvent("UIEvent");
    // publish WeixinJSBridgeReady event
    // SHAKE_HANDS
    e.initEvent("WeixinJSBridgeReady", !1, !1), document.dispatchEvent(e), n("contentscript", {}, p)
    //h.subscribe('reload', function (data) {
    //  console.log(data)
    //})
  }

  var ua = window.navigator.userAgent,
    d = parseInt(ua.match(/webview\/(\d*)/)[1]),
    u = false,
    f = true,
    l = "http://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRt8Qia4lv7k3M9J1SKqKCImxJCt7j9rHYicKDI45jRPBxdzdyREWnk0ia0N5TMnMfth7SdxtzMvVgXg/0",
    m = "EXEC_JSSDK",
    v = "TO_APP_SERVICE",
    p = "SHAKE_HANDS",
    g = "COMMAND_GET_TITLE",
    E = {
      reportKeyValue: !0,
      initReady: !0,
      reportIDKey: !0,
      systemLog: !0
    },
    S = {
      "menu:share:timeline": "shareTimeline",
      "menu:share:appmessage": "sendAppMessage",
      "menu:share:qq": "shareQQ",
      "menu:share:weiboApp": "shareWeiboApp",
      "menu:share:QZone": "shareQZone"
    },
    b = {
      shareTimeline: "menu:share:timeline",
      sendAppMessage: "menu:share:appmessage",
      shareQQ: "menu:share:qq",
      shareWeiboApp: "menu:share:weiboApp",
      shareQZone: "menu:share:QZone",
      config: "preVerifyJSAPI"
    };

  var h = {},
    I = h._debugCache = {},
    _ = h._subscribe = {};
  h.invoke = function(e, n, i) {
    E[e] || /^__sys/.test || (I[e] = {
      fn: i
    }, t(e, n))
  }, h.on = function(e, n) {
    I[e] = {
      fn: n
    }, t(e, {}, !0)
  }, h.call = function() {
    console.error("WeixinJSBridge.call 不被支持，请参考 http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html 进行正确调用")
  }, h.log = function(e) {
    console.log(e)
  }, h.publish = function(e, t) {
    var i = {
      eventName: e,
      data: t
    };
    n("backgroundjs", i, v)
  }, h.subscribe = function(e, n) {
    _[e] = n
  }

  window.addEventListener('message', function (e) {
    var t = e.data,
    o = t.msg;

    if ("object" === ("undefined" == typeof t ? "undefined" : typeof t)) {
      var c = t.command;
      if ("CUSTOM" === c) return void a(o)
      if ("webframe" === t.to && c && d === t.webviewID && "INIT_DEVTOOLS_SUCCESS" !== c) {
        if ("MSG_FROM_APPSERVICE" === c || "CUSTOM" === c) return void a(o);
        if ("COMMAND_GET_TITLE" === c) {
          var s = {
            title: document.title
          };
          return void n("backgroundjs", s, g)
        }
        var f = o.sdkName,
          l = o.res || {};
        u && ("checkJsApi" === f ? l.checkResult = JSON.stringify(l.checkResult) : "chooseImage" === f && (l.localIds = JSON.stringify(l.localIds))), "GET_JSSDK_RES" === c || "INVOKE_SDK" === c ? r(f, l) : "SHOW_CONSOLE_LOG" === c && i(o)
      }
    }
  })

  "complete" === document.readyState ? initWeixinJSBridge() : window.addEventListener("load", function() {
    initWeixinJSBridge()
  })
}()
