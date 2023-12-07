import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
const SpecialProduct = (props) => {
  const {
    title,
    id,
    brand,
    totalrating,
    price,
    sold,
    quantity,
    reedim,
    imgUrl,
  } = props;
  return (
    <div className="" style={{maxWidth:"400px", cursor:"pointer"}}>
      <Link className="special-product-cart position-relative" to={"/product/" + id}>
        <div className="d-flex  align-items-center gap-4">
          <div
            className="product-image"
            style={{ display: "block", maxWidth: "150px", width: "100%" }}
          >
            <img
              src={
                imgUrl && imgUrl.length > 0
                  ? imgUrl[0].url
                  : "/images/81gAcVnUt8L._AC_SX569_.jpg"
              }
              className="img-fluid mx-auto hoverable"
              alt="watch"
            />
          </div>
          <div>
            <div className="special-product-content">
              <p className="brand mb-0">{brand}</p>
              <h6 className="title">{title
                                  ? `${title.slice(0, 20)}`
                                  : "this is title"}</h6>
              <ReactStars
                count={5}
                value={totalrating}
                edit={false}
                size={24}
                activeColor="#ffd700"
              />
              <div className="d-flex justify-content-between align-items-center py-3">
                <p className="price mb-0">$ {price}</p>
                <p className="price mb-0">Coin : {reedim ? reedim : 0}</p>
              </div>

              <div className="discount-till d-flex align-items-center gap-10">
                <p className="mb-0 d-flex gap-10">
                  <b>5</b>Days
                </p>
                <div
                  className="d-flex
                align-items-center gap-10"
                >
                  <span className="badge rounded-circle p-2 bg-danger">1</span>:
                  <span className="badge rounded-circle p-2 bg-danger">1</span>:
                  <span className="badge rounded-circle p-2 bg-danger">1</span>
                </div>
              </div>
              <div className="product-count my-3">
                <p>Products:{quantity}</p>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: quantity / quantity + sold * 100 }}
                    aria-valuenow={quantity / quantity + sold * 100}
                    aria-valuemin={quantity}
                    aria-valuemax={sold + quantity}
                  ></div>
                </div>
              </div>
              <Link to={"/product/" + id} className="button">
                View
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SpecialProduct;
