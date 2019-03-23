import _ from 'lodash';
import utils from '@bigcommerce/stencil-utils';

export default class QuickSearch {
  constructor(context) {
    this.context = context;
    this.$searchFormContainer = $('.search-form-container');
    this.$quickSearchContainer = $('.search-form-quick-search-wrapper');
    this.$quickSearchResultsContainer = $('.search-form-quick-search-results');
    this.$spinner = $('.search-form-quick-search-wrapper .spinner');
    this.currentSelectedIndex = -1;

    this._bindEvents();
  }

  _bindEvents() {
    utils.hooks.on('search-quick', _.debounce(this._doSearch.bind(this), 200));

    this.$searchFormContainer.on('search-form-close', this._closeSearch.bind(this));

    $(window).on('keydown', this._handleInput.bind(this));
  }

  _closeSearch() {
    this._resetSearch();
    this.$quickSearchContainer.removeClass('quick-search-open');
  }

  _resetSearch() {
    const $results = $('.quick-search-result');

    this.currentSelectedIndex = -1;
    $results.removeClass('selected');
  }

  _removeResults() {
    this.$quickSearchResultsContainer.empty();
  }

  _doSearch(event) {
    const searchQuery = event.currentTarget.value;
    const requestOptions = {
      config: {
        product_results: {
          limit: this.context.quickSearchResultsPerSection,
        },
      },
      template: 'search/quick-search'
    };

    this._removeResults();

    // server will only perform search with at least 3 characters
    if (searchQuery.length < 3) {
      this.$quickSearchContainer.removeClass('quick-search-open');
      return;
    }

    this.$quickSearchContainer.addClass('quick-search-open');
    this.$spinner.show();


    utils.api.search.search(searchQuery, requestOptions, (err, response) => {
      if (err) {
        return false;
      }

      this.$quickSearchResultsContainer.html(response);
      this.currentSelectedIndex = -1;
      this.$spinner.hide();
    });
  };

  _handleInput(event) {
    // Fast return if the quick search container isn't visible
    if (!this.$quickSearchContainer.is(':visible')) return;

    switch(event.which) {
      // Key 13 is ENTER
      case 13:
        this._handleEnterInput(event);
        break;
      // Key 27 is Esc
      case 27:
        this._handleEscInput();
        break;
      // Key 38 is UP
      case 38:
        this._handleUpInput(event);
        break;
      // Key 40 is DOWN
      case 40:
        this._handleDownInput(event);
        break;
      default:
        // Return if we did not receive correct input
        return;
    }
  }

  _handleEnterInput(event) {
    const $result = $('.quick-search-result.selected');

    if ($result.length) {
      event.preventDefault();
      $result[0].click();
    }
  }

  _handleEscInput() {
    this._resetSearch();
  }

  _handleUpInput(event) {
    event.preventDefault();
    this.currentSelectedIndex--;
    this._selectResultAtIndex(this.currentSelectedIndex);
  }

  _handleDownInput(event) {
    event.preventDefault();
    this.currentSelectedIndex++;
    this._selectResultAtIndex(this.currentSelectedIndex);
  }

  _selectResultAtIndex(index) {
    const $results = $('.quick-search-result');

    this.currentSelectedIndex = this.currentSelectedIndex < 0
      ? $results.length - 1
      : this.currentSelectedIndex % $results.length;

    $results.removeClass('selected');
    $($results.get(this.currentSelectedIndex)).addClass('selected');
  }
}
