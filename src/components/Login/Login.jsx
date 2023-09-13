// component - for Authorization page  - компонент страницы авторизации.
import '../general/content.css';
import './Login.css';
import FormSection from '../FormSection/FormSection';

function Login({name, title, buttonText, captionText}) {
    /** Стейт, в котором содержится значение инпута */
    // const [value, setValue] = React.useState('');

    return (
        <main className='content'>

            <FormSection name={'login'} title={'Рады видеть!'} buttonText={'Войти'}
                captionText={'Еще не зарегистрированы?'} captionLink={'/signup'} captionLinkText={'Регистрация'}>

            <span className='login__inputs'>
                <label className='login__input-label' htmlFor='login-input-email'>E-mail
            <input
                className='login__input'
                // value={email}
                // onChange={handleChangeName}
                type='email'
                autofocus
                id='login-input-email'
                name='email'
                tabIndex='1'
                minLength='4'
                required
            />
                </label>

                <label className='login__input-label' htmlFor='login-input-pass'>Пароль
                    <input
                        className='login__input'
                        // value={password}
                        // onChange={handleChangeName}
                        type='password'
                        id='login-input-pass'
                        name='password'
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

export default Login;
