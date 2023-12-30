
import React, { useState } from "react";
// import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../services/authService";
  export const InputType = ({
    labelText,
    labelFor,
    inputType,
    value,
    style,
    onChange,
    name,
   required,
  }) => {
    return (
      <>
        <div className="mb-1">
          <label htmlFor={labelFor} className="form-label" style={{ color: "#fff" }}>
            {labelText}
          </label>
          <input
            type={inputType}
            className="form-control"
            style={style}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
          />
          {required && value.trim() === "" && ( // Check if required and value is empty
            <div  style={{ fontSize: "12px", marginTop: "4px" ,color:"#000000"}}>Please fill in {labelText}.</div>
          )}
        </div>
      </>
    )
  };

  const Form = ({ formType, submitBtn, formTitle }) => {

    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  
 return(
    <div className="formcontainer">
      <form className="validated-form"
        onSubmit={(e) => {
          if (formType === "login")
            return handleLogin(e, email, password, role);
          else if (formType === "register")
          {console.log(name,
                      role,
                      email,
                      password,
                      phone,
                      organisationName,
                      address,
                      hospitalName,
                      website)
            return handleRegister(
              e,
              name,
              role, 
              email,
              password,
              phone,
              organisationName,
              address,
              hospitalName,
               website
            );}
        }}
      >
        <h2 className="text-center">{formTitle}</h2>
        <hr />
        <div className="select-container">
          <label htmlFor="role" className="select-label" style={{ color: "#ddd", fontWeight: "bold" }}
>
            Select an account type:
          </label>
          <select
            id="role"
            name="role"
            className="select-dropdown"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="donor">Donor</option>
            <option value="admin">Administrator</option>
            <option value="organisation">Organisation</option>
            <option value="hospital">Medical Facility</option>
          </select>
        </div>

        {formType === "login" ? (
          <>
            <InputType
              labelText="Email"
              
              labelFor="Email"
              inputType="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
            <InputType
              labelText="Password"
              
              labelFor="Password"
              inputType="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
          </>
        ) : formType === "register" ? (
          <>
            {(role === "admin" || role === "donor") && (
              <InputType
                labelText="Name"
               
                labelFor="forName"
                inputType="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
              />
            )}
            {role === "organisation" && (
              <InputType
                labelText="organisation Name"
               
                labelFor="fororganisationName"
                inputType="text"
                name="organisationName"
                value={organisationName}
                onChange={(e) => setOrganisationName(e.target.value)}
                required={true}
              />
            )}
            {role === "hospital" && (
              <InputType
                labelText="Medical Facility Name"
                // style={{ color: "#fff" }}
                labelFor="forhospitalName"
                inputType="text"
                name="hospitalName"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                required
              />
            )}

            <InputType
              labelText="Email"
             
              labelFor="forEmail"
              inputType="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />

              
            <InputType
              labelText="Website"

              labelFor="forwebsite"
              inputType="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <InputType
              labelText="Password"
              labelFor="forPassword"
              inputType="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
            <InputType
              labelText="Residential Address"
            
              labelFor="forAddress"
              inputType="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required={true}
            />
            <InputType
              labelText="Contact Number"
              
              labelFor="forcontactno"
              inputType="text"
              name="contactno"
              value={phone}
              onChange={(e) =>setPhone(e.target.value)}
              required={true}
            />
          </>
        ) : null}

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="agreeCheckbox"
            required
          />
          <label htmlFor="agreeCheckbox" className="form-check-label">
            I agree to the terms and conditions
          </label>
        </div>

        <div className="d-flex flex-row justify-content-between">
          {formType === "login" ? (
            <p>
              <Link to="/register" style={{ color: "#ddd", fontWeight: "bold" }}
>Sign Up</Link>
            </p>
          ) : (
            <p style={{ color: "#ddd", fontWeight: "bold" }}
            >
              Already signed up? <Link to="/login" style={{ color: "#ddd", fontWeight: "bold" }}
>Login</Link>
            </p>
          )}
          <button className="btn btn-primary" type="submit">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
