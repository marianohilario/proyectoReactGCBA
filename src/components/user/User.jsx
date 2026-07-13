import React, { useState } from "react";
import styles from "./user.module.css";
import UserSubMenu from "./userSubMenu/UserSubMenu";

const User = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  return (
    <div className={styles.user} onClick={() => setShowSubMenu(!showSubMenu)}>
      <i className={"bi bi-person-fill" + " " + styles.icon}></i>
      <UserSubMenu show={showSubMenu} />
    </div>
  );
};

export default User;
