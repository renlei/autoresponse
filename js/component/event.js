var Fiddler_Event = function () {
    "use strict";
    function e(e) {
        chrome.webRequest.MAX_HANDLER_BEHAVIOR_CHANGED_CALLS_PER_10_MINUTES = 1e4, chrome.webRequest.onBeforeRequest.addListener(function (e) {
            if (!Fiddler.checkUrl(e.url))return {};
            var t = Fiddler_Rule.fireSome("onBeforeRequest", e);
            if (t)return t
        }, {urls: ["<all_urls>"]}, ["blocking", "requestBody"]), chrome.webRequest.onBeforeSendHeaders.addListener(function (e) {
            if (!Fiddler.checkUrl(e.url))return {};
            var t = Fiddler_Rule.fireMerge("onBeforeSendHeaders", e);
            if (t)return t.cancel ? {cancel: !0} : {requestHeaders: t.requestHeaders}
        }, {urls: ["<all_urls>"]}, ["blocking", "requestHeaders"]), chrome.webRequest.onCompleted.addListener(function (t) {
            t.type == "main_frame" && e && e();
            if (!Fiddler.checkUrl(t.url))return {};
            Fiddler_Rule.fire("onCompleted", t)
        }, {urls: ["<all_urls>"]}, ["responseHeaders"])
    }

    return {init: e}
}()