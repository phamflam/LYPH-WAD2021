import React, { Component } from 'react';
import Main from './components/main';
import "./css/style.css";
import TopNav from './components/topnav';
import Login from './components/login';
//TEST COMMIT

class App extends Component {
  state = { currentUser: null, password: '', displayLogin: true };
  baseURL = "http://localhost:3000/";
  addressCache = new Map();
  userCache = new Map();

  
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

	this.state.currentUser = await response.json();
}


async fetchAddresses(){
  let response = await fetch(this.baseURL + "contacts/");
	if (response.status !== 200) {
		setTimeout(() => alert("Unable to communicate with server. Try again later"), 1);
		throw new Error("Status: " + response.status);
	}

	let addresses = await response.json();
	this.addressCache.clear();
	addresses.forEach(value => {
		if (!value.id)
			return;

		this.addressCache.set(value.id, value);
	});
}

async fetchUsers() {
      let response =  fetch(this.baseURL + "users/");
      if (response.status !== 200) {
          setTimeout(() => alert("Unable to communicate with server. Try again later"), 1);
          throw new Error("Status: " + response.status);
      }
      let users =  response.json();
      users.forEach(value => {
          if (!value.id)
              return;
          this.userCache.set(value.id, value);
      });
}

// handleLoad = () => {
//   this.fetchUsers();
//   this.loadUserSession();
//   this.fetchAddresses();
// }

//fetch addr user??
componentDidMount() {
  //AJAX call
// await this.fetchAddresses();
// await this.fetchUsers();
// window.addEventListener("load", this.handleLoad)
}

// componentDidUpdate(prevProps, prevState) {
//   if(prevProps.counter.value !== this.props.counter.value) {
//     //AJAX call and get new data from server
//   }
// }

// componentWillUnmount() {

// }

  handleIncrement = (counter) => {
    const counters = [...this.state.counters];
    const idx = counters.indexOf(counter);
    counters[idx] = { ...counter };
    counters[idx].value++;
    this.setState({ counters });
  };

  handleDelete = (counterId) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId);
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };


  handleLogin = async (event) => {
    event.preventDefault();
   
  //  let form = document.getElementById("login-form");
  //  let valid = form.reportValidity();
  //  if (!valid)
  //      return;
  //  const data = new FormData(form);
  //  const response = await fetch("http://localhost:3000/users/", {
  //      method: "POST",
  //      headers: {
  //          "Accept": "application/json",
  //          "Content-Type": "application/json"
  //      },
  //      body: JSON.stringify({
  //          username: data.get("username"),
  //          password: data.get("password")
  //      })
  //  });
  //  if (!response || response.status != 200) {
  //      setTimeout(() => alert("Wrong username or password!"), 1);
  //      return;
  //  }
  //  this.state.currentuser = await response.json();
  
  // window.sessionStorage.setItem("user", data.get("username"));
  //  window.sessionStorage.setItem("pass", data.get("password"));

  //  writeGreeting();
   // if succeeded open main
   this.setState({displayLogin: false, user:event.target.user, password: event.target.password})
   console.log("logged in from APP")

  }

  handleLogout =() => {
    console.log("logged out")
    this.setState({displayLogin: true})
    // window.sessionStorage.removeItem("user");
    // window.sessionStorage.removeItem("pass");
    // document.getElementById("username").value = "";
    // document.getElementById("password").value = "";

  }


  render() {
    
    //  return (
    //    <React.Fragment>
    //      <Navbar totalCounters= {this.state.counters.filter(c=> c.value > 0).length}/>
    //       <main className="container">
    //         <Counters 
    //           counters={this.state.counters}
    //           onReset={this.handleReset} 
    //           onIncrement={this.handleIncrement} 
    //           onDelete={this.handleDelete}/>
    //       </main>
    //    </React.Fragment>

    if(this.state.displayLogin){
      return <Login 
      handleLogin={this.handleLogin}
      // handleLogin={(event) => event.preventDefault()}
      />
    }
    return (
    <React.Fragment>
        <TopNav handleLogout={this.handleLogout} 
         //handleGreeting= {this.handleGreeting}
/>
        <Main />
        {/* <AddressBox />  */}
      
    </React.Fragment>
  );
  }
}

export default App;
