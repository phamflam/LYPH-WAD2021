import React from "react";
import "../css/style.css";

class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  handleSave() {
    console.log("SAVED");
  }

  handleUpdate() {
    console.log("UPDATED");
  }

  handleDelete() {
    console.log("DELETED");
  }

  handleCancel = () => {
    console.log("CANCEL");
  };

  render() {
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
              onClick={this.handleSave}
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
