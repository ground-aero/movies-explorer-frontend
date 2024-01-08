// sub-component for page with movies search.
import './FilterCheckbox.css';

function FilterCheckbox({ isShortStatus, toggleCheckbox }) {

    return (
        <div className='filter filter_checkbox'>

            <div className='filter__wrap'>
                <input type='checkbox' className='filter__checkbox' id='filter-short'
                       checked={ !isShortStatus }
                        // onChange={(evt) => onClick(evt.target.checked) }
                        onChange={ toggleCheckbox }
                />
            </div>
            <label className='filter__header' htmlFor='filter-short'>Короткометражки</label>

        </div>
    );
}

export default FilterCheckbox;
