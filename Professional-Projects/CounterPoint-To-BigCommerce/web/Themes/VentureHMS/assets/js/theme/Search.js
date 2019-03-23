import PageManager from '../PageManager';
import CollectionAjax from './global/CollectionAjax';
import ProductCompare from './global/ProductCompare';
import Pagination from './global/Pagination';

export default class Search extends PageManager {
  constructor() {
    super();

    this.$searchTabToggles = $('[data-search-tab-toggle]');
    this.$searchTabs = $('[data-search-tab]');

    // In the search results there are two possible places
    // where the pagination could insert new content onto the page.
    // The pagination class returns a second argument `section` which
    // maps to this object
    this.sections = {
      content: $('.collection-content-index-column'),
      product: $('.collection-product-index-column'),
    }
  }

  loaded(next) {
    this._initializeCollectionAjax(this.context.productsPerPage);

    if ($('.compare-enabled').length) {
      this.Compare = new ProductCompare();
    }

    this._bindEvents();

    next();
  }

  _bindEvents() {
    this.$searchTabToggles.click((event) => {
      const $toggle = $(event.target);

      event.preventDefault();

      // Fast return on an already active toggle
      if ($toggle.hasClass('active')) return;

      this._toggleSearchTab($toggle);
    });
  }

  _toggleSearchTab($searchToggle) {
    const type = $searchToggle.data('search-tab-toggle');
    const $searchTab = $('[data-search-tab="' + type + '"]');

    // Fast return if there's no valid container
    if (!$searchTab.length) return;

    this.$searchTabToggles.removeClass('active');
    $searchToggle.addClass('active');

    this.$searchTabs.removeClass('active');
    $searchTab.addClass('active');
  }

  /**
   *
   */
  _initializeCollectionAjax(productCount) {
    const requestOptions = {
      config: {
        product_results: {
          limit: productCount,
        },
      },
      template: {
        productListing: 'search/product-index',
        sidebar: 'search/sidebar',
      },
      showMore: 'search/show-more'
    };

    const options = {
      blocker: '.collection-progress-overlay',
      bodyClass: 'ajax-progress',
      showMore: 'search/show-more'
    };

    const requestOptionsContent = {
      config: {
        product_results: {
          limit: productCount,
        },
      },
      template: 'search/content-index',
    };

    const optionsContent = {
      section: 'content',
    }

    new CollectionAjax(requestOptions, options, (content) => {
      $('.collection-product-index-column').html(content.productListing);
      $('.collection-sidebar-column').html(content.sidebar);
    });

    new Pagination(requestOptionsContent, optionsContent, (content, section) => {
      this.sections[section].html(content);
    });
  }
}
