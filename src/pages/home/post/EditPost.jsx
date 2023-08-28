import { EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../../context/useAuth';

function EditPost({ post, isCreate = false, onDelete, onSave }) {
    const [editStatus, setEditStatus] = useState(false);
    const [infoPost, setPost] = useState(post ? { ...post } : { title: '', content: '' });
    const toggleEditStatus = () => setEditStatus(!editStatus);
    const userConnection = useContext(UserContext);

    const onChange = (event) => {
        const { name, value } = event.target;
        setPost({
            ...infoPost,
            [name]: value
        });
    };

    const onSubmitEdit = () => {
        toggleEditStatus();
        if (isCreate)
            onSave({...infoPost, userId: userConnection.getId()});
        else
            onSave(infoPost);
    };

    const deletePost = () => {
        toggleEditStatus();
        onDelete(infoPost.id);
    };

    return (
        <>
            <button onClick={toggleEditStatus} className='text-black-gray text-[20px] rounded-[15px] hover:bg-slate-200 pt-1 pb-2 px-2'>
                <EditOutlined />
            </button>
            <Modal
                onCancel={toggleEditStatus}
                open={editStatus}
                footer={
                    <div className='w-full flex justify-between'>
                        {!isCreate && <Button onClick={deletePost} type='link' danger size='medium' className='border-red-600'>Delete this post</Button>},
                        <div className='flex md:gap-[5px] min-m:gap-[2px]'>
                            <Button onClick={toggleEditStatus} type='primary' size='medium' className='bg-blue-500'>Cancel</Button>,
                            <Button onClick={onSubmitEdit} type='primary' size='medium' className='bg-blue-500'>Save</Button>
                        </div>
                    </div>
                }
                title={isCreate ? "Create Post " : "Edit Post"}
            >
                <Form onFinish={onSubmitEdit} initialValues={infoPost}>
                    <FormItem name='title' label='Title'>
                        <Input
                            type='text'
                            placeholder='Publication title'
                            onChange={onChange}
                            className='font-bold'
                            name='title'
                            required={true}
                            value={infoPost.title}
                        />
                    </FormItem>
                    <FormItem name='content'>
                        <TextArea
                            type='text'
                            onChange={onChange}
                            name='content'
                            required={true}
                            className='p-3'
                            rows={5}
                            placeholder='Publication Content'
                            value={infoPost.content}
                        />
                    </FormItem>
                </Form>
            </Modal>
        </>
    );
}

export default EditPost;