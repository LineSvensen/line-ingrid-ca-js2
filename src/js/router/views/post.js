import { readPost } from "../../api/post/read.js";

/**
 * Function to display a single post based on postId from localStorage.
 * @returns {Promise<void>}
 */
async function displaySinglePost() {
    const postId = localStorage.getItem('postId');
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
            const username = this.getAttribute('data-username');
            localStorage.setItem('profileUsername', username);
            window.location.replace('/profile/');
        });
    } catch (error) {
        return;
    }
}

displaySinglePost();
