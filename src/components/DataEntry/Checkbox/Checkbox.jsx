import React from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox as AntCheckbox } from 'antd';
import {
  inputFieldPropTypes,
  inputFormPropTypes,
} from '../../../constants/prop-types';
import * as styles from './Checkbox.styles';

const { Item } = Form;

function getValidationStatus(field, form) {
  const { errors, touched, submitCount } = form;
  const { name } = field;

  if (touched[name] || submitCount > 0) {
    return errors[name] ? 'error' : 'success';
  }

  return '';
}

function getHelpMessage(field, form) {
  const { errors, touched, submitCount } = form;
  const { name } = field;

  if (touched[name] || submitCount > 0) {
    return errors[name];
  }

  return '';
}

export default function Input(props) {
  const {
    id,
    label,
    field,
    form,
    helpMessage,
    disabled,
  } = props;

  const { isSubmitting } = form;

  return (
    <div className={styles.container}>
      <label htmlFor={id}>
        <Item
          validateStatus={getValidationStatus(field, form)}
          help={getHelpMessage(field, form)}
          extra={helpMessage}
        >
          <AntCheckbox
            id={id}
            name={field.name}
            onChange={field.onChange}
            onBlur={field.onBlur}
            checked={field.value}
            disabled={disabled || isSubmitting}
          >
            {label}
          </AntCheckbox>
        </Item>
      </label>
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  field: inputFieldPropTypes.isRequired,
  form: inputFormPropTypes.isRequired,
  helpMessage: PropTypes.string,
  disabled: PropTypes.bool,
};

Input.defaultProps = {
  helpMessage: '',
  disabled: false,
};
