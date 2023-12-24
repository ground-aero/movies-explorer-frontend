// component for page with movies search.
import {useState, useEffect, useContext} from 'react';
import {useLocation} from 'react-router-dom';
import '../general/content.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import LoadingContext from '../../contexts/LoadingContext.jsx';
import { useLocalStorageState as useStorage } from '../../hooks/useLocalStorageState';

function SearchForm({ type, onSubmitMovies, onSubmitLikedMovies, searchKey, filterShortCheckbox }) {
    const isLoading = useContext(LoadingContext);
    const location = useLocation()

    const [isSearchedWord, setSearchedWord] = useStorage('searchedWord', ''); // key = 'searchWord', '' = initial value
    // const [isSearchedWord, setSearchedWord] = useState('');
    const [isShortStatus, setShortStatus] = useStorage('isShort', false);
    const [isShortStatusLiked, setShortStatusLiked] = useState(false);
    const [isSearchedWordLiked, setSearchedWordLiked] = useStorage('searchedWordLiked', ''); // key = 'searchWord', '' = initial value
    const [isPlaceholder, setIsPlaceholder] = useState('Фильм');
    // console.log('isSearchedWord, isShortStatus::', isSearchedWord, isShortStatus)

    // ------------------ ( general ) -------------------------------------------------------------------------------

    useEffect(() => { // '/movies' : Обновление и сохранение состояний: поискового слова, и isShort (true/false)
        if (location.pathname === '/movies') {
            // console.log('isSearchedWord, isShortStatus ::', isSearchedWord, isShortStatus)
            const query = localStorage.getItem('searchedWord') // 'searchedWord', или 'searchedWordLiked'
            setTimeout(() => {
                setShortStatus(isShortStatus);
                if (query) setSearchedWord(JSON.parse(query))
            }, 350);
        }
    }, []);

    // useEffect(() => { // '/movies' : Обновление и фиксирование состояний: поискового слова, и isShort (true/false)
    //     if (location.pathname === '/movies') {
    //         setTimeout(() => {
    //         const raw = localStorage.getItem('searchedWord')
    //         setSearchedWord(JSON.parse(raw))
    //         }, 200);
    //     }
    // }, []);

    // ------------------ ( movies ) ---------------------------------------------------------------------------------

    useEffect(() => { // Фильтруем на: длинные или короткие, в зависимости от стейта 'isShort',
        // console.log('isSearchedWord, isShortStatus::', isSearchedWord, isShortStatus) // верно
        if (location.pathname === '/movies') {
            setTimeout(() => {
                if (isShortStatus === true && isSearchedWord) {
                    onSubmitMovies(isSearchedWord, isShortStatus)
                    setIsPlaceholder('Фильм')
                }
                if (isShortStatus === false && isSearchedWord) {
                    onSubmitMovies(isSearchedWord, isShortStatus)
                    // setIsPlaceholder('Фильм')
                }
            }, 300);
        }
    },[isShortStatus])

    // ------------------ ( saved-movies ) --------------------------------------------------------------------------

    useEffect(() => { // Обновление и фиксирование состояний: поискового слова, и isShort (true/false)
        if (location.pathname === '/saved-movies') {
            setTimeout(() => {
                setSearchedWordLiked('')
                setShortStatusLiked(isShortStatusLiked);

            }, 200);
        }
    }, []);

    useEffect(() => { // Фильтруем на: длинные или короткие, в зависимости от стейта 'isShort',
        // console.log('isSearchedWord, isShortStatus::', isSearchedWord, isShortStatus) // верно
        if (location.pathname === '/saved-movies') {
            setTimeout(() => {
                if (isShortStatusLiked === true && isSearchedWordLiked) {
                    onSubmitLikedMovies(isSearchedWordLiked, isShortStatusLiked)
                    setIsPlaceholder('Фильм')
                }
                if (isShortStatusLiked === false && isSearchedWordLiked) {
                    onSubmitLikedMovies(isSearchedWordLiked, isShortStatusLiked)
                    // setIsPlaceholder('Фильм')
                }
            }, 300);
        }
    },[isShortStatusLiked])

    function handleInput(evt) {
        if (location.pathname === '/movies') {
            setSearchedWord(evt.target.value)
        } else {
            setSearchedWordLiked(evt.target.value)
        }
          console.log(isSearchedWord, isSearchedWordLiked)
    }

    function handleSubmitSearch(evt) { // По сабмиту 'найти по: искомому слову + 'коротыши или длинные'
        evt.preventDefault();
        if (location.pathname === '/movies') {
          console.log('isShortStatus, isSearchedWord::', isShortStatus, isSearchedWord)
        localStorage.setItem('searchedWord', JSON.stringify(isSearchedWord)) // и сразу сохраняем его в ЛС

        if (isSearchedWord) onSubmitMovies(isSearchedWord, isShortStatus) // текущее поисковое слово сабмитим на Сервер
        else setIsPlaceholder('Введите запрос')
        }
        // '/saved-movies'
        if (location.pathname === '/saved-movies') {
            if (isSearchedWordLiked) onSubmitLikedMovies(isSearchedWordLiked, isShortStatusLiked) // текущее поисковое слово сабмитим на Сервер
            else setIsPlaceholder('Введите запрос')
        }
    }

    function toggleCheckbox() { // тоггл состояния бокса
        if (location.pathname === '/movies') {
            setShortStatus(prev => !prev);
            localStorage.setItem('isShort', JSON.stringify(isShortStatus)) // сохр. стейт в ЛС
        }
        if (location.pathname === '/saved-movies') {
            setShortStatusLiked(prev => !prev)
        }
    }
      // console.log(isShortStatusLiked)

    return (
        <form onSubmit={ handleSubmitSearch } className='search search_form' id='search' name='search' >
                <span className='search__wrap'>
                    <input type='text' value={
                        type === 'movies'
                        ? isSearchedWord || ''
                        : isSearchedWordLiked || ''
                    } className='search__input' id='search-input' name='search' placeholder={isPlaceholder}
                           onChange={ handleInput }
                    />
                    <button type='submit' className='search__btn'>Найти</button>
                </span>

            <FilterCheckbox
                isShortStatus={ type === 'movies'
                                ? isShortStatus
                                : isShortStatusLiked }
                toggleCheckbox={ toggleCheckbox }
            />

        </form>
    );
}

export default SearchForm;
