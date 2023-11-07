// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../../Preloader/Preloader';

function MoviesCardList({ type, cards, errorSearchApi, isLoading }) { // cards: App->Movies->MoviesCardList
    // console.log(cards)

    return (
        <>
            { errorSearchApi
                ? <span className='cards__api-err'>{ errorSearchApi }</span>
                : <ul className='cards'>
                    {/*<MoviesCard type={ type } nameRU={'33 слова о дизайне'} image={cardImg1}/>*/}

                    { cards.map((card, ind) => {
                        return <MoviesCard
                            card={card}
                            key={card.id || card._id}
                            type={ type }
                        />
                    })
                    }
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
                    <button className='movies__btn-more' name='movies__btn-more' type='button'>Ещё</button>
                </div>
            }
        </>
    );
}

export default MoviesCardList;
