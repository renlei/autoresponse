chrome.browserAction.onClicked.addListener(function () {
    var e = chrome.extension.getURL("html/options.html");
    window.open(e, "fiddler_option_page")
})