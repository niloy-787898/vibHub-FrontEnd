import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../component/Container";
import CustomInput from "../component/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { createAnOrder, getUserCart } from "../features/user/userSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { config } from "../utils/axiosConfig";
import { FaBitcoin } from "react-icons/fa";
import { SlBadge } from "react-icons/sl";

const checkoutSchema = yup.object({
  firstName: yup.string().required("FirstName is Required"),
  lastName: yup.string().required("LastName is Required"),
  address: yup.string().required("Address is Required"),
  country: yup.string().required("country is Required"),
  city: yup.string().required("City is Required"),
  state: yup.string().required("State is Required"),
  pincode: yup.number(),
  other: yup.string(),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const [subtotal, setSubtotal] = useState(0);
  const [redeemCoins, setRedeemCoins] = useState(0);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [items, setItems] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({
    razorpayPaymentId: "",
    razorpayOrderId: "",
  });
  const cartState = useSelector((state) => state?.auth?.getCartProduct);
  console.log(cartState, "cartState");
  useEffect(() => {
    dispatch(getUserCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Calculate subtotal whenever cart items change
    if (cartState && cartState) {
      const newSubtotal = cartState.reduce(
        (total, item) => total + item?.productId?.price * item?.quantity,
        0
      );
      setSubtotal(newSubtotal);
    }
  }, [cartState]);

  useEffect(() => {
    setItems(
      cartState?.map((item) => ({
        product: item.productId?._id,
        quantity: item.quantity,
        color: item.color?._id,
        price: item.price,
        brands: item.productId?.brands,
        catagory: item.productId?.catagory,
        reedim: item.productId?.reedim,
      }))
    );
  }, [cartState]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      country: "",
      city: "",
      state: "",
      pincode: "",
    },
    validationSchema: checkoutSchema,
    onSubmit: (values) => {
      setShippingInfo(values);
      setTimeout(() => {
        checkOutHandler();
      }, 200);
    },
  });

  useEffect(() => {
    // Only dispatch when items are available
    if (items?.length > 0) {
      const createOrderPayload = {
        totalPrice: subtotal,
        totalPriceAfterDiscount: subtotal,
        orderItems: items,
        paymentInfo,
        shippingInfo,
        redeemCoins,
      };
      dispatch(createAnOrder(createOrderPayload));
      console.log("p", createOrderPayload);
    }
    // let items = [];
    // for (let index = 0; index < cartState.length; index++) {
    //   items.push({})
      
    // }
  }, [items, dispatch, subtotal, paymentInfo, shippingInfo, redeemCoins]);

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        reject(true);
      };
      document.body.appendChild(script);
    });
  };

  const checkOutHandler = async () => {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        alert("RezorPay SDK failed to load");
        return;
      }
      const result = await axios.post(
        "http://localhost:5000/api/user/order/checkout",
        { amount: subtotal },
        config
      );
      if (!result) {
        alert("Something Went wrong");
        return;
      }

      const { amount, id: order_id, currency } = result.data.order;
      console.log(amount);

      const options = {
        key: "rzp_test_KF6qN34pn5qgbG", // Enter the Key ID generated from the Dashboard
        amount: amount,
        currency: currency,
        name: "BayCom",
        description: "Test Transaction",
        // image: { logo },
        order_id: order_id,
        receipt: Date.now,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post(
            "http://localhost:5000/api/user/order/payment-verification",
            "",
            config,
            data
          );

          setPaymentInfo({
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
          });

          alert(result.data.msg);
        },
        prefill: {
          name: "Shahinur Islam",
          email: "khanniloytahsin@gmail.com",
          contact: "01798633672",
        },
        notes: {
          address: "BayCom Emmerce",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error in checkOutHandler:", error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(
          "Server responded with error status:",
          error.response.status
        );
        console.error("Server response data:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }

      // Handle the error appropriately, e.g., show an error message to the user
      alert("An error occurred during checkout. Please try again.");
    }
  };

  return (
    <>
      <Container class1="checkout-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <div className="website-name pb-2 d-inline-block">
                <h3>VibeHub</h3>
              </div>

              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/cart">Cart </a>
                  </li>
                  &nbsp;/
                  <li className="breadcrumb-item active" aria-current="page">
                    Information
                  </li>
                  &nbsp;/
                  <li className="breadcrumb-item active" aria-current="page">
                    Shipping
                  </li>
                  &nbsp;/
                  <li className="breadcrumb-item active" aria-current="page">
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title">Contact Information</h4>
              <p className="user-details mb-2">
                User (user@gmail.com)
              </p>
              <h4 className="title pb-2">Shipping Address</h4>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-wrap justify-content-between gap-30"
              >
                <div className="w-100">
                  <select
                    name="country"
                    id=""
                    className="form-control form-select"
                    value={formik.values.country}
                    onChange={formik.handleChange("country")}
                    onBlur={formik.handleBlur("country")}
                  >
                    <option value="select"  >
                      Select Your Country
                    </option>
                    <option value="Bangladesh">Bangladesh</option>
                  </select>
                  <div className="error">
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <CustomInput
                    name="firstName"
                    type="text"
                    className="form-control"
                    placeholder="Enter Your First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                  />
                  <div className="error">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <CustomInput
                    name="lastName"
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                  />
                  <div className="error">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>

                <div className="w-100">
                  <CustomInput
                    name="address"
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Address"
                    value={formik.values.address}
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                  />
                  <div className="error">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>

                <div className="w-100">
                  <CustomInput
                    name="other"
                    type="text"
                    className="form-control"
                    placeholder="Enter Your House,Suit etc"
                    value={formik.values.other}
                    onChange={formik.handleChange("other")}
                    onBlur={formik.handleBlur("other")}
                  />
                  <div className="error">
                    {formik.touched.other && formik.errors.other}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <CustomInput
                    name="city"
                    type="text"
                    className="form-control"
                    placeholder="Enter Your City"
                    value={formik.values.city}
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("ncityame")}
                  />
                  <div className="error">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <select
                    name="state"
                    id=""
                    className="form-control form-select"
                    value={formik.values.state}
                    onChange={formik.handleChange("state")}
                    onBlur={formik.handleBlur("state")}
                  >
                    {" "}
                    <option value="selected"  >
                      Select Your State
                    </option>
                    <option value="dhaka">Dhaka</option>
                    <option value="chittagong">Chittagong</option>
                    <option value="sylhet">Sylhet</option>
                  </select>
                  <div className="error">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <CustomInput
                    name="pincode"
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Zip code"
                    value={formik.values.pincode}
                    onChange={formik.handleChange("pincode")}
                    onBlur={formik.handleBlur("pincode")}
                  />
                </div>

                <div className="w-100 my-3">
                  <div className="d-flex justify-content-between">
                    <Link to="/cart" className="d-flex gap-10 text-dark">
                      <BiArrowBack className="fs-5  " />
                      Return to Cart
                    </Link>
                    {/* <Link to="/cart" className="button">
                      Continue to Shipping
                    </Link> */}
                    <button to="/cart" className="button" type="submit">
                      Order Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="checkout-right-data">
              <div className="border-bottom py-4">
                {cartState &&
                  cartState?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <div className="w-75 d-flex gap-30 my-3">
                          <div className="w-25 position-relative">
                            <span
                              style={{ top: "-10px", right: "0px" }}
                              className="badge rounded-circle bg-secondary text-white p-2 position-absolute"
                            >
                              {item?.quantity}
                            </span>
                            <img
                              src={
                                item?.productId?.images &&
                                item?.productId?.images.length > 0
                                  ? item?.productId?.images[0].url
                                  : "/images/watch.jpg"
                              }
                              height={75}
                              width={75}
                              alt="watch"
                            />
                          </div>
                          <div className="w-45">
                            <h5 className="title">
                              {item?.productId?.brands}/{item?.productId?.title}
                            </h5>
                            <div className="d-flex gap-3 align-item-center mt-2">
                              <div className="d-flex gap-1 align-item-center ">
                                <p className="mb-0">Catagory:</p>
                                <p className="mb-0">
                                  {item?.productId?.catagory}{" "}
                                </p>
                              </div>
                              <div className="d-flex gap-2 align-item-center ">
                                <p className="mb-0">Color:</p>
                                <span className="mb-0"
                                  style={{
                                    backgroundColor:
                                      item?.color?.title ?? "blue",
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
                        </div>
                        <div className="position-relative">
                          <div className="">
                            <h5 className="flex-grow-1 price mb-0">
                              $ {item?.productId?.price * item?.quantity}
                            </h5>
                          </div>
                          <span
                            style={{
                              top: "-26px",
                              right: "-28px",
                              backgroundColor: "#1e3da9",
                            }}
                            className="badge rounded-circle  text-white p-2 position-absolute"
                          >
                            <SlBadge /> {item?.productId?.reedim}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="sub-total border-bottom py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p>Sub Total</p>
                  <p>${subtotal}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0">Shipping</p>
                  <p className="mb-0">$ 100</p>
                </div>
              </div>

              <div className="total d-flex justify-content-between align-items-center py-4">
                <h4>Total</h4>
                <h4>${subtotal + 100}</h4>
              </div>
              <span>
                * Reedim Will be added with your account after every order
              </span>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
