import React , { useState , useEffect , Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { APIKEY } from '../../api/MovieKey';
import MovieApi from '../../api/MovieApi';

// CSS
import "./ArticleTemplate.scss";

// Data
import { movies_article } from '../../assets/Data/ArticleData.json';


function ArticleTemplate() {
    const [ articleData , setArticleData ] = useState("");
    const { id } = useParams();
    const myArticleData = movies_article.filter(data => { return data.id == id });

    async function fetchMoviesData () {
        try {
            let response = await MovieApi.get(`movie/${id}?key=${APIKEY}`);
            setArticleData(response.data[0]);
            console.log(response.data[0]);
        } catch (err) {
            console.log("Error Article Template :" , err);
        }
    }

    useEffect(() => {
        fetchMoviesData();
    },[id]);

  return (
    <Suspense fallback="Loading...">
        <section className='article-template-container'>
            {!articleData ? "Loading..." :
                <div className='article-template-wrap'>
                    <div className='article-template-wallpaper-box' style={{ background : `url(${myArticleData[0].wallpaperUrl})`}}>
                        <h2>{articleData.title}</h2>
                        <h4>{articleData.slug_title}</h4>
                    </div>
                    <div className='article-template-detail-box'>
                        <div className='article-template-detail-poster-box'>
                            <img src={articleData.image} alt="poster-pic" loading='lazy' />
                        </div>
                        <div className='article-template-detail-content-box'>
                            <h2>เกี่ยวกับหนัง</h2>
                            <p>ประเภท : {articleData.category}</p>
                            <p>ผู้กำกับ : -</p>
                            <p>เริ่มฉายปี : {articleData.year}</p>
                            <p>ความยาว : -</p>
                            <p>คะแนน : {articleData.score === null ? "-" : articleData.score.toString().substring(0 , 3) / 10 }</p>
                        </div>
                    </div>
                    <div className='article-template-content-box'>
                        <h3>"เรื่องย่อ {articleData.description}"</h3>
                        <p style={{ width : "100%" , textAlign : "center" , textIndent : "0" }}>ตัวอย่าง เรื่อง{articleData.title}</p>
                        <iframe  src={`https://www.youtube.com/embed/${myArticleData[0].shortVideo}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        <h2>รีวิว {articleData.title}</h2>
                        {/* <p>{articleData.content_4}</p>
                        <strong>{articleData.content_5}</strong> */}
                    </div>
                </div>
            }
        </section>
    </Suspense>
  );
};

export default ArticleTemplate;