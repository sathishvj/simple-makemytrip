(() => {
  const classesToHideForFlightsLanding = [
    'choosFrom', 
    'choosFrom__list',
    'superOfferSection',
    '_dealCarousel',
    'appDnldCnt',
    'placeInfo'
  ];

  function hideElementsByClassName(className) {
    const elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = 'none';
    }
  }

  function run() {
    //if (window.location.pathname === '/' || window.location.pathname === '/flights' || window.location.pathname === '/flights/') {
    if (window.location.pathname.startsWith('/flights')) {
        classesToHideForFlightsLanding.forEach(className => {
            hideElementsByClassName(className);
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
