import _ from 'lodash';

export default class ProductCompare {
  constructor() {
    this.compareActive = false;
    this.maxItems = 4;

    this.compareIndex = []; // ordered array of product ids
    this.compareItems = {}; // object of currently selected products

    this.tabSelector = '#compare-tab';
    this.wrapperSelector = '#compare-items-wrapper';

    this.itemTemplate = _.template(`
      <li class="compare-tab-item">
        <a class="compare-tab-item-remove" data-remove-id="<%= id %>">&times;</a>
        <div class="compare-tab-item-image">
          <img src="<%= img %>">
        </div>
      </li>
    `);

    this._bindEvents();
  }

  _bindEvents() {
    // remove item on checkbox change
    $(document.body).on('change', '[data-product-compare]', (event) => {
      // cancel if it's not a checkbox that triggered the change event
      if (event.target.type !== 'checkbox') { return; }

      const $checkbox   = $(event.target);
      const $product    = $checkbox.closest('.product-item');
      const productId   = parseInt($checkbox.val(), 10);
      const productData = this._getProductData($product, productId);

      if (productId in this.compareItems) {
        this._removeCompareItemById(productId);
      } else {
        this._addCompareItem(productData);

        // if we're at the max number of items, remove the first item
        if (this.compareIndex.length > this.maxItems) {
          this._removeCompareItemByIndex(0);
        }
      }

      this._updateCompareState();
    });

    // remove item from click within tab
    $(document.body).on('click', `${this.wrapperSelector} .compare-tab-item-remove`, (event) => {
      event.preventDefault();
      const productId = parseInt($(event.currentTarget).data('remove-id'), 10);

      this._removeCompareItemById(productId);
      this._updateCompareState();
    });

    // remove all items
    $(document.body).on('click', `${this.tabSelector} .clear-compare`, (event) => {
      event.preventDefault();

      this._removeAllItems();
    });

    // clear out compared items when tab is hidden
    $(document.body).on('revealer-hide', this.tabSelector, () => {
      $(this.wrapperSelector).empty();
    });
  }

  /**
   * create an object of relevant product data from grid element.
   * @param $product {jQuery} - grid item object
   * @param productId {number} - ID of product
   * @returns {object}
   */
  _getProductData($product, productId) {
    return {
      id: productId,
      img: $product.find('.product-item-thumbnail img').attr('src'),
      title: $product.find('.product-item-title').text(),
    };
  }


  // ---------------------- Handle popup compare tab changes --------------------- //

  /**
   * Decide what to do with the compare tab on each update
   */
  _updateCompareState() {
    if (!this.compareActive) {
      this._initCompare();
    } else if (this.compareIndex.length === 0) {
      this._destroyCompare();
    } else {
      this._refreshCompare();
    }
  }

  /**
   * Show compare tab
   */
  _initCompare() {
    this.compareActive = true;
    this._refreshCompare();
    $(this.tabSelector).revealer('show');
  }

  /**
   * Hide compare tab
   */
  _destroyCompare() {
    $(this.tabSelector).revealer('hide');
    this.compareActive = false;
  }

  /**
   * Regenerate markup based on currently active items
   */
  _refreshCompare() {
    const items = [];
    this.compareIndex.forEach((id) => {
      items.push(this.itemTemplate(this.compareItems[id]));
    });

    // enable/disable button
    $('.compare-submit').attr('disabled', this.compareIndex.length < 2);

    $(this.wrapperSelector).html(items.join(''));
  }


  // ---------------------- Adding & removing compare items --------------------- //

  /**
   * append product to end of compared products list
   * @param productData {object} - object containing product id, title and image
   */
  _addCompareItem(productData) {
    this.compareIndex.push(productData.id);
    this.compareItems[productData.id] = productData;
  }

  /**
   * remove product from compared products list
   * @param productId {number} - ID of product we want to remove
   */
  _removeCompareItemById(productId) {
    _.pull(this.compareIndex, productId);
    delete this.compareItems[productId];

    this._uncheckCompare(productId);
  }

  /**
   * remove product from compared products list
   * @param index {number} - index within compared product list of product we want to remove
   */
  _removeCompareItemByIndex(index) {
    const productId = this.compareIndex[index];
    this.compareIndex.splice(index, 1);
    delete this.compareItems[productId];

    this._uncheckCompare(productId);
  }

  /**
   * Remove all items from compare tab and reset to default state
   *
   */
  _removeAllItems() {
    this.compareIndex.forEach((id) => {
      this._uncheckCompare(id);
    });

    this.compareIndex = [];
    this.compareItems = {};

    this._updateCompareState();
  }

  /**
   * Uncheck a compare checkbox
   * @param id {number} - id of product within grid to be unchecked
   */
  _uncheckCompare(id) {
    $(`#compare-${id}`).prop('checked', false);
  }
}
