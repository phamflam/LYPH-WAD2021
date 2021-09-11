import React from "react";
import Address from "./address";
import "../css/style.css";

// class AddressList extends React.Component {
//   render() {
//     const { addresses } = this.props;
//     return (
//       <div id="address-container">
//         {addresses.map((address) => (
//           <Address key={address.id} address={address}></Address>
//         ))}
//       </div>
//     );
//   }
// }

// export default AddressList;

// const classGlobal = className({
//   global: (addr.global = true),
// });

class AddressList extends React.Component {
  render() {
    let addresses = this.props.addresses.map((addr) => {
      return (
        <Address
          // className={classGlobal}
          key={addr.id}
          fname={addr.fname}
          lname={addr.lname}
        ></Address>
      );
    });

    return <div id="address-container">{addresses}</div>;
  }
}

export default AddressList;
