import {API_SOCIAL_POSTS, API_KEY} from "../constants.js";

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

export async function deletePost (id) {
    const accessToken = localStorage.getItem('accessToken');

    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Noroff-API-Key': API_KEY,
        }
    };

    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, options);

        const responseText = await response.text();
        const data = responseText ? JSON.parse(responseText) : {};

        if (!response.ok) {
            throw new Error(data.errors ? data.errors[0].message : "An error occurred while deleting the post");
        }

        return { data, ok: response.ok };
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
}
