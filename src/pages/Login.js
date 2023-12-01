import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BreadCrum from "../component/BreadCrum";
import Meta from "../component/Meta";
import Container from "../component/Container";
import CustomInput from "../component/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userSlice";

const loginSchema = yup.object({
  email: yup
    .string()
    .nullable()
    .email("Email Should Be Valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state?.auth);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
      navigate("/");
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
              <h3 className="login-title mb-4 text-center">Login</h3>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-20"
              >
                <CustomInput
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter Your Email"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
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

                <div>
                  <Link to="/forget-password">Forget password?</Link>
                </div>

                <div className="d-flex justify-content-center gap-15 align-items-center">
                  <button className="button border-0" type="submit">
                    Login
                  </button>
                  <Link
                    to="/signup"
                    className="button signup border-0"
                    type="submit"
                  >
                    Signup
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
