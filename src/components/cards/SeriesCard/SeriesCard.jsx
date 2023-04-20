import React from 'react';
import { Link } from 'react-router-dom';

// CSS
import "./SeriesCard.scss";

// Icons
import { BsFillStarFill , BsPlay } from 'react-icons/bs';

function SeriesCard({ data }) {
  return (
    <Link to={`/series/${data.id}`} className='series-card-box'>
        <div className='series-card-poster-box'>
            <div className='series-card-rating-box'>
                <span><BsFillStarFill /></span>
                <p>{data.score === null ? "-" : data.score.toString().substring(0 , 3)}</p>
            </div>
            <div className='series-card-sharp-box'>
                <strong>{data.resolution}</strong>
            </div>
            <img src={data.image} alt="poster-pic" loading='lazy' />
            <div className='series-card-overlay-box'>
                <span><BsPlay /></span>
            </div>
        </div>
        <div className='series-card-type-box'>
            <span style={{ background : "#323232" }} >{data.type}</span>
            <span style={{ background : "var(--purpleHaze)" }}>{data.year}</span>
        </div>
        <div className='series-card-name-box'>{data.title.length > 30 ? data.title.substring(0 , 27) + "..." : data.title}</div>
        <div className='series-card-sound-type-box'>
            <p>{data.sound === "Thai" ? "พากย์ไทย" : "ซับไทย" }</p>
        </div>
    </Link>
  );
};

export default SeriesCard;