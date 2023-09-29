// Component for Register/signup page - компонент страницы регистрации.
import '../general/content.css';
import './Register.css';
import FormSection from '../FormSection/FormSection';

function Register() {
    return (
        <main className='content'>

            <FormSection name={'register'} title={'Добро пожаловать!'} buttonText={'Зарегистрироваться'}
                         captionText={'Уже зарегистрированы?'} captionLink={'/signin'} captionLinkText={'Войти'}>

            <span className='register__inputs'>
                <label className='register__input-label' htmlFor='register-input-name'>Имя
                    <input
                        className='register__input'
                        // value={email}
                        // onChange={handleChangeName}
                        type='text'
                        placeholder='введите Ваше имя'
                        autoFocus
                        id='register-input-name'
                        name='name'
                        tabIndex='1'
                        minLength='2'
                        required
                    />
                </label>

                <label className='register__input-label' htmlFor='register-input-email'>E-mail
                    <input
                        className='register__input'
                        // value={email}
                        // onChange={handleChangeName}
                        type='email'
                        placeholder='введите Ваш email'
                        id='register-input-email'
                        name='email'
                        tabIndex='2'
                        minLength='4'
                        required
                    />
                </label>

                <label className='register__input-label' htmlFor='register-input-pass'>Пароль
                    <input
                        className='register__input'
                        // value={password}
                        // onChange={handleChangeName}
                        type='password'
                        placeholder='введите Ваш пароль'
                        id='register-input-pass'
                        name='password'
                        tabIndex='3'
                        minLength='4'
                        required
                    />
                </label>

                <span className='register__err'>Что-то пошло не так...</span>

            </span>

            </FormSection>

        </main>
    );
}

export default Register;
