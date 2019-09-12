import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input as AntInput } from 'antd';
import MaskedInput from 'react-text-mask';
import * as styles from './Input.styles';

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

function getInputComponent(inputType) {
  if (inputType === INPUT_TYPES.PASSOWRD) {
    return AntInput.Password;
  }

  if (inputType === INPUT_TYPES.MASKED) {
    return MaskedInput;
  }

  return AntInput;
}

function getMask(inputType, props) {
  const { mask } = props;

  if (inputType === INPUT_TYPES.MASKED) {
    return {
      mask,
      guide: false,
      className: 'ant-input',
    };
  }

  return {};
}

export default function Input(props) {
  const {
    id,
    label,
    required,
    field,
    form,
    helpMessage,
    type: inputType,
    placeholder,
    disabled,
  } = props;

  const { isSubmitting } = form;

  const InputComponent = getInputComponent(inputType);

  return (
    <div>
      <label htmlFor={id}>
        <div>
          {label}
          {required && <span className={styles.required}> *</span>}
        </div>

        <Item
          validateStatus={getValidationStatus(field, form)}
          hasFeedback
          help={getHelpMessage(field, form)}
          extra={helpMessage}
        >
          <InputComponent
            id={id}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...getMask(inputType, props)}
            placeholder={placeholder}
            disabled={disabled || isSubmitting}
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

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  field: inputFieldPropTypes.isRequired,
  form: inputFormPropTypes.isRequired,
  type: PropTypes.oneOf(Object.values(INPUT_TYPES)).isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  helpMessage: PropTypes.string,
  disabled: PropTypes.bool,
};

Input.defaultProps = {
  placeholder: '',
  required: false,
  helpMessage: '',
  disabled: false,
};
