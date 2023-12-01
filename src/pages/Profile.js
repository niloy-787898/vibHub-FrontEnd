import React from "react";
import { useNavigate } from "react-router-dom";
import BreadCrum from "../component/BreadCrum";
import Meta from "../component/Meta";
import Container from "../component/Container";
import {  useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";

const Profile = () => {
  const navigate = useNavigate();
  const authState = useSelector((state) => state?.auth);

  const goBack = () => {
    navigate(-1);
  };


  return (
    <>
      <Meta title={"Account"} />
      <BreadCrum title="Profile" />
      <Container class1="login-wrapper home-wrapper-2 py-5">
        {authState && (
          <div className="card py-5 px-3 rounded-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mx-4">
                <h4>User Information</h4>
                <button
                  className="border-0 fs-6 mb-0 d-flex align-items-center gap-1"
                  onClick={goBack}
                >
                  <BiArrowBack className="fs-5" /> Go Back
                </button>
              </div>
              <ul className="my-3">
                <li className="my-1">
                  <strong>ID:</strong> {authState?.user.id}
                </li>
                <li className="my-1">
                  <strong>Name:</strong> {authState?.user.firstname}{" "}
                  {authState?.user.lastname}
                </li>
                <li className="my-1">
                  <strong>Email:</strong> {authState?.user.email}
                </li>
                <li className="my-1">
                  <strong>Mobile:</strong> {authState?.user.mobile}
                </li>
              </ul>
            </div>
          </div>
        )}
        
      </Container>
    </>
  );
};

export default Profile;
