import React, { Component } from "react";
// import {
//   Marker,
//   Popup,
//   // LayerGroup
// } from "react-leaflet";

class Address extends Component {
  state = {};

  openMarker = () => {
    console.log("Marker: ", this.props.fname, this.props.lname);
  };
  openForm = () => {
    console.log("OPEN MODFORM");
    this.props.setFormState(true);
    // this.props.setAddressContext(this.props.id);
    console.log("Caddr ID ", this.props.id);
  };
  hideForm = () => {
    console.log("HIDE FORM");
    this.props.setFormState(false);
  };

  renderButton = () => {
    return (
      <button
        className="button button-small"
        onClick={() => {
          this.openMarker();
        }}
      >
        !
      </button>
    );
  };
  componentDidMount() {
    // console.log("CU from ADDR ", this.props.currentUser);
  }
  render() {
    const {
      fname,
      lname,
      pos,
      //  global
    } = this.props;
    return (
      <div
        className="address-alt"
        // className={!global ? "global" : "address-alt"}
      >
        {/* {this.setState({ alternateColor: !this.state.alternateColor })} */}
        <span className="address-name">{fname + " " + lname}</span>
        <span style={{ paddingLeft: 10 }} className="mod-spans">
          <button
            id="buttons" // for marker to get span element
            className="button button-small"
            // onClick={this.handleAddressContent}
            onClick={() => {
              this.openForm();
            }}
          >
            ~
          </button>
          {pos !== undefined ? this.renderButton() : ""}
        </span>
      </div>
    );
  }
}
// }

export default Address;
