import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, Layout, message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import './App.css';
import Picture1 from "./images/tiara.jpg";
const { Content } = Layout;
const App = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [repassword, setPassword] = useState('');
  const [isUsernameFilled, setIsUsernameFilled] = useState(false);
  const [isPasswordFilled, setIsPasswordFilled] = useState(false);
  const [usernameAlert, setUsernameAlert] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    setIsUsernameFilled(!!value.trim()); // Set to true if not empty
    setUsernameAlert(''); // Clear username alert when user types
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setIsPasswordFilled(!!value.trim()); // Set to true if not empty
    setPasswordAlert(''); // Clear password alert when user types
  };
  const handleLogin = () => {
    const staticUsername = 'sa';
    const staticPassword = 'admin';
  
    // Reset alert messages
    setUsernameAlert('');
    setPasswordAlert('');
  
    // Check if the username is required
    if (!isUsernameFilled) {
      setUsernameAlert('Username is required');
    } 
   else if (!isPasswordFilled) {
      setPasswordAlert('Password is required');
    } 
    else{
      if (repassword !== staticPassword || username !== staticUsername) {
        message.error({
          content: 'Invalid UserName/Password',
          style: {
            fontSize: '20px', // Set the desired font size
            color: 'red',  
            fontWeight:'bold',   // Set the desired font color
          },
        });
      }
    }
  
    // Check if both username and password are filled and correct
    if (isUsernameFilled && isPasswordFilled) {
      axios.post('http://localhost:3002/employee', { username, repassword })
        .then(result => {
          console.log(result.data);
          const { success, message } = result.data;

        if (success) {
          console.log(message); 
           window.location.href="/mainpage"
        } else {
          console.error(message);
        }
        })
        .catch(err => {
          if (err.response && err.response.status === 401) {
            message.error('Invalid username or password');
          } else {
            console.error(err);
            message.error('Invalid username or password');
          }
        });
    }
  };
  

  const loginStatusStyle = {
    color: 'red',
    fontWeight: 'bold',
    marginTop:'2px',
    fontSize: '16px',
  };
  
  return (
    <div className="App">
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <div className="left-half">
        <img src={Picture1} alt="" />
      </div>
      <div className="right-half" id="righthalf">
      <Avatar
    size={64} // Adjust the size as needed
    shape="circle" // Set the shape to circle
    src="sys1.png"
    alt="Logo"
    style={{ position: 'absolute', top: 10, right: 10 ,width:90 ,height :90}} // Positioning at top-right corner
  />
        <Content>
          <h1 className="mainheading">LOG IN</h1>
        </Content>
        <div className="logo-container">
 
</div>

        <Content className='inplayout'>
          <form>
            <Input
              placeholder="Username"
              className='inpdiv'
              prefix={<Avatar icon={<UserOutlined />} style={{ backgroundColor: 'darkblue' }} />}
              value={username}
              onChange={handleUsernameChange}
              style={{fontWeight: 'bold'}}
            />
            {usernameAlert && <div className="alert" style={loginStatusStyle}>{usernameAlert}</div>}
            <div>
              <Input.Password
                placeholder="Password"
                className='inpdiv1'
                prefix={<Avatar icon={<LockOutlined />} style={{ backgroundColor: 'darkblue' }}/>}
                iconRender={(visible) =>
                  visible ? <EyeOutlined onClick={togglePasswordVisibility} /> : <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
                }
                value={repassword}
                style={{fontWeight: 'bold' }}
                onChange={handlePasswordChange}
                required=""
              />
            </div>
            {passwordAlert && <div className="alert" style={loginStatusStyle}>{passwordAlert}</div>}
            <div>
              <Button type="button" className='login-button' onClick={handleLogin}>Login</Button>
            </div>
          </form>
        </Content>
      </div>
    </div>
  );
}

export default App;