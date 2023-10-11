// Component for Register/signup page - компонент страницы регистрации.
import '../general/content.css';
import './Register.css';
import FormSection from '../FormSection/FormSection';
import {useState} from "react";

function Register({ handleRegister }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeName = (e) => {
        setName(e.target.value);
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        handleRegister(name, email, password)
    }

    return (
        <main className='content'>

            <FormSection name={'register'} title={'Добро пожаловать!'} buttonText={'Зарегистрироваться'}
                         captionText={'Уже зарегистрированы?'} captionLink={'/signin'} captionLinkText={'Войти'}
                         onSubmit={ onSubmit }>

                {/*<span className='register__inputs'>*/}
                    <label className='register__input-label' htmlFor='register-input-name'>Имя
                        <input
                            onChange={handleChangeName}
                            className='register__input'
                            value={name}
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
                            onChange={handleChangeEmail}
                            className='register__input'
                            value={email}
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
                            onChange={handleChangePassword}
                            className='register__input'
                            value={password}
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

                {/*</span>*/}

            </FormSection>

        </main>
    );
}

export default Register;
