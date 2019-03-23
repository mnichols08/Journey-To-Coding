import SwipeFade from 'bc-swipe-fade';
import imagesLoaded from 'imagesloaded';

export default class ImageSlides {

  constructor() {

    if ($('#product-images').length) {
      imagesLoaded($('.product-slide:first')[0], () => {
        this.gallery = new SwipeFade({
          el: '#product-images',
          callback: (index, $elem) => {
            $elem.addClass('active').siblings().removeClass('active');
            this._updatePagination(index);
          },
        });

        this._init();
        this._bindEvents();
      });
    }
  }

  _init() {
    $('.product-slide').first().addClass('active');
    $('.product-images-pagination li').first().addClass('active');
  }

  _bindEvents() {
    $('.product-images-pagination a').bind('click', (e) => {
      e.preventDefault();
      const $target = $(e.currentTarget);

      $target.parent('li').addClass('active').siblings().removeClass('active');

      this.gallery.change($target.data('slide-to'), 500);
    });
  }

  _updatePagination(index) {
    $('.product-images-pagination li').removeClass('active').eq(index).addClass('active');
  }
}
