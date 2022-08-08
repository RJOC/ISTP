import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
  Textarea,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [groupChatDesc, setGroupChatDesc] = useState();
  const [groupChatLocation, setGroupChatLocation] = useState();
  const [groupChatDate, setGroupChatDate] = useState();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const { user, chats, setChats } = ChatState();

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
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
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (
      !groupChatName ||
      !selectedUsers ||
      !groupChatDesc ||
      !groupChatLocation ||
      !groupChatDate
    ) {
      toast({
        title: "Please fill out all the fields above!",
        status: "warning",
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
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
          desc: groupChatDesc,
          location: groupChatLocation,
          tripdate: groupChatDate,
        },
        config
      );
      setChats([data, ...chats]);
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Problem Creating Group Chat!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal position="absolute" onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent marginTop="120px">
          <ModalHeader
            fontSize="30px"
            d="flex"
            justifyContent="center"
            color={"#3182CE"}
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            {/* GroupName */}
            <FormControl>
              <Text marginBottom={0} color="#718096">
                Group Name:
              </Text>
              <Input
                placeholder="Group Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            {/* Description */}
            <FormControl>
              <Text marginBottom={0} color="#718096">
                Group Description:
              </Text>
              <Textarea
                placeholder="Group Description"
                mb={3}
                onChange={(f) => setGroupChatDesc(f.target.value)}
              />
            </FormControl>
            {/* Location */}
            <FormControl>
              <Text marginBottom={0} color="#718096">
                Trip Location:
              </Text>
              <Input
                placeholder="Trip Location"
                mb={3}
                onChange={(g) => setGroupChatLocation(g.target.value)}
              />
            </FormControl>

            {/* Date */}
            <FormControl>
              <Text marginBottom={0} color="#718096">
                Trip Date:
              </Text>
              <Input
                type="date"
                marginTop={0}
                size="md"
                mb={3}
                onChange={(h) => setGroupChatDate(h.target.value)}
              />
            </FormControl>

            {/* Add users */}
            <FormControl>
              <Text marginBottom={0} color="#718096">
                Add Users:
              </Text>
              <Input
                placeholder="Add Some Users "
                mb={3}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w="100%" d="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {loading ? (
              //<ChatLoading />
              <div>Loading...</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue">
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
