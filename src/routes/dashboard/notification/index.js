import { compose, withProps } from 'recompose';
import Switcher, { composePath } from '../../../components/Other/Switcher';
import topics from './topics';
import enviar from './enviar';

export default {
  router: true,
  path: '/notificacoes',
  component: compose(withProps((props) => ({
    routes: [topics, enviar],
    fallbackPath: composePath('/topicos', props),
  })))(Switcher),
};
