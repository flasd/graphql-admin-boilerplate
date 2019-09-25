import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field } from 'formik';
import { Button, Spin, Result } from 'antd';
import Input, { INPUT_TYPES } from '../../../components/DataEntry/Input';
import * as styles from './ResetPassword.styles';

export default function ResetPassword(props) {
  const {
    submitForm, loading, tokenFound, loginPath, isSubmitting,
  } = props;

  if (loading) {
    return (
      <div className={styles.container}>
        <Spin />
      </div>
    );
  }

  if (!tokenFound) {
    const subTitle = (
      <span>
        {'Não encontramos esse pedido de recuperação de senha. '}
        <Link to={loginPath} replace>
          Clique aqui para Recuperar sua Senha novamente ou Fazer Login.
        </Link>
      </span>
    );

    return (
      <Result status="404" title="Algo deu errado..." subTitle={subTitle} />
    );
  }

  return (
    <>
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
      <Button type="primary" block onClick={submitForm} loading={isSubmitting}>
        Confirmar Nova Senha
      </Button>
    </>
  );
}

ResetPassword.propTypes = {
  submitForm: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  tokenFound: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  loginPath: PropTypes.string.isRequired,
};
