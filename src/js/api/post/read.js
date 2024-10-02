import {API_KEY, API_SOCIAL_POSTS, API_SOCIAL_PROFILES} from "../constants.js";
import {getKey} from "../auth/key.js";

// GET SINGLE POST
export async function readPost(id) {

    console.log('called with postid', id);

    const accessToken = await getKey();
    console.log(accessToken);
    const params = { _author: true, _reactions: true, _comments: true };

    const options = {
        headers: {
            'X-Noroff-API-Key': API_KEY,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': "application/json"
        },
    }

    const response = await fetch(`${API_SOCIAL_POSTS}/${id}?${new URLSearchParams(params).toString()}`, options );

    if (!response.ok) {
        console.log('Response:', response);
        throw new Error(`Error fetching data: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
}

// GET POSTS
export async function readPosts(limit = 12, page = 1, tag) {

    const accessToken = await getKey();

    const params = { limit, page, _author: true, _reactions: true, _comments: true };
    if (tag) {
        params._tag = tag;
    }

   const options = {
       headers: {
           'X-Noroff-API-Key': API_KEY,
           Authorization: `Bearer ${accessToken}`,
           'Content-Type': "application/json"
       },
   }

    const response = await fetch(`${API_SOCIAL_POSTS}?${new URLSearchParams(params).toString()}`, options );

    if (!response.ok) {
        console.log('Response:', response);
        throw new Error(`Error fetching data: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

// GET USERS PROFILES
export async function readPostsByUser(username, limit = 12, page = 1, tag) {
    const accessToken = await getKey();

    const params = { limit, page, username };
    if (tag) {
        params.tag = tag;
    }

    const options = {
        headers: {
            'X-Noroff-API-Key': API_KEY,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': "application/json"
        },
    }

    const response = await fetch(`${API_SOCIAL_PROFILES}/${username}/posts`, options);

    if (!response.ok) {
        console.log('Response:', response);
        throw new Error(`Error fetching data: ${response.status}`);
    }
    const data = await response.json();
    return data;
}
