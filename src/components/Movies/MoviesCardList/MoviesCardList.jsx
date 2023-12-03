// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
import {useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ type, renderMovies, searchedMovies, shortMovies, isSavedCards, likedMovies = [], onSaveLikedCard, onDeleteCard, errorSearchApi }) { // cards: App->Movies->MoviesCardList
    const location = useLocation();
    const [isWidth, setIsWidth] = useState(window.innerWidth);
    // console.log('renderMovies : ',renderMovies)
    // console.log('isLikedMovies: ', isLikedMovies)

    useEffect(() => {
        // localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies)) // перезапись
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

    useEffect(() => { // Нарезка всех найденных, в зависимости от ширины экрана
        if (location.pathname === '/movies') {
            setIsShowCards(renderMovies.slice(0, initCount))
        }
    },[renderMovies?.length])
    // renderMovies.length
    useEffect(() => {

    },[])

        // console.log(searchedMovies.length)
        // console.log(isWidth)

    if (location.pathname === '/saved-movies') {
        initCount = likedMovies?.length
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
        setIsShowCards(renderMovies.slice(0, isAddCount + step))
        setIsAddCount(isAddCount + step)
    }

    return (
        <>

            { location.pathname === '/movies' &&
                <>
                    { errorSearchApi
                        ? <span className='cards__api-err'>{ errorSearchApi }</span>
                        : <ul className='cards'>
                            {/*<MoviesCard type={ type } nameRU={'33 слова о дизайне'} image={cardImg1}/>*/}

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
                    { errorSearchApi
                        ? <span className='cards__api-err'>{ errorSearchApi }</span>
                        : <ul className='cards'>
                            { likedMovies.map((card, _ind) => {
                                card.isLiked = true;
                                return <MoviesCard
                                    card={card}
                                    key={card.movieId || _ind}
                                    // likedMovies={likedMovies}
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
