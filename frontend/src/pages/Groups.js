import "../App.css";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import GroupBody from "../components/Misc/GroupBody";
function Groups() {
  const navigateLog = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) {
      navigateLog("/login");
    } else {
      navigateLog("/groups");
    }
  }, [navigateLog]);
  return (
    <div className="Inspire">
      <NavBar />
      <GroupBody />
      <Footer />
    </div>
  );
}

export default Groups;
