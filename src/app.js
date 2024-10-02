import "./css/style.css";
import router from "./js/router";
/**
 * Initializes the application by routing to the current path.
 * @param {string} pathname - The current URL path to route to.
 */
await router(window.location.pathname);

import {setLogoutListener} from "./js/ui/global/logout.js";

setLogoutListener()

document.querySelector('.my-profile').addEventListener('click', function () {
    const loggedInUsername = localStorage.getItem('loggedInUsername');
    if (loggedInUsername) {
        localStorage.removeItem('profileUsername');
    }
});