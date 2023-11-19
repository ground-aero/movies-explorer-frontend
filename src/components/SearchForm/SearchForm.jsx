// component for page with movies search.
import {useState, useEffect, useContext} from 'react';
import {useLocation} from 'react-router-dom';
import '../general/content.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import LoadingContext from '../../contexts/LoadingContext.jsx';

function SearchForm({ onSubmit, isSearchWord, setSearchedWord, isShortStatus, setShortStatus }) {
    const isLoading = useContext(LoadingContext);
    const location = useLocation()


    // const [isSearchWord, setSearchedWord] = useState('');

    const [isPlaceholder, setIsPlaceholder] = useState('Фильм');

    // useEffect(() => {
    //     if (location.pathname === '/movies') {
    //         const SearchWord = localStorage.getItem('searchedWord' || []); // проверяем наличие поискового слова в ЛС
    //         if (SearchWord) {
    //             setSearchedWord(JSON.parse(SearchWord)) // если есть, из ЛС перезаписываем его в стейт для рендеринга
    //         }
    //     }
    //       // console.log(SearchWord)
    // },[])

    // useEffect(() => {
    //     if (location.pathname === '/movies') {
    //         if (localStorage.getItem('searchWord')) {
    //             setSearchedWord(localStorage.getItem('searchWord'));
    //         }
    //     }
    // }, []);

    function handleInput(evt) {
        setSearchedWord(evt.target.value) // текущее поисковое слово из инпута держим в стейте
    }

    // useEffect(() => {
    // },[isShortStatus])
        console.log(isSearchWord)

    function handleSubmitSearch(evt) { // по сабмиту 'найти',
        evt.preventDefault()
        // isLoading(true)

        if (location.pathname === '/movies') {
                            // загрузить один раз карточки с Сервера 'beatfilm-movies', ///////////////////
            if (isSearchWord.length) onSubmit(isSearchWord, isShortStatus) // текущее поисковое слово сабмитим на Сервер
            else setIsPlaceholder('Введите запрос')

            // localStorage.setItem('searchedWord', JSON.stringify(isSearchWord)) // и сразу сохраняем его в ЛС
        }
    }
    // function handleSubmitSearch(evt) { // по сабмиту 'найти',
    //     evt.preventDefault()
    //     console.log(isLoading)
    //
    //     if (location.pathname === '/movies') {
    //         // загрузить один раз карточки с Сервера 'beatfilm-movies', ///////////////////
    //         if (isSearchWord) props.onSubmit(isSearchWord) // текущее поисковое слово сабмитим на Сервер
    //         else setIsPlaceholder('Введите запрос')
    //
    //         localStorage.setItem('searchedWord', JSON.stringify(isSearchWord)) // и сразу сохраняем его в ЛС
    //     }
    // }

    function saveSearchWord(searchWord) {
        // localStorage.removeItem('searchedWord')
        localStorage.setItem('searchedWord', JSON.stringify(searchWord))
        setSearchedWord(searchWord)
    }

    return (
            <form className='search search_form' id='search' name='search'
                  onSubmit={ handleSubmitSearch }>
                <span className='search__wrap'>
                    <input type='text' value={isSearchWord} className='search__input' id='search-input' name='search' placeholder={isPlaceholder}
                        onChange={handleInput}
                    />
                    <button type='submit' className='search__btn'>Найти</button>
                </span>

                <FilterCheckbox isShortStatus={ isShortStatus } setShortStatus={ setShortStatus }/>

            </form>
    );
}

export default SearchForm;
