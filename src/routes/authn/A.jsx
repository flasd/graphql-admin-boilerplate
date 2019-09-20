import React from 'react';
import PropTypes from 'prop-types';
import { Card, Layout } from 'antd';
import * as styles from './A.styles';

const { Content } = Layout;

export default function A({ children }) {
  return (
    <Layout className="vh100">
      <Content className={styles.container}>
        <Card className={styles.card}>{children}</Card>
      </Content>
    </Layout>
  );
}

A.propTypes = {
  children: PropTypes.node.isRequired,
};
