import React, { Component } from "react";

class Address extends Component {
  // constructor(props) {
  //   super(props);
  // }
  handleAddressContent = () => {
    console.log("SET CON");
  };
  render() {
    const { fname, lname, marker } = this.props;
    let alternate = false;
    // handleColor = () => {
    //   let alternateColor = false;
    //   if (alternateColor) {
    //     className = "address-alt";
    //   }
    //   alternateColor = !alternateColor;
    // };

    if (marker !== undefined) {
      return <button className="button button-small">!</button>;
    }
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
        <span className="mod-spans">
          <button
            id="buttons" // for marker to get span element
            className="button button-small"
            onClick={this.props.handleAddressContent}
          >
            ~
          </button>
          <button className="button button-small">!</button>
        </span>
      </div>
    );
  }
}

export default Address;
