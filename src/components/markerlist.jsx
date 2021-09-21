// import React from "react";
// import Mark from "./mark";
// class MarkerList extends React.Component {
//   render() {
//     const { addressdata } = this.props;

//     let markers = addressdata.map((addr) => {
//       return (
//         <Mark
//           key={addr.id}
//           fname={addr.fname}
//           lname={addr.lname}
//           pos={addr.pos}
//         ></Mark>
//       );
//     });

//     return <div>{markers}</div>;
//   }
// }

// export default MarkerList;

import React from "react";
import { Marker, Popup, LayerGroup } from "react-leaflet";

class MarkerList extends React.Component {
  markers = LayerGroup;
  render() {
    const { addressdata } = this.props;
    // [52.54978805042941, 13.518109546538927]
    let markers = addressdata.map((addr) => {
      // let lat = addr.pos.lat;
      // let lng = addr.pos.lng;
      // console.log("pos ", lat + "" + lng);
      return (
        <Marker
          key={addr.id}
          fname={addr.fname}
          lname={addr.lname}
          // position={ addr.pos}
          position={[52.54978805042941, 13.518109546538927]}
        >
          <Popup>{addr.fname + " " + addr.lname}</Popup>
        </Marker>
      );
    });

    return <div>{markers}</div>;
  }
}

export default MarkerList;
