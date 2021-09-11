import React, { Component } from "react";

class Address extends Component {
  render() {
    const { fname, lname, global } = this.props;
    let alternate = false;
    // handleColor = () => {
    //   let alternateColor = false;
    //   if (alternateColor) {
    //     className = "address-alt";
    //   }
    //   alternateColor = !alternateColor;
    // };

    return (
      <div
        //className="address"
        className={alternate ? "address" : "address-alt"}
        // className={global ? "global" : ""}
      >
        {(alternate = !alternate)}
        <span //style={{ paddingLeft: 10 }}
          className="address-name"
        >
          {fname + " " + lname}
        </span>
      </div>
    );
  }
}

export default Address;
