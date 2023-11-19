import { SHORT_MOVIE } from './constants.js';

const filterSearch = (movies, searchWord, shortStatus) => {
    return movies.filter((movie) => {

        const filterToLowerCase =
            movie.nameRU.toLowerCase().includes(searchWord) ||
            movie.nameEN.toLowerCase().includes(searchWord)
        if (shortStatus) {
            return filterToLowerCase;
        } else {
            return filterToLowerCase && (movie.duration <= SHORT_MOVIE);
        }
    });
};

export default filterSearch;
