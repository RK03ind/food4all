// import React from 'react';
import { useContext } from "react";
import styles from "./styles/ProfileCard.module.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ profile }) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    authCtx.setToken("");
    localStorage.setItem("token", null);
    navigate("/");
    window.alert("User Logged out!");
  };
  return (
    <div className={styles.profileCard}>
      <img
        src={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/768px-Windows_10_Default_Profile_Picture.svg.png?20221210150350"
        }
        alt={profile.name}
        className={styles.profileImage}
      />
      <div className={styles.profileContent}>
        <h3 className={styles.profileName}>{profile.name}</h3>
        <p className={styles.profileEmail}>{profile.email}</p>
      </div>
      <button className={styles.logoutButton} onClick={logout}>
        Logout 🚪
      </button>
    </div>
  );
};

export default ProfileCard;
