import { withProps } from 'recompose';
import Checkbox from './Checkbox';

export default withProps((props) => {
  const { field } = props;

  return {
    id: `${field.name}-single-checkbox`.toLowerCase(),
  };
})(Checkbox);
