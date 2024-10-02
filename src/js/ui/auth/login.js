import { login } from "../../api/auth/login.js";

/**
 * Handles the login process when the user submits the login form.
 *
 * @param {Event} event - The event object representing the form submission.
 * @returns {Promise<void>} A promise that resolves when the login process is complete.
 */
export async function onLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const data = await login({email, password});

        if (data.data && data.data.accessToken) {
            const accessToken = data.data.accessToken;
            const username = data.data.name;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('loggedInUsername', username);

            window.location.href = '/';
        } else {
            alert('Invalid email or password. Please try again.');
        }
    } catch (error) {
        alert('An error occurred. Please try again later.');
    }
}

