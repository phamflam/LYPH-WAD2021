import React from "react";
import Address from "./address";
import "../css/style.css";
// import { marker } from "leaflet";

// const classGlobal = className({
//   global: (addr.global = true),
// });

class AddressList extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    const { addressdata } = this.props;
    console.log("from ADDRLIST", addressdata);

    // if (error) {
    //   return <div>Error: {error.message}</div>;
    // } else
    // if (isLoaded) {
    //   return <span style={{ color: "black" }}>Loading ..</span>;
    // } else {
    let addresses = addressdata.map((addr) => {
      // if (addr.pos) {
      //   marker = L.marker(addr.pos)
      //     .addTo(markers)
      //     .bindPopup(addr.firstName + " " + addr.lastName);
      // }
      return (
        <Address
          // className={classGlobal}
          key={addr.id}
          fname={addr.firstName}
          lname={addr.lastName}
          street={addr.street}
          number={addr.number}
          zip={addr.zip}
          city={addr.city}
          state={addr.state}
          country={addr.country}
          global={addr.global}
          pos={addr.pos}
        ></Address>
      );
    });

    return <div id="address-container">{addresses}</div>;
  }
  // }
}

export default AddressList;
