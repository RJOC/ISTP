import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Text,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import { useEffect, useState } from "react";
import moment from "moment";

export default function CardTemp(props) {
  const [isActive, setIsActive] = useState(false);
  const { groupId, title, body, loc, date, users, image } = props;
  const toast = useToast();
  const { user } = ChatState();

  const handleAddUser = async () => {
    if (users.find((u) => u._id === user._id) || isActive) {
      toast({
        title: "You are already in this group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupadd`,
        {
          chatId: groupId,
          userId: user._id,
        },
        config
      );
      toast({
        title: "Group Joined!",
        status: "success",
        description: "Continue to chats to interact!",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setIsActive((current) => !current);
    } catch (error) {
      toast({
        title: "Error Occured!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <Center height={"100%"} maxH="100rem" maxW="100rem" width={"100%"} p={6}>
      <Box
        maxW={"600px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box
          h={"210px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
          textAlign="center"
        >
          <Image
            height={"100%"}
            objectFit="cover"
            alt="Image of location"
            src={image}
            width="100%"
          />
        </Box>

        <Stack>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            Group
          </Text>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {title}
          </Heading>
          <Text color={"gray.500"}>{body}</Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Button
            maxWidth="100px"
            onClick={handleAddUser}
            colorScheme={isActive ? "green" : "blue"}
            mr={3}
            my={2}
          >
            {isActive ? "Joined" : "Join Group"}
          </Button>
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text align={"flex"} color={"gray.500"}>
              Next Trip:
            </Text>
            <Text align={"flex"} color={"gray.500"}>
              Location: {loc}
            </Text>
            <Text align={"flex"} color={"gray.500"}>
              Date: {moment(date).format("DD/MM/YYYY")}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
