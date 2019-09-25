import { compose, withProps } from 'recompose';
import renderComponent from '../../components/HOC/renderComponent';
import TermsOfService from './TermsOfService';
import path from './TermsOfService.path';

export default {
  path,
  render: (routeProps) => compose(
    renderComponent,
    withProps(routeProps),
  )(TermsOfService),
};
