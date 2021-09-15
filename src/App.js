import React, { Component } from 'react';
import Main from './components/main';
import "./css/style.css";
import TopNav from './components/topnav';
import Login from './components/login';
// import AddressList from './components/addresslist';
//TEST COMMIT

class App extends Component {
  state = { currentUser: null, password: '', displayLogin: true};
  // state = { currentUser: {id: null, name: "test", password:"test", privileged: false},displayLogin: true};
  baseURL = "http://localhost:5000/";
 

//fetch addr user??
componentDidMount() {
  //AJAX call
// await this.fetchAddresses();
// await this.fetchUsers();
// window.addEventListener("load", this.handleLoad)
console.log("currentUser", this.currentUser)

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
  //  writeGreeting();
   // if succeeded open main
   this.setState({displayLogin: false, //OPEN MAIN
     user:event.target.user, password: event.target.password})
   console.log("logged in from APP")

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
    console.log("Greeted")
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

    if(this.state.displayLogin && this.currentUser == null){
      return <Login 
      handleLogin={this.handleLogin}
      // onLogin={(e)=> e.preventDefault} 
      // handleLogin={(event) => event.preventDefault()}
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
