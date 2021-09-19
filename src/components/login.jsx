import React from "react";
import "../css/style.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: "",
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  baseURL = "http://localhost:5000/";

  performLogin = async () => {
    let form = document.getElementById("login-form");
    let valid = form.reportValidity();
    if (!valid) return;

    const data = new FormData(form);

    const response = fetch(this.baseURL + "users/", {
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
    console.log("user", user);
    this.props.setCurrentUser(user);
    // set sesh
    window.sessionStorage.setItem("user", data.get("username"));
    window.sessionStorage.setItem("pass", data.get("password"));
    //open main
    this.props.handleLogin();
    console.log("loggin FROM LOGIN");
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
                // placeholder={this.state.user}
                // onChange={this.handleChange}
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
                // placeholder={this.state.password}
                // onChange={this.handleChange}
              />
              <br />
              <br />
              <button
                className="button"
                id="btn_login"
                type="submit"
                // onClick={this.performLogin}
                onClick={this.props.handleLogin}
                // onSubmit={this.props.handleLogin} //PREVENT DEFAULT DOENST WORK????
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
