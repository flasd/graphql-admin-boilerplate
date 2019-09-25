import {
  compose, withProps, withStateHandlers,
} from 'recompose';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { message } from 'antd';
import ResetPassword from './ResetPassword';
import renderComponent from '../../../components/HOC/renderComponent';
import history from '../../../services/history';
import LoginPath from '../login/Login.path';
import { composePath } from '../../../components/Other/Switcher';
import APath from '../A.path';

export const privateInitialState = {
  loading: true,
  tokenFound: false,
};

export const privateStateHandlers = {
  doneLoading: () => (tokenFound) => ({ loading: false, tokenFound }),
};

export const recoveryTokenExistsQuery = gql`
  query recoveryTokenExists($recoveryToken: String!) {
    recoveryTokenExists(recoveryToken: $recoveryToken)
  }
`;

export function privateOptions(props) {
  const {
    doneLoading,
    match: {
      params: { resetToken },
    },
  } = props;

  return {
    variables: {
      recoveryToken: resetToken,
    },
    onCompleted: ({ recoveryTokenExists }) => {
      doneLoading(recoveryTokenExists);
    },
    onError: () => {
      doneLoading(false);
    },
  };
}

export const recoverPasswordMutation = gql`
  mutation recoverPassword($recoveryToken: String!, $password: String!){
    recoverPassword(recoveryToken: $recoveryToken, password: $password)
  }
`;

export async function privateHandleSubmit(values, { props, setSubmitting }) {
  const {
    recoverPassword,
    match: {
      params: {
        resetToken,
      },
    },
    history: $history,
    message: $message,
  } = props;

  try {
    await recoverPassword({
      variables: {
        recoveryToken: resetToken,
        password: values.password,
      },
    });

    $message.success('Senha redefinida com sucesso');

    $history.replace(LoginPath);
  } catch (error) {
    $message.error('Token expirado ou algo inesperado aconteceu...');
    setSubmitting(false);
  }
}

export function injectProps(routeProps, $history, $message) {
  return {
    ...routeProps,
    history: $history,
    message: $message,
    loginPath: composePath(LoginPath, APath),
  };
}

export default {
  path: '/redefinir-senha/:resetToken',
  render: (routeProps) => compose(
    renderComponent,
    withProps(injectProps(routeProps, history, message)),
    withStateHandlers(privateInitialState, privateStateHandlers),
    graphql(recoveryTokenExistsQuery, {
      name: 'recoveryTokenExists',
      options: privateOptions,
    }),
    graphql(recoverPasswordMutation, { name: 'recoverPassword' }),
    withFormik({
      handleSubmit: privateHandleSubmit,
      mapPropsToValues: () => ({}),
    }),
  )(ResetPassword),
};
