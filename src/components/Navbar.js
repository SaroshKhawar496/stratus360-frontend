import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar as NavBar } from "react-bootstrap";

const Navbar = () => {
  return (
    <NavBar bg="dark" variant="dark">
      <NavBar.Brand>
        <NavLink className="d-inline p-2  text-white" to="/">
          Cyber City Comics
        </NavLink>
      </NavBar.Brand>
    </NavBar>
  );
};

export default Navbar;
