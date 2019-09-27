import React, { useState } from "react";
import { useAuth0 } from "../react-auth0-wrapper";

const ExternalAPI = () => {
  const [showResult, setShowResult] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { getTokenSilently } = useAuth0();

  const testData = {
    "StudentId": "0011D00000aLQ9nQAG",
    "PublicToken": "public-sandbox-b0e2c4ee-a763-4df5-bfe9-46a46bce993d",
    "CreatedDateTime": 1569434403747
  }


  const callApi = async () => {
    try {
      const token = await getTokenSilently();

      const response = await fetch("/Dev/plaid", {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(testData)
      });

      const responseData = await response.json();

      setShowResult(true);
      setApiMessage(responseData);
      setShowError(false);
      setErrorMessage("");
    } catch (error) {
      setShowResult(false);
      setApiMessage("");
      setShowError(true);
      setErrorMessage(error);
      console.log(error);
    }
  }

  return (
    <>
      <h1>External API</h1>
      <button onClick={callApi}>Ping API</button>
      {showResult && <code>{JSON.stringify(apiMessage, null, 2)}</code>}
      {showError && <code>{JSON.stringify(errorMessage, null, 2)}</code>}
    </>
  )
};

export default ExternalAPI;
