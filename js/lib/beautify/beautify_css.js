(function () {
    function e(e, t) {
        function a() {
            return u = e.charAt(++o), u
        }

        function f() {
            return e.charAt(o + 1)
        }

        function l(t) {
            var n = o;
            while (a())if (u === "\\")a(), a(); else {
                if (u === t)break;
                if (u === "\n")break
            }
            return e.substring(n, o + 1)
        }

        function c() {
            var e = o;
            while (i.test(f()))o++;
            return o !== e
        }

        function h() {
            var e = o;
            do; while (i.test(a()));
            return o !== e + 1
        }

        function p() {
            var t = o;
            a();
            while (a())if (u === "*" && f() === "/") {
                o++;
                break
            }
            return e.substring(t, o + 1)
        }

        function d(t) {
            return e.substring(o - t.length, o).toLowerCase() === t
        }

        function y() {
            g++, v += m
        }

        function b() {
            g--, v = v.slice(0, -n)
        }

        t = t || {};
        var n = t.indent_size || 4, r = t.indent_char || " ";
        typeof n == "string" && (n = parseInt(n, 10));
        var i = /^\s+$/, s = /[\w$\-_]/, o = -1, u, v = e.match(/^[\r\n]*[\t ]*/)[0], m = Array(n + 1).join(r), g = 0, w = {};
        w["{"] = function (e) {
            w.singleSpace(), E.push(e), w.newLine()
        }, w["}"] = function (e) {
            w.newLine(), E.push(e), w.newLine()
        }, w.newLine = function (e) {
            if (!e)while (i.test(E[E.length - 1]))E.pop();
            E.length && E.push("\n"), v && E.push(v)
        }, w.singleSpace = function () {
            E.length && !i.test(E[E.length - 1]) && E.push(" ")
        };
        var E = [];
        v && E.push(v);
        for (; ;) {
            var S = h();
            if (!u)break;
            u === "{" ? (y(), w["{"](u)) : u === "}" ? (b(), w["}"](u)) : u === '"' || u === "'" ? E.push(l(u)) : u === ";" ? E.push(u, "\n", v) : u === "/" && f() === "*" ? (w.newLine(), E.push(p(), "\n", v)) : u === "(" ? d("url") ? (E.push(u), c(), a() && (u !== ")" && u !== '"' && u !== "'" ? E.push(l(")")) : o--)) : (S && w.singleSpace(), E.push(u), c()) : u === ")" ? E.push(u) : u === "," ? (c(), E.push(u), w.singleSpace()) : u === "]" ? E.push(u) : u === "[" || u === "=" ? (c(), E.push(u)) : (S && w.singleSpace(), E.push(u))
        }
        var x = E.join("").replace(/[\n ]+$/, "");
        return x
    }

    typeof define == "function" ? define(function (t, n, r) {
        n.css_beautify = e
    }) : typeof exports != "undefined" ? exports.css_beautify = e : typeof window != "undefined" ? window.css_beautify = e : typeof global != "undefined" && (global.css_beautify = e)
})()