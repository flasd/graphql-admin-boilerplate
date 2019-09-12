import { withProps } from 'recompose';
import Input, { INPUT_TYPES } from './Input';

export default withProps((props) => {
  const { field, type: inputType } = props;

  return {
    id: `${field.name}-${inputType || INPUT_TYPES.ANY}-input`.toLowerCase(),
  };
})(Input);
