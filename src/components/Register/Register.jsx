// Component for Register/signup page - компонент страницы регистрации.
import '../general/content.css';
import './Register.css';
import FormSection from '../FormSection/FormSection';
import { useForm, useFormWithValidation } from '../ValidForm/ValidForm';
import {useState} from 'react';

function Register({ handleRegister, errorApi }) { // @props из App.js - регистрация пользователя

    const { values, handleChange } = useForm();
    // console.log(values)

    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('Имя может содержать буквы на латинице или крилице');
    const [emailError, setEmailError] = useState('Email не может быть пустым');
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');

    // const handleChangeName = (e) => {
    //     setName(e.target.value);
    // }
    // const handleChangeEmail = (e) => {
    //     setEmail(e.target.value);
    // }
    // const handleChangePassword = (e) => {
    //     setPassword(e.target.value);
    // }

    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     handleRegister(name, email, password)
    // }
    const onSubmit = (e) => {
        e.preventDefault();
        handleRegister(values.name, values.email, values.password)
    }

    return (
        <main className='content'>

            <FormSection name={'register'} title={'Добро пожаловать!'} buttonText={'Зарегистрироваться'}
                         captionText={'Уже зарегистрированы?'} captionLink={'/signin'} captionLinkText={'Войти'}
                         onSubmit={ onSubmit } errorApi={errorApi}
            >

                {/*<span className='register__inputs'>*/}
                    <label className='register__input-label' htmlFor='register-input-name'>Имя
                        <input
                            type='text'
                            pattern='^[a-zA-Zа-яА-ЯЁё \-]+$'
                            name='name'
                            value={values.name}
                            onChange={handleChange}
                            className='register__input'
                            placeholder='введите Ваше имя'
                            autoFocus
                            id='register-input-name'
                            tabIndex='1'
                            minLength='2'
                            required
                        />
                    </label>

                    <label className='register__input-label' htmlFor='register-input-email'>E-mail
                        <input
                            name='email'
                            value={values.email}
                            onChange={handleChange}
                            type='email'
                            className='register__input'
                            placeholder='введите Ваш email'
                            id='register-input-email'
                            tabIndex='2'
                            minLength='4'
                            required
                        />
                    </label>

                    <label className='register__input-label' htmlFor='register-input-pass'>Пароль
                        <input
                            name='password'
                            value={values.password}
                            onChange={handleChange}
                            type='password'
                            className='register__input'
                            placeholder='введите Ваш пароль'
                            id='register-input-pass'
                            tabIndex='3'
                            minLength='4'
                            required
                        />
                    </label>

                    <span className='register__input-err'>{ }</span>

                {/*</span>*/}

            </FormSection>

        </main>
    );
}

export default Register;
