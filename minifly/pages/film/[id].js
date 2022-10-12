import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchSingleMovie } from "/services";
import { isClient } from "/helpers";
import { Col, Container, Row } from "react-bootstrap";
import dynamic from "next/dynamic";
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
  // const [access, setAcess] = useState("");
  const [film, setFilm] = useState({});
  const accessToken = isClient() && localStorage.getItem("access_token");
  const router = useRouter();
  const { id: movieId } = router.query;

  // useEffect(() => {
  //   if (!JSON.parse(accessToken)) {
  //     router.replace("/login");
  //   }
  // }, []);

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
    // <div className="contenair">
    //   <div className="films-list">

    //   </div>
    // </div>
  );
};

export default Film;
