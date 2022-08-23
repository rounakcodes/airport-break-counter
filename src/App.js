import React, {useState} from 'react'
import Wrapper from './components/Wrapper'
import AirplaneInput from "./components/AirplaneInput";
import BreakCounter from "./components/BreakCounter";

function App() {
  const [airplaneData, setAirplaneData] = useState("");

  return (
    <Wrapper>
      <AirplaneInput airplaneData={airplaneData} setAirplaneData={setAirplaneData} />
      <BreakCounter airplaneData={airplaneData.split(",").map((str) => Number(str))}/>
    </Wrapper>
  );
}

export default App;
