import { BarsOutlined, CameraOutlined, DashboardOutlined, DeleteOutlined, FileTextOutlined, HomeOutlined, InfoCircleOutlined, LogoutOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Drawer, Layout, Menu, Modal, Upload, message } from 'antd';
import axios from 'axios';
import { default as React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
const { Header, Content, Footer } = Layout;

const App = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 974);

  const iconStyle = { fontSize: '30px', color: 'black' };
  const menuStyle = { background: 'goldenrod', fontSize: '24px', color: 'black' };
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [imageToUpload, setImageToUpload] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [imageActionsModalVisible, setImageActionsModalVisible] = useState(false);

  const showImageActionsModal = () => {
    setProfileModalVisible(false);
    setImageActionsModalVisible(true);
  };

  const onCloseImageActionsModal = () => {
    setImageActionsModalVisible(false);
  };
  useEffect(() => {
    // Retrieve the stored image URL from local storage when the component mounts
    const storedImageUrl = localStorage.getItem('uploadedImageUrl');
    if (storedImageUrl) {
      setUploadedImageUrl(storedImageUrl);
    }

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleImageUpload = () => {
    if (!imageToUpload) {
      message.error('Please upload an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', imageToUpload);

    axios
      .post('http://localhost:3002/uploadProfileImage', formData)
      .then((result) => {
        const imageUrl = result.data.imageUrl;

        // Store the image URL in local storage
        localStorage.setItem('uploadedImageUrl', imageUrl);

        message.success('Image uploaded successfully');
        console.log(imageUrl);
        setUploadedImageUrl(imageUrl);
        onCloseProfileModal();
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        message.error('Failed to upload image. Please try again.');
      });
  };

  const showProfileModal = () => {
    setProfileModalVisible(true);
  };

  const onCloseProfileModal = () => {
    setProfileModalVisible(false);
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const updateScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 834);
  };

  useEffect(() => {
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

// Extracted component for simplicity
// Extracted component for simplicity
const ImageActionsModal = (
  <Modal
    title="Image Actions"
    visible={imageActionsModalVisible}
    onCancel={onCloseImageActionsModal}
    footer={null}
  >
    <Button
      type="primary"
      icon={<UploadOutlined />}
      onClick={() => {
        onCloseImageActionsModal();
        showProfileModal();
      }}
    >
      Change Picture
    </Button>
    <Button
      type="danger"
      icon={<DeleteOutlined />}
      onClick={() => {
        setImageToUpload(null);
        setUploadedImageUrl(null);
        onCloseImageActionsModal();
      }}
      style={{ marginLeft: '10px' }}
    >
      Delete Picture
    </Button>
    <Button onClick={onCloseImageActionsModal} style={{ marginLeft: '10px' }}>
      Cancel
    </Button>
  </Modal>
);

  const menuItems = (
    <>
      <Menu.Item key="home" icon={<HomeOutlined style={iconStyle} />} style={{ margin:0,alignItems:'center' }}>
        Home
      </Menu.Item>
      <Menu.Item key="about" icon={<InfoCircleOutlined style={iconStyle} />} style={{ margin: 0,alignItems:'center'}}>
        About
      </Menu.Item>
      <Menu.Item key="dashboard" icon={<DashboardOutlined style={iconStyle} />} style={{ margin: 0,alignItems:'center'}}>
        Dashboard
      </Menu.Item>
      <Menu.Item key="receipt" icon={<FileTextOutlined style={iconStyle} />} style={{ margin: 0,alignItems:'center'}}>
        Receipt
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined style={iconStyle} />} style={{ margin: 0,alignItems:'center'}}>
      <Link to='/'>
        Logout
        </Link>
      </Menu.Item>
    </>
  );
  
  const drawerMenuItems = (
    <>
      <Menu theme="dark" mode="vertical" defaultSelectedKeys={['home']} style={{ background: 'goldenrod', fontSize: '24px', color: 'black' }}>
        {React.Children.map(menuItems, (child) => {
          if (child.props.key === 'home') {
            return React.cloneElement(child, { style: { marginLeft: -10 } });
          }
          return child;
        })}
      </Menu>
     
    </>
  );
  return (
    <Layout className="layout">
      <Header className="header" style={{ background: 'goldenrod', color: 'black', display: 'flex', justifyContent: 'space-between', overflowX: 'hidden' }}>
      <div className="toggle-button" onClick={toggleDrawer}>
          <BarsOutlined style={iconStyle} />
        </div>
        {!isSmallScreen ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']} style={{ ...menuStyle, alignItems: 'center' }}>
              {menuItems}
            </Menu>
          </div>
        ) : null}
        {isSmallScreen }
        <Avatar size={60} shape="circle" src="sys1.png" alt="Logo" style={{ marginRight: '-30px' }} />
        
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <h1>Welcome to my App</h1>
          <p>This is your main page content.</p>
          <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
              {/* Button to redirect to page1.js */}
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Link to="/edit1">
                  <Button type="primary">EDIT</Button>
                </Link>
              </div>
            </div>
          </Content>
        </div>
      </Content>
      <Footer className="footer" style={{ textAlign: 'center', backgroundColor: 'goldenrod', color: 'black', position: 'fixed', bottom: 0, width: '100%' }}>
        footer
      </Footer>
      <Drawer
        title=""
        placement="left"
        onClose={toggleDrawer}
        visible={drawerVisible}
        width={450}
        style={{ background: 'goldenrod' }}
      >
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <div className="profile-icon-container">
            <Upload
              showUploadList={false}
              customRequest={({ file, onSuccess, onError }) => {
                setImageToUpload(file);
                onSuccess();
              }}
            >
              <Avatar
                size={100}
                icon={<CameraOutlined style={{ fontSize: '50px', color: 'black' }} />}
                src={uploadedImageUrl || undefined}
                onClick={showProfileModal}
                style={{ cursor: 'pointer' }}
              />
              <Button
                type="text"
                icon={<UploadOutlined style={{ fontSize: '24px', color: 'black' }} />}
                onClick={showImageActionsModal}
                style={{ marginLeft: 'auto', marginRight: '20px' }}
              />
            </Upload>
          </div>
        </div>
        {isSmallScreen && drawerMenuItems}
      </Drawer>
      {ImageActionsModal}
      <div className='Modal'>
        <Modal
          title="Upload Profile Image"
          visible={profileModalVisible}
          onCancel={onCloseProfileModal}
          footer={null}
        >
          <Upload
            customRequest={({ file, onSuccess, onError }) => {
              setImageToUpload(file);
              onSuccess();
            }}
          >
            <Avatar
              size={100}
              icon={<UserOutlined />}
              src={imageToUpload ? URL.createObjectURL(imageToUpload) : undefined}
              style={{ cursor: 'pointer' }}
            />
          </Upload>
          <Button type="primary" onClick={handleImageUpload} style={{ marginTop: '10px' }}>Confirm</Button>
        </Modal>
      </div>
    </Layout>
  );
          }
export default App;
  