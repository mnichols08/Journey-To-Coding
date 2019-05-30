import utils from '@bigcommerce/stencil-utils';
import refreshContent from './refreshContent';

export default class GiftCertificates {
  constructor($cartContent) {
    this.$cartContent = $cartContent;
    this.$cartFooter = this.$cartContent.find('.cart-table-footer');
    this.$certInput = $('[data-gift-certificate-input]');
    this.giftCardApplySelector = '[data-gift-card-apply]';
    this._bindEvents();
  }

  _bindEvents() {
    this.$cartContent.on('click', this.giftCardApplySelector, (event) => {
      const $submit = $(event.currentTarget);
      const code = this.$certInput.val();
      event.preventDefault();

      if (! this._isValidCode(code)) {
        return alert($submit.data('error'));
      }

      this.$cartFooter.addClass('cart-processing');

      utils.api.cart.applyGiftCertificate(code, (err, resp) => {
        if (resp.data.status === 'success') {
          refreshContent(['footer'], () => {
            this.$cartFooter.removeClass('cart-processing');
          });
        } else {
          alert(resp.data.errors.join('\n'));
          this.$cartFooter.removeClass('cart-processing');
        }
      });
    });
  }

  _isValidCode(code) {
    return code !=='';
  }
}
