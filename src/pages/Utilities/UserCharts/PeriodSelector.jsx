import React, { useState } from "react";
import Form from "react-bootstrap/Form";
const PeriodSelector = () => {
    const [selectedValue, setSelectedValue] = useState("month");
    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
        console.log(event.target.value);
    };
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const quarters = [
      "January - March",
      "April - June",
      "July - September",
      "October - December",
    ];
  return (
    <div className="period-selector">
      <Form className="form-selector-times">
        <Form.Check
          inline
          label="year"
          name="group1"
          type="radio"
          id="inline-radio-1"
          value="year"
          checked={selectedValue === "year"}
          onChange={handleRadioChange}
        />
        <Form.Check
          inline
          label="quarter"
          name="group1"
          type="radio"
          id="inline-radio-2"
          value="quarter"
          checked={selectedValue === "quarter"}
          onChange={handleRadioChange}
        />
        <Form.Check
          inline
          label="month"
          name="group1"
          type="radio"
          id="inline-radio-3"
          value="month"
          checked={selectedValue === "month"}
          onChange={handleRadioChange}
        />
      </Form>
      <div className="d-flex">
        {selectedValue === "month" ? (
          <Form.Select>
            {months.map((m, i) => (
              <option key={i} value={m}>
                {m}
              </option>
            ))}
          </Form.Select>
        ) : selectedValue === "quarter" ? (
          <Form.Select>
            {quarters.map((q, i) => (
              <option key={i} value={q}>
                {q}
              </option>
            ))}
          </Form.Select>
        ) : (
          ""
        )}
        <Form.Select>
          <option>2023</option>
        </Form.Select>
      </div>
    </div>
  );
}


export default PeriodSelector