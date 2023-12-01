import React from "react";

const WishCart = () => {
  return (
    <>
      <div className="col-3">
        <div className="wishlist-cart position-relative">
          <img
            src="/images/cross.svg"
            alt="cross"
            className="position-absolute cross img-fluid"
          />
          <div className="product-cart-image">
            <img src="images/watch.jpg" alt="watch" />
          </div>
        </div>
        <div className="wishlist-details py-3">
          <h5 className="title">Xiaomi Redmi Note 12 Pro</h5>
          <h6 className="price mb-3 mt-3">$398.55</h6>
        </div>
      </div>
    </>
  );
};

export default WishCart;
