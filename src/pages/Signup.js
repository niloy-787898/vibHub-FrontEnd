import React from "react";
import BreadCrum from "../component/BreadCrum";
import Meta from "../component/Meta";
import Container from "../component/Container";
import CustomInput from "../component/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { regesterUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const signupSchema = yup.object({
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
  email: yup
    .string()
    .nullable()
    .email("Email Should Be Valid")
    .required("Email is Required"),
  mobile: yup.string().required("Mobile Number is Required"),
  password: yup.string().required("Password is Required"),
});

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: signupSchema,

    onSubmit: (values) => {
      dispatch(regesterUser(values));
      navigate("/login");
    },
  });


  return (
    <>
      <Meta title={"Account"} />
      <BreadCrum title="Account" />
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="login-cart">
              <h3 className="login-title mb-4 text-center">Create Account</h3>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-20"
              >
                
                <CustomInput
                  name="firstname"
                  type="text"
                  className="form-control"
                  placeholder="Enter Your First Name"
                  value={formik.values.firstname}
                  onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")}
                />
                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
                <CustomInput
                  name="lastname"
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Last Name"
                  value={formik.values.lastname}
                  onChange={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur("lastname")}
                />
                <div className="error">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
                <CustomInput
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter Your email"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>

                <CustomInput
                  name="mobile"
                  type="tel"
                  className="form-control"
                  placeholder="Enter Your Mobile Number"
                  value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>

                <CustomInput
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter Your Password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>

                <div className="d-flex justify-content-center gap-15 align-items-center mt-2">
                  <button className="button border-0" type="submit">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
