// component - компонент страницы с сохранёнными карточками фильмов.
import {useContext, useState, useEffect} from 'react';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import LoadingContext from '../../contexts/LoadingContext';
import Preloader from '../Preloader/Preloader';
import {SHORT_MOVIE} from '../../utils/constants';

function SavedMovies({ type, likedMovies, isFoundLikedMovies, setFoundLikedMovies,
                         onSaveLikedCard, onDeleteCard, errorSearchApi, setErrorSearchApi }) {
    const isLoading = useContext(LoadingContext);
    const [isSearchedWordLiked, setSearchedWordLiked] = useState('');
    const [isShortLiked, setShortLiked] = useState(false);
    const [isShortMovies, setShortMovies] = useState([]); // коротыши
    // ------------------ ( saved-movies ) -------------------------------------------------------------

    useEffect(() => { // При первом переходе, Отображение всех лайкнутых ф.
        // setLikedMovies(savedMoviesContext)
        setFoundLikedMovies(likedMovies)
    },[])

    useEffect(() => {
        searchLikedMovies()
        filterShortMovies()
    }, [isSearchedWordLiked, isShortLiked]);

    useEffect(() => { // Начальное состояние: поискового слова, и isShort (true/false)
            setTimeout(() => {
                setSearchedWordLiked('')
                setShortLiked(isShortLiked);
            }, 300);
    }, []);

    function searchLikedMovies(searchWord, isShortLiked = false) { // все найденные ф. сохр. в --> отдельный стейт
            if ( isSearchedWordLiked.length > 0 ) {
                const likedMovies = JSON.parse(localStorage.getItem('likedMovies'))

                const moviesOnRender = handleSearch(likedMovies, isSearchedWordLiked, isShortLiked);
                  // console.log('сработал handleSearch(likedMovies, isSearchedWordLiked, isShortLiked)', moviesOnRender)

                if  ( moviesOnRender.length === 0 ) {
                    setErrorSearchApi('Фильмы не найдены');
                }
                else  {
                    setErrorSearchApi('')
                    setFoundLikedMovies(moviesOnRender); // запись всех найденных ф.
                }
            }
        }

    function handleSearch(likedMovies, search, isShortLiked = false) {
        return likedMovies.filter((movie) => {
            let lowCase = search.toLowerCase()
            const searchResult = movie.nameRU.toLowerCase().includes(lowCase) ||
                   movie.nameEN.toLowerCase().includes(lowCase)

            // console.log('searchResult', searchResult)
            if (isShortLiked === false) { // если длинные,
                return searchResult; // => то получаем длинные ф.
            } if (isShortLiked === true) { // если короткие, => то получаем короткие ф.
                return searchResult && (movie.duration <= SHORT_MOVIE)
            }
        })
    }

     /** возвращает коротыши */
    function handleShort(movies) {
        return movies.filter((movie) => {
            return movie.duration <= SHORT_MOVIE;
        });
    }

    function filterShortMovies() { /** сохр. в отдельный стейт коротыши, из найденных ф. */
        setShortMovies(handleShort(isFoundLikedMovies));
    }

    return (
        <main className='content'>
            <section className='saved-movies'>

                <SearchForm
                    onSubmitLikedMovies={searchLikedMovies}

                    isSearchedWordLiked={isSearchedWordLiked}
                    setSearchedWordLiked={setSearchedWordLiked}

                    isShortLiked={isShortLiked}
                    setShortLiked={setShortLiked}
                    searchKey={'searchedWordLiked'}
                    type={ type }
                />

                { isLoading
                    ? <span className='preloader'>
                        <Preloader />
                    </span>
                    : <MoviesCardList
                        type={ type }
                        renderLikedMovies={!isSearchedWordLiked ? isShortLiked ? isShortMovies : likedMovies
                            : isShortLiked ? isShortMovies : isFoundLikedMovies}
                        likedMovies={ likedMovies }

                        errorSearchApi={ errorSearchApi }
                        onDeleteCard={ onDeleteCard }

                        onSaveLikedCard={ onSaveLikedCard }
                        isSavedCards={true}
                    />
                }

                <span className='span-box'></span>

            </section>
        </main>
    );
}

export default SavedMovies;
