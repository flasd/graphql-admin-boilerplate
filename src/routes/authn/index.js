import { compose, withProps } from 'recompose';
import login from './login';
import renderComponent from '../../components/HOC/renderComponent';
import Switcher, { composePath } from '../../components/Other/Switcher';
import recoverPassword from './recoverPassword';
import resetPassword from './resetPassword';
import confirmEmail from './confirmEmail';
import createAccount from './createAccount';

export default {
  router: true,
  path: '/authn',
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
      ],
      fallbackPath: composePath(login.path, routeProps),
    }),
  )(Switcher),
};
