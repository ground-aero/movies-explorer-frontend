// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
import {useLocation} from 'react-router-dom';
import {useState, useEffect, useContext} from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import SavedMoviesContext from '../../../contexts/SavedMoviesContext';

function MoviesCardList({ type, renderMovies, isSavedCards, likedMovies = [], temporaryLikedMovies, onSaveLikedCard, onDeleteCard, errorSearchApi }) { // cards: App->Movies->MoviesCardList
    const savedMoviesContext = useContext(SavedMoviesContext);
    const [isLikedMovies, setLikedMovies] = useState([]);
    const location = useLocation();
    const [isWidth, setIsWidth] = useState(window.innerWidth);

    useEffect(() => {
    },[renderMovies])

    let initCount = null;
    let step = null;

    useEffect(() => {
        const handleResize = (event) => {
            setIsWidth(event.target.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return (() => window.removeEventListener('resize', handleResize))
    },[])

    // ------------------ ( movies ) -------------------------------------------------------------------

    useEffect(() => { // Нарезка всех найденных, в зависимости от ширины экрана
        if (location.pathname === '/movies') {
            setIsShowCards(renderMovies.slice(0, initCount))
        }
    },[renderMovies?.length])

    // ------------------ ( saved-movies ) -------------------------------------------------------------

    useEffect(() => { // Отображение всех лайкнутых фильмов
        if (location.pathname === '/saved-movies') {
            const likedMovies = localStorage.getItem('likedMovies' || []);

            if (temporaryLikedMovies.length) {
                setLikedMovies(temporaryLikedMovies?.reverse())
                  console.log('temporaryLikedMovies: ', temporaryLikedMovies)
            } else {
                const savedCards = JSON.parse(likedMovies)
                setLikedMovies(savedCards?.reverse())
                  console.log('isLikedMovies: ', isLikedMovies)
            }
        }
    },[isLikedMovies?.length, temporaryLikedMovies?.length])

    if (location.pathname === '/saved-movies') {
        initCount = savedMoviesContext?.length
    } else {
        if (isWidth >= 1250) {
            initCount = 16;
            step = 4;
        } else if (isWidth <= 1249 && isWidth >= 970) {
            initCount = 12;
            step = 3;
        } else if (isWidth <= 969 && isWidth >= 730) {
            initCount = 8;
            step = 2;
        } else if (isWidth >= 320 && isWidth <= 729) {
            initCount = 5;
            step = 2;
        }
    }

    const [isShowCards, setIsShowCards] = useState([]); // массив карточек с заданным кол-вом
    const [isAddCount, setIsAddCount] = useState(initCount); // инкремент кол-ва карточек

    function showMore() {
        setIsShowCards(renderMovies.slice(0, isAddCount + step))
        setIsAddCount(isAddCount + step)
    }

    console.log('renderMovies, likedMovies, temporaryLikedMovies :: ', renderMovies, likedMovies, temporaryLikedMovies)
    console.log('isLikedMovies, savedMoviesContext: ', isLikedMovies, savedMoviesContext)

    return (
        <>
            { location.pathname === '/movies' &&
                <>
                    { errorSearchApi
                        ? <span className='cards__api-err'>{ errorSearchApi }</span>
                        : <ul className='cards'>
                            { isShowCards.map((card, _ind) => {
                                        card.isLiked = false;
                                return <MoviesCard
                                        card={card}
                                        key={card.movieId || _ind}
                                        likedMovies={likedMovies}

                                        isSavedCards={isSavedCards}
                                        onSaveLikedCard={onSaveLikedCard}
                                        onDeleteCard={onDeleteCard}
                                        type={type}
                                    />
                                })
                            }
                        </ul>
                    }

                    { (renderMovies.length >= isAddCount)
                        ? (<div className={`movies__more ${ errorSearchApi ? 'movies__more_display-none' : null }`}>
                        <button onClick={ showMore } className='movies__btn-more' name='movies__btn-more' type='button'>
                        Ещё
                        </button>
                        </div>)
                        : null
                    }
                </>
            }

            { location.pathname === '/saved-movies' &&
                <>
                    { errorSearchApi && ((isLikedMovies.length === 0) || (temporaryLikedMovies.length === 0))
                        ? <span className='cards__api-err'>{ errorSearchApi }</span>
                        : <ul className='cards'>
                            { isLikedMovies?.map((card, _ind) => {
                                card.isLiked = true;
                                return <MoviesCard
                                    card={card}
                                    key={card.movieId || _ind}
                                    likedMovies={likedMovies}

                                    isSavedCards={isSavedCards}
                                    onSaveLikedCard={onSaveLikedCard}
                                    onDeleteCard={onDeleteCard}
                                    type={type}
                                />
                            })
                            }
                        </ul>
                    }
                </>
            }
        </>
    );
}

export default MoviesCardList;
