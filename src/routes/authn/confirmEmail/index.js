import { compose, withProps } from 'recompose';
import redirectIfAuthenticated from '../../../components/HOC/redirectIfAuthenticated';
import renderComponent from '../../../components/HOC/renderComponent';
import ConfirmEmail from './ConfirmEmail';

export default {
  path: '/confirm-email/:confirmToken',
  render: (routeProps) => compose(
    renderComponent,
    withProps(routeProps),
    redirectIfAuthenticated('/dashboard'),
  )(ConfirmEmail),
};
