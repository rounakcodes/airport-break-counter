import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { countBreaksWithAirports } from "../../utils/breakCounter";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
`;

const Box = styled.div`
  height: 50px;
  width: 50px;
  border: 0.1px blue solid;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.color ? "green" : "red")};
`;
const BreakCounter = ({ airplaneData }) => {
  const [breakCount, setBreakCount] = useState(0);
  const [breakAirports, setBreakAirports] = useState([]);

  useEffect(() => {
    if (!airplaneData.length) return undefined;
    let { breakCount: count, airports } = countBreaksWithAirports(airplaneData);
    setBreakCount(count);
    setBreakAirports(airports);
  }, [airplaneData]);

  return (
    <>
      <h3>Number of Breaks: {breakCount}</h3>
      <p>(Note: -1 indicates it is not possible to reach destination)</p>
      <Grid columns={airplaneData.length}>
        {airplaneData.map((data, index) => {
          return (
            <Box
              color={
                index === 0 ||
                breakAirports.includes(index) ||
                Boolean(index === airplaneData.length - 1 && breakCount > 0)
              }
            >
              {data}
            </Box>
          );
        })}
      </Grid>
    </>
  );
};
export default BreakCounter;
