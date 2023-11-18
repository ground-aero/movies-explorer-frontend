export const DB_URL = 'http://127.0.0.1:4000';
// export const DB_URL = 'https://api.ga-movies.nomoredomainsicu.ru';

const checkResponse = async (res) => {
    if (res.ok) {
        return await res.json();
    }
    return res.json()
        .then((errData) => {
            console.log(errData)
            return Promise.reject(errData.message || res.statusText)
        })
}

/** user authentication - регистрация пользователя (отправка рег данных)
 * # создаёт пользователя с переданными в теле: email, password, name*/
export const register = async (name, email, password) => {
    try {
        const response = await fetch(`${DB_URL}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password}),
        })
        return await checkResponse(response)
    } catch (err) {
        console.error(`register error: ${err.name}, ${err.message}`)
        throw err
    }
}

/** проверка на существование пользователя (логинизация) */
export const authorize = async (email, password) => {
    try {
        const response = await fetch(`${DB_URL}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        })
        return await checkResponse(response)
    } catch (err) {
        console.error(`authorize error: ${err.name}, ${err.message}`)
        throw err
    }
}

    // Проверить токен/авторизацию запросом на сервер
export const checkToken = async (token) => {
    try {
        const response = await fetch(`${DB_URL}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            // credentials: 'include', // включить отправку авторизационных данных в fetch
        })
        return await checkResponse(response)
    } catch (err) {
        console.error(`check token error: ${err.name}, ${err.message}`)
        throw err
    }
}
