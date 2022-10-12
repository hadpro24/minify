import { useRouter } from "next/router";
import { Modal, Button } from "react-bootstrap";
import { useMainStore } from "../context/MainStorePrivider";

export default function LogoutModal({ show, handleClose }) {
  const router = useRouter();
  const { updateTokens } = useMainStore();
  const handleConfirmLogout = () => {
    console.log("USER LOGGED OUT");
    updateTokens(null);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Log out</Modal.Title>
      </Modal.Header>
      <Modal.Footer
        style={{
          borderTop: "none",
          paddingTop: 48,
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="outline-danger"
          size="lg"
          onClick={handleConfirmLogout}
        >
          Confirm
        </Button>
        <Button variant="secondary" size="lg" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
