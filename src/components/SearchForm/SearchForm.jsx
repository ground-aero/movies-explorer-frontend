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
    // const [isShortStatus, setShortStatus] = useState(false);
    const [isSearchedWordLiked, setSearchedWordLiked] = useStorage('searchedWordLiked', ''); // key = 'searchWord', '' = initial value
    const [isPlaceholder, setIsPlaceholder] = useState('Фильм');
    // console.log('isSearchedWord, isShortStatus::', isSearchedWord, isShortStatus)

    useEffect(() => { // Для /movies: Обновление и фиксирование состояний: поискового слова, и isShort (true/false)
        if (location.pathname === '/movies') {
            // console.log('isSearchedWord, isShortStatus ::', isSearchedWord, isShortStatus)
            const query = localStorage.getItem('searchedWord') // 'searchedWord', или 'searchedWordLiked'
            setTimeout(() => {
                setShortStatus(isShortStatus);
                if (query) {
                    setSearchedWord(JSON.parse(query))
                }
            }, 200);
        }
        if (location.pathname === '/saved-movies') {
            const query = localStorage.getItem('searchedWordLiked') // 'searchedWord', или 'searchedWordLiked'
            setTimeout(() => {
                // setShortStatus(isShortStatus);
                if (query) {
                    setSearchedWordLiked(JSON.parse(query))
                }
            }, 200);
        }
    }, [location.pathname]);

    useEffect(() => { // Для /movies: Обновление и фиксирование состояний: поискового слова, и isShort (true/false)
        if (location.pathname === '/movies') {
            setTimeout(() => {
            const raw = localStorage.getItem('searchedWord')
            setSearchedWord(JSON.parse(raw))
            }, 200);
        }
    }, []);

    useEffect(() => { // Для /movies: Обновление и фиксирование состояний: поискового слова, и isShort (true/false)
        if (location.pathname === '/saved-movies') {
            setTimeout(() => {
                setSearchedWordLiked('')
                setShortStatus(isShortStatus);
            }, 200);
        }
    }, []);
    // useEffect(() => { // Для /movies: Обновление и фиксирование состояний: поискового слова, и isShort (true/false)
    //     if (location.pathname === '/movies') {
    //         const getSearchWord = JSON.parse(localStorage.getItem('searchedWord'))
    //         const getShortStatus = JSON.parse(localStorage.getItem('isShort'))
    //         console.log(getSearchWord)
    //
    //         setTimeout(() => {
    //             setSearchedWord(getSearchWord)
    //             setShortStatus(getShortStatus);
    //         }, 100);
    //     }
    // }, []);
    // location.pathname

    useEffect(() => { // В зависимости от 'isShort', фильтруем на: длинные или короткие
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
    // useEffect(() => { // В зависимости от 'isShort', фильтруем на: длинные или короткие
    //     const getSearchWord = JSON.parse(localStorage.getItem('searchedWord'))
    //     const getShortStatus = JSON.parse(localStorage.getItem('isShort'))
    //         console.log(getSearchWord)
    //         console.log(getShortStatus) // верно
    //     setTimeout(() => {
    //         if (getShortStatus === false) {
    //             onSubmit(getSearchWord,!getShortStatus)
    //             // setIsPlaceholder('Фильм')
    //         } else {
    //             onSubmit(getSearchWord,!getShortStatus)
    //         }
    // }, 500);
    // },[isShortStatus])

    // useEffect(() => {
    //     if (location.pathname === '/movies') {
    //         if (localStorage.getItem('searchWord')) {
    //             setSearchedWord(localStorage.getItem('searchWord'));
    //         }
    //     }
    // }, []);

    // 2.
    // useEffect(() => {
    //         if (!isShortStatus) { // при изменении значения
    //             const shortString = localStorage.getItem('isShort') // проверяем хранилище
    //             const shortBool = JSON.parse(shortString)
    //             setShortStatus(!shortBool) // обновляем стейт
    //         }
    // },[isShortStatus])
    // console.log('isShortStatus: ',!isShortStatus)

    // useEffect(() => {
    //     // if (location.pathname === '/movies') {
    //     if (isSearchedWord) {
    //         const searchedWord = localStorage.getItem('searchedWord'); // проверяем хранилище
    //         const parsed = JSON.parse(searchedWord)
    //         setSearchedWord(parsed)
    //     }
    //     // если есть, обновляем стейт для рендеринга
    //     // localStorage.setItem('searchedWord', JSON.stringify(searchWord))
    //     // console.log(SearchWord)
    //     // }
    // },[isSearchedWord])
    // // console.log('isSearchedWord:', isSearchedWord)
    //
    // useEffect(() => { // обновляем стейт для инпута
    //     localStorage.setItem('searchedWord', JSON.stringify(isSearchedWord))
    // },[isSearchedWord])

    function handleInput(evt) {
        // if (location.pathname === '/movies') {
        type === 'movies'
            ? setSearchedWord(evt.target.value) // и сразу сохраняем его в ЛС // текущее поисковое слово из инпута держим в стейте
            : setSearchedWordLiked(evt.target.value)
        // }
        console.log(isSearchedWord, isSearchedWordLiked)
    }

    function handleSubmitSearch(evt) { // По сабмиту 'найти по: искомому слову + 'коротыши или длинные'
        evt.preventDefault();
        // if (location.pathname === '/movies') {
        console.log('isShortStatus, isSearchedWord::', isShortStatus, isSearchedWord)
        localStorage.setItem('searchedWord', JSON.stringify(isSearchedWord)) // и сразу сохраняем его в ЛС

        if (isSearchedWord) onSubmitMovies(isSearchedWord, isShortStatus) // текущее поисковое слово сабмитим на Сервер
        else setIsPlaceholder('Введите запрос')
        // }
    }

    //  тоггл состояния бокса
    function toggleCheckbox() {
        setShortStatus(prev => !prev);
        localStorage.setItem('isShort', JSON.stringify(isShortStatus)) // обновляем стейт
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
                isShortStatus={ isShortStatus }
                toggleCheckbox={ toggleCheckbox }
            />

        </form>
    );
}

export default SearchForm;
