// FormSection - universal element - for Profile, Login, Register components
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
                         captionLinkEdit,
                         captionLinkLogout
})
{
    return (
        <section className='form-sec'>
            <div className='form-sec__box'>
                {/** отображение лого в зависимости от компонента (кроме: profile) */}
                {(name === 'login' || name === 'register') &&
                    <Link to='/' className='form-sec__logo'>
                        <img className='logo' src={logoIcon} alt='logo'/>
                    </Link>
                }

                <h2 className={`form-sec__title form-sec__title_type_${ name }`}>{ title }</h2>

                <form className='form form_entry' name={name}>

                    {children}

                    {/** отображение 'caption' в зависимости от компонента (кроме: profile) */}
                    {(name === 'login' || name === 'register') &&
                        <>
                            <button className='btn btn_entry'>{ buttonText }</button>
                            <span className='caption caption_wrap'>
                                <p className='caption__text'>{ captionText }</p>
                                <Link to={ captionLink } className='caption__link'>{ captionLinkText }</Link>
                            </span>
                        </>
                    }
                    {(name === 'profile') &&
                        <span className='caption caption_wrap_profile'>
                            <button type='button' className='caption__text_profile caption__text_profile_btn '>{ captionLinkEdit }</button>
                            <Link to='/' className='caption__text_profile'>{ captionLinkLogout }</Link>

                        </span>
                    }

                </form>

            </div>
        </section>
    );
}

export default FormSection;
