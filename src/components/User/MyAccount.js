import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import SEO from "../seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import FormOverlay from "../other/form_overlay";
import userAddress from "../../data/User/userAdress.json";
import "./MyAccount.scss"
import UploadImage from './UploadImage'

const MyAccount = () => {
  let { pathname } = useLocation();

  const [isEditing, setIsEditing] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [userInfor, setUserInfor] = useState({
    email: "",
    fName: "",
    lName: "",
    mName: "",
    phoneNumber: "",
  });
  const [addressUser, setAddressUser] = useState(userAddress);
  const [editingAddressIndex, setEditingAddressIndex] = useState(null);
  const [newAddress, setNewAddress] = useState({
    city: "",
    country: "",
    district: "",
    nameRecipient: "",
    numberPhone: "",
    ward: "",
    zipcode: "",
  });

  const handleAddClick = () => {
    setIsNew(true);
  };

  const handleEditClick = (index) => {
    setIsEditing(true);
    setEditingAddressIndex(index);
  };

  const handleDeleteClick = (index) => {
    setAddressUser((prevState) =>
      prevState.filter((address, i) => i !== index)
    );
  };

  const handleAddressChange = (addressIndex, updatedAddress) => {
    setAddressUser(prevState =>
      addressIndex === null
        ? [...prevState, updatedAddress]
        : prevState.map((address, index) =>
            index === addressIndex ? updatedAddress : address
          )
    );
  };

  const handleUserInforChange = (event) =>{
    setUserInfor({
      ...userInfor,
      [event.target.name]: event.target.value,
    });
  }

  const getAddress = (address) => {
    const { isDeleted, createdAt, updatedAt, Id, userId, ...newaddress } =
      address;
    return newaddress;
  };

  const closeEdit = () => {
    setIsEditing(false);
    setIsNew(false);
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="My Account"
        description="My Account page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "My Account", path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ms-auto me-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item
                      eventKey="0"
                      className="single-my-account mb-20"
                    >
                      <Accordion.Header className="panel-heading">
                        <span>1 .</span> Edit your account information{" "}
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h4>My Account Information</h4>
                            <h5>Your Personal Details</h5>
                          </div>
                          <div className="row">
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>First Name</label>
                                <input type="text" value={userInfor.fName} onChange={handleUserInforChange}/>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>Middle Name</label>
                                <input type="text" value={userInfor.mName} onChange={handleUserInforChange}/>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>Last Name</label>
                                <input type="text" value={userInfor.lName} onChange={handleUserInforChange} />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>Email Address</label>
                                <input type="email"  value={userInfor.email} onChange={handleUserInforChange}/>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>Telephone</label>
                                <input type="text" value={userInfor.phoneNumber} onChange={handleUserInforChange} />
                              </div>
                            </div>
                          </div>
                          <div className="billing-back-btn">
                            <div className="billing-btn">
                              <button type="submit">Continue</button>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item
                      eventKey="1"
                      className="single-my-account mb-20"
                    >
                      <Accordion.Header className="panel-heading">
                        <span>2 .</span> Change your password
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h4>Change Password</h4>
                            <h5>Your Password</h5>
                          </div>
                          <div className="row">
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>Password</label>
                                <input type="password" />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>Password Confirm</label>
                                <input type="password" />
                              </div>
                            </div>
                          </div>
                          <div className="billing-back-btn">
                            <div className="billing-btn">
                              <button type="submit">Continue</button>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item
                      eventKey="2"
                      className="single-my-account mb-20"
                    >
                      <Accordion.Header className="panel-heading">
                        <span>3 .</span> Sửa địa chỉ
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h4>Address Book Entries</h4>
                          </div>
                          <div className="entries-wrapper">
                            <>
                              {addressUser.map((address, index) => (
                                <div className="row" key={index}>
                                  <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                    <div className="entries-info text-center">
                                      <p>City: {address.city}</p>
                                      <p>Country: {address.country}</p>
                                      <p>District: {address.district}</p>
                                      <p>
                                        Name recipient: {address.nameRecipient}
                                      </p>
                                      <p>Number phone: {address.numberPhone}</p>
                                      <p>Ward: {address.ward}</p>
                                      <p>Zipcode: {address.zipcode}</p>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                    <div className="entries-edit-delete text-center">
                                      <div>
                                        <button
                                          className="edit"
                                          onClick={() => handleEditClick(index)}
                                        >
                                          Edit
                                        </button>
                                        {isEditing &&
                                          editingAddressIndex === index && (
                                            <FormOverlay
                                              index={index}
                                              closeEdit={closeEdit}
                                              childState={getAddress(address)}
                                              handleAddressChange={
                                                handleAddressChange
                                              }
                                            />
                                          )}
                                      </div>
                                      <button
                                        onClick={() => handleDeleteClick(index)}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </>
                          </div>
                          <div className="billing-back-btn ">
                            <div className="billing-btn entries-edit-delete text-center">
                              <button onClick={handleAddClick} className="btn add">
                                add
                              </button>
                                {isNew && (
                                  <FormOverlay
                                    index={null}
                                    closeEdit={closeEdit}
                                    childState={getAddress(newAddress)}
                                    handleAddressChange={handleAddressChange}
                                  />
                                )}
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item
                      eventKey="4"
                      className="single-my-account mb-20"
                    >
                      <Accordion.Header className="panel-heading">
                        <span>4 .</span> Upload Ảnh đại diện
                      </Accordion.Header>
                      <Accordion.Body>
                        <UploadImage/>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default MyAccount;
