// component for page with movies search.
import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import '../general/content.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import { useLocalStorageState as useStorage } from '../../hooks/useLocalStorageState';

function SearchForm({ type, onSubmitMovies, onSubmitLikedMovies,
                        isSearchedWordLiked, setSearchedWordLiked, isShortLiked, setShortLiked }) {
    const location = useLocation()

    const [isPlaceholder, setIsPlaceholder] = useState('Фильм');
    const [isSearchedWord, setSearchedWord] = useStorage('searchedWord', ''); // key = 'searchWord', '' = initial value
    const [isShortStatus, setShortStatus] = useStorage('isShort', false);

    // ------------------ ( movies ) ---------------------------------------------------------------------------------

    useEffect(() => { // '/movies' : Обновление и сохр. состояний: поискового слова, и isShort (true/false)
        if (location.pathname === '/movies') {
            const query = JSON.parse(localStorage.getItem('searchedWord')) // 'searchedWord'
            setTimeout(() => {
                setShortStatus(isShortStatus);
                if (query) setSearchedWord(query)
            }, 350);
        }
    }, []);
    //
    useEffect(() => { // Фильтруем на: длинные или короткие, в зависимости от стейта 'isShort',
        if (location.pathname === '/movies') {
            setTimeout(() => {
                if (isShortStatus === false && isSearchedWord?.length) {
                    onSubmitMovies(isSearchedWord, isShortStatus)
                }
                if (isShortStatus === true && isSearchedWord?.length) {
                    onSubmitMovies(isSearchedWord, isShortStatus)
                }
            }, 300);
        }
    },[isShortStatus])

    function handleInput(evt) {
        if (location.pathname === '/movies') {
            localStorage.setItem('searchedWord', JSON.stringify(evt.target.value)) // сохраняем искомое слово в ЛС
            setSearchedWord(evt.target.value)
        } else {
            setSearchedWordLiked(evt.target.value)
        }
    }

    function handleSubmitSearch(evt) { // По сабмиту 'найти по: искомому слову + 'коротыши или длинные'
        evt.preventDefault();
        if (location.pathname === '/movies') {
        const searchedWord = JSON.parse(localStorage.getItem('searchedWord')) // достаем 'searchedWord' из ЛС
        const shortStatus = JSON.parse(localStorage.getItem('isShort'))
            // console.log('isShortStatus, isSearchedWord::', isShortStatus, searchedWord)

        if (searchedWord) onSubmitMovies(searchedWord, shortStatus) // текущее поисковое слово сабмитим на Сервер
        else setIsPlaceholder('Введите запрос')
        }
        // '/saved-movies'
        if (location.pathname === '/saved-movies') {
            if (isSearchedWordLiked) onSubmitLikedMovies(isSearchedWordLiked, isShortLiked) // текущее поисковое слово сабмитим на Сервер
            else setIsPlaceholder('Введите запрос')
        }
    }

    function toggleCheckbox() { // тоггл состояния бокса
        if (location.pathname === '/movies') {
            setShortStatus(prev => !prev);
            localStorage.setItem('isShort', JSON.stringify(isShortStatus)) // сохр. стейт в ЛС
        }
        if (location.pathname === '/saved-movies') {
            setShortLiked(prev => !prev)
        }
    }

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
                                : isShortLiked }
                toggleCheckbox={ toggleCheckbox }
            />

        </form>
    );
}

export default SearchForm;
