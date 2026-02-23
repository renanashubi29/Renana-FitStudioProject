import React, { useContext, useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import "./Header.css";
import { ShopContext } from "../../../ShopContext.js";
import { AdminActions } from "../../admin/AdminActions/AdminActions.jsx";


export const Header = () => {
  const { user } = useContext(ShopContext);

  return (
    <div className="flexHeader">
        <h1 className="studio-title">GYM STUDIO</h1>
        <AdminActions/>
    <div className="user-profile">
            <PersonIcon  className="profile-icon "/>
    <span className="user-greeting "> {user ? `Hello, ${user.name}` : "Hello, Guest"}</span>
        </div>
        </div>
  );
};