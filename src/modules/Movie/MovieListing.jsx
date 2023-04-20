import React , { useState , useEffect , Suspense } from 'react';
// import { useSelector } from 'react-redux';
import axios from 'axios';
import { APIKEY } from '../../api/MovieKey';
import ReactPaginate from 'react-paginate';

// CSS
import "./MovieListing.scss";
import "./Pagination.scss";

// Components
import MovieCard from '../../components/cards/MovieCard/MovieCard';


function MovieListing() {

    // const { movies } = useSelector(state => state.movies);
    const [ movies , setMovies ] = useState("");

    const url = "https://client.iamtheme.com/api/v2";

    async function fetchMovieData () {
      try { 
        let response = await axios.get(`${url}/movie/all?key=${APIKEY}`);
        setMovies(response.data);
        // console.log(response.data);
      } catch (err) {
        console.log("Movie Listing Error :" , err);
      }
    }

    function PaginatedItems({ itemsPerPage }) {
      const [itemOffset, setItemOffset] = useState(0);
      const endOffset = itemOffset + itemsPerPage;
      const currentItems = movies.data.slice(itemOffset, endOffset);
      const pageCount = Math.ceil(movies.data.length / itemsPerPage);
    
      const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % movies.data.length;
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
             nextLabel="ต่อไป"
             previousLabel="กลับ"
             onPageChange={handlePageClick}
             pageRangeDisplayed={2}
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
      fetchMovieData();
    },[]);

  return (
    <Suspense fallback="Loading...">
      {!movies ? null :
        <section className='movie-listing-container'>
          <div className='movie-listing-moive-card-wrap'>
            <PaginatedItems itemsPerPage={12} /> 
          </div>
        </section>
      }
    </Suspense>
  )
}

export default MovieListing;