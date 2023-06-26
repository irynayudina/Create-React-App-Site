import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";



import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import './Collab.scss'
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";







const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

export default function CollabEditor() {
  //here is user interactions with collab
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();
  let { associatedProject_id } = location?.state || "not passed";
  const [associatedProject, setAssociatedProject] = useState()
  // getting collaboration by documentId
  const getCollabById = async () => {
    try {
      const gotCollaboration = await axios.get(
        `https://codeeditorbackend-production.up.railway.app/api/collab/id?collab_id=${documentId}`
      );
      if (gotCollaboration?.data) {
        console.log(gotCollaboration.data);
        toast.success("Opened existing collaboration");
        setAssociatedProject(gotCollaboration.data.associatedProject);
        setOwners(gotCollaboration.data.owners);
        // if it exists - checking our user to see if hes in owners list
        const foundInOwners = gotCollaboration.data.owners.filter(
          (user) => user._id.toString() === userInfo._id.toString()
        );
        if (foundInOwners?.length > 0) {
          toast.success("User exists in owner list");
        }
        // if hes not - adding to the list
        else {
          const newCollab = await axios.post(
            `https://codeeditorbackend-production.up.railway.app/api/collab/addOwner`,
            {
              collabId: documentId,
              ownerId: userInfo._id,
            }
          );
          console.log(newCollab)
          if (newCollab?.data) {
            toast.success("Added user to owners list");
            console.log(newCollab.data);
            setOwners(newCollab.data?.data?.owners);
          } else {
            toast.error("Error adding a user");
          }
        }
      }
      // if it does not exist - creating a collaboration
      else {
        console.log(" trying to create new");
        const newCollab = await axios.post(
          `https://codeeditorbackend-production.up.railway.app/api/collab`,
          {
            collab_id: documentId,
            associatedProject_id: associatedProject_id,
          }
        );
        if (newCollab?.data) {
          toast.success("Created a new collaboration");
          console.log(newCollab.data);
          setAssociatedProject(newCollab?.data?.associatedProject);
          setOwners(newCollab?.data?.owners)
          //get text of a project and pass it to quill
          const projectData = await axios.get(
            `https://codeeditorbackend-production.up.railway.app/api/projects/id?id=${associatedProject_id}`
          );
          if (projectData?.data) {
            console.log(projectData.data);
            toast.success("Got project text for creation of collab");
            setCode(projectData.data?.codeFile);
          } else {
            toast.error("Error getting project text");
          }
        } else {
          toast.error("Error creating a new collaboration");
        }
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.error);
    }
  }

  // on a userpage getting the list of all collabs user has
  // each of them will be a link with specific collab_id to click and open

  // inside editor of project collaboration leads to blank collab or to collab with id
  // based on the result of a check if any collab has associatedProject_id equal to this project id

  // remove collab link from main navbar

  // emmit page reload every time new person joins
  // and update people and active people once user joins or leaves

  // only owner of the project can save changes in the project related to collaboration
  const saveInProject = async () => {
    console.log("saved to project " + associatedProject);
    console.log("the saved text is: ");
    let plainText = quill.getText();
    console.log(plainText);
    if (!associatedProject || !plainText) {
      return;
    }
      try {
        const project = await axios.post(
          "https://codeeditorbackend-production.up.railway.app/api/projects/id",
          {
            projectId: associatedProject,
            codeFile: plainText,
          }
        );
        if (project?.data) {
          console.log(project.data);
          toast.success("Project code sucessfuly edited");
        }
      } catch (err) {
        toast.error(err?.response?.data?.message || err.error);
      }
    //request to edit the project, toast to display error or success
  }



  // here is socket
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const [users, setUsers] = useState([]);
  const [owners, setOwners] = useState([]);
  const [code, setCode] = useState("");


  useEffect(() => {
  const userInfoPass = { _id: userInfo._id };
    const s = io("codeeditorsocketserver-production.up.railway.app", {
      query: { userInfo: JSON.stringify(userInfoPass) },
    });
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log("user is connected, the creation function");
    console.log("owner is " + userInfo?._id);
    console.log("collab_id is " + documentId);
    console.log("associatedProject_id is " + associatedProject_id);
    if (userInfo?._id && documentId ) {
      getCollabById();
    } else {
      toast.error("data was lost")
    }
      
  }, [userInfo, documentId, associatedProject_id]);
  



  useEffect(() => {
    if (socket == null || !userInfo._id) return;
    socket.on("welcome", function (data) {
      console.log("i was welcomed: " + data.message);
      socket.emit("join user", {
        id: data.id,
        name: userInfo.name,
        usrId: userInfo._id,
        documentId,
      });
    });
    socket.on("users updated", function (data) {
      const filteredUsers = data.users.filter(
        (user) => user.documentId === documentId
      );
      setUsers(filteredUsers);
    });
    socket.on("user disconnected", function (data) {
      const filteredUsers = data.users.filter(
        (user) => user.documentId === documentId
      );
      setUsers(filteredUsers);
    });
  }, [socket, userInfo]);




  useEffect(() => {
   if (code == null || quill == null) return;
    quill.setText(code);
    console.log(code);
}, [code, quill])



  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", documentId);
  }, [socket, quill, documentId]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);
  return (
    <div>
      <div className="top-collab-nav">
        <Button variant="primary" size="sm" onClick={saveInProject}>
          Save in associated project (only the owner)
        </Button>
        <div>
          <Link
            to={`/editor/${associatedProject?._id}`}
            className="text-decoration-none black-link"
          >
            {associatedProject?.projectName}
          </Link>
        </div>
        <div>
          <div className="people-collab">
            People (collab owners):
            {owners?.map((user, index) => (
              <Link
                key={index}
                to={`/public/user/${user?.usrId}#projects`}
                className="text-decoration-none black-link"
              >
                <span>{user?.name}</span>
              </Link>
            ))}
          </div>
          <div className="people-active-now">
            Active now:
            {users?.map((user, index) => (
              <Link
                key={index}
                to={`/public/user/${user?.usrId}#projects`}
                className="text-decoration-none black-link"
              >
                <span>{user?.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="container" ref={wrapperRef}></div>
    </div>
  );
}
