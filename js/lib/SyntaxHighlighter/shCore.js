var XRegExp;
if (XRegExp)throw Error("can't load XRegExp twice in the same frame");
(function () {
    function e(e, n) {
        if (!XRegExp.isRegExp(e))throw TypeError("type RegExp expected");
        var r = e._xregexp;
        return e = XRegExp(e.source, t(e) + (n || "")), r && (e._xregexp = {
            source: r.source,
            captureNames: r.captureNames ? r.captureNames.slice(0) : null
        }), e
    }

    function t(e) {
        return (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.extended ? "x" : "") + (e.sticky ? "y" : "")
    }

    function n(e, t, n, r) {
        var i = a.length, s, o, f;
        u = !0;
        try {
            for (; i--;) {
                f = a[i];
                if (n & f.scope && (!f.trigger || f.trigger.call(r))) {
                    f.pattern.lastIndex = t;
                    if ((o = f.pattern.exec(e)) && o.index === t) {
                        s = {output: f.handler.call(r, o, n), match: o};
                        break
                    }
                }
            }
        } catch (l) {
            throw l
        } finally {
            u = !1
        }
        return s
    }

    function r(e, t, n) {
        if (Array.prototype.indexOf)return e.indexOf(t, n);
        for (n = n || 0; n < e.length; n++)if (e[n] === t)return n;
        return -1
    }

    XRegExp = function (t, r) {
        var i = [], o = XRegExp.OUTSIDE_CLASS, a = 0, l, c;
        if (XRegExp.isRegExp(t)) {
            if (r !== undefined)throw TypeError("can't supply flags when constructing one RegExp from another");
            return e(t)
        }
        if (u)throw Error("can't call the XRegExp constructor within token definition functions");
        r = r || "";
        for (l = {
            hasNamedCapture: !1, captureNames: [], hasFlag: function (e) {
                return r.indexOf(e) > -1
            }, setFlag: function (e) {
                r += e
            }
        }; a < t.length;)(c = n(t, a, o, l)) ? (i.push(c.output), a += c.match[0].length || 1) : (c = f.exec.call(d[o], t.slice(a))) ? (i.push(c[0]), a += c[0].length) : (c = t.charAt(a), c === "[" ? o = XRegExp.INSIDE_CLASS : c === "]" && (o = XRegExp.OUTSIDE_CLASS), i.push(c), a++);
        return i = RegExp(i.join(""), f.replace.call(r, s, "")), i._xregexp = {
            source: t,
            captureNames: l.hasNamedCapture ? l.captureNames : null
        }, i
    }, XRegExp.version = "1.5.0", XRegExp.INSIDE_CLASS = 1, XRegExp.OUTSIDE_CLASS = 2;
    var i = /\$(?:(\d\d?|[$&`'])|{([$\w]+)})/g, s = /[^gimy]+|([\s\S])(?=[\s\S]*\1)/g, o = /^(?:[?*+]|{\d+(?:,\d*)?})\??/, u = !1, a = [], f = {
        exec: RegExp.prototype.exec,
        test: RegExp.prototype.test,
        match: String.prototype.match,
        replace: String.prototype.replace,
        split: String.prototype.split
    }, l = f.exec.call(/()??/, "")[1] === undefined, c = function () {
        var e = /^/g;
        return f.test.call(e, ""), !e.lastIndex
    }(), h = function () {
        var e = /x/g;
        return f.replace.call("x", e, ""), !e.lastIndex
    }(), p = RegExp.prototype.sticky !== undefined, d = {};
    d[XRegExp.INSIDE_CLASS] = /^(?:\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S]))/, d[XRegExp.OUTSIDE_CLASS] = /^(?:\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S])|\(\?[:=!]|[?*+]\?|{\d+(?:,\d*)?}\??)/, XRegExp.addToken = function (t, n, r, i) {
        a.push({pattern: e(t, "g" + (p ? "y" : "")), handler: n, scope: r || XRegExp.OUTSIDE_CLASS, trigger: i || null})
    }, XRegExp.cache = function (e, t) {
        var n = e + "/" + (t || "");
        return XRegExp.cache[n] || (XRegExp.cache[n] = XRegExp(e, t))
    }, XRegExp.copyAsGlobal = function (t) {
        return e(t, "g")
    }, XRegExp.escape = function (e) {
        return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
    }, XRegExp.execAt = function (t, n, r, i) {
        return n = e(n, "g" + (i && p ? "y" : "")), n.lastIndex = r = r || 0, t = n.exec(t), i ? t && t.index === r ? t : null : t
    }, XRegExp.freezeTokens = function () {
        XRegExp.addToken = function () {
            throw Error("can't run addToken after freezeTokens")
        }
    }, XRegExp.isRegExp = function (e) {
        return Object.prototype.toString.call(e) === "[object RegExp]"
    }, XRegExp.iterate = function (t, n, r, i) {
        for (var s = e(n, "g"), o = -1, u; u = s.exec(t);)r.call(i, u, ++o, t, s), s.lastIndex === u.index && s.lastIndex++;
        n.global && (n.lastIndex = 0)
    }, XRegExp.matchChain = function (t, n) {
        return function r(t, i) {
            var s = n[i].regex ? n[i] : {regex: n[i]}, o = e(s.regex, "g"), u = [], a;
            for (a = 0; a < t.length; a++)XRegExp.iterate(t[a], o, function (e) {
                u.push(s.backref ? e[s.backref] || "" : e[0])
            });
            return i === n.length - 1 || !u.length ? u : r(u, i + 1)
        }([t], 0)
    }, RegExp.prototype.apply = function (e, t) {
        return this.exec(t[0])
    }, RegExp.prototype.call = function (e, t) {
        return this.exec(t)
    }, RegExp.prototype.exec = function (e) {
        var n = f.exec.apply(this, arguments), i;
        if (n) {
            !l && n.length > 1 && r(n, "") > -1 && (i = RegExp(this.source, f.replace.call(t(this), "g", "")), f.replace.call(e.slice(n.index), i, function () {
                for (var e = 1; e < arguments.length - 2; e++)arguments[e] === undefined && (n[e] = undefined)
            }));
            if (this._xregexp && this._xregexp.captureNames)for (var s = 1; s < n.length; s++)if (i = this._xregexp.captureNames[s - 1])n[i] = n[s];
            !c && this.global && !n[0].length && this.lastIndex > n.index && this.lastIndex--
        }
        return n
    }, c || (RegExp.prototype.test = function (e) {
        return (e = f.exec.call(this, e)) && this.global && !e[0].length && this.lastIndex > e.index && this.lastIndex--, !!e
    }), String.prototype.match = function (e) {
        XRegExp.isRegExp(e) || (e = RegExp(e));
        if (e.global) {
            var t = f.match.apply(this, arguments);
            return e.lastIndex = 0, t
        }
        return e.exec(this)
    }, String.prototype.replace = function (e, t) {
        var n = XRegExp.isRegExp(e), s, o;
        return n && typeof t.valueOf() == "string" && t.indexOf("${") === -1 && h ? f.replace.apply(this, arguments) : (n ? e._xregexp && (s = e._xregexp.captureNames) : e += "", typeof t == "function" ? o = f.replace.call(this, e, function () {
            if (s) {
                arguments[0] = new String(arguments[0]);
                for (var r = 0; r < s.length; r++)s[r] && (arguments[0][s[r]] = arguments[r + 1])
            }
            return n && e.global && (e.lastIndex = arguments[arguments.length - 2] + arguments[0].length), t.apply(null, arguments)
        }) : (o = this + "", o = f.replace.call(o, e, function () {
            var e = arguments;
            return f.replace.call(t, i, function (t, n, i) {
                if (!n)return n = +i, n <= e.length - 3 ? e[n] : (n = s ? r(s, i) : -1, n > -1 ? e[n + 1] : t);
                switch (n) {
                    case"$":
                        return "$";
                    case"&":
                        return e[0];
                    case"`":
                        return e[e.length - 1].slice(0, e[e.length - 2]);
                    case"'":
                        return e[e.length - 1].slice(e[e.length - 2] + e[0].length);
                    default:
                        i = "", n = +n;
                        if (!n)return t;
                        for (; n > e.length - 3;)i = String.prototype.slice.call(n, -1) + i, n = Math.floor(n / 10);
                        return (n ? e[n] || "" : "$") + i
                }
            })
        })), n && e.global && (e.lastIndex = 0), o)
    }, String.prototype.split = function (e, t) {
        if (!XRegExp.isRegExp(e))return f.split.apply(this, arguments);
        var n = this + "", r = [], i = 0, s, o;
        if (t === undefined || +t < 0)t = Infinity; else {
            t = Math.floor(+t);
            if (!t)return []
        }
        for (e = XRegExp.copyAsGlobal(e); s = e.exec(n);) {
            if (e.lastIndex > i) {
                r.push(n.slice(i, s.index)), s.length > 1 && s.index < n.length && Array.prototype.push.apply(r, s.slice(1)), o = s[0].length, i = e.lastIndex;
                if (r.length >= t)break
            }
            e.lastIndex === s.index && e.lastIndex++
        }
        return i === n.length ? (!f.test.call(e, "") || o) && r.push("") : r.push(n.slice(i)), r.length > t ? r.slice(0, t) : r
    }, XRegExp.addToken(/\(\?#[^)]*\)/, function (e) {
        return f.test.call(o, e.input.slice(e.index + e[0].length)) ? "" : "(?:)"
    }), XRegExp.addToken(/\((?!\?)/, function () {
        return this.captureNames.push(null), "("
    }), XRegExp.addToken(/\(\?<([$\w]+)>/, function (e) {
        return this.captureNames.push(e[1]), this.hasNamedCapture = !0, "("
    }), XRegExp.addToken(/\\k<([\w$]+)>/, function (e) {
        var t = r(this.captureNames, e[1]);
        return t > -1 ? "\\" + (t + 1) + (isNaN(e.input.charAt(e.index + e[0].length)) ? "" : "(?:)") : e[0]
    }), XRegExp.addToken(/\[\^?]/, function (e) {
        return e[0] === "[]" ? "\\b\\B" : "[\\s\\S]"
    }), XRegExp.addToken(/^\(\?([imsx]+)\)/, function (e) {
        return this.setFlag(e[1]), ""
    }), XRegExp.addToken(/(?:\s+|#.*)+/, function (e) {
        return f.test.call(o, e.input.slice(e.index + e[0].length)) ? "" : "(?:)"
    }, XRegExp.OUTSIDE_CLASS, function () {
        return this.hasFlag("x")
    }), XRegExp.addToken(/\./, function () {
        return "[\\s\\S]"
    }, XRegExp.OUTSIDE_CLASS, function () {
        return this.hasFlag("s")
    })
})(), typeof exports != "undefined" && (exports.XRegExp = XRegExp);
var SyntaxHighlighter = function () {
    function e(e, t) {
        e.className.indexOf(t) != -1 || (e.className += " " + t)
    }

    function t(e) {
        return e.indexOf("highlighter_") == 0 ? e : "highlighter_" + e
    }

    function n(e) {
        return m.vars.highlighters[t(e)]
    }

    function r(e, t, n) {
        if (e == null)return null;
        var i = n != 1 ? e.childNodes : [e.parentNode], s = {
                "#": "id",
                ".": "className"
            }[t.substr(0, 1)] || "nodeName", o, u;
        o = s != "nodeName" ? t.substr(1) : t.toUpperCase();
        if ((e[s] || "").indexOf(o) != -1)return e;
        for (e = 0; i && e < i.length && u == null; e++)u = r(i[e], t, n);
        return u
    }

    function i(e, t) {
        var n = {}, r;
        for (r in e)n[r] = e[r];
        for (r in t)n[r] = t[r];
        return n
    }

    function s(e, t, n, r) {
        function i(e) {
            e = e || window.event, e.target || (e.target = e.srcElement, e.preventDefault = function () {
                this.returnValue = !1
            }), n.call(r || window, e)
        }

        e.attachEvent ? e.attachEvent("on" + t, i) : e.addEventListener(t, i, !1)
    }

    function o(e, t) {
        var n = m.vars.discoveredBrushes, r = null;
        if (n == null) {
            n = {};
            for (var i in m.brushes) {
                var s = m.brushes[i];
                r = s.aliases;
                if (r != null) {
                    s.brushName = i.toLowerCase();
                    for (s = 0; s < r.length; s++)n[r[s]] = i
                }
            }
            m.vars.discoveredBrushes = n
        }
        return r = m.brushes[n[e]], r == null && t != 0 && window.alert(m.config.strings.alert + (m.config.strings.noBrush + e)), r
    }

    function u(e, t) {
        for (var n = e.split("\n"), r = 0; r < n.length; r++)n[r] = t(n[r], r);
        return n.join("\n")
    }

    function a(e, t) {
        return e == null || e.length == 0 || e == "\n" ? e : (e = e.replace(/</g, "&lt;"), e = e.replace(/ {2,}/g, function (e) {
            for (var t = "", n = 0; n < e.length - 1; n++)t += m.config.space;
            return t + " "
        }), t != null && (e = u(e, function (e) {
            if (e.length == 0)return "";
            var n = "";
            return e = e.replace(/^(&nbsp;| )+/, function (e) {
                return n = e, ""
            }), e.length == 0 ? n : n + '<code class="' + t + '">' + e + "</code>"
        })), e)
    }

    function f(e, t) {
        e.split("\n");
        for (var n = "", r = 0; r < 50; r++)n += "                    ";
        return e = u(e, function (e) {
            if (e.indexOf("	") == -1)return e;
            for (var r = 0; (r = e.indexOf("	")) != -1;)e = e.substr(0, r) + n.substr(0, t - r % t) + e.substr(r + 1, e.length);
            return e
        })
    }

    function l(e) {
        return e.replace(/^\s+|\s+$/g, "")
    }

    function c(e, t) {
        return e.index < t.index ? -1 : e.index > t.index ? 1 : e.length < t.length ? -1 : e.length > t.length ? 1 : 0
    }

    function h(e, t) {
        function n(e) {
            return e[0]
        }

        for (var r = null, i = [], s = t.func ? t.func : n; (r = t.regex.exec(e)) != null;) {
            var o = s(r, t);
            typeof o == "string" && (o = [new m.Match(o, r.index, t.css)]), i = i.concat(o)
        }
        return i
    }

    function p(e) {
        var t = /(.*)((&gt;|&lt;).*)/;
        return e.replace(m.regexLib.url, function (e) {
            var n = "", r = null;
            if (r = t.exec(e))e = r[1], n = r[2];
            return '<a href="' + e + '">' + e + "</a>" + n
        })
    }

    function d() {
        for (var e = document.getElementsByTagName("script"), t = [], n = 0; n < e.length; n++)e[n].type == "syntaxhighlighter" && t.push(e[n]);
        return t
    }

    function v(t) {
        t = t.target;
        var i = r(t, ".syntaxhighlighter", !0);
        t = r(t, ".container", !0);
        var o = document.createElement("textarea");
        if (!(!t || !i || r(t, "textarea"))) {
            n(i.id), e(i, "source");
            for (var u = t.childNodes, a = [], f = 0; f < u.length; f++)a.push(u[f].innerText || u[f].textContent);
            a = a.join("\r"), o.appendChild(document.createTextNode(a)), t.appendChild(o), o.focus(), o.select(), s(o, "blur", function () {
                o.parentNode.removeChild(o), i.className = i.className.replace("source", "")
            })
        }
    }

    typeof require != "undefined" && typeof XRegExp == "undefined" && (XRegExp = require("XRegExp").XRegExp);
    var m = {
        defaults: {
            "class-name": "",
            "first-line": 1,
            "pad-line-numbers": !1,
            highlight: null,
            title: null,
            "smart-tabs": !0,
            "tab-size": 4,
            gutter: !0,
            toolbar: !0,
            "quick-code": !0,
            collapse: !1,
            "auto-links": !0,
            light: !1,
            "html-script": !1
        },
        config: {
            space: "&nbsp;",
            useScriptTags: !0,
            bloggerMode: !1,
            stripBrs: !1,
            tagName: "pre",
            strings: {
                expandSource: "expand source",
                help: "?",
                alert: "SyntaxHighlighter\n\n",
                noBrush: "Can't find brush for: ",
                brushNotHtmlScript: "Brush wasn't configured for html-script option: ",
                aboutDialog: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>About SyntaxHighlighter</title></head><body style="font-family:Geneva,Arial,Helvetica,sans-serif;background-color:#fff;color:#000;font-size:1em;text-align:center;"><div style="text-align:center;margin-top:1.5em;"><div style="font-size:xx-large;">SyntaxHighlighter</div><div style="font-size:.75em;margin-bottom:3em;"><div>version 3.0.83 (July 02 2010)</div><div><a href="http://alexgorbatchev.com/SyntaxHighlighter" target="_blank" style="color:#005896">http://alexgorbatchev.com/SyntaxHighlighter</a></div><div>JavaScript code syntax highlighter.</div><div>Copyright 2004-2010 Alex Gorbatchev.</div></div><div>If you like this script, please <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=2930402" style="color:#005896">donate</a> to <br/>keep development active!</div></div></body></html>'
            }
        },
        vars: {discoveredBrushes: null, highlighters: {}},
        brushes: {},
        regexLib: {
            multiLineCComments: /\/\*[\s\S]*?\*\//gm,
            singleLineCComments: /\/\/.*$/gm,
            singleLinePerlComments: /#.*$/gm,
            doubleQuotedString: /"([^\\"\n]|\\.)*"/g,
            singleQuotedString: /'([^\\'\n]|\\.)*'/g,
            multiLineDoubleQuotedString: new XRegExp('"([^\\\\"]|\\\\.)*"', "gs"),
            multiLineSingleQuotedString: new XRegExp("'([^\\\\']|\\\\.)*'", "gs"),
            xmlComments: /(&lt;|<)!--[\s\S]*?--(&gt;|>)/gm,
            url: /\w+:\/\/[\w-.\/?%&=:@;]*/g,
            phpScriptTags: {left: /(&lt;|<)\?=?/g, right: /\?(&gt;|>)/g},
            aspScriptTags: {left: /(&lt;|<)%=?/g, right: /%(&gt;|>)/g},
            scriptScriptTags: {left: /(&lt;|<)\s*script.*?(&gt;|>)/gi, right: /(&lt;|<)\/\s*script\s*(&gt;|>)/gi}
        },
        toolbar: {
            getHtml: function (e) {
                function t(e, t) {
                    return m.toolbar.getButtonHtml(e, t, m.config.strings[t])
                }

                for (var n = '<div class="toolbar">', r = m.toolbar.items, i = r.list, s = 0; s < i.length; s++)n += (r[i[s]].getHtml || t)(e, i[s]);
                return n += "</div>", n
            }, getButtonHtml: function (e, t, n) {
                return '<span><a href="#" class="toolbar_item command_' + t + " " + t + '">' + n + "</a></span>"
            }, handler: function (e) {
                var t = e.target, i = t.className || "";
                t = n(r(t, ".syntaxhighlighter", !0).id);
                var s = function (e) {
                    return (e = RegExp(e + "_(\\w+)").exec(i)) ? e[1] : null
                }("command");
                t && s && m.toolbar.items[s].execute(t), e.preventDefault()
            }, items: {
                list: ["expandSource", "help"], expandSource: {
                    getHtml: function (e) {
                        if (e.getParam("collapse") != 1)return "";
                        var t = e.getParam("title");
                        return m.toolbar.getButtonHtml(e, "expandSource", t ? t : m.config.strings.expandSource)
                    }, execute: function (e) {
                        e = document.getElementById(t(e.id)), e.className = e.className.replace("collapsed", "")
                    }
                }, help: {
                    execute: function () {
                        var e = "scrollbars=0";
                        e += ", left=" + (screen.width - 500) / 2 + ", top=" + (screen.height - 250) / 2 + ", width=500, height=250", e = e.replace(/^,/, ""), e = window.open("", "_blank", e), e.focus();
                        var t = e.document;
                        t.write(m.config.strings.aboutDialog), t.close(), e.focus()
                    }
                }
            }
        },
        findElements: function (e, t) {
            var n;
            if (t)n = [t]; else {
                n = document.getElementsByTagName(m.config.tagName);
                for (var r = [], s = 0; s < n.length; s++)r.push(n[s]);
                n = r
            }
            n = n, r = [], m.config.useScriptTags && (n = n.concat(d()));
            if (n.length === 0)return r;
            for (s = 0; s < n.length; s++) {
                for (var o = n[s], u = e, a = n[s].className, f = void 0, l = {}, c = new XRegExp("^\\[(?<values>(.*?))\\]$"), h = new XRegExp("(?<name>[\\w-]+)\\s*:\\s*(?<value>[\\w-%#]+|\\[.*?\\]|\".*?\"|'.*?')\\s*;?", "g"); (f = h.exec(a)) != null;) {
                    var p = f.value.replace(/^['"]|['"]$/g, "");
                    p != null && c.test(p) && (p = c.exec(p), p = p.values.length > 0 ? p.values.split(/\s*,\s*/) : []), l[f.name] = p
                }
                o = {target: o, params: i(u, l)}, o.params.brush != null && r.push(o)
            }
            return r
        },
        highlight: function (e, t) {
            var n = this.findElements(e, t), r = null, i = m.config;
            if (n.length !== 0)for (var s = 0; s < n.length; s++) {
                t = n[s];
                var u = t.target, a = t.params, f = a.brush, c;
                if (f != null) {
                    if (a["html-script"] == "true" || m.defaults["html-script"] == 1)r = new m.HtmlScript(f), f = "htmlscript"; else {
                        if (!(r = o(f)))continue;
                        r = new r
                    }
                    c = u.innerHTML;
                    if (i.useScriptTags) {
                        c = c;
                        var h = l(c), p = !1;
                        h.indexOf("<![CDATA[") == 0 && (h = h.substring(9), p = !0);
                        var d = h.length;
                        h.indexOf("]]>") == d - 3 && (h = h.substring(0, d - 3), p = !0), c = p ? h : c
                    }
                    (u.title || "") != "" && (a.title = u.title), a.brush = f, r.init(a), t = r.getDiv(c), (u.id || "") != "" && (t.id = u.id), u.parentNode.replaceChild(t, u)
                }
            }
        },
        all: function (e) {
            s(window, "load", function () {
                m.highlight(e)
            })
        }
    };
    return m.all = m.all, m.highlight = m.highlight, m.Match = function (e, t, n) {
        this.value = e, this.index = t, this.length = e.length, this.css = n, this.brushName = null
    }, m.Match.prototype.toString = function () {
        return this.value
    }, m.HtmlScript = function (e) {
        function t(e, t) {
            for (var n = 0; n < e.length; n++)e[n].index += t
        }

        var n = o(e), r, i = new m.brushes.Xml, s = this, u = "getDiv getHtml init".split(" ");
        if (n != null) {
            r = new n;
            for (var a = 0; a < u.length; a++)(function () {
                var e = u[a];
                s[e] = function () {
                    return i[e].apply(i, arguments)
                }
            })();
            r.htmlScript == null ? window.alert(m.config.strings.alert + (m.config.strings.brushNotHtmlScript + e)) : i.regexList.push({
                regex: r.htmlScript.code,
                func: function (e) {
                    for (var i = e.code, s = [], o = r.regexList, u = e.index + e.left.length, a = r.htmlScript, f, l = 0; l < o.length; l++)f = h(i, o[l]), t(f, u), s = s.concat(f);
                    a.left != null && e.left != null && (f = h(e.left, a.left), t(f, e.index), s = s.concat(f)), a.right != null && e.right != null && (f = h(e.right, a.right), t(f, e.index + e[0].lastIndexOf(e.right)), s = s.concat(f));
                    for (e = 0; e < s.length; e++)s[e].brushName = n.brushName;
                    return s
                }
            })
        }
    }, m.Highlighter = function () {
    }, m.Highlighter.prototype = {
        getParam: function (e, t) {
            var n = this.params[e];
            n = n == null ? t : n;
            var r = {"true": !0, "false": !1}[n];
            return r == null ? n : r
        }, create: function (e) {
            return document.createElement(e)
        }, findMatches: function (e, t) {
            var n = [];
            if (e != null)for (var r = 0; r < e.length; r++)typeof e[r] == "object" && (n = n.concat(h(t, e[r])));
            return this.removeNestedMatches(n.sort(c))
        }, removeNestedMatches: function (e) {
            for (var t = 0; t < e.length; t++)if (e[t] !== null)for (var n = e[t], r = n.index + n.length, i = t + 1; i < e.length && e[t] !== null; i++) {
                var s = e[i];
                if (s !== null) {
                    if (s.index > r)break;
                    s.index == n.index && s.length > n.length ? e[t] = null : s.index >= n.index && s.index < r && (e[i] = null)
                }
            }
            return e
        }, figureOutLineNumbers: function (e) {
            var t = [], n = parseInt(this.getParam("first-line"));
            return u(e, function (e, r) {
                t.push(r + n)
            }), t
        }, isLineHighlighted: function (e) {
            var t = this.getParam("highlight", []);
            typeof t != "object" && t.push == null && (t = [t]);
            e:{
                e = e.toString();
                var n = void 0;
                for (n = n = Math.max(n || 0, 0); n < t.length; n++)if (t[n] == e) {
                    t = n;
                    break e
                }
                t = -1
            }
            return t != -1
        }, getLineHtml: function (e, t, n) {
            return e = ["line", "number" + t, "index" + e, "alt" + (t % 2 == 0 ? 1 : 2).toString()], this.isLineHighlighted(t) && e.push("highlighted"), t == 0 && e.push("break"), '<div class="' + e.join(" ") + '">' + n + "</div>"
        }, getLineNumbersHtml: function (e, t) {
            var n = "", r = e.split("\n").length, i = parseInt(this.getParam("first-line")), s = this.getParam("pad-line-numbers");
            s == 1 ? s = (i + r - 1).toString().length : isNaN(s) == 1 && (s = 0);
            for (var o = 0; o < r; o++) {
                var u = t ? t[o] : i + o, a;
                if (u == 0)a = m.config.space; else {
                    a = s;
                    for (var f = u.toString(); f.length < a;)f = "0" + f;
                    a = f
                }
                e = a, n += this.getLineHtml(o, u, e)
            }
            return n
        }, getCodeLinesHtml: function (e, t) {
            e = l(e);
            var n = e.split("\n");
            this.getParam("pad-line-numbers");
            var r = parseInt(this.getParam("first-line"));
            e = "";
            for (var i = this.getParam("brush"), s = 0; s < n.length; s++) {
                var o = n[s], u = /^(&nbsp;|\s)+/.exec(o), a = null, f = t ? t[s] : r + s;
                u != null && (a = u[0].toString(), o = o.substr(a.length), a = a.replace(" ", m.config.space)), o = l(o), o.length == 0 && (o = m.config.space), e += this.getLineHtml(s, f, (a != null ? '<code class="' + i + ' spaces">' + a + "</code>" : "") + o)
            }
            return e
        }, getTitleHtml: function (e) {
            return e ? "<caption>" + e + "</caption>" : ""
        }, getMatchesHtml: function (e, t) {
            function n(e) {
                return (e = e ? e.brushName || s : s) ? e + " " : ""
            }

            for (var r = 0, i = "", s = this.getParam("brush", ""), o = 0; o < t.length; o++) {
                var u = t[o], f;
                u !== null && u.length !== 0 && (f = n(u), i += a(e.substr(r, u.index - r), f + "plain") + a(u.value, f + u.css), r = u.index + u.length + (u.offset || 0))
            }
            return i += a(e.substr(r), n() + "plain"), i
        }, getHtml: function (e) {
            var n = "", r = ["syntaxhighlighter"], i;
            this.getParam("light") == 1 && (this.params.toolbar = this.params.gutter = !1), className = "syntaxhighlighter", this.getParam("collapse") == 1 && r.push("collapsed"), (gutter = this.getParam("gutter")) == 0 && r.push("nogutter"), r.push(this.getParam("class-name")), r.push(this.getParam("brush")), e = e.replace(/^[ ]*[\n]+|[\n]*[ ]*$/g, "").replace(/\r/g, " "), n = this.getParam("tab-size");
            if (this.getParam("smart-tabs") == 1)e = f(e, n); else {
                for (var s = "", o = 0; o < n; o++)s += " ";
                e = e.replace(/\t/g, s)
            }
            e = e;
            e:{
                n = e = e, s = /<br\s*\/?>|&lt;br\s*\/?&gt;/gi, m.config.bloggerMode == 1 && (n = n.replace(s, "\n")), m.config.stripBrs == 1 && (n = n.replace(s, "")), n = n.split("\n"), s = /^\s*/, o = 1e3;
                for (var u = 0; u < n.length && o > 0; u++) {
                    var a = n[u];
                    if (l(a).length != 0) {
                        a = s.exec(a);
                        if (a == null) {
                            e = e;
                            break e
                        }
                        o = Math.min(a[0].length, o)
                    }
                }
                if (o > 0)for (u = 0; u < n.length; u++)n[u] = n[u].substr(o);
                e = n.join("\n")
            }
            return gutter && (i = this.figureOutLineNumbers(e)), n = this.findMatches(this.regexList, e), n = this.getMatchesHtml(e, n), n = this.getCodeLinesHtml(n, i), this.getParam("auto-links") && (n = p(n)), typeof navigator != "undefined" && navigator.userAgent && navigator.userAgent.match(/MSIE/) && r.push("ie"), n = '<div id="' + t(this.id) + '" class="' + r.join(" ") + '">' + (this.getParam("toolbar") ? m.toolbar.getHtml(this) : "") + '<table border="0" cellpadding="0" cellspacing="0">' + this.getTitleHtml(this.getParam("title")) + "<tbody><tr>" + (gutter ? '<td class="gutter">' + this.getLineNumbersHtml(e) + "</td>" : "") + '<td class="code"><div class="container">' + n + "</div></td></tr></tbody></table></div>"
        }, getDiv: function (e) {
            e === null && (e = ""), this.code = e;
            var t = this.create("div");
            return t.innerHTML = this.getHtml(e), this.getParam("toolbar") && s(r(t, ".toolbar"), "click", m.toolbar.handler), this.getParam("quick-code") && s(r(t, ".code"), "dblclick", v), t
        }, init: function (e) {
            this.id = "" + Math.round(Math.random() * 1e6).toString(), m.vars.highlighters[t(this.id)] = this, this.params = i(m.defaults, e || {}), this.getParam("light") == 1 && (this.params.toolbar = this.params.gutter = !1)
        }, getKeywords: function (e) {
            return e = e.replace(/^\s+|\s+$/g, "").replace(/\s+/g, "|"), "\\b(?:" + e + ")\\b"
        }, forHtmlScript: function (e) {
            this.htmlScript = {
                left: {regex: e.left, css: "script"},
                right: {regex: e.right, css: "script"},
                code: new XRegExp("(?<left>" + e.left.source + ")(?<code>.*?)(?<right>" + e.right.source + ")", "sgi")
            }
        }
    }, m
}();
typeof exports != "undefined" && (exports.SyntaxHighlighter = SyntaxHighlighter)