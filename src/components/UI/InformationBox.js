import { Box, Text } from "@chakra-ui/react";

const InformationBox = (props) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      backgroundColor="#508991"
      alignItems="center"
      {...props}
    >
      {props.icon}
      <Box display="flex" flexDirection="column" ml={3}>
        <Text fontSize="md" color="white" as="b">
          {props.title}
        </Text>
        <Text fontSize="md" color="white">
          {props.description}
        </Text>
      </Box>
    </Box>
  );
};

export default InformationBox;
