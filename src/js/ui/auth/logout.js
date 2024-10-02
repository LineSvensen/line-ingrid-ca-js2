/**
 * Logs out the user by removing the access token from local storage.
 * After logout, the user is redirected to the authentication page for login or registration.
 *
 * @returns {void} This function does not return a value.
 */

export function onLogout() {
    localStorage.removeItem('accessToken');
    window.location.replace('/auth/');
}

