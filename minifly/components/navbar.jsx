import { Button, Container, Modal, Navbar } from "react-bootstrap";
import dynamic from "next/dynamic";
import LoadingComponent from "/components/loading";
import { useState } from "react";
import { useMainStore } from "../context/MainStorePrivider";
import { isClient } from "../helpers";
import Link from "next/link";

const CartModal = dynamic(() => import("/components/cart-modal"), {
  loading: LoadingComponent,
  ssr: false,
});

const LogoutModal = dynamic(() => import("/components/logout-modal"), {
  loading: LoadingComponent,
  ssr: false,
});

const TopNavbar = ({ backToHomeBtn }) => {
  const [showCartModal, setShowCartModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { cartLength } = useMainStore();

  return (
    <>
      <Navbar
        bg="light"
        style={{ borderTop: "none" }}
        fixed="top"
        className="border-bottom"
      >
        <Container>
          <Link href="/">
            <Navbar.Brand
              className="fw-bold cursor-pointer"
              style={{ fontSize: 24 }}
            >
              {!backToHomeBtn && "Minify"}
              {backToHomeBtn && <>&lt; Back</>}
            </Navbar.Brand>
          </Link>
          <div className="py-2">
            <Button
              variant="outline-primary"
              size="lg"
              className="me-4"
              onClick={setShowCartModal.bind(null, true)}
              disabled={!cartLength}
            >
              Cart <span className="badge bg-primary">{cartLength}</span>
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={setShowLogoutModal.bind(null, true)}
            >
              Log out
            </Button>
          </div>
        </Container>
      </Navbar>

      {showCartModal && (
        <CartModal
          show={showCartModal}
          handleClose={setShowCartModal.bind(null, false)}
        />
      )}

      {showLogoutModal && (
        <LogoutModal
          show={showLogoutModal}
          handleClose={setShowLogoutModal.bind(null, false)}
        />
      )}
    </>
  );
};

export default TopNavbar;
