import React from "react";
import "../css/style.css";

class TopNav extends React.Component {
  // time oriented but no need..
  handleGreeting() {
    const h = new Date().getHours();
    let greetingText;
    let name = this.props.currentUser.name ?? "USERTEST";
    name = name[0].toUpperCase() + name.slice(1);

    if (h < 12) {
      greetingText = `Guten Morgen ${name}!`;
    } else if (h < 18) {
      greetingText = `Hallo ${name}!`;
    } else {
      greetingText = `Nabend ${name}.`;
    }

    let greeting = document.getElementById("greeting");
    if (!greeting) return;

    greeting.innerHTML = greetingText;
    //works???
    // document.getElementById("topnav").style.display = "block";
  }

  render() {
    return (
      <div
        className="topnav"
        //id="topnav" //doenst work bc display none
      >
        <span id="greeting">
          Hello{" "}
          {this.props.currentUser.name[0].toUpperCase() +
            this.props.currentUser.name.slice(1)}
        </span>
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
