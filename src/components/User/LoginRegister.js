import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserAPI from "../../api/UserAPI";

const LoginRegister = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const [error, setError] = useState({passowordWeak : true, rePasswordWrong : true})

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    rePassword :"",
    email: "",
    fName: "",
    lName: "",
    mName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    checkPassword();
  }, [formValues]);

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
    checkPassword();
  };

  const checkPassword = () => {
    if(formValues.password.length <= 5) setError(prevState => ({...prevState, passowordWeak: true}));
    else setError(prevState => ({...prevState, passowordWeak: false}));
  
    if(formValues.rePassword !== formValues.password) setError(prevState => ({...prevState, rePasswordWrong: true}));
    else setError(prevState => ({...prevState, rePasswordWrong: false}));
    
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const params = {username : formValues.username,password : formValues.password};
      // const result = await toast.promise(
      //   UserAPI.login(params),
      //   {
      //     pending: "Logging in...",
      //     success: "Logged in successfully!",
      //     error: "Login failed. Please try again.",
      //     position: "top-right",
      //     autoClose: 2000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //   }
      // );
      const response = await UserAPI.login(params);
      console.log(response); // Kết quả trả về từ AuthService.login()
      setTimeout(() => {
        navigate("/my-account");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
  };

  return (
    <Fragment>
      <ToastContainer />
      <SEO
        titleTemplate="Login"
        description="Login page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Login Register",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleLogin}>
                              <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formValues.username}
                                onChange={handleChange}
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formValues.password}
                                onChange={handleChange}
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleRegister}>
                              <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formValues.username}
                                onChange={handleChange}
                              />
                              {(error.passowordWeak && formValues.password.length >0) && (<span style={{backgroundColor: "yellow"}}> Mật khẩu ít nhất 6 kí tự</span>)}
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formValues.password}
                                onChange={handleChange}
                              />
                              {error.rePasswordWrong && formValues.rePassword.length >0 && (<span style={{backgroundColor: "orange"}}> Mật khẩu nhập lại không trùng khớp</span>)}
                              <input
                                type="password"
                                name="rePassword"
                                placeholder="Re_Password"
                                value={formValues.rePassword}
                                onChange={handleChange}
                              />
                              <input
                                type="text"
                                name="fName"
                                placeholder="First Name"
                                value={formValues.fName}
                                onChange={handleChange}
                              />
                              <input
                                type="text"
                                name="mName"
                                placeholder="Middle Name"
                                value={formValues.mName}
                                onChange={handleChange}
                              />
                              <input
                                type="text"
                                name="lName"
                                placeholder="Last Name"
                                value={formValues.lName}
                                onChange={handleChange}
                              />
                              <input
                                type="text"
                                name="email"
                                placeholder="email"
                                value={formValues.email}
                                onChange={handleChange}
                              />
                              <input
                                type="number"
                                name="phoneNumber"
                                placeholder="phone"
                                value={formValues.phoneNumber}
                                onChange={handleChange}
                              />
                              <div className="button-box">
                                <button onClick={() => alert()} type="submit" disabled={!error.rePasswordWrong && !error.passowordWeak}>
                                <span className={`${(error.rePasswordWrong || error.passowordWeak) && 'text-decoration-line-through'}`} >Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default LoginRegister;