import React, {  useEffect } from "react";
import BreadCrum from "../component/BreadCrum";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../component/Meta";
import Container from "../component/Container";
import { getUserProductWishList } from "../features/user/userSlice";
import { addToWishList } from "../features/products/productSlice";
const Wishlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getWishListFromDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWishListFromDB = () => {
    dispatch(getUserProductWishList());
  };
  const wishlistState = useSelector((state) => state?.auth?.wishlistProducts?.wishlist || []);
  console.log("wishlistState", wishlistState);
  const removeFromWishList = (id) => {
    dispatch(addToWishList(id));
    setTimeout(() => {
      dispatch(getUserProductWishList());
    }, 300);
  };

  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrum title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5" style={{width:"300px", display:"flex", flexWrap: "wrap" , gap:"10px"}}>
        <div className="row" >
          {wishlistState?.length === 0 && <div className="text-center fs-3">No Data Found</div>}
          {wishlistState &&
            wishlistState?.map((item, index) => {
              return (
                <div className="col-3" key={index} style={{width:"350px", marginBottom:"10px"}}>
                  <div className="wishlist-cart position-relative" style={{ borderRadius:"8px"}}>
                    <img
                      onClick={() => {
                        removeFromWishList(item?._id);
                      }}
                      src="/images/cross.svg"
                      alt="cross"
                      className="position-absolute cross img-fluid"
                    />
                    <div className="product-cart-image bg-white">
                      <img
                        src={
                          item?.images[0]?.url
                            ? item?.images[0]?.url
                            : "images/watch.jpg"
                        }
                        className=" d-block mx-auto "
                        width={160}
                        height={160}
                        alt="watch"
                      />
                    </div>
                  </div>
                  <div className="wishlist-details py-3 px-3 bg-white">
                    <h5 className="title">{item?.title}</h5>
                    <h6 className="price mb-2 mt-2">Brand: {item.brands}</h6>
                    <h6 className="price mb-2 mt-2">Price :{item.price}</h6>
                    <h6 className="price mb-2 mt-2">Reedim: {item.reedim}</h6>
                  </div>
                </div>
              );
            })}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
