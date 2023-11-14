// component for page with movies search.
import {useState, useEffect} from 'react';
import '../general/content.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({ onSearchMovies }) {

    const [isSearchWord, setIsSearchWord] = useState('');
    const [isPlaceholder, setIsPlaceholder] = useState('Фильм');
    const [isSearchStory, setIsSearchStory] = useState('')

    useEffect(() => {
        const SearchWord = localStorage.getItem('SearchWord'); /** проверка истории поиска */
        if (SearchWord) {
            const searchWord = JSON.parse(SearchWord)
            setIsSearchWord(searchWord) // перезапись поискового слова из истории поиска
        }
          // console.log(SearchWord)
    },[])

    function handleInput(evt) {
        setIsSearchWord(evt.target.value)
    }

    /** загрузить карточки фильмов из сервиса: beatfilm-movies, по сабмиту */
    function handleSubmit(evt) {
        evt.preventDefault()
        if (isSearchWord) onSearchMovies(isSearchWord)
        else setIsPlaceholder('Введите запрос')

        localStorage.setItem('SearchWord', JSON.stringify(isSearchWord))
        // saveSearchWord()
    }

    function saveSearchWord(searchWord) {
        // localStorage.removeItem('SearchWord')
        localStorage.setItem('SearchWord', JSON.stringify(searchWord))
        setIsSearchWord(searchWord)
    }

    return (
            <form className='search search_form' id='search' name='search'
                  onSubmit={handleSubmit}>
                <span className='search__wrap'>
                    <input type='text' value={isSearchWord} className='search__input' id='search-input' name='search' placeholder={isPlaceholder}
                        onChange={handleInput}
                    />
                    <button type='submit' className='search__btn'>Найти</button>
                </span>

                <FilterCheckbox />

            </form>
    );
}

export default SearchForm;
