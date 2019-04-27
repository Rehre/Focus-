chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ userDistractionPages: [] }, () => {
    console.log("successfully initiated distraction pages");
  });
});
