// component - компонент страницы с сохранёнными карточками фильмов.
import {useContext, useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import LoadingContext from '../../contexts/LoadingContext';
import Preloader from "../Preloader/Preloader.jsx";
import {useLocalStorageState as useStorage} from '../../hooks/useLocalStorageState';

function SavedMovies({ type, onSubmit, likedMovies, temporaryLikedMovies, onSaveLikedCard, onDeleteCard, filterShortCheckbox, errorSearchApi }) {
    const isLoading = useContext(LoadingContext);
    const location = useLocation()

    const [isSearchedWordLiked, setSearchedWordLiked] = useStorage('searchedWordLiked', ''); // key = 'searchWord', '' = initial value
    // const [isSearchedWord, setSearchedWord] = useState('');
    const [isShortStatus, setShortStatus] = useStorage('isShort', false); //// !!!!!!!!!!!!
    // const [isShortStatus, setShortStatus] = useState(false);
    const [isLikedMovies, setLikedMovies] = useState([]);
    // console.log('savedMoviesContext::')
        console.log('likedMovies, ', likedMovies) // приходит с новым полем 'isSaved: true'
        console.log('isSearchedWord','isShortStatus, temporaryLikedMovies ::',isSearchedWordLiked, isShortStatus, temporaryLikedMovies) // приходит с новым полем 'isSaved: true'
    //////////////////////////////////////////////////////////////////////////////////
    ///////// Должен работать поиск. Но сохранять последний поисковый запрос в стейт не требуется.
    // При обновлении страницы должен выводиться полный список сохраненных фильмов.
    // useEffect(() => { // Для /movies: Обновление и фиксирование состояний: поискового слова, и isShort (true/false)
    //     if (location.pathname === '/saved-movies') {
    //         // console.log('isSearchedWord, isShortStatus ::', isSearchedWord, isShortStatus)
    //         // const raw = localStorage.getItem('searchedWord')
    //         setTimeout(() => {
    //             setSearchedWord(isSearchedWord)
    //             setShortStatus(isShortStatus);
    //         }, 300);
    //     }
    // }, []);

    useEffect(() => {

    },[])

    useEffect(() => { // Для /savedMovies
        const likedMovies = localStorage.getItem('likedMovies' || []);
        if (likedMovies) { // если в ЛС есть сохраненные карточки,
            const savedCard = JSON.parse(likedMovies)
            setLikedMovies(savedCard.reverse()) // то сохраняем их в стейт для текщуего рендеринга
              console.log(isLikedMovies)
        }
    }, [])

    return (
        <main className='content'>
            <section className='saved-movies'>

                <SearchForm
                    filterShortCheckbox={ filterShortCheckbox }
                    onSubmitLikedMovies={ onSubmit }

                    searchKey={'searchedWordLiked'}
                    type={ type }
                />

                { isLoading
                    ? <span className='preloader'>
                        <Preloader />
                    </span>
                    : <MoviesCardList
                        type={ type }
                        // searchedMovies={ searchedMovies }

                        // savedMoviesContext={ savedMoviesContext }
                        isLikedMovies={ likedMovies }
                        temporaryLikedMovies={ temporaryLikedMovies }
                        errorSearchApi={ errorSearchApi }

                        onDeleteCard={ onDeleteCard }

                        onSaveLikedCard={ onSaveLikedCard } // ??????
                        isSavedCards={true}
                    />
                }

                <span className='span-box'></span>

            </section>
        </main>
    );
}

export default SavedMovies;
