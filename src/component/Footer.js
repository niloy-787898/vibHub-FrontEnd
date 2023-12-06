import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsInstagram, BsFacebook, BsTwitter } from "react-icons/bs";
import Container from "../component/Container";
import styled from "styled-components";
const Footer = () => {
  return (
    <>
      <FooterContainer>
        <footer className="py-4">
          <Container>
            <div className="row align-items-center">
              <div className="col-5">
                <div className="footer-top-data d-flex align-items-center gap-30">
                  <img src="/images/newsletter.png" alt="newsletter" />
                  <h2 className="text-white mb-0">Sign Up for Newsletter</h2>
                </div>
              </div>
              <div className="col-7">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control py-2"
                    placeholder="Type Your Email"
                    aria-label="Type Your Email"
                    aria-describedby="basic-addon2"
                  />
                  <span className="input-group-text p-2" id="basic-addon2">
                    Subscribe
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </footer>
        <footer className="py-4">
          <div className="container-xxl">
            <div className="footer-container">
              <div>
                <h4 className="text-white mb-4">Contact Us</h4>
                <div>
                  <address className="text-white fs-6">
                    Hno : 195/3 A, Uttara <br /> Uttara, Dhaka <br /> Pin
                    Code:1218
                  </address>
                  <a
                    className="text-white mt-3 d-block mb-1"
                    href="tel:+880 1798633672"
                  >
                    +880 1798633672
                  </a>
                  <a
                    className="text-white mt-2 d-block mb-0"
                    href="mailto:nanosoft@gmail.com"
                  >
                    vibehub@gmail.com
                  </a>
                  <div className="social-icons d-flex align-items-center gap-30 mt-4">
                    <Link className="text-white" to="">
                      <BsFacebook className="fs-4" />
                    </Link>
                    <Link className="text-white" to="">
                      <BsTwitter className="fs-4" />
                    </Link>
                    <Link className="text-white" to="">
                      <BsInstagram className="fs-4" />
                    </Link>
                    <Link className="text-white" to="">
                      <BsLinkedin className="fs-4" />
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-white mb-4">Information</h4>
                <div className="footer-links d-flex flex-column">
                  <Link to="/privacy-policy" className="text-white py-2 mb-1">
                    Privacy Policy
                  </Link>
                  <Link to="/refund-policy" className="text-white py-2 mb-1">
                    Refund Policy
                  </Link>
                  <Link to="/shipping-policy" className="text-white py-2 mb-1">
                    Shipping Policy
                  </Link>
                  <Link to="/terms-condition" className="text-white py-2 mb-1">
                    Terms & Condition
                  </Link>
                  <Link to="/blog" className="text-white py-2 mb-1">
                    Blogs
                  </Link>
                </div>
              </div>
              <div>
                <h4 className="text-white mb-4">Accounts</h4>
                <div className="footer-links d-flex flex-column">
                  <Link className="text-white py-2 mb-1">About Us</Link>
                  <Link className="text-white py-2 mb-1">FAQ</Link>
                  <Link to="/contact" className="text-white py-2 mb-1">Contact</Link>
                </div>
              </div>
              <div>
                <h4 className="text-white mb-4">Quick Links</h4>
                <div className="footer-links d-flex flex-column">
                  <Link className="text-white py-2 mb-1">Laptop</Link>
                  <Link className="text-white py-2 mb-1">Tablets</Link>
                  <Link className="text-white py-2 mb-1">Headphone</Link>
                  <Link className="text-white py-2 mb-1">Watch</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <footer className="py-4">
          <div className="container-xxl">
            <div className="row">
              <div className="col-12">
                <p className="text-center mb-0 text-white">
                  &copy; {new Date().getFullYear()}; Powered By VibeHub{" "}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </FooterContainer>
    </>
  );
};

const FooterContainer = styled.div`
  .footer-container {
    display: grid;
    grid-template-columns: 4fr 3fr 3fr 2fr;
  }

  @media (max-width: 1024px) {
    .footer-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 599px) {
    .footer-container {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

export default Footer;
