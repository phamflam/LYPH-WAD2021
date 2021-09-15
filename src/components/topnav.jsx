import React from "react";
import "../css/style.css";

class TopNav extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div
        className="topnav"
        // id="topnav" doenst work bc display none
      >
        <span id="greeting">Welcome back @USER</span>
        <button
          className="button"
          id="btn_logout"
          onClick={this.props.handleLogout}
        >
          {" "}
          Log Out
        </button>
      </div>
    );
  }
}

export default TopNav;
