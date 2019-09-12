import React from 'react';
import PropTypes from 'prop-types';
import { Form, AutoComplete as AntAutoComplete } from 'antd';
import * as styles from './AutoComplete.styles';

const { Item } = Form;

export const INPUT_TYPES = {
  ANY: 'any',
  PASSOWRD: 'password',
  MASKED: 'masked',
};

function getValidationStatus(field, form) {
  const { errors, touched } = form;
  const { name } = field;

  if (touched[name]) {
    return errors[name] ? 'error' : 'success';
  }

  return '';
}

function getHelpMessage(field, form) {
  const { errors, touched } = form;
  const { name } = field;

  if (touched[name]) {
    return errors[name];
  }

  return '';
}

export default function AutoComplete(props) {
  const {
    id,
    label,
    required,
    field,
    form,
    helpMessage,
    placeholder,
    disabled,
    onSearch,
    options,
  } = props;

  const { isSubmitting } = form;

  return (
    <div>
      <label htmlFor={id}>
        <div>
          {label}
          {required && <span className={{}.required}> *</span>}
        </div>

        <Item
          validateStatus={getValidationStatus(field, form)}
          hasFeedback
          help={getHelpMessage(field, form)}
          extra={helpMessage}
        >
          <AntAutoComplete
            id={id}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            // eslint-disable-next-line react/jsx-props-no-spreading
            onSearch={onSearch}
            placeholder={placeholder}
            disabled={disabled || isSubmitting}
            dataSource={options}
            className={styles.container}
          />
        </Item>
      </label>
    </div>
  );
}

const inputFieldPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
});

const inputFormPropTypes = PropTypes.shape({
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
});

AutoComplete.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  field: inputFieldPropTypes.isRequired,
  form: inputFormPropTypes.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  helpMessage: PropTypes.string,
  disabled: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

AutoComplete.defaultProps = {
  placeholder: '',
  required: false,
  helpMessage: '',
  disabled: false,
};
