import React from 'react';
import {
  Table, Button, Popconfirm, Input,
} from 'antd';
import PropTypes from 'prop-types';
import PageHeader from '../../../../components/General/PageHeader';
import Paper from '../../../../components/General/Paper';
// import Modal from '../../../../components/General/Modal';
import CreateTopic from './CreateTopic';
import { getRowKeyFromId } from '../../../../constants/form-helpers';
import Spacer from '../../../../components/General/Spacer';

export function renderRemove(text, record) {
  return (
    <Popconfirm title="Excluir tópico?" onConfirm={record.deleteTopic}>
      <Button type="primary" icon="delete" block disabled={record.deletable} />
    </Popconfirm>
  );
}

const topicsColumnList = [
  {
    title: 'Tópico',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Ações',
    dataIndex: 'actions',
    key: 'actions',
    width: 50,
    render: renderRemove,
  },
];

export const privateBreadCrumbs = [
  { href: '/', label: 'Inicio' },
  { label: 'Notificações' },
  { label: 'Tópicos' },
];

export default function Topics(props) {
  const {
    topics: { loading, refetch },
    dataSource,
    modalVisible,
    closeModal,
    openModal,
    total,
    handleSearch,
  } = props;

  return (
    <div>
      <PageHeader
        title="Tópicos de Notificação"
        breadcrumbs={privateBreadCrumbs}
        action={{ type: 'primary', label: 'Criar Tópico', fn: openModal }}
      />
      <Paper>
        <Input.Search
          onSearch={handleSearch}
          onChange={handleSearch}
          enterButton
          placeholder="Busque por nome"
        >
        </Input.Search>
        <Spacer space={16} />
        <Table
          columns={topicsColumnList}
          dataSource={dataSource}
          loading={loading}
          rowKey={getRowKeyFromId}
          pagination={false}
          size="middle"
        />
        <Spacer space={16} />
        <strong>
          {`${total} tópicos encontrados.`}
        </strong>
        <br />
        {'Use a busca para encontrar tópicos específicos.'}
      </Paper>

      <CreateTopic
        visible={modalVisible}
        afterClose={closeModal}
        onCancel={closeModal}
        refetch={refetch}
        closeModal={closeModal}
      />
    </div>
  );
}

export const topicPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  deleteable: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
  deleteTopic: PropTypes.func.isRequired,
});

Topics.propTypes = {
  topics: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    refetch: PropTypes.func.isRequired,
  }).isRequired,
  dataSource: PropTypes.arrayOf(topicPropTypes).isRequired,
  modalVisible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
};
