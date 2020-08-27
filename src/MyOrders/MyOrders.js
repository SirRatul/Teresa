import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Menu from "../shared/component/Menu";
import Footer from "../shared/component/Footer";
import { MDBCol } from "mdbreact";
import "./MyOrders.css";

export default class Registration extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Orders</title>
        </Helmet>
        <Menu />

        <div className="container-fluid w-100 h-100 pt-5 header-background">
          <div className="container-fluid pl-5">
            <div className="row">
              <p className="text-left text-light ml-3 ml-lg-0 display-4 upload-prescription-header-text">
                My Orders
              </p>
            </div>
            <div className="row">
              <Breadcrumb className="ml-0 ml-lg-n3">
                <Breadcrumb.Item className="text-light" href="/">
                  Home
                </Breadcrumb.Item>
                <Breadcrumb.Item href="#/">Profile</Breadcrumb.Item>
                <Breadcrumb.Item active>My Orders</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <MDBCol size="3" className="Order_list_column">
              <div className="Orders p-3 ml-2">
                <h3 className="your-orders-text">Your Orders</h3>
              </div>

              <div className="Order-Numbers pt-4 pl-4">
                <label>Order No: 001</label>
                <p>8 August, 2020. 8:00 PM</p>
              </div>

              <div className="Order-Numbers pt-4 pl-4">
                <label>Order No: 001</label>
                <p>8 August, 2020. 8:00 PM</p>
              </div>

              <br />
              <br />
              <br />

              <br />
              <br />
              <br />
              <br />

              <br />
              <br />
              <br />
              <br />

              <br />
              <br />
              <br />
              <br />

              <br />
              <br />
              <br />
              <br />

              <br />
              <br />
              <br />
              <br />

              <br />
              <br />
              <br />
              <br />

              <br />
              <br />
              <br />
              <br />

              <br />
            </MDBCol>

            <MDBCol size="9" className="Invoice_Column  pl-5"></MDBCol>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}
