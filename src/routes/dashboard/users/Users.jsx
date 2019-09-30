import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, Avatar, Badge, Tooltip,
} from 'antd';
import get from 'lodash.get';
import PageHeader from '../../../components/General/PageHeader';
import Paper from '../../../components/General/Paper/Paper';
import UserActions from './UserActions';

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
  return <UserActions id={record.id} email={record.email} />;
}

export function getRowKey(record) {
  return record.id;
}

export const userListColumns = [
  {
    title: 'Foto',
    dataIndex: 'photo',
    key: 'photo',
    render: renderPhoto,
    filterMultiple: false,
    filters: [
      { text: 'Tem foto', value: true },
      { text: 'Não tem foto', value: false },
    ],
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
  } = props;

  const users = get(props, ['data', 'listUsers', 'docs'], []);
  const totalUsers = get(props, ['data', 'listUsers', 'total'], 1);

  return (
    <div>
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
          rowKey={getRowKey}
          pagination={{ total: totalUsers, pageSize: 25, className: 'radara' }}
        />
      </Paper>
    </div>
  );
}

Users.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
  }).isRequired,
};
