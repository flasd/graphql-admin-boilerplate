import { compose, withProps } from 'recompose';
import renderComponent from '../../components/HOC/renderComponent';
import Dashboard from './Dashboard';
import privateRoute from '../../components/HOC/privateRoute';


export default {
  path: '/dashboard',
  exact: true,
  render: (routeProps) => compose(
    renderComponent,
    privateRoute(),
    withProps(routeProps),
  )(Dashboard),
};
