// component - for Authorization page
import {useContext, useEffect} from 'react';
import '../general/content.css';
import './Login.css';
import FormSection from '../FormSection/FormSection';
import {useFormWithValidation} from '../../hooks/useValidForm.jsx';

function Login({ handleLogin, errorApi }) { // @props из App.js - аутентификация пользователя
    /** логика и стейты: values.name, values.emaiil, ... --> in ValidForm component */
    const { handleChange, values, errors, isValid, resetForm } = useFormWithValidation();

    useEffect(() => {
        resetForm('', '', true)
    },[])

    const onSubmit = (e) => {
        e.preventDefault();
        handleLogin(values.email, values.password)
    }

    return (
        <main className='content'>

            <FormSection name={'login'} title={'Рады видеть!'} buttonText={'Войти'} isValid={(isValid.email && isValid.password)}
                captionText={'Еще не зарегистрированы?'} captionLink={'/signup'} captionLinkText={'Регистрация'}
                onSubmit={ onSubmit } errorApi={ errorApi }
            >

                    <label className='login__input-label' htmlFor='login-input-email'>E-mail
                        <input
                            className='login__input'
                            value={values.email ?? ''}
                            onChange={handleChange}
                            type='email'
                            placeholder='введите Ваш email'
                            id='login-input-email'
                            name='email'
                            tabIndex='1'
                            minLength='4'
                            autoComplete='off'
                            required
                        />
                        {errors.email && <span className='login__input-err'>{ errors.email }</span>}
                    </label>

                    <label className='login__input-label' htmlFor='login-input-pass'>Пароль
                        <input
                            className='login__input'
                            value={values.password ?? ''}
                            onChange={handleChange}
                            type='password'
                            placeholder='введите Ваш пароль'
                            id='login-input-pass'
                            name='password'
                            tabIndex='2'
                            minLength='4'
                            autoComplete='off'
                            required
                        />
                        {errors.password && <span className='login__input-err'>{ errors.password }</span>}
                    </label>

            </FormSection>

        </main>
    );
}

export default Login;
