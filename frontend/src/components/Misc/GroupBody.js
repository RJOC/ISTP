import React from "react";
import { Search, Plus } from "react-bootstrap-icons";
import { Box, Text } from "@chakra-ui/layout";
import { SimpleGrid, Container } from "@chakra-ui/react";
import CardTemp from "./CardTemp";
import GroupChatModal from "./GroupChatModal";

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

const GroupBody = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dataList = [
    {
      id: "1",
      title: "Internation students",
      longline: "www.google.com",
      body: "Testing this function!",
      image:
        "https://www.planetware.com/photos-large/SCO/scotland-edinburgh-castle-2.jpg",
    },
    {
      id: "2",
      title: "Surf Club",
      body: "Surfers of Scotland",
      image:
        "https://www.visitbritain.com/sites/default/files/styles/consumer_vertical_hero__1920x1080/public/paragraphs_bundles/hero/scotland_0.jpg?itok=moGcC_81",
    },
    {
      id: "3",
      title: "Photo Club ",
      body: "Lets photo Scotland together",
      image:
        "https://deih43ym53wif.cloudfront.net/cairngorms-national-park-scotland-shutterstock_726100102_4ab443fcc9.jpeg",
    },
    {
      id: "4",
      title: "The walkers ",
      body: "We like to walk around Scotland",
      image:
        "https://i.guim.co.uk/img/media/7f434d0e05ac6d8c3ca8fde35f4a0972e03c7cb6/0_181_5482_3291/master/5482.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=56a71cf7af13b5d0b5b6faeedf7579e8",
    },
    {
      id: "5",
      title: "Runners",
      body: "We like to run around Scotland",
      image:
        "https://www.planetware.com/photos-large/SCO/scotland-edinburgh-castle-2.jpg",
    },
    {
      id: "6",
      title: "Joggers",
      body: "We like to jog around Scotland",
      image:
        "https://cdn.pixabay.com/photo/2016/10/22/17/46/mountains-1761292_1280.jpg",
    },
  ];

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
            <Container maxW="80rem" centerContent>
              <SimpleGrid columns={[1, 1, 1, 2]}>
                {dataList.map(function (data) {
                  const { id, title, body, longline, image } = data;
                  return (
                    <CardTemp
                      key={id}
                      title={title}
                      body={body}
                      longline={longline}
                      image={image}
                    />
                  );
                })}
              </SimpleGrid>
            </Container>
            {/* CARD END */}
          </Box>
        </section>
      </Box>
    </>
  );
};

export default GroupBody;
