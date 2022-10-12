import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import "../styles/bootstrap-tweaks.css";
import "../styles/prettify.css";
import "../styles/default.css";
import "../styles/globals.css";
import "../styles/main.css";
import MainStoreContextProvider from "../context/MainStorePrivider";

function MyApp({ Component, pageProps }) {
  return (
    <MainStoreContextProvider>
      <Component {...pageProps} />
    </MainStoreContextProvider>
  );
}

export default MyApp;
