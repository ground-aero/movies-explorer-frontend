// import logo from '../../logo.svg';
import '../general/page.css'
import LandPage from '../LandPage/LandPage.jsx';
import Movies from '../Movies/Movies.jsx';
import SavedMovies from '../SavedMovies/SavedMovies.jsx';
import Register from '../Register/Register.jsx';
import Login from '../Login/Login.jsx';
import Profile from '../Profile/Profile.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';

function App() {
  return (
      <>
          {/** <div className="page__container"> */}

      <LandPage />

        <Movies />

        <SavedMovies />

          <Register />
          <Login />
          <Profile />

          <Header />
          <Footer />

          {/** </div> */}
      </>
  );
}

export default App;
