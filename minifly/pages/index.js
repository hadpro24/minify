import { useState, useEffect } from "react";
import Router from "next/router";
import { Modal, Button, Row, Container, Col } from "react-bootstrap";
import MovieCard from "../components/movie-card";
import TopNavbar from "../components/navbar";
import { fetchMovies } from "../services";

function Films() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetchMovies().then((data) => {
      setFilms(
        data.map((movie) => ({
          id: movie.pk,
          ...movie.fields,
        }))
      );
    });
  }, []);

  // useEffect(async () => {
  //   const access = localStorage.getItem("access_token");
  //   if (JSON.parse(access) == null) {
  //     Router.push("/login");
  //   } else {
  //     const refresh = localStorage.getItem("refresh_token");

  //     const response = await fetchMovies(access);
  //     const data = await response.json()
  //     console.log("infos : ", data, response);
  //     if(data.code == 'token_not_valid'){
  //       // refresh token
  //       const res = await fetch("http://api.dev.com:7000/v1/token/refresh/", {
  //         method: "POST",
  //         body: JSON.stringify({'refresh': JSON.parse(refresh)}),
  //         headers: {
  //           "Content-Type": "application/json",
  //         }
  //       });
  //       const data = await res.json();
  //       localStorage.setItem("access_token", JSON.stringify(data["access"]));
  //       console.log('refresh token :', data);
  //       const response = await fetchMovies(JSON.stringify(data["access"]));
  //       console.log('refech movies: ', response);
  //       let data = await response.json()
  //       setFilms(data.results);
  //     }
  //     if(response.status !== 200){
  //       Router.push("/login");
  //     }
  //     setFilms(data.results);
  //   }
  // }, []);

  return (
    <Container className="py-5">
      <Row>
        <Col className="mb-5">
          <TopNavbar />
        </Col>
      </Row>
      <Row className="g-5 mt-0">
        {films &&
          films.map((film) => (
            <Col key={film.id} md="6" lg="4">
              <MovieCard movie={film} />
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default Films;
