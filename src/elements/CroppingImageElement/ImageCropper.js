import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { Container, Row, Col, Button, Form, ButtonGroup } from "react-bootstrap";

function ImageCropper({ image, onCropDone, onCropCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(1 / 1);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onAspectRatioChange = (event) => {
    setAspectRatio(event.target.value);
  };

  return (
    <div className="cropper">
      <div>
        <Cropper
          image={image}
          aspect={aspectRatio}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          style={{
            containerStyle: {
              position: "relative",
              width: "50%",
              margin: "0 auto",
              height: "300px",
              overflow: "hidden",
            },
            cropAreaStyle: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              height: "100%",
              border: "1px solid #ccc",
              borderRadius: "50%",
            },
          }}
        />
      </div>

      <div className="action-btns centered-btns">
        <Form.Group onChange={onAspectRatioChange}>
          <ButtonGroup toggle>
            <Form.Check type="radio" label="1:1" value={1 / 1} name="ratio" />
            {/* <Form.Check type="radio" label="5:4" value={5 / 4} name="ratio" />
            <Form.Check type="radio" label="4:3" value={4 / 3} name="ratio" />
            <Form.Check type="radio" label="3:2" value={3 / 2} name="ratio" />
            <Form.Check type="radio" label="5:3" value={5 / 3} name="ratio" />
            <Form.Check type="radio" label="16:9" value={16 / 9} name="ratio" />
            <Form.Check type="radio" label="3:1" value={3 / 1} name="ratio" /> */}
          </ButtonGroup>
        </Form.Group>

        <div className="d-flex">
          <Button variant="outline-secondary" onClick={onCropCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => onCropDone(croppedArea)}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ImageCropper;
