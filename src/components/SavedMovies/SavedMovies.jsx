// component - компонент страницы с сохранёнными карточками фильмов.
import React from 'react';
import '../general/content.css';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.jsx';
import './SavedMovies.css';

function SavedMovies() {
    return (
        <section className='saved-movies content__section'>
            <h3>SAVED MOVIES </h3>

            <MoviesCardList/>

        </section>
    );
}

export default SavedMovies;
