// component - for single film card.
import {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import './MoviesCard.css';
import deleteCardBtn from '../../../images/delete_icon_thin.svg';
import likeCardBtn from '../../../images/card_heart_red.svg';
import dislikeCardBtn from '../../../images/card_heart_grey.svg';
import CurrentUserContext from '../../../contexts/CurrentUserContext';

function MoviesCard({ type, card, onSaveLikedCard, isSavedCards, isLikedMovies, saved, onDeleteCard }) {
    const currentUser = useContext(CurrentUserContext);
      // console.log(isLikedMovies) // [{ массив карточек }] с isSaved: true
      // console.log(saved)

      // console.log('on render card: ', card) // карточки на рендер в завис от ширины isWidth {id: 16,}, {id:,...}, {id:,...}

    // useEffect(() => {
    //     const saved = localStorage.getItem('likedMovies'); /** проверка истории поиска */
    //     if (saved) {
    //         const savedCard = JSON.parse(saved)
    //         setSaved2(savedCard) /** перезапись фильмов из истории поиска в 'isSearchedMovies' */
    //         console.log(saved2)
    //     }
    // },[])

    const btnIcon = (type === 'movies') ? 'save' : 'delete';

    let isLiked;
    let likedId;
    isLiked = isLikedMovies.some((item) => {
          // console.log(item)
        if (item.movieId === card.movieId) {
                isLiked = item.isLiked; // true
                likedId = item._id; // item._id: 6558d7af107b7f63e2c3bcbc
            return true;
        }
        return false;
    })
    // console.log('likedId, isliked', likedId, isLiked)

    const cardLikeClassName = ( /** переменная `className` для кнопки лайка */
        `card__btn card__btn_${btnIcon} ${ isLiked === true ? `card__btn_${btnIcon}_active` : ''}`
    );
        // console.log('card.',card) //
        // console.log('isLikedMovies',isLikedMovies) // [{true,...}]
        // console.log('isSavedCards', isSavedCards) // как вытащить true ????

    const buttonImg = (isLikedMovies
        ? deleteCardBtn
        : isLiked
            ? likeCardBtn
            : dislikeCardBtn);

    function getTimefromMints(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return (`${hours}ч ${minutes}м`)
    }

    // function handleSaveCard() {
    //     // card.Saveddd = true; /////////////////////////
    //     onSaveLikedCard(card) // !!!!!!!!!
    //     setIsSaved(true)
    //
    //     // localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies))
    //
    //     // localStorage.setItem('likedMovies', JSON.stringify(isSavedCard))
    //     // setIsSavedCard(isSavedCard)
    //       console.log('cliked heart')
    // }
    // function handleDeleteCard() {
    //     // onDeleteCard(card) // !!!!!!!!!
    //     setIsSaved(false)
    //       console.log('cliked deleted card')
    // }

    return (
        <li id={'movie-' + card.key || card._id } className={`card card_type_${ type }`}>
            <Link to={ card.trailerLink } target='_blank'>
                <img src={ card.image } className='card__img' alt={ card.nameRU }/>
            </Link>

            <div className='wrap'>
            <h1 className='card__name'>{ card.nameRU }</h1>
                <p className={`card__btn-wrap card__btn-wrap_${buttonImg} `}>
                    <button
                        type='button'
                        className={ cardLikeClassName }
                        onClick={ () => {
                            isLiked
                                ? onDeleteCard(card._id
                                    ? card._id
                                    : likedId)
                                : onSaveLikedCard(card);
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
