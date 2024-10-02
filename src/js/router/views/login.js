import { onLogin } from "../../ui/auth/login";

const form = document.forms.login;
/**
 * Handles the form submission for logging in.
 *
 * @param {Event} event - The event object representing the form submission.
 */
form.addEventListener("submit", onLogin);
