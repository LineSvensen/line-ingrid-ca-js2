import {API_SOCIAL_POSTS, API_KEY} from "../constants.js";

// Function to create a post via the API
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