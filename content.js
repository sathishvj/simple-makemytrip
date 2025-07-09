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

  /**
   * Checks a radio button by its ID.
   * @param {string} id The ID of the radio button to check.
   */
  function checkRadioButtonById(id) {
    const radioButton = document.getElementById(id);
    if (radioButton && radioButton.type === 'radio' && !radioButton.checked) {
      radioButton.click();
    }
  }

  function run() {
    if (window.location.hostname === 'www.makemytrip.com') {
		if (window.location.pathname === '' || window.location.pathname === '/' || window.location.pathname.startsWith('/flights')) {
		        const classesToHide = {
        'choosFrom': true,
        'choosFrom__list': true,
        'superOfferSection': true,
        '_dealCarousel': true,
        'appDnldCnt': true,
        'placeInfo': true,
        'tripIdeaWrapper': true,
        'stayOffr': true,
        'tpDest': true,
        'hpClcn': true,
      };

		  for (const className in classesToHide) {
		    if (classesToHide[className]) {
		      hideElementsByClassName(className);
		    }
		  }

		        const textTitlesToHide = {
        'Experience Flying with our Airline Partners': { levels: 1, enabled: true },
        'Add Zero Cancellation': { levels: 5, enabled: true },
        'Flagship Hotel Stores on MakeMyTrip': { levels: 2, enabled: true },
      };

		  for (const text in textTitlesToHide) {
		    const item = textTitlesToHide[text];
		    if (item.enabled) {
		      hideParentElementIfTextOrTitleContains(text, item.levels);
		    }
		  }
		}


		if (window.location.pathname.startsWith('/flight/reviewDetails')) {

		        const classesToHide = {
        'refundSection': true,
        'UnmatchedComboFaresSection': true,
        'baggageTag': true,
        'claimSectionV3': true,
        'intlInsurancePersuation': true,
      };

		  for (const className in classesToHide) {
		    if (classesToHide[className]) {
		      hideElementsByClassName(className);
		    }
		  }

		        const idsToHide = {
        'TRAVEL_PLANS': true,
        'IMP_INFO': true,
        'FAST_FORWARD': true,
        'INDIGO_FAST_FORWARD': true,
        'FARE_LOCK': true,
        'insuranceDeals': true,
        'DELAY_INSURANCE': true,
        'BYPASS_CABS': true,
        'AIRPORT_SERVICES': true,
        'CHARITY_V2': true,
      };

		  for (const idName in idsToHide) {
		    if (idsToHide[idName]) {
		      hideElementById(idName);
		    }
		  }

		selectRadioButtonByLabelText('I will book without trip secure.');

		        const textTitlesToHide = {
        'secured their trip in the last month. Get your trip also secured.': { levels: 3, enabled: true },
      };

		  for (const text in textTitlesToHide) {
		    const item = textTitlesToHide[text];
		    if (item.enabled) {
		      hideParentElementIfTextOrTitleContains(text, item.levels);
		    }
		  }

			//clickElementByClassAndText('linkText', 'Skip to cabs');
			//clickElementByClassAndText('linkText', 'Skip to add-ons');

		}
	  }

    if (window.location.hostname === 'mybiz.makemytrip.com') {
		checkRadioButtonById('NOT_SELECTED');


	}

    if (window.location.hostname === 'payments.makemytrip.com') {
      clickElementByText('View Details');
      clickElementByText('VIEW ALL');

		
       const textTitlesToHide = {
        'Flight Delay Protection': { levels: 4, enabled: true },
        };

      for (const text in textTitlesToHide) {
        const item = textTitlesToHide[text];
        if (item.enabled) {
          hideParentElementIfTextOrTitleContains(text, item.levels);
        }
      }
    }
  }

  // Run on initial load
  run();

  // Since MakeMyTrip is a single-page application, content might be loaded dynamically.
  // We need to observe for changes in the DOM.
  const observer = new MutationObserver(run);
  observer.observe(document.body, { childList: true, subtree: true });

})();
