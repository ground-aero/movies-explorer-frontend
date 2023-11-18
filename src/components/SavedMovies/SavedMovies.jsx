// component - компонент страницы с сохранёнными карточками фильмов.
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import {useEffect, useState} from "react";

function SavedMovies({ type, searchedMovies, savedCards, onDeleteCard }) {
    const [isSavedCard, setIsSavedCard] = useState([]);
    // console.log(savedCards) // приходит с новым полем 'isSaved: true'


    return (
        <main className='content'>
            <section className='saved-movies'>

                <SearchForm />

                <MoviesCardList
                    type={ type }
                    searchedMovies={ searchedMovies }

                    isSavedCards={true}
                    savedCards={savedCards}
                    onDeleteCard={onDeleteCard}
                />

                <span className='span-box'></span>

            </section>
        </main>
    );
}

export default SavedMovies;
