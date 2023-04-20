import React , { useState , useEffect , useRef , Suspense  } from 'react';
import { useParams } from 'react-router-dom';
import { APIKEY } from '../../api/MovieKey';
import MovieApi from '../../api/MovieApi';
import { Player } from 'video-react';
import { useSelector } from 'react-redux';
import { Helmet } from "react-helmet";

// CSS
import './MovieDetail.scss';
import 'video.js/dist/video-js.css';
import "video-react/dist/video-react.css";

// Components
import MovieCard from '../../components/cards/MovieCard/MovieCard';

function MovieDetail() {

    const [ movie , setMovie ] = useState("");
    const { movies } = useSelector(state => state.movies);
    const { id } = useParams();

    // For Random Movies
    const randomNum = Math.floor(Math.random() * 87);

    const fetchMovie = async () => {
        try {
            let response = await MovieApi.get(`movie/${id}?key=${APIKEY}`);
            setMovie(response.data[0]);
            // console.log(response.data[0]);
        } catch (err) { 
            console.log("Error MovieDetail :" , err);
        }
    }

  
    useEffect(() => {
        fetchMovie();
    },[id]);


  return (
    <Suspense fallback="Loading...">
    {!movie ? null :
    <section className='movie-detail-page-container'>
        <Helmet>
            <script src="video.js" type="text/javascript"></script>
            <script src="videojs.hls.min.js" type="text/javascript"></script>
        </Helmet>
        <div className='movie-detail-page-wrap'>
            <div className='movie-detail-page-poster-box'>
                <img src={movie.image} alt={movie.title} loading='lazy' />
            </div>
            <div className='movie-detail-page-content-box'>
                <strong>{movie.title}</strong>
                <p style={{ margin : "40px 0" }}>{movie.description}</p>
                <p>แนว : {movie.category}</p>
                <strong>เริ่มฉายเมื่อปี : {movie.year}</strong>
            </div>
        </div>
        <div className='movie-detail-play-wrap'>
            <span className='movie-datail-title-box'>{movie.title}</span>
            <Player 
                playsInline
                poster={movie.image}
                src={movie.source}
                // src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
            />
            {/* <video id="example-video" width={960} height={540} className="video-js vjs-default-skin" controls>
                <source
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                    type="video/mp4" />
            </video> */}
        </div>
        <div className='movie-detail-same-content-container'>
            <h1 className='movie-detail-same-content-title'>หนังที่เกี่ยวข้อง</h1>
            <div className='movie-detail-same-content-wrap'>
                {!movies.data ? null :
                    movies.data.slice(randomNum , randomNum + 12).map(movie => {
                        return (
                            <MovieCard data={movie} />
                        )
                    })
                }
            </div>
        </div>
    </section>
    }
</Suspense>
  );
};

export default MovieDetail;