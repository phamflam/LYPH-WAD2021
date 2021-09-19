import React from "react";
import "../css/style.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: "",
      // password: "",
      // currentUser: null,
    };
  }
  baseURL = "http://localhost:5000/";

  performLogin = async () => {
    let form = document.getElementById("login-form");
    let valid = form.reportValidity();
    if (!valid) return;

    const data = new FormData(form);

    const response = await fetch(this.baseURL + "users/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.get("username"),
        password: data.get("password"),
      }),
    });

    if (!response || response.status !== 200) {
      setTimeout(() => alert("Wrong username or password!"), 1);
      return;
    }

    // this.props.currentUser = await response.json();

    let user = await response.json();
    console.log("user", user.name);
    this.props.setCurrentUser(user);
    // if (user.id === 1) {
    //   this.setState({ currentUser: "admina" });
    // } else {
    //   this.setState({ currentUser: "normalo" });
    // }
    // console.log("current", this.state.currentUser);

    // set sesh
    window.sessionStorage.setItem("user", data.get("username"));
    window.sessionStorage.setItem("pass", data.get("password"));
    //open main
    this.props.handleLogin();
    // this.handleGreeting();
    console.log("loggin FROM LOGIN");
    console.log("currentuser", this.props.currentUser);
  };

  render() {
    return (
      <div id="screen_login" className="screen">
        <div className="content">
          <div id="login">
            <form id="login-form" autoComplete="on">
              <label htmlFor="username">Username</label>
              <br />
              <input
                className="c_input"
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                required
              />
              <br />
              <label htmlFor="password">Password</label>
              <br />
              <input
                className="c_input"
                type="password"
                id="password"
                name="password"
                autoComplete="current_password"
                required
              />
              <br />
              <br />
              <button
                className="button"
                id="btn_login"
                type="submit"
                onClick={(event) => {
                  event.preventDefault();
                  this.performLogin();
                }}
              >
                Login
              </button>
            </form>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default Login;
