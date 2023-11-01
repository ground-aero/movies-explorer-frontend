import React, {useCallback} from 'react';

//хук управления формой
export function useForm() {
    const [values, setValues] = React.useState({});

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setValues({...values, [name]: value});
    };

    // console.log(values.name, values.email)
    return {values, handleChange, setValues};
}

//хук управления формой и валидации формы
export function useFormWithValidation() {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    /** Изменения и запись: 1. значений полей, 2. ошибок валидации полей, 3. статусы isValid
     * 4. вызов тестирования полей */
    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setValues({...values, [name]: value});
        setErrors({...errors, [name]: target.validationMessage });
        setIsValid(target.closest('form').checkValidity());

        checkInputValid(name, value)
    };

    const regExName = /^[a-zA-Zа-яА-ЯЁё \-]+$/
    const regExEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    /** 1. Тестирование значений полей 2. запись кастомных ошибок, 3. статусы isValid */
    const checkInputValid = (name, value) => {
        if (name === 'name') {
            if (regExName.test(value)) {
                setIsValid({...isValid, name: true})
                setErrors({...errors, name: ''})
            } else {
                setIsValid({...isValid, name: false})
                setErrors({...errors, name: 'Имя может содержать не менее 2-х букв на кирилице или латинице'})
            }
        }
        else if (name === 'email') {
            if (regExEmail.test(value)) {
                setIsValid({...isValid, email: true})
                setErrors({...errors, email: ''})
            } else {
                setIsValid({...isValid, email: false})
                setErrors({...errors, email: 'Введите Ваш емейл: email@domain.com'})
            }
        } else if (name === 'password') {
            if (value.length >= 4) {
                setIsValid({...isValid, password: true})
                setErrors({...errors, password: ''})
            } else {
                setIsValid({...isValid, password: false})
                setErrors({...errors, password: 'Пароль не менее 4-х символов'})
            }
    }
}

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return { values, setValues, handleChange, errors, isValid, setIsValid, resetForm };
}
