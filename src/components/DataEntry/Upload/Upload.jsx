import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Form, Icon, Upload as AntUpload, Button,
} from 'antd';
import {
  inputFieldPropTypes,
  inputFormPropTypes,
} from '../../../constants/prop-types';
import * as styles from './Upload.styles';

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

export default function Upload(props) {
  const {
    id,
    label,
    field,
    form,
    helpMessage,
    disabled,
    iconBefore,
    accept,
    directory,
    validate,
    multiple,
    handleUpload,
    className,
  } = props;

  const { isSubmitting } = form;

  return (
    <div>
      <Item
        validateStatus={getValidationStatus(field, form)}
        help={getHelpMessage(field, form)}
        extra={helpMessage}
      >
        <AntUpload
          id={id}
          name={field.name}
          onChange={field.onChange}
          fileList={field.value}
          disabled={disabled || isSubmitting}
          multiple={multiple}
          customRequest={handleUpload}
          accept={accept}
          directory={directory}
          beforeUpload={validate}
          showUploadList
          className={classnames(styles.input, className)}
        >
          <Button onBlur={field.onBlur} block className={styles.button}>
            <Icon type={iconBefore} />
            {` ${label}`}
          </Button>
        </AntUpload>
      </Item>
    </div>
  );
}

Upload.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  field: inputFieldPropTypes.isRequired,
  form: inputFormPropTypes.isRequired,
  helpMessage: PropTypes.string,
  disabled: PropTypes.bool,
  iconBefore: PropTypes.string,
  accept: PropTypes.string,
  directory: PropTypes.bool,
  multiple: PropTypes.bool,
  validate: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

Upload.defaultProps = {
  helpMessage: '',
  disabled: false,
  iconBefore: 'upload',
  accept: '',
  directory: false,
  multiple: false,
  className: '',
};
