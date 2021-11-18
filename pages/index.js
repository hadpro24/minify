import {useState, useEffect} from 'react';
import Router from 'next/router';
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { Modal, Button } from 'react-bootstrap';

function Films() {

  const [films, setFilms] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(async() => {
      const access = localStorage.getItem("access_token");
      if(JSON.parse(access) == null){
          Router.push('/login')
      }else{
        const access = localStorage.getItem("access_token");
        const res = await fetch('http://api.dev.com:7000/films', {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+JSON.parse(access),
            },
        })
        const films = await res.json()
        console.log('what *******', films)
        setFilms(films.results);
      }
  }, [])

  return (
      <div className="contenair">
        <div style={{'textAlign':'right'}}>
          <a className="btn btn-primary" onClick={handleShow}>Log out</a>
        </div>
        <div className="films-list">
          {films && films.map((film) => (
            <div className="card-film" key={film.id}>
               <div className="image">
                  <img 
                      src={film.image} 
                      alt={film.title}/>
                </div>
                <div className="description">
                  <h3>{film.title}</h3>
                  <h5><strong><em>Year of production : </em></strong>{film.released}</h5>
                  <div className="button-two">
                    <Link href={`/film/${film.id}`}>
                      <a type="button" className="button-favoir-and-details" href={film.url}>Details</a>
                    </Link>
                  </div>
                </div>
            </div>
          ))}
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
  )
}


export default Films;
