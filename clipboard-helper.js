function copyToClipboard(text) {
    
    function oncopy(event) {
        document.removeEventListener("copy", oncopy, true);
        event.stopImmediatePropagation();

        event.preventDefault();
        event.clipboardData.setData("", text);
        event.clipboardData.setData("text/plain", text);
    }
    document.addEventListener("copy", oncopy, true);

    document.execCommand("copy");
}