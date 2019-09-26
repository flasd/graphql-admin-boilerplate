import { withProps } from 'recompose';
import { logout } from 'fetch-auth-manager';
import Navbar from './Navbar';

export function privateInjectProps($logout) {
  return {
    logout: $logout,
  };
}

export default withProps(privateInjectProps(logout))(Navbar);
