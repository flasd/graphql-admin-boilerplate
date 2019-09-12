import { withProps, compose, withStateHandlers } from 'recompose';
import Email from './Email';

const emailProviders = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
];

function onSearch() {
  return (value) => ({
    dataSource: value.indexOf('@') === -1 ? emailProviders.map((provider) => `${value}@${provider}`) : [],
  });
}

export default compose(
  withStateHandlers({ dataSource: [] }, {
    onSearch,
  }),
  withProps((props) => {
    const { form, field } = props;
    const { name } = field;
    const { setFieldValue } = form;

    return {
      id: `${field.name}-email`.toLowerCase(),
      field: {
        ...field,
        onChange: (value) => setFieldValue(name, value),
      },
    };
  }),
)(Email);
