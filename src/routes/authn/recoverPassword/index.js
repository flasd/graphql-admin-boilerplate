import { compose, withProps, withState } from 'recompose';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { message } from 'antd';
import redirectIfAuthenticated from '../../../components/HOC/redirectIfAuthenticated';
import renderComponent from '../../../components/HOC/renderComponent';
import RecoverPassword from './RecoverPassword';
import { makeSchema, makeRequired, emailRule } from '../../../constants/yup-fields';

export const sendRecoveryEmailMutation = gql`
  mutation recoverPassword($email: EmailAddress!) {
    sendPasswordRecoveryEmail(email: $email)
  }
`;

export const RECOVER_PASSWORD = makeSchema({
  email: makeRequired(emailRule),
});

export async function privateHandleSubmit(values, { props, setSubmitting }) {
  const { sendRecoveryEmail, setEmailSent } = props;

  try {
    await sendRecoveryEmail({ variables: { email: values.email } });
    setEmailSent(true);
  } catch (error) {
    setSubmitting(false);
    message.error('Usuário não encontrado!');
  }
}

export default {
  path: '/recuperar-senha',
  render: (routeProps) => compose(
    renderComponent,
    withProps(routeProps),
    withState('emailSent', 'setEmailSent', false),
    graphql(sendRecoveryEmailMutation, { name: 'sendRecoveryEmail' }),
    withFormik({
      handleSubmit: privateHandleSubmit,
      mapValuesToPayload: () => ({}),
      validationSchema: RECOVER_PASSWORD,
    }),
    redirectIfAuthenticated('/dashboard'),
  )(RecoverPassword),
};
