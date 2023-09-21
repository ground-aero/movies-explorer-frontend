// component - for single film card.
import './MoviesCard.css';
import heartImgRed from '../../../images/card_heart_red.webp';
import closeIcon from '../../../images/close_icon.webp';

function MoviesCard({ type, nameRU, nameEN, image }) {
    const name = nameRU ? nameRU : nameEN;
    const btnIcon = (type === 'movies') ? 'heart' : 'delete';

    return (
        <li className={`movies__card movies__card_${ type }`}>
            <img src={ image } className='card__img' alt='card image'/>

            <span className='card__name'>{ name }
                <div className={`card__btn-wrap card__btn-wrap_${btnIcon} `}>
                    <button type='button' className={`card__btn card__btn_${btnIcon} `}></button>
                    {/*<img src={closeIcon} className='card__btn card__btn_delete card__btn_heart card__heart card__heart_active' alt='heart image'/>*/}
                </div>
            </span>

                <span className='card__duration'>1ч42мин</span>

        </li>
    );
}

export default MoviesCard;
