import {authGuard} from "../../utilities/authGuard";
import {readProfile} from "../../api/profile/read.js";
import {readPostsByUser} from "../../api/post/read.js";

authGuard();

async function renderProfile() {
    const loggedInUsername = localStorage.getItem('loggedInUsername');
    const profileUsername = localStorage.getItem('profileUsername');

    const usernameToUse = profileUsername || loggedInUsername;

    if (!usernameToUse) {
        console.error('no username found in localstorage');
        return;
    }

    try {
        const profileData = await readProfile(usernameToUse);

        const profileDetails = document.getElementById('profile-details');
        profileDetails.innerHTML = `
        <div class="profile-info">
            <div class="images-container">
                <img class="banner-img" src="${profileData.data.banner.url || ""}" alt="${profileData.data.banner.alt || "no image"}">
                <img class="avatar-img" src="${profileData.data.avatar.url || ""}" alt="${profileData.data.avatar.alt || "no image"}">
            </div>
            <div class="profile-details">
                <h1 class="profile-username">${profileData.data.name}</h1>
                <p class="profile-bio">${profileData.data.bio || "No bio available"}</p>
                <div class="profile-counts">
                    <p>Posts: ${profileData.data._count.posts}</p>
                    <p>Followers: ${profileData.data._count.followers}</p>
                    <p>Following: ${profileData.data._count.following}</p>
                </div>
            </div>
        </div>
        `;

        const posts = await readPostsByUser(usernameToUse);
        const postGrid = document.getElementById('posts-grid');
        postGrid.innerHTML = '';

        posts.data.forEach((post) => {
            const postHTML = `
        <li class="single-post"">
            <img data-id="${post.id}" class="post-img" src="${post.media?.url || ""}" alt="${post.media?.alt || "no image"}">
            <h2 class="post-title">${post.title}</h2>
            <button data-id="${post.id}" class="post-edit-btn">Edit</button>
        </li>
        `;
            postGrid.innerHTML += postHTML;
        });

        document.querySelectorAll('.post-edit-btn').forEach((postElement) => {
            if (usernameToUse === profileUsername) {
                postElement.style.display = 'none';
            }
            postElement.addEventListener('click', function () {
                const postId = postElement.getAttribute('data-id');
                localStorage.setItem('editPostId', postId);
                window.location.replace('/post/edit/');
            })
        });

        document.querySelectorAll('.post-img').forEach((postElement) => {
            postElement.addEventListener('click', function () {
                const postId = postElement.getAttribute('data-id');
                localStorage.setItem('postId', postId);
                window.location.replace('/post/');
            });
        });
    } catch (error) {
        console.error('Error rendering profile or posts:', error)
    }

    if (usernameToUse === profileUsername) {
        document.getElementById('create-post-btn').style.display = 'none';
        document.getElementById('edit-post-btn').style.display = 'none';
        document.getElementById('update-profile-form').style.display = 'none';
    } else {
        document.getElementById('create-post-btn').style.display = 'block';
        document.getElementById('edit-post-btn').style.display = 'block';
        document.getElementById('update-profile-form').style.display = 'block';
    }
}

renderProfile();