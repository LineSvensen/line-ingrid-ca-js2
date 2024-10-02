import { createPost } from "../../api/post/create.js";


/**
 * Function to handle post creation
 * @param {Event} event - The event triggered by the form submission.
 */

export async function onCreatePost(event) {
    event.preventDefault();

    const titleInput = event.target.title;
    const bodyInput = event.target.body;
    const mediaInput = event.target.media;
    const altInput = event.target.alt;
    const tagInput = event.target.tag;

    if (!titleInput || !mediaInput || !tagInput) {
        alert("Please fill in all required fields.");
        return;
    }

    const title = titleInput.value;
    const body = bodyInput ? bodyInput.value : "";
    const media = {
        url: mediaInput.value,
        alt: altInput ? altInput.value : "",
    };
    const tags = [tagInput.value];

    try {
        const { data, ok } = await createPost({ title, body, media, tags });

        if (ok) {
            alert("Post created successfully!");
        } else {
            alert("Registration failed. " + (data.errors[0].message || "Check your input and try again."));
        }
    } catch (error) {
        alert("Error occurred while creating the post. Please try again.");
    }
}
