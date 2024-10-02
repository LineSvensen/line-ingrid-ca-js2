import { authGuard } from "../../utilities/authGuard";
import { onCreatePost } from "../../ui/post/create";

authGuard();

const form = document.getElementById('create-form');

if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        try {
            await onCreatePost(event);
            window.location.href = '/profile/';
        } catch (error) {
            console.error('Error creating post:', error);
        }
    });
} else {
    console.error('Form not found.');
}


