function addListener() {
    if (_initAdd)return !0;
    _initAdd = !0, chrome.devtools.network.onRequestFinished.addListener(function (e) {
        var t = e.request.url;
        if (!Fiddler.checkUrl(t))return !0;
        e.getContent(function (e) {
            var n = {method: "requestContent", url: t, content: e};
            chrome.runtime.sendMessage(n, function (e) {
            })
        })
    })
}
var _initAdd = !1;
chrome.runtime.sendMessage({method: "token", value: "devtools"}, function (e) {
    e.result == "ok" && addListener()
})