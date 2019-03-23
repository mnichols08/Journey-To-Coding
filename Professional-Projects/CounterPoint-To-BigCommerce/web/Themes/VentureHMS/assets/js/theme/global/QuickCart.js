import utils from '@bigcommerce/stencil-utils';

export default class QuickCart {
  constructor() {
    this.$quickCartContainer = $('#quickcart-container');
    this.$quickCartCount = $('#quickcart-count');

    this.cartChangeHooks = [
      'cart-item-add',
      'cart-item-update',
      'cart-item-remove',
    ];

    this.cartChangeRemoteHooks = [
      'cart-item-add-remote',
      'cart-item-update-remote',
      'cart-item-remove-remote',
    ];

    this._bindUtilHooks();
    this._bindEvents();
  }

  _bindEvents() {
    // remove border from cart footer if we aren't scrolled all the way
    this.$quickCartContainer.find('.cart-content-area').on('scroll', (evt) => {
      if (evt.currentTarget.scrollTop + evt.currentTarget.clientHeight >= evt.currentTarget.scrollHeight) {
        this.$quickCartContainer.addClass('bottomed');
      } else if (this.$quickCartContainer.hasClass('bottomed')) {
        this.$quickCartContainer.removeClass('bottomed');
      }
    });

    //remove item on click
    this.$quickCartContainer.on('click', '.product-remove', (evt) => {
      evt.preventDefault();
      const id = $(evt.currentTarget).data('product-id');
      this._removeItem(id);
    });
  }

  /**
   * Bind hook actions so quickcart updates remotely.
   * cannot bind multple events in the standard space-separated way.
   * TODO: chance for errors here?
   */
  _bindUtilHooks() {
    // initial events: when an update button is clicked
    this.cartChangeHooks.forEach((hook) => {
      utils.hooks.on(hook, () => {
        this._showOverlay();
      });
    });

    // remote events: when the proper response is sent
    this.cartChangeRemoteHooks.forEach((hook) => {
      utils.hooks.on(hook, () => {
        this._refreshQuickCart();
      });
    });
  }

  _removeItem(itemId) {
    this._showOverlay();
    utils.api.cart.itemRemove(itemId, (err, response) => {
      if (response && response.data.status === 'succeed') {
        this._refreshQuickCart();
      } else {
        alert(response.data.errors.join('\n'));
        this._hideOverlay();
      }
    });
  }

  _refreshQuickCart() {
    utils.api.cart.getContent({template: 'cart/quickcart'}, (err, response) => {
      this.$quickCartContainer.html(response);

      // get cart count from newly appended response
      const count = $('#quick-cart').data('count');
      if (count) {
        this.$quickCartCount.text(count);
      } else {
        this.$quickCartCount.empty();
      }

      this._hideOverlay();
    });
  }

  _showOverlay() {
    $('#quick-cart-overlay').show();
  }

  _hideOverlay() {
    $('#quick-cart-overlay').hide();
  }
}

