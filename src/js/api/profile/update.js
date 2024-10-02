// api/profile/update.js
import { API_KEY, API_SOCIAL_PROFILES } from "../constants.js";
import { getKey } from "../auth/key.js";

export async function updateProfile(username, { avatar, banner, bio }) {
    const accessToken = await getKey();

    const updateData = {};
    if (bio) updateData.bio = bio;
    if (banner && banner.url) updateData.banner = { url: banner.url, alt: banner.alt || '' };
    if (avatar && avatar.url) updateData.avatar = { url: avatar.url, alt: avatar.alt || '' };

    if (Object.keys(updateData).length === 0) {
        throw new Error('At least one field must be provided for update.');
    }

    const options = {
        method: 'PUT',
        headers: {
            'X-Noroff-API-Key': API_KEY,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
    };

    console.log('Sending update request to:', `${API_SOCIAL_PROFILES}/${username}`, options);
    const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, options);

    console.log('Response status:', response.status);
    if (!response.ok) {
        const errorText = await response.text();
        console.error('Error updating profile:', errorText);
        throw new Error(`Error updating profile: ${response.status}`);
    }

    const data = await response.json();
    console.log('Profile updated successfully:', data);
    return data; // Ensure this returns the expected format
    updateProfile('line_sss', { bio: 'Test bio' });
}

