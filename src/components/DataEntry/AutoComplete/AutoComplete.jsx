import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, AutoComplete as AntAutoComplete } from 'antd';
import * as styles from './AutoComplete.styles';
import { inputFieldPropTypes, inputFormPropTypes } from '../../../constants/prop-types';

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

export default function AutoComplete(props) {
  const {
    id,
    label,
    required,
    field,
    form,
    helpMessage,
    placeholder,
    disabled,
    onSearch,
    options,
    iconBefore,
    iconAfter,
    allowClear,
    autoFocus,
  } = props;

  const { isSubmitting } = form;

  return (
    <div>
      <label htmlFor={id}>
        <div>
          {label}
          {required && <span className={{}.required}> *</span>}
        </div>

        <Item
          validateStatus={getValidationStatus(field, form)}
          hasFeedback
          help={getHelpMessage(field, form)}
          extra={helpMessage}
        >
          <AntAutoComplete
            id={id}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            onSearch={onSearch}
            placeholder={placeholder}
            disabled={disabled || isSubmitting}
            dataSource={options}
            className={styles.container}
            allowClear={allowClear}
            autoFocus={autoFocus}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...getIcons(iconBefore, iconAfter)}
          />
        </Item>
      </label>
    </div>
  );
}

AutoComplete.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  field: inputFieldPropTypes.isRequired,
  form: inputFormPropTypes.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  helpMessage: PropTypes.string,
  disabled: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  iconBefore: PropTypes.string,
  iconAfter: PropTypes.string,
  allowClear: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

AutoComplete.defaultProps = {
  placeholder: '',
  required: false,
  helpMessage: '',
  disabled: false,
  iconBefore: '',
  iconAfter: '',
  allowClear: false,
  autoFocus: false,
};
