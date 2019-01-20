chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({userDistractionPages: []}, () => {
        console.log('successfully initiated distraction pages');
    });

    chrome.storage.sync.set({timeoutInterval: 0}, () => {
        console.log('successfully initiated timeout interval');
    });
});