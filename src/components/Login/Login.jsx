// component - for Authorization page
import {useEffect, useState} from 'react';
import '../general/content.css';
import './Login.css';
import FormSection from '../FormSection/FormSection';
import {useForm, useFormWithValidation} from '../ValidForm/ValidForm';

function Login({ handleLogin, errorApi }) { // @props из App.js - аутентификация пользователя
    /** логика и стейты: values.name, values.emaiil, ... --> in ValidForm component */
    const { handleChange, values, errors, isValid, resetForm } = useFormWithValidation();
    // console.log(values.email, values.password)

    const onSubmit = (e) => {
        e.preventDefault();
        handleLogin(values.email, values.password)
    }

    useEffect(() => {
        resetForm('', '', true)
    },[])

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [emailError, setEmailError] = useState('Email не может быть пустым');
    // const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');

    // console.log(email,password)
    // console.log(emailError,passwordError)
    // const handleNameError = (e) => {
    //     setName(e.target.value)
    //     if (!isValid.name) {
    //         setNameError('Имя может содержать буквы на латинице или крилице')
    //     } else { setNameError('') }
    // }

    // const handleChangeEmail = (e) => {
    //     setEmail(e.target.value);
    // }
    // const handleChangePassword = (e) => {
    //     setPassword(e.target.value);
    // }

    return (
        <main className='content'>

            <FormSection name={'login'} title={'Рады видеть!'} buttonText={'Войти'} isValid={(isValid.email && isValid.password)}
                captionText={'Еще не зарегистрированы?'} captionLink={'/signup'} captionLinkText={'Регистрация'}
                onSubmit={ onSubmit } errorApi={errorApi}
            >

                {/*<span className='login__inputs'>*/}
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
                {/*</span>*/}
                {/*<span className='login__input-err'>{ }</span>*/}

            </FormSection>

        </main>
    );
}

export default Login;
