import {authGuard} from "../../utilities/authGuard";
import {readPosts} from "../../api/post/read.js";

authGuard();

let currentPage = 1;
let fetchedPostsCount = 0;
const postsPerPage = 12;
const maxPostsPerPage = 62;
const postList = document.getElementById('post-list');
const loadMoreButton = document.getElementById('load-more-button');

async function renderPosts(reset = false) {
    try {

        if (reset) {
            postList.innerHTML = '';
            fetchedPostsCount = 0;
            currentPage = 1;
        }


        const posts = await readPosts(postsPerPage, currentPage);
        fetchedPostsCount += posts.data.length;

        posts.data.forEach((post) => {
            const postHTML = `
      <li class="single-post" data-id="${post.id}">
        <div class="wrapper-post-content">
            <div class="wrapper-post-author">
                <img class="avatar-img" src="${post.author.avatar.url || ""}" alt="${post.author.avatar.alt || "no image"}">
                <span class="name-post-author">${post.author.name}</span>
            </div>
            <img class="post-img" src="${post.media?.url || ""}" alt="${post.media?.alt || "no image"}">
            <div class="wrapper-title-and-react">
                <h2>${post.title}</h2>
                    <div class="wrapper-comments-and-react">
                    <div class="wrapper-comments">
                        <span class="comment-counter">${post._count.comments}</span>
                        <img class="comment-icon" src="../../../../public/images/comment.png" alt="Comment icon"/>
                    </div>
                    <div class="wrapper-react">
                        <span class="react-counter">${post._count.reactions}</span>
                        <img class="heart-react-icon" src="../../../../public/images/heart-filled-border.png" alt="Heart icon"/>
                    </div> 
                </div>
            </div>
        </div>
      </li>
    `;
            postList.innerHTML += postHTML;
        });

        document.querySelectorAll('.single-post').forEach((postElement) => {
            postElement.addEventListener('click', function () {
                const postId = postElement.getAttribute('data-id');
                localStorage.setItem('postId', postId);
                window.location.replace('/post/');
            });
        });

        if (fetchedPostsCount >= maxPostsPerPage) {
            loadMoreButton.style.display = 'block';
        } else {
            loadMoreButton.style.display = 'none';
        }
    } catch (error){
        console.error('error rendering posts', error);
        postList.innerHTML = '<p>Failed to load posts. Please try again later.</p>';
    }
}

window.addEventListener('scroll', function () {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10 && fetchedPostsCount < maxPostsPerPage) {
            currentPage++;
            renderPosts();
    }
})

loadMoreButton.addEventListener('click', function () {
    renderPosts(true);
    window.scrollTo(0, 0);
})

renderPosts();