import { withProps } from 'recompose';
import Checkbox from './Checkbox';

export function privateInjectProps(props) {
  const { field } = props;

  return {
    id: `${field.name}-single-checkbox`.toLowerCase(),
  };
}

export default withProps(privateInjectProps)(Checkbox);
