import React from "react";
import BreadCrum from "../component/BreadCrum";
import Meta from "../component/Meta";
import Container from "../component/Container";
import CustomInput from "../component/CustomInput";
const ResetPassword = () => {
  return (
    <>
      <Meta title={"Account"} />
      <BreadCrum title="Account" />
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="login-cart">
              <h3 className="login-title mb-4 text-center">Reset Password</h3>
              <form action="" className="d-flex flex-column gap-20">
                <CustomInput
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter Your Password"
                />

                <CustomInput
                  name="confpassword"
                  type="password"
                  className="form-control"
                  placeholder="Enter Your Password"
                />

                <div className="d-flex justify-content-center gap-15 align-items-center mt-2">
                  <button className="button border-0" type="submit">
                    Confirm
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

export default ResetPassword;
