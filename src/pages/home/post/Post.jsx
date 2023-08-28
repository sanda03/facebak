import { CommentOutlined, DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import EditPost from './EditPost';
import { UserContext } from '../../../context/useAuth';
import { get, post } from '../../../utils';
import { message } from 'antd';

function Post({ postValue, onSave, onDelete }) {
    const userConnection = useContext(UserContext);
    const [reactions, setReactions] = useState([]);
    const [comments, setComments] = useState([]);

    const isMine = () => {
        return postValue.user.id === userConnection.getId();
    };

    const isLiked = () => {
        return reactions.find(el => el.user.id === userConnection.getId());
    };

    const tryLike = (type) => {
        if (!isLiked()) {
            post(`/posts/${postValue.id}/reactions`, {
                type,
                userId: userConnection.getId(),
                postId: postValue.id
            })
                .then(response => {
                    setReactions([...reactions,{
                        type: type,
                        userId: userConnection.getId(),
                        postId: postValue.id,
                        user: userConnection.user
                    }])
                })
                .catch(error => {
                    console.log(error);
                    message.error("There was something wrong");
                });
        }
    };

    useEffect(() => {
        get(`/posts/${postValue.id}/reactions`)
            .then(response => setReactions(response.data))
            .catch(error => {
                message.error("There was something wrong");
                console.log(error);
            });

        get(`/posts/${postValue.id}/comments`)
            .then(response => setComments(response.data))
            .catch(error => {
                message.error("There was something wrong");
                console.log(error);
            });

    }, [postValue.id]);

    return (
        <div className='rounded-[15px] bg-white md:w-[700px] min-m:w-full p-5 mx-auto my-4 shadow-md'>
            <div className="flex items-start w-full gap-3 justify-between">
                <div className="flex gap-3 pt-1 w-[fit-content]">
                    <img src="/user.jpeg" alt={postValue.user.username} className='w-[50px] rounded-[50%] h-[50px]' />
                    <div className='flex flex-col'>
                        <h2 className="font-bold text-[16px] text-[rgba(0,0,50,.9)]">{postValue.user.username}</h2>
                        <p className='text-[14px] font-bold text-[rgba(0,0,0,.7)]'>{postValue.createdAt.split("T")[0]}</p>
                    </div>
                </div>
                {isMine() && <EditPost onSave={onSave} onDelete={onDelete} postValue={postValue} />}
            </div>
            <hr className='bg-[rgba(0,0,0,.3)] my-2 h-[2px]' />
            <h2 className='my-1 font-bold text-gray-700'>{postValue.title}</h2>
            <p className='text-[15px] text-black-gray'>{postValue.content}</p>
            <div className='flex gap-5 mt-2'>
                <div onClick={() => tryLike('LIKE')} className='flex text-black-gray gap-2 items-center hover:bg-slate-200 rounded-[15px] px-7 py-1 hover:text-red-500 cursor-pointer'>
                    {(isLiked() && isLiked().type === 'LIKE') ? <LikeFilled /> : <LikeOutlined />}
                    <p>{reactions.filter(el => el.type === 'LIKE').length} likes</p>
                </div>
                <div onClick={() => tryLike('DISLIKE')} className='flex text-black-gray gap-2 items-center hover:bg-slate-200 rounded-[15px] px-7 py-1 hover:text-red-500 cursor-pointer'>
                    {(isLiked() && isLiked().type === 'DISLIKE') ? <DislikeFilled /> : <DislikeOutlined />}
                    <p>{reactions.filter(el => el.type === 'DISLIKE').length} dislikes</p>
                </div>
                <div className='flex text-black-gray gap-2 items-center hover:bg-slate-200 rounded-[15px] px-5 py-1 hover:text-red-500 cursor-pointer'>
                    <CommentOutlined />
                    <p>{comments.length} comments</p>
                </div>
            </div>
        </div>
    );
}

export default Post;