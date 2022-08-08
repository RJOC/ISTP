import React from "react";
import { Center, Square } from "@chakra-ui/react";
import {
  Box,
  Flex,
  AspectRatio,
  Image,
  Text,
  Link,
  Button,
  Stack,
} from "@chakra-ui/react";

function CardView(props) {
  const { location, summary, longLine, image } = props;

  return (
    <Box
      p={4}
      display={{ md: "flex" }}
      maxWidth="32rem"
      borderWidth={1}
      margin={2}
    >
      <Stack
        align={{ base: "center", md: "stretch" }}
        textAlign={{ base: "center", md: "left" }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
      >
        <Image
          boxSize="400px"
          objectFit="cover"
          alt="Image of location"
          src={image}
        />
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="lg"
          letterSpacing="wide"
          color="#3183CE!important"
        >
          {location}
        </Text>
        {/* <Link
          my={1}
          display="block"
          fontSize="md"
          lineHeight="normal"
          fontWeight="semibold"
          href="#"
        >
          {longLine}
        </Link> */}
        <Text my={2} textAlign="justify" paddingRight={"50px"} color="gray.500">
          {summary}
        </Text>
        <Button maxWidth="100px" colorScheme="blue" mr={3} my={2}>
          Create trip
        </Button>
      </Stack>
    </Box>
  );
}

export default CardView;
