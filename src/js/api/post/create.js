import { API_SOCIAL_POSTS, API_KEY } from "../constants.js";

/**
 * Function to create a post via the API
 * @param {Object} postDetails - The details of the post to create.
 * @param {string} postDetails.title - The title of the post (required).
 * @param {string} postDetails.body - The body content of the post (optional).
 * @param {Object} postDetails.media - The media associated with the post.
 * @param {string} postDetails.media.url - The URL of the media (required).
 * @param {string} postDetails.media.alt - Alternative text for the media (optional).
 * @param {Array<string>} postDetails.tags - An array of tags associated with the post (optional).
 * @returns {Promise<Object>} The created post data and the response status.
 */

export async function createPost({ title, body, media, tags }) {
    try {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            throw new Error("Access token not found in local storage.");
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'X-Noroff-API-Key': API_KEY,
            },
            body: JSON.stringify({ title, body, tags, media })
        };

        // Send the request
        const response = await fetch(API_SOCIAL_POSTS, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.errors ? data.errors[0].message : "An error occurred");
        }

        return { data, ok: response.ok };
    } catch (error) {
        throw error;
    }
}
