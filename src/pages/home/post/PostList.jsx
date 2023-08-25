import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Post from './Post';

function PostList() {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axios.get("/posts")
            .then(response => setPostList(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            {postList.map(el=><Post key={el.id} post={el}/>)}
        </>
    );
}

export default PostList;