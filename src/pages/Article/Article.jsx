import React , { useState , useEffect } from 'react';
import { APIKEY } from '../../api/MovieKey';
import { useDispatch } from 'react-redux';
import { addMovie } from '../../stores/Reducer';
import movieApi from '../../api/MovieApi';
import "./Article.scss";

// Components
import ArticleListing from '../../modules/Article/ArticleListing';
import ArticleCarousel from '../../components/carousels/ArticleCarousel';


function Article() {

  const dispatch = useDispatch();

  async function fetchContentData () {
    let response = await movieApi.get(`movie/all?key=${APIKEY}`);

    if (!response.data) {
      console.log("Fetch Data Error!");
    } else {
      setTimeout(() => {
        dispatch(addMovie(response.data));
      },500);
    }
  }

  useEffect(() => {
    fetchContentData();
  },[]);


  return (
    <section className='article-page-container'>
        <div className='article-page-wrap'>
            <div className='article-page-carousel-wrap'>
              <ArticleCarousel />
            </div>
            <h1>รีวิวหนังใหม่</h1>
            <p>เว็บรีวิวหนัง รีวิวหนังใหม่ ตัวอย่างหนัง อัพเดทรีวิวหนังใหม่ ปี 2023</p>
            <div className='article-page-card-wrap'>
              <ArticleListing />
            </div>
        </div>
    </section>
  );
};

export default Article;