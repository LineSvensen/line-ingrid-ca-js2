import { API_AUTH_KEY, API_AUTH_REGISTER } from "../constants.js";

/**
 * Registers a new user.
 *
 * @param {Object} userDetails - The details of the user to register.
 * @param {string} userDetails.name - The name of the user.
 * @param {string} userDetails.email - The email of the user.
 * @param {string} userDetails.password - The password for the account.
 * @param {string} [userDetails.bio] - Optional bio for the user.
 * @param {Object} [userDetails.banner] - Banner image details.
 * @param {Object} [userDetails.avatar] - Avatar image details.
 * @returns {Promise<Object>} - The response data from the registration request.
 * @throws {Error} - Throws an error if the registration fails.
 */
export async function register({
    name,
    email,
    password,
    bio,
    banner,
    avatar,
                               }) {
  const payload = {
    name,
    email,
    password,
    bio: bio || undefined,
    avatar: {
      url: avatar?.url || undefined,
      alt: "Profile Picture",
    },
    banner: {
      url: banner?.url || undefined,
      alt: "Banner Image",
    },
    venueManager: true,
  };

  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Noroff-API-KEY': API_AUTH_KEY,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed.");
    }

    return data;
  } catch (error) {
    throw new Error("Error during registration: " + error.message);
  }
}
