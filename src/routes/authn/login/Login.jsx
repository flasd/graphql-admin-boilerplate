import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Link } from 'react-router-dom';
import {
  Button, Divider, Typography, Icon,
} from 'antd';
import { Helmet } from 'react-helmet';
import Email from '../../../components/DataEntry/Email';
import Input from '../../../components/DataEntry/Input';
import { INPUT_TYPES } from '../../../components/DataEntry/Input/Input';
import * as styles from './Login.styles';
import AuthHeader from '../../../components/DataDisplay/AuthHeader';
import { composePath } from '../../../components/Other/Switcher';
import authPath from '../A.path';
import recoverPassword from '../recoverPassword';
import Spacer from '../../../components/Other/Spacer';

const { Paragraph } = Typography;

export default function Login(props) {
  const {
    submitForm,
    navigateToSignUp,
    emailLoading,
    googleLoading,
    facebookLoading,
    socialLogin,
  } = props;

  return (
    <div>
      <Helmet title="Acesse sua conta" />

      <AuthHeader title="Entrar" subTitle="Acesse sua conta" />

      <Field
        name="email"
        iconBefore="user"
        component={Email}
        label="E-mail"
        disabled={emailLoading || facebookLoading || googleLoading}
      />
      <Field
        name="password"
        component={Input}
        label="Senha"
        type={INPUT_TYPES.PASSOWRD}
        onPressEnter={submitForm}
        disabled={emailLoading || facebookLoading || googleLoading}
      />
      <Spacer space={12} />
      <Button
        block
        type="primary"
        onClick={submitForm}
        loading={emailLoading}
        disabled={facebookLoading || googleLoading}
      >
        Entrar
      </Button>

      <Paragraph className={styles.forgotPassword}>
        <Link to={composePath(recoverPassword.path, authPath)}>
          Esqueceu seu senha?
        </Link>
      </Paragraph>

      <Divider className={styles.divider} />

      <Button
        block
        className={styles.googleButton}
        loading={googleLoading}
        onClick={() => socialLogin('google')}
        disabled={emailLoading || facebookLoading}
      >
        <div className={styles.buttonContainer}>
          <div>
            <Icon type="google" />
          </div>
          <div className={styles.buttonText}>Entrar com o Google</div>
        </div>
      </Button>

      <Spacer space={12} />

      <Button
        block
        className={styles.facebookButton}
        loading={facebookLoading}
        onClick={() => socialLogin('facebook')}
        disabled={emailLoading || googleLoading}
      >
        <div className={styles.buttonContainer}>
          <div>
            <Icon type="facebook" theme="filled" />
          </div>
          <div className={styles.buttonText}>Entrar com o Facebook</div>
        </div>
      </Button>

      <Divider className={styles.divider} />

      <Button block onClick={navigateToSignUp}>
        Criar sua conta
      </Button>
    </div>
  );
}

Login.propTypes = {
  submitForm: PropTypes.func.isRequired,
  navigateToSignUp: PropTypes.func.isRequired,
  emailLoading: PropTypes.bool.isRequired,
  googleLoading: PropTypes.bool.isRequired,
  facebookLoading: PropTypes.bool.isRequired,
  socialLogin: PropTypes.func.isRequired,
};
