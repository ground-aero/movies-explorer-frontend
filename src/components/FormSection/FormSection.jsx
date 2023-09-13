// FormSection - universal element - for Profile, Login, Register components
import './FormSection.css';
import logoIcon from '../../images/logo.svg';
import {Link} from 'react-router-dom';

function FormSection({ name, title, buttonText, children }) {

    return (
        <section className='form-section'>
            <div className='form-section__box'>
                <Link to='/' className='form-section__logo'>
                    <img className='logo' src={logoIcon} alt='logo'/>
                </Link>
                <h2 className='form-sec__title'>{ title }</h2>

                <form className='form form_entry' name={name}>

                    {children}

                    <button className='btn btn_entry'>{ buttonText }</button>
                </form>

            </div>
        </section>
    );
}

export default FormSection;
