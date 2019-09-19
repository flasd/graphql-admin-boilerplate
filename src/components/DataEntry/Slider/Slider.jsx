import React from 'react';
import PropTypes from 'prop-types';
import { Form, Slider as AntSlider, Icon } from 'antd';
import * as styles from './Slider.styles';
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

function getIconStyle(isBefore, props) {
  const {
    min,
    max,
    field: { value },
  } = props;
  const mid = ((max - min) / 2).toFixed(5);

  if (isBefore) {
    return { color: value >= mid ? '' : 'rgba(0, 0, 0, .45)' };
  }

  return { color: value >= mid ? 'rgba(0, 0, 0, .45)' : '' };
}

function getDefaultValue(max, range) {
  if (range) {
    return [Math.round(max / 4), Math.round((max / 4) * 3)];
  }

  return Math.round(max / 2);
}

export default function Slider(props) {
  const {
    id,
    label,
    required,
    field,
    form,
    helpMessage,
    disabled,
    range,
    step,
    min,
    max,
    iconBefore,
    iconAfter,
  } = props;

  const { isSubmitting } = form;

  return (
    <div className={styles.container}>
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
          {iconBefore && (
            <Icon type={iconBefore} style={getIconStyle(true, props)} />
          )}
          <AntSlider
            id={id}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            disabled={disabled || isSubmitting}
            defaultValue={getDefaultValue(max, range)}
            range={range}
            min={min}
            max={max}
            step={step}
          />
          {iconAfter && (
            <Icon type={iconAfter} style={getIconStyle(false, props)} />
          )}
        </Item>
      </label>
    </div>
  );
}

Slider.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  field: inputFieldPropTypes.isRequired,
  form: inputFormPropTypes.isRequired,
  required: PropTypes.bool,
  helpMessage: PropTypes.string,
  disabled: PropTypes.bool,
  range: PropTypes.bool,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  iconBefore: PropTypes.string,
  iconAfter: PropTypes.string,
};

Slider.defaultProps = {
  required: false,
  helpMessage: '',
  disabled: false,
  range: false,
  step: 1,
  min: 0,
  max: 100,
  iconBefore: '',
  iconAfter: '',
};
