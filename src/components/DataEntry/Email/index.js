import { withProps, compose, withStateHandlers } from 'recompose';
import Email from './Email';

const emailProviders = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
];

export function privateOnSearch() {
  return (value) => ({
    dataSource: value.indexOf('@') === -1 ? emailProviders.map((provider) => `${value}@${provider}`) : [],
  });
}

export function privateInjectProps(props) {
  const { form, field } = props;
  const { name } = field;
  const { setFieldValue, setFieldTouched } = form;

  return {
    id: `${field.name}-email`.toLowerCase(),
    field: {
      ...field,
      onChange: (value) => setFieldValue(name, value),
      onBlur: () => {
        if (!form.touched[name]) {
          setFieldTouched(name, true);
        }
      },
    },
  };
}

export const privateInitialState = {
  dataSource: [],
};

export const privateStateHandlers = {
  onSearch: privateOnSearch,
};

export default compose(
  withStateHandlers(privateInitialState, privateStateHandlers),
  withProps(privateInjectProps),
)(Email);
