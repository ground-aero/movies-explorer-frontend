// Component for page with movies search.
import {useEffect} from 'react';
import '../general/content.css';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ searchedCards, allCards, type, onGetMovies, onSearchMovies, onSaveCard, errorSearchApi, isLoading }) {
    // console.log(searchedCards) // приходящий массив отфильтрованных поиском карточек [{},{}]
    // console.log(allCards)

    // useEffect(() => {
    //     // console.log(isLoading)
    //     console.log(searchedCards.length)
    // },[searchedCards.length])

    return (
        <main className='content'>
            <section className='movies content__section'>

                <SearchForm onSearchMovies={ onSearchMovies } onGetMovies={ onGetMovies } />

                { isLoading
                    ? <span className='preloader'>
                        <Preloader />
                    </span>
                    : <MoviesCardList type={ type } searchedCards={ searchedCards } allCards={allCards} onSaveCard={onSaveCard} errorSearchApi={ errorSearchApi } isLoading={ isLoading }/>
                }

            </section>
        </main>
    );
}

export default Movies;
