import { withProps } from 'recompose';
import Textarea from './Textarea';

export function privateInjectProps(props) {
  const { field } = props;

  return {
    id: `${field.name}-textarea-input`.toLowerCase(),
  };
}

export default withProps(privateInjectProps)(Textarea);
