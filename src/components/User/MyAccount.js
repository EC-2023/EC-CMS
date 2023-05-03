import React, { Fragment, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import SEO from '../seo';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import EditAdressOverlay from '../other/editAdress_overlay';
import './MyAccount.scss';
import UploadImage from './UploadImage';
import UserAddressAPI from '../../api/UserAddressAPI';
import UserAPI from '../../api/UserAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyAccount = () => {
  let { pathname } = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getUserAddressList = async () => {
      try {
        const response = await UserAddressAPI.getMyUserAddressList();
        console.log(response.data);
        setAddressUser(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log('faild', error);
        setIsLoading(false);
      }
    };

    const getUserInfor = async () => {
      try {
        setIsLoading(true);
        const response = await UserAPI.getMyUserInfor();
        setUserInfor({
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          middleName: response.data.middleName,
          phoneNumber: response.data.phoneNumber,
        });
      } catch (error) {
        console.log('faild', error);
      }
    };

    getUserInfor();
    getUserAddressList();
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [userInfor, setUserInfor] = useState({
    email: '',
    firstName: '',
    lastName: '',
    middleName: '',
    phoneNumber: '',
  });
  const [addressUser, setAddressUser] = useState([]);
  const [editingAddressIndex, setEditingAddressIndex] = useState(null);
  const [newAddress, setNewAddress] = useState({
    city: '',
    country: '',
    district: '',
    nameRecipient: '',
    detailAddress: '',
    numberPhone: '',
    ward: '',
    zipcode: '',
  });

  const handleAddClick = () => {
    setIsNew(true);
  };

  const handleEditClick = (index) => {
    setIsEditing(true);
    setEditingAddressIndex(index);
  };

  const handleDeleteClick = async (index) => {
    try {
      setAddressUser((prevState) => prevState.filter((address, i) => i !== index));
      const response = await UserAddressAPI.deleteMyUserAddress(addressUser[index].Id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateMyUserAddress = async (index, childState) => {
    try {
      const { Id, ...params } = childState;
      console.log(params);
      const response = await toast.promise(
        UserAddressAPI.updateMyUserAddress(addressUser[index].Id, params),
        {
          pending: 'Đang Lưu...',
          success: 'Lưu thành công!',
          error: 'Lưu thất bại!',
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateMyProfile = async () => {
    try {
      const response = await toast.promise(UserAPI.updateMyUserInfor(userInfor), {
        pending: 'Đang Lưu...',
        success: 'Lưu thành công!',
        error: 'Lưu thất bại!',
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddressChange = async (addressIndex, updatedAddress) => {
    setAddressUser((prevState) =>
      addressIndex === null
        ? [...prevState, updatedAddress]
        : prevState.map((address, index) => (index === addressIndex ? updatedAddress : address))
    );
    try {
      // const response = await UserAddressAPI.createMyUserAddress(updatedAddress);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUserAddress = async (updatedAddress) => {
    try {
      const response = await toast.promise(UserAddressAPI.createMyUserAddress(updatedAddress), {
        pending: 'Đang Lưu...',
        success: 'Lưu thành công!',
        error: 'Lưu thất bại!',
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserInforChange = (event) => {
    setUserInfor({
      ...userInfor,
      [event.target.name]: event.target.value,
    });
  };

  const getAddress = (address) => {
    const { isDeleted, createAt, updateAt, Id, userId, ...gAddress } = address;
    return gAddress;
  };

  const closeEdit = () => {
    setIsEditing(false);
    setIsNew(false);
  };

  if (isLoading) {
    return (
      <div className="flone-preloader-wrapper">
        <div className="flone-preloader">
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <ToastContainer />
      <SEO
        titleTemplate="My Account"
        description="My Account page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: 'Home', path: process.env.PUBLIC_URL + '/' },
            { label: 'My Account', path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ms-auto me-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0" className="single-my-account mb-20">
                      <Accordion.Header className="panel-heading">
                        <span>1 .</span> Edit your account information{' '}
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
                                <input
                                  name="firstName"
                                  type="text"
                                  value={userInfor.firstName}
                                  onChange={handleUserInforChange}
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>Middle Name</label>
                                <input
                                  name="middleName"
                                  type="text"
                                  value={userInfor.middleName}
                                  onChange={handleUserInforChange}
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>Last Name</label>
                                <input
                                  name="lastName"
                                  type="text"
                                  value={userInfor.lastName}
                                  onChange={handleUserInforChange}
                                />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>Email Address</label>
                                <input
                                  name="email"
                                  type="email"
                                  value={userInfor.email}
                                  onChange={handleUserInforChange}
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>Telephone</label>
                                <input
                                  name="phoneNumber"
                                  type="text"
                                  value={userInfor.phoneNumber}
                                  onChange={handleUserInforChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="billing-back-btn">
                            <div className="billing-btn">
                              <button type="submit" onClick={handleUpdateMyProfile}>
                                Lưu
                              </button>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1" className="single-my-account mb-20">
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

                    <Accordion.Item eventKey="2" className="single-my-account mb-20">
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
                                      <p>Tên người nhận: {address.nameRecipient}</p>
                                      <p>SĐT: {address.numberPhone}</p>
                                      <p>Địa chi: {address.detailAddress}</p>
                                      <p>District: {address.district}</p>
                                      <p>Ward: {address.ward}</p>
                                      <p>City: {address.city}</p>
                                      <p>Zipcode: {address.zipcode}</p>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                    <div className="entries-edit-delete text-center d-flex justify-content-center">
                                      <div>
                                        <button className="edit" onClick={() => handleEditClick(index)}>
                                          Edit
                                        </button>
                                        {isEditing && editingAddressIndex === index && (
                                          <EditAdressOverlay
                                            index={index}
                                            isEditing={isEditing}
                                            closeEdit={closeEdit}
                                            childState={getAddress(address)}
                                            handleAddressChange={handleAddressChange}
                                            handleUpdateMyUserAddress={handleUpdateMyUserAddress}
                                            handleAddUserAddress={handleAddUserAddress}
                                          />
                                        )}
                                      </div>
                                      <div>
                                        <button onClick={() => handleDeleteClick(index)}>Delete</button>
                                      </div>
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
                                <EditAdressOverlay
                                  index={null}
                                  closeEdit={closeEdit}
                                  childState={getAddress(newAddress)}
                                  handleAddressChange={handleAddressChange}
                                  handleAddUserAddress={handleAddUserAddress}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="4" className="single-my-account mb-20">
                      <Accordion.Header className="panel-heading">
                        <span>4 .</span> Upload Ảnh đại diện
                      </Accordion.Header>
                      <Accordion.Body>
                        <UploadImage />
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
