import { compose, withProps } from 'recompose';
import Dashboard from './Dashboard';
import privateRoute from '../../components/HOC/privateRoute';
import wrapIn from '../../components/HOC/wrapIn';
import Switcher, { composePath } from '../../components/Other/Switcher';
import home from './home';
import LoginPath from '../authn/login/Login.path';
import APath from '../authn/A.path';

export const privateRoutes = [home];

export function privateInjectProps(props) {
  return {
    routes: privateRoutes,
    fallbackPath: composePath(home.path, props),
  };
}

export default {
  router: true,
  path: '/',
  component: compose(
    withProps(privateInjectProps),
    wrapIn(Dashboard),
    privateRoute(composePath(LoginPath, APath)),
  )(Switcher),
};
