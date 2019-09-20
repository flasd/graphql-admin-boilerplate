import React from 'react';
import PropTypes from 'prop-types';
import { Form, Transfer as AntTransfer } from 'antd';
import classnames from 'classnames';
import * as styles from './Transfer.styles';
import {
  inputFieldPropTypes,
  inputFormPropTypes,
} from '../../../constants/prop-types';

const { Item } = Form;

export function getValidationStatus(field, form) {
  const { errors, touched } = form;
  const { name } = field;

  if (touched[name]) {
    return errors[name] ? 'error' : 'success';
  }

  return '';
}

export function getHelpMessage(field, form) {
  const { errors, touched } = form;
  const { name } = field;

  if (touched[name]) {
    return errors[name];
  }

  return '';
}

export function renderItem(item) {
  return item.title;
}

export default function Transfer(props) {
  const {
    id,
    label,
    required,
    field,
    form,
    helpMessage,
    disabled,
    dataSource,
    titles,
    width,
    height,
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
          <AntTransfer
            id={id}
            name={field.name}
            targetKeys={field.value}
            onChange={field.onChange}
            titles={titles}
            disabled={disabled || isSubmitting}
            dataSource={dataSource}
            render={renderItem}
            listStyle={{ width, height }}
            className={classnames(className)}
          />
        </Item>
      </label>
    </div>
  );
}

const transferItemPropTypes = PropTypes.shape({
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
});

Transfer.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  field: inputFieldPropTypes.isRequired,
  form: inputFormPropTypes.isRequired,
  required: PropTypes.bool,
  helpMessage: PropTypes.string,
  disabled: PropTypes.bool,
  dataSource: PropTypes.arrayOf(transferItemPropTypes).isRequired,
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

Transfer.defaultProps = {
  required: false,
  helpMessage: '',
  disabled: false,
  width: null,
  height: null,
  className: '',
};
