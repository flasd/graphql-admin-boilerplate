import { withProps, compose } from 'recompose';
import { logout, withAuth } from 'fetch-auth-manager';
import Navbar from './Navbar';

export function privateInjectProps($logout) {
  return {
    logout: $logout,
  };
}

export default compose(
  withProps(privateInjectProps(logout)),
  withAuth,
)(Navbar);
