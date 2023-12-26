// component - компонент страницы с сохранёнными карточками фильмов.
import {useContext, useState, useEffect} from 'react';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import LoadingContext from '../../contexts/LoadingContext';
import Preloader from "../Preloader/Preloader.jsx";
import {useLocalStorageState as useStorage} from '../../hooks/useLocalStorageState';

function SavedMovies({ type, onSubmit, likedMovies, temporaryLikedMovies, onSaveLikedCard, onDeleteCard, filterShortCheckbox, errorSearchApi }) {
    const isLoading = useContext(LoadingContext);
    const [isSearchedWordLiked, setSearchedWordLiked] = useStorage('searchedWordLiked', ''); // key = 'searchWord', '' = initial value
    const [isShortStatus, setShortStatus] = useStorage('isShort', false);
    const [isLikedMovies, setLikedMovies] = useState([]);

    useEffect(() => { // Для /savedMovies
        const likedMovies = localStorage.getItem('likedMovies' || []);
        if (likedMovies) {
            const savedCard = JSON.parse(likedMovies)
            setLikedMovies(savedCard.reverse()) // сохраняем их в стейт для текщуего рендеринга
              console.log(isLikedMovies)
        }
    }, [])

    return (
        <main className='content'>
            <section className='saved-movies'>

                <SearchForm
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

                        isLikedMovies={ likedMovies }
                        temporaryLikedMovies={ temporaryLikedMovies }
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
