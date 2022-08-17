import React from "react";
import { Search, Plus } from "react-bootstrap-icons";
import { Box, Text } from "@chakra-ui/layout";
import { SimpleGrid, Container } from "@chakra-ui/react";
import CardTemp from "./CardTemp";
import GroupChatModal from "./GroupChatModal";
import axios from "axios";
import { useEffect, useState } from "react";

import { ChatState } from "../../Context/ChatProvider";

import {
  Button,
  Tooltip,
  useDisclosure,
  Input,
  Toast,
  useToast,
  Spinner,
} from "@chakra-ui/react";

const GroupBody = ({ fetchAgain }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { groups, setGroups } = ChatState();
  const [loggedUser, setLoggedUser] = useState();
  const { user } = ChatState();

  const i = 0;

  const fetchGroups = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat/fetchgroups", config);
      setGroups(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchGroups();
    // eslint-disable-next-line
  }, [fetchAgain]);

  const dataList = [];

  return (
    <>
      <Box
        marginTop={"110px"}
        flexDir="column"
        alignItems="center"
        bg="white"
        w="100%"
        borderRadius="lg"
        borderWidth="1px"
        height={"100%"}
        minH={"600px"}
      >
        <Text
          fontSize={"30px"}
          marginLeft="50px"
          color={"#8FBBDA!important"}
          paddingTop="20px"
        >
          Create and Join Groups
        </Text>

        {/* Side drawer section */}
        <Box
          className="SideDraw"
          marginTop={0}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          padding="5px 10px 5px 10px"
          bg={"white"}
        >
          <Tooltip
            label="Search Groups to chat"
            hasArrow
            placement="bottom-end"
          >
            <Button
              colorScheme="blue"
              width="flex"
              marginLeft={"10px"}
              onClick={onOpen}
            >
              <Search />
              <Text display={{ base: "none", md: "flex" }} pt="4" px="4">
                Search Groups
              </Text>
            </Button>
          </Tooltip>
          <GroupChatModal marginTop="100px">
            <Button
              colorScheme="blue"
              width="flex"
              marginLeft={"10px"}
              onClick={onOpen}
            >
              <Plus size={"20px"} />
              <Text display={{ base: "none", md: "flex" }} pt="4" px="4">
                Create Group
              </Text>
            </Button>
          </GroupChatModal>
        </Box>
        {/* Side drawer section End*/}

        <section>
          <Box
            marginTop={"-60px"}
            flexDir="column"
            alignItems="center"
            bg="white"
            w="100%"
            borderRadius="lg"
            borderWidth="1px"
          >
            {/* CARD START */}
            <Container maxW="80rem" centerContent marginTop={"40px"}>
              {groups
                ? groups.map((group) => (
                    <CardTemp
                      key={group._id}
                      groupId={group._id}
                      title={group.chatName}
                      body={group.groupDesc}
                      loc={group.groupLoc}
                      date={group.groupDate}
                      users={group.users}
                      image={
                        "https://images.unsplash.com/photo-1532498551838-b7a1cfac622e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                      }
                      fetchAgain={fetchAgain}
                    />
                  ))
                : console.log("hello")}
            </Container>
            {/* CARD END */}
          </Box>
        </section>
      </Box>
    </>
  );
};

export default GroupBody;
