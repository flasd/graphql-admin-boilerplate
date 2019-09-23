import React from 'react';
import PropTypes from 'prop-types';
import 'moment/locale/pt-br';
import defaultLocale from 'antd/es/date-picker/locale/pt_BR';
import { Form, DatePicker as AntDatePicker } from 'antd';
import {
  inputFieldPropTypes,
  inputFormPropTypes,
} from '../../../constants/prop-types';
import * as styles from './RangePicker.styles';

const { Item } = Form;
const { RangePicker: AntRangePicker } = AntDatePicker;

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

export default function RangePicker(props) {
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
          <AntRangePicker
            id={id}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            disabled={disabled || isSubmitting}
            format={format}
            locale={locale}
            className={styles.growInput}
          />
        </Item>
      </label>
    </div>
  );
}

RangePicker.propTypes = {
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
};

RangePicker.defaultProps = {
  required: false,
  helpMessage: '',
  disabled: false,
  extraInformation: '',
  locale: defaultLocale,
};
