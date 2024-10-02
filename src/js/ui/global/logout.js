import {onLogout} from "../auth/logout.js";

/**
 * Sets an event listener for the logout button.
 * When the logout button is clicked, the onLogout function is invoked.
 * It checks if the logout button exists before adding the event listener.
 * @throws {Error} Throws an error if the logout button is not found in the DOM.
 */
export function setLogoutListener() {
    const logoutBtn = document.getElementById('logout-btn');

    if (!logoutBtn) {
        console.log('No logout button found');
        return;
    }

    logoutBtn.addEventListener('click', function () {
        onLogout();
    });
}


