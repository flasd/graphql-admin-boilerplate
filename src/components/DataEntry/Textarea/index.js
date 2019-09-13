import { withProps } from 'recompose';
import Textarea from './Textarea';

export default withProps((props) => {
  const { field } = props;

  return {
    id: `${field.name}-textarea-input`.toLowerCase(),
  };
})(Textarea);
