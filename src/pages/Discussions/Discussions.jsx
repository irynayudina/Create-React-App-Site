import React, {useState, useRef} from 'react'
import { Form } from "react-bootstrap";
import './Discussions.scss'
import { Button } from "react-bootstrap";
import PopUp from '../../elements/PopUp/PopUp';
import AddNewDiscussion from './AddNewDiscussion'
import { toast } from "react-toastify";
import InfiniteListWithVerticalScroll from '../../elements/InfiniteLoader/InfiniteListWithVerticalScroll';
const Discussions = (props) => {
  const [closePopup, setClosePopup] = useState();
  const discussionsExample = [
    {
      title: "name1",
      text: "desc1",
      createdAt: "18.04.2023",
      author: { name: "Code-Network" },
      topic: "Algorithms",
    },
    {
      title: "name2",
      text: "desc2",
      createdAt: "18.04.2023",
      author: { name: "Code-Network" },
      topic: "Web",
    },
    {
      title: "name3",
      text: "desc3",
      createdAt: "18.04.2023",
      author: { name: "Code-Network" },
      topic: "Custom",
    },
    {
      title: "name4",
      text: "desc4",
      createdAt: "18.04.2023",
      author: { name: "Code-Network" },
      topic: "Custom",
      tags: ["hashtag", "another"],
    },
  ];
  const [selectedDiscussionTopic, setSelectedDiscussionTopic] = useState("");
  const [sortDiscussions, setSortDiscussions] = useState('recent');
  const textInput = useRef()
  const [filerObj, setFilterObj] = useState({})
  // Filter the discussions based on the selected topic and search text
  const filterDiscussions = () => {
    let queryTextSringForArray = textInput.current.value;
    queryTextSringForArray = queryTextSringForArray.split(/\s+/).join(",");
    setFilterObj({
      topic: selectedDiscussionTopic,
      title: queryTextSringForArray,
      tags: queryTextSringForArray,
      sortBy: sortDiscussions,
    });
    // console.log(sortDiscussions);
  };
  // Update the filtered discussions whenever the selected topic or search text changes
  React.useEffect(() => {
    filterDiscussions();
  }, [selectedDiscussionTopic, sortDiscussions]);

  return (
    <div className="discussions">
      <div className="discussions-topsection">
        <div className="select-discussion-topic">
          <Form.Select
            value={selectedDiscussionTopic}
            onChange={(e) => setSelectedDiscussionTopic(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Algorithms">Algorithms</option>
            <option value="Web">Web</option>
            <option value="Custom">Custom</option>
          </Form.Select>
          <Form.Select
            value={sortDiscussions}
            onChange={(e) => setSortDiscussions(e.target.value)}
          >
            <option value="recent">Recent</option>
            <option value="popular">Popular</option>
          </Form.Select>
        </div>

        <div className="sesrch-discussion">
          <Form.Control
            type="text"
            placeholder="Search"
            ref={textInput}
          />
          <Button
            variant={`${props.theme === "darktheme" ? "secondary" : "primary"}`}
            size="md"
            onClick={filterDiscussions}
          >
            Search
          </Button>
        </div>
        <div>
          <PopUp className={closePopup}>
            <button className="btn btn-primary">New Discussion</button>
            <div className="add-new-discussion-form">
              <AddNewDiscussion />
            </div>
          </PopUp>
        </div>
      </div>
      <div className="filtered-discussions">
        <InfiniteListWithVerticalScroll filerObj={filerObj} />
      </div>
    </div>
  );
}

export default Discussions