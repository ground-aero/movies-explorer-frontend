// component - for single film card.
import {Link, useLocation} from 'react-router-dom';
import './MoviesCard.css';
import deleteCardBtn from '../../../images/delete_icon_thin.svg';
import likeCardBtn from '../../../images/card_heart_red.svg';
import dislikeCardBtn from '../../../images/card_heart_grey.svg';

function MoviesCard({ type, card, likedMovies = [], onSaveLikedCard, onDeleteCard }) {
    const location = useLocation();

    const btnIcon = (type === 'movies') ? 'save' : 'delete';

    let isLiked;
    let likedId;
    isLiked = likedMovies.some((item) => {

        if (item.movieId === card.movieId) {
                isLiked = item.isLiked; // true
                likedId = item._id; // item._id: 6558d7af107b7f63e2c3bcbc
            return true;
        }
        return false;
    })

    const cardLikeClassName = ( /** для кнопки лайка */
        `card__btn card__btn_${btnIcon} ${ isLiked === true ? `card__btn_${btnIcon}_active` : ''}`
    );

    const buttonImg = (likedMovies ? deleteCardBtn
        : isLiked ? likeCardBtn : dislikeCardBtn);

    function getTimefromMints(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return (`${hours}ч ${minutes}м`)
    }

   return (
        <li id={'movie-' + card.key || card._id } className={`card card_type_${ type }`}>
            <Link to={ card.trailerLink } target='_blank'>
                <img src={ card.image } className='card__img' alt={ card.nameRU }/>
            </Link>

            <div className='wrap'>
            <h1 className='card__name'>{ card.nameRU }</h1>
                <p className={`card__btn-wrap card__btn-wrap_${ buttonImg } `}>
                    <button
                        type='button'
                        className={ cardLikeClassName }
                        onClick={ () => {
                            if (location.pathname === '/movies') isLiked ? onDeleteCard(card._id ? card._id : likedId) : onSaveLikedCard(card);
                            else !isLiked ? onDeleteCard(card._id ? card._id : likedId) : onSaveLikedCard(card);
                            }
                    }>
                    </button>
                </p>
            </div>

            <p className='card__duration'>{getTimefromMints(card.duration)}</p>

        </li>
    );
}

export default MoviesCard;
