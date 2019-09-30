import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Helmet } from 'react-helmet';
import { Button, Divider, Result } from 'antd';
import AuthHeader from '../../../components/General/AuthHeader';
import Input, { INPUT_TYPES } from '../../../components/DataEntry/Input';
import Email from '../../../components/DataEntry/Email';
import CheckBox from '../../../components/DataEntry/Checkbox';
import Spacer from '../../../components/General/Spacer';

export default function CreateAccount(props) {
  const {
    submitForm,
    navigateToLogin,
    tosPath,
    ppPath,
    accountCreated,
  } = props;

  const terms = (
    <span>
      {'Lí e concordo com os ambos os '}
      <a href={tosPath} target="_blank" rel="noopener noreferrer">Termos de Serviço</a>
      {' e '}
      <a href={ppPath} target="_blank" rel="noopener noreferrer">Política de Privacidade</a>
      {'.'}
    </span>
  );

  if (accountCreated) {
    return (
      <>
        <Helmet title="Conta criada com sucesso! Confira seu e-mail." />
        <Result
          status="success"
          title="Confira seu E-mail"
          subTitle="Mandamos um e-mail de confirmação para você confirmar sua conta. Basta clicar no link!"
        />
      </>
    );
  }

  return (
    <div>
      <Helmet title="Criar conta - Preencha seus dados" />

      <AuthHeader title="Criar conta" subTitle="Preencha seus dados" />

      <Field component={Input} name="name" label="Nome" autoFocus />
      <Field component={Email} name="email" label="E-mail" />
      <Field
        name="password"
        component={Input}
        label="Senha"
        type={INPUT_TYPES.PASSOWRD}
      />
      <Field
        name="confirmPassword"
        component={Input}
        label="Confirmar Senha"
        type={INPUT_TYPES.PASSOWRD}
        onPressEnter={submitForm}
      />
      <Spacer space={12} />
      <Field name="tos" component={CheckBox} label={terms} />
      <Spacer space={4} />
      <Field
        name="newsletter"
        component={CheckBox}
        label="Gostaria de receber notícias e atualizações."
      />
      <Spacer space={12} />
      <Button type="primary" block onClick={submitForm}>
        Criar Conta
      </Button>
      <Divider />
      <Button block onClick={navigateToLogin}>
        Já tem conta? Entre agora
      </Button>
    </div>
  );
}

CreateAccount.propTypes = {
  submitForm: PropTypes.func.isRequired,
  navigateToLogin: PropTypes.func.isRequired,
  tosPath: PropTypes.string.isRequired,
  ppPath: PropTypes.string.isRequired,
  accountCreated: PropTypes.bool.isRequired,
};
