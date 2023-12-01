import React from "react";
import Color from "../component/Color";
const CompareCard = () => {
  return (
    <>
      <div className="col-3 ">
        <div className="compare-product-cart position-relative">
          <img
            src="/images/cross.svg"
            alt="cross"
            className="position-absolute cross img-fluid"
          />
          <div className="product-cart-image">
            <img src="images/watch.jpg" alt="watch" />
          </div>
          <div className="compare-product-details">
            <h5 className="title">Xiaomi Redmi Note 12 Pro</h5>
            <h6 className="price mb-3 mt-3">$398.55</h6>

            <div>
              <div className="product-details">
                <h5>Brand</h5>
                <h6>Xiomi</h6>
              </div>
              <div className="product-details">
                <h5>Type</h5>
                <h6>Phone</h6>
              </div>
              <div className="product-details">
                <h5>Avaibility</h5>
                <h6>Out Of Stock</h6>
              </div>
              <div className="product-details">
                <h5>Color</h5>
                <Color />
              </div>
              <div className="product-details">
                <h5>Size</h5>
                <div className="d-flex gap-10">
                  <h6>S</h6>
                  <h6>M</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompareCard;
