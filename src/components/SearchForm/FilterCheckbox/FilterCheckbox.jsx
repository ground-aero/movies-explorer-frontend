// sub-component for page with movies search.
import './FilterCheckbox.css';

function FilterCheckbox() {
    return (
        <div className='filter filter_checkbox'>

            <span className='filter__wrap'>
                <button className='filter__btn'></button>
                <h5 className='filter__header'>Короткометражки</h5>

            </span>
            {/*<h5>/span/ FilterCheckbox --> for DIV -SearchForm.</h5>*/}
            {/*FilterCheckbox - // внутри SearchForm // фильтр с чекбоксом «Только короткометражки» */}

        </div>
    );
}

export default FilterCheckbox;
