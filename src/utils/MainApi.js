/** Содержит описание запросов к нашему Api
 * @param options - опции для работы с API (serverURL - url сервера, headers - заголовки в виде объекта) */
import {mainApiSettings} from './constants.js';
// import {DB_URL} from "./AuthApi.js";

class MainApi {

    _onResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
    }

    /** user authentication - регистрация пользователя (отправка рег данных)
     * # создаёт пользователя с переданными в теле: email, password, name*/
    register(name, email, password) {
        return fetch(`${mainApiSettings.serverUrl}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password}),
        }).then(res => this._onResponse(res))
    }

    /** проверка на существование пользователя (логинизация) */
    login(email, password) {
        return fetch(`${mainApiSettings.serverUrl}/signin`, {
            // credentials: 'include',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        }).then(res => this._onResponse(res))
    }

    getUserAuth(token) {
        // const token = localStorage.getItem('token');
        return fetch(`${mainApiSettings.serverUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then(res => this._onResponse(res))
    }

    patchUser(formValue) {
        const token = localStorage.getItem('token');
        return fetch(`${mainApiSettings.serverUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formValue.name,
                email: formValue.email
            })
        }).then(res => this._onResponse(res))
    }

    // -------------------- movies --------------------------------------------------- //

    // # запрашивает-->возвращает все сохранённые в моем API текущим пользователем фильмы
    getMyMovies(token) {
        return fetch(`${mainApiSettings.serverUrl}/movies`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }).then(res => this._onResponse(res))
    }

    //  # создает фильм с переданными в теле: country,...
    postMyMovie(card) {
        const token = localStorage.getItem('token');
        return fetch(`${mainApiSettings.serverUrl}/movies`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ // на наш API - @POST: сохраняем/создаем карточку в наш АПИ
                movieId: card.movieId,
                country: card.country,
                director: card.director,
                duration: card.duration,
                year: card.year,
                description: card.description,
                image: card.image,
                trailerLink: card.trailerLink,
                thumbnail: card.thumbnail,
                nameRU: card.nameRU,
                nameEN: card.nameEN,
            }),
        }).then(res => this._onResponse(res))
    }

    //  # удаляет сохраненный фильм по id с сервера
    deleteMyMovie(movieId) {
        // console.log(movieId)
        const token = localStorage.getItem('token');
        return fetch(`${mainApiSettings.serverUrl}/movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then(res => this._onResponse(res))
    }

}

const mainApi = new MainApi(mainApiSettings);

export default mainApi;
