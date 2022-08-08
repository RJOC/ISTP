import '../App.css';
import { NavBar } from '../components/NavBar'; 
import { Footer } from "../components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

function NotFound() {
  return (
    <div className="App">
      <NavBar />
        <h1>404 Error - Page not found!</h1>
      <Footer />
    </div>
  );
}

export default NotFound;
