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
import { BiPhoneCall } from "react-icons/bi";
import { SlBadge } from "react-icons/sl";
import { toast } from "react-toastify";

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
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      setTimeout(() => {
        setShippingInfo(values);
        // handleOrderNow();
        // handlePayNow()
        // handleConfirmOrder()
        // checkOutHandler();
      }, 9000);
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

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleOrderNow = () => {
    // Logic to open the modal when Order Now is clicked
    setShowModal(true);
  };
  const handlePayNow = () => {
    setShowConfirmation(true);
    setShowModal(false);

    // // Show payment success message or perform other actions
    // alert("Payment Successful!");
  };
  const handleConfirmOrder = (confirmed) => {
    setShowConfirmation(false);
    setShowModal(false);
    if (confirmed) {
      // Logic for successful payment
      setIsLoading(true);
      setTimeout(() => {
        toast.success("Payment Paid Successfully!", {});
        setIsLoading(false);
      }, 1000);
    } else {
      toast.error("Something Wrong! Please try again");
    }
    setShowConfirmation(false); // Close the confirmation box
  };
  // const loadScript = (src) => {
  //   return new Promise((resolve, reject) => {
  //     const script = document.createElement("script");
  //     script.src = src;
  //     script.onload = () => {
  //       resolve(true);
  //     };
  //     script.onerror = () => {
  //       reject(true);
  //     };
  //     document.body.appendChild(script);
  //   });
  // };

  // const checkOutHandler = async () => {
  //   try {
  //     const res = await loadScript(
  //       "https://checkout.razorpay.com/v1/checkout.js"
  //     );
  //     if (!res) {
  //       alert("RezorPay SDK failed to load");
  //       return;
  //     }
  //     const result = await axios.post(
  //       "http://localhost:5000/api/user/order/checkout",
  //       { amount: subtotal },
  //       config
  //     );
  //     if (!result) {
  //       alert("Something Went wrong");
  //       return;
  //     }

  //     const { amount, id: order_id, currency } = result.data.order;
  //     console.log(amount);

  //     const options = {
  //       key: "rzp_test_KF6qN34pn5qgbG", // Enter the Key ID generated from the Dashboard
  //       amount: amount,
  //       currency: currency,
  //       name: "BayCom",
  //       description: "Test Transaction",
  //       // image: { logo },
  //       order_id: order_id,
  //       receipt: Date.now,
  //       handler: async function (response) {
  //         const data = {
  //           orderCreationId: order_id,
  //           razorpayPaymentId: response.razorpay_payment_id,
  //           razorpayOrderId: response.razorpay_order_id,
  //           razorpaySignature: response.razorpay_signature,
  //         };

  //         const result = await axios.post(
  //           "http://localhost:5000/api/user/order/payment-verification",
  //           "",
  //           config,
  //           data
  //         );

  //         setPaymentInfo({
  //           orderCreationId: order_id,
  //           razorpayPaymentId: response.razorpay_payment_id,
  //           razorpayOrderId: response.razorpay_order_id,
  //         });

  //         alert(result.data.msg);
  //       },
  //       prefill: {
  //         name: "Shahinur Islam",
  //         email: "khanniloytahsin@gmail.com",
  //         contact: "01798633672",
  //       },
  //       notes: {
  //         address: "BayCom Emmerce",
  //       },
  //       theme: {
  //         color: "#61dafb",
  //       },
  //     };

  //     const paymentObject = new window.Razorpay(options);
  //     paymentObject.open();
  //   } catch (error) {
  //     console.error("Error in checkOutHandler:", error);

  //     if (error.response) {
  //       // The request was made and the server responded with a status code
  //       // that falls out of the range of 2xx
  //       console.error(
  //         "Server responded with error status:",
  //         error.response.status
  //       );
  //       console.error("Server response data:", error.response.data);
  //     } else if (error.request) {
  //       // The request was made but no response was received
  //       console.error("No response received from the server");
  //     } else {
  //       // Something happened in setting up the request that triggered an Error
  //       console.error("Error setting up the request:", error.message);
  //     }

  //     // Handle the error appropriately, e.g., show an error message to the user
  //     alert("An error occurred during checkout. Please try again.");
  //   }
  // };

  return (
    <>
      <Container class1="checkout-wrapper home-wrapper-2 py-5">
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: '80px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                margin: '0 5px',
                backgroundColor: 'gray',
                animation: 'wave 1.5s ease-in-out infinite',
                opacity:'0.9'
              }}
            ></div>
            <div
              style={{
                display: 'inline-block',
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                margin: '0 5px',
                backgroundColor: 'gray',
                animation: 'wave 1.5s ease-in-out infinite',
                animationDelay: '0.2s',
                opacity:'0.9'
              }}
            ></div>
            <div
              style={{
                display: 'inline-block',
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                margin: '0 5px',
                backgroundColor: 'gray',
                animation: 'wave 1.5s ease-in-out infinite',
                animationDelay: '0.4s',
                opacity:'0.9'
              }}
            ></div>
          </div>
        </div>
      )}
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
              <p className="user-details mb-2">User (user@gmail.com)</p>
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
                    <option value="select">Select Your Country</option>
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
                    <option value="selected">Select Your State</option>
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
                    <div>
                      <button
                        onClick={handleOrderNow}
                        to="/cart"
                        className="button"
                        type="submit"
                      >
                        Order Now
                      </button>

                      {showModal ? (
                        <div
                          className="modal"
                          style={{
                            display: "block",
                            backgroundColor: "gray",
                            opacity: 1.5,
                          }}
                        >
                          <div
                            className="modal-content"
                            style={{
                              position: "fixed",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              backgroundColor: "#e2146f",
                              padding: "35px 20px",
                              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                              zIndex: "1000",
                              maxWidth: "350px",
                            }}
                          >
                            <img src="/images/bkash.PNG" />
                            <div
                              style={{
                                marginTop: "20px",
                                borderRadius: "5px",
                                width: "100%",
                                backgroundColor: "#e2146f",
                                color: "white",
                                padding: "10px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                textAlign: "center",
                              }}
                            >
                              <p
                                style={{
                                  fontFamily: "'Poppins', sans-serif",
                                  textAlign: "center",
                                  fontSize: "15px",
                                  opacity: "1",
                                }}
                              >
                                Merchant :{" "}
                                <span
                                  style={{
                                    fontFamily: "'Poppins', sans-serif",
                                    textAlign: "center",
                                    opacity: "0.8",
                                    fontSize: "15px",
                                  }}
                                >
                                  Nafisa Ali
                                </span>
                              </p>
                              <p
                                style={{
                                  fontFamily: "'Poppins', sans-serif",
                                  textAlign: "center",
                                  fontSize: "15px",
                                  opacity: "1",
                                }}
                              >
                                Invoice no :{" "}
                                <span
                                  style={{
                                    fontFamily: "'Poppins', sans-serif",
                                    textAlign: "center",
                                    opacity: "0.8",
                                    fontSize: "15px",
                                  }}
                                >
                                  1559040913
                                </span>{" "}
                              </p>
                              <p
                                style={{
                                  fontFamily: "'Poppins', sans-serif",
                                  textAlign: "center",
                                  fontSize: "15px",
                                  opacity: "1",
                                }}
                              >
                                Amount :{" "}
                                <span
                                  style={{
                                    fontFamily: "'Poppins', sans-serif",
                                    textAlign: "center",
                                    opacity: "0.8",
                                    fontSize: "15px",
                                  }}
                                >
                                  BDT {subtotal + 100}
                                </span>
                              </p>
                            </div>
                            {/* Input boxes and other necessary elements */}
                            <h6
                              style={{
                                marginBottom: "10px",
                                marginTop: "20px",
                                color: "white",
                                textAlign: "center",
                                fontFamily: "'Poppins', sans-serif",
                                fontSize: "15px",
                              }}
                            >
                              Your bkash account number
                            </h6>
                            <input
                              type="text"
                              placeholder="01XXXXXXXXX"
                              style={{
                                marginBottom: "20px",
                                padding: "5px 10px 5px 10px",
                                width: "275px",
                                margin: "0 auto",
                                borderRadius: "5px",
                                border: "none",
                                height: "35px",
                                outline: "none",
                              }}
                            />
                            <div
                              style={{
                                maxWidth: "275px",
                                margin: "10px auto",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "5px",
                              }}
                            >
                              <input
                                style={{
                                  borderRadius: "5px",
                                  border: "none",
                                  outline: "none",
                                  backgroundColor: "white",
                                  width: "15px",
                                }}
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                              />
                              <label
                                style={{
                                  marginRight: "10px",
                                  color: "white",
                                  opacity: "0.8",
                                  fontSize: "14px",
                                }}
                              >
                                I agree to the{" "}
                                <a
                                  style={{
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                  }}
                                >
                                  terms and conditions
                                </a>
                              </label>
                            </div>
                            {/* Button to initiate payment */}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "5px",
                                gap: "10px",
                              }}
                            >
                              <button
                                onClick={handlePayNow}
                                style={{
                                  cursor: "pointer",
                                  padding: "5px 0px",
                                  width: "100px",
                                  borderRadius: "5px",
                                  border: "none",
                                  backgroundColor: "#9b9b9b54",
                                  color: "white",
                                }}
                              >
                                Proceed
                              </button>
                              {/* Close button for the modal */}
                              <button
                                onClick={() => setShowModal(false)}
                                style={{
                                  cursor: "pointer",
                                  padding: "5px 0px",
                                  width: "100px",
                                  borderRadius: "5px",
                                  border: "none",
                                  backgroundColor: "#9b9b9b54",
                                  color: "white",
                                }}
                              >
                                Close
                              </button>
                            </div>
                            <div
                              style={{
                                marginTop: "20px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "5px",
                              }}
                            >
                              <BiPhoneCall
                                style={{ fontSize: "15px", color: "white" }}
                              />{" "}
                              <p
                                style={{
                                  fontFamily: "'Poppins', sans-serif",
                                  textAlign: "center",
                                  opacity: "0.8",
                                  fontSize: "15px",
                                  color: "white",
                                }}
                              >
                                16247
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="modal"
                          style={{
                            display: "none",
                            /* Other styles */
                          }}
                        >
                          {/* Empty div when modal is hidden */}
                        </div>
                      )}
                    </div>
                    {showConfirmation ? (
                      <div
                        className="modal"
                        style={{
                          display: "block",
                          backgroundColor: "gray",
                          opacity: 1.5,
                          borderRadius: "5px",
                        }}
                      >
                        <div
                          className="confirmation-box"
                          style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "#e2146f",
                            padding: "35px 20px",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                            zIndex: "1000",
                            maxWidth: "350px",
                          }}
                        >
                          <p
                            style={{
                              marginBottom: "10px",
                              color: "white",
                              textAlign: "center",
                              fontFamily: "'Poppins', sans-serif",
                              fontSize: "14px",
                            }}
                          >
                            Are you sure you want to make the payment?
                          </p>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginTop: "20px",
                              gap: "10px",
                            }}
                          >
                            <button
                              onClick={() => handleConfirmOrder(true)}
                              style={{
                                cursor: "pointer",
                                padding: "5px 0px",
                                width: "100px",
                                borderRadius: "5px",
                                border: "none",
                                backgroundColor: "#9b9b9b54",
                                color: "white",
                              }}
                            >
                              Yes
                            </button>
                            {/* Close button for the modal */}
                            <button
                              onClick={() => handleConfirmOrder(false)}
                              style={{
                                cursor: "pointer",
                                padding: "5px 0px",
                                width: "100px",
                                borderRadius: "5px",
                                border: "none",
                                backgroundColor: "#9b9b9b54",
                                color: "white",
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="modal"
                        style={{
                          display: "none",
                          /* Other styles */
                        }}
                      >
                        {/* Empty div when modal is hidden */}
                      </div>
                    )}
                    {/* <button to="/cart" className="button" type="submit">
                      Order Now
                    </button> */}
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
                                <span
                                  className="mb-0"
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
