import React , { useState } from 'react';
import { useSelector } from 'react-redux';

// Components
import ArticleCard from '../../components/cards/ArticleCard/ArticleCard';

function ArticleListing() {

    const { movies } = useSelector(state => state.movies);
    const [ expendCards , setExpendCards ] = useState(9);

  return (
    <>
        {!movies.data ? null : 
            movies.data.slice(0 , expendCards).map((movie) => {
                return (
                    <ArticleCard data={movie} />
                )
            })
        }
        <div 
            style={{
                display : 'flex',
                alignItems : 'center',
                justifyContent : 'center',
                width : '100%',
                padding : '24px'
        }}>
            <button 
                type="submit"
                onClick={() => setExpendCards(next => next + 3)}
                style={{
                    width : '165px',
                    textAlign : 'center',
                    padding : '12px 24px',
                    borderRadius : '4px',
                    color : '#fff',
                    background : 'var(--purpleHaze)',
                    border : '1px solid transparent',
                    cursor : 'pointer'
                }}
            >
                {movies.data.length > expendCards ? "อ่านเพิ่มเติม" : "แสดงทั้งหมดแล้ว" }</button>
        </div>
    </>
  );
};

export default ArticleListing;