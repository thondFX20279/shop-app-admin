import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faTachometerAlt,
  faList,
  faPlus,
  faUser,
  faSignOutAlt,
  faHotel,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
  const { user, dispatch } = useAuth();
  return (
    <div className="navbar">
      <ul className="main-list">
        {user && user.role === "R3" && (
          <>
            <li>
              <FontAwesomeIcon icon={faTachometerAlt} /> Main
              <ul className="sub-list">
                <li>
                  <NavLink
                    to={"/"}
                    className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}
                  >
                    <FontAwesomeIcon icon={faTachometerAlt} /> Dash Board
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <FontAwesomeIcon icon={faList} /> LIST
              <ul className="sub-list">
                <li>
                  <NavLink
                    to={"/products"}
                    className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}
                  >
                    <FontAwesomeIcon icon={faHotel} /> Products
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <FontAwesomeIcon icon={faPlus} /> New
              <ul className="sub-list">
                <li>
                  <NavLink
                    to={"/create-product"}
                    className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}
                  >
                    <FontAwesomeIcon icon={faHotel} /> New Product
                  </NavLink>
                </li>
              </ul>
            </li>
          </>
        )}
        <li>
          <FontAwesomeIcon icon={faUser} /> User
          <ul className="sub-list">
            <li>
              <NavLink
                to={"/chat"}
                className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}
              >
                <FontAwesomeIcon icon={faComments} />
                Live Chat
              </NavLink>
            </li>
            <li>
              <FontAwesomeIcon icon={faSignOutAlt} /> <span onClick={(e) => dispatch({ type: "LOGOUT" })}>Logout</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
