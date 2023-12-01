import React from "react";
import { Link } from "react-router-dom";
const BlogCart = () => {
  return (
    <div className="blog-cart">
      <div className="blog-image w-100">
        <img src="/images/blog-1.jpg" className="img-fluid" alt="blog-1" />
      </div>
      <div className="blog-content">
        <p className="date">1 March, 2023</p>
        <h5 className="title">Ramjan is not so far</h5>
        <p className="desc">Ramjanul karim is the month of purification</p>
        <Link to="/blog/:id" className="button">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCart;
