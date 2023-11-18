// component for page with movies search.
import {useState, useEffect, useContext} from 'react';
import {useLocation} from 'react-router-dom';
import '../general/content.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import LoadingContext from '../../contexts/LoadingContext.jsx';

function SearchForm(props) {
    const isLoading = useContext(LoadingContext);
    const location = useLocation()

    const [isSearchWord, setIsSearchWord] = useState('');

    const [isPlaceholder, setIsPlaceholder] = useState('Фильм');

    useEffect(() => {
        if (location.pathname === '/movies') {
            const SearchWord = localStorage.getItem('searchedWord' || []); // проверяем наличие поискового слова в ЛС
            if (SearchWord) {
                setIsSearchWord(JSON.parse(SearchWord)) // если есть, из ЛС перезаписываем его в стейт для рендеринга
            }
        }
          // console.log(SearchWord)
    },[])

    useEffect(() => {

    },[])

    function handleInput(evt) {
        setIsSearchWord(evt.target.value) // текущее поисковое слово из инпута держим в стейте
    }


    // async function handleSubmitSearch() {
    //     isLoading(true);
    //     setFoundMovies([]);
    //     try {
    //         if(searchRequest.length > 0) {
    //             const moviesToRender = await handleSearch(initialMovies, searchRequest);
    //             if(moviesToRender.length === 0) {
    //                 setInfoTooltiptext(MOVIES_NOT_FOUND);
    //                 setInfoTooltipPopupOpen(true);
    //             } else {
    //                 setRequestToLocalStorage('lastRequest', searchRequest);
    //                 setRequestToLocalStorage('lastRequestedMovies', moviesToRender);
    //                 setFoundMovies(moviesToRender);
    //                 setRequestToLocalStorage('checkboxState', isCheckboxActive);
    //             }
    //         }
    //         //   else {
    //         //     setInfoTooltiptext(KEYWORD_NOT_FOUND);
    //         //     setInfoTooltipPopupOpen(true);
    //         // }
    //         return
    //     } catch(err) {
    //         console.log(err);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

    function handleSubmitSearch(evt) { // по сабмиту 'найти',
        evt.preventDefault()
        console.log(isLoading)

        if (location.pathname === '/movies') {
                            // загрузить один раз карточки с Сервера 'beatfilm-movies', ///////////////////
            if (isSearchWord) props.onSubmit(isSearchWord) // текущее поисковое слово сабмитим на Сервер
            else setIsPlaceholder('Введите запрос')

            localStorage.setItem('searchedWord', JSON.stringify(isSearchWord)) // и сразу сохраняем его в ЛС

            // при нажатии на поиск в /movies - проверялось ЛС на наличие loadedCards фильмов,,
            // если нет - то загружать массив со стороннего АПИ

            // if () {
            //
            // }

        }
    }

    function saveSearchWord(searchWord) {
        // localStorage.removeItem('searchedWord')
        localStorage.setItem('searchedWord', JSON.stringify(searchWord))
        setIsSearchWord(searchWord)
    }

    return (
            <form className='search search_form' id='search' name='search'
                  onSubmit={handleSubmitSearch}>
                <span className='search__wrap'>
                    <input type='text' value={isSearchWord} className='search__input' id='search-input' name='search' placeholder={isPlaceholder}
                        onChange={handleInput}
                    />
                    <button type='submit' className='search__btn'>Найти</button>
                </span>

                <FilterCheckbox />

            </form>
    );
}

export default SearchForm;
