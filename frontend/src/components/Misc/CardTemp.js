import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Text,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

export default function CardTemp(props) {
  const { title, body, image } = props;

  return (
    <Center height={"100%"} maxH="100rem" p={20}>
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
          <Button maxWidth="100px" colorScheme="blue" mr={3} my={2}>
            Join Group
          </Button>
          {/* <Avatar
            src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
            alt={"Author"}
          /> */}
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text align={"flex"} color={"gray.500"}>
              Next Trip:
            </Text>
            <Text align={"flex"} color={"gray.500"}>
              Location:
            </Text>
            <Text align={"flex"} color={"gray.500"}>
              Date:
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
