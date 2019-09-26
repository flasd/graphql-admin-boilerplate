import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon, Popconfirm } from 'antd';
import * as styles from './Navbar.styles';

const { Header } = Layout;

export default function Navbar(props) {
  const { collapsed, toggleCollapse, logout } = props;

  return (
    <Header className={styles.container}>
      <Icon
        className={styles.trigger}
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={toggleCollapse}
      />
      <Popconfirm
        onConfirm={logout}
        title="Deseja mesmo sair?"
        placement="leftTop"
        icon={null}
        arrowPointAtCenter
        overlayClassName={styles.logoutTooltip}
      >
        <Icon className={styles.logoutTrigger} type="logout" />
      </Popconfirm>
    </Header>
  );
}

Navbar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  toggleCollapse: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};
