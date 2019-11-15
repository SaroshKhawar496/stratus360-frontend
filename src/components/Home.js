import React, { Component } from "react";
import Comic from "./Comic";
import { Link } from "react-router-dom";
import ComicsDashboard from "./ComicsDashboard";
import { Button } from "react-bootstrap";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Comic latest />
        <Link
          style={{ textDecoration: "none" }}
          className="text-white link"
          to="/comics"
        >
          <Button variant="secondary">See Other Comics</Button>
        </Link>
        {/* <ComicsDashboard /> */}
        {/* <button>See Other Comics</button> */}
      </div>
    );
  }
}
