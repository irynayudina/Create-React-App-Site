import React from 'react'
import { Button } from "react-bootstrap";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import './SecuritySettings.scss'


import { toast } from "react-toastify";
import Loader from "../../../../elements/Loader";
import { setCredentials } from "../../../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../../../slices/usersApiSlice";

const SecuritySettings = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateUserMutation();
  
  const handleSubmit = async (event) => { 
    event.preventDefault(); 
    const data = new FormData(event.currentTarget);
    const { phone, email, newPassword, repeatPassword } = Object.fromEntries(data);
    if (repeatPassword !== newPassword) {
      toast.error('Passwords don\'t match')
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          email,
          phone,
          password: newPassword,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  }
  return (
    <div className="security-settings">
      <div className="text-settings">
        <div className="description-setting">
          <span>Login phone:</span>
        </div>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          className="controls-setting"
        >
          <TextField
            fullWidth
            required
            id="phone"
            label="Enter new login phone"
            name="phone"
            autoComplete="phone"
          />
          <Button variant="primary" size="sm" type="submit">
            Save changes
          </Button>
        </Box>
      </div>
      <div className="text-settings">
        <div className="description-setting">
          <span>Login email:</span>
        </div>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          className="controls-setting"
        >
          <TextField
            required
            fullWidth
            id="email"
            label="Enter new login email"
            name="email"
            autoComplete="email"
          />
          <Button variant="primary" size="sm" type="submit">
            Save changes
          </Button>
        </Box>
      </div>
      <div className="text-settings">
        <div className="description-setting">
          <span>Change password:</span>
        </div>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          className="controls-setting"
        >
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="password"
                id="newPassword"
                label="New Password"
                name="newPassword"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="password"
                id="repeatPassword"
                label="Repeat Password"
                name="repeatPassword"
              />
            </Grid>
          </Grid>
          <Button variant="primary" size="sm" type="submit">
            Save changes
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default SecuritySettings