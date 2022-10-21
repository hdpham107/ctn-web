/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { userActions, scheduleActions } from '../../../_actions';
import {
  Layout,
  Menu,
  Icon,
  Dropdown,
  Button,
  Steps,
  Input,
  Select,
  Col,
} from 'antd';

import AgentAvatar from '../../Basic/AgentAvatar';

import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';

import { Helmet } from 'react-helmet';
import CeremonyServingRegister from './CeremonyServingRegister';

const { Step } = Steps;

const { Option } = Select;

const { Content } = Layout;

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: false,
      step: 'step1',
    };
  }

  componentDidMount() {
    let { authUser } = this.props;
    // setTimeout(() => {
    //   document.getElementById('preloader').style.display = 'none';
    // }, 1200);
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>Chúng thanh niên phật quang</title>
          {/* <!-- Google Web Fonts --> */}
        </Helmet>
        {/* <Content> */}
        {/* <!-- Spinner Start --> */}
        {/* <div
      id="spinner"
      className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
    >
      <div
        className="spinner-border text-primary"
        style={{width: '3rem', height: '3rem'}}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div> */}
        {/* <!-- Spinner End --> */}


        {/* <!-- Navbar Start --> */}
        <nav
          className="navbar navbar-expand-lg bg-white navbar-light sticky-top py-lg-0 px-4 px-lg-5 wow fadeIn"
          data-wow-delay="0.1s"
        >
          <a href="index.html" className="navbar-brand p-0">
            <h1 className="m-0 text-primary">CTNPQ</h1>
          </a>
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse py-4 py-lg-0"
            id="navbarCollapse"
          >
            <div className="navbar-nav ms-auto">
              <a href="index.html" className="nav-item nav-link active">
                Trang chủ
              </a>
              <a href="contact.html" className="nav-item nav-link">
                Liên hệ
              </a>
            </div>
            <a href="" className="btn btn-primary">
              Đăng nhập<i className="fa fa-arrow-right ms-3"></i>
            </a>
          </div>
        </nav>
        {/* <!-- Navbar End --> */}

        {/* <!-- Header Start --> */}
        <div className="container-fluid bg-dark p-0 mb-5">
          <div className="row g-0 flex-column-reverse flex-lg-row">
            <div className="col-lg-6 p-0 wow fadeIn" data-wow-delay="0.1s">
              <div className="header-bg h-100 d-flex flex-column justify-content-center p-5">
                <h1 className="display-4 text-light mb-5">
                  Đại lễ phật thành đạo 2022 - PL. 2565
                </h1>
                <div className="d-flex align-items-center pt-4 animated slideInDown">
                  {/* <a href="" className="btn btn-primary py-sm-3 px-3 px-sm-5 me-5"
                >Read More</a
              > */}
                  <button
                    type="button"
                    className="btn-play"
                    data-bs-toggle="modal"
                    data-src="https://www.youtube.com/embed/l9R_L65ssE0"
                    data-bs-target="#videoModal"
                  >
                    <span></span>
                  </button>
                  <h6 className="text-white m-0 ms-4 d-none d-sm-block">
                    Xem video
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <div className="owl-carousel header-carousel">
                <div className="owl-carousel-item">
                  <img
                    className="img-fluid"
                    src="zoofari/img/carousel-1.jpg"
                    alt=""
                  />
                </div>
                <div className="owl-carousel-item">
                  <img
                    className="img-fluid"
                    src="zoofari/img/carousel-2.jpg"
                    alt=""
                  />
                </div>
                <div className="owl-carousel-item">
                  <img
                    className="img-fluid"
                    src="zoofari/img/carousel-3.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Header End --> */}

        {/* <!-- Video Modal Start --> */}
        <div
          className="modal modal-video fade"
          id="videoModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content rounded-0">
              <div className="modal-header">
                <h3 className="modal-title" id="exampleModalLabel">
                  Youtube Video
                </h3>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/* <!-- 16:9 aspect ratio --> */}
                <div className="ratio ratio-16x9">
                  <iframe
                    className="embed-responsive-item"
                    src=""
                    id="video"
                    // allowfullscreen
                    allowscriptaccess="always"
                    allow="autoplay"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Video Modal End --> */}

        {/* <!-- About Start --> */}
        <CeremonyServingRegister submitTarget="/register-result" />
        {/* <!-- About End --> */}

        {/* <!-- Facts Start --> */}
        <div
          className="container-xxl bg-primary facts my-5 py-5 wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <div className="container py-5">
            <div className="row g-4">
              <div
                className="col-md-6 col-lg-3 text-center wow fadeIn"
                data-wow-delay="0.1s"
              >
                <i className="fa fa-paw fa-3x text-primary mb-3"></i>
                <h1 className="text-white mb-2" data-toggle="counter-up">
                  50.000
                </h1>
                <p className="text-white mb-0">Tham gia</p>
              </div>
              <div
                className="col-md-6 col-lg-3 text-center wow fadeIn"
                data-wow-delay="0.3s"
              >
                <i className="fa fa-users fa-3x text-primary mb-3"></i>
                <h1 className="text-white mb-2" data-toggle="counter-up">
                  12345
                </h1>
                <p className="text-white mb-0">Daily Vigitors</p>
              </div>
              <div
                className="col-md-6 col-lg-3 text-center wow fadeIn"
                data-wow-delay="0.5s"
              >
                <i className="fa fa-certificate fa-3x text-primary mb-3"></i>
                <h1 className="text-white mb-2" data-toggle="counter-up">
                  12345
                </h1>
                <p className="text-white mb-0">Total Membership</p>
              </div>
              <div
                className="col-md-6 col-lg-3 text-center wow fadeIn"
                data-wow-delay="0.7s"
              >
                <i className="fa fa-shield-alt fa-3x text-primary mb-3"></i>
                <h1 className="text-white mb-2" data-toggle="counter-up">
                  12345
                </h1>
                <p className="text-white mb-0">Save Wild Life</p>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Facts End --> */}

        {/* <!-- Animal Start --> */}
        <div className="container-xxl py-5">
          <div className="container">
            <div
              className="row g-5 mb-5 align-items-end wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="col-lg-6">
                <h1 className="display-5 mb-0">
                  Hình ảnh <span className="text-primary">Đại lễ</span>
                </h1>
              </div>
              {/* <div className="col-lg-6 text-lg-end">
            <a className="btn btn-primary py-3 px-5" href=""
              >Explore More Animals</a
            >
          </div> */}
            </div>
            <div className="row g-4">
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="row g-4">
                  <div className="col-12">
                    <a
                      className="animal-item"
                      href="img/animal-md-1.jpg"
                      data-lightbox="animal"
                    >
                      <div className="position-relative">
                        <img
                          className="img-fluid"
                          src="zoofari/img/animal-md-1.jpg"
                          alt=""
                        />
                        <div className="animal-text p-4">
                          <p className="text-white small text-uppercase mb-0">
                            Animal
                          </p>
                          <h5 className="text-white mb-0">Elephant</h5>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="col-12">
                    <a
                      className="animal-item"
                      href="img/animal-lg-1.jpg"
                      data-lightbox="animal"
                    >
                      <div className="position-relative">
                        <img
                          className="img-fluid"
                          src="zoofari/img/animal-lg-1.jpg"
                          alt=""
                        />
                        <div className="animal-text p-4">
                          <p className="text-white small text-uppercase mb-0">
                            Animal
                          </p>
                          <h5 className="text-white mb-0">Elephant</h5>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <div className="row g-4">
                  <div className="col-12">
                    <a
                      className="animal-item"
                      href="img/animal-lg-2.jpg"
                      data-lightbox="animal"
                    >
                      <div className="position-relative">
                        <img
                          className="img-fluid"
                          src="zoofari/img/animal-lg-2.jpg"
                          alt=""
                        />
                        <div className="animal-text p-4">
                          <p className="text-white small text-uppercase mb-0">
                            Animal
                          </p>
                          <h5 className="text-white mb-0">Elephant</h5>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="col-12">
                    <a
                      className="animal-item"
                      href="img/animal-md-2.jpg"
                      data-lightbox="animal"
                    >
                      <div className="position-relative">
                        <img
                          className="img-fluid"
                          src="zoofari/img/animal-md-2.jpg"
                          alt=""
                        />
                        <div className="animal-text p-4">
                          <p className="text-white small text-uppercase mb-0">
                            Animal
                          </p>
                          <h5 className="text-white mb-0">Elephant</h5>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div className="row g-4">
                  <div className="col-12">
                    <a
                      className="animal-item"
                      href="img/animal-md-3.jpg"
                      data-lightbox="animal"
                    >
                      <div className="position-relative">
                        <img
                          className="img-fluid"
                          src="zoofari/img/animal-md-3.jpg"
                          alt=""
                        />
                        <div className="animal-text p-4">
                          <p className="text-white small text-uppercase mb-0">
                            Animal
                          </p>
                          <h5 className="text-white mb-0">Elephant</h5>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="col-12">
                    <a
                      className="animal-item"
                      href="img/animal-lg-3.jpg"
                      data-lightbox="animal"
                    >
                      <div className="position-relative">
                        <img
                          className="img-fluid"
                          src="zoofari/img/animal-lg-3.jpg"
                          alt=""
                        />
                        <div className="animal-text p-4">
                          <p className="text-white small text-uppercase mb-0">
                            Animal
                          </p>
                          <h5 className="text-white mb-0">Elephant</h5>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Animal End --> */}

        {/* <!-- Visiting Hours Start --> */}
        <div
          className="container-xxl bg-primary visiting-hours my-5 py-5 wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <div className="container py-5">
            <div className="row g-5">
              <div className="col-md-6 wow fadeIn" data-wow-delay="0.3s">
                <h1 className="display-6 text-white mb-5">
                  CHƯƠNG TRÌNH ĐẠI LỄ PHẬT THÀNH ĐẠO PL. 2565 - DL. 2022
                </h1>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <span>Lễ tổng kết đạo tràng</span>
                    <span>9:00AM - 6:00PM</span>
                  </li>
                  <li className="list-group-item">
                    <span>Dùng cơm</span>
                    <span>9:00AM - 6:00PM</span>
                  </li>
                  <li className="list-group-item">
                    <span>Các đạo tràng báo cáo</span>
                    <span>9:00AM - 6:00PM</span>
                  </li>
                  <li className="list-group-item">
                    <span>Phát bằng khen</span>
                    <span>9:00AM - 6:00PM</span>
                  </li>
                  <li className="list-group-item">
                    <span>Dùng cơm chiều</span>
                    <span>9:00AM - 6:00PM</span>
                  </li>
                  <li className="list-group-item">
                    <span>Thức chúng</span>
                    <span>9:00AM - 6:00PM</span>
                  </li>
                  <li className="list-group-item">
                    <span>Tọa thiền</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
              <div
                className="col-md-6 text-light wow fadeIn"
                data-wow-delay="0.5s"
              >
                <h1 className="display-6 text-white mb-5">Thông tin liên hệ</h1>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Địa điểm</td>
                      <td>Núi Dinh, Bà Rịa Vũng Tầu</td>
                    </tr>
                    <tr>
                      <td>Zoo</td>
                      <td>123 Street, New York, USA</td>
                    </tr>
                    <tr>
                      <td>Ticket</td>
                      <td>
                        <p className="mb-2">+012 345 6789</p>
                        <p className="mb-0">ticket@example.com</p>
                      </td>
                    </tr>
                    <tr>
                      <td>Support</td>
                      <td>
                        <p className="mb-2">+012 345 6789</p>
                        <p className="mb-0">support@example.com</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Visiting Hours End --> */}

        {/* <!-- Testimonial Start --> */}
        <div className="container-xxl py-5">
          <div className="container">
            <h1
              className="display-5 text-center mb-5 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              Người nổi tiếng tham gia!
            </h1>
            <div
              className="owl-carousel testimonial-carousel wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="testimonial-item text-center">
                <img
                  className="img-fluid rounded-circle border border-2 p-2 mx-auto mb-4"
                  src="zoofari/img/testimonial-1.jpg"
                  style={{ width: 100, height: 100 }}
                />
                <div className="testimonial-text rounded text-center p-4">
                  <p>
                    Clita clita tempor justo dolor ipsum amet kasd amet duo
                    justo duo duo labore sed sed. Magna ut diam sit et amet stet
                    eos sed clita erat magna elitr erat sit sit erat at rebum
                    justo sea clita.
                  </p>
                  <h5 className="mb-1">Patient Name</h5>
                  <span className="fst-italic">Profession</span>
                </div>
              </div>
              <div className="testimonial-item text-center">
                <img
                  className="img-fluid rounded-circle border border-2 p-2 mx-auto mb-4"
                  src="zoofari/img/testimonial-2.jpg"
                  style={{ width: 100, height: 100 }}
                />
                <div className="testimonial-text rounded text-center p-4">
                  <p>
                    Clita clita tempor justo dolor ipsum amet kasd amet duo
                    justo duo duo labore sed sed. Magna ut diam sit et amet stet
                    eos sed clita erat magna elitr erat sit sit erat at rebum
                    justo sea clita.
                  </p>
                  <h5 className="mb-1">Patient Name</h5>
                  <span className="fst-italic">Profession</span>
                </div>
              </div>
              <div className="testimonial-item text-center">
                <img
                  className="img-fluid rounded-circle border border-2 p-2 mx-auto mb-4"
                  src="zoofari/img/testimonial-3.jpg"
                  style={{ width: 100, height: 100 }}
                />
                <div className="testimonial-text rounded text-center p-4">
                  <p>
                    Clita clita tempor justo dolor ipsum amet kasd amet duo
                    justo duo duo labore sed sed. Magna ut diam sit et amet stet
                    eos sed clita erat magna elitr erat sit sit erat at rebum
                    justo sea clita.
                  </p>
                  <h5 className="mb-1">Patient Name</h5>
                  <span className="fst-italic">Profession</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Testimonial End --> */}

        {/* <!-- Footer Start --> */}
        <div
          className="container-fluid footer bg-dark text-light footer mt-5 pt-5 wow fadeIn"
          data-wow-delay="0.1s"
        >
          <div className="container py-5">
            <div className="row g-5">
              <div className="col-lg-3 col-md-6">
                <h5 className="text-light mb-4">Address</h5>
                <p className="mb-2">
                  <i className="fa fa-map-marker-alt me-3"></i>123 Street, New
                  York, USA
                </p>
                <p className="mb-2">
                  <i className="fa fa-phone-alt me-3"></i>+012 345 67890
                </p>
                <p className="mb-2">
                  <i className="fa fa-envelope me-3"></i>info@example.com
                </p>
                <div className="d-flex pt-2">
                  <a className="btn btn-outline-light btn-social" href="">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="btn btn-outline-light btn-social" href="">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="btn btn-outline-light btn-social" href="">
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a className="btn btn-outline-light btn-social" href="">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <h5 className="text-light mb-4">Quick Links</h5>
                <a className="btn btn-link" href="">
                  About Us
                </a>
                <a className="btn btn-link" href="">
                  Contact Us
                </a>
                <a className="btn btn-link" href="">
                  Our Services
                </a>
                <a className="btn btn-link" href="">
                  Terms & Condition
                </a>
                <a className="btn btn-link" href="">
                  Support
                </a>
              </div>
              <div className="col-lg-3 col-md-6">
                <h5 className="text-light mb-4">Popular Links</h5>
                <a className="btn btn-link" href="">
                  About Us
                </a>
                <a className="btn btn-link" href="">
                  Contact Us
                </a>
                <a className="btn btn-link" href="">
                  Our Services
                </a>
                <a className="btn btn-link" href="">
                  Terms & Condition
                </a>
                <a className="btn btn-link" href="">
                  Support
                </a>
              </div>
              <div className="col-lg-3 col-md-6">
                <h5 className="text-light mb-4">Newsletter</h5>
                <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                <div
                  className="position-relative mx-auto"
                  style={{ maxWidth: 400 }}
                >
                  <input
                    className="form-control border-0 w-100 py-3 ps-4 pe-5"
                    type="text"
                    placeholder="Your email"
                  />
                  <button
                    type="button"
                    className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                  >
                    SignUp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Footer End --> */}

        {/* <!-- Back to Top --> */}
        <a
          href="#"
          className="btn btn-lg btn-primary btn-lg-square back-to-top"
        >
          <i className="bi bi-arrow-up"></i>
        </a>
        {/* </Content> */}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, common }) => {
  const { authUser, token } = auth;
  return { authUser, token, ...common };
};

const mapDispatchToProps = (dispatch) => ({
  onClickLogout: () => userActions.onUserLogout()(dispatch),
  openLogin: dispatch(userActions.openLogin),
  redirect: (payload) => dispatch({ type: 'REDIRECT_TO', payload }),
  checkCode: dispatch(scheduleActions.checkCode),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
