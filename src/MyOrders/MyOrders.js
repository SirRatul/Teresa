import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Sorry from "../shared/img/Sorry_Invoice.jpg";
import Menu from "../shared/component/Menu";
import Footer from "../shared/component/Footer";
import { MDBCol } from "mdbreact";
import { AuthContext } from "../shared/context/auth-context";
import { Cookies } from "react-cookie";
import InvoicePreview from "../shared/component/InvoicePreview";
import "./MyOrders.css";
import axios from "axios";

/* export default class Registration extends Component {
  static contextType = AuthContext;
  cookies = new Cookies();

  constructor(props) {
    super(props);

    this.state = {
      selectedOrderRow: 1,
      selectedOrderDetails:[],

      invoiceStatus: "",

      orderDetails: [],
      
    };
    this.handleOrderNumClick = this.handleOrderNumClick.bind(this);
    this.getOrderDetails = this.getOrderDetails.bind(this);
  }

  handleOrderNumClick(order) {
    //alert(order.orderNo);
    console.log("Order Click" + order.orderNo);

    this.setState({
      selectedOrderRow: order.orderNo,
      invoiceStatus: order.invoiceStatus,
    });

    if (order.invoiceStatus === "Created") {
      console.log("function call for " + this.state.selectedOrderRow);
      this.getOrderDetails(order.orderNo);
    }
  }

  getOrderDetails = async (orderNo) => {
    const auth = this.context;

    axios.defaults.headers.common["Authorization"] = auth.token;

    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "orders/prescription/me/" + orderNo
      );

      console.log(response.data.message);

      this.setState({
         selectedOrderDetails: response.data.message
      });
      alert(this.state.selectedOrderDetails[0].sellerName)
    } catch (error) {
      console.log(error.response.data);
    }
  };

  componentDidMount = async (e) => {
    const auth = this.context;

    axios.defaults.headers.common["Authorization"] = auth.token;

    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "orders/prescription/me"
      );

      console.log(response.data);

      this.setState({
        orderDetails: response.data.message,
        // selectedOrderDetails: response.data.message
      });
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.error === "Please authenticate") {
        const response = await axios.post(
          process.env.REACT_APP_BACKEND_URL + "users/refresh-token",
          {
            _id: auth.userId,
          }
        );
        console.log(response.data);
        auth.token = response.data.token;
        this.cookies.set("token", auth.token, { path: "/", maxAge: 31536000 });

        axios.defaults.headers.common["Authorization"] = auth.token;
        //set new token as header

        try {
          const response = await axios.get(
            process.env.REACT_APP_BACKEND_URL + "orders/prescription/me"
          );

          console.log(response.data);

          console.log("Got order info after refresh token");
        } catch (error) {
          console.log(error.response.data);
        }
      }
    }

    //when the page loads it'll select the first order and show invoice

    this.handleOrderNumClick(this.state.orderDetails[0]);
  };

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

              {this.state.orderDetails.map((order) => (
                <div
                  className={
                    this.state.selectedOrderRow === order.orderNo
                      ? "Order-Numbers  pt-3 pb-2 pl-4"
                      : "pt-3 pb-2 pl-4"
                  }
                  onClick={() => this.handleOrderNumClick(order)}
                >
                  <label>Order No: {order.orderNo}</label>
                  <p style={{ cursor: "default" }}>{order.dateTime}</p>
                </div>
              ))}

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

            <MDBCol size="9" className="Invoice_Column">
              <br />
              <br />

              {/*Check if the invoice is created or not created */

              /* {this.state.invoiceStatus === "Not Created" ? (
                <div className="m-auto">
                  <img
                    className="mx-auto d-block doctor-image "
                    src={Sorry}
                    alt=""
                  />
                  {/* <h1>Sorry Your invoice isn't created yet!!</h1>*/
                /* </div>
              ) : (
                //Call the invoice component

                <div className="container-fluid">
                   <InvoicePreview medicineInfo={this.state.selectedOrderDetails.medicineDetails} sellerName={this.state.selectedOrderDetails.sellerName} sellerPhone={this.state.selectedOrderDetails.sellerPhone} customerName={this.state.selectedOrderDetails.billName} customerPhone={this.state.selectedOrderDetails.billPhone} deliveryAddress={this.state.selectedOrderDetails.billAddress} orderNo={this.state.selectedOrderDetails.orderNo} orderTime={this.state.selectedOrderDetails.dateTime} />
                </div>
              )}
            </MDBCol>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
} */

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
  
        /* this.setState({
          orderDetails: response.data.message,
          // selectedOrderDetails: response.data.message
        }); */
        setOrderDetails(response.data.message)
        console.log(response.data.message[0])
        handleOrderNumClick(response.data.message[0]);
      } catch (error) {
        console.log(error.response.data);
        if (error.response.data.error === "Please authenticate") {
          const response = await axios.post(
            process.env.REACT_APP_BACKEND_URL + "users/refresh-token",
            {
              _id: auth.userId,
            }
          );
          console.log(response.data);
          auth.token = response.data.token;
          cookies.set("token", auth.token, { path: "/", maxAge: 31536000 });
  
          axios.defaults.headers.common["Authorization"] = auth.token;
          //set new token as header
  
          try {
            const response = await axios.get(
              process.env.REACT_APP_BACKEND_URL + "orders/prescription/me"
            );
  
            console.log(response.data);
  
            console.log("Got order info after refresh token");
          } catch (error) {
            console.log(error.response.data);
          }
        }
      }
    }
    prescriptionList()

    //when the page loads it'll select the first order and show invoice
    // handleOrderNumClick(orderDetails[0]);
  }, []);
  const handleOrderNumClick = (order) => {
  // const handleOrderNumClick = () => {
    //alert(order.orderNo);
    console.log("Order Click" + order.orderNo);
    // console.log("Order Click" + orderDetails[0].orderNo);

    /* this.setState({
      selectedOrderRow: order.orderNo,
      invoiceStatus: order.invoiceStatus,
    }); */
    setSelectedOrderRow(order.orderNo)
    // setSelectedOrderRow(order.orderNo)
    setInvoiceStatus(order.invoiceStatus)
    // setInvoiceStatus(order.invoiceStatus)

    if (order.invoiceStatus === "Created") {
      console.log("function call for " + order.orderNo);
      getOrderDetails(order.orderNo);
    }
  }

  const getOrderDetails = async (orderNo) => {
    // const auth = this.context;

    axios.defaults.headers.common["Authorization"] = auth.token;

    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "orders/prescription/me/" + orderNo
      );

      console.log(response.data.message[0]);

      /* this.setState({
         selectedOrderDetails: response.data.message
      }); */
      setSelectedOrderDetails(response.data.message[0])
      // alert(this.state.selectedOrderDetails[0].sellerName)
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return <div>
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

        {orderDetails.map((order) => (
          <div
            className={
              selectedOrderRow === order.orderNo
                ? "Order-Numbers  pt-3 pb-2 pl-4"
                : "pt-3 pb-2 pl-4"
            }
            onClick={() => handleOrderNumClick(order)}
          >
            <label>Order No: {order.orderNo}</label>
            <p style={{ cursor: "default" }}>{order.dateTime}</p>
          </div>
        ))}

        <br />
        <br />
        <br />

      </MDBCol>

      <MDBCol size="9" className="Invoice_Column">
        <br />
        <br />

        {/*Check if the invoice is created or not created */}

         {invoiceStatus === "Not Created" ? (
          <div className="m-auto">
            <img
              className="mx-auto d-block doctor-image "
              src={Sorry}
              alt=""
            />
          </div>
        ) : (
          //Call the invoice component

          <div className="container-fluid">
            {selectedOrderDetails ? <InvoicePreview medicineInfo={selectedOrderDetails.medicineDetails} sellerName={selectedOrderDetails.sellerName} sellerPhone={selectedOrderDetails.sellerPhone} customerName={selectedOrderDetails.billName} customerPhone={selectedOrderDetails.billPhone} deliveryAddress={selectedOrderDetails.billAddress} orderNo={selectedOrderDetails.orderNo} orderTime={selectedOrderDetails.dateTime} /> : null}
            <br/>
            <br/>
            <br/>
            <br/>
             {/* <InvoicePreview medicineInfo={selectedOrderDetails.medicineDetails} sellerName={selectedOrderDetails.sellerName} sellerPhone={selectedOrderDetails.sellerPhone} customerName={selectedOrderDetails.billName} customerPhone={selectedOrderDetails.billPhone} deliveryAddress={selectedOrderDetails.billAddress} orderNo={selectedOrderDetails.orderNo} orderTime={selectedOrderDetails.dateTime} /> */}
          </div>
        )}
      </MDBCol>
    </div>
  </div>

  <Footer />
  </div>
}

export default MyOrders;
