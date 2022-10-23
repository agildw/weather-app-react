import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import LocationIcon from "../svg/LocationIcon";
import BrokenClouds from "../svg/weatherCondition/BrokenClouds";
// import InformationBox from "../UI/InformationBox";
import styles from "./FormComponent.module.css";
const ResultComponent = (props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      className={styles.box}
      w="35rem"
      h="30rem"
      p={8}
      bgColor="#172A3A"
    >
      <Box display="flex" flexDirection="row" justifyContent="flex-start">
        <Button
          variant="ghost"
          _hover={{ backgroundColor: "transparent" }}
          _focus={{ backgroundColor: "transparent" }}
          onClick={() =>
            props.handleResultState({
              status: false,
              weather: "",
              description: "",
              icon: "",
              temp: "",
              city: "",
              humidity: "",
              feelLike: "",
            })
          }
        >
          <ArrowBackIcon color="white" w={8} h={8} />
        </Button>
        <Box
          flexGrow={{ base: 0.2, md: 0.7, lg: 0.75, xl: 0.7, "2xl": 0.7 }}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          justifySelf="center"
        >
          <LocationIcon width={40} height={35} />
          <Text fontSize="2xl" color="white">
            {props.resultState.city}
          </Text>
        </Box>
      </Box>
      <Box
        mt={5}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignContent="center"
        alignItems="center"
      >
        <BrokenClouds width={200} height={200} />
        <Text fontSize="3xl" color="white">
          {props.resultState.description}
        </Text>
        <Text fontSize="5xl" as="b" color="white">
          {props.resultState.temp} C
        </Text>
      </Box>
      {/* <Box
        mt={5}
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
        alignContent="flex-start"
        bottom={0}
      >
        <InformationBox
          icon={<LocationIcon />}
          title={props.resultState.feelLike}
          description="Feels Like"
          flexGrow={1}
        />
        <InformationBox
          icon={<LocationIcon />}
          title={props.resultState.feelLike}
          description="Feels Like"
          flexGrow={1}
        />
      </Box> */}
    </Box>
  );
};

export default ResultComponent;
