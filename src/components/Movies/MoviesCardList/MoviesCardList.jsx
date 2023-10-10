// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import cardImg1 from '../../../images/card_img_template.jpg';
import cardImg2 from '../../../images/card_img2.jpg';
import cardImg3 from '../../../images/card_img3.jpg';
import cardImg4 from '../../../images/card_img4.jpg';
import cardImg5 from '../../../images/card_img5.jpg';
import cardImg6 from '../../../images/card_img6.jpg';

function MoviesCardList({ type, cards, handleGetMovies }) { // cards: App->Movies->MoviesCardList
    return (
        <>
            <ul className='cards'>

                <MoviesCard type={ type } nameRU={'33 слова о дизайне'} image={cardImg1}/>
                <MoviesCard type={ type } nameRU={'Киноальманах «100 лет дизайна»'} image={cardImg2}/>
                <MoviesCard type={ type } nameRU={'Бег это свобода Бег это свобода Бег это свобода'} image={cardImg3}/>
                <MoviesCard type={ type } nameRU={'Книготорговцы'} image={cardImg4}/>
                <MoviesCard type={ type } nameRU={'Когда я думаю о Германии ночью'} image={cardImg5}/>
                <MoviesCard type={ type } nameEN={'Gimme Danger: История Игги и The Stooges'} image={cardImg6}/>
                <MoviesCard type={ type } nameRU={'33 слова о дизайне'} image={cardImg1}/>
                <MoviesCard type={ type } nameRU={'Киноальманах «100 лет дизайна»'} image={cardImg2}/>
                {/*<MoviesCard type={ type } nameRU={'Бег это свобода'} image={cardImg3}/>*/}
                {/*<MoviesCard type={ type } nameRU={'Книготорговцы'} image={cardImg4}/>*/}
                {/*<MoviesCard type={ type } nameRU={'33 слова о дизайне'} image={cardImg1}/>*/}
                {/*<MoviesCard type={ type } nameRU={'Киноальманах «100 лет дизайна»'} image={cardImg2}/>*/}
                {/*<MoviesCard type={ type } nameRU={'Бег это свобода'} image={cardImg3}/>*/}
                {/*<MoviesCard type={ type } nameRU={'Книготорговцы'} image={cardImg4}/>*/}
            </ul>

            {(type === 'movies') &&
                <div className='movies__more'>
                    <button className='movies__btn-more' name='movies__btn-more' type='button'>Ещё</button>
                </div>
            }
        </>
    );
}

export default MoviesCardList;
