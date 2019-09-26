import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import * as styles from './PageSheet.styles';

const { Content, Footer } = Layout;

export default function PageSheet({ children }) {
  return (
    <Layout className={classnames('vh100', styles.container)}>
      <Content className={styles.content}>{children}</Content>
      <Footer style={{ textAlign: 'center' }}>
        <Link to="/">Voltar ao Início</Link>
      </Footer>
    </Layout>
  );
}
