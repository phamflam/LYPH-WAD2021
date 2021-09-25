import React, { Component } from "react";
import "../css/style.css";
import { MapContainer, TileLayer } from "react-leaflet";
import AddressForm from "./addressform";
import AddressList from "./addresslist";
import { layerGroup } from "leaflet";
// https://stackoverflow.com/questions/67552020/how-to-fix-error-failed-to-compile-node-modules-react-leaflet-core-esm-pat

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingAll: true,
      displayForm: false,
      isLoaded: false,
      addressdata: [],
      editing: 0,
    };
  }

  // currentAddr;
  baseURL = "http://localhost:5000/";
  addressCache = new Map();
  map = null;
  markers = new layerGroup();

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
    console.log("users ", this.props.userdata);
    console.log("CUser from MAIN", this.props.currentUser);
    console.log("usercache main ", this.props.userCache);
  }

  openAddForm = () => {
    console.log("OPEN ADDFORM");

    this.setState({ displayForm: !this.state.displayForm });
  };

  hideForm = () => {
    console.log("HIDE FORM");
    this.setState({ displayForm: false });
  };

  setFormState = (state) => {
    this.setState({ displayForm: state });
  };

  setEditing = (id) => {
    this.setState({ editing: id });
  };

  animateVisibility = () => {
    let all = document.getElementById("btn_all");
    let mine = document.getElementById("btn_mine");
    if (!this.state.showingAll) {
      console.log("SHOW ALL");
      all.classList.add("hidden");
      mine.classList.remove("hidden");
      this.setState({ showingAll: true });
      //fetch visible addr from cache?
    } else {
      console.log("SHOW MINE");
      mine.classList.add("hidden");
      all.classList.remove("hidden");
      this.setState({ showingAll: false });
      //fetch visible addr from cache?
    }
  };

  render() {
    if (
      this.state.displayForm
      // ||
      // this.state.editing !== 0
    ) {
      return (
        <AddressForm
          addressdata={this.state.addressdata}
          currentUser={this.props.currentUser}
          hideForm={this.hideForm}
          id={this.state.editing}
          setEditing={this.setEditing}
          addressCache={this.addressCache}
          userCache={this.props.userCache}
        />
      );
    }

    return (
      <div id="screen_main" className="screen">
        <div className="content">
          <div id="map-area">
            <div id="side-bar">
              <div id="visibility-buttons">
                <button
                  className="button button-large "
                  id="btn_mine"
                  onClick={this.animateVisibility}
                >
                  Show Mine
                </button>
                <button
                  className="button button-large hidden"
                  id="btn_all"
                  onClick={this.animateVisibility}
                >
                  Show All
                </button>
              </div>
              <div id="address-bar">
                <AddressList
                  addressdata={this.state.addressdata}
                  addressCache={this.addressCache}
                  currentUser={this.props.currentUser}
                  setFormState={this.setFormState}
                  userdata={this.props.userdata}
                  userCache={this.props.userCache}
                  showingAll={this.state.showingAll}
                  markers={this.markers}
                  map={this.map}
                  setEditing={this.setEditing}
                />
                <button
                  onClick={() => {
                    this.openAddForm();
                    this.setEditing(0); //buggy solution
                    // this.setEditing(-1);
                  }}
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
              whenCreated={(m) => {
                this.map = m;
                this.markers.remove();
                this.markers.addTo(m);
              }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </MapContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
