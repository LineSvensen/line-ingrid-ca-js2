import { updatePost } from "../../api/post/update.js";
import {readPost} from "../../api/post/read.js";

/**
 * Fetches the data of the post to be edited and populates the form fields.
 * It retrieves the post ID from localStorage and uses it to read the post data.
 * @throws {Error} Throws an error if there is an issue fetching the post data.
 */
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


/**
 * Handles the submission of the post update form.
 * It retrieves form data, constructs an updated post object, and sends it to the server.
 * @param {Event} event - The form submission event.
 * @throws {Error} Throws an error if the postId is not found or if there is an issue updating the post.
 */

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
        alert('An error occurred while updating the post.');
    }
}

