import "./css/style.css";
import router from "./js/router";
import {setLogoutListener} from "./js/ui/global/logout.js";

/**
 * Initializes the application by routing to the current path.
 * @param {string} pathname - The current URL path to route to.
 */
await router(window.location.pathname);


setLogoutListener()

document.querySelectorAll('.my-profile').forEach(function (element) {
    element.addEventListener('click', function () {
        const loggedInUsername = localStorage.getItem('loggedInUsername');
        if (loggedInUsername) {
            // Clear profileUsername to ensure the logged-in user's profile is loaded
            localStorage.removeItem('profileUsername');
            // Redirect to the logged-in user's profile
            window.location.href = `/profile/?username=${loggedInUsername}`;
        }
    });
});

import { readProfile } from "./js/api/profile/read.js";

// Function to display user profile in the nav bar
async function displayUserProfile() {
    // Get the logged-in username from localStorage
    const loggedInUsername = localStorage.getItem('loggedInUsername');

    if (loggedInUsername) {
        try {
            // Fetch profile data using readProfile function
            const profileData = await readProfile(loggedInUsername);

            // Get the nav element to update
            const userNav = document.querySelector('.user-nav');

            // Update the nav with the user's profile data
            if (userNav) {
                userNav.innerHTML = `
<img src="${profileData.data.avatar.url || '/default-avatar.png'}" alt="User Avatar" style="width:40px; height:40px; border-radius:50%;">
                    <span>${profileData.data.name}</span>
                `;
            }
        } catch (error) {
            console.error('Error displaying user profile:', error);
        }
    }
}

displayUserProfile();


