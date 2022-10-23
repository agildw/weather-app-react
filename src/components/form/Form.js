import { useState } from "react";
import FormComponent from "./FormComponent";
import ResultComponent from "./ResultComponent";

const Form = () => {
  const [resultState, setResultState] = useState({
    status: false,
    weather: "",
    description: "",
    icon: "",
    temp: "",
    city: "",
    humidity: "",
    feelLike: "",
  });
  const handleResultState = (result) => {
    console.log(result);
    setResultState(result);
  };
  return (
    <div className="flex items-center justify-center h-screen">
      {!resultState.status && (
        <FormComponent
          resultState={resultState}
          handleResultState={handleResultState}
        />
      )}
      {resultState.status && (
        <ResultComponent
          resultState={resultState}
          handleResultState={handleResultState}
        />
      )}
    </div>
  );
};

export default Form;
