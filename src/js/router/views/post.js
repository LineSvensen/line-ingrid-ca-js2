import { readPost } from "../../api/post/read.js";

/**
 * Function to display a single post based on postId from localStorage.
 * @returns {Promise<void>}
 */
async function displaySinglePost() {
    const postId = localStorage.getItem('postId');
    const loggedInUsername = localStorage.getItem('loggedInUsername');
    if (!postId) {
        return;
    }

    try {
        const singlePost = await readPost(postId);
        const postWrapper = document.getElementById('post-wrapper');
        postWrapper.innerHTML += `
<div class="wrapper-post-content">
<div class="wrapper-post-author" data-username="${singlePost.data.author.name}">
    <img class="avatar-img" src="${singlePost.data.author.avatar.url || ""}" alt="${singlePost.data.author.avatar.alt || "no image"}">
    <span class="name-post-author">${singlePost.data.author.name}</span>
</div>
    <img class="post-img" src="${singlePost.data.media?.url || ""}" alt="${singlePost.data.media?.alt || "no image"}">
    <div class="post-title">${singlePost.data.title}</div>
    <div class="post-body">${singlePost.data.body}</div>
    <div class="wrapper-comments-and-react">
        <div class="wrapper-comments">
            <span class="comment-counter">Comments:</span>
            <span class="comment-counter">${singlePost.data._count.comments}</span>
            <img class="comment-icon" src="../../../../public/images/comment.png" alt="Comment icon"/>
        </div>
        <div class="wrapper-react">
            <span class="react-counter">${singlePost.data._count.reactions}</span>
            <img class="heart-react-icon" src="../../../../public/images/heart-empty.png" alt="Empty Heart"/>
        </div>
        <div class="render-comments"></div>
    </div>
    </div>
    `;
        document.querySelector('.wrapper-post-author').addEventListener('click', function () {
            const postAuthorUsername = this.getAttribute('data-username');

            // Check if the post author is the logged-in user
            if (postAuthorUsername === loggedInUsername) {
                // If it's the logged-in user, clear `profileUsername` and go to "My Profile"
                localStorage.removeItem('profileUsername');
                window.location.replace('/profile/?username=' + loggedInUsername);
            } else {
                // Otherwise, store the author's username and go to their profile
                localStorage.setItem('profileUsername', postAuthorUsername);
                window.location.replace('/profile/?username=' + postAuthorUsername);
            }
        });
    } catch (error) {
        console.error('Error displaying post:', error);
    }
}

displaySinglePost();
