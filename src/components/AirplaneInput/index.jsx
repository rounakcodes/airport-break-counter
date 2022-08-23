import React from "react";

const AirplaneInput = ({ airplaneData, setAirplaneData }) => {
  const changeAirplaneData = (event) => {
    let { value } = event.target;
    // allow only numbers and commas
    let validatedValue = value.replace(/[^0-9,]/g, "");
    if (validatedValue !== value) value = validatedValue;
    setAirplaneData(validatedValue);
  };

  return <>
    <h3>Enter Airplane Data</h3>
    <p>Example: <code>2,3,4</code></p>
    <input style={{fontSize: '20px'}} value={airplaneData} onChange={changeAirplaneData} />
    </>
};

export default AirplaneInput;
