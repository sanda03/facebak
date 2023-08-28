import { LockOutlined, MailOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/useAuth';
import { post } from '../../utils';

function Signin() {
    const navigate = useNavigate();
    const userConnection = useContext(UserContext);

    const handlerSubmit = (values) => {
        post("users/login",values)
            .then(res => {
                const token = res.data.token;
                delete res.data.token;
                userConnection.login(res.data, token);
                navigate("/");
            })
            .catch(error =>{
                if (error.code === 'ERR_BAD_REQUEST')
                    message.error(error.response.data.message, 3);
                else
                    message.error("There is something wrong", 3);
            });
    };

    return (
        <div className='mx-auto p-5 bg-white rounded-[15px] shadow-lg w-[fit-content] mt-5'>
            <h2 className='font-bold text-[25px] mb-5 text-center'>Signin</h2>
            <Form name='signin' onFinish={handlerSubmit} className='w-[350px]'>
                <Form.Item name={"username"} className='mb-4'>
                    <Input type="usernam" name='username' placeholder='Username' id="username" prefix={<UserAddOutlined className='me-2' />} size='large' />
                </Form.Item>
                <Form.Item name={"email"} className='mb-4'>
                    <Input type="email" name='email' placeholder='email' id='email' prefix={<MailOutlined className='me-2' />} size='large' />
                </Form.Item>
                <Form.Item name={"password"} className='mb-4'>
                    <Input type="password" name='password' placeholder='Password' id="password" prefix={<LockOutlined className='me-2' />} size='large' />
                </Form.Item>
                <Form.Item className='mb-3'>
                    <Button type='primary' htmlType='submit' className='w-full bg-blue-500' size='large'>Signin</Button>
                </Form.Item>
            </Form>
            <p className='p-0 m-0 text-blue-600 text-[15px] hover:underline cursor-pointer'>
                <Link to="/signup">Create account</Link>
            </p>
        </div>
    );
}

export default Signin;