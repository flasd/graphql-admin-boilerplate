import { lazy } from 'react';
import { compose, withProps } from 'recompose';
import redirectIfAuthenticated from '../../../components/HOC/redirectIfAuthenticated';
import renderComponent from '../../../components/HOC/renderComponent';
import withLoading from '../../../components/HOC/withLoading';
import ResetPasswordShimmer from './ResetPasswordShimmer';

const ResetPassword = lazy(() => import('./ResetPassword'));

export default {
  path: '/reset-password/:resetToken',
  render: (routeProps) => compose(
    renderComponent,
    withLoading(ResetPasswordShimmer),
    withProps(routeProps),
    redirectIfAuthenticated('/dashboard'),
  )(ResetPassword),
};
