import React from 'react';
import PropTypes from 'prop-types';
import { Result, Spin } from 'antd';
import { Link } from 'react-router-dom';
import * as styles from './ConfirmEmail.styles';

export default function ConfirmEmail(props) {
  const { confirmationError, loginPath } = props;

  const subTitle = (
    <span>
      Não encontramos seu token. Isso pode significar que você já confirmou seu
      e-mail (!!!) ou que você ainda não criou sua conta!
      <br />
      <br />
      <Link to={loginPath}>
        Clique aqui p/ Criar sua Conta ou Fazer Login
      </Link>
    </span>
  );

  if (confirmationError) {
    return <Result status="500" title="Algo deu errado..." subTitle={subTitle} />;
  }

  return (
    <div className={styles.container}>
      <Spin />
    </div>
  );
}

ConfirmEmail.propTypes = {
  confirmationError: PropTypes.bool.isRequired,
  loginPath: PropTypes.string.isRequired,
};
