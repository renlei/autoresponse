var Fiddler_Resource = function () {
    "use strict";
    var e = {}, t = Fiddler.implement({}, Fiddler.CustEvent), n = 0;
    return Fiddler.mix(t, {
        clearResource: function () {
            e = {}
        }, add: function (t, r) {
            var i = t.requestId;
            t[r + "Time"] = t.timeStamp;
            if (i in e)for (var s in t)e[i][s] = t[s]; else e[i] = {}, Fiddler.mix(e[i], t);
            if (r == "onCompleted") {
                var o = e[i].type, u = e[i].method;
                o == "main_frame" && u == "GET" ? (n = i, e[i].parentRequestId = 0) : e[i].parentRequestId = n, e[i].size = 0;
                var a = e[i].responseHeaders || [];
                a.some(function (t) {
                    if (t.name == "Content-Length")return e[i].size = t.value, !0
                });
                var f = e[i].requestHeaders || [], l = "";
                f.some(function (e) {
                    if (e.name == "Cookie")return l = e.value, !0
                });
                if (l) {
                    e[i].cookieSize = l.length;
                    var c = {};
                    l = l.split(/;\s*/g), l.forEach(function (e) {
                        e = e.split("="), c[e[0]] = unescape(e[1])
                    }), e[i].cookieLength = l.length, e[i].cookie = c
                }
                var h = Fiddler.getUrlDetail(t.url);
                Fiddler.mix(e[i], h, !0), this.fire("onCompleted", e[i])
            }
        }, getItem: function (t) {
            return e[t] || {}
        }, getResoure: function () {
            return e
        }, getContent: function (t) {
            var n = when.defer(), r = e[t];
            return r.content ? n.resolve(r.content) : (Fiddler_File.getRemoteFile(t).then(function (r) {
                e[t].content = r, n.resolve(r)
            }), n.promise)
        }, setContent: function (t, n) {
            if (!n)return !1;
            var r = 0;
            for (var i in e)e[i].url === t && (r = i);
            r && (e[r].content = n, e[r].size = n.length)
        }, getImgRect: function (e, t, n) {
            n || (n = when.defer());
            var r = new Image, i = this;
            return r.onload = function () {
                n.resolve({width: this.width, height: this.height, old: e === t})
            }, r.onerror = function () {
                if (e != t)return i.getImgRect(t, t, n);
                n.resolve({width: this.width, height: this.height})
            }, r.src = e, n.promise
        }, getImgUrl: function (t) {
            var n = e[t], r = n.content, i = Fiddler.getFileExt(n.url);
            if (i && r) {
                var s = r.substr(100), o = /^[\w\+\/\=]+$/;
                return o.test(s) || (r = Base64.encode(r)), "data:image/" + i + ";base64," + r
            }
            return n.url
        }, getSize: function (t) {
            var n = when.defer(), r = e[t];
            if (r.size)return n.resolve(r.size);
            if (r.content)return e[t].size = r.content.length, n.resolve(e[t].size);
            var i = this;
            return this.getContent(t).then(function () {
                return i.getSize(t)
            }).then(function (e) {
                n.resolve(e)
            }), n.promise
        }, getQueryData: function (e) {
            var t = Fiddler.queryUrl(e) || {}, n = {data: null, length: 0};
            for (var r in t)t[r] && t[r].join && (t[r] = "[" + t[r].join(", ") + "]"), n.length++;
            return n.length && (n.data = t), n
        }
    }), t
}()