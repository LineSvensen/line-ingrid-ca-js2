import { authGuard } from "../../utilities/authGuard";
import { onUpdatePost, getPostData } from "../../ui/post/update.js";
import { deletePost } from "../../api/post/update.js";

authGuard();

const form = document.getElementById('edit-posts-form');

    if (form) {

        form.addEventListener('submit', (event) => {
            onUpdatePost(event);
        });

        const deleteBtn = document.getElementById('delete-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', async () => {
                const postId = localStorage.getItem('editPostId');
                if (!postId) {
                    console.error('No postId found in local storage.');
                    return;
                }

                const confirmDelete = confirm('Are you sure you want to delete this post?');
                if (confirmDelete) {
                    try {
                        const response = await deletePost(postId);
                        if (response.ok) {
                            alert('Post deleted successfully!');
                            window.location.href = '/profile/';
                        } else {
                            alert('Failed to delete the post.');
                        }
                    } catch (error) {
                        console.error('Error deleting post:', error);
                        alert('An error occurred while deleting the post.');
                    }
                }

            })
        }

        const postId = localStorage.getItem('editPostId');

        if (postId) {
            getPostData(postId);
        } else {
            console.error('No postId found in local storage.');
        }
} else {
    console.error('Form not found.')
}