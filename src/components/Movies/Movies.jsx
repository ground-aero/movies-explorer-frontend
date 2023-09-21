// Component for page with movies search.
import '../general/content.css';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader.jsx';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies({ cards, type  }) {
    return (
            <section className='movies content__section'>

                <SearchForm />

                <MoviesCardList type={ type } cards={cards}/>

                {/*<Preloader />*/}

            </section>
    );
}

export default Movies;
