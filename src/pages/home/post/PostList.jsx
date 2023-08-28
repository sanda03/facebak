import React, { useEffect, useState } from 'react';
import Post from './Post';
import { HEADERS, get } from '../../../utils';
import { message } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';

function PostList() {
    const [postList, setPostList] = useState([]);

    const onDelete =(id)=>{
        message.error("This fonctionnality is not disponible",3);
    }

    const onUpdate =(post)=>{
        axios.put("/posts",post,{
            headers:{
                ...HEADERS,
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        .then(response=>{
            message.success("Edit success",3);
            setPostList([...postList].map(el=>el.id === post.id ? {
                ...el,
                content: response.data.content,
                title: response.data.title
            } : el));
        })
    }

    useEffect(() => {
        get("/posts")
            .then(response => setPostList(response.data))
            .catch(error => {
                message.error("Une erreur c'est produite");
                console.log(error);
            });
    }, []);

    return (
        <>
            {postList.map(el => <Post key={el.id} post={el} onSave={onUpdate} onDelete={onDelete} />)}
        </>
    );
}

export default PostList;