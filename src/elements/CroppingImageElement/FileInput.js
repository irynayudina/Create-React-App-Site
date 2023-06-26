import React, { useRef } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  ButtonGroup,
} from "react-bootstrap";
function FileInput({ onImageSelected }) {
  const inputRef = useRef();

  const handleOnChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function (e) {
        onImageSelected(reader.result);
      };
    }
  };

  const onChooseImg = () => {
    inputRef.current.click();
  };

  return (
    <div className="image-chooser-form">
      <Form>
        <Form.Group>
          <Form.Label>Choose another image for profile pic</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            size="sm"
            onChange={handleOnChange}
            ref={(ref) => {
              inputRef.current = ref;
            }}
          />
        </Form.Group>
      </Form>
    </div>
  );
}

export default FileInput;
