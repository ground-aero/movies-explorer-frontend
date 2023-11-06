// component for page with movies search.
import '../general/content.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({ onGetMovies }) {



    /** загрузить карточки фильмов из сервиса: beatfilm-movies, по сабмиту */
    function handleSubmit(evt) {
        evt.preventDefault()
        onGetMovies()
    }

    return (
            <form className='search search_form' id='search' name='search'
                  onSubmit={handleSubmit}>
                <span className='search__wrap'>
                    <input type='text' className='search__input' id='search-input' name='search' placeholder='Фильм'/>
                    <button type='submit' className='search__btn'>Найти</button>
                </span>

                <FilterCheckbox />

            </form>
    );
}

export default SearchForm;
