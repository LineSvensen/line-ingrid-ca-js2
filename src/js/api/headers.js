import { API_KEY } from "./constants";
/**
 * Creates and returns a Headers object with the API key included if it exists.
 *
 * @returns {Headers} - The Headers object with the API key.
 */
export function headers() {
  const headers = new Headers();

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  return headers;
}
