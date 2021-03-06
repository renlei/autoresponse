(function () {
    function e(e, n) {
        "use strict";
        var r = new t(e, n);
        return r.beautify()
    }

    function t(e, t) {
        "use strict";
        function A(e, t) {
            var n = 0;
            e && (n = e.indentation_level, n += e.var_line && e.var_line_reindented ? 1 : 0, !H() && e.line_indent_level > n && (n = e.line_indent_level));
            var i = {
                mode: t,
                parent: e,
                last_text: e ? e.last_text : "",
                last_word: e ? e.last_word : "",
                var_line: !1,
                var_line_tainted: !1,
                var_line_reindented: !1,
                in_html_comment: !1,
                multiline_frame: !1,
                if_block: !1,
                do_block: !1,
                do_while: !1,
                in_case_statement: !1,
                in_case: !1,
                case_body: !1,
                indentation_level: n,
                line_indent_level: e ? e.line_indent_level : n,
                start_line_index: r.length,
                ternary_depth: 0
            };
            return i
        }

        function O() {
            return {text: []}
        }

        function M(e) {
            e = e === undefined ? !1 : e;
            if (r.length) {
                _(r[r.length - 1], e);
                while (e && r.length > 1 && r[r.length - 1].text.length === 0)r.pop(), _(r[r.length - 1], e)
            }
        }

        function _(e) {
            while (e.text.length && (e.text[e.text.length - 1] === " " || e.text[e.text.length - 1] === a || e.text[e.text.length - 1] === L))e.text.pop()
        }

        function D(e) {
            return e.replace(/^\s+|\s+$/g, "")
        }

        function P(e) {
            e = e.replace(/\x0d/g, "");
            var t = [], n = e.indexOf("\n");
            while (n !== -1)t.push(e.substring(0, n)), e = e.substring(n + 1), n = e.indexOf("\n");
            return e.length && t.push(e), t
        }

        function H() {
            var e = r[r.length - 1];
            return e.text.length === 0
        }

        function B() {
            if (H()) {
                if (r.length === 1)return !0;
                var e = r[r.length - 2];
                return e.text.length === 0
            }
            return !1
        }

        function j(e) {
            e = e === undefined ? !1 : e;
            if (k.wrap_line_length && !e) {
                var t = r[r.length - 1], n = 0;
                t.text.length > 0 && (n = t.text.join("").length + i.length + (E ? 1 : 0), n >= k.wrap_line_length && (e = !0))
            }
            (k.preserve_newlines && b || e) && !H() && (F(!1, !0), !$(f.mode) && !J(f.mode) && (w = !0))
        }

        function F(e, t) {
            w = !1, E = !1;
            if (!t && f.last_text !== ";")while (f.mode === C.Statement && !f.if_block && !f.do_block)K();
            if (r.length === 1 && H())return;
            if (e || !H())f.multiline_frame = !0, r.push(O())
        }

        function I() {
            if (H()) {
                var e = r[r.length - 1];
                if (k.keep_array_indentation && $(f.mode) && b) {
                    e.text.push("");
                    for (var t = 0; t < T.length; t += 1)e.text.push(T[t])
                } else L && e.text.push(L), q(f.indentation_level + (f.var_line && f.var_line_reindented ? 1 : 0) + (w ? 1 : 0))
            }
        }

        function q(e) {
            if (r.length > 1) {
                var t = r[r.length - 1];
                f.line_indent_level = e;
                for (var n = 0; n < e; n += 1)t.text.push(a)
            }
        }

        function R() {
            var e = r[r.length - 1];
            if (E && e.text.length) {
                var t = e.text[e.text.length - 1];
                t !== " " && t !== a && e.text.push(" ")
            }
        }

        function U(e) {
            e = e || i, I(), w = !1, R(), E = !1, r[r.length - 1].text.push(e)
        }

        function z() {
            f.indentation_level += 1
        }

        function W() {
            f.indentation_level > 0 && (!f.parent || f.indentation_level > f.parent.indentation_level) && (f.indentation_level -= 1)
        }

        function X(e) {
            if (e.multiline_frame)return;
            var t = e.start_line_index, n = 0, i;
            while (t < r.length) {
                i = r[t], t++;
                if (i.text.length === 0)continue;
                L && i.text[0] === L ? n = 1 : n = 0, i.text[n] === a && i.text.splice(n, 1)
            }
        }

        function V(e) {
            f ? (c.push(f), l = f) : l = A(null, e), f = A(l, e)
        }

        function $(e) {
            return e === C.ArrayLiteral
        }

        function J(e) {
            return Z(e, [C.Expression, C.ForInitializer, C.Conditional])
        }

        function K() {
            c.length > 0 && (l = f, f = c.pop())
        }

        function Q() {
            return f.last_text === "do" || f.last_text === "else" && i !== "if" || o === "TK_END_EXPR" && (l.mode === C.ForInitializer || l.mode === C.Conditional) ? (j(Z(i, ["do", "for", "if", "while"])), V(C.Statement), H() && (z(), w = !1), !0) : !1
        }

        function G(e, t) {
            for (var n = 0; n < e.length; n++) {
                var r = D(e[n]);
                if (r.charAt(0) !== t)return !1
            }
            return !0
        }

        function Y(e) {
            return Z(e, ["case", "return", "do", "if", "throw", "else"])
        }

        function Z(e, t) {
            for (var n = 0; n < t.length; n += 1)if (t[n] === e)return !0;
            return !1
        }

        function et(e) {
            var t = !1, n = "", r = 0, i = "", s = 0, o;
            while (t || r < e.length) {
                o = e.charAt(r), r++;
                if (t) {
                    t = !1;
                    if (o === "x")i = e.substr(r, 2), r += 2; else {
                        if (o !== "u") {
                            n += "\\" + o;
                            continue
                        }
                        i = e.substr(r, 4), r += 4
                    }
                    if (!i.match(/^[0123456789abcdefABCDEF]+$/))return e;
                    s = parseInt(i, 16);
                    if (s >= 0 && s < 32) {
                        o === "x" ? n += "\\x" + i : n += "\\u" + i;
                        continue
                    }
                    if (s === 34 || s === 39 || s === 92)n += "\\" + String.fromCharCode(s); else {
                        if (o === "x" && s > 126 && s <= 255)return e;
                        n += String.fromCharCode(s)
                    }
                } else o === "\\" ? t = !0 : n += o
            }
            return n
        }

        function tt(e) {
            var t = v, r = n.charAt(t);
            while (Z(r, h) && r !== e) {
                t++;
                if (t >= S)return !1;
                r = n.charAt(t)
            }
            return r === e
        }

        function nt() {
            var e, t;
            x = 0;
            if (v >= S)return ["", "TK_EOF"];
            b = !1, T = [];
            var i = n.charAt(v);
            v += 1;
            while (Z(i, h)) {
                i === "\n" ? (x += 1, T = []) : x && (i === a ? T.push(a) : i !== "\r" && T.push(" "));
                if (v >= S)return ["", "TK_EOF"];
                i = n.charAt(v), v += 1
            }
            if (Z(i, p)) {
                if (v < S)while (Z(n.charAt(v), p)) {
                    i += n.charAt(v), v += 1;
                    if (v === S)break
                }
                if (v === S || !i.match(/^[0-9]+[Ee]$/) || n.charAt(v) !== "-" && n.charAt(v) !== "+")return i === "in" ? [i, "TK_OPERATOR"] : [i, "TK_WORD"];
                var s = n.charAt(v);
                v += 1;
                var u = nt();
                return i += s + u[0], [i, "TK_WORD"]
            }
            if (i === "(" || i === "[")return [i, "TK_START_EXPR"];
            if (i === ")" || i === "]")return [i, "TK_END_EXPR"];
            if (i === "{")return [i, "TK_START_BLOCK"];
            if (i === "}")return [i, "TK_END_BLOCK"];
            if (i === ";")return [i, "TK_SEMICOLON"];
            if (i === "/") {
                var c = "", m = !0;
                if (n.charAt(v) === "*") {
                    v += 1;
                    if (v < S)while (v < S && (n.charAt(v) !== "*" || !n.charAt(v + 1) || n.charAt(v + 1) !== "/")) {
                        i = n.charAt(v), c += i;
                        if (i === "\n" || i === "\r")m = !1;
                        v += 1;
                        if (v >= S)break
                    }
                    return v += 2, m && x === 0 ? ["/*" + c + "*/", "TK_INLINE_COMMENT"] : ["/*" + c + "*/", "TK_BLOCK_COMMENT"]
                }
                if (n.charAt(v) === "/") {
                    c = i;
                    while (n.charAt(v) !== "\r" && n.charAt(v) !== "\n") {
                        c += n.charAt(v), v += 1;
                        if (v >= S)break
                    }
                    return [c, "TK_COMMENT"]
                }
            }
            if (i === "'" || i === '"' || (i === "/" || k.e4x && i === "<" && n.slice(v - 1).match(/^<([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])\s*([-a-zA-Z:0-9_.]+=('[^']*'|"[^"]*"|{[^{}]*})\s*)*\/?\s*>/)) && (o === "TK_WORD" && Y(f.last_text) || o === "TK_END_EXPR" && Z(l.mode, [C.Conditional, C.ForInitializer]) || Z(o, ["TK_COMMENT", "TK_START_EXPR", "TK_START_BLOCK", "TK_END_BLOCK", "TK_OPERATOR", "TK_EQUALS", "TK_EOF", "TK_SEMICOLON", "TK_COMMA"]))) {
                var y = i, w = !1, E = !1;
                t = i;
                if (v < S)if (y === "/") {
                    var N = !1;
                    while (w || N || n.charAt(v) !== y) {
                        t += n.charAt(v), w ? w = !1 : (w = n.charAt(v) === "\\", n.charAt(v) === "[" ? N = !0 : n.charAt(v) === "]" && (N = !1)), v += 1;
                        if (v >= S)return [t, "TK_STRING"]
                    }
                } else if (k.e4x && y === "<") {
                    var L = /<(\/?)([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])\s*([-a-zA-Z:0-9_.]+=('[^']*'|"[^"]*"|{[^{}]*})\s*)*(\/?)\s*>/g, A = n.slice(v - 1), O = L.exec(A);
                    if (O && O.index === 0) {
                        var M = O[2], _ = 0;
                        while (O) {
                            var P = !!O[1], H = O[2], B = !!O[O.length - 1] || H.slice(0, 8) === "![CDATA[";
                            H === M && !B && (P ? --_ : ++_);
                            if (_ <= 0)break;
                            O = L.exec(A)
                        }
                        var j = O ? O.index + O[0].length : A.length;
                        return v += j - 1, [A.slice(0, j), "TK_STRING"]
                    }
                } else while (w || n.charAt(v) !== y) {
                    t += n.charAt(v);
                    if (w) {
                        if (n.charAt(v) === "x" || n.charAt(v) === "u")E = !0;
                        w = !1
                    } else w = n.charAt(v) === "\\";
                    v += 1;
                    if (v >= S)return [t, "TK_STRING"]
                }
                v += 1, t += y, E && k.unescape_strings && (t = et(t));
                if (y === "/")while (v < S && Z(n.charAt(v), p))t += n.charAt(v), v += 1;
                return [t, "TK_STRING"]
            }
            if (i === "#") {
                if (r.length === 1 && r[0].text.length === 0 && n.charAt(v) === "!") {
                    t = i;
                    while (v < S && i !== "\n")i = n.charAt(v), t += i, v += 1;
                    return [D(t) + "\n", "TK_UNKNOWN"]
                }
                var F = "#";
                if (v < S && Z(n.charAt(v), g)) {
                    do i = n.charAt(v), F += i, v += 1; while (v < S && i !== "#" && i !== "=");
                    return i !== "#" && (n.charAt(v) === "[" && n.charAt(v + 1) === "]" ? (F += "[]", v += 2) : n.charAt(v) === "{" && n.charAt(v + 1) === "}" && (F += "{}", v += 2)), [F, "TK_WORD"]
                }
            }
            if (i === "<" && n.substring(v - 1, v + 3) === "<!--") {
                v += 3, i = "<!--";
                while (n.charAt(v) !== "\n" && v < S)i += n.charAt(v), v++;
                return f.in_html_comment = !0, [i, "TK_COMMENT"]
            }
            if (i === "-" && f.in_html_comment && n.substring(v - 1, v + 2) === "-->")return f.in_html_comment = !1, v += 2, ["-->", "TK_COMMENT"];
            if (i === ".")return [i, "TK_DOT"];
            if (Z(i, d)) {
                while (v < S && Z(i + n.charAt(v), d)) {
                    i += n.charAt(v), v += 1;
                    if (v >= S)break
                }
                return i === "," ? [i, "TK_COMMA"] : i === "=" ? [i, "TK_EQUALS"] : [i, "TK_OPERATOR"]
            }
            return [i, "TK_UNKNOWN"]
        }

        function rt() {
            Q();
            var e = C.Expression;
            if (i === "[") {
                if (o === "TK_WORD" || f.last_text === ")") {
                    Z(f.last_text, m) && (E = !0), V(e), U(), z(), k.space_in_paren && (E = !0);
                    return
                }
                e = C.ArrayLiteral, $(f.mode) && (f.last_text === "[" || f.last_text === "," && (u === "]" || u === "}")) && (k.keep_array_indentation || F())
            } else f.last_text === "for" ? e = C.ForInitializer : Z(f.last_text, ["if", "while"]) && (e = C.Conditional);
            f.last_text === ";" || o === "TK_START_BLOCK" ? F() : o === "TK_END_EXPR" || o === "TK_START_EXPR" || o === "TK_END_BLOCK" || f.last_text === "." ? (j(b), w = !1) : o !== "TK_WORD" && o !== "TK_OPERATOR" ? E = !0 : f.last_word === "function" || f.last_word === "typeof" ? k.jslint_happy && (E = !0) : (Z(f.last_text, m) || f.last_text === "catch") && k.space_before_conditional && (E = !0), i === "(" && (o === "TK_EQUALS" || o === "TK_OPERATOR") && f.mode !== C.ObjectLiteral && j(), V(e), U(), k.space_in_paren && (E = !0), z()
        }

        function it() {
            while (f.mode === C.Statement)K();
            i === "]" && $(f.mode) && f.multiline_frame && !k.keep_array_indentation && F(), f.multiline_frame && j(), k.space_in_paren && (E = !0), i === "]" && k.keep_array_indentation ? (U(), K()) : (K(), U()), X(l), f.do_while && l.mode === C.Conditional && (l.mode = C.Expression, f.do_block = !1, f.do_while = !1)
        }

        function st() {
            V(C.BlockStatement);
            var e = tt("}"), t = e && f.last_word === "function" && o === "TK_END_EXPR";
            k.brace_style === "expand" ? o !== "TK_OPERATOR" && (t || o === "TK_EQUALS" || Y(f.last_text) && f.last_text !== "else") ? E = !0 : F() : o !== "TK_OPERATOR" && o !== "TK_START_EXPR" ? o === "TK_START_BLOCK" ? F() : E = !0 : $(l.mode) && f.last_text === "," && (u === "}" ? E = !0 : F()), U(), z()
        }

        function ot() {
            while (f.mode === C.Statement)K();
            var e = o === "TK_START_BLOCK";
            k.brace_style === "expand" ? e || F() : e || ($(f.mode) && k.keep_array_indentation ? (k.keep_array_indentation = !1, F(), k.keep_array_indentation = !0) : F()), K(), U()
        }

        function ut() {
            Q() || b && !J(f.mode) && (o !== "TK_OPERATOR" || f.last_text === "--" || f.last_text === "++") && o !== "TK_EQUALS" && (k.preserve_newlines || f.last_text !== "var") && F();
            if (f.do_block && !f.do_while) {
                if (i === "while") {
                    E = !0, U(), E = !0, f.do_while = !0;
                    return
                }
                F(), f.do_block = !1
            }
            if (f.if_block && i !== "else") {
                while (f.mode === C.Statement)K();
                f.if_block = !1
            }
            if (i === "case" || i === "default" && f.in_case_statement) {
                F();
                if (f.case_body || k.jslint_happy)W(), f.case_body = !1;
                U(), f.in_case = !0, f.in_case_statement = !0;
                return
            }
            i === "function" && (f.var_line && o !== "TK_EQUALS" && (f.var_line_reindented = !0), (H() || f.last_text === ";" || f.last_text === "}") && f.last_text !== "{" && !$(f.mode) && (B() || (F(), F(!0))), o === "TK_WORD" ? f.last_text === "get" || f.last_text === "set" || f.last_text === "new" || f.last_text === "return" ? E = !0 : F() : o === "TK_OPERATOR" || f.last_text === "=" ? E = !0 : J(f.mode) || F()), (o === "TK_COMMA" || o === "TK_START_EXPR" || o === "TK_EQUALS" || o === "TK_OPERATOR") && f.mode !== C.ObjectLiteral && j();
            if (i === "function") {
                U(), f.last_word = i;
                return
            }
            y = "NONE", o === "TK_END_BLOCK" ? Z(i, ["else", "catch", "finally"]) ? k.brace_style === "expand" || k.brace_style === "end-expand" ? y = "NEWLINE" : (y = "SPACE", E = !0) : y = "NEWLINE" : o === "TK_SEMICOLON" && f.mode === C.BlockStatement ? y = "NEWLINE" : o === "TK_SEMICOLON" && J(f.mode) ? y = "SPACE" : o === "TK_STRING" ? y = "NEWLINE" : o === "TK_WORD" ? y = "SPACE" : o === "TK_START_BLOCK" ? y = "NEWLINE" : o === "TK_END_EXPR" && (E = !0, y = "NEWLINE"), Z(i, m) && f.last_text !== ")" && (f.last_text === "else" ? y = "SPACE" : y = "NEWLINE");
            if (Z(i, ["else", "catch", "finally"]))if (o !== "TK_END_BLOCK" || k.brace_style === "expand" || k.brace_style === "end-expand")F(); else {
                M(!0);
                var e = r[r.length - 1];
                e.text[e.text.length - 1] !== "}" && F(), E = !0
            } else y === "NEWLINE" ? Y(f.last_text) ? E = !0 : o !== "TK_END_EXPR" ? (o !== "TK_START_EXPR" || i !== "var") && f.last_text !== ":" && (i === "if" && f.last_word === "else" && f.last_text !== "{" ? E = !0 : (f.var_line = !1, f.var_line_reindented = !1, F())) : Z(i, m) && f.last_text !== ")" && (f.var_line = !1, f.var_line_reindented = !1, F()) : $(f.mode) && f.last_text === "," && u === "}" ? F() : y === "SPACE" && (E = !0);
            U(), f.last_word = i, i === "var" && (f.var_line = !0, f.var_line_reindented = !1, f.var_line_tainted = !1), i === "do" && (f.do_block = !0), i === "if" && (f.if_block = !0)
        }

        function at() {
            Q() && (E = !1);
            while (f.mode === C.Statement && !f.if_block && !f.do_block)K();
            U(), f.var_line = !1, f.var_line_reindented = !1, f.mode === C.ObjectLiteral && (f.mode = C.BlockStatement)
        }

        function ft() {
            Q() ? E = !0 : o === "TK_WORD" ? E = !0 : o === "TK_COMMA" || o === "TK_START_EXPR" || o === "TK_EQUALS" || o === "TK_OPERATOR" ? f.mode !== C.ObjectLiteral && j() : F(), U()
        }

        function lt() {
            f.var_line && (f.var_line_tainted = !0), E = !0, U(), E = !0
        }

        function ct() {
            if (f.var_line) {
                if (J(f.mode) || o === "TK_END_BLOCK")f.var_line_tainted = !1;
                f.var_line && (f.var_line_reindented = !0), U(), f.var_line_tainted ? (f.var_line_tainted = !1, F()) : E = !0;
                return
            }
            o === "TK_END_BLOCK" && f.mode !== C.Expression ? (U(), f.mode === C.ObjectLiteral && f.last_text === "}" ? F() : E = !0) : f.mode === C.ObjectLiteral ? (U(), F()) : (U(), E = !0)
        }

        function ht() {
            var e = !0, t = !0;
            if (Y(f.last_text)) {
                E = !0, U();
                return
            }
            if (i === "*" && o === "TK_DOT" && !u.match(/^\d+$/)) {
                U();
                return
            }
            if (i === ":" && f.in_case) {
                f.case_body = !0, z(), U(), F(), f.in_case = !1;
                return
            }
            if (i === "::") {
                U();
                return
            }
            b && (i === "--" || i === "++") && F(), Z(i, ["--", "++", "!"]) || Z(i, ["-", "+"]) && (Z(o, ["TK_START_BLOCK", "TK_START_EXPR", "TK_EQUALS", "TK_OPERATOR"]) || Z(f.last_text, m) || f.last_text === ",") ? (e = !1, t = !1, f.last_text === ";" && J(f.mode) && (e = !0), o === "TK_WORD" && Z(f.last_text, m) && (e = !0), (f.mode === C.BlockStatement || f.mode === C.Statement) && (f.last_text === "{" || f.last_text === ";") && F()) : i === ":" ? f.ternary_depth === 0 ? (f.mode === C.BlockStatement && (f.mode = C.ObjectLiteral), e = !1) : f.ternary_depth -= 1 : i === "?" && (f.ternary_depth += 1), E = E || e, U(), E = t
        }

        function pt() {
            var e = P(i), t, n = !1;
            F(!1, !0), e.length > 1 && G(e.slice(1), "*") && (n = !0), U(e[0]);
            for (t = 1; t < e.length; t++)F(!1, !0), n ? U(" " + D(e[t])) : r[r.length - 1].text.push(e[t]);
            F(!1, !0)
        }

        function dt() {
            E = !0, U(), E = !0
        }

        function vt() {
            b ? F(!1, !0) : M(!0), E = !0, U(), F(!1, !0)
        }

        function mt() {
            Y(f.last_text) ? E = !0 : j(f.last_text === ")" && k.break_chained_methods), U()
        }

        function gt() {
            U(), i[i.length - 1] === "\n" && F()
        }

        var n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T, N, C, k, L = "";
        h = "\n\r	 ".split(""), p = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$".split(""), g = "0123456789".split(""), d = "+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! !! , : ? ^ ^= |= ::", d += " <%= <% %> <?= <? ?>", d = d.split(" "), m = "continue,try,throw,return,var,if,switch,case,default,for,while,break,function".split(","), C = {
            BlockStatement: "BlockStatement",
            Statement: "Statement",
            ObjectLiteral: "ObjectLiteral",
            ArrayLiteral: "ArrayLiteral",
            ForInitializer: "ForInitializer",
            Conditional: "Conditional",
            Expression: "Expression"
        }, N = {
            TK_START_EXPR: rt,
            TK_END_EXPR: it,
            TK_START_BLOCK: st,
            TK_END_BLOCK: ot,
            TK_WORD: ut,
            TK_SEMICOLON: at,
            TK_STRING: ft,
            TK_EQUALS: lt,
            TK_OPERATOR: ht,
            TK_COMMA: ct,
            TK_BLOCK_COMMENT: pt,
            TK_INLINE_COMMENT: dt,
            TK_COMMENT: vt,
            TK_DOT: mt,
            TK_UNKNOWN: gt
        }, t = t ? t : {}, k = {}, t.space_after_anon_function !== undefined && t.jslint_happy === undefined && (t.jslint_happy = t.space_after_anon_function), t.braces_on_own_line !== undefined && (k.brace_style = t.braces_on_own_line ? "expand" : "collapse"), k.brace_style = t.brace_style ? t.brace_style : k.brace_style ? k.brace_style : "collapse", k.brace_style === "expand-strict" && (k.brace_style = "expand"), k.indent_size = t.indent_size ? parseInt(t.indent_size, 10) : 4, k.indent_char = t.indent_char ? t.indent_char : " ", k.preserve_newlines = t.preserve_newlines === undefined ? !0 : t.preserve_newlines, k.break_chained_methods = t.break_chained_methods === undefined ? !1 : t.break_chained_methods, k.max_preserve_newlines = t.max_preserve_newlines === undefined ? 0 : parseInt(t.max_preserve_newlines, 10), k.space_in_paren = t.space_in_paren === undefined ? !1 : t.space_in_paren, k.jslint_happy = t.jslint_happy === undefined ? !1 : t.jslint_happy, k.keep_array_indentation = t.keep_array_indentation === undefined ? !1 : t.keep_array_indentation, k.space_before_conditional = t.space_before_conditional === undefined ? !0 : t.space_before_conditional, k.unescape_strings = t.unescape_strings === undefined ? !1 : t.unescape_strings, k.wrap_line_length = t.wrap_line_length === undefined ? 0 : parseInt(t.wrap_line_length, 10), k.e4x = t.e4x === undefined ? !1 : t.e4x, a = "";
        while (k.indent_size > 0)a += k.indent_char, k.indent_size -= 1;
        while (e && (e.charAt(0) === " " || e.charAt(0) === "	"))L += e.charAt(0), e = e.substring(1);
        n = e, S = e.length, o = "TK_START_BLOCK", u = "", r = [O()], w = !1, E = !1, T = [], c = [], V(C.BlockStatement), v = 0, this.beautify = function () {
            var e, t, n, a;
            for (; ;) {
                e = nt(), i = e[0], s = e[1];
                if (s === "TK_EOF")break;
                n = k.keep_array_indentation && $(f.mode), b = x > 0;
                if (n)for (t = 0; t < x; t += 1)F(t > 0); else {
                    k.max_preserve_newlines && x > k.max_preserve_newlines && (x = k.max_preserve_newlines);
                    if (k.preserve_newlines && x > 1) {
                        F();
                        for (t = 1; t < x; t += 1)F(!0)
                    }
                }
                N[s](), s !== "TK_INLINE_COMMENT" && s !== "TK_COMMENT" && s !== "TK_UNKNOWN" && (u = f.last_text, o = s, f.last_text = i)
            }
            a = r[0].text.join("");
            for (var l = 1; l < r.length; l++)a += "\n" + r[l].text.join("");
            return a = a.replace(/[\r\n ]+$/, ""), a
        }
    }

    typeof define == "function" ? typeof define.amd == "undefined" ? define(function (t, n, r) {
        n.js_beautify = e
    }) : define([], function () {
        return e
    }) : typeof exports != "undefined" ? exports.js_beautify = e : typeof window != "undefined" ? window.js_beautify = e : typeof global != "undefined" && (global.js_beautify = e)
})()