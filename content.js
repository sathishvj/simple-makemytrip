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

  /**
   * Selects a radio button based on the text of a nearby label.
   * @param {string} text The text to search for in the label.
   */
  function selectRadioButtonByLabelText(text) {
    const xpath = `//span[contains(text(), "${text}")]/ancestor::label[contains(@class, 'radioboxContainer')]//input[@type='radio']`;
    const radioButton = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (radioButton && !radioButton.checked) {
        radioButton.click();
    }
  }

  /**
   * Clicks an element if it has a specific class and inner text.
   * @param {string} className The class name of the element.
   * @param {string} text The inner text of the element.
   */
  function clickElementByClassAndText(className, text) {
    const elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.offsetParent !== null && element.innerText.trim() === text) {
        element.click();
        break; // Assuming there's only one such element
      }
    }
  }

  /**
   * Clicks an element with the specified exact text content.
   * @param {string} text The exact text content to match.
   */
  function clickElementByText(text) {
    const xpath = `//*[text()="${text}"]`;
    const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (result && result.offsetParent !== null) {
      result.click();
    }
  }

  function run() {
    if (window.location.pathname === '' || window.location.pathname === '/' || window.location.pathname.startsWith('/flights')) {
      const classesToHide= [
        'choosFrom',
        'choosFrom__list',
        'superOfferSection',
        '_dealCarousel',
        'appDnldCnt',
        'placeInfo',
		  'tripIdeaWrapper',
		  'stayOffr',
        'tpDest',
		  'hpClcn',
      ];

      classesToHide.forEach(className => {
        hideElementsByClassName(className);
      });

      const textTitlesToHide = [
        { text: 'Experience Flying with our Airline Partners', levels: 1 },
        { text: 'Add Zero Cancellation', levels: 5 },
        { text: 'Flagship Hotel Stores on MakeMyTrip', levels: 2 },
      ];

      textTitlesToHide.forEach(item => {
        hideParentElementIfTextOrTitleContains(item.text, item.levels);
      });
    }


    if (window.location.pathname.startsWith('/flight/reviewDetails')) {

      const classesToHide= [
		  'refundSection',
		  'UnmatchedComboFaresSection',
		  'baggageTag',
		  'claimSectionV3',
		  'intlInsurancePersuation',
      ];

      classesToHide.forEach(className => {
        hideElementsByClassName(className);
      });

      const idsToHide= [
		  'TRAVEL_PLANS',
		  'IMP_INFO',
		  'FAST_FORWARD',
		  'INDIGO_FAST_FORWARD',
		  'FARE_LOCK',
		  'insuranceDeals',
		  'SEATS_N_MEALS',
		  'DELAY_INSURANCE',
		  'BYPASS_CABS',
		  'AIRPORT_SERVICES',
		  'CHARITY_V2',
      ];

      idsToHide.forEach(idName => {
        hideElementById(idName);
      });

	selectRadioButtonByLabelText('I will book without trip secure.');

      const textTitlesToHide = [
        { text: 'secured their trip in the last month. Get your trip also secured.', levels: 3 },
      ];

      textTitlesToHide.forEach(item => {
        hideParentElementIfTextOrTitleContains(item.text, item.levels);
      });

		clickElementByClassAndText('linkText', 'Skip to cabs');
		clickElementByClassAndText('linkText', 'Skip to add-ons');

	}

    if (window.location.hostname === 'payments.makemytrip.com') {
      clickElementByText('View Details');
      clickElementByText('VIEW ALL');

		
      const textTitlesToHide = [
        { text: 'Flight Delay Protection', levels: 4 },
      ];

      textTitlesToHide.forEach(item => {
        hideParentElementIfTextOrTitleContains(item.text, item.levels);
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
