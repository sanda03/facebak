import { LockOutlined, MailOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Singup() {
    const navigate = useNavigate();

    const handlerSubmit = (values) => {
        console.log(values);
        navigate("/");
    };

    return (
        <div className='mx-auto p-5 bg-white rounded-[15px] shadow-lg w-[fit-content] mt-5'>
            <h2 className='font-bold text-[25px] mb-5 text-center'>Singup</h2>
            <Form onFinish={handlerSubmit} className='w-[350px]'>
                <FormItem name={"username"} className='mb-4'>
                    <Input placeholder='Username' id='username' prefix={<UserAddOutlined className='me-2'/>} size='large' />
                </FormItem>
                <FormItem name={"email"} className='mb-4'>
                    <Input type="email" placeholder='email' id='email' prefix={<MailOutlined className='me-2'/>} size='large' />
                </FormItem>
                <FormItem name={"password"} className='mb-4'>
                    <Input type="password" placeholder='Password'id="password" prefix={<LockOutlined className='me-2'/>} size='large' />
                </FormItem>
                <FormItem name={"confirmPassword"} className='mb-4'>
                    <Input type="password" placeholder='Confirm Password' id="confirmPassword" prefix={<LockOutlined className='me-2'/>} size='large' />
                </FormItem>
                <FormItem className='mb-3'>
                    <Button type='primary' onClick={handlerSubmit} className='w-full bg-blue-500' size='large'>Signup</Button>
                </FormItem>
            </Form>
            <p className='p-0 m-0 text-blue-600 text-[15px] hover:underline cursor-pointer'>
                <Link to="/signin">I have already account</Link>
            </p>
        </div>
    );

}

export default Singup;