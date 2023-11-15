// component - for single film card.
import {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import './MoviesCard.css';
import CurrentUserContext from '../../../contexts/CurrentUserContext';

function MoviesCard({ type, card, onSaveLikedCard, savedCards, saved }) {
    const currentUser = useContext(CurrentUserContext);
      // console.log(savedCards) // [{ массив карточек }] с isSaved: true
      // console.log(saved)

      console.log('on render card: ', card) // карточки на рендер в завис от ширины isWidth {id: 16,}, {id:,...}, {id:,...}
    const [saved2, setSaved2] = useState([]);
    // useEffect(() => {
    //     const saved = localStorage.getItem('AddedCards'); /** проверка истории поиска */
    //     if (saved) {
    //         const savedCard = JSON.parse(saved)
    //         setSaved2(savedCard) /** перезапись фильмов из истории поиска в 'isSearchedCards' */
    //         console.log(saved2)
    //     }
    // },[])

    // const name = nameRU ? nameRU : nameEN;
    const btnIcon = (type === 'movies') ? 'save' : 'delete';
    const [isSaved, setIsSaved] = useState(false); // false

    const [isFalseCards, setIsFalseCards] = useState([]);
    const [isSavedCard, setIsSavedCard] = useState([]);
    /** Определяем, есть ли у карточки лайк, поставленный текущим пользователем */
    // const isLiked = card.some(id => id === currentUser.id);

    // console.log(isSaved) // !!!!!!!!!!!

    const cardLikeClassName = ( /** переменная `className` для кнопки лайка */
        // `card__btn card__btn_${btnIcon} ${ card.owner === currentUser.id ? `card__btn_${btnIcon}_active` : ''}`
           `card__btn card__btn_${btnIcon} ${ card.isSaved === true ? `card__btn_${btnIcon}_active` : ''}`
        );

    // const {nameRU, nameEN, image, duration} = card;

    // useEffect(() => {
    //     let arrFalse = []
    //     arrFalse.push(card)
    //     setIsFalseCards(arrFalse) // запись массива найденных фильмов в переменную '.....'
    //
    //     // localStorage.setItem('SearchStory2', JSON.stringify(isFalseCards))
    //     // const saved = localStorage.getItem('AddedCards')
    // },[])
    // console.log(isFalseCards)

    function getTimefromMints(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return (`${hours}ч ${minutes}м`)
    }

    // const {country='aaa', description='aaa', director='aaaaa', duration='11', image='dkjlub.jpg', movieId='444', nameEN='aaa', nameRU='aaa', trailerLink='https://aaa', year='1980'} = card;
    function saveBtn() {
        // card.Saveddd = true; /////////////////////////
        onSaveLikedCard(card) // !!!!!!!!!
        setIsSaved(true)

        // localStorage.setItem('SearchStory', JSON.stringify(searchedCards))

        // localStorage.setItem('AddedCards', JSON.stringify(isSavedCard))
        // setIsSavedCard(isSavedCard)
          console.log('cliked heart')
    }

    function deleteBtn() {
        // onDeleteCard(card) // !!!!!!!!!
        setIsSaved(false)
          console.log('cliked deleted card')
    }

    // console.log(card)

    return (
        <li id={'movie-' + card.id || card._id } className={`card card_type_${ type }`}>
            <Link to={ card.trailerLink } target='_blank'>
                <img src={`https://api.nomoreparties.co/${card.image.url}`} className='card__img' alt={ card.nameRU }/>
            </Link>

            <div className='wrap'>
            <h1 className='card__name'>{ card.nameRU }</h1>
                <p className={`card__btn-wrap card__btn-wrap_${btnIcon} `}>
                    <button
                        type='button'
                        className={ cardLikeClassName }
                        onClick={ saveBtn }>
                    </button>
                    {/*<img src={closeIcon} className='card__btn card__btn_delete card__btn_save card__heart card__heart_active' alt='heart image'/>*/}
                </p>
            </div>

            <p className='card__duration'>{getTimefromMints(card.duration)}</p>

        </li>
    );
}

export default MoviesCard;
