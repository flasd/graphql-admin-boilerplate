import { compose, withProps, withStateHandlers } from 'recompose';
import Dashboard from './Dashboard';
import privateRoute from '../../components/HOC/privateRoute';
import wrapIn from '../../components/HOC/wrapIn';
import Switcher, { composePath } from '../../components/Other/Switcher';
import home from './home';
import users from './users';
import LoginPath from '../authn/login/Login.path';
import APath from '../authn/A.path';
import notification from './notification';
import topics from './notification/topics';
import enviar from './notification/enviar';

export const privateRoutes = [home, users, notification];

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

export const privateNavbarItems = [
  {
    href: '/usuarios',
    label: 'Usuários',
    icon: 'user',
  },
  {
    href: notification.path,
    label: 'Notificações',
    icon: 'notification',
    subItems: [
      {
        href: composePath(enviar.path, notification.path),
        label: 'Painel de Controle',
      },
      {
        href: composePath(topics.path, notification.path),
        label: 'Tópicos',
      },
    ],
  },
  {
    href: '/pagamentos',
    label: 'Pagamentos',
    icon: 'credit-card',
  },
];

export const privateDashboardComposition = compose(
  withStateHandlers(privateInitialState, privateStateHandlers),
  withProps({
    items: privateNavbarItems,
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
