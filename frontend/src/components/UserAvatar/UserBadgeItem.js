import { Badge } from "@chakra-ui/layout";
import { Backspace } from "react-bootstrap-icons";
const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name}
      {admin === user._id && <span> (Admin)</span>}
      &nbsp;
      <Backspace size="15px" />
    </Badge>
  );
};

export default UserBadgeItem;
