import { compose, withProps } from 'recompose';
import redirectIfAuthenticated from '../../../components/HOC/redirectIfAuthenticated';
import renderComponent from '../../../components/HOC/renderComponent';
import Login from './Login';

export default {
  path: '/login',
  render: (routeProps) => compose(
    renderComponent,
    withProps(routeProps),
    redirectIfAuthenticated('/dashboard'),
  )(Login),
};
