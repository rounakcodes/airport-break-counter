import React, { useEffect, useState } from "react";
import { countBreaks } from "../../utils/breakCounter";

const BreakCounter = ({ airplaneData }) => {
  const [breakCount, setBreakCount] = useState(0);

  useEffect(() => {
    if (!airplaneData.length) return undefined;
    let count = countBreaks(airplaneData);
    setBreakCount(count);
  }, [airplaneData]);

  return (
    <>
      <h3>Number of Breaks: {breakCount}</h3>
      <p>(Note: -1 indicates it is not possible to reach destination)</p>
    </>
  );
};
export default BreakCounter;
