import { compose, withProps } from 'recompose';
import renderComponent from '../../components/HOC/renderComponent';
import TermsOfService from './TermsOfService';
import path from './TermsOfService.path';
import wrapIn from '../../components/HOC/wrapIn';
import PageSheet from '../../components/General/PageSheet';

export default {
  path,
  render: (routeProps) => compose(
    renderComponent,
    withProps(routeProps),
    wrapIn(PageSheet),
  )(TermsOfService),
};
