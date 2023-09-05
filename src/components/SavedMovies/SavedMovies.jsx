// component - компонент страницы с сохранёнными карточками фильмов.
import React from 'react';
// import '../general/content.css';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.jsx';
import MoviesCard from '../Movies/MoviesCard/MoviesCard.jsx';
import './SavedMovies.css';

function SavedMovies() {
    return (
        <section className='saved-movies'>
            <h3>SAVED MOVIES </h3>

            <MoviesCardList/>
            <MoviesCard/>

        </section>
    );
}

export default SavedMovies;
