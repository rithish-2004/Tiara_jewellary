import './styles.css';

// Inside your component
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Button, Modal, Table, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Edit1 = () => {
  const [chits, setChits] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch('/api/chits1');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Invalid content type. Expected JSON, but received: ${contentType}`);
      }

      const data = await response.json();
      setChits(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const showSuccessMessage = (action) => {
    message.success(`${action} successful`);
  };

  useEffect(() => {
    fetchData(); // Call the fetchData function to fetch data when the component mounts
  }, []);

  const handleEditClick = (customerid) => {
    window.location.href=`customerdetailsview/${customerid}`;
    showSuccessMessage('Edit');
  };

  const handleViewClick = (id) => {
    window.location.href=`customersee/${id}`;
  };
  const [deleteCustomerId, setDeleteCustomerId] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const showDeleteModal = (customerId) => {
    setDeleteCustomerId(customerId);
    setIsDeleteModalVisible(true);
  };

  const handleOk = async () => {
    setIsDeleteModalVisible(false);
    await handleDeleteClick(deleteCustomerId);
  };

  const handleCancel = () => {
    setIsDeleteModalVisible(false);
  };

  const handleDeleteClick = async(id) => {
    console.log(`Delete clicked for record with id: ${id}`);
    try {
      const result = await axios.post('http://localhost:3002/deletecustomer', { id: id});
      const { success, message } = result.data;
      if (success) {
        console.log('Customer deleted successfully:', id);
        fetchData();
      } else {
        console.error('Failed to delete customer:', message);
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
showSuccessMessage('Delete');
  };
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Chit Name',
        dataIndex: 'ChitName',
        key: 'ChitName',
      },
      {
        title: 'Group Name',
        dataIndex: 'GroupName',
        key: 'GroupName',
      },
      {
        title: 'Due Type',
        dataIndex: 'DueType',
        key: 'DueType',
      },

    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => (
        <span className="actions">
          <>
            <Button type="primary" onClick={() => handleEditClick(record._id)} icon={<EditOutlined />} style={{ marginRight: 8 }}>
              Edit
            </Button>
            <Button onClick={() => handleViewClick(record._id)} icon={<EyeOutlined />} style={{ marginRight: 8 }}>
              View
            </Button>
            <Button danger onClick={() => showDeleteModal(record._id)} icon={<DeleteOutlined />}>
              Delete
            </Button>
          </>
        </span>
      ),
    },
  ];

  return (
    <div className="container">
      <h2 className="heading">Chit Master</h2>
      <Link to="/Page1">
        <Button type="primary" style={{ marginBottom: 16, float: 'right' }}>
          CREATE
        </Button>
      </Link>
      <Table dataSource={chits} columns={columns} bordered />
      <Modal
          title="Confirm Delete"
          visible={isDeleteModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Are you sure you want to delete this customer?</p>
        </Modal>
    </div>
  );
};

export default Edit1;