import React, { useEffect, useState } from 'react';
import Post from './Post';
import { HEADERS, get } from '../../../utils';
import { message } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import CreatePost from './CreatePost';
import { v4 as uuid } from 'uuid';

function PostList() {
    const [postList, setPostList] = useState([]);

    const onDelete = (id) => {
        message.error("This fonctionnality is not disponible", 3);
    };

    const onUpdate = (info) => {
        axios.put("/posts", info, {
            headers: {
                ...HEADERS,
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
            .then(response => {
                message.success("Success", 3);
                if(!info.userId){
                    setPostList([...postList].map(el=>el.id === info.id ? response.data : el));
                }
                setPostList([...postList,response.data]);
            })
    };

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
            <CreatePost onAdd={onUpdate} />
            {[...postList].reverse().map(el => <Post key={uuid()} postValue={el} onSave={onUpdate} onDelete={onDelete} />)}
        </>
    );
}

export default PostList;