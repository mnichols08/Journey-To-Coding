import utils from '@bigcommerce/stencil-utils';
import baguetteBox from 'baguettebox.js';

import truncate from '../utils/truncate';
import ProductUtils from './ProductUtils';
import Modal from 'bc-modal';

export default class QuickShop {
  constructor(context) {
    this.context = context;
    this.product;
    this.id = null;
    this.spinner = $('#loading-spinner').html();

    this.QuickShopModal = new Modal({
      el: $('#quick-shop-modal'),
      modalClass: 'modal-quick-shop',
      afterShow: ($modal) => {
        $modal.focus(); // allows for kayboard scrolling within modal
        this._modalLoadingState($modal);
        this._fetchProduct($modal, this.id);
      },
    });

    this._bindEvents();
  }

  /**
   * Show spinner
   */
  _modalLoadingState($modal) {
    $modal.append(this.spinner);
  }

  /**
   * Launch quickshop modal on click and set up id variable
   */
  _bindEvents() {
    $('body').on('click', '[data-quick-shop]', (event) => {
      event.preventDefault();
      this.id = $(event.currentTarget).data('product-id');

      if (!this.id) { return; }

      this.QuickShopModal.open();
    });
  }

  /**
   * Run ajax fetch of product and add to modal. Bind product functionality and show the modal
   * @param {jQuery} $modal - the root (appended) modal element.
   * @param {integer} id - product id
   */
  _fetchProduct($modal, id) {
    utils.api.product.getById(id, { template: 'quick-shop/quick-shop-modal' }, (err, response) => {
      $modal.find('.modal-content').append(response);

      // set up product utils (adding to cart, options)
      this.product = new ProductUtils(
        this.context,
        $modal.find('.product-block'),
        this._bindVariationImgPreview.bind(this),
        this._onCartSubmitComplete
      );
      this.product.init();

      truncate($modal.find('.quick-shop-product-description'));

      // set up simple image slideshow
      this._initImages($modal.find('.quick-shop-images-container'));

      // reposition modal with content
      this.QuickShopModal.position();

      $modal.addClass('loaded');
    });
  }

  /**
   * Simple image toggling
   * @param {jQuery} $imgContainer - our images container, components/quick-shop/quick-shop-images
   */
  _initImages($imgContainer) {
    $imgContainer.on('click', '.quick-shop-image-thumb a', (event) => {
      event.preventDefault();
      const $target = $(event.currentTarget);
      const imgId = $target[0].hash;

      // toggle image & thumbnail links
      $target.parent().add(imgId)
        .addClass('active')
        .siblings().removeClass('active');
    });
  }

  // bind lightbox for dynamically added product variant image
  _bindVariationImgPreview() {
    baguetteBox.run('[data-variation-preview]', {});
  }

  // scroll to top of modal container on cart-add success or error
  _onCartSubmitComplete() {
    $('#modal').animate({
      scrollTop: 0,
    });
  }
}
