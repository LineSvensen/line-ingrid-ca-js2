import { authGuard } from "../../utilities/authGuard";
import { onUpdatePost, getPostData } from "../../ui/post/update.js";
import { onDeletePost } from "../../ui/post/delete.js";

authGuard();

const form = document.getElementById('edit-posts-form');
const deleteBtn = document.getElementById('delete-btn');

if (form) {
    form.addEventListener('submit', async (event) => {
        await onUpdatePost(event);
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
    deleteBtn.addEventListener('click', onDeletePost);  // Attach onDeletePost directly
} else {
    console.error('Delete button not found.');
}
