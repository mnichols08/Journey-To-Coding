export default class CurrencySelector {
  constructor() {
    this.$el = $('[data-currency-selector]');
    this._bindEvents();
  }

  _bindEvents() {
    this.$el.on('change', () => {
      this._updateCurrency();
    });
  }

  _updateCurrency() {
    const newCurrency = this.$el.val();
    window.location = newCurrency;
  }
}
