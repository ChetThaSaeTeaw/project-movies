import React from 'react';
import { Link } from 'react-router-dom';

// CSS
import "./MovieCard.scss";

// Icons
import { BsFillStarFill , BsPlay } from 'react-icons/bs';

function MovieCard({ data }) {
  return (
    <Link to={`/movie/${data.id}`} className='movie-card-box'>
        <div className='movie-card-poster-box'>
            <div className='movie-card-rating-box'>
                <span><BsFillStarFill /></span>
                <p>{data.score === null ? "-" : data.score.toString().substring(0 , 3)}</p>
            </div>
            <div className='movie-card-sharp-box'>
                <strong>{data.resolution}</strong>
            </div>
            <img src={data.image} alt="poster-pic" loading='lazy' />
            <div className='movie-card-overlay-box'>
                <span><BsPlay /></span>
            </div>
        </div>
        <div className='movie-card-type-box'>
            <span style={{ background : "#323232" }} >{data.type}</span>
            <span style={{ background : "var(--purpleHaze)" }}>{data.year}</span>
        </div>
        <div className='movie-card-name-box'>{data.title.length > 30 ? data.title.substring(0 , 27) + "..." : data.title }</div>
        <div className='movie-card-sound-type-box'>
                <p>{data.sound === "Thai" ? "พากย์ไทย" : "ซับไทย" }</p>
        </div>
    </Link>
  );
};

export default MovieCard;