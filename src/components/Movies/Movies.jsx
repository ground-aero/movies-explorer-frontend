// component for page with movies search.
import React from 'react';
import '../general/content.css';
import SearchForm from '../SearchForm/SearchForm.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import MoviesCardList from './MoviesCardList/MoviesCardList.jsx';
// import MoviesCard from './MoviesCard/MoviesCard.jsx';
/*import './Movies.css';*/

function Movies() {
    return (
        <section className='movies content__section'>
            <h3>MOVIES SEC: SearchForm, Preloader, MoviesCardList, MoviesCard</h3>

            <SearchForm />

            <Preloader />

            <MoviesCardList />



        </section>
    );
}

export default Movies;
