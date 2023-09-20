// component - for single film card.
import './MoviesCard.css';
// import image from '../../../images/card_img_template.svg';
import heartImgRed from '../../../images/card_heart_red.svg';

function MoviesCard({ nameRU, nameEN, image }) {
    const name = nameRU ? nameRU : nameEN;

    return (
        <li className='movies__card'>
            <img src={ image } className='card__img' alt='card image'/>
            <p className='card-name__wrap'>
                <span className='card__name'>{ name }</span>
                <img src={heartImgRed} className='card__heart card__heart_active' alt='heart image'/>
            </p>
            <p className='card__duration'>1ч42мин</p>
        </li>
    );
}

export default MoviesCard;
