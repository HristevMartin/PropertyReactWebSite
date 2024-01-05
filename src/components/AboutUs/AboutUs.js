// AboutUs.js
import React from "react";
import "./AboutUs.css"; // Make sure to update the CSS file with new styles
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

function AboutUs() {
  return (
    <div className="about-us">
      <div className="hero-section">
        <img
          src="https://png.pngtree.com/thumb_back/fh260/background/20220311/pngtree-a-real-estate-agent-provides-a-house-image_1027841.jpg"
          alt="Hero"
          className="hero-image"
        />
        <div className="hero-content">
          <h1>Welcome to Estate Agent</h1>
          <p>Your trusted partner in finding your dream home.</p>
          <a href="/listings">
            <button className="btn-learn-more">Listings </button>
          </a>
        </div>
      </div>

      {/* About Us Narrative */}
      <div className="about-content">
        <div className="info-section mission">
          <h2>Our Mission</h2>
          <p>
            To deliver outstanding service and support to our clients and
            community.
          </p>
        </div>
        <div className="info-section history">
          <h2>Our History</h2>
          <p>Providing quality real estate services since [year].</p>
        </div>
        <div className="info-section values">
          <h2>Our Values</h2>
          <p>
            We believe in integrity, commitment, and excellence in all our
            endeavors.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <h2>Meet Our Team</h2>

        <div className="team-members">
          {/* Team Member 1 */}
          <div className="team-member">
            <img
              src="path_to_member_1_image.jpg"
              alt="John Doe"
              className="team-member-photo"
            />
            <h3>John Doe</h3>
            <p className="role">CEO</p>
            <p>
              John has over 20 years of experience in real estate and is
              passionate about building community through housing.
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="team-member">
            <img
              src="https://media.licdn.com/dms/image/D4E03AQEF-dDOF1NVpw/profile-displayphoto-shrink_800_800/0/1673110259167?e=2147483647&v=beta&t=IJt1cakodWRVozqHoscFHb4awxLPN3r8nOg-TuJGx0g"
              alt="Jane Smith"
              className="team-member-photo"
            />
            <h3>Jane Smith</h3>
            <p className="role">Chief Marketing Officer</p>
            <p>
              Jane is an expert in digital marketing and is dedicated to
              promoting properties through innovative strategies.
            </p>
          </div>

          {/* Team Member 3 */}
          <div className="team-member">
            <img
              src="path_to_member_3_image.jpg"
              alt="Bob Johnson"
              className="team-member-photo"
            />
            <h3>Bob Johnson</h3>
            <p className="role">Sales Director</p>
            <p>
              With a keen eye for detail, Bob leads our sales team and ensures
              that our clients receive top-notch service.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="timeline-section">
        <h2>Our Milestones</h2>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2001"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h3 className="vertical-timeline-element-title">Founded</h3>
            <p>
              Our journey began with a small office and a big vision to
              revolutionize real estate services.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2005"
            iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
          >
            <h3 className="vertical-timeline-element-title">
              First Major Project
            </h3>
            <p>
              Completion of our first major residential project, establishing
              our mark in the industry.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2010"
            iconStyle={{ background: "rgb(76, 175, 80)", color: "#fff" }}
          >
            <h3 className="vertical-timeline-element-title">
              Nationwide Expansion
            </h3>
            <p>
              Expanded operations nationwide, growing our team to over 200
              employees.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2015"
            iconStyle={{ background: "rgb(156, 39, 176)", color: "#fff" }}
          >
            <h3 className="vertical-timeline-element-title">
              Award-Winning Service
            </h3>
            <p>
              Received 'Real Estate Agency of the Year' award for outstanding
              customer service.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            date="2018"
            iconStyle={{ background: "rgb(103, 58, 183)", color: "#fff" }}
          >
            <h3 className="vertical-timeline-element-title">
              Innovative Tech Integration
            </h3>
            <p>
              Implemented cutting-edge VR technology for virtual property tours,
              a first in the industry.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2020"
            iconStyle={{ background: "rgb(255, 193, 7)", color: "#fff" }}
          >
            <h3 className="vertical-timeline-element-title">
              International Presence
            </h3>
            <p>
              Established partnerships overseas, broadening our global presence.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2024"
            iconStyle={{ background: "rgb(255, 87, 34)", color: "#fff" }}
          >
            <h3 className="vertical-timeline-element-title">
              25th Anniversary
            </h3>
            <p>
              Celebrated a quarter-century of service, with over a million homes
              sold.
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <h2>What Our Clients Say</h2>
        <div className="testimonials-cards">
          <div className="testimonial-card">
            <p className="testimonial-text">
              "Estate Agent helped us find our dream home effortlessly. Their
              dedication and commitment to their clients is unparalleled."
            </p>
            <p className="client-name">- Alex Johnson</p>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">
              "The professional demeanor and knowledge of the local market from
              the team at Estate Agent made all the difference."
            </p>
            <p className="client-name">- Samantha Lee</p>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">
              "We sold our house above asking price, thanks to the expert advice
              and strategy from our agent at Estate Agent."
            </p>
            <p className="client-name">- Michael and Sarah Smith</p>
          </div>
          {/* Add more testimonial cards as needed */}
        </div>
      </div>

      {/* Image Gallery */}
   
    </div>
  );
}

export default AboutUs;
