import React from 'react';
import EditPost from './EditPost';

function CreatePost({ onAdd }) {

    return (
        <div className='rounded-[15px] my-5 flex items-center justify-between p-4 mx-auto bg-white min-m:w-full md:w-[700px] shadow-md'>
            <h2 className=' font-bold text-black-gray text-center'>Create Post</h2>
            <EditPost isCreate={true} onSave={onAdd} onDelete={() => { }} />
        </div>
    );
}

export default CreatePost;