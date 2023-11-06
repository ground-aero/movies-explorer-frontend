// component for page with movies search.
import {useState, useEffect} from 'react';
import '../general/content.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({ onGetMovies }) {

    const [isSearch, setIsSearch] = useState('');
    const [isPlaceholder, setIsPlaceholder] = useState('Фильм');

    useEffect(() => {
        console.log(isSearch)
    },[isSearch])

    function handleSearch(evt) {
        setIsSearch(evt.target.value)
    }

    /** загрузить карточки фильмов из сервиса: beatfilm-movies, по сабмиту */
    function handleSubmit(evt) {
        evt.preventDefault()
        if (isSearch) onGetMovies()
        else setIsPlaceholder('Введите запрос')
    }

    return (
            <form className='search search_form' id='search' name='search'
                  onSubmit={handleSubmit}>
                <span className='search__wrap'>
                    <input type='text' className='search__input' id='search-input' name='search' placeholder={isPlaceholder}
                        onChange={handleSearch} value={isSearch}
                    />
                    <button type='submit' className='search__btn'>Найти</button>
                </span>

                <FilterCheckbox />

            </form>
    );
}

export default SearchForm;
