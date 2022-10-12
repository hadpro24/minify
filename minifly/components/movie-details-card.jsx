import { Button, Col } from "react-bootstrap";
import { useMainStore } from "../context/MainStorePrivider";

const MovieDetailsCard = ({ movie }) => {
  const { addItemToCart, isItemInCart } = useMainStore();
  const isMovieInCart = isItemInCart(movie.id);

  return (
    <div className="card-film-detail">
      <Col md="12" lg="8">
        <div className="description p-4 pe-5 d-flex flex-column">
          {movie && (
            <div>
              <h3 className="fw-bold">{movie.title}</h3>
              <p className="mb-3">{movie.description}</p>
              <h5 className="fw-500 border-bottom d-flex justify-content-between pb-2">
                <span>Year of production</span>
                {movie.released}
              </h5>
              <h5 className="fw-500 border-bottom d-flex justify-content-between pb-2">
                <span>Runtime</span>
                {movie.runtime}
              </h5>
              <h5 className="fw-500 border-bottom d-flex justify-content-between pb-2">
                <span>Country</span>
                {movie.country}
              </h5>
              <h5 className="fw-500 border-bottom d-flex justify-content-between pb-2">
                <span>Rated</span>
                {movie.rated}
              </h5>
            </div>
          )}
          <div className="mt-4">
            <Button
              variant="success"
              size="lg"
              disabled={isMovieInCart}
              onClick={addItemToCart.bind(null, movie)}
            >
              {!isMovieInCart && "Add to cart"}
              {isMovieInCart && "✓ Added to cart"}
            </Button>
          </div>
        </div>
      </Col>
      <Col
        md="12"
        lg="4"
        className="image-detail"
        aria-label={movie.title}
        style={{
          backgroundImage: `url(/${movie.image})`,
          minHeight: 300,
        }}
      />
    </div>
  );
};

export default MovieDetailsCard;
