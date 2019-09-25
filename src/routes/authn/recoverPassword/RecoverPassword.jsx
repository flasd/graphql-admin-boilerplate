import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Helmet } from 'react-helmet';
import { Button, Result } from 'antd';
import Email from '../../../components/DataEntry/Email';
import AuthHeader from '../../../components/DataDisplay/AuthHeader';
import Spacer from '../../../components/General/Spacer';

export default function RecoverPassword(props) {
  const { submitForm, isSubmitting, emailSent } = props;

  if (emailSent) {
    const subTitle = (
      <span>
        Enviamos um link de recuperação para seu
        <br />
        e-mail. Basta clica-lo e redefinir sua senha!
      </span>
    );

    return (
      <>
        <Helmet title="E-mail Enviado - Confira seu e-mail para recuperar sua senha." />
        <Result status="success" title="E-mail Enviado!" subTitle={subTitle} />
      </>
    );
  }

  return (
    <>
      <Helmet title="Recuperar Senha - Digite seu e-mail para recuperar sua senha." />

      <AuthHeader
        title="Recuperar senha"
        subTitle="Digite seu e-mail para recuperar sua senha."
      />
      <Field
        name="email"
        iconBefore="user"
        component={Email}
        label="E-mail"
        onPressEnter={submitForm}
      />
      <Spacer space={4} />
      <Button type="primary" block onClick={submitForm} loading={isSubmitting}>
        Recuperar Senha
      </Button>
    </>
  );
}

RecoverPassword.propTypes = {
  submitForm: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  emailSent: PropTypes.bool.isRequired,
};
