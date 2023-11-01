// Содержит описание запросов к нашему Api
/** @param options - опции для работы с API (serverURL - url сервера, headers - заголовки в виде объекта) */
import { apiSettings } from './constants.js';

// p.s: Напишите этот код на нативном JS, применяя fetch.
class MainApi {
    constructor(options) {
        // this._headers = options.headers;
        this._serverUrl = options.serverUrl;
    }

    _onResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
    }

    getUser() {
        const token = localStorage.getItem('token');
        return fetch(`${this._serverUrl}/users/me`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then(res => this._onResponse(res))
    }

    patchUser(formValue) {
        const token = localStorage.getItem('token');
        return fetch(`${this._serverUrl}/users/me`,{
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

    // # запрашивает-->возвращает все сохранённые текущим пользователем фильмы
    getMyMovies() {
        const token = localStorage.getItem('token');
        return fetch(`${this._serverUrl}/movies`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then(res => this._onResponse(res))
    }

    //  # создает фильм с переданными в теле: country,...
    createMyMovie(movieData) {
        // console.log()
        const {
            movieId,
            country,
            director,
            duration,
            year,
            description,
            image,
            trailerLink,
            thumbnail,
            nameRU,
            nameEN,
        } = movieData;
        const token = localStorage.getItem('token');
        return fetch(`${this._serverUrl}/movies`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                movieId,
                country,
                director,
                duration,
                year,
                description,
                image,
                trailerLink,
                thumbnail,
                nameRU,
                nameEN,
            }),
        }).then(res => this._onResponse(res))
    }

    //  # удаляет сохраненный фильм по id с сервера
    deleteMyMovie(movieId) {
        console.log(movieId)
        const token = localStorage.getItem('token');
        return fetch(`${this._serverUrl}/movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then(res => this._onResponse(res))
    }

}

/** Экземпляр класса mainApi  */
const mainApi = new MainApi(apiSettings);

export default mainApi;
