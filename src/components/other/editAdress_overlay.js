import React, { useState } from "react";
import "./form_overlay.scss";
import { useEffect } from "react";
import { fetchProvinces, fetchDistricts, fetchWards } from "../../helpers/other";

function FormOverlay(props) {
    const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [childState, setChildState] = useState(props.childState);

  useEffect(() => {
    // Fetch provinces data and set it to provinces state
    // This should be replaced with your actual API call
    fetchProvinces().then((data) => setProvinces(data));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
        console.log("lấy distric")
      // Fetch districts based on the selected province
      // Replace with your actual API call
      console.log(selectedProvince);
      fetchDistricts(selectedProvince).then((data) => {setDistricts(data); console.log(data);});
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      // Fetch wards based on the selected district
      // Replace with your actual API call
      fetchWards(selectedDistrict).then((data) => setWards(data));
    }
  }, [selectedDistrict]);

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedDistrict("");
    setSelectedWard("");
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedWard("");
  };

  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
  };

  const handleCancelClick = () => {
    props.closeEdit();
  };

  const handleChangeState = (key, value) => {
    setChildState({ ...childState, [key]: value });
  };

  const handleSaveClick = () => {
    // TODO: handle saving the form data
    props.handleAddressChange(props.index, childState);
    props.closeEdit();
  };

  const handleSaveEditClick = () => {
    // TODO: handle saving the form data
    console.log("update user");
    props.handleAddressChange(props.index, childState);
    props.closeEdit();
    props.handleUpdateMyUserAddress();
  };
  return (
    <>
      <div className="overlay show" onClick={handleCancelClick}></div>
      <form className="form-overlay">
        <label>
          Name Recipient:
          <input
            type="text"
            name="nameRecipient"
            value={childState.nameRecipient}
            onChange={(e) => handleChangeState("nameRecipient", e.target.value)}
          />
        </label>
        <label>
          Number Phone:
          <input
            type="text"
            name="numberPhone"
            value={childState.numberPhone}
            onChange={(e) => handleChangeState("numberPhone", e.target.value)}
          />
        </label>
        {/* <label>
          District:
          <input
            type="text"
            name="district"
            value={childState.district}
            onChange={(e) => handleChangeState("district", e.target.value)}
          />
        </label>
        <label>
          Ward:
          <input
            type="text"
            name="ward"
            value={childState.ward}
            onChange={(e) => handleChangeState("ward", e.target.value)}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={childState.city}
            onChange={(e) => handleChangeState("city", e.target.value)}
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={childState.country}
            onChange={(e) => handleChangeState("country", e.target.value)}
          />
        </label> */}
        <label>
        Tỉnh:
        <select value={selectedProvince} onChange={handleProvinceChange}>
          <option value="">Select a province</option>
          {provinces.map((province) => (
            <option key={province.id} value={province.code}>
              {province.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        District:
        <select value={selectedDistrict} onChange={handleDistrictChange}>
          <option value="">Select a district</option>
          {districts.map((district) => (
            <option key={district.id} value={district.code}>
              {district.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Ward:
        <select value={selectedWard} onChange={handleWardChange}>
          <option value="">Select a ward</option>
          {wards.map((ward) => (
            <option key={ward.id} value={ward.code}>
              {ward.name}
            </option>
          ))}
        </select>
      </label>
        <label>
          Zipcode:
          <input
            type="text"
            name="zipcode"
            value={childState.zipcode}
            onChange={(e) => handleChangeState("zipcode", e.target.value)}
          />
        </label>
        <br />
        <button
          type="button"
          className="save"
          onClick={props.isEditing ? handleSaveEditClick : handleSaveClick}
        >
          Save
        </button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </>
  );
}

export default FormOverlay;
