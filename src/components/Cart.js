import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";


export default class Cart extends Component {
    // Constructor
    constructor(props) { 
        super(props);
        this.state = {
          name: "",
          phone: "",
          address: "",
          showCheckout: false,
        };
      }
      
    //Handle Input
    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }; 

    // Create oreder Function 
    createOrder = (e) => {
        e.preventDefault();
        const order = {
          name: this.state.name,
          phone: this.state.phone,
          address: this.state.address,
          DeliveryMethod:this.state.DeliveryMethod,
          PaymentMethod:this.state.PaymentMethod,

          cartItems: this.props.cartItems,
        };
        this.props.createOrder(order);
      };

    //Render Function     
    render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} in the cart{" "}
          </div>
        )}
        <div>
          <div className="cart">
              <Fade left cascade>
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title}></img>
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      {formatCurrency(item.price)} x {item.count}{" "}
                      <button
                        className="button"
                        onClick={() => this.props.removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            </Fade>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total:{" "}
                    {formatCurrency(
                      cartItems.reduce((a, c) => a + c.price * c.count, 0)
                    )}
                  </div>
                  <button
                    onClick={() => {
                      this.setState({ showCheckout: true });
                    }}
                    className="button primary"
                  >
                    Proceed
                  </button>
                </div>
              </div>
              {this.state.showCheckout && (
                <Fade right cascade>
                  <div className="cart">
                  <form onSubmit={this.createOrder}>
                    <ul className="form-container">
                      <li>
                        <label>Name</label>
                        <input
                          name="name"
                          type="text"
                          required
                          onChange={this.handleInput}
                        ></input>
                      </li>
                      <li>
                        <label>Address</label>
                        <input
                          name="address"
                          type="text"
                          required
                          onChange={this.handleInput}
                        ></input>
                      </li>
                      <li>
                        <label>Phone Number</label>
                        <input
                          name="phone"  
                          type="number"
                          required
                          onChange={this.handleInput}
                        ></input>
                      </li>
                      <li>
                        <label>Delivery Method</label>
                        <select
                          name="DeliveryMethod"
                          type="text"
                          required
                          onChange={this.handleInput}
                        >
                          <option selected></option>
                          <option value="Take Away">Take Away</option>
                          <option value="Delivery">Delivery</option>
                        </select>
                      </li>
                      <li>
                        <label>Payment Method</label>
                        <select
                          name="PaymentMethod"
                          type="text"
                          required
                          onChange={this.handleInput}
                        >
                          <option selected></option>
                          <option value="CashonDelivery">Cash on Delivery</option>
                          <option value="CardPayment">Card Payment</option>
                        </select>
                      </li>
                      <li>
                        <button className="button primary" type="submit">
                          Checkout
                        </button>
                      </li>
                    </ul>
                  </form>
                </div>
                </Fade>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}  