import "../App.css";
import { NavBar } from "../components/NavBar";
import { LoginPanel } from "../components/LoginPanel";
import { Footer } from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

export const Login = () => {
  return (
    <div className="login">
      <NavBar />
      <LoginPanel />
      <Footer />
    </div>
  );
};

export default Login;
