// sub-component for page with movies search.
import './FilterCheckbox.css';
import {useState} from "react";

function FilterCheckbox() {

    const [isMovieSearch, setIsMovieSearch] = useState(false);
    function toggleBox() { isMovieSearch ? setIsMovieSearch(false) : setIsMovieSearch(true)}

    return (
        <div className='filter filter_checkbox'>

            <div className='filter__wrap'>
                <input className='filter__checkbox' onChange={toggleBox} type='checkbox' id='filter-short'/>
                {/*<button className='filter__checkbox'></button>*/}
            </div>
            <h5 className='filter__header'>Короткометражки</h5>
            {/*<h5>/span/ FilterCheckbox --> for DIV -SearchForm.</h5>*/}
            {/*FilterCheckbox - // внутри SearchForm // фильтр с чекбоксом «Только короткометражки» */}

        </div>
    );
}

export default FilterCheckbox;
