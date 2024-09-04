// На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста
//   (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)


const POST_ID =  +localStorage.getItem('postId');

const url = `https://jsonplaceholder.typicode.com/users/${POST_ID}/posts`;

fetch(url)
    .then(value => value.json())
    .then(postsObj => {
        const posts = postsObj;
        for (const post of posts) {
            let div = document.createElement('div');
            div.classList.add('user-block');
            let h1 = document.createElement('h1');
            h1.innerText = post.title;
            let h2 = document.createElement('h2');
            h2.innerText = `ID: ${post.id}`;
            let bttn = document.createElement('button');
            bttn.innerText = 'More info'
            bttn.onclick = function (ev) {
                ev.preventDefault();
                // window.location = "user-details.html";
                // let userId = user.id;
                // let userIdlist = localStorage.setItem('userId', JSON.stringify(userId));

            }

            div.append(h2, h1, bttn);
            allUsrers.appendChild(div)

        }
    });