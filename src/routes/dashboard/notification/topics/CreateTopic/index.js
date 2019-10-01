import { compose, withProps } from 'recompose';
import { withFormik } from 'formik';
import noop from 'lodash.noop';
import { Modal } from 'antd';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import CreateTopic from './CreateTopic';
import wrapIn from '../../../../../components/HOC/wrapIn';
import { makeRequired, makeSchema, topicNameRule } from '../../../../../constants/yup-fields';
import { mapPropsToValuesNoop } from '../../../../../constants/form-helpers';

export const createTopicMutation = gql`
  mutation createTopic($name: String!) {
    createTopic(name: $name) {
      name
    }
  }
`;

export async function privateHandleSubmit(values, { props, setSubmitting, resetForm }) {
  const {
    createTopic,
    $message,
    closeModal,
    refetch,
  } = props;

  try {
    await createTopic({ variables: { name: values.name } });
    closeModal();
    resetForm();
    setTimeout(refetch, 100);
  } catch (error) {
    if (error.message.includes('Validation error')) {
      $message.error('Já existe/existiu tópico com esse nome. Tente outro!');
    }
    setSubmitting(false);
  }
}

export const CREATE_TOPIC_SCHEMA = makeSchema({
  name: makeRequired(topicNameRule),
});

export function privateInjectProps(props) {
  const {
    isSubmitting,
    submitForm,
    refetch,
    isValid,
  } = props;

  return {
    title: 'Criar Tópico',
    okText: 'Criar',
    destroyOnClose: true,
    onOk: () => submitForm().then(isValid ? refetch : noop),
    confirmLoading: isSubmitting,
  };
}

export default compose(
  graphql(createTopicMutation, { name: 'createTopic' }),
  withFormik({
    mapPropsToValues: mapPropsToValuesNoop,
    handleSubmit: privateHandleSubmit,
    validationSchema: CREATE_TOPIC_SCHEMA,
  }),
  withProps(privateInjectProps),
  wrapIn(Modal),
)(CreateTopic);
