import React, { useEffect, useState } from "react";
import BreadCrum from "../component/BreadCrum";
import Meta from "../component/Meta";
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from "react-image-zoom";
import Color from "../component/Color";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../component/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  addRating,
  getAProducts,
  getAllProducts,
} from "../features/products/productSlice";
import { toast } from "react-toastify";
import { addProdToCart, getUserCart } from "../features/user/userSlice";
const SingleProduct = () => {
  const [color, setColor] = useState(null);
  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.singleproduct);
  const cartState = useSelector((state) => state?.auth?.cartProduct);
  const productsState = useSelector((state) => state?.product?.product);

  useEffect(() => {
    dispatch(getAProducts(getProductId));
    dispatch(getUserCart());
    dispatch(getAllProducts());
  }, [dispatch, getProductId]);

  useEffect(() => {
    // Calculate subtotal whenever cart items change
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId._id) {
        setAlreadyAdded(true);
      }
    }
  }, [cartState, getProductId]);

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProducts = () => {
    dispatch(getAllProducts());
  };

  const uploadCart = () => {
    if (color === null) {
      toast.error("Please choose color");
    } else {
      dispatch(
        addProdToCart({
          productId: productState?._id,
          quantity: quantity,
          color: color,
          price: productState?.price,
        }),
        navigate("/cart")
      );
    }
  };

  const props = {
    width: 800,
    height: 500,
    zoomWidth: 500,
    img: productState?.images?.[0]?.url
      ? productState?.images?.[0]?.url
      : "/images/watch.jpg",
  };
  const copyToClipboard = (text) => {
    const textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const addRatingToProduct = () => {
    if (star == null) {
      toast.error("Please add a star");
      return false;
    }
    if (comment == null) {
      toast.error("Please Write  Review About the Product");
      return false;
    } else {
      dispatch(
        addRating({
          star: star,
          comment: comment,
          productId: getProductId,
        })
      );
      setTimeout(() => {
        dispatch(getAProducts(getProductId));
        dispatch(getAllProducts());
      }, 100);
    }

    return false;
  };

  return (
    <>
      <Meta title={"Dynamic Title here"} />
      <BreadCrum title={productState?.title} />
      <Container class1="single-product-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="product-main d-flex gap-10">
            <div className="col-6">
              <div className="product-main-image">
                <div>
                  <ReactImageZoom {...props} />
                </div>
              </div>
              <div className="product-other-imege d-flex flex-wrap gap-15 mt-3">
                {productState?.images?.map((item, index) => {
                  return (
                    <div key={index}>
                      <img
                        src={item?.url}
                        alt=""
                        className=""
                        style={{
                          maxWidth: "150px",
                          height: "auto",
                          width: "100%",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-6">
              <div className="product-main-details">
                <div className="border-bottom py-2">
                  <h3 className="title">{productState?.title}</h3>
                </div>
                <div className="border-bottom py-3">
                  <p className="price">Price : ${productState?.price}</p>

                  <div
                    className="d-flex align-items-center gap-10 "
                    style={{ zIndex: "-1" }}
                  >
                    <ReactStars
                      count={5}
                      value={productState?.ratings.toString()}
                      edit={true}
                      size={24}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">(2 Reviews)</p>
                  </div>
                  <a
                    href="#review"
                    className="text-dark text-decoration-underline"
                  >
                    Write a Review
                  </a>
                </div>
                <div className="border-bottom py-3">
                  <div className="d-flex  align-items-center gap-10 my-2">
                    <h3 className="product-heading">Barand :</h3>{" "}
                    <p className="product-data">{productState?.brands}</p>
                  </div>
                  <div className="d-flex  align-items-center gap-10 my-2">
                    <h3 className="product-heading">Catagory :</h3>{" "}
                    <p className="product-data">{productState?.catagory}</p>
                  </div>
                  <div className="d-flex  align-items-center gap-10 my-2">
                    <h3 className="product-heading">Tags :</h3>{" "}
                    <p className="product-data">{productState?.tags}</p>
                  </div>
                  <div className="d-flex  align-items-center gap-10 my-2">
                    <h3 className="product-heading">SKU :</h3>{" "}
                    <p className="product-data">1245</p>
                  </div>
                  <div className="d-flex  align-items-center gap-10 my-2">
                    <h3 className="product-heading">Avaibility :</h3>{" "}
                    <p className="product-data">In Stock</p>
                  </div>
                  <div className="d-flex flex-column gap-10 my-2 pb-2">
                    <h3 className="product-heading">Size :</h3>{" "}
                    <div className="d-flex flex-wrap gap-15 ">
                      <span className="badge border-1 border border-secondary bg-white text-dark py-2">
                        S
                      </span>
                      <span className="badge border-1 border border-secondary bg-white text-dark py-2">
                        M
                      </span>
                      <span className="badge border-1 border border-secondary bg-white text-dark py-2">
                        L
                      </span>
                      <span className="badge border-1 border border-secondary bg-white text-dark py-2">
                        XL
                      </span>
                    </div>
                  </div>
                  {alreadyAdded === false && (
                    <div className="d-flex gap-10 my-2">
                      <h3 className="product-heading">Color :</h3>{" "}
                      <Color
                        setColor={setColor}
                        colorData={productState?.color}
                      />
                    </div>
                  )}

                  {alreadyAdded === false && (
                    <div className="d-flex gap-15 my-2 mb-2 align-items-center">
                      <h3 className="product-heading">Quantity :</h3>{" "}
                      <input
                        type="number"
                        id=""
                        min={1}
                        max={10}
                        defaultValue={1}
                        style={{ width: "70px" }}
                        className="form-control"
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                      />
                    </div>
                  )}

                  <div
                    className={
                      alreadyAdded
                        ? "ms-0"
                        : "ms-5" + "d-flex gap-30 align-items-center my-4"
                    }
                  >
                    <button
                      className="button border-0"
                      type="button"
                      onClick={() => {
                        alreadyAdded
                          ? navigate("/cart")
                          : uploadCart(productState._id);
                      }}
                    >
                      {alreadyAdded ? "Go to cart" : "Add To Cart"}
                    </button>
                    {/* <Link
                        to="/checkout"
                        className="button signup border-0"
                        type="submit"
                      >
                        Buy IT Now
                      </Link> */}
                  </div>

                  {/* <div className="d-flex gap-15 align-items-center my-3">
                    <a href="/">
                      <BiGitCompare className="fs-5 me-2" />
                      Add To Compare
                    </a>
                    <a href="/">
                      <AiOutlineHeart className="fs-5 me-2" /> Add To Compare
                    </a>
                  </div> */}

                  <div className="d-flex flex-column gap-10 my-3">
                    <h3 className="product-heading">Shipping & Returns :</h3>{" "}
                    <p className="product-data">
                      {" "}
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptatem pariatur tempore nulla sint rerum est iusto
                      minus tempora, odio, magnam quibusdam cumque
                      <br />
                      <b>5-10 Business days</b>
                    </p>
                  </div>
                  <div className="d-flex  align-items-center gap-10 my-2">
                    <h3 className="product-heading">Product LInk :</h3>{" "}
                    <a
                      href="/product/:id"
                      onClick={() => {
                        copyToClipboard(window.location.href);
                      }}
                      className="text-dark"
                    >
                      Copy Product Link
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="description-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="description-cart">
              <h5>Description</h5>
              <p
                dangerouslySetInnerHTML={{ __html: productState?.description }}
              ></p>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="review-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="review-inner-wrapper">
              <div className="review-form py-4" id="review">
                <h6>Write a Review</h6>
                <div className="d-flex flex-column gap-20">
                  <div>
                    <ReactStars
                      count={5}
                      value={3}
                      edit={true}
                      size={24}
                      activeColor="#ffd700"
                      onChange={(e) => {
                        console.log(e);
                        setStar(e);
                      }}
                    />
                  </div>
                  <div>
                    <textarea
                      cols={30}
                      rows={4}
                      id=""
                      name=""
                      type="text"
                      className="form-control w-100"
                      placeholder="Type Your Review Here"
                      onChange={(e) => {
                        console.log(e);
                        setComment(e.target.value);
                      }}
                    />
                  </div>
                  <div className="d-flex justify-content-end mt-2">
                    <button
                      className="button border-0"
                      onClick={addRatingToProduct}
                      type="button"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              </div>

              <div className="review-cart  align-items-center mb-3">
                <div>
                  <h5 className="mb-2">Your Review</h5>
                </div>
                <div className="reviews mb-2">
                  <div className="review">
                    {productState?.ratings &&
                      productState?.ratings?.map((item, index) => {
                        return (
                          <>
                            <div
                              className="d-flex align-items-center gap-15"
                              key={index}
                            >
                              <span>Giving Star : </span>
                              <ReactStars
                                count={5}
                                value={item?.star}
                                edit={false}
                                size={24}
                                activeColor="#ffd700"
                              />
                            </div>

                            <p className="mb-0 mt-2">
                              Comment : {item?.comment}
                            </p>
                          </>
                        );
                      })}
                  </div>
                </div>
              </div>

              <div className="review-cart  align-items-center">
                <div>
                  <h5 className="mb-2">Customers Reviews</h5>
                </div>

                <div className="reviews">
                  <div className="review">
                    {Array.isArray(productsState) &&
                      productsState.map((product) => {
                        return product.ratings.map((item, index) => (
                          <div
                            className="d-flex align-items-center gap-15"
                            key={index}
                          >
                            <span>Giving Star : </span>
                            <ReactStars
                              count={5}
                              value={item.star}
                              edit={false}
                              size={24}
                              activeColor="#ffd700"
                            />
                            <p className="mb-0 mt-2">
                              Comment : {item.comment}
                            </p>
                          </div>
                        ));
                      })}
                  </div>
                </div>
                {/* <div>
                  {orderProduct && (
                    <a
                      onClick={() => {
                        setOrderProduct(false);
                      }}
                      href="/"
                      className="text-dark text-decoration-underline"
                    >
                      Write a Review
                    </a>
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
