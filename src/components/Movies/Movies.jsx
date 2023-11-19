// Component for page with movies search.
import {useContext, useEffect, useState} from 'react';
import Preloader from '../Preloader/Preloader';
import '../general/content.css';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import filterSearch from '../../utils/filterSearch';
import moviesApi from '../../utils/MoviesApi';
import {mutateCards} from '../../utils/utils';
import {SHORT_MOVIE} from '../../utils/constants';
import LoadingContext from "../../contexts/LoadingContext.jsx";

function Movies({ type, onSaveLikedCard, isLikedMovies, onDeleteCard }) {
    const isLoadingContext = useContext(LoadingContext);
    const [isLoading, setIsLoading] = useState(false);
    // console.log(searchedMovies) // приходящий массив отфильтрованных поиском карточек [{},{}]
    // console.log(isLikedMovies)

    const [isRawCards, setRawCards] = useState([]); // [ все карточки ] с Сервера bitFilms, мутированные
    const [isSearchedMovies, setSearchedMovies] = useState([]); // [ найденные(мутиров.) картчки] --> /movies ]
    const [isSearchWord, setSearchedWord] = useState(''); // ?
    const [isShortStatus, setShortStatus] = useState(false); // данные для фильтрации

    const [errorSearchApi, setErrorSearchApi] = useState(null);

    // useEffect(() => {
    //     if (location.pathname === '/movies' && location.pathname === '/saved-movies') {
    //         console.log(isShortStatus)
    //         if (!isShortStatus) {
    //             const isShortString = localStorage.getItem('isShort') /** проверка истории значения */
    //             const shortBool = JSON.parse(isShortString)
    //             setShortStatus(!shortBool) // перезапись значения
    //         }
    //         filterShortMoviesHandler()
    //     }
    // },[isShortStatus])
    // isShortStatus

    useEffect(() => {
        checkLastStorage();
    }, []);

    // useEffect(() => { // проверяем наличие в ЛС сырого массива, Для /movies
    //     const RawCards = localStorage.getItem('rawCards') // проверяем наличие в ЛС загруженных карточек
    //     if (RawCards) setRawCards(JSON.parse(RawCards))
    //     else getRawCardsAndMutate(); // либо запрашиваем их на стороннем Сервере
    // }, []);


    const checkLastStorage = () => { // проверяем и перезаписываем всю текущую инфу из ЛС во все стейты

        const searchedMovies = localStorage.getItem('searchedMovies')
        if (searchedMovies) setSearchedMovies(getLastStorage('searchedMovies'))

        const searchedWord = localStorage.getItem('searchedWord')
        if (searchedWord) setSearchedWord(getLastStorage('searchedWord'))

        const isShort = localStorage.getItem('isShort')
        if (isShort) setShortStatus(getLastStorage('isShort'))
    }

    const getLastStorage = (key) => { // берем из ЛС данные (универсальная)
        return JSON.parse(localStorage.getItem(key));
    }

    // ------------------------------------------------------------------


    function getRawCardsAndMutate() { // загрузка сырого массива фильмов (если они отсутствуют в ЛС)
        setIsLoading(true)
        setErrorSearchApi(null)
        // if (!localStorage.getItem('rawCards')) {
        moviesApi.getAllMovies()
            .then((raw) => { // получаем сырой массив

                const mutatedCards = mutateCards(raw); // мутируем сырой массив карточек
                setRawCards(mutatedCards); // и в стейт
                localStorage.setItem('rawCards', JSON.stringify(mutatedCards)); // и сохраняем в ЛС

                // console.log('isRawCards state from getRawCardsAndMutate():', isRawCards)
                // console.log('mutated card:', mutatedCards)
            })
            .catch(err => console.log('Ошибка при загрузке карточек со стороннего Сервера', err))
            .finally(() => {
                setIsLoading(false)
            })
        // }
        setIsLoading(false)
    }
    // getRawCardsAndMutate()


    function handleSearchedMovies(value, isShortStatus) { // поиск из уже мутированных карточек
        setIsLoading(true)
        setErrorSearchApi(null)
        setSearchedMovies([])

        // если в ЛС есть все сохраненные(мутированные) карточки, то по этому стейту и делаем поиск фильмов,
        //   которые потом загружаем в ЛС и стейт 'searchedMovies'

        if (localStorage.getItem('rawCards')) { // vs // localStorage.getItem('rawCards')

              console.log('there are \'RawCards\' in localStorage (!)')
              console.log('isRawCards',isRawCards)
            // сначала фильтруем фильмы по: 1.вх.карточкам, 2.поиск.слову, 3.статусу isShortStatus

            // прокидываем сырые фильмы для поиска по искомому слову
            const filteredData = filterSearch(isRawCards, value, isShortStatus); // фильруем по короткометражкам: true/false
              // console.log(filteredData)
            if (filteredData.length === 0) {
                setErrorSearchApi('Ничего не найдено')
            } else {
                localStorage.setItem('searchedMovies', JSON.stringify(filteredData)) // пере-запись найденных фильмов в localStorage
                setSearchedMovies(filteredData); // пере-запись массива найденных фильмов в переменную 'cards'

                localStorage.setItem('searchedWord', JSON.stringify(value))
                // setSearchedWord() ////////////////////////

                localStorage.setItem('isShort', isShortStatus) // false/true
                setShortStatus(isShortStatus)
            }
            // const searchedMovies = isRawCards.filter((item) => { // массив найденных фильмов
            //     return (item.nameRU.toLowerCase().includes(value) || item.nameEN.toLowerCase().includes(value))
            // });
            // console.log('From Server: searchedMovies: ', searchedMovies)

        } else { // если нет фильмв в ЛС, то:

            moviesApi.getAllMovies()
                .then((rawCards) => {

                    // console.log('From Server: rawCards: ', rawCards)
                    const mutatedCards = mutateCards(rawCards); // мутируем сырой массив карточек
                    // console.log('mutatedCards : ', mutatedCards)
                    // console.log('mutatedCards/ isRawCards: ', isRawCards)

                    localStorage.setItem('rawCards', JSON.stringify(mutatedCards)); // и сохраняем в ЛС
                    setRawCards(mutatedCards); // и в стейт

                    // прокидываем сырые фильмы для поиска по искомому слову
                    const filteredData = filterSearch(mutatedCards, value, isShortStatus);  // фильруем по короткометражкам: true/false
                      console.log(filteredData)

                    if (filteredData.length) {

                        localStorage.setItem('searchedMovies', JSON.stringify(filteredData)) // пере-запись найденных фильмов в localStorage
                         setSearchedMovies(filteredData); // пере-запись массива найденных фильмов в переменную 'cards'
                        localStorage.setItem('searchedWord', JSON.stringify(value))
                          // setShortStatus(isShortStatus)
                        localStorage.setItem('isShort', isShortStatus) // false/true

                    } else setErrorSearchApi('Ничего не найдено')

                    localStorage.setItem('searchedWord', JSON.stringify(value))
                    // setSearchedWord() ////////////////////////

                    // const searchedMovies = mutatedCards.filter((item) => { // массив найденных фильмов
                    //     return (item.nameRU.toLowerCase().includes(value) || item.nameEN.toLowerCase().includes(value))
                    // });
                    // // console.log('From Server: searchedMovies: ', searchedMovies)
                    // if (searchedMovies.length) {
                    //     setSearchedMovies(searchedMovies); // запись [ найденных/мутир. фильмов] в стейт для /movies
                    //     localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies)) // запись в ЛС
                    // } else setErrorSearchApi('Ничего не найдено')
                })
                .catch((err) => {
                    console.log(`Ошибка поиска фильма: ${err}`)
                    setErrorSearchApi('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. \nПодождите немного и попробуйте ещё раз')
                    let timer = setTimeout(() => {
                        setErrorSearchApi(null)
                        clearTimeout(timer)
                    }, 7000)
                }).finally(() => {
                setIsLoading(false)
            })


        }
        setIsLoading(false)

    }


    function filterShort(movies) { // фильтрует короткометражки на короткий метр: <--- movie < 40
        return movies.filter((movie) => {
            return movie.duration <= SHORT_MOVIE; // 40
        });
    }

    function filterShortMoviesHandler() { // запись в стейт короткометражек
        setSearchedMovies(filterShort(isSearchedMovies));
        localStorage.setItem('searchedMovies', JSON.stringify(isSearchedMovies))
    }

    return (
        <main className='content'>
            <section className='movies content__section'>

                <SearchForm
                    onSubmit={ handleSearchedMovies }

                    isShortStatus={ isShortStatus }
                    setShortStatus={ setShortStatus }
                    isSearchWord={ isSearchWord }
                    setSearchedWord={ setSearchedWord }
                />

                { isLoading
                    ? <span className='preloader'>
                        <Preloader />
                    </span>
                    : <MoviesCardList

                        isSearchedMovies={ isSearchedMovies }
                        isLikedMovies={isLikedMovies}

                        onSaveLikedCard={onSaveLikedCard}
                        onDeleteCard={onDeleteCard}
                        isSavedCards={false}

                        type={ type }
                        errorSearchApi={ errorSearchApi }
                    />
                }

            </section>
        </main>
    );
}

export default Movies;
