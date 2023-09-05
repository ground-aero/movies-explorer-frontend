// component for page with movies search.
import React from 'react';
import '../general/content.css';
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox.jsx";
/*import './SearchForm.css';*/

function SearchForm() {
    return (
        <div className='search-form'>
            <h4>DIV - SearchForm. with inside /span/ FilterCheckbox</h4>
            {/*FilterCheckbox - // внутри SearchForm // фильтр с чекбоксом «Только короткометражки»
            отд. управляемыq компонент FilterCheckbox */}
            <FilterCheckbox/>

        </div>
    );
}

export default SearchForm;
