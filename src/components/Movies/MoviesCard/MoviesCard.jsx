// component - for single film card.
import './MoviesCard.css';
import {useState, useEffect} from 'react';

function MoviesCard({ type, card, nameRU, nameEN }) {
    const name = nameRU ? nameRU : nameEN;
    const btnIcon = (type === 'movies') ? 'save' : 'delete';
    const [isSaved, setIsSaved] = useState(false);

    // const {nameRU, nameEN, image, duration} = card;

    useEffect(() => {
        // console.log(card)
    }, [])

    return (
        <li id={'movie-' + card.id } className={`card card_type_${ type }`}>
            <img src={`https://api.nomoreparties.co/${card.image.url}`} className='card__img' alt={ card.nameRU }/>

            <div className='wrap'>
            <h1 className='card__name'>{ card.nameRU }</h1>
                <p className={`card__btn-wrap card__btn-wrap_${btnIcon} `}>
                    <button
                        type='button'
                        className={`card__btn card__btn_${btnIcon} card__btn_${btnIcon}_active`}
                        onClick={() => setIsSaved(true)}>
                    </button>
                    {/*<img src={closeIcon} className='card__btn card__btn_delete card__btn_save card__heart card__heart_active' alt='heart image'/>*/}
                </p>
            </div>

            <p className='card__duration'>{`${ card.duration }м`}</p>

        </li>
    );
}

export default MoviesCard;
