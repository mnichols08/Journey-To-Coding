
export default class SearchBox {
  constructor() {
    this.$el = $('.search-form-container');
    this.$input = this.$el.find('input[type="text"]');
    this._bindEvents();
  }

  _bindEvents() {
    this.$el.on('click', () => {
      this.$input.focus();
    });

    this.$input.on('focus', () => {
      this.$el.addClass('focus');
    });

    $('body').on('click', (event) => {
      const $target = $(event.target);

      if (!$target.parents('.search-form-container').length) {
        this.$el.removeClass('focus');
        this.$el.trigger('search-form-close');
      }
    });
  }
}
