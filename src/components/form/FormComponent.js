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
import { ArrowBackIcon } from "@chakra-ui/icons";
const FormComponent = (props) => {
  //Get geolocation
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState({
    isError: false,
    message: "",
  });
  const [resultFetch, setResultFetch] = useState({
    status: false,
    weather: "",
    description: "",
    icon: "",
    temp: "",
    city: "",
    humidity: "",
    feelLike: "",
  });
  const getLocation = async () => {
    //Check if permission is
    if (navigator.geolocation) {
      //Wait for result
      if (
        await navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            if (result.state === "granted") {
              // console.log("granted");
              return true;
            } else if (result.state === "prompt") {
              // console.log("prompted");
              return true;
            } else if (result.state === "denied") {
              // console.log("denied");
              setIsError({
                isError: true,
                message: "Please allow geolocation",
              });
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

          setIsError({
            isError: false,
            message: "",
          });
          setIsFetching(true);
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
            )
            .then((res) => {
              setIsFetching(false);
              setResultFetch({
                status: true,
                weather: res.data.weather[0].main,
                description: res.data.weather[0].description,
                icon: res.data.weather[0].icon,
                temp: res.data.main.temp,
                city: res.data.name,
                humidity: res.data.main.humidity,
                feelLike: res.data.main.feels_like,
              });
              props.handleResultState({
                status: true,
                weather: res.data.weather[0].main,
                description: res.data.weather[0].description,
                icon: res.data.weather[0].icon,
                temp: res.data.main.temp,
                city: res.data.name,
                humidity: res.data.main.humidity,
                feelLike: res.data.main.feels_like,
              });
              console.log(resultFetch);
            })
            .catch((err) => {
              setIsFetching(false);
              if (err.response.status === 404) {
                return setIsError({
                  isError: true,
                  message: "City not found",
                });
              }
              setIsError({
                isError: true,
                message: "Something went wrong",
              });
            });
        });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleGetLocation = () => {
    ///Get location
    getLocation();
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    //Get value form
    const city = e.target.city.value;
    //Check if city is empty
    if (city === "") {
      return setIsError({
        isError: true,
        message: "Please enter a city",
      });
    }
    console.log(city);
    //Get data from API
    setIsError({
      isError: false,
      message: "",
    });
    setIsFetching(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
      .then((res) => {
        setIsFetching(false);
        setResultFetch({
          status: true,
          weather: res.data.weather[0].main,
          description: res.data.weather[0].description,
          icon: res.data.weather[0].icon,
          temp: res.data.main.temp,
          city: res.data.name,
          humidity: res.data.main.humidity,
          feelLike: res.data.main.feels_like,
        });
        props.handleResultState({
          status: true,
          weather: res.data.weather[0].main,
          description: res.data.weather[0].description,
          icon: res.data.weather[0].icon,
          temp: res.data.main.temp,
          city: res.data.name,
          humidity: res.data.main.humidity,
          feelLike: res.data.main.feels_like,
        });
        console.log(res.data);
      })
      .catch((err) => {
        setIsFetching(false);
        if (err.response.status === 404) {
          return setIsError({
            isError: true,
            message: "City not found",
          });
        }
        setIsError({
          isError: true,
          message: "Something went wrong",
        });
        console.log(err);
      });
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
      <Text fontSize="2xl" as="b" color="teal" mb={isError ? 5 : 8}>
        Weather App
      </Text>

      {isFetching && (
        <Box
          mb={3}
          bgColor="#D3DEDE"
          h={10}
          alignItems="center"
          display="flex"
          justifyContent="center"
        >
          <Text fontSize="md" color="teal.500">
            Fetching data...
          </Text>
        </Box>
      )}
      {isError.isError && (
        <Box
          mb={3}
          bgColor="#F4E7E1"
          h={10}
          alignItems="center"
          display="flex"
          justifyContent="center"
        >
          <Text fontSize="md" color="teal">
            {isError.message}
          </Text>
        </Box>
      )}
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
      {resultFetch.status && (
        <Box
          display="flex"
          flexDirection="column"
          mt={5}
          bgColor="#D3DEDE"
          p={5}
          borderRadius="md"
        >
          <Box>
            <ArrowBackIcon />
            <Text fontSize="xl" as="b" color="teal">
              {resultFetch.city}
            </Text>
          </Box>
          {/* <Text fontSize="xl" as="b" color="teal">
            {resultFetch.city}
          </Text> */}
          <Text fontSize="md" color="teal">
            {resultFetch.weather}
          </Text>
          <Text fontSize="md" color="teal">
            {resultFetch.temp}°C
          </Text>
          <Text fontSize="md" color="teal">
            Humidity: {resultFetch.humidity}%
          </Text>
          <Text fontSize="md" color="teal">
            Feels like: {resultFetch.feelLike}°C
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default FormComponent;
