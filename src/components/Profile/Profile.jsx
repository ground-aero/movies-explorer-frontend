// component page - for patching/changing of Profile - компонент страницы изменения профиля.
import React, { useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import '../general/content.css';
import './Profile.css';
import { useFormWithValidation } from '../../hooks/useValidForm.jsx';

function Profile({ onSubmit, onLogout }) {

    const currentUser = useContext(CurrentUserContext);
      // console.log(currentUser) // {id:..., email:..., name:...}
    const { values, setValues, handleChange, errors, isValid, setIsValid, resetForm } = useFormWithValidation();

    // Логика:
    // Кнопка: isChanged ---> 'Сохранить' | else ---> 'Редактировать', 'Выйти'
    // Переменная: isValid ---> 'Сохранить' | else ---> disabled
    const [isChanged, setIsChanged] = useState(false)

    useEffect(() => {
        if (currentUser.name === values.name && currentUser.email === values.email) setIsChanged(false)
        else setIsChanged(true)
    }, [values.name, values.email]);

    useEffect(() => {
        setValues(currentUser)
        setIsChanged(false)
    }, [currentUser]);

    // useEffect(() => {
    //     if (isValid.email) setIsValid(true)
    //     // if (values.email === )
    //     // setDatas(currentUser)
    // }, [isValid.email]);

    // function handleChangeName(evt) {
    //     if (evt.target.value !== values.name) setIsChanged(true)
    //     else setIsChanged(false)
    //
    //     setValues.name(evt.target.value)
    //     handleChange(evt)
    // }
    //   // console.log(isValid)

    function handleEditBtn() {
        setIsChanged(true)
    }
    /** Обработчик сабмита */
    function handleSubmitUpdate(evt) {
        evt.preventDefault()
        if (isChanged) onSubmit({ name: values.name, email: values.email })

        setIsChanged(false)
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
                                    className='profile__input'
                                    onChange={handleChange}
                                    value={ (isChanged ? values.name : currentUser.name) || '' }
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
                                    className='profile__input profile__input_type_email'
                                    onChange={handleChange}
                                    value={ (isChanged ? values.email : currentUser.email) || '' }
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
                                <button type='button' onClick={ handleEditBtn } className='caption__text caption__text_profile caption__text_btn '>
                                    { 'Редактировать' }
                                </button>
                                <button type='button' onClick={ onLogout } className='caption__text caption__text_profile caption__text_btn caption__text_btn-logout '>
                                    { 'Выйти из аккаунта' }
                                </button>
                            </span>
                        </> :
                                <button type='submit' className={`btn btn_entry btn_entry_profile ${(!isChanged || (!isValid.name || !isValid.email)) ? 'btn_entry_profile_disabled' : '' }`}
                                        disabled={ !isValid.name || !isValid.email } aria-label='edit'>
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
