// component - компонент страницы с сохранёнными карточками фильмов.
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import {useEffect, useState} from "react";

function SavedMovies({ type, searchedCards, savedCards, onSaveCard }) {
    const [isSavedCard, setIsSavedCard] = useState([]);
    // console.log(savedCards) // приходит с новым полем 'isSaved: true'


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
