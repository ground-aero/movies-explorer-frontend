// component - for single film card.
import './MoviesCard.css';

function MoviesCard({ type, nameRU, nameEN, image }) {
    const name = nameRU ? nameRU : nameEN;
    const btnIcon = (type === 'movies') ? 'heart' : 'delete';

    return (
        <li className={`card card_type_${ type }`}>
            <img src={ image } className='card__img' alt='изображение карточки'/>

            <div className='wrap'>
            <h1 className='card__name'>{ name }</h1>
                <p className={`card__btn-wrap card__btn-wrap_${btnIcon} `}>
                    <button type='button' className={`card__btn card__btn_${btnIcon} card__btn_${btnIcon}_active`}></button>
                    {/*<img src={closeIcon} className='card__btn card__btn_delete card__btn_heart card__heart card__heart_active' alt='heart image'/>*/}
                </p>
            </div>

                <p className='card__duration'>1ч 42м</p>

        </li>
    );
}

export default MoviesCard;
