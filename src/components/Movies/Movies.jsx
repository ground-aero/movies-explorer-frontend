// Component for page with movies search.
import {useEffect} from 'react';
import '../general/content.css';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ cards, type, onGetMovies, onSearchMovies, errorSearchApi, isLoading }) {
    // console.log(isLoading)
    // console.log(cards) // приходят отфильтрованные поиском карточки

    useEffect(() => {
        // console.log(isLoading)
        console.log(cards.length)
    },[cards.length])

    return (
        <main className='content'>
            <section className='movies content__section'>

                <SearchForm onSearchMovies={onSearchMovies} onGetMovies={ onGetMovies } />

                { (isLoading && cards.length)
                    ? <span className='preloader'>
                        <Preloader />
                    </span>
                    : <MoviesCardList type={ type } cards={ cards } errorSearchApi={ errorSearchApi } isLoading={ isLoading }/>
                }

            </section>
        </main>
    );
}

export default Movies;
