// component - компонент страницы с сохранёнными карточками фильмов.
import {useContext, useState, useEffect} from 'react';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import LoadingContext from '../../contexts/LoadingContext';
import Preloader from '../Preloader/Preloader';
import {useLocalStorageState as useStorage} from '../../hooks/useLocalStorageState';
import SavedMoviesContext from '../../contexts/SavedMoviesContext';
import {SHORT_MOVIE} from '../../utils/constants';
import filterSearch from '../../utils/filterSearch';

function SavedMovies({ type, onSubmit, likedMovies, isFoundLikedMovies, setFoundLikedMovies,
                         onSaveLikedCard, onDeleteCard, errorSearchApi, setErrorSearchApi }) {
    const isLoading = useContext(LoadingContext);
    const savedMoviesContext = useContext(SavedMoviesContext);

    const [isLikedMovies, setLikedMovies] = useState([]);
    // const [isSearchedWordLiked, setSearchedWordLiked] = useStorage('searchedWordLiked', ''); // key = 'searchWord', '' = initial value
    const [isSearchedWordLiked, setSearchedWordLiked] = useState('');
    const [isShortLiked, setShortLiked] = useState(false);

    const [isShortMovies, setShortMovies] = useState([]); // коротыши
    const [isCheckboxOn, setIsCheckboxOn] = useState(false);
    // ------------------ ( saved-movies ) -------------------------------------------------------------

    useEffect(() => { // При первом переходе, Отображение всех лайкнутых ф.
        // setLikedMovies(savedMoviesContext)
        setFoundLikedMovies(likedMovies)
          console.log('likedMovies, foundLikedMovies: ', likedMovies, isFoundLikedMovies)
    },[])

    useEffect(() => {
        searchLikedMovies()
        // filterShortMovies()
    }, [isSearchedWordLiked, isShortLiked]);

    useEffect(() => { // Начальное состояние: поискового слова, и isShort (true/false)
            setTimeout(() => {
                setSearchedWordLiked('')
                setShortLiked(isShortLiked);
            }, 300);
    }, []);

    // function searchLikedMovies(value, isShort) { // по сабмиту поиска, храним во временном массиве, для текущ. рендеринга
    //
    //         if (isSearchedWordLiked.length > 0 ) {
    //             // const likedMovies = JSON.parse(localStorage.getItem('likedMovies'))
    //             //       console.log('likedMovies in searchLikedMovies',likedMovies)
    //
    //             // Из массива 'likedMovies' получаем ф. <= по искомому слову + по isShort
    //             const moviesOnRender = filterSearch(likedMovies, value, isShort);
    //             // console.log('liked: moviesOnRender.length', moviesOnRender)
    //
    //             if (moviesOnRender.length === 0) {
    //                 setErrorSearchApi('Фильмы не найдены');
    //             } else {
    //                 setErrorSearchApi('')
    //                 setFoundLikedMovies(moviesOnRender); // запись всех найденных ф.
    //             }
    //             // if (moviesOnRender.length > 0 && isShort === false) { // запись в стейт всех найденных ф.
    //             //     setErrorSearchApi('')
    //             //     setFoundLikedMovies(moviesOnRender);
    //             //       console.log('сработали длинные: isShort, value, filteredData', isShort, value)
    //             // }
    //             // if (moviesOnRender.length > 0 && isShort === true) { // запись коротких найденных ф.
    //             //     setErrorSearchApi('')
    //             //     setFoundLikedMovies(moviesOnRender);
    //             //       console.log('сработали длинные: isShort, value, filteredData', isShort, value)
    //             // }
    //         }
    // }
    function searchLikedMovies(searchWord, isShort) { // все найденные ф. сохр. в --> отдельный стейт
            if ( isSearchedWordLiked.length > 0 ) {
                const likedMovies = JSON.parse(localStorage.getItem('likedMovies'))

                const moviesOnRender = handleSearch(likedMovies, isSearchedWordLiked, isShortLiked);
                  console.log('сработали moviesOnRender(liked)', moviesOnRender)
                if  ( moviesOnRender.length === 0 ) {
                    setErrorSearchApi('Фильмы не найдены');
                }
                else  {
                    setErrorSearchApi('')
                    setFoundLikedMovies(moviesOnRender); // запись всех найденных ф.
                }
            }
        }
    // function searchLikedMovies() { // найденные ф. сохр. в --> отдельный стейт
    //     if ( isSearchedWordLiked.length > 0 ) {
    //         const moviesOnRender = filterSearch(likedMovies, value, isShort);
    //             // handleSearch(likedMovies, isSearchedWordLiked);
    //         if  ( moviesOnRender.length === 0 ) {
    //             setErrorSearchApi('Фильмы не найдены');
    //         } else {
    //             setErrorSearchApi('')
    //             setFoundLikedMovies(moviesOnRender);
    //         }
    //     }
    // }

    function handleSearch(likedMovies, search, isShort = false) {
        return likedMovies.filter((movie) => {
            let lowCase = search.toLowerCase()
            const searchResult = movie.nameRU.toLowerCase().includes(lowCase) ||
                   movie.nameEN.toLowerCase().includes(lowCase)

            if (isShort === false) { // если длинные,
                return searchResult; // => то получаем длинные ф.
            } else { // если короткие, => то получаем короткие ф.
                return searchResult && (movie.duration <= SHORT_MOVIE)
            }
        })
    }

     /** -----------------------------------------------------
      * возвращает коротыши */
    // function handleShort(movies) {
    //     return movies.filter((movie) => {
    //         return movie.duration <= SHORT_MOVIE;
    //     });
    // }

    // function filterShortMovies() { /** сохр. в отдельный стейт коротыши, из найденных ф. */
    //     setShortMovies(handleShort(isFoundLikedMovies));
    // }
    // console.log('isShortMovies(liked)', isShortMovies)

    // function handleClickCheckbox(value) { /** на верх. уровне, созд. управление чекбоксом */
    //     setShortLiked(value); // цель: изменить состояние
    // }
    console.log('isShortLiked', isShortLiked)

    return (
        <main className='content'>
            <section className='saved-movies'>

                <SearchForm
                    // onSubmitLikedMovies={ onSubmit }
                    onSubmitLikedMovies={searchLikedMovies}

                    isSearchedWordLiked={isSearchedWordLiked}
                    setSearchedWordLiked={setSearchedWordLiked}

                    // onClickCheckboxLiked={handleClickCheckbox} // передаем на фильтр-чекбокс ?????
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
                        renderLikedMovies={ !isSearchedWordLiked ? likedMovies :
                                                isSearchedWordLiked ? isFoundLikedMovies :
                                                    !isShortMovies ? likedMovies : isShortMovies }
                        // !isShortMovies ? likedMovies : isShortMovies
                        likedMovies={ likedMovies }
                        // likedMovies={ isLikedMovies }
                        // isFoundLikedMovies={ isFoundLikedMovies }

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
