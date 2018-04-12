// Listen for button press & open the sidebar
browser.browserAction.onClicked.addListener(() => {
    browser.sidebarAction.open()
});

