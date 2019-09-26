import { compose, withProps } from 'recompose';
import renderComponent from '../../components/HOC/renderComponent';
import PrivacyPolicy from './PrivacyPolicy';
import path from './PrivacyPolicy.path';
import wrapIn from '../../components/HOC/wrapIn';
import PageSheet from '../../components/General/PageSheet';

export default {
  path,
  render: (routeProps) => compose(
    renderComponent,
    withProps(routeProps),
    wrapIn(PageSheet),
  )(PrivacyPolicy),
};
