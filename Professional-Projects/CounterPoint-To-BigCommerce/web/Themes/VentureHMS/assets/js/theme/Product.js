import PageManager from '../PageManager';
import Tabs from 'bc-tabs';
import fitVids from 'fitvids';
import baguetteBox from 'baguettebox.js';

import ProductUtils from './product/ProductUtils';
import ImageSlides from './product/ImageSlides';
import ProductReviews from './product/ProductReviews';

export default class Product extends PageManager {
  constructor() {
    super();

    this.fitVidsInitialized = false;
  }

  loaded(next) {
    this.product = new ProductUtils(
      this.context,
      $('.product-block'),
      this._bindVariationImgPreview.bind(this),
      this._onCartSubmitComplete,
      window.BCData.product_attributes
    );

    // image slideshow w/ thumbnails
    new ImageSlides();

    // Reviews
    new ProductReviews(this.context);

    // Detect whether or not tabs need to be set up
    this._initTabs();

    // set up all product UI stuff
    this.product.init();

    $(document.body).on('click', '[data-toggle-extra-reviews]', (event) => {
      this._toggleExtraReviews(event);
    });

    baguetteBox.run('.product-slides-wrap', {});

    next();
  }

  _initTabs() {
    const $tabLinks = $('.product-tab-links');
    const $tabsContainer = $('.product-meta-column');

    if ($tabLinks.children().length > 1) {
      this.tabs = new Tabs({
        titleSelector: $('.product-tab-link'),
        afterSetup: (tabId) => {
          $tabsContainer.addClass('tabs-active');
          this._initVids(tabId);
        },
        afterChange: (tabId) => {
          this._initVids(tabId);
        },
      });
    } else {
      $tabsContainer.addClass('tabs-inactive');
    }
  }

  // if page loads with tabs hidden, we need to wait until the proper tab is clicked before running fitVids.
  _initVids(tabId) {
    if (tabId === '#product-videos' && !this.fitVidsInitialized) {
      fitVids('.product-videos-list');
      this.fitVidsInitialized = true;
    }
  }

  // bind lightbox for dynamically added product variant image
  _bindVariationImgPreview() {
    baguetteBox.run('[data-variation-preview]', {});
  }

  // show/hide reviews beyond the ones initially visible
  _toggleExtraReviews(event) {
    const $button = $(event.currentTarget);
    const buttonText = $button.text();
    const toggleText = $button.data('toggle-text');

    $('.product-reviews-container').toggleClass('all-reviews-visible');

    $button
      .text(toggleText)
      .data('toggle-text', buttonText);
  }

  // scroll to top of container on cart-add success or error
  _onCartSubmitComplete() {
    $('html, body').animate({
      scrollTop: $('.main-content').offset().top,
    });
  }
}
