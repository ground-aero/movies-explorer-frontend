// component for page with movies search.
import '../general/content.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';
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
