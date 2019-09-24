import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Card, Layout } from 'antd';
import * as styles from './A.styles';

const { Content } = Layout;

export default function A({ children, history }) {
  const { action } = history;
  const animation = styles[action];

  return (
    <Layout className="vh100">
      <Content className={styles.container}>
        <Card className={classnames(styles.card, animation)}>{children}</Card>
      </Content>
    </Layout>
  );
}

A.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
