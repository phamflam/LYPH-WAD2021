import React from "react";
import { Marker, Popup } from "react-leaflet";

class Mark extends React.Component {
  render() {
    const { fname, lname, pos } = this.props;

    return (
      <Marker position={[pos]}>
        <Popup>{fname + " " + lname}</Popup>
      </Marker>
    );
  }
}

export default Mark;
