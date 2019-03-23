import PageManager from '../PageManager';
import CollectionAjax from './global/CollectionAjax';
import ProductCompare from './global/ProductCompare';
import Pagination from './global/Pagination';

export default class Category extends PageManager {
  constructor() {
    super();

    this.Compare;
  }

  loaded(next) {
    this._initializeCollectionAjax(this.context.productsPerPage);

    if ($('.compare-enabled').length) {
      this.Compare = new ProductCompare();
    }

    next();
  }

  /**
   *
   */
  _initializeCollectionAjax(productCount) {
    const requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productCount,
          }
        },
      },
      template: {
        productListing: 'category/product-index',
        sidebar: 'category/sidebar',
      },
      showMore: 'category/show-more'
    };

    const options = {
      blocker: '.collection-progress-overlay',
      bodyClass: 'ajax-progress',
      showMore: 'category/show-more'
    };

    const requestOptionsPagination = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productCount,
          }
        },
      },
      template: 'category/product-index',
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
