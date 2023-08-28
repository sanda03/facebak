import { CommentOutlined, HeartOutlined } from '@ant-design/icons';
import React, { useContext } from 'react';
import EditPost from './EditPost';
import { UserContext } from '../../../context/useAuth';

function Post({ post,onSave,onDelete }) {
    const userConnection = useContext(UserContext);

    const isMine = ()=>{
        return post.user.id === userConnection.getId();
    }
    
    return (
        <div className='rounded-[15px] bg-white md:w-[700px] min-m:w-full p-5 mx-auto my-4 shadow-md'>
            <div className="flex items-start w-full gap-3 justify-between">
                <div className="flex gap-3 pt-1 w-[fit-content]">
                    <img src="/user.jpeg" alt={post.user.username} className='w-[50px] rounded-[50%] h-[50px]' />
                    <div className='flex flex-col'>
                        <h2 className="font-bold text-[16px] text-[rgba(0,0,50,.9)]">{post.user.username}</h2>
                        <p className='text-[14px] font-bold text-[rgba(0,0,0,.7)]'>{post.createdAt.split("T")[0]}</p>
                    </div>
                </div>
                {isMine() && <EditPost onSave={onSave} onDelete={onDelete} post={post}/>}
            </div>
            <hr className='bg-[rgba(0,0,0,.3)] my-2 h-[2px]' />
            <h2 className='my-1 font-bold text-gray-700'>{post.title}</h2>
            <p className='text-[15px] text-black-gray'>{post.content}</p>
            <div className='flex gap-5 mt-2'>
                <div className='flex text-black-gray gap-2 items-center hover:bg-slate-200 rounded-[15px] px-7 py-1 hover:text-red-500 cursor-pointer'>
                    <HeartOutlined />
                    {/* <p>{post._count.reactions} liked on this page</p> */}
                </div>
                <div className='flex text-black-gray gap-2 items-center hover:bg-slate-200 rounded-[15px] px-5 py-1 hover:text-red-500 cursor-pointer'>
                    <CommentOutlined />
                    {/* <p>{post._count.comments} comments on this page</p> */}
                </div>
            </div>
        </div>
    );
}

export default Post;