import { compose, withProps } from 'recompose';
import { withRouter } from 'react-router-dom';
import login from './login';
import renderComponent from '../../components/HOC/renderComponent';
import Switcher, { composePath } from '../../components/Other/Switcher';
import recoverPassword from './recoverPassword';
import resetPassword from './resetPassword';
import confirmEmail from './confirmEmail';
import createAccount from './createAccount';
import A from './A';
import path from './A.path';
import wrapIn from '../../components/HOC/wrapIn';
import tos from './tos';
import privacyPolicy from './privacyPolicy';

export default {
  router: true,
  path,
  render: (routeProps) => compose(
    renderComponent,
    withProps({
      ...routeProps,
      routes: [
        confirmEmail,
        createAccount,
        login,
        recoverPassword,
        resetPassword,
        tos,
        privacyPolicy,
      ],
      fallbackPath: composePath(login.path, routeProps),
    }),
    compose(
      wrapIn,
      withRouter,
    )(A),
  )(Switcher),
};
