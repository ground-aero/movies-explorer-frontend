import { SHORT_MOVIE } from './constants.js';

const filterSearch = (movies, searchWord, isShort = false) => {
    return movies.filter((movie) => {
        let lowCase = searchWord.toLowerCase()
        const searchResult = // boolean, по совпадению букв поиска
            movie.nameRU.toLowerCase().includes(lowCase) ||
            movie.nameEN.toLowerCase().includes(lowCase)

        if (isShort === false) { // если длинные,
            return searchResult; // => то получаем длинные ф.
        } else { // если короткие, => то получаем короткие ф.
            return searchResult && (movie.duration <= SHORT_MOVIE)
        }
    });
};

export default filterSearch;
