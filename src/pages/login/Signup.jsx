import {
    LockOutlined,
    MailOutlined,
    UserAddOutlined
} from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { post } from '../../utils';
import { UserContext } from '../../context/useAuth';
import { useNavigate } from 'react-router-dom';

function Singup() {
    const userConnection = useContext(UserContext);
    const navigate = useNavigate();

    const handlerSubmit = (values) => {
        post("users", values)
            .then(response => {
                post("/users/login",values)
                    .then(res => {
                        const token = res.data.token;
                        delete res.data.token;
                        userConnection.login(res.data,token)
                        navigate("/");
                    });
            })
            .catch(error => {
                if (error.code === 'ERR_BAD_REQUEST')
                    message.error(error.response.data.message, 3);
                else
                    message.error("There is something wrong", 3);
            });
    };

    return (
        <div className='mx-auto p-5 bg-white rounded-[15px] shadow-lg w-[fit-content] mt-5'>
            <h2 className='font-bold text-[25px] mb-5 text-center'>Signup</h2>
            <Form name='tets' onFinish={handlerSubmit} className='w-[350px]'>
                <Form.Item name="username" className='mb-4'>
                    <Input
                        required={true}
                        name="username"
                        placeholder='Username'
                        type='text'
                        id='username'
                        prefix={<UserAddOutlined className='me-2' />}
                        size='large'
                    />
                </Form.Item>
                <Form.Item name={"email"} className='mb-4'>
                    <Input
                        required={true}
                        type="email"
                        name="email"
                        placeholder='email'
                        id='email'
                        prefix={<MailOutlined className='me-2' />}
                        size='large'
                    />
                </Form.Item>
                <Form.Item name={"password"} className='mb-4'>
                    <Input
                        required={true}
                        type="password"
                        name='password'
                        placeholder='Password'
                        id="password"
                        prefix={<LockOutlined className='me-2' />}
                        size='large'
                    />
                </Form.Item>
                <Form.Item name={"confirmPassword"} className='mb-4'>
                    <Input
                        required={true}
                        type="password"
                        name='confirmPassword'
                        placeholder='Confirm Password'
                        id="confirmPassword" prefix={<LockOutlined className='me-2' />}
                        size='large'
                    />
                </Form.Item>
                <Form.Item className='mb-3'>
                    <Button type='primary' htmlType='submit' className='w-full bg-blue-500' size='large'>Signup</Button>
                </Form.Item>
            </Form>
            <p className='p-0 m-0 text-blue-600 text-[15px] hover:underline cursor-pointer'>
                <Link to="/signin">I have already account</Link>
            </p>
        </div>
    );

}

export default Singup;