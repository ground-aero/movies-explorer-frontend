// component - компонент страницы с сохранёнными карточками фильмов.
import {useEffect, useState, useContext} from 'react';
import LoadingContext from '../../contexts/LoadingContext';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies({ type, searchedMovies, isLikedMovies, onDeleteCard }) {
    const isLoading = useContext(LoadingContext);

    const [isSavedCard, setIsSavedCard] = useState([]);
    // console.log(isLikedMovies) // приходит с новым полем 'isSaved: true'


    if (isLoading) {
        return <Preloader/>;
    } else return (
        <main className='content'>

            <section className='saved-movies'>

                <SearchForm />

                <MoviesCardList
                    type={ type }
                    searchedMovies={ searchedMovies }

                    isSavedCards={true}
                    isLikedMovies={isLikedMovies}
                    onDeleteCard={onDeleteCard}
                />

                <span className='span-box'></span>

            </section>
        </main>
    );
}

export default SavedMovies;
