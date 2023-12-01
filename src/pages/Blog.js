import React from "react";
import BreadCrum from "../component/BreadCrum";
import Meta from "../component/Meta";
import BlogCart from "../component/BlogCart";
import Container from "../component/Container";
const Blog = () => {
  return (
    <>
      <Meta title={"Blog"} />
      <BreadCrum title="Blog" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-cart mb-3">
              <h3 className="filter-title">Find By Category</h3>
              <ul className="ps-0">
                <li>Watch</li>
                <li>TV</li>
                <li>Camera</li>
                <li>Laptop</li>
              </ul>
            </div>
          </div>
          <div className="col-9">
            <div className="row ">
              <div className="col-6 mb-4">
                <BlogCart />
              </div>
              <div className="col-6 mb-4">
                <BlogCart />
              </div>
              <div className="col-6 mb-4">
                <BlogCart />
              </div>
              <div className="col-6 mb-4">
                <BlogCart />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Blog;
