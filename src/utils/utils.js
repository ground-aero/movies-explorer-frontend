import {beatfilmApiSettings} from './constants.js';

export const utilsSetToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const utilsGetFromLocalStorage = (key) => {
    const getData = localStorage.getItem(key)
    return getData ? JSON.parse(getData) : null
}

export function mutateCards(cards) { // мутируем сырой массив
    return (
        cards.map((card) => ({
            movieId: card.id,
            country: card.country,
            director: card.director,
            duration: card.duration,
            year: card.year,
            description: card.description,
            image: `${beatfilmApiSettings.serverUrl}`+ card.image.url,
            trailerLink: card.trailerLink,
            thumbnail: `${beatfilmApiSettings.serverUrl}`+ card.image.formats.thumbnail.url,
            nameRU: card.nameRU,
            nameEN: card.nameEN,
            key: card.id,
        }))
    )
}

