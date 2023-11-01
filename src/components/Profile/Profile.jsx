// component page - for patching/changing of Profile - компонент страницы изменения профиля.
import React, {useState, useEffect, useContext} from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import '../general/content.css';
import './Profile.css';
import {useFormWithValidation} from '../ValidForm/ValidForm';

function Profile({ onUpdateProfile, onLogout }) {

    const currentUser = useContext(CurrentUserContext);
    const { values, setValues, handleChange, errors, isValid, setIsValid, resetForm } = useFormWithValidation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isChanged, setIsChanged] = useState(false)

    useEffect(() => {
        setName(currentUser.name ?? '')
        setEmail(currentUser.email ?? '')
        // setIsChanged(false)
    }, [currentUser.name, currentUser.email]);

    function handleChangeName(evt) {
        if (evt.target.value !== name) setIsChanged(true)
        else setIsChanged(false)

        setName(evt.target.value)
        handleChange(evt)
    }
      console.log(isValid)

    function handleChangeEmail(evt) {
        if (evt.target.value !== email) setIsChanged(true)
        else setIsChanged(false)

        setEmail(evt.target.value)
        handleChange(evt)
    }

    /** Обработчики изменения инпута обновляет стейт */
    function handleSubmit(e) {
        e.preventDefault()
        if (isChanged) onUpdateProfile({ name: values.name, email: values.email })

        setIsChanged(false)
    }

    console.log(isValid.name, isValid.email)

    return (
        <main className='content'>

            {/*             captionLinkEdit={'Редактировать'} captionLinkLogout={'Выйти из аккаунта'} captionLink={'/'}>*/}
            <section className='form-sec'>

                <div className={`form-sec__box form-sec__box_profile`}>
                    <h1 className={`form-sec__title form-sec__title_type_profile`}>{`Привет, ${currentUser.name} `}</h1>
                    <form className={`form profile`} name='form-profile'>
                        <div className='profile__inputs'>
                            <span className='profile__input-wrap'>
                                <input
                                    className='profile__input'
                                    onChange={handleChangeName}
                                    // value={user.name ?? ''}
                                    value={name ?? ''}
                                    type='text'
                                    autoFocus
                                    id='profile-input-name'
                                    name='name'
                                    placeholder='введите Ваше имя'
                                    tabIndex='1'
                                    minLength='2'
                                    required
                                />
                                {errors.name && <span className='profile__input-err'>{ errors.name }</span>}
                                <label className='profile__input-label' htmlFor='profile-input-name'>Имя</label>
                            </span>

                            <span className='profile__input-wrap'>
                                <input
                                    className='profile__input profile__input_type_email'
                                    onChange={handleChangeEmail}
                                    value={email ?? ''}
                                    type='email'
                                    id='profile-input-email'
                                    placeholder='введите Ваш email'
                                    name='email'
                                    tabIndex='2'
                                    minLength='4'
                                    required
                                />
                                {errors.email && <span className='profile__input-err'>{ errors.email }</span>}
                                <label className='profile__input-label' htmlFor='profile-input-email'>E-mail</label>
                            </span>

                        </div>

                        {/** отображение 'caption' Profile* */}

                        {!isChanged ?
                        <>
                            <span className='caption caption_profile'>
                                <button type='button' onClick={ handleSubmit } className='caption__text caption__text_profile caption__text_btn '>{ 'Редактировать' }</button>
                                <button type='button' onClick={onLogout} className='caption__text caption__text_profile caption__text_btn caption__text_btn-logout '>
                                    { 'Выйти из аккаунта' }
                                </button>
                            </span>
                        </> :
                                <button type='submit' className={`btn btn_entry btn_entry_profile ${(!isChanged || (!isValid.name || !isValid.email)) ? 'btn_entry_profile_disabled' : '' }`}
                                        disabled={!isValid.name || !isValid.email} aria-label='edit'
                                        onClick={handleSubmit} >
                                    { 'Сохранить' }
                                </button>
                        }
                    </form>

                </div>
            </section>

        </main>
    );
}

export default Profile;
