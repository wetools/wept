/*global WeixinJSBridge, __wxAppData, __wxConfig*/
"use strict";
!function() {
  function initMappingID() { }

  function e(e) {
    var o = JSON.parse(JSON.stringify(e));
    o.to = "backgroundjs", o.comefrom = "webframe", o.command = "COMMAND_FROM_ASJS", o.appid = W, o.appname = C, o.apphash = T, o.webviewID = L, window.top.postMessage(o, "*")
  }

  function o(e) {
    e.command = "COMMAND_FROM_ASJS", e.appid = W, e.appname = C, e.apphash = T, e.webviewID = L;
    var o = "____sdk____" + JSON.stringify(e);
    //  n = prompt(o);
    //n = JSON.parse(n), delete n.to, a(n)
    console.log('Ignored sdk call ' + JSON.stringify(o))
  }

  function n(e) {
    e.to = "contentscript", e.comefrom = "webframe", e.webviewID = L, window.top.postMessage(e, "*")
  }

  function r() {
    var e = Math.random();
    return z[e] ? initMappingID() : e
  }

  function t(n, t, a) {
    var i = r();
    z[i] = a;
    var s = /Sync$/.test(n),
      c = {
        sdkName: n,
        args: t,
        callbackID: i
      };
    s ? o(c) : e(c)
  }

  function a(o) {
    var n = o.command;
    delete o.command;
    var r = o.msg || {},
      t = o.ext || {};
    if ("WINDOW_GET_WEBAPP_ERROR" === n) {
      var a = r.fileName,
        i = r.errStr;
      return console.group("%c加载 " + a + " 错误", "color: red; font-size: x-large"), console.error("%c" + i, "color: red; font-size: x-large"), void console.groupEnd()
    }
    if ("MSG_FROM_WEBVIEW" === n || "GET_ASSDK_RES" === n) {
      var s = r.eventName || t.sdkName;
      J && (console.group(new Date + " GetMsg " + s), console.debug(s, r, t), console.groupEnd()), P.push({
        type: "GetMsg",
        eventName: s,
        data: [s, r, t],
        timesmap: new Date
      })
    }
    if ("MSG_FROM_WEBVIEW" === n) {
      var c = r.eventName,
        u = r.type,
        p = r.data || {};
      p.webviewId = r.webviewID, "ON_APPLIFECYCLE_EVENT" === u ? S(c, p) : "ON_MUSIC_EVENT" === u && A(c, p), WeixinJSBridge._subscribe[c] && WeixinJSBridge._subscribe[c](p, p.webviewId)
    } else if ("GET_ASSDK_RES" === n) {
      var d = t.callbackID;
      z[d](r), delete z[d]
    } else if ("GET_APP_DATA" === n) e({
      appData: __wxAppData,
      sdkName: "send_app_data"
    });
    else if ("WRITE_APP_DATA" === n)
      for (var l in r) {
        var g = r[l],
          f = g.__webviewId__;
        WeixinJSBridge.publish("appDataChange", {
          data: {
            data: g
          }
        }, [f], !0)
      }
  }

  function i(e, o) {
    if (O) return console.warn("请注意无 AppID 关联下，工具未检查安全域名，更多请参考文档-API-网络"), !0;
    try {
      for (var n = G.projectConfig, r = n.Network, t = "webscoket" === o ? r.WsRequestDomain : r.RequestDomain, a = 0; a < t.length; a++)
        if (0 === e.indexOf(t[a])) return !0
    } catch (i) {
      return console.error(i), !1
    }
  }

  function s(e, o, n) {
    if (H++, H > B) return H--, n && n({
      errMsg: "request:fail;"
    }), void console.error("%c 最多同时发起 " + B + " 个 wx.request 请求", "color: red; font-size: x-large");
    var r = o.url,
      t = o.header || {};
    if (!i(r)) return H--, n && n({
      errMsg: "request:fail;"
    }), void console.error("%c URL 域名不合法，请在 mp 后台配置后重试", "color: red; font-size: x-large");
    var a, s = new XMLHttpRequest,
      c = o.method || "POST",
      u = (o.complete, G.networkTimeout && G.networkTimeout.request);
    s.open(c, o.url, !0), s.onreadystatechange = function() {
      if (3 == s.readyState, 4 == s.readyState) {
        s.onreadystatechange = null;
        var e = s.status;
        0 == e ? n && n({
          errMsg: "request:fail"
        }) : n && n({
          errMsg: "request:ok",
          data: s.responseText,
          statusCode: e
        }), H--, a && clearTimeout(a)
      }
    };
    var p = !1;
    for (var d in t)
      if (t.hasOwnProperty(d)) {
        var l = d.toLowerCase();
        p = "content-type" == l || p, "cookie" === l ? s.setRequestHeader("_Cookie", t[d]) : s.setRequestHeader(d, t[d])
      }
      "POST" != c || p || s.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), s.setRequestHeader("X-Requested-With", "XMLHttpRequest"), "number" == typeof u && (a = setTimeout(function() {
      s.abort("timeout"), o.complete && o.complete(), o.complete = null, H--, n && n({
        errMsg: "request:fail"
      })
    }, u));
    var g = "string" == typeof o.data ? o.data : null;
    try {
      s.send(g)
    } catch (f) {
      H--, n && n({
        errMsg: "request:fail"
      })
    }
  }

  function c(e, o) {
    var n = $[e];
    n && o && n.push(o)
  }

  function u(e, o) {
    var n = $[e],
      r = !0,
      t = !1,
      a = void 0;
    try {
      for (var i, s = n[Symbol.iterator](); !(r = (i = s.next()).done); r = !0) {
        var c = i.value;
        c(o)
      }
    } catch (u) {
      t = !0, a = u
    } finally {
      try {
        !r && s["return"] && s["return"]()
      } finally {
        if (t) throw a
      }
    }
  }

  function p(e, o, n) {
    var r = o.url,
      t = o.header;
    if (!i(r, "webscoket")) return n && n({
      errMsg: "closeSocket:fail"
    }), void console.error("%c URL 域名不合法，请在 mp 后台配置后，重启项目继续测试", "color: red; font-size: x-large");
    K = new WebSocket(r);
    for (var a in t) t.hasOwnProperty(a);
    K.onopen = function() {
      u("open")
    }, K.onmessage = function(e) {
      u("message", {
        data: e.data
      })
    }, K.onclose = function(e) {
      u("close", e)
    }, K.onerror = function(e) {
      u("error", e)
    }, n && n({
      errMsg: "connectSocket:ok"
    })
  }

  function d(e, o, n) {
    K ? (K.close(), K = null, n && n({
      errMsg: "closeSocket:ok"
    })) : n && n({
      errMsg: "closeSocket:fail"
    })
  }

  function l(e, o, n) {
    var r = o.data;
    if (K) try {
      K.send(r), n && n({
        errMsg: "sendSocketMessage:ok"
      })
    } catch (t) {
      n && n({
        errMsg: "sendSocketMessage:fail," + t.message
      })
    } else n && n({
      errMsg: "sendSocketMessage:fail"
    })
  }

  function g(e, o) {
    c("open", o)
  }

  function f(e, o) {
    c("message", o)
  }

  function v(e, o) {
    c("error", o)
  }

  function w(e, o) {
    c("close", o)
  }

  function m(e, o) {
    var n = Y[e];
    n && o && n.push(o)
  }

  function S(e, o) {
    var n = Y[e],
      r = !0,
      t = !1,
      a = void 0;
      console.log(Y)
    try {
      for (var i, s = n[Symbol.iterator](); !(r = (i = s.next()).done); r = !0) {
        var c = i.value;
        c(o)
      }
    } catch (u) {
      t = !0, a = u
    } finally {
      try {
        !r && s["return"] && s["return"]()
      } finally {
        if (t) throw a
      }
    }
  }

  function h(e, o) {
    Y.onAppLaunch || (o && o({}), Y.onAppLaunch = !0)
  }

  function _(e, o) {
    m("onAppTerminate", o)
  }

  function b(e, o) {
    m("onAppRoute", o)
  }

  function ac(e, o) {
    console.log(e)
    console.log(o)
    m("onAccelerometerChange", o)
  }

  function y(e, o) {
    m("onAppEnterBackground", o)
  }

  function M(e, o) {
    Y.onAppShow || (o && o({}), Y.onAppShow = !0), m("onAppEnterForeground", o)
  }

  function k(e, o) {
    var n = Q[e];
    n && o && n.push(o)
  }

  function A(e, o) {
    var n = Q[e],
      r = !0,
      t = !1,
      a = void 0;
    try {
      for (var i, s = n[Symbol.iterator](); !(r = (i = s.next()).done); r = !0) {
        var c = i.value;
        c(o)
      }
    } catch (u) {
      t = !0, a = u
    } finally {
      try {
        !r && s["return"] && s["return"]()
      } finally {
        if (t) throw a
      }
    }
  }

  function D(e, o) {
    k("onMusicPlay", o)
  }

  function x(e, o) {
    k("onMusicPause", o)
  }

  function N(e, o) {
    k("onMusicEnd", o)
  }

  function E(e, o) {
    k("onMusicError", o)
  }

  function I(e, o, n) {
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
  }
  window.MutationObserver = window.WebKitMutationObserver = window.File = void 0;
  var T = __wxConfig.apphash,
    W = __wxConfig.appid,
    C = __wxConfig.appname,
    O = __wxConfig.isTourist,
    R = O ? Object.assign(__wxConfig.userInfo) : {};
  delete __wxConfig.userInfo;
  var B, J = !1,
    P = [],
    L = 100000,
    F = [],
    z = {},
    G = Object.assign({
      domain: [""],
      networkTimeout: {
        request: 3e4,
        connectSocket: 3e4,
        uploadFile: 3e4,
        downloadFile: 3e4
      }
    }, __wxConfig),
    H = 0,
    V = __wxConfig.appserviceConfig.AppserviceMaxDataSize;
  try {
    B = __wxConfig.projectConfig.Setting.MaxRequestConcurrent
  } catch (X) {
    console.error(X), B = 5
  }
  var U = {
      login: !0,
      authorize: !0,
      operateWXData: !0,
      getStorage: !0,
      setStorage: !0,
      clearStorage: !0,
      getStorageSync: !0,
      setStorageSync: !0,
      clearStorageSync: !0,
      getMusicPlayerState: !0,
      operateMusicPlayer: !0,
      navigateTo: !0,
      redirectTo: !0,
      navigateBack: !0,
      setNavigationBarTitle: !0,
      showNavigationBarLoading: !0,
      hideNavigationBarLoading: !0,
      enableAccelerometer: !0,
      getLocation: !0,
      openLocation: !0,
      getNetworkType: !0,
      getSystemInfo: !0,
      chooseContact: !0,
      chooseImage: !0,
      chooseVideo: !0,
      saveFile: !0
    },
    j = {
      login: !0,
      authorize: !0,
      operateWXData: !0
    };
  window._____sendMsgToNW = e, window.addEventListener("message", function(e) {
    var o = e.data,
      n = o.to;
    if ("appservice" === n) return delete n.appservice, "complete" !== document.readyState ? void F.push(o) : void a(o)
  }), window.WeixinJSBridge = {};
  var K = null,
    $ = {
      open: [],
      message: [],
      error: [],
      close: []
    },
    Y = {
      onAppLaunch: !1,
      onAppShow: !1,
      onAccelerometerChange: [],
      onAppTerminate: [],
      onAppRoute: [],
      onAppEnterBackground: [],
      onAppEnterForeground: []
    },
    Q = {
      onMusicPlay: [],
      onMusicPause: [],
      onMusicEnd: [],
      onMusicError: []
    };
  WeixinJSBridge._subscribe = {}, WeixinJSBridge.subscribe = function(e, o) {
    J && (console.group(new Date + " WeixinJSBridge subscribe"), console.debug(e, o), console.groupEnd()), P.push({
      type: "subscribe",
      eventName: e,
      data: arguments,
      timesmap: new Date
    }), WeixinJSBridge._subscribe[e] = o
  }, WeixinJSBridge.publish = function(o, n, r, t) {
    if (J && (console.group(new Date + " WeixinJSBridge publish " + o), console.debug(o, n, r, t), console.groupEnd()), n && 0 !== o.indexOf("canvas")) {
      var a = JSON.stringify(n),
        i = a.length;
      if (i > V) return void console.error("%c " + o + " 数据传输长度为 " + i + " 已经超过最大长度 " + V, "color: red; font-size: x-large")
    }
    P.push({
      type: "publish",
      eventName: o,
      data: arguments,
      timesmap: new Date
    }), "appDataChange" !== o && "pageInitData" !== o && "__updateAppData" !== o || t || e({
      appData: __wxAppData,
      sdkName: "send_app_data"
    }), e({
      eventName: o,
      data: n,
      sdkName: "publish",
      webviewIds: r
    })
  }, WeixinJSBridge.invoke = function(e, o, n) {
    return J && (console.group(new Date + " WeixinJSBridge invoke " + e), console.debug(e, o, n), console.groupEnd()), O && j[e] ? (console.warn("请注意无 AppID 关联下，调用 wx." + e + " 是受限的, API 的返回是工具的模拟返回"), void setTimeout(function() {
      "operateWXData" === e ? n({
        errMsg: "operateWXData:ok",
        data: {
          data: JSON.stringify({
            nickName: R.nickName,
            avatarUrl: R.headUrl,
            gender: "male" === R.sex ? 1 : 2,
            province: R.province,
            city: R.city,
            country: R.country
          })
        }
      }) : "login" === e ? n({
        errMsg: "login:ok",
        code: "the code is a mock one"
      }) : "authorize" === e && n({
        errMsg: "authorize:fail"
      })
    })) : (P.push({
      type: "invoke",
      eventName: e,
      data: arguments,
      timesmap: new Date
    }), U[e] ? void t(e, o, function(o) {
      if (o.errMsg.indexOf("ok") > -1 && ("navigateTo" === e || "redirectTo" === e)) {
        var r = o.url || "",
          t = r.match(/(([^\?]*)(\?([^\/]*))?)$/),
          a = "",
          i = {};
        if (t) {
          a = t[2] || "";
          for (var s = (t[4] || "").split("&"), c = 0; c < s.length; ++c) {
            var u = s[c].split("=");
            2 == u.length && (i[u[0]] = u[1])
          }
        }
        var p = e;
        S("onAppRoute", {
          path: a,
          query: i,
          openType: p,
          webviewId: o.webviewId
        })
      }
      n && n(o)
    }) : void("request" == e ? s(e, o, n) : "connectSocket" == e ? p(e, o, n) : "closeSocket" == e ? d(e, o, n) : "sendSocketMessage" == e ? l(e, o, n) : "openAddress" == e && I(e, o, n)))
  }, WeixinJSBridge.on = function(e, o) {
    J && (console.group(new Date + " WeixinJSBridge on " + e), console.debug(e, o), console.groupEnd()), P.push({
      type: "on",
      eventName: e,
      data: arguments,
      timesmap: new Date
    }), "onSocketOpen" == e ? g(e, o) : "onSocketError" == e ? v(e, o) : "onSocketMessage" == e ? f(e, o) : "onSocketClose" == e ? w(e, o) : "onAppLaunch" == e ? h(e, o) : "onAppTerminate" == e ? _(e, o) : "onAppRoute" == e ? b(e, o) : "onAppEnterBackground" == e ? y(e, o) : "onAppEnterForeground" == e ? M(e, o) : "onMusicPlay" == e ? D(e, o) : "onMusicPause" == e ? x(e, o) : "onMusicEnd" == e ? N(e, o) : "onMusicError" == e ? E(e, o) : "onAccelerometerChange" == e && ac(e, o)
  }, n({
    command: "SHAKE_HANDS"
  }), window.addEventListener("load", function() {
    F.forEach(function(e) {
      a(e)
    }), F = []
  })

  WeixinJSBridge.subscribe('reload', function (data) {
    var xhr = new XMLHttpRequest()
    var p = data.path
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var text = xhr.responseText
          var path = p.replace(/\.js$/, '')
          var func = new Function('window.__wxRoute="' + path + '";\n' +
          text)
          func()
        }
      }
    }
    xhr.open('GET', '/generateJavascript?path=' + encodeURIComponent(p))
    xhr.send()
  })
}();

