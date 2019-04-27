const listContainerDistractionPages = document.getElementById(
  "distraction-pages-list"
);
const addUrlInput = document.getElementById("set-url");
const addUrlButton = document.getElementById("button-set-url");

chrome.storage.sync.get(["userDistractionPages"], result => {
  result.userDistractionPages.forEach(item => {
    const listElement = document.createElement("li");
    listElement.innerHTML = `${item} <button class="delete-url" id="delete-url-${item}">DELETE</button>`;
    listContainerDistractionPages.appendChild(listElement);

    const deleteUrlButton = document.getElementById(`delete-url-${item}`);
    deleteUrlButton.addEventListener("click", () => {
      deleteUrlFromsStorage(item, () => {
        listContainerDistractionPages.removeChild(listElement);
      });
    });
  });
});

addUrlButton.addEventListener("click", () => {
  chrome.storage.sync.get(["userDistractionPages"], result => {
    const willAddUrl = addUrlInput.value;

    if (willAddUrl.trim().length <= 0) return;
    const listOfUrl = result.userDistractionPages;

    if (listOfUrl.includes(willAddUrl)) return;
    listOfUrl.push(willAddUrl);

    chrome.storage.sync.set({ userDistractionPages: listOfUrl }, () => {
      const listElement = document.createElement("li");
      listElement.innerHTML = `${willAddUrl} <button class="delete-url" id="delete-url-${willAddUrl}")">DELETE</button>`;
      listContainerDistractionPages.appendChild(listElement);
      addUrlInput.value = "";

      const deleteUrlButton = document.getElementById(
        `delete-url-${willAddUrl}`
      );

      deleteUrlButton.addEventListener("click", () => {
        deleteUrlFromsStorage(willAddUrl, () => {
          listContainerDistractionPages.removeChild(listElement);
        });
      });
    });
  });
});

function deleteUrlFromsStorage(willDeleteUrl, cb) {
  chrome.storage.sync.get(["userDistractionPages"], result => {
    const listUrl = result.userDistractionPages.filter(
      item => item !== willDeleteUrl
    );

    chrome.storage.sync.set({ userDistractionPages: listUrl }, cb);
  });
}
