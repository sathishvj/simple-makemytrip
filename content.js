(() => {

  function hideElementsByClassName(className) {
    const elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = 'none';
    }
  }

  /**
   * Hides an element by its ID.
   * @param {string} id The ID of the element to hide.
   */
  function hideElementById(id) {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = 'none';
    }
  }

  /**
   * Hides elements that have a class name starting with a given string.
   * @param {string} prefix The starting string of the class name.
   */
  function hideElementsWithClassNameStartingWith(prefix) {
    const elements = document.querySelectorAll(`[class*="${prefix}"]`);
    elements.forEach(el => {
      for (const className of el.classList) {
        if (className.startsWith(prefix)) {
          el.style.display = 'none';
          break;
        }
      }
    });
  }

  /**
   * Hides elements that have a class name containing a given string.
   * @param {string} substring The string to search for in class names.
   */
  function hideElementsWithClassNameContaining(substring) {
    const elements = document.querySelectorAll(`[class*="${substring}"]`);
    elements.forEach(el => {
      for (const className of el.classList) {
        if (className.includes(substring)) {
          el.style.display = 'none';
          break;
        }
      }
    });
  }

  /**
   * Hides an ancestor element of any element whose text content or title attribute contains a given string.
   * @param {string} substring The string to search for in the text content or title.
   * @param {number} levelsUp The number of parent levels to navigate up before hiding. Defaults to 1.
   */
  function hideParentElementIfTextOrTitleContains(substring, levelsUp = 1) {
    const xpath = `//*[contains(text(), "${substring}") or contains(@title, "${substring}")]`;
    const result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

    let element;
    while ((element = result.iterateNext())) {
        let parentToHide = element;
        for (let i = 0; i < levelsUp; i++) {
            if (parentToHide.parentElement) {
                parentToHide = parentToHide.parentElement;
            } else {
                parentToHide = null;
                break;
            }
        }

        if (parentToHide) {
            parentToHide.style.display = 'none';
        }
    }
  }

  function run() {
    if (window.location.pathname.startsWith('/flights')) {
      const classesToHide= [
        'choosFrom',
        'choosFrom__list',
        'superOfferSection',
        '_dealCarousel',
        'appDnldCnt',
        'placeInfo',
      ];

      classesToHide.forEach(className => {
        hideElementsByClassName(className);
      });

      const textTitlesToHide = [
        { text: 'Experience Flying with our Airline Partners', levels: 1 },
        { text: 'Add Zero Cancellation', levels: 5 },
      ];

      textTitlesToHide.forEach(item => {
        hideParentElementIfTextOrTitleContains(item.text, item.levels);
      });
    }


    if (window.location.pathname.startsWith('/flight/reviewDetails')) {

      const classesToHide= [
		  'refundSection',
		  'UnmatchedComboFaresSection'
      ];

      classesToHide.forEach(className => {
        hideElementsByClassName(className);
      });

      const idsToHide= [
		  'TRAVEL_PLANS',
		  'IMP_INFO',
		  'FAST_FORWARD',
		  'INDIGO_FAST_FORWARD',
		  'FARE_LOCK'
      ];

      idsToHide.forEach(idName => {
        hideElementById(idName);
      });


	}
  }

  // Run on initial load
  run();

  // Since MakeMyTrip is a single-page application, content might be loaded dynamically.
  // We need to observe for changes in the DOM.
  const observer = new MutationObserver(run);
  observer.observe(document.body, { childList: true, subtree: true });

})();
