// Component for page with movies search.
import '../general/content.css';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies({ cards, type, onGetMovies, errorApi, isLoading }) {
    const state = {cards: []}
    console.log(state)

    return (
        <main className='content'>
            <section className='movies content__section'>

                <SearchForm onGetMovies={ onGetMovies } />

                    <MoviesCardList type={ type } cards={ cards } onGetMovies={ onGetMovies }
                                    errorApi={ errorApi } isLoading={ isLoading }/>

                {/*<Preloader />*/}

            </section>
        </main>
    );
}

export default Movies;
