import React, { Component } from "react";

class Address extends Component {
  render() {
    // const { id, fname, lname } = this.props;
    return (
      <div className="address">
        {/* <h4>{id} </h4> */}
        <span //style={{ paddingLeft: 10 }}
          className="address-name"
        >
          {/* {fname + " " + lname}
          {console.log()} */}
        </span>
      </div>
    );
  }
}

export default Address;
