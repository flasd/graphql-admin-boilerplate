import { compose, withProps, withStateHandlers } from 'recompose';
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
    fallbackWarning: 'Caminho não encontrado. Redirecionado ao Início.',
  };
}

export const privateInitialState = {
  collapsed: window.innerWidth < 768,
};

export const privateStateHandlers = {
  toggleCollapse: ({ collapsed }) => () => ({ collapsed: !collapsed }),
};

export const privateDashboardComposition = compose(
  withStateHandlers(privateInitialState, privateStateHandlers),
  withProps({
    items: [],
  }),
  wrapIn(Dashboard),
);

export default {
  router: true,
  path: '/',
  component: compose(
    privateRoute(composePath(LoginPath, APath)),
    withProps(privateInjectProps),
    privateDashboardComposition,
  )(Switcher),
};
