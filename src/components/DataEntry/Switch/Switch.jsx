import React from 'react';
import PropTypes from 'prop-types';
import { Switch as AntSwitch, Form } from 'antd';
import * as styles from './Switch.styles';
import {
  inputFieldPropTypes,
  inputFormPropTypes,
} from '../../../constants/prop-types';

const { Item } = Form;

export function privateGetValidationStatus(field, form) {
  const { errors, touched } = form;
  const { name } = field;

  if (touched[name]) {
    return errors[name] ? 'error' : 'success';
  }

  return '';
}

export function privateGetHelpMessage(field, form) {
  const { errors, touched } = form;
  const { name } = field;

  if (touched[name]) {
    return errors[name];
  }

  return '';
}

export default function Switch(props) {
  const {
    id,
    label,
    required,
    field,
    form,
    helpMessage,
    disabled,
    autoFocus,
  } = props;

  const { isSubmitting } = form;

  return (
    <div>
      <label htmlFor={id}>
        <Item
          validateStatus={privateGetValidationStatus(field, form)}
          help={privateGetHelpMessage(field, form)}
          extra={helpMessage}
        >
          <div className={styles.container}>
            <div className={styles.flexedLabel}>
              {label}
              {required && <span className={styles.required}> *</span>}
            </div>

            <AntSwitch
              id={id}
              name={field.name}
              checked={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={disabled || isSubmitting}
              autoFocus={autoFocus}
            />
          </div>
        </Item>
      </label>
    </div>
  );
}

Switch.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  field: inputFieldPropTypes.isRequired,
  form: inputFormPropTypes.isRequired,
  required: PropTypes.bool,
  helpMessage: PropTypes.string,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

Switch.defaultProps = {
  required: false,
  helpMessage: '',
  disabled: false,
  autoFocus: false,
};
