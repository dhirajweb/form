import React, { useState, useEffect } from "react";
import "./Form.css";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useToasts } from "react-toast-notifications";

const Form = () => {
  const { addToast } = useToasts();
  const [user, setUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
    address: "",
    country: "",
    region: "",
    zip: "",
    mobile: "",
    phone: "",
  });
  const [flag, setFlag] = useState(0);
  const [error, setError] = useState("");

  const handleChangeEmail = (e) => {
    setUser({ ...user, email: e.target.value });
    setError("");
  };

  const handleChangeFirstName = (e) => {
    setUser({ ...user, first_name: e.target.value });
    setError("");
  };

  const handleChangeLastName = (e) => {
    setUser({ ...user, last_name: e.target.value });
    setError("");
  };

  const handleChangeAddress = (e) => {
    setUser({ ...user, address: e.target.value });
    setError("");
  };

  const handleChangeCountry = (val) => {
    setUser({ ...user, country: val });
    setError("");
  };

  const handleChangeRegion = (val) => {
    setUser({ ...user, region: val });
    setError("");
  };

  const handleChangeZip = (e) => {
    const val = e.target.value;
    if (!isNaN(val) && val.length <= 6) {
      setUser({ ...user, zip: e.target.value });
    }
    setError("");
  };

  const handleChangeMobile = (e) => {
    const val = e.target.value;
    if (!isNaN(val) && val.length <= 10) {
      setUser({ ...user, mobile: val });
    }
    setError("");
  };

  const handleChangePhone = (e) => {
    const val = e.target.value;
    if (!isNaN(val) && val.length <= 10) {
      setUser({ ...user, phone: val });
    }

    setError("");
  };

  const validateEmail = (email) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email);
  };

  const validateZip = (zip) => {
    return zip.length === 6;
  };

  const validatePhone = (phone) => {
    const reg = /^\d{10}$/;
    return reg.test(phone);
  };

  const validateForm = () => {
    const {
      email,
      first_name,
      last_name,
      address,
      country,
      region,
      zip,
      mobile,
      phone,
    } = user;

    if (
      !email.trim() ||
      !first_name.trim() ||
      !last_name.trim() ||
      !address.trim() ||
      !country.trim() ||
      !region.trim() ||
      !zip.trim() ||
      !mobile.trim() ||
      !phone.trim()
    ) {
      setError("All fields are mandatory.");
      return false;
    } else if (!validateEmail(email)) {
      setError("Invalid email.");
      return false;
    } else if (!validateZip(zip)) {
      setError("Invalid zip.");
      return false;
    } else if (!validatePhone(mobile)) {
      setError("Invalid mobile.");
      return false;
    } else if (!validatePhone(phone)) {
      setError("Invalid phone.");
      return false;
    } else {
      return true;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      addToast("Form submitted successfully!", {
        appearance: "success",
      });
    }
  };

  useEffect(() => {
    if (flag === 1) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      setFlag(1);
      const savedData = JSON.parse(localStorage.getItem("user"));
      if (savedData) {
        setUser(savedData);
      }
    }
  }, [user]);

  return (
    <div className="container">
      <div className="form-container row">
        <div className="col-sm-12">
          <h3>Registration</h3>
        </div>
        <div className="col-sm-12 mb-3">
          <input
            type="email"
            placeholder="Enter Your Email"
            value={user.email}
            onChange={handleChangeEmail}
          />
        </div>
        <div className="col-sm-6 mb-3">
          <input
            type="text"
            placeholder="First Name"
            value={user.first_name}
            onChange={handleChangeFirstName}
          />
        </div>
        <div className="col-sm-6 mb-3">
          <input
            type="text"
            placeholder="Last Name"
            value={user.last_name}
            onChange={handleChangeLastName}
          />
        </div>
        <div className="col-sm-12 mb-3">
          <textarea
            rows="4"
            cols="50"
            placeholder="Address"
            value={user.address}
            onChange={handleChangeAddress}
          />
        </div>
        <div className="col-sm-4 mb-3">
          <CountryDropdown
            value={user.country}
            onChange={handleChangeCountry}
          />
        </div>
        <div className="col-sm-4 mb-3">
          <RegionDropdown
            country={user.country}
            value={user.region}
            onChange={handleChangeRegion}
          />
        </div>
        <div className="col-sm-4 mb-3">
          <input
            type="text"
            placeholder="Zip Code"
            value={user.zip}
            onChange={handleChangeZip}
          />
        </div>
        <div className="col-sm-6 mb-3">
          <input
            type="text"
            placeholder="Mobile Number"
            value={user.mobile}
            onChange={handleChangeMobile}
          />
        </div>
        <div className="col-sm-6 mb-3">
          <input
            type="text"
            placeholder="Phone Number"
            value={user.phone}
            onChange={handleChangePhone}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="btn-div">
          <button onClick={handleFormSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Form;
