import React from 'react';
import { Field } from 'formik';
import { Divider } from 'antd';
import Input, { INPUT_TYPES } from '../../../../../components/DataEntry/Input';
import { helpText } from './PasswordInput.styles';

export default function PasswordInput() {
  return (
    <>
      <Divider />
      <div className={helpText}>
        <strong>
          {
            "Para confirmar a exclusão da conta, digite sua senha e clique em 'Ok'."
          }
        </strong>
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
