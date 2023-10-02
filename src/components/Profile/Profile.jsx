// component page - for patching/changing of Profile - компонент страницы изменения профиля.
import '../general/content.css';
import './Profile.css';
import FormSection from '../FormSection/FormSection';

function Profile() {
    return (
        <main className='content'>

            <FormSection name={'profile'} title={'Привет, Виталий!'}
                         captionLinkEdit={'Редактировать'} captionLinkLogout={'Выйти из аккаунта'} captionLink={'/'}>

                <div className='profile__inputs'>

                    <span className='profile__input-wrap'>
                        <input
                            className='profile__input'
                            // value={email}
                            // onChange={handleChangeName}
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
                            // value={email}
                            // onChange={handleChangeName}
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

            </FormSection>

        </main>
    );
}

export default Profile;
