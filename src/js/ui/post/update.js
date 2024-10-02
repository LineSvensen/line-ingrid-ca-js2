import { updatePost } from "../../api/post/update.js";
import {readPost} from "../../api/post/read.js";

export async function getPostData() {
    try {
        const postId = localStorage.getItem('editPostId')
        const data = await readPost(postId);

        if (!data || !data.data) {
            return;
        }

        const post = data.data;

        document.getElementById('title').value = post.title || '';
        document.getElementById('body').value = post.body || '';
        document.getElementById('urlMedia').value = post.media.url || '';
        document.getElementById('altMedia').value = post.media.alt || '';

    } catch (error) {
        console.error('Error fetching post data:', error);
    }
}


export async function onUpdatePost(event) {
    event.preventDefault();

    const postId = localStorage.getItem('editPostId');
    if (!postId) {
        console.error('No postId found in local storage.');
        return;
    }

    try {

        const postTitle = document.getElementById('title').value;
        const postBody = document.getElementById('body').value;
        const postMediaUrl = document.getElementById('urlMedia').value;
        const postMediaAlt = document.getElementById('altMedia').value;

        const updatedPostData = {
            title: postTitle,
            body: postBody,
            media: { url: postMediaUrl, alt: postMediaAlt}
        };

        const response = await updatePost(postId, updatedPostData);

        if (response.ok) {
            alert('Post updated successfully!');
        } else {
            alert('Failed to update the post.');
        }
    } catch (error) {
        console.error('Error updating post:', error);
        alert('An error occurred while updating the post.');
    }
}
