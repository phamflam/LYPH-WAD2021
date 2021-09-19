import React, { Component } from 'react';
import Main from './components/main';
import "./css/style.css";
import TopNav from './components/topnav';
import Login from './components/login';
// import AddressList from './components/addresslist';
//TEST COMMIT

class App extends Component {
  // state = { currentUser: null, password: '', displayLogin: true};
  // state = { currentUser: {id: null, name: "test", password:"test", privileged: false},displayLogin: true};
  state ={currentUser: null, userdata: [], displayLogin:true}
  baseURL = "http://localhost:5000/";
  userCache = new Map();

async fetchUser() {
  // let response = await fetch("http://localhost:5000/users/");
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

componentDidMount() {
  //AJAX call
this.fetchUser();
// this.setCurrentUser()
// console.log("currentUser", this.currentUser)
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
}

  handleLogout =() => {
    console.log("logged out")
    this.setState({displayLogin: true}) //open LOGIN
    window.sessionStorage.removeItem("user");
    window.sessionStorage.removeItem("pass");
    // document.getElementById("username").value = "";
    // document.getElementById("password").value = "";
  }

  
   handleGreeting() {
    const h = new Date().getHours();
    let greetingText;
    let name = this.currentUser.name ?? "USERTEST";
    name = name[0].toUpperCase() + name.slice(1);
  
    if (h < 12) {
      greetingText = `Guten Morgen ${name}!`;
    } else if (h < 18) {
      greetingText = `Hallo ${name}!`;
    } else {
      greetingText = `Nabend ${name}.`
    }
  
    let greeting = document.getElementById("greeting");
    if (!greeting) return;
  
    greeting.innerHTML = greetingText;
    document.getElementById("topnav").style.display = "block";
  }

  render() {
    if(this.state.displayLogin && this.currentUser == null){
      return <Login 
      handleLogin={this.handleLogin}
      />
    } else {
       return (
    <React.Fragment>
        <TopNav handleLogout={this.handleLogout} 
         handleGreeting= {this.handleGreeting}
/>
        <Main>
          {/* <AddressList addresses={this.state.addresses} /> */}
        </Main>      
    </React.Fragment>
    );
    }
  }
}

export default App;
