import PageManager from '../PageManager';
import ThemeInit from './global/ThemeInit';
import FormValidator from './utils/FormValidator';
import SearchBox from './global/SearchBox';
import QuickSearch from './global/QuickSearch';
import CurrencySelector from './global/CurrencySelector';
import QuickCart from './global/QuickCart';
import MobileMenu from './global/MobileMenu';
import MegaNav from './global/megaNav';
import ShareLinks from './global/ShareLinks';
import QuickShop from './product/QuickShop';
import touchHoverMenu from './global/touchHoverMenu';
import formSelectedValue from './core/formSelectedValue';
import './core/selectOption';

export default class Global extends PageManager {
  constructor() {
    super();
  }

  /**
   * You can wrap the execution in this method with an asynchronous function map using the async library
   * if your global modules need async callback handling.
   * @param next
   */
  loaded(next) {
    // global form validation
    this.validator = new FormValidator(this.context);
    this.validator.initGlobal();

    // initialize hover helper for touch-enabled desktops
    touchHoverMenu();

    // product color swatch labels
    formSelectedValue();

    // add helper classes to <html>
    new ThemeInit();

    // simple header searchbox interactions
    new SearchBox();

    // quick search
    new QuickSearch(this.context);

    // hook up currency selector
    new CurrencySelector();

    // quickcart dropdown
    new QuickCart();

    // mobile menu slidey
    new MobileMenu();

    // Mega Nav
    if ($('.navigation').hasClass('mega-nav')) {
      new MegaNav();
    }

    // social share popups
    new ShareLinks();

    // QuickShop
    if ($('[data-quick-shop]').length) {
      new QuickShop(this.context);
    }

    next();
  }
}
