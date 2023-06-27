import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Route, Routes, Switch, Redirect } from 'react-router-dom';
import Navbar from './elements/NavBar/NavBar';
import Home from './pages/Home/Home';
import Editor from './pages/Editor/Editor';
import Discussions from './pages/Discussions/Discussions';
import Discussion from './pages/Discussion/Discussion'
import Challenges from './pages/Challenges/Challenges';
import Collaboratory from './pages/Collaboratory/Collaboratory'
import Projects from './pages/Projects/Projects'
import SignUp from './pages/Utilities/Register/SignUp';
import SignIn from './pages/Utilities/Login/SignIn';
import ResetPassword from './pages/Utilities/Login/ResetPassword';
import UserNotifications from './pages/Utilities/UserNotifications/UserNotifications'
import Userpage from './pages/Utilities/Userpage/Userpage'
import UserProjects from './pages/Utilities/UserProjects/UserProjects'
import UserSettings from './pages/Utilities/UserSettings/UserSettings'
import PublicUserpage from './pages/Utilities/PublicUserpage/PublicUserpage';
import Challenge from './pages/Challenge/Challenge'
import TextEditor from './TextEditor';
import RedirectElem from './RedirectElem';


import CollabEditor from './pages/Collaboratory/CollabEditor';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import PrivateRoute from './private/PrivateRoute';

function App() {
  const [theme, setTheme] = useState("lighttheme");
  const [breakpoint, setBreakpoint] = useState("xxl")
  const [editorBreakpoint, setEditorBreakpoint] = useState(1400)
  useEffect(() => {
    const handleWindowResize = () => {
      setEditorBreakpoint(window.innerWidth)
      if (window.innerWidth >= 1400) setBreakpoint("xxl");
      else if (window.innerWidth >= 1200) setBreakpoint("xl");
      else if (window.innerWidth >= 992) setBreakpoint("lg");
      else if (window.innerWidth >= 768) setBreakpoint("md");
      else if (window.innerWidth >= 567) setBreakpoint("sm");
      else setBreakpoint("xs");
    };
    handleWindowResize(); // initially on load without resize
    window.addEventListener('resize', handleWindowResize);
    return () => {
    window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  useEffect(() => {
    let mainThemeStored = localStorage.getItem('mainThemeStored')
    if (mainThemeStored) {
      setTheme(mainThemeStored)
    }
  }, [])
  
  return (
    <div className={`App ${theme}`}>
      <BrowserRouter>
        <Navbar theme={theme} setTheme={setTheme} />
        <ToastContainer />
        <Routes>
          <Route path="/" exact="true" element={<Home />} />
          <Route path="/texteditor" element={<TextEditor />} />
          <Route
            path="/editor/:id"
            element={
              <Editor
                theme={theme}
                editorSize={editorBreakpoint >= 814 ? "lg" : "sm"}
              />
            }
          />
          <Route
            path="/editor"
            element={
              <Editor
                theme={theme}
                editorSize={editorBreakpoint >= 814 ? "lg" : "sm"}
              />
            }
          />
          <Route path="/discussions" element={<Discussions theme={theme} />} />
          <Route
            path="/discussion/:id"
            element={<Discussion theme={theme} />}
          />
          <Route
            path="/challenges"
            element={<Challenges theme={theme} breakpoint={breakpoint} />}
          />
          <Route
            path="/challenge"
            element={<Challenge theme={theme} breakpoint={breakpoint} />}
          />
          <Route
            path="/collaboratory"
            element={<RedirectElem /> }
          />
          <Route path="/documents/:id" element={<CollabEditor />} />
          <Route path="/projects" element={<Projects theme={theme} />} />
          {/* Protected Routes */}
          <Route path="" element={<PrivateRoute />}>
            <Route path="/user" element={<Userpage theme={theme} />} />
            <Route
              path="/user/projects"
              element={<UserProjects theme={theme} />}
            />
            <Route
              path="/user/notifications"
              element={<UserNotifications theme={theme} />}
            />
            <Route
              path="/user/settings"
              element={<UserSettings theme={theme} />}
            />
          </Route>
          <Route path="/forgot-password" element={<ResetPassword />} />
          <Route
            path="/public/user/:id"
            element={<PublicUserpage theme={theme} />}
          />
          <Route path="/login" element={<SignIn theme={theme} />} />
          <Route path="/register" element={<SignUp theme={theme} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
