import React, { useState, useEffect } from "react";
import BreadCrum from "../component/BreadCrum";
import Meta from "../component/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCart from "../component/ProductCart";
import Color from "../component/Color";
import Container from "../component/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faFilter } from "@fortawesome/free-solid-svg-icons";

const Store = () => {
  const [grid, setGrid] = useState(3);
  const productState = useSelector((state) => state?.product?.product);
  console.log("pdata", productState);
  const [sideActive, setSideActive] = useState(false);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [tags, setTags] = useState([]);

  //Filter
  const [brand, setBrand] = useState(null);
  const [catagory, setCatagory] = useState(null);
  const [tag, setTag] = useState(null);
  const [color, setColor] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    let newBrands = [];
    let newCatagory = [];
    let newTags = [];
    let newColors = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      newBrands.push({ brand: element?.brands });
      newCatagory.push({ catagory: element?.catagory });
      newTags.push({ tag: element?.tags });
      newColors.push({ color: element?.color?.[index] });
    }
    setBrands(newBrands);
    setCategories(newCatagory);
    setTags(newTags);
  }, [productState]);

  const dispatch = useDispatch();
  useEffect(() => {
    // Assuming you're filtering products based on price range
    if (minPrice === 0 && maxPrice === "") {
      // Show all products when 'From' is 0 and 'To' is empty
      dispatch(getAllProducts());
    } else {
      // Filter products based on the provided price range
      dispatch(
        getAllProducts({
          brand,
          catagory,
          tag,
          color,
          minPrice,
          maxPrice,
          sort,
        })
      );
    }
  }, [brand, catagory, tag, color, minPrice, maxPrice, sort, dispatch]);

  const handleSidebarClick = () => {
    setSideActive(!sideActive);
  };

  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrum title="Our Store" />
      <StoreContainer>
        <Container class1="store-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-3 side-filter">
              <div className="filter-cart mb-3">
                <h3 className="filter-title">Shop By Category</h3>
                <ul className="ps-0">
                  {categories &&
                    [...new Set(categories)]?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="product-tags d-flex flex-wrap gap-10 align-items-center"
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`category-${index}`}
                            checked={catagory === item?.catagory}
                            onChange={() => {
                              setCatagory(
                                catagory === item?.catagory
                                  ? null
                                  : item?.catagory
                              );
                            }}
                          />
                          <label
                            className="form-check-label mb-0"
                            htmlFor={`category-${index}`}
                          >
                            {item?.catagory}
                          </label>
                        </div>
                      );
                    })}
                </ul>
              </div>
              <div className="filter-cart mb-3">
                <h3 className="filter-title">Filter By</h3>
                {/* <div className="filter-sub-title">
                  <p>Avaibility</p>
                </div>
                <div className="mb-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      In Stoct(1)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked"
                      checked
                      readOnly
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      Out Of Stock(0)
                    </label>
                  </div>
                </div> */}

                <div className="filter-sub-title">
                  <p>Price</p>
                </div>
                <div className="d-flex gap-10 align-items-center">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInputFrom"
                      placeholder="From"
                      min="0"
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInputFrom">From</label>
                  </div>
                  <div className="form-floating ">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInputTo"
                      placeholder="To"
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInputTo">To</label>
                  </div>
                </div>

                <div className="filter-cart mt-3">
                  <h3 className="filter-title">Product Brands</h3>
                  <div>
                    <div className="product-tags d-flex flex-wrap gap-10 align-items-center">
                      {brands &&
                        [...new Set(brands)]?.map((item, index) => {
                          return (
                            <div key={index} className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`brand-${index}`}
                                checked={brand === item?.brand}
                                onChange={() => {
                                  setBrand(
                                    brand === item?.brand ? null : item?.brand
                                  );
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`brand-${index}`}
                              >
                                {item?.brand}
                              </label>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className="filter-cart mb-3">
                  <h3 className="filter-title">Product Tags</h3>
                  <div>
                    <div className="product-tags d-flex flex-wrap gap-10 align-items-center">
                      {tags &&
                        [...new Set(tags)]?.map((item, index) => {
                          return (
                            <div key={index} className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`tag-${index}`}
                                checked={tag === item?.tag}
                                onChange={() => {
                                  setTag(tag === item?.tag ? null : item?.tag);
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`tag-${index}`}
                              >
                                {item?.tag}
                              </label>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
                {/* <div className="filter-sub-title">
                  <p>Colors</p>
                </div>
                <div>
                  <Color />
                </div> */}

                {/* <div className="filter-sub-title">
                  <p>Size</p>
                </div>

                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="color-1"
                    />
                    <label className="form-check-label" htmlFor="color-1">
                      XXL (2)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="color-2"
                    />
                    <label className="form-check-label" htmlFor="color-2">
                      XL (2)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="color-3"
                    />
                    <label className="form-check-label" htmlFor="color-3">
                      L (2)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="color-4"
                    />
                    <label className="form-check-label" htmlFor="color-4">
                      M (2)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="color-5"
                    />
                    <label className="form-check-label" htmlFor="color-5">
                      S (2)
                    </label>
                  </div>
                </div> */}
              </div>

              {/* <div className="filter-cart mb-3">
                <h3 className="filter-title">Random Products</h3>
                <div>
                  <div className="random-products mb-3 d-flex ">
                    <div className="w-50">
                      <img
                        src="/images/watch.jpg"
                        alt="product"
                        className="img-fluid"
                      />
                    </div>
                    <div className="w-50">
                      <h6 className="brand">Rolex</h6>
                      <h5 className="title">Rolex watch</h5>
                      <ReactStars
                        count={5}
                        value={3}
                        edit={false}
                        size={24}
                        activeColor="#ffd700"
                      />
                      <p className="price">$100</p>
                    </div>
                  </div>
                  <div className="random-products mb-3 d-flex">
                    <div className="w-50">
                      <img
                        src="/images/watch.jpg"
                        alt="product"
                        className="img-fluid"
                      />
                    </div>
                    <div className="w-50">
                      <h6 className="brand">Rolex</h6>
                      <h5 className="title">Rolex watch</h5>
                      <ReactStars
                        count={5}
                        value={3}
                        edit={false}
                        size={24}
                        activeColor="#ffd700"
                      />
                      <p className="price">$100</p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="col-9 width-full">
              <div className="filter-sort-grid mb-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-10">
                    <p className="mb-0 d-block" style={{ width: "100px" }}>
                      Sort By
                    </p>
                    <select
                      className="form-control form-select bg-light"
                      id=""
                      onChange={(e) => setSort(e.target.value)}
                    >
                      {/* <option value="manual">Featured</option> */}
                      {/* <option value="best-selling">Best Selling</option> */}
                      <option value="title">Alphabetically, A-Z</option>
                      <option value="-title">Alphabetically, Z-A</option>
                      <option value="price">Price, Low to High</option>
                      <option value="-price">Price, High to Low</option>
                      <option value="createdAt">Date, Old to New</option>
                      <option value="-createdAt">Date, New to Old</option>
                    </select>
                  </div>
                  <div className="d-flex align-items-center gap-10 grid-bar">
                    <p className="total-product mb-0">21 Products</p>
                    <div className="d-flex align-items-center gap-10 grid ">
                      <img
                        onClick={() => {
                          setGrid(3);
                        }}
                        src="images/gr4.svg"
                        alt="grid"
                        className="img-fluid d-block"
                      />
                      <img
                        onClick={() => {
                          setGrid(4);
                        }}
                        src="images/gr3.svg"
                        alt="grid"
                        className="img-fluid d-block"
                      />
                      <img
                        onClick={() => {
                          setGrid(6);
                        }}
                        src="images/gr2.svg"
                        alt="grid"
                        className="img-fluid d-block"
                      />

                      <img
                        onClick={() => {
                          setGrid(12);
                        }}
                        src="images/gr.svg"
                        alt="grid"
                        className="img-fluid d-block img-grid"
                      />
                    </div>
                  </div>
                  <div className="bar" onClick={handleSidebarClick}>
                    <FontAwesomeIcon
                      style={{ fontSize: "20px", marginRight: "5px" }}
                      icon={faFilter}
                    ></FontAwesomeIcon>
                  </div>
                </div>
              </div>
              <div className="product-list pb-5">
                <div className="d-flex flex-wrap gap-10 max-cart-size ">
                  <ProductCart
                    data={productState ? productState : []}
                    grid={grid}
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>

        <div className={`sidebar ${sideActive ? "sidebar-active" : ""}`}>
          <div className="bar" onClick={() => setSideActive(false)}>
            <FontAwesomeIcon
              style={{
                fontSize: "20px",
                color: "#FFF",
                marginTop: "20px",
                marginLeft: "250px",
              }}
              icon={faXmark}
            ></FontAwesomeIcon>
          </div>

          <div className="header-side-1">
            <div className="header-side-child"></div>
          </div>
          <div className="side-filter-active">
            <div className="filter-cart mb-3">
              <h3 className="filter-title">Shop By Category</h3>
              <ul className="ps-0">
                <li>Watch</li>
                <li>TV</li>
                <li>Camera</li>
                <li>Laptop</li>
              </ul>
            </div>
            <div className="filter-cart mb-3">
              <h3 className="filter-title">Filter By</h3>
              <div className="filter-sub-title">
                <p>Avaibility</p>
              </div>
              <div className="mb-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    In Stoct(1)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                    checked
                    readOnly
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckChecked"
                  >
                    Out Of Stock(0)
                  </label>
                </div>
              </div>

              <div className="filter-sub-title">
                <p>Price</p>
              </div>
              <div className="d-flex gap-10 align-items-center">
                <div className="form-floating ">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="From"
                  />
                  <label htmlFor="floatingInput">From</label>
                </div>
                <div className="form-floating ">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="To"
                  />
                  <label htmlFor="floatingInput">To</label>
                </div>
              </div>
              <div className="filter-sub-title">
                <p>Colors</p>
              </div>
              <div>
                <Color />
              </div>

              <div className="filter-sub-title">
                <p>Size</p>
              </div>

              <div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="color-1"
                  />
                  <label className="form-check-label" htmlFor="color-1">
                    XXL (2)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="color-2"
                  />
                  <label className="form-check-label" htmlFor="color-2">
                    XL (2)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="color-3"
                  />
                  <label className="form-check-label" htmlFor="color-3">
                    L (2)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="color-4"
                  />
                  <label className="form-check-label" htmlFor="color-4">
                    M (2)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="color-5"
                  />
                  <label className="form-check-label" htmlFor="color-5">
                    S (2)
                  </label>
                </div>
              </div>
            </div>
            <div className="filter-cart mb-3">
              <h3 className="filter-title">Product Tags</h3>
              <div>
                <div className="product-tags d-flex flex-wrap gap-10 align-items-center">
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                    Headphones
                  </span>
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                    Smart Watch
                  </span>
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                    Laptop
                  </span>
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                    Tabs
                  </span>
                </div>
              </div>
            </div>
            <div className="filter-cart mb-3">
              <h3 className="filter-title">Random Products</h3>
              <div>
                <div className="random-products mb-3 d-flex ">
                  <div className="w-50">
                    <img
                      src="/images/watch.jpg"
                      alt="product"
                      className="img-fluid"
                    />
                  </div>
                  <div className="w-50">
                    <h6 className="brand">Rolex</h6>
                    <h5 className="title">Rolex watch</h5>
                    <ReactStars
                      count={5}
                      value={3}
                      edit={false}
                      size={24}
                      activeColor="#ffd700"
                    />
                    <p className="price">$100</p>
                  </div>
                </div>
                <div className="random-products mb-3 d-flex">
                  <div className="w-50">
                    <img
                      src="/images/watch.jpg"
                      alt="product"
                      className="img-fluid"
                    />
                  </div>
                  <div className="w-50">
                    <h6 className="brand">Rolex</h6>
                    <h5 className="title">Rolex watch</h5>
                    <ReactStars
                      count={5}
                      value={3}
                      edit={false}
                      size={24}
                      activeColor="#ffd700"
                    />
                    <p className="price">$100</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="menu-links-parent"></div>
        </div>
      </StoreContainer>
    </>
  );
};

const StoreContainer = styled.div`
  .bar {
    display: none;
  }
  .side-filter {
    display: block;
  }
  .grid-bar {
    display: block;
  }

  @media (max-width: 1000px) {
    .width-full {
      width: 100% !important;
    }
    .side-filter {
      display: none;
    }
    .side-filter-active {
      max-height: 100%;
      overflow-y: scroll;
    }
    .grid-bar {
      display: none !important;
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
    max-width: 300px;
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
    left: 0px;
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

export default Store;
