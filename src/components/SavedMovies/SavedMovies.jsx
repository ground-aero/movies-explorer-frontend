// component - компонент страницы с сохранёнными карточками фильмов.
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import {useEffect, useState} from "react";

function SavedMovies({ type, searchedCards, savedCards, onDeleteCard }) {
    const [isSavedCard, setIsSavedCard] = useState([]);
    // console.log(savedCards) // приходит с новым полем 'isSaved: true'


    return (
        <main className='content'>
            <section className='saved-movies'>

                <SearchForm />

                <MoviesCardList
                    type={ type }
                    searchedCards={ searchedCards }

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
