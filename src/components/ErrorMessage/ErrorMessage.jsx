// Component ErrorMessage - отд. компонент для вывода ошибок при работе с API
import './ErrorMessage.css';

function ErrorMessage (props) {
    return (
        <p className='error error_message'>{`Error Message: ${props.text}`}</p>
    );
}

export default ErrorMessage;
