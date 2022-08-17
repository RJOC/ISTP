import "../App.css";
import {
  Box,
  Button,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ArrowLeft, Send } from "react-bootstrap-icons";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import Profile from "./Misc/Profile";
import UpdateGroupModal from "./Misc/UpdateGroupModal";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import Moment from "react-moment";
import moment from "moment";
import ReactMomentCountDown from "react-moment-countdown";

const ENDPOINT = "https://istp-web-application.herokuapp.com/";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const toast = useToast();
  const todaysdate = new Date();
  const dateInFuture = new Date("2022-08-20");

  const {
    user,
    selectedChat,
    setSelectedChat,
    notifications,
    setNotifications,
  } = ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to get the Message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    if (
      (event.key === "Enter" || event.currentTarget.id === "button") &&
      newMessage
    ) {
      console.log("it worked");

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );

        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    if (!selectedChat) return;
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notifications.includes(newMessageRecieved)) {
          //fetch all of the chats again
          setNotifications([newMessageRecieved, ...notifications]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    //typing
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            pb={3}
            px={2}
            width="100%"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
            color={"#3182CE"}
          >
            <IconButton
              bg={"#3182CE"}
              display={{ base: "flex", md: "none" }}
              icon={<ArrowLeft color="white" />}
              onClick={() => setSelectedChat("")}
              _hover={{
                background: "#2C5282",
              }}
            />

            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <Profile user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName}

                <UpdateGroupModal
                  fetchMessages={fetchMessages}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </Text>

          {!selectedChat.isGroupChat ? (
            <>
              <Box
                display={"flex"}
                flexDir="column"
                justifyContent={"flex-end"}
                p={3}
                background="#D3E7F5"
                width={"100%"}
                height="100%"
                borderRadius={"lg"}
                overflowY="hidden"
              >
                {loading ? (
                  <>
                    <Spinner
                      size="xl"
                      width={"40px"}
                      height="40px"
                      alignSelf={"center"}
                      margin="auto"
                    />
                  </>
                ) : (
                  <div className="messages">
                    <ScrollableChat messages={messages} />
                  </div>
                )}

                <FormControl
                  display={"flex"}
                  onKeyDown={sendMessage}
                  isRequired
                  mt={3}
                >
                  <Input
                    variant="filled"
                    bg="white"
                    placeholder="enter a message ..."
                    value={newMessage}
                    onChange={typingHandler}
                  />
                  <Button
                    name="button"
                    id="button"
                    onClick={sendMessage}
                    colorScheme={"blue"}
                    alignContent="center"
                    mt={2}
                  >
                    <Send size={"20px"} color="white" />
                  </Button>
                </FormControl>
              </Box>
            </>
          ) : (
            <>
              <Box
                display={"flex"}
                flexDir="column"
                justifyContent={"flex"}
                background="#3182CE"
                width={"100%"}
                height="30%"
                p={4}
                borderRadius={"lg"}
                overflowY="hidden"
              >
                {/* THE GROUP DETAILS WILL BE HEREEE! */}
                <Text display="flex">
                  <b>Trip Date: &nbsp;&nbsp;&nbsp;&nbsp;</b>
                  <Moment format="DD/MM/YYYY">
                    {moment(selectedChat.groupDate, "YYYY-MM-DD")}
                  </Moment>
                </Text>
                {/* {selectedChat.groupDate} */}
                <Text display="flex">
                  <b>Countdown:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
                  <ReactMomentCountDown toDate={dateInFuture} />
                </Text>

                <p>
                  <b>Trip Location:&nbsp;&nbsp;&nbsp;&nbsp;</b>
                  {selectedChat.groupLoc}{" "}
                </p>
                <p>
                  <b>Group Description:</b>
                </p>
                <p>{selectedChat.groupDesc}</p>
              </Box>
              <Box
                display={"flex"}
                flexDir="column"
                justifyContent={"flex-end"}
                p={3}
                background="#D3E7F5"
                width={"100%"}
                height="70%"
                borderRadius={"lg"}
                overflowY="hidden"
              >
                <div className="messages">
                  <ScrollableChat messages={messages} />
                </div>

                <FormControl
                  onKeyDown={sendMessage}
                  display="flex"
                  isRequired
                  mt={3}
                >
                  <Input
                    variant="filled"
                    bg="white"
                    placeholder="enter a message ..."
                    value={newMessage}
                    onChange={typingHandler}
                  />
                  <Button
                    name="button"
                    id="button"
                    onClick={sendMessage}
                    colorScheme={"blue"}
                    alignContent="center"
                    mt={2}
                  >
                    <Send size={"20px"} color="white" />
                  </Button>
                </FormControl>
              </Box>
            </>
          )}
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          heigt="100%"
        >
          <Text marginTop={"200px"} fontSize={"3x1"} pb={3} color="black">
            Select user to start a chat or create new group chat
          </Text>
        </Box>
      )}
    </>
  );
};
export default SingleChat;
