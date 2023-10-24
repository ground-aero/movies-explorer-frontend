// FormSection - universal element - for Profile*, Login, Register components
import {useState} from 'react';
import './FormSection.css';
import logoIcon from '../../images/logo.svg';
import {Link, NavLink} from 'react-router-dom';

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
                     }) {

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
                >

                    {/* Register, Login - inputs */}
                    <span className='form__inputs'>
                        {children}
                    </span>

                    {/** отображение 'caption' в зависимости от компонента (кроме: profile) */}
                    {(name === 'login' || name === 'register') &&
                        <>
                            <button className={`btn btn_entry btn_entry_${name}`}>
                                {buttonText}
                                <span className='btn__api-err'>{ errorApi }</span>
                            </button>
                            <span className={`caption caption_${name}`}>
                                <p className='caption__text'>{captionText}</p>
                                <Link to={captionLink} className='caption__link'>{captionLinkText}</Link>
                            </span>
                        </>
                    }
                </form>

            </div>
        </section>
    );
}

export default FormSection;
