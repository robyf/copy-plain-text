browser.contextMenus.create({
    id: "copy-as-plain-text-to-clipboard",
    title: "Copy as plain text",
    contexts: ["selection"],
});
browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "copy-as-plain-text-to-clipboard") {
        const code = "copyToClipboard(" +
            JSON.stringify(info.selectionText) + ");";

        browser.tabs.executeScript({
            code: "typeof copyToClipboard === 'function';",
        }).then((results) => {
            if (!results || results[0] !== true) {
                return browser.tabs.executeScript(tab.id, {
                    file: "clipboard-helper.js",
                });
            }
        }).then(() => {
            return browser.tabs.executeScript(tab.id, {
                code,
            });
        }).catch((error) => {
            console.error("Failed to copy text: " + error);
        });
    }
});
