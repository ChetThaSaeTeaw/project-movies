import React , { useState , useEffect } from 'react';
import movieApi from '../../api/MovieApi';
import { APIKEY } from '../../api/MovieKey';
import { useDispatch } from 'react-redux';
import { addMovie } from '../../stores/Reducer';

// CSS
import "./Home.scss";

// Components
import BannerFix from '../../components/modals/Banner/BannerFix';
import MovieListing from '../../modules/Movie/MovieListing';
import CategoryBar from '../../components/CategoryBar/CategoryBar';

// Data
import { homeData } from '../../assets/Data/HomeData';

function Home() {

  const dispatch = useDispatch();

  const fetchMovies = async () => {
    let response = await movieApi.get(`movie/all?key=${APIKEY}`);

    if (!response.data) {
      console.log("Fetch Data Failed!")
    } else {
      setTimeout(() => {
        dispatch(addMovie(response.data))
      },500);
    }
  }

  useEffect(() => {
    fetchMovies();
  },[]);

  return (
    <section className='home-page-container'>
        <div className='home-page-wrap'>
            <div className='home-page-banner-box'>
                <img src={homeData.bannerLists[Math.floor(Math.random() * 3)].images} alt="Banner-pic" loading='lazy' />
            </div>
            <section className='home-page-movies-container'>
                <div className='home-page-movies-wrap'>
                  <h2 style={{ margin : '12px 0' }}>หมวดหมู่ : หนังพากย์ไทย/ซับไทย</h2>
                  <div className='home-page-movies-box'>
                      <MovieListing />
                  </div>
                </div>
                <>
                    <CategoryBar />
                </>
            </section>
            <BannerFix />
        </div>
    </section>
  );
};

export default Home;