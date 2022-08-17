import { Avatar } from "@chakra-ui/avatar";
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Bell, CaretDownFill } from "react-bootstrap-icons";
import Profile from "./Profile";
import { ChatState } from "../../Context/ChatProvider";
import { useNavigate } from "react-router-dom";
import { getSender } from "../../config/ChatLogics";
import { useEffect, useState } from "react";

const NavPro = () => {
  const { notifications, setNotifications, setSelectedChat, notificaiton } =
    ChatState();
  const navigate = useNavigate();

  const [user, setUser] = useState("");

  const signOutH = () => {
    window.location.reload();
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    setUser(user);
  }, []);

  return (
    <div>
      <Menu>
        <MenuButton
          colorScheme="blue"
          border={"none"}
          bg="#8FBBDA"
          as={Button}
          color="white"
        >
          <Bell color="white" size={25} />
        </MenuButton>
        <MenuList pl={"10px"} color="#3182CE">
          {!notifications.length && "No Messages"}
          {notifications.map((notification) => (
            <MenuItem
              key={notification._id}
              onClick={() => {
                setSelectedChat(notification.chat);
                setNotifications(
                  notifications.filter((n) => n !== notificaiton)
                );
              }}
            >
              {notification.chat.isGroupChat
                ? `New Message in ${notification.chat.chatName}`
                : `New Message from ${getSender(
                    user,
                    notification.chat.users
                  )}`}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton
          colorScheme="blue"
          border={"none"}
          bg="#8FBBDA"
          as={Button}
          color="white"
        >
          <Avatar
            size="md"
            cursor="pointer"
            name={user.name}
            src={user.picture}
            bg="#3182CE"
            border={"none"}
          />
          &nbsp;&nbsp;
          <CaretDownFill color="white" />
        </MenuButton>
        <MenuList background={"#8FBBDA"}>
          <Profile user={user}>
            <MenuItem
              bg="#8FBBDA!important"
              color={"white!important"}
              rounded={7}
              border="none"
              _hover={{
                background: "white!important",
                color: "#8FBBDA!important",
              }}
            >
              Profile
            </MenuItem>
          </Profile>
          <MenuItem
            bg="#8FBBDA"
            border={"none"}
            rounded={7}
            onClick={signOutH}
            _hover={{
              background: "white!important",
              color: "#8FBBDA!important",
            }}
          >
            SignOut
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default NavPro;
