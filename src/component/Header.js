import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import Container from "../component/Container";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  getAllProducts,
  getAProducts,
} from "../features/products/productSlice";
import { Typeahead } from "react-bootstrap-typeahead";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state?.auth?.getCartProduct);
  const productState = useSelector((state) => state?.product?.product);
  const authState = useSelector((state) => state?.auth);

  const [subtotal, setSubtotal] = useState(0);
  const [sideActive, setSideActive] = useState(false);

  const [paginate, setPaginate] = useState(true);
  const [productOpt, setProductOpt] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    // Calculate subtotal whenever cart items change
    if (cartState) {
      const newSubtotal = cartState.reduce(
        (total, item) => total + item?.productId?.price * item?.quantity,
        0
      );
      setSubtotal(newSubtotal);
    }
  }, [cartState]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [productState]);

  const handleSidebarClick = () => {
    setSideActive(!sideActive);
  };
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <HeaderContainer>
        {/* <header className="header-top-strip py-3">
          <Container>
            <div className="row header-top">
              <div className="col-6">
                <p className="text-white mb-0">
                  Free Shipping Over 100$ & Return policy
                </p>
              </div>
              <div className="col-6">
                <p className="text-end text-white mb-0">
                  Hotline:{" "}
                  <a className="text-white" href="tel:+880 1798633672">
                    +880 1798633672
                  </a>
                </p>
              </div>
            </div>
          </Container>
        </header> */}
        <header className="header-upper py-3">
          <Container>
            <div className="header-main">
              <div>
                <h2>
                  <Link to="/" className="text-white">
                    VibeHub
                  </Link>
                </h2>
              </div>
              <div>
                <div className="input-group">
                  <Typeahead
                    id="pagination-example"
                    onChange={(selected) => {
                      navigate(`/product/${selected[0]?.prod}`);
                      dispatch(getAProducts(selected[0]?.prod));
                    }}
                    options={productOpt}
                    paginate={paginate}
                    labelKey={"name"}
                    minLength={2}
                    placeholder="Search Product Here..."
                  />
                  <span className="input-group-text p-2" id="basic-addon2">
                    <BsSearch className="fs-5 text-white" />
                  </span>
                </div>
              </div>
              <div className="header-side">
                <div className="header-upper-link d-flex align-items-center justify-content-end gap-3">
                  {/* <div>
                    <Link
                      to="/compare-product"
                      className="d-flex align-items-center gap-15 text-white"
                    >
                      <img src="/images/compare.svg" alt="compare" />
                      <p className="mb-0">
                        Compare <br /> Product
                      </p>
                    </Link>
                  </div> */}
                  <div>
                    <Link
                      to="/wishlist"
                      className="d-flex align-items-center gap-15 text-white"
                    >
                      <img src="/images/wishlist.svg" alt="wishlist" />
                      <p className="mb-0">
                        Favourite <br />
                        Products
                      </p>
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/cart"
                      className="d-flex align-items-center gap-15 text-white"
                    >
                      <img src="/images/cart.svg" alt="cart" />
                      <div className="d-flex flex-column gap-10">
                        <span className="badge bg-white text-dark">
                          {cartState?.length ? cartState?.length : 0}
                        </span>
                        <p className="mb-0">${subtotal ? subtotal : 0}</p>
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={authState?.user === null ? "/login" : "/profile"}
                      className="d-flex align-items-center gap-15 text-white"
                    >
                      <img src="/images/user.svg" alt="user" />
                      {authState?.user === null ? (
                        <p className="mb-0">
                          Log In <br /> My Account
                        </p>
                      ) : (
                        <p className="mb-0">
                          {authState?.createUser?.firstname ||
                            authState?.user.firstname}
                        </p>
                      )}
                    </Link>
                  </div>
                  <div>
                    {authState?.user === null ? (
                      <></>
                    ) : (
                      <button
                        className="mb-0 d-flex align-items-center gap-15 text-white px-2"
                        style={{ background: "#1e56a0", borderRadius: "5px", padding: "6px 20px" , border: "none"}}
                        onClick={handleLogout}
                      >
                        Log Out
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="bar" onClick={handleSidebarClick}>
                <FontAwesomeIcon
                  style={{ fontSize: "20px", color: "#FFF" }}
                  icon={faBars}
                ></FontAwesomeIcon>
              </div>
            </div>
          </Container>
        </header>
        <header className="header-bottom py-3">
          <Container>
            <div className="row align-items-center">
              <div className="col-12">
                <div className="menu-bottom d-flex align-items-center gap-20">
                  <div>
                    {/* <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-20 d-flex align-items-center"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img src="/images/menu.svg" alt="menu" />
                        <span className="me-5 d-inline-block">
                          Shop Catagories
                        </span>
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <a className="dropdown-item text-white" href="/">
                            Man
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item text-white" href="/">
                            Women
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item text-white" href="/">
                            Children
                          </a>
                        </li>
                      </ul>
                    </div>*/}
                  </div>
                  <div className="menu-links">
                    <div className="d-flex align-items-center gap-30">
                      <img src="/images/menu.svg" alt="menu" />
                      <NavLink className="link-text" to="/">
                        Home
                      </NavLink>
                      <NavLink className="link-text" to="/product">
                        Our Store
                      </NavLink>
                      <NavLink className="link-text" to="/my-order">
                        My Order
                      </NavLink>
                      {/* <NavLink className="link-text" to="/blog">
                        Blog
                      </NavLink> */}
                      <NavLink className="link-text" to="/contact">
                        Contact
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </header>

        <div className={`sidebar ${sideActive ? "sidebar-active" : ""}`}>
          <div className="bar" onClick={() => setSideActive(false)}>
            <FontAwesomeIcon
              style={{
                fontSize: "20px",
                color: "#FFF",
                marginTop: "10px",
                marginLeft: "10px",
              }}
              icon={faXmark}
            ></FontAwesomeIcon>
          </div>
          <div>
            <h2>
              <Link className="text-white">VibeHub</Link>
            </h2>
          </div>

          <div className="header-side-1">
            <div className="header-side-child">
              <div>
                {/* <Link
                  to="/compare-product"
                  className="d-flex align-items-center gap-15 text-white"
                >
                  <img src="/images/compare.svg" alt="compare" />
                  <p className="mb-0">Compare Product</p>
                </Link> */}
              </div>
              <div>
                <Link
                  to="/wishlist"
                  className="d-flex align-items-center gap-15 text-white"
                >
                  <img src="/images/wishlist.svg" alt="wishlist" />
                  <p className="mb-0">Favourite Products</p>
                </Link>
              </div>
              <div>
                <Link
                  to="/login"
                  className="d-flex align-items-center gap-15 text-white"
                >
                  <img src="/images/user.svg" alt="user" />
                  <p className="mb-0">Log In My Account</p>
                </Link>
              </div>
              <div>
                <Link
                  to="/cart"
                  className="d-flex align-items-center gap-15 text-white"
                >
                  <img src="/images/cart.svg" alt="cart" />
                  <div className="d-flex flex-column gap-10">
                    <span className="badge bg-white text-dark">0</span>
                    <p className="mb-0">$500</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {/* <div>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-20 d-flex align-items-center"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src="/images/menu.svg" alt="menu" />
                <span className="me-5 d-inline-block">Shop Catagories</span>
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a className="dropdown-item text-white" href="/">
                    Man
                  </a>
                </li>
                <li>
                  <a className="dropdown-item text-white" href="/">
                    Women
                  </a>
                </li>
                <li>
                  <a className="dropdown-item text-white" href="/">
                    Children
                  </a>
                </li>
              </ul>
            </div>
          </div> */}

          <div className="menu-links-parent">
            <div className="menu-links-2">
              <NavLink className="link-text" to="/">
                Home
              </NavLink>
              <NavLink className="link-text" to="/product">
                Our Store
              </NavLink>
              <NavLink className="link-text" to="/my-order">
                My Order
              </NavLink>
              {/* <NavLink className="link-text" to="/blog">
                Blog
              </NavLink> */}
              <NavLink className="link-text" to="/contact">
                Contact
              </NavLink>
            </div>
          </div>
        </div>
      </HeaderContainer>
    </>
  );
};

const HeaderContainer = styled.div`
  .header-main {
    display: grid;
    grid-template-columns: 150px 1fr 1fr 30px;
    align-items: center;
    gap: 10px;
  }
  .bar {
    display: none;
  }

  @media (max-width: 1000px) {
    .header-top-strip {
      display: none;
    }
    .header-main {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .bar {
      display: block;
    }
    .header-side {
      display: none;
    }
    .header-bottom {
      display: none;
    }
  }

  //sidebar

  .sidebar {
    display: block;
    max-width: 400px;
    width: 100%;
    position: fixed;
    top: 0px;
    right: -100%;
    z-index: 302;
    background-color: #fff;
    height: 100vh;
    transition: all 0.4s linear;
    background-color: #0f1e28;
    padding: 10px;

    .dropdown-menu {
      background-color: #0f1e28;
    }
  }

  .sidebar-active {
    right: 0px;
  }

  .header-side-child,
  .menu-links-2 {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .menu-links-parent {
    margin-top: 15px;
  }
`;
export default Header;
