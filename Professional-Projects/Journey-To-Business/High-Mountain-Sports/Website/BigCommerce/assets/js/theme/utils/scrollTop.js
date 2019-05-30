/**
 * Scroll to the top of the main content container.
 */
export default function() {
  const $collectionTop = $('.main-content');

  if ($collectionTop.length > 0) {
    const scrollTop = $collectionTop.offset().top;

    $('html, body').animate({scrollTop}, 200);
  }
}
