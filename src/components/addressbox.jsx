import React, { Component } from "react";
// import Login from "./login";
import "../css/style.css";

class AddressBox extends Component {
  state = {
    username: "testname",
  };

  handleLogin = (e) => {
    e.preventDefault();
    console.log("logged in");
  };

  render() {
    // const { fname, lname, street, number, zip, city, state, country } =
    //   this.props;

    return (
      <div id="screen_address" className="screen">
        <div className="content">
          <br />
          <div className="address address-nameplate">
            <span className="address-name">{this.state.username}</span>
          </div>
          <div>
            <span id="feedback" />
          </div>
          {/* <Login onLogin={this.handleLogin} /> */}
        </div>
      </div>
    );
  }
}

export default AddressBox;
