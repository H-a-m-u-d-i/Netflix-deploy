import React, { useEffect, useState } from 'react'
import './Banner.css';
import axios from './axios';
import requests from './requests';

function Banner() {
  const [movie, setMovie] = useState([]);


  useEffect(() => {
      async function fetchData() {
          const request = await axios.get(requests.fetchNetflixOriginals); // this axios is the exported file called 'instance' of axios.js file which contains baseUrl....also fetchNetflixOriginals is url which is gotten from  request.js file...finally it concatnates both urls

          // console.log(request);

          setMovie(request?.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]); //this will do...by using the updater function "Setmovies" it adds the received datas from the moviedatabase to the state or -empty array "movie"...Math.random method will give as a random no 0-9 and since the request.data.results.length is 20 (movies) ..it multiply 20 by a random no...and it becomes index for request.data.results[]
          return request;
      }
      fetchData(); // since a function has to be invoked,,,we call fetchData() function here
  }, []); // since the url is not changing we dont need dependency...or the array is empty

  // console.log(movie)

  function truncate(str, n){
    return str?.length > n ? str.substr(0, n-1) + "..." : str;
  } // this is a function used to minimize description length for the movies which have long description...it takes a string and number...when str length is greater than length we gave (the no we gave) then kequtru belay yalutn asatreh be "..." tekalgn eyalnew nw

  return (
    <header
    className='banner'
    style={{
      backgroundSize: 'cover',
      backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      backgroundPosition: "center center",
    }}
    >
      <div className='banner__contents'>
        <h1 className='banner__title'>
          {movie?.title ||movie?.name || movie.original_name}
        </h1>
        <div className='banner__buttons'>
          <button className='banner__button'>Play</button>
          <button className='banner__button'>My List</button>
        </div>

        <h1 className='banner__description'>{truncate(movie?.overview, 150)}</h1>
      </div>
      
      <div className='banner__fadeBottom'/>
    </header>
  )
}

export default Banner