import React from "react";

export default function About() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">About Our Bank</h1>

      {/* Introduction Section */}
      <section className="mb-5">
        <h2>Welcome to Our Bank</h2>
        <p>
          At <strong>XYZ Bank</strong>, we are committed to providing innovative
          banking solutions to our customers. With a history of trust and
          integrity, we offer a wide range of financial services tailored to
          meet the needs of both individual and corporate clients.
        </p>
        <p>
          Our mission is to empower our clients with the financial tools and
          knowledge they need to make confident and informed decisions, while
          delivering exceptional customer service and building long-lasting
          relationships.
        </p>
      </section>

      {/* Our Values Section */}
      <section className="mb-5">
        <h2>Our Core Values</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Trust</h5>
                <p className="card-text">
                  We build lasting relationships based on trust, offering our
                  customers a secure environment for their financial needs.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Innovation</h5>
                <p className="card-text">
                  We embrace technological advancements and continuously
                  innovate to provide our customers with efficient and
                  accessible financial services.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Customer Focus</h5>
                <p className="card-text">
                  Our customers are at the heart of everything we do. We are
                  dedicated to understanding their needs and delivering
                  personalized solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our History Section */}
      <section className="mb-5">
        <h2>Our History</h2>
        <p>
          <strong>XYZ Bank</strong> was founded in 1990 with a mission to
          provide reliable banking services to individuals and businesses. Over
          the years, we have grown into one of the most trusted financial
          institutions in the country, thanks to our dedication to customer
          service and our commitment to financial innovation.
        </p>
        <p>
          Through the years, we have expanded our services to include digital
          banking, loans, investment products, and more. Today, we serve
          millions of customers across the country and continue to build on our
          legacy of excellence.
        </p>
      </section>

      {/* Meet the Leadership Team Section */}
      <section className="mb-5">
        <h2>Meet Our Leadership Team</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <img
                src="https://img.freepik.com/free-photo/elderly-businessman-entrepreneur-sitting-workspace-looking-camera_482257-8143.jpg?ga=GA1.1.2122821325.1735278736&semt=ais_hybrid"
                className="card-img-top"
                alt="CEO"
                style={{ height: "500px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">John Doe</h5>
                <p className="card-text">Chief Executive Officer (CEO)</p>
                <p>
                  John has been with XYZ Bank for over 20 years and has played a
                  pivotal role in its growth and success. His leadership and
                  vision have shaped the bank into one of the leading financial
                  institutions in the country.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card">
              <img
                src="https://img.freepik.com/free-photo/middle-aged-business-woman-her-office-smart-woman_482257-25807.jpg?ga=GA1.1.2122821325.1735278736&semt=ais_hybrid"
                className="card-img-top"
                alt="CFO"
                style={{ height: "500px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Jane Smith</h5>
                <p className="card-text">Chief Financial Officer (CFO)</p>
                <p>
                  Jane oversees the financial operations of XYZ Bank, ensuring
                  we maintain strong fiscal health while continuing to deliver
                  value to our customers and shareholders.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card">
              <img
                src="https://img.freepik.com/free-photo/man-suit-tie-standing-his-office-table-showing-off-his-success_1098-19203.jpg?ga=GA1.1.2122821325.1735278736&semt=ais_hybrid"
                className="card-img-top"
                alt="COO"
                style={{ height: "500px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Michael Lee</h5>
                <p className="card-text">Chief Operating Officer (COO)</p>
                <p>
                  Michael is responsible for overseeing the day-to-day
                  operations of XYZ Bank, ensuring efficiency and excellence in
                  service delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section>
        <h2>Contact Us</h2>
        <p>
          If you would like to reach out to us, please feel free to use the
          following contact methods:
        </p>
        <ul>
          <li>Email: support@xyzbank.com</li>
          <li>Phone: +1 800 123 4567</li>
          <li>Headquarters: 123 Banking St, City, Country</li>
        </ul>
      </section>
    </div>
  );
}
