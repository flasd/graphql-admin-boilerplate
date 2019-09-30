import { withFormik } from 'formik';
import { compose, withProps } from 'recompose';
import PasswordInput from './PasswordInput';
import { makeSchema, passwordRule, makeRequired } from '../../../../../constants/yup-fields';

const PASSWORD_SCHEMA = makeSchema({
  password: makeRequired(passwordRule),
});

export async function privateHandleSubmit(values, { props }) {
  const { privateDeleteAccount, id, message: $message } = props;
  const { password } = values;

  try {
    await privateDeleteAccount({
      variables: {
        id,
        password,
      },
    });

    $message.success('Conta removida!');
  } catch (error) {
    $message.error(error.message);
  }
}

export function privateMapPropsToValues() {
  return {};
}

export function privateInjectProps(props) {
  const { setBinding, submitForm, isValid } = props;
  setBinding(submitForm, isValid);
}

export default compose(
  withFormik({
    handleSubmit: privateHandleSubmit,
    mapPropsToValues: privateMapPropsToValues,
    validationSchema: PASSWORD_SCHEMA,
  }),
  withProps(privateInjectProps),
)(PasswordInput);
