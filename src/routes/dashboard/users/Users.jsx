import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, Avatar, Badge, Tooltip,
} from 'antd';
import PageHeader from '../../../components/General/PageHeader';
import Paper from '../../../components/General/Paper/Paper';
import UserActions from './UserActions';
import { userPropTypes } from '../../../constants/prop-types';
import { getRowKeyFromId } from '../../../constants/form-helpers';

export function renderPhoto(text) {
  return <Avatar icon="user" src={text} />;
}

export function renderEmail(text, record) {
  return (
    <span>
      {!record.emailVerified && (
        <Tooltip title="Não Verificado">
          <Badge status="warning" />
        </Tooltip>
      )}
      <a href={`mailto:${text}`}>{`${text}  `}</a>
    </span>
  );
}

export function renderActions(text, record) {
  return (
    <UserActions
      id={record.id}
      email={record.email}
      role={record.role}
      refetch={record.refetch}
    />
  );
}

export const userListColumns = [
  {
    title: 'Foto',
    dataIndex: 'photo',
    key: 'photo',
    render: renderPhoto,
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    key: 'email',
    render: renderEmail,
    filterMultiple: false,
    filters: [
      { text: 'Verificado', value: true },
      { text: 'Não verificado', value: false },
    ],
  },
  {
    title: 'Função',
    dataIndex: 'role',
    key: 'role',
    filterMultiple: false,
    filters: [
      { text: 'Administrador', value: 'admin' },
      { text: 'Usuário', value: 'user' },
    ],
  },
  {
    title: 'Origem',
    dataIndex: 'source',
    key: 'source',
    filterMultiple: false,
    filters: [
      { text: 'E-mail', value: 'self' },
      { text: 'Google', value: 'google' },
      { text: 'Facebook', value: 'facebook' },
      { text: 'Twitter', value: 'twitter' },
    ],
  },
  {
    title: '',
    dataIndex: 'email',
    key: 'actions',
    render: renderActions,
  },
];

export default function Users(props) {
  const {
    handleUpdate,
    data: { loading },
    users,
    totalUsers,
  } = props;

  return (
    <>
      <PageHeader
        title="Usuários"
        breadcrumbs={[{ href: '/', label: 'Inicio' }, { label: 'Usuários' }]}
      />
      <Paper>
        <Table
          columns={userListColumns}
          dataSource={users}
          onChange={handleUpdate}
          loading={loading}
          rowKey={getRowKeyFromId}
          pagination={{ total: totalUsers, pageSize: 25 }}
        />
      </Paper>
    </>
  );
}

Users.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  users: PropTypes.arrayOf(userPropTypes).isRequired,
  totalUsers: PropTypes.number.isRequired,
};
