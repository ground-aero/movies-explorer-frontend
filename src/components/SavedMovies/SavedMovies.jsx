// component - компонент страницы с сохранёнными карточками фильмов.
import {useContext, useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import LoadingContext from '../../contexts/LoadingContext';
import Preloader from "../Preloader/Preloader.jsx";
import {useLocalStorageState as useStorage} from "../../hooks/useLocalStorageState.jsx";

function SavedMovies({ type, onSubmit, likedMovies, onSaveLikedCard, onDeleteCard, filterShortCheckbox }) {
    const isLoading = useContext(LoadingContext);
    const location = useLocation()

    const [isSearchedWordLiked, setSearchedWordLiked] = useStorage('searchedWordLiked', ''); // key = 'searchWord', '' = initial value
    // const [isSearchedWord, setSearchedWord] = useState('');
    const [isShortStatus, setShortStatus] = useStorage('isShort', false); //// !!!!!!!!!!!!
    // const [isShortStatus, setShortStatus] = useState(false);
    // console.log('savedMoviesContext::')
    console.log(likedMovies) // приходит с новым полем 'isSaved: true'
    console.log('isSearchedWord','isShortStatus ::',isSearchedWordLiked, isShortStatus) // приходит с новым полем 'isSaved: true'
    //////////////////////////////////////////////////////////////////////////////////
    ///////// Должен работать поиск. Но сохранять последний поисковый запрос в стейт не требуется.
    // При обновлении страницы должен выводиться полный список сохраненных фильмов.
    // useEffect(() => { // Для /movies: Обновление и фиксирование состояний: поискового слова, и isShort (true/false)
    //     if (location.pathname === '/saved-movies') {
    //         // console.log('isSearchedWord, isShortStatus ::', isSearchedWord, isShortStatus)
    //         // const raw = localStorage.getItem('searchedWord')
    //         setTimeout(() => {
    //             setSearchedWord(isSearchedWord)
    //             setShortStatus(isShortStatus);
    //         }, 300);
    //     }
    // }, []);

    // useEffect(() => { // В зависимости от 'isShort', фильтруем на: длинные или короткие
    //     if (location.pathname === '/saved-movies') {
    //         setTimeout(() => {
    //             if (isShortStatus === true) {
    //                 onSubmit(isSearchedWordLiked, isShortStatus)
    //                 // setIsPlaceholder('Фильм')
    //             }
    //             if (isShortStatus === false) {
    //                 onSubmit(isSearchedWordLiked, isShortStatus)
    //                 // setIsPlaceholder('Фильм')
    //             }
    //         }, 500);
    //     }
    // },[isShortStatus])

    return (
        <main className='content'>
            <section className='saved-movies'>

                <SearchForm
                    filterShortCheckbox={ filterShortCheckbox }
                    onSubmitLikedMovies={ onSubmit }

                    searchKey={'searchedWordLiked'}
                    type={ type }
                />

                { isLoading
                    ? <span className='preloader'>
                        <Preloader />
                    </span>
                    : <MoviesCardList
                        type={ type }
                        // searchedMovies={ searchedMovies }

                        // savedMoviesContext={ savedMoviesContext }
                        onSaveLikedCard={onSaveLikedCard}
                        onDeleteCard={onDeleteCard}
                        isSavedCards={true}
                    />
                }

                <span className='span-box'></span>

            </section>
        </main>
    );
}

export default SavedMovies;
