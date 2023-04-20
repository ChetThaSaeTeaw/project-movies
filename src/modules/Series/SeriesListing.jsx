import React , { Suspense, useState , useEffect } from 'react';
// import { useSelector } from 'react-redux';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { APIKEY } from '../../api/MovieKey';

// CSS
import "./SeriesListing.scss";
import "./Pagination.scss";

// Components
import SeriesCard from '../../components/cards/SeriesCard/SeriesCard';

function SeriesListing() {

    // const { movies } = useSelector(state => state.movies);

    const [ series , setSeries ] = useState("");

    const url = "https://client.iamtheme.com/api/v2";

    async function fetchSeriesData () {
      try { 
        let response = await axios.get(`${url}/series/all?key=${APIKEY}`);
        setSeries(response.data);
        // console.log(response.data);
      } catch (err) {
        console.log("Movie Listing Error :" , err);
      }
    }


    function PaginatedItems({ itemsPerPage }) {
        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = series.data.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(series.data.length / itemsPerPage);
      
        const handlePageClick = (event) => {
          const newOffset = (event.selected * itemsPerPage) % series.data.length;
          setItemOffset(newOffset);
        };
      
        return (
          <>
             {!currentItems ? null :
              currentItems.map((serie , index) => {
                  return (
                      <React.Fragment key={index}>
                          <SeriesCard data={serie } />
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
      fetchSeriesData();
    },[]);

  return (
    <Suspense fallback="Loading...">
      {!series ? null :
        <section className='series-listing-container'>
          <div className='series-listing-serie-card-wrap'>
            <PaginatedItems itemsPerPage={12} />
          </div>
        </section>
      }
    </Suspense>
  )
}

export default SeriesListing