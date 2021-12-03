import { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { Modal, Button } from "react-bootstrap";

function Films() {
  const [films, setFilms] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = () => {
    console.log("USER LOGGED OUT");
    localStorage.removeItem("access_token");
    Router.push("/login");
    setShow(false);
  };

  const fetch_movies = async(access) => {
      const res = await fetch("http://api.dev.com:7000/v1/films", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + JSON.parse(access),
        },
      });
      const data = await res.json();
      return data;

  }

  useEffect(async () => {
    const access = localStorage.getItem("access_token");
    if (JSON.parse(access) == null) {
      Router.push("/login");
    } else {
      const refresh = localStorage.getItem("refresh_token");

      const response = await fetch_movies(access);
      console.log("infos : ", response);
      if(response.code == 'token_not_valid'){
        // refresh token
        const res = await fetch("http://api.dev.com:7000/v1/token/refresh/", {
          method: "POST",
          body: JSON.stringify({'refresh': JSON.parse(refresh)}),
          headers: {
            "Content-Type": "application/json",
          }
        });
        const data = await res.json();
        console.log('refresh token :', data);
        const response = await fetch_movies(JSON.stringify(data["access"]));
        console.log('refech movies: ', response)
        setFilms(response.results);
        localStorage.setItem("access_token", JSON.stringify(data["access"]));
      }
      setFilms(response.results);
    }
  }, []);

  return (
    <div className="contenair">
      <div style={{ textAlign: "right" }}>
        <button className="btn btn-primary" onClick={handleShow}>
          Log out
        </button>
      </div>
      <div className="films-list">
        {films &&
          films.map((film) => (
            <div className="card-film" key={film.id}>
              <div className="image">
                <img src={film.image} alt={film.title} />
              </div>
              <div className="description">
                <h3>{film.title}</h3>
                <h5 style={{fontWeight:400}}>
                  <strong>
                    <em>Year of production : </em>
                  </strong>
                  {film.released}
                </h5>
                <div className="button-two">
                  <Link href={`/film/${film.id}`}>
                    <a
                      type="button"
                      className="button-favoir-and-details"
                    >
                      Details
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log out</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Films;
