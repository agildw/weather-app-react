import {
  Box,
  InputGroup,
  Text,
  Input,
  Button,
  Divider,
  HStack,
} from "@chakra-ui/react";
import styles from "./FormComponent.module.css";
import axios from "axios";
import { useState } from "react";
const FormComponent = () => {
  //Get geolocation
  const [isDGeoDenied, setIsDGeoDenied] = useState(false);
  const getLocation = async () => {
    //Check if permission is
    if (navigator.geolocation) {
      //Wait for result
      if (
        await navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            if (result.state === "granted") {
              console.log("granted");
              return true;
            } else if (result.state === "prompt") {
              console.log("prompted");
              return true;
            } else if (result.state === "denied") {
              console.log("denied");
              return false;
            }
            result.onchange = function () {
              console.log(result.state);
            };
          })
      )
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
            )
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  // const showPosition = (position) => {
  //   // return result
  //   console.log("Latitude: " + position.coords.latitude);
  //   console.log("Longitude: " + position.coords.longitude);
  //   return position;
  //   return {
  //     lat: position.coords.latitude,
  //     long: position.coords.longitude,
  //   };
  // };

  const handleGetLocation = () => {
    ///Get location
    getLocation();
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    //Get value form
    const city = e.target.city.value;
    console.log(city);
    //Get data from API
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // axios
    //   .post("http://localhost:3000/api", data)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      className={styles.box}
      w="35rem"
      h="20rem"
      p={8}
    >
      <Text fontSize="2xl" as="b" color="teal" mb={8}>
        Weather App
      </Text>
      <form onSubmit={handleSubmitForm}>
        <Box display="flex" flexDirection="row">
          <InputGroup size="sm">
            <Input
              placeholder="Enter City Name"
              size="lg"
              id="city"
              focusBorderColor="teal.500"
            />
          </InputGroup>
          <Button colorScheme="teal" size="lg" ml={2} w="10rem" type="submit">
            Search
          </Button>
        </Box>
        <HStack mt={3}>
          <Divider orientation="horizontal" borderColor="teal" />
          <Text fontSize="sm" color="teal" as="b">
            or
          </Text>
          <Divider orientation="horizontal" borderColor="teal" />
        </HStack>
        <Button
          colorScheme="teal"
          size="lg"
          mt={3}
          w="100%"
          onClick={handleGetLocation}
        >
          Get Current Location
        </Button>
      </form>
    </Box>
  );
};

export default FormComponent;
