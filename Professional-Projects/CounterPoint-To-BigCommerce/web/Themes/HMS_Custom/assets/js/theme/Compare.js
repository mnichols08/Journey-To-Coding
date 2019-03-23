import PageManager from '../PageManager';
import ProductUtils from './product/ProductUtils';

export default class Compare extends PageManager {
  loaded(next) {
    const $buttons = $('.add-to-cart');
    ProductUtils.bindRemoteAdd(this.context, $buttons);

    next();
  }
}
