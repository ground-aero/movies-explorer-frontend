// Component for page with movies search.
import {useContext, useEffect} from 'react';
import '../general/content.css';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import LoadingContext from '../../contexts/LoadingContext';

function Movies({
                    type, onSubmit, renderMovies,
                    likedMovies, onSaveLikedCard, onDeleteCard, errorSearchApi,
                    isShort, setShortStatus, initCount, isAddCount, setIsAddCount
}) {
    const isLoading = useContext(LoadingContext);

    useEffect(() => {

    },[])
    // onSaveLikedCard

    // useEffect(() => {
    // },[renderMovies])

    return (
        <main className='content'>
            <section className='movies content__section'>

                <SearchForm
                    onSubmitMovies={ onSubmit }
                    searchKey={'searchedWord'}
                    type={ type }

                    isShortStatus={isShort}
                    setShortStatus={setShortStatus}
                />

                { isLoading
                    ? <span className='preloader'>
                        <Preloader />
                    </span>
                    : <MoviesCardList
                        type={ type }
                        renderMovies={ renderMovies }
                        initCount={initCount}
                        isAddCount={ isAddCount }
                        setIsAddCount={ setIsAddCount }

                        likedMovies={ likedMovies }
                        onSaveLikedCard={ onSaveLikedCard }

                        isShort={isShort}
                        isSavedCards={false}

                        onDeleteCard={ onDeleteCard }
                        errorSearchApi={ errorSearchApi }
                    />
                }

            </section>
        </main>
    );
}

export default Movies;
