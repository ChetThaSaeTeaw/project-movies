import React , { useState , useEffect } from 'react';
import MovieApi from '../../api/MovieApi';
import { APIKEY } from '../../api/MovieKey';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

// CSS
import "../Home/Home.scss";

// Icons
import { MdArrowDropDown , MdArrowRight } from 'react-icons/md';

// Components
import BannerFix from '../../components/modals/Banner/BannerFix';
import MovieCard from '../../components/cards/MovieCard/MovieCard';
import CategoryBar from '../../components/CategoryBar/CategoryBar';

// Data
import { homeData } from '../../assets/Data/HomeData';

function CategoryHome() {

    const [ categoryTitle , setCategoryTitle ] = useState("");
    const [ movieByCate , setMovieByCate ] = useState("");
    const { id } = useParams();

    // Fetch Movies
    async function getCategoryById () {
        try {
            let response = await MovieApi.get(`movie/category/${id}?key=${APIKEY}`);
            setMovieByCate(response.data);
            // console.log(response.data);
        } catch (err) { 
            console.log("Error Category Page :" , err);
        }
    }

    // Fetch Category
    async function getCategoryTitle () {
        try {
            let response = await MovieApi.get(`movie/category/?key=${APIKEY}`);
            const title = response.data.filter(title => {
                return title.id == id;
            });
            setCategoryTitle(title[0]);
        } catch (err) {
            console.log("Error Category Page :" , err);
        }
    }

    // Pagination
    function PaginatedItems({ itemsPerPage }) {
        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = movieByCate.data.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(movieByCate.data.length / itemsPerPage);
      
        const handlePageClick = (event) => {
          const newOffset = (event.selected * itemsPerPage) % movieByCate.data.length;
          setItemOffset(newOffset);
        };
      
        return (
          <>
            {!currentItems ? null :
                currentItems.map((movie , index) => {
                    return (
                        <React.Fragment key={index}>
                            <MovieCard data={movie} />
                        </React.Fragment>
                    )
                })
            }
            <ReactPaginate
               breakLabel="..."
               nextLabel="ต่อไป >"
               previousLabel="< กลับ"
               onPageChange={handlePageClick}
               pageRangeDisplayed={5}
               pageCount={pageCount}
               renderOnZeroPageCount={null}
               containerClassName='pagination'
               pageLinkClassName='page-num'
               previousLinkClassName='page-num'
               nextLinkClassName='page-num'
               activeLinkClassName='active'
            />
          </>
        );
      }

    useEffect(() => {
        getCategoryTitle();
        getCategoryById();
    },[id]);

  return (
    <section className='home-page-container'>
        <div className='home-page-wrap'>
            <div className='home-page-banner-box'>
                <img src={homeData.bannerLists[Math.floor(Math.random() * 3)].images} alt="Banner-pic" loading='lazy' />
            </div>
            <section className='home-page-movies-container'>
                <div className='home-page-movies-wrap'>
                    <h2 style={{ margin : "12px 0" }}>หมวดหมู่ : {!categoryTitle ? null : categoryTitle.title_category }</h2>
                    <div className='home-page-movies-box'>
                        {!movieByCate ? null : <PaginatedItems itemsPerPage={12} /> }
                    </div>
                </div>
                <>
                    <CategoryBar />
                </>
            </section>
            <BannerFix />
    </div>
</section>
  )
}

export default CategoryHome;