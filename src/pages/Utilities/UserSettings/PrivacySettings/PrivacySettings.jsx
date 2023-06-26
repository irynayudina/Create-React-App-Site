// import React from 'react'
import './PrivacySettings.scss'
import {Button} from "react-bootstrap";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { toast } from "react-toastify";
import Loader from "../../../../elements/Loader";
import { setCredentials } from "../../../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../../../slices/usersApiSlice";

const PrivacySettings = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  const [chartsPermission, setChartsPermission] = React.useState();
  const [linksPermission, setLinksPermission] = React.useState("all");
  const [contactPermission, setContactPermission] = React.useState("all");

  const handleChangeCharts = (event) => {
    setChartsPermission(event.target.value);
  };
  const handleChangeLinks = (event) => {
    setLinksPermission(event.target.value);
  };
  const handleChangeContact = (event) => {
    setContactPermission(event.target.value);
  };
  const handleSubmit = async (event) => {
    console.log(chartsPermission, linksPermission, contactPermission);
  }
  return (
    <div className="privacy-settings text-center">
      <div className="text-settings">
        <div className="description-setting">
          <span>Set progress charts visible:</span>
        </div>
        <div className="controls-setting">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Progress charts visible to
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={chartsPermission}
              label="Progress charts visible to"
              onChange={handleChangeCharts}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="following">
                Only accounts followed by me
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="text-settings">
        <div className="description-setting">
          <span>Set social links visible:</span>
        </div>
        <div className="controls-setting">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Progress charts visible to
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={linksPermission}
              label="Progress charts visible to"
              onChange={handleChangeLinks}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="following">
                Only accounts followed by me
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="text-settings">
        <div className="description-setting">
          <span>Set contact info visible:</span>
        </div>
        <div className="controls-setting">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Progress charts visible to
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={contactPermission}
              label="Progress charts visible to"
              onChange={handleChangeContact}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="following">
                Only accounts followed by me
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <Button
        variant="primary"
        size="md"
        className="mt-2"
        onClick={handleSubmit}
      >
        Save changes
      </Button>
    </div>
  );
}

export default PrivacySettings