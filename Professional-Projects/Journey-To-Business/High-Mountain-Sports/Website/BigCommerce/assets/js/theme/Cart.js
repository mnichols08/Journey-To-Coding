import PageManager from '../PageManager';
import utils from '@bigcommerce/stencil-utils';

import ShippingCalculator from './cart/ShippingCalculator';
import GiftWrap from './cart/GiftWrap';
import GiftCertificate from './cart/GiftCertificates';
import refreshContent from './cart/refreshContent';
import EditOptions from './cart/EditOptions';

export default class Cart extends PageManager {

  constructor() {
    super();

    this.$cartBlock  = $('.cart-content');
    this.$cartFooter = $('.cart-table-footer');

    this.productQuantities = [];

    // brute-force apple-pay bodyclass in local environment
    if (window.ApplePaySession && $('.dev-environment').length) {
      $(document.body).addClass('apple-pay-supported');
    }
  }

  loaded(next) {
    this.calculator = new ShippingCalculator();
    this.giftWrap = new GiftWrap(this.$cartBlock);
    this.giftCertificate = new GiftCertificate(this.$cartBlock);

    new EditOptions(this.context);
    this._bindCartItemEvents();

    next();
  }

  /**
   * Bind and re-bind cart item events.
   */

  _bindCartItemEvents() {
    const $cartItems = this.$cartBlock.find('.cart-item');
    const $emptyMessage = $('.message-cart-empty');

    // loop through items, cache current quantities
    $cartItems.each((i, el)=> {
      const $item = $(el);
      const id = $item.data('id');
      const $input = $item.find('.quantity-input');

      this.productQuantities[id] = parseInt($input.val(), 10);

      // set up revealer for hiding
      $item.revealer('show', true);

      // remove item after removal event, revert to empty cart state if needs be
      $item.on('revealer-hide', (event) => {
        const $item = $(event.currentTarget);

        // hide totals and show message if cart is now empty
        if (!$item.siblings('.cart-item').length) {
          this.$cartFooter.empty();
          $emptyMessage.removeClass('hidden');
        }

        $item.remove();
      });

      // show or hide update button if we hit a new quantity
      $input.on('keyup mouseup', () => {
        const newQty = parseInt($input.val(), 10);
        if (newQty >= 0 && newQty !== this.productQuantities[id]) {
          $input.siblings('.update-quantity').addClass('visible');
        } else {
          $input.siblings('.update-quantity').removeClass('visible');
        }
      });

      // show the old quantity if someone leaves it empty
      $input.on('blur', () => {
        if ($input.val() === '') {
          $input.val(this.productQuantities[id]);
        }
      });

      // bind item removal
      $item.on('click', '.remove-item', (event) => {
        event.preventDefault();
        const confirm = window.confirm(this.context.messagesCartRemoveConfirm);

        if (confirm) {
          this._removeItem($item);
        }
      });
    });

    // bind item quantity update
    this.$cartBlock.on('click', '.update-quantity', (event) => {
      event.preventDefault();
      const $target   = $(event.target);
      const $item    = $target.closest('.cart-item');
      const itemId   = $item.data('id');
      const newQty   = parseInt($item.find('.quantity-input').val(), 10);

      if (newQty === 0 &&  window.confirm(this.context.messagesCartRemoveConfirm)) {
        this._removeItem($item);
      } else {
        this._updateItem($item, $target, itemId, newQty);
      }
    });
  }

  /**
   * Update an item with a new quantity (other than zero).
   * @param {jQuery} $item - the cart row item.
   * @param {jQuery} $target - the 'update' link.
   * @param {string} itemId - The ID of the product we're updating.
   * @param {int} qty - the new quantity we're wanting to update to.
   */
  _updateItem($item, $target, itemId, qty) {
    const $itemName = $item.data('name');
    this.$cartBlock.addClass('cart-processing');

    // send our love to quickcart
    utils.hooks.emit('cart-item-update');

    utils.api.cart.itemUpdate(itemId, qty, (err, response) => {
      if (err || response.data.status === 'failed') {
        // reset quantity to original
        $item.find('.quantity-input').val($item.data('qty'));

        // reset button visibility
        $target.removeClass('visible');

        if (response.data.errors[0] === 'out_of_stock') {
          alert(this.context.messagesCartOutOfStock);
        } else {
          let message = this.context.messagesCartQuantityErrorGeneral;
          message = message.replace('*product*', $itemName);
          alert(message);
        }
        this.$cartBlock.removeClass('cart-processing');
      } else if (response.data.status === 'succeed') {
        // update cached values
        this.productQuantities[itemId] = qty;
        $item.attr('data-qty', qty);

        // refresh footer and items list
        refreshContent(['content', 'footer'], () => {
          this._bindCartItemEvents();
          this.$cartBlock.removeClass('cart-processing');
        });
      }
    });
  }

  /**
   * Remove an item from the cart
   * @param {jQuery} $item - the cart row item.
   */
  _removeItem($item) {
    this.$cartBlock.addClass('cart-processing');

    const itemId = $item.data('id');

    // send our love to quickcart
    utils.hooks.emit('cart-item-remove');

    // hide item row
    $item.revealer('hide');

    utils.api.cart.itemRemove(itemId, (err, response) => {
      if (response.data.status === 'succeed') {

        // refresh footer and items list
        refreshContent(['content', 'footer'], () => {
          this._bindCartItemEvents();
          this.$cartBlock.removeClass('cart-processing');
        });
      } else {
        this.$cartBlock.removeClass('cart-processing');
        console.log(err, response); // TODO: error handling
      }
    });
  }
}
