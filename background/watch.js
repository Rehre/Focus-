chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    chrome.storage.sync.get(["userDistractionPages"], result => {
      if (result.userDistractionPages.some(item => tab.url.includes(item))) {
        chrome.storage.sync.get(["timeoutInterval"], result => {
          setTimeout(() => {
            alert("Just Focus!");
            chrome.tabs.remove(tabId);
          }, result.timeoutInterval);
        });
      }
    });
  }
});
