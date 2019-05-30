import PageManager from '../PageManager';
import CollectionAjax from './global/CollectionAjax';
import ProductCompare from './global/ProductCompare';
import Pagination from './global/Pagination';

export default class Brand extends PageManager {
  constructor() {
    super();
  }

  loaded(next) {
    this._initializeCollectionAjax(this.context.productsPerPage);

    if ($('.compare-enabled').length) {
      this.compare = new ProductCompare();
    }

    next();
  }

  /**
   *
   */
  _initializeCollectionAjax(productCount) {
    const requestOptions = {
      config: {
        brand: {
          products: {
            limit: productCount,
          }
        },
      },
      template: {
        productListing: 'brand/product-index',
        sidebar: 'brand/sidebar',
      },
    };

    const requestOptionsPagination = {
      config: {
        brand: {
          shop_by_price: true,
          products: {
            limit: productCount,
          }
        },
      },
      template: 'brand/product-index',
      showMore: 'brand/show-more'
    };

    const options = {
      blocker: '.collection-progress-overlay',
      bodyClass: 'ajax-progress',
      showMore: 'brand/show-more'
    };

    new CollectionAjax(requestOptions, options, (content) => {
      $('.collection-product-index-column').html(content.productListing);
      $('.collection-sidebar-column').html(content.sidebar);
    });

    new Pagination(requestOptionsPagination, options, (content) => {
      $('.collection-product-index-column').html(content);
    });
  }
}
