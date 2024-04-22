import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import axios from "axios";
import {useDispatch} from 'react-redux';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import { useNavigate } from 'react-router-dom';
import { updateUsername } from "../../store/store";


function Login() {
  const [selectedValue, setSelectedValue] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [loginstatus, setLoginStatus] = useState(false);

  const dispatch = useDispatch();

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async() => {
    const response = await axios.post("http://localhost:8000/api/login",{email});
    console.log(response.data)
    if(response.data.password==password){
        // console.log("Authentication Successfull");
        dispatch(updateUsername(response.data.role));
        navigate('/home');
    }else{
        console.log("Authentication failed");
    }

  }

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src="https://www.eqmagpro.com/wp-content/uploads/2023/11/desktop-wallpaper-indian-government-india.jpg"
              alt="login form"
              className="rounded-start w-100"
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <MDBIcon
                  fas
                  icon="cubes fa-3x me-3"
                  style={{ color: "#ff6219" }}
                />
                <span className="h1 fw-bold mb-0">Trojan Guardian</span>
              </div>
              <h5
                className="fw-normal my-4 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Sign into your account
              </h5>
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                onChange={handleEmailChange}
                id="formControlLg"
                type="email"
                size="lg"
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                onChange={handlePassChange}
                id="formControlLg"
                type="password"
                size="lg"
              />
              <select value={selectedValue} onChange={handleSelectChange}>
                <option value="Ministry">Ministry</option>
                <option value="Manufacturer">Manufacturer</option>
                <option value="PCB Designer">PCB Designer</option>
                <option value="Embedded Developer">
                  Embedded Developer
                </option>
              </select>
              <br />
              <MDBBtn onClick={handleLogin} className="mb-4 px-5" color="dark" size="lg">
                Login
              </MDBBtn>
              <a className="small text-muted" href="#!">
                Forgot password?
              </a>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                Don't have an account?{" "}
                <a href="#!" style={{ color: "#393f81" }}>
                  Register here
                </a>
              </p>
              <div className="d-flex flex-row justify-content-start">
                <a href="#!" className="small text-muted me-1">
                  Terms of use.
                </a>
                <a href="#!" className="small text-muted">
                  Privacy policy
                </a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
        {/* {loginstatus ?
         <>
         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleClick({ vertical: 'top', horizontal: 'center' })}>
          Authentication Successful
        </Button>
      </Box>
        </> :
         <>
         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleClick({ vertical: 'top', horizontal: 'center' })}>
          Authentication Failed
        </Button>
      </Box>
         </>} */}
      </MDBCard>
    </MDBContainer>
   
  );
}


export default Login;
