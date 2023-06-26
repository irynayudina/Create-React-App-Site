import React, {useState} from 'react'
import './TopNav.scss'
import { Button } from "react-bootstrap";
import PopUp from "../../../elements/PopUp/PopUp";
import { Form, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  BsFillGearFill,
  BsFillTrashFill,
  BsPencilSquare,
  BsCodeSlash,
  BsFillHandThumbsUpFill,
  BsClock,
} from "react-icons/bs";
const TopNav = () => {
  const [closePopup, setClosePopup] = useState();
  return (
    <div className="topnav">
      <div className="activeusers">
        <div className="actvusr owner">
          <div className="userpic"></div>
          <p className="username">Owner User</p>
        </div>
        <div className="actvusr">
          <div className="userpic"></div>
          <p className="username">User 1</p>
        </div>
        <div className="actvusr">
          <div className="userpic"></div>
          <p className="username">User 2</p>
        </div>
        <div className="actvusr">
          <div className="userpic"></div>
          <p className="username">User 3</p>
        </div>
      </div>
      <div className="buttons">
        <Button size="sm">Save</Button>
        <Button size="sm" variant="danger">
          Leave
        </Button>
        <PopUp className={closePopup}>
          <Button size="sm" variant="warning">
            Invite
          </Button>
          <div className="invite-popup">
            <h5 className="invite-header">Invite user to collaboration</h5>
            <Form.Control
              type="text"
              placeholder="username"
              // value={searchText}
              // onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="text-muted">OR</div>
            <div>
              <Form.Select>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
                <option value="5">Option 5</option>
                <option value="6">Option 6</option>
                <option value="7">Option 7</option>
                <option value="8">Option 8</option>
                <option value="9">Option 9</option>
                <option value="10">Option 10</option>
                <option value="11">Option 11</option>
                <option value="12">Option 12</option>
                <option value="13">Option 13</option>
                <option value="14">Option 14</option>
                <option value="15">Option 15</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
                <option value="5">Option 5</option>
                <option value="6">Option 6</option>
                <option value="7">Option 7</option>
                <option value="8">Option 8</option>
                <option value="9">Option 9</option>
                <option value="10">Option 10</option>
                <option value="11">Option 11</option>
                <option value="12">Option 12</option>
                <option value="13">Option 13</option>
                <option value="14">Option 14</option>
                <option value="15">Option 15</option>
              </Form.Select>
            </div>
            <Button
              // variant={`${props.theme === "darktheme" ? "secondary" : "primary"}`}
              size="md"
              // onClick={filterDiscussions}
            >
              Invite
            </Button>
          </div>
        </PopUp>
      </div>
    </div>
  );
}

export default TopNav