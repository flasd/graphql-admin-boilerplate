import { compose, withProps } from 'recompose';
import redirectIfAuthenticated from '../../../components/HOC/redirectIfAuthenticated';
import renderComponent from '../../../components/HOC/renderComponent';
import CreateAccount from './CreateAccount';

export default {
  path: '/create-account',
  render: (routeProps) => compose(
    renderComponent,
    withProps(routeProps),
    redirectIfAuthenticated('/dashboard'),
  )(CreateAccount),
};
