import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./SimpleCardForm.css";

const SimpleCardForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
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
  );
};

export default SimpleCardForm;
