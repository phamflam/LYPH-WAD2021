import React, { Component } from 'react';
// import Navbar from './components/navbar';
// import Counters from './components/counters';
// import Login from './components/login';
import Main from './components/main';
import "./css/style.css";
// import Navbar from './components/test/navbar';
import TopNav from './components/topnav';
import Login from './components/login';

class App extends Component {
  state = { currentuser: null, password: '', displayLogin: true };
  baseURL = "http://localhost:3000/";

  // state = {
  //   counters: [
  //     { id: 1, value: 3 },
  //     { id: 2, value: 0 },
  //     { id: 3, value: 0 },
  //     { id: 4, value: 0 },
  //   ],
  // };

// constructor(props) {
//   super(props);
// }

// componentDidMount() {
//   //AJAX call

// }

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
  //  window.sessionStorage.setItem("user", data.get("username"));
  //  window.sessionStorage.setItem("pass", data.get("password"));

  //  writeGreeting();
   // if succeeded open main
   this.setState({displayLogin: false, user:event.target.user, password: event.target.password})
   console.log("logged in from APP")

  }

  handleLogout =() => {
    console.log("logged out")
    this.setState({displayLogin: true})

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
        // handleGreeting= {this.handleGreeting}
/>
        <Main />
        {/* <AddressBox />  */}
      
    </React.Fragment>
  );
  }
}

export default App;
