// component - for single film card.
import './MoviesCard.css';
import heartImgRed from '../../../images/card_heart_red.svg';
import closeIcon from '../../../images/close_icon.svg';

function MoviesCard({ type, nameRU, nameEN, image }) {
    const name = nameRU ? nameRU : nameEN;
    // const cardBtnIcon =

    return (
        <li className={`movies__card movies__card_${ type }`}>
            <img src={ image } className='card__img' alt='card image'/>

                {/*    <p className={`card-name__wrap`}>*/}
            <span className='card__name'>{ name }
                <div className='card__btn-wrap'>
                    <button className='card__btn card__btn_delete'></button>
                    {/*<img src={closeIcon} className='card__btn card__btn_close card__heart card__heart_active' alt='heart image'/>*/}
                </div>
            </span>
                {/*</p>*/}

                <span className='card__duration'>1ч42мин</span>

        </li>
    );
}

export default MoviesCard;
