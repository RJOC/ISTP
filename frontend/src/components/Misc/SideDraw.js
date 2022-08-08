import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Tooltip,
  useDisclosure,
  Input,
  Toast,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { Search, Bell, CaretDownFill, X } from "react-bootstrap-icons";
import { ChatState } from "../../Context/ChatProvider";
import Profile from "../../components/Misc/Profile";
import UserListItem from "../UserAvatar/UserListItem";
import { useNavigate } from "react-router-dom";
/* Side drawer section */
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import axios from "axios";
import ChatLoading from "../ChatLoading";

const SideDraw = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const { user, setSelectedChat, chats, setChats } = ChatState();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const signOutH = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const toast = useToast();

  const manSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something to search",
        status: "warning",
        duration: 5000,
        position: "bottom",
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Can't get search results",
        status: "warning",
        duration: 5000,
        position: "bottom",
        isClosable: true,
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        className="SideDraw"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        padding="5px 10px 5px 10px"
      >
        <Tooltip label="Search Groups to chat" hasArrow placement="bottom-end">
          <Button
            colorScheme="blue"
            width="flex"
            marginLeft={"10px"}
            onClick={onOpen}
          >
            <Search />
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search People
            </Text>
          </Button>
        </Tooltip>
      </Box>

      {/* Side drawer section */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent marginTop={"90px"}>
          <DrawerCloseButton />
          <DrawerHeader color={"#8FBBDA"}>Search Chats</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pd={2}>
              <Input
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type here..."
              />
              <Button colorScheme="blue" width={"100%"} onClick={manSearch}>
                Search
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner m1="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Side drawer section End*/}
    </>
  );
};

export default SideDraw;
