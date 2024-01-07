// component - компонент страницы с сохранёнными карточками фильмов.
import {useContext, useState, useEffect} from 'react';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import LoadingContext from '../../contexts/LoadingContext';
import Preloader from '../Preloader/Preloader';
import {useLocalStorageState as useStorage} from '../../hooks/useLocalStorageState';
import SavedMoviesContext from '../../contexts/SavedMoviesContext';

function SavedMovies({ type, onSubmit, likedMovies, tempLikedMovies, onSaveLikedCard, onDeleteCard, errorSearchApi }) {
    const isLoading = useContext(LoadingContext);
    const savedMoviesContext = useContext(SavedMoviesContext);

    const [isLikedMovies, setLikedMovies] = useState([]);
    const [isSearchedWordLiked, setSearchedWordLiked] = useStorage('searchedWordLiked', ''); // key = 'searchWord', '' = initial value

    // ------------------ ( saved-movies ) -------------------------------------------------------------

    useEffect(() => { // При первом переходе на страницу, Отображение всех лайкнутых ф.
        setLikedMovies(savedMoviesContext)
          console.log('isLikedMovies, tempLikedMovies: ', isLikedMovies, tempLikedMovies)
    },[])

    // useEffect(() => { // Для /savedMovies
    //     // const likedMovies = JSON.parse(localStorage.getItem('likedMovies' || []));
    //     if (likedMovies) {
    //         setLikedMovies(likedMovies.reverse()) // сохраняем их в стейт для текщуего рендеринга
    //           console.log(likedMovies)
    //     }
    // }, [])

    return (
        <main className='content'>
            <section className='saved-movies'>

                <SearchForm
                    onSubmitLikedMovies={ onSubmit }

                    isSearchedWordLiked={isSearchedWordLiked}
                    setSearchedWordLiked={setSearchedWordLiked}

                    searchKey={'searchedWordLiked'}
                    type={ type }
                />

                { isLoading
                    ? <span className='preloader'>
                        <Preloader />
                    </span>
                    : <MoviesCardList
                        type={ type }

                        likedMovies={ isLikedMovies }
                        tempLikedMovies={ tempLikedMovies }
                        errorSearchApi={ errorSearchApi }

                        onDeleteCard={ onDeleteCard }

                        onSaveLikedCard={ onSaveLikedCard }
                        isSavedCards={true}
                    />
                }

                <span className='span-box'></span>

            </section>
        </main>
    );
}

export default SavedMovies;
