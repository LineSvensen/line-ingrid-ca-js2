import { updateProfile } from "../../api/profile/update.js";
/**
 * Handles the profile update form submission.
 * @param {Event} event - The event triggered by the form submission.
 * @returns {Promise<void>}
 */
export async function onUpdateProfile(event) {
    event.preventDefault();

    const avatarUrl = document.getElementById('avatar-url').value;
    const bannerUrl = document.getElementById('banner-url').value;
    const bio = document.getElementById('bio').value;
    const username = localStorage.getItem('loggedInUsername');

    const updateData = {
        bio: bio || undefined,
        banner: bannerUrl ? { url: bannerUrl, alt: 'pink' } : undefined,
        avatar: avatarUrl ? { url: avatarUrl, alt: 'me' } : undefined,
    };

    const filteredUpdateData = Object.fromEntries(
        Object.entries(updateData).filter(([_, v]) => v != null)
    );

    try {
        if (Object.keys(filteredUpdateData).length > 0) {
            const updatedProfile = await updateProfile(username, filteredUpdateData);

            const profileDetails = document.getElementById('profile-details');
            profileDetails.innerHTML = `
                <div class="profile-info">
                    <div class="images-container">
                        <img class="banner-img" src="${updatedProfile.data.banner?.url || ''}" alt="${updatedProfile.data.banner?.alt || 'no image'}">
                        <img class="avatar-img" src="${updatedProfile.data.avatar?.url || ''}" alt="${updatedProfile.data.avatar?.alt || 'no image'}">
                    </div>
                    <div class="profile-details">
                        <h1 class="profile-username">${updatedProfile.data.name}</h1>
                        <p class="profile-bio">${updatedProfile.data.bio || 'No bio available'}</p>
                    </div>
                </div>
            `;
        } else {
            alert('No changes made to the profile.');
        }
    } catch (error) {
        alert('Failed to update profile');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('update-profile-form');
    if (form) {
        form.addEventListener('submit', (event) => {
            onUpdateProfile(event);
        });
    } else {
        console.error('Update profile form not found');
    }
});

const username = localStorage.getItem('loggedInUsername');
const updateData = { bio: 'Test bio', banner: { url: 'banner_url_here', alt: 'test' }, avatar: { url: 'avatar_url_here', alt: 'test' } };
updateProfile(username, updateData);