import React from "react";
import "../css/style.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    // const user = JSON.parse(window.sessionStorage.getItem("user")) || {};
    // const password = JSON.parse(window.sessionStorage.getItem("pass")) || {};

    this.state = {
      user: "user",
      password: "password",
      // user: user,
      // password: password,
      showNav: false,
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  performLogin() {
    let form = document.getElementById("login-form");
    let valid = form.reportValidity();
    if (!valid) return;

    const data = new FormData(form);

    const response = fetch(this.props.baseURL + "users/", {
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

    this.props.currentUser = response.json();
    // set sesh
    window.sessionStorage.setItem("user", data.get("username"));
    window.sessionStorage.setItem("pass", data.get("password"));
  }

  handleChange = (e) => {
    // let u = event.target.user;
    // let p = event.target.password;
    // this.setState({ [u]: p });
    console.log(e.target.user);
    console.log(e.target.password);

    this.setState({ user: e.target.user });
    this.setState({ password: e.target.password });
  };

  handleSubmit = (e) => {
    alert("submitted: " + this.state.user + this.state.password);
    console.log("loggin in");
    // e.preventDefault(); //WHY NOT WORKING??
  };

  render() {
    return (
      <div id="screen_login" className="screen">
        <div className="content">
          <div id="login">
            <form id="login-form" autoComplete="on">
              {/* <h1>
                Hello {this.state.user} {this.state.password}
              </h1> */}
              <label htmlFor="username">Username</label>
              <br />
              <input
                className="c_input"
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                required
                placeholder={this.state.user}
                onChange={this.handleChange}
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
                placeholder={this.state.password}
                onChange={this.handleChange}
              />
              <br />
              <br />
              <button
                className="button"
                id="btn_login"
                type="submit"
                // onClick={this.performLogin}
                // onClick={this.handleSubmit}
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
