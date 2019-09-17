import { withProps } from 'recompose';
import Input, { INPUT_TYPES } from './Input';

export function privateInjectProps(props) {
  const { field, type: inputType } = props;

  return {
    id: `${field.name}-${inputType || INPUT_TYPES.ANY}-input`.toLowerCase(),
  };
}

export default withProps(privateInjectProps)(Input);
