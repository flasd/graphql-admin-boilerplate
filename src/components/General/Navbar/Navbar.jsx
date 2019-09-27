import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import {
  Layout, Icon, Menu, Dropdown, Avatar,
} from 'antd';
import * as styles from './Navbar.styles';

const { Header } = Layout;
const { Item/* , Divider */ } = Menu;

export default function Navbar(props) {
  const {
    collapsed, toggleCollapse, logout, user,
  } = props;

  const overlay = (
    <Menu>
      {/* <Item>
        <Link to="/editar-conta">Minha Conta</Link>
      </Item>
      <Divider /> */}
      <Item onClick={logout}>
        <Icon
          type="logout"
          onClick={toggleCollapse}
        />
        <span>Sair</span>
      </Item>
    </Menu>
  );

  return (
    <Header className={styles.container}>
      <Icon
        className={styles.trigger}
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={toggleCollapse}
      />
      <div className={styles.user}>
        <Dropdown overlay={overlay} placement="bottomCenter">
          <div>
            <Avatar
              style={{ verticalAlign: 'middle' }}
              icon="user"
              src={user.photo}
            />
            <span className={styles.userName}>{user.name}</span>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
}

Navbar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  toggleCollapse: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string,
  }).isRequired,
};
