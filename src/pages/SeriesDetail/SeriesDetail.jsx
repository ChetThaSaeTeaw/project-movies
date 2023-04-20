import React , { useState , useEffect , Suspense  } from 'react';
import { useParams } from 'react-router-dom';
import { APIKEY } from '../../api/MovieKey';
import axios from 'axios';
import { Player } from 'video-react';
import { useSelector } from 'react-redux';

// CSS
import './SeriesDetail.scss';
import "video-react/dist/video-react.css";

// Icons
import { FaPlay } from 'react-icons/fa';

// Components
import SeriesCard from '../../components/cards/SeriesCard/SeriesCard';


function SeriesDetail() {

    // const [ movie , setMovie ] = useState("");
    const [ serieDetail , setSeriesDetail ] = useState("");
    const [ episode , setEpisode ] = useState("");
    const { movies } = useSelector(state => state.movies);
    const { id } = useParams();

    const url = "https://client.iamtheme.com/api/v2";

    // For Random Serires
    const numRandom = Math.floor(Math.random() * 88);

    const fetchMovie = async () => {
        try {
            let response = await axios.get(`${url}/movie/${id}?key=${APIKEY}`);
            setSeriesDetail(response.data[0]);
            setEpisode(response.data[0].source_series[0]);
            console.log(response.data[0]);
        } catch (err) { 
            console.log("Error MovieDetail :" , err);
        }
    }

    function selectEpisode (parth) {
        setTimeout(() => {
            setEpisode(parth);
        },1000);
    }
    
    useEffect(() => {
        fetchMovie();
    },[id]);

  return (
    <Suspense fallback="Loading...">
    {!serieDetail ? null :
    <section className='series-detail-page-container'>
        <div className='series-detail-page-wrap'>
            <div className='series-detail-page-poster-box'>
                <img src={serieDetail.image} alt={serieDetail.title} loading='lazy' />
            </div>
            <div className='series-detail-page-content-box'>
                <strong>{serieDetail.title}</strong>
                <p style={{ margin : "40px 0" }}>{serieDetail.description}</p>
                <p>แนว : {serieDetail.category}</p>
                <strong>เริ่มฉายเมื่อปี : {serieDetail.year}</strong>
            </div>
        </div>
        <div className='series-detail-play-wrap'>
            <span className='series-datail-title-box'>{serieDetail.title} {episode.name}</span>
            <Player 
                playsInline
                poster={serieDetail.image}
                src={episode.url}         
                // src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
            />
            <span className='series-datail-title-box'>{serieDetail.title} ทั้งหมด {serieDetail.source_series.length} ตอน</span>
            <div className='series-detail-list-wrap'>
                {serieDetail.source_series.map(( parth , index ) => {
                    return (
                        <div className='series-detail-list-box' key={index} onClick={() => selectEpisode(parth)}>
                            <div>
                                <img src={serieDetail.image} alt={serieDetail.title} loading='lazy' />
                                <span><FaPlay /></span>
                            </div>
                            <span>{parth.name}</span>
                            <p>{serieDetail.title} {index + 1 === serieDetail.source_series.length  ? "(จบแล้ว)" : null}</p>
                        </div>
                    )
                })}
            </div>
        </div>
        <div className='series-detail-same-content-container'>
            <h1 className='series-detail-same-content-title'>ซีรีส์ที่เกี่ยวข้อง</h1>
            <div className='series-detail-same-content-wrap'>
                {!movies.data ? null :
                    movies.data.slice(numRandom , numRandom + 12).map(movie => {
                        return (
                            <SeriesCard data={movie} />
                        )
                    })
                }
            </div>
        </div>
    </section>}
</Suspense>
  );
};

export default SeriesDetail;