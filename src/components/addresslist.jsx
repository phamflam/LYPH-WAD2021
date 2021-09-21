import React from "react";
import Address from "./address";
import "../css/style.css";
// import { marker } from "leaflet";
// import * as L from "leaflet";

// Nameplate = (user, alt) => {
//   return (
//     <div className={"address-nameplate address" + (alt ? " address-alt" : "")}>
//       <span className="address-name">{user.name}:</span>
//     </div>
//   );
// };

class AddressList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateList = () => {};
  // setFormState = (state) => {};

  componentDidMount() {
    console.log("CU from LIST ", this.props.currentUser);
  }

  render() {
    const { addressdata } = this.props;

    let addresses = addressdata.map((addr) => {
      // console.log("pos", addr.pos);

      // if (addr.pos) {
      //   marker = L.marker(addr.pos)
      //     .addTo(markers)
      //     .bindPopup(addr.firstName + " " + addr.lastName);
      // }
      let alternateColor = false;
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
          owner={addr.owner}
          setFormState={this.props.setFormState}
          currentUser={this.props.currentUser}
        >
          {(alternateColor = !alternateColor)}
          {/* <Nameplate></Nameplate>{" "} */}
        </Address>
      );
    });

    return <div id="address-container">{addresses}</div>;
  }
  // }
}

export default AddressList;
