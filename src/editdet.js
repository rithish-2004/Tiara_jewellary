import {
  CalendarOutlined,
  DollarCircleOutlined,
  FieldNumberOutlined,
  PercentageOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Page1.css';

const { Title } = Typography;

const Editdet = () => {
  const { id } = useParams();
  const [chitDetails, setChitDetails] = useState(null);
  const [form] = Form.useForm();
  const [successMessage] = useState(false);
  const [ansObject, setAnsObject] = useState(null);
  let ans;
  const fetchChitDetails = async () => {
    try {
      const custid = id;
      const response = await axios.get(`http://localhost:3002/chitDetails/${custid}`);
      ans=response.data.chitDetails;
      console.log(ans);

      if (ans) {
        setChitDetails(ans);
        const formattedResult = {
          ...ans,
        };
        form.setFieldsValue(formattedResult);
        setAnsObject(ans);
      }

      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }

      console.log('Chit details:', ans);
    } catch (error) {
      console.error('Error fetching chit details:', error);
    }
  };

  useEffect(() => {
   
    fetchChitDetails();
  }, [form, id]);

  const handlechanges = async () => {
    try {
      if (ansObject && ansObject._id) {
        const customerid = ansObject._id;
        console.log(customerid)
        const values = await form.validateFields();
      values._id = customerid;

      const saveResult = await axios.post('http://localhost:3002/savecustomerdetails', values);

      const { success, message } = saveResult.data;
      if (success) {
        console.log('Changes saved successfully:', values);
        window.location.href="/edit1";
        fetchChitDetails();
      } else {
        console.error('Failed to save changes:', message);
      }
      }
    } catch (error) {
      console.error('Error handling changes:', error);
    }

  };
  
  return (
    <div className="form-container">
      <Title level={3} style={{ color: 'black', fontWeight: 'bold' }}>
        CHIT GROUP MASTER
      </Title>
      <Form name="myForm" initialValues={{ remember: true }} layout="vertical" className="formcon" form={form}>
        {chitDetails ? (
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item label="Starting Date" name="startingDate">
                <Input prefix={<CalendarOutlined />} type="text" />
              </Form.Item>

              <Form.Item label="Group Name" name="GroupName" required>
                <Input prefix={<TeamOutlined />} type="text" />
              </Form.Item>

              <Form.Item label="Due Type" name="DueType">
                <Input prefix={<DollarCircleOutlined />} type="text" />
              </Form.Item>

              <Form.Item label="Total Dues" name="TotalDues">
                <Input prefix={<DollarCircleOutlined />} type="text" />
              </Form.Item>

              <Form.Item label="Incentive Percentage" name="IncentivePercentage">
                <Input prefix={<PercentageOutlined />} type="text" />
              </Form.Item>

              <Form.Item label="Receipt AC" name="ReceiptAC">
                <Input prefix={<UserOutlined />} type="text" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item label="Chit Name" name="ChitName" required>
                <Input prefix={<FieldNumberOutlined />} type="text"  />
              </Form.Item>

              <Form.Item label="Due Days" name="DueDays">
                <Input prefix={<CalendarOutlined />} type="text" />
              </Form.Item>

              <Form.Item label="Due Amount" name="DueAmount" required>
                <Input prefix={<DollarCircleOutlined />} type="text" />
              </Form.Item>

              <Form.Item label="Incentive Cut Days" name="IncentiveCutDays">
                <Input prefix={<CalendarOutlined />} type="text" />
              </Form.Item>

              <Form.Item label="Incentive Amount" name="IncentiveAmt">
                <Input prefix={<DollarCircleOutlined />} type="text" />
              </Form.Item>

              <Form.Item label="Late Fee AC" name="LateFeeAC">
                <Input prefix={<UserOutlined />} type="text" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Button type="primary" onClick={handlechanges}>Save Changes</Button>
              {successMessage && <div className="success-message"></div>}
            </Col>
          </Row>
        ) : (
          <p>No Chit Details found</p>
        )}
      </Form>
    </div>
  );
};

export default Editdet;
