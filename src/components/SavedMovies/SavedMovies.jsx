// component - компонент страницы с сохранёнными карточками фильмов.
import {useContext, useState} from 'react';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import LoadingContext from '../../contexts/LoadingContext';
import Preloader from "../Preloader/Preloader.jsx";

function SavedMovies({ type, onSubmit, likedMovies, onSaveLikedCard, onDeleteCard, filterShortCheckbox }) {
    const isLoading = useContext(LoadingContext);

    console.log(likedMovies) // приходит с новым полем 'isSaved: true'

    //////////////////////////////////////////////////////////////////////////////////
    ///////// Должен работать поиск. Но сохранять последний поисковый запрос в стейт не требуется.
    // При обновлении страницы должен выводиться полный список сохраненных фильмов.


    return (
        <main className='content'>
            <section className='saved-movies'>

                <SearchForm
                    filterShortCheckbox={ filterShortCheckbox }
                    onSubmit={ onSubmit }
                />

                { isLoading
                    ? <span className='preloader'>
                        <Preloader />
                    </span>
                    : <MoviesCardList
                        type={ type }
                        // searchedMovies={ searchedMovies }

                        likedMovies={ likedMovies }
                        onSaveLikedCard={onSaveLikedCard}
                        onDeleteCard={onDeleteCard}
                        isSavedCards={true}
                    />
                }

                <span className='span-box'></span>

            </section>
        </main>
    );
}

export default SavedMovies;
