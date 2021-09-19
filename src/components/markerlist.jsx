import React from "react";
import Mark from "./mark";
class MarkerList extends React.Component {
  render() {
    const { addressdata } = this.props;

    let markers = addressdata.map((addr) => {
      return (
        <Mark
          key={addr.id}
          fname={addr.fname}
          lname={addr.lname}
          pos={addr.pos}
        ></Mark>
      );
    });

    return <div>{markers}</div>;
  }
}

export default MarkerList;
