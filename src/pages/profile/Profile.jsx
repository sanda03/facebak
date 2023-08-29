import { Button, Form, Image, Input, message } from 'antd';
import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/useAuth';
import TextArea from 'antd/es/input/TextArea';
import { HEADERS, post } from '../../utils';
import axios from 'axios';
import Cookies from 'js-cookie';

function Profile() {
    const userConnection = useContext(UserContext);

    const handlerSubmit = (values) => {
        axios.put("/users",
            {
                ...values,
                confirmPassword: values.password,
                confid: userConnection.user.id
            },
            {
                headers: {
                    ...HEADERS,
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            })
            .then(response => {
                message.success("Success", 3);
                post('/users/login', {
                    ...response.data,
                    password: values.password,
                })
                    .then(res => {
                        userConnection.login(res.data, Cookies.get('token'));
                    })
                    .catch(err => {
                        console.log(err);
                        message.error("There was something wrong");
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
        <div className='w-[700px] flex overflow-hidden items-start gap-5 justify bg-white mx-auto rounded-[15px] shadow-md my-5'>
            <div className='w-[300px] h-[300px]'>
                <Image src='user.jpeg' />
            </div>
            <div className='font-bold'>
                <h2 className='font-bold my-2 text-[22px]'>Mon profile</h2>
                <Form name='profile' initialValues={userConnection.user} onFinish={handlerSubmit}>
                    <Form.Item name='username' className="mt-0 mb-2" label='Username'>
                        <Input
                            placeholder='username'
                            name='username'
                            required={true}
                        />
                    </Form.Item>
                    <Form.Item name='email' label='Email' className='mt-0 mb-2'>
                        <Input
                            placeholder='email'
                            disabled={true}
                            type='email'
                            name='email'
                            required={true}
                        />
                    </Form.Item>
                    <Form.Item name='bio' label='bio' className='mt-0 mb-2'>
                        <TextArea
                            placeholder='Bio'
                            name='bio'
                            required={false}
                        />
                    </Form.Item>
                    <Form.Item name='password' label='Password' className='mt-0 mb-2'>
                        <Input
                            type='password'
                            placeholder='Password'
                            name='password'
                            required={true}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit' type='primary' className='bg-blue-500'>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Profile;