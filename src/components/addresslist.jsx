import React from "react";
import Address from "./address";
import "../css/style.css";

class AddressList extends React.Component {
  render() {
    const { addresses } = this.props;
    return (
      <div>
        {addresses.map((address) => (
          <Address key={address.id} address={address}></Address>
        ))}
      </div>
    );
  }
}

export default AddressList;

// class AddressList extends React.Component {
//   render() {
//     let addresses = this.props.map((addr) => {
//       return <Address fname={addr.fname} lname={addr.lname}></Address>;
//     });

//     return <div>{addresses}</div>;
//   }
// }

// export default AddressList;
