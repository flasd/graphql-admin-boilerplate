import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox as AntCheckbox } from 'antd';
import {
  inputFieldPropTypes,
  inputFormPropTypes,
} from '../../../constants/prop-types';

export default function Checkbox(props) {
  const {
    id,
    label,
    field,
    form,
    disabled,
  } = props;

  const { isSubmitting } = form;

  return (
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
  );
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  field: inputFieldPropTypes.isRequired,
  form: inputFormPropTypes.isRequired,
  disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  disabled: false,
};
