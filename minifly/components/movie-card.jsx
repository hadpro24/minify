import Link from "next/link";
import { useMainStore } from "../context/MainStorePrivider";
import Button from "react-bootstrap/Button";

const priceStyle = {
  right: 16,
  bottom: 16,
  fontSize: 18,
};

const MovieCard = ({ movie }) => {
  const { addItemToCart, isItemInCart } = useMainStore();

  const isMovieInCart = isItemInCart(movie.id);
  return (
    <div className="card-film d-flex flex-column justify-content-between">
      <div className="image position-relative">
        <img src={movie.image} alt={movie.title} />
        <div
          className="position-absolute badge bg-dark bg-opacity-75"
          style={priceStyle}
        >
          $ {movie.price}
        </div>
      </div>
      <div className="text-start px-3">
        <h4 style={{ fontWeight: 500, fontSize: 16 }}>{movie.released}</h4>
        <h3>{movie.title}</h3>
      </div>
      <div className="d-flex align-items-center justify-content-between px-3 my-3">
        <Link href={`/film/${movie.id}`}>
          <a type="button" className="btn btn-outline-secondary btn-lg">
            Details
          </a>
        </Link>
        <Button
          variant="success"
          size="lg"
          disabled={isMovieInCart}
          onClick={addItemToCart.bind(null, movie)}
        >
          {!isMovieInCart && "Add to cart"}
          {isMovieInCart && "✓ Added"}
        </Button>
      </div>
    </div>
  );
};

export default MovieCard;
