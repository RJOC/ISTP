import "../App.css";
import {
  Box,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import Profile from "./Misc/Profile";
import UpdateGroupModal from "./Misc/UpdateGroupModal";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import Moment from "react-moment";

const ENDPOINT = "https://istp-web-application.herokuapp.com/";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const toast = useToast();

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
    if (event.key === "Enter" && newMessage) {
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

                <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                  <Input
                    variant="filled"
                    bg="white"
                    placeholder="enter a message ..."
                    value={newMessage}
                    onChange={typingHandler}
                  />
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
                borderRadius={"lg"}
                overflowY="hidden"
              >
                {/* THE GROUP DETAILS WILL BE HEREEE! */}
                <Text>
                  <b>Trip Date: </b>
                  <Moment format="DD/MM/YYYY">{selectedChat.groupDate}</Moment>
                </Text>
                {/* {selectedChat.groupDate} */}
                <b>Until Trip:</b>
                <p>
                  <b>Trip Location:</b>
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
                height="50%"
                borderRadius={"lg"}
                overflowY="hidden"
              >
                <div className="messages">
                  <ScrollableChat messages={messages} />
                </div>

                <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                  <Input
                    variant="filled"
                    bg="white"
                    placeholder="enter a message ..."
                    value={newMessage}
                    onChange={typingHandler}
                  />
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
