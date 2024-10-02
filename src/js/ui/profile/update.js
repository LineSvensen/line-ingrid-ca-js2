// ui/profile/update.js
import { updateProfile } from "../../api/profile/update.js";
import { readProfile } from "../../api/profile/read.js";

export async function onUpdateProfile(event) {
    event.preventDefault(); // Prevent default form submission
    console.log("Starting profile update..."); // Debugging line

    // Gather data from input fields
    const avatarUrl = document.getElementById('avatar-url').value;
    const bannerUrl = document.getElementById('banner-url').value;
    const bio = document.getElementById('bio').value;
    const username = localStorage.getItem('loggedInUsername');

    console.log('Data gathered:', { avatarUrl, bannerUrl, bio, username }); // Log gathered data

    // Construct the update payload
    const updateData = {
        bio: bio || undefined,
        banner: bannerUrl ? { url: bannerUrl, alt: 'pink' } : undefined,
        avatar: avatarUrl ? { url: avatarUrl, alt: 'me' } : undefined,
    };

    // Filter out any undefined values
    const filteredUpdateData = Object.fromEntries(
        Object.entries(updateData).filter(([_, v]) => v != null)
    );

    console.log('Filtered update data:', filteredUpdateData); // Log the filtered data

    try {
        // Check if there's anything to update
        if (Object.keys(filteredUpdateData).length > 0) {
            console.log("Sending update request..."); // Log before sending request
            const updatedProfile = await updateProfile(username, filteredUpdateData);
            console.log('Profile updated successfully:', updatedProfile); // Log the updated profile

            // Update the profile UI
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
            console.warn('No changes made to the profile.');
        }
    } catch (error) {
        console.error('Failed to update profile:', error);
    }
}



// Ensure the DOM is fully loaded before adding the event listener
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('update-profile-form');
    if (form) {
        form.addEventListener('submit', (event) => {
            console.log('Form submitted');  // Debugging line to verify event trigger
            onUpdateProfile(event);
        });
    } else {
        console.error('Update profile form not found');
    }
});

const username = localStorage.getItem('loggedInUsername');
const updateData = { bio: 'Test bio', banner: { url: 'banner_url_here', alt: 'test' }, avatar: { url: 'avatar_url_here', alt: 'test' } };
updateProfile(username, updateData);