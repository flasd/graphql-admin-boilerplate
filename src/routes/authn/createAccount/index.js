import { compose, withProps, withState } from 'recompose';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { message } from 'antd';
import redirectIfAuthenticated from '../../../components/HOC/redirectIfAuthenticated';
import renderComponent from '../../../components/HOC/renderComponent';
import CreateAccount from './CreateAccount';
import {
  confirmPasswordRule,
  emailRule,
  makeRequired,
  makeSchema,
  nameRule,
  passwordRule,
  tosRule,
} from '../../../constants/yup-fields';
import loginPath from '../login/Login.path';
import authPath from '../A.path';
import history from '../../../services/history';
import { composePath } from '../../../components/Other/Switcher';
import path from './CreateAccount.path';
import tosPath from '../tos/TOS.path';
import ppPath from '../privacyPolicy/PrivacyPolicy.path';

export function privateInjectProps(routeProps, $history, $message) {
  return {
    ...routeProps,
    tosPath: composePath(tosPath, authPath),
    ppPath: composePath(ppPath, authPath),
    navigateToLogin: () => $history.push(composePath(loginPath, authPath)),
    message: $message,
  };
}

export const createAccountMutation = gql`
  mutation createAccount($input: CreateAccountInput!) {
    createAccount(input: $input)
  }
`;

export const CREATE_ACCOUNT_SCHEMA = makeSchema({
  name: makeRequired(nameRule),
  email: makeRequired(emailRule),
  password: makeRequired(passwordRule),
  confirmPassword: confirmPasswordRule,
  tos: makeRequired(tosRule),
});

export async function privateHandleSubmit(values, formikBag) {
  const { props, setSubmitting } = formikBag;
  const { createAccount, setAccountCreated, message: $message } = props;

  try {
    await createAccount({
      variables: {
        input: {
          name: values.name,
          email: values.email,
          password: values.password,
        },
      },
    });

    setAccountCreated(true);
  } catch (error) {
    $message.error('CHANGE THIS!!');
    setSubmitting(false);
  }
}

export function privateMapPropsToValues() {
  return {
    newsletter: true,
  };
}

export default {
  path,
  render: (routeProps) => compose(
    renderComponent,
    withProps(privateInjectProps(routeProps, history, message)),
    withState('accountCreated', 'setAccountCreated', false),
    graphql(createAccountMutation, { name: 'createAccount' }),
    withFormik({
      handleSubmit: privateHandleSubmit,
      mapPropsToValues: privateMapPropsToValues,
      validationSchema: CREATE_ACCOUNT_SCHEMA,
    }),
    redirectIfAuthenticated('/dashboard'),
  )(CreateAccount),
};
