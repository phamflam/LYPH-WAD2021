import React from "react";
import "../css/style.css";

// const TopNav = () => {
//   return (
//     <nav className="navbar navbar-light bg-light">
//       <span style={{ paddingLeft: 10 }} className="navbar">
//         HELLO{/* {this.props.currentuser} */}
//       </span>
//       <button className="button" id="btn_logout">
//         Log Out
//       </button>
//     </nav>
//   );
// };

// export default TopNav;

class TopNav extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  handleGreeting = () => {
    var _a;
    const h = new Date().getHours();
    let greetingText;
    let name =
      (_a =
        this.props.currentUser === null || this.props.currentUser === void 0
          ? void 0
          : this.props.currentUser.name) !== null && _a !== void 0
        ? _a
        : "user";
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
    document.getElementById("topnav").style.display = "block";

    console.log("GREEEETED");
  };

  render() {
    return (
      // id="topnav" doenst work bc display none
      <div className="topnav">
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

// //stateless functional component
// const TopNav = () => {
//   return (
//     <nav className="topnav" id="topnav">
//       <a className="navbar-brand" href="/#">
//         TopNav{}{" "}
//         <span className="badge bg-pill bg-secondary">Hello @Username</span>
//       </a>
//       <button className="button" id="btn_logout">
//         Log Out
//       </button>
//     </nav>
//   );
// };

// export default TopNav;
