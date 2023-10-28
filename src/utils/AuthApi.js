//
// export const DB_URL = 'http://127.0.0.1:4000';
export const DB_URL = 'https://api.ga-movies.nomoredomainsicu.ru';

// function checkResponse(res) {
//     return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
// }
function checkResponse(res) {
    if (res.ok) {
        console.log(res)
        return res.json();
    }
    return res.json()
        .then((errData) => {
            console.log(errData)
            return Promise.reject(errData.message || res.statusText)
        })
}

/** user authentication - регистрация пользователя (отправка рег данных)
 * # создаёт пользователя с переданными в теле: email, password, name*/
export const register = (name, email, password) => {
    return fetch(`${DB_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password}),
    })
        .then((res) => {
            if (res.ok) {
                console.log(res)
                return res.json()
            }
            return res.json()
                .then((err) => {
                    return Promise.reject(err.message)
                })
        })
        // .then(checkResponse)
}

/** проверка на существование пользователя (логинизация) */
export const authorize = (email, password) => {
    return fetch(`${DB_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    })
        .then((res) => {
            if (res.ok) {
                // console.log(res)
                return res.json()
            }
            return res.json()
                .then((err) => {
                    return Promise.reject(err.message)
                })
        })
        // .then(checkResponse)
        // .then((data) => {
        //     console.log(data)
        //     localStorage.setItem('token', data.token)
        //     return data;
        // })
}

export const checkToken = () => {
    const token = localStorage.getItem('token');
    return fetch(`${DB_URL}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        credentials: 'include', // включить отправку авторизационных данных в fetch
    }).then(checkResponse);
};
