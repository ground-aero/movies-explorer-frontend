// import logo from '../../logo.svg';
import '../general/page.css'
import LandPage from '../LandPage/LandPage.jsx';
import Movies from '../Movies/Movies.jsx';
import SavedMovies from '../SavedMovies/SavedMovies.jsx';

function App() {
  return (
    <div className="page__container">

      <LandPage/>

        <Movies/>

        <SavedMovies/>

    </div>
  );
}

export default App;
