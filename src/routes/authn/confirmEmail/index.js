import {
  compose, withProps, withState, lifecycle,
} from 'recompose';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { message } from 'antd';
import renderComponent from '../../../components/HOC/renderComponent';
import ConfirmEmail from './ConfirmEmail';
import history from '../../../services/history';
import { composePath } from '../../../components/Other/Switcher';
import dashboard from '../../dashboard';
import APath from '../A.path';
import LoginPath from '../login/Login.path';

export function privateInjectProps(routeProps, $history, $message) {
  return {
    ...routeProps,
    history: $history,
    dashboardUrl: dashboard.path,
    message: $message,
    loginPath: composePath(LoginPath, APath),
  };
}

export const confirmEmailMutation = gql`
  mutation confirmEmail($confirmationToken: String!) {
    confirmEmail(confirmationToken: $confirmationToken)
  }
`;

export async function privateComponentDidMount() {
  const {
    match: {
      params: { confirmToken },
    },
    confirmEmail,
    setConfirmationError,
    history: $history,
    message: $message,
    dashboardUrl,
  } = this.props;

  try {
    await confirmEmail({ variables: { confirmationToken: confirmToken } });
    $message.success('E-mail confirmado!');
    $history.push(dashboardUrl);
  } catch (error) {
    setConfirmationError(true);
  }
}

export default {
  path: '/confirmar-email/:confirmToken',
  render: (routeProps) => compose(
    renderComponent,
    withProps(privateInjectProps(routeProps, history, message)),
    graphql(confirmEmailMutation, { name: 'confirmEmail' }),
    withState('confirmationError', 'setConfirmationError', false),
    lifecycle({
      componentDidMount: privateComponentDidMount,
    }),
  )(ConfirmEmail),
};
