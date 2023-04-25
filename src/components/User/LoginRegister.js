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
  const [activeKey, setActiveKey] = useState("login");
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

  useEffect(()=>{
    const message = localStorage.getItem('message')
    if(message)
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      localStorage.removeItem('message')
  },[])
  useEffect(() => {
    checkPassword();
  }, [formValues]);

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
    checkPassword();
    console.log(formValues.password);
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
      const params = {username : formValues.email,password : formValues.password};
      const response = await toast.promise(
        UserAPI.login(params),
        {
          pending: "Đang đăng nhập...",
          success: "Đăng nhập thành công!",
          error: "Đăng nhập thất bại.",
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
            setTimeout(() => {
        navigate("/my-account");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const params = {
      firstName : formValues.fName,
      lastName: formValues.lName,
      middleName: formValues.mName,
      phoneNumber: formValues.phoneNumber,
      email: formValues.email,
      hashedPassword: formValues.password,
      avatar: ""
      };
      console.log("pr"+params.hashedPassword)
      const response = await toast.promise(
        UserAPI.register(params),
        {
          pending: "Đang đăng ký...",
          success: "Đăng ký thành công!",
          error: "Đăng ký thất bại.",
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      setActiveKey("login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = (key) => {
    setActiveKey(key);
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
                  <Tab.Container defaultActiveKey={activeKey} onSelect={handleSelect}>
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
                                name="email"
                                placeholder="Email"
                                value={formValues.email}
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
                                <button type="submit" disabled={error.rePasswordWrong && error.passowordWeak}>
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
