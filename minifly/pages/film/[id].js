import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchSingleMovie } from "/services";
import { Col, Container, Row } from "react-bootstrap";
import dynamic from "next/dynamic";
import { useMainStore } from "../../context/MainStorePrivider";
const TopNavbar = dynamic(() => import("/components/navbar"), {
  ssr: false,
});
const MovieDetailsCard = dynamic(
  () => import("/components/movie-details-card"),
  {
    ssr: false,
  }
);

const Film = () => {
  const [film, setFilm] = useState({});
  const { accessToken } = useMainStore();
  const router = useRouter();
  const { id: movieId } = router.query;

  useEffect(() => {
    if (!accessToken) {
      router.replace("/login");
    }
  }, [accessToken]);

  useEffect(() => {
    fetchSingleMovie({ movieId, accessToken }).then((movie) =>
      setFilm(movie ? movie : {})
    );
  }, [movieId, accessToken]);

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
          <MovieDetailsCard movie={film} />
        </Col>
      </Row>
    </Container>
  );
};

export default Film;
