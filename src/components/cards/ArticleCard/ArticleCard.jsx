import React from 'react';
import { Link } from 'react-router-dom';
import "./ArticleCard.scss";

function ArticleCard({ data }) {
  // console.log(data);
  return (
    <Link to={`/review/${data.id}`} className='article-card-box'>
        <div className='article-card-poster-box'>
            <img src={data.image} alt={data.title} loading='lazy' />
        </div>
        <div className='article-card-content'>
            <h2>รีวิว {data.title}</h2>
            <p>อ่านเพิ่มเติม</p>
            <p>{data.year}</p>
        </div>
    </Link>
  );
};

export default ArticleCard;