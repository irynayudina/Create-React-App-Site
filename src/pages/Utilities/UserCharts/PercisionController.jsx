import React, { useState, useRef } from "react";
import { Slider } from "@mui/material";
import Box from "@mui/material/Box";
import Form from "react-bootstrap/Form";

const PercisionController = () => {
    const [percision, setPercision] = useState("1 day");
    const getPeriodName = (value) => {
      const periods = ["1 day", "2 days", "3 days", "4 days", "5 days", "6 days", "1 week"];
      return periods[value - 1];
    };
    const handleChange = (event, value) => {
      setPercision(getPeriodName(value));
    };
  return (
    <div className="percision-contoll">
      <Box sx={{ width: 300 }}>
        <Slider
          aria-label="Month"
          defaultValue={1}
          getAriaValueText={getPeriodName}
          valueLabelDisplay="auto"
          step={2}
          marks
          min={1}
          max={7}
          onChange={handleChange}
        />
        <div className="text-muted text-center">
          Selected percision - {percision}
        </div>
      </Box>
    </div>
  );
}

export default PercisionController