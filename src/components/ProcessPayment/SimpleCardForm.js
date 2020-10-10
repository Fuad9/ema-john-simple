import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./SimpleCardForm.css";

const SimpleCardForm = ({ handlePayment }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(null);
    } else {
      setPaymentSuccess(paymentMethod.id);
      setPaymentError(null);
      handlePayment(paymentMethod.id);
    }
  };

  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "#fff",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#fce883" },
        "::placeholder": { color: "#87bbfd" },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee",
      },
    },
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset className="FormGroup">
          <div className="FormRow">
            <form action="">
              <label htmlFor="input">Name</label>
              <input
                type="text"
                options={CARD_OPTIONS}
                className="StripeElement"
                placeholder=""
              />
            </form>
            <CardElement options={CARD_OPTIONS} />
            <button type="submit" disabled={!stripe}>
              Pay
            </button>
          </div>
        </fieldset>
      </form>
      {paymentError && <p style={{ color: "red" }}>{paymentError}</p>}
      {paymentSuccess && (
        <p style={{ color: "green" }}>Your payment completed successfully</p>
      )}
    </>
  );
};

export default SimpleCardForm;
