import React, { Component } from "react";
class Address extends Component {
  state = {};

  render() {
    const { fname, lname, pos, global } = this.props;

    if (pos !== undefined) {
      return (
        <div
          // className="address-alt"
          className={!global ? "global" : "address-alt"}
          // className={
          //   this.alternateColor
          //     ? "address-alt"
          //     : "address" && global
          //     ? "global"
          //     : "address"
          // }
        >
          {/* {this.setState({ alternateColor: !this.state.alternateColor })} */}
          <span className="address-name">{fname + " " + lname}</span>
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
    } else {
      return (
        <div
          // className="address-alt"
          className={!global ? "global" : "address-alt"}
          // className={
          //   this.alternateColor
          //     ? "address-alt"
          //     : "address" && global
          //     ? "global"
          //     : "address"
          // }
        >
          {/* {this.setState({ alternateColor: !this.state.alternateColor })} */}
          <span className="address-name">{fname + " " + lname}</span>
          <span style={{ paddingLeft: 10 }} className="mod-spans">
            <button
              id="buttons" // for marker to get span element
              className="button button-small"
              // onClick={this.handleAddressContent}
              // onClick={this.openForm}
            >
              ~
            </button>
          </span>
        </div>
      );
    }
  }
}

export default Address;
