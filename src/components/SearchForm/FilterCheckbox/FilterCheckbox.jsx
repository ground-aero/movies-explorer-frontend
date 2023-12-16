// sub-component for page with movies search.
import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import './FilterCheckbox.css';

function FilterCheckbox({ isShortStatus, toggleCheckbox }) {
    const location = useLocation();

    // console.log('isShortStatus:;:',isShortStatus)
    // const [isMovieSearch, setIsMovieSearch] = useState(false);
    // function toggleBox() { isMovieSearch ? setIsMovieSearch(false) : setIsMovieSearch(true)}

    /**  Тезисы:
     * — поиск состоит из 2 составляющих: строки поиска и фильтра. Они работают в совокупности.
     *    Поисковый запрос выдает фильмы. Фильтр сортирует их. Если введен новый запрос, но НЕ НАЖАТА кнопка поиска, а нажат фильтр, то новый поиск будет по КОМБИНАЦИИ этих новых параметров.
     * — после первого сабмита чекбокс при переключении начинает вызывать поиск
     * */

    // useEffect(() => {
    //     if (localStorage.getItem('isShort') === 'true') setShortStatus(true);
    //     else setShortStatus(false);
    // }, []);

    // useEffect(() => { // ЭТОТ ЭФФЕКТ ВООБЩЕ НЕ СРАБАТЫВАЕТ !!!!!!!!!!
    //     if (location.pathname === '/movies' || location.pathname === '/saved-movies') {
    //
    //         if (isShortStatus) { // если false =>
    //             console.log(isShortStatus)
    //             const isShortString = localStorage.getItem('isShort') // достаем из ЛС false,
    //             const shortBool = JSON.parse(isShortString)
    //             setShortStatus(shortBool) // перезаписываем значение в стейт
    //         }
    //         filterShortCheckbox() // записываем короткометражки [] в стейт isSearchedMovies и в ЛС
    //     }
    // },[])
    // isShortStatus

    // 1.
    // const toggleCheckbox = () => {
    //     setShortStatus(!isShortStatus); // 1. реверсировать
    //     console.log(isShortStatus)
    //     // console.log(isShortStatus) // норм !
    //     localStorage.setItem('isShort', JSON.stringify(isShortStatus))
    //
    //     // setShortStatus(!isShortStatus)
    // }

    return (
        <div className='filter filter_checkbox'>

            <div className='filter__wrap'>
                <input type='checkbox' className='filter__checkbox' id='filter-short'
                    // value={ isShortStatus }
                    onChange={ toggleCheckbox }
                    checked={ !isShortStatus }
                />
            </div>
            <label className='filter__header' htmlFor='filter-short'>Короткометражки</label>

        </div>
    );
}

export default FilterCheckbox;
