import { Modal, Button, Alert } from "react-bootstrap";
import { useMainStore } from "../context/MainStorePrivider";
import CartItem from "./cart-item";

export default function CartModal({ show, handleClose, handleConfirm }) {
  const { cartItems, cartTotal, cartLength } = useMainStore();

  console.log({ cartItems });
  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>My cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!!cartLength && (
          <ul className="p-0 m-0">
            {cartItems.map((item) => (
              <CartItem key={item} movie={item} />
            ))}
            <li
              className="d-flex justify-content-between pt-3"
              style={{ borderTop: "thin #dee2e6 dashed" }}
            >
              <span className="fw-semibold">Total</span>
              <span className="fw-bold text-success">$ {cartTotal}</span>
            </li>
          </ul>
        )}
        {!cartLength && (
          <Alert variant="info" className="text-center py-4 fw-semibold">
            Votre panier est vide
          </Alert>
        )}
      </Modal.Body>
      {!!cartLength && (
        <Modal.Footer className="justify-content-between">
          <Button variant="outline-secondary" size="lg" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" size="lg" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
}
