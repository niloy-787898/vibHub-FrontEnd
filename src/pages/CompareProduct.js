import React from "react";
import BreadCrum from "../component/BreadCrum";
import Meta from "../component/Meta";
import CompareCard from "../component/CompareCard";
import Container from "../component/Container";
const CompareProduct = () => {
  return (
    <>
      <Meta title={"Compare Product"} />
      <BreadCrum title="Compare Product" />
      <Container class1="compare-wrapper home-wrapper-2 py-5">
        <div className="row">
          <CompareCard />
          <CompareCard />
          <CompareCard />
          <CompareCard />
        </div>
      </Container>
    </>
  );
};

export default CompareProduct;
