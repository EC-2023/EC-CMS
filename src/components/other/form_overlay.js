import React, { useState } from "react";
import "./form_overlay.scss"
import { useEffect } from "react";

function FormOverlay(props) {
  const [childState, setChildState] = useState(props.childState);

  // useEffect(() => {
  //   setChildState(props.childState)
  // }, [props.childState]);

  const handleCancelClick = () => {
    props.closeEdit()
  };

  const handleChangeState = (key, value) => {
    setChildState({...childState, [key] : value})
  }

  const handleSaveClick = () => {
    // TODO: handle saving the form data
    props.handleAddressChange(props.index,childState);
    props.closeEdit()
  };

  const renderInputs = () => {
    return Object.keys(childState).map((key) => (
      <label key={key}>
        {key}:
        <input
          type="text"
          name={key}
          value={childState[key]}
          onChange={(e) => handleChangeState(key, e.target.value)}
        />
      </label>
    ));
  };

  return (
      <>
        <div className="overlay show" onClick={handleCancelClick}></div>
        <form className="form-overlay">
          {renderInputs()}
          <br/>
          <button type="button" className="save" onClick={handleSaveClick}>
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
