// FormSection - universal element - for Profile*, Login, Register components
import {useEffect} from 'react';
import './FormSection.css';
import logoIcon from '../../images/logo.svg';
import {Link} from 'react-router-dom';
import {useFormWithValidation} from '../ValidForm/ValidForm';

function FormSection({
                         name,
                         title,
                         buttonText,
                         children,
                         captionText,
                         captionLink,
                         captionLinkText,
                         onSubmit,
                         errorApi,
                         isValid,
                     }) {

    const { resetForm } = useFormWithValidation();

    useEffect(() => {
        resetForm('', '', true)
    },[errorApi])

    return (
        <section className='form-sec'>
            <div className={`form-sec__box form-sec__box_${name}`}>

                {/** отображение лого в зависимости от компонента (кроме: profile) */}
                {(name === 'login' || name === 'register') &&
                    <Link to='/' className='form-sec__logo'>
                        <img className='logo' src={logoIcon} alt='логотип'/>
                    </Link>
                }

                <h1 className={`form-sec__title form-sec__title_type_${name}`}>{title}</h1>

                <form
                    className={`form form_entry ${name}`}
                    name={`form-${name}`}
                    onSubmit={onSubmit}
                    autoComplete='off'
                >

                    {/* Register, Login - inputs */}
                    <span className='form__inputs'>
                        {children}
                    </span>

                    {/** отображение 'caption' в зависимости от компонента (кроме: profile) */}
                    {(name === 'login' || name === 'register') &&
                        <>
                            {/* конопки: "Войти", "Зарегистрироваться" */}
                            <button className={`btn btn_entry btn_entry_${ name }`} disabled={!isValid}>
                                { buttonText }
                                <span className='btn__api-err'>{ errorApi }</span>
                            </button>
                            <span className={`caption caption_${ name }`}>
                                {/* ссылки: 'Еще не зарегистрированы?', 'Уже зарегистрированы?' */}
                                <p className='caption__text'>{ captionText }</p>
                                <Link to={ captionLink } className='caption__link'>{ captionLinkText }</Link>
                            </span>
                        </>
                    }
                </form>

            </div>
        </section>
    );
}

export default FormSection;
