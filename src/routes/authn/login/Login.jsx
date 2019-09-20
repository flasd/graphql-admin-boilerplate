import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Button, Divider } from 'antd';
import { Helmet } from 'react-helmet';
import Email from '../../../components/DataEntry/Email';
import Input from '../../../components/DataEntry/Input';
import { INPUT_TYPES } from '../../../components/DataEntry/Input/Input';
import * as styles from './Login.styles';
import AuthHeader from '../../../components/DataDisplay/AuthHeader';

export default function Login(props) {
  const { isValid, submitForm, navigateToSignUp } = props;

  return (
    <div>
      <Helmet title="Login" />

      <AuthHeader title="Entrar" subTitle="Acesse sua conta" />

      <Field name="email" iconBefore="user" component={Email} label="E-mail" />
      <Field
        name="password"
        component={Input}
        label="Senha"
        type={INPUT_TYPES.PASSOWRD}
        onPressEnter={submitForm}
      />
      <Button block type="primary" disabled={!isValid} onClick={submitForm}>
        Entrar
      </Button>

      <Divider className={styles.divider}>
        <span className={styles.dividerText}>Ou</span>
      </Divider>

      <Button block type="link" onClick={navigateToSignUp}>
        Criar sua conta
      </Button>
    </div>
  );
}

Login.propTypes = {
  isValid: PropTypes.bool.isRequired,
  submitForm: PropTypes.func.isRequired,
  navigateToSignUp: PropTypes.func.isRequired,
};
