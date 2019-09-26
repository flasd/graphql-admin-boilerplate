import { compose, withProps } from 'recompose';
import { withRouter } from 'react-router-dom';
import login from './login';
import Switcher, { composePath } from '../../components/Other/Switcher';
import recoverPassword from './recoverPassword';
import resetPassword from './resetPassword';
import confirmEmail from './confirmEmail';
import createAccount from './createAccount';
import A from './A';
import path from './A.path';
import wrapIn from '../../components/HOC/wrapIn';
import privacyPolicy from '../privacyPolicy';

export const privateRoutes = [
  confirmEmail,
  createAccount,
  login,
  recoverPassword,
  resetPassword,
  privacyPolicy,
];

export default {
  router: true,
  path,
  component: compose(
    withProps((props) => ({
      routes: privateRoutes,
      fallbackPath: composePath(login.path, props),
    })),
    compose(
      wrapIn,
      withRouter,
    )(A),
  )(Switcher),
};
