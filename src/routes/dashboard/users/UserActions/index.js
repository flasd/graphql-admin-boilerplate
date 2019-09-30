import React from 'react';
import { compose, mapProps, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Modal, message } from 'antd';
import noop from 'lodash.noop';
import UserActions from './UserActions';
import PasswordInput from './PasswordInput';


export const sendRecoveryEmailMutation = gql`
  mutation recoverPassword($email: EmailAddress!) {
    sendPasswordRecoveryEmailAdmin(email: $email)
  }
`;

export const disableAccountAsAdminMutation = gql`
  mutation disableAccount($id: ID!, $password: String!) {
    removeAccountAsAdmin(id: $id, password: $password)
  }
`;

export function privateMapProps(props) {
  return {
    deleteAccount: () => {
      // This properties are hointsted from the input component
      // via the setBinding callback
      let submitForm = noop;
      let isValid = false;

      const { email, modal } = props;

      modal.confirm({
        title: `Exclusão da conta ${email}`,
        content: React.createElement(
          PasswordInput,
          {
            ...props,
            // This is the setBinding callback that get called
            // every time the PasswordInput updates.
            setBinding: (fn, valid) => {
              submitForm = fn;
              isValid = valid;
            },
          },
        ),
        onOk: (fn) => { submitForm().then(isValid ? fn : noop); },
      });
    },
    recoverPassword: () => {
      const { privateRecoverPassword, message: $message, modal } = props;

      modal.confirm({
        title: 'Enviar e-mail de recuperação de senha?',
        onOk: async () => {
          try {
            await privateRecoverPassword({ variables: { email: props.email } });
            $message.success('E-mail de recuperação enviado!');
          } catch (error) {
            $message.error(error.message);
          }
        },
      });
    },
  };
}


export function privateInjectProps($message, $modal) {
  return () => ({ message: $message, modal: $modal });
}

export default compose(
  withProps(privateInjectProps(message, Modal)),
  graphql(sendRecoveryEmailMutation, { name: 'privateRecoverPassword' }),
  graphql(disableAccountAsAdminMutation, { name: 'privateDeleteAccount' }),
  mapProps(privateMapProps),
)(UserActions);
