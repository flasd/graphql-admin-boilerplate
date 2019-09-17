import { withProps } from 'recompose';
import Radio from './Radio';

export function privateInjectProps(props) {
  const { field } = props;

  return {
    id: `${field.name}-radio-input`.toLowerCase(),
  };
}

export default withProps(privateInjectProps)(Radio);
