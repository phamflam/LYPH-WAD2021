import React from "react";
import "../css/style.css";
import * as L from "leaflet";

class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: "", currentAddr: null, diplayAdd: false };
  }
  baseURL = "http://localhost:5000/";

  getCurrentAddress() {
    if (this.state.currentAddr === null) {
      return undefined;
    }
    return this.props.addressCache.get(this.state.currentAddr);
  }

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

  componentDidMount() {
    // this.updateUsersForFormSelect();
  }

  setAddressContext(index) {
    this.updateUsersForFormSelect();

    this.currentAddr = index === -1 ? null : index;
    document.getElementById("skip_geo").checked = false;
    document.getElementById("skip_geo_div").style.display = "none";

    this.fillFormWithAddress();

    const newAddr = index === -1;
    document.getElementById("btn_save").style.display = !newAddr
      ? "none"
      : "inline";
    document.getElementById("btn_update").style.display = newAddr
      ? "none"
      : "inline";
    document.getElementById("btn_delete").style.display = newAddr
      ? "none"
      : "inline";
  }

  fillFormWithAddress() {
    const address = this.getCurrentAddress();

    const fname = address?.firstName ?? "";
    const lname = address?.lastName ?? "";
    const street = address?.street ?? "";
    const number = address?.street_extra ?? "";
    const zip = address?.zip ?? "";
    const city = address?.city ?? "";
    const state = address?.state ?? "";
    const country = address?.country ?? "";
    const global = address?.global ?? false;

    document.getElementById("privacy").checked = !global;
    document.getElementById("fname").value = fname;
    document.getElementById("lname").value = lname;
    document.getElementById("street").value = street;
    document.getElementById("number").value = number;
    document.getElementById("zip").value = zip;
    document.getElementById("city").value = city;
    document.getElementById("state").value = state || "";
    document.getElementById("country").value = country || "";

    if (!this.currentAddr) return;

    let user = this.props.addressCache.get(this.currentAddr)?.owner;
    if (user && this.currentUser && user === this.currentUser.id) return; //"self" is selected by default, no need to select it again

    let select = document.getElementById("owner");
    Array.from(select.children).forEach((option) => {
      if (option.getAttribute("value") === user?.toString())
        option.setAttribute("selected", "true");
    });
  }

  updateUsersForFormSelect = () => {
    let select = document.getElementById("owner");

    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }

    let userSet = new Set();
    userSet.add(this.state.this.currentUser?.id ?? -1);
    Array.from(this.userCache.values()).forEach((u) => userSet.add(u.id ?? -1));
    userSet.forEach((id) => {
      let user = this.userCache.get(id);
      if (!user) return;

      let option = document.createElement("option");
      option.value = "" + user.id;
      let name = user.name;
      if (
        this.state.this.currentUser &&
        this.state.this.currentUser.id === user.id
      ) {
        name = "Self";
        option.selected = true;
      }
      option.appendChild(document.createTextNode(name));

      select.appendChild(option);
    });

    select.disabled =
      !this.state.this.currentUser || !this.state.this.currentUser.privileged;
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
                // value={fname}
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
                required
              />
            </div>
            <div className="field">
              <label htmlFor="state">State:</label>
              <br />
              <input className="c_input" type="text" id="state" name="state" />
            </div>
            <div className="field">
              <label htmlFor="country">Country:</label>
              <br />
              <input
                className="c_input"
                type="text"
                id="country"
                name="country"
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
              onClick={this.handleAdd}
            >
              Save
            </button>
            <button
              className="button"
              id="btn_update"
              type="button"
              onClick={this.handleUpdate}
            >
              Update
            </button>
            <button
              className="button"
              id="btn_delete"
              type="button"
              onClick={this.handleDelete}
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
