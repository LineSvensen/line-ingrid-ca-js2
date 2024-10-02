
import { createPost } from "../../api/post/create.js";


// Function to handle post creation
export async function onCreatePost(event) {
    event.preventDefault();

    // Gather the form input values
    const titleInput = event.target.title;
    const bodyInput = event.target.body;
    const mediaInput = event.target.media;
    const altInput = event.target.alt;
    const tagInput = event.target.tag;

    // Check if inputs exist
    if (!titleInput || !mediaInput || !tagInput) {
        alert("Please fill in all required fields.");
        return;
    }

    const title = titleInput.value;   // Required
    const body = bodyInput ? bodyInput.value : ""; // Optional
    const media = {
        url: mediaInput.value,        // Media URL from the form
        alt: altInput ? altInput.value : "",    // Optional alt text from the form
    };
    const tags = [tagInput.value];     // Assuming a tag input in your form

    try {
        // Call createPost with the gathered details
        const { data, ok } = await createPost({ title, body, media, tags });

        if (ok) {
            alert("Post created successfully!");
        } else {
            alert("Registration failed. " + (data.errors[0].message || "Check your input and try again."));
        }
    } catch (error) {
        alert("Error occurred while creating the post. Please try again.");
        console.error(error);
    }
}

// Add event listener to form submission
// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('create-form');
//     if (form) {
//         form.addEventListener('submit', onCreatePost);
//     }
// });