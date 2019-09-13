import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox as AntCheckbox } from 'antd';
import {
  inputFieldPropTypes,
  inputFormPropTypes,
} from '../../../constants/prop-types';

const { Group } = AntCheckbox;

export default function Checkbox(props) {
  const {
    id,
    field,
    form,
    disabled,
    options,
  } = props;

  const { isSubmitting } = form;

  return (
    <Group
      name={field.name}
      onChange={field.onChange}
      onBlur={field.onBlur}
      checked={field.value}
      disabled={disabled || isSubmitting}
    >
      {options.map((option, index) => (
        <AntCheckbox
          key={option.value}
          value={option.value}
          id={`${id}-${index}`}
        >
          {option.label}
        </AntCheckbox>
      ))}
    </Group>
  );
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  field: inputFieldPropTypes.isRequired,
  form: inputFormPropTypes.isRequired,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

Checkbox.defaultProps = {
  disabled: false,
};
