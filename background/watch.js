chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    chrome.storage.sync.get(["userDistractionPages"], result => {
      if (result.userDistractionPages.some(item => tab.url.includes(item))) {
        alert("Just Focus!");
        chrome.tabs.remove(tabId);
      }
    });
  }
});
