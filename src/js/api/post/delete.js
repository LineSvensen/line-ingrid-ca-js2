import {API_KEY, API_SOCIAL_POSTS } from "../../api/constants.js";

export async function deletePost(id) {
    const accessToken = sessionStorage.getItem('accessToken');
    try {
        const response = await fetch(API_SOCIAL_POSTS, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}`,
                'X-Noroff-API-Key': API_KEY,
            },
        });
        if (response.ok) {
            return true;
        } else {
            throw new Error("failed to delete post");
        }

    } catch(error){
        return false;
    }
}