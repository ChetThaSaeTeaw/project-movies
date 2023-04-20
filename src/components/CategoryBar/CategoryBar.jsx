import React , { useEffect, useState } from 'react';
import axios from 'axios';
import { APIKEY } from '../../api/MovieKey';
import { Link, useParams } from 'react-router-dom';

// CSS
import './CategoryBar.scss';

// Icons
import {  MdArrowDropDown , MdArrowRight } from 'react-icons/md';

function CategoryBar() {

    const [ catagory , setCategory ] = useState("");
    const { id } = useParams();

    async function getAllCategory () {
        try {
            let response = await axios.get(`https://client.iamtheme.com/api/v2/movie/category/?key=${APIKEY}`);
            setCategory(response.data);
            // console.log(response.data);
        } catch (err) {
            console.log('Error CategoryBar :' , err);
        }
    }
    
    useEffect(() => {
        getAllCategory();
    },[id]);

  return (
    <div className='home-page-category-container'>
        <div className='home-page-category-title'>
            <h2>ประเภท / แนว</h2>
            <span><MdArrowDropDown /></span>
        </div>
        <ul className='home-page-category-lists'>
        {!catagory ? null :
            catagory.map((cate , index) => {
                return (
                    <li key={index}>
                        <span><MdArrowRight /></span>
                            <Link 
                                to={`/category/${cate.id}`}
                                style={ cate.id == id ? { color : "#fff" } : null }
                            >
                                {cate.title_category}
                            </Link>
                    </li>
                    )
                })
            }
        </ul>
  </div>
  )
}

export default CategoryBar