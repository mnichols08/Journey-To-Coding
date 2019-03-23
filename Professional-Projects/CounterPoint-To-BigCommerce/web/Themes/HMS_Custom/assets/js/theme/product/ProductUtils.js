import utils from '@bigcommerce/stencil-utils';
import Alert from '../components/Alert';
import productViewTemplates from '../lib/productViewTemplates';
import _ from 'lodash';
import AttributesHelper from './AttributesHelper';
import WishList from './WishList';
import progressButton from '../utils/progressButton';

const noop = () => {};

export default class ProductUtils {
  constructor(context, $el, onImageSwitch = noop, onCartSubmitComplete = noop, productAttributesData = {}) {
    this.context = context;
    this.productAttributesData = productAttributesData;

    this.$productBlock = $el;
    this.$form         = this.$productBlock.find('form[data-cart-item-add]');
    this.$productInfo  = this.$productBlock.find('.product-info-column');
    this.productTitle  = this.$productBlock.data('product-title');
    this.productId     = this.$productBlock.data('product-id');
    this.canPurchase   = this.$productBlock.data('product-purchasable');

    // two alert locations based on action
    this.cartAddAlert = new Alert(this.$productBlock.find('[data-product-cart-message]'));
    this.cartOptionAlert = new Alert(this.$productBlock.find('[data-product-option-message]'));

    // callback after product variation link has been appended
    this.onImageSwitch = onImageSwitch;

    // callback after successful/failed cart submit
    this.onCartSubmitComplete = onCartSubmitComplete;

    this.attributesHelper = new AttributesHelper($el);
  }

  init() {
    const $productOptionsElement = $('[data-product-option-change]', this.$form);
    const hasOptions = $productOptionsElement.length > 0 ? true : false;
    const hasDefaultOptions = $productOptionsElement.find('[data-default]').length;

    if (hasDefaultOptions || (_.isEmpty(this.productAttributesData) && hasOptions)) {
      const $productId = $('[name="product_id"]', this.$form).val();

      utils.api.productAttributes.optionChange($productId, this.$form.serialize(), (err, response) => {
        const attributesData = response.data || {};
        const attributesContent = response.content || {};
        this.attributesHelper.updateAttributes(attributesData);
      });
    } else {
      this.attributesHelper.updateAttributes(this.productAttributesData);
    }

    this._bindProductOptions();

    this._bindCartSubmit();

    if (this.$productBlock.find('.swatches').length) {
      this._bindSwatchSelect();
    }

    new WishList(this.$productBlock, this.context);
  }


  // -------------------------- Adding to Cart -------------------------- //

  /**
   * Run DOM manipulations on cart add
   */
  _bindCartSubmit() {
    utils.hooks.on('cart-item-add', (event, form) => {

      // Do not do AJAX if browser doesn't support FormData. No IE9.
      if (window.FormData === undefined) { return; }

      event.preventDefault();

      const $button = this.$productBlock.find('.add-to-cart');
      const formData = new FormData(form);

      progressButton.progress($button);

      utils.api.cart.itemAdd(this.filterEmptyFilesFromForm(formData), (err, response) => {
        let isError = false;

        if (err || response.data.error) {
          isError = true;
          response = err || response.data.error;
        }

        setTimeout(() => {
          this._updateMessage(isError, response);
          progressButton.complete($button);
          this.onCartSubmitComplete();
        }, 500);
      });
    });
  }

  /**
   * Enable add to cart of product just given id
   * Needs to be a product with no options. Only one is added.
   * @param {jQuery} $buttons - a set of matched elements to be clicked,
     each with data-product-id and data-product-title attributes
   */
  static bindRemoteAdd(context, $buttons) {
    $buttons.on('click', (event) => {
      const quantity = 1;
      const $thisButton = $(event.currentTarget);
      const productId = $thisButton.data('productId');
      const productTitle = $thisButton.data('productTitle');

      // Do not do AJAX if browser doesn't support FormData. No IE9.
      if (window.FormData === undefined || !productId) { return; }

      event.preventDefault();

      progressButton.progress($thisButton);

      const formData = new FormData();
      formData.append('action', 'add');
      formData.append('product_id', productId);
      formData.append('qty', quantity);

      utils.api.cart.itemAdd(formData, (err, response) => {
        let message;

        if (err || response.data.error) {
          message = err || response.data.error;
        } else {
          message = context.messagesProductAddSuccess.replace('*product*', productTitle);
        }

        setTimeout(() => {
          alert(message);
          progressButton.complete($thisButton);
        }, 500);
      });

    });
  }


  /**
   * On successful ajax cart add we want to clear all option inputs.
   *
   */
  _clearInputs() {
    const $inputs = this.$productBlock.find('[name^="attribute"]');

    $inputs.each((index, input) => {
      const $input = $(input);

      switch (input.type) {
        case 'checkbox':
          $input.prop('checked', false);
          break;
        case 'radio':
          $input.prop('checked', false);
          if ($input.hasClass('swatch-radio')) {
            $input.parent('.swatch-wrap').removeClass('checked');
            $input.closest('.form-field').find('.swatch-value').empty();
          }
          break;
        case 'select-one':
          $input.val($input.find('[value]:first').val()); // reset selects to first selectable value
          break;
        default:
          $input.val('');
      }
    });

  }

  /**
   * Show feedback on cart button click.
   * @param {bool} isError - was the cart submit an error or success?
   * @param {string} response - request response text from bigcommerce
   */
  _updateMessage(isError, response) {
    let message = '';

    if (isError) {
      message = response;
    } else {
      const actions = `
        <div class="actions">
          <a class="button button-small" href="${this.context.urlsCart}">${this.context.messagesCartLink}</a>
          <a class="button button-small" href="${this.context.urlsCheckout}">${this.context.messagesCheckoutLink}</a>
        </div>
      `;

      message = this.context.messagesProductAddSuccess;
      message = message.replace('*product*', this.productTitle);
      message = message + actions;
    }

    this.cartAddAlert.message(message, (isError ? 'error' : 'success'), true);
  }


  // -------------------------- Product Options -------------------------- //

  /**
   * Build object of jQuery objects for easier(?) dom updating
   * @param {jQuery} $scope - the current product block.
   */
  _getViewModel($el) {
    return {
      $price: $('[data-product-price-wrapper="without-tax"]', $el),
      $priceWithTax: $('[data-product-price-wrapper="with-tax"]', $el),
      $saved: $('[data-product-price-saved]', $el),
      $sku: $('[data-product-sku]', $el),
      $weight: $('[data-product-weight]', $el),
      $addToCart: $('[data-button-purchase]', $el),
      $imagePreview: $('[data-variation-preview]', $el),
      stock: {
        $selector: $('[data-product-stock]', $el),
        $level: $('[data-product-stock-level]', $el),
      },
    };
  }

  /**
   * Apply checked class to swatch option
   */
  _bindSwatchSelect() {
    $('.swatches').on('change', (event) => {
      const $el = $(event.currentTarget).parent();
      const $swatch = $(event.target).parent('.swatch-wrap');
      const swatchValue = $swatch.data('swatch-value');

      // switch class
      $swatch.toggleClass('checked').siblings('.swatch-wrap').removeClass('checked');

      // update label
      $el.find('.swatch-value').text(swatchValue);
    });
  }

  /**
   * https://stackoverflow.com/questions/49672992/ajax-request-fails-when-sending-formdata-including-empty-file-input-in-safari
   * Safari browser with jquery 3.3.1 has an issue uploading empty file parameters. This function removes any empty files from the form params
   * @param formData: FormData object
   * @returns FormData object
   */
  filterEmptyFilesFromForm(formData) {
    try {
      for (const [key, val] of formData) {
        if (val instanceof File && !val.name && !val.size) {
          formData.delete(key);
        }
      }
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    }
    return formData;
  }

  /**
   * Run DOM manipulation on product options change.
   */
  _bindProductOptions() {
    utils.hooks.on('product-option-change', (event, changedOption) => {
      const $changedOption = $(changedOption);
      const $form = this.$productBlock.find('[data-cart-item-add]');

      // no ajax request if it's a file or if the browser doesn't support FormData
      if ($changedOption.attr('type') === 'file' || window.FormData === undefined) { return; }

      // no ajax request if product is not purchaseable
      if (!this.canPurchase) { return; }

      this.cartOptionAlert.clear(true);

      utils.api.productAttributes.optionChange(this.productId, $form.serialize(), (err, response) => {
        const productAttributesData = response.data || {};
        const productAttributesContent = response.content || {};

        this.attributesHelper.updateAttributes(productAttributesData);

        this._updateView(productAttributesData);
      });
    });
  }

  _updateView(data) {
    const viewModel = this._getViewModel(this.$productInfo);

    if (viewModel.$sku.length) {
      viewModel.$sku.html(data.sku);
    }

    // update weight if exists
    if (data.weight && viewModel.$weight.length) {
      viewModel.$weight.html(data.weight.formatted);
    }

    if (data.stock) {
      viewModel.stock.$selector.removeClass('product-details-hidden');
      viewModel.stock.$level.text(data.stock);
    } else {
      viewModel.stock.$selector.addClass('product-details-hidden');
    }

    if (viewModel.$price.length) {
      const priceStrings = {
        price: data.price,
        excludingTax: this.context.productExcludingTax,
        salePriceLabel: this.context.salePriceLabel,
        nonSalePriceLabel: this.context.nonSalePriceLabel,
        retailPriceLabel: this.context.retailPriceLabel,
        priceLabel: this.context.priceLabel,
      };
      viewModel.$price.html(productViewTemplates.priceWithoutTax(priceStrings));
    }

    if (viewModel.$priceWithTax.length) {
      const priceStrings = {
        price: data.price,
        includingTax: this.context.productIncludingTax,
        salePriceLabel: this.context.salePriceLabel,
        nonSalePriceLabel: this.context.nonSalePriceLabel,
        retailPriceLabel: this.context.retailPriceLabel,
        priceLabel: this.context.priceLabel,
      };
      viewModel.$priceWithTax.html(productViewTemplates.priceWithTax(priceStrings));
    }

    if (viewModel.$saved.length) {
      const priceStrings = {
        price: data.price,
        savedString: this.context.productYouSave,
      };
      viewModel.$saved.html(productViewTemplates.priceSaved(priceStrings));
    }

    if (data.image && viewModel.$imagePreview.length) {
      const templateData = {
        src: utils.tools.image.getSrc(
          data.image.data,
          this.context.themeImageSizes.product
        ),
        previewLabel: this.context.productPreviewVariation,
      };

      viewModel.$imagePreview.html(productViewTemplates.variationPreviewImage(templateData));
      this.onImageSwitch();
    } else {
      viewModel.$imagePreview.empty();
    }

    if (!data.purchasable || !data.instock) {
      this.cartOptionAlert.error(data.purchasing_message || this.context.productOptionUnavailable);
      viewModel.$addToCart
        .val(this.context.productSoldOut)
        .prop('disabled', true);

    } else {
      let buttonText = this.context.productAddToCart;
      if (viewModel.$addToCart.is('[data-button-preorder]')) {
        buttonText = this.context.productPreOrder;
      }

      viewModel.$addToCart
        .val(buttonText)
        .prop('disabled', false);
    }
  }
}
