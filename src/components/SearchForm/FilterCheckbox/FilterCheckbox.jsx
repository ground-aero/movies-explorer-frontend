// sub-component for page with movies search.
import './FilterCheckbox.css';

function FilterCheckbox() {

    // const [isMovieSearch, setIsMovieSearch] = useState(false);
    // function toggleBox() { isMovieSearch ? setIsMovieSearch(false) : setIsMovieSearch(true)}

    return (
        <div className='filter filter_checkbox'>

            <div className='filter__wrap'>
                <input className='filter__checkbox' type='checkbox' id='filter-short'/>
            </div>
            <label className='filter__header' htmlFor='filter-short'>Короткометражки</label>
            {/*FilterCheckbox - // внутри SearchForm // фильтр с чекбоксом «Только короткометражки» */}

        </div>
    );
}

export default FilterCheckbox;
