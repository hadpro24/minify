import {useState, useEffect} from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Router from "next/router";

const Film = () => {
  const router = useRouter()
  const { id } = router.query

  const [access, setAcess] = useState("");
  const [film, setFilm] = useState({})

  useEffect(async() => {
      const access = localStorage.getItem("access_token");
      if(JSON.parse(access) == null){
          Router.push('/login')
      }
      const res = await fetch('http://api.dev.com:7000/v1/films/'+id, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+JSON.parse(access),
          },
      })
      const film = await res.json()
      console.log(film)
      setFilm(film)
  }, [])

  return (
    <div className="contenair">  
      <div className="films-list">
        <div className="card-film-detail">
            <div className="description">
              <Link href={'/'}>
                  <a className="stext-109">
                    Home
                  </a>
              </Link>
              {
                film && <>
                  <h3>{film.title}</h3>
                  <h5><strong><em>Year of production : </em></strong>{film.released}</h5>
                  <h5><strong><em>Runtime : </em></strong>{film.runtime}</h5>
                  <h5><strong><em>Country : </em></strong>{film.country}</h5>
                  <h5><strong><em>Rated : </em></strong>{film.rated}</h5>
                  <h5><strong><em>Description : </em></strong>{film.description}</h5>
                </>
              }

            </div>
            <div className="image-detail">
            { film &&
              <img 
                  src={film.image} 
                  alt={film.title}/>
            }
            </div>
        </div>
      </div>
    </div>
  )
}


export default Film
