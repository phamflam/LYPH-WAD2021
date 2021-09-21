import React, { Component } from 'react';
import Main from './components/main';
import "./css/style.css";
import TopNav from './components/topnav';
import Login from './components/login';
// import AddressList from './components/addresslist';
//TEST COMMIT

class App extends Component {

  state ={currentUser: null, userdata: [], displayLogin: true}
  baseURL = "http://localhost:5000/";
  userCache = new Map();

async fetchUser() {
  let response = await fetch(this.baseURL + "users/");

  if (response.status !== 200) {
    setTimeout(
      () => alert("Unable to communicate with server. Try again later"),
      1
    );
    throw new Error("Status: " + response.status);
  }

  let users = await response.json();
  users.forEach((value) => {
    if (!value.id) return;

    this.userCache.set(value.id, value);
    this.setState({
      isLoaded: true,
      userdata: Array.from(this.userCache.values()),
    });
  });
  console.log("userdata", this.userCache);
  console.log("fetched user", this.state.userdata);
}

async loadUserSession() {
	let user = window.sessionStorage.getItem("user");
	let pass = window.sessionStorage.getItem("pass");
	if (!user || !pass)
		return;

	const response = await fetch(this.baseURL + "users/", {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			username: user,
			password: pass
		})
	});

	if (!response || response.status !== 200) {
		setTimeout(() => alert("Wrong username or password!"), 1);
		return;
	}

	let cuser = await response.json();
  this.setState({currentUser: cuser})
  console.log("user from app", cuser.name);
}

componentDidMount() {
  //AJAX call
 this.fetchUser();
 this.loadUserSession();
 console.log("current mounted user", this.state.currentUser)
}
componentWillUnmount(){
  console.log("current unmounted user", this.state.currentUser)

}

  handleLogin = () => {
  //  this.handleGreeting();
   // if succeeded open main
   this.setState({displayLogin: false, //OPEN MAIN
   })
     
   console.log("logged in from APP")
}

setCurrentUser = (user)=>{
this.setState({currentUser: user})
console.log("currentuser from app", this.state.currentUser)
}

  handleLogout =() => {
    window.sessionStorage.removeItem("user");
    window.sessionStorage.removeItem("pass");
    
    this.setState({displayLogin: true, currentUser: null}) //open LOGIN
    // console.log("logindisplay", this.state.displayLogin)
    console.log("logged out")
    console.log("storage from logout ",window.sessionStorage)
  }

 /** time oriented but no need
  handleGreeting() {
    const h = new Date().getHours();
    let greetingText;
    let name = this.state.currentUser.name ?? "USERTEST";
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
  */ 

  clearLogout = ()=> {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  }

 

  render() {
    if(this.state.displayLogin 
      && this.state.currentUser == null ){
      return <Login 
      handleLogin={this.handleLogin}
      setCurrentUser={this.setCurrentUser}
      />
    } else  {
       return (
    <React.Fragment>
        <TopNav handleLogout={this.handleLogout} logout={this.clearLogout} currentUser={this.state.currentUser} />
        <Main users={this.state.userdata} currentUser={this.state.currentUser}/>      
    </React.Fragment>
    );
    }
  }
}

export default App;
