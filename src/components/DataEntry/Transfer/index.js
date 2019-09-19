import { withProps } from 'recompose';
import Transfer from './Transfer';

export function privateTransformItem(item) {
  return {
    key: item.value,
    title: item.label,
    description: item.label,
    disabled: item.disabled,
  };
}

export function privateInjectProps(props) {
  const { form, field } = props;
  const { name } = field;
  const { setFieldValue, setFieldTouched } = form;

  return {
    id: `${field.name}-slider-input`.toLowerCase(),
    dataSource: props.dataSource.map(privateTransformItem),
    field: {
      ...field,
      onChange: (value) => {
        setFieldValue(name, value);

        if (!form.touched[name]) {
          setFieldTouched(name, true);
        }
      },
    },
  };
}

export default withProps(privateInjectProps)(Transfer);
