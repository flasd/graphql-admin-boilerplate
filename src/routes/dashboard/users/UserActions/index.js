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

export const changeUserRoleMutation = gql`
  mutation changeUserRole($userId: ID!, $role: Role!, $password: String!) {
    changeUserRole(userId: $userId, role: $role, password: $password)
  }
`;

export function privateMakePasswordConfirm(props, texts, fns) {
  return () => {
    // This properties are hointsted from the input component
    // via the setBinding callback
    let submitForm = noop;
    let isValid = false;

    const { modal, refetch } = props;

    modal.confirm({
      title: texts.title,
      content: React.createElement(
        PasswordInput,
        {
          ...props,
          mutate: fns.mutation,
          // This is the setBinding callback that get called
          // every time the PasswordInput updates.
          setBinding: (fn, valid) => {
            submitForm = fn;
            isValid = valid;
          },

          getVariables: fns.getVariables,
          message: texts.message,
          onSuccess: texts.onSuccess,
        },
      ),
      onOk: (fn) => {
        submitForm().then(isValid ? () => {
          fn();

          setTimeout(() => { refetch(); }, 100);
        } : noop);
      },
    });
  };
}

export function privateMapProps(props) {
  return {
    role: props.role,

    makeAdmin: privateMakePasswordConfirm(
      props,
      {
        title: `Tornar ${props.email} Administrador?`,
        message: 'Para confirmar essa mudança, digite sua senha e clique em \'Ok\'.',
        onSuccess: 'Conta agora tem permissão de administrador!',
      },
      {
        mutation: props.privateChangeUserRole,
        getVariables: (ownProps, values) => ({ userId: ownProps.id, role: 'admin', password: values.password }),
      },
    ),

    makeUser: privateMakePasswordConfirm(
      props,
      {
        title: `Tornar ${props.email} Usuário?`,
        message: 'Para confirmar essa mudança, digite sua senha e clique em \'Ok\'.',
        onSuccess: 'Conta agora tem permissão de usuário!',
      },
      {
        mutation: props.privateChangeUserRole,
        getVariables: (ownProps, values) => ({ userId: ownProps.id, role: 'user', password: values.password }),
      },
    ),

    deleteAccount: privateMakePasswordConfirm(
      props,
      {
        title: `Excluir ${props.email}?`,
        message: 'Para confirmar a exclusão da conta, digite sua senha e clique em \'Ok\'.',
        onSuccess: 'Conta Excluída com Sucesso!',

      },
      {
        mutation: props.privateChangeUserRole,
        getVariables: (ownProps, values) => ({ id: ownProps.id, password: values.password }),
      },
    ),

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
  graphql(changeUserRoleMutation, { name: 'privateChangeUserRole' }),
  mapProps(privateMapProps),
)(UserActions);
