// sub-component for page with movies search.
import {useState, useEffect} from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ isShortStatus, setShortStatus }) {
    // const [isShortStatus, setShortStatus] = useState(false);
    // const [isMovieSearch, setIsMovieSearch] = useState(false);
    // function toggleBox() { isMovieSearch ? setIsMovieSearch(false) : setIsMovieSearch(true)}

    /**  Тезисы:
     * — поиск состоит из 2 составляющих: строки поиска и фильтра. Они работают в совокупности.
     *    Поисковый запрос выдает фильмы. Фильтр сортирует их. Если введен новый запрос, но НЕ НАЖАТА кнопка поиска, а нажат фильтр, то новый поиск будет по КОМБИНАЦИИ этих новых параметров.
     * — после первого сабмита чекбокс при переключении начинает вызывать поиск
     * */

    // 2.
    // useEffect(() => {
    //     if (!isShortStatus) {
    //         const isShortString = localStorage.getItem('isShort') /** проверка истории значения */
    //         const shortBool = JSON.parse(isShortString)
    //         setShortStatus(!shortBool) // перезапись значения
    //     }
    // },[isShortStatus])

    // 1.
    const handleToggleCheckbox = () => {
        setShortStatus(!isShortStatus); // зависит от стейта 'setShortStatus', на стр.
        localStorage.setItem('isShort', JSON.stringify(isShortStatus))
    }
    // const handleToggleCheckbox = () => {
    //     isShortStatus ? setShortStatus(false) : setShortStatus(true);
    // };


    return (
        <div className='filter filter_checkbox'>

            <div className='filter__wrap'>
                <input type='checkbox' className='filter__checkbox' id='filter-short'
                    // value={ isShortStatus }
                    onChange={handleToggleCheckbox}
                    checked={ isShortStatus }
                />
            </div>
            <label className='filter__header' htmlFor='filter-short'>Короткометражки</label>

        </div>
    );
}

export default FilterCheckbox;
