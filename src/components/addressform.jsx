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
      owner: this.props.currentUser.id,
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

  baseURL = "http://localhost:5000/contacts/";

  updateGlobalState = (event, newState) => {
    if (newState == null) return;
    this.setState({ global: newState });
  };

  componentDidMount() {
    const select = document.getElementById("owner");
    if (!this.props.currentUser.privileged) {
      select.disabled = true;
    }
    console.log("hää", this.props.currentUser.privileged);
    console.log("CA from FORM", this.props.addressCache.get(this.props.id));
    console.log("CU from FORM ", this.props.currentUser);
    console.log("fetc", this.baseURL + this.props.id);
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
    // console.log("FORM DATA", this.state);
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
    // this.setState({ owner: address.owner }); //??
    if (this.props.id > 0) {
      address.id = this.props.id;
    }

    this.findLatLng(address)
      .then(async (address) => {
        let res;
        if (this.props.id < 0) {
          // const button_save = document.getElementById("btn_save");

          res = await fetch(this.baseURL, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(address),
          });

          if (!res || res.status !== 201) {
            setTimeout(() => alert("couldnt add"), 1);
            return;
          }

          const location = res.headers.get("Location");
          if (!location || !location.startsWith("/contacts/")) {
            setTimeout(() => alert("missing new id"), 1);
            return;
          }
          address.id = parseInt(location.substr(10));
        } else {
          // const button_update = document.getElementById("btn_update");

          res = await fetch(this.baseURL + this.props.id, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(address),
          });
          if (!res || res.status !== 204) {
            setTimeout(() => alert("couldnt update"), 1);
            return;
          }
        }

        // this.displayInfo(null);
        this.props.addressCache.set(address.id ?? this.props.id, address);
        this.props.setEditing(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  delete = async () => {
    if (this.props.id < 0) return;

    let res = await fetch(this.baseURL + this.props.id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!res || res.status !== 204) {
      setTimeout(() => alert("couldnt delete addr"), 1);
      return;
    }
    this.props.addressCache.delete(this.props.id);
    // this.displayInfo(null);
    this.props.setEditing(0);
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

  renderModifyButtons = () => {
    return (
      <div>
        <button
          className="button"
          id="btn_update"
          type="button"
          onClick={(event) => {
            event.preventDefault();
            this.commit();
            this.props.hideForm();
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
            this.delete();
            this.props.hideForm();
          }}
        >
          Delete
        </button>
      </div>
    );
  };

  renderSavebutton = () => {
    return (
      <button
        className="button"
        id="btn_save"
        type="button"
        onClick={(event) => {
          event.preventDefault();
          this.commit();
          this.props.hideForm();
        }}
      >
        Save
      </button>
    );
  };

  render() {
    let userSet = new Set();
    userSet.add(this.props.currentUser.id ?? -1);
    Array.from(this.props.userCache.values()).forEach((u) =>
      userSet.add(u.id ?? -1)
    );
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
                value={this.state.global}
                onChange={(e) => {
                  this.updateGlobalState(e.target.checked);
                }}
                checked={this.state.global ? false : true}
              />
            </div>
            <div>
              <label htmlFor="owner">Owner of Contact</label>
              <br />
              <select
                className="c_input"
                id="owner"
                name="owner"
                value={this.state.owner}
                onChange={(e) => {
                  this.setOwner(e.target.value);
                }}
              >
                {Array.from(userSet.values()).map((u) => {
                  let user = this.props.userCache.get(u);

                  return (
                    <option value={u} key={u}>
                      {this.props.currentUser.id === u ? "self" : user.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div id="skip_geo_div" style={{ display: "none" }}>
              <label htmlFor="skip_geo">Skip looking for coordinates</label>
              <br />
              <input type="checkbox" id="skip_geo" name="skip_geo" />
            </div>
            <button
              className="button"
              id="btn_cancel"
              type="button"
              onClick={() => {
                this.props.hideForm();
                this.props.setEditing(0);
              }}
            >
              Cancel
            </button>
            {this.props.id > 0
              ? this.renderModifyButtons()
              : this.renderSavebutton()}
          </form>
          <span id="feedback" />
        </div>
      </div>
    );
  }
}

export default AddressForm;
