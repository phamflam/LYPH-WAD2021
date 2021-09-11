import React, { Component } from "react";
import "../css/style.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import AddressForm from "./addressform";
import AddressList from "./addresslist";
// https://stackoverflow.com/questions/67552020/how-to-fix-error-failed-to-compile-node-modules-react-leaflet-core-esm-pat

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingAll: true,
      displayForm: false,
      addresses: [
        {
          currentUser: "admina",
          id: 1,
          fname: "Test",
          lname: "eins",
          street: "strasse",
          number: "8",
          zip: "12345",
          city: "berlin",
          state: "berlin",
          country: "germany",
          global: false,
        },
        { id: 2, fname: "Test", lname: "zwei" },
        { id: 3, fname: "OMG", lname: "drei" },
        { id: 4, fname: "HALLO", lname: "drei" },
        { id: 5, fname: "HALLO", lname: "drei" },
        { id: 6, fname: "HALLO", lname: "drei" },
        { id: 7, fname: "HALLO", lname: "drei" },
        { id: 8, fname: "HALLO", lname: "drei" },
        { id: 9, fname: "ehm", lname: "drei" },
        { id: 10, fname: "HALLO", lname: "drei" },
        { id: 11, fname: "HALLO", lname: "drei" },
        { id: 12, fname: "HALLO", lname: "drei" },
      ],
    };
  }

  currentAddr;

  openForm = () => {
    console.log("OPEN FORM");
    this.setState({ displayForm: !this.state.displayForm });
  };

  hideForm = () => {
    console.log("HIDE FORM");
    this.setState({ displayForm: false });
  };

  animateVisibility = () => {
    let all = document.getElementById("btn_all");
    let mine = document.getElementById("btn_mine");
    if (this.state.showingAll) {
      console.log("SHOW ALL");
      all.classList.add("hidden");
      mine.classList.remove("hidden");
      this.setState({ showingAll: false });
    } else {
      console.log("SHOW MINE");
      mine.classList.add("hidden");
      all.classList.remove("hidden");
      this.setState({ showingAll: true });
    }
  };

  render() {
    if (this.state.displayForm) {
      return <AddressForm hideForm={this.hideForm} />;
    }

    return (
      <div id="screen_main" className="screen">
        <div className="content">
          <div id="map-area">
            <div id="side-bar">
              <div id="visibility-buttons">
                <button
                  className="button button-large hidden"
                  id="btn_mine"
                  onClick={this.animateVisibility}
                >
                  Show Mine
                </button>
                <button
                  className="button button-large"
                  id="btn_all"
                  onClick={this.animateVisibility}
                >
                  Show All
                </button>
              </div>
              <div id="address-bar">
                {/* <div id="address-container">
                  <AddressList addresses={this.state.addresses} />
                </div> */}
                <AddressList addresses={this.state.addresses} />

                <button
                  onClick={this.openForm}
                  className="button button-large"
                  id="btn_add"
                >
                  Add New
                </button>
              </div>
            </div>
            {/* <div id="map" /> */}
            <MapContainer
              id="map"
              center={[52.54978805042941, 13.518109546538927]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[52.54978805042941, 13.518109546538927]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
