// component page - for patching/changing of Profile - компонент страницы изменения профиля.
import '../general/content.css';
import './Profile.css';
import FormSection from '../FormSection/FormSection';
import {Link} from "react-router-dom";
import {useState} from "react";

function Profile({ onUpdateProfile }) {
    // const [isUpdateProfile, setIsUpdateProfile] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isChanged, setIsChanged] = useState(false)
    // console.log(onUpdateProfile)
    console.log(isChanged)
    /** Обработчики изменения инпута обновляет стейт */
    function handleUpdateProfile() {
        setIsChanged(true)
    }
    function handleChangeName(e) {
        if (e.target.value !== name) setIsChanged(true)
        else setIsChanged(false)
        setName(e.target.value);
    }
    function handleChangeEmail(e) {
        if (e.target.value !== email) setIsChanged(true)
        else setIsChanged(false)
        setEmail(e.target.value);
    }

    return (
        <main className='content'>

            {/*<FormSection name={'profile'} title={'Привет, Виталий!'}*/}
            {/*             captionLinkEdit={'Редактировать'} captionLinkLogout={'Выйти из аккаунта'} captionLink={'/'}>*/}
            <section className='form-sec'>

                <div className={`form-sec__box form-sec__box_profile`}>
                    <h1 className={`form-sec__title form-sec__title_type_profile`}>{ 'Привет, Виталий!' }</h1>
                    <form className={`form profile`} name='form-profile'>
                        <div className='profile__inputs'>
                            <span className='profile__input-wrap'>
                                <input
                                    className='profile__input'
                                    value={name}
                                    onChange={handleChangeName}
                                    type='text'
                                    autoFocus
                                    id='profile-input-name'
                                    name='name'
                                    placeholder='введите Ваше имя'
                                    tabIndex='1'
                                    minLength='2'
                                    required
                                />
                                <label className='profile__input-label' htmlFor='profile-input-name'>Имя</label>
                            </span>

                            <span className='profile__input-wrap'>
                                <input
                                    className='profile__input profile__input_type_email'
                                    value={email}
                                    onChange={handleChangeEmail}
                                    type='email'
                                    id='profile-input-email'
                                    placeholder='введите Ваш email'
                                    name='email'
                                    tabIndex='2'
                                    minLength='4'
                                    required
                                />
                                <label className='profile__input-label' htmlFor='profile-input-email'>E-mail</label>
                            </span>

                        </div>

                        {/** отображение 'caption' Profile* */}

                        {!isChanged ?
                        <>
                            <span className='caption caption_profile'>
                                <button type='button' onClick={ handleUpdateProfile } className='caption__text caption__text_profile caption__text_btn '>{ 'Редактировать' }</button>
                                <Link to='/' className='caption__text caption__text_profile'>{ 'Выйти из аккаунта' }</Link>
                            </span>
                        </> :
                                <button type='submit' className={`btn btn_entry btn_entry_profile ${!isChanged ? '' : 'btn_entry_profile_disabled'}`} aria-label='edit' >
                                    { 'Сохранить' }
                                </button>
                        }
                    </form>

                </div>
            </section>
            {/*</FormSection>*/}

        </main>
    );
}

export default Profile;
