// Component for page with movies search.
import {useEffect} from 'react';
import '../general/content.css';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ cards, type, onGetMovies, errorApi, isLoading }) {

    useEffect(() => {
        // console.log(isLoading)
        console.log(cards.length)
    },[cards.length])

    return (
        <main className='content'>
            <section className='movies content__section'>

                <SearchForm onGetMovies={ onGetMovies } />

                { (isLoading && cards.length)
                    ? <span className='preloader'>
                        <Preloader />
                    </span>
                    : <MoviesCardList type={ type } cards={ cards } errorApi={ errorApi } isLoading={ isLoading }/>
                }

            </section>
        </main>
    );
}

export default Movies;
