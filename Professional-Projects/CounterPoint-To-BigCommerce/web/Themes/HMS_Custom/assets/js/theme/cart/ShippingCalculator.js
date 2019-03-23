import utils from '@bigcommerce/stencil-utils';

import refreshContent from './refreshContent';
import ProgressButton from '../utils/progressButton';

export default class ShippingCalculator {
  constructor() {
    this.$cartFooter = $('.cart-table-footer');

    this._bindEvents();
  }

  _bindEvents() {
    this.$cartFooter.on('click', '[data-shipping-calculator-toggle]', (event) => {
      event.preventDefault();
      this._toggleCalculator();
    });

    this.$cartFooter.on('submit', '#shipping-calculator-form', (event) => {
      event.preventDefault();
      this._calculateShipping(event);
    });

    this.$cartFooter.on('change', 'select[name="shipping-country"]', (event) => {
      this._updateStates(event);
    });
  }

  _toggleCalculator() {
    this.$cartFooter.find('#shipping-calculator-wrapper').toggleClass('visible');
  }

  _updateStates(event) {
    const $target = $(event.currentTarget);
    const country = $target.val();
    const $stateElement = $('[name="shipping-state"]');

    utils.api.country.getByName(country, (err, response) => {
      if (response.data.states.length) {
        const stateArray = [];
        stateArray.push(`<option value="">${response.data.prefix}</option>`);
        $.each(response.data.states, (i, state) => {
          stateArray.push(`<option value="${state.id}">${state.name}</option>`);
        });
        $stateElement.replaceWith(`<select class="form-input form-select" id="shipping-state" name="shipping-state" data-field-type="State">${stateArray.join(' ')}</select>`);
      } else {
        $stateElement.replaceWith('<input type="text" class="form-input" id="shipping-state" name="shipping-state" data-field-type="State">');
      }
    });
  }

  _calculateShipping(event) {
    const $button = $(event.target).find('.button-shipping-estimate-submit');
    const $shippingQuotes = this.$cartFooter.find('[data-shipping-quotes]');

    const params = {
      country_id: $('[name="shipping-country"]', this.$cartFooter).val(),
      state_id: $('[name="shipping-state"]', this.$cartFooter).val(),
      city: $('[name="shipping-city"]', this.$cartFooter).val(),
      zip_code: $('[name="shipping-zip"]', this.$cartFooter).val(),
    };

    ProgressButton.progress($button);

    utils.api.cart.getShippingQuotes(params, 'cart/shipping-quotes', (err, response) => {
      if (response.data.quotes) {
        $shippingQuotes.html(response.content);
      } else {
        alert(response.data.errors.join('\n'));
      }

      ProgressButton.complete($button);

      // bind the select button
      $shippingQuotes.find('.button').on('click', (event) => {
        event.preventDefault();
        const $button = $(event.currentTarget);
        const quoteId = $('[data-shipping-quote]:checked').val();


        this.$cartFooter.addClass('cart-processing');
        ProgressButton.progress($button);

        utils.api.cart.submitShippingQuote(quoteId, () => {
          refreshContent(['footer'], () => {
            this.$cartFooter.removeClass('cart-processing');
            ProgressButton.complete($button);
          });
        });
      });
    });
  }
}
