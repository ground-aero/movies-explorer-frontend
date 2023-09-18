// Component for page with movies search.
import '../general/content.css';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies() {
    return (
            <section className='movies'>

                <SearchForm />

                <MoviesCardList />

                {/*<Preloader />*/}

            </section>
    );
}

export default Movies;
