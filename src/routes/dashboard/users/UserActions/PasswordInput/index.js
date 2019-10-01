import { withFormik } from 'formik';
import { compose, withProps } from 'recompose';
import { message } from 'antd';
import PasswordInput from './PasswordInput';
import { makeSchema, passwordRule, makeRequired } from '../../../../../constants/yup-fields';

const PASSWORD_SCHEMA = makeSchema({
  password: makeRequired(passwordRule),
});

export async function privateHandleSubmit(values, { props }) {
  const {
    mutate, $message, getVariables, onSuccess,
  } = props;

  try {
    await mutate({
      variables: getVariables(props, values),
    });

    $message.success(onSuccess);
  } catch (error) {
    $message.error(error.message);
  }
}

export function privateMapPropsToValues() {
  return {};
}

export function privateInjectBinding(props) {
  const { setBinding, submitForm, isValid } = props;
  setBinding(submitForm, isValid);

  return {};
}

export function privateInjectMessage($message) {
  return () => ({ $message });
}

export default compose(
  withProps(privateInjectMessage(message)),
  withFormik({
    handleSubmit: privateHandleSubmit,
    mapPropsToValues: privateMapPropsToValues,
    validationSchema: PASSWORD_SCHEMA,
  }),
  withProps(privateInjectBinding),
)(PasswordInput);
