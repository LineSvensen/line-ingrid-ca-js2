/**
 * Function to get the access token from local storage.
 * @returns {Promise<string>} The access token if found.
 * @throws {Error} If the access token is not found.
 */
export async function getKey() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        return accessToken;
    } else {
        throw new Error('AccessToken or username not found');
    }
}