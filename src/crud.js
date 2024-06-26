import { UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Typography, message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Crud = () => {
  const [chitname, setname] = useState('');
  const navigate = useNavigate(); // Change to useNavigate

  const onFinish = (values) => {

    console.log('Form values:', values);
  };
  const handleEdit = () => {
    axios.post('http://localhost:3002/checkChitName', { chitname })
      .then(result => {
        console.log(result.data);
        const { success, message, chitDetails } = result.data;
  
        if (success) {
          console.log(message);
          console.log('Chit Details:', chitDetails);
  
          // Now you can use chitDetails to display the information
          navigate('/editdet', { state: { chitDetails } });
        } else {
          console.error(message);
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          message.error('Invalid ChitName');
        } else {
          console.error(err);
          message.error('Invalid ChitName');
        }
      });
  };
  
  
  return (
    <div className="form-container">
      <Title level={3} style={{ color: 'black', fontWeight: 'bold' }}>
        CHIT GROUP MASTER
      </Title>
      <Form
        name="myForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        className="formcon"
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Chit Name"
              name="ChitName"
              className="subheading"
              rules={[{ required: true, message: 'Chit Name is Required' }]}
            >
              <Input
                placeholder="Chit Name"
                className="inputField2"
                value={chitname}
                prefix={<UserOutlined style={{ color: 'black' }} />}
                onChange={(e) => setname(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            {/* Edit Button */}
            <Button type="primary" onClick={handleEdit}>
              Edit
            </Button>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            {/* Delete Button */}
           <Button type="primary" >
              Delete
            </Button>
            
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Crud;
