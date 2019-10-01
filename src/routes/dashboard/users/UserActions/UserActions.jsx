import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon } from 'antd';
import { icon } from './UserActions.styles';
import { container } from '../../../../components/DataEntry/Email/Email.styles';

const { Item } = Menu;

export default function UserActions(props) {
  const {
    recoverPassword, deleteAccount, role, makeAdmin, makeUser,
  } = props;
  const overlay = (
    <Menu>
      <Item onClick={recoverPassword}>Recuperar Senha</Item>
      {role !== 'admin' && <Item onClick={makeAdmin}>Tornar Admin</Item>}
      {role === 'admin' && <Item onClick={makeUser}>Tornar Usuário</Item>}
      <Item onClick={deleteAccount}>Excluir Conta</Item>
    </Menu>
  );

  return (
    <Dropdown overlay={overlay}>
      <div className={container}>
        <Icon type="more" className={icon} />
      </div>
    </Dropdown>
  );
}

UserActions.propTypes = {
  recoverPassword: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  makeAdmin: PropTypes.func.isRequired,
  makeUser: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};
