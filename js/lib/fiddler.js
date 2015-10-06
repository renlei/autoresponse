var Fiddler = function () {
    var e = {};
    return e.isJson = function (e) {
        try {
            return JSON.parse(e), !0
        } catch (t) {
            return !1
        }
        return !1
    }, e.isJsonp = function (e) {
        e = e.trim();
        var t = /^[\w\.]+\s*\(.*\);?$/;
        return t.test(e)
    }, e.getFileExt = function (e) {
        e.indexOf("?") > -1 && (e = e.substr(0, e.indexOf("?")));
        var t = e.lastIndexOf(".");
        return e.substr(t + 1)
    }, e.checkUrl = function (e) {
        return e = e || "", e.indexOf("?fiddler=") > -1 || e.indexOf("&fiddler=") > -1 ? !1 : e.indexOf("http://") == 0 || e.indexOf("https://") == 0 ? !0 : !1
    }, e.queryUrl = function (e, t) {
        if (e.indexOf("?") == -1)return {};
        e = e.replace(/^[^?=]*\?/ig, "").split("#")[0];
        var n = {};
        return e.replace(/(^|&)([^&=]+)=([^&]*)/g, function (e, t, r, i) {
            try {
                r = decodeURIComponent(r)
            } catch (s) {
            }
            try {
                i = decodeURIComponent(i)
            } catch (s) {
            }
            r in n ? n[r]instanceof Array ? n[r].push(i) : n[r] = [n[r], i] : n[r] = /\[\]$/.test(r) ? [i] : i
        }), t ? n[t] : n
    }, e.bindEvent = function (e, t) {
        e = $(e);
        for (var n in t) {
            var r = t[n];
            if (typeof r == "function") {
                var i = {};
                i.click = r, r = i
            }
            for (var s in r)e.delegate(n, s, r[s])
        }
    }, e.pathAdd = function (e, t) {
        return e.substr(e.length - 1) == "/" && (e = e.substr(0, e.length - 1)), t.substr(0, 1) == "/" && (t = t.substr(1)), e + "/" + t
    }, e.urlAdd = function (e, t) {
        return e + "/" + t
    }, e.truncate = function (e, t, n) {
        return n = n || "...", e.length > t ? e.substr(0, t) + n : e
    }, e.truncateCenter = function (e, t, n) {
        n = n || "...";
        if (e.length > t) {
            var r = parseInt(t / 2), i = t - r;
            return e.substr(0, r) + n + e.substr(e.length - i)
        }
        return e
    }, e.getHumanSize = function (e) {
        e |= 0;
        var t = [[1048576, "MB"], [1024, "KB"], [1, "B"]], n = "";
        return t.some(function (t) {
            if (e > t[0])return n = (e / t[0]).toFixed(1) + t[1], !0
        }), n || e
    }, e.getUrlDetail = function (e) {
        var t = document.createElement("a");
        return t.href = e, {
            protocol: t.protocol,
            host: t.protocol + "//" + t.hostname + (t.port ? ":" + t.port : ""),
            path: t.pathname
        }
    }, e.delay = function (e) {
        var t = new Date * 1;
        for (; ;) {
            var n = new Date * 1, r = n - t;
            if (r >= e)return this
        }
        return this
    }, e.mix = function (e, t, n) {
        n = n || function (e, t) {
            if (typeof e == "undefined")return t
        }, n == 1 && (n = function (e, t) {
            return t
        });
        for (var r in t) {
            var i = n(e[r], t[r], r, e, t);
            typeof i != "undefined" && (e[r] = i)
        }
        return e
    }, e.CustEvent = function () {
        var e = {};
        return {
            on: function (t, n) {
                if (typeof t == "object") {
                    for (var r in t)this.on(r, t[r]);
                    return
                }
                e[t] = e[t] || [], e[t].push(n)
            }, un: function (t, n) {
                if (typeof t == "object") {
                    for (var r in t)this.un(r, t[r]);
                    return
                }
                var i = e[t] || [];
                i.some(function (e, t) {
                    if (e == n)return i.splice(t, 1), !0
                })
            }, clear: function (t) {
                var n = e[t] || [];
                n.length = 0
            }, clearAll: function () {
                e = {}
            }, fire: function (t, n) {
                n = n || {};
                var r = {
                    data: n, type: t, target: this, returnValue: !0, preventDefault: function () {
                        n.returnValue = !1
                    }
                }, i = e[t] || [];
                return i = i.concat(e["*"] || []), i.forEach(function (e) {
                    e(r)
                }), r.returnValue
            }, fireSome: function (t, n) {
                n = n || {};
                var r = {data: n, type: t, target: this}, i = e[t] || [];
                i = i.concat(e["*"] || []);
                var s = null;
                return i.some(function (e) {
                    var t = e(r);
                    if (t)return s = t, !0
                }), s
            }, fireMerge: function (t, n) {
                n = n || {};
                var r = {data: n, type: t, target: this}, i = e[t] || [];
                return i = i.concat(e["*"] || []), i.forEach(function (e) {
                    var t = e(r);
                    t && (r.data = t)
                }), r.data
            }
        }
    }, e.implement = function (t, n) {
        return typeof n == "function" && (n = n(e)), e.mix(t, n, !0)
    }, e.encode4Html = function (e) {
        var t = document.createElement("pre"), n = document.createTextNode(e);
        return t.appendChild(n), t.innerHTML
    }, e.tmpl = function () {
        var e = {}, t = "sArrCMX", n = t + '.push("', r = {
            "=": {
                tagG: "=",
                isBgn: 1,
                isEnd: 1,
                sBgn: '",Fiddler.encode4Html(',
                sEnd: '),"'
            },
            js: {tagG: "js", isBgn: 1, isEnd: 1, sBgn: '");', sEnd: ";" + n},
            js: {tagG: "js", isBgn: 1, isEnd: 1, sBgn: '");', sEnd: ";" + n},
            "if": {tagG: "if", isBgn: 1, rlt: 1, sBgn: '");if', sEnd: "{" + n},
            elseif: {tagG: "if", cond: 1, rlt: 1, sBgn: '");} else if', sEnd: "{" + n},
            "else": {tagG: "if", cond: 1, rlt: 2, sEnd: '");}else{' + n},
            "/if": {tagG: "if", isEnd: 1, sEnd: '");}' + n},
            "for": {tagG: "for", isBgn: 1, rlt: 1, sBgn: '");for', sEnd: "{" + n},
            "/for": {tagG: "for", isEnd: 1, sEnd: '");}' + n},
            "while": {tagG: "while", isBgn: 1, rlt: 1, sBgn: '");while', sEnd: "{" + n},
            "/while": {tagG: "while", isEnd: 1, sEnd: '");}' + n}
        };
        return function (i, s) {
            var o = e[i];
            if (!o) {
                var u = -1, a = [], f = [[/\{strip\}([\s\S]*?)\{\/strip\}/g, function (e, t) {
                    return t.replace(/[\r\n]\s*\}/g, " }").replace(/[\r\n]\s*/g, "")
                }], [/\\/g, "\\\\"], [/"/g, '\\"'], [/\r/g, "\\r"], [/\n/g, "\\n"], [/\{[\s\S]*?\S\}/g, function (e) {
                    e = e.substr(1, e.length - 2);
                    for (var t = 0; t < l.length; t++)e = e.replace(l[t][0], l[t][1]);
                    var n = e;
                    /^(=|.\w+)/.test(n) && (n = RegExp.$1);
                    var i = r[n];
                    if (i) {
                        if (i.isBgn)var s = a[++u] = {tagG: i.tagG, rlt: i.rlt};
                        if (i.isEnd) {
                            if (u < 0)throw new Error("Unexpected Tag: " + e);
                            s = a[u--];
                            if (s.tagG != i.tagG)throw new Error("Unmatch Tags: " + s.tagG + "--" + n)
                        } else if (!i.isBgn) {
                            if (u < 0)throw new Error("Unexpected Tag:" + e);
                            s = a[u];
                            if (s.tagG != i.tagG)throw new Error("Unmatch Tags: " + s.tagG + "--" + n);
                            if (i.cond && !(i.cond & s.rlt))throw new Error("Unexpected Tag: " + n);
                            s.rlt = i.rlt
                        }
                        return (i.sBgn || "") + e.substr(n.length) + (i.sEnd || "")
                    }
                    return '",(' + e + '),"'
                }]], l = [[/\\n/g, "\n"], [/\\r/g, "\r"], [/\\"/g, '"'], [/\\\\/g, "\\"], [/\$(\w+)/g, 'opts["$1"]'], [/print\(/g, t + ".push("]];
                for (var c = 0; c < f.length; c++)i = i.replace(f[c][0], f[c][1]);
                if (u >= 0)throw new Error("Lose end Tag: " + a[u].tagG);
                i = i.replace(/##7b/g, "{").replace(/##7d/g, "}").replace(/##23/g, "#"), i = "var " + t + "=[];" + n + i + '");return ' + t + '.join("");', e[i] = o = new Function("opts", i)
            }
            return arguments.length > 1 ? o(s) : o
        }
    }(), e
}()