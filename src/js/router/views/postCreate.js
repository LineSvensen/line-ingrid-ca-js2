import { authGuard } from "../../utilities/authGuard";
import { onCreatePost } from "../../ui/post/create";

/**
 * Function to initialize post creation
 */
authGuard();

const form = document.getElementById('create-form');


/**
 * Attaches the submit event listener to the form
 * @param {Event} event - The event triggered by the form submission.
 */

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


