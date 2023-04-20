import React , { useState , useEffect } from 'react';
import movieApi from '../../api/MovieApi';
import { APIKEY } from '../../api/MovieKey';
import { useDispatch } from 'react-redux';
import { addMovie } from '../../stores/Reducer';

// CSS
import "./Series.scss";

// Components
import BannerFix from '../../components/modals/Banner/BannerFix';
import SeriesListing from '../../modules/Series/SeriesListing';
import CategoryBar from '../../components/CategoryBar/CategoryBar';

// Data
import { homeData } from '../../assets/Data/HomeData';

function Home() {

  const dispatch = useDispatch();

  const fetchMovies = async () => {
    let response = await movieApi.get(`series/all?key=${APIKEY}`);

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
    <section className='series-page-container'>
        <div className='series-page-wrap'>
            <div className='series-page-banner-box'>
                <img src={homeData.bannerLists[Math.floor(Math.random() * 3)].images} alt="Banner-pic" loading='lazy' />
            </div>
            <section className='series-page-movies-container'>
                <div className='series-page-movies-wrap'>
                  <h2 style={{ margin : '12px 0' }}>หมวดหมู่ : ซีรีส์</h2>
                  <div className='serie-page-movies-box'>
                      <SeriesListing />
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