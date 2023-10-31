// component page - for patching/changing of Profile - компонент страницы изменения профиля.
import {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import '../general/content.css';
import './Profile.css';
import {useForm, useFormWithValidation} from '../ValidForm/ValidForm';

function Profile({ onUpdateProfile, onLogout }) {
    const navigate = useNavigate();

    const {handleChange, values, setValues} = useForm();
    // const [isUpdateProfile, setIsUpdateProfile] = useState(false);
    const currentUser = useContext(CurrentUserContext);

    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isChanged, setIsChanged] = useState(false)
    // console.log(isChanged)

    useEffect(() => {
        setUser(currentUser)
        console.log('render currentUser', currentUser)
        // isValid(false)
    }, [currentUser]);

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
                    <h1 className={`form-sec__title form-sec__title_type_profile`}>{`Привет, ${currentUser.name} `}</h1>
                    <form className={`form profile`} name='form-profile'>
                        <div className='profile__inputs'>
                            <span className='profile__input-wrap'>
                                <input
                                    className='profile__input'
                                    value={user.name ?? ''}
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
                                    value={user.email ?? ''}
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
                                <button type='button' onClick={onLogout} className='caption__text caption__text_profile caption__text_btn caption__text_btn-logout '>
                                    { 'Выйти из аккаунта' }
                                </button>
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
