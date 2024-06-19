// Component for Register/signup page - компонент страницы регистрации.
import '../general/content.css';
import './Register.css';
import FormSection from '../FormSection/FormSection';
import { useFormWithValidation } from '../../hooks/useValidForm.jsx';
import {useContext} from "react";
import DisabledFormContext from '../../contexts/DisabledFormContext';

function Register({ handleRegister, errorApi }) { // @props из App.js - регистрация пользователя
    const { handleChange, values, errors, isValid } = useFormWithValidation();
    const isDisabled = useContext(DisabledFormContext);
    const onSubmit = (e) => {
        e.preventDefault();
        handleRegister(values.name, values.email, values.password)
    }

    return (
        <main className='content'>

            <FormSection name={'register'} title={'Добро пожаловать!'} buttonText={'Зарегистрироваться'} isValid={(isValid.name && isValid.email && isValid.password)}
                         captionText={'Уже зарегистрированы?'} captionLink={'/signin'} captionLinkText={'Войти'}
                         onSubmit={ onSubmit } errorApi={ errorApi }
            >
                    <label className='register__input-label' htmlFor='register-input-name'>Имя
                        <input
                            disabled={isDisabled}
                            type='text'
                            pattern='^[a-zA-Zа-яА-ЯЁё \-]+$'
                            name='name'
                            value={values.name ?? ''}
                            onChange={handleChange}
                            className='register__input'
                            placeholder='введите Ваше имя'
                            autoFocus
                            id='register-input-name'
                            tabIndex='1'
                            minLength='2'
                            required
                        />
                        {errors.name && <span className='register__input-err'>{ errors.name }</span>}
                    </label>

                    <label className='register__input-label' htmlFor='register-input-email'>E-mail
                        <input
                            disabled={isDisabled}
                            name='email'
                            value={values.email ?? ''}
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
                    {errors.email && <span className='register__input-err'>{ errors.email }</span>}

                    <label className='register__input-label' htmlFor='register-input-pass'>Пароль
                        <input
                            disabled={isDisabled}
                            name='password'
                            value={values.password ?? ''}
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
                    {errors.password && <span className='register__input-err'>{ errors.password }</span>}
            </FormSection>

        </main>
    );
}

export default Register;
