import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select as AntSelect, Icon } from 'antd';
import * as styles from './Slider.styles';
import {
  inputFieldPropTypes,
  inputFormPropTypes,
  optionPropTypes,
} from '../../../constants/prop-types';

const { Item } = Form;
const { Option } = AntSelect;

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

export default function Select(props) {
  const {
    id,
    label,
    required,
    field,
    form,
    helpMessage,
    disabled,
    options,
    multiple,
    loading,
    iconAfter,
    handleSearch,
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
          <AntSelect
            id={id}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            disabled={disabled || isSubmitting}
            mode={multiple ? 'multiple' : 'default'}
            filterOption
            showSearch
            className={styles.block}
            loading={loading}
            suffixIcon={iconAfter && <Icon type={iconAfter} />}
            onSearch={handleSearch}
          >
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </AntSelect>
        </Item>
      </label>
    </div>
  );
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  field: inputFieldPropTypes.isRequired,
  form: inputFormPropTypes.isRequired,
  required: PropTypes.bool,
  helpMessage: PropTypes.string,
  disabled: PropTypes.bool,
  options: optionPropTypes.isRequired,
  multiple: PropTypes.bool,
  loading: PropTypes.bool,
  iconAfter: PropTypes.string,
  handleSearch: PropTypes.func,
};

Select.defaultProps = {
  required: false,
  helpMessage: '',
  disabled: false,
  multiple: false,
  iconAfter: '',
  handleSearch: null,
  loading: false,
};