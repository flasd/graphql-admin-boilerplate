import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import * as styles from './Textarea.styles';

const { Item } = Form;
const { TextArea: AntTextarea } = Input;

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

function getAutosize(autosize, minRows, maxRows) {
  if (autosize) {
    return {
      autosize: {
        minRows,
        maxRows,
      },
    };
  }

  return {
    autosize: false,
  };
}

export default function Textarea(props) {
  const {
    id,
    label,
    required,
    field,
    form,
    helpMessage,
    placeholder,
    disabled,
    autosize,
    minRows,
    maxRows,
    allowClear,
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
          hasFeedback
          help={getHelpMessage(field, form)}
          extra={helpMessage}
        >
          <AntTextarea
            id={id}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder={placeholder}
            disabled={disabled || isSubmitting}
            allowClear={allowClear}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...getAutosize(autosize, minRows, maxRows)}
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

Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  field: inputFieldPropTypes.isRequired,
  form: inputFormPropTypes.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  helpMessage: PropTypes.string,
  disabled: PropTypes.bool,
  autosize: PropTypes.bool,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  allowClear: PropTypes.bool,
};

Textarea.defaultProps = {
  placeholder: '',
  required: false,
  helpMessage: '',
  disabled: false,
  autosize: false,
  minRows: 3,
  maxRows: 7,
  allowClear: false,
};
