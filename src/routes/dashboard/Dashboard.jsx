import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Menu from '../../components/General/Menu';
import Sidebar from '../../components/General/Sidebar';
import { childrenPropTypes } from '../../constants/prop-types';
import { menuItemPropTypes } from '../../components/General/Menu/Menu';
import Navbar from '../../components/General/Navbar';

const { Content } = Layout;

export default function Dashboard(props) {
  const {
    children, collapsed, toggleCollapse, items,
  } = props;

  return (
    <Layout className="vh100">
      <Sidebar theme="dark" collapsed={collapsed}>
        <Menu theme="dark" items={items} />
      </Sidebar>
      <Layout>
        <Navbar collapsed={collapsed} toggleCollapse={toggleCollapse} />
        <Content style={{ margin: '0 16px' }}>{children}</Content>
      </Layout>
    </Layout>
  );
}

Dashboard.propTypes = {
  children: childrenPropTypes.isRequired,
  collapsed: PropTypes.bool.isRequired,
  toggleCollapse: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(menuItemPropTypes).isRequired,
};
