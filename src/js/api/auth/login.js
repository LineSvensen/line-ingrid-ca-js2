import { API_AUTH_LOGIN, API_KEY } from '../constants.js';

/**
 * Function to log in a user with email and password.
 * @param {Object} credentials - The login credentials.
 * @param {string} credentials.email - The email of the user.
 * @param {string} credentials.password - The password of the user.
 * @returns {Promise<Object>} The response data from the login request.
 * @throws {Error} If login fails due to invalid credentials.
 */
export async function login({ email, password }) {
    try {
        const response = await fetch(API_AUTH_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Noroff-API-Key': API_KEY
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error('Invalid credentials');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}