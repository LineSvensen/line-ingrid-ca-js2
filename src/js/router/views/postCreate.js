import { authGuard } from "../../utilities/authGuard";
import { onCreatePost } from "../../ui/post/create";

authGuard();

const form = document.getElementById('create-form');

form.addEventListener("submit", onCreatePost);


