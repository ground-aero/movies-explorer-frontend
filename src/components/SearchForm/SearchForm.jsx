// component for page with movies search.
import '../general/content.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
/*import './SearchForm.css';*/

function SearchForm() {
    return (
        <section className='search-form'>
            <h4>SearchForm(DIV). with inside /span/ FilterCheckbox</h4>
            {/*FilterCheckbox - // внутри SearchForm // фильтр с чекбоксом «Только короткометражки»
            отд. управляемыq компонент FilterCheckbox */}
            <FilterCheckbox />

        </section>
    );
}

export default SearchForm;
