import "../App.css";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { RegisterPanel } from "../components/RegisterPanel";

export const Register = () => {
  return (
    <div className="register">
      <NavBar />
      <RegisterPanel />
      <Footer />
    </div>
  );
};

export default Register;
