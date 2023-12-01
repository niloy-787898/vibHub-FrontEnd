import React from "react";
import { Link } from "react-router-dom";
import Container from "../component/Container";
const BreadCrum = (props) => {
  const { title } = props;
  return (
    <div className="breadcum py-4 mb-0">
      <Container>
        <div className="row">
          <div className="col-12">
            <div className="text-style">
              <Link to="/" className="text-dark">
                <h5 className="font">Home &nbsp;</h5>
              </Link>
              / <h6 className="font">{title}</h6>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BreadCrum;
