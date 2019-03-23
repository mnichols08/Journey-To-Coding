/**
 * Scroll an image when hovering over its container.
 * @param {jQuery} $el - A selector for the parent element.
 */
export default function($el) {
  const $img = $el.children();

  $el.on('mousemove', (e) => {
    const elHeight = $el.outerHeight();
    const imgHeight = $img.outerHeight();
    const top = Math.floor(e.pageY - $el.offset().top);
    const percent = (top / elHeight) * ((imgHeight - elHeight) / elHeight) * 100;
    $img.css('top', `-${percent}%`);
  });

  $el.on('mouseenter', () => {
    $img.addClass('cover-hover');
  });
}
