(function () {
    function e(e) {
        return e.replace(/^\s+|\s+$/g, "")
    }

    function t(e) {
        return e.replace(/^\s+/g, "")
    }

    function n(n, r, i, s) {
        function d() {
            return this.pos = 0, this.token = "", this.current_mode = "CONTENT", this.tags = {
                parent: "parent1",
                parentcount: 1,
                parent1: ""
            }, this.tag_type = "", this.token_text = this.last_token = this.last_text = this.token_type = "", this.newlines = 0, this.indent_content = !1, this.Utils = {
                whitespace: "\n\r	 ".split(""),
                single_token: "br,input,link,meta,!doctype,basefont,base,area,hr,wbr,param,img,isindex,?xml,embed,?php,?,?=".split(","),
                extra_liners: "head,body,/html".split(","),
                in_array: function (e, t) {
                    for (var n = 0; n < t.length; n++)if (e === t[n])return !0;
                    return !1
                }
            }, this.traverse_whitespace = function () {
                var e = "";
                e = this.input.charAt(this.pos);
                if (this.Utils.in_array(e, this.Utils.whitespace)) {
                    this.newlines = 0;
                    while (this.Utils.in_array(e, this.Utils.whitespace))h && e === "\n" && this.newlines <= p && (this.newlines += 1), this.pos++, e = this.input.charAt(this.pos);
                    return !0
                }
                return !1
            }, this.get_content = function () {
                var e = "", t = [], n = !1;
                while (this.input.charAt(this.pos) !== "<") {
                    if (this.pos >= this.input.length)return t.length ? t.join("") : ["", "TK_EOF"];
                    if (this.traverse_whitespace()) {
                        t.length && (n = !0);
                        continue
                    }
                    e = this.input.charAt(this.pos), this.pos++, n && (this.line_char_count >= this.wrap_line_length ? (this.print_newline(!1, t), this.print_indentation(t)) : (this.line_char_count++, t.push(" ")), n = !1), this.line_char_count++, t.push(e)
                }
                return t.length ? t.join("") : ""
            }, this.get_contents_to = function (e) {
                if (this.pos === this.input.length)return ["", "TK_EOF"];
                var t = "", n = "", r = new RegExp("</" + e + "\\s*>", "igm");
                r.lastIndex = this.pos;
                var i = r.exec(this.input), s = i ? i.index : this.input.length;
                return this.pos < s && (n = this.input.substring(this.pos, s), this.pos = s), n
            }, this.record_tag = function (e) {
                this.tags[e + "count"] ? (this.tags[e + "count"]++, this.tags[e + this.tags[e + "count"]] = this.indent_level) : (this.tags[e + "count"] = 1, this.tags[e + this.tags[e + "count"]] = this.indent_level), this.tags[e + this.tags[e + "count"] + "parent"] = this.tags.parent, this.tags.parent = e + this.tags[e + "count"]
            }, this.retrieve_tag = function (e) {
                if (this.tags[e + "count"]) {
                    var t = this.tags.parent;
                    while (t) {
                        if (e + this.tags[e + "count"] === t)break;
                        t = this.tags[t + "parent"]
                    }
                    t && (this.indent_level = this.tags[e + this.tags[e + "count"]], this.tags.parent = this.tags[t + "parent"]), delete this.tags[e + this.tags[e + "count"] + "parent"], delete this.tags[e + this.tags[e + "count"]], this.tags[e + "count"] === 1 ? delete this.tags[e + "count"] : this.tags[e + "count"]--
                }
            }, this.get_tag = function (e) {
                var t = "", n = [], r = "", i = !1, s, o, u = this.pos, a = this.line_char_count;
                e = e !== undefined ? e : !1;
                do {
                    if (this.pos >= this.input.length)return e && (this.pos = u, this.line_char_count = a), n.length ? n.join("") : ["", "TK_EOF"];
                    t = this.input.charAt(this.pos), this.pos++;
                    if (this.Utils.in_array(t, this.Utils.whitespace)) {
                        i = !0;
                        continue
                    }
                    if (t === "'" || t === '"')t += this.get_unformatted(t), i = !0;
                    t === "=" && (i = !1), n.length && n[n.length - 1] !== "=" && t !== ">" && i && (this.line_char_count >= this.wrap_line_length ? (this.print_newline(!1, n), this.print_indentation(n)) : (n.push(" "), this.line_char_count++), i = !1), t === "<" && !s && (s = this.pos - 1), this.line_char_count++, n.push(t);
                    if (n[1] && n[1] === "!") {
                        n = [this.get_comment(s)];
                        break
                    }
                } while (t !== ">");
                var f = n.join(""), l;
                f.indexOf(" ") !== -1 ? l = f.indexOf(" ") : l = f.indexOf(">");
                var h = f.substring(1, l).toLowerCase();
                return f.charAt(f.length - 2) === "/" || this.Utils.in_array(h, this.Utils.single_token) ? e || (this.tag_type = "SINGLE") : h === "script" ? e || (this.record_tag(h), this.tag_type = "SCRIPT") : h === "style" ? e || (this.record_tag(h), this.tag_type = "STYLE") : this.is_unformatted(h, c) ? (r = this.get_unformatted("</" + h + ">", f), n.push(r), s > 0 && this.Utils.in_array(this.input.charAt(s - 1), this.Utils.whitespace) && n.splice(0, 0, this.input.charAt(s - 1)), o = this.pos - 1, this.Utils.in_array(this.input.charAt(o + 1), this.Utils.whitespace) && n.push(this.input.charAt(o + 1)), this.tag_type = "SINGLE") : h.charAt(0) === "!" ? e || (this.tag_type = "SINGLE", this.traverse_whitespace()) : e || (h.charAt(0) === "/" ? (this.retrieve_tag(h.substring(1)), this.tag_type = "END", this.traverse_whitespace()) : (this.record_tag(h), h.toLowerCase() !== "html" && (this.indent_content = !0), this.tag_type = "START", this.traverse_whitespace()), this.Utils.in_array(h, this.Utils.extra_liners) && (this.print_newline(!1, this.output), this.output.length && this.output[this.output.length - 2] !== "\n" && this.print_newline(!0, this.output))), e && (this.pos = u, this.line_char_count = a), n.join("")
            }, this.get_comment = function (e) {
                var t = "", n = ">", r = !1;
                this.pos = e, input_char = this.input.charAt(this.pos), this.pos++;
                while (this.pos <= this.input.length) {
                    t += input_char;
                    if (t[t.length - 1] === n[n.length - 1] && t.indexOf(n) !== -1)break;
                    !r && t.length < 10 && (t.indexOf("<![if") === 0 ? (n = "<![endif]>", r = !0) : t.indexOf("<![cdata[") === 0 ? (n = "]]>", r = !0) : t.indexOf("<![") === 0 ? (n = "]>", r = !0) : t.indexOf("<!--") === 0 && (n = "-->", r = !0)), input_char = this.input.charAt(this.pos), this.pos++
                }
                return t
            }, this.get_unformatted = function (e, t) {
                if (t && t.toLowerCase().indexOf(e) !== -1)return "";
                var n = "", r = "", i = !0;
                do {
                    if (this.pos >= this.input.length)return r;
                    n = this.input.charAt(this.pos), this.pos++;
                    if (this.Utils.in_array(n, this.Utils.whitespace)) {
                        if (!i) {
                            this.line_char_count--;
                            continue
                        }
                        if (n === "\n" || n === "\r") {
                            r += "\n", this.line_char_count = 0;
                            continue
                        }
                    }
                    r += n, this.line_char_count++, i = !0
                } while (r.toLowerCase().indexOf(e) === -1);
                return r
            }, this.get_token = function () {
                var e;
                if (this.last_token === "TK_TAG_SCRIPT" || this.last_token === "TK_TAG_STYLE") {
                    var t = this.last_token.substr(7);
                    return e = this.get_contents_to(t), typeof e != "string" ? e : [e, "TK_" + t]
                }
                if (this.current_mode === "CONTENT")return e = this.get_content(), typeof e != "string" ? e : [e, "TK_CONTENT"];
                if (this.current_mode === "TAG") {
                    e = this.get_tag();
                    if (typeof e != "string")return e;
                    var n = "TK_TAG_" + this.tag_type;
                    return [e, n]
                }
            }, this.get_full_indent = function (e) {
                return e = this.indent_level + e || 0, e < 1 ? "" : Array(e + 1).join(this.indent_string)
            }, this.is_unformatted = function (e, t) {
                if (!this.Utils.in_array(e, t))return !1;
                if (e.toLowerCase() !== "a" || !this.Utils.in_array("a", t))return !0;
                var n = this.get_tag(!0), r = (n || "").match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);
                return !r || this.Utils.in_array(r, t) ? !0 : !1
            }, this.printer = function (e, n, r, i, s) {
                this.input = e || "", this.output = [], this.indent_character = n, this.indent_string = "", this.indent_size = r, this.brace_style = s, this.indent_level = 0, this.wrap_line_length = i, this.line_char_count = 0;
                for (var o = 0; o < this.indent_size; o++)this.indent_string += this.indent_character;
                this.print_newline = function (e, t) {
                    this.line_char_count = 0;
                    if (!t || !t.length)return;
                    (e || t[t.length - 1] !== "\n") && t.push("\n")
                }, this.print_indentation = function (e) {
                    for (var t = 0; t < this.indent_level; t++)e.push(this.indent_string), this.line_char_count += this.indent_string.length
                }, this.print_token = function (e) {
                    (e || e !== "") && this.output.length && this.output[this.output.length - 1] === "\n" && (this.print_indentation(this.output), e = t(e)), this.print_token_raw(e)
                }, this.print_token_raw = function (e) {
                    e && e !== "" && (e.length > 1 && e[e.length - 1] === "\n" ? (this.output.push(e.slice(0, -1)), this.print_newline(!1, this.output)) : this.output.push(e));
                    for (var t = 0; t < this.newlines; t++)this.print_newline(t > 0, this.output);
                    this.newlines = 0
                }, this.indent = function () {
                    this.indent_level++
                }, this.unindent = function () {
                    this.indent_level > 0 && this.indent_level--
                }
            }, this
        }

        var o, u, a, f, l, c, h, p;
        r = r || {}, r.wrap_line_length == undefined && r.max_char != undefined && (r.wrap_line_length = r.max_char), u = parseInt(r.indent_size || 4), a = r.indent_char || " ", l = r.brace_style || "collapse", f = r.wrap_line_length === 0 ? 32786 : parseInt(r.wrap_line_length || 250), c = r.unformatted || ["a", "span", "bdo", "em", "strong", "dfn", "code", "samp", "kbd", "var", "cite", "abbr", "acronym", "q", "sub", "sup", "tt", "i", "b", "big", "small", "u", "s", "strike", "font", "ins", "del", "pre", "address", "dt", "h1", "h2", "h3", "h4", "h5", "h6"], h = r.preserve_newlines || !0, p = h ? parseInt(r.max_preserve_newlines || 32786) : 0, o = new d, o.printer(n, a, u, f, l);
        for (; ;) {
            var v = o.get_token();
            o.token_text = v[0], o.token_type = v[1];
            if (o.token_type === "TK_EOF")break;
            switch (o.token_type) {
                case"TK_TAG_START":
                    o.print_newline(!1, o.output), o.print_token(o.token_text), o.indent_content && (o.indent(), o.indent_content = !1), o.current_mode = "CONTENT";
                    break;
                case"TK_TAG_STYLE":
                case"TK_TAG_SCRIPT":
                    o.print_newline(!1, o.output), o.print_token(o.token_text), o.current_mode = "CONTENT";
                    break;
                case"TK_TAG_END":
                    if (o.last_token === "TK_CONTENT" && o.last_text === "") {
                        var m = o.token_text.match(/\w+/)[0], g = o.output[o.output.length - 1].match(/<\s*(\w+)/);
                        (g === null || g[1] !== m) && o.print_newline(!1, o.output)
                    }
                    o.print_token(o.token_text), o.current_mode = "CONTENT";
                    break;
                case"TK_TAG_SINGLE":
                    var y = o.token_text.match(/^\s*<([a-z]+)/i);
                    (!y || !o.Utils.in_array(y[1], c)) && o.print_newline(!1, o.output), o.print_token(o.token_text), o.current_mode = "CONTENT";
                    break;
                case"TK_CONTENT":
                    o.print_token(o.token_text), o.current_mode = "TAG";
                    break;
                case"TK_STYLE":
                case"TK_SCRIPT":
                    if (o.token_text !== "") {
                        o.print_newline(!1, o.output);
                        var b = o.token_text, w, E = 1;
                        o.token_type === "TK_SCRIPT" ? w = typeof i == "function" && i : o.token_type === "TK_STYLE" && (w = typeof s == "function" && s), r.indent_scripts === "keep" ? E = 0 : r.indent_scripts === "separate" && (E = -o.indent_level);
                        var S = o.get_full_indent(E);
                        if (w)b = w(b.replace(/^\s*/, S), r); else {
                            var x = b.match(/^\s*/)[0], T = x.match(/[^\n\r]*$/)[0].split(o.indent_string).length - 1, N = o.get_full_indent(E - T);
                            b = b.replace(/^\s*/, S).replace(/\r\n|\r|\n/g, "\n" + N).replace(/\s+$/, "")
                        }
                        b && (o.print_token_raw(S + e(b)), o.print_newline(!1, o.output))
                    }
                    o.current_mode = "TAG"
            }
            o.last_token = o.token_type, o.last_text = o.token_text
        }
        return o.output.join("")
    }

    if (typeof define == "function")define(function (e, t, r) {
        var i = e("./beautify.js").js_beautify, s = e("./beautify-css.js").css_beautify;
        t.html_beautify = function (e, t) {
            return n(e, t, i, s)
        }
    }); else if (typeof exports != "undefined") {
        var r = require("./beautify.js").js_beautify, i = require("./beautify-css.js").css_beautify;
        exports.html_beautify = function (e, t) {
            return n(e, t, r, i)
        }
    } else typeof window != "undefined" ? window.html_beautify = function (e, t) {
        return n(e, t, window.js_beautify, window.css_beautify)
    } : typeof global != "undefined" && (global.html_beautify = function (e, t) {
        return n(e, t, global.js_beautify, global.css_beautify)
    })
})()