
import { useEffect, useRef, useState } from 'react';
import { FaThumbsUp } from "react-icons/fa";
import "./styles.css";
import 'animate.css';
import menuIcon from "./images/menu-icon.svg";
import backIcon from './images/back-icon.svg';

export default function Home() {
  // Refs for scrolling to sections
  const packagesDivRef = useRef<HTMLDivElement | null>(null);
  const aboutUsDivRef = useRef<HTMLDivElement | null>(null);
  const classADivRef = useRef<HTMLDivElement | null>(null);
  const classBDivRef = useRef<HTMLDivElement | null>(null);

  // State for form inputs
  const [firstNameInputValue, setFirstNameInputValue] = useState("");
  const [lastNameInputValue, setLastNameInputValue] = useState("");
  const [emailInputValue, setEmailInputValue] = useState("");
  const [phoneInputValue, setPhoneInputValue] = useState("");
  const [city, setCity] = useState("");
  const [visited, setVisited] = useState(false);
  const [contactInterestHandled, setContactInterestHandled] = useState(false);

  const [menuOpened, setMenuOpened] = useState(false); 

  // Set visited to true on component mount
  useEffect(() => {
    if (!visited) {
      setVisited(true);
    }
  }, []);

  // Handle visiting logic when visited is true
  // useEffect(() => {
  //   if (visited) {
  //     handleVisiting();
  //   }
  // }, [visited]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    // Start observing the "About Us" section
    if (aboutUsDivRef.current) {
      observer.observe(aboutUsDivRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (aboutUsDivRef.current) {
        observer.unobserve(aboutUsDivRef.current);
      }
    };
  }, []);

  // Scroll to Packages section
  const scrollToPackages = () => {
    if (packagesDivRef.current) {
      packagesDivRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll to About Us section
  const scrollToAboutUs = () => {
    if (aboutUsDivRef.current) {
      aboutUsDivRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll to Class A section
  const scrollToClassA = () => {
    if (classADivRef.current) {
      classADivRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll to Class B section
  const scrollToClassB = () => {
    if (classBDivRef.current) {
      classBDivRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle form submission
  const handleIntrest = async () => {
    try {
      if (!firstNameInputValue || !lastNameInputValue || !emailInputValue || !phoneInputValue) {
        return;
      }

      const response = await fetch('https://api.turancdl.com/interest/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstNameInputValue,
          lastName: lastNameInputValue,
          email: emailInputValue,
          phone: phoneInputValue,
          city: city,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setContactInterestHandled(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle visiting logic
  const handleVisiting = async () => {
    const response = await fetch('https://ipinfo.io/json');
    const data = await response.json();
    setCity(data.city);

    fetch('https://api.turancdl.com/interest/visit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ip: data.ip, city: data.city, region: data.region }),
    });
  };

  return (
    <>
      <div className={`wrapper ${menuOpened ? '' : 'd-none'}`}>
        <img src={backIcon} className={`back-icon ${menuOpened ? '' : 'd-none'}`} alt="" onClick={() => {
          setMenuOpened(!menuOpened);
        }} />
      </div>
      {/* Hero Section */}
      <div className="hero">
        <div className="darker"></div>

        <div className="navbar">
          <div className="navbar-1">
            <div className="logo"></div>
            <div className={`navbar-a ${menuOpened ? '' : 'd-none'}`}>
              <div className="tab">
                <span className="t-menu">Truck driving classes</span>
                <ul className="dropdown animate__animated animate__fadeIn animate__faster">
                  <li><a onClick={scrollToClassA} className="class-a">Class A</a></li>
                  <li><a onClick={scrollToClassB} className="class-b">Class B</a></li>
                </ul>
              </div>
              <a onClick={scrollToPackages} className="tab-b"><span className="t-menu-c">Packages</span></a>
              <a onClick={scrollToAboutUs} className="tab-d"><span className="t-menu-e">About us</span></a>
            </div>
          </div>
          <div className={`item-r ${menuOpened ? '' : 'd-none'}`}>
            <div className="button"><span className="t-signin">Sign In</span></div>
            <div className="button-13"><span className="t-signup">Download the app now</span></div>
          </div>

          <div className="menu-icon" onClick={() => setMenuOpened(!menuOpened)}>
            <img src={menuIcon} alt="" />
          </div>
        </div>

        <div className="container">
          <div className="container-14">
            <a onClick={scrollToPackages} className="badge animate__animated animate__bounce">
              <span className="t-the-power-to-do-more">Unlock the Power in Truck Driving</span>
              <div className="x-system">
                <span className="t-read-more">Learn More</span>
              </div>
            </a>

            <div className="text">
              <span className="t-title">Revolutionize Your Truck Driving Skills</span>
              <span className="t-subtitle">Experience innovative learning methods tailored for truck drivers.</span>
            </div>
          </div>

          <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "flex-start", height: "476px" }}>
            {contactInterestHandled ? (
              <div className="success-message animate__animated animate__zoomInDown animate__faster">
                <FaThumbsUp className="success-icon" />
                <p className="success-text">Successfully sent, we will call you</p>
              </div>
            ) : (
              <form className="contact-form" onClick={(e) => e.preventDefault()}>
                <label className="input-wrapper">
                  <span>First Name</span>
                  <input
                    value={firstNameInputValue}
                    onChange={(e) => setFirstNameInputValue(e.target.value)}
                    className="input"
                    id="first-name-input"
                    type="text"
                  />
                </label>

                <label className="input-wrapper">
                  <span>Last Name</span>
                  <input
                    value={lastNameInputValue}
                    onChange={(e) => setLastNameInputValue(e.target.value)}
                    className="input"
                    id="last-name-input"
                    type="text"
                  />
                </label>

                <label>
                  <span>Email</span>
                  <input
                    value={emailInputValue}
                    onChange={(e) => setEmailInputValue(e.target.value)}
                    className="input email-input"
                    type="email"
                  />
                </label>

                <label>
                  <span>Phone</span>
                  <input
                    value={phoneInputValue}
                    onChange={(e) => setPhoneInputValue(e.target.value)}
                    className="input phone-input"
                    type="phone"
                  />
                </label>

                <button className="button-47-1" onClick={handleIntrest}>
                  <span className="t-get-started-48">Start Your Journey Today</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="main-container">
        <a className="default"></a>

        {/* About Us Section */}
        <div className={`features-42`} ref={aboutUsDivRef}>
          <div className="container-43">
            <div className={`text-44`}>
              <span className="t-title-45">About us</span>
            </div>
          </div>
          <div className="container-4b">
            <div className={`container-4c`}>
              <div className="container-md-4d">
                <div className="lighting-4e"><div className="vector-4f"></div></div>
              </div>
              <div className="text-50">
                <span className="t-feature-title-51">Easy Start</span>
                <span className="t-feature-subtitle">Quickly grasp the basics of truck handling.</span>
              </div>
            </div>
            <div className={`container-52`}>
              <div className="container-md-53">
                <div className="lock-54"><div className="vector-55"></div></div>
              </div>
              <div className="text-56">
                <span className="t-feature-title-57">Engaging Learning</span>
                <span className="t-feature-subtitle-58">Stay captivated with interactive learning materials.</span>
              </div>
            </div>
            <div className={`container-59`}>
              <div className="container-md-5a">
                <div className="sparkle"><div className="clip-path-group-5b"></div></div>
              </div>
              <div className="text-5c">
                <span className="t-feature-title-5d">In-depth Content</span>
                <span className="truck-driving-techniques">Dive deep into all aspects of truck driving techniques.</span>
              </div>
            </div>
            <div className={`container-5e`}>
              <div className="container-md-5f">
                <div className="heart"><div className="vector-60"></div></div>
              </div>
              <div className="text-61">
                <span className="guided-navigation">Guided Navigation</span>
                <span className="seamless-learning">
                  Effortlessly navigate through the app for seamless learning.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof Section */}
        <div className="social-proof-partners">
          <span className="t-title-17">Join Our Community of Truck Teaching Experts</span>
          <div className="row">
            <div className="logo-18"></div>
            <div className="logo-19"><div className="vector-1a"></div></div>
            <div className="logo-1b"><div className="vector-1c"></div></div>
            <div className="logo-1d"><div className="clip-path-group"></div></div>
            <div className="logo-1e"><div className="vector-1f"></div></div>
            <div className="logo-20">
              <div className="clip-path-group-21">
                <div className="group"><div className="vector-22"></div></div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta">
          <div className="m-image-2b"></div>

          <div className="container-23">
            <div className="badge-24">
              <span className="t-slogan">Revolutionizing Truck Driving Education!</span>
            </div>
            <div className="text-25">
              <span className="t-title-26">Experience Next-Gen Learning with Our Mobile App</span>
              <span className="t-content">
                Unlock the secrets of truck driving through immersive video
                tutorials and interactive learning materials.
              </span>
            </div>
            <div className="container-27">
              <div className="button-28">
                <span className="t-get-started-29">Get Started Now!</span>
              </div>
              <div className="button-2a">
                <div className="icon-l"></div>
                <span className="t-watch-video">Watch Intro Video</span>
              </div>
            </div>
          </div>
        </div>

        {/* Class A Section */}
        <div className="features" ref={classADivRef}>
          <div className="container-2c">
            <div className="text-2d">
              <span className="t-title-2e">Master Truck Driving with Ease</span>
              <span className="t-subtitle-2f">
                Revolutionize your learning experience with our intuitive mobile app.
              </span>
            </div>
            <div className="container-30">
              <div className="container-31">
                <div className="container-md">
                  <div className="lighting"><div className="vector-32"></div></div>
                </div>
                <span className="t-feature-title">Interactive Video Tutorials</span>
              </div>
              <div className="container-33">
                <div className="container-md-34">
                  <div className="image"><div className="vector-35"></div></div>
                </div>
                <span className="t-feature-title-36">Immersive Audio Lessons</span>
              </div>
              <div className="container-37">
                <div className="container-md-38">
                  <div className="lock"><div className="vector-39"></div></div>
                </div>
                <span className="t-feature-title-3a">Comprehensive PDF Guides</span>
              </div>
              <div className="container-3b">
                <div className="container-md-3c">
                  <div className="folder"><div className="vector-3d"></div></div>
                </div>
                <span className="t-feature-title-3e">User-Friendly Navigation</span>
              </div>
            </div>
            <div className="button-3f">
              <span className="t-learn-more-40">Discover More</span>
            </div>
          </div>
          <div className="m-image-41"></div>
        </div>

        {/* Class B Section */}
        <div className="features" ref={classBDivRef}>
          <div className="m-image-41"></div>

          <div className="container-2c">
            <div className="text-2d">
              <span className="t-title-2e">Master Truck Driving with Ease</span>
              <span className="t-subtitle-2f">
                Revolutionize your learning experience with our intuitive mobile app.
              </span>
            </div>
            <div className="container-30">
              <div className="container-31">
                <div className="container-md">
                  <div className="lighting"><div className="vector-32"></div></div>
                </div>
                <span className="t-feature-title">Interactive Video Tutorials</span>
              </div>
              <div className="container-33">
                <div className="container-md-34">
                  <div className="image"><div className="vector-35"></div></div>
                </div>
                <span className="t-feature-title-36">Immersive Audio Lessons</span>
              </div>
              <div className="container-37">
                <div className="container-md-38">
                  <div className="lock"><div className="vector-39"></div></div>
                </div>
                <span className="t-feature-title-3a">Comprehensive PDF Guides</span>
              </div>
              <div className="container-3b">
                <div className="container-md-3c">
                  <div className="folder"><div className="vector-3d"></div></div>
                </div>
                <span className="t-feature-title-3e">User-Friendly Navigation</span>
              </div>
            </div>
            <div className="button-3f">
              <span className="t-learn-more-40">Discover More</span>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="pricing" ref={packagesDivRef}>
          <div className="text-8c">
            <span className="pricing-plans">Unlock Your Learning Potential with Our Pricing Plans!</span>
            <a className="default"></a>
            <span className="truck-teaching-packages">Explore our tailored packages to enhance your truck teaching experience.</span>
          </div>

          <div className="container-8d">
            <div className="container-8e">
              <div className="pricing-8f">
                <div className="items">
                  <div className="item">
                    <div className="check"></div>
                    <span className="interactive-video-tutorials">Program Tuition Fee: <br /> $3,500</span>
                  </div>
                  <div className="item-90">
                    <div className="check-91"></div>
                    <span className="downloadable-pdf-resources">Final Exam Fee: $350</span>
                  </div>
                  <div className="item-92">
                    <div className="check-93"></div>
                    <span className="convenient-audio-player">40Hrs of classroom Training</span>
                  </div>
                  <div className="item-94">
                    <div className="check-95"></div>
                    <span className="user-friendly-navigation">Minimum 40-50Hrs of Range Training</span>
                  </div>
                </div>
              </div>
              <div className="pricing-96">
                <div className="items-97">
                  <div className="item-98">
                    <div className="check-99"></div>
                    <span className="engaging-learning-experience">Minimum 10 Hrs of Road Training</span>
                  </div>
                  <div className="item-9a">
                    <div className="check-9b"></div>
                    <span className="accessible-anytime-anywhere">Unlimited Pre-Trip Inspection Training</span>
                  </div>
                  <div className="item-9c">
                    <div className="check-9d"></div>
                    <span className="comprehensive-teaching-materials">Comprehensive Teaching Materials</span>
                  </div>
                  <div className="item-9e">
                    <div className="check-9f"></div>
                    <span className="seamless-user-experience">Seamless User Experience</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pricing-a0">
              <div className="header">
                <span className="starter-package">80hrs package</span>
                <div className="text-a1">
                  <span className="title">$3850</span>
                  <span className="monthly-subscription">Monthly Subscription</span>
                </div>
                <span className="for-person-use-only">For Personal Use Only - Dive Into Learning!</span>
              </div>
              <div className="button-a2">
                <span className="get-started">Get Started Today</span>
              </div>
            </div>
          </div>

          <div className="container-8d">
            <div className="container-8e">
              <div className="pricing-8f">
                <div className="items">
                  <div className="item">
                    <div className="check"></div>
                    <span className="interactive-video-tutorials">Program Tuition Fee: <br /> $4,000</span>
                  </div>
                  <div className="item-90">
                    <div className="check-91"></div>
                    <span className="downloadable-pdf-resources">Final Exam Fee: $350</span>
                  </div>
                  <div className="item-92">
                    <div className="check-93"></div>
                    <span className="convenient-audio-player">40Hrs of classroom Training</span>
                  </div>
                  <div className="item-94">
                    <div className="check-95"></div>
                    <span className="user-friendly-navigation">Minimum 50-70 Hrs of Range Training</span>
                  </div>
                </div>
              </div>
              <div className="pricing-96">
                <div className="items-97">
                  <div className="item-98">
                    <div className="check-99"></div>
                    <span className="engaging-learning-experience">Minimum 10 Hrs of Road Training</span>
                  </div>
                  <div className="item-9a">
                    <div className="check-9b"></div>
                    <span className="accessible-anytime-anywhere">Unlimited Pre-Trip Inspection Training</span>
                  </div>
                  <div className="item-9c">
                    <div className="check-9d"></div>
                    <span className="comprehensive-teaching-materials">Comprehensive Teaching Materials</span>
                  </div>
                  <div className="item-9e">
                    <div className="check-9f"></div>
                    <span className="seamless-user-experience">Seamless User Experience</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pricing-a0">
              <div className="header">
                <span className="starter-package">100-120hrs package</span>
                <div className="text-a1">
                  <span className="title">$4350</span>
                  <span className="monthly-subscription">Monthly Subscription</span>
                </div>
                <span className="for-person-use-only">For Personal Use Only - Dive Into Learning!</span>
              </div>
              <div className="button-a2">
                <span className="get-started">Get Started Today</span>
              </div>
            </div>
          </div>

          <div className="container-a3">
            <div className="user-avatar-a4"></div>
            <div className="container-a5">
              <div className="rating-a6">
                <div className="container-a7">
                  <div className="star-a8"></div>
                  <div className="star-a9"></div>
                  <div className="star-aa"></div>
                  <div className="star-ab"></div>
                  <div className="star-ac"></div>
                </div>
              </div>
              <div className="text-ad">
                <span className="user-review-ae">
                  Join our community of satisfied learners who have mastered
                  truck teaching skills through our innovative mobile app.
                  Experience the convenience and effectiveness firsthand!
                </span>
                <span className="user-name-af">Marufjon Sayfullaev</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="footer">
          <div className="footer-ce">
            <div className="divider"></div>
            <div className="cols">
              <div className="item-cf">
                <span className="t-features">Key Features</span>
                <span className="t-features-item">Interactive Lessons</span>
                <span className="t-features-item-d0">Real-time Feedback</span>
                <span className="t-features-item-d1">Progress Tracking</span>
                <span className="t-features-item-d2">Certification</span>
                <span className="t-features-item-d3">Community Support</span>
              </div>
              <div className="item-d4">
                <span className="t-products">Our Services</span>
                <span className="t-products-item">Video</span>
                <span className="t-products-item-d5">PDF</span>
                <span className="t-products-item-d6">Audio</span>
                <span className="t-products-item-d7">Resources</span>
                <span className="t-products-item-d8">Tools</span>
              </div>
              <div className="item-d9">
                <span className="t-about">About Us</span>
                <span className="t-about-item">Mission</span>
                <span className="t-about-item-da">Vision</span>
                <span className="t-about-item-db">Values</span>
                <span className="t-about-item-dc">Team</span>
                <span className="t-about-item-dd">Testimonials</span>
              </div>
              <div className="item-de">
                <span className="t-social">Connect With Us</span>
                <span className="t-social-item">Facebook</span>
                <span className="t-social-item-df">Twitter</span>
                <span className="t-social-item-e0">LinkedIn</span>
                <span className="t-social-item-e1">Instagram</span>
                <span className="t-social-item-e2">YouTube</span>
              </div>
            </div>
            <div className="container-e3">
              <div className="logo-e4">
                <div className="i-logo-e5">
                  <div className="flex-row-ba">
                    <div className="vector-e6"></div>
                    <div className="vector-e7"></div>
                    <div className="vector-e8"></div>
                  </div>
                  <div className="flex-row-ba-e9">
                    <div className="vector-ea"></div>
                    <div className="vector-eb"></div>
                    <div className="vector-ec"></div>
                  </div>
                  <div className="flex-row-ea">
                    <div className="vector-ed"></div>
                    <div className="vector-ee"></div>
                    <div className="vector-ef"></div>
                  </div>
                </div>
                <span className="t-company-name">TuranCDL School</span>
              </div>
              <span className="t-copyright">©2025 TuranCDL School. All Rights Reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}