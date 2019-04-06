import _ from 'lodash';

export default class MobileMenu {

  constructor() {
    this.$body = $('body');
    this.$header = $('.header-primary-container');

    // nav menu
    this.$menu = $('.navigation-container');
    this.$overlay = $('.menu-overlay');
    this.$menuOpenBtn = $('#menu-open');
    this.$menuCloseBtn = $('.mobile-menu-close');

    // subnav
    this.$subnavOpenBtn = $('.open-dropdown');
    this.$subnavContainer = $('.subnavigation-container');
    this.subNavs = []; // array to keep track of our menu levels

    // quickcart
    this.$cart = $('.cart-dropdown-container');
    this.$cartOpenBtn = $('.view-cart');
    this.cartCloseBtn = '#close-cart';

    this._assignHeaderHeight();
    this._bindEvents();
  }

  _bindEvents() {
    // nav menu events
    this.$menuCloseBtn.on('click', (event) => {
      event.preventDefault();
      this._closeMenu();
    });

    this.$menuOpenBtn.on('click', (event) => {
      event.preventDefault();
      this._openMenu();
    });


    // quickcart events
    this.$cart.on('click', this.cartCloseBtn, (event) => {
      event.preventDefault();
      this._closeCart();
    });

    this.$cartOpenBtn.on('click', (event) => {
      if (this.$cart.css('position') === 'fixed') {
        event.preventDefault();
        this._openCart();
      }
    });

    this.$overlay.on('click', () => {
      this._closeMenu();
      this._closeCart();
    });

    this.$menu.on('click', '.open-dropdown', (event) => {
      this._openSubnav($(event.currentTarget));
    });

    $(window).on('resize', _.debounce(this._assignHeaderHeight.bind(this), 100));
    this._assignHeaderHeight();
  }


  // ---------------------- Clickable background overlay --------------------- //

  _showOverlay() {
    this.$body.addClass('mobile-menu-active');
    this.$overlay.revealer('show');
  }

  _hideOverlay() {
    this.$body.removeClass('mobile-menu-active');
    this.$overlay.revealer('hide');
  }


  // ------------------------ Showing & hiding menu ----------------------- //

  _openMenu() {
    this._showOverlay();
    this.$menu.revealer('show');
  }

  _closeMenu() {
    this._hideOverlay();
    this.$menu.revealer('hide');
    this._resetSubnav();
  }


  // ------------------------ Showing & hiding cart ------------------------ //

  _openCart() {
    this._showOverlay();
    this.$cart.revealer('show');
  }

  _closeCart() {
    this._hideOverlay();
    this.$cart.revealer('hide');
  }

  // -------------------------- Subnav sliding -------------------------- //

  _openSubnav($target) {
    // add new nav level to array
    this.subNavs.push($('<div class="subnav-block">').attr('id', `menu-item-${$target.data('id')}`));

    // get heading and dropdown elements
    const $heading = $('<button>')
            .addClass('subnav-heading')
            .text($target.data('heading'))
            .prepend('<svg class="subnav-back-arrow"><use xlink:href="#icon-arrow-left"></svg>');
    const $dropdown = $target
            .next('ul').clone()
            .addClass('subnav-dropdown');

    // build our element
    this.subNavs[this.subNavs.length - 1]
      .html($heading)
      .append($dropdown)
      .appendTo(this.$subnavContainer)
      .revealer('show');

    // set up listener so container empties automatically on final hide
    this.subNavs[this.subNavs.length - 1].on('revealer-hide', () => {
      if (this.subNavs.length === 0) {
        this.$subnavContainer.empty();
      }
    });

    // if we're one level deep, hide the root menu with a class
    if (this.subNavs.length === 1) {
      this.$menu.addClass('subnav-active');
    }

    // if we're more than one level deep, hide the currently visible one
    if (this.subNavs.length > 1) {
      this.subNavs[this.subNavs.length - 2].revealer('hide');
    }

    // bind the heading button to take us back
    $heading.on('click', () => {
      this._closeSubnav();
    });
  }

  _closeSubnav() {
    // add flag to tell css we're sliding in opposite direction, set listener to remove it
    this.$menu.addClass('subnav-back');

    this.subNavs[this.subNavs.length - 1].one('revealer-hide', () => {
      this.$menu.removeClass('subnav-back');
    });

    // hide the current level & remove from array
    this.subNavs[this.subNavs.length - 1].revealer('hide');
    this.subNavs.splice(-1, 1);

    // should we go back a level, or are we back at the root?
    if (this.subNavs.length > 0) {
      this.subNavs[this.subNavs.length - 1].revealer('show');
    } else {
      this.$menu.removeClass('subnav-active');
    }
  }

  _resetSubnav() {
    this.$subnavContainer.empty();
    this.subNavs = [];
    this.$menu.removeClass('subnav-back subnav-active');
  }


  // -------------------------- Automatic header height -------------------------- //

  _assignHeaderHeight() {
    if ($(window).width() < 720) {
      this.$body.css('margin-top', this.$header.outerHeight());
    } else {
      this.$body.css('margin-top', '0');
    }
  }
}
