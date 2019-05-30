import PageManager from '../PageManager';
import Carousel from 'bc-carousel';
import _ from 'lodash';

export default class Home extends PageManager {
  constructor() {
    super();

    this.$carousel = $('.carousel');
    this.$slides = this.$carousel.find('.carousel-item');

    this.fixedRatio = $(document.body).hasClass('carousel-has-aspect');
    this.mobileWidth = 770;
  }

  loaded() {
    this.carousel = new Carousel({
      el: this.$carousel,
      delay: this.context.carouselDelay,
      pagination: $('.carousel-item').length > 1,
      setHeight: false,
    });

    this._bindCarouselEvents();

    // Set initial carousel height
    const $currentSlide = this.$carousel.find('.carousel-item.visible');
    this._setCarouselHeight($currentSlide);
  }

  _setCarouselHeight($slide) {
    // only force a height if we're relying on image sizes or on mobile
    if (this.fixedRatio && $(window).width() >= this.mobileWidth) return;

    const imageHeight = $slide.find('img').height();
    const captionHeight = $slide.find('.carousel-item-info-inner').height() + 80;
    this.$carousel.height(Math.max(imageHeight, captionHeight));
  }

  _bindCarouselEvents() {
    this.$carousel.on('carousel-change', (event, context) => {
      // skip setting the height if it's a fixed aspect ratio and we're on desktop
      if (this.fixedRatio && $(window).width() >= this.mobileWidth) return;

      const $fromImage = $(this.$slides[context.from]);
      const $toImage = $(this.$slides[context.to]);

      this.$carousel.height($fromImage.height());

      window.setTimeout(() => {
        this._setCarouselHeight($toImage);
      }, 50);
    });

    $(window).on('blur', () => {
      this.carousel.pause();
    });

    $(window).on('focus', () => {
      this.carousel.play();
    });

    $(window).on('resize', _.debounce(() => {
      const $currentSlide = this.$carousel.find('.carousel-item.visible');
      this._setCarouselHeight($currentSlide);
    }, 200));
  }
}
