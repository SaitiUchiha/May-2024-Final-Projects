// На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста
//   (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

const divPostDetsils = document.getElementsByClassName('post-details')[0];
const divComments = document.getElementsByClassName('comments')[0];
const POST_ID = +localStorage.getItem('postId');
const USER_ID = +localStorage.getItem('userId');

const url = new URL(`https://jsonplaceholder.typicode.com/users/${USER_ID}/posts/`);

fetch(url)
    .then(value => value.json())
    .then(postObj => {
        const detInfo = postObj.find(x => x.id === POST_ID);
        for (const key in detInfo) {
            const h2 = document.createElement('h2');
            h2.innerText = `${key}: ${detInfo[key]}`;
            divPostDetsils.append(h2);
        }
        let bttnc = document.createElement('button');
        bttnc.classList.add('comm-bttn');
        bttnc.innerText = 'Comments'
        divPostDetsils.append(bttnc)
        bttnc.onclick = function (ev) {
            ev.preventDefault();
            const urlcomm = `https://jsonplaceholder.typicode.com/posts/${POST_ID}/comments`;
            fetch(urlcomm)
                .then(value => value.json())
                .then(commObj => {
                    const comments = commObj;

                    function iterateComments(obj) {
                        // підкажіть як зробити так щоб перший divComm не був пустий, але в одночас щоб не присвоювати колному елементу divComm. Я його в CSS виключила.
                        let divComm = document.createElement('div');
                        divComm.classList.add('comment-div');
                        divComments.appendChild(divComm);
                        for (const key in obj) {
                            if (typeof obj[key] === 'object' && obj[key] !== null) {
                                iterateComments(obj[key]);
                            } else {
                                const p = document.createElement('p');
                                p.innerText = `${key}: ${obj[key]}`;
                                divComm.append(p);
                            }
                        }
                    }

                    iterateComments(comments);
                    if (comments.id === commObj.total) {
                        bttnc.disabled = true;
                    }

                });
        }

    });
