// component - for single film card.
import {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import './MoviesCard.css';
import deleteCardBtn from '../../../images/delete_icon_thin.svg';
import likeCardBtn from '../../../images/card_heart_red.svg';
import dislikeCardBtn from '../../../images/card_heart_grey.svg';
import CurrentUserContext from '../../../contexts/CurrentUserContext';

function MoviesCard({ type, card, onSaveLikedCard, isSavedCards, savedCards, saved, onDeleteCard }) {
    const currentUser = useContext(CurrentUserContext);
      // console.log(savedCards) // [{ массив карточек }] с isSaved: true
      // console.log(saved)
    console.log(card)

      // console.log('on render card: ', card) // карточки на рендер в завис от ширины isWidth {id: 16,}, {id:,...}, {id:,...}

    const [saved2, setSaved2] = useState([]);

    // useEffect(() => {
    //     const saved = localStorage.getItem('likedMovies'); /** проверка истории поиска */
    //     if (saved) {
    //         const savedCard = JSON.parse(saved)
    //         setSaved2(savedCard) /** перезапись фильмов из истории поиска в 'isSearchedMovies' */
    //         console.log(saved2)
    //     }
    // },[])

    // const name = nameRU ? nameRU : nameEN;
    const btnIcon = (type === 'movies') ? 'save' : 'delete';
    const [isSaved, setIsSaved] = useState(false); // card.saved //

    const [isFalseCards, setIsFalseCards] = useState([]);
    const [isSavedCard, setIsSavedCard] = useState([]);
    /** Определяем, есть ли у карточки лайк, поставленный текущим пользователем */
    // const isLiked = card.some(id => id === currentUser.id);

    // console.log(isSaved) // !!!!!!!!!!!

    const cardLikeClassName = ( /** переменная `className` для кнопки лайка */
        // `card__btn card__btn_${btnIcon} ${ card.owner === currentUser.id ? `card__btn_${btnIcon}_active` : ''}`
           `card__btn card__btn_${btnIcon} ${ card.isSaved === true ? `card__btn_${btnIcon}_active` : ''}`
        );

    let isLiked = false;
    let likedId;
    isLiked = savedCards.some((item) => {
        if (item.movieId === card.movieId) {
            likedId = item.id; // item._id
            return true;
        }
        return false;
    })
    const buttonImg = (isSavedCards ? deleteCardBtn : isLiked ? likeCardBtn : dislikeCardBtn);
    // const {nameRU, nameEN, image, duration} = card;

    // useEffect(() => {
    //     let arrFalse = []
    //     arrFalse.push(card)
    //     setIsFalseCards(arrFalse) // запись массива найденных фильмов в переменную '.....'
    //
    //     // localStorage.setItem('searchedMovies2', JSON.stringify(isFalseCards))
    //     // const saved = localStorage.getItem('likedMovies')
    // },[])
    // console.log(isFalseCards)

    function getTimefromMints(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return (`${hours}ч ${minutes}м`)
    }

    // const {country='aaa', description='aaa', director='aaaaa', duration='11', image='dkjlub.jpg', movieId='444', nameEN='aaa', nameRU='aaa', trailerLink='https://aaa', year='1980'} = card;
    function handleSaveCard() {
        // card.Saveddd = true; /////////////////////////
        onSaveLikedCard(card) // !!!!!!!!!
        setIsSaved(true)

        // localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies))

        // localStorage.setItem('likedMovies', JSON.stringify(isSavedCard))
        // setIsSavedCard(isSavedCard)
          console.log('cliked heart')
    }

    function handleDeleteCard() {
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
                <p className={`card__btn-wrap card__btn-wrap_${buttonImg} `}>
                    <button
                        type='button'
                        className={ cardLikeClassName }
                        onClick={ () => {
                            isLiked || savedCards ? onSaveLikedCard(card) : onDeleteCard(card.id ? card.id : likedId);
                        //    isLiked || savedCards ? onDeleteCard(card.id ? card.id : likedId) : onSaveLikedCard(card);
                        } }>
                    {/* onClick={ handleSaveCard } */}
                    </button>
                    {/*<img src={closeIcon} className='card__btn card__btn_delete card__btn_save card__heart card__heart_active' alt='heart image'/>*/}
                </p>
            </div>

            <p className='card__duration'>{getTimefromMints(card.duration)}</p>

        </li>
    );
}

export default MoviesCard;
