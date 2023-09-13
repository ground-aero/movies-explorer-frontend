// FormSection - universal element - for Profile, Login, Register components
import './FormSection.css';
import logoIcon from '../../images/logo.svg';
import {Link} from 'react-router-dom';

function FormSection({ name, title, buttonText, children, captionText, captionLink }) {

    return (
        <section className='form-sec'>
            <div className='form-sec__box'>
                <Link to='/' className='form-sec__logo'>
                    <img className='logo' src={logoIcon} alt='logo'/>
                </Link>
                <h2 className='form-sec__title'>{ title }</h2>

                <form className='form form_entry' name={name}>

                    {children}

                    <button className='btn btn_entry'>{ buttonText }</button>
                    <span className='caption caption_wrap'>
                        <p className='caption__text'>{ captionText }</p>
                        <Link to='/' className='caption__link'>{ captionLink }</Link>
                    </span>
                </form>

            </div>
        </section>
    );
}

export default FormSection;
