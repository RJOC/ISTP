import { Button } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";

export const LoginPanel = () => {
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const navigateLog = useNavigate();
  const { user } = ChatState();

  useEffect(() => {
    if (!user) {
      navigateLog("/login");
    }
  }, [navigateLog]);

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        position: "bottom",
        isClosable: true,
        marginTop: "100px",
      });
      setLoading(false);
      return;
    }

    // console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      // console.log(JSON.stringify(data));
      toast({
        title: "Login Successful",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigateLog("/");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <div className="GrandParent">
      <div className="Parent">
        <section className="Login" id="register">
          <h1>Login</h1>
          <FormControl id="email" isRequired>
            <FormLabel margin={0}>Email Address</FormLabel>
            <Input
              marginBottom={"20px"}
              value={email || ""}
              type="email"
              bg="white"
              placeholder="Enter Your Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel margin={0}>Password</FormLabel>
            <Input
              type="password"
              value={password || ""}
              marginBottom={"20px"}
              bg="white"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
            />
          </FormControl>

          <Button
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            isLoading={loading}
          >
            Login
          </Button>

          <p>Already registered?</p>
          <Link to="/register" style={{ textDecoration: "none" }}>
            {" "}
            <p> Sign up</p>
          </Link>
        </section>
      </div>
    </div>
  );
};
