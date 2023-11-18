// Component for page with movies search.
import {useContext, useEffect} from 'react';
import '../general/content.css';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import LoadingContext from '../../contexts/LoadingContext';

function Movies({ searchedMovies, type, onSubmit, onSaveLikedCard, savedCards, errorSearchApi }) {
    const isLoading = useContext(LoadingContext);
    // console.log(searchedMovies) // приходящий массив отфильтрованных поиском карточек [{},{}]
    // console.log(savedCards)

    useEffect(() => {
        // console.log(isLoading)
        // console.log(searchedMovies.length)
    },[searchedMovies])

    useEffect(() => {
        // прочитать ЛС и записать данные из него в стейт

        // moviesApi.getAllMovies() // запрос всех фильмов со стороннего АПИ
        // .then((cards) => {
        // setCards(cards)}); // и сохранение их в стейт
    }, [])


    return (
        <main className='content'>
            <section className='movies content__section'>

                <SearchForm onSubmit={ onSubmit } />

                { isLoading
                    ? <span className='preloader'>
                        <Preloader />
                    </span>
                    : <MoviesCardList
                        type={ type }
                        searchedMovies={ searchedMovies }
                        onSaveLikedCard={onSaveLikedCard}
                        isSavedCards={false}
                        savedCards={savedCards}
                        errorSearchApi={ errorSearchApi }
                    />
                }

            </section>
        </main>
    );
}

export default Movies;
