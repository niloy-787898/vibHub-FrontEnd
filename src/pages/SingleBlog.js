import React from "react";
import { Link } from "react-router-dom";
import BreadCrum from "../component/BreadCrum";
import Meta from "../component/Meta";
import { BiArrowBack } from "react-icons/bi";
import Container from "../component/Container";
const SingleBlog = () => {
  return (
    <>
      <Meta title={"Dynamic Title here"} />
      <BreadCrum title="Dynamic Title here" />
      <Container class1="single-blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="single-blog-cart ">
              <h3>Lorem ipsum dolor sit amet.</h3>
              <img
                src="/images/blog-1.jpg"
                alt="blog-1"
                className="img-fluid w-100 my-4 image-blog"
              />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                autem itaque corporis, ratione dicta fugit? Quaerat, atque quam
                assumenda vel blanditiis ratione pariatur tempora possimus animi
                optio dolores similique corporis. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quas quasi ex recusandae voluptate
                accusantium magni! Tempora aspernatur sint expedita illo, hic
                cupiditate iure quisquam consequatur, officia dolore
                voluptatibus? Tempora, aspernatur!
              </p>
            </div>
            <div className="single-blog-cart-back d-flex justify-content-between align-items-center">
              <Link to="/blog" className="d-flex gap-10">
                <BiArrowBack className="fs-5" />
                <h5>Back To Blog</h5>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
