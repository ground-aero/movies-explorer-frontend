// component page - for patching/changing of Profile - компонент страницы изменения профиля.
import React, { useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import DisabledFormContext from '../../contexts/DisabledFormContext';
import '../general/content.css';
import './Profile.css';
import { useFormWithValidation } from '../../hooks/useValidForm.jsx';

function Profile({ onSubmit, messageSuccess, onLogout }) {

    const currentUser = useContext(CurrentUserContext);
    const isDisabled = useContext(DisabledFormContext);
    const { values, setValues, handleChange, errors, isValid, setIsValid } = useFormWithValidation();

    /** Логика:
     * Кнопка: isChanged ---> 'Сохранить' | else ---> 'Редактировать', 'Выйти'
     * Переменная: isValid ---> 'Сохранить' | else ---> disabled
     */
    const [isChanged, setIsChanged] = useState(false)
    const [isProcessed, setIsProcessed] = useState(false)

    useEffect(() => {
        if (currentUser.name !== values.name || currentUser.email !== values.email) setIsProcessed(true)
        else setIsProcessed(false)
    }, [values.name, values.email]);

    useEffect(() => {
        setValues({
            name: currentUser.name,
            email: currentUser.email
        })
        setIsValid({
            name: values.name = true,
            email: values.email = true
        })
    }, [currentUser.name, currentUser.email])

    function handleEditBtn() {
        setIsChanged(true)
    }

    function handleSubmitUpdate(e) {
        e.preventDefault()
        if (isChanged && (isValid.name && isValid.email)) onSubmit({name: values.name, email: values.email})

        setIsChanged(false)
        setIsProcessed(false)
    }

    return (
        <main className='content'>

            <section className='form-sec'>
                <div className={`form-sec__box form-sec__box_profile`}>
                    <h1 className={`form-sec__title form-sec__title_type_profile`}>{`Привет, ${ currentUser.name } `}</h1>

                    <form className={`form profile`} name='form-profile'
                          onSubmit={handleSubmitUpdate} >
                        <div className='profile__inputs'>
                            <span className='profile__input-wrap'>
                                <input
                                    disabled={ !isChanged || isDisabled }
                                    className='profile__input'
                                    onChange={ handleChange }
                                    value={ values.name ?? '' }
                                    type='text'
                                    autoFocus
                                    id='profile-input-name'
                                    name='name'
                                    placeholder='введите Ваше имя'
                                    tabIndex='1'
                                    minLength='2'
                                    required
                                />
                                { errors.name && <span className='profile__input-err'>{ errors.name }</span>}
                                <label className='profile__input-label' htmlFor='profile-input-name'>Имя</label>
                            </span>

                            <span className='profile__input-wrap'>
                                <input
                                    disabled={ !isChanged || isDisabled }
                                    className='profile__input profile__input_type_email'
                                    onChange={ handleChange }
                                    value={ values.email ?? '' }
                                    type='email'
                                    id='profile-input-email'
                                    placeholder='введите Ваш email'
                                    name='email'
                                    tabIndex='2'
                                    minLength='4'
                                    required
                                />
                                { errors.email && <span className='profile__input-err'>{ errors.email }</span>}
                                <label className='profile__input-label' htmlFor='profile-input-email'>E-mail</label>
                            </span>

                        </div>

                        {/** отображение 'caption' Profile* */}
                        {!isChanged ?
                        <>
                            <span className='caption caption_profile'>
                                <span className='caption__message caption__text'>{ messageSuccess }</span>
                                <button type='button' onClick={ handleEditBtn } className='caption__text caption__text_profile caption__text_btn '>
                                    { 'Редактировать' }
                                </button>
                                <button type='button' onClick={ onLogout } className='caption__text caption__text_profile caption__text_btn caption__text_btn-logout '>
                                    { 'Выйти из аккаунта' }
                                </button>
                            </span>
                        </> :
                            <button type='submit' className={`btn btn_entry btn_entry_profile ${isProcessed && (isValid.email && isValid.name) ? '' : 'btn_entry_profile_disabled'}`}
                                     disabled={ !(isProcessed && (isValid.email && isValid.name)) } aria-label='edit'>
                                { 'Сохранить' }
                            </button>
                                // <button type='submit' className={`btn btn_entry btn_entry_profile ${(!isChanged && (!isValid.name && !isValid.email)) ? 'btn_entry_profile_disabled' : '' }`}
                                //         disabled={ !isValid.name && !isValid.email } aria-label='edit'>
                                //     { 'Сохранить' }
                                // </button>
                        }
                    </form>
                </div>
            </section>

        </main>
    );
}

export default Profile;
