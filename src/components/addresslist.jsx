import React from "react";
import Address from "./address";
import "../css/style.css";
// import { marker } from "leaflet";
// import * as L from "leaflet";

class AddressList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alternateColor: false,
    };
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

      // handleColors = () => {
      //   this.setState({ alternateColor: !this.state.alternateColor });
      // };

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
          onModify={this.props.openForm}
          onMark={this.props.handleMarker}
        ></Address>
      );
    });

    return <div id="address-container">{addresses}</div>;
  }
  // }
}

export default AddressList;
