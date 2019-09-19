import React from 'react';
import PropTypes from 'prop-types';
import { Form, Rate as AntRate } from 'antd';
import * as styles from './Rate.styles';
import {
  inputFieldPropTypes,
  inputFormPropTypes,
} from '../../../constants/prop-types';

const { Item } = Form;

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

export default function Rate(props) {
  const {
    id,
    label,
    required,
    field,
    form,
    helpMessage,
    disabled,
    allowHalf,
    allowClear,
    autoFocus,
    style,
    className,
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
          help={getHelpMessage(field, form)}
          extra={helpMessage}
        >
          <AntRate
            id={id}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            disabled={disabled || isSubmitting}
            allowHalf={allowHalf}
            defaultValue={3}
            className={className}
            allowClear={allowClear}
            autoFocus={autoFocus}
            style={style}
          />
        </Item>
      </label>
    </div>
  );
}

Rate.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  field: inputFieldPropTypes.isRequired,
  form: inputFormPropTypes.isRequired,
  required: PropTypes.bool,
  helpMessage: PropTypes.string,
  disabled: PropTypes.bool,
  allowHalf: PropTypes.bool,
  allowClear: PropTypes.bool,
  autoFocus: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

Rate.defaultProps = {
  required: false,
  helpMessage: '',
  disabled: false,
  allowHalf: false,
  allowClear: false,
  autoFocus: false,
  style: {},
  className: '',
};
