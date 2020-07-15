import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Input, Button, Select } from "antd";
import "antd/dist/antd.css";
import "./common.css";

const { Option } = Select;

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object({
  firstname: Yup.string()
    .min(2, "Mininum 2 characters")
    .max(15, "Maximum 15 characters")
    .required("Required!"),
  lastname: Yup.string()
    .min(2, "Mininum 2 characters")
    .max(15, "Maximum 15 characters")
    .required("Required!"),
  email: Yup.string().email("Invalid email format").required("Required!"),
  phonenumber: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  city: Yup.string().required("City is required!"),
});

const Form = ({ addPerson, updatePerson, getPersons}) => {
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
      city: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values, "values")
      await addPerson(values)
      await resetForm({ values: "" })
      getPersons()
    }
  });


  return (
    <>
      <div className="form-title">
        <h1>Add Information</h1>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-input">
          <label htmlFor="firstname">First Name</label>
          <Input
            id="firstname"
            name="firstname"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstname}
          />
        </div>
        {formik.errors.firstname ? formik.errors.firstname : null}
        <div className="form-input">
          <label htmlFor="lastname">Last Name</label>

          <Input
            id="lastname"
            name="lastname"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.lastname}
          />
          {formik.errors.lastname ? formik.errors.lastname : null}
        </div>

        <div className="form-input">
          <label htmlFor="email">Email Address</label>

          <Input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          {formik.errors.email ? formik.errors.email : null}
        </div>

        <div className="form-input">
          <label htmlFor="phonenumber">Phone Number</label>

          <Input
            id="phonenumber"
            name="phonenumber"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.phonenumber}
          />

          {formik.errors.phoneNumber ? formik.errors.phoneNumber : null}
        </div>

        <div className="form-input">
          <label htmlFor="city">City</label>
          <select
            name="city"
            id="city"
            onChange={formik.handleChange}
            value={formik.values.city}
          >
            <option value="" label="Select a city" />
            <option value="Helsinki" label="Helsinki" />
            <option value="Tampere" label="Tampere" />
            <option value="Turku" label="Turku" />
          </select>
        </div>
        {formik.errors.city ? formik.errors.city : null}

        <div className="form-input">
          <button type="submit">Submit</button>
          {formik.errors.onSubmit ? formik.errors.onSubmit : null}
        </div>
      </form>
    </>
  );
};

export default Form;
