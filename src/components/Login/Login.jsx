// component - for Authorization page
import {useState} from 'react';
import '../general/content.css';
import './Login.css';
import FormSection from '../FormSection/FormSection';
import {useForm, useFormWithValidation} from '../ValidForm/ValidForm';

function Login({ handleLogin, errorApi }) { // @props из App.js - аутентификация пользователя
    /** логика и стейты: values.name, values.emaiil, ... --> in ValidForm component */
    const { values, handleChange } = useForm();

    const onSubmit = (e) => {
        e.preventDefault();
        handleLogin(values.email, values.password)
    }

    return (
        <main className='content'>

            <FormSection name={'login'} title={'Рады видеть!'} buttonText={'Войти'}
                captionText={'Еще не зарегистрированы?'} captionLink={'/signup'} captionLinkText={'Регистрация'}
                onSubmit={ onSubmit } errorApi={errorApi}
            >

                {/*<span className='login__inputs'>*/}
                    <label className='login__input-label' htmlFor='login-input-email'>E-mail
                        <input
                            className='login__input'
                            value={values.email}
                            onChange={handleChange}
                            type='email'
                            placeholder='введите Ваш email'
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
                            value={values.password}
                            onChange={handleChange}
                            type='password'
                            placeholder='введите Ваш пароль'
                            id='login-input-pass'
                            name='password'
                            tabIndex='2'
                            minLength='4'
                            required
                        />
                    </label>
                {/*</span>*/}
                <span className='login__input-err'>{ }</span>

            </FormSection>

        </main>
    );
}

export default Login;
