import { compose, withProps } from 'recompose';
import { withFormik } from 'formik';
import * as yup from 'yup';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { message } from 'antd';
import history from '../../../services/history';
import redirectIfAuthenticated from '../../../components/HOC/redirectIfAuthenticated';
import renderComponent from '../../../components/HOC/renderComponent';
import { composePath } from '../../../components/Other/Switcher';
import Login from './Login';
import createAccount from '../createAccount';

export const loginMutation = gql`
  mutation login($email: EmailAddress!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const LOGIN_SCHEMA = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Campo obrigarório'),
  password: yup.string().required('Campo obrigarório'),
});

export function privateInjectProps($history) {
  return {
    navigateToSignUp: () => $history.push(composePath(createAccount.path, '/a')),
    history: $history,
  };
}

export async function privateHandleSubmit(values, { props, setSubmitting }) {
  const { login } = props;

  try {
    await login({ variables: { ...values } });
    props.history.push('/dashboard');
  } catch (error) {
    message.error(error.message);
  }

  setSubmitting(false);
}

export default {
  path: '/login',
  render: (routeProps) => compose(
    renderComponent,
    graphql(loginMutation, { name: 'login' }),
    withProps({ routeProps, ...privateInjectProps(history) }),
    withFormik({
      handleSubmit: privateHandleSubmit,
      mapPropsToValues: () => ({}),
      validationSchema: LOGIN_SCHEMA,
    }),
    redirectIfAuthenticated('/dashboard'),
  )(Login),
};
