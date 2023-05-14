import React, {useEffect, useState} from 'react'
import anime from 'animejs/lib/anime.es.js';
import './creditCard.css'
import  { Circles }  from 'react-loader-spinner';

class CreditCard extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
      cardNumber: "0000000000000000",
      cardHolderName: "",
      cardExpirationDate: "",
      cardCVV: "",
      cardType: "💳"
    };
    flipCard = () => {
      anime({
        targets: ".credit-card-inner",
        rotateY: "180deg",
        duration: "100",
        easing: "linear"
      });
    };
    unFlipCard = () => {
      anime({
        targets: ".credit-card-inner",
        rotateY: "360deg",
        duration: "100",
        easing: "linear"
      });
    };
    setCardType = type => {
      this.setState({ cardType: type });
    };
    checkSubstring = (length, match) => {
      return this.state.cardNumber.substring(0, length) === match;
    };
    setNumber = e => {
      const cardNumber = e.target.value;
      this.setState({ cardNumber }, () => {
        const { cardNumber } = this.state;
        if (cardNumber[0] === "4") {
          this.setCardType("Visa");
        } else if (this.checkSubstring(4, "6011")) {
          this.setCardType("Discover");
        } else if (this.checkSubstring(2, "51")) {
          this.setCardType("MasterCard");
        } else if (this.checkSubstring(2, "34")) {
          this.setCardType("American Express");
        } else if (this.checkSubstring(3, "300")) {
          this.setCardType("Diners Club");
        } else if (this.checkSubstring(2, "35")) {
          this.setCardType("JCB");
        } else {
          this.setCardType("💳");
        }
      });
    };
    setName = e => {
      const cardHolderName = e.target.value.toUpperCase();
      this.setState({ cardHolderName });
    };
    setDate = e => {
      let data = (e.target.value).split("");
      console.log(data)
      let cardExpirationDate = (data.map((x) => {
        return x === "-" ? "/" : x
      })).join("");
      console.log(cardExpirationDate)
      this.setState({ cardExpirationDate });
    };
    setCVV = e => {
      const cardCVV = e.target.value;
      this.setState({ cardCVV });
    };
    
    handlePay = (event) => {
        
        event.preventDefault();
       
        // Call the function passed as a prop to send the credit card information back to the parent component
        this.props.handleCreditCardInfo(this.state);
      }
    render() {
      const {
        cardNumber,
        cardHolderName,
        cardExpirationDate,
        cardCVV,
        cardType
      } = this.state;
      return (
        <div className="container">
          <h1>Complete Your Payment</h1>
          <div className="credit-card">
            <div className="credit-card-inner">
              <div className="credit-card-front">
                
                <div id="card-type">{cardType}</div>
                <div id="card-number">{cardNumber}</div>
  
                <div id="card-expiration">
                  {cardExpirationDate !== "" && <div id="validthru">Valid Thru</div>}
                  {cardExpirationDate}
                </div>
  
                <div id="card-holder-name">{cardHolderName}</div>
              </div>
              <div className="credit-card-back">
                <div className="card-stripe" />
                <div className="card-sig-container">
                  <div className="signature">{cardHolderName}</div>
                  CVC {cardCVV}
                </div>
                
              </div>
            </div>
          </div>
          <div className="card-form">
            <label className="input-label">Credit Card Number</label>
            <input
              placeholder="Enter your credit card number"
              options={{ creditCard: true }}
              id="number-input"
              name="number-input"
              className="text-input"
              maxLength="16"
              onChange={this.setNumber}
              type='text'
            />
            <label className="input-label">Card Holder Name</label>
            <input
              type="text"
              placeholder="Enter card holder name"
              value={cardHolderName}
              onChange={e => this.setName(e)}
              className="text-input"
              maxLength="30"
            />
            <div className="date-and-csv" style={{ display: "flex" }}>
              <div
                style={{ display: "flex", flexDirection: "column", width: "50%" }}
              >
                <label className="input-label">
                  Expiration Date
                </label>
                <input
                  type="number"
                  placeholder="Enter expiration date"
                  className="text-input"
                  onChange={e => this.setDate(e)}
                  style={{ height: "23px", fontSize: "16px", fontWeight: "100" }}
                />
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", width: "50%" }}
              >
                <label className="input-label">CVC Security Code</label>
                <input
                  options={{
                    numeral: "true"
                  }}
                  placeholder="Enter CVC"
                  maxLength="3"
                  value={cardCVV}
                  className="text-input"
                  onChange={e => this.setCVV(e)}
                  onFocus={this.flipCard}
                  onBlur={this.unFlipCard}
                />
              </div>
              
            </div>
            <div className="editProfile__profile-info-editing">
          {!this.props.waitPayment && <button onClick={this.handlePay}>Pay Now!</button>}
          <div>
          {this.props.message.length == 0 && (
            <button disabled>
             <Circles color="#fff" />
            </button>
          )}
          </div>
          <p>{this.props.message}</p>
        </div>
          </div>
        </div>
      );
    }
  }
  
export default CreditCard;