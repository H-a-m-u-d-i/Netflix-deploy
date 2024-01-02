import React, { useEffect, useState } from 'react'
import './Row.css'
import axios from './axios';
import YouTube from "react-youtube"
import movieTrailer from "movie-trailer";

const base_url = "http://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl,isLargeRow}) {
    const [movies, setMovies] = useState([]);

    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl); // this axios is the exported file called instance of axios.js file which contains baseUrl....also fetchUrl is gotten from  request.js file...finally it concatnates both urls

            // console.log(request);

            setMovies(request.data.results); //this will do...by using the updater function "Setmovies" it adds the received datas from the moviedatabase to the state or -empty array "movies"
            return request;
        }
        fetchData();
    }, [fetchUrl]); // fetchurl is dependency...whenever the fetchurl is changed the program will run again and again...request again

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    }; 
    // this will do...autoplay the trailer 

    // console.log(movies);

    const handleClick=(movie) => {
        if(trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name).then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
            })
            .catch((error) => console.log(error));
        }
    };


  return (
    <div className="row">
        <h1>{title}</h1>
        <div className="row__posters"> {/* this class name style is based on the BEM standard*/} 
            
            {movies.map((movie) => (
                <img
                    // key={movie.id}
                    onClick={() => handleClick(movie)}
                    className= {`row__poster ${isLargeRow && "row__posterLarge"}`} /* isLargeRow is always true so row__posterLarge class will be added */

                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} /* watermark yelelew just thumbnale image bcha lemadreg..except netflix originals */

                    alt={movie.name}
                    />
            ))}
        </div>
        <div style={{padding: "40px"}}>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} 
        </div> 
    </div>
  )
}

export default Row