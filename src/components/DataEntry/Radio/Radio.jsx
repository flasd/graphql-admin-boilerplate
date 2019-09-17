import React from 'react';
import PropTypes from 'prop-types';
import { Form, Radio as AntRadio } from 'antd';
import * as styles from './Radio.styles';
import {
  inputFieldPropTypes,
  inputFormPropTypes,
} from '../../../constants/prop-types';

const { Item } = Form;
const { Group } = AntRadio;

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

export default function Input(props) {
  const {
    id,
    label,
    required,
    field,
    form,
    helpMessage,
    disabled,
    extraInformation,
    options,
    vertical,
  } = props;

  const { isSubmitting } = form;

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
          <Group
            id={id}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            disabled={disabled || isSubmitting}
          >
            {options.map((option) => (
              <AntRadio
                key={option.value}
                value={option.value}
                // disabled={options.disabled}
                className={vertical ? styles.vertical : ''}
              >
                {option.label}
              </AntRadio>
            ))}
          </Group>
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
  required: PropTypes.bool,
  helpMessage: PropTypes.string,
  disabled: PropTypes.bool,
  extraInformation: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    }),
  ).isRequired,
  vertical: PropTypes.bool,
};

Input.defaultProps = {
  required: false,
  helpMessage: '',
  disabled: false,
  extraInformation: '',
  vertical: false,
};
