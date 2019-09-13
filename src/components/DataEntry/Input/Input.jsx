import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Icon, Input as AntInput, Tooltip,
} from 'antd';
import MaskedInput from 'react-text-mask';
import * as styles from './Input.styles';
import { inputFieldPropTypes, inputFormPropTypes } from '../../../constants/prop-types';

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

function getIcons(iconBefore, iconAfter) {
  const icons = {};

  if (iconBefore) {
    icons.prefix = <Icon type={iconBefore} />;
  }

  if (iconAfter) {
    icons.suffix = <Icon type={iconAfter} />;
  }

  return icons;
}

function getExtraInformation(extraInformation) {
  if (extraInformation) {
    return {
      suffix: (
        <Tooltip title={extraInformation}>
          <Icon type="info-circle" />
        </Tooltip>
      ),
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
    iconBefore,
    iconAfter,
    extraInformation,
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
          hasFeedback={!extraInformation}
          help={getHelpMessage(field, form)}
          extra={helpMessage}
        >
          <InputComponent
            id={id}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder={placeholder}
            disabled={disabled || isSubmitting}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...getMask(inputType, props)}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...getIcons(iconBefore, iconAfter)}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...getExtraInformation(extraInformation)}
          />
        </Item>
      </label>
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  field: inputFieldPropTypes.isRequired,
  form: inputFormPropTypes.isRequired,
  type: PropTypes.oneOf(Object.values(INPUT_TYPES)),
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  helpMessage: PropTypes.string,
  disabled: PropTypes.bool,
  iconBefore: PropTypes.string,
  iconAfter: PropTypes.string,
  extraInformation: PropTypes.string,
};

Input.defaultProps = {
  type: INPUT_TYPES.ANY,
  placeholder: '',
  required: false,
  helpMessage: '',
  disabled: false,
  iconBefore: '',
  iconAfter: '',
  extraInformation: '',
};
