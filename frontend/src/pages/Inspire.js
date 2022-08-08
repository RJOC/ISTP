import "../App.css";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import DiscoverContent from "../components/DiscoverContent";

function Inspire() {
  return (
    <div>
      <NavBar />
      <DiscoverContent />
      <Footer />
    </div>
  );
}

export default Inspire;
