import "../App.css";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PasswordStrengthBar from "react-password-strength-bar";

export const RegisterPanel = () => {
  const toast = useToast();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();
  const [name, setName] = useState();
  const [picture, setPicture] = useState();
  const [loading, setLoading] = useState(false);

  const navigateReg = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigateReg("/chat");
  }, [navigateReg]);

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please fill out all the fields!",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match!",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password, picture);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          picture,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigateReg("/");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const postDetails = (picture) => {
    setLoading(true);
    if (picture === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(picture);
    if (picture.type === "image/jpeg" || picture.type === "image/png") {
      const data = new FormData();
      data.append("file", picture);
      data.append("upload_preset", "istp");
      data.append("cloud_name", "dq5dpwsnj");
      fetch("https://api.cloudinary.com/v1_1/dq5dpwsnj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPicture(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  return (
    <div className="GrandParent">
      <div className="Parent">
        <section className="Register" id="register">
          <h1>Register</h1>

          <FormControl id="email" marginBottom="10px" isRequired>
            <FormLabel margin={0}>Email Address:</FormLabel>
            <Input
              type="email"
              placeholder="Enter Your Email Address"
              bg="white"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel margin={0}>Password:</FormLabel>
            <Input
              bg="white"
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="passbar">
              <PasswordStrengthBar password={password} />
            </div>
          </FormControl>

          <FormControl id="passwordCon" marginBottom="10px" isRequired>
            <FormLabel margin={0}>Confirm Password:</FormLabel>
            <Input
              bg="white"
              type="password"
              placeholder="Confirm password"
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </FormControl>

          <FormControl id="full-name" marginBottom="10px" isRequired>
            <FormLabel margin={0}>Full Name:</FormLabel>
            <Input
              bg="white"
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl marginBottom="10px" id="pic">
            <FormLabel margin={0}>Upload a Profile Picture</FormLabel>
            <Input
              variant="outline"
              className="noborder"
              type="file"
              p={1.5}
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0])}
            />
          </FormControl>
          <Button
            className="regButton"
            colorScheme="blue"
            width="100%"
            onClick={submitHandler}
            isLoading={loading}
          >
            Sign Up
          </Button>
          <p>Already registered?</p>
          <Link to="/login" style={{ textDecoration: "none" }}>
            Sign in{" "}
          </Link>
        </section>
      </div>
    </div>
  );
};
