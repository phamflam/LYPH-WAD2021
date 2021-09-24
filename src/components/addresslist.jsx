import React from "react";
import Address from "./address";
import "../css/style.css";
import { marker } from "leaflet";

//stateless functional component
const Nameplate = ({ user, alt }) => {
  return (
    <div className={"address-nameplate address" + (alt ? " address-alt" : "")}>
      <span className="address-name">{user.name}:</span>
    </div>
  );
};

class AddressList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("CU from LIST ", this.props.currentUser);
    console.log("users from LIST ", this.props.userdata);
    console.log("addrcache list", this.props.addressCache);
    console.log("usercache list", this.props.userCache);
  }

  render() {
    // const { addressdata } = this.props;
    this.props.markers.clearLayers();
    let userSet = new Set();
    userSet.add(this.props.currentUser.id ?? -1);
    if (this.props.showingAll) {
      Array.from(this.props.userCache.values()).forEach((u) =>
        userSet.add(u.id ?? -1)
      );
    }
    let alternateColor = false;

    return (
      <div className={"address-container"}>
        {Array.from(userSet).map((id) => {
          let user = this.props.userCache.get(id);
          if (!user) {
            return null;
          }

          return (
            <div key={id}>
              {(alternateColor = !alternateColor)}
              <Nameplate user={user} alt={alternateColor} />
              {Array.from(this.props.addressCache.values())
                .filter((a) => a.owner === user.id)
                .map((addr) => {
                  if (this.props.currentUser.id !== user.id) {
                    if (!this.props.currentUser.privileged && !addr.global)
                      return null;
                  }

                  let m = undefined;

                  // console.log("markers", this.props.markers);

                  if (addr.pos != null) {
                    m = new marker(addr.pos)
                      .addTo(this.props.markers)
                      .bindPopup(addr.firstName + " " + addr.lastName);
                  }

                  alternateColor = !alternateColor;

                  return (
                    <Address
                      key={addr.id}
                      id={addr.id}
                      fname={addr.firstName}
                      lname={addr.lastName}
                      street={addr.street}
                      number={addr.number}
                      zip={addr.zip}
                      city={addr.city}
                      state={addr.state}
                      country={addr.country}
                      global={addr.global}
                      pos={addr.pos}
                      owner={addr.owner}
                      setFormState={this.props.setFormState}
                      currentUser={this.props.currentUser}
                      setAddressContext={this.props.setAddressContext}
                      alt={alternateColor}
                      map={this.props.map}
                      marker={m}
                      disabled={
                        !(
                          this.props.currentUser.privileged ||
                          addr.owner === this.props.currentUser.id
                        )
                      }
                      setEditing={this.props.setEditing}
                    />
                  );
                })}
            </div>
          );
        })}
      </div>
    );

    // let addresses = addressdata.map((addr) => {
    //   return (
    //     <Address
    //       // className={classGlobal}
    //       key={addr.id}
    //       id={addr.id}
    //       fname={addr.firstName}
    //       lname={addr.lastName}
    //       street={addr.street}
    //       number={addr.number}
    //       zip={addr.zip}
    //       city={addr.city}
    //       state={addr.state}
    //       country={addr.country}
    //       global={addr.global}
    //       pos={addr.pos}
    //       owner={addr.owner}
    //       setFormState={this.props.setFormState}
    //       currentUser={this.props.currentUser}
    //       setAddressContext={this.props.setAddressContext}
    //       showingAll={this.props.showingAll}
    //     >
    //       {/* {(alternateColor = !alternateColor)} */}
    //       {/* <Nameplate></Nameplate>{" "} */}
    //     </Address>
    //   );
    // });

    // return <div id="address-container">{addresses}</div>;
    // }
  }
}

export default AddressList;
