// component page - for patching/changing of Profile - компонент страницы изменения профиля.
import '../general/content.css';
import './Profile.css';
import FormSection from '../FormSection/FormSection';

function Profile() {
    return (
        <main className='content'>

            <FormSection name={'profile'} title={'Привет, Виталий!'}
                         captionLinkEdit={'Редактировать'} captionLinkLogout={'Выйти из аккаунта'} captionLink={'/'}>

                <span className='profile__inputs'>
                    <label className='profile__input-label' htmlFor='profile-input-name'>Имя
                <input
                    className='profile__input'
                    // value={email}
                    // onChange={handleChangeName}
                    type='text'
                    autoFocus
                    id='profile-input-name'
                    name='name'
                    tabIndex='1'
                    minLength='2'
                    required
                />
                    </label>

                    <label className='profile__input-label' htmlFor='profile-input-email'>E-mail
                <input
                    className='profile__input profile__input_type_email'
                    // value={email}
                    // onChange={handleChangeName}
                    type='email'
                    id='profile-input-email'
                    name='email'
                    tabIndex='2'
                    minLength='4'
                    required
                />
                    </label>

                </span>

            </FormSection>

        </main>
    );
}

export default Profile;
