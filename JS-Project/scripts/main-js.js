// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html,
//   котра має детальну інфорацію про об'єкт на який клікнули

const allUsrers = document.getElementsByClassName('all-users')[0];

const url = new URL('https://jsonplaceholder.typicode.com/users');
url.searchParams.set('limit', '10');
fetch(url)
    .then(value => value.json())
    .then(usersObj => {
        for (const user of usersObj) {
            let div = document.createElement('div');
            div.classList.add('user-block');
            let h1 = document.createElement('h1');
            h1.innerText = usersObj.name;
            let h2 = document.createElement('h2');
            h2.innerText = `ID: ${usersObj.id}`;
            let bttn = document.createElement('button');
            bttn.innerText = 'More info'
            bttn.classList.add('more-info')
            bttn.onclick = function (ev) {
                ev.preventDefault();
                window.location = "user-details.html";
                let userId = usersObj.id;
                localStorage.setItem('userId', JSON.stringify(userId));

            }

            div.append(h2, h1, bttn);
            allUsrers.appendChild(div)
        }
    });

