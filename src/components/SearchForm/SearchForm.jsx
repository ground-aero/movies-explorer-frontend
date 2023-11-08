// component for page with movies search.
import {useState, useEffect} from 'react';
import '../general/content.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({ onGetMovies, onSearchMovies }) {

    const [isSearchWord, setIsSearchWord] = useState('');
    const [isPlaceholder, setIsPlaceholder] = useState('Фильм');

    useEffect(() => {
        // console.log(isSearchWord)
    },[isSearchWord])

    function handleSearch(evt) {
        setIsSearchWord(evt.target.value)
    }

    /** загрузить карточки фильмов из сервиса: beatfilm-movies, по сабмиту */
    function handleSubmit(evt) {
        evt.preventDefault()
        if (isSearchWord) onSearchMovies(isSearchWord)
        else setIsPlaceholder('Введите запрос')
    }

    return (
            <form className='search search_form' id='search' name='search'
                  onSubmit={handleSubmit}>
                <span className='search__wrap'>
                    <input type='text' value={isSearchWord} className='search__input' id='search-input' name='search' placeholder={isPlaceholder}
                        onChange={handleSearch}
                    />
                    <button type='submit' className='search__btn'>Найти</button>
                </span>

                <FilterCheckbox />

            </form>
    );
}

export default SearchForm;
