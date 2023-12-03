/** Содержит описание запросов к нашему Api
 * @param options - опции для работы с API (serverURL - url сервера, headers - заголовки в виде объекта) */
import { mainApiSettings } from './constants.js';

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

    // # запрашивает-->возвращает все сохранённые в моем API текущим пользователем фильмы
    getMyMovies() {
        return fetch(`${this._serverUrl}/movies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => this._onResponse(res))
    }

    // getAllSetupData() {
    //     return Promise.all([this.getUser(), this._getMyMovies()]);
    // }

    // ---------------------------------------------------------------------------//

    //  # создает фильм с переданными в теле: country,...
    postMyMovie(card) {
        const token = localStorage.getItem('token');
        return fetch(`${this._serverUrl}/movies`, {
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

const mainApi = new MainApi(mainApiSettings);

export default mainApi;
