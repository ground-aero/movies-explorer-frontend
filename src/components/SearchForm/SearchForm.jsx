// component for page with movies search.
import '../general/content.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
    return (
            <form className='search search_form' name='search' >
                <span className='search__wrap'>
                    <input type='text' className='search__input' placeholder='Фильм'/>
                    <button className='search__btn'>Найти</button>
                </span>

                <FilterCheckbox />

            </form>
    );
}

export default SearchForm;
