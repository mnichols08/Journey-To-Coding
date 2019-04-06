import utils from '@bigcommerce/stencil-utils';

/**
 * get new cart markup
 * @param {array} elementsArray - an array of which elements to refresh. At this point any combo of 'content' and 'footer'.
 * @param {function} callback - callback function to run once items have been refreshed.
 */
export default function(elementsArray, callback = null) {
  const $cartContent = $('.cart-table');
  const $cartFooter = $('.cart-table-footer');

  const options = {
    template:  {
      footer: 'cart/cart-table-footer',
      content: 'cart/cart-table-items-list',
    },
  };

  utils.api.cart.getContent(options, (err, response) => {
    if (elementsArray.indexOf('content') >= 0) {
      $cartContent.html(response.content);
    }

    if (elementsArray.indexOf('footer') >= 0) {
      $cartFooter.html(response.footer);
    }

    if (callback) {
      callback();
    }
  });
}
