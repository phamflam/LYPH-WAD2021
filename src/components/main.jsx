import React, { Component } from "react";
import "../css/style.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import AddressForm from "./addressform";
import AddressList from "./addresslist";
// import MarkerList from "./markerlist";
// https://stackoverflow.com/questions/67552020/how-to-fix-error-failed-to-compile-node-modules-react-leaflet-core-esm-pat

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingAll: true,
      displayForm: false,
      isLoaded: false,
      addressdata: [],
      markers: [],
    };
    // this.fetchAddr = this.fetchAddr.bind(this);
    // this.fetchUser = this.fetchUser.bind(this);
  }

  // currentAddr;
  baseURL = "http://localhost:5000/";
  addressCache = new Map();

  async fetchAddr() {
    let response = await fetch(this.baseURL + "contacts/");
    if (response.status !== 200) {
      setTimeout(
        () => alert("Unable to communicate with server. Try again later"),
        1
      );
      throw new Error("Status: " + response.status);
    }

    let addresses = await response.json();
    this.addressCache.clear();
    addresses.forEach((value) => {
      if (!value.id) return;
      this.addressCache.set(value.id, value);

      this.setState({
        isLoaded: true,
        addressdata: Array.from(this.addressCache.values()),
      });
    });
    console.log("data", this.addressCache);
    console.log("fetched", this.state.addressdata);
    console.log("loaded", this.state.isLoaded);
  }

  componentDidMount() {
    this.fetchAddr();
  }

  openAddForm = () => {
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
                <AddressList
                  addressdata={this.state.addressdata}
                  onOpenForm={this.openForm}
                />
                <button
                  onClick={this.openAddForm}
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
              zoom={11}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[52.54978805042941, 13.518109546538927]}>
                <Popup>
                  tach <br /> meine kerle
                </Popup>
              </Marker>
              {/* <MarkerList addressdata={this.state.addressdata} /> */}
            </MapContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
