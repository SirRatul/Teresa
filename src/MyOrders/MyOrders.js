import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Sorry from "../shared/img/Sorry_Invoice.jpg";
import NoOrder from "../shared/img/No Order.jpg";
import Menu from "../shared/component/Menu";
import Footer from "../shared/component/Footer";
import { MDBCol } from "mdbreact";
import { AuthContext } from "../shared/context/auth-context";
import { Cookies } from "react-cookie";
import InvoicePreview from "../shared/component/InvoicePreview";
import "./MyOrders.css";
import axios from "axios";

const MyOrders = () => {
  const auth = useContext(AuthContext)
  const cookies = new Cookies();
  const [selectedOrderRow, setSelectedOrderRow] = useState(1)
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null)
  const [invoiceStatus, setInvoiceStatus] = useState("")
  const [orderDetails, setOrderDetails] = useState([])

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = auth.token;
    const prescriptionList = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "orders/prescription/me"
        );
        console.log(response.data);
        console.log(response.data.message.length);
        if(response.data.message.length > 0){
          setOrderDetails(response.data.message)
          console.log(response.data.message[0])
          handleOrderNumClick(response.data.message[0]);
        } else {
          setOrderDetails(null)
        }
      } catch (error) {
        console.log(error.response.data);
        if (error.response.data.error === "Please authenticate") {
          const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "users/refresh-token",{
            _id: auth.userId
          });
          console.log(response.data);
          auth.token = response.data.token;
          cookies.set("token", response.data.token, { path: "/", maxAge: 31536000 });
          axios.defaults.headers.common["Authorization"] = response.data.token;
          try {
            const response = await axios.get(
              process.env.REACT_APP_BACKEND_URL + "orders/prescription/me"
            );
            console.log(response.data);
            if(response.data.message.length > 0){
              setOrderDetails(response.data.message)
              console.log(response.data.message[0])
              handleOrderNumClick(response.data.message[0]);
            } else {
              setOrderDetails(null)
            }
            console.log("Got order info after refresh token");
          } catch (error) {
            console.log(error.response.data);
          }
        } else {
          setOrderDetails(null)
        }
      }
    }
    prescriptionList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleOrderNumClick = (order) => {
    console.log("Order Click" + order.orderNo);
    setSelectedOrderRow(order.orderNo)
    setInvoiceStatus(order.invoiceStatus)
    if (order.invoiceStatus === "Created") {
      console.log("function call for " + order.orderNo);
      getOrderDetails(order.orderNo);
    }
  }

  const getOrderDetails = async (orderNo) => {
    axios.defaults.headers.common["Authorization"] = auth.token;
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "orders/prescription/" + orderNo
      );
      console.log(response.data.message[0]);
      setSelectedOrderDetails(response.data.message[0])
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.error === "Please authenticate") {
        const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "users/refresh-token",{
          _id: auth.userId
        });
        console.log(response.data);
        auth.token = response.data.token;
        cookies.set("token", response.data.token, { path: "/", maxAge: 31536000 });
        axios.defaults.headers.common["Authorization"] = response.data.token;
        try {
          const response = await axios.get(
            process.env.REACT_APP_BACKEND_URL + "orders/prescription/me/" + orderNo
          );
          console.log(response.data.message[0]);
          setSelectedOrderDetails(response.data.message[0])
        } catch (error) {
          console.log(error.response.data);
        }
      }
    }
  };
  return <React.Fragment>
    <Helmet>
      <meta charSet="utf-8" />
      <title>My Orders</title>
    </Helmet>
    <Menu />
    <div className="container-fluid w-100 h-100 pt-5 header-background">
      <div className="container-fluid pl-5">
        <div className="row">
          <p className="text-left text-light ml-3 ml-lg-0 display-4 upload-prescription-header-text">My Orders</p>
        </div>
        <div className="row">
          <Breadcrumb className="ml-0 ml-lg-n3">
            <Breadcrumb.Item className="text-light" href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="#/">Profile</Breadcrumb.Item>
            <Breadcrumb.Item active>My Orders</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
    </div>
    <div className="container-fluid">
      <div className="row">
        {
          orderDetails ?
          <React.Fragment>
            <MDBCol size="3" className="Order_list_column">
              <div className="Orders p-1 p-sm-2 p-md-3 ml-2">
                <h3 className="your-orders-text">Your Orders</h3>
              </div>
              {
              orderDetails.map((order) => (
                <div className={selectedOrderRow === order.orderNo? "Order-Numbers justify-content-center px-1 pl-2 pt-md-3 pb-md-2 pl-md-4 orderLabel": "justify-content-center px-1 pl-2 pt-md-3 pb-md-2 pl-md-4 orderLabel"} onClick={() => handleOrderNumClick(order)}>
                  <label>Order No: {order.orderNo}</label>
                  <p className='dateLabel' style={{ cursor: "default" }}>{order.dateTime}</p>
                </div>
              ))}
              <br />
              <br />
              <br />
            </MDBCol>
            <MDBCol size="9" className="Invoice_Column">
              <br />
              <br />
              {
              invoiceStatus === "Not Created" 
              ? 
              <div className="m-auto">
                <img className="mx-auto d-block doctor-image" src={Sorry} alt="Sorry"/>
              </div>
              : 
              <div className="container-fluid">
                {selectedOrderDetails ? <InvoicePreview medicineInfo={selectedOrderDetails.medicineDetails} sellerName={selectedOrderDetails.sellerName} sellerPhone={selectedOrderDetails.sellerPhone} customerName={selectedOrderDetails.billName} customerPhone={selectedOrderDetails.billPhone} deliveryAddress={selectedOrderDetails.billAddress} orderNo={selectedOrderDetails.orderNo} orderTime={selectedOrderDetails.dateTime} /> : null}
                <br/>
                <br/>
                <br/>
                <br/>
              </div>
              }
            </MDBCol>
          </React.Fragment>
          :
          <img className="mx-auto d-block" style={{width: "600px", height: 'auto'}} src={NoOrder} alt="No Order "/>
        }
      </div>
    </div>
    <Footer />
  </React.Fragment>
}

export default MyOrders;
