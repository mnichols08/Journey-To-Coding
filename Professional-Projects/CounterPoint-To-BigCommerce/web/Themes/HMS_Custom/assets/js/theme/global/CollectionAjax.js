import { hooks, api } from '@bigcommerce/stencil-utils';
import Url from 'url';
import scrollTop from '../utils/scrollTop';

function goToUrl(url) {
  History.pushState({}, document.title, url);
}

export default class CollectionAjax {
  constructor(requestOptions, options, callback) {
    this.requestOptions = requestOptions;
    this.options = options;
    this.callback = callback;
    this.facetedSearchFlag = false;

    this._bindEvents();
    this._bindHooks();
  }


  // -------------------------- Event Binding -------------------------- //

  _bindEvents() {
    $(document.body).on('click', '[data-toggle-facet]', (event) => {
      this._toggleFilter(event);
    });

    $(document.body).on('click', '[data-show-more-facets]', (event) => {
      this._showAdditionalFilters(event);
    });

    $(document.body).on('click', '[data-toggle-faceted-search]', (event) => {
      this._toggleFilterBlock(event);
    });

    $(window).on('statechange', this._onStateChange.bind(this));
  }

  _bindHooks() {
    hooks.on('facetedSearch-facet-clicked', this._onFacetClick.bind(this));
    hooks.on('facetedSearch-range-submitted', this._onRangeSubmit.bind(this));
    hooks.on('sortBy-submitted', this._onSortBySubmit.bind(this));
  }


  // -------------------------- Filter Visibility Toggle -------------------------- //

  _toggleFilterBlock(event) {
    const $button = $(event.currentTarget);
    $('.faceted-search').toggleClass('filters-visible');
    const newText = $button.data('toggled-text');
    const oldText = $button.text();
    $button
      .data('toggled-text', oldText)
      .text(newText);
  }

  _toggleFilter(event) {
    const $header = $(event.currentTarget);
    $header
      .parents('.faceted-search-filter')
      .toggleClass('is-open');
  }


  // -------------------------- State Change Triggers -------------------------- //

  _goToUrl(url) {
    History.pushState({}, document.title, url);
  }

  _onFacetClick(event) {
    event.preventDefault();

    const $target = $(event.currentTarget);
    const url = $target.attr('href');

    if ($target.hasClass('selected-filter-item')) {
      this._updateCurrentFacets($target.parent());
    }

    if ($target.hasClass('clear-all')) {
      $('.facet-selected-filters').remove();
    }

    this.facetedSearchFlag = true;

    goToUrl(url);
  }

  _showAdditionalFilters(event) {
    // Show/hide full facet list based on setting  for product filtering
    event.preventDefault();

    const $showMoreLink = $(event.currentTarget);
    const $originalList = $showMoreLink.siblings('.facet-default');
    const facet = $originalList.attr('data-facet');
    const facetUrl = History.getState().url;

    // Show/Hide extra facets based on settings for product filtering
    if (!$showMoreLink.siblings('.faceted-search-option-columns').length) {
      if (this.options.showMore) {
        api.getPage(facetUrl, {
          template: this.options.showMore,
          params: {
            list_all: facet,
          },
        }, (err, response) => {
          if (err) {
            throw new Error(err);
          }

          $(response).insertAfter($originalList);

          // show/hide original facet list
          $originalList.toggle();

          // Toggle show more/less link
          $showMoreLink.children().toggle();
        });
      }
    } else {
      $showMoreLink.siblings('.faceted-search-option-columns').toggle();

      // show/hide original facet list
      $originalList.toggle();

      // Toggle show more/less link
      $showMoreLink.children().toggle();
    }
  }

  _onRangeSubmit(event) {
    event.preventDefault();

    const url = Url.parse(location.href);
    let queryParams = $(event.currentTarget).serialize();

    this.facetedSearchFlag = true;

    goToUrl(Url.format({ pathname: url.pathname, search: `?${queryParams}` }));
  }

  _onSortBySubmit(event) {
    event.preventDefault();

    const $form = $(event.currentTarget);

    const selectedText = $form.find('option:selected').text();
    $form.find('.form-selected-text').text(selectedText);

    const queryParams = $(event.currentTarget).serialize().split('=');
    const url = Url.parse(location.href, true);

    url.query[queryParams[0]] = queryParams[1];

    this.facetedSearchFlag = true;

    goToUrl(Url.format({ pathname: url.pathname, query: url.query }));
  }

  _onStateChange() {
    if (!this.facetedSearchFlag) return;
    this._enterProgressState();

    api.getPage(History.getState().url, this.requestOptions, (err, content) => {
      this._leaveProgressState();
      this.facetedSearchFlag = false;

      if (err) { throw new Error(err); }

      // scroll back to top of page
      scrollTop();

      this._refreshView(content);
    });
  }

  _refreshView(content) {
    if (content) {
      this.callback(content);
    }
  }

  /*
   * If there is more than one active filter, just remove the one
   * If it's the only filter, remove the whole thing
   */
  _updateCurrentFacets($listItem) {
    if ($listItem.siblings().length) {
      $listItem.remove();
    } else {
      $('.facet-selected-filters').remove();
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
