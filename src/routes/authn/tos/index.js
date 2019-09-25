import { compose, withProps } from 'recompose';
import renderComponent from '../../../components/HOC/renderComponent';
import TOS from './TOS';
import path from './TOS.path';

export default {
  path,
  render: (routeProps) => compose(
    renderComponent,
    withProps(routeProps),
  )(TOS),
};
