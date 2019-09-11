import { withAuth } from 'fetch-auth-manager';
import { Redirect } from 'react-router-dom';
import {
  branch,
  compose,
  renderComponent,
  withProps,
} from 'recompose';

export default function privateRoute(fallbackRoute = '/login') {
  return compose(
    withAuth,
    branch(
      (props) => !props.hasAuth,
      compose(
        withProps({ to: `${fallbackRoute}?next=${window.location.pathname}` }),
        renderComponent(Redirect),
      ),
    ),
  );
}
