import { hooks, api } from '@bigcommerce/stencil-utils';
import Url from 'url';
import scrollTop from '../utils/scrollTop';

export default class Pagination {
  constructor(requestOptions, options, callback) {
    this.requestOptions = requestOptions;
    this.options = options;
    this.callback = callback;
    this.paginationFlag = false;

    this._bindEvents();
  }

  // -------------------------- Event Binding -------------------------- //

  _bindEvents() {
    $('body').on('click', '[data-pagination]', this._onPaginationClick.bind(this));
    $(window).on('statechange', this._onStateChange.bind(this));
  }

  // -------------------------- State Change Triggers -------------------------- //

  _goToUrl(url) {
    History.pushState({}, document.title, url);
  }

  _onPaginationClick(event) {
    event.preventDefault();

    const url = event.currentTarget.href;

    this.paginationFlag = true;

    this._goToUrl(url);
  }

  _onStateChange() {
    const url = History.getState().url;
    var template = this.requestOptions.template;
    var section = '';

    if (!this.paginationFlag) return;
    this._enterProgressState();

    // search results: check which tab we are currently on
    if (url.includes('section=')) {
      section = url.includes('section=product')
        ? 'product'
        : 'content';
    }

    // search results: set the request template to based on the current tab
    switch (section) {
      case 'product':
        template = 'search/product-index';
        break;
      case 'content':
        template = 'search/content-index';
        break;
      default:
        template = this.requestOptions.template;
        break;
    }

    this.requestOptions.template = template;

    api.getPage(History.getState().url, this.requestOptions, (err, content) => {
      this._leaveProgressState();
      this.paginationFlag = false;

      if (err) { throw new Error(err); }

      // scroll back to top of page
      scrollTop();

      // search results: pass the current section to the callback,
      // so we know where to insert the new page markup
      this._refreshView(content, section);
    });
  }

  _refreshView(content, section) {
    if (content) {
      this.callback(content, section);
    }
  }

  // -------------------------- Overlay toggling -------------------------- //

  _enterProgressState() {
    $(document.body).addClass('scroll-locked');
    $('.collection-progress-overlay').addClass('visible');
  }

  _leaveProgressState() {
    $(document.body).removeClass('scroll-locked');
    $('.collection-progress-overlay').removeClass('visible');
  }
}
