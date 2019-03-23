import utils from '@bigcommerce/stencil-utils';
import coverHover from '../utils/coverHover';
import Modal from 'bc-modal';

export default class GiftWrap {
  constructor($cartContent) {
    this.$cartContent = $cartContent;
    this._init();
  }

  _init() {
    this.itemId; // assigned the id of the current product
    this.triggerButton = '.item-gift-wrap-trigger';

    this.GiftWrapModal = new Modal({
      el: $('#gift-wrap-modal'),
      modalClass: 'modal-gift-wrap',
      afterShow: ($modal) => {
        this._getForm($modal);
      },
    });

    this._bindEvents();
  }

  _bindEvents() {
    this.$cartContent.on('click', this.triggerButton, (event) => {
      event.preventDefault();
      const $target = $(event.currentTarget);
      this.itemId = $target.data('item-gift-wrap');

      this.GiftWrapModal.open();
    });
  }

  _bindModalEvents($modal) {
    $modal.on('change', () => {
      this.GiftWrapModal.position();
    });

    $modal.find('[name="giftwraptype"]').on('change', (event) => {
      this._toggleViews($modal, event.currentTarget.value);
    });

    $modal.find('.gift-wrap-select').on('change', (event) => {
      this._toggleGiftWrapDetails(event);
    });

    $('.gift-wrap-image').each((index, el) => {
      coverHover($(el));
    });
  }

  _getForm($modal) {
    const options = { template: 'cart/gift-wrap-modal' };

    utils.api.cart.getItemGiftWrappingOptions(this.itemId, options, (err, response) => {
      if (response) {
        $modal.find('.modal-content').append(response.content);
        this._bindModalEvents($modal);

        // reposition modal with content
        this.GiftWrapModal.position();
        $modal.addClass('loaded');
      } else {
        this.GiftWrapModal.close();
      }
    });
  }

  _toggleGiftWrapDetails(event) {
    const $select = $(event.currentTarget);
    const $option = $select.find('option:selected');
    const index = $select.data('index');
    const id = $select.val();
    const $scope = $(`#gift-wrap-option-item-${index}`);

    $scope.find('.gift-wrap-image-preview').removeClass('visible');

    const wrapping = {
      hasImage: id ? $option.data('preview-image') : false,
      hasMessage: id ? $option.data('allow-message') : false,
    };

    if (wrapping.hasMessage) {
      $scope.find('.gift-wrap-message').addClass('visible');
    } else {
      $scope.find('.gift-wrap-message').removeClass('visible');
    }

    if (wrapping.hasImage) {
      $scope.find(`.image-preview-${id}`).addClass('visible');
    }
  }

  _toggleViews($modal, value) {
    const $singleForm = $modal.find('.gift-wrap-single');
    const $multiForm  = $modal.find('.gift-wrap-multiple');

    if (value === 'same') {
      $singleForm.addClass('visible');
      $multiForm.removeClass('visible');
    }  else {
      $singleForm.removeClass('visible');
      $multiForm.addClass('visible');
    }
  }
}
