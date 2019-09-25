import { withProps } from 'recompose';
import dashboard from './dashboard';
import authn from './authn';
import Switcher from '../components/Other/Switcher';
import termsOfService from './termsOfService';
import privacyPolicy from './privacyPolicy';

export default withProps({
  router: true,
  routes: [dashboard, authn, termsOfService, privacyPolicy],
  fallbackPath: '',
})(Switcher);
