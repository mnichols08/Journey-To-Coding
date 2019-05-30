import _ from 'lodash';

export default class MegaNav {
  constructor() {
    this.$window = $(window);
    this.$header = $('.header-primary-container');
    this.$menuOpen = this.$header.find('.menu-open');
    this.$navContainer = $('.navigation-container');
    this.$megaNav = this.$navContainer.find('.mega-nav');
    this.$navTierOne = this.$megaNav.find('[data-shop-link]');
    this.$dropdowns = this.$navTierOne.find('.dropdown');

    this.menuCentered = $(document.body).hasClass('logo-center');

    this.topLevelItemsCount = this.$dropdowns.children().length;
    this.menuWidthMaxed = this.topLevelItemsCount > 6;

    this._bindEvents();
  }

  _bindEvents() {
    this.$dropdowns.addClass(this._getNavColumnClasses());

    $(window).on('resize', _.debounce(this._setMegaNavWidth.bind(this), 100));
    this._setMegaNavWidth();

    this.$navTierOne.on('mouseenter', (event) => {
      this._setMegaNavHeight(event);
      this._positionMegaNav(event);
    });

    this.$navTierOne.on('touchstart', (event) => {
      if ($(event.currentTarget).hasClass('tapped')) {
        this._setMegaNavHeight(event);
        this._positionMegaNav(event);
      }
    });
  }

  _setMegaNavWidth() {
    const widthProperty = this.menuWidthMaxed ? 'width' : 'max-width';

    if (!this._isMobile()) {
      const fullWidth = this.$navContainer.outerWidth();
      this.$dropdowns.css(widthProperty, fullWidth);
    } else {
      this.$dropdowns.css(widthProperty, '');
    }
  }

  _positionMegaNav(event) {
    const $menuItem = $(event.currentTarget);
    const $dropdown = $menuItem.find('.dropdown');

    const containerPositionLeft = this.$navContainer.offset().left;
    const dropdownPositionLeft = $menuItem.offset().left;

    let menuOffset = 0;

    if (this.menuCentered && !this.menuWidthMaxed) {
      // center nav relative to menu item if logo is centered.
      // if nav is going to be positioned outside of the page wrapper,
      // put it against the page wrapper instead.
      const containerWidth = this.$navContainer.width();
      const menuWidth = $dropdown.width();
      const menuItemWidth = $menuItem.width();
      menuOffset = ((menuWidth / 2) - (menuItemWidth / 2)) * -1;

      const navPositionLeft = dropdownPositionLeft + menuOffset;
      if (navPositionLeft < containerPositionLeft) {
        menuOffset = menuOffset + (containerPositionLeft - navPositionLeft);
      }
    } else {
      // otherwise, drop it against the edge of the page wrapper always
      menuOffset = (dropdownPositionLeft - containerPositionLeft + 20) * -1;
    }

    $dropdown.css('left', menuOffset);
  }

  _setMegaNavHeight(event) {
    const $menuItem = $(event.currentTarget);
    const $dropdown = $menuItem.find($('.dropdown'));
    const scrollTop = this.$window.scrollTop();
    // 60 is to add some space so the dropdown isn't kissing the bottom part of the viewport
    const dropdownOffset = $menuItem.offset().top + 60;
    const maxHeight = this.$window.height() - (dropdownOffset - scrollTop);

    if (!this._isMobile()) {
      $dropdown.css('max-height', maxHeight);
    } else {
      $dropdown.css('max-height', '');
    }
  }

  _getNavColumnClasses() {
    const classes = [];
    const columnCounts = [4, 5, 6];
    let bestColumnIndex = 0;

    if (this.menuWidthMaxed) {
      classes.push('nav-width-maxed');

      // build an array of the orphan counts for each column count
      const orphans = columnCounts.map((count) => {
        return this.topLevelItemsCount % count;
      });

      // If there's a case where a column count returns zero orphans, use it
      // otherwise use the column count with the most orphans
      orphans.forEach((orphan, index) => {
        if (orphan === 0) {
          bestColumnIndex = index;
          return;
        } else {
          bestColumnIndex = orphan > orphans[bestColumnIndex]
            ? index
            : bestColumnIndex;
        }
      });

      classes.push(`nav-columns-${columnCounts[bestColumnIndex]}`);
    } else {
      classes.push('nav-width-not-maxed');
    }

    return classes.join(' ');
  }

  _isMobile() {
    return this.$window.width() < 720;
  }
}
