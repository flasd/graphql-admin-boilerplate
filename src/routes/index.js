import { withProps } from 'recompose';
import dashboard from './dashboard';
import authn from './authn';
import Switcher from '../components/Other/Switcher';

export default withProps({
  router: true,
  routes: [dashboard, authn],
  fallbackPath: '',
})(Switcher);
