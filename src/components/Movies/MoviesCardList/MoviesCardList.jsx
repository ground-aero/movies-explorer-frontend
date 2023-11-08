// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
import {useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ type, cards, errorSearchApi, isLoading }) { // cards: App->Movies->MoviesCardList
    const location = useLocation();
    const [isWidth, setIsWidth] = useState(window.innerWidth);
    // console.log(isLoading)
    // console.log(cards) // приходят отфильтрованные поиском карточки

    let initCount = null;
    let step = null;
    const [isShowCards, setIsShowCards] = useState([]);
    const [isAddCount, setIsAddCount] = useState(initCount);

    useEffect(() => {
        const handleResize = (event) => {
            setIsWidth(event.target.innerWidth)
        }
          console.log(isWidth)

        window.addEventListener('resize', handleResize)
        return (() => window.removeEventListener('resize', handleResize))
    },[])

    useEffect(() => {
        setIsShowCards(cards.slice(0, initCount))
    },[cards.length])

    if (location.pathname === '/saved-movies') {
        initCount = cards.length
    } else {
        if (isWidth >= 1280) {
            initCount = 12;
            step = 3;
        } else if (isWidth <= 1279 && isWidth >= 480) {
            initCount = 8;
            step = 2;
        } else if (isWidth >= 320 && isWidth < 480) {
            initCount = 5;
            step = 2;
        }
    }
    //     console.log(initCount)
    //     console.log(cards.length)
    //     console.log(isShowCards)

    return (
        <>
            { errorSearchApi
                ? <span className='cards__api-err'>{ errorSearchApi }</span>
                : <ul className='cards'>
                    {/*<MoviesCard type={ type } nameRU={'33 слова о дизайне'} image={cardImg1}/>*/}

                    { isShowCards.map((card, ind) => {
                        return <MoviesCard
                            card={card}
                            key={card.id || card._id}
                            type={type} />
                      })
                    }

                    {/*{ cards.length*/}
                    {/*    ? isShowCards.map((card, ind) => {*/}
                    {/*        return <MoviesCard*/}
                    {/*            card={card}*/}
                    {/*            key={card.id || card._id}*/}
                    {/*            type={ type }*/}
                    {/*        />*/}
                    {/*      })*/}
                    {/*    : <p>Ничего не найдено</p>*/}
                    {/*}*/}

                    {/*{ isLoading*/}
                    {/*    ? <li className='cards__preloader'>*/}
                    {/*            <Preloader />*/}
                    {/*      </li>*/}
                    {/*    : cards.map((card, ind) => {*/}
                    {/*        return (*/}
                    {/*            <MoviesCard*/}
                    {/*                card={card}*/}
                    {/*                key={card.id || card._id}*/}
                    {/*                type={ type }*/}
                    {/*            />*/}
                    {/*        );*/}
                    {/*      })*/}
                    {/*}*/}

                  </ul>
            }

            {(type === 'movies') &&
                <div className='movies__more'>
                    <button className='movies__btn-more' name='movies__btn-more' type='button'>
                        Ещё
                    </button>
                </div>
            }
        </>
    );
}

export default MoviesCardList;
