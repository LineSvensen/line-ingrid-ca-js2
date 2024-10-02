import { authGuard } from "../../utilities/authGuard";
import { onUpdatePost, getPostData } from "../../ui/post/update.js";
import { onDeletePost } from "../../ui/post/delete.js";

authGuard();

/**
 * Event listener for form submission.
 *
 * @param {Event} event - The event object triggered by form submission.
 */

/**
 * Fetches post data if postId is found in local storage.
 * @param {string|null} postId - The ID of the post to be edited, retrieved from local storage.
 */

const form = document.getElementById('edit-posts-form');
const deleteBtn = document.getElementById('delete-btn');

if (form) {
    form.addEventListener('submit', async (event) => {
         event.preventDefault();

        try {
            await onUpdatePost(event);
            window.location.href = '/profile/';
        } catch (error) {
            console.error('Error updating post:', error);
        }
    });

    const postId = localStorage.getItem('editPostId');
    if (postId) {
        getPostData(postId);
    } else {
        console.error('No postId found in local storage.');
    }
} else {
    console.error('Form not found.');
}

if (deleteBtn) {
    deleteBtn.addEventListener('click', async () => {
        try {
            await onDeletePost();
            window.location.href = '/profile/';
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    });
} else {
    console.error('Delete button not found.');
}
