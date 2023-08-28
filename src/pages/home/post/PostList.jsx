import React, { useEffect, useState } from 'react';
import Post from './Post';
import { get } from '../../../utils';
import { message } from 'antd';

function PostList() {
    const [postList, setPostList] = useState([]);

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
            {postList.map(el => <Post key={el.id} post={el} />)}
        </>
    );
}

export default PostList;