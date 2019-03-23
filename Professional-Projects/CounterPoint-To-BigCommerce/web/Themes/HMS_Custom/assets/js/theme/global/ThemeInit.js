import hasTouch from '../utils/hasTouch';

export default class ThemeInit {

  constructor() {
    $(document).ready(() => {
      this._addClasses();
      this._backToTop();
      this._dismissable();
      this._bindCheckboxes();
    });
  }

  // -------------------------- Very basic touch detection -------------------------- //

  _addClasses() {
    const classes = ['js'];

    if (hasTouch()) {
      classes.push('has-touch');
    } else {
      classes.push('no-touch');
    }

    $('html').removeClass('no-js').addClass(classes.join(' '));
  }

  // -------------------------- Faceted search checkboxes -------------------------- //

  // fake a label/checkbox interaction even though it's a dummy checkbox with an anchor
  // to be run on any pages with faceted search
  _bindCheckboxes() {
    $('.faceted-search').on('click', '[data-faceted-search-facet]', (event) => {
      event.preventDefault();
      const $checkbox = $(event.currentTarget).find('.facet-checkbox');

      // need to wrap in a timeout to bypass the preventDefault
      setTimeout(() => {
        $checkbox.prop('checked', !$checkbox.prop('checked'));
        $checkbox.blur();
      }, 1);
    });
  }

  // -------------------------- Dismissable messages -------------------------- //

  _dismissable() {
    $('body').on('click', '.alert-dismiss', (event) => {
      event.preventDefault();
      const $target = $(event.currentTarget);
      const $message = $target.parent('.alert');

      $message.one('trend', () => {
        $message.addClass('hidden');
      });

      $message.addClass('dismissed');
    });
  }

  // -------------------------- Back to Top Button -------------------------- //

  _backToTop() {
    $('[data-to-top]').on('click', (event) => {
      event.preventDefault();

      $('html, body').animate({
        scrollTop: 0,
      }, 100);
    });
  }


}

