
// test for desktop mode against visibility of mobile-only dropdown buttons
function isMobileMenu() {
  return $('.open-dropdown:visible').length > 0;
}

export default function touchHoverMenu() {
  // If touch-enabled browser, prevent tap on parent nav item from redirecting to URL
  $('.menu-dropdown > a').on('touchstart', function(event) {
    if (!isMobileMenu()) {
      const $parent = $(this).parent();

      // Remove the 'tapped' class on any other menu items
      $('.menu-dropdown').not($parent).removeClass('tapped');
      $parent.toggleClass('tapped');
      if ($parent.hasClass('tapped')) {
        // once link has been 'focussed', second click will go through
        event.preventDefault();
      }
    }
  });

  // bind event listener to 'unfocus' menu item
  $(document.body).on('touchstart', function(event) {
    // only if the click occurs outside of the menu
    if (!$.contains(document.getElementById('main-navigation'), event.target)) {
      $('.menu-dropdown').removeClass('tapped');
    }
  });
}
