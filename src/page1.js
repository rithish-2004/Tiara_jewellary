import { CalendarOutlined, DollarCircleOutlined, FieldNumberOutlined, PercentageOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Col, DatePicker, Form, Input, Row, Typography } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import './Page1.css';
const { Title } = Typography;

const Page1 = () => {
  const [setChits] = useState([]);

  const onFinish = async () => {
    try {
      // Make a POST request to store the form data in the database
      const response = await axios.post('http://localhost:3002/chits', {
        startingdate,
        chitname,
        groupname,
        duetype,
        duedays,
        totaldues,
        dueamount,
        incentivecutdays,
        incentivepercent,
        incentiveamount,
        recieptac,
        latefeeac,
      });
      console.log('Server response:', response.data);
      // Update the local state with the newly added chit
      setChits((prevChits) => [...prevChits, response.data]);
      console.log('Chit data stored in the database');
    } catch (error) {
      console.error('Error storing chit data:', error);
    }
};

  
  const [startingdate,setdate]=useState('');
  const[chitname,setname]=useState('');
  const[groupname,setgroupname]=useState('');
  const[duetype,setduetype]=useState('');
  const[duedays,setduedays]=useState('');
  const[totaldues,settotaldues]=useState('');
  const[dueamount,setdueamount]=useState('');
  const[incentivecutdays,setincentivecutdays]=useState('');
  const[incentivepercent,setincentivepercent]=useState('');
  const[incentiveamount,setincentiveamount]=useState('');
  const[recieptac,setrecieptac]=useState('');
  const[latefeeac,setlatefeeac]=useState('');
  
  return (
    <div className="form-container">
    <Title level={3} style={{color:'black',fontWeight:'bold'}}>CHIT GROUP MASTER</Title>
  <Form
    name="myForm"
    initialValues={{ remember: true }}
    onFinish={onFinish}
    layout="vertical"
    className="formcon"
  >
    <Row gutter={[16, 16]}>
    <Col xs={24} sm={24} md={12} lg={12}>
  <Form.Item label="Starting Date" name="startingDate"  rules={[{ required: true, message: 'Starting date is Required' }]}>
    <DatePicker className="inputField" value={startingdate} placeholder="Select Starting Date"  style={{ width: '100%' }} onChange={(date) => setdate(date)}/>
  </Form.Item>
</Col>
      <Col xs={24} sm={24} md={12} lg={12}>
      <Form.Item label="Chit Name" name="ChitName"  className="subheading" rules={[{ required: true, message: 'Chit Name is Required' }]}>
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
      <Form.Item label="Group Name" name="GroupName" className="subheading" rules={[{ required: true, message: 'Group Name is Required' }]}>
          <Input
            placeholder="Group Name"
            className="inputField"
            value={groupname}
            prefix={<TeamOutlined style={{  color: 'black' }} />}
            onChange={(e) => setgroupname(e.target.value)}
          />
        </Form.Item>

      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
      <Form.Item label="Due Type" name="DueType" className="subheading" rules={[{ required: false }]}>
          <Input
            placeholder="Due Type"
            className="inputField4"
            value={duetype}
            prefix={<FieldNumberOutlined style={{  color: 'black'  }} />}
            onChange={(e) => setduetype(e.target.value)}
          />
        </Form.Item>

      </Col>
    </Row>

    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={12} lg={12}>
      <Form.Item label="Due Days" name="DueDays" className="subheading" rules={[{ required: false }]} style={{ marginRight: '8px' }}>
          <Input
            placeholder="Due Days"
            className="inputField5"
            type="number"
            value={duedays}
            prefix={<CalendarOutlined style={{ color: 'black' }} />}
            onChange={(e) => setduedays(e.target.value)}
          />
        </Form.Item>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
      <Form.Item label="Total Dues" name="TotalDues" className="subheading1" rules={[{ required: false }]}>
          <Input
            placeholder="Total Dues"
            className="inputField6"
            value={totaldues}
            type="number"
            prefix={<DollarCircleOutlined style={{ color: 'black' }} />}
            onChange={(e) => settotaldues(e.target.value)}
          />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={12} lg={12}>
     

      <Form.Item
  label="Due Amount"
  name="DueAmount"
  className="subheading"
  rules={[{ required: true, message: 'Due Amount is Required' }]}
  style={{ marginRight: '8px' }}
>
  <Input
    placeholder="Due Amount"
    className="inputField7"
    value={dueamount}
    onChange={(e) => setdueamount(e.target.value)}
    style={{ width: '100%' }}
    type="number"
    step={0.01}
  />
</Form.Item>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
      <Form.Item label="Incentive Cut Days" className="subheading2" name="IncentiveCutDays" rules={[{ required: false }]}>
          <Input
            placeholder="Incentive Cut Days"
            className="inputField8"
            type="number"
            value={incentivecutdays}
            onChange={(e) => setincentivecutdays(e.target.value)}
            prefix={<CalendarOutlined style={{ color: 'black' }} />}
          />
        </Form.Item>

      </Col>
    </Row>

    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={12} lg={12}>
        <Form.Item label="Incentive %" className="subheading" name="IncentivePercentage" rules={[{ required: false }]} style={{ marginRight: '8px' }}>
          <Input
            placeholder="Incentive%"
            className="inputField9"
            value={incentivepercent}
            onChange={(e) => setincentivepercent(e.target.value)}
            type="number" // Enable arrow keys for incrementing and decrementing
            prefix={<PercentageOutlined style={{ color: 'black' }} />}
            step={0.01}
          />
        </Form.Item>

      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <Form.Item label="Incentive Amt" className="subheading" name="IncentiveAmt" rules={[{ required: false }]} style={{ marginRight: '8px' }}>
          <Input
            placeholder="Incentive Amt"
            className="inputField9"
            type="number"
            value={incentiveamount} // Enable arrow keys for incrementing and decrementing
            onChange={(e) => setincentiveamount(e.target.value)}
            prefix={<PercentageOutlined style={{ color: 'black' }} />}
            step={0.01}
          />
        </Form.Item>

      </Col>
    </Row>

    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={12} lg={12}>
      <Form.Item label="Receipt A/C" name="ReceiptAC" className="subheading" rules={[{ required: true, message: 'Receipt A/C is required' }]}>
          <Input
            placeholder="Receipt A/C"
            className="inputField11"
            value={recieptac}
            prefix={<DollarCircleOutlined style={{  color: 'black'  }} />}
            onChange={(e) => setrecieptac(e.target.value)}
          />
        </Form.Item>

      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
      <Form.Item label="Late Fee A/C" name="LateFeeAC" className="subheading" rules={[{ required: true, message: 'Late Fee A/C is Required' }]}>
          <Input
            placeholder="Late Fee A/C"
            className="inputField12"
            value={latefeeac}
            onChange={(e) => setlatefeeac(e.target.value)}
            prefix={<DollarCircleOutlined style={{  color: 'black'  }} />}
          />
        </Form.Item>

      </Col>
    </Row>
   
    <Form.Item>
          <button type="submit" className='subbtn' style={{ width: '20%' }}>Submit</button>
        </Form.Item>
  </Form>
 
</div>
  );
};

export default Page1;
