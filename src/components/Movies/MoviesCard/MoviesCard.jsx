// component - for single film card.
import './MoviesCard.css';
import {useState} from 'react';

function MoviesCard({ type, nameRU, nameEN, image }) {
    const name = nameRU ? nameRU : nameEN;
    const btnIcon = (type === 'movies') ? 'save' : 'delete';
    const [isSaved, setIsSaved] = useState(false);

    return (
        <li className={`card card_type_${ type }`}>
            <img src={ image } className='card__img' alt='изображение карточки'/>

            <div className='wrap'>
            <h1 className='card__name'>{ name }</h1>
                <p className={`card__btn-wrap card__btn-wrap_${btnIcon} `}>
                    <button
                        type='button'
                        className={`card__btn card__btn_${btnIcon} card__btn_${btnIcon}_active`}
                        onClick={() => setIsSaved(true)}>
                    </button>
                    {/*<img src={closeIcon} className='card__btn card__btn_delete card__btn_save card__heart card__heart_active' alt='heart image'/>*/}
                </p>
            </div>

                <p className='card__duration'>1ч 42м</p>

        </li>
    );
}

export default MoviesCard;
