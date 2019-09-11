import { withAuth } from 'fetch-auth-manager';
import { Redirect } from 'react-router-dom';
import {
  branch,
  compose,
  renderComponent,
  withProps,
} from 'recompose';

export default function redirectIfAuthenticated(to = '/') {
  return compose(
    withAuth,
    branch(
      (props) => props.hasAuth,
      compose(
        withProps({ to }),
        renderComponent(Redirect),
      ),
    ),
  );
}
