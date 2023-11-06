// Component for page with movies search.
import '../general/content.css';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader.jsx';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies({ cards, type, onGetMovies, errorApi }) {
    return (
        <main className='content'>
            <section className='movies content__section'>

                <SearchForm onGetMovies={ onGetMovies } />

                <MoviesCardList type={ type } cards={ cards } onGetMovies={ onGetMovies } errorApi={ errorApi }/>

                {/*<Preloader />*/}

            </section>
        </main>
    );
}

export default Movies;
