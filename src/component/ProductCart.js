import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToWishList } from "../features/products/productSlice";
const ProductCart = (props) => {
  const { grid, data = [] } = props;
  console.log("data", data ,"grid",grid);
  const location = useLocation();
  const dispatch = useDispatch();

  const addToWish = (id) => {
    console.log(id);
    dispatch(addToWishList(id));
  };

  if (!Array.isArray(data)) {
    return null; // or some default/empty component to render
  }

  return (
    <>
      {
        data?.map((item, index) => (
          <div
            key={index}
            className={`${
              location.pathname === "/product" ? `gr-${grid}` : "col-3"
            }`}
          >
            <div className="product-cart position-relative" style={{ cursor:"pointer"}}>
              <div className="wishlist-icon position-absolute">
                <button
                  className="bg-transparent border-0"
                  onClick={(e) => {
                    addToWish(item?._id);
                  }}
                >
                  <img src="/images/wish.svg" alt="add-cart" />
                </button>
              </div>
              <Link className="product-image" to={"/product/" + item?._id}>
                <img
                  src={
                    item?.images && item.images.length > 0
                      ? item.images[0].url
                      : "/images/81gAcVnUt8L._AC_SX569_.jpg"
                  }
                  className="img-fluid mx-auto hoverable"
                  alt="watch"
                />
                <img
                  src={
                    item?.images && item.images.length > 0
                      ? item.images[0].url
                      : "/images/81gAcVnUt8L._AC_SX569_.jpg"
                  }
                  className="img-fluid mx-auto hoverable"
                  alt="watch-02"
                />
              </Link>
              <Link className="product-details" to={"/product/" + item?._id}>
                <h6 className="brand"> {item?.brands}</h6>
                <h5 className="title">{grid < 6 ? item?.title?.slice(0, 20) : item?.title}</h5>
                <ReactStars
                  count={5}
                  value={item?.totalrating.toString()}
                  edit={false}
                  size={24}
                  activeColor="#ffd700"
                />
                <p
                  className={`description ${grid > 4 ? "d-block" : "d-none"}`}
                  dangerouslySetInnerHTML={{
                    __html: grid < 7 ? item?.description.slice(0, 30) : item?.description
                  }}
                ></p>
                <p className="price">$ {item?.price}</p>
              </Link>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <Link
                    to={"/product/" + item?._id}
                    className="bg-transparent border-0"
                  >
                    <img src="/images/view.svg" alt="view" />
                  </Link>
                  {/* <button className="bg-transparent border-0">
                    <img src="/images/add-cart.svg" alt="add-cart" />
                  </button>
                  <button className="bg-transparent border-0">
                    <img src="/images/prodcompare.svg" alt="prodcompare" />
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ProductCart;
