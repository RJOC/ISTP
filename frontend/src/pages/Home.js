import "../App.css";
import { NavBar } from "../components/NavBar";
import { Banner } from "../components/Banner";
import { Desc } from "../components/Desc";
import { Footer } from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div>
      <NavBar />
      <Banner />
      <Desc />
      <Footer />
    </div>
  );
}

export default Home;
