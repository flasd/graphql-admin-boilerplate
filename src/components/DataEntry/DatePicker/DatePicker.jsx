import React from 'react';
import PropTypes from 'prop-types';
import 'moment/locale/pt-br';
import defaultLocale from 'antd/es/date-picker/locale/pt_BR';
import { Form, DatePicker as AntDatePicker } from 'antd';
import classnames from 'classnames';
import {
  inputFieldPropTypes,
  inputFormPropTypes,
} from '../../../constants/prop-types';
import * as styles from './DatePicker.styles';

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

export default function DatePicker(props) {
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
    extraInformation,
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
          hasFeedback={!extraInformation}
          help={getHelpMessage(field, form)}
          extra={helpMessage}
        >
          <AntDatePicker
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
          />
        </Item>
      </label>
    </div>
  );
}

DatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  field: inputFieldPropTypes.isRequired,
  form: inputFormPropTypes.isRequired,
  required: PropTypes.bool,
  helpMessage: PropTypes.string,
  disabled: PropTypes.bool,
  extraInformation: PropTypes.string,
  format: PropTypes.string.isRequired,
  locale: PropTypes.objectOf(PropTypes.any),
  allowClear: PropTypes.bool,
  autoFocus: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

DatePicker.defaultProps = {
  required: false,
  helpMessage: '',
  disabled: false,
  extraInformation: '',
  locale: defaultLocale,
  allowClear: false,
  autoFocus: false,
  style: {},
  className: '',
};
