import {API_SOCIAL_POSTS, API_KEY} from "../constants.js";
/**
 * Updates a social media post with the specified details.
 *
 * @param {string} id - The ID of the post to be updated.
 * @param {Object} postDetails - An object containing the post details.
 * @param {string} postDetails.title - The new title for the post.
 * @param {string} postDetails.body - The new body/content for the post.
 * @param {Object} postDetails.media - An object containing media information.
 * @param {string} postDetails.media.url - The URL of the media to be associated with the post.
 * @param {string} postDetails.media.alt - The alt text for the media.
 * @returns {Promise<{data: Object, ok: boolean}>} - A promise that resolves to an object containing the updated post data and a boolean indicating if the request was successful.
 * @throws {Error} - Throws an error if the editPostId is not found or if the fetch request fails.
 */
export async function updatePost(id, {title, body, media}) {
    const editPostId = localStorage.getItem('editPostId');
    const accessToken = localStorage.getItem('accessToken');

    if (!editPostId) {
        throw new Error("Could not find editPostId");
    }

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'X-Noroff-API-Key': API_KEY,
        },
        body: JSON.stringify({title, body, media})
    };

        const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.errors ? data.errors[0].message : "An error occurred while updating the post");
        }
    return { data, ok: response.ok };
}
