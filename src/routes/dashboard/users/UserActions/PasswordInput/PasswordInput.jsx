import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Divider } from 'antd';
import Input, { INPUT_TYPES } from '../../../../../components/DataEntry/Input';
import { helpText } from './PasswordInput.styles';

export default function PasswordInput(props) {
  const { message } = props;

  return (
    <>
      <Divider />
      <div className={helpText}>
        <strong>{message}</strong>
      </div>
      <Field
        name="password"
        component={Input}
        label="Senha"
        type={INPUT_TYPES.PASSOWRD}
      />
    </>
  );
}

PasswordInput.propTypes = {
  message: PropTypes.string.isRequired,
};
