// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
//   (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html,
//   котра має детальну інфу про поточний пост.

const allUserInfo = document.getElementsByClassName('all-user-info')[0];
const divPost = document.getElementsByClassName('post')[0];

const USER_ID = +localStorage.getItem('userId');

const url = `https://jsonplaceholder.typicode.com/users/${USER_ID}`;
// const url = 'https://jsonplaceholder.typicode.com/users/'+POST_ID+'/posts';

fetch(url)
    .then(value => value.json())
    .then(userObj => {
        const userInfo = userObj;
        console.log(userInfo);
        function iterateObj(obj) {
            for (const key in obj) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    const p = document.createElement('p');
                    p.innerText = `${key}:`;
                    allUserInfo.append(p);
                    iterateObj(obj[key]);
                } else {
                    const p = document.createElement('p');
                    p.innerText = `${key}: ${obj[key]}`;
                    allUserInfo.append(p);
                }
            }
        }
        iterateObj(userInfo);
        let bttn = document.createElement('button');
        bttn.innerText = 'post of current user';
        bttn.classList.add('bttn90');
        document.body.appendChild(bttn);
        bttn.onclick = function (ev) {
            ev.preventDefault();
            const urlpost = new URL(`https://jsonplaceholder.typicode.com/users/${USER_ID}/posts`);
            urlpost.searchParams.set('limit', '10');
            fetch(urlpost)
                .then(value => value.json())
                .then(userPostObj => {
                    const userPost= userPostObj;
                    function iteratePost(obj) {
                        for (const key in obj) {
                            if (typeof obj[key] === 'object' && obj[key] !== null) {
                                iteratePost(obj[key]);
                            } else {
                                const p = document.createElement('p');
                                p.innerText = `${key}: ${obj[key]}`;
                                divPost.append(p);
                            }
                        }
                        let bttnp = document.createElement('button');
                        bttnp.innerText = 'More info'
                        divPost.append(bttnp)
                        bttnp.onclick = function (ev) {
                            ev.preventDefault();
                            window.location = "post-details.html";
                            let postId = obj.id;
                            localStorage.setItem('postId', JSON.stringify(postId));
                        }
                    }
                    iteratePost(userPost);
                    if (userPost.id === userPostObj.total){
                        bttn.disabled = true;
                    }

                });
        }

    });

