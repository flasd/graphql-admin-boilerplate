import { compose, withProps } from 'recompose';
import renderComponent from '../../../components/HOC/renderComponent';
import PrivacyPolicy from './PrivacyPolicy';
import path from './PrivacyPolicy.path';

export default {
  path,
  render: (routeProps) => compose(
    renderComponent,
    withProps(routeProps),
  )(PrivacyPolicy),
};
