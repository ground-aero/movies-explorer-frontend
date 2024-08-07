// содержит описание запросов к стороннему сервису beatfilm-movies, и не связан с пользовательским интерфейсом
/** @param options - опции для работы с API (serverURL - url сервера, headers - заголовки в виде объекта) */
import { beatfilmmainApiSettings } from './constants.js';

class MoviesApi {
    constructor(options) {
        // this._headers = options.headers;
        this._serverUrl = options.serverUrl;
    }

    _onResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
    }

    getAllMovies() {
        // const token = localStorage.getItem('token');
        return fetch(`${this._serverUrl}/beatfilm-movies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => this._onResponse(res))
    }

}

/** экземпляр класса MoviesApi  */
const moviesApi = new MoviesApi(beatfilmmainApiSettings);

export default moviesApi;
