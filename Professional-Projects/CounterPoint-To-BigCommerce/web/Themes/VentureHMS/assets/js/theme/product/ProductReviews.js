import Modal from 'bc-modal';
import FormValidator from '../utils/FormValidator';

export default class ProductReviews {
  constructor(context) {
    this.context = context;
    this.url = location.href;

    this.reviewModal = new Modal({
      el: $('#modal-review-form'),
      modalClass: 'modal-leave-review',
      afterShow: () => {
        const $form = $('#form-leave-a-review');
        const validator = new FormValidator(this.context);
        validator.initSingle($form);
      },
    });

    this._productReviewHandler();
    this._bindEvents();
  }

  _bindEvents() {
    $('.review-link').click((event) => {
      event.preventDefault();
      this.reviewModal.open();
    });
  }

  _productReviewHandler() {
    if (this.url.indexOf('#write_review') !== -1) {
      this.reviewModal.open();
    }
  }
}
