document.addEventListener('DOMContentLoaded', function() {
  const hideBySelectorBtn = document.getElementById('hide-by-selector-btn');
  const selectorInput = document.getElementById('selector-input');

  hideBySelectorBtn.addEventListener('click', () => {
    const selector = selectorInput.value;
    if (selector) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: hideElementsBySelector,
          args: [selector]
        });
      });
    }
  });

  function hideElementsBySelector(selector) {
    try {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => el.style.display = 'none');
    } catch (e) {
      console.error(`Invalid selector: ${selector}`);
    }
  }
});