import React from "react";
import "../css/style.css";
import * as L from "leaflet";
import { AddressData } from "./util";

class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      street: "",
      number: "",
      zip: "",
      city: "",
      state: "",
      country: "",
      owner: "",
      global: false,
      fetching: false,
    };
  }

  setFirstName = (firstName) => {
    this.setState({ firstName: firstName });
  };
  setlastName = (lastName) => {
    this.setState({ lastName: lastName });
  };
  setStreet = (street) => {
    this.setState({ street: street });
  };
  setNumber = (number) => {
    this.setState({ number: number });
  };
  setZip = (zip) => {
    this.setState({ zip: zip });
  };
  setCity = (city) => {
    this.setState({ city: city });
  };
  setOwner = (owner) => {
    this.setState({ owner: owner });
  };
  setGlobal = (global) => {
    this.setState({ global: global });
  };
  setaState = (state) => {
    this.setState({ state: state });
  };
  setCountry = (country) => {
    this.setState({ country: country });
  };

  baseURL = "http://localhost:5000/";

  updateGlobalState = (event, newState) => {
    if (newState == null) return;
    this.setState({ global: newState });
  };

  componentDidMount() {
    console.log("CA from FORM", this.props.addressCache.get(this.props.id));
    console.log("CU from FORM ", this.props.currentUser);
    let address = this.props.addressCache.get(this.props.id);
    if (!address) return;

    this.setState({ firstName: address.firstName });
    this.setState({ lastName: address.lastName });
    this.setState({ street: address.street });
    this.setState({ number: address.street_extra });
    this.setState({ zip: address.zip });
    this.setState({ city: address.city });
    this.setState({ owner: address.owner });
    this.setState({ global: address.global });
    if (address.state !== undefined) this.setState({ state: address.state });
    if (address.country !== undefined)
      this.setState({ country: address.country });
  }
  componentWillUnmount() {
    console.log("FORM DATA", this.state);
  }

  commit = () => {
    let form = document.getElementById("address-form");
    let valid = form.reportValidity();
    if (!valid) return;

    this.setState({ fetching: true });
    let address = new AddressData(
      this.state.firstName,
      this.state.lastName,
      this.state.street,
      this.state.number,
      this.state.zip,
      this.state.city,
      this.state.state ? this.state.state : undefined,
      this.state.country ? this.state.country : undefined,
      this.state.global
    );
    address.owner = this.state.owner;
    if (this.props.id > 0) {
      address.id = this.props.id;
    }

    this.props.addressCache.set(address.id ?? this.props.id, address);
  };

  handleAdd = () => {
    console.log("ADDED");
  };

  handleUpdate() {
    console.log("UPDATED");
  }

  handleDelete() {
    console.log("DELETED");
  }

  handleCancel = () => {
    console.log("CANCEL");
  };
  displayInfo = (message) => {
    console.log("displayInfo: " + message);
    let feedback = document.getElementById("feedback");
    if (message === null) {
      feedback.innerText = "";
      feedback.style.display = "none";
      return;
    }

    feedback.innerText = message;
    feedback.style.display = "inline";
  };
  findLatLng = (address) => {
    return new Promise((resolve, reject) => {
      const skipGeoElem = document.getElementById("skip_geo");
      if (skipGeoElem.checked) {
        skipGeoElem.checked = false;
        resolve(address);
        return;
      }

      let url = new URL("https://nominatim.openstreetmap.org/search");
      url.searchParams.append(
        "street",
        address.street_extra + " " + address.street
      );
      url.searchParams.append("city", address.city);
      url.searchParams.append("postalcode", address.zip);
      if (address.state) url.searchParams.append("state", address.state);
      if (address.country) url.searchParams.append("country", address.country);

      url.searchParams.append("format", "geojson");

      //console.log(url.toString());
      fetch(url.toString())
        .then((response) => response.json())
        .then((response) => {
          let features = response.features;
          if (!features)
            throw new Error("response object doesn't have features property");
          if (features.length < 1)
            throw new Error("response object doesn't include any results");

          let coordinates = features[0].geometry.coordinates;
          address.setLatLng(new L.LatLng(coordinates[1], coordinates[0]));

          resolve(address);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  render() {
    // const { addressdata } = this.props;

    return (
      <div id="screen_address" className="screen">
        <div className="content">
          <br />{" "}
          <form autoComplete="off" id="address-form">
            <div className="field">
              <label htmlFor="fname">First name:</label>
              <br />
              <input
                className="c_input"
                type="text"
                id="fname"
                name="fname"
                required
                value={this.state.firstName}
                // onChange={this.handleEvent(this.setFirstName)}
                onChange={(e) => this.setFirstName(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="lname">Last name:</label>
              <br />
              <input
                className="c_input"
                type="text"
                id="lname"
                name="lname"
                value={this.state.lastName}
                // onChange={this.handleEvent(this.setlastName)}
                onChange={(e) => this.setlastName(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="street">Street:</label>
              <br />
              <input
                className="c_input"
                type="text"
                id="street"
                name="street"
                value={this.state.street}
                // onChange={this.handleEvent(this.setStreet)}
                onChange={(e) => this.setStreet(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="number">Number:</label>
              <br />
              <input
                className="c_input"
                type="text"
                id="number"
                name="number"
                value={this.state.number}
                // onChange={this.handleEvent(this.setNumber)}
                onChange={(e) => this.setNumber(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="zip">ZIP:</label>
              <br />
              <input
                className="c_input"
                type="text"
                id="zip"
                name="zip"
                value={this.state.zip}
                // onChange={this.handleEvent(this.setZip)}
                onChange={(e) => this.setZip(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="city">City:</label>
              <br />
              <input
                className="c_input"
                type="text"
                id="city"
                name="city"
                value={this.state.city}
                // onChange={this.handleEvent(this.setCity)}
                onChange={(e) => this.setCity(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="state">State:</label>
              <br />
              <input
                className="c_input"
                type="text"
                id="state"
                name="state"
                value={this.state.state}
                // onChange={this.handleEvent(this.setState)}
                onChange={(e) => this.setaState(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="country">Country:</label>
              <br />
              <input
                className="c_input"
                type="text"
                id="country"
                name="country"
                value={this.state.country}
                // onChange={this.handleEvent(this.setCountry)}
                onChange={(e) => this.setCountry(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="privacy">Private</label>
              <br />
              <input
                type="checkbox"
                id="privacy"
                name="privacy"
                defaultChecked
              />
            </div>
            <div>
              <label htmlFor="owner">Owner of Contact</label>
              <br />
              <select className="c_input" id="owner" name="owner" />
            </div>
            <div id="skip_geo_div" style={{ display: "none" }}>
              <label htmlFor="skip_geo">Skip looking for coordinates</label>
              <br />
              <input type="checkbox" id="skip_geo" name="skip_geo" />
            </div>
            <br />
            <button
              className="button"
              id="btn_cancel"
              type="button"
              //onClick={this.handleCancel}
              onClick={this.props.hideForm}
            >
              Cancel
            </button>
            <button
              className="button"
              id="btn_save"
              type="button"
              onClick={(event) => {
                event.preventDefault();
                this.handleUpdate();
              }}
            >
              Save
            </button>
            <button
              className="button"
              id="btn_update"
              type="button"
              onClick={(event) => {
                event.preventDefault();
                this.handleUpdate();
              }}
            >
              Update
            </button>
            <button
              className="button"
              id="btn_delete"
              type="button"
              onClick={(event) => {
                event.preventDefault();
                this.handleDelete();
              }}
            >
              Delete
            </button>
          </form>
          <span id="feedback" />
        </div>
      </div>
    );
  }
}

export default AddressForm;
