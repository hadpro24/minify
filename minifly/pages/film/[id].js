import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetchMovies, fetchSingleMovie } from "../../services";
import { isClient } from "../../helpers";
import { Button, Col, Container, Row } from "react-bootstrap";
import TopNavbar from "../../components/navbar";
import { useMainStore } from "../../context/MainStorePrivider";

const Film = () => {
  // const [access, setAcess] = useState("");
  const [film, setFilm] = useState({});
  const accessToken = isClient() && localStorage.getItem("access_token");
  const router = useRouter();
  const { id: movieId } = router.query;

  const { addItemToCart, isItemInCart } = useMainStore();
  const isMovieInCart = isItemInCart(film.id);

  // useEffect(() => {
  //   if (!JSON.parse(accessToken)) {
  //     router.replace("/login");
  //   }
  // }, []);

  useEffect(() => {
    fetchSingleMovie({ movieId, accessToken }).then((movie) =>
      setFilm(movie ? movie : {})
    );
  }, []);

  console.log({ film });

  return (
    <Container className="py-5">
      <Row>
        <Col className="mb-5">
          <TopNavbar backToHomeBtn />
        </Col>
      </Row>
      <Row className="g-5 mt-0">
        <Col>
          <div className="card-film-detail">
            <Col md="12" lg="8">
              <div className="description p-4 pe-5 d-flex flex-column">
                {film && (
                  <div>
                    <h3 className="fw-bold">{film.title}</h3>
                    <p className="mb-3">{film.description}</p>
                    <h5 className="fw-500 border-bottom d-flex justify-content-between pb-2">
                      <span>Year of production</span>
                      {film.released}
                    </h5>
                    <h5 className="fw-500 border-bottom d-flex justify-content-between pb-2">
                      <span>Runtime</span>
                      {film.runtime}
                    </h5>
                    <h5 className="fw-500 border-bottom d-flex justify-content-between pb-2">
                      <span>Country</span>
                      {film.country}
                    </h5>
                    <h5 className="fw-500 border-bottom d-flex justify-content-between pb-2">
                      <span>Rated</span>
                      {film.rated}
                    </h5>
                  </div>
                )}
                <div className="mt-4">
                  <Button
                    variant="success"
                    size="lg"
                    disabled={isMovieInCart}
                    onClick={addItemToCart.bind(null, film)}
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
              aria-label={film.title}
              style={{
                backgroundImage: `url(/${film.image})`,
                minHeight: 300,
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
    // <div className="contenair">
    //   <div className="films-list">

    //   </div>
    // </div>
  );
};

export default Film;
