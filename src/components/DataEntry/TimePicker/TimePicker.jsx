import React from 'react';
import PropTypes from 'prop-types';
import 'moment/locale/pt-br';
import defaultLocale from 'antd/es/date-picker/locale/pt_BR';
import { Form, TimePicker as AntTimePicker } from 'antd';
import classnames from 'classnames';
import {
  inputFieldPropTypes,
  inputFormPropTypes,
} from '../../../constants/prop-types';
import * as styles from './TimePicker.styles';

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

export default function TimePicker(props) {
  const {
    id,
    label,
    required,
    field,
    form,
    format,
    locale,
    helpMessage,
    disabled,
    allowClear,
    autoFocus,
    style,
    className,
    use12Hours,
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
          <AntTimePicker
            id={id}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            disabled={disabled || isSubmitting}
            format={format}
            locale={locale}
            className={classnames(styles.growInput, className)}
            allowClear={allowClear}
            autoFocus={autoFocus}
            style={style}
            use12Hours={use12Hours}
          />
        </Item>
      </label>
    </div>
  );
}

TimePicker.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  field: inputFieldPropTypes.isRequired,
  form: inputFormPropTypes.isRequired,
  required: PropTypes.bool,
  helpMessage: PropTypes.string,
  disabled: PropTypes.bool,
  format: PropTypes.string.isRequired,
  locale: PropTypes.objectOf(PropTypes.any),
  allowClear: PropTypes.bool,
  autoFocus: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  use12Hours: PropTypes.bool,
};

TimePicker.defaultProps = {
  required: false,
  helpMessage: '',
  disabled: false,
  locale: defaultLocale,
  allowClear: false,
  autoFocus: false,
  style: {},
  className: '',
  use12Hours: false,
};
