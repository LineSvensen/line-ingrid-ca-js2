import {deletePost} from "../../api/post/delete.js";

export async function onDeletePost(event) {
    event.preventDefault();

    const postId = localStorage.getItem('editPostId');
    if (!postId) {
        console.error('No postId found in local storage.');
        return;
    }

    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
        try {
            const response = await deletePost(postId);  // Call deletePost function directly
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
}