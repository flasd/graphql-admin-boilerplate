import {
  compose,
  withProps,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { withFormik } from 'formik';
import * as yup from 'yup';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { message } from 'antd';
import history from '../../../services/history';
import redirectIfAuthenticated from '../../../components/HOC/redirectIfAuthenticated';
import { composePath } from '../../../components/Other/Switcher';
import Login from './Login';
import authPath from '../A.path';
import dashboard from '../../dashboard';
import createAccountPath from '../createAccount/CreateAccount.path';
import { makeRequired, emailRule, passwordRule } from '../../../constants/yup-fields';
import path from './Login.path';

const firebase = import('../../../services/firebase');

// General

export function privateInjectProps($history, $message) {
  return {
    navigateToSignUp: () => $history.push(composePath(createAccountPath, authPath)),
    history: $history,
    message: $message,
  };
}

// Social Auth

export const privateInitialState = {
  emailLoading: false,
  facebookLoading: false,
  googleLoading: false,
};

export function setLoading(authProvider) {
  switch (authProvider) {
    case 'facebook':
      return {
        ...privateInitialState,
        facebookLoading: true,
      };

    case 'google':
      return {
        ...privateInitialState,
        googleLoading: true,
      };

    case 'email':
      return {
        ...privateInitialState,
        emailLoading: true,
      };

    case 'unset':
    default:
      return {
        ...privateInitialState,
      };
  }
}

export const privateStateHandlers = {
  setLoading: () => setLoading,
};

export const createSocialAccountMutation = gql`
  mutation createSocialAccount($firebaseIdToken: String!) {
    createSocialAccount(firebaseIdToken: $firebaseIdToken)
  }
`;

export const socialLoginMutation = gql`
  mutation socialLogin($firebaseIdToken: String!) {
    socialLogin(firebaseIdToken: $firebaseIdToken)
  }
`;

export async function privateGetProvider(authProvider) {
  const {
    default: $firebase,
  } = await firebase;

  if (authProvider === 'facebook') {
    return new $firebase.auth.FacebookAuthProvider();
  }

  return new $firebase.auth.GoogleAuthProvider();
}

export function privateSignInWithProvider(props) {
  const {
    createSocialAccount,
    socialLogin,
    setLoading: $setLoading,
    history: $history,
    message: $message,
  } = props;

  return async (authProvider) => {
    const {
      auth,
    } = await firebase;

    const provider = await privateGetProvider(authProvider);
    auth.languageCode = 'pt';

    $setLoading(authProvider);

    try {
      await auth.signInWithPopup(provider);

      const idToken = await auth.currentUser.getIdToken();

      await createSocialAccount({ variables: { firebaseIdToken: idToken } });
      await socialLogin({ variables: { firebaseIdToken: idToken } });
      $history.replace(dashboard.path);
    } catch (error) {
      $message.error(`Algo deu errado ao tentar atenticar com ${authProvider}.`);
      $setLoading('unset');
    }
  };
}

export const privateSocialAuthComposition = compose(
  withStateHandlers(privateInitialState, privateStateHandlers),
  graphql(socialLoginMutation, { name: 'socialLogin' }),
  graphql(createSocialAccountMutation, { name: 'createSocialAccount' }),
  withHandlers({
    socialLogin: privateSignInWithProvider,
  }),
);


// Email Auth

export const loginMutation = gql`
  mutation login($email: EmailAddress!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const LOGIN_SCHEMA = yup.object().shape({
  email: makeRequired(emailRule),
  password: makeRequired(passwordRule),
});

export async function privateHandleSubmit(values, { props, setSubmitting, setErrors }) {
  const { login, setLoading: $setLoading } = props;

  $setLoading('email');

  try {
    await login({ variables: { ...values } });
    props.history.replace(dashboard.path);
  } catch (error) {
    if (error.message.includes('429')) {
      return;
    }

    setErrors({
      email: 'Email não cadastrado ou senha inválida.',
    });
    $setLoading('unset');
    setSubmitting(false);
  }
}

export const privateEmailAuthComposition = compose(
  graphql(loginMutation, { name: 'login' }),
  withFormik({
    handleSubmit: privateHandleSubmit,
    mapPropsToValues: () => ({}),
    validationSchema: LOGIN_SCHEMA,
  }),
);


// Main Composition

export default {
  path,
  component: compose(
    redirectIfAuthenticated(dashboard.path),
    withProps(privateInjectProps(history, message)),
    privateSocialAuthComposition,
    privateEmailAuthComposition,
  )(Login),
};
