import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/layout";
import SideDrawer from "../components/Misc/SideDraw";
import MyChats from "../components/Misc/MyChats";
import ChatBox from "../components/Misc/ChatBox";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const location = useLocation();
  const { user } = ChatState("");
  const [fetchAgain, setFetchAgain] = useState(false);
  const navigateLog = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) {
      navigateLog("/login");
    } else {
      navigateLog("/chat");
    }
  }, [navigateLog]);

  return (
    <div className="Login" style={{ width: "100%" }}>
      <NavBar />
      {user && <SideDrawer />}
      <Box
        display={"flex"}
        justifyContent="space-between"
        width="100%"
        height="91.5vh"
        padding="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
      <Footer />
    </div>
  );
};

export default Chat;
