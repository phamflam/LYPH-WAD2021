import React, { Component } from "react";
class Address extends Component {
  state = {
    alternateColor: false,
  };
  render() {
    const {
      fname,
      lname,
      marker,
      // global
    } = this.props;

    if (marker !== undefined) {
      return <button className="button button-small">!</button>;
    }
    // handleColors = () => {
    //   this.setState({ alternateColor: !this.state.alternateColor });
    // };
    return (
      <div
        className="address-alt"
        // className={
        //   this.state.alternateColor ? "address-alt" : "address"
        // && global
        // ? "global"
        // : "address"
        // }
      >
        <span //style={{ paddingLeft: 10 }}
          className="address-name"
        >
          {fname + " " + lname}
        </span>
        <span style={{ paddingLeft: 10 }} className="mod-spans">
          <button
            id="buttons" // for marker to get span element
            className="button button-small"
            // onClick={this.handleAddressContent}
            // onClick={this.openForm}
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
