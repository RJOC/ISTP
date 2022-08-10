import React from "react";
import Card from "react-bootstrap/Card";
import { SimpleGrid, Container } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/react";
import CardView from "./Misc/CardView";

const DiscoverContent = () => {
  const dataList = [
    {
      id: "1",
      location: "Edinburgh Castle",
      summary: "",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Edinburgh_Castle_from_the_south_east.JPG/1600px-Edinburgh_Castle_from_the_south_east.JPG?20130906211529",
    },
    {
      id: "2",
      location: "Camera Obscura & World of Illusions",
      summary: "",
      image:
        "https://www.visitbritain.com/sites/default/files/styles/consumer_vertical_hero__1920x1080/public/paragraphs_bundles/hero/scotland_0.jpg?itok=moGcC_81",
    },
    {
      id: "3",
      location: "Authur's Seat",
      summary: "",
      image:
        "https://deih43ym53wif.cloudfront.net/cairngorms-national-park-scotland-shutterstock_726100102_4ab443fcc9.jpeg",
    },
    {
      id: "4",
      location: "The Kelpies",
      summary: "",
      image:
        "https://i.guim.co.uk/img/media/7f434d0e05ac6d8c3ca8fde35f4a0972e03c7cb6/0_181_5482_3291/master/5482.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=56a71cf7af13b5d0b5b6faeedf7579e8",
    },
    {
      id: "5",
      location: "Calton Hill",
      summary: "",
      image:
        "https://www.planetware.com/photos-large/SCO/scotland-edinburgh-castle-2.jpg",
    },
    {
      id: "6",
      location: "Edinburgh Zoo",
      summary: "",
      image:
        "https://cdn.pixabay.com/photo/2016/10/22/17/46/mountains-1761292_1280.jpg",
    },
    {
      id: "7",
      location: "Loch Ness",
      summary: "",
      image:
        "https://cdn.pixabay.com/photo/2016/10/22/17/46/mountains-1761292_1280.jpg",
    },
    {
      id: "8",
      location: "Royal Mile",
      summary: "",
      image:
        "https://cdn.pixabay.com/photo/2016/10/22/17/46/mountains-1761292_1280.jpg",
    },
    {
      id: "9",
      location: "Dynamic Earth",
      summary: "",
      image:
        "https://cdn.pixabay.com/photo/2016/10/22/17/46/mountains-1761292_1280.jpg",
    },
    {
      id: "10",
      location: "Scott Monument",
      summary: "",
      image:
        "https://cdn.pixabay.com/photo/2016/10/22/17/46/mountains-1761292_1280.jpg",
    },
  ];

  return (
    <section>
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
          The Editor's Choice of Attractions in Scotland
        </Text>
        {/* CARD START */}
        <Container maxW="80rem" centerContent>
          <SimpleGrid columns={[1, 1, 1, 2]}>
            {dataList.map(function (data) {
              const { id, location, summary, longLine, image } = data;
              return (
                <CardView
                  key={id}
                  location={location}
                  summary={summary}
                  longLine={longLine}
                  image={image}
                />
              );
            })}
          </SimpleGrid>
        </Container>
        {/* CARD END */}
      </Box>
    </section>
  );
};

export default DiscoverContent;
