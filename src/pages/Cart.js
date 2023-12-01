import React, { useState, useEffect } from "react";
import BreadCrum from "../component/BreadCrum";
import Meta from "../component/Meta";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Container from "../component/Container";
import { BiArrowBack } from "react-icons/bi";
import { FaBitcoin } from "react-icons/fa";
import {
  deleteCartProduct,
  getUserCart,
  addProdToCart,
  updateCartProduct,
} from "../features/user/userSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const [productUpdateDetails, setProductUpdateDetails] = useState(null);
  const cartState = useSelector((state) => state?.auth?.getCartProduct);
  console.log("cccc", cartState);
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    dispatch(addProdToCart());
    dispatch(getUserCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (productUpdateDetails !== null) {
      dispatch(
        updateCartProduct({
          cartItemId: productUpdateDetails?.cartItemId,
          quantity: productUpdateDetails?.quantity,
        })
      );
      setTimeout(() => {
        dispatch(getUserCart());
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productUpdateDetails]);

  const deleteAcartProduct = (id) => {
    dispatch(deleteCartProduct(id));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 500);
  };

  useEffect(() => {
    // Calculate subtotal whenever cart items change
    if (cartState && cartState) {
      const newSubtotal = cartState?.reduce(
        (total, item) => total + item?.productId?.price * item?.quantity,
        0
      );
      setSubtotal(newSubtotal);
    }
  }, [cartState]);

  console.log("wishlistState", cartState);

  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrum title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header d-flex justify-content-between align-items-center py-3">
              <h4 className="cart-col-1">Produuct</h4>
              <h4 className="cart-col-2">Brands</h4>
              <h4 className="cart-col-3">Catagory</h4>
              <h4 className="cart-col-4">Price</h4>
              <h4 className="cart-col-5">Coin</h4>
              <h4 className="cart-col-6">Quantity</h4>
              <h4 className="cart-col-7"> SubTotal</h4>
              <h4 className="cart-col-8">Total</h4>
            </div>
            {cartState &&
              cartState?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="cart-data d-flex justify-content-between align-items-center py-3"
                  >
                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                      <div className="w-25">
                        <img
                          src={
                            item?.productId?.images &&
                            item?.productId?.images.length > 0
                              ? item?.productId?.images[0].url
                              : "/images/watch.jpg"
                          }
                          className="img-fluid mx-auto hoverable"
                          alt="watch-02"
                        />
                      </div>
                      <div className="w-75">
                        <p>Title: {item?.productId?.title}</p>
                        <div className="d-flex gap-3 align-item-center mt-2">
                          <p>Color: {item?.color?.title}</p>
                          <span
                            style={{
                              backgroundColor: typeof item?.color?.title === 'string' ? item.color.title : "red",
                              padding: "10px",
                              display: "block",
                              borderRadius: "50%",
                              width: "20px",
                              height: "20px",
                            }}
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <div>
                        <h5 className="price mb-0">
                          {item?.productId?.brands}
                        </h5>
                      </div>
                    </div>
                    <div className="cart-col-3">
                      <div>
                        <h5 className="price mb-0">
                          {item?.productId?.catagory}
                        </h5>
                      </div>
                    </div>
                    <div className="cart-col-4">
                      <div>
                        <h5 className="price mb-0">
                          $ {item?.productId?.price}
                        </h5>
                      </div>
                    </div>
                    <div className="cart-col-5">
                      <div>
                        <h5 className="price mb-0">
                          <FaBitcoin /> {item?.productId?.reedim}
                        </h5>
                      </div>
                    </div>
                    <div className="cart-col-6 ">
                      <div>
                        <div>
                          <input
                            type="number"
                            id=""
                            name=""
                            min={1}
                            max={10}
                            value={
                              productUpdateDetails?.quantity
                                ? productUpdateDetails?.quantity
                                : item?.quantity
                            }
                            onChange={(e) => {
                              setProductUpdateDetails({
                                cartItemId: item?._id,
                                quantity: e.target.value,
                              });
                            }}
                            style={{ width: "70px" }}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="cart-col-7 ">
                      <div className="d-flex align-items-center gap-15 mb-0">
                        <h5 className="price mb-0">
                          $ {item?.productId?.price * item?.quantity}
                        </h5>
                        <div
                          onClick={() => {
                            deleteAcartProduct(item?._id);
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="cart-col-8 ">
                      <div className="d-flex align-items-center gap-15 mb-0">
                        <h5 className="price mb-0">
                          $ {item?.productId?.price * item?.quantity}
                        </h5>
                        <div
                          onClick={() => {
                            deleteAcartProduct(item?._id);
                          }}
                        >
                          <AiOutlineDelete className="delete-icon fs-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/" className="d-flex gap-10 text-dark">
                <BiArrowBack className="fs-5  " />
                Return Home
              </Link>
              <p>Taxes & Shipping Calculated at checkout</p>
              <Link to="/checkout" className="button ">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
