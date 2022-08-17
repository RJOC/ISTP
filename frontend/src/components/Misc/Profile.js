import {
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { InfoCircle } from "react-bootstrap-icons";

const Profile = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          d={{ base: "flex" }}
          icon={<InfoCircle color="white" />}
          onClick={onOpen}
          background="#3182CE"
        />
      )}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent background={"#8FBBDA"}>
          <ModalHeader />
          <ModalBody d="flex" flexDir="column">
            <div className="center">
              <Image
                borderRadius="full"
                boxSize={"150px"}
                src={
                  user.picture
                    ? user.picture
                    : "https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-2.jpg"
                }
                alt={"User Profile Picture"}
              />
            </div>
            <Text fontSize="30px">{user.name}</Text>
            <Text fontSize="20px">
              {"This will be where the user description goes!"}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Profile;
