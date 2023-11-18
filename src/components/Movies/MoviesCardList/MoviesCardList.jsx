// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
import {useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ type, searchedMovies, onSaveLikedCard, isSavedCards, savedCards, saved, onDeleteCard, errorSearchApi }) { // cards: App->Movies->MoviesCardList
    const location = useLocation();
    const [isWidth, setIsWidth] = useState(window.innerWidth);
    // console.log(isLoading)
    // console.log(cards) // приходят отфильтрованные поиском карточки

    // console.log('searchedMovies with id...: ',searchedMovies)
    // console.log('savedCards: ', savedCards)

    useEffect(() => {
        // localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies)) // перезапись
    },[searchedMovies])

    let initCount = null;
    let step = null;

    useEffect(() => {
        const handleResize = (event) => {
            setIsWidth(event.target.innerWidth)
        }
        // console.log(isWidth)
        window.addEventListener('resize', handleResize)
        return (() => window.removeEventListener('resize', handleResize))
    },[])

    useEffect(() => {
        setIsShowCards(searchedMovies.slice(0, initCount))
    },[searchedMovies.length])

    useEffect(() => {

    },[])

        // console.log(searchedMovies.length)
        // console.log(isWidth)

    if (location.pathname === '/saved-movies') {
        initCount = searchedMovies.length
    } else {
        if (isWidth >= 1280) {
            initCount = 16;
            step = 4;
        } else if (isWidth <= 1279 && isWidth >= 480) {
            initCount = 8;
            step = 2;
        } else if (isWidth >= 320 && isWidth < 480) {
            initCount = 5;
            step = 2;
        }
    }

    const [isShowCards, setIsShowCards] = useState([]); // массив карточек с заданным кол-вом
    const [isAddCount, setIsAddCount] = useState(initCount); // инкремент кол-ва карточек

    function showMore() {
        setIsShowCards(searchedMovies.slice(0, isAddCount + step))
        setIsAddCount(isAddCount + step)
    }

    const falseCards = () => {

    }
        // console.log(initCount)
        // console.log(cards.length)
        // console.log(isAddCount)
        // console.log(isShowCards.length)

    return (
        <>

            { location.pathname === '/movies' &&
                <>
                    { errorSearchApi
                        ? <span className='cards__api-err'>{ errorSearchApi }</span>
                        : <ul className='cards'>
                            {/*<MoviesCard type={ type } nameRU={'33 слова о дизайне'} image={cardImg1}/>*/}

                            { isShowCards.map((card, _ind) => {
                                        card.isSaved = false;
                                return <MoviesCard
                                        card={card}
                                        key={card.movieId || _ind}
                                        type={type}
                                        isSavedCards={isSavedCards}
                                        savedCards={savedCards}

                                        onSaveLikedCard={onSaveLikedCard}
                                    />
                                })
                            }
                        </ul>
                    }

                    { (searchedMovies.length >= isAddCount)
                        ? (<div className={`movies__more ${errorSearchApi ? 'movies__more_display-none' : null}`}>
                        <button onClick={showMore} className='movies__btn-more' name='movies__btn-more' type='button'>
                        Ещё
                        </button>
                        </div>)
                        : null
                    }
                </>
            }

            { location.pathname === '/saved-movies' &&
                <>
                    { errorSearchApi
                        ? <span className='cards__api-err'>{ errorSearchApi }</span>
                        : <ul className='cards'>

                            { savedCards.map((card, _ind) => {
                                card.isSaved = true;
                                return <MoviesCard
                                    card={card}
                                    key={card.movieId || _ind}
                                    type={type}
                                    onSaveLikedCard={onSaveLikedCard}
                                    isSavedCards={isSavedCards}
                                    savedCards={savedCards}
                                    onDeleteCard={onDeleteCard}
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
