import { useCallback, useEffect, useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { showErrorAlert, showSuccesAlert } from "/helpers";
import { useMainStore } from "../context/MainStorePrivider";
import { createOrder } from "../services";

const PaypalForm = ({ orderId, currency = "USD", refresh, closeCartModal }) => {
  const [isBtnInit, setIsBtnInit] = useState(false);
  const {
    cartTotal: totalAmount,
    cartItems,
    clearCart,
    accessToken,
  } = useMainStore();

  const [{ isResolved }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    setIsBtnInit(false);

    dispatch({
      type: "resetOptions",
      value: {
        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        currency,
        locale: "en_US",
      },
    });
  }, [currency, refresh, totalAmount]);

  // creates a paypal order
  const handleCreateOrder = useCallback(
    async (data, actions) => {
      // post cart order to API and get the orderId
      const orderId = await createOrder({
        accessToken,
        items: cartItems.map((item) => item.id),
      });

      console.log({ orderId });

      console.log({ data });
      return actions.order
        .create({
          purchase_units: [
            {
              amount: {
                currency_code: currency,
                value: totalAmount,
              },
              custom_id: orderId,
            },
          ],

          application_context: {
            brand_name: "Minifly Movies",
            shipping_preference: "NO_SHIPPING",
          },
        })
        .then((transactionId) => {
          return transactionId;
        });
    },
    [orderId, totalAmount, currency]
  );

  // handles when a payment is confirmed by paypal
  const handleApprove = (data, actions) => {
    return actions.order.capture().then(function (transaction) {
      clearCart();
      closeCartModal();
      showSuccesAlert({
        msg: "Payment processed successfully !",
        autoClose: 10000,
      });
    });
  };

  // handles when a payment is canceled
  const handleCancel = (data, actions) => {
    showErrorAlert({ msg: "Payment canceled" });
  };

  const handleError = () => {};

  return isResolved ? (
    <>
      <PayPalButtons
        style={{
          color: "blue",
          shape: "rect",
          label: "pay",
          layout: "horizontal",
          height: 48,
          padding: "16px",
        }}
        createOrder={handleCreateOrder}
        onApprove={handleApprove}
        onCancel={handleCancel}
        onError={handleError}
        forceReRender={refresh}
        onInit={setTimeout(setIsBtnInit.bind(null, true), 100)}
      />
      {!isBtnInit && (
        <div
          className="position-absolute w-100"
          style={{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "var(--sdt-bg-gray)",
            zIndex: 110,
          }}
        ></div>
      )}
    </>
  ) : (
    <div
      className="flex-center h-100 text-secondary text-center"
      style={{
        minWidth: 150,
      }}
    >
      <div className="spinner-border spinner-border-sm" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default PaypalForm;
