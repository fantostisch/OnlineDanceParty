// Based on https://developer.chrome.com/docs/extensions/mv2/getstarted/
// Necessary for Chrome to show the popup in page_action
// @ts-nocheck
if (chrome != null && chrome.declarativeContent != null) {
    chrome.runtime.onInstalled.addListener(function () {
        chrome.declarativeContent.onPageChanged.removeRules(
            undefined,
            function () {
                chrome.declarativeContent.onPageChanged.addRules([
                    {
                        conditions: [
                            new chrome.declarativeContent.PageStateMatcher({
                                pageUrl: { hostEquals: "justdancenow.com" },
                            }),
                        ],
                        actions: [
                            new chrome.declarativeContent.ShowPageAction(),
                        ],
                    },
                ])
            }
        )
    })
}
