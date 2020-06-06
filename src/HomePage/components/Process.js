import React, { Component } from "react";
import ProcessPhoto from "../../shared/img/Process.jpg";
import "./Process.css";

class Process extends Component {
  render() {
    return (
      <div
        className="container-fluid process-section"
        style={{ backgroundColor: "#FBF8F4" }}
      >
        <img className="process-image" src={ProcessPhoto} alt="process" />
      </div>
    );
  }
}

export default Process;
