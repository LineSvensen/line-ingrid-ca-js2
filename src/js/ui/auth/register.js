import { register } from "../../api/auth/register.js";

/**
 * Handles user registration.
 *
 * @param {Event} event - The submit event from the registration form.
 */
export async function onRegister(event) {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const bio = event.target.bio.value;
    const avatarUrl = event.target.avatar.value;
    const bannerUrl = event.target.banner.value;

    if (!name || !email || !password) {
        alert("Name, email, and password fields are required!");
        return;
    }

    const avatar = { url: avatarUrl, alt: "Profile Picture" };
    const banner = { url: bannerUrl, alt: "Banner Image" };

    try {
        const data = await register({ name, email, password, bio, banner, avatar });
        alert("Registration successful!");
        console.log("User data:", data); // Handle successful registration as needed
    } catch (error) {
        alert("Registration failed. " + error.message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    if (form) {
        form.addEventListener('submit', onRegister);
    }
});