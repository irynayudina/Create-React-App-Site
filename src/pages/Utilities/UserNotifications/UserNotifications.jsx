import React, {useState} from 'react'
import './/UserNotifications.scss'
const UserNotifications = () => {
  const notificationsArr = [
    {
      title: "title 1",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem blanditiis quo magnam similique officia recusandae distinctio. Minima rem eius nisi possimus, tenetur ad nulla aspernatur reiciendis deleniti exercitationem inventore alias.",
      createdAt: "2023.04.30",
      read: false,
      id: 1,
      userId: 1,
      user: {
        id: 1,
        username: "username",
        firstName: "firstName",
        lastName: "lastName",
        email: "email",
        avatar: "avatar",
        isAdmin: false,
        isBanned: false,
        isVerified: false,
        isActive: true,
        createdAt: "2023.04.30",
        updatedAt: "2023.04.30",
      },
      type: "system",
    },
    {
      title: "title 2",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem blanditiis quo magnam similique officia recusandae distinctio. Minima rem eius nisi possimus, tenetur ad nulla aspernatur reiciendis deleniti exercitationem inventore alias.",
      createdAt: "2023.04.30",
      read: true,
      id: 2,
      userId: 1,
      user: {
        id: 1,
        username: "username",
        firstName: "firstName",
        lastName: "lastName",
        email: "email",
        avatar: "avatar",
        isAdmin: false,
        isBanned: false,
        isVerified: false,
        isActive: true,
        createdAt: "2023.04.30",
        updatedAt: "2023.04.30",
      },
      type: "userIteraction",
    },
    {
      title: "title 333333333333333333333333333333333333333333333333",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem blanditiis quo magnam similique officia recusandae distinctio. Minima rem eius nisi possimus, tenetur ad nulla aspernatur reiciendis deleniti exercitationem inventore alias.",
      createdAt: "2023.04.30",
      read: false,
      id: 3,
      userId: 1,
      user: {
        id: 1,
        username: "username",
        firstName: "firstName",
        lastName: "lastName",
        email: "email",
        avatar: "avatar",
        isAdmin: false,
        isBanned: false,
        isVerified: false,
        isActive: true,
        createdAt: "2023.04.30",
        updatedAt: "2023.04.30",
      },
      type: "important",
    },
  ];
  const [notifications, setNotifications] = useState(notificationsArr)
  return (
    <div className="user-notifications">
      <h5>Notifications</h5>
      <div className="user-notifications-list">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className={`user-notification-item ${notification.type}
            ${notification.read ? "read" : ""}`}
          >
            <div className="top-notification">
              <div className="notification-title">
                {/* {notification.read ? "" : <div className="newCircle"></div>} */}
                <div className="title">
                  <div className="circle">
                    {notification.read ? "" : <div className="newCircle"></div>}
                  </div>
                  {notification.title}
                </div>
              </div>
              <div className="notification-time text-muted">
                {notification.createdAt}
              </div>
            </div>
            <div className="middle-notification">
              {/* {notification.read ? "" : <div className="newCircle"></div>} */}
              <div className="notification-text">{notification.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserNotifications