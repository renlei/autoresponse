(function () {
    function e() {
        var e = "break case catch continue default delete do else false  for function if in instanceof new null return super switch this throw true try typeof var while with", t = SyntaxHighlighter.regexLib;
        this.regexList = [{regex: t.multiLineDoubleQuotedString, css: "string"}, {
            regex: t.multiLineSingleQuotedString,
            css: "string"
        }, {regex: t.singleLineCComments, css: "comments"}, {
            regex: t.multiLineCComments,
            css: "comments"
        }, {regex: /\s*#.*/gm, css: "preprocessor"}, {
            regex: new RegExp(this.getKeywords(e), "gm"),
            css: "keyword"
        }], this.forHtmlScript(t.scriptScriptTags)
    }

    typeof require != "undefined" ? SyntaxHighlighter = require("shCore").SyntaxHighlighter : null, e.prototype = new SyntaxHighlighter.Highlighter, e.aliases = ["js", "jscript", "javascript"], SyntaxHighlighter.brushes.JScript = e, typeof exports != "undefined" ? exports.Brush = e : null
})()