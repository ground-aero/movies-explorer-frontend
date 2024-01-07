import { SHORT_MOVIE } from './constants.js';

const filterSearch = (movies, searchWord, isShort = false) => {
    return movies.filter((movie) => {
        // console.log('searchWord, isShort::', searchWord, isShort)
        const filterToLowerCase = // boolean, по совпадению букв поиска
            movie.nameRU.toLowerCase().includes(searchWord) ||
            movie.nameEN.toLowerCase().includes(searchWord)

        if (isShort === false) { // если длинные,
            return filterToLowerCase; // => то получаем длинные ф.
        } else { // если короткие, => то получаем короткие ф.
            return filterToLowerCase && (movie.duration <= SHORT_MOVIE)
        }
    });
};

export default filterSearch;
