import React from "react";
import "../css/style.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "user",
      password: "password",
      showNav: false,
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    // let u = event.target.user;
    // let p = event.target.password;
    // this.setState({ [u]: p });
    console.log(e.target.user);
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
