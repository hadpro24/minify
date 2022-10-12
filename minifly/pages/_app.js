import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import "../styles/bootstrap-tweaks.css";
import "../styles/prettify.css";
import "../styles/default.css";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.min.css";
import "../styles/main.css";
import MainStoreContextProvider from "../context/MainStorePrivider";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Flip, ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  return (
    <MainStoreContextProvider>
      <PayPalScriptProvider
        options={{
          "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
          currency: "USD",
        }}
      >
        <Component {...pageProps} />
        <ToastContainer
          position="top-center"
          theme="colored"
          transition={Flip}
        />
      </PayPalScriptProvider>
    </MainStoreContextProvider>
  );
}

export default MyApp;
