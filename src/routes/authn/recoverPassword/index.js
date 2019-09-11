import { compose, withProps } from 'recompose';
import redirectIfAuthenticated from '../../../components/HOC/redirectIfAuthenticated';
import renderComponent from '../../../components/HOC/renderComponent';
import RecoverPassword from './RecoverPassword';

export default {
  path: '/recover-password',
  render: (routeProps) => compose(
    renderComponent,
    withProps(routeProps),
    redirectIfAuthenticated('/dashboard'),
  )(RecoverPassword),
};
