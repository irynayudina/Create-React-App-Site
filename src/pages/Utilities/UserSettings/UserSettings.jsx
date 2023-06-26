import React, {useState} from 'react'
import './UserSettings.scss'
import InfoSettings from './InfoSettings/InfoSettings'
import SecuritySettings from './SecuritySettings/SecuritySettings'
import PrivacySettings from './PrivacySettings/PrivacySettings'
const UserSettings = () => {
  const [activeSubsetting, setActiveSubsetting] = useState('info')
  return (
    <div className="user-settings">
      <h5 className="title-settings">Settings</h5>
      <div className="main-settings">
        <div className="top-subpages">
          <div
            className={`subpage-link ${
              activeSubsetting == "info" ? "active-subpage" : ""
            }`}
            onClick={() => setActiveSubsetting("info")}
          >
            Information
          </div>
          {/* <div
            className={`subpage-link ${
              activeSubsetting == "privacy" ? "active-subpage" : ""
            }`}
            onClick={() => setActiveSubsetting("privacy")}
          >
            Privacy
          </div> */}
          <div
            className={`subpage-link ${
              activeSubsetting == "security" ? "active-subpage" : ""
            }`}
            onClick={() => setActiveSubsetting("security")}
          >
            Security
          </div>
        </div>
        <div className="display-sidepage">
          {activeSubsetting == 'info' ? <InfoSettings /> : 
            // activeSubsetting == 'privacy' ? <PrivacySettings /> :
            <SecuritySettings />
          }
        </div>
      </div>
    </div>
  );
}

export default UserSettings