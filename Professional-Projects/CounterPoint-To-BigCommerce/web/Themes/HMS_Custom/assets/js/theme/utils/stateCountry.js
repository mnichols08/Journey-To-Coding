import utils from '@bigcommerce/stencil-utils';
import _ from 'lodash';

/**
 * If the selected country doesn't have any provice data, show a text input
 * @returns {jQuery|HTMLElement}
 */
function makeStateRequired(stateElement) {
  let $newElement;
  let $hiddenInput;

  const attrs = _.transform(stateElement.prop('attributes'), (result, item) => {
    result[item.name] = item.value;
    return result;
  });

  const replacementAttributes = {
    id: attrs.id,
    'data-label': attrs['data-label'],
    class: 'form-input form-select',
    name: attrs.name,
    'data-field-type': attrs['data-field-type'],
  };

  stateElement.replaceWith($('<select></select>', replacementAttributes));

  $newElement = $('[data-field-type="State"]');
  $hiddenInput = $('[name*="FormFieldIsText"]');

  if ($hiddenInput.length !== 0) {
    $hiddenInput.remove();
  }

  //TODO: whether or not the field is required needs to be updated as well, look at stencil.

  return $newElement;
}

/**
 * If the selected country has states, show a select input
 */
function makeStateOptional(stateElement) {

  const attrs = _.transform(stateElement.prop('attributes'), (result, item) => {
    result[item.name] = item.value;
    return result;
  });

  const replacementAttributes = {
    type: 'text',
    id: attrs.id,
    'data-label': attrs['data-label'],
    class: 'form-input',
    name: attrs.name,
    'data-field-type': attrs['data-field-type'],
  };

  stateElement.replaceWith($('<input />', replacementAttributes));

  const $newElement = $('[data-field-type="State"]');

  if ($newElement.length !== 0) {
    insertStateHiddenField($newElement);
  }

  return $newElement;
}

/**
 * Adds the array of options from the remote request to the newly created select box.
 * @param statesArray
 * @param $selectElement
 */
function addOptions(statesArray, $selectElement) {
  const container = [];
  container.push(`<option value="">${statesArray.prefix}</option>`);
  if (!_.isEmpty($selectElement)) {
    _.each(statesArray.states, (stateObj)  => {
      container.push(`<option value="${stateObj.name}">${stateObj.name}</option>`);
    });
    $selectElement.html(container.join(' '));
  }
}

/**
 * Get id from given field
 * @param {object} $field jQuery field object
 * @return {string}
 */
function getFieldId($field) {
  const fieldId = $field.prop('name').match(/(\[.*\])/);

  if (fieldId.length !== 0) {
    return fieldId[0];
  }
}

/**
 * Insert hidden field after State/Province field
 * @param {object} $stateField JQuery field object
 */
function insertStateHiddenField($stateField) {
  const fieldId = getFieldId($stateField);
  const stateFieldAttrs = {
    type: 'hidden',
    name: `FormFieldIsText${fieldId}`,
    value: '1',
  };

  $stateField.after($('<input />', stateFieldAttrs));
}


export default function (stateElement, context, callback) {
  context = context || {};

  $('select[data-field-type="Country"]').on('change', (event) => {
    const countryName = $(event.currentTarget).val();

    if (countryName === '') {
      return;
    }

    utils.api.country.getByName(countryName, (err, response) => {
      if (err) {
        alert(context.state_error);
        return callback(err);
      }

      const $currentInput = $('[data-field-type="State"]');

      if (!_.isEmpty(response.data.states)) {
        // The element may have been replaced with a select, reselect it
        const $selectElement = makeStateRequired($currentInput, context);
        addOptions(response.data, $selectElement);
        callback(null, $selectElement);

      } else {
        const newElement = makeStateOptional($currentInput, context);
        callback(null, newElement);
      }
    });
  });
}
