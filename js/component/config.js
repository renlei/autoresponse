var Fiddler_Config = function () {
    "use strict";
    var e = {encoding: "utf-8", enable_auto_response: !0, disable_cache: !1, rules: []}, t = "Fiddler";
    return {
        init: function () {
            this.loadConfig()
        }, clearRules: function () {
            e.rules = []
        }, getEncoding: function () {
            return e.encoding
        }, setEncoding: function (t) {
            return e.encoding = t, this
        }, getConfig: function (t) {
            return e[t] || ""
        }, setConfig: function (t, n) {
            e[t] = n, this.saveConfig()
        }, addRule: function (t) {
            e.rules.push(t), this.saveConfig()
        }, getRules: function () {
            return e.rules || []
        }, loadConfig: function () {
            var n = localStorage.getItem(t) || "{}";
            n = JSON.parse(n), Fiddler.mix(e, n, !0)
        }, saveConfig: function () {
            var n = JSON.stringify(e);
            localStorage.setItem(t, n)
        }
    }
}()