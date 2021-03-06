var Fiddler_File = function () {
    "use strict";
    function e(e, t) {
        return t == "script" && (e = e.replace(/[\u0080-\uffff]/g, function (e) {
            var t = e.charCodeAt(0).toString(16);
            return "\\u" + (new Array(5 - t.length)).join("0") + t
        })), t != "main_frame" && (e = encodeURIComponent(e)), e
    }

    function t(e) {
        var t = {
            image: "image/png",
            script: "text/javascript",
            stylesheet: "text/css",
            main_frame: "text/html",
            sub_frame: "text/html"
        };
        return t[e] || "text/plain"
    }

    return {
        getLocalFile: function (n, r, i) {
            var s = new XMLHttpRequest;
            s.open("GET", n, !1), s.send(null);
            var o = s.responseText || s.responseXML;
            if (!o)return !1;
            var u = t(i);
            return r && (o = "data:" + u + "; " + r + "," + e(o, i)), o
        }, checkFileExist: function (e) {
            return !!this.getLocalFile(e)
        }, getRemoteFile: function (e) {
            var t = Fiddler_Resource.getItem(e), n = t.url;
            n.indexOf("?") == -1 ? n += "?fiddler=" + e : n += "&fiddler=" + e;
            var r = t.method, i = when.defer();
            return $.ajax({
                url: n, method: r, complete: function (e) {
                    e = e.responseText || e.responseXML, i.resolve(e)
                }
            }), i.promise
        }
    }
}()