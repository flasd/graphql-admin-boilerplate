import { compose } from 'recompose';
import Enviar from './Enviar';


export default {
  path: '/enviar',
  component: compose(
  )(Enviar),
};
