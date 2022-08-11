import "../App.css";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import GroupBody from "../components/Misc/GroupBody";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import { useState } from "react";

function Groups() {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState("");
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
      {user && <GroupBody fetchAgain={fetchAgain} />}
      <Footer />
    </div>
  );
}

export default Groups;
