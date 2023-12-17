// Component for page with movies search.
import {useContext, useEffect} from 'react';
import '../general/content.css';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import LoadingContext from '../../contexts/LoadingContext';

function Movies({
                    type, onSubmit, renderMovies, searchedMovies, shortMovies,
                    filterShortCheckbox, likedMovies, onSaveLikedCard,
                    onDeleteCard, errorSearchApi, isShortStatus, setShortStatus
}) {
    const isLoading = useContext(LoadingContext);
    // console.log(searchedMovies) // приходящий массив отфильтрованных поиском карточек [{},{}]
    // console.log(isLikedMovies)

    useEffect(() => {
        // console.log(renderMovies.length)
    },[renderMovies])

    useEffect(() => {
        // прочитать ЛС и записать данные из него в стейт
        // MoviesApi.getAllMovies() // запрос всех фильмов со стороннего АПИ
        // .then((cards) => {
        // setCards(cards)}); // и сохранение их в стейт
    }, [])

    return (
        <main className='content'>
            <section className='movies content__section'>

                <SearchForm
                    onSubmitMovies={ onSubmit }
                    searchKey={'searchedWord'}
                    type={ type }

                    filterShortCheckbox={ filterShortCheckbox }
                    isShortStatus={isShortStatus}
                    setShortStatus={setShortStatus}
                />

                { isLoading
                    ? <span className='preloader'>
                        <Preloader />
                    </span>
                    : <MoviesCardList
                        type={ type }

                        renderMovies={ renderMovies }
                        searchedMovies={ searchedMovies }
                        shortMovies={ shortMovies }

                        likedMovies={ likedMovies }
                        onSaveLikedCard={ onSaveLikedCard }

                        isSavedCards={false}

                        onDeleteCard={ onDeleteCard }
                        errorSearchApi={ errorSearchApi }
                    />
                }

            </section>
        </main>
    );
}

export default Movies;
