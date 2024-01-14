// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
import {useLocation} from 'react-router-dom';
import {useState, useEffect, useCallback} from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
    SCREEN_XL,
    SCREEN_LG,
    SCREEN_MD,
    SCREEN_SM,
    STEP_COUNT_XL,
    STEP_COUNT_LG,
    STEP_COUNT_MD,
    STEP_COUNT_SM,
} from '../../../utils/constants.js'

function MoviesCardList({ type, renderMovies, isShort, renderLikedMovies, initCount, isAddCount, setIsAddCount,
                            isSavedCards, likedMovies, onSaveLikedCard, onDeleteCard, errorSearchApi }) { // cards: App->Movies->MoviesCardList
    const location = useLocation();
    const [isWidth, setIsWidth] = useState(window.innerWidth);

    const [isShowLikedMovies, setShowLikedMovies] = useState([]);
    const [isShowCards, setIsShowCards] = useState([]); // массив карточек с заданным кол-вом

    useEffect(() => {
        const handleResize = (event) => {
            setIsWidth(event.target.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return (() => window.removeEventListener('resize', handleResize))
    },[isWidth])

    // ------------------ ( movies ) -------------------------------------------------------------------

    useEffect(() => { // Нарезка всех найденных, в зависимости от ширины экрана
        if (location.pathname === '/movies') {
            setIsAddCount(isAddCount)
            setIsShowCards(renderMovies.slice(0, isAddCount))
        }
    },[isShort, renderMovies, isAddCount])

    // ------------------ ( saved-movies ) -------------------------------------------------------------
    useEffect(() => { // Отображение всех лайкнутых фильмов, в завис. от поиск. слова .....
        if (location.pathname === '/saved-movies') {
                setShowLikedMovies(renderLikedMovies)
            }
    },[renderLikedMovies])

    const showMore = useCallback(() => {  // Начальное кол-во Ф. (от ширины Э.)
        if (isWidth >= SCREEN_XL) { // 1250px
            setIsAddCount((prevState) => prevState + STEP_COUNT_XL); // 4
        } else if (isWidth < SCREEN_XL && isWidth >= SCREEN_LG) { // 970px
            setIsAddCount((prevState) => prevState + STEP_COUNT_LG); // 3
        } else if (isWidth < SCREEN_LG && isWidth >= SCREEN_MD) { // 730px
            setIsAddCount((prevState) => prevState + STEP_COUNT_MD); // 2
        } else if (isWidth >= SCREEN_SM && isWidth < SCREEN_MD) { // 320px
            setIsAddCount((prevState) => prevState + STEP_COUNT_SM); // 2
        }

        setIsShowCards(renderMovies.slice(0, isAddCount)); // в стейт сохр. это* кол-во Ф.

    }, [isWidth, isShowCards]);

    // console.log('renderMovies,, initCount, isAddCount +, isShowCards', renderMovies, initCount, isAddCount, isShowCards)

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

                    { (renderMovies.length !== 0 && renderMovies.length >= isAddCount)
                        ? (<div className={`movies__more ${ errorSearchApi ? 'movies__more_display-none' : null }`}>
                        <button onClick={ showMore } className='movies__btn-more' name='movies__btn-more' type='button'>
                        Ещё
                        </button>
                        </div>)
                        : null
                    }
                </>
            }

            {/*|| (foundLikedMovies.length === 0)*/}
            { location.pathname === '/saved-movies' &&
                <>
                    { errorSearchApi
                        ? <span className='cards__api-err'>{ errorSearchApi }</span>
                        : <ul className='cards'>
                            { isShowLikedMovies?.map((card, _ind) => {
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
