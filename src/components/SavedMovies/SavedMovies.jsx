// component - компонент страницы с сохранёнными карточками фильмов.
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies({ type, searchedCards, savedCards, onSaveCard }) {

    console.log(savedCards)
    return (
        <main className='content'>
            <section className='saved-movies'>

                <SearchForm />

                <MoviesCardList type={ type } searchedCards={ searchedCards }
                                onSaveCard={onSaveCard} savedCards={savedCards}/>

                <span className='span-box'></span>

            </section>
        </main>
    );
}

export default SavedMovies;
