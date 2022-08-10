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
      summary:
        "The oldest fortified place in Europe, Edinburgh Castle is the perfect location to dive into the rich history that Scotland has to offer.",
      longline: "www.google.com",
      image:
        //https://commons.wikimedia.org/wiki/File:Edinburgh_Castle_from_the_Grassmarket.jpg
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Edinburgh_Castle_from_the_Grassmarket.jpg/1600px-Edinburgh_Castle_from_the_Grassmarket.jpg?20210816212736",
    },
    {
      id: "2",
      location: "Camera Obscura & World of Illusions",
      summary:
        "From vortex tunnels to shrinking rooms, Camera Obscura and the World of Illusions is an experience where nothing is actually as it seems.",
      image:
        //https://commons.wikimedia.org/wiki/File:Outlook_Tower,_Edinburgh,_January_2021.jpg
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Outlook_Tower%2C_Edinburgh%2C_January_2021.jpg/1600px-Outlook_Tower%2C_Edinburgh%2C_January_2021.jpg?20210124131307",
    },
    {
      id: "3",
      location: "Authur's Seat",
      summary:
        "Authur's seat, an acient volcano which is home to some of the best views in Edinburgh. Located in Holyrood Park, it is 340 million years old.",
      image:
        //https://commons.wikimedia.org/wiki/File:Edinburgh_Arthur_Seat_dsc06165.jpg
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Edinburgh_Arthur_Seat_dsc06165.jpg/1600px-Edinburgh_Arthur_Seat_dsc06165.jpg?20050716211839",
    },
    {
      id: "4",
      location: "The Kelpies",
      summary:
        "Between Falkirk and Grangemouth you will find the 30-metre tall sculptures of hourse-heads. A monument to the horse-powered heritage across the United Kingdom and Scotland.",
      image:
        //https://commons.wikimedia.org/wiki/File:The_Kelpies_16-9_Stitch.jpg
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/The_Kelpies_16-9_Stitch.jpg/1600px-The_Kelpies_16-9_Stitch.jpg?20160117151632",
    },
    {
      id: "5",
      location: "Calton Hill",
      summary:
        "Looking for a quick escape from the city? Calton Hill is home to city views, an art galary and the unfinished National Monument. An edinburgh must see!",
      image:
        //https://commons.wikimedia.org/wiki/File:View_of_Edinburgh_from_Calton_Hill_2014_05.JPG
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/View_of_Edinburgh_from_Calton_Hill_2014_05.JPG/1426px-View_of_Edinburgh_from_Calton_Hill_2014_05.JPG?20140801175931",
    },
    {
      id: "6",
      location: "Edinburgh Zoo",
      summary:
        "Europe's leading centre of conservation, education and research, Edinburgh Zoo is 82 acres of wooded hillside, home to over 2,500 amazing and endangered animals.",
      image:
        //https://commons.wikimedia.org/wiki/File:Meerkats_at_Edinburgh_Zoo_-_geograph.org.uk_-_3292441.jpg
        "https://upload.wikimedia.org/wikipedia/commons/1/1b/Meerkats_at_Edinburgh_Zoo_-_geograph.org.uk_-_3292441.jpg?20220311011522",
    },
    {
      id: "7",
      location: "Loch Ness",
      summary:
        "37km southwest of Inverness you will find the stunning Loch Ness. The largest freshwater loch in the Highlands of Scotland. Keep an eye out for the Loch Ness Monster.",
      image:
        //https://commons.wikimedia.org/wiki/File:Urquhart_Castle_2_20211024.jpg
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Urquhart_Castle_2_20211024.jpg/1587px-Urquhart_Castle_2_20211024.jpg?20211123174832",
    },
    {
      id: "8",
      location: "Royal Mile",
      summary:
        "A succession of streets in Old Town Edinburgh formulates the Royal Mile. It runs between Holyrood Palace and Edinburgh Castle.",
      image:
        //https://commons.wikimedia.org/wiki/File:Royal_Mile,_Edinburgh_-_geograph.org.uk_-_502544.jpg
        "https://upload.wikimedia.org/wikipedia/commons/5/5b/Royal_Mile%2C_Edinburgh_-_geograph.org.uk_-_502544.jpg?20110205095945",
    },
    {
      id: "9",
      location: "Dynamic Earth",
      summary:
        "The Dynamic Earth tells the story of planet Earth. It starts at the Big Bang and takes you all the way through to the modern day.",
      image:
        //https://commons.wikimedia.org/wiki/File:Dynamic_Earth_-_geograph.org.uk_-_2469969.jpg
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Dynamic_Earth_-_geograph.org.uk_-_2469969.jpg/1599px-Dynamic_Earth_-_geograph.org.uk_-_2469969.jpg?20210811001052",
    },
    {
      id: "10",
      location: "Scott Monument",
      summary:
        "In Princes Street Gardens you will find the Scott Monument. It stands 61 meters tall and is one of the most iconic landmarks in Edinburgh.",
      image:
        //https://commons.wikimedia.org/wiki/File:The_Scott_Monument_on_Princes_Street,_Edinburgh.jpg
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/The_Scott_Monument_on_Princes_Street%2C_Edinburgh.jpg/1600px-The_Scott_Monument_on_Princes_Street%2C_Edinburgh.jpg?20200109105217",
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
