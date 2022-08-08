import React from "react";
import { Stack } from "@chakra-ui/layout";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/skeleton";

const ChatLoading = () => {
  return (
    <Stack alignItems={"center"}>
      <SkeletonCircle height="50px" />
    </Stack>
  );
};

export default ChatLoading;
