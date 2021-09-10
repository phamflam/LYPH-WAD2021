//stateless functional component
// const Navbar = ({ totalCounters }) => {
//   return (
//     <nav className="navbar navbar-light bg-light">
//       <a className="navbar-brand" href="/#">
//         HELLO {}
//         <span className="badge bg-pill bg-secondary">{totalCounters}</span>
//       </a>
//     </nav>
//   );
// };

// export default Navbar;

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <span className="navbar">HELLO{/* {this.props.currentuser} */}</span>
    </nav>
  );
};

export default Navbar;

//stateless functional component
// const Navbar = () => {
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

// export default Navbar;
