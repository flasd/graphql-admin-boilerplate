import { withProps } from 'recompose';
import Routes from './Routes';
import dashboard from './dashboard';

export default withProps({
  routes: [dashboard],
  fallbackPath: '',
})(Routes);
