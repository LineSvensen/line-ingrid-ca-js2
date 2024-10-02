import { authGuard } from "../../utilities/authGuard";
import { onUpdatePost, getPostData } from "../../ui/post/update.js";

authGuard();

const form = document.getElementById('edit-posts-form');

    if (form) {

        console.log('Form found, adding event listener for submit');

        form.addEventListener('submit', (event) => {
            console.log('Submit event triggered');

            onUpdatePost(event);
        });

        const postId = localStorage.getItem('editPostId');

        if (postId) {
            getPostData(postId);
        } else {
            console.error('No postId found in local storage.');
        }
} else {
    console.error('Form not found.')
}