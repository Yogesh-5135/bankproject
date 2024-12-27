import React from "react";

const OurService = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Our Banking Services</h2>

      <div className="row">
        {/* Account Opening */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <img
              src="https://img.freepik.com/free-vector/isometric-shopping-concept-with-persons_23-2147841213.jpg?semt=ais_hybrid"
              className="card-img-top"
              alt="Account Opening"
              style={{ height: "400px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">Account Opening</h5>
              <p className="card-text">
                We provide a range of account opening services including savings
                accounts, current accounts, and business accounts. Our seamless
                process ensures you can start banking easily.
              </p>
            </div>
          </div>
        </div>

        {/* Loans */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <img
              src="https://img.freepik.com/free-photo/loan-approved-application-form-concept_53876-127383.jpg?ga=GA1.1.2122821325.1735278736&semt=ais_hybrid"
              className="card-img-top"
              alt="Loans & Credit"
              style={{ height: "400px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">Loans & Credit</h5>
              <p className="card-text">
                Whether it's for buying a home, starting a business, or pursuing
                higher education, we offer various loan products with flexible
                repayment options tailored to your needs.
              </p>
            </div>
          </div>
        </div>

        {/* Online Banking */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <img
              src="https://img.freepik.com/free-photo/woman-with-coffee-credit-card_1208-202.jpg?ga=GA1.1.2122821325.1735278736&semt=ais_hybrid"
              className="card-img-top"
              alt="Online Banking"
              style={{ height: "400px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">Online Banking</h5>
              <p className="card-text">
                Manage your finances from anywhere with our easy-to-use online
                banking platform. Perform transactions, check balances, and
                manage your investments anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Investment Services */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <img
              src="https://img.freepik.com/free-photo/network-connection-graphic-overlay-banner-wall_53876-122798.jpg?ga=GA1.1.2122821325.1735278736&semt=ais_hybrid"
              className="card-img-top"
              alt="Investment Services"
              style={{ height: "400px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">Investment Services</h5>
              <p className="card-text">
                Maximize your savings with our investment services. From mutual
                funds to retirement planning, we help you invest wisely for a
                secure future.
              </p>
            </div>
          </div>
        </div>

        {/* Insurance Plans */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <img
              src="https://img.freepik.com/free-vector/insurance-services-background_1284-8294.jpg?ga=GA1.1.2122821325.1735278736&semt=ais_hybrid"
              className="card-img-top"
              alt="Insurance Plans"
              style={{ height: "400px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">Insurance Plans</h5>
              <p className="card-text">
                Protect yourself and your loved ones with our wide range of
                insurance products including life, health, auto, and home
                insurance policies.
              </p>
            </div>
          </div>
        </div>

        {/* Customer Support */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <img
              src="https://img.freepik.com/free-photo/front-view-smiley-woman-posing-with-headset-desk_23-2148434723.jpg?ga=GA1.1.2122821325.1735278736&semt=ais_hybrid"
              className="card-img-top"
              alt="Customer Support"
              style={{ height: "400px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">Customer Support</h5>
              <p className="card-text">
                Our customer support team is always here to assist you. From
                technical issues to banking queries, we're just a call away.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurService;
