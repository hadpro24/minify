import { Button } from "react-bootstrap";
import { useMainStore } from "../context/MainStorePrivider";

const CartItem = ({ movie }) => {
  const { removeItemFromCart } = useMainStore();

  return (
    <li className="d-flex mb-3">
      <div className="me-3">
        <img
          src={`/${movie.image}`}
          alt={movie.title}
          width={50}
          height={50}
          className="rounded border border-2"
        />
      </div>
      <div className="flex-fill">
        <div className="fw-semibold d-flex align-items-center">
          <span className="flex-fill">{movie.title}</span>
        </div>
        <div className="fw-bold text-secondary"> $ {movie.price}</div>
      </div>
      <button className="btn" onClick={removeItemFromCart.bind(null, movie.id)}>
        &times;
      </button>
    </li>
  );
};

export default CartItem;
